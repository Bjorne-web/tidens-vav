// C7 V8.94 – romerska Judeen, historiske Jesus och de äldsta kristna texterna.
// Kör: node tests/smoke-c7-v894.mjs
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {execFileSync} from 'node:child_process';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
const modules=['data/c7-religionshistorisk-betydelse.v890.js','data/c7-religionshistorisk-betydelse.v891.js','data/c7-religionshistorisk-betydelse.v892.js','data/c7-religionshistorisk-betydelse.v893.js','data/c7-religionshistorisk-betydelse.v894.js'];
const html=read('index.html');
let previous=-1;
for(const path of modules){
 execFileSync(process.execPath,['--check',new URL('../'+path,import.meta.url).pathname]);
 const here=html.indexOf('<script src="'+path+'"></script>');
 assert.ok(here>previous,'Missing or unordered C7 data '+path);
 previous=here;
}
assert.ok(previous<html.indexOf('v839-reader-unified.js'),'C7 must load before reader');
const ctx={window:{},URL,renderDetail(){},state:{selected:null},document:{getElementById(){return null}},
 enc:v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))};
vm.createContext(ctx);
for(const path of ['data/data.generated.js','data/dilmun-ninti.v887.js',...modules])vm.runInContext(read(path),ctx,{filename:path});
const data=ctx.window.TIDENS_C7_RELIGION;
const ids=['H026','H027','H028','H029','H030','H031'];
assert.ok(Object.keys(data).length>=41,'35 previously accepted C7 dossiers + six new must be available');
for(const id of ids){
 const x=data[id];
 assert.ok(x?.level.length>=35,id+': research level');
 assert.ok(x.paragraph.length>=900,id+': individualized substantive research');
 assert.ok(x.sources.length>=3,id+': source trail');
 for(const [label,url] of x.sources){assert.ok(label.length>=14);assert.equal(new URL(url).protocol,'https:');}
}
assert.ok(data.H026.paragraph.includes('år 6 e.Kr.'),'63 BC was not the beginning of direct Roman prefect rule');
assert.ok(data.H027.paragraph.includes('Quirinius')&&data.H027.paragraph.includes('4 f.Kr.'),'Matthew/Luke chronology must remain distinct');
assert.ok(data.H028.paragraph.includes('judisk'),'Jesus stays in Jewish setting');
assert.ok(data.H029.paragraph.includes('Ingen kollektiv skuld'),'No collective Jewish responsibility for Roman crucifixion');
assert.ok(data.H030.paragraph.includes('sju brev'),'Only seven undisputed Pauline letters');
assert.ok(data.H031.paragraph.includes('Q är en rekonstruerad källa'),'Q is not a discovered manuscript');
vm.runInContext(read('v839-reader-unified.js'),ctx);
const reader=ctx.window.TidensUniversalReader;
assert.equal(vm.runInContext('events.length',ctx),65,'No chronology records added');
for(const id of ids){
 const record=vm.runInContext('events.find(x=>x.id==='+JSON.stringify(id)+')',ctx);
 assert.ok(record,'Preserve original event IDs: '+id);
 const article=reader.renderArticle(record);
 assert.ok(article.includes(data[id].level),id+': significance section');
 assert.ok(article.includes('Källor för denna bedömning'),id+': own linked sources');
 assert.ok(article.includes('inte vetenskapligt slutgranskade')||article.includes('inte källgranskad'),id+': no false whole-post review');
}
const unrelated=vm.runInContext('events.find(x=>x.id==="H001")',ctx);
assert.ok(!reader.renderArticle(unrelated).includes('Betydelse för Israels religion, judendomen och kristendomen'),'Do not reintroduce placeholder');
for(const previousId of ['B001','B002','B003','B004','B005','H065','O027','O076'])assert.ok(data[previousId],'Prior approved context missing: '+previousId);
console.log('C7 V8.94 OK: six individual Roman-Judea/Jesus/early-church dossiers, previous 35 retained, no generic placeholders');
