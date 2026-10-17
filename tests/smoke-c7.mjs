// C7 — isolerat regressionstest för individuella religionshistoriska fördjupningar.
// node tests/smoke-c7.mjs
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {execFileSync} from 'node:child_process';
const read=path=>fs.readFileSync(new URL('../'+path,import.meta.url),'utf8');
const html=read('index.html');
for(const path of ['data/c7-religionshistorisk-betydelse.v890.js','v838-reader-reflow.js','v839-reader-unified.js','v858-book-reader.js'])
  execFileSync(process.execPath,['--check',new URL('../'+path,import.meta.url).pathname]);
assert.ok(html.includes('data/c7-religionshistorisk-betydelse.v890.js'));
assert.ok(html.indexOf('data/c7-religionshistorisk-betydelse.v890.js') < html.indexOf('v838-reader-reflow.js'));
assert.ok(html.indexOf('data/c7-religionshistorisk-betydelse.v890.js') < html.indexOf('v858-book-reader.js'));
const ctx={
 window:{}, URL, renderDetail(){},
 document:{getElementById(){return null;}},
 state:{selected:null},
 enc:value=>String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]))
};
vm.createContext(ctx);
vm.runInContext(read('data/data.generated.js'),ctx);
assert.equal(vm.runInContext('events.length',ctx),64);
assert.equal(vm.runInContext('originalEvents.length',ctx),129);
vm.runInContext(read('data/dilmun-ninti.v887.js'),ctx);
vm.runInContext(read('data/c7-religionshistorisk-betydelse.v890.js'),ctx);
vm.runInContext(read('data/lilith.v888-draft.js'),ctx);
vm.runInContext(read('data/ophites-naghammadi.v889-draft.js'),ctx);
const corpus=ctx.window.TIDENS_C7_RELIGION;
for(const id of ['B001','H004','H005','H006','H016','H065','H066','H067','H068','H069')
 assert.ok(Object.hasOwn(corpus,id),'Expected individualized C7 analysis: '+id);
assert.equal(vm.runInContext('events.length',ctx),69);
for(const [id,p] of Object.entries(corpus)){
 assert.ok(p.level.length>=25,id+': missing epistemic label');
 assert.ok(p.paragraph.length>=550,id+': meaningful individual text is too short');
 assert.ok(Array.isArray(p.sources)&&p.sources.length>=2,id+': missing independent source paths');
 for(const [label,url] of p.sources){assert.ok(label.length>=10);assert.equal(new URL(url).protocol,'https:');}
}
vm.runInContext(read('v839-reader-unified.js'),ctx);
const api=ctx.window.TidensUniversalReader;
const pick=id=>vm.runInContext('events.find(e=>e.id==='+JSON.stringify(id)+')||originalEvents.find(e=>e.id==='+JSON.stringify(id)+')',ctx);
for(const id of ['H004','H005','H006','H016','H065','H066','H067','H068','H069']){
 const html=api.renderArticle(pick(id));
 assert.ok(html.includes(corpus[id].level),id+': epistemic context not rendered');
 assert.ok(html.includes('Källor för denna bedömning'),id+': individual citations absent');
 assert.ok(html.includes(corpus[id].sources[0][1].replaceAll('&','&amp;')),id+': source URL absent');
}
for(const id of ['H068','H069']){
 const article=api.renderArticle(pick(id));
 assert.ok(article.includes('<h3>Betydelse för Israels religion, judendomen och kristendomen</h3>'),id+': mandatory heading missing');
 const paragraph=corpus[id].paragraph;
 assert.ok(article.includes(paragraph.slice(0,80)),id+': personalized significance missing');
 assert.ok(!article.includes('Religionshistorisk betydelse återstår att särskilt granska'),id+': no filler');
}
const unrelated=api.renderArticle(pick('H001'));
assert.ok(!unrelated.includes('Religionshistorisk betydelse återstår att särskilt granska'),'Generic placeholder is forbidden');
assert.ok(!unrelated.includes('Betydelse för Israels religion, judendomen och kristendomen'),'Unresearched faith section should be hidden');
const bookReader=read('v858-book-reader.js');
assert.ok(bookReader.includes('window.TIDENS_C7_RELIGION?.[b.id]'));
assert.ok(!bookReader.includes('Dess specifika religionshistoriska betydelse behöver granskas'));
console.log('C7 OK: H066 and H067 have visible individual context and citations; legacy C7 coverage preserved and no generic placeholder.');
