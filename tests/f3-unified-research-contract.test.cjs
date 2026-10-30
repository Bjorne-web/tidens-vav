'use strict';
// F3 shared consumer contract backed by actual H045, philosophy track, and Amarna source.
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const {assembleResearchObject}=require('./f3-unified-research-contract.cjs');
const generated=fs.readFileSync('data/data.generated.js','utf8');
function getTable(name){
 const line=generated.split('\n').find(s=>s.startsWith('let '+name+'=')||s.startsWith('const '+name+'='));
 assert(line,'Missing generated registry: '+name);
 return JSON.parse(line.slice(line.indexOf('=')+1).replace(/;\s*$/,''));
}
const event=getTable('events').find(x=>x.id==='H045');
const card=getTable('sourceCardsV86').H045;
const archaeology=getTable('archaeologyCasesV818').find(x=>x.id==='A01');
const originals=JSON.stringify({event,card,archaeology});
assert(event&&card&&archaeology);
const post=assembleResearchObject('post',{
 id:event.id,title:event.title,
 sourceLayers:[{id:'sourceCardsV86',fields:card}],
 baseTime:{origin:'data/data.generated.js:events',timeType:'historical-event',
  start:event.start,end:event.end,certainty:event.evidence},
 reviewStatus:null // Legacy reviewed boolean does not justify an overall research sign-off.
});
assert.equal(post.kind,'post');assert.equal(post.id,'H045');
assert.equal(post.temporal.event.selected.start,-853);
assert.equal(post.reviewStatus,null);
assert.equal(post.data.fields.summary.selected.origin,'sourceCardsV86');
assert(post.references.some(r=>r.sourceId.startsWith('source:https://')&&r.origin==='sourceCardsV86'));
assert(post.references.some(r=>r.url.includes('britishmuseum.org')));
const code=fs.readFileSync('v889-research-tracks.js','utf8');
const split=code.indexOf('function section(t){');assert(split>0);
const globals={window:{}};
vm.runInNewContext(code.slice(0,split)+'window.__testTracks=tracks;})();',globals,{timeout:1000});
const track=globals.window.__testTracks.find(x=>x.key==='good');
assert(track);
const topic=assembleResearchObject('topic',{
 key:track.key,label:track.heading,description:track.intro,
 sections:track.sections.map(x=>({...x,origin:'v889-research-tracks.js'})),
 relations:track.links.map(x=>({to:x.id,relationType:'links-post',rationale:x.label,origin:'v889-research-tracks.js'})),
 references:track.sources.map(x=>({...x,origin:'v889-research-tracks.js'})),
 reviewStatus:'draft'
});
assert.equal(topic.kind,'topic');assert.equal(topic.id,'topic:good');
assert.equal(topic.temporal,null);assert.equal(topic.title,'Är Gud god?');
assert(topic.references.every(r=>r.sourceId.startsWith('source:https://')));
assert.equal(topic.relations.length,2);
const ref=archaeology.sources[0];
const source=assembleResearchObject('source',{
 title:ref.name,url:ref.url,sourceKind:ref.type,
 provenance:'data/data.generated.js:archaeologyCasesV818.A01.sources',
 uses:[{targetId:'archaeology-case:A01',supports:ref.supports}]
});
assert.equal(source.kind,'source');
assert.equal(source.temporal,null);
assert.equal(source.references[0].sourceId,source.id);
assert.equal(source.data.independentlyVerified,false);
assert.equal(source.relations[0].relationType,'cited-by');
assert.equal(source.relations[0].rationale,ref.supports);
for(const x of [post,topic,source])for(const field of ['id','kind','title','reviewStatus','temporal','relations','references','data']){
 assert(Object.hasOwn(x,field),'Common field missing: '+x.kind+'.'+field);
}
assert(Object.isFrozen(post));assert(Object.isFrozen(topic));assert(Object.isFrozen(source));
assert.equal(JSON.stringify({event,card,archaeology}),originals,'Inputs must not mutate');
assert.throws(()=>assembleResearchObject('alien',{}),/Unknown/);
assert.throws(()=>assembleResearchObject('post',{id:'H045'}),/title missing/);
console.log('F3 unified research consumer: PASS (H045 post, topic:good, Amarna source; fields and URL provenance retained)');
