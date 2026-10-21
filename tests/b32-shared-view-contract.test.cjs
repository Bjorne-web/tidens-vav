const assert=require('node:assert/strict');const fs=require('node:fs');
const s=fs.readFileSync('docs/b32-shared-view-contract.md','utf8');
for(const x of ['Tidslinjen','Temaspår','Jämförelse','Läsfönstret','selectedPostId','originView','comparisonIds','themeContext','timeDimension','returnContext','O066','O095','O126','H066','H069','C7','illustrativ etappöversikt'])assert(s.includes(x),x);
const model=require('../v915-category-read-model.js');
assert.deepEqual([...model.areas],['bible','religions','world','ideas']);
assert(!model.hasPilot('O066'));
console.log('B3.2 design contract and guardrails pass');
