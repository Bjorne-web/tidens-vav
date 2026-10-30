(function(){
'use strict';
// F5.8 probe runs ONLY in an unpublished copy of the full application HTML
// with the candidate v897 file substituted for the original script.
function verify(){
 const ids=['H045','B001','D001','O067','H005','AP001'];
 const checks=[];
 const model=window.TidensResearchReadModel;
 for(const id of ids){
  const item=model?.get?.(id);
  if(!item){checks.push({id,available:false,fields:0,withOrigin:0});continue}
  const populated=['summary','context','impact','limits'].filter(key=>typeof item[key]==='string'&&item[key].trim());
  const withOrigin=populated.filter(key=>item.provenance?.[key]?.layer&&item.provenance[key].field);
  checks.push({id,available:true,fields:populated.length,withOrigin:withOrigin.length,
    present:populated,origins:withOrigin.map(key=>[key,item.provenance[key]])});
 }
 const matched=checks.filter(x=>x.available&&x.fields>0);
 const success=matched.length>=3&&matched.every(x=>x.fields===x.withOrigin);
 document.body.dataset.f5Provenance=success?'PASS':'FAIL';
 const report={type:'F5.8 full app with candidate v897; never deployed',
  success,matchedRecords:matched.length,checks};
 const target=document.createElement('pre');target.id='f5ProvenanceReport';
 target.style='white-space:pre-wrap;font:12px monospace;max-height:350px;overflow:auto';
 target.textContent=JSON.stringify(report);
 document.body.append(target);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(verify,250),{once:true});
else setTimeout(verify,250);
})();