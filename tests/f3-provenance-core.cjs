'use strict';
// F3 experiment only. Not referenced from index.html or production JavaScript.
const valid=v=>typeof v==='string'&&v.trim()?v.trim():null;
function resolveField(field,layers,policy={}){
 if(typeof field!=='string'||!/^[a-zA-Z][a-zA-Z0-9]*$/.test(field))throw new TypeError('Invalid field');
 if(!Array.isArray(layers))throw new TypeError('Layers must be an array');
 const candidates=[];
 for(const layer of layers){
  if(!layer||typeof layer.id!=='string'||!layer.id.trim()||!layer.fields||typeof layer.fields!=='object')continue;
  const value=valid(layer.fields[field]);if(value===null)continue;
  candidates.push(Object.freeze({value,origin:layer.id,originalField:field,reviewState:valid(layer.reviewState)||null}));
 }
 const variants=[...new Set(candidates.map(x=>x.value))];
 const conflict=variants.length>1;
 let selected=null;
 if(variants.length===1)selected=candidates[0];
 else if(conflict&&Array.isArray(policy.preferOrigins)){
  for(const origin of policy.preferOrigins){const found=candidates.find(x=>x.origin===origin);if(found){selected=found;break}}
 }
 return Object.freeze({field,selected,conflict,alternatives:Object.freeze(candidates)});
}
function resolveRecord(id,layers,rules={},fields=['summary','context','impact','limits']){
 if(typeof id!=='string'||!id.trim())throw new TypeError('Invalid ID');
 if(!Array.isArray(fields)||!Array.isArray(layers))throw new TypeError('Invalid collections');
 const result={};
 for(const field of fields)result[field]=resolveField(field,layers,rules[field]);
 return Object.freeze({id,fields:Object.freeze(result)});
}
module.exports={resolveField,resolveRecord};

const timeKinds=Object.freeze(['event','composition','narrative','material-witness']);
function resolveTemporal(entries,rules={}){
 if(!Array.isArray(entries))throw new TypeError('Temporal entries must be an array');
 const results={};
 for(const kind of timeKinds){
  const group=entries.filter(e=>e&&e.timeType===kind&&typeof e.origin==='string'
   &&Number.isFinite(e.start)&&Number.isFinite(e.end)&&e.start<=e.end);
  const candidates=group.map(e=>Object.freeze({origin:e.origin,timeType:kind,start:e.start,end:e.end,
   certainty:valid(e.certainty),rationale:valid(e.rationale)}));
  const distinct=[...new Set(candidates.map(e=>e.start+':'+e.end))];
  const conflict=distinct.length>1;
  let selected=distinct.length===1?candidates[0]:null;
  if(conflict&&Array.isArray(rules[kind]?.preferOrigins))
   for(const origin of rules[kind].preferOrigins){const match=candidates.find(e=>e.origin===origin);
    if(match){selected=match;break}}
  results[kind]=Object.freeze({selected,conflict,alternatives:Object.freeze(candidates)});
 }
 return Object.freeze(results);
}
module.exports.resolveTemporal=resolveTemporal;

/* Field rules are deliberately narrow: scoped by post ID, semantic field and
 * declared source layer. Unspecified fields remain unresolved when conflicting. */
function resolveScopedField(postId,field,layers,decisions=[]){
 const rules=decisions.filter(d=>d&&d.postId===postId&&d.field===field&&typeof d.preferOrigin==='string'&&valid(d.rationale));
 if(rules.length>1)throw new Error('Ambiguous field decisions');
 const rule=rules[0];
 const result=resolveField(field,layers,rule?{preferOrigins:[rule.preferOrigin]}:{});
 if(rule&&result.conflict&&!result.alternatives.some(c=>c.origin===rule.preferOrigin))
  return Object.freeze({...result,selected:null,decision:'missing-origin',rationale:rule.rationale});
 return Object.freeze({...result,decision:rule?'explicit':'unresolved',rationale:rule?.rationale||null});
}
module.exports.resolveScopedField=resolveScopedField;
