const assert=require('node:assert/strict');
const model=require('../v915-category-read-model.js');
assert.deepEqual([...model.areas],['bible','religions','world','ideas']);
const examples=[
 {id:'H045',category:'Arkeologi',start:-853},
 {id:'O067',category:'Konflikterande berättelser',start:-2100},
 {id:'O123',category:'Bibelberättelser',start:-150},
 {id:'B001',title:'Första Moseboken'},
 {id:'H001',category:'Arkeologi'},
];
const snapshot=JSON.stringify(examples);
for(const input of examples){
 const c=model.get(input);assert.equal(c.id,input.id);assert.equal(c.legacyCategory,input.category||null);
 assert(Object.isFrozen(c));assert(Object.isFrozen(c.relatedAreas));
 assert(!c.relatedAreas.includes(c.primaryArea));
}
assert.equal(model.get(examples[4]).primaryArea,'unclassified');
assert.equal(model.get(examples[4]).researchStatus,'unknown');
assert.equal(JSON.stringify(examples),snapshot,'Legacy data mutated');
assert.equal(model.get(null),null);
console.log('B2.3: 5 records classified read-only, 4 pilot mappings, unknowns preserved.');
