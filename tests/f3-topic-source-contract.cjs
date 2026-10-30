'use strict';
// F3-only, immutable topic/source/reference contracts over caller-supplied real registries.
// No browser globals, DOM changes, database writes, or claims of source verification.
const text=v=>typeof v==='string'&&v.trim()?v.trim():null;
function urlRef(input){
 if(!text(input))return null;
 try{const u=new URL(input);return /^(https?):$/.test(u.protocol)?u.href:null}catch{return null}
}
function stableTopicId(key){
 if(!text(key)||!/^[a-z][a-z0-9-]{0,100}$/.test(key))throw new TypeError('Invalid existing topic key');
 return 'topic:'+key;
}
function assembleTopic({key,label,description=null,sections=[],relations=[],references=[],reviewStatus=null}){
 if(!text(label)||!Array.isArray(sections)||!Array.isArray(relations)||!Array.isArray(references))throw new TypeError('Invalid topic content');
 const id=stableTopicId(key);
 const parts=sections.map(s=>{
  if(!s||!text(s.title)||!text(s.body))throw new TypeError('Invalid topic section');
  return Object.freeze({title:text(s.title),body:text(s.body),origin:text(s.origin)||null});
 });
 const links=relations.map(r=>assembleRelation({...r,from:id}));
 const citations=references.map(ref=>{
  const u=urlRef(ref?.url);if(!u)throw new TypeError('Invalid topic reference URL');
  return Object.freeze({sourceId:'source:'+u,url:u,title:text(ref.title||ref.name)||null,origin:text(ref.origin)||null});
 });
 // The topic itself is not a historical event. Dated sub-events remain linked objects.
 return Object.freeze({id,kind:'topic',label:text(label),description:text(description),
  temporal:null,reviewStatus:text(reviewStatus),sections:Object.freeze(parts),
  relations:Object.freeze(links),references:Object.freeze(citations)});
}
function assembleRelation({from,to,relationType,rationale=null,evidence=null,origin=null}){
 if(!text(from)||!text(to)||!text(relationType))throw new TypeError('Incomplete relation');
 const evidenceList=Array.isArray(evidence)?evidence: [];
 return Object.freeze({from,to,relationType,rationale:text(rationale),
  evidence:Object.freeze(evidenceList.map(x=>text(x)).filter(Boolean)),origin:text(origin)});
}
function assembleSource({url,title,sourceKind='unclassified',reviewStatus=null,provenance=null,uses=[]}){
 const u=urlRef(url);
 if(!u||!text(title)||!Array.isArray(uses))throw new TypeError('Invalid source record');
 const id='source:'+u;
 const relationships=uses.map(x=>{
  if(!x||!text(x.targetId)||!text(x.supports))throw new TypeError('Incomplete source usage');
  return assembleRelation({from:id,to:x.targetId,relationType:'cited-by',
   rationale:x.supports,origin:x.origin||null,evidence:x.evidence||[]});
 });
 return Object.freeze({id,kind:'source',title:text(title),url:u,
  sourceKind:text(sourceKind)||'unclassified',
  reviewStatus:text(reviewStatus),provenance:text(provenance),
  temporal:null,relations:Object.freeze(relationships),
  // A link or source description is never proof that a historical claim is true.
  independentlyVerified:false});
}
module.exports={urlRef,stableTopicId,assembleTopic,assembleSource,assembleRelation};
