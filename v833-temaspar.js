/* V8.33 – en enhetlig ingång till kuraterade temaspår och egna undersökningar.
   Befintliga data och evidensklassificeringar ändras inte. */
(function () {
  'use strict';
  const oldRender = renderExplore;
  const safe = value => enc(String(value == null ? '' : value));
  const allResearch = () => events.slice().sort((a,b)=>a.title.localeCompare(b.title,'sv'));
  const allOriginal = () => originalEvents.slice().sort((a,b)=>a.title.localeCompare(b.title,'sv'));
  const vetted = () => v813Entries().filter(e => e.v813Status !== 'original' && Number.isFinite(e.start) && Number.isFinite(e.end));
  const currentFocus = () => v829Focus.id && idEvent(v829Focus.id) ? idEvent(v829Focus.id) : null;

  function contextFor(item) {
    const research = vetted();
    const position = !item.original && research.find(e => e.id === item.id);
    if (!position) return `<div class="v833-undated" role="note"><b>Ingen vetenskapligt försvarbar placering i huvudtidslinjen har hittats.</b><p>Posten kan undersökas och jämföras här, men vi använder inte ett ursprungligt Excel-årtal eller en annan händelses datering som ersättning.</p></div>`;
    const mid = (position.start + position.end)/2;
    const near = research.filter(e=>e.id!==item.id).map(e=>({item:e,d:Math.abs((e.start+e.end)/2-mid)})).sort((a,b)=>a.d-b.d).slice(0,5).sort((a,b)=>a.item.start-b.item.start).map(x=>x.item);
    const describe = e => `${safe(v83FmtYear(e.start))}${e.start===e.end?'':' – '+safe(v83FmtYear(e.end))}`;
    return `<div class="v833-period"><div class="v833-period-heading">Forskningsbedömt tidsläge: <b>${describe(position)}</b></div><p>Följande poster ligger nära i tid, men kan höra till andra platser och kulturer. <strong>Kronologisk närhet är inte belägg för påverkan eller beroende.</strong></p><ol class="v833-neighbors"><li class="v833-active"><span>${describe(position)}</span><b>${safe(item.title)}</b><small>Utgångspost</small></li>${near.map(e=>`<li><span>${describe(e)}</span><b>${safe(e.title)}</b><button type="button" data-v833-open="${safe(e.id)}">Undersök →</button></li>`).join('')}</ol></div>`;
  }

  function enhance() {
    const host = document.getElementById('exploreView');
    if (!host) return;
    const focus = currentFocus();
    const original = focus && !!focus.original;
    const intro = host.querySelector('.v83-path-hero');
    if (!intro) return;
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
      if(v829Focus.id) setSelected(v829Focus.id); else renderExplore();
    };
    const read = study.querySelector('#v833Read');
    if(read)read.onclick=()=>{setSelected(focus.id);if(window.innerWidth<=900 && typeof v84OpenReader==='function')v84OpenReader()};
    const toTime = study.querySelector('#v833Timeline');
    if(toTime)toTime.onclick=()=>{view('timeline');v829LocateResearch(focus.id)};
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
        const actions=toolbar.querySelector('.v83-toolbar-actions');if(actions)actions.hidden=true;
      }
      if(map) {
        map.innerHTML=`<div class="v833-self"><div class="v833-selflead"><span class="v833-origin-label">UTGÅNGSPOST</span><h3>${safe(focus.title)}</h3><p>${safe(focus.description || 'Beskrivning saknas i denna post.')}</p></div>${contextFor(focus)}</div>`;
        map.querySelectorAll('[data-v833-open]').forEach(b=>b.onclick=()=>{v829Focus.id=b.dataset.v833Open;v827RelationFocus=v829Focus.id;setSelected(v829Focus.id)});
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
