/* V8.98 Quick reader concept pilot: H045 only, opt-in and reversible.
   Existing reader and navigation remain unchanged. */
(function(){
'use strict';
const doc=document;let returnFocus=null;let activeId=null;
function selectedId(){try{return typeof state!=='undefined'&&state.selected&&window.TidensResearchReadModel?.has(state.selected)?state.selected:'H045'}catch(_){return 'H045'}}
const el=(tag,cls,txt)=>{const e=doc.createElement(tag);if(cls)e.className=cls;if(txt!=null)e.textContent=txt;return e};
const btn=el('button',null,'Snabbfönster för vald post');btn.type='button';btn.id='tvQuickPilot';btn.hidden=true;btn.setAttribute('aria-haspopup','dialog');doc.body.append(btn);
const overlay=el('div');overlay.id='tvQuickOverlay';overlay.hidden=true;
const panel=el('section');panel.id='tvQuickDialog';panel.setAttribute('role','dialog');panel.setAttribute('aria-modal','false');panel.setAttribute('aria-labelledby','tvQuickTitle');panel.setAttribute('aria-describedby','tvQuickSummary');overlay.append(panel);doc.body.append(overlay);
function close(){if(overlay.hidden)return;overlay.hidden=true;returnFocus?.focus?.()}
function show(requestedId){
 const id=typeof requestedId==='string'?requestedId:selectedId();
 const data=window.TidensResearchReadModel?.get(id);
 if(!data){return;}
 activeId=id;
 returnFocus=doc.activeElement;panel.replaceChildren();
 const header=el('header'),intro=el('div'),label=el('div','tvq-muted','TIDENS VÄV · FORSKNINGSPOST '+id);
 const title=el('h2',null,data.title);title.id='tvQuickTitle';
 const formatYear=y=>y<0?Math.abs(y)+' f.Kr.':y===0?'omkring år 1':y+' e.Kr.';
 const start=data.temporal?.start,end=data.temporal?.end;
 const hasStart=Number.isFinite(start),hasEnd=Number.isFinite(end);
 const period=hasStart&&hasEnd?(start===end?formatYear(start):formatYear(start)+' – '+formatYear(end)):hasStart?formatYear(start):'Datering ej fastställd';
 const time=el('div','tvq-muted',period);intro.append(label,title,time);
 if(data.dateType){const dateLabel=el('div','tvq-muted','Dateringstyp: '+data.dateType);intro.append(dateLabel)}
 if(data.narrativeTime){const narrative=el('div','tvq-muted','Berättad tid: '+data.narrativeTime);intro.append(narrative)}
 const exit=el('button',null,'Stäng ×');exit.type='button';exit.onclick=close;header.append(intro,exit);panel.append(header);
 const heading=el('h3','tvq-heading','Överblick');panel.append(heading);
 const summary=el('p','tvq-summary',data.summary||'Sammanfattning saknas i den gemensamma läsmodellen. Se den befintliga forskningsvyn.');summary.id='tvQuickSummary';panel.append(summary);
 if(summary.textContent.length>420){
  summary.classList.add('tvq-collapsed');
  const toggle=el('button','tvq-expand','Visa hela överblicken');toggle.type='button';toggle.setAttribute('aria-controls','tvQuickSummary');toggle.setAttribute('aria-expanded','false');
  toggle.onclick=()=>{const expanded=summary.classList.toggle('tvq-collapsed')===false;toggle.setAttribute('aria-expanded',String(expanded));toggle.textContent=expanded?'Visa mindre':'Visa hela överblicken'};
  panel.append(toggle);
 }
 if(data.context){const sub=el('h3','tvq-heading','Historiskt sammanhang');const p=el('p','tvq-excerpt',data.context);panel.append(sub,p)}
 if(data.impact){const sub=el('h3','tvq-heading','Betydelse och samband');const p=el('p','tvq-excerpt',data.impact);panel.append(sub,p)}
 if(data.reviewStatus==='preliminary'){panel.append(el('p','tvq-warning','Forskningsuppgifterna är preliminära och kan komma att justeras.'))}
 const src=el('p','tvq-muted',data.sources.length?data.sources.length+' tillgängliga källhänvisningar · granska i full forskningsvy':'Källhänvisningar behöver granskas i full forskningsvy');panel.append(src);
 if(data.sources.length){const list=el('ul','tvq-sources');for(const source of data.sources.slice(0,3)){const li=el('li');const a=el('a',null,source.title);a.href=source.url;a.target='_blank';a.rel='noopener noreferrer';li.append(a);list.append(li)}panel.append(list)}
 const nav=el('div','tvq-actions'),cancel=el('button',null,'Tillbaka till tidslinjen'),full=el('button','tvq-primary','Öppna befintlig fördjupning →');
 cancel.onclick=close;full.onclick=()=>{close();if(typeof view==='function')view('timeline');if((data.subtype==='bible-book'||data.subtype==='apocrypha-book')&&typeof window.TidensOpenBookV858==='function')window.TidensOpenBookV858(id);else if(typeof setSelected==='function')setSelected(id);if(typeof v84OpenReader==='function'&&window.innerWidth<=900)v84OpenReader();};
 nav.append(cancel,full);panel.append(nav);overlay.hidden=false;exit.focus();
}
btn.onclick=()=>show();overlay.addEventListener('click',e=>{if(e.target===overlay)close()});doc.addEventListener('keydown',e=>{if(overlay.hidden)return;if(e.key==='Escape'){e.preventDefault();close()}else if(e.key==='Tab'&&panel.contains(doc.activeElement)){const items=[...panel.querySelectorAll('a[href],button:not([disabled])')];const first=items[0],last=items[items.length-1];if(e.shiftKey&&doc.activeElement===first){e.preventDefault();last?.focus()}else if(!e.shiftKey&&doc.activeElement===last){e.preventDefault();first?.focus()}}});
function visible(){btn.hidden=true;const timeline=doc.getElementById('timelineView');if(timeline?.classList.contains('hidden')&&!overlay.hidden)close()}
const timeline=doc.getElementById('timelineView');if(timeline){const mo=new MutationObserver(visible);mo.observe(timeline,{attributes:true,attributeFilter:['class']});visible()}
doc.addEventListener('click',event=>{
 const row=event.target.closest?.('#timelineView.v828-chrono-gantt .v828-gantt-row[data-v828-id]');
 if(!row||event.target.closest('a, button, input, select, textarea')||!window.TidensResearchReadModel?.has(row.dataset.v828Id))return;
 event.preventDefault();event.stopPropagation();event.stopImmediatePropagation();show(row.dataset.v828Id);
},true);

window.TidensQuickResearchPilot=Object.freeze({open:show,close,isOpen:()=>!overlay.hidden,getActiveId:()=>activeId});
})();
