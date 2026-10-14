/* V8.42 – användarstyrd ordning i läsarpanelen och tydligare tidslinjeknapp.
 * Alla befintliga läskort, källtexter, länkar och eventlyssnare återanvänds.
 * Källjournal, forskningsinnehåll och Temaspårs tidslinje ändras inte. */
(function(){
 'use strict';

 function orderReader(){
  const root=document.getElementById('detail');
  if(!root)return;
  const children=Array.from(root.children);
  const match=selector=>children.find(node=>node.matches(selector))||null;

  const grip=match('#v829ReaderGrip');
  const width=match('#v829WidthControls');
  const controls=match('.v84-reader-bar');
  const kicker=match('.kicker');
  const title=match('h2');
  const article=match('.v86-article');
  const themes=match('.v827-reader-rel');
  const bible=match('.v89-bible-panel');
  const overview=match('.v839-unified-overview')||match('details.v828-collapsed');
  const review=match('.v834-review');
  const sharing=match('.v835-share');

  // 1. Läsarkontroller och vald post.
  // 2. Källförankrad genomgång.
  // 3. Temaspår / historiska samband.
  // 4. Bibeltextlänkar (endast när de finns).
  // 5. Samlad forskningsöversikt.
  // 6. Övriga tidigare sektioner, utan att stryka eller duplicera dem.
  // 7. Källgranskning och delning längst ned.
  const first=[grip,width,controls,kicker,title,article,themes,bible,overview].filter(Boolean);
  const last=[review,sharing].filter(Boolean);
  const moved=new Set([...first,...last]);
  const rest=children.filter(node=>!moved.has(node));
  root.append(...first,...rest,...last);
  root.classList.add('v842-reader-order');
 }

 function nameTimelineControl(){
  const control=document.getElementById('v7expanded');
  if(control){
    control.textContent='Detaljerad tidslinje';
    control.setAttribute('aria-label','Visa detaljerad tidslinje med alla poster i vald period');
    control.setAttribute('title','Visa samtliga daterade poster i proportionell tidslinje eller kronologisk lista');
  }
  const stats=document.getElementById('v7stats');
  if(stats && stats.textContent.includes('Alla poster')){
    stats.textContent=stats.textContent.replaceAll('Alla poster','Detaljerad tidslinje');
  }
 }

 const previousReader=renderDetail;
 renderDetail=function(){
  previousReader();
  orderReader();
 };
 const previousTimeline=renderTimeline;
 renderTimeline=function(){
  previousTimeline();
  nameTimelineControl();
 };

 window.TidensLayoutV842=Object.freeze({orderReader,nameTimelineControl});
 orderReader();
 nameTimelineControl();
})();
