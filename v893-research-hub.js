/* V8.93 – en ingång till alla forskningsfördjupningar. Behåller historiska data och C6 orörda. */
(function(){
'use strict';
const host=document.getElementById('researchView');if(!host)return;
const data=window.TIDENS_CHURCH_SHIFTS;
if(!data||!Array.isArray(data.topics))return;
const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const groups=[
{heading:'Livets stora frågor',sub:'Idéhistoria, religionshistoria och filosofiska problem',cards:[
{id:'afterlife',label:'Himmel, helvete och livet efter döden',desc:'Från Sheol via uppståndelse och dom till senare kristna modeller.',target:'v888Track',badge:'Historisk fördjupning'},
{id:'good',label:'Är Gud god?',desc:'Job, gudomlig rättvisa, lidande och moralfilosofiska svar.',target:'v889-good',badge:'Historisk fördjupning'},
{id:'will',label:'Den fria viljan',desc:'Antika tänkare, Paulus, Augustinus och modern frihetsdebatt.',target:'v889-will',badge:'Historisk fördjupning'},
{id:'nihilism',label:'Nihilismen – finns det en mening med livet?',desc:'Från Jacobi och Kierkegaard till Nietzsche och Camus. Historiska årtal, filosofi och religionskritik.',target:'v892NihilismTrack',badge:'Historisk fördjupning'},
{id:'bridge',label:'När frågorna möts',desc:'Hur möts gudomlig godhet, mänskligt ansvar och slutligt straff?',target:'v890Bridge',badge:'Jämförande fördjupning'}
]},
{heading:'Bibel, vetenskap och tolkning',sub:'När nya forskningsmetoder förändrar läsningen av Bibeln',keys:['heliocentrism','evolution','criticism']},
{heading:'Kyrkans historia och etiska omprövningar',sub:'Vilka kyrkor ändrade sin tolkning, och vad hände samtidigt i världen?',keys:['sexuality','slavery','women','baptism','freedom','antisemitism','colonialism','divorce','usury']}
];
const counts=new Map(data.topics.map(t=>[t.id,data.events.filter(e=>e.topic===t.id).length]));
const datedQuestions=window.TIDENS_BIG_QUESTIONS_TIMELINE?.events||[];
for(const name of ['afterlife','good','will','nihilism'])counts.set(name,datedQuestions.filter(e=>e.topics.includes(name)).length);
counts.set('bridge',datedQuestions.filter(e=>e.topics.includes('good')||e.topics.includes('will')).length);
for(const group of groups)if(group.keys)group.cards=group.keys.map(id=>{
const topic=data.topics.find(t=>t.id===id);
return{id,label:topic.label,desc:topic.description,target:'tvChurchShifts',badge:counts.get(id)+' historiska händelser'};
});
// Behåll direkta postlänkar som öppnas från tidslinje och sökresultat.
const incoming=typeof window.location?.search==='string'?window.location.search:'';
for(const c of groups[0].cards)c.badge=counts.get(c.id)+' daterade milstolpar';
let selected=/(?:[?&])tv_id=/.test(incoming)?'legacy':'overview';
const known=new Set(['tvResearchHub','v890Nav','tvChurchShifts','v888Track','v889-good','v889-will','v890Bridge','v892NihilismTrack']);
const cards=groups.flatMap(g=>g.cards);
const labels=Object.fromEntries(cards.map(c=>[c.id,c.label]));
labels.all='Alla historiska händelser';
labels.legacy='Övriga forskningstexter och granskningsregister';
const nTotal=data.events.length+datedQuestions.length;
function overview(){
return '<div class="tvhub-hero tv876-hero"><span class="v888-kicker tv876-eyebrow">FÖRDJUPNINGAR · FORSKNINGSBIBLIOTEK</span><h1>Utforska historia, Bibeln och människan</h1><p>Alla fördjupningar finns nu på ett ställe. Välj ett ämne för att läsa dess forskningsgenomgång, se daterade händelser och följa källorna. Du kan också jämföra vad som hände i kyrkan, samhället och vetenskapen samtidigt.</p><div class="tvhub-stats"><span><b>'+cards.length+'</b> forskningsfördjupningar</span><span><b>'+nTotal+'</b> källanknutna händelser</span><span><b>3</b> perspektiv på tidslinjen</span></div><div class="tvhub-tools"><label for="tvhubSearch">Sök bland forskningsområden</label><input id="tvhubSearch" type="search" placeholder="Sök t.ex. dop, homosexualitet, helvete ..." autocomplete="off"></div></div>'+
groups.map((g,i)=>'<section class="tvhub-group tv876-section-head" aria-label="'+esc(g.heading)+'"><h3>'+esc(g.heading)+'</h3><p>'+esc(g.sub)+'</p><div class="tvhub-grid">'+g.cards.map(c=>'<button type="button" class="tvhub-card tv876-path" data-tvhub-open="'+esc(c.id)+'"><strong>'+esc(c.label)+'</strong><span>'+esc(c.desc)+'</span><small>'+esc(c.badge)+' <span aria-hidden="true">↗</span></small></button>').join('')+'</div></section>').join('')+
'<section class="tvhub-other"><h3>Fler sätt att utforska</h3><div class="tvhub-actions"><button type="button" data-tvhub-open="all">Visa alla '+nTotal+' historiska milstolpar</button><button type="button" data-tvhub-open="legacy">Visa tidigare forskningsregister och granskningar</button></div><p>Temat <b>Samkönade relationer</b> är ett forskningsområde med historiska texter och konkurrerande teologiska tolkningar; det är inte författarens personliga slutsats som styr vilka belägg som redovisas.</p></section>';
}
function selectedBar(){
const id=selected;
return '<div class="tvhub-activebar tv876-hero"><button type="button" class="tvhub-back" data-tvhub-open="overview">← Alla fördjupningar</button><div><span class="v888-kicker tv876-eyebrow">FORSKNINGSOMRÅDE</span><h2>'+esc(labels[id]||id)+'</h2><p>'+ (counts.has(id)?esc(counts.get(id))+' källanknutna historiska händelser · välj en milstolpe i tidslinjen för källan':'Historisk och religionsvetenskaplig genomgång med klickbara texthänvisningar')+'</p></div></div>'+
'<nav class="tvhub-shortcuts" aria-label="Växla forskningsområde"><button type="button" data-tvhub-open="overview">Översikt</button>'+cards.filter(c=>c.id!==id).slice(0,4).map(c=>'<button type="button" data-tvhub-open="'+esc(c.id)+'">'+esc(c.label)+'</button>').join('')+'</nav><div id="tvResearchGraph" class="tvresearch-graph-host"></div>';
}
function ensureHub(){
let hub=document.getElementById('tvResearchHub');
if(!hub){
 const anchor=host.querySelector('#tvChurchShifts')||host.querySelector('#v890Nav')||host.firstElementChild;
 if(!anchor)return null;
 hub=document.createElement('section');hub.id='tvResearchHub';hub.className='tvhub-root';
 host.insertBefore(hub,anchor);
}
return hub;
}
function updateVisibility(){
const hub=ensureHub();if(!hub)return;
const id=selected;
const target=id==='overview'?null:id==='legacy'?'legacy':['all',...data.topics.map(t=>t.id)].includes(id)?'tvChurchShifts':cards.find(c=>c.id===id)?.target;
for(const el of Array.from(host.children)){
 if(el===hub)continue;
 if(el.id==='v890Nav'){el.hidden=true;el.classList.add('tvhub-inactive');continue;}
 if(target==='legacy'){el.hidden=known.has(el.id);el.classList.toggle('tvhub-inactive',known.has(el.id));continue;}
 const active=el.id===target;
 el.hidden=!active;el.classList.toggle('tvhub-inactive',!active);
}
 if(target==='tvChurchShifts'&&window.TidensChurchShiftsV1){
  window.TidensChurchShiftsV1.selectTopic(id==='all'?'all':id);
 }
}
function render(){
const hub=ensureHub();if(!hub)return;
hub.innerHTML=selected==='overview'?overview():selectedBar();
updateVisibility();
}
function select(id,scroll=true){
if(id!=='overview'&&id!=='legacy'&&id!=='all'&&!cards.some(c=>c.id===id))return false;
selected=id;render();
if(typeof window.dispatchEvent==='function'&&typeof CustomEvent!=='undefined')window.dispatchEvent(new CustomEvent('tvhub:select',{detail:{topic:id}}));
const hub=document.getElementById('tvResearchHub');if(scroll&&hub&&typeof hub.scrollIntoView==='function')hub.scrollIntoView({behavior:'smooth',block:'start'});
return true;
}
function init(){
const hub=ensureHub();if(!hub)return;
render();
host.addEventListener('click',e=>{const b=e.target.closest('[data-tvhub-open]');if(!b)return;select(b.getAttribute('data-tvhub-open'))});
host.addEventListener('input',e=>{
if(e.target.id!=='tvhubSearch')return;
const q=e.target.value.toLocaleLowerCase('sv').trim();
for(const group of hub.querySelectorAll('.tvhub-group')){
let n=0;for(const card of group.querySelectorAll('.tvhub-card')){
const match=card.textContent.toLocaleLowerCase('sv').includes(q);card.hidden=!match;if(match)n++;
}group.hidden=n===0;}
});
if(typeof window.addEventListener==='function')window.addEventListener('tvcs:select',e=>{
const topic=e.detail?.topic;if(counts.has(topic)&&selected!==topic)select(topic,false);
});
new MutationObserver(()=>{if(!document.getElementById('tvResearchHub'))render();else updateVisibility()}).observe(host,{childList:true});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
window.TidensResearchHub={select,getSelected:()=>selected,getTopics:()=>cards.map(x=>({id:x.id,label:x.label,count:counts.get(x.id)||null}))};
})();