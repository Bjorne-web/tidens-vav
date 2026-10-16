/* V8.39 – enhetlig läsarstruktur för hela Tidens väv (193 poster).
 * Befintligt forskningsmaterial och alla tidigare DOM-element bevaras.
 * Inga vetenskapliga slutgranskningsstämplar eller nya årtal tilldelas.
 */
(function(){
 'use strict';
 const esc=value=>enc(String(value==null?'':value));
 const safeUrl=value=>{
  try{const u=new URL(String(value));return u.protocol==='https:'||u.protocol==='http:'?u.href:null}
  catch(_){return null}
 };
 const external=(name,url)=>{
  const address=safeUrl(url);
  return address?`<li><a href="${esc(address)}" target="_blank" rel="noopener noreferrer">${esc(name)} ↗</a></li>`:'';
 };
 const has=key=>typeof window!=='undefined' && Object.prototype.hasOwnProperty.call(window,key);
 function dataFor(e){
  if(!e)return null;
  const targeted=window.TIDENS_SPECIAL_RESEARCH?.[e.id]||null;
  const dossier=typeof allOriginalResearchV828!=='undefined'?allOriginalResearchV828[e.id]:null;
  const researchInfo=typeof research!=='undefined'?research[e.id]:null;
  const library=typeof v82Library!=='undefined'?v82Library[e.id]:null;
  const sourceCard=typeof sourceCardsV86!=='undefined'?sourceCardsV86[e.id]:null;
  const otherCard=typeof sourceCardsV87!=='undefined'?sourceCardsV87[e.id]:null;
  const sourceCard810=typeof sourceCardsV810!=='undefined'?sourceCardsV810[e.id]:null;
  const material=targeted||dossier||sourceCard||sourceCard810||otherCard||library||researchInfo||null;
  const sources=[],seen=new Set();
  function addSource(name,url){
   const address=safeUrl(url);
   if(!address||seen.has(address))return;
   sources.push({name:name||'Källa',url:address});seen.add(address);
  }
  for(const obj of [targeted,dossier,sourceCard,sourceCard810,otherCard,library,researchInfo]){
   if(!obj||!Array.isArray(obj.sources))continue;
   for(const s of obj.sources) {
    if(Array.isArray(s))addSource(s[0],s[1]);
    else if(s && typeof s==='object')addSource(s.name||s.title,s.url||s.sourceUrl);
   }
  }
  if(e.source)addSource('Postens registrerade källänk',e.source);
  const summary=targeted?.summary||dossier?.summary||sourceCard?.summary||sourceCard810?.summary||otherCard?.summary||library?.summary||researchInfo?.overview||e.description||e.sub||null;
  const context=targeted?.context||dossier?.context||sourceCard?.context||sourceCard810?.context||otherCard?.context||library?.context||researchInfo?.parallels||null;
  const impact=targeted?.impact||sourceCard?.impact||sourceCard810?.impact||otherCard?.impact||library?.impact||null;
  const limits=targeted?.limits||dossier?.limits||sourceCard?.limits||sourceCard810?.limits||otherCard?.limits||library?.limits||researchInfo?.caution||null;
  return {
   id:e.id,title:e.title,heading:material?.heading||e.title,
   summary,context,impact,limits,sources,
   sourceBasis:!!material||sources.length>0,
   original:!!e.original
  };
 }
 function religionFor(e){
  const targeted=window.TIDENS_SPECIAL_RESEARCH?.[e.id];
  if(targeted?.religion)return targeted.religion;
  if(e.id==='O067'||e.id==='H005')return {
   level:'Textparalleller – direkt beroende inte slutgiltigt fastställt',
   paragraph:'Gilgamesheposets flodberättelse har tydliga motivparalleller till Genesis 6–9, bland annat en stor översvämning, en båt och fåglar som sänds ut. Textvittnenas olika tillkomst- och kopieringstider måste skiljas åt. Att motiven liknar varandra är inte ensamt bevis för en direkt kopieringskedja.'
  };
  return {
   level:'Religionshistorisk betydelse återstår att särskilt granska',
   paragraph:'Ingen individuell, källprövad analys av just denna posts eventuella betydelse för Israels religion, judendomen eller kristendomen finns ännu registrerad. Här dras därför inga slutsatser om direkt påverkan.'
  };
 }
 function paragraph(value,missing){
  return `<p>${esc(value||missing)}</p>`;
 }
 function buildArticle(e){
  const d=dataFor(e);
  if(!d)return '';
  const faith=religionFor(e);
  const sources=d.sources.map(s=>external(s.name,s.url)).filter(Boolean).join('');
  const status=!d.sourceBasis?'Inga individuella forskningskällor redovisade för denna post – texten är inte källgranskad.':
    'Underlaget är källhänvisat men samtliga historiska påståenden är inte vetenskapligt slutgranskade.';
  return `<div class="kicker">TIDENS VÄV · ${d.sourceBasis?'KÄLLFÖRANKRAD GENOMGÅNG · AVGRÄNSAT UNDERLAG':'GENOMGÅNG · KÄLLGRANSKNING ÅTERSTÅR'}</div>
    <h2>${esc(d.heading)}</h2>
    <p class="v839-unified-status">${esc(status)}${d.original?' Originalpostens importerade årtal är inte automatiskt verifierade.':''}</p>
    ${e.id==='H065' ? "<figure style=\"margin:14px 0\"><img loading=\"lazy\" alt=\"Arkeologisk plats vid Qal’at al-Bahrain\" style=\"width:100%;max-height:265px;object-fit:cover;border-radius:12px\" src=\"https://commons.wikimedia.org/wiki/Special:FilePath/Qal%27at_al-Bahrain%2C_Karbabad%2C_Bar%C3%A9in%2C_2024-08-18%2C_DD_51.jpg?width=1000\"><figcaption style=\"font-size:12px;opacity:.8\">Det historiska Dilmun: Qal’at al-Bahrain. Foto Diego Delso, CC BY-SA 4.0. Inte en bild av den mytiska trädgården. <a href=\"https://commons.wikimedia.org/wiki/File:Qal%27at_al-Bahrain,_Karbabad,_Bar%C3%A9in,_2024-08-18,_DD_51.jpg\" target=\"_blank\" rel=\"noopener noreferrer\">Källa och licens ↗</a></figcaption></figure>" : ''}
    <h3>Vad var det?</h3>${paragraph(d.summary,'Sammanfattning saknas ännu. Originalpostens titel och arkivuppgifter finns i den samlade översikten nedan.')}
    <h3>Historiskt sammanhang</h3>${paragraph(d.context,'Det historiska sammanhanget är ännu inte dokumenterat i ett individuellt forskningsunderlag.')}
    <h3>Konsekvenser och betydelse</h3>${paragraph(d.impact,'Postens historiska konsekvenser är ännu inte särskilt källprövade.')}
    <div class="v838-faith-impact v839-faith-context"><h3>Betydelse för Israels religion, judendomen och kristendomen</h3>
      <p class="v838-faith-level">${esc(faith.level)}</p><p>${esc(faith.paragraph)}</p></div>
    <h3>Osäkerheter och viktiga preciseringar</h3>${paragraph(d.limits,'Vetenskaplig granskning av datering, belägg och alternativa tolkningar återstår.')}
    <h3>Källor och läsvägar</h3>${sources?`<ul class="v839-unified-sources">${sources}</ul>`:
      '<p class="v839-unified-missing">Individuella källhänvisningar behöver kompletteras.</p>'}
    <p class="v839-unified-caveat">Ett enskilt källstöd är inte samma sak som en fullständig granskning av historisk datering, textutveckling eller religiöst beroende.</p>`;
 }
 function makeOverview(root,e){
  let overview=Array.from(root.children).find(n=>n.matches('details.v828-collapsed')||n.matches('.v839-unified-overview'));
  if(!overview){
   overview=document.createElement('details');
   overview.className='v839-unified-overview';
  }else{
   overview.classList.add('v839-unified-overview');
  }
  let summary=Array.from(overview.children).find(n=>n.matches('summary'));
  if(!summary){
   summary=document.createElement('summary');
   overview.prepend(summary);
  }
  summary.textContent='Samlad forskningsöversikt';
  // Ett dossier för originalpost (t.ex. O067) ska inte ligga som en
  // fristående parallell artikel ovanför den källförankrade genomgången.
  const dossier=Array.from(root.children).find(n=>n.matches('.v828-dossier'));
  if(dossier)overview.append(dossier);
  const isBase=node=>node.matches('.meta')||node.matches('.warn')||
   node.matches('.note')||node.matches('.sources')||node.matches('figure')||
   node.matches('.small')||node.matches('.tiny')||
   (node.matches('p')&&!node.className);
  const metadata=Array.from(root.children).filter(isBase);
  if(metadata.length){
   let supplement=overview.querySelector('.v839-archive-metadata');
   if(!supplement){
    supplement=document.createElement('div');
    supplement.className='v839-archive-metadata';
    const heading=document.createElement('h3');
    heading.textContent='Äldre postuppgifter och kompletterande material';
    supplement.append(heading);
    overview.append(supplement);
   }
   supplement.append(...metadata);
  }
  if(!overview.parentNode)root.append(overview);
  return overview;
 }
 function reorder(root,article,overview){
  const children=Array.from(root.children);
  const find=selector=>children.find(n=>n.matches(selector))||null;
  const important=[
   find('#v829ReaderGrip'),find('#v829WidthControls'),
   find('.v84-reader-bar'),find('.kicker'),find('h2'),article,overview,
   find('.v827-reader-rel')
  ].filter(Boolean);
  const excluded=new Set(important);
  const remaining=children.filter(n=>!excluded.has(n));
  root.append(...important,...remaining);
  root.classList.add('v839-unified-reader');
 }
 function unify(){
  const root=document.getElementById('detail');
  const e=typeof idEvent==='function'?idEvent(state.selected):null;
  if(!root||!e)return;
  let article=Array.from(root.children).find(n=>n.matches('.v86-article'));
  if(!article){
   article=document.createElement('section');
   article.className='v86-article v839-unified-article';
   article.innerHTML=buildArticle(e);
   root.append(article);
  }
  const overview=makeOverview(root,e);
  reorder(root,article,overview);
 }
 const previousRender=renderDetail;
 renderDetail=function(){previousRender();unify()};
 window.TidensUniversalReader=Object.freeze({
  modelFor:dataFor,
  renderArticle:buildArticle,
  religionFor
 });
 if(document.getElementById('detail')&&typeof state!=='undefined')unify();
})();
