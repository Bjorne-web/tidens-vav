/* Granskning 2, etapp 2: tvärgående idéhistoriska forskningsspår. */
(function(){
'use strict';
const esc=x=>String(x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const tracks=[
{key:'good',heading:'Är Gud god?',intro:'Hur har människor beskrivit gudomlig godhet, rättvisa och lidande? Den historiska forskningen kartlägger idéernas tillkomst och utveckling, inte om Gud verkligen existerar eller är moraliskt god.',sections:[
{title:'Forntida Främre Orienten – lidande och gudomlig rättvisa',body:'Mesopotamiska teodicidialoger och berättelser om lidande ger jämförelsematerial till Job. Textlikheter är inte automatiskt belägg för lån. Frågan om gudomlig godhet behöver undersökas utifrån den enskilda textens genre och miljö.'},
{title:'Jobs bok – protest, oskyldigt lidande och gudssvar',body:'Job utmanar den enkla föreställningen att lidande alltid är ett rättvist straff. Prologen, dialogerna och Guds tal kan inte reduceras till ett enda entydigt argument. Jämför Job 1–2, 3, 38–42.'},
{title:'Klassisk teodicé – Augustinus, Leibniz och modern filosofi',body:'Vi följer skilda modeller: det onda som brist, argument utifrån fri vilja, lidandets möjliga funktion och invändningar mot dessa. Ingen modell får presenteras som ett historiskt eller naturvetenskapligt bevis för Guds godhet.'}],
links:[{id:'O119',label:'Job – befintlig post'},{id:'O030',label:'Zoroastrism – gott och ont som jämförelse'}],
sources:[{name:'Stanford Encyclopedia of Philosophy – The Problem of Evil',url:'https://plato.stanford.edu/entries/evil/'},{name:'Stanford Encyclopedia of Philosophy – Theodicies',url:'https://plato.stanford.edu/entries/theodicies/'}]},
{key:'will',heading:'Den fria viljan',intro:'När började människor formulera frihet, öde och moraliskt ansvar som filosofiska problem? Vi skiljer den idéhistoriska utvecklingen från frågan om fri vilja faktiskt finns.',sections:[
{title:'Antiken – handling, öde och ansvar',body:'Hos Aristoteles diskuteras frivilliga och ofrivilliga handlingar; i stoicismen uppstår särskilda frågor om öde, kausalitet och ansvar. Dessa positioner får inte göras till ett enda antikt svar.'},
{title:'Paulus och Augustinus – vilja, synd och nåd',body:'Rom 7 och 9 samt Augustinus skrifter om vilja och nåd är centrala för kristendomens senare diskussioner. Paulus och Augustinus måste dateras, läsas var för sig och sättas i sin historiska kontext.'},
{title:'Reformationen till modern filosofi och neurovetenskap',body:'Från Luther och Erasmus till determinism, kompatibilism och libertariansk fri vilja. Neurologiska experiment om beslutstidpunkter får inte på egen hand avgöra en filosofisk definition av ansvar.'}],
links:[{id:'O119',label:'Job – ansvar och lidande'},{id:'H023',label:'Daniel – dom och ansvar'}],
sources:[{name:'Stanford Encyclopedia of Philosophy – Free Will',url:'https://plato.stanford.edu/entries/freewill/'},{name:'Stanford Encyclopedia of Philosophy – Moral Responsibility',url:'https://plato.stanford.edu/entries/moral-responsibility/'},{name:'Stanford Encyclopedia of Philosophy – Divine Providence',url:'https://plato.stanford.edu/entries/providence-divine/'}]}
];
function section(t){return '<section class="v888-track v889-track" id="v889-'+t.key+'"><div class="v888-head"><span class="v888-kicker">GRANSKNING 2 · IDÉHISTORISKT FORSKNINGSSPÅR · UTKAST</span><h2>'+esc(t.heading)+'</h2><p>'+esc(t.intro)+'</p><p class="v888-warning">Källorienterad forskningsöversikt; inga kompletta vetenskapliga slutgranskningar är registrerade här.</p></div>'+
t.sections.map((s,i)=>'<details'+(i===0?' open':'')+'><summary>'+(i+1)+'. '+esc(s.title)+'</summary><div class="v888-body"><p>'+esc(s.body)+'</p></div></details>').join('')+
'<div class="v888-columns"><div><h3>Kopplingar i Väven</h3><ul>'+t.links.map(p=>'<li><a href="/?tv_id='+encodeURIComponent(p.id)+'&tv_view=research">'+esc(p.id)+' · '+esc(p.label)+'</a></li>').join('')+'</ul></div>'+
'<div><h3>Fortsatt källprövning</h3><ul>'+t.sources.map(s=>'<li><a href="'+esc(s.url)+'" target="_blank" rel="noopener noreferrer">'+esc(s.name)+' ↗</a></li>').join('')+'</ul><small>Översiktskällor används för forskningspositioner. Primärtexter och datering kräver separat kontroll före slutgranskning.</small></div></div></section>'}
function install(){const host=document.getElementById('researchView');if(!host||host.querySelector('#v889-good'))return;host.insertAdjacentHTML('beforeend',tracks.map(section).join(''));}
function init(){const host=document.getElementById('researchView');if(!host)return;install();new MutationObserver(()=>{if(!host.querySelector('#v889-good'))install()}).observe(host,{childList:true});}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
