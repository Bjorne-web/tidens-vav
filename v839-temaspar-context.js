/* Tidens väv V8.39 – samma tidslinje för vald post och samtida kategorier.
 * Inga ursprungliga dateringar ändras. Kronologisk närhet är inte belägg för påverkan.
 * Utgångsposten är alltid synlig, även om dess kategori är avmarkerad.
 */
(function(){
 'use strict';
 const definitions=Object.freeze([
  {id:'Historia',label:'Världshistoria',color:'#6d93c6'},
  {id:'Religion & texter',label:'Religion & texter',color:'#8b70bf'},
  {id:'Bibelberättelse',label:'Bibelberättelser – berättad tid',color:'#d88455'},
  {id:'Bibeltext',label:'Textens tillkomst',color:'#bf6e86'},
  {id:'Arkeologi',label:'Arkeologi',color:'#5a9c63'},
  {id:'Folk',label:'Folk',color:'#a97a3d'},
  {id:'Människans utveckling',label:'Människans utveckling',color:'#8195ad'},
  {id:'Civilisation',label:'Civilisationer och historiska riken',color:'#b09a30'},
  {id:'Religion',label:'Religioner',color:'#7960b2'},
  {id:'Byggnadsverk',label:'Byggnadsverk och byggnadsfaser',color:'#8997a7'},
  {id:'Krig',label:'Krig och separata konflikter',color:'#c26d58'},
  {id:'Konflikterande berättelser',label:'Historiska och religiösa berättelser',color:'#c09753'},
  {id:'Bibelberättelser',label:'Bibeltexter och berättelser · olika tidstyper',color:'#cc865e'}
 ]);
 // Samma sex som är ikryssade i användarens bild.
 const selected=new Set(['Religion & texter','Bibelberättelse','Bibeltext','Arkeologi','Religion','Bibelberättelser']);
 function setCategory(id,checked){
  if(!definitions.some(category=>category.id===id))return false;
  if(checked)selected.add(id);else selected.delete(id);
  return true;
 }
 const esc=value=>enc(String(value==null?'':value));
 const fmt=y=>v83FmtYear(y);
 const finite=e=>Number.isFinite(e.start)&&Number.isFinite(e.end)&&e.end>=e.start;
 const labelFor=id=>definitions.find(d=>d.id===id)?.label||id;
 const colorFor=id=>definitions.find(d=>d.id===id)?.color||'#557da4';

 // Utöver befintliga redaktionellt bedömda tidslägen är O049 kontrollerad
 // separat mot Hoyos och Met. Detta är INTE ett godkännande av hela posten.
 const independent=Object.freeze({
  O049:{
   periods:[
    {title:'Första puniska kriget',start:-264,end:-241},
    {title:'Andra puniska kriget',start:-218,end:-201},
    {title:'Tredje puniska kriget',start:-149,end:-146}
   ],
   reference:'Dexter Hoyos, Punic Wars (2011); Metropolitan Museum of Art',
   note:'Tre skilda krig. Perioden 264–146 f.Kr. innebär inte ett oavbrutet krig.'
  }
 });
 function candidatePool(){
  // Oberoende av användarens filter och tidsspann i huvudtidslinjen.
  const {curated,adopted,segmented}=v813BaseEntries();
  const bible=(window.TIDENS_BIBLE_BOOKS||[]).map(b=>({id:b.id,title:b.title,start:b.start,end:b.end,category:'Bibeltext',original:false,bibleBook:true,reviewedTime:true}));
  return [...curated,...adopted,...segmented,...bible].filter(finite);
 }
 function focusSegments(focus,pool){
  const fixed=independent[focus.id];
  if(fixed)return fixed.periods.map((p,i)=>({...focus,...p,id:focus.id,original:true,reviewedTime:true,segmentIndex:i}));
  return pool.filter(e=>e.id===focus.id).map(e=>({...e,reviewedTime:true}));
 }
 function windowFor(focus,segments){
  const values=segments.length?segments:[focus];
  const dated=values.filter(finite);
  if(!dated.length)return null;
  const low=Math.min(...dated.map(e=>e.start));
  const high=Math.max(...dated.map(e=>e.end));
  const span=Math.max(1,high-low);
  const pad=Math.min(700,Math.max(70,Math.round(span*.35)));
  const historical=segments.length>0;
  // Om postens datering inte är separat bedömd får arkivvärden endast
  // ange sökintervall för jämförelse, ALDRIG utgångspostens axelposition.
  return {min:low-pad,max:high+pad,historical,low,high,pad};
 }
 function modelFor(focus){
  const pool=candidatePool(),segments=focusSegments(focus,pool),window=windowFor(focus,segments);
  const comparisons=window ? pool.filter(e=>
     e.id!==focus.id && selected.has(e.category) &&
     e.start<=window.max && e.end>=window.min
    ).sort((a,b)=>a.start-b.start||a.end-b.end||a.id.localeCompare(b.id)) : [];
  // Faser med samma original-ID får finnas separat; övriga identiska
  // dubbleringar från redaktionell projektion avlägsnas.
  const seen=new Set();
  const unique=comparisons.filter(e=>{
    const key=[e.id,e.start,e.end,e.title].join('|');
    if(seen.has(key))return false;
    seen.add(key);return true;
  });
  const groups=definitions.filter(c=>selected.has(c.id)).map(c=>({
    ...c,entries:unique.filter(e=>e.category===c.id)
  })).filter(c=>c.entries.length>0);
  return {focus,segments,window,groups,count:unique.length,selectedCategories:[...selected]};
 }
 const clamp=(v,min,max)=>Math.min(max,Math.max(min,v));
 const scale=840;
 function datedRows(entries,range){
  // Tre kort för tre skilda krigsfaser, samma existerande post-ID.
  const slots=[];
  const cards=entries.map(e=>{
    const x=clamp((e.start-range.min)/(range.max-range.min),0,1)*scale;
    const xe=clamp((e.end-range.min)/(range.max-range.min),0,1)*scale;
    const xCard=clamp(x,0,scale-174);
    let slot=0;
    while(slots[slot]!=null && xCard<slots[slot]+12)slot++;
    slots[slot]=xCard+170;
    const y=slot*76+10;
    const title=esc(e.title);
    const original=e.original&&e.reviewedTime?' · separat daterad originalpost':e.original?' · redaktionellt bedömd originalpost':'';
    return `<div class="v839-duration" style="left:${x.toFixed(1)}px;width:${Math.max(3,xe-x).toFixed(1)}px"></div>
      <span class="v839-point" style="left:${x.toFixed(1)}px"></span>
      <button class="v839-card ${e.id===modelFocusId?'v839-focus-card':''}" style="left:${xCard.toFixed(1)}px;top:${y}px" type="button" data-v839-read="${esc(e.id)}"><strong>${title}</strong><small>${esc(fmt(e.start))}${e.end===e.start?'':' – '+esc(fmt(e.end))}${esc(original)}</small></button>`;
  }).join('');
  return {cards,height:Math.max(91,slots.length*76+20)};
 }
 let modelFocusId='';
 function graphFor(model){
  const range=model.window,focus=model.focus;
  if(!range){
    return `<div class="v839-no-time" role="note"><strong>${esc(focus.title)}</strong> finns med i denna undersökning men saknar användbart tidsintervall. Inget årtal har konstruerats.</div>`;
  }
  modelFocusId=focus.id;
  const length=range.max-range.min;
  const axis=Array.from({length:7},(_,i)=>{
    const val=range.min+length*i/6;
    return `<span class="v839-tick" style="left:${(i/6*100).toFixed(2)}%">${esc(fmt(Math.round(val)))}</span>`;
  }).join('');
  const focusRows=model.segments.length?datedRows(model.segments,range):{
   height:116,cards:`<div class="v839-undated" role="note" aria-label="Vald utgångspost utan separat granskad datering"><div class="v839-undated-kicker">VALD UTGÅNGSPOST · ${esc(focus.id)}</div><b>${esc(focus.title)}</b><span>Datumet i originalarkivet är ännu inte separat källprövat. Posten visas därför utan tidsmarkör, men används som utgångspunkt för jämförelsen.</span><button type="button" data-v839-read="${esc(focus.id)}">Läs vald post →</button></div>`
  };
  const rows=[{label:'UTGÅNGSPOST',id:'focus',color:'#245e99',...focusRows},
    ...model.groups.map(g=>({label:g.label,id:g.id,color:g.color,...datedRows(g.entries,range)}))];
  const html=rows.map(r=>`<div class="v839-row ${r.id==='focus'?'v839-focus-row':''}">
    <div class="v839-row-label" style="border-left:4px solid ${r.color}">${esc(r.label)}<small>${r.id==='focus'?esc(focus.id):esc(r.id)}</small></div>
    <div class="v839-row-track" style="height:${r.height}px;--v839-rowcolor:${r.color}">${r.cards}</div></div>`).join('');
  return `<div class="v839-scroll" role="region" tabindex="0" aria-label="Tidslinje med utgångspost och valda historiska kategorier; rulla i sidled vid behov">
   <div class="v839-plot"><div class="v839-axis"><div class="v839-axis-label">Tidsläge</div><div class="v839-axis-track">${axis}</div></div>${html}</div></div>`;
 }
 function listFor(model){
  const label=(title,items,status)=>`<section class="v839-list-group"><h4>${esc(title)}</h4>${items.length?
    items.map(e=>`<article class="v839-list-item"><div><b>${esc(e.title)}</b> <small>${esc(fmt(e.start))} – ${esc(fmt(e.end))}${status?' · '+esc(status):''}</small></div><button type="button" data-v839-read="${esc(e.id)}">Läs post →</button></article>`).join(''):
    `<p class="v839-muted">Ingen källbedömd datering för den valda posten.</p>`}</section>`;
  return `<div class="v839-list">
   ${label('Utgångspost · '+model.focus.title,model.segments)}
   ${!model.segments.length?`<p class="v839-muted">${esc(model.focus.title)} visas som vald men placeras inte på en påhittad tidpunkt.</p>`:''}
   ${model.groups.map(g=>label(g.label,g.entries)).join('')}</div>`;
 }
 function renderFor(model,mode){
  const options=definitions.map(c=>`<label class="v839-category-option"><input type="checkbox" data-v839-cat="${esc(c.id)}" ${selected.has(c.id)?'checked':''}/><span class="v839-category-dot" style="background:${c.color}"></span><span>${esc(c.label)}</span></label>`).join('');
  const period=model.window;
  const valid=!!model.segments.length;
  const caution=!period?'Ingen jämförbar tidsperiod kan fastställas för denna post.':
   valid?'Utgångspostens tidsläge är separat bedömt; övriga poster är kronologiska jämförelser, inte bevisade samband.':
   'Utgångsposten har ingen separat källbedömd datering. Originalarkivets årtal används ENBART för att söka möjliga jämförelseposter – utgångsposten placeras utan tidsmarkör.';
  return `<section class="v839-contemporaries" aria-label="Vald post och samtidiga kategorier">
   <div class="v839-toolbar"><div><h3>Den valda posten i världens samtid</h3><p>${esc(caution)}</p></div>
     <span class="v839-counter">${model.count} jämförelseposter · ${model.groups.length} kategorier med träffar</span></div>
   <details class="v839-category-filter"><summary>Välj kategorier för jämförelsen (${selected.size} av ${definitions.length})</summary>
     <div class="v839-category-grid">${options}</div><p class="v839-filter-note">Utgångsposten visas alltid, även om dess kategori inte är ikryssad. Endast redaktionellt daterade jämförelseposter visas på axeln.</p>
   </details>
   ${mode==='list'?listFor(model):graphFor(model)}
   <p class="v839-footnote">Kronologisk samtidighet innebär inte belagt inflytande på Israels religion, judendomen eller kristendomen. Läs varje posts källor för att bedöma sambanden.</p>
  </section>`;
 }
 function enhance(){
  const focusId=typeof v829Focus!=='undefined'?v829Focus.id:null;
  const focus=focusId?(idEvent(focusId)||(window.TIDENS_BIBLE_BOOKS||[]).filter(b=>b.id===focusId).map(b=>({id:b.id,title:b.title,start:b.start,end:b.end,category:'Bibeltext',description:b.critical,original:false,bibleBook:true}))[0]):null;
  const root=document.getElementById('exploreView');
  const container=root?.querySelector('.v833-self');
  const old=container?.querySelector('.v835-actual-timeline');
  if(!focus||!old)return;
  const model=modelFor(focus);
  const wrapper=document.createElement('div');
  wrapper.className='v839-enhanced';
  wrapper.innerHTML=renderFor(model,v83Display);
  old.replaceWith(wrapper);
  // Ta bort den gamla varningen om ett separat, orelaterat temaspår.
  const obsolete=container.querySelector('.v835-reference-warning,.v835-timeline-explainer');
  if(obsolete)obsolete.remove();
  const previousText=container.querySelector('.v835-extra-context');
  if(previousText){
    // Behåll den äldre källkritiska textjämförelsen som ett frivilligt
    // komplement, även när den nya, gemensamma tidslinjen används.
    const summary=previousText.querySelector('summary');
    if(summary)summary.textContent='Visa fördjupad daterings- och jämförelsekommentar';
  }
  wrapper.querySelectorAll('[data-v839-cat]').forEach(cb=>cb.addEventListener('change',()=>{
    setCategory(cb.dataset.v839Cat,cb.checked);
    renderExplore();
  }));
  wrapper.querySelectorAll('[data-v839-read]').forEach(b=>b.addEventListener('click',()=>{
    const id=b.dataset.v839Read;
    if(id.startsWith('B')&&typeof window.TidensOpenBookV858==='function')window.TidensOpenBookV858(id);
    else setSelected(id);
    if(window.innerWidth<=900&&typeof v84OpenReader==='function')v84OpenReader();
  }));
  const text=container.querySelector('.v833-selflead p');
  if(text && (!focus.description||focus.description.trim()==='')){
    const source=(typeof sourceCardsV86!=='undefined'&&sourceCardsV86[focus.id])||null;
    if(source?.summary)text.textContent=source.summary;
  }
 }
 window.TidensTemasparV839=Object.freeze({
  categories:definitions.map(x=>({id:x.id,label:x.label})),
  selected:()=>[...selected],
  setCategory,
  modelFor,
  renderFor
 });
 const oldRender=renderExplore;
 renderExplore=function(){oldRender();enhance()};
 if(document.getElementById('exploreView')?.querySelector('.v833-self'))enhance();
})();
