/* V8.38 – visa vilken tidsnivå källkontrollen avser.
   Inga datum, tidsmarkörer eller vetenskapliga godkännanden ändras. */
(function(){
  'use strict';
  const ledger=window.TIDENS_REVIEW_LEDGER;
  if(!ledger)return;
  const checks=id=>ledger.claimChecks[id]||[];
  function decorate(){
    const container=document.getElementById('detail');
    const record=typeof idEvent==='function'?idEvent(state.selected):null;
    if(!container||!record)return;
    const rows=container.querySelectorAll('.v834-claim');
    const current=checks(record.id);
    rows.forEach((row,index)=>{
      const check=current[index];
      if(!check?.timeLevel||row.querySelector('.v838-time-level'))return;
      const info=document.createElement('div');
      info.className='v838-time-level';
      const heading=document.createElement('strong');
      heading.textContent='Vilken tidsnivå granskas? ';
      const label=document.createElement('span');
      label.className='v838-time-label';
      label.textContent=check.timeLevel;
      info.append(heading,label);
      if(check.timeClarification){
        const clarification=document.createElement('p');
        clarification.textContent=check.timeClarification;
        info.append(clarification);
      }
      row.insertAdjacentElement('afterbegin',info);
    });
  }
  const prior=renderDetail;
  renderDetail=function(){prior();decorate()};
})();
