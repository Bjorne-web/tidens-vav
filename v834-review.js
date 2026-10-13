/* V8.34 – granskningsstatus och spårbara, avgränsade påståenden. */
(function () {
  'use strict';
  const ledger=window.TIDENS_REVIEW_LEDGER;
  if(!ledger)return;
  const escapeHtml = value => enc(String(value == null ? '' : value));
  const counts = () => ({posts:Object.keys(ledger.claimChecks).length,claims:Object.values(ledger.claimChecks).reduce((sum,group)=>sum+group.length,0),fully:Object.keys(ledger.completePostReviews).length});
  function safeLink(url) {
    try {const u = new URL(url);return (u.protocol==='https:'||u.protocol==='http:')?u.href:null}
    catch (_) {return null}
  }
  function checksFor(id) {return ledger.claimChecks[id] || []}
  function statusFor(id) {
    if(ledger.completePostReviews[id])return 'Slutgranskad – kontrollera granskningsjournal';
    return checksFor(id).length ? 'Delvis källprövad – inte slutgranskad' : 'Ej vetenskapligt slutgranskad';
  }
  window.TidensReview = {statusFor,checksFor,counts};
  function checkedClaimHtml(check) {
    const url=safeLink(check.sourceUrl);
    return `<li class="v834-claim">
      <p><strong>Kontrollerat påstående:</strong> ${escapeHtml(check.claim)}</p>
      <p><b>Vilket stöd?</b> ${escapeHtml(check.evidenceType)}. ${escapeHtml(check.scope)}</p>
      <p><b>Vad stöder det inte?</b> ${escapeHtml(check.limit)}</p>
      <p class="v834-source"><b>Källa:</b> ${url?`<a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(check.sourceTitle)} ↗</a>`:escapeHtml(check.sourceTitle)} · kontrollerad ${escapeHtml(check.verified)}</p>
    </li>`;
  }
  function itemFromSelection() {
    return (typeof idEvent==='function' && idEvent(state.selected)) ||
      (typeof v83Event==='function' && v83Event(state.selected)) || null;
  }
  function renderStatus() {
    const area=document.getElementById('detail');
    if(!area)return;
    area.querySelectorAll('.v834-review').forEach(node=>node.remove());
    const item=itemFromSelection();
    if(!item)return;
    const checks=checksFor(item.id);
    const source=safeLink(item.source||'');
    const block=document.createElement('section');
    block.className='v834-review';
    block.setAttribute('aria-label','Vetenskaplig granskningsstatus');
    block.innerHTML=`<div class="v834-header"><div><div class="v834-eyebrow">KÄLLGRANSKNING · V8.34</div><h3>Granskningsstatus för ${escapeHtml(item.id)}</h3></div><span class="v834-state">${escapeHtml(statusFor(item.id))}</span></div>
    <p class="v834-intro">${checks.length?`${checks.length} specifikt påstående har kontrollerats mot namngiven källa. Det innebär <strong>inte</strong> att postens alla formuleringar, dateringar eller forskningspositioner har granskats.`:'Denna post saknar ännu registrerad, fullständig vetenskaplig slutgranskning. Källänkar och äldre evidensgrader är inte samma sak som genomförd granskning.'}</p>
    ${checks.length?`<details class="v834-audit"><summary>Visa källprövningen och dess begränsningar (${checks.length})</summary><ol>${checks.map(checkedClaimHtml).join('')}</ol></details>`:''}
    ${source?`<p class="v834-existing"><b>Äldre källänk:</b> <a href="${escapeHtml(source)}" target="_blank" rel="noopener noreferrer">Öppna registrerad källa ↗</a> <span>(länk förekommer i materialet; innebär inte full källprövning)</span></p>`:''}
    <div class="v834-reminder">Observera: ”Hög”, ”Medel” och andra evidensgrader beskriver en annan bedömning än redaktionell granskningsstatus. Äldre fält som ”reviewed” ska inte tolkas som vetenskaplig slutgranskning.</div>`;
    const bar=area.querySelector('.v84-reader-bar');
    if(bar)bar.insertAdjacentElement('afterend',block);
    else area.prepend(block);
  }
  const previousDetail=renderDetail;
  renderDetail=function(){previousDetail();renderStatus()};
  const previousResearch=renderResearch;
  renderResearch=function(){
    previousResearch();
    const host=document.getElementById('researchView');
    if(!host)return;
    const top=host.querySelector('.v82-top');
    if(!top)return;
    const {posts,claims,fully}=counts();
    const summary=document.createElement('div');
    summary.className='v834-library-status';
    summary.innerHTML=`<b>Vetenskaplig källprövning – pågående arbete</b><p>Registrerade individuella kontroller: ${claims} påståenden i ${posts} poster. Fullständigt slutgranskade poster enligt den nya journalen: ${fully}. Det är en begränsad arbetsredovisning, inte ett kvalitetsintyg för hela biblioteket. Öppna en post för att läsa källprövning och begränsningar.</p>`;
    top.appendChild(summary);
  };
  const previousExplore=renderExplore;
  renderExplore=function(){
    previousExplore();
    const focus=(typeof v829Focus!=='undefined' && v829Focus.id)?v829Focus.id:null;
    const host=document.getElementById('v833Study');
    if(!focus||!host)return;
    const current=document.createElement('p');
    current.className='v834-focus-note';
    current.innerHTML=`<strong>Vetenskaplig status:</strong> ${escapeHtml(statusFor(focus))}. Läs postens källgranskning via ”Läs vald post”.`;
    host.append(current);
  };
})();
