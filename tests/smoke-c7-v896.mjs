// C7 V8.96 – Bar Kokhba, Apostlagärningarna och sju Paulusrelaterade analyser.
// node tests/smoke-c7-v896.mjs
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {execFileSync} from 'node:child_process';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
const modules=[890,891,892,893,894,895,896].map(x=>'data/c7-religionshistorisk-betydelse.v'+x+'.js');
const html=read('index.html');
let last=-1;
for(const path of modules){
 execFileSync(process.execPath,['--check',new URL('../'+path,import.meta.url).pathname]);
 const index=html.indexOf('<script src="'+path+'"></script>');
 assert.ok(index>last,'Loading order/entry '+path);
 last=index;
}
assert.ok(last<html.indexOf('v839-reader-unified.js'));
assert.ok(last<html.indexOf('v858-book-reader.js'));
const ctx={window:{},URL,renderDetail(){},state:{selected:null},document:{getElementById(){return null;}},
 enc:v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))};
vm.createContext(ctx);
for(const path of ['data/data.generated.js','data/dilmun-ninti.v887.js',...modules])vm.runInContext(read(path),ctx,{filename:path});
const dossiers=ctx.window.TIDENS_C7_RELIGION;
const ids=['H036','B044','B045','B046','B047','B048','B050','B057'];
const all=Object.keys(dossiers);
assert.ok(all.length>=56,'At least 48 earlier C7 analyses + eight from v896');
assert.equal(new Set(all).size,all.length,'Research records must remain individually keyed');
assert.equal(vm.runInContext('events.length',ctx),65,'Do not change base history');
assert.equal(vm.runInContext('originalEvents.length',ctx),129,'Do not change original chronology');
for(const id of ids){
 const d=dossiers[id];assert.ok(d,'Missing '+id);
 assert.ok(d.level.length>=38,id+': epistemic assessment');
 assert.ok(d.paragraph.length>=1050,id+': source-aware individualized analysis');
 assert.ok(d.sources.length>=4,id+': individual scholarly/source paths');
 for(const [label,url] of d.sources){
  assert.ok(label.length>=15,id+': source title');
  assert.equal(new URL(url).protocol,'https:',id+': sources must be secure hyperlinks');
 }
}
assert.ok(dossiers.H036.paragraph.includes('orsaker') && dossiers.H036.paragraph.includes('omdiskuterade'),'Revolt causes not settled');
assert.ok(dossiers.B044.paragraph.includes('inte ett samtida neutralt protokoll'),'Acts not neutral transcript');
assert.ok(dossiers.B045.paragraph.includes('Rom 9–11'),'Israel and gentiles should not disappear');
assert.ok(dossiers.B045.paragraph.includes('moderna trofasta samkönade äktenskap'),'Historical-context distinction required');
assert.ok(dossiers.B046.paragraph.includes('svåröversatta grekiska uttrycken'),'Corinthian sexuality translations require care');
assert.ok(dossiers.B047.paragraph.includes('teorier om senare sammanfogning'),'2 Corinthians compositional debate');
assert.ok(dossiers.B048.paragraph.includes('Gal 3:28'),'Social status, gender, ethnicity');
assert.ok(dossiers.B050.paragraph.includes('ursprung och exakta funktion är omdiskuterade'),'Christ hymn origin not certain');
assert.ok(dossiers.B057.paragraph.includes('inte uttryckligen'),'Philemon must not be represented as explicit manumission');
vm.runInContext(read('v839-reader-unified.js'),ctx);
const historian=ctx.window.TidensUniversalReader;
const revolter=vm.runInContext('events.find(x=>x.id==="H036")',ctx);
assert.ok(revolter,'Reuse historical Bar Kokhba post ID');
const article=historian.renderArticle(revolter);
assert.ok(article.includes(dossiers.H036.level),'Revolt religion section not visible');
assert.ok(article.includes('Källor för denna bedömning'),'Revolt cited sources not shown');
const books=read('v858-book-reader.js');
assert.ok(books.includes('window.TIDENS_C7_RELIGION?.[b.id]'),'Existing book reader C7 integration missing');
assert.ok(books.includes('Källor för denna bedömning:'));
for(const id of ['B001','B002','B003','B004','B005','H065','H068','H069','H026','H033','B040','B066'])
 assert.ok(dossiers[id],'Previously reviewed C7 content must remain: '+id);
const unrelated=vm.runInContext('events.find(x=>x.id==="H001")',ctx);
assert.ok(!historian.renderArticle(unrelated).includes('Betydelse för Israels religion, judendomen och kristendomen'),'Never restore generic placeholder');
console.log('C7 V8.96 OK: eight source-based entries with critical qualifiers, previous analyses and both readers intact.');
