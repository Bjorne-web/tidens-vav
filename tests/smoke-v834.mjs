// V8.34 – kör med: node tests/smoke-v834.mjs
// Inga externa beroenden eller betaltjänster behövs.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
const root=path.resolve(import.meta.dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const html=read('index.html');
for (const file of ['app.js','styles.css','data/data.generated.js','data/review-ledger.js','v833-temaspar.js','v833-temaspar.css','v834-review.js','v834-review.css']){
  assert.ok(fs.existsSync(path.join(root,file)), 'Missing: '+file);
  assert.ok(html.includes(file), 'Not referenced by index.html: '+file);
}
for (const file of ['app.js','data/data.generated.js','data/review-ledger.js','v833-temaspar.js','v834-review.js']){
  execFileSync(process.execPath,['--check',path.join(root,file)]);
}
assert.ok(html.includes('Version 8.34'), 'Wrong version banner');
const sandbox={window:{}};
vm.runInNewContext(read('data/review-ledger.js'),sandbox);
const ledger=sandbox.window.TIDENS_REVIEW_LEDGER;
assert.equal(Object.keys(ledger.completePostReviews).length,0, 'Do not silently mark full reviews');
const ids=new Set([...read('data/data.generated.js').matchAll(/"id":"(H\d+|O\d+)"/g)].map(m=>m[1]));
for(const [id,checks] of Object.entries(ledger.claimChecks)){
  assert.ok(ids.has(id), 'Missing event '+id);
  assert.ok(checks.length>0,'Empty review '+id);
  for(const claim of checks){
    assert.ok(/^https:\/\//.test(claim.sourceUrl),'Non-HTTPS source '+id);
    for(const field of ['claim','sourceTitle','sourceUrl','evidenceType','scope','limit','verified']) assert.ok(claim[field], 'Missing '+id+'.'+field);
  }
}
console.log('OK: static references, JS syntax, record IDs, explicit review scope.');
