(function(){
'use strict';
// F5.10 test-only regression for the app's ORIGINAL book reader, not the F4 overlay.
const qs=new URLSearchParams(location.search);if(!qs.has('f510books'))return;
const wait=ms=>new Promise(done=>setTimeout(done,ms));
let done=false;
function output(ok,reason,checks=[]){
 if(done)return;done=true;
 document.body.dataset.f510Books=ok?'PASS':'FAIL';
 const pre=document.createElement('pre');pre.id='f510BooksReport';
 pre.textContent=JSON.stringify({ok,reason,checks,passed:checks.filter(x=>x.ok).length,total:checks.length},null,2);
 document.body.append(pre);
}
async function run(){
 const reader=window.TidensOpenBookV858;
 if(typeof reader!=='function'){output(false,'Original book reader API missing');return}
 const all=Object.keys(window.__F510AdditionalArticles||{});
 const ids=all.filter(id=>/^B\d{3}$|^D\d{3}$/.test(id));
 if(ids.length<20){output(false,'Not enough books in test sample');return}
 const timeline=document.getElementById('navTimeline');if(!timeline){output(false,'Timeline tab absent');return}
 timeline.click();await wait(100);
 const checks=[];
 for(const id of ids){
  try{
   reader(id);
   const article=document.getElementById('detail');
   const text=article?.textContent||'';
   const model=window.TidensResearchReadModel?.get?.(id);
   const ok=!!model&&!!model.title&&text.includes(id)&&text.includes(model.title);
   checks.push({id,ok,articleTextLength:text.length,
     readerTitle:model?.title||null});
  }catch(error){checks.push({id,ok:false,error:String(error.message||error)})}
 }
 output(checks.every(x=>x.ok),'Real production book/apocrypha reader across sampled catalog',checks);
}
setTimeout(()=>run().catch(e=>output(false,String(e))),450);
setTimeout(()=>{if(!done)output(false,'Book reader test watchdog expired')},14000);
})();
