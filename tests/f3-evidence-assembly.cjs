'use strict';
// F3 non-production research-evidence assembly: consumes explicitly identified inputs.
const {resolveField,resolveTemporal}=require('./f3-provenance-core.cjs');
const allowedFields=['summary','context','impact','limits'];
function assembleEvidence({id,kind='post',sourceLayers=[],baseTime=null,datingPhases=[],significance=null,significanceOrigin=null}){
 if(typeof id!=='string'||!/^[A-Z]{1,2}[0-9]{3,6}$/.test(id))throw new TypeError('Invalid canonical ID');
 if(!Array.isArray(sourceLayers)||!Array.isArray(datingPhases))throw new TypeError('Invalid source inputs');
 const fields={};for(const field of allowedFields)fields[field]=resolveField(field,sourceLayers);
 const timeClaims=[];
 if(baseTime&&Number.isFinite(baseTime.start)&&Number.isFinite(baseTime.end)){
  timeClaims.push({origin:baseTime.origin||'post',timeType:baseTime.timeType||'legacy-unspecified',
   start:baseTime.start,end:baseTime.end,certainty:baseTime.certainty||null,rationale:baseTime.rationale||null});
 }
 for(const phase of datingPhases){
  if(phase&&Number.isFinite(phase.start)&&Number.isFinite(phase.end))
   timeClaims.push({origin:phase.origin||'c7-dating',timeType:phase.timeType||'unspecified',
    start:phase.start,end:phase.end,certainty:phase.evidence||null,rationale:phase.reason||null});
 }
 const religion=significance&&typeof significance.paragraph==='string'?
  Object.freeze({value:significance.paragraph,level:significance.level||null,
   origin:significanceOrigin||'c7-significance',sources:Object.freeze(Array.isArray(significance.sources)?significance.sources.slice():[])})
  :null;
 return Object.freeze({id,kind,fields:Object.freeze(fields),temporal:resolveTemporal(timeClaims),religion,
  temporalOriginals:Object.freeze(timeClaims.map(x=>Object.freeze({...x})))});
}
module.exports={assembleEvidence};
