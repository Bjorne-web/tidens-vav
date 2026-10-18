// C7 V8.97 – disputed Pauline letters, pastorals, Hebrews and James.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {execFileSync} from 'node:child_process';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
const modules=[890,891,892,893,894,895,896,897].map(n=>'data/c7-religionshistorisk-betydelse.v'+n+'.js');
const html=read('index.html');
let last=-1;
for(const path of modules){
 execFileSync(process.execPath,['--check',new URL('../'+path,import.meta.url).pathname]);
 const position=html.indexOf('<script src="'+path+'"></script>');
 assert.ok(position>last,'C7 module load order: '+path);
 last=position;
}
assert.ok(last<html.indexOf('v839-reader-unified.js'),'Individual research loaded before reader');
assert.ok(last<html.indexOf('v858-book-reader.js'),'Individual research loaded before Bible books');
const ctx={window:{},URL,renderDetail(){},state:{selected:null},document:{getElementById(){return null}},
 enc:v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))};
vm.createContext(ctx);
for(const path of ['data/data.generated.js','data/dilmun-ninti.v887.js',...modules])vm.runInContext(read(path),ctx,{filename:path});
const data=ctx.window.TIDENS_C7_RELIGION;
const ids=['B049','B051','B053','B054','B055','B056','B058','B059'];
const all=Object.keys(data);
assert.ok(all.length>=64,'56 accepted C7 entries plus eight more');
assert.equal(new Set(all).size,all.length,'Research data keys must remain unique');
assert.equal(vm.runInContext('events.length',ctx),65,'Chronology untouched');
assert.equal(vm.runInContext('originalEvents.length',ctx),129,'Historical originals unchanged');
for(const id of ids){
 const r=data[id];
 assert.ok(r,id+' research entry missing');
 assert.ok(r.level.length>=45,id+' epistemic qualification must be nontrivial');
 assert.ok(r.paragraph.length>=1050,id+' source-specific full analysis expected');
 assert.ok(r.sources.length>=4,id+' verify at least 3 scholarly sources and primary text');
 for(const [label,url] of r.sources){
  assert.ok(label.length>=12,id+' source identification');
  assert.equal(new URL(url).protocol,'https:',id+' HTTPS source link');
 }
}
assert.ok(data.B049.paragraph.includes('författarskapet som omdiskuterat'),'Ephesians authorship disputed');
assert.ok(data.B051.paragraph.includes('Kolosserbrevet och Efesierbrevet'),'Literary interrelationship considered');
assert.ok(data.B053.paragraph.includes('författarskapet är omstritt'),'2 Thessalonians uncertainty');
assert.ok(data.B054.paragraph.includes('1 Tim 2:11–15'),'Women teaching passage addressed');
assert.ok(data.B054.paragraph.includes('inte i sig ett bevis'),'Avoid unsupported local-cult certainty');
assert.ok(data.B055.paragraph.includes('inte fullständigt eniga'),'Distinct 2 Timothy authorship assessment');
assert.ok(data.B055.paragraph.includes('slutligt avgränsad kanon'),'Do not assume modern New Testament canon');
assert.ok(data.B056.paragraph.includes('förslavade personer'),'Slavery and household codes addressed');
assert.ok(data.B058.paragraph.includes('inte talar för direkt författarskap av Paulus'),"Hebrews is not demonstrably Pauline");
assert.ok(data.B059.paragraph.includes('inte i sig'),'James/Paul direct-response model not proven');
const bookReader=read('v858-book-reader.js');
assert.ok(bookReader.includes('window.TIDENS_C7_RELIGION?.[b.id]'),'Book reader must use C7 source');
assert.ok(bookReader.includes('Källor för denna bedömning:'),'Sources visible in reader');
vm.runInContext(read('v839-reader-unified.js'),ctx);
const timeline=ctx.window.TidensUniversalReader;
for(const prev of ['B001','B002','B003','B040','B042','B043','B044','B045','B046','B047','B048','B050','B057','B066','H036'])
 assert.ok(data[prev],'Approved earlier C7 research missing: '+prev);
const unreviewed=vm.runInContext('events.find(x=>x.id==="H001")',ctx);
assert.ok(!timeline.renderArticle(unreviewed).includes('Betydelse för Israels religion, judendomen och kristendomen'),'Unresearched posts must omit placeholder');
console.log('C7 V8.97 OK: eight new individually sourced analyses, at least 64 in total, prior sources and reader integrations retained.');
