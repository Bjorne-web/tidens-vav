'use strict';
// Pure F4 renderer. Only consumes F3 model objects and escapes all displayed source text.
const fs=require('node:fs');
const {buildFixtures}=require('./f4-reader-fixtures.cjs');
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const year=n=>n<0?Math.abs(n)+' f.Kr.':n>0?n+' e.Kr.':'år 0 (astronomisk notation)';
const range=(a,b)=>a===b?year(a):year(a)+' – '+year(b);
const types={event:'Historisk händelse','historical-period':'Historisk period',
 composition:'Textens tillkomst','textual-chronology':'Textuell kronologi',
 narrative:'Berättad tid','material-witness':'Bevarat textvittne'};
const kindText=e=>e.kind==='post'?'Forskningspost':e.kind==='topic'?'Forskningsfråga':'Källreferens';
function sec(key,title,body,id){
 return body?'<section class="article-section" id="'+esc(id+'-'+key)+'"><h2>'+esc(title)+'</h2>'+body+'</section>':'';
}
function renderFullReader(r){
 if(!r?.entity?.id)throw new TypeError('F4 reader needs a record');
 const e=r.entity,id=e.id,fields=e.data.fields||{};
 const intro=e.kind==='topic'?e.data.description:(r.description||fields.summary?.selected?.value||'');
 let chronology='';
 if(e.kind==='post'&&e.temporal){
  for(const [key,label] of Object.entries(types)){
   const values=e.temporal[key]?.alternatives||[];
   if(!values.length)continue;
   chronology+='<div class="time-group"><h3>'+esc(label)+'</h3><ul>'+
    values.map(c=>'<li><strong>'+esc(range(c.start,c.end))+'</strong><small>'+esc(c.origin)+(c.certainty?' · '+esc(c.certainty):'')+'</small></li>').join('')+'</ul></div>';
  }
  if(e.temporal.unclassified?.length)
   chronology+='<div class="time-group caution"><h3>Ursprungsdatering – tidsbegrepp oklart</h3><ul>'+
   e.temporal.unclassified.map(c=>'<li>'+esc(range(c.start,c.end))+'<small>'+esc(c.origin)+'</small></li>').join('')+'</ul></div>';
 }
 if(r.narrative)chronology+='<div class="time-group"><h3>Berättad tid (inte tillkomstdatum)</h3><p>'+esc(r.narrative)+'</p></div>';
 if(!chronology)chronology='<p class="muted">Ingen egen säker händelsedatering är registrerad för detta objekt.</p>';
 const depth=[];
 if(e.kind==='topic')for(const x of e.data.sections||[])
  depth.push('<div class="text-block"><h3>'+esc(x.title)+'</h3><p>'+esc(x.body)+'</p></div>');
 if(e.kind==='post'&&e.data.religion?.value)
  depth.push('<div class="significance"><h3>Betydelse för Israels religion, judendomen och kristendomen</h3>'+
   (e.data.religion.level?'<p class="muted">'+esc(e.data.religion.level)+'</p>':'')+
   '<p>'+esc(e.data.religion.value)+'</p><small>Ursprung: '+esc(e.data.religion.origin)+'</small></div>');
 if(r.canon)depth.push('<div class="text-block"><h3>Kanon och tradition</h3><p>'+esc(r.canon)+'</p></div>');
 for(const [key,f] of Object.entries(fields))if(f.conflict)
  depth.push('<div class="caution"><h3>Olika textversioner: '+esc(key)+'</h3><p>En textskillnad är inte automatiskt en vetenskaplig motsägelse.</p><ul>'+
  f.alternatives.map(c=>'<li>'+esc(c.origin)+': '+esc(c.value)+'</li>').join('')+'</ul></div>');
 const refs=(e.references||[]).filter(x=>/^https?:\/\//.test(x.url||''));
 const citations=refs.length?'<p class="muted">Registrerade hänvisningar. En länk betyder inte att ett påstående har verifierats.</p><ul>'+
  refs.map(c=>'<li><a target="_blank" rel="noopener noreferrer" href="'+esc(c.url)+'">'+esc(c.title||c.url)+'</a>'+
  (c.origin?'<small>Registrerad i: '+esc(c.origin)+'</small>':'')+'</li>').join('')+'</ul>':
  '<p class="muted">Inga separata källhänvisningar finns i detta underlag.</p>';
 const related=(e.relations||[]).length?'<ul>'+e.relations.map(x=>
  '<li><strong>'+esc(x.to)+'</strong><p>'+esc(x.rationale||x.relationType)+'</p></li>').join('')+'</ul>':
  '<p class="muted">Inga angivna samband i detta underlag.</p>';
 const sections=[['overview','Översikt',intro?'<p>'+esc(intro)+'</p>':'<p class="muted">Sammanfattning saknas.</p>'],
  ['time','Tid och datering',chronology]];
 for(const [key,title] of [['context','Historiskt sammanhang'],['impact','Betydelse och samband'],['limits','Begränsningar']])
  if(fields[key]?.selected)sections.push([key,title,'<p>'+esc(fields[key].selected.value)+'</p>']);
 if(depth.length)sections.push(['research','Fördjupning',depth.join('')]);
 sections.push(['sources','Källor och ursprung',citations]);
 return '<div class="reader" data-kind="'+esc(e.kind)+'" data-record="'+esc(id)+'">'+
 '<div class="toolbar"><button type="button" class="back">← Tillbaka till exemplen</button><span>F4 · Fristående test</span></div>'+
 '<header class="record-head"><p class="eyebrow">'+esc(id)+' · '+esc(kindText(e))+'</p><h1>'+esc(e.title)+'</h1>'+
 (e.reviewStatus?'<p class="status">'+esc(e.reviewStatus==='preliminary'?'Preliminärt forskningsunderlag':e.reviewStatus)+'</p>':'')+
 (intro?'<p class="lede">'+esc(intro)+'</p>':'')+'</header>'+
 '<div class="columns"><nav aria-label="Innehåll"><strong>INNEHÅLL</strong>'+
 sections.map(([k,t])=>'<a href="#'+esc(id+'-'+k)+'">'+esc(t)+'</a>').join('')+'</nav>'+
 '<main>'+sections.map(([k,t,h])=>sec(k,t,h,id)).join('')+'</main>'+
 '<aside aria-label="Samband"><h2>Samband</h2>'+related+
 '<p class="muted">Samband är inte automatiskt belagda historiska påverkansvägar.</p></aside></div></div>';
}
function renderReviewPage(records=buildFixtures()){
 const css=fs.readFileSync('prototypes/f4/reader-preview.css','utf8');
 const options=records.map(r=>'<button class="option" data-open="'+esc(r.entity.id)+'" type="button"><strong>'+esc(r.entity.title)+'</strong><small>'+esc(r.entity.id+' · '+kindText(r.entity))+'</small></button>').join('');
 const panels=records.map(r=>'<div class="panel" data-panel="'+esc(r.entity.id)+'" hidden>'+renderFullReader(r)+'</div>').join('');
 const script="(function(){'use strict';const catalog=document.getElementById('catalog'),panels=[...document.querySelectorAll('.panel')];"+
 "function back(){catalog.hidden=false;panels.forEach(p=>p.hidden=true);window.scrollTo(0,0);document.querySelector('.option')?.focus();}"+
 "for(const b of document.querySelectorAll('.option'))b.addEventListener('click',()=>{catalog.hidden=true;panels.forEach(p=>p.hidden=p.dataset.panel!==b.dataset.open);window.scrollTo(0,0);});"+
 "for(const b of document.querySelectorAll('.back'))b.addEventListener('click',back);back();})();";
 return '<!doctype html><html lang="sv"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">'+
 '<title>Tidens väv – F4 granskningsprototyp</title><style>'+css+'</style></head><body>'+
 '<header class="top"><strong>Tidens väv</strong><span>F4 · FULLSTÄNDIG FORSKNINGSVY</span></header>'+
 '<div class="notice">Separat granskningsprototyp. Inte en del av den publicerade appen.</div>'+
 '<section id="catalog" class="catalog"><h1>Utforska forskningsvyn</h1><p>Välj en verklig post från befintliga underlag. Granska innehåll, källor och datumtyper. Återgång till tidslinje och appnavigation utvecklas separat i F5.</p>'+
 '<div class="options">'+options+'</div></section>'+panels+'<script>'+script+'</script></body></html>';
}
module.exports={esc,renderFullReader,renderReviewPage};
