(function(){
'use strict';
// F5.4: Runs only in a generated copy of index.html (not linked from production).
// Read/live exercise of ACTUAL app navigation + quick/book special readers.
const scenarios=[],blockers=[],errors=[];
window.addEventListener('error',e=>errors.push(String(e.message||e.error||'Unspecified runtime error')));
const outcome=(name,ok,detail)=>scenarios.push({name,ok:!!ok,detail:String(detail||'')});
function run(){
 const results=document.createElement('pre');results.id='f5LiveReport';
 results.style='font:12px/1.4 monospace;white-space:pre-wrap;max-width:980px;padding:14px;border:2px solid #196967;background:white;color:#143';
 document.body.prepend(results);
 function snapshot(){return window.TidensViewContextC1?.snapshot?.()||null}
 try{
  const initial=snapshot();
  outcome('actual C1 snapshot',!!initial&&typeof initial.view==='string',
   initial?.view||'C1 unavailable');
  const research=window.TidensResearchReadModel;
  outcome('actual v897 has H045',!!research?.has?.('H045'),'research model available');
  outcome('actual v898 quick reader',typeof window.TidensQuickResearchPilot?.open==='function',
   'quick reader API');
  for(const v of ['timeline','map','explore','compare','research']){
   const btn=document.getElementById('nav'+v[0].toUpperCase()+v.slice(1));
   if(!btn){outcome('real '+v+' tab',false,'Missing tab');continue}
   try{
    btn.click();
    const s=snapshot();
    outcome('real '+v+' tab',s?.view===v,'C1='+s?.view+', section='+s?.visibleSection);
   }catch(error){outcome('real '+v+' tab',false,error.message)}
  }
  try{
   const reader=window.TidensQuickResearchPilot;
   document.getElementById('navTimeline')?.click();
   reader?.open?.('H045');
   const open=reader?.isOpen?.()===true;
   const title=document.getElementById('tvQuickTitle')?.textContent||'';
   reader?.close?.();
   outcome('real H045 quick reader open/close',open&&reader?.isOpen?.()===false&&title.length>2,
    'title='+title.slice(0,90));
  }catch(error){outcome('real H045 quick reader open/close',false,error.message)}
  for(const id of ['B001','D001']){
   try{
    const f=window.TidensOpenBookV858;
    if(typeof f!=='function'){outcome('real book reader '+id,false,'Reader API absent');continue}
    document.getElementById('navTimeline')?.click();
    const result=f(id),article=document.getElementById('detail')?.textContent||'';
    outcome('real book reader '+id,!!article.includes(id)&&!!article.includes('preliminärt forskningsunderlag'),
     'return='+String(result)+', text='+article.slice(0,110));
   }catch(error){outcome('real book reader '+id,false,error.message)}
  }
  // The real Leaflet instance is not globally exported, so camera restoration
  // cannot be measured here; treating a map tab as proof would be incorrect.
  const leaflet=typeof window.L==='object';
  blockers.push({gap:'Leaflet instance getCenter/getZoom/setView not exposed as a public F5 adapter',leafletLoaded:leaflet});
  blockers.push({gap:'Full F4 reader not wired into actual v898 detail controls',verified:!document.querySelector('[data-f5-production-reader]')});
  blockers.push({gap:'Real browser Back + exact map scroll/theme restoration still require dedicated host hooks'});
 }catch(error){outcome('probe crashed',false,error.stack||error.message)}
 const failed=scenarios.filter(x=>!x.ok);
 const report={verifier:'F5.4 real source app HTML copy; no production code modification',
  checks:scenarios,failed:failed.map(x=>x.name),blockers,runtimeErrors:errors.slice(0,15),
  currentSnapshot:snapshot()?{view:snapshot().view,selectedId:snapshot().selectedId,visibleSection:snapshot().visibleSection}:null};
 results.textContent=JSON.stringify(report,null,2);
 document.body.dataset.f5LiveResult=failed.length?'FAIL':'PASS';
 document.body.dataset.f5LiveChecks=String(scenarios.length);
 document.body.dataset.f5LiveFailures=String(failed.length);
}
setTimeout(run,350);
})();