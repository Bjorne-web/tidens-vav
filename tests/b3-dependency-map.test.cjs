const assert=require('node:assert/strict');
const fs=require('node:fs');
const s=fs.readFileSync('docs/b3-dependency-map.md','utf8');
for(const item of ['#127','#157','#180','#184','#300','B3.1','B3.2','B3.3','B3.4','O066','O124','O126','23 poster','C7','index.html','Statusnyckel'])assert(s.includes(item),item);
const model=require('../v915-category-read-model.js');
assert.deepEqual([...model.areas],['bible','religions','world','ideas']);
assert(!model.hasPilot('O066'));
console.log('B3 dependency map guardrails passed');
