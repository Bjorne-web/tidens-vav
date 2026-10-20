/* V8.98 Quick reader concept pilot: H045 only, opt-in and reversible.
   Existing reader and navigation remain unchanged. */
(function(){
'use strict';
const doc=document;let returnFocus=null;let activeId=null;
function selectedId(){try{return typeof state!=='undefined'&&state.selected&&window.TidensResearchReadModel?.has(state.selected)?state.selected:'H045'}catch(_){return 'H045'}}
const el=(tag,cls,txt)=>{const e=doc.createElement(tag);if(cls)e.className=cls;if(txt!=null)e.textContent=txt;return e};
const btn=el('button',null,'Snabbfönster för vald post');btn.type='button';btn.id='tvQuickPilot';btn.hidden=true;btn.setAttribute('aria-haspopup','dialog');doc.body.append(btn);
const overlay=el('div');overlay.id='tvQuickOverlay';overlay.hidden=true;
const panel=el('section');panel.id='tvQuickDialog';panel.setAttribute('role','dialog');panel.setAttribute('aria-modal','false');panel.setAttribute('aria-labelledby','tvQuickTitle');overlay.append(panel);doc.body.append(overlay);
function close(){overlay.hidden=true;returnFocus?.focus?.()}
function show(requestedId){
 const id=typeof requestedId==='string'?requestedId:selectedId();
 const data=window.TidensResearchReadModel?.get(id);
 activeId=id;
 if(!data){return;}
 returnFocus=doc.activeElement;panel.replaceChildren();
 const header=el('header'),intro=el('div'),label=el('div','tvq-muted','TIDENS VÄV · FORSKNINGSPOST '+id);
 const title=el('h2',null,data.title);title.id='tvQuickTitle';
 const time=el('div','tvq-muted',data.dateType||(data.temporal?.start!=null?(data.temporal.start<0?Math.abs(data.temporal.start)+' f.Kr.':data.temporal.start+' e.Kr.')+' · Kontrollera datering i forskningsvyn':'Historisk datering – se full forskningsvy'));
 intro.append(label,title,time);
 const exit=el('button',null,'Stäng ×');exit.type='button';exit.onclick=close;header.append(intro,exit);panel.append(header);
 const heading=el('h3','tvq-heading','Överblick');panel.append(heading);
 const summary=el('p','tvq-summary',data.summary||'Sammanfattning saknas i den gemensamma läsmodellen. Se den befintliga forskningsvyn.');panel.append(summary);
 if(data.context){const sub=el('h3','tvq-heading','Historiskt sammanhang');const p=el('p','tvq-excerpt',data.context);panel.append(sub,p)}
 if(data.impact){const sub=el('h3','tvq-heading','Betydelse och samband');const p=el('p','tvq-excerpt',data.impact);panel.append(sub,p)}
 if(data.reviewStatus==='preliminary'){panel.append(el('p','tvq-warning','Forskningsuppgifterna är preliminära och kan komma att justeras.'))}
 const src=el('p','tvq-muted',data.sources.length?data.sources.length+' tillgängliga källhänvisningar · granska i full forskningsvy':'Källhänvisningar behöver granskas i full forskningsvy');panel.append(src);
 if(data.sources.length){const list=el('ul','tvq-sources');for(const source of data.sources.slice(0,3)){const li=el('li');const a=el('a',null,source.title);a.href=source.url;a.target='_blank';a.rel='noopener noreferrer';li.append(a);list.append(li)}panel.append(list)}
 const nav=el('div','tvq-actions'),cancel=el('button',null,'Tillbaka till tidslinjen'),full=el('button','tvq-primary','Öppna befintlig fördjupning →');
 cancel.onclick=close;full.onclick=()=>{close();if(typeof view==='function')view('timeline');if((data.subtype==='bible-book'||data.subtype==='apocrypha-book')&&typeof window.TidensOpenBookV858==='function')window.TidensOpenBookV858(id);else if(typeof setSelected==='function')setSelected(id);if(typeof v84OpenReader==='function'&&window.innerWidth<=900)v84OpenReader();};
 nav.append(cancel,full);panel.append(nav);overlay.hidden=false;exit.focus();
}
btn.onclick=()=>show();overlay.addEventListener('click',e=>{if(e.target===overlay)close()});doc.addEventListener('keydown',e=>{if(!overlay.hidden&&e.key==='Escape')close()});
function visible(){btn.hidden=true;const timeline=doc.getElementById('timelineView');if(timeline?.classList.contains('hidden')&&!overlay.hidden)close()}
const timeline=doc.getElementById('timelineView');if(timeline){const mo=new MutationObserver(visible);mo.observe(timeline,{attributes:true,attributeFilter:['class']});visible()}
doc.addEventListener('click',event=>{
 const row=event.target.closest?.('#timelineView.v828-chrono-gantt .v828-gantt-row[data-v828-id]');
 if(!row||event.target.closest('a, input, select, textarea')||!window.TidensResearchReadModel?.has(row.dataset.v828Id))return;
 event.preventDefault();event.stopPropagation();event.stopImmediatePropagation();show(row.dataset.v828Id);
},true);

window.TidensQuickResearchPilot=Object.freeze({open:show,close,isOpen:()=>!overlay.hidden,getActiveId:()=>activeId});
})();
