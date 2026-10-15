/* V8.76: one stable public-facing landing page; no legacy incremental cards. */
(function(){
  'use strict';
  const host=document.getElementById('startView');
  if(!host || typeof v812Start!=='function')return;
  const pathways=[
    {title:'Tidslinje',desc:'Följ händelser, samhällen och bibeltexternas tillkomst längs samma tidsskala.',target:'timeline',cta:'Utforska tidslinjen'},
    {title:'Bibelns böcker',desc:'Undersök när olika texter kan ha skrivits och omarbetats – inte bara vilken tid de berättar om.',target:'books',cta:'Se bibelböckerna'},
    {title:'Textparalleller',desc:'Jämför bibeltexter med äldre och samtida traditioner och bedöm både likheter och skillnader.',target:'parallels',cta:'Jämför texter'},
    {title:'Arkeologi & Bibeln',desc:'Se vad fynd kan visa, vad som fortfarande är omdiskuterat och vad de inte kan bevisa.',target:'archaeology',cta:'Undersök fynd'},
    {title:'Israels religion',desc:'Upptäck hur föreställningar och gudstro vuxit fram i den forntida Främre Orientens värld.',target:'religion',cta:'Utforska religionshistoria'},
    {title:'Granskad kronologi',desc:'Pröva årtal, handskriftsvittnen och skilda typer av historiska påståenden mot källorna.',target:'chronology',cta:'Granska årtal'}
  ];
  function open(target){
    if(target==='books'){
      view('timeline');
      const checkbox=document.getElementById('tvOnlyBooks');
      if(checkbox && !checkbox.checked){checkbox.checked=true;checkbox.dispatchEvent(new Event('change',{bubbles:true}));}
      return;
    }
    view(target);
  }
  v812Start=function(){
    host.innerHTML=`<div class="tv876-start">
      <div class="tv876-hero">
        <div class="tv876-eyebrow">TIDENS VÄV · BIBELN I SITT HISTORISKA SAMMANHANG</div>
        <h1>Vad finns bakom Bibelns berättelser?</h1>
        <p class="tv876-lead">Bibeln växte fram under lång tid, bland människor som levde i verkliga samhällen, talade olika språk och delade idéer med sin omvärld. Tidens väv är en väg in i den historien – för den som är troende, tveksam, nyfiken eller bara vill förstå mer.</p>
        <p>Här kan du följa världshistorien sida vid sida med Bibelns texter, jämföra andra antika berättelser och undersöka hur forskare arbetar med arkeologi, språk, handskrifter och dateringar. Målet är inte att tala om vad du ska tro, utan att ge dig redskap att ställa bättre frågor och själv värdera underlagen.</p>
      </div>
      <section class="tv876-orientation" aria-labelledby="tv876-why">
        <h2 id="tv876-why">Tre frågor att ta med sig</h2>
        <div class="tv876-principles">
          <div><h3>Vad berättar texten?</h3><p>Hur förstår vi orden, genren och vad författaren ville förmedla?</p></div>
          <div><h3>Vilken värld växte den fram i?</h3><p>Vad vet vi om människor, platser, idéer och äldre traditioner?</p></div>
          <div><h3>Hur säkert vet vi det?</h3><p>Vilka källor finns, hur dateras de och var är forskarna oense?</p></div>
        </div>
      </section>
      <section class="tv876-paths" aria-labelledby="tv876-path-heading">
        <div class="tv876-section-head"><h2 id="tv876-path-heading">Välj var du vill börja</h2><p>Du behöver inte gå en viss väg. Varje ingång leder till ett forskningsområde i appen.</p></div>
        <div class="tv876-grid">${pathways.map((p,i)=>`<button type="button" class="tv876-path" data-tv876-open="${p.target}"><span class="tv876-path-number">${String(i+1).padStart(2,'0')}</span><strong>${p.title}</strong><span>${p.desc}</span><em>${p.cta} →</em></button>`).join('')}</div>
      </section>
      <section class="tv876-method" aria-labelledby="tv876-method-heading">
        <h2 id="tv876-method-heading">Att läsa med öppna ögon</h2>
        <p>Vi skiljer mellan <strong>när något påstås ha hänt</strong>, <strong>när en text kan ha skrivits eller redigerats</strong> och <strong>hur gamla de bevarade handskrifterna är</strong>. En arkeologisk upptäckt bevisar inte automatiskt alla delar av en berättelse, och forskningens slutsatser kan förändras när nya belägg tillkommer.</p>
        <p>Vissa poster är fortfarande arbetsmaterial. Det framgår därför av underlagen när en datering är preliminär, en fråga omdebatterad eller en fullständig granskning saknas.</p>
      </section>
      <section class="tv876-closing"><h2>Det börjar med en fråga</h2><p>Varför finns två skapelseberättelser? Hur gammal är en bibeltext? Vad kan Dödahavsrullarna berätta? Eller vad hände egentligen i det samhälle där Jesus levde? Välj något du undrar över och följ spåren vidare.</p><button type="button" data-tv876-open="timeline">Gå till tidslinjen →</button></section>
    </div>`;
    host.querySelectorAll('[data-tv876-open]').forEach(button=>button.addEventListener('click',()=>open(button.dataset.tv876Open)));
  };
  // The trial guide remains in the codebase for later decisions but is not public navigation.
  const pilot=document.getElementById('navPilot');
  if(pilot)pilot.remove();
  document.querySelectorAll('[data-v84nav="pilot"]').forEach(node=>node.remove());
  const original=document.getElementById('v827ResearchMenu');
  if(original)original.querySelectorAll('[data-v827-view="pilot"]').forEach(node=>node.remove());
  // Re-render only if already on the start page; all future visits use the same function.
  if(!host.classList.contains('hidden'))v812Start();
})();
