const assert=require('node:assert/strict');
const fs=require('node:fs');
const model=require('../v915-category-read-model.js');
const doc=fs.readFileSync('docs/b23-closeout-and-design-handoff.md','utf8');
for(const s of ['129','69','O066','H065','H069','23','unknown','C7','index.html'])assert(doc.includes(s),'Missing handoff item '+s);
assert.deepEqual([...model.areas],['bible','religions','world','ideas']);
for(const id of ['H065','H066','H067','H068','H069','O001','O130']){assert(model.hasPilot(id),id);assert.equal(model.get({id}).researchStatus,'unknown',id);}
assert.equal(model.hasPilot('O066'),false);
console.log('B2.3 design handoff scope and guardrails pass');
