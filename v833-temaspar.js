/* V8.33 – en enhetlig ingång till kuraterade temaspår och egna undersökningar.
   Befintliga data och evidensklassificeringar ändras inte. */
(function () {
  'use strict';
  const oldRender = renderExplore;
  const safe = value => enc(String(value == null ? '' : value));
  const bibleEvents=()=> (window.TIDENS_BIBLE_BOOKS||[]).map(b=>({id:b.id,title:b.title,start:b.start,end:b.end,category:'Bibeltext',description:b.critical,original:false,bibleBook:true}));
  const allResearch = () => [...events,...bibleEvents()].sort((a,b)=>a.title.localeCompare(b.title,'sv'));
  const allOriginal = () => originalEvents.slice().sort((a,b)=>a.title.localeCompare(b.title,'sv'));
  const vetted = () => [...v813Entries().filter(e => e.v813Status !== 'original' && Number.isFinite(e.start) && Number.isFinite(e.end)),...bibleEvents()];
  const currentFocus = () => v829Focus.id ? allResearch().find(e=>e.id===v829Focus.id)||allOriginal().find(e=>e.id===v829Focus.id)||null : null;

  // Endast uttryckligen underbyggda tidslägen för originalposter får
  // visas som daterade stadier. Övriga importerade årtal hålls utanför
  // grafens datering tills motsvarande källkontroll genomförts.
  const sourcedOriginalPeriods = Object.freeze({
    O049: {
      from: -264, to: -146,
      note: 'Tre skilda krig mellan Rom och Kartago, inte oavbruten strid under hela intervallet.',
      sourceTitle: 'Dexter Hoyos, Punic Wars (2011), Wiley',
      sourceUrl: 'https://onlinelibrary.wiley.com/doi/abs/10.1002/9781444338232.wbeow506',
      corroborationTitle: 'Metropolitan Museum of Art – Italienska halvöns kronologi',
      corroborationUrl: 'https://www.metmuseum.org/pt/toah/ht/04/eust.html',
      phases: [
        {title:'Första puniska kriget',start:-264,end:-241},
        {title:'Andra puniska kriget',start:-218,end:-201},
        {title:'Tredje puniska kriget',start:-149,end:-146}
      ]
    }
  });
  function sourcedOriginalTimeline(item,positions){
    const period=sourcedOriginalPeriods[item.id];
    if(!period)return null;
    // Alla tre faserna har samma befintliga post-ID: klick öppnar O049.
    // Ingen ny, okänd post skapas i databasen.
    const phases=period.phases.map(x=>({
      id:item.id,title:x.title,start:x.start,end:x.end,
      description:period.note,category:'Historia',original:false
    }));
    // Närliggande poster visas som kronologisk kontext och inte som
    // orsakskedja. Begränsa urvalet till axelns faktiska område.
    const comparison=positions.filter(e=>e.id!==item.id && e.start<=period.to+35 &&
      e.end>=period.from-35).sort((a,b)=>{
        const middle=(period.from+period.to)/2;
        const ad=Math.abs((a.start+a.end)/2-middle),bd=Math.abs((b.start+b.end)/2-middle);
        return ad-bd||a.start-b.start;
      }).slice(0,4);
    const entries=[...phases,...comparison].sort((a,b)=>a.start-b.start || a.end-b.end);
    const theme={id:'own-inquiry',min:period.from-35,max:period.to+35};
    const plot=v83Display==='list'?v83TimelineRows(entries):v83Graph(theme,entries);
    return '<div class="v835-timeline-explainer v838-sourced-original"><strong>Utgångsposten '+
      safe(item.title)+' visas nu i rätt tidsläge.</strong> '+safe(period.note)+
      ' Tidsläget har kontrollerats separat från det äldre originalarkivets övriga uppgifter. '+
      '<strong>Samtidighet visar inte påverkan.</strong><div class="v838-timeline-sources">Källor: '+
      '<a href="'+safe(period.sourceUrl)+'" target="_blank" rel="noopener noreferrer">'+safe(period.sourceTitle)+' ↗</a>'+
      ' · <a href="'+safe(period.corroborationUrl)+'" target="_blank" rel="noopener noreferrer">'+safe(period.corroborationTitle)+' ↗</a></div></div>'+
      '<div class="v835-actual-timeline v838-sourced-timeline">'+plot+'</div>';
  }

  function contextFor(item) {
    const period=sourcedOriginalPeriods[item.id];
    if(period){
      return '<div class="v833-period"><div class="v833-period-heading">Källstödd historisk datering: '+
        safe(v83FmtYear(period.from))+' – '+safe(v83FmtYear(period.to))+
        '</div><p>'+safe(period.note)+' Denna kontroll gäller de tre krigens historiska intervall och innebär inte en fullständig faktagranskning av originalposten.</p>'+
        '<ol class="v833-neighbors">'+period.phases.map(p=>'<li class="v833-active"><span>'+
          safe(v83FmtYear(p.start))+' – '+safe(v83FmtYear(p.end))+
          '</span><b>'+safe(p.title)+'</b><small>Krigsfas</small></li>').join('')+'</ol></div>';
    }
    const research = vetted();
    const position = !item.original && research.find(e => e.id === item.id);
    if (!position) return `<div class="v833-undated" role="note"><b>Ingen vetenskapligt försvarbar placering i huvudtidslinjen har hittats.</b><p>Posten kan undersökas och jämföras här, men vi använder inte ett ursprungligt Excel-årtal eller en annan händelses datering som ersättning.</p></div>`;
    const mid = (position.start + position.end)/2;
    const near = research.filter(e=>e.id!==item.id).map(e=>({item:e,d:Math.abs((e.start+e.end)/2-mid)})).sort((a,b)=>a.d-b.d).slice(0,5).sort((a,b)=>a.item.start-b.item.start).map(x=>x.item);
    const describe = e => `${safe(v83FmtYear(e.start))}${e.start===e.end?'':' – '+safe(v83FmtYear(e.end))}`;
    return `<div class="v833-period"><div class="v833-period-heading">Forskningsbedömt tidsläge: <b>${describe(position)}</b></div><p>Följande poster ligger nära i tid, men kan höra till andra platser och kulturer. <strong>Kronologisk närhet är inte belägg för påverkan eller beroende.</strong></p><ol class="v833-neighbors"><li class="v833-active"><span>${describe(position)}</span><b>${safe(item.title)}</b><small>Utgångspost</small></li>${near.map(e=>`<li><span>${describe(e)}</span><b>${safe(e.title)}</b><button type="button" data-v833-open="${safe(e.id)}">Undersök →</button></li>`).join('')}</ol></div>`;
  }


  // Bevara tidslinjen i Temaspår även när en enskild forskningspost är vald.
  // Tidssamband är kronologiska jämförelser, inte evidens för överföring.
  function focusTimeline(item) {
    const positions = vetted();
    const sourced=sourcedOriginalTimeline(item,positions);
    if(sourced)return sourced;
    const focusPosition = !item.original ? positions.find(e=>e.id===item.id) : null;
    if(!focusPosition) {
      const theme=v83Current();
      const reference=v83TopicEvents(theme);
      const historical = (v83Display==='list'||theme.id==='humans')
        ? v83TimelineRows(reference) : v83Graph(theme,reference);
      return '<div class="v835-reference-warning" role="note"><strong>Ingen säker tidsplacering för den valda posten.</strong> Nedan visas tidslinjen för det separat valda, färdiga temaspåret <b>'+
        safe(theme.name)+'</b>, enbart som orientering. Den valda posten placeras inte på ett uppfunnet årtal och tillhör inte automatiskt detta spår.</div>'+
        '<div class="v835-actual-timeline v835-reference-timeline">'+historical+'</div>';
    }
    const mid=(focusPosition.start+focusPosition.end)/2;
    const neighbors = positions.filter(e=>e.id!==item.id)
      .map(e=>({event:e,distance:Math.abs((e.start+e.end)/2-mid)}))
      .sort((a,b)=>a.distance-b.distance || a.event.start-b.event.start)
      .filter((e,i,all)=>all.findIndex(x=>x.event.id===e.event.id)===i)
      .slice(0,7).map(x=>x.event);
    const entries=[focusPosition,...neighbors].sort((a,b)=>a.start-b.start||a.end-b.end);
    const min=Math.min(...entries.map(e=>e.start));
    const max=Math.max(...entries.map(e=>e.end));
    const span=Math.max(1,max-min);
    const pad=Math.max(25,Math.round(span*.08));
    const timelineTheme={id:'own-inquiry',min:min-pad,max:max+pad};
    const graphic=v83Display==='list'?v83TimelineRows(entries):v83Graph(timelineTheme,entries);
    return '<div class="v835-timeline-explainer">Utgångsposten <b>'+safe(item.title)+
      '</b> är markerad i tidslinjen tillsammans med närliggande daterade poster. '+
      '<strong>Närhet i tid innebär inte bevisad påverkan.</strong> '+
      'Jämförelserna kan gälla olika områden och kulturer.</div>'+
      '<div class="v835-actual-timeline">'+graphic+'</div>';
  }

  function enhance() {
    const host = document.getElementById('exploreView');
    if (!host) return;
    const focus = currentFocus();
    const original = focus && !!focus.original;
    const intro = host.querySelector('.v83-path-hero');
    if (!intro) return;
    const titleTag = intro.querySelector('.kicker'); if(titleTag)titleTag.textContent='TIDENS VÄV · TEMASPÅR V8.33';
    const introduction = intro.querySelector('p');
    if (introduction) introduction.innerHTML = 'Följ ett färdigt forskningsspår eller välj valfri post för en egen undersökning. Historiska samband ska alltid gå att kontrollera; tidsmässig närhet räcker inte som belägg för påverkan.';
    const metrics = intro.querySelector('.v83-metrics');
    if (metrics) metrics.innerHTML = `<span>6 förberedda temaspår</span><span>${events.length} forskningsposter</span><span>${originalEvents.length} originalposter i arkivet</span>`;

    const study = document.createElement('section');
    study.id = 'v833Study';
    study.className = 'v833-study';
    study.setAttribute('aria-label', 'Aktuell undersökning');
    const currentTitle = focus ? focus.title : v83Current().name;
    study.innerHTML = `<div class="v833-kicker">AKTUELL UNDERSÖKNING</div><h2>${safe(currentTitle)}</h2><p class="v833-description">${focus ? 'Egen undersökning med utgångspunkt i vald post. Den visas i sin historiska kontext, utan påhittade beroenden.' : 'Du följer ett färdigt temaspår. Välj en forskningspost nedan för att påbörja en egen undersökning.'}</p>
      <label class="v833-choose" for="v833PostSelect">Starta eller byt egen undersökning
      <select id="v833PostSelect"><option value="">Välj forskningspost …</option><optgroup label="Forskningsposter">${allResearch().map(e=>`<option value="${safe(e.id)}" ${focus && e.id===focus.id?'selected':''}>${safe(e.title)}</option>`).join('')}</optgroup><optgroup label="Originalarkiv – ej slutgranskat">${allOriginal().map(e=>`<option value="${safe(e.id)}" ${focus && e.id===focus.id?'selected':''}>${safe(e.title)}</option>`).join('')}</optgroup></select></label>
      <div class="v833-actions">${focus ? '<button type="button" id="v833Read">Läs vald post</button><button type="button" id="v833Timeline">Se posten i huvudtidslinjen</button><button type="button" id="v833Clear">Visa färdiga temaspår</button>' : ''}</div>
      ${focus ? `<div class="v833-status">${original ? 'Originalpost: importerade årtal är inte forskningsgranskade.' : 'Forskningspost: dateringar kan fortfarande vara preliminära.'}</div>` : ''}`;
    host.prepend(study);
    study.querySelector('#v833PostSelect').onchange=e=>{
      v829Focus.id = e.target.value || null;
      v827RelationFocus = e.target.value || v827RelationFocus;
      if(v829Focus.id){if(v829Focus.id.startsWith('B')&&typeof window.TidensOpenBookV858==='function'){window.TidensOpenBookV858(v829Focus.id);renderExplore();}else setSelected(v829Focus.id);} else renderExplore();
    };
    const read = study.querySelector('#v833Read');
    if(read)read.onclick=()=>{if(focus.bibleBook&&typeof window.TidensOpenBookV858==='function')window.TidensOpenBookV858(focus.id);else setSelected(focus.id);if(window.innerWidth<=900 && typeof v84OpenReader==='function')v84OpenReader()};
    const toTime = study.querySelector('#v833Timeline');
    if(toTime){
      // En källstödd originaltidslinje visas här i Temaspår, inte som
      // en påstått färdiggranskad post i den separata huvudtidslinjen.
      if(sourcedOriginalPeriods[focus.id]){toTime.hidden=true;}
      else if(focus.bibleBook)toTime.onclick=()=>{view('timeline');window.TidensOpenBookV858?.(focus.id)};
      else toTime.onclick=()=>{view('timeline');v829LocateResearch(focus.id)};
    }
    const clear = study.querySelector('#v833Clear');
    if(clear)clear.onclick=()=>{v829Focus.id=null;renderExplore()};

    const paths = host.querySelector('.v83-paths');
    if(paths) {
      const label=document.createElement('div');label.className='v833-choices-heading';
      label.innerHTML='<h3>Färdiga temaspår</h3><p>Välj ett genomarbetat urval. Detta är en annan ingång än den egna undersökningen ovan.</p>';
      paths.before(label);
    }

    const relationPanel = host.querySelector('#v827RelationFocus');
    if (relationPanel) {
      const legacySelector = relationPanel.querySelector('label[for="v827RelationSelect"]');
      if(legacySelector)legacySelector.hidden=true;
      if(!focus)relationPanel.hidden=true;
      else {
        const relationHeading = relationPanel.querySelector('h2');
        if(relationHeading)relationHeading.textContent='Belagda och föreslagna relationer för vald post';
      }
    }
    if (focus) {
      const toolbar=host.querySelector('.v83-toolbar');
      const map=host.querySelector('.v83-explore-map');
      if(toolbar) {
        const heading=toolbar.querySelector('b');if(heading)heading.textContent='Följ undersökningens historiska sammanhang';
        const hint=toolbar.querySelector('.tiny');if(hint)hint.textContent='Vald post visas här. Närliggande poster är jämförelsepunkter, inte en orsakskedja.';
        const actions=toolbar.querySelector('.v83-toolbar-actions');
        // Behåll växlingen Grafisk tidslinje / Kronologisk lista. Den gamla
        // huvudtidslinje-knappen visar temaområdet, inte den valda posten.
        if(actions){actions.hidden=false;const oldJump=actions.querySelector('#v83ShowMain');if(oldJump)oldJump.hidden=true;}
        const graphButton=actions?.querySelector('[data-v83mode="graph"]');
        if(graphButton)graphButton.hidden=false;
      }
      if(map) {
        map.innerHTML=`<div class="v833-self"><div class="v833-selflead"><span class="v833-origin-label">UTGÅNGSPOST</span><h3>${safe(focus.title)}</h3><p>${safe(focus.description || (typeof sourceCardsV86!=='undefined' && sourceCardsV86[focus.id]?.summary) || 'Beskrivning saknas i denna post.')}</p></div>${focusTimeline(focus)}<details class="v835-extra-context"><summary>Visa dateringar och jämförelsepunkter i text</summary>${contextFor(focus)}</details></div>`;
        map.querySelectorAll('[data-v833-open]').forEach(b=>b.onclick=()=>{v829Focus.id=b.dataset.v833Open;v827RelationFocus=v829Focus.id;setSelected(v829Focus.id)});
        // v83Graph/v83TimelineRows returnerar HTML; bind läsknapparna efter
        // att den nya tidslinjen har infogats.
        map.querySelectorAll('[data-v83read]').forEach(b=>b.onclick=()=>{if(b.dataset.v83read.startsWith('B')&&typeof window.TidensOpenBookV858==='function')window.TidensOpenBookV858(b.dataset.v83read);else setSelected(b.dataset.v83read);});
        map.querySelectorAll('[data-v83read]').forEach(b=>{
          if(b.dataset.v83read===focus.id){b.classList.add('v835-origin-on-timeline');b.setAttribute('aria-label','Utgångspost: '+focus.title);}
        });
        const scroller=map.querySelector('.v83-plot-scroller');
        if(scroller){scroller.setAttribute('tabindex','0');scroller.setAttribute('role','region');scroller.setAttribute('aria-label','Grafisk tidslinje för undersökningen, svep i sidled vid behov');}
      }
      const caution = host.querySelector('.v83-context');if(caution)caution.hidden=true;
      host.querySelectorAll('.v83-panel').forEach(p=>{if(p.querySelector('.v83-connections'))p.hidden=true});
    }
  }
  renderExplore=function(){ oldRender();enhance(); };
  const oldShowRelations=v827ShowRelations;
  v827ShowRelations=function(id){oldShowRelations(id);requestAnimationFrame(()=>document.getElementById('v833Study')?.scrollIntoView({block:'start',behavior:'instant'}))};
  const explore = document.getElementById('exploreView');
  if(explore)explore.addEventListener('click', e => {if(e.target.closest('[data-v83theme]'))v829Focus.id=null}, true);
})();
