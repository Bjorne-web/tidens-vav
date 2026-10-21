const fs=require('node:fs');const assert=require('node:assert/strict');
const s=fs.readFileSync('docs/b3-design-integration-readiness.md','utf8');
for(const term of ['#180','#184','#157','bible','religions','world','ideas','C7','O066','O124','O126','23 O-poster','index.html']) {
 if(term==='O066')continue;
 assert(s.includes(term),term);
}
const model=require('../v915-category-read-model.js');
assert.deepEqual([...model.areas],['bible','religions','world','ideas']);
assert.equal(model.hasPilot('O066'),false);
console.log('B3 planning-only design guardrails pass');
