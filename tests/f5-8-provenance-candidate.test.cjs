'use strict';
// F5.8 – compare real v897 and a narrowly patched, unpublished candidate.
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const child=require('node:child_process');
child.execFileSync(process.execPath,['tests/f5-8-generate-provenance-candidate.cjs'],{stdio:'inherit'});
const current=fs.readFileSync('v897-research-read-model.js','utf8');
const candidate=fs.readFileSync('out/f5/candidate/v897-provenance-candidate.js','utf8');
function load(source){
 const records={
  H045:{id:'H045',title:'Ahab och Qarqar',start:-853,end:-853,reviewStatus:'preliminary'},
  H050:{id:'H050',title:'Exempel med enbart originalfält',summary:'Original sammanfattning',impact:'Original betydelse',start:100,end:110},
  B001:{id:'B001',title:'Första Moseboken',critical:'Berättad och tillkomsttid skiljs'},
  D001:{id:'D001',title:'Tobit',critical:'Tobit är en skrift'}
 };
 const sourceCardsV86={H045:{overview:'Registeröversikt H045',parallels:'Jämförelser i källmaterial',
  sources:[{name:'Källa A',url:'https://example.org/a'}]}};
 const sourceCardsV810={H045:{impact:'Registrerad påverkan',
  sources:[{name:'Källa A duplicerad',url:'https://example.org/a'},{name:'Källa B',url:'https://example.org/b'}]}};
 const sourceCardsV87={H045:{caution:'Forskningens begränsning'}};
 const window={
  sourceCardsV86,sourceCardsV810,sourceCardsV87,
  TIDENS_BIBLE_BOOKS:[records.B001],
  TIDENS_APOCRYPHA_BOOKS:[records.D001],
  TIDENS_C7_RELIGION:{B001:{level:'Tillägg',paragraph:'Betydelse för religiös historia'}}
 };
 const ctx={window,URL,idEvent:id=>records[id]||null};
 vm.runInNewContext(source,ctx,{filename:'v897 isolated',timeout:1500});
 return window.TidensResearchReadModel;
}
const before=load(current),after=load(candidate);
for(const id of ['H045','H050','B001','D001']){
 const a=before.get(id),b=after.get(id);
 assert(a&&b,'Original and candidate must return '+id);
 for(const field of ['id','kind','title','summary','context','impact','limits','subtype','dateType','reviewStatus']){
  assert.equal(b[field],a[field],id+': '+field+' content must remain unchanged');
 }
 assert.deepEqual(Array.from(b.sources,x=>x.url),Array.from(a.sources,x=>x.url),
  id+': source set and deduplication must not change');
 assert.deepEqual(Array.from(b.sourceLayers),Array.from(a.sourceLayers),id+': source layers unchanged');
 assert.equal(b.temporal.start,a.temporal.start);
 assert.equal(b.temporal.end,a.temporal.end);
 assert.equal(b.narrativeTime,a.narrativeTime);
 assert.equal(b.critical,a.critical);
}
const originalH=before.get('H045'),fixedH=after.get('H045');
assert.equal(Object.keys(originalH.provenance).length,0,'Reproduce original v897 freeze-order defect');
const values=Object.fromEntries(Object.entries(fixedH.provenance).map(([k,v])=>[k,{layer:v.layer,field:v.field}]));
assert.deepEqual(values,{
 summary:{layer:'sourceV86',field:'overview'},
 context:{layer:'sourceV86',field:'parallels'},
 impact:{layer:'sourceV810',field:'impact'},
 limits:{layer:'sourceV87',field:'caution'}
},'Every selected field must point to its actual layer and alias');
assert(Object.isFrozen(fixedH.provenance),'Fixed provenance cannot be mutated');
assert(Object.isFrozen(fixedH),'Reader snapshot remains immutable');
assert.equal(fixedH.sources.length,2,'Source deduplication must remain intact');
const fallback=after.get('H050');
assert.equal(fallback.provenance.summary.layer,'post');
assert.equal(fallback.provenance.summary.field,'summary');
assert.equal(fallback.provenance.impact.layer,'post');
assert.equal(after.get('B001').subtype,'bible-book');
assert.equal(after.get('D001').subtype,'apocrypha-book');
assert.equal(after.get('B001').religion.level,'Tillägg');
assert.equal(after.get('NOPE'),null);
assert.equal(after.has('BAD/URL'),false);
assert.equal(after.version,before.version,'Do not change published read-model version in source candidate');
console.log('F5.8 v897 provenance candidate: PASS – 4 exact field origins restored; values, source links, dating and subtypes unchanged.');
