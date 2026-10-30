'use strict';
// F3 production-independent integration of actual source data, no UI mutation.
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const {assembleEvidence}=require('./f3-evidence-assembly.cjs');
const txt=fs.readFileSync('data/data.generated.js','utf8');
function generated(name){
 const line=txt.split('\n').find(s=>s.startsWith('const '+name+'=')||s.startsWith('let '+name+'='));
 assert(line,'Missing generated registry '+name);
 return JSON.parse(line.slice(line.indexOf('=')+1).replace(/;\s*$/,''));
}
const originals=generated('originalEvents'),originalResearch=generated('allOriginalResearchV828');
const context=vm.createContext({window:{}});
for(const path of ['data/bible-books-v857.js','data/c7-religionshistorisk-betydelse.v890.js',
 'data/c7-dating-o067-gilgamesh.js','data/special-research.v840.js'])
 vm.runInContext(fs.readFileSync(path,'utf8'),context,{filename:path,timeout:2000});
const O067=originals.find(p=>p.id==='O067');
assert(O067);
const epic=assembleEvidence({
 id:'O067',sourceLayers:[{id:'allOriginalResearchV828',fields:originalResearch.O067}],
 baseTime:{start:O067.start,end:O067.end,origin:'originalEvents',timeType:'legacy-unspecified',
  certainty:'unreviewed',rationale:O067.dating},
 datingPhases:context.window.TIDENS_C7_DATING_GILGAMESH.O067.phases.map(p=>({...p,origin:'data/c7-dating-o067-gilgamesh.js'}))
});
assert.equal(epic.temporal['material-witness'].selected.start,-700);
assert.equal(epic.temporal['material-witness'].selected.end,-601);
assert.equal(epic.temporal['material-witness'].selected.origin,'data/c7-dating-o067-gilgamesh.js');
assert.equal(epic.temporal.unclassified.length,1);
assert.equal(epic.temporal.unclassified[0].sourceTimeType,'legacy-unspecified');
assert.equal(epic.temporalOriginals[0].start,-2100,'Unreviewed original time remains accessible');
const genesis=context.window.TIDENS_BIBLE_BOOKS.find(x=>x.id==='B001');
assert(genesis);
const genesisView=assembleEvidence({
 id:'B001',sourceLayers:[{id:'data/bible-books-v857.js',fields:{summary:genesis.critical}}],
 baseTime:{origin:'data/bible-books-v857.js',timeType:'text-composition',
  start:genesis.start,end:genesis.end,certainty:genesis.reviewStatus},
 significance:context.window.TIDENS_C7_RELIGION.B001,
 significanceOrigin:'data/c7-religionshistorisk-betydelse.v890.js'
});
assert.equal(genesisView.temporal.composition.selected.start,-650);
assert.equal(genesisView.temporal.composition.selected.certainty,'preliminary');
assert.equal(genesisView.religion.origin,'data/c7-religionshistorisk-betydelse.v890.js');
assert(genesisView.religion.value.includes('Första Moseboken'));
const zoro=assembleEvidence({
 id:'O030',
 sourceLayers:[
  {id:'allOriginalResearchV828',fields:originalResearch.O030},
  {id:'TIDENS_SPECIAL_RESEARCH',fields:context.window.TIDENS_SPECIAL_RESEARCH.O030}
 ]
});
assert.equal(zoro.fields.summary.conflict,true);
assert.equal(zoro.fields.summary.selected,null,'Conflict unresolved without explicit decision');
assert.deepEqual(zoro.fields.summary.alternatives.map(x=>x.origin),
 ['allOriginalResearchV828','TIDENS_SPECIAL_RESEARCH']);
console.log('F3 evidence assembly: PASS (O067 unknown original + dated manuscript; B001 C7 source; O030 competing summaries)');
