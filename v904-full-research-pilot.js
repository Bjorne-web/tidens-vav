/* Full research reading view – independent opt-in test, no legacy reader replacement. */
(function(){
'use strict';
const doc=document,make=(tag,klass,value)=>{const x=doc.createElement(tag);if(klass)x.className=klass;if(value!=null)x.textContent=value;return x};
let previousFocus=null,activeId=null;
const root=make('section');root.id='tidensFullResearchPilot';root.hidden=true;root.setAttribute('aria-label','Fullständig forskningsvy');root.tabIndex=-1;doc.body.append(root);
function close(){if(root.hidden)return;root.hidden=true;doc.body.classList.remove('tidens-full-reader-open');previousFocus?.focus?.()}
function open(id){
 const data=window.TidensResearchReadModel?.get(id);if(!data)return false;
 previousFocus=doc.activeElement;activeId=id;root.replaceChildren();
 const container=make('article','tfr-article'),top=make('header','tfr-top');
 const back=make('button','tfr-back','← Tillbaka till Väven');back.type='button';back.onclick=close;
 top.append(back,make('span','tfr-eyebrow','TIDENS VÄV · FORSKNINGSPOST '+data.id));container.append(top);
 container.append(make('h1','tfr-title',data.title));
 const date=data.temporal;const year=n=>n<0?Math.abs(n)+' f.Kr.':n+' e.Kr.';
 if(date?.start!=null){const end=date.end;container.append(make('p','tfr-dating','Datering: '+year(date.start)+(end!=null&&end!==date.start?' – '+year(end):'')))}
 if(data.dateType)container.append(make('p','tfr-meta','Dateringstyp: '+data.dateType));
 if(data.narrativeTime)container.append(make('p','tfr-meta','Berättad tid: '+data.narrativeTime));
 if(data.reviewStatus==='preliminary')container.append(make('p','tfr-preliminary','Forskningsposten är preliminär, inte slutgranskad.'));
 function section(title,body){if(!body)return;const wrap=make('section','tfr-section');wrap.append(make('h2',null,title),make('p',null,body));container.append(wrap)}
 section('Överblick',data.summary);section('Historiskt och religionshistoriskt sammanhang',data.context);
 section('Betydelse och samband',data.impact);section('Forskningsläge och begränsningar',data.limits);
 if(data.sources.length){const sources=make('section','tfr-section'),list=make('ul');sources.append(make('h2',null,'Källor och vidare läsning'));for(const s of data.sources){const li=make('li'),link=make('a',null,s.title||'Källa');link.href=s.url;link.target='_blank';link.rel='noopener noreferrer';li.append(link);list.append(li)}sources.append(list);container.append(sources)}
 if(!data.context&&!data.impact&&!data.limits){container.append(make('p','tfr-preliminary','Fördjupad forskningsinformation saknas ännu i den gemensamma läsmodellen. Befintlig detaljläsare är fortsatt tillgänglig i Väven.'))}
 const bottom=make('button','tfr-back','← Tillbaka till Väven');bottom.onclick=close;container.append(bottom);root.append(container);root.hidden=false;doc.body.classList.add('tidens-full-reader-open');root.focus();return true;
}
doc.addEventListener('keydown',e=>{if(!root.hidden&&e.key==='Escape'){e.preventDefault();close()}});
window.TidensFullResearchPilot=Object.freeze({open,close,activeId:()=>activeId});
const params=new URLSearchParams(location.search);const requested=params.get('fullreader');
if(requested&&/^[A-Z]{1,2}\d{3,6}$/.test(requested)){const attempt=()=>{if(!open(requested))setTimeout(attempt,250)};setTimeout(attempt,250)}
})();
