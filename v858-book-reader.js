/* V8.58 – same right-hand research reader for canonical books. */
(function(){
 const books=window.TIDENS_BIBLE_BOOKS||[];
 if(!books.length)return;
 const bookById=new Map(books.map(b=>[b.id,b]));
 const researchLinks={B001:'H020',B027:'H023',B043:'H034'};
 const fmt=n=>n<0?Math.abs(n)+' f.Kr.':n+' e.Kr.';
 const make=(tag,text)=>{const x=document.createElement(tag);if(text!==undefined)x.textContent=text;return x;};
 function showBook(b){
  const root=document.getElementById('detail');if(!root)return;
  // Preserve the shared reader controls: app.js created these once and attached listeners.
  // Removing them would silently destroy the visible width UI for Bible-book selections.
  const grip=root.querySelector('#v829ReaderGrip');
  const widthControls=root.querySelector('#v829WidthControls');
  const readerBar=root.querySelector('.v84-reader-bar');
  root.replaceChildren();
  if(grip)root.append(grip);
  if(readerBar)root.append(readerBar);
  if(widthControls)root.append(widthControls);
  const article=make('article');article.className='tv-book-reader v86-article v839-unified-article';
  root.classList.add('v839-unified-reader');
  const kicker=make('div','TIDENS VÄV · BIBELBOK · FORSKNINGSPOST '+b.id);kicker.className='kicker';article.append(kicker);
  article.append(make('h2',b.title));
  const status=make('p','Bibelbok och textens tillkomst. Preliminärt forskningsunderlag, inte fullständigt vetenskapligt slutgranskad.');status.className='v839-unified-status';article.append(status);
  article.append(make('h3','Vad var det?'));
  article.append(make('p',b.title+' är en biblisk skrift inom '+b.genre+'. Bokposten avser textens tillkomst och bearbetning, inte att händelser som skildras därmed är historiskt verifierade.'));
  article.append(make('h3','Historiskt sammanhang'));
  article.append(make('p',b.critical));
  article.append(make('h3','Konsekvenser och betydelse'));
  article.append(make('p','Textens betydelse inom religiösa traditioner ska skiljas från belagda historiska följder. En individuell konsekvensanalys återstår.'));
  article.append(make('h3','Betydelse för Israels religion, judendomen och kristendomen'));
  article.append(make('p','Boken ingår i en eller flera kanoniska och historiska tolkningsgemenskaper. Dess specifika religionshistoriska betydelse behöver granskas med källunderlag för respektive bok.'));
  article.append(make('h3','Osäkerheter och viktiga preciseringar'));
  article.append(make('p','Författartillskrivningen är traditionshistorisk. Föreslagen texttillkomst är en forskningsrekonstruktion med osäkerheter och möjlig flerstegskomposition.'));
  const dl=make('dl');dl.className='tv-book-reader-facts';
  const fields=[
   ['Traditionell författartillskrivning',b.attributed],
   ['Historisk-kritisk bedömning',b.critical],
   ['Föreslagen tillkomst/redaktion',fmt(b.start)+' – '+fmt(b.end)],
   ['Berättad tid',b.narrativeTime],
   ['Vetenskaplig granskningsstatus','Preliminär; individuell forskningsgranskning återstår']
  ];
  for(const [label,value] of fields){dl.append(make('dt',label),make('dd',value));}
  article.append(dl);
  const profile=window.TIDENS_BIBLE_BOOK_RESEARCH?.[b.id];
  if(profile){
   article.append(make('h3','Forskningsfördjupning'));
   article.append(make('p',profile.composition));
   article.append(make('h3','Historisk och religionshistorisk kontext'));
   article.append(make('p',profile.context));
   if(profile.passageNotes?.length){for(const n of profile.passageNotes){article.append(make('h4',n.passage),make('p',n.note));const sourceLink=make('a','Forskningskälla ↗');sourceLink.href=n.source;sourceLink.target='_blank';sourceLink.rel='noopener noreferrer';article.append(sourceLink);}}
   if(profile.sources?.length){
    article.append(make('h3','Källor och läsvägar'));
    const list=make('ul');
    for(const item of profile.sources){const li=make('li'),a=make('a',item.title);a.href=item.url;a.target='_blank';a.rel='noopener noreferrer';li.append(a);list.append(li);}
    article.append(list);
   }
  }else {article.append(make('h3','Källor och läsvägar'));article.append(make('p','Individuella akademiska källor och konkurrerande dateringsmodeller återstår att dokumentera.'));}
  const torah=window.TIDENS_TORAH_TEXT_HISTORY;
  if(torah&&/^B00[1-5]$/.test(b.id)){
   article.append(make('h3','Handskrifter och textöverföring'));
   article.append(make('p',torah.textHistory));
   const witnesses=make('ul');
   for(const w of torah.witnesses) witnesses.append(make('li',w.label+' – '+w.kind+'; '+w.certainty));
   article.append(witnesses,make('p',torah.limits));
   const sources=make('ul');
   for(const src of torah.sources){const a=make('a',src.title);a.href=src.url;a.target='_blank';a.rel='noopener noreferrer';const li=make('li');li.append(a);sources.append(li)}
   article.append(make('h3','Källor för handskriftstraditionerna'),sources);
  }
  const variants=window.TIDENS_BIBLE_VARIANTS?.[b.id]||[];
  if(variants.length){
   article.append(make('h3','Konkreta textvarianter'));
   for(const variant of variants){
    article.append(make('h4',variant.passage+' · '+variant.witness));
    article.append(make('p',variant.variant));
    article.append(make('p','Jämförelse: '+variant.comparison));
    article.append(make('p','Forskningsläge: '+variant.standing));
    article.append(make('p','Begränsning: '+variant.limits));
    const list=make('ul');
    for(const src of variant.sources){const li=make('li'),link=make('a',src.title);link.href=src.url;link.rel='noopener noreferrer';link.target='_blank';li.append(link);list.append(li);}
    article.append(list);
   }
  }
  const caveat=make('p','Ett enskilt källstöd eller en dateringsmodell innebär inte att boken är fullständigt historisk-kritiskt granskad.');caveat.className='v839-unified-caveat';article.append(caveat);
  const links=make('section');links.className='v827-reader-rel';
  links.append(make('h3','Historiska samband'));
  const related=researchLinks[b.id];
  links.append(make('p',related?
    'Boken har en avgränsad koppling till en befintlig forskningspost om textens tillkomst. Temaspår visar de samband som faktiskt är dokumenterade för den posten.':
    'Ännu ingen individuellt källkontrollerad koppling till de befintliga Temaspåren. Öppna Temaspår för att undersöka relaterade historiska sammanhang.'));
  const action=make('button','Visa sambanden i Temaspår →');action.type='button';
  action.addEventListener('click',()=>{
   if(related&&typeof v827ShowRelations==='function'){v827ShowRelations(related);return;}
   if(typeof view!=='function')return;
   view('explore');
   const host=document.getElementById('exploreView');
   if(!host)return;
   // A book is not an ordinary themed timeline. Replace the default themed investigation
   // so it cannot misleadingly remain labelled "Israels framväxt".
   const focus=make('section');focus.id='v878BookRelationFocus';focus.className='v827-relationship-panel tv-book-relation-focus';
   const kicker=make('div','TEMASPÅR · VALD BIBELBOK · '+b.id);kicker.className='kicker';focus.append(kicker);
   focus.append(make('h2',b.title+' – historiska sammanhang och samband'));
   focus.append(make('p','Här utgår undersökningen från '+b.title+', inte från det förvalda temaspåret Israels framväxt. Vi skiljer historisk kontext från individuellt belagda samband.'));
   const profile=window.TIDENS_BIBLE_BOOK_RESEARCH?.[b.id];
   if(profile?.context){focus.append(make('h3','Historisk miljö'));focus.append(make('p',profile.context));}
   if(profile?.composition){focus.append(make('h3','Textens tillkomst'));focus.append(make('p',profile.composition));}
   focus.append(make('h3','Källkritisk bedömning'));
   focus.append(make('p','Inga individuellt källgranskade relationslänkar har ännu registrerats från '+b.id+' till en viss historisk forskningspost. Därför visas inte ett annat, orelaterat temaspår som om det vore bokens egna samband.'));
   const actions=make('div');actions.className='v827-linkrow';
   const returnButton=make('button','Tillbaka till färdiga temaspår');returnButton.type='button';
   returnButton.addEventListener('click',()=>{if(typeof renderExplore==='function')renderExplore();});
   const timelineButton=make('button','Visa boken i huvudtidslinjen');timelineButton.type='button';
   timelineButton.addEventListener('click',()=>{view('timeline');if(typeof window.TidensOpenBookV858==='function')window.TidensOpenBookV858(b.id);});
   actions.append(returnButton,timelineButton);focus.append(actions);
   // Reuse the same chronological graph as other Temaspår, not an ad-hoc bar diagram.
   const chronology=make('section');chronology.className='v83-panel tv-book-chronology';
   chronology.append(make('h3','Kronologisk tidslinje – textens tillkomst och samtid'));
   chronology.append(make('p','Samma tidslinjestruktur som övriga Temaspår. Samtidighet är inte belägg för påverkan eller ett historiskt samband.'));
   const origin=make('div');origin.className='v83-panel tv-book-origin';origin.style.cssText='background:#eaf3fd;border-left:4px solid #2465a1;padding:12px 15px;margin:12px 0';
   const originLabel=make('div','UTGÅNGSPOST · '+b.id);originLabel.className='kicker';origin.append(originLabel);
   origin.append(make('h3',b.title+' – textens tillkomst'));
   origin.append(make('p','Föreslagen tillkomst/redaktion: '+fmt(b.start)+' – '+fmt(b.end)+'. Samtidiga historiska poster visas som kronologiska jämförelser, inte belagda samband.'));
   chronology.append(origin);
   const minYear=Math.min(-700,b.start-60),maxYear=Math.max(-450,b.end+50);
   const bookEvent={id:b.id,title:b.title+' – textens tillkomst',start:b.start,end:b.end,category:'Bibeltext'};
   const candidates=(typeof events!=='undefined'?events:[]).filter(e=>e.id!==b.id&&e.start<=maxYear&&e.end>=minYear&&e.start>=minYear-100&&e.end<=maxYear+100);
   const sample=candidates.sort((a,c)=>Math.abs((a.start+a.end)/2-(b.start+b.end)/2)-Math.abs((c.start+c.end)/2-(b.start+b.end)/2)).slice(0,8);
   const timelineTheme={id:'book-context',min:minYear,max:maxYear};
   const entries=[bookEvent,...sample];
   const graph=make('div');graph.className='v83-explore-map tv-book-timeline';
   graph.innerHTML=typeof v83Graph==='function'?v83Graph(timelineTheme,entries):'<p>Tidslinjen kunde inte visas.</p>';
   chronology.append(graph);
   const caption=make('p',sample.length+' historiska poster visas som tidsmässiga jämförelser. Habackuks datering gäller texttillkomst/redaktion, inte en berättad händelse.');caption.className='small';chronology.append(caption);
   const list=make('div');list.className='v83-toolbar-actions';
   const listButton=make('button','Kronologisk lista');listButton.type='button';
   const graphButton=make('button','Grafisk tidslinje');graphButton.type='button';
   const labelOrigin=()=>{for(const btn of graph.querySelectorAll('[data-v83read]')){if(btn.dataset.v83read!==b.id)continue;btn.classList.add('tv-book-origin-marker');btn.style.boxShadow='0 0 0 2px #2465a1';const title=btn.querySelector('b,h4');if(title&&!title.textContent.startsWith('UTGÅNGSPOST'))title.prepend(document.createTextNode('UTGÅNGSPOST · '));}};
   const bindGraph=()=>graph.querySelectorAll('[data-v83read]').forEach(btn=>{btn.addEventListener('click',()=>{if(btn.dataset.v83read===b.id){window.TidensOpenBookV858?.(b.id);return;}if(typeof state!=='undefined'){state.selected=btn.dataset.v83read;if(typeof renderDetail==='function')renderDetail();if(typeof updateMini==='function')updateMini();}});});
   graphButton.onclick=()=>{graph.innerHTML=v83Graph(timelineTheme,entries);bindGraph();labelOrigin();};
   listButton.onclick=()=>{graph.innerHTML=v83TimelineRows(entries);bindGraph();labelOrigin();};
   list.append(graphButton,listButton);chronology.insertBefore(list,graph);
   bindGraph();labelOrigin();focus.append(chronology);
   host.replaceChildren(focus);
   focus.scrollIntoView({block:'start',behavior:'smooth'});
  });
  links.append(action);article.append(links);root.append(article);
 }
 const previous=renderDetail;
 renderDetail=function(){
  const b=bookById.get(state.selected);
  if(b){showBook(b);return;}
  previous();
 };
 // Public, stable book selection also works when timeline rows are recreated.
 function openBook(id){
  const b=bookById.get(id);if(!b)return false;
  state.selected=b.id;
  renderDetail();
  const mini=document.getElementById('selectedMini');
  if(mini)mini.textContent=b.id+' · '+b.title;
  if(typeof v84Mobile==='function'&&v84Mobile()&&typeof v84OpenReader==='function')v84OpenReader();
  else document.getElementById('detail')?.scrollTo({top:0,behavior:'smooth'});
  return true;
 }
 window.TidensOpenBookV858=openBook;
 const parent=document.getElementById('timelineView');
 if(parent)parent.addEventListener('click',e=>{
  const button=e.target.closest('[data-tv-book]');
  if(!button)return;
  openBook(button.dataset.tvBook);
 });
 window.TidensBookReaderV858=Object.freeze({bookCount:books.length,relatedBookCount:Object.keys(researchLinks).length});
})();
