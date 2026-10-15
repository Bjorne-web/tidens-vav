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
   // The existing origin-post workflow now understands B-IDs through its data adapter.
   // Do not construct a second Bible-only timeline, relation panel or state model.
   if(typeof v827ShowRelations==='function')v827ShowRelations(b.id);
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
