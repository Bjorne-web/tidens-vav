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
