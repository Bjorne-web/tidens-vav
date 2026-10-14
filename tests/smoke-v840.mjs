// V8.40 – zoroastrism, nyanserad akademisk evidens och C6-granskningsgrind.
// Kör: node tests/smoke-v840.mjs
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {execFileSync} from 'node:child_process';
const root=path.resolve(import.meta.dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const html=read('index.html');
assert.ok(html.includes('Version 8.40'),'Wrong version');
const req=['data/special-research.v840.js','data/c6-review-method.v840.js','v840-audit-method.js','v840-audit-method.css'];
for(const file of req){
 assert.ok(fs.existsSync(path.join(root,file)),'Missing '+file);
 assert.ok(html.includes(file),'Not linked '+file);
}
assert.ok(html.indexOf('data/special-research.v840.js')<html.indexOf('v839-reader-unified.js'),'Specific research must load before reader');
assert.ok(html.indexOf('data/c6-review-method.v840.js')<html.indexOf('v840-audit-method.js'),'Method must load before UI');
for(const file of ['data/special-research.v840.js','data/c6-review-method.v840.js','data/review-ledger.js','v839-reader-unified.js','v840-audit-method.js']){
 execFileSync(process.execPath,['--check',path.join(root,file)]);
}
const sandbox={
 window:{},URL,
 state:{selected:'O030'},
 document:{getElementById:()=>null},
 enc:s=>String(s??'').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;'),
 renderDetail(){},
 renderResearch(){},
};
vm.createContext(sandbox);
for(const file of ['data/data.generated.js','data/special-research.v840.js','data/review-ledger.js','data/c6-progress.js','data/c6-review-method.v840.js','v839-reader-unified.js','v840-audit-method.js']){
 vm.runInContext(read(file),sandbox,{filename:file});
}
const archive=vm.runInContext('originalEvents.find(e=>e.id==="O030")',sandbox);
const total=vm.runInContext('events.length+originalEvents.length',sandbox);
assert.equal(total,193,'All 193 posts must remain');
assert.equal(archive.start,-1200,'Original date must not be silently changed');
assert.equal(archive.reviewed,false,'Original review flag must not be changed');
const articleModel=sandbox.window.TidensUniversalReader.modelFor(archive);
assert.ok(articleModel.impact.includes('Shaul Shaked'),'Academically documented, non-empty relevance required');
assert.ok(articleModel.limits.includes('inte beskrivas som säkert den första monoteismen'),'No absolute first monotheism label');
assert.ok(articleModel.impact.includes('mesopotamiska och hellenistiska'),'Alternative explanatory contexts must be retained');
assert.ok(articleModel.sources.length>=5,'Separate scholarly references required');
const religious=sandbox.window.TidensUniversalReader.religionFor(archive);
assert.ok(religious.level.includes('Historisk kontakt belagd'),'Verified contact distinguished from hypothesis');
assert.ok(religious.paragraph.includes('svår att belägga'),'Transfer cannot be declared definitively proven');
const reader=sandbox.window.TidensUniversalReader.renderArticle(archive);
assert.ok(reader.includes('Shaul Shaked'));
assert.ok(reader.includes('Betydelse för Israels religion, judendomen och kristendomen'));
assert.ok(reader.includes('inte ett exakt'),'Cautious time-level claims must remain');
for(const source of articleModel.sources)assert.ok(source.url.startsWith('https://'),'Secure provenance URLs required');
const ledger=sandbox.window.TIDENS_REVIEW_LEDGER;
assert.equal(Object.keys(ledger.completePostReviews).length,0,'No whole article approved');
assert.equal(Object.keys(ledger.claimChecks).length,13,'13 posts with check entries');
assert.equal(Object.values(ledger.claimChecks).reduce((n,a)=>n+a.length,0),19,'19 scoped claims in all');
assert.equal(ledger.claimChecks.O030.length,6,'6 distinct Zoroastrian research checks');
for(const claim of ledger.claimChecks.O030){
 for(const key of ['claim','scope','limit','sourceTitle','sourceUrl','sourceType','evidenceType','scholarlyStanding','timeLevel','timeClarification']){
  assert.ok(typeof claim[key]==='string'&&claim[key].length>10,'O030 missing '+key);
 }
 assert.match(claim.verified,/^20\d{2}-\d{2}-\d{2}$/,'Verification date should be ISO date');
 assert.ok(articleModel.sources.some(s=>s.url===claim.sourceUrl),'Claim source not represented in reader: '+claim.sourceTitle);
}
const progress=sandbox.window.TIDENS_C6_PROGRESS;
assert.equal(progress.total,193);
assert.equal(progress.history.at(-1).claimCheckPosts,13);
assert.equal(progress.history.at(-1).claimChecks,19);
assert.equal(progress.history.at(-1).wholeApproved,0);
const protocol=sandbox.window.TIDENS_AUDIT_METHOD;
assert.equal(protocol.criteria.length,6,'Every approval must pass the six mandatory gates');
assert.ok(protocol.researchQueue.some(e=>e.id==='O030'&&e.status.includes('ingen helgranskning')),'Open review status required');
assert.ok(read('v840-audit-method.js').includes('c6Progress'),'Methods must appear under Fördjupningar');
const legacy=sandbox.window.TidensUniversalReader.modelFor(vm.runInContext('originalEvents.find(e=>e.id==="O067")',sandbox));
assert.ok(legacy.summary.includes('Gilgamesh'),'Other legacy research information must survive');
console.log('OK: V8.40 Zoroastrian scholarship, 6 sourced claims, 13/19 audit metrics, six-stage research method, all legacy posts preserved.');
