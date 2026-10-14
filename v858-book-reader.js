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
  const article=make('article');article.className='tv-book-reader v839-article';
  article.append(make('div',b.testament+' · '+b.genre+' · FORSKNINGSPOST '+b.id));
  article.append(make('h2',b.title));
  article.append(make('p','Bibelbok och textens tillkomst. Preliminärt forskningsunderlag, inte fullständigt vetenskapligt slutgranskad.'));
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
   if(profile.sources?.length){
    article.append(make('h3','Källor'));
    const list=make('ul');
    for(const item of profile.sources){const li=make('li'),a=make('a',item.title);a.href=item.url;a.target='_blank';a.rel='noopener noreferrer';li.append(a);list.append(li);}
    article.append(list);
   }
  }else article.append(make('p','En individuell forskningsfördjupning med källor och konkurrerande dateringsmodeller återstår.'));
  const links=make('section');links.className='v827-reader-rel';
  links.append(make('h3','Historiska samband'));
  const related=researchLinks[b.id];
  links.append(make('p',related?
    'Boken har en avgränsad koppling till en befintlig forskningspost om textens tillkomst. Temaspår visar de samband som faktiskt är dokumenterade för den posten.':
    'Ännu ingen individuellt källkontrollerad koppling till de befintliga Temaspåren. Öppna Temaspår för att undersöka relaterade historiska sammanhang.'));
  const action=make('button','Visa sambanden i Temaspår →');action.type='button';
  action.addEventListener('click',()=>{
   if(related&&typeof v827ShowRelations==='function')v827ShowRelations(related);
   else if(typeof view==='function')view('explore');
  });
  links.append(action);article.append(links);root.append(article);
 }
 const previous=renderDetail;
 renderDetail=function(){
  const b=bookById.get(state.selected);
  if(b){showBook(b);return;}
  previous();
 };
 const parent=document.getElementById('timelineView');
 if(parent)parent.addEventListener('click',e=>{
  const button=e.target.closest('[data-tv-book]');
  if(!button)return;
  const b=bookById.get(button.dataset.tvBook);if(!b)return;
  state.selected=b.id;
  renderDetail();
  const mini=document.getElementById('selectedMini');
  if(mini)mini.textContent=b.id+' · '+b.title;
  if(typeof v84Mobile==='function'&&v84Mobile()&&typeof v84OpenReader==='function')v84OpenReader();
  else document.getElementById('detail')?.scrollTo({top:0,behavior:'smooth'});
 });
 window.TidensBookReaderV858=Object.freeze({bookCount:books.length,relatedBookCount:Object.keys(researchLinks).length});
})();
