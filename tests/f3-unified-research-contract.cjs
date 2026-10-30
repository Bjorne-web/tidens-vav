'use strict';
// F3-only common reader contract. No runtime/DOM integration or data mutation.
// Existing specific contracts remain authoritative for their respective payloads.
const {assembleEvidence}=require('./f3-evidence-assembly.cjs');
const {assembleTopic,assembleSource}=require('./f3-topic-source-contract.cjs');
function nonempty(v){return typeof v==='string'&&v.trim()?v.trim():null}
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
  references:Object.freeze(data.references||(data.url?[Object.freeze({url:data.url,origin:data.provenance||null})]:[])),
  data
 };
 // C7 information remains in post data.religion, including its own origin.
 // No inferred dates or adjudicated evidential truth are introduced.
 return Object.freeze(obj);
}
module.exports={assembleResearchObject};
