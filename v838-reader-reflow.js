/* V8.38 – läsarpanel enligt användarens skiss + religionshistorisk kontext.
   Originaldata, forskningsjournalen och historiska samband ändras inte.
   Alla tidigare informationsrutor bevaras och flyttas sist i panelen.
*/
(function(){
 'use strict';
 const impactByPost=Object.freeze({
  O049:{
   level:'Indirekt politisk förutsättning – inte belagt trosmässigt beroende',
   explanation:'De puniska krigen bidrog till att Rom utvecklades till dominerande makt i västra Medelhavet. Under republikens senare expansion nådde romersk dominans även östra Medelhavet och Judeen (63 f.Kr.). Judiska samhällen och, senare, den tidiga kristna rörelsen verkade därmed i en politisk värld präglad av romerskt styre. Sambandet är indirekt: krigen i sig ger inte belägg för att judiska trosföreställningar eller kristen lära formades av just krigen.',
   sources:[
    ['The Met – The Roman Republic','https://www.metmuseum.org/ja/essays/the-roman-republic'],
    ['The Met – The Eastern Mediterranean and Syria, 1000 B.C.–1 A.D.','https://82nd-and-fifth.metmuseum.org/toah/ht/04/wae.html']
   ]
  },
  O044:{
   level:'Direkt historisk kontext – teologisk påverkan måste prövas separat',
   explanation:'Romersk dominans över Judeen från 63 f.Kr. och den senare romerska administrationen utgjorde en central politisk kontext för judiskt samhällsliv, Jesusrörelsens framväxt och de tidiga kristna församlingarna. Romersk makt, ekonomi och infrastruktur formade villkoren för dessa grupper. Det bevisar inte att kristna trosföreställningar kan härledas direkt ur romersk religion eller politik.',
   sources:[['The Met – The Eastern Mediterranean and Syria','https://82nd-and-fifth.metmuseum.org/toah/ht/04/wae.html']]
  },
  O043:{
   level:'Historisk ram för judiskt samhällsliv – religiösa lån ej fastställda',
   explanation:'Under akemenidiskt styre förändrades de politiska förutsättningarna för judiska grupper efter den babyloniska exilen. Detta är en viktig bakgrund till berättelserna om återvändande och tempelgemenskap. Hur persiska religiösa idéer eventuellt påverkade judendomen är en särskild och omdiskuterad forskningsfråga, inte något som kan avgöras av rikets geografiska utsträckning.',
   sources:[['The Met – The Achaemenid Persian Empire','https://www.metmuseum.org/ja/essays/the-achaemenid-persian-empire-550-330-b-c']]
  }
 });
 function impactFor(id){
  const c7=window.TIDENS_C7_RELIGION?.[id];
  if(c7)return {level:c7.level,explanation:c7.paragraph,sources:c7.sources||[]};
  return impactByPost[id]||null;
 }
 const create=(tag,cls,text)=>{
  const e=document.createElement(tag);
  if(cls)e.className=cls;
  if(text!==undefined)e.textContent=text;
  return e;
 };
 function addFaithContext(root,id){
  const article=Array.from(root.children).find(n=>n.matches('.v86-article'));
  if(!article||article.querySelector('.v838-faith-impact'))return;
  const item=impactFor(id);
  if(!item)return;
  const section=create('section','v838-faith-impact');
  section.setAttribute('aria-label','Betydelse för religiös historia');
  section.append(
   create('h3','','Betydelse för Israels religion, judendomen och kristendomen'),
   create('p','v838-faith-level',item.level),
   create('p','',item.explanation)
  );
  if(item.sources.length){
   const sourceLine=create('p','v838-faith-sources');
   sourceLine.append(create('strong','','Källor för den historiska kontexten: '));
   item.sources.forEach(([title,url],i)=>{
    if(i)sourceLine.append(document.createTextNode(' · '));
    const link=create('a','',title+' ↗');
    link.href=url;link.target='_blank';link.rel='noopener noreferrer';
    sourceLine.append(link);
   });
   section.append(sourceLine);
  }
  // En ny rubrik i den befintliga källförankrade artikeln, efter konsekvenser
  // och före diskussionen om osäkerheter och källor.
  const boundary=Array.from(article.children).find(node=>node.matches('h3')&&node.textContent.trim()==='Osäkerheter och viktiga preciseringar');
  if(boundary)article.insertBefore(section,boundary);
  else article.append(section);
  window.TidensC7Ui?.decorate(article);
 }
 function reflow(root){
  const children=Array.from(root.children);
  const take=selector=>children.find(node=>node.matches(selector))||null;
  const priority=[
   take('#v829ReaderGrip'),
   take('#v829WidthControls'),
   take('.v84-reader-bar'),
   take('.kicker'),
   take('h2'),
   take('.v86-article'),
   take('.v828-collapsed'),
   take('.v828-dossier'),
   take('.v827-reader-rel')
  ].filter(Boolean);
  const chosen=new Set(priority);
  const leftovers=children.filter(node=>!chosen.has(node));
  // Flytta faktiska DOM-noder (inga kopior), så eventlyssnare,
  // knappar, informationsrutor och sökfunktioner förblir aktiva.
  root.append(...priority,...leftovers);
  root.classList.add('v838-reader-reflow');
 }
 const previous=renderDetail;
 renderDetail=function(){
  previous();
  const panel=document.getElementById('detail');
  const e=typeof idEvent==='function'?idEvent(state.selected):null;
  if(!panel||!e)return;
  addFaithContext(panel,e.id);
  reflow(panel);
 };
})();
