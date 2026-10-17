// C7 batch 2 — prövbara ämnesanalyser och säker inkoppling.
// Kör: node tests/smoke-c7-v891.mjs
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {execFileSync} from 'node:child_process';
const load=path=>fs.readFileSync(new URL('../'+path,import.meta.url),'utf8');
const newPath='data/c7-religionshistorisk-betydelse.v891.js';
execFileSync(process.execPath,['--check',new URL('../'+newPath,import.meta.url).pathname]);
const html=load('index.html');
assert.ok(html.indexOf('c7-religionshistorisk-betydelse.v890.js')<html.indexOf('c7-religionshistorisk-betydelse.v891.js'),'Previous reviewed C7 batch must load first');
assert.ok(html.indexOf('c7-religionshistorisk-betydelse.v891.js')<html.indexOf('v839-reader-unified.js'),'C7 data must load before common reader');
assert.ok(html.indexOf('c7-religionshistorisk-betydelse.v891.js')<html.indexOf('v858-book-reader.js'),'C7 data must load before book reader');
const ctx={window:{},URL,state:{selected:null},renderDetail(){},document:{getElementById(){return null}},
 enc:value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))};
vm.createContext(ctx);
for(const file of ['data/data.generated.js','data/dilmun-ninti.v887.js','data/c7-religionshistorisk-betydelse.v890.js','data/c7-religionshistorisk-betydelse.v891.js'])
 vm.runInContext(load(file),ctx,{filename:file});
const data=ctx.window.TIDENS_C7_RELIGION;
const newlyAdded=['H011','H017','H019','H020','H021','H023','H024','H025','O027','O028'];
const original=['H004','H005','H006','H016','H065','B001','H066','H067','H068','H069'];
assert.equal(Object.keys(data).length,20,'Ten existing C7 analyses including Lilith and Ophites + ten newer entries');
assert.equal(new Set(Object.keys(data)).size,20,'No duplicates');
for(const id of [...newlyAdded,...original]){
 const d=data[id];assert.ok(d && d.paragraph.length>=700,id+': expected substantive individual context');
 assert.ok(d.level.length>=25,id+': level must be substantive');
 assert.ok(Array.isArray(d.sources) && d.sources.length>=2,id+': at least two research sources');
 for(const [title,url] of d.sources){assert.ok(title.length>15);assert.equal(new URL(url).protocol,'https:');}
}
assert.ok(data.H011.paragraph.includes('inte'), 'Stela cannot prove biblical narrative details');
assert.ok(data.H017.paragraph.includes('nämner däremot inte uttryckligen'), 'Cyrus cylinder limitation must remain');
assert.ok(data.H025.paragraph.includes('Judasbrevet 14–15'), 'Cross-tradition primary text link');
assert.ok(data.O027.paragraph.includes('monolatri'), 'Religion of Israel must address plural scholarly categories');
assert.ok(data.O028.paragraph.includes('religiösa uttryck varierade'), 'Second Temple Judaism must not be treated as uniform');
vm.runInContext(load('data/lilith.v888-draft.js'),ctx);
vm.runInContext(load('data/ophites-naghammadi.v889-draft.js'),ctx);
assert.equal(vm.runInContext('events.length',ctx),69,'All four published Lilith/Ophites research posts remain');
assert.equal(vm.runInContext('originalEvents.length',ctx),129,'Original posts untouched');
vm.runInContext(load('v839-reader-unified.js'),ctx);
const api=ctx.window.TidensUniversalReader;
for(const id of newlyAdded){
 const e=vm.runInContext('events.find(x=>x.id==='+JSON.stringify(id)+')||originalEvents.find(x=>x.id==='+JSON.stringify(id)+')',ctx);
 assert.ok(e,'Missing original historical post '+id);
 const article=api.renderArticle(e);
 assert.ok(article.includes(data[id].level),'Expected individual level '+id);
 assert.ok(article.includes('Källor för denna bedömning'),'Missing C7 source disclosure '+id);
 assert.ok(article.includes('inte vetenskapligt slutgranskade')||article.includes('inte källgranskad'),'No false final-review claims '+id);
}
const other=vm.runInContext('events.find(x=>x.id==="H001")',ctx);
assert.ok(!api.renderArticle(other).includes('Betydelse för Israels religion, judendomen och kristendomen'),'Do not restore placeholder');
console.log('C7 v891 OK: ten v891 records plus ten prior C7 records, 20 in total, source paths and reader rendering checked.');
