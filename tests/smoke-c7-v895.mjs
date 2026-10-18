// C7 v8.95 – evangelier, synoptik, johanneisk tradition och apokalyptik.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {execFileSync} from 'node:child_process';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
const modules=[890,891,892,893,894,895].map(n=>'data/c7-religionshistorisk-betydelse.v'+n+'.js');
const html=read('index.html');
let last=-1;
for(const path of modules){
 execFileSync(process.execPath,['--check',new URL('../'+path,import.meta.url).pathname]);
 const i=html.indexOf('<script src="'+path+'"></script>');
 assert.ok(i>last,'C7 modules loaded in order '+path);last=i;
}
assert.ok(last<html.indexOf('v839-reader-unified.js'),'C7 must precede historical reader');
assert.ok(last<html.indexOf('v858-book-reader.js'),'C7 must precede Bible reader');
const ctx={window:{},URL,renderDetail(){},state:{selected:null},document:{getElementById(){return null;}},
 enc:x=>String(x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))};
vm.createContext(ctx);
for(const p of ['data/data.generated.js','data/dilmun-ninti.v887.js',...modules])
 vm.runInContext(read(p),ctx,{filename:p});
const data=ctx.window.TIDENS_C7_RELIGION;
const ids=['H033','H034','H035','B040','B042','B043','B066'];
const keys=Object.keys(data);
assert.ok(keys.length>=48,'At least 41 previous plus seven new C7 individual texts');
assert.equal(new Set(keys).size,keys.length);
assert.equal(vm.runInContext('events.length',ctx),65,'Original chronological research posts unchanged');
assert.equal(vm.runInContext('originalEvents.length',ctx),129,'Original chronology untouched');
for(const id of ids){
 const d=data[id];
 assert.ok(d?.level.length>=40,id+' missing evidence qualifier');
 assert.ok(d.paragraph.length>=900,id+' detailed analysis missing');
 assert.ok(d.sources.length>=4,id+' academic and primary sources missing');
 for(const [title,url] of d.sources){assert.ok(title.length>=12,id+' source identification');assert.equal(new URL(url).protocol,'https:');}
}
assert.ok(data.H033.paragraph.includes('Farrerhypotesen'),'Must recognize synoptic source model alternatives');
assert.ok(data.H033.paragraph.includes('Q är däremot en rekonstruerad'),'Q not discovered manuscript');
assert.ok(data.H034.paragraph.includes('inte användas som objektiva utsagor om judar'),'Johannine polemic requires historical scope');
assert.ok(data.H035.paragraph.includes('inte förutsätter ett påvisat unikt förföljelsedekret'),'No fake universal persecution context');
assert.ok(data.B040.paragraph.includes('inte som en bild av hur alla judar'),'Anti-Jewish generalization rejected');
assert.ok(data.B042.paragraph.includes('Isaac W. Oliver'),'Jewish restoration scholarship identified');
assert.ok(data.B043.paragraph.includes('Logos'),'Jewish wisdom and Greek language in John');
assert.ok(data.B066.paragraph.includes('samma person'),'Revelation author not equated uncritically with Gospel author');
const bibleReader=read('v858-book-reader.js');
assert.ok(bibleReader.includes('window.TIDENS_C7_RELIGION?.[b.id]'),'Book entries must render their own C7 analyses');
assert.ok(bibleReader.includes('Källor för denna bedömning:'));
vm.runInContext(read('v839-reader-unified.js'),ctx);
const reader=ctx.window.TidensUniversalReader;
for(const id of ['H033','H034','H035']){
 const rec=vm.runInContext('events.find(e=>e.id==='+JSON.stringify(id)+')',ctx);
 assert.ok(rec,'No new fabricated post '+id);
 const article=reader.renderArticle(rec);
 assert.ok(article.includes(data[id].level),id+' C7 not rendered');
 assert.ok(article.includes('Källor för denna bedömning'),id+' sources not rendered');
}
for(const id of ['H004','H065','H066','H067','H068','H069','H026','B001','B002','B003','B004','B005'])
 assert.ok(data[id],'Earlier C7 must survive '+id);
console.log('C7 v8.95 OK: seven individual Gospel/Revelation analyses added; 48 total, critical qualifications and sources present.');
