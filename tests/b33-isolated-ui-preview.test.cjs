const assert=require('node:assert/strict');const fs=require('node:fs');
const html=fs.readFileSync('previews/b33-isolated-view-preview.html','utf8');
const index=fs.readFileSync('index.html','utf8');
for(const name of ['Tidslinjen','Temaspår','Jämförelse','Läsfönstret','Bibeln','Religioner','Världshistoria','Idéer & kunskap','selectedPostId','originView','comparisonIds','themeContext','timeDimension','returnContext','O124','O129','O119','@media','aria-pressed'])assert(html.includes(name),'Missing '+name);
assert(!index.includes('b33-isolated-view-preview.html'),'Preview should not alter production index');
assert(!html.includes('<script src="data/data.generated.js"'),'Prototype must not load source data');
const model=require('../v915-category-read-model.js');assert.deepEqual([...model.areas],['bible','religions','world','ideas']);
console.log('B3.3 preview isolation and view contract pass');
