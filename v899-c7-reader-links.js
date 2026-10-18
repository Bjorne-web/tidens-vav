/* V8.99 – uniform C7 reader links. Bibliographic search is a fallback, not a validated citation. */
(function(){
'use strict';
const groups=[
['1 Mos|Första Moseboken|Genesis|Gen','GEN'],['2 Mos|Andra Moseboken|Exodus|Ex','EXO'],
['3 Mos|Leviticus','LEV'],['4 Mos|Numeri','NUM'],['5 Mos|Deuteronomium','DEU'],
['Josua|Jos','JOS'],['Domarboken|Dom','JDG'],['Rut','RUT'],
['1 Samuelsboken|1 Sam','1SA'],['2 Samuelsboken|2 Sam','2SA'],
['1 Kungaboken|1 Kung','1KI'],['2 Kungaboken|2 Kung','2KI'],
['1 Krönikeboken|1 Krön','1CH'],['2 Krönikeboken|2 Krön','2CH'],
['Esra','EZR'],['Nehemja','NEH'],['Ester','EST'],['Job','JOB'],
['Psaltaren|Ps','PSA'],['Ordspråksboken|Ords','PRO'],
['Predikaren|Pred','ECC'],['Höga visan','SNG'],['Jesaja|Jes','ISA'],['Jeremia|Jer','JER'],
['Hesekiel|Hes','EZK'],['Daniel|Dan','DAN'],['Hosea|Hos','HOS'],
['Joel','JOL'],['Amos','AMO'],['Obadja','OBA'],['Jona','JON'],
['Mika|Mik','MIC'],['Nahum','NAM'],['Habackuk|Hab','HAB'],
['Sefanja|Sef','ZEP'],['Haggai|Hagg','HAG'],['Sakarja|Sak','ZEC'],['Malaki|Mal','MAL'],
['Matteusevangeliet|Matteus|Matt','MAT'],['Markusevangeliet|Markus|Mark','MRK'],
['Lukasevangeliet|Lukas|Luk','LUK'],['Johannesevangeliet|Johannes|Joh','JHN'],
['Apostlagärningarna|Apg','ACT'],['Romarbrevet|Rom','ROM'],
['1 Korinthierbrevet|1 Kor','1CO'],['2 Korinthierbrevet|2 Kor','2CO'],
['Galaterbrevet|Gal','GAL'],['Efesierbrevet|Ef','EPH'],['Filipperbrevet|Fil','PHP'],
['Kolosserbrevet|Kol','COL'],['1 Thessalonikerbrevet|1 Thess','1TH'],
['2 Thessalonikerbrevet|2 Thess','2TH'],['1 Timotheosbrevet|1 Tim','1TI'],
['2 Timotheosbrevet|2 Tim','2TI'],['Titusbrevet|Tit','TIT'],['Filemonbrevet|Filem','PHM'],
['Hebreerbrevet|Hebr|Heb','HEB'],['Jakobsbrevet|Jak','JAS'],
['1 Petrusbrevet|1 Pet|1 Petr','1PE'],['2 Petrusbrevet|2 Pet|2 Petr','2PE'],
['1 Johannesbrevet|1 Joh','1JN'],['2 Johannesbrevet|2 Joh','2JN'],
['3 Johannesbrevet|3 Joh','3JN'],['Judasbrevet|Judas|Jud','JUD'],
['Uppenbarelseboken|Upp','REV']];
const lookup=new Map(),names=[];
for(const [words,code] of groups){for(const name of words.split('|')){names.push(name);lookup.set(name.toLowerCase(),code)}}
names.sort((a,b)=>b.length-a.length);
const escaped=s=>s.replace(/[|\\{}()[\]^$+*?.]/g,'\\$&');
const rx=new RegExp('(^|[^\\p{L}\\p{N}])('+names.map(escaped).join('|')+')\\s+(\\d{1,3})(?::(\\d{1,3})(?:[-–]\\d{1,3})?)?(?:\\s*[-–]\\s*\\d{1,3})?','giu');
function references(input){
 const matches=[];rx.lastIndex=0;let m;
 while((m=rx.exec(String(input||'')))){
  const code=lookup.get(m[2].toLowerCase());
  // Judas, Obadja, Filemon och 2–3 Johannes har endast ett kapitel.
  // ”Judas 14–15” avser verser i kapitel 1, inte kapitel 14.
  const singleChapter=['JUD','OBA','PHM','2JN','3JN'].includes(code);
  const chapter=singleChapter?1:Number(m[3]),verse=Number(m[4]||1);
  if(chapter<1||chapter>150||verse>176)continue;
  const start=m.index+m[1].length,label=m[0].slice(m[1].length);
  matches.push({start,end:start+label.length,label,url:'https://www.bible.com/sv/bible/1223/'+code+'.'+chapter+'.SFB15'});
 }
 return matches;
}
function linkify(node){
 if(!node.parentElement||node.parentElement.closest('a,button,code,.v838-faith-level,.v838-faith-sources,.v839-unified-sources,.tv-c7-search-note'))return;
 const spans=references(node.nodeValue);if(!spans.length)return;
 const fragment=document.createDocumentFragment();let last=0;
 for(const m of spans){if(m.start<last)continue;
  if(m.start>last)fragment.append(document.createTextNode(node.nodeValue.slice(last,m.start)));
  const a=document.createElement('a');a.href=m.url;a.target='_blank';a.rel='noopener noreferrer';
  a.className='tv-c7-bible-ref';a.textContent=m.label;a.title='Läs '+m.label+' i Bibeln (SFB15)';
  fragment.append(a);last=m.end;
 }
 if(last<node.nodeValue.length)fragment.append(document.createTextNode(node.nodeValue.slice(last)));
 node.parentNode.replaceChild(fragment,node);
}
function decorate(article){
 if(!article||!article.querySelectorAll)return;
 const nodes=[];
 article.querySelectorAll('p').forEach(p=>{
  if(p.closest('.v839-unified-sources,.v838-faith-sources,.v838-faith-level,.tv-c7-search-note'))return;
  const walker=document.createTreeWalker(p,NodeFilter.SHOW_TEXT);let n;
  while((n=walker.nextNode()))nodes.push(n);
 });
 nodes.forEach(linkify);
 article.querySelectorAll('.v838-faith-impact ul li,ul.v839-unified-sources li,ul.tv-research-sources li').forEach(li=>{
  if(li.querySelector('.tv-c7-source-fallback'))return;
  const a=li.querySelector('a[href^="http"]');if(!a)return;
  const domain=new URL(a.href).hostname;
  if(!/(?:oup\.com|doi\.org|wiley\.com|cambridge\.org|jstor\.org|sagepub\.com|tandfonline\.com|springer\.com|mohrsiebeck\.com)/i.test(domain))return;
  const alternative=document.createElement('a');alternative.className='tv-c7-source-fallback';
  alternative.href='https://www.google.com/search?q='+encodeURIComponent('"'+a.textContent.replace(/↗/g,'').trim()+'"');
  alternative.target='_blank';alternative.rel='noopener noreferrer';
  alternative.textContent='Sök publikationen ↗';
  alternative.title='Alternativ sökning om direktlänken har betalvägg eller kräver inloggning';
  li.append(document.createTextNode(' · '),alternative);
 });
 if(!article.dataset.tvC7ClickGuard){
  article.addEventListener('click',e=>{if(e.target.closest('a[href^="http"]'))e.stopPropagation()},true);
  article.dataset.tvC7ClickGuard='1';
 }
}
window.TidensC7Ui=Object.freeze({references,decorate});
})();