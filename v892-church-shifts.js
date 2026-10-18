/* Granskning 6 / V8.92: kyrkans tolkningsskiften + parallell världshistoria.
   Preview-modul i Fördjupningar. Inga nya historiska poster eller C6/C7-ändringar. */
(function(){
'use strict';
const bundle=window.TIDENS_CHURCH_SHIFTS_V892;if(!bundle)return;
const safe=value=>String(value==null?'':value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function link(url,label){
 try{const u=new URL(url,location.href);if(u.protocol!=='https:')return safe(label);return '<a href="'+safe(u.href)+'" target="_blank" rel="noopener noreferrer">'+safe(label)+' <span aria-hidden="true">↗</span></a>'}
 catch(_){return safe(label)}
}
const bibleCodes={'Jos':'JOS','Ps':'PSA','Ef':'EPH','Filem':'PHM','Gal':'GAL','1 Tim':'1TI','1 Kor':'1CO','2 Mos':'EXO','5 Mos':'DEU','Apg':'ACT','Matt':'MAT','Rom':'ROM','Joh':'JHN','1 Mos':'GEN','Mark':'MRK','Luk':'LUK','3 Mos':'LEV'};
function bible(reference){
 const m=/^((?:[1-5]\s+)?[\p{L}]+)\s+(\d+)(?:[–-]\d+)?(?::(\d+)(?:[–-]\d+)?)?$/u.exec(reference);
 if(!m)return '<span class="v892-unlinked">'+safe(reference)+'</span>';
 const code=bibleCodes[m[1]];if(!code)return '<span class="v892-unlinked">'+safe(reference)+'</span>';
 const url='https://www.bible.com/sv/bible/154/'+code+'.'+m[2]+(m[3]?'.'+m[3]:'')+'.B2000';
 return link(url,reference);
}
const timelineTitle='Kyrkans tolkningsskiften i en föränderlig värld';
function topicOptions(){return '<option value="all">Alla tolkningsfrågor</option>'+bundle.topics.map(t=>'<option value="'+safe(t.id)+'">'+safe(t.title)+'</option>').join('');}
function shell(){
 return '<section class="v892-church" id="v892ChurchShifts" aria-labelledby="v892Title">'+
 '<header class="v892-heading"><span class="v888-kicker">FORSKNINGSSPÅR · KYRKOHISTORIA · GRANSKNINGSPREVIEW</span><h2 id="v892Title">'+timelineTitle+'</h2>'+
 '<p>Se hur bibeltolkningar, kyrkliga beslut, samhällsförändringar och vetenskaplig kunskap har mötts, ibland i konflikt. En markerad händelse är <strong>inte</strong> bevis för att alla kyrkor ändrat uppfattning samma år.</p>'+
 '<p class="v892-method"><strong>Metod:</strong> Tidsankarna är daterade händelser. Längre teologiska förändringar och pågående oenighet beskrivs separat. Samtidighet är inte detsamma som ett belagt orsakssamband. Materialet är under vetenskaplig granskning.</p></header>'+
 '<div class="v892-controls"><label for="v892Topic">Välj fördjupning<select id="v892Topic">'+topicOptions()+'</select></label><label class="v892-switch"><input id="v892World" type="checkbox" checked> Visa världshistoria och samhällskontext</label></div>'+
 '<div class="v892-legend" aria-label="Tidslinjens två perspektiv"><span><i class="v892-dot church"></i> Kyrka, teologi och kyrklig praxis</span><span><i class="v892-dot world"></i> Samtid: samhälle, forskning, lagstiftning</span></div>'+
 '<div class="v892-axis-head" aria-hidden="true"><span>Kyrka och tolkning</span><span>År</span><span>Världen runt omkring</span></div>'+
 '<div class="v892-axis" id="v892Timeline" aria-live="polite"></div>'+
 '<section class="v892-selected" id="v892Selected" aria-live="polite"></section>'+
 '<h3 class="v892-catalogue-head">Fördjupa dig i en tolkningsfråga</h3><div class="v892-catalogue" id="v892Catalogue"></div>'+
 '<p class="v892-end-note">Detta är en separat idéhistorisk ingång i Väven. Den ändrar inte datering, evidensstatus eller innehåll för befintliga forskningsposter. Källor redovisas under respektive händelse och fördjupning.</p>'+
 '</section>';
}
function timelineEvents(topic,showWorld){
 const focus=bundle.events.filter(e=>topic==='all'||e.topic===topic);
 if(topic==='all')return showWorld?focus:focus.filter(e=>e.lane==='church');
 const ys=focus.map(e=>e.year);
 const context=showWorld?bundle.events.filter(e=>e.lane==='world'&&e.topic!==topic&&ys.some(y=>Math.abs(y-e.year)<=30)):[];
 const map=new Map();for(const e of [...focus,...context])map.set(e.year+'|'+e.title,e);
 return [...map.values()].filter(e=>showWorld||e.lane==='church').sort((a,b)=>a.year-b.year||a.lane.localeCompare(b.lane));
}
function card(e){
 return '<button class="v892-event '+safe(e.lane)+'" type="button" data-event="'+safe(e.year+'|'+e.title)+'" aria-label="'+safe(e.year+' '+e.title)+
 '"><strong>'+safe(e.title)+'</strong><span>'+safe(e.summary)+'</span><small>'+safe(e.type)+'</small></button>';
}
function renderTimeline(events){
 if(!events.length)return '<p>Inga exakt daterade milstolpar i den här filtreringen ännu. Läs forskningsfördjupningen nedan; ett långsamt tolkningsskifte ska inte få ett påhittat årtal.</p>';
 const years=[...new Set(events.map(e=>e.year))].sort((a,b)=>a-b);
 return years.map(year=>{
 const group=events.filter(e=>e.year===year);
 return '<div class="v892-axis-row"><div class="v892-axis-cell">'+group.filter(e=>e.lane==='church').map(card).join('')+'</div>'+
 '<div class="v892-axis-year"><span>'+year+'</span></div>'+
 '<div class="v892-axis-cell">'+group.filter(e=>e.lane==='world').map(card).join('')+'</div></div>';
 }).join('');
}
function renderTheme(t){
 return '<div class="v892-detail-head"><span class="v892-theme-label">'+safe(t.state)+'</span><h3>'+safe(t.title)+'</h3><p>'+safe(t.brief)+'</p></div>'+
 '<div class="v892-prose">'+t.detail.map(s=>'<p>'+safe(s)+'</p>').join('')+'</div>'+ 
 (t.sections?'<div class="v892-chapter-list">'+t.sections.map((part,i)=>'<section class="v892-chapter"><h4>'+(i+1)+'. '+safe(part.title)+'</h4><p>'+safe(part.body)+'</p></section>').join('')+'</div>':'')+
 '<div class="v892-detail-grid"><div><h4>Frågor att pröva</h4><ul>'+t.questions.map(s=>'<li>'+safe(s)+'</li>').join('')+'</ul>'+
 '<h4>Bibeltexter</h4><p class="v892-bible">'+t.bible.map(bible).join(' · ')+'</p></div>'+
 '<div><h4>Historiska och vetenskapliga källor</h4><ul>'+t.sources.map(s=>'<li>'+link(s[1],s[0])+'</li>').join('')+'</ul>'+
 '<p class="v892-note">Källornas uppgifter ska prövas mot den aktuella frågan. En källhänvisning är inte en slutgranskningsstämpel.</p></div></div>';
}
function renderEventDetail(e){
 const topic=bundle.topics.find(t=>t.id===e.topic);
 return '<div class="v892-detail-head"><span class="v892-theme-label">'+safe(e.type)+' · '+safe(e.lane==='church'?'Kyrkohistoria':'Samhälle och vetenskap')+'</span>'+
 '<h3>'+e.year+' · '+safe(e.title)+'</h3><p>'+safe(e.summary)+'</p></div>'+
 '<p>Detta är en daterad markör, inte ett bevis för att förändringen började eller avslutades just det året. Händelsen behöver sättas i relation till längre skeenden och skilda kristna traditioner.</p>'+
 '<p><strong>Tillhör forskningsspåret:</strong> <button type="button" class="v892-inline-topic" data-choose-topic="'+safe(e.topic)+'">'+safe(topic?.title||e.topic)+'</button></p>'+
 '<p><strong>Huvudkälla:</strong> '+link(e.source,'Öppna originaluppgift eller källöversikt')+'</p>';
}
function topicButtons(selected){
 return bundle.topics.map(t=>'<button type="button" class="v892-topic-card'+(selected===t.id?' active':'')+'" data-choose-topic="'+safe(t.id)+'"><strong>'+safe(t.title)+'</strong><small>'+safe(t.state)+'</small><span>'+safe(t.brief)+'</span></button>').join('');
}
function init(){
 const host=document.getElementById('researchView');if(!host)return;
 let topic='all',showWorld=true,highlight=null;
 function render(){
  let root=document.getElementById('v892ChurchShifts');
  if(!root){host.insertAdjacentHTML('beforeend',shell());root=document.getElementById('v892ChurchShifts');}
  if(!root)return;
  const select=root.querySelector('#v892Topic');if(select)select.value=topic;
  const toggle=root.querySelector('#v892World');if(toggle)toggle.checked=showWorld;
  root.querySelector('#v892Timeline').innerHTML=renderTimeline(timelineEvents(topic,showWorld));
  root.querySelector('#v892Catalogue').innerHTML=topicButtons(topic);
  const selected=root.querySelector('#v892Selected');
  const e=highlight&&bundle.events.find(v=>v.year+'|'+v.title===highlight);
  selected.innerHTML=e?renderEventDetail(e):topic==='all'?
  '<h3>Så använder du tidslinjen</h3><p>Välj en tolkningsfråga för att isolera dess milstolpar och närliggande samtidshändelser. Klicka på ett årskort för källor, eller välj något av ämnena nedan för en längre forskningsfördjupning.</p>':
  renderTheme(bundle.topics.find(t=>t.id===topic));
 }
 host.addEventListener('change',e=>{
  if(!e.target?.closest('#v892ChurchShifts'))return;
  if(e.target.id==='v892Topic'){topic=e.target.value;highlight=null;render();}
  if(e.target.id==='v892World'){showWorld=e.target.checked;render();}
 });
 host.addEventListener('click',e=>{
  const root=e.target?.closest('#v892ChurchShifts');if(!root)return;
  const subject=e.target.closest('[data-choose-topic]');
  const event=e.target.closest('[data-event]');
  if(subject){topic=subject.dataset.chooseTopic;highlight=null;render();root.querySelector('#v892Selected')?.scrollIntoView?.({behavior:'smooth',block:'nearest'});}
  else if(event){highlight=event.dataset.event;render();root.querySelector('#v892Selected')?.scrollIntoView?.({behavior:'smooth',block:'nearest'});}
 });
 render();
 // Research view sometimes gets rebuilt by the older app. Preserve current user filters.
 new MutationObserver(()=>{if(!document.getElementById('v892ChurchShifts'))render();}).observe(host,{childList:true,subtree:false});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
