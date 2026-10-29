'use strict';
const assert=require('node:assert/strict');
const {resolveField,resolveRecord}=require('./f3-provenance-core.cjs');
const layers=[
 {id:'original',fields:{summary:'Äldre tolkning',narrativeTime:'Traditionellt förlagd tid'}},
 {id:'c7',fields:{summary:'Granskad komplettering',narrativeTime:'Traditionellt förlagd tid'},reviewState:'reviewed'}
];
const conflict=resolveField('summary',layers);
assert.equal(conflict.conflict,true);
assert.equal(conflict.selected,null,'No silent choice of competing claims');
assert.deepEqual(conflict.alternatives.map(x=>x.origin),['original','c7']);
const preferred=resolveField('summary',layers,{preferOrigins:['c7','original']});
assert.equal(preferred.selected.value,'Granskad komplettering');
assert.equal(preferred.selected.reviewState,'reviewed');
assert.equal(preferred.conflict,true,'Explicit choice does not erase conflict');
const agreed=resolveField('narrativeTime',layers);
assert.equal(agreed.conflict,false);
assert.equal(agreed.selected.value,'Traditionellt förlagd tid');
const empty=resolveField('impact',[{id:'original',fields:{impact:''}},{id:'c7',fields:{impact:null}}]);
assert.equal(empty.selected,null);assert.equal(empty.alternatives.length,0);
const typeGuard=resolveField('summary',[{id:'bad',fields:{summary:42}},{id:'good',fields:{summary:'Belagd text'}}]);
assert.equal(typeGuard.selected.origin,'good');
const before=JSON.stringify(layers);
const record=resolveRecord('B001',layers,{},['summary','narrativeTime']);
assert.equal(record.fields.narrativeTime.conflict,false);assert.equal(record.fields.summary.conflict,true);
assert.equal(JSON.stringify(layers),before,'Inputs unchanged');
assert(Object.isFrozen(record));assert(Object.isFrozen(record.fields));assert(Object.isFrozen(conflict.alternatives));
assert.throws(()=>resolveField('<invalid>',layers),/Invalid field/);
console.log('F3 provenance test pilot: PASS (no production dependencies)');
