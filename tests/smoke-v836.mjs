// V8.36 – genomgång av källprövningsjournal, post-ID och statusindex.
// Kör tillsammans med de tidigare regressionstesterna.
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {execFileSync} from 'node:child_process';
const root=path.resolve(import.meta.dirname,'..');
const read=f=>fs.readFileSync(path.join(root,f),'utf8');
const html=read('index.html');
const version=html.match(/Version 8\.(\d+)/);
assert.ok(version && Number(version[1])>=36,'V8.36 or newer required');
for(const f of ['v836-review-index.js','v836-review-index.css','data/review-ledger.js']){
  assert.ok(fs.existsSync(path.join(root,f)),f+' saknas');
  assert.ok(html.includes(f),f+' laddas inte');
}
assert.ok(html.indexOf('v834-review.js') < html.indexOf('v836-review-index.js'),'Renderar i fel ordning');
for(const f of ['v836-review-index.js','data/review-ledger.js'])
  execFileSync(process.execPath,['--check',path.join(root,f)]);

// Data innehåller alla ID:n som journalen hänvisar till. Inga falska fullgranskningar.
const ids=new Set([...read('data/data.generated.js').matchAll(/"id":"([A-Z]\d{3,6})"/g)].map(m=>m[1]));
const env={window:{},events:[{id:'H001',title:'Göbekli Tepe'},{id:'H004',title:'Atrahasis'},{id:'H005',title:'Gilgamesh'},{id:'H017',title:'Babylon'},{id:'H041',title:'Tel Dan'},{id:'H042',title:'Lakish'},{id:'H054',title:'Kyroscylindern'}],originalEvents:[{id:'O030',title:'Zoroastrism',original:true}],renderResearch(){},renderDetail(){},idEvent(){return null}};
vm.createContext(env);
vm.runInContext(read('data/review-ledger.js'),env);
const ledger=env.window.TIDENS_REVIEW_LEDGER;
assert.ok(ledger.schemaVersion>=2,'Journal schema must preserve V8.36 fields');
assert.equal(Object.keys(ledger.completePostReviews).length,0);
assert.ok(Object.keys(ledger.claimChecks).length>=7,'Earlier claim checks must be preserved');
for(const [id,checks] of Object.entries(ledger.claimChecks)){
  assert.ok(ids.has(id),'Okänd post i journalen: '+id);
  for(const claim of checks){
    assert.ok(/^https:\/\//.test(claim.sourceUrl),'Källa måste använda HTTPS: '+id);
    for(const property of ['claim','verified','sourceUrl','sourceTitle','evidenceType','claimType','sourceType','scope','limit'])
      assert.ok(typeof claim[property]==='string'&&claim[property].length>5,`${id} saknar ${property}`);
    assert.ok(!claim.claim.includes('bevisar Bibeln'),'Undvik absoluta generaliseringar');
  }
}
const newClaims=['H001','H004','H005','H017','H042'];
for(const id of newClaims)assert.ok(ledger.claimChecks[id]?.length>0,'Källprövningen saknas: '+id);
vm.runInContext(read('v836-review-index.js'),env);
const idx=env.window.TidensKalloversikt;
assert.equal(idx.overall().total,8);
assert.equal(idx.overall().checkedPosts,idx.catalog().filter(e=>e.status==='partial').length,'Catalog and journal checked-post totals must agree');
assert.equal(idx.overall().fullReviews,0);
assert.equal(idx.overall().pendingPosts,idx.catalog().filter(e=>e.status==='pending').length,'Pending count must match records');
assert.equal(idx.statusFor('H001'),'partial');
assert.equal(idx.statusFor('O030'),'partial','New V8.40 checks must be visible for Zoroastrism');
assert.ok(idx.catalog().find(p=>p.id==='H017').checks>=1);
assert.ok(!idx.catalog().some(p=>p.status==='full'));
console.log('OK: V8.36 source-provenance schema, claim scope and searchable registry calculations.');
