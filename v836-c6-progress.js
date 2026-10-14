/* V8.36 – synlig C6-framdrift i den faktiska menyn Fördjupningar.
   Byggs av dokumenterad C6-rapportlista och aktuell publiceringsgrens journal.
   En delvis kontrollerad post är inte en slutgranskad post.
*/
(function(){
  'use strict';
  const project=window.TIDENS_C6_PROGRESS;
  const ledger=window.TIDENS_REVIEW_LEDGER;
  if(!project||!ledger)return;
  const unique=xs=>new Set(xs||[]);
  const whole=Object.keys(ledger.completePostReviews||{});
  const journalIds=Object.keys(ledger.claimChecks||{}).filter(id=>(ledger.claimChecks[id]||[]).length>0);
  const total=project.total;
  function measures(){
    return {
      total,
      inventory:project.inventoryComplete?total:0,
      partialReports:unique(project.partialReportIds).size,
      corrections:unique(project.proposedCorrectionIds).size,
      journalPosts:unique(journalIds).size,
      journalClaims:journalIds.reduce((sum,id)=>sum+ledger.claimChecks[id].length,0),
      fullyReviewed:unique(whole).size
    };
  }
  const h=(tag,cl,txt)=>{const node=document.createElement(tag);if(cl)node.className=cl;if(txt!==undefined)node.textContent=txt;return node};
  const progressRow=(label,current,totalValue,description)=>{
    const row=h('div','c6-meter-row');
    const heading=h('div','c6-meter-heading');
    heading.append(h('span','',label),h('strong','',current+' / '+totalValue));
    const meter=h('progress','c6-meter');
    meter.max=totalValue;
    meter.value=Math.min(current,totalValue);
    meter.setAttribute('aria-label',label+': '+current+' av '+totalValue);
    row.append(heading,meter,h('p','c6-meter-note',description));
    return row;
  };
  function mount(){
    const top=document.querySelector('#researchView .v82-top');
    if(!top)return;
    top.querySelectorAll('#c6Progress').forEach(el=>el.remove());
    const kicker=top.querySelector('.kicker');
    if(kicker) kicker.textContent='TIDENS VÄV · FÖRDJUPNINGAR';
    const m=measures();
    const panel=h('section','c6-progress');
    panel.id='c6Progress';
    panel.setAttribute('aria-label','C6 – vetenskaplig granskningsstatus');
    panel.append(h('div','c6-progress-eyebrow','PROJEKTSTATUS · C6'));
    panel.append(h('h3','','Så långt har den vetenskapliga granskningen kommit'));
    panel.append(h('p','c6-progress-summary','Senast avstämd '+project.updated+
      ' · '+total+' poster totalt ('+project.research+' forskningsposter och '+project.original+' originalposter).'));
    const grid=h('div','c6-meter-grid');
    grid.append(
      progressRow('Strukturellt inventerade poster',m.inventory,total,'Alla poster är kartlagda. Detta är inte en vetenskaplig kvalitetsstämpel.'),
      progressRow('Poster med C6-delgranskningsrapport',m.partialReports,total,
        m.partialReports+' olika poster behandlas i '+project.totalReports+' rapporter på en separat arbetsgren. Kontrollerna är inte fullständiga.'),
      progressRow('Poster med registrerad källprövning i denna testversion',m.journalPosts,total,
        m.journalClaims+' avgränsade påståenden i källjournalen. Överlapp med C6-rapporterna förekommer.'),
      progressRow('Fullständigt vetenskapligt slutgranskade',m.fullyReviewed,total,
        'Först efter genomgång av källor, dateringar, alternativ forskning och samtliga bärande påståenden.')
    );
    panel.append(grid);
    const pending=h('p','c6-pending',
      m.corrections+' textkorrigeringar är föreslagna i den separata C6-arbetsgrenen och ännu inte införda i denna version.');
    panel.append(pending);
    const caveat=h('p','c6-caveat',project.caveat);
    panel.append(caveat);
    const details=h('details','c6-progress-detail');
    details.append(h('summary','','Visa C6:s arbetslogg och källunderlag'));
    const history=h('ol','c6-history');
    (project.history||[]).forEach(entry=>{
      const li=h('li','',entry.date+' – '+entry.note);
      history.append(li);
    });
    details.append(history);
    const links=h('p','c6-references');
    const a=h('a','','Öppna C6-granskningen på GitHub ↗');
    a.href=project.reportUrl;
    a.target='_blank';a.rel='noopener noreferrer';
    links.append(a);
    details.append(links);
    panel.append(details);
    const heading=top.querySelector('h2');
    if(heading)heading.insertAdjacentElement('afterend',panel);
    else top.prepend(panel);
  }
  const old=renderResearch;
  renderResearch=function(){old();mount()};
  window.TidensC6Status=Object.freeze({measures});
})();
