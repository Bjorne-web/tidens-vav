// C7 V8.92: nine individually sourced religious-historical dossiers. Run: node tests/smoke-c7-v892.mjs
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {execFileSync} from 'node:child_process';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
const paths=['data/c7-religionshistorisk-betydelse.v890.js','data/c7-religionshistorisk-betydelse.v891.js','data/c7-religionshistorisk-betydelse.v892.js'];
const html=read('index.html');
let last=-1;
for(const p of paths){const pos=html.indexOf('<script src="'+p+'"></script>');
 assert.ok(pos>last,'C7 source scripts must load in version order: '+p);
 last=pos;
 execFileSync(process.execPath,['--check',new URL('../'+p,import.meta.url).pathname]);}
assert.ok(last<html.indexOf('v839-reader-unified.js')&&last<html.indexOf('v858-book-reader.js'),'C7 data before both readers');
const ctx={window:{},URL,renderDetail(){},state:{selected:null},document:{getElementById(){return null;}},
 enc:x=>String(x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))};
vm.createContext(ctx);
for(const p of ['data/data.generated.js','data/dilmun-ninti.v887.js',...paths])vm.runInContext(read(p),ctx,{filename:p});
const data=ctx.window.TIDENS_C7_RELIGION,news=['H012','H013','H014','H015','H018','H022','H032','O029','O076'];
assert.ok(Object.keys(data).length>=25,'At least 6+10+9 documented C7 entries, with independently approved additions allowed');
assert.equal(new Set(Object.keys(data)).size,Object.keys(data).length);
assert.equal(vm.runInContext('events.length',ctx),65,'Historical entry count untouched');
assert.equal(vm.runInContext('originalEvents.length',ctx),129,'Original IDs untouched');
for(const id of news){
 const item=data[id];
 assert.ok(item?.paragraph.length>=750,'Missing individualized historical analysis: '+id);
 assert.ok(item?.level.length>=35,'Missing epistemic label: '+id);
 assert.ok(item?.sources.length>=2,'Insufficient reference trail: '+id);
 for(const [title,url] of item.sources) { assert.ok(title.length>=12,'Source title required');assert.equal(new URL(url).protocol,'https:'); }
}
assert.ok(data.H012.paragraph.includes('keramikform'),'Settlement pattern not automatically ethnicity');
assert.ok(data.H013.paragraph.includes('yngre än'),'Tel Dan inscription date not contemporary to David');
assert.ok(data.H014.paragraph.includes('omstritt'),'Asherah interpretation must remain qualified');
assert.ok(data.H015.paragraph.includes('Salmanassar V'),'Assyrian king attribution needs nuance');
assert.ok(data.H018.paragraph.includes('saknar entydiga antika belägg'),'Do not invent synagogues in exile');
assert.ok(data.H022.paragraph.includes('flera steg'),'Septuagint gradual process');
assert.ok(data.H032.paragraph.includes('Javne'),'No invented single canon council');
assert.ok(data.O029.paragraph.includes('liten grupp'),'No instant rabbinic majority');
assert.ok(data.O076.paragraph.includes('inte ett direkt bevis'),'Do not claim Baal borrowed by Christianity');
vm.runInContext(read('v839-reader-unified.js'),ctx);
const api=ctx.window.TidensUniversalReader;
for(const id of news){
 const e=vm.runInContext('[...events,...originalEvents].find(x=>x.id==='+JSON.stringify(id)+')',ctx);
 assert.ok(e,'Post-ID absent '+id);
 const article=api.renderArticle(e);
 assert.ok(article.includes(data[id].level),'C7 assessment not rendered: '+id);
 assert.ok(article.includes('Källor för denna bedömning'),'Linked references absent: '+id);
 assert.ok(article.includes('inte vetenskapligt slutgranskade')||article.includes('inte källgranskad'),'No fake final review: '+id);
}
const old=vm.runInContext('events.find(x=>x.id==="H065")',ctx);
assert.ok(api.renderArticle(old).includes(data.H065.level),'Previous Ninti dossier must remain');
const unrelated=vm.runInContext('events.find(x=>x.id==="H001")',ctx);
assert.ok(!api.renderArticle(unrelated).includes('Betydelse för Israels religion, judendomen och kristendomen'),'Generic placeholder must remain suppressed');
console.log('C7 V8.92 OK: nine new analyses + 16 earlier = at least 25, plus independently approved contributions; all source-identified and reader-integrated');
