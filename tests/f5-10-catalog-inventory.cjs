'use strict';
// F5.10: inventory and render real historical/biblical/apocryphal records.
// This is a catalog COMPATIBILITY audit, not a scholarly review or release.
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const assert=require('node:assert/strict');
const {assembleResearchObject}=require('./f3-unified-research-contract.cjs');
const {renderFullReader}=require('./f4-reader-renderer.cjs');
function table(name){
 const text=fs.readFileSync('data/data.generated.js','utf8');
 const line=text.split('\n').find(x=>x.startsWith('let '+name+'=')||x.startsWith('const '+name+'='));
 assert(line,'Registry missing '+name);
 return JSON.parse(line.slice(line.indexOf('=')+1).replace(/;\s*$/,''));
}
const globals={window:{}};
for(const file of ['data/bible-books-v857.js','data/apocrypha-books-v891.js']){
 vm.runInNewContext(fs.readFileSync(file,'utf8'),globals,{filename:file,timeout:2000});
}
const sources=[
 {name:'Historical events',origin:'events',records:table('events'),kind:'history',time:'historical-event'},
 {name:'Original historical/religious entries',origin:'originalEvents',records:table('originalEvents'),kind:'religion',time:'legacy-unspecified'},
 {name:'Bible books',origin:'TIDENS_BIBLE_BOOKS',records:globals.window.TIDENS_BIBLE_BOOKS,kind:'bible',time:'text-composition'},
 {name:'Deuterocanonical books',origin:'TIDENS_APOCRYPHA_BOOKS',records:globals.window.TIDENS_APOCRYPHA_BOOKS,kind:'bible',time:'text-composition'}
];
const cards=table('sourceCardsV86'),research=table('allOriginalResearchV828');
const errors=[],duplicateIds=[],seen=new Set(),catalog=[],stats={};
function select(item,origin){
 const layers=[];
 if(cards[item.id])layers.push({id:'sourceCardsV86',fields:cards[item.id]});
 if(research[item.id])layers.push({id:'allOriginalResearchV828',fields:research[item.id]});
 // Original book registers use "critical"; historical events use "description".
 // These are existing text fields, not fabricated research summaries.
 const alias=typeof item.critical==='string'&&item.critical.trim()?'critical':
  typeof item.description==='string'&&item.description.trim()?'description':null;
 if(alias)layers.push({id:origin+'.'+item.id+'.'+alias+' (sammanfattningsalias)',
   fields:{summary:item[alias]}});
 layers.push({id:origin,fields:item});
 return layers;
}
for(const group of sources){
 stats[group.origin]={count:group.records.length,rendered:0,dated:0,typedDates:0,sourceLinks:0,withoutExplicitSources:0,
  missingResearchSummary:0};
 for(const item of group.records){
  if(!item||!item.id||!item.title){errors.push('Missing title/id in '+group.origin);continue}
  if(seen.has(item.id)){duplicateIds.push(item.id);continue}seen.add(item.id);
  try{
   const layers=select(item,group.origin);
   const hasDates=Number.isFinite(item.start)&&Number.isFinite(item.end);
   const entity=assembleResearchObject('post',{
    id:item.id,title:item.title,reviewStatus:item.reviewStatus,
    baseTime:hasDates?{start:item.start,end:item.end,timeType:group.time,origin:group.origin,
      certainty:item.evidence,rationale:item.dating||item.dateType}:null,
    sourceLayers:layers});
   const record={entity,category:group.kind,
    description:typeof item.description==='string'?item.description:typeof item.critical==='string'?item.critical:undefined,
    overviewOrigin:group.origin+'.'+item.id+'.'+(item.description?'description':'critical'),
    narrative:typeof item.narrativeTime==='string'?item.narrativeTime:undefined,
    genre:item.genre,traditionAttribution:item.attributed,dateBasis:item.dateType,
    canon:item.canon,sourceNote:item.dating,sourceNotes:Array.isArray(item.sources)?item.sources:[],
    relatedIds:item.related?[item.related]:[]};
   const html=renderFullReader(record);
   assert(html.includes('data-record="'+item.id+'"')&&html.includes('Källor och ursprung'),
    'Reader missing actual ID / sources');
   assert(html.includes(item.title.replace(/&/g,'&amp;').replace(/</g,'&lt;')),
    'Reader missing actual title');
   stats[group.origin].rendered++;
   if(hasDates)stats[group.origin].dated++;
   if(hasDates&&group.time!=='legacy-unspecified')stats[group.origin].typedDates++;
   if(entity.references.some(x=>/^https?:\/\//.test(x.url)))stats[group.origin].sourceLinks++;
   else stats[group.origin].withoutExplicitSources++;
   if(!Object.values(entity.data.fields||{}).some(x=>x?.selected?.value))stats[group.origin].missingResearchSummary++;
   catalog.push({id:item.id,title:item.title,group:group.origin,category:group.kind,
    hasDates,typedDate:hasDates&&group.time!=='legacy-unspecified',
    sourceCount:entity.references.length,
    hasResearchText:Object.values(entity.data.fields||{}).some(x=>x?.selected?.value),
    html});
  }catch(e){errors.push(group.origin+'/'+item.id+': '+e.message)}
 }
}
const folder='out/f5-10';fs.mkdirSync(folder,{recursive:true});
const inventory={purpose:'F5.10 – compatibility audit only; not a claim of scientific accuracy',
 total:catalog.length,uniqueCount:seen.size,groups:stats,errors,duplicateIds,
 limitations:[
 'C7 dating/significance layers are not yet joined to ALL generic corpus entries',
 'Original events retain unclassified legacy dates; not converted to composition dates',
 'Cataloguing and rendering do not establish historical or scientific source verification',
 'Topic/source objects need separate catalogs and approved canonical URLs',
 'Special research objects outside these four registers are NOT counted'
 ]};
fs.writeFileSync(path.join(folder,'catalog-inventory.json'),JSON.stringify(inventory,null,2)+'\n','utf8');
fs.writeFileSync(path.join(folder,'catalog-all-items.json'),
 JSON.stringify(catalog.map(({html,...data})=>data),null,2)+'\n','utf8');
const perGroup=['events','originalEvents','TIDENS_BIBLE_BOOKS','TIDENS_APOCRYPHA_BOOKS'];
const picks=perGroup.flatMap(group=>{
 const items=catalog.filter(x=>x.group===group),n=group==='TIDENS_APOCRYPHA_BOOKS'?items.length:12;
 const ix=[...new Set(Array.from({length:n},(_,i)=>Math.floor(i*(items.length-1)/Math.max(1,n-1))))];
 return ix.map(i=>items[i]);
});
fs.writeFileSync(path.join(folder,'browser-samples.json'),
 JSON.stringify(picks.map(({html,...x})=>x),null,2)+'\n');
fs.writeFileSync(path.join(folder,'browser-articles.js'),
 'window.__F510AdditionalArticles='+JSON.stringify(Object.fromEntries(picks.map(x=>[x.id,x.html])))+';\n');
assert.equal(errors.length,0,'Corpus rendering failed: '+errors.slice(0,5).join('; '));
assert.equal(duplicateIds.length,0,'Duplicate canonical IDs: '+duplicateIds.join(','));
assert(catalog.length>=250,'Expected much larger real source corpus, missing records');
assert(picks.length>=45,'Insufficient broad browser sample');
console.log('F5.10 full corpus:',catalog.length,'real post records; browser sample:',picks.length);
for(const [k,v] of Object.entries(stats))console.log('F5.10',k,JSON.stringify(v));
console.log('F5.10 missing source links:',
 Object.values(stats).reduce((n,v)=>n+v.withoutExplicitSources,0),
 '; source completeness is NOT a release pass.');
module.exports={catalog,inventory,picks};
