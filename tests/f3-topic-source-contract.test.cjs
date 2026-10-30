'use strict';
// F3: real "Är Gud god?" thematic track + archaeology source A01.
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const {assembleTopic,assembleSource,assembleRelation,stableTopicId}=require('./f3-topic-source-contract.cjs');
const trackCode=fs.readFileSync('v889-research-tracks.js','utf8');
const at=trackCode.indexOf('function section(t){');
assert(at>0,'Original research track structure changed: revisit parser');
const context={window:{}};
vm.runInNewContext(trackCode.slice(0,at)+'window.__f3Tracks=tracks;})();',context,
 {filename:'v889-research-tracks.js',timeout:1000});
const good=context.window.__f3Tracks.find(t=>t.key==='good');
assert(good,'Gods goodness track not in current source');
const before=JSON.stringify(good);
const topic=assembleTopic({key:good.key,label:good.heading,description:good.intro,
 sections:good.sections.map(s=>({...s,origin:'v889-research-tracks.js'})),
 relations:good.links.map(l=>({to:l.id,relationType:'links-post',rationale:l.label,origin:'v889-research-tracks.js'})),
 references:good.sources.map(ref=>({...ref,origin:'v889-research-tracks.js'})),
 reviewStatus:'draft'});
assert.equal(topic.kind,'topic');
assert.equal(topic.id,'topic:good');
assert.equal(topic.label,'Är Gud god?');
assert.equal(topic.temporal,null,'Philosophical research question must not receive event date');
assert.equal(topic.sections.length,3);
assert.equal(topic.relations.length,2);
assert(topic.relations.some(r=>r.to==='O119'));
assert(topic.references.some(r=>r.url.startsWith('https://plato.stanford.edu/')));
assert(Object.isFrozen(topic)&&Object.isFrozen(topic.sections));
assert.equal(JSON.stringify(good),before,'Existing source must not be mutated');
const line=fs.readFileSync('data/data.generated.js','utf8').split('\n')
 .find(s=>s.startsWith('const archaeologyCasesV818='));
assert(line,'Archaeology source data missing');
const cases=JSON.parse(line.slice(line.indexOf('=')+1).replace(/;\s*$/,''));
const amarna=cases.find(c=>c.id==='A01');
assert(amarna&&amarna.sources?.length>0);
const original=amarna.sources[0];
const source=assembleSource({url:original.url,title:original.name,
 sourceKind:original.type,provenance:'data/data.generated.js:archaeologyCasesV818.A01.sources',
 uses:[{targetId:'archaeology-case:A01',supports:original.supports,
  origin:'data/data.generated.js:archaeologyCasesV818.A01.sources'}]});
assert.equal(source.kind,'source');
assert.equal(source.url,'https://www.metmuseum.org/art/collection/search/544696');
assert.equal(source.id,'source:'+source.url);
assert.equal(source.reviewStatus,null,'No fabricated review status');
assert.equal(source.temporal,null,'Source link is not automatically assigned a historical date');
assert.equal(source.independentlyVerified,false,'Reference URL alone does not verify content');
assert.equal(source.relations[0].to,'archaeology-case:A01');
assert.equal(source.relations[0].rationale,original.supports);
assert(Object.isFrozen(source)&&Object.isFrozen(source.relations));
assert.throws(()=>assembleSource({url:'javascript:alert(1)',title:'unsafe'}),/Invalid/);
assert.throws(()=>assembleTopic({key:'bad key',label:'bad'}),/Invalid/);
assert.throws(()=>assembleTopic({key:'none',label:'No',sections:[{title:'x'}]}),/Invalid/);
assert.equal(stableTopicId('good'),'topic:good');
assert.equal(assembleRelation({from:'topic:good',to:'O119',relationType:'links-post'}).rationale,null);
console.log('F3 topic/source contracts: PASS (real good track with no invented date; A01 citation provenance, unverified link, typed relation)');
