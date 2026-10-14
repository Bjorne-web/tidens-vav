// V8.38 – kontroller för källans tidsnivå och transparent granskningsframdrift.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {execFileSync} from 'node:child_process';
const root=path.resolve(import.meta.dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
const html=read('index.html');
const version=html.match(/Version 8\.(\d+)/);
assert.ok(version&&Number(version[1])>=38,'Requires V8.38 or newer');
for(const file of ['data/review-ledger.js','data/c6-progress.js','v838-time-levels.js','v838-time-levels.css']){
 assert.ok(fs.existsSync(path.join(root,file)),'File missing: '+file);
 assert.ok(html.includes(file),'Missing link in index: '+file);
}
assert.ok(html.indexOf('data/review-ledger.js')<html.indexOf('v838-time-levels.js'),'Journal must load first');
assert.ok(html.indexOf('v834-review.js')<html.indexOf('v838-time-levels.js'),'Claim renderer must load first');
for(const file of ['v838-time-levels.js','data/review-ledger.js','data/c6-progress.js']){
 execFileSync(process.execPath,['--check',path.join(root,file)]);
}
const box={window:{}};
vm.runInNewContext(read('data/review-ledger.js'),box);
vm.runInNewContext(read('data/c6-progress.js'),box);
const ledger=box.window.TIDENS_REVIEW_LEDGER,progress=box.window.TIDENS_C6_PROGRESS;
assert.equal(ledger.schemaVersion,3);
assert.equal(Object.keys(ledger.completePostReviews).length,0,'Never silently approve entire articles');
assert.ok(Object.keys(ledger.claimChecks).length>=12,'V8.38 claim-checked records must be retained');
assert.ok(Object.values(ledger.claimChecks).reduce((n,rows)=>n+rows.length,0)>=13,'V8.38 claim checks must be retained');
const newIds=['H019','H020','H025','H034','H056'];
assert.deepEqual(newIds.filter(id=>!(id in ledger.claimChecks)),[],'Each new research record needs sourced checks');
const ids=new Set([...read('data/data.generated.js').matchAll(/"id":"([A-Z][0-9]{3,6})"/g)].map(m=>m[1]));
for(const [id,checks] of Object.entries(ledger.claimChecks)){
 assert.ok(ids.has(id),'Unrecognized post: '+id);
 for(const claim of checks){
  for(const prop of ['claim','scope','limit','sourceTitle','sourceUrl','sourceType','evidenceType','verified']){
   assert.ok(typeof claim[prop]==='string'&&claim[prop].length>8,'Missing '+prop+' in '+id);
  }
  assert.ok(/^https:\/\//.test(claim.sourceUrl),'Non-HTTPS provenance');
 }
}
for(const id of newIds)for(const claim of ledger.claimChecks[id]){
 assert.ok(claim.timeLevel && claim.timeClarification,'Time classification required for '+id);
 assert.ok(claim.timeClarification.length>=50,'Time clarification too short');
}
assert.equal(ledger.claimChecks.H025.length,2,'Enoch anthology and Qumran fragment are distinct');
assert.ok(ledger.claimChecks.H034[0].limit.includes('inte'),'P52 must not prove manuscript or composition date');
assert.equal(progress.total,193);
assert.equal(progress.history.at(-1).claimCheckPosts,Object.keys(ledger.claimChecks).length,'Latest history must match journal records');
assert.equal(progress.history.at(-1).claimChecks,Object.values(ledger.claimChecks).reduce((n,rows)=>n+rows.length,0),'Latest history must match individual controls');
assert.equal(progress.implementedCorrectionIds.length,11,'Previously implemented descriptions stay registered');
assert.equal(progress.partialReportIds.length,36,'Previously audited dossiers stay registered');
assert.ok(read('v838-time-levels.js').includes('Vilken tidsnivå granskas?'),'Reader needs actual time-level explanation');
console.log('OK: V8.38 12 claim-checked records / 13 sourced claims, time-level constraints and C6 dashboard history.');
