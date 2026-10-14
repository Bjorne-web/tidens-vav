// V8.45: safeguard staged removal of spreadsheet-origin notices and live C6 counts.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const html=read('index.html'), dashboard=read('v836-c6-progress.js');
const context={window:{}};
vm.runInNewContext(read('data/review-ledger.js'),context);
vm.runInNewContext(read('data/c6-progress.js'),context);
const journal=context.window.TIDENS_REVIEW_LEDGER;
const progress=context.window.TIDENS_C6_PROGRESS;
const entries=Object.entries(journal.claimChecks).filter(([,claims])=>claims.length);
const counts=entries.reduce((sum,[,claims])=>sum+claims.length,0);
assert.equal(progress.total,193);
assert.equal(progress.partialReportIds.length,36);
assert.equal(progress.implementedCorrectionIds.length,11);
assert.ok(entries.length>=15,'Do not regress to historical 7');
assert.ok(counts>=24);
assert.equal(Object.keys(journal.completePostReviews).length,0);
assert.ok(dashboard.includes('m.journalPosts'),'Dashboard must derive count from source ledger');
for(const label of ['Strukturellt inventerade poster','Poster med C6-delgranskningsrapporter','Poster med registrerade påståendekontroller','Införda textförtydliganden','Fullständigt vetenskapligt slutgranskade'])
 assert.ok(dashboard.includes(label),'Missing status line '+label);
assert.ok(!html.includes('Äldre Exceluppgifter finns enbart i originalarkivet.'));
assert.ok(!html.includes('De 129 importerade Excelposterna'));
assert.ok(html.includes('id="archiveView"'),'Legacy archive retained while independent sources replace it');
assert.ok(html.includes('data/data.generated.js'),'No removal of historical records');
console.log('OK V8.45: staged provenance migration; status 193/36/current-ledger/11/0, historical archive preserved.');
