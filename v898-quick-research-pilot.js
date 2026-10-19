/* V8.98 Quick reader concept pilot: H045 only, opt-in and reversible.
   Existing reader and navigation remain unchanged. */
(function(){
'use strict';
const doc=document, id='H045';let returnFocus=null;
const el=(tag,cls,txt)=>{const e=doc.createElement(tag);if(cls)e.className=cls;if(txt!=null)e.textContent=txt;return e};
const btn=el('button',null,'Förhandsvisa H045 · Snabbfönster');btn.type='button';btn.id='tvQuickPilot';btn.hidden=true;btn.setAttribute('aria-haspopup','dialog');doc.body.append(btn);
const overlay=el('div');overlay.id='tvQuickOverlay';overlay.hidden=true;
const panel=el('section');panel.id='tvQuickDialog';panel.setAttribute('role','dialog');panel.setAttribute('aria-modal','true');panel.setAttribute('aria-labelledby','tvQuickTitle');overlay.append(panel);doc.body.append(overlay);
function close(){overlay.hidden=true;doc.body.style.removeProperty('overflow');returnFocus?.focus?.()}
function show(){
 const data=window.TidensResearchReadModel?.get(id);
 if(!data){return;}
 returnFocus=doc.activeElement;panel.replaceChildren();
 const header=el('header'),intro=el('div'),label=el('div','tvq-muted','TIDENS VÄV · FORSKNINGSPOST '+id);
 const title=el('h2',null,data.title);title.id='tvQuickTitle';
 const time=el('div','tvq-muted',data.temporal?.start!=null?Math.abs(data.temporal.start)+' f.Kr. · Preliminär historisk datering':'Historisk datering – se full forskningsvy');
 intro.append(label,title,time);
 const exit=el('button',null,'Stäng ×');exit.type='button';exit.onclick=close;header.append(intro,exit);panel.append(header);
 const summary=el('p','tvq-summary',data.summary||'Sammanfattning saknas i den gemensamma läsmodellen. Se den befintliga forskningsvyn.');panel.append(summary);
 const src=el('p','tvq-muted',data.sources.length?data.sources.length+' tillgängliga källhänvisningar · granska i full forskningsvy':'Källhänvisningar behöver granskas i full forskningsvy');panel.append(src);
 const nav=el('div','tvq-actions'),cancel=el('button',null,'Tillbaka till tidslinjen'),full=el('button','tvq-primary','Öppna befintlig fördjupning →');
 cancel.onclick=close;full.onclick=()=>{close();if(typeof view==='function')view('research');if(typeof setSelected==='function')setSelected(id);if(typeof v84OpenReader==='function'&&window.innerWidth<=900)v84OpenReader();};
 nav.append(cancel,full);panel.append(nav);overlay.hidden=false;doc.body.style.overflow='hidden';exit.focus();
}
btn.onclick=show;overlay.addEventListener('click',e=>{if(e.target===overlay)close()});doc.addEventListener('keydown',e=>{if(!overlay.hidden&&e.key==='Escape')close()});
function visible(){const timeline=doc.getElementById('timelineView');btn.hidden=!!(!timeline||timeline.classList.contains('hidden'))}
const timeline=doc.getElementById('timelineView');if(timeline){const mo=new MutationObserver(visible);mo.observe(timeline,{attributes:true,attributeFilter:['class']});visible()}
window.TidensQuickResearchPilot=Object.freeze({open:show,close,isOpen:()=>!overlay.hidden});
})();
