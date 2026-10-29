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


const {resolveTemporal}=require('./f3-provenance-core.cjs');
const dates=resolveTemporal([
 {origin:'original',timeType:'composition',start:-2100,end:-1600,certainty:'unreviewed'},
 {origin:'c7-tablet',timeType:'material-witness',start:-700,end:-601,certainty:'reviewed'},
 {origin:'c7-alt',timeType:'composition',start:-1800,end:-1500},
 {origin:'invalid',timeType:'event',start:200,end:100}
]);
assert.equal(dates.composition.conflict,true);
assert.equal(dates.composition.selected,null);
assert.equal(dates['material-witness'].conflict,false);
assert.equal(dates['material-witness'].selected.start,-700);
assert.equal(dates.event.alternatives.length,0);
const resolved=resolveTemporal([
 {origin:'first',timeType:'event',start:-853,end:-853},
 {origin:'second',timeType:'event',start:-854,end:-854}
],{event:{preferOrigins:['second']}});
assert.equal(resolved.event.selected.origin,'second');
assert.equal(resolved.event.conflict,true);
assert.equal(resolveTemporal([{origin:'o',timeType:'narrative',start:-2000,end:-1900}]).narrative.conflict,false);
console.log('F3 temporal types: PASS');


const {resolveScopedField}=require('./f3-provenance-core.cjs');
const decisions=[{postId:'B001',field:'summary',preferOrigin:'c7',rationale:'Separately documented C7 editorial decision'}];
const b=resolveScopedField('B001','summary',layers,decisions);
assert.equal(b.selected.origin,'c7');
assert.equal(b.conflict,true);
assert.equal(b.decision,'explicit');
assert.equal(resolveScopedField('H045','summary',layers,decisions).selected,null,'No cross-post priority leak');
assert.equal(resolveScopedField('B001','impact',layers,decisions).selected,null);
const missing=resolveScopedField('B001','summary',layers,[{postId:'B001',field:'summary',preferOrigin:'lost',rationale:'Old policy'}]);
assert.equal(missing.selected,null);assert.equal(missing.decision,'missing-origin');
assert.throws(()=>resolveScopedField('B001','summary',layers,[...decisions,...decisions]),/Ambiguous/);
console.log('F3 scoped provenance decision tests: PASS');
