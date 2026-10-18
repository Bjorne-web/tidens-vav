/* V8.94 – same graphical time-axis vocabulary as the main Väven:
   native .v828-gantt rows, dates, axis and selected dossiers. */
(function(){
'use strict';
const dataset=window.TIDENS_CHURCH_SHIFTS, questions=window.TIDENS_BIG_QUESTIONS_TIMELINE;
if(!dataset||!questions)return;
const extras=window.TIDENS_CHURCH_LONGFORM||{};
const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const legend={
church:{label:'Kyrka och bibeltolkning',color:'#48739A'},
text:{label:'Texter och religiösa idéer',color:'#48739A'},
society:{label:'Samhälle och politik',color:'#40846F'},
philosophy:{label:'Filosofi och kunskapsutveckling',color:'#B38A4A'},
science:{label:'Vetenskap och kunskap',color:'#B38A4A'},
culture:{label:'Kultur och litteratur',color:'#9A7595'}
};
const allEvents=[
...dataset.events.map(e=>({...e,topics:[e.topic],precision:'exact',origin:'church'})),
...questions.events.map(e=>({...e,origin:'questions'}))
];
const previous=new Set();
for(const e of allEvents){if(previous.has(e.id))throw Error('Duplicate research event id '+e.id);previous.add(e.id);}
const states={topic:'overview',range:'all',world:true,selected:null,limit:36};
const periods=[{key:'all',label:'Hela perioden'}, {key:'ancient',label:'Före år 500',lo:-650,hi:500}, {key:'medieval',label:'500–1500',lo:500,hi:1500}, {key:'earlymodern',label:'1500–1800',lo:1500,hi:1800}, {key:'modern',label:'1800–2026',lo:1800,hi:2026}];
function normalizedLane(l){return l==='church'||l==='text'?'church':l==='society'?'society':'science'}
function selectedEvents(){
 const topic=states.topic;
 let es=allEvents.filter(e=>{
 if(topic==='all')return true;
 if(topic==='bridge')return e.topics.some(x=>['good','will'].includes(x));
 return e.topics.includes(topic);
 });
 if(!states.world)es=es.filter(e=>normalizedLane(e.lane)==='church');
 return es.sort((a,b)=>a.year-b.year||a.id.localeCompare(b.id));
}
function yearString(e){
 const prefix=e.precision==='approx'?'ca ':e.precision==='range'?'från ca ':'';
 return prefix+(e.year<0?Math.abs(e.year)+' f.Kr.':e.year+' e.Kr.');
}
function axisYear(y){return y<0?Math.abs(y)+' f.Kr.':y===0?'1 f.Kr./e.Kr.':y.toString();}
function domain(es){
 const range=periods.find(p=>p.key===states.range);
 if(range&&range.key!=='all')return{min:range.lo,max:range.hi};
 const minYear=Math.min(...es.map(e=>e.year)),maxYear=Math.max(...es.map(e=>e.year));
 const width=Math.max(60,maxYear-minYear),pad=Math.max(8,Math.round(width*.035));
 return{min:minYear-pad,max:maxYear+pad};
}
function linearPct(value,domain){return Math.max(0,Math.min(100,(value-domain.min)/(domain.max-domain.min)*100));}
function eventInfo(e){
 const topic=states.topic==='all'?e.topics[0]:states.topic==='bridge'?e.topics.find(x=>['good','will'].includes(x))||e.topics[0]:states.topic;
 const extra=extras[topic];
 const main=extra?extra.sections[e.lane==='church'?Math.min(1,extra.sections.length-1):0]:null;
 const context=main?main.paragraphs[0]:null;
 const hasBible=typeof window.TidensReview2BibleLink==='function';
 const bib=ref=>hasBible?window.TidensReview2BibleLink(ref):esc(ref);
 const rendered=txt=>esc(txt).replace(/\[\[([^\]]+)\]\]/g,(_,r)=>bib(r));
 const safe=typeof e.source==='string'&&e.source.startsWith('https://')?e.source:null;
 let info='<article class="v894-dossier v828-dossier" id="v894SelectedEvent" aria-live="polite"><div class="v894-dossier-header"><div><span class="v888-kicker">'+esc(legend[e.lane]?.label||'Forskningshändelse')+'</span><h3>'+esc(e.title)+'</h3><p class="v894-date"><strong>'+esc(yearString(e))+'</strong> · '+esc(e.precision==='approx'?'Ungefärlig datering':e.precision==='range'?'Tillkomst över flera år':'Dokumenterad tidpunkt eller publikation')+'</p></div><button class="v894-close" type="button" data-v894-close aria-label="Stäng händelse">✕</button></div>'+
 '<h4>Vad hände?</h4><p>'+rendered(e.detail)+'</p>';
 if(context)info+='<h4>Större forskningssammanhang</h4><p>'+rendered(context)+'</p><p class="v894-method">Detta är historisk bakgrund från samma forskningsområde, inte ett självständigt belägg för ett orsakssamband med händelsen.</p>';
 if(e.origin==='questions'&&e.topics.includes('afterlife'))info+='<p class="v894-method">För bibliska och apokalyptiska verk avser tidsmarkeringen textens sannolika tillkomst eller en daterbar receptionshändelse – inte berättelsens föreställda tid.</p>';
 else info+='<p class="v894-method">Ett daterat beslut, en publikation eller samhällshändelse innebär inte att alla kyrkor samtidigt ändrade uppfattning. Skilj belagd händelse från senare tolkning och möjlig påverkan.</p>';
 info+='<p class="v894-evidence"><strong>Källstatus:</strong> '+esc(e.certainty)+'</p>';
 if(safe)info+='<p><a href="'+esc(safe)+'" target="_blank" rel="noopener noreferrer">Öppna källan och granska belägget ↗</a></p>';
 if(e.relatedPostId)info+='<p><a href="/?tv_id='+encodeURIComponent(e.relatedPostId)+'&tv_view=research">Öppna relaterad post '+esc(e.relatedPostId)+' i Väven →</a></p>';
 return info+'</article>';
}
function graphHtml(){
 const es=selectedEvents(),period=periods.find(p=>p.key===states.range)||periods[0];
 const bounds=domain(es.length?es:allEvents);
 const inRange=es.filter(e=>e.year>=bounds.min&&e.year<=bounds.max);
 const shown=inRange.slice(0,states.limit);
 const sourceTotal=es.length,available=inRange.length;
 const legendHtml=['church','society','science'].map(key=>{
 const t={church:'Kyrka / texter',society:'Samhälle',science:'Vetenskap / idéer'}[key];
 const color=legend[key].color;return '<span class="v828-color-key"><i style="background:'+color+'"></i>'+t+'</span>';
 }).join('');
 const tickCount=5;
 const ticks=Array.from({length:tickCount+1},(_,i)=>{const y=bounds.min+(bounds.max-bounds.min)*(i/tickCount);return'<span style="left:'+linearPct(y,bounds).toFixed(2)+'%">'+esc(axisYear(Math.round(y)))+'</span>'}).join('');
 const rows=shown.map(e=>{
 const l=legend[e.lane]||legend.science,pos=linearPct(e.year,bounds).toFixed(3);
 const selected=states.selected===e.id;
 const marker='<span class="v828-point v894-dot" style="left:'+pos+'%;background:'+l.color+'" title="'+esc(yearString(e))+'"></span>';
 const name='<span class="v828-catmark" style="background:'+l.color+'"></span><span><b>'+esc(e.title)+'</b><small>'+esc(l.label)+'</small></span>';
 return '<div class="v828-gantt-row v894-row'+(selected?' v894-active':'')+'"><button type="button" class="v828-gantt-label" data-v894-event="'+e.id+'" aria-expanded="'+String(selected)+'">'+name+'</button><button type="button" class="v828-gantt-track v894-track" data-v894-event="'+e.id+'" aria-label="Visa '+esc(e.title)+' vid '+esc(yearString(e))+'">'+marker+'</button><button type="button" class="v828-gantt-date" data-v894-event="'+e.id+'">'+esc(yearString(e))+' →</button></div>'+ (selected?eventInfo(e):'');
 }).join('');
 const control='<div class="v894-controls"><div><label for="v894Period">Tidsutsnitt</label><select id="v894Period">'+periods.map(p=>'<option value="'+p.key+'"'+(states.range===p.key?' selected':'')+'>'+p.label+'</option>').join('')+'</select></div>'+
 '<label class="v894-world"><input id="v894World" type="checkbox"'+(states.world?' checked':'')+'> Visa samhälle och vetenskap</label></div>';
 return '<section class="v894-graph v828-gantt" aria-label="Grafisk forskningstidslinje"><div class="v828-gantt-intro"><h3>Historiska händelser i Vävens tidslinje</h3><p>Den vågräta axeln är proportionell mot tiden, som i Vävens övriga Gantt-vy. Klicka på punkten eller rubriken för att läsa källan och det historiska sammanhanget. Osäkra dateringar markeras med ”ca”.</p></div>'+
 '<div class="v828-categories">'+legendHtml+'</div>'+control+
 '<div class="v894-axis" aria-label="Tidsskala från '+esc(axisYear(bounds.min))+' till '+esc(axisYear(bounds.max))+'"><div class="v894-axis-spacer">År</div><div class="v894-axis-ticks">'+ticks+'</div><div></div></div>'+
 '<div class="v894-list">'+(rows||'<p class="v894-empty">Inga daterade händelser inom detta tidsutsnitt. Prova hela perioden eller ett annat urval.</p>')+'</div>'+
 '<div class="v894-summary"><span>'+shown.length+' av '+available+' händelser i tidsutsnittet'+(sourceTotal!==available?' · '+sourceTotal+' totalt i temat':'')+'</span>'+
 (available>shown.length?'<button type="button" data-v894-more>Visa fler händelser ('+(available-shown.length)+' återstår)</button>':'')+'</div>'+
 '<p class="v894-disclaimer">Forskningsstatus: källknutna dateringar och redaktionella förklaringar, inte 67+ fullständigt vetenskapligt slutgranskade poster. Ingen ny C6-status följer automatiskt av denna graf.</p></section>';
}
function render(){
 const hub=document.getElementById('tvResearchGraph');if(!hub)return;
 const topic=window.TidensResearchHub?.getSelected?.()||'overview';
 states.topic=topic;
 if(topic==='overview'||topic==='legacy'){hub.innerHTML='';return;}
 const eligible=topic==='all'||['afterlife','good','will','bridge'].includes(topic)||dataset.topics.some(t=>t.id===topic);
 if(!eligible){hub.innerHTML='';return;}
 const ids=new Set(selectedEvents().map(e=>e.id));if(states.selected&&!ids.has(states.selected))states.selected=null;
 hub.innerHTML=graphHtml();
}
function init(){
 const root=document.getElementById('researchView');if(!root)return;
 render();
 root.addEventListener('click',e=>{
 const button=e.target.closest('[data-v894-event]');if(button){
 const id=button.getAttribute('data-v894-event');
 states.selected=states.selected===id?null:id;render();
 const focus=document.getElementById('v894SelectedEvent');if(focus&&typeof focus.scrollIntoView==='function')focus.scrollIntoView({behavior:'smooth',block:'nearest'});
 return;
 }
 if(e.target.closest('[data-v894-close]')){states.selected=null;render();return;}
 if(e.target.closest('[data-v894-more]')){states.limit+=36;render();}
 });
 root.addEventListener('change',e=>{
 if(e.target.id==='v894Period'){states.range=e.target.value;states.selected=null;states.limit=36;render();}
 if(e.target.id==='v894World'){states.world=e.target.checked;states.selected=null;states.limit=36;render();}
 });
 if(typeof window.addEventListener==='function')window.addEventListener('tvhub:select',()=>{
 states.selected=null;states.range='all';states.limit=36;render();
 });
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
window.TidensResearchGraphV894={getState:()=>({...states}),getEvents:()=>allEvents.slice(),selectEvent:id=>{if(!allEvents.some(x=>x.id===id))return false;states.selected=id;render();return true},setRange:key=>{if(!periods.some(x=>x.key===key))return false;states.range=key;render();return true}};
})();