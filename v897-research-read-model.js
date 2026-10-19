/* Tidens väv – read-only research model pilot. No DOM mutation, no automatic UI changes.
   Schema is an adapter view over existing content, not a new source of truth. */
(function(){
'use strict';
const own=(o,k)=>o&&Object.prototype.hasOwnProperty.call(o,k);
const text=v=>typeof v==='string'&&v.trim()?v.trim():null;
const safeUrl=v=>{try{const u=new URL(String(v));return /^(https?):$/.test(u.protocol)?u.href:null}catch(_){return null}};
const maybe=(name,id)=>{try{const obj=window[name]||(name==='allOriginalResearchV828'&&typeof allOriginalResearchV828!=='undefined'?allOriginalResearchV828:null)||(name==='v82Library'&&typeof v82Library!=='undefined'?v82Library:null)||(name==='research'&&typeof research!=='undefined'?research:null)||(name==='sourceCardsV86'&&typeof sourceCardsV86!=='undefined'?sourceCardsV86:null)||(name==='sourceCardsV87'&&typeof sourceCardsV87!=='undefined'?sourceCardsV87:null)||(name==='sourceCardsV810'&&typeof sourceCardsV810!=='undefined'?sourceCardsV810:null);return obj&&own(obj,id)?obj[id]:null}catch(_){return null}};
function rawPost(id){
  if(typeof id!=='string'||!/^(?:[A-Z][0-9]{3,6}|AP[0-9]{3})$/.test(id))return null;
  let e=null;
  try{if(typeof idEvent==='function')e=idEvent(id)}catch(_){}
  if(!e){for(const name of ['TIDENS_BIBLE_BOOKS','TIDENS_APOCRYPHA_BOOKS']){
    const all=window[name];if(Array.isArray(all)){e=all.find(x=>x&&x.id===id);if(e)break}
  }}
  return e||null;
}
const fields=[
  ['special','TIDENS_SPECIAL_RESEARCH'],['original','allOriginalResearchV828'],
  ['sourceV86','sourceCardsV86'],['sourceV810','sourceCardsV810'],
  ['sourceV87','sourceCardsV87'],['library','v82Library'],
  ['research','research']
];
function get(id){
 const e=rawPost(id);if(!e)return null;
 const layers=fields.map(([label,key])=>({label,record:maybe(key,id)})).filter(x=>x.record&&typeof x.record==='object');
 const provenance={};
 function pick(key,aliases=[]){
  for(const layer of layers){for(const field of [key,...aliases]){const v=text(layer.record[field]);if(v){provenance[key]={layer:layer.label,field};return v}}}
  for(const field of [key,...aliases]){const v=text(e[field]);if(v){provenance[key]={layer:'post',field};return v}}
  return null;
 }
 const sources=[],seen=new Set();
 for(const {label,record} of [...layers,{label:'post',record:e}]){
  if(Array.isArray(record.sources))for(const s of record.sources){
   const url=safeUrl(Array.isArray(s)?s[1]:s&&typeof s==='object'?(s.url||s.sourceUrl):null);
   if(!url||seen.has(url))continue;
   seen.add(url);sources.push(Object.freeze({title:text(Array.isArray(s)?s[0]:s.name||s.title)||'Källa',url,origin:label}));
  }
  if(label==='post')for(const [field,title] of [['source','Postens registrerade källänk'],['primary','Primärtext']]){const url=safeUrl(e[field]);if(url&&!seen.has(url)){seen.add(url);sources.push(Object.freeze({title,url,origin:'post'}))}}
 }
 const religion=maybe('TIDENS_C7_RELIGION',id)||maybe('TIDENS_SPECIAL_RESEARCH',id)?.religion||null;
 const isBible=Array.isArray(window.TIDENS_BIBLE_BOOKS)&&window.TIDENS_BIBLE_BOOKS.some(x=>x.id===id);
 const isApocrypha=Array.isArray(window.TIDENS_APOCRYPHA_BOOKS)&&window.TIDENS_APOCRYPHA_BOOKS.some(x=>x.id===id);
 const postProvenance=Object.freeze({...provenance});
 const snapshot={
  id,kind:'post',title:text(e.title)||id,
  summary:pick('summary',['overview','description','sub','critical']),
  context:pick('context',['parallels']),
  impact:pick('impact'),
  limits:pick('limits',['caution']),
  religion:religion&&typeof religion==='object'?Object.freeze({...religion}):text(religion),
  temporal:Object.freeze({start:typeof e.start==='number'?e.start:null,end:typeof e.end==='number'?e.end:null}),
  sources:Object.freeze(sources),provenance:postProvenance,
  sourceLayers:Object.freeze(layers.map(x=>x.label)),
  subtype:isApocrypha?'apocrypha-book':isBible?'bible-book':'historical',
  dateType:text(e.dateType),narrativeTime:text(e.narrativeTime),
  reviewStatus:text(e.reviewStatus),critical:text(e.critical)
 };
 return Object.freeze(snapshot);
}
function diagnose(ids){
 const entries=Array.isArray(ids)?ids:['H005','B001','D001','AP001'];
 return Object.freeze(entries.map(id=>{const x=get(id);return Object.freeze({id,found:!!x,subtype:x?.subtype||null,hasSummary:!!x?.summary,hasSources:!!x?.sources.length,sourceLayers:x?.sourceLayers||[],hasDateType:!!x?.dateType})}));
}
window.TidensResearchReadModel=Object.freeze({version:'pilot-3',get,has:id=>!!rawPost(id),diagnose});
})();
