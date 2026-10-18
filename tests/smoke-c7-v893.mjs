// C7 V8.93 – Torahböcker, forntida lagtraditioner och uttåget.
// Kör: node tests/smoke-c7-v893.mjs
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {execFileSync} from 'node:child_process';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
const files=['data/c7-religionshistorisk-betydelse.v890.js','data/c7-religionshistorisk-betydelse.v891.js','data/c7-religionshistorisk-betydelse.v892.js','data/c7-religionshistorisk-betydelse.v893.js'];
const html=read('index.html');
let last=-1;
for(const p of files){
 const index=html.indexOf('<script src="'+p+'"></script>');
 assert.ok(index>last,'C7 script loading order '+p); last=index;
 execFileSync(process.execPath,['--check',new URL('../'+p,import.meta.url).pathname]);
}
assert.ok(last<html.indexOf('v839-reader-unified.js'),'C7 data must be present before universal reader');
assert.ok(last<html.indexOf('v858-book-reader.js'),'C7 data must be present before Bible book reader');
const ctx={window:{},URL,renderDetail(){},state:{selected:null},document:{getElementById(){return null;}},
 enc:v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))};
vm.createContext(ctx);
for(const p of ['data/data.generated.js','data/dilmun-ninti.v887.js',...files])vm.runInContext(read(p),ctx,{filename:p});
const data=ctx.window.TIDENS_C7_RELIGION;
const ids=['B002','B003','B004','B005','H007','H010'];
const keys=Object.keys(data);
assert.ok(keys.length>=35,'29 previously reviewed dossiers and six in this batch must survive');
assert.equal(new Set(keys).size,keys.length,'One distinct C7 item per post');
assert.equal(vm.runInContext('events.length',ctx),65,'Historical events not changed by C7');
assert.equal(vm.runInContext('originalEvents.length',ctx),129,'Original events not changed by C7');
for(const id of ids){
 const d=data[id];
 assert.ok(d?.paragraph.length>=900,id+' individualized analysis expected');
 assert.ok(d?.level.length>=35,id+' epistemic label expected');
 assert.ok(d?.sources.length>=3,id+' scholarly references and primary text link expected');
 for(const [name,url] of d.sources){assert.ok(name.length>=12,id+' source label');assert.equal(new URL(url).protocol,'https:');}
}
assert.ok(data.B002.paragraph.includes('David P. Wright'),'Exodus scholarly debate');
assert.ok(data.B003.paragraph.includes('tredelning'),'Leviticus law reception explicitly limited');
assert.ok(data.B004.paragraph.includes('folkräkningar'),'Numbers historiography not equated with census');
assert.ok(data.B005.paragraph.includes('Laura Quick'),'Treaty parallels scholarly attribution');
assert.ok(data.H007.paragraph.includes('John Van Seters'),'Competing law code positions');
assert.ok(data.H010.paragraph.includes('James K. Hoffmeier'),'Alternative historical reading');
vm.runInContext(read('v839-reader-unified.js'),ctx);
const api=ctx.window.TidensUniversalReader;
for(const id of ['H007','H010']){
 const e=vm.runInContext('events.find(x=>x.id==='+JSON.stringify(id)+')',ctx);
 assert.ok(e,id+' must reuse stable existing ID');
 const article=api.renderArticle(e);
 assert.ok(article.includes(data[id].level),id+' religion section in unified reader');
 assert.ok(article.includes('Källor för denna bedömning'),id+' source references visible');
}
const reader=read('v858-book-reader.js');
assert.ok(reader.includes('window.TIDENS_C7_RELIGION?.[b.id]'),'Book reader must use same C7 dataset');
assert.ok(reader.includes('Källor för denna bedömning:'));
for(const id of ['H065','H066','H067','H068','H069','B001','O029'])assert.ok(data[id],id+' previous reviewed context must remain');
const raw=vm.runInContext('events.find(x=>x.id==="H001")',ctx);
assert.ok(!api.renderArticle(raw).includes('Betydelse för Israels religion, judendomen och kristendomen'),'Missing research should never show meaningless placeholder');
console.log('C7 V8.93 OK: six researched dossiers and all previous C7 records; sources, levels, IDs and reading views preserved.');
