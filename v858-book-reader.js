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
  root.replaceChildren();
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
   // Chronology is a comparison of dates, not a claim of literary dependence.
   const chronology=make('section');chronology.className='v827-relationship-panel tv-book-chronology';
   chronology.append(make('h3','Tidslinje – föreslagen texttillkomst i historisk kontext'));
   chronology.append(make('p','Blått visar den föreslagna tillkomst- och redaktionsperioden. Historiska hållpunkter är jämförelsepunkter, inte bevisade litterära samband.'));
   const points=[{name:'Nineves fall',year:-612,kind:'historisk hållpunkt'},{name:'Jerusalems förstörelse',year:-587,kind:'historisk hållpunkt'},{name:'Habackuk – föreslagen tillkomst/redaktion',start:b.start,end:b.end,kind:'textens tillkomst'}];
   const rangeStart=Math.min(b.start,-650),rangeEnd=Math.max(b.end,-450),span=rangeEnd-rangeStart;
   const graph=make('div');graph.className='tv-book-timegraph';graph.style.cssText='display:grid;gap:12px;padding:18px 12px;border:1px solid #cbd9e8;border-radius:12px;background:#fff';
   const axis=make('div');axis.style.cssText='display:flex;justify-content:space-between;font-size:12px';axis.append(make('span',fmt(rangeStart)),make('span',fmt(rangeEnd)));graph.append(axis);
   for(const item of points){const row=make('div');row.style.cssText='display:grid;grid-template-columns:minmax(170px,30%) 1fr;align-items:center;gap:12px';row.append(make('span',item.name));const track=make('div');track.style.cssText='position:relative;height:26px;border-radius:5px;background:repeating-linear-gradient(90deg,#f0f4f9,#f0f4f9 1px,white 1px,white 20%)';const bar=make('div');const from=item.year??item.start,to=item.year??item.end;const left=Math.max(0,(from-rangeStart)/span*100),width=Math.max(item.year===undefined?2:1,((to-from)/span)*100);bar.style.cssText='position:absolute;top:7px;height:12px;border-radius:6px;background:'+(item.year===undefined?'#2367a4':'#a26d39')+';left:'+left+'%;width:'+width+'%';bar.title=item.name+' · '+fmt(from)+(to!==from?'–'+fmt(to):'');track.append(bar);row.append(track);graph.append(row)}
   chronology.append(graph);
   chronology.append(make('p','Habackuks arbetsdatering enligt bokregistret: '+fmt(b.start)+'–'+fmt(b.end)+'. Exakt komposition och olika redaktionsskeden är omdiskuterade.'));
   focus.append(chronology);
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
