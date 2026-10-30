'use strict';
// Pure F4 renderer. Only consumes F3 model objects and escapes all displayed source text.
const fs=require('node:fs');
const {buildFixtures}=require('./f4-reader-fixtures.cjs');
const {originalAreaIcons,originalHeroDataUri}=require('./f4-original-design-assets.cjs');
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
 const area=r.category==='ideas'?'philosophy':r.category||'history';
 const approvedIcon=originalAreaIcons()[area]||originalAreaIcons().history;
 const intro=e.kind==='topic'?e.data.description:(r.description||fields.summary?.selected?.value||'');
 // A short post must not repeat precisely the same summary in its title and article.
 const distinctSummary=fields.summary?.selected?.value&&
   fields.summary.selected.value.trim()!==String(intro||'').trim()?fields.summary.selected.value:null;
 let chronology='';
 if(e.kind==='post'&&e.temporal){
  for(const [key,label] of Object.entries(types)){
   const values=e.temporal[key]?.alternatives||[];
   if(!values.length)continue;
   chronology+='<div class="time-group"><h3>'+esc(label)+'</h3><ul>'+
    values.map(c=>'<li><strong>'+esc(range(c.start,c.end))+'</strong><small>'+esc(c.origin)+(c.certainty?' · '+esc(c.certainty):'')+'</small>'+(c.rationale?'<p class="muted">'+esc(c.rationale)+'</p>':'')+'</li>').join('')+'</ul></div>';
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
 if(r.genre||r.traditionAttribution||r.dateBasis){
  const items=[
   r.genre?['Genre enligt bokregistret',r.genre]:null,
   r.traditionAttribution?['Traditionell författarangivelse – inte bevisad författare',r.traditionAttribution]:null,
   r.dateBasis?['Registrerad dateringsgrund',r.dateBasis]:null
  ].filter(Boolean);
  depth.push('<div class="text-block"><h3>Texttradition och datering</h3><dl class="research-metadata">'+
   items.map(([label,value])=>'<dt>'+esc(label)+'</dt><dd>'+esc(value)+'</dd>').join('')+'</dl></div>');
 }
 const topicalLinks=Array.isArray(r.relatedIds)?r.relatedIds:[];
 if(topicalLinks.length)depth.push('<div class="text-block"><h3>Registrerade tematiska hänvisningar</h3><p>'+
  topicalLinks.map(id=>esc(id)).join(', ')+'</p><p class="muted">Detta är hänvisningar till separata forskningsposter, inte belagda historiska påverkansvägar.</p></div>');
 for(const [key,f] of Object.entries(fields))if(f.conflict)
  depth.push('<div class="caution"><h3>Olika textversioner: '+esc(key)+'</h3><p>En textskillnad är inte automatiskt en vetenskaplig motsägelse.</p><ul>'+
  f.alternatives.map(c=>'<li>'+esc(c.origin)+': '+esc(c.value)+'</li>').join('')+'</ul></div>');
 const refs=(e.references||[]).filter(x=>/^https?:\/\//.test(x.url||''));
 const citations=refs.length?'<p class="muted">Registrerade hänvisningar. En länk betyder inte att ett påstående har verifierats.</p><ul>'+
  refs.map(c=>'<li><a target="_blank" rel="noopener noreferrer" href="'+esc(c.url)+'">'+esc(c.title||c.url)+'</a>'+
  (c.origin?'<small>Registrerad i: '+esc(c.origin)+'</small>':'')+'</li>').join('')+'</ul>':
  '<p class="muted">Inga separata källhänvisningar finns i detta underlag.</p>';
 const sourceDetails=[...(Array.isArray(r.evidenceNotes)?r.evidenceNotes:[]),
  ...(Array.isArray(r.sourceNotes)?r.sourceNotes:[])].filter(x=>x&&typeof x==='object');
 const evidenceContext=sourceDetails.length?
  '<div class="evidence-context"><h3>Källhänvisningarnas uttryckliga räckvidd</h3><p class="muted">Följande beskrivningar följer originalunderlaget. De utgör inte nya oberoende verifieringar.</p><ul>'+
  sourceDetails.map(x=>'<li><strong>'+esc(x.name||x.title||'Registrerad källa')+'</strong>'+
   (x.supports?'<p><b>Registrerat stöd:</b> '+esc(x.supports)+'</p>':'')+
   (x.scope?'<p><b>Räckvidd eller begränsning:</b> '+esc(x.scope)+'</p>':'')+
   (x.type?'<small>Källkategori i underlaget: '+esc(x.type)+'</small>':'')+
   (x.verified?'<small>Registrerad kontrolluppgift: '+esc(x.verified)+' (inte en oberoende granskning här)</small>':'')+
   '</li>').join('')+'</ul></div>':'';
 const comparativeText=r.primaryReference?
  '<p class="muted">Bibelhänvisning som jämförelsetext: '+esc(r.primaryReference)+'. Det innebär inte att denna text styrker den utombibliska uppgiften.</p>':'';
 const note=r.sourceNote?'<p class="muted">Dateringsanteckning i underlaget: '+esc(r.sourceNote)+'</p>':'';
 const sourceContext=e.kind==='source'?
  '<div class="source-metadata"><h3>Källobjektets registrerade uppgifter</h3>'+
  '<dl><dt>Källans typ i originalregistret</dt><dd>'+esc(e.data.sourceKind||'Inte klassificerad')+'</dd>'+
  '<dt>Registrerad proveniens</dt><dd>'+esc(e.data.provenance||'Inte angiven')+'</dd>'+
  '<dt>Vetenskaplig granskning</dt><dd>Inte verifierad genom denna referenspost</dd></dl>'+
  '<p class="muted">En musei- eller forskningslänk är inte automatiskt bevis för varje påstående den används till.</p></div>':'';
 const related=(e.relations||[]).length?'<ul>'+e.relations.map(x=>
  '<li><strong>'+esc(x.to)+'</strong><p>'+esc(x.rationale||x.relationType)+'</p></li>').join('')+'</ul>':
  '<p class="muted">Inga angivna samband i detta underlag.</p>';
 const originItems=[];
 if(r.overviewOrigin)originItems.push(['Inledning',r.overviewOrigin]);
 for(const [key,label] of [['summary','Sammanfattning'],['context','Historiskt sammanhang'],
  ['impact','Betydelse och samband'],['limits','Begränsningar']]){
  if(fields[key]?.selected?.origin)originItems.push([label,fields[key].selected.origin]);
 }
 if(e.data.religion?.origin)originItems.push(['Religionshistorisk betydelse',e.data.religion.origin]);
 const provenanceDetails=originItems.length?
 '<details class="provenance-details"><summary>Visa textfältens ursprung</summary><dl>'+
 originItems.map(([key,origin])=>'<dt>'+esc(key)+'</dt><dd>'+esc(origin)+'</dd>').join('')+
 '</dl></details>':'';
 const sections=[];
 if(distinctSummary)sections.push(['overview','Översikt','<p>'+esc(distinctSummary)+'</p>']);
 // Topics and sources are not events and must not display a contrived date section.
 if(e.kind==='post')sections.push(['time','Tid och datering',chronology]);
 for(const [key,title] of [['context','Historiskt sammanhang'],['impact','Betydelse och samband'],['limits','Begränsningar']])
  if(fields[key]?.selected)sections.push([key,title,'<p>'+esc(fields[key].selected.value)+'</p>']);
 if(sourceContext)sections.push(['source-context','Om källan',sourceContext]);
 if(depth.length)sections.push(['research','Fördjupning',depth.join('')]);
 sections.push(['sources','Källor och ursprung',note+comparativeText+evidenceContext+citations+provenanceDetails]);
 return '<div class="reader" data-kind="'+esc(e.kind)+'" data-area="'+esc(r.category||'history')+'" data-record="'+esc(id)+'">'+
 '<div class="toolbar"><button type="button" class="back">← Tillbaka till exemplen</button><span>F4 · Fristående test</span></div>'+
 '<header class="record-head"><div class="record-label"><span class="approved-area-icon" aria-hidden="true">'+approvedIcon+'</span><p class="eyebrow">'+esc(id)+' · '+esc(kindText(e))+'</p></div><h1 tabindex="-1" class="record-heading">'+esc(e.title)+'</h1>'+
 (e.reviewStatus?'<p class="status">'+esc(e.reviewStatus==='preliminary'?'Preliminärt forskningsunderlag':e.reviewStatus==='draft'?'Forskningsutkast':e.reviewStatus)+'</p>':'')+
 (intro?'<p class="lede">'+esc(intro)+'</p>':'')+

 '<p class="review-note">'+(e.reviewStatus?
   'Käll- och granskningsstatus: ännu inte slutgranskad.':
   'Sammantagen forskningsstatus är inte angiven i detta underlag.')+'</p></header>'+
 '<div class="columns"><nav class="desktop-toc" aria-label="Innehåll"><strong>INNEHÅLL</strong>'+
 sections.map(([k,t])=>'<a href="#'+esc(id+'-'+k)+'">'+esc(t)+'</a>').join('')+'</nav>'+
 '<details class="mobile-toc"><summary>Välj avsnitt</summary><nav aria-label="Innehåll på mobil">'+
 sections.map(([k,t])=>'<a href="#'+esc(id+'-'+k)+'">'+esc(t)+'</a>').join('')+'</nav></details>'+
 '<main>'+sections.map(([k,t,h])=>sec(k,t,h,id)).join('')+'</main>'+
 '<aside aria-label="Samband"><h2>Samband</h2>'+related+
 '<p class="muted">Samband är inte automatiskt belagda historiska påverkansvägar.</p></aside></div></div>';
}
function renderReviewPage(records=buildFixtures()){
 const css=fs.readFileSync('prototypes/f4/reader-preview.css','utf8').replace('__F4_APPROVED_HERO_IMAGE__',originalHeroDataUri());
 if(css.includes('__F4_APPROVED_HERO_IMAGE__'))throw new Error('Approved landscape image token not replaced');
 const icons=originalAreaIcons();
 const areas=[['bible','Bibeln'],['religion','Religioner'],['history','Världshistoria'],['philosophy','Filosofi']];
 const areasMarkup=areas.map(([id,label])=>'<div class="f4-area-chip f4-area-'+id+'"><span class="approved-area-icon" aria-hidden="true">'+icons[id]+'</span><strong>'+esc(label)+'</strong></div>').join('');
 const options=records.map(r=>'<button class="option" data-open="'+esc(r.entity.id)+'" type="button"><strong>'+esc(r.entity.title)+'</strong><small>'+esc(r.entity.id+' · '+kindText(r.entity))+'</small></button>').join('');
 const panels=records.map(r=>'<div class="panel" data-panel="'+esc(r.entity.id)+'" hidden>'+renderFullReader(r)+'</div>').join('');
 const script="(function(){'use strict';const catalog=document.getElementById('catalog'),panels=[...document.querySelectorAll('.panel')];"+
 "let trigger=null,scrollY=0;"+
 "function show(id,button){const found=panels.find(p=>p.dataset.panel===id);if(!found)return;trigger=button||null;scrollY=window.scrollY;catalog.hidden=true;panels.forEach(p=>p.hidden=p!==found);window.scrollTo(0,0);found.querySelector('.record-heading')?.focus({preventScroll:true});}"+
 "function back(){panels.forEach(p=>p.hidden=true);catalog.hidden=false;window.scrollTo(0,scrollY);(trigger||document.querySelector('.option'))?.focus({preventScroll:true});}"+
 "for(const b of document.querySelectorAll('.option'))b.addEventListener('click',()=>show(b.dataset.open,b));"+
 "for(const b of document.querySelectorAll('.back'))b.addEventListener('click',back);"+
 "for(const link of document.querySelectorAll('.mobile-toc a'))link.addEventListener('click',()=>{link.closest('details').open=false;});"+
 "document.addEventListener('keydown',event=>{if(event.key==='Escape'&&catalog.hidden){event.preventDefault();back();}});"+
 "const params=new URLSearchParams(location.search),requested=params.get('record');if(requested&&panels.some(p=>p.dataset.panel===requested)){show(requested,null);}"+
 "})();";
 return '<!doctype html><html lang="sv"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">'+
 '<title>Tidens väv – F4 granskningsprototyp</title><style>'+css+'</style></head><body>'+
 '<header class="top"><strong>Tidens väv</strong><span>F4 · FULLSTÄNDIG FORSKNINGSVY</span></header>'+
 '<div class="notice">Separat granskningsprototyp. Inte en del av den publicerade appen.</div>'+
 '<section id="catalog" class="catalog"><div class="f4-approved-hero"><div class="f4-hero-brand"><strong>Tidens väv</strong><span>Historien, texterna och deras sammanhang</span></div><div class="f4-hero-copy"><p>FORSKNING OCH KÄLLOR</p><h1>Fördjupning utan att tappa sammanhanget</h1><span>En fullständig forskningsvy som visar belägg, dateringar och tolkningar var för sig.</span></div></div><div class="f4-area-key" aria-label="Fyra kunskapsområden">'+areasMarkup+'</div><h2>Utforska forskningsvyn</h2><p>Välj en verklig post från befintliga underlag. Granska innehåll, källor och datumtyper. Återgång till tidslinje och appnavigation utvecklas separat i F5.</p>'+
 '<div class="options">'+options+'</div></section>'+panels+'<script>'+script+'</script></body></html>';
}
module.exports={esc,renderFullReader,renderReviewPage};
