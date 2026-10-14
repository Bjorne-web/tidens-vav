// C6: regressionstest för grafisk projektstatus och spårbarhet.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
const root=path.resolve(import.meta.dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const index=read('index.html');
const required=['data/c6-progress.js','v836-c6-progress.js','v836-c6-progress.css'];
for(const name of required){
 assert.ok(fs.existsSync(path.join(root,name)),'C6 file missing '+name);
 assert.ok(index.includes(name),'C6 file not referenced '+name);
}
assert.ok(index.indexOf('data/review-ledger.js')<index.indexOf('v836-c6-progress.js'),'Progress requires ledger');
assert.ok(index.indexOf('data/c6-progress.js')<index.indexOf('v836-c6-progress.js'),'Progress data must load first');
assert.ok(index.indexOf('v836-review-index.js')<index.indexOf('v836-c6-progress.js'),'C6 component must wrap index renderer');
for(const name of ['data/c6-progress.js','v836-c6-progress.js']){
 execFileSync(process.execPath,['--check',path.join(root,name)]);
}
// Detect accidental malformed stylesheet markup, including a lost '>' before the next link.
assert.ok(!/<link[^>]*<link/i.test(index),'Nested or malformed stylesheet links');
for(const name of ['v836-review-index.css','v836-c6-progress.css']){
 assert.ok(new RegExp('<link[^>]+href="'+name.replace('.','\\.')+'">').test(index),'Broken stylesheet link '+name);
}
const db={window:{}};
vm.runInNewContext(read('data/c6-progress.js'),db);
vm.runInNewContext(read('data/review-ledger.js'),db);
const p=db.window.TIDENS_C6_PROGRESS;
const ledger=db.window.TIDENS_REVIEW_LEDGER;
assert.equal(p.total,193,'Documented C6 population must remain stable unless audit changes');
assert.equal(p.research+p.original,p.total);
assert.equal(new Set(p.partialReportIds).size,36,'Only counted section headings in 8 reports');
assert.equal(p.totalReports,8);
assert.equal(new Set(p.proposedCorrectionIds).size,11,'Count staged corrections separately');
assert.equal(Object.keys(ledger.completePostReviews).length,0,'Never imply complete research sign-off');
const ids=new Set([...read('data/data.generated.js').matchAll(/"id":"([A-Z][0-9]{3,6})"/g)].map(m=>m[1]));
for(const id of [...p.partialReportIds,...p.proposedCorrectionIds,...Object.keys(ledger.claimChecks)]){
 assert.ok(ids.has(id),'Unknown record ID: '+id);
}
assert.ok(p.history.length>0&&p.updated===p.history.at(-1).date,'Status date and history must agree');
const journalIds=Object.keys(ledger.claimChecks);
assert.equal(journalIds.length,7,'Journal records in V8.36 must match audit');
const source=read('v836-c6-progress.js');
assert.ok(source.includes("FÖRDJUPNINGAR"),'Visible section must use actual menu label');
assert.ok(source.includes("h('progress'"),'Progress panel must be graphical, not just a text count');
assert.ok(source.includes("C6-delgranskningsrapport"),'Must distinguish partial from complete review');
console.log('OK: C6 progress dashboard data, unique section IDs, markup, provenance, and status separation.');
