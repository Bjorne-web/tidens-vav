'use strict';
// F3-only common reader contract. No runtime/DOM integration or data mutation.
// Existing specific contracts remain authoritative for their respective payloads.
const {assembleEvidence}=require('./f3-evidence-assembly.cjs');
const {assembleTopic,assembleSource,urlRef}=require('./f3-topic-source-contract.cjs');
function nonempty(v){return typeof v==='string'&&v.trim()?v.trim():null}
function postReferences(input){
 const all=[];
 const append=(raw,origin)=>{
  const entries=Array.isArray(raw)?raw:raw?[raw]:[];
  for(const ref of entries){
   const candidate=Array.isArray(ref)?{title:ref[0],url:ref[1]}:
     typeof ref==='string'?{url:ref}:ref;
   if(!candidate||typeof candidate!=='object')continue;
   const url=urlRef(candidate.url||candidate.sourceUrl);
   if(!url)continue;
   all.push(Object.freeze({sourceId:'source:'+url,url,
    title:nonempty(candidate.title||candidate.name),origin:origin||null}));
  }
 };
 for(const layer of input.sourceLayers||[]){
  if(!layer||!layer.fields)continue;
  append(layer.fields.sources,layer.id);
  append(layer.fields.source,layer.id);
  append(layer.fields.primary,layer.id);
 }
 append(input.significance?.sources,input.significanceOrigin||'c7-significance');
 append(input.references,'explicit');
 const seen=new Set();
 return Object.freeze(all.filter(x=>{const k=String(x.origin)+'|'+x.url;if(seen.has(k))return false;seen.add(k);return true}));
}
function assembleResearchObject(kind,input){
 if(!input||typeof input!=='object')throw new TypeError('Research input required');
 if(!['post','topic','source'].includes(kind))throw new TypeError('Unknown research kind');
 const data=kind==='post'?assembleEvidence({...input,kind:'post'})
  :kind==='topic'?assembleTopic(input):assembleSource(input);
 const title=kind==='topic'?data.label:kind==='source'?data.title:nonempty(input.title);
 if(!title)throw new TypeError('Research title missing');
 const reviewStatus=kind==='post'?nonempty(input.reviewStatus):
  data.reviewStatus;
 const obj={
  id:data.id,kind,title,reviewStatus:reviewStatus||null,
  temporal:data.temporal,relations:Object.freeze(data.relations||[]),
  references:kind==='post'?postReferences(input):
    kind==='topic'?data.references:
      Object.freeze([Object.freeze({sourceId:data.id,url:data.url,origin:data.provenance||null,title:data.title})]),
  data
 };
 // C7 information remains in post data.religion, including its own origin.
 // No inferred dates or adjudicated evidential truth are introduced.
 return Object.freeze(obj);
}
module.exports={assembleResearchObject};
