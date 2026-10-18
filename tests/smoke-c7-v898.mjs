// C7 V8.98: New Testament book coverage, eight new individually referenced studies.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {execFileSync} from 'node:child_process';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
const modules=[890,891,892,893,894,895,896,897,898].map(n=>'data/c7-religionshistorisk-betydelse.v'+n+'.js');
const html=read('index.html');
let prev=-1;
for(const path of modules){
 execFileSync(process.execPath,['--check',new URL('../'+path,import.meta.url).pathname]);
 const pos=html.indexOf('<script src="'+path+'"></script>');
 assert.ok(pos>prev,'Missing or unordered C7 module '+path);
 prev=pos;
}
assert.ok(prev<html.indexOf('v839-reader-unified.js'),'Historical reader must load after C7');
assert.ok(prev<html.indexOf('v858-book-reader.js'),'Bible reader must load after C7');
const ctx={window:{},URL,renderDetail(){},state:{selected:null},document:{getElementById(){return null;}},
 enc:v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))};
vm.createContext(ctx);
for(const path of ['data/data.generated.js','data/dilmun-ninti.v887.js',...modules])
 vm.runInContext(read(path),ctx,{filename:path});
const data=ctx.window.TIDENS_C7_RELIGION;
const newIds=['B041','B052','B060','B061','B062','B063','B064','B065'];
const keys=Object.keys(data);
assert.ok(keys.length>=72,'64 previous C7 analyses and eight further NT books');
assert.equal(keys.length,new Set(keys).size,'Never repeat IDs');
assert.equal(vm.runInContext('events.length',ctx),65,'Base historical events unchanged');
assert.equal(vm.runInContext('originalEvents.length',ctx),129,'Original events unchanged');
for(const id of newIds){
 const p=data[id];
 assert.ok(p,id+' missing');
 assert.ok(p.level.length>=43,id+' research confidence statement');
 assert.ok(p.paragraph.length>=1100,id+' substantial individual study');
 assert.ok(p.sources.length>=4,id+' require academic sources and ancient text');
 for(const [name,url] of p.sources){
  assert.ok(name.length>=14,id+' meaningful reference title');
  assert.equal(new URL(url).protocol,'https:',id+' source must use HTTPS');
 }
}
const books=read('data/bible-books-v857.js');
const allBookIds=[...books.matchAll(/"id":"(B\d{3})"/g)].map(m=>m[1]);
const nt=allBookIds.filter(id=>Number(id.slice(1))>=40 && Number(id.slice(1))<=66);
assert.equal(nt.length,27,'66-book index should contain 27 NT books');
const uncovered=nt.filter(id=>!data[id]);
assert.deepEqual(uncovered,[],'All 27 NT books must have an individual C7 section');
assert.ok(data.B041.paragraph.includes('Mark 16:9–20'),'Mark disputed ending is necessary');
assert.ok(data.B052.paragraph.includes('1 Thess 2:13–16'),'Anti-Jewish interpolation debate addressed');
assert.ok(data.B060.paragraph.includes('inte ett bestämt universellt romerskt förföljelsedekret'),'1 Peter persecution caution');
assert.ok(data.B061.paragraph.includes('Judasbrevet'),'2 Peter/Jude relation');
assert.ok(data.B062.paragraph.includes('antagandet')||data.B062.paragraph.includes('saknas en enda accepterad'),'1 John opponents not certain');
assert.ok(data.B063.paragraph.includes('den utvalda frun'),'2 John audience identity');
assert.ok(data.B064.paragraph.includes('Diotrefes'),'3 John leadership conflict');
assert.ok(data.B065.paragraph.includes('Henoksboken 1:9'),'Jude specific 1 Enoch citation');
const reader=read('v858-book-reader.js');
assert.ok(reader.includes('window.TIDENS_C7_RELIGION?.[b.id]'),'Use existing book reader C7 section');
assert.ok(reader.includes('Källor för denna bedömning:'),'Per-book citations must be rendered');
vm.runInContext(read('v839-reader-unified.js'),ctx);
const historical=ctx.window.TidensUniversalReader;
const unrelated=vm.runInContext('events.find(e=>e.id==="H001")',ctx);
assert.ok(!historical.renderArticle(unrelated).includes('Betydelse för Israels religion, judendomen och kristendomen'),'No generic religion section');
console.log('C7 V8.98 OK: eight sourced analyses, all 27 NT books now have individual C7 significance, previous 64 preserved.');
