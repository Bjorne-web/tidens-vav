/* Granskning 2 – forskningsspår, första preview. Ingen ändring i historiska data eller C6. */
(function(){
'use strict';
const sources=[
{name:'Matthew Suriano (2018), A History of Death in the Hebrew Bible',url:'https://academic.oup.com/book/9018'},
{name:'Suriano (2018), Death, Dying, and the Liminality of Sheol',url:'https://academic.oup.com/book/9018/chapter-abstract/155527592'},
{name:'Brian B. Schmidt (2020), Death and Afterlife',url:'https://academic.oup.com/edited-volume/34254/chapter-abstract/290409395'},
{name:'Oxford Bibliographies, Hell',url:'https://academic.oup.com/reference/62341/reference-article-abstract/554093311'},
{name:'1 Henok 22, R. H. Charles äldre översättning (jämför textvittnen)',url:'https://en.wikisource.org/wiki/The_Book_of_Enoch_(Charles)/Chapter_22'}
];
const existing=[
{id:'O075',title:'Osiris – egyptiska föreställningar'},
{id:'O030',title:'Zoroastrismen – möjlig idékontakt'},
{id:'H023',title:'Daniels bok och uppståndelsen'},
{id:'H024',title:'Mackabeerupproret och dess textmiljö'},
{id:'H025',title:'1 Henok – apokalyptiska domsbilder'},
{id:'H057',title:'4Q201 – daterat Henokfragment'},
{id:'O119',title:'Jobs bok – lidande och död'}
];
const esc=x=>String(x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const postUrl=id=>'/?tv_id='+encodeURIComponent(id)+'&tv_view=research';
function markup(){
return '<section id="v888Track" class="v888-track" aria-label="Granskning 2: Himmel och helvete">'+
'<div class="v888-head"><span class="v888-kicker">GRANSKNING 2 · FORSKNINGSSPÅR · PREVIEW</span><h2>Himmel, helvete och livet efter döden</h2><p>Hur skiftade föreställningarna om döden, uppståndelsen och domen? Följ texterna i sin historiska kontext. Detta är ett redaktionellt forskningsspår, inte en ny händelse på tidslinjen.</p><p class="v888-warning">Pågående vetenskaplig granskning · inga nya poster har markerats som slutgranskade.</p></div>'+
'<details open><summary>1. Sheol – den hebreiska Bibelns dödsföreställningar</summary><div class="v888-body"><p><strong>Ny forskningsfördjupning (utkast).</strong> Sheol används i den hebreiska Bibeln om dödens område och ibland i nära samband med gravens eller dödens gräns. Det beskrivs inte genomgående som en plats för individuell belöning eller evigt straff. Dödens sociala verklighet – begravning, familjegrav och minnet av förfäder – är också central för att förstå texterna.</p><p><strong>Läs i grundtexterna:</strong> Ps 6:6; Job 7:9–10; Pred 9:5–10; Jes 38:18; jämför 1 Sam 28. Textställen och dateringar ska prövas separat.</p><p><strong>Forskningsavvägning:</strong> Suriano visar att Sheol ibland betecknar ett föreställt dödsrike och ibland ligger närmare gravmetaforik. Därför vore det fel både att likställa Sheol med senare helveteslära och att hävda en enda enhetlig israelitisk efterlivssyn.</p><p><strong>Beläggsläge:</strong> Stark grund för begreppsåtskillnaden, men deltexternas teologi, datering och användning kräver fortsatt postvis kontroll.</p></div></details>'+
'<details><summary>2. Från Sheol till uppståndelse och dom</summary><div class="v888-body"><p><strong>Ny sammanlänkande fördjupning (utkast).</strong> Under andra templets tid möter vi flera överlappande judiska traditioner om de dödas framtid. Dan 12:2 beskriver uppvaknande med olika utgångar. 2 Mack 7 skildrar hopp om uppståndelse under förföljelse. 1 Hen 22 presenterar flera förvaringsrum för de döda i väntan på domen. Detta är inte en linjär process där alla grupper trodde samma sak.</p><p><strong>Viktig reservation:</strong> Persisk-judisk kontakt är historiskt belagd, men ett direkt lån av hela uppståndelseläran från zoroastrismen kan inte betraktas som bevisat. Henoksbokens olika delar har skilda tillkomsthistorier.</p><p><strong>Jämför Nya testamentet:</strong> Mark 9:43–48 (Gehenna), Luk 16:19–31 (Hades), Luk 23:43 (paradiset), 1 Kor 15 (uppståndelse), Upp 20–22 (dom och nyskapelse). Begreppen ska inte läsas som utbytbara ord för samma plats.</p><p><strong>Beläggsläge:</strong> Hög säkerhet att texterna representerar flera föreställningar; enhetlig teologisk syntes är en senare tolkningsfråga.</p></div></details>'+
'<details><summary>3. Senare kristna modeller – fortsatt källarbete</summary><div class="v888-body"><p>Evigt medvetet straff, slutlig förintelse och alltings återupprättelse är olika modeller i kristen teologi. Tidigkristna och medeltida källor kommer att prövas separat. Dante är en viktig källa till senare föreställningsvärld, men hans dikt är inte en biblisk primärkälla.</p><p><strong>Status:</strong> Forskningsplan, inte färdiggranskat innehåll.</p></div></details>'+
'<div class="v888-columns"><div><h3>Följ befintliga poster</h3><ul>'+existing.map(p=>'<li><a href="'+postUrl(p.id)+'">'+esc(p.id)+' · '+esc(p.title)+'</a></li>').join('')+'</ul><small>Direktlänkar öppnar Vävens befintliga forskningsposter i samma app.</small></div><div><h3>Forskningskällor</h3><ul>'+sources.map(s=>'<li><a href="'+esc(s.url)+'" target="_blank" rel="noopener noreferrer">'+esc(s.name)+' ↗</a></li>').join('')+'</ul><small>Källorna har olika funktioner: modern fackforskning respektive äldre översatt primärtext. Ingen källa ensam slutgranskar hela spåret.</small></div></div>'+
'<p class="v888-footer">Fortsättning planerad: Är Gud god? · Den fria viljan. Dessa är tvärgående forskningsspår, inte nya huvudkategorier.</p>'+
'</section>';
}
function install(){
const host=document.getElementById('researchView');if(!host)return;
if(host.querySelector('#v888Track'))return;
host.insertAdjacentHTML('afterbegin',markup());
}
function init(){
const host=document.getElementById('researchView');if(!host)return;
install();
new MutationObserver(()=>{if(!host.querySelector('#v888Track'))install()}).observe(host,{childList:true});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();