'use strict';
const assert=require('node:assert/strict');
const {reportRows,latestDating}=require('./f5-11-c7-source-inventory.cjs');
const {assembleResearchObject}=require('./f3-unified-research-contract.cjs');
const {renderFullReader}=require('./f4-reader-renderer.cjs');
const {renderUndatedReason}=require('./f5-12-undated-reader-candidate.cjs');
let candidateCount=0,missingBaseline=0;
const shown=[];
for(const row of reportRows){
 const entry=latestDating[row.id]?.entry;
 if(!entry||!Array.isArray(entry.phases)||entry.phases.length!==0||typeof entry.undated!=='string'||!entry.undated.trim())continue;
 const model=assembleResearchObject('post',{id:row.id,title:row.title||row.id,sourceLayers:[{id:'f5-12-fixture',fields:{summary:'Kandidat för separat granskning'}}]});
 const html=renderFullReader({entity:model,category:'history'});
 if(!html.includes(entry.undated))missingBaseline++;
 const candidate=renderUndatedReason(html,row.id,entry.undated,latestDating[row.id].file);
 assert(candidate.includes('Varför säker datering saknas'),row.id);
 assert(candidate.includes('c7-undated-reason'),row.id);
 assert(candidate.includes(latestDating[row.id].file),row.id);
 // Exact source text must be displayed, but HTML-escaped to defend the UI.
 assert(candidate.includes(entry.undated.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;')),row.id);
 assert(!candidate.includes('undefined'),row.id);
 shown.push(row.id);candidateCount++;
}
assert(candidateCount>0,'No C7 undated candidate records found');
const example=reportRows.find(x=>latestDating[x.id]?.entry?.undated);
if(example){
 const model=assembleResearchObject('post',{id:'H999',title:'HTML escaping',sourceLayers:[]});
 const html=renderFullReader({entity:model,category:'history'});
 const output=renderUndatedReason(html,'H999','<script>unsafe</script> & literal','testing');
 assert(output.includes('&lt;script&gt;unsafe&lt;/script&gt; &amp; literal'));
 assert(!output.includes('<script>unsafe</script>'));
}
console.log('F5.12 undated display candidate:',candidateCount,'records, baseline missing:',missingBaseline);
console.log('Candidate record IDs:',shown.join(', '));
