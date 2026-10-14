/* V8.41 – källnära textjämförelse i befintlig läsarpanel.
   De fyra passagerna får aldrig användas som bevis för direkt påverkan
   utan egen källkritisk prövning av datering och överföringsvägar. */
(function(){
 'use strict';
 const record=window.TIDENS_TEXT_COMPARISON_V841;
 if(!record)return;
 const el=(tag,cls,txt)=>{
  const n=document.createElement(tag);
  if(cls)n.className=cls;
  if(txt!==undefined)n.textContent=txt;
  return n;
 };
 function link(title,url){
  const a=el('a','',title+' ↗');
  a.href=url;a.rel='noopener noreferrer';a.target='_blank';return a;
 }
 const sourceById=id=>record.sources.find(s=>s.id===id);
 function sourceCard(s){
  const card=el('article','v841-source');
  card.append(el('h5','',s.label));
  const category=el('p','v841-type',s.tradition+' · '+s.type);
  card.append(category);
  const synopsis=el('p','',s.description);
  card.append(synopsis);
  const time=el('p','v841-time',s.time);
  card.append(time);
  const notes=el('p','v841-limit','Beläggsnivå: '+s.certainty+'. '+s.access+'.');
  card.append(notes);
  const links=el('div','v841-links');
  links.append(link('Visa text eller passage',s.url),link('Forskning om datering och kontext',s.contextUrl));
  card.append(links);
  return card;
 }
 function comparisonCard(pair){
  const one=sourceById(pair.a),two=sourceById(pair.b);
  const box=el('details','v841-comparison');
  const head=el('summary','',pair.title);
  box.append(head);
  const meta=el('p','v841-pair-meta',(one?.label||pair.a)+' ↔ '+(two?.label||pair.b));
  box.append(meta);
  for(const [label,key] of [['Gemensamt motiv','common'],['Viktig skillnad','difference'],['Forskningsläget','grade'],['Argument för samband','argument'],['Invändningar och alternativ','counter']]){
   const section=el('div','v841-comparison-point');
   section.append(el('strong','',label),el('p','',pair[key]));
   box.append(section);
  }
  box.append(link('Forskningsunderlag',pair.scholarSource));
  return box;
 }
 function createPanel(){
  const panel=el('section','v841-text-compare');
  panel.setAttribute('aria-label','Textjämförelse med dokumenterad källkritik');
  panel.append(el('h3','','Källnära jämförelse: iransk och judisk uppståndelsetro'));
  panel.append(el('p','v841-intro',record.introduction));
  const sources=el('details','v841-source-list');
  sources.append(el('summary','','Visa de fyra textställen som jämförs'));
  const grid=el('div','v841-sources');
  record.sources.forEach(s=>grid.append(sourceCard(s)));
  sources.append(grid);
  panel.append(sources);
  panel.append(el('h4','','Tre prövade jämförelser'));
  const pairs=el('div','v841-comparisons');
  record.comparisons.forEach(p=>pairs.append(comparisonCard(p)));
  panel.append(pairs);
  panel.append(el('p','v841-conclusion','Slutsats: '+record.conclusion));
  panel.append(el('p','v841-boundary','Avgränsning: '+record.scope));
  return panel;
 }
 function insert(){
  const id=state?.selected;
  const root=document.getElementById('detail');
  if(!root)return;
  root.querySelectorAll('.v841-text-compare').forEach(old=>old.remove());
  if(!record.showFor.includes(id))return;
  const article=Array.from(root.children).find(n=>n.matches('.v86-article'));
  if(!article)return;
  const panel=createPanel();
  const heading=Array.from(article.children).find(n=>n.matches('h3')&&n.textContent.trim()==='Osäkerheter och viktiga preciseringar');
  if(heading)article.insertBefore(panel,heading);
  else article.append(panel);
 }
 const prev=renderDetail;
 renderDetail=function(){prev();insert()};
 window.TidensTextComparisonV841=Object.freeze({data:record,sourceById});
 if(document.getElementById('detail')&&typeof state!=='undefined')insert();
})();
