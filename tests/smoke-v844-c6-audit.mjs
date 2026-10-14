// V8.44 – C6 scientific audit invariants. No source check is a whole-post sign-off.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const read=f=>fs.readFileSync(path.join(root,f),'utf8');
const env={window:{}};
vm.runInNewContext(read('data/review-ledger.js'),env);
vm.runInNewContext(read('data/c6-progress.js'),env);
const ledger=env.window.TIDENS_REVIEW_LEDGER, progress=env.window.TIDENS_C6_PROGRESS;
const idSet=new Set([...read('data/data.generated.js').matchAll(/"id":"([A-Z][0-9]{3,6})"/g)].map(x=>x[1]));
const lists=ledger.claimChecks;
const checkedPosts=Object.keys(lists);
const checks=Object.values(lists).flat();
assert.equal(progress.total,progress.original+progress.research,'Population differs from components');
assert.equal(idSet.size,progress.total,'Unique event IDs differ from declared population');
assert.equal(new Set([...progress.partialReportIds]).size,progress.partialReportIds.length,'Duplicate partial-report ID');
assert.equal(new Set([...progress.implementedCorrectionIds]).size,progress.implementedCorrectionIds.length,'Duplicate implemented correction');
for(const id of [...checkedPosts,...progress.partialReportIds,...progress.implementedCorrectionIds])
 assert.ok(idSet.has(id),'C6 references missing event '+id);
for(const [id,entries] of Object.entries(lists)){
 assert.ok(Array.isArray(entries)&&entries.length,'Empty claim list for '+id);
 for(const [index,item] of entries.entries()){
  const where=id+'['+index+']';
  for(const f of ['claim','verified','sourceTitle','sourceUrl','evidenceType','claimType','sourceType','timeLevel','timeClarification','scholarlyStanding','scope','limit'])
   assert.ok(typeof item[f]==='string'&&item[f].trim(),where+': missing '+f);
  assert.ok(/^https:\/\/[^\s]+$/.test(item.sourceUrl),where+': malformed source URL');
  assert.ok(/^\d{4}-\d{2}-\d{2}$/.test(item.verified)&&!Number.isNaN(Date.parse(item.verified)),where+': invalid date');
  assert.ok(item.verified<=progress.updated,where+': verification after status update');
  assert.ok(item.scope.length>=20&&item.limit.length>=20,where+': inadequate scope/limitations');
 }
}
const latest=progress.history.at(-1);
assert.equal(latest.date,progress.updated,'Status date must match last entry');
assert.equal(latest.claimCheckPosts,checkedPosts.length,'Checked-post total must be derived from ledger');
assert.equal(latest.claimChecks,checks.length,'Claim total must be derived from ledger');
assert.equal(latest.wholeApproved,Object.keys(ledger.completePostReviews).length,'Whole-post sign-off requires explicit reviews');
assert.equal(Object.keys(ledger.completePostReviews).length,0,'Never infer completion from partial checks');
assert.ok(progress.caveat.includes('inte fullständig'),'Visible caveat must distinguish partial from complete');
console.log('OK V8.44: '+idSet.size+' unique events, '+checkedPosts.length+' records, '+checks.length+' scoped source checks, 0 complete reviews; fields, dates and counts consistent.');
