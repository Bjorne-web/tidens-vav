(function(){
'use strict';
const p=new URLSearchParams(location.search);
if(!p.has('f515'))return;
const mode=p.get('f515'),wait=n=>new Promise(r=>setTimeout(r,n));
let stage='loaded';
let finished=false;
function done(ok,failures,checks){
 if(finished)return;finished=true;
 const pre=document.createElement('pre');
 pre.id='f515Report';pre.dataset.status=ok?'PASS':'FAIL';
 pre.textContent=JSON.stringify({ok,mode,stage,failures,checks});
 document.body.append(pre);
}
async function run(){
 stage='initializing';
 const ids=Object.keys(window.__F515UndatedArticles||{});
 const reader=window.TidensF5Candidate,failures=[],checks=[];
 const test=(ok,msg)=>{if(!ok)failures.push(msg)};
 test(ids.length===33,'Expected 33 candidate articles, got '+ids.length);
 test(!!reader,'F5 candidate missing');
 if(!reader)return done(false,failures,checks);
 // Exercise the same stable existing Explore view at both viewport sizes;
 // full mobile Timeline integration remains a separate, explicitly open release gate.
 const tab=document.getElementById('navExplore');
 test(!!tab,'Real app navigation button missing');
 if(!tab)return done(false,failures,checks);
 stage='navigating-explore';
 tab.click();
 await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));
 await wait(180);
 stage='article-checks';
 const initial=reader.getSnapshot(),camera=reader.getCamera(),url=location.href;
 for(const id of ids){
  const before=reader.getSnapshot(),beforeCamera=reader.getCamera();
  if(!reader.open(id)){failures.push('open '+id);break}
  const root=reader.getDialog().shadowRoot;
  const pane=root.querySelector('[data-record="'+id+'"]');
  test(!!pane,'Missing article '+id);
  test(!!pane?.querySelector('.c7-undated-reason p')?.textContent.trim(),'Missing undated explanation '+id);
  test(!!pane?.querySelector('.c7-undated-reason small')?.textContent.trim(),'Missing origin '+id);
  test(reader.getDialog().getBoundingClientRect().width<=innerWidth+2,'Overlay wider than viewport '+id);
  test(reader.requestClose(),'Close refused '+id);
  let n=0;while(reader.getState()&&n++<40)await wait(30);
  test(!reader.getState(),'Reader remained open '+id);
  test(JSON.stringify(before)===JSON.stringify(reader.getSnapshot()),'C1 state changed '+id);
  test(JSON.stringify(beforeCamera)===JSON.stringify(reader.getCamera()),'Map camera changed '+id);
  test(location.href===url,'URL changed '+id);
  checks.push(id);stage='checked-'+checks.length;
  if(failures.length)break;
 }
 test(JSON.stringify(initial)===JSON.stringify(reader.getSnapshot()),'Final app context changed');
 test(JSON.stringify(camera)===JSON.stringify(reader.getCamera()),'Final camera changed');
 done(failures.length===0,failures,checks);
}
setTimeout(()=>run().catch(e=>done(false,[String(e.stack||e)],[])),600);
setTimeout(()=>done(false,['F5.15 watchdog'],[]),60000);
})();