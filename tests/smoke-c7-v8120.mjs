import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
const context={window:{}};vm.createContext(context);
for(const v of [890,891,892,893,894,895,896,897,898,8101,8102,8103,8104,8105,8106,8107,8108,8109,8110,8111,8112,8113,8114,8115,8116,8117,8118,8119]){
 const p='data/c7-religionshistorisk-betydelse.v'+v+'.js';vm.runInContext(read(p),context,{filename:p});
}
const before={...context.window.TIDENS_C7_RELIGION};assert.equal(Object.keys(before).length,166);
const path='data/c7-religionshistorisk-betydelse.v8120.js';vm.runInContext(read(path),context,{filename:path});
const after=context.window.TIDENS_C7_RELIGION,ids=['O095','O096','O097','O098'];
assert.deepEqual(Object.keys(after).filter(k=>!(k in before)).sort(),ids);
assert.equal(Object.keys(after).length,170);
for(const [id,entry] of Object.entries(before)){assert.equal(after[id].paragraph,entry.paragraph);assert.equal(after[id].level,entry.level);}
const d=read('data/data.generated.js');const originals=JSON.parse(d.split('const originalEvents=')[1].split(';\nconst bibleOriginal=')[0]);
const expected=['Skapelsen','Syndafallet','Noas ark','Babels torn'];
ids.forEach((id,i)=>{
 const source=originals.find(x=>x.id===id);assert.ok(source,id);
 assert.equal(source.description,expected[i]);assert.equal(source.evidence,'Ej granskad');
 const c=after[id];assert.ok(c.paragraph.split(/\s+/).length>=175,id);assert.ok(c.sources.length>=3,id);
 assert.ok(c.sources.some(s=>s[1].includes('bible.com')),id);
 assert.match(c.paragraph,/exil|datering|redaktion/i,id+' must distinguish hypothesis from established date');
 for(const [title,url] of c.sources){assert.ok(title.length>=20);assert.match(url,/^https:\/\//);}
});
assert.ok(read('index.html').includes('<script src="'+path+'"></script>'));
console.log('PASS C7 O095–O098: 166 analyses, canonical IDs, original dates unchanged');
