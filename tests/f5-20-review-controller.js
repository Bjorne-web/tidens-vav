(function(){
'use strict';
const ids=Object.keys(window.__F515UndatedArticles||{}).sort();
const candidate=window.TidensF5Candidate;
const mapGate=window.TidensF519EventOpen;
if(!candidate||!mapGate)return;
const parent=document.createElement('aside');parent.id='f520Review';
parent.style.cssText='position:fixed;left:12px;bottom:12px;z-index:2147482500;max-width:min(390px,calc(100vw - 24px));background:#173d46;color:white;padding:14px;border-radius:12px;font:14px system-ui;box-shadow:0 9px 35px #0007';
const heading=document.createElement('strong');heading.textContent='F5 – separat granskningsversion';
const note=document.createElement('p');note.textContent='Opublicerad forskningsvy. Välj en C7-post för att granska dateringsförklaringen. Testknapparna ingår inte i den ordinarie appen.';
note.style.cssText='margin:7px 0 9px;font-size:12px;line-height:1.4';
const select=document.createElement('select');select.id='f520Select';select.setAttribute('aria-label','Välj C7-post');
select.style.cssText='width:100%;padding:8px;max-width:100%';
for(const id of ids){const op=document.createElement('option');op.value=id;op.textContent=id;select.append(op)}
const actions=document.createElement('div');actions.style.cssText='display:flex;gap:8px;margin-top:10px;flex-wrap:wrap';
function button(text){const b=document.createElement('button');b.type='button';b.textContent=text;b.style.cssText='background:white;color:#173d46;padding:8px;border:0;border-radius:6px;cursor:pointer';actions.append(b);return b}
const ordinary=button('Öppna artikel');
const fromMap=button('Öppna via kartan');
const status=document.createElement('p');status.id='f520Status';status.setAttribute('role','status');status.style.cssText='font-size:12px;margin:8px 0 0';
ordinary.onclick=()=>{const ok=candidate.open(select.value);status.textContent=ok?'Artikeln är öppnad.':'Öppning nekades; stäng eventuell annan artikel först.'};
fromMap.onclick=async()=>{
 status.textContent='Öppnar kartan och inväntar färdig kartförflyttning…';
 const map=document.getElementById('navMap');
 if(!map){status.textContent='Kartvyn saknas.';return}
 map.click();
 const result=await mapGate.openAfterC2(select.value);
 status.textContent=result.ok?'Forskningsartikeln öppnades från kartan.':'Kartöppning avbruten: '+result.reason;
};
parent.append(heading,note,select,actions,status);document.body.append(parent);
if(new URLSearchParams(location.search).has('f520smoke')){
 const ok=ids.length===33&&!!document.getElementById('navMap')&&!!document.getElementById('navTimeline')&&
  !!document.getElementById('f520Select')&&!!window.TidensC2Ready;
 const pre=document.createElement('pre');pre.id='f520Smoke';pre.dataset.result=ok?'PASS':'FAIL';
 pre.textContent=JSON.stringify({ok,ids:ids.length,hasReview:!!parent,hasMap:!!mapGate},null,2);
 document.body.append(pre);
}
})();