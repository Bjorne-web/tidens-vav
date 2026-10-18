/* Kyrkans omprövningar – tre parallella daterade spår och ett tvärgående forskningskapitel.
   Preview: återanvänder befintlig app, inga nya händelse-ID:n/C6-ändringar. */
(function(){
'use strict';
const data=window.TIDENS_CHURCH_SHIFTS;
if(!data||!Array.isArray(data.events))return;
const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const state={topic:'all',includeWorld:true,openId:null};
const sourceSafe=url=>{try{const u=new URL(url);return u.protocol==='https:'?u.href:null}catch(_){return null}};
const bible=ref=>{
 const linked=typeof window.TidensReview2BibleLink==='function'?window.TidensReview2BibleLink(ref):esc(ref);
 if(linked.includes('href='))return linked;
 const jos=/^Jos (\\d+)(?::(\\d+))?/.exec(ref);
 if(jos){
  const url='https://www.bible.com/sv/bible/154/JOS.'+jos[1]+(jos[2]?'.'+jos[2]:'')+'.B2000';
  return '<a href="'+url+'" target="_blank" rel="noopener noreferrer">'+esc(ref)+' ↗</a>';
 }
 return esc(ref);
};
const history=[
{title:'1. Den antika frågan var inte formulerad som vår',parts:[
'Antika samhällen kände till samkönade sexuella handlingar och även relationer som kunde beskrivas med närhet och varaktighet. Men de arbetade i regel inte med dagens begrepp om sexuell läggning, identitet och jämlikt äktenskap. Social ställning, slaveri, medborgarskap, hushållets ordning och skillnader mellan aktiv och passiv sexuell roll kunde väga mycket tungt. Den antika världen var mer mångfacetterad än att alla samkönade handlingar skulle ha varit exploaterande, men också mycket olik dagens relationsideal.',
'Den hebreiska Bibelns helighetslagstiftning innehåller explicita förbud mot en viss manlig samkönad sexuell handling i [[3 Mos 18:22]] och [[3 Mos 20:13]]. En historisk analys måste erkänna deras negativa ordalydelse. Den behöver samtidigt undersöka lagsamlingens tillkomst, Israels folkidentitet, kultiska och sociala sammanhang samt hur senare kristna tolkar varför vissa lagar förblir bindande. Att i efterhand dela upp lagen i moralisk, ceremoniell och civil lag är en teologisk modell, inte ett färdigt index i själva Moseboken.',
'Berättelsen om Sodom i [[1 Mos 19]] handlar bland annat om hotet mot gäster, våld och kollektiv förnedring. [[Hes 16:49]] kritiserar högmod, överflöd och försummelse av nödlidande. Men bibelreceptionen av Sodom varierar också i andra judiska och kristna texter. Det är därför klokt att låta både den närmaste berättelsekontexten och den efterföljande tolkningshistorien framträda.'
],sources:[['3 Mosebok – Bibel 2000', 'https://www.bible.com/sv/bible/154/LEV.18.B2000'],['Historisk kommentar: Dale B. Martin, Sex and the Single Savior', 'https://openlibrary.org/books/OL7628420M/Sex_and_the_Single_Savior']]},
{title:'2. Paulus, grekiska ord och bibeltolkningens verkliga konflikt',parts:[
'I [[Rom 1:18–32]] knyter Paulus samkönade handlingar till ett större resonemang om avgudadyrkan, utbyte och begär. Det är inte vetenskapligt hållbart att utan vidare förklara hans negativa värdering som begränsad till enbart övergrepp eller pederasti. Samtidigt beskriver eller analyserar texten inte uttryckligen dagens jämlika, offentligt förpliktande samkönade äktenskap. Det är alltså en sak att rekonstruera Paulus sannolika bedömning av antika handlingar och en annan sak att argumentera för hur den ska tillämpas i dag.',
'I [[1 Kor 6:9–10]] och [[1 Tim 1:9–10]] möter vi de omdiskuterade grekiska uttrycken malakoi och arsenokoitai. Forskare diskuterar deras semantiska omfattning och deras koppling till den grekiska översättningen av Tredje Mosebok. Vissa ser ett generellt förbud mot manligt samkönat sex; andra framhåller exploaterande eller socialt asymmetriska sammanhang. Ordet ”homosexuell” som modern identitetskategori är i sig en anakronistisk risk vid översättning.',
'[[Matt 19:3–12]] har samtidigt stor betydelse för den traditionella äktenskapsteologin. Jesus hänvisar till skapelseberättelsens man och kvinna, men gör det när han svarar på frågor om skilsmässa. En restriktiv läsning ser hans hänvisning som ett normerande äktenskapsmönster. En inkluderande läsning betonar att hans konkreta konflikt gäller äktenskapets trohet och skilsmässans maktasymmetri, inte en explicit diskussion om samkönade par. Båda positionerna behöver redovisa sitt tolkningssteg.'
],sources:[['Romarbrevet 1 – Bibel 2000','https://www.bible.com/sv/bible/154/ROM.1.B2000'],['William Loader, The New Testament on Sexuality (Eerdmans)','https://www.eerdmans.com/9780802867247/the-new-testament-on-sexuality/']]},
{title:'3. Från enskilda handlingar till modern läggningsforskning',parts:[
'Under 1800- och 1900-talen började sexualforskning, psykologi och medicin beskriva samkönad attraktion med nya kategorier. De tidiga begreppen är inte neutrala: vissa var sjukdomsförklarande och stigmatiserande medan andra argumenterade för en bestående mänsklig variation. Här skiljer vi forskningshistorien från en föreställning om att hela världen plötsligt ändrade syn 1969.',
'År 1944 avkriminaliserades sexuella handlingar mellan samtyckande vuxna av samma kön i Sverige. År 1973 beslutade American Psychiatric Association att avlägsna homosexualitet som sådan från DSM:s sjukdomsklassifikation. Sverige tog motsvarande steg i Socialstyrelsens klassifikation 1979. Dessa datum är olika händelser i olika institutioner och länder, och medicinska klassifikationer är inte kyrkliga trosbeslut.',
'Kunskapsförändringen påverkar förutsättningarna för etiska argument: att en människa upplever varaktig samkönad attraktion innebär inte i sig en frivilligt vald moralisk handling. Men vetenskapen avgör inte ensam hur kristen sexualetik ska formuleras. Därför skiljer forskningsspåret på läggning, identitet, handling, ömsesidig relation och äktenskap. Historiska, medicinska och teologiska påståenden får varsin evidensprövning.'
],sources:[['Sveriges regering – hbtqi-rättigheternas historia','https://www.regeringen.se/regeringens-politik/hbtq-personers-lika-rattigheter-och-mojligheter/historik-om-utvecklingen-av-hbtqi-personers-rattigheter-i-sverige/'],['American Psychological Association – beslutshistoria','https://www.apa.org/about/policy/discrimination.aspx']]},
{title:'4. Kyrkornas ställningstaganden förändras inte samtidigt',parts:[
'Kristendomens olika traditioner har under lång tid i huvudsak bedömt samkönade sexuella handlingar negativt. Men relationen mellan enskild läggning, sexuella handlingar, kyrkligt medlemskap, pastoral omsorg, välsignelse och vigsel har behandlats olika och har förändrats med varierande hastighet. Det finns ingen global kyrka som fattat ett gemensamt beslut om denna fråga.',
'Svenska kyrkans väg kan tidsbestämmas: kyrkomötet 2005 beslutade om en ordning för välsignelse av registrerat partnerskap, och kyrkomötet 2009 beslöt öppna vigselordningen för par av samma kön. Biskopsmötets uttalande 2026 bekräftar detta och visar att frågor om praktisk tillämpning fortfarande aktualiseras. Dessa beslut är väl dokumenterade men kan inte användas som belägg för att romersk-katolska, ortodoxa och samtliga frikyrkliga gemenskaper ändrat samma lära.',
'En stark restriktiv tolkning lägger särskild vikt vid skapelsemönster, könsskillnad, äktenskaplig komplementaritet och de explicita förbudstexterna. En stark inkluderande tolkning lägger vikt vid skillnaden mellan antika sociala villkor och moderna trofasta förbund, ny kunskap om läggning och den kristna etikens fokus på ömsesidighet, kärlek och ansvar. Att återge argumenten sakligt innebär varken att de har lika historiskt stöd i varje detalj eller att någon slutlig teologisk slutsats är vetenskapligt bevisad.'
],sources:[['Svenska kyrkans historik och beslut','https://www.svenskakyrkan.se/hbtq-personers-rattigheter'],['Kyrkomötet 2005, betänkande G 2005:2','https://km.svenskakyrkan.se/tcrot/km/2005/betankanden/G2005_02.shtml.html'],['Biskopsmötets uttalande 2026','https://www.svenskakyrkan.se/nyheter/vagar-framat--om-vigsel-och-samkonade-relationer']]},
{title:'5. Vad de kyrkohistoriska jämförelserna kan – och inte kan – bevisa',parts:[
'Kyrkans skiften kring heliocentrism, slaveri, kvinnors ämbeten eller religionsfrihet är inte identiska med sexualetik. De bygger på skilda bibliska texter och sociala förhållanden. Därför bevisar inte historien om ett annat tolkningsskifte att en inkluderande uppfattning om samkönade relationer är teologiskt riktig. Att kyrkan tidigare har omprövat sig är inte ett tillräckligt argument för varje ny omprövning.',
'Däremot visar jämförelserna att bibliska texter alltid läses med tolkningsprinciper och att kyrkor ibland ändrar sin tillämpning efter prövning av språk, kunskap, samhälle och människors erfarenheter. Ett vetenskapligt ansvarsfullt forskningsspår måste därför kunna ställa två frågor till varje fall: vilken del av traditionens tidigare bibeltolkning har faktiskt ändrats, och vilka belägg finns för att nya yttre eller inre argument spelade en roll?',
'Det bifogade dokumentets personliga slutsats är att trofasta samkönade relationer bör bejakas och erkännas. Tidens väv ska inte göra den slutsatsen till sitt förutbestämda svar. I stället ska besökaren få de bibliska källorna, den religionshistoriska miljön, teologernas skilda argument, de daterade kyrkobesluten och samtidens utveckling för att kunna pröva själv.'
],sources:[['Kyrkans historiska ställningstaganden – Svenska kyrkan','https://www.svenskakyrkan.se/hbtq-personers-rattigheter'],['Stanford Encyclopedia of Philosophy – Religion and Morality','https://plato.stanford.edu/entries/religion-morality/']]}
];
const small={
heliocentrism:{heading:'När världsbilden ändrades',text:'Kopernikus (1543) och Galilei (1633) hör till olika skeenden: en vetenskaplig publicering och ett specifikt kyrkligt rättsfall. Frågan gäller när bibelns kosmiska språk tolkats som naturbeskrivning respektive som tidsbundet och fenomenologiskt språk. Kyrkliga reaktioner var inte enhetliga.',verses:['Jos 10:12–14','Ps 93:1']},
slavery:{heading:'Bibelargument för och emot slaveri',text:'En del kristna försvarade slaveri med hänvisning till ordningstexter, medan andra fann teologiska skäl för abolitionism. Storbritanniens förbud mot slavhandeln 1807 är ett juridiskt steg och får inte förväxlas med ett fullständigt avskaffande av slaveriet.',verses:['Ef 6:5','Gal 3:28']},
women:{heading:'Ett beslut är inte samma sak som ny praxis överallt',text:'Svenska kyrkan beslutade 1958 att kvinnor fick bli präster; de första prästvigningarna följde 1960. Andra kyrkor hade tidigare kvinnliga förkunnare, och en del kyrkofamiljer viger fortfarande inte kvinnor till präster. Kontrollera särskilt Junia och de paulinska ordningstexterna.',verses:['Rom 16:7','1 Kor 14:34','1 Tim 2:12','Gal 3:28']},
baptism:{heading:'Samma bibel – olika dopmodeller',text:'Dopfrågan rör förbundet, kyrkans natur, barns ställning och personlig tro. De anabaptistiska dopen 1525 markerade en radikal reformationskonflikt. Skillnaden mellan barndop och troendedop kvarstår och är inte en enkel berättelse om att en modell ersatte en annan.',verses:['Apg 2:38','Apg 16:33']},
freedom:{heading:'Från religiöst tvång till samvetsfrihet',text:'Religionsfrihetens historia handlar både om teologiska argument och om rättslig utveckling. Sveriges religionsfrihetslag utfärdades 1951 och trädde i kraft 1952. Frikyrkornas historia visar hur samvetsfrihet kunde drivas av religiös övertygelse snarare än av avståndstagande från tron.',verses:['Rom 14:5','Apg 5:29']},
antisemitism:{heading:'När tolkningshistoria blev en moralisk kris',text:'Antijudiska kyrkotraditioner och ersättningsteologi har bidragit till fördomar och förföljelse. Nostra aetate 1965 innebar en viktig katolsk självrannsakan efter Förintelsen. Den dokumenterar ett konkret samfunds läromässiga förtydligande, inte att den antijudiska historien raderades.',verses:['Rom 11:1','Rom 11:28']},
colonialism:{heading:'Evangelium och makt måste skiljas',text:'Missionens historia omfattar både lokal kristen handlingskraft och maktmässiga relationer till kolonial expansion. Ett forskningsspår behöver jämföra konkreta platser, missionsrörelser och historiska källor för att undvika både ensidigt försvar och svepande fördömande. Daterade milstolpar kräver ytterligare primärkällor.',verses:['Matt 28:19','Apg 10:34']},
evolution:{heading:'Biologisk vetenskap och skapelseberättelser',text:'Darwins arbete 1859 förändrade biologins förklaringsramar. Kristna mottog det på olika sätt. Den exegetiska frågan är vilken genre och funktion skapelseberättelserna har, inte bara om man ska välja mellan naturvetenskap och teologi.',verses:['1 Mos 1:1','1 Mos 2:7']},
criticism:{heading:'När texternas tillkomst blev ett forskningsfält',text:'Historisk-kritisk bibelforskning skiljer berättad tid från textens tillkomst, redaktion och bevarade manuskript. Jämförelser med Mesopotamien och Egypten gör Bibeln begriplig i sin historiska värld. En källkritisk läsning måste bedöma varje påstående och varje texttradition för sig.',verses:['Luk 1:1','2 Tim 3:16']},
divorce:{heading:'Äktenskapstexter och pastoral praxis',text:'Kristna kyrkor har utvecklat olika tillämpningar av Jesusord om skilsmässa och omgifte. Man måste skilja mellan ändrad moralisk bedömning, ändrad kyrkorätt och pastoral praktik; inte ens de kyrkor som tillåter omgifte gör det på exakt samma villkor.',verses:['Mark 10:2','Matt 19:9']},
usury:{heading:'När ocker och ränta skiljs åt',text:'Bibeln innehåller kritik mot exploaterande kredit och ränta i utsatta relationer. Senare teologer har utvecklat skillnader mellan utsugning och avtalad ränta, men dessa skillnader växte fram olika i flera traditioner. Daterade beslut och primärtexter återstår i fördjupningen.',verses:['2 Mos 22:25','Luk 6:35']}
};
const sourceList=sources=>'<ul class="tvcs-sources">'+sources.map(s=>{const url=sourceSafe(s[1]);return '<li>'+(url?'<a href="'+esc(url)+'" target="_blank" rel="noopener noreferrer">'+esc(s[0])+' ↗</a>':esc(s[0]))+'</li>'}).join('')+'</ul>';
function renderReading(topic){
 if(topic==='sexuality'){
 return '<section id="tvcsDeep" class="tvcs-depth"><h3>Fördjupning: Homosexualitet och kristen tro</h3><p class="tvcs-method">Utgångspunkten är frågorna i avsnitt C3, D2 och F5–F16 i ditt dokument. Det är ett personligt teologiskt ställningstagande; Väven återger här forskningsunderlag och konkurrerande tolkningar självständigt. Bibelhänvisningarna är klickbara.</p>'+
 history.map((h,i)=>'<details '+(i===0?'open':'')+'><summary>'+esc(h.title)+'</summary><div class="tvcs-long">'+h.parts.map(p=>'<p>'+esc(p).replace(/\[\[([^\]]+)\]\]/g,(_all,r)=>bible(r))+'</p>').join('')+'<h4>Vidare källor</h4>'+sourceList(h.sources)+'</div></details>').join('')+'</section>';
 }
 if(topic==='all')return '<p class="tvcs-all-hint">Välj ett forskningsområde ovan för att läsa dess specifika frågor och se de historiska hållpunkterna. Börja gärna med <button type="button" data-tvcs-topic="sexuality" class="tvcs-textbutton">Samkönade relationer</button> för en längre genomgång.</p>';
 const v=small[topic];if(!v)return '';
 return '<section class="tvcs-depth"><h3>'+esc(v.heading)+'</h3><p>'+esc(v.text)+'</p><p><strong>Relevanta bibeltexter:</strong> '+v.verses.map(bible).join(' · ')+'</p><p class="tvcs-method">Detta spår är en första innehållsetapp. Fullständig individgranskning av bibeltexter, samfundshistoria och daterade skiften återstår.</p></section>';
}
const cols=[{id:'church',label:'Kyrka och bibeltolkning'},{id:'society',label:'Samhälle och politik'},{id:'science',label:'Vetenskap och kunskap'}];
function renderTimeline(){
 const included=data.events.filter(e=>(state.topic==='all'||e.topic===state.topic)&&(state.includeWorld||e.lane==='church')).sort((a,b)=>a.year-b.year||cols.findIndex(l=>l.id===a.lane)-cols.findIndex(l=>l.id===b.lane));
 const byYear=new Map();for(const e of included){if(!byYear.has(e.year))byYear.set(e.year,[]);byYear.get(e.year).push(e)}
 const headers='<div class="tvcs-cols" role="row"><span role="columnheader">År</span>'+cols.map(c=>'<span class="tvcs-lane-title tvcs-'+c.id+'" role="columnheader">'+esc(c.label)+'</span>').join('')+'</div>';
 const rows=[...byYear].map(([year,es])=>'<div class="tvcs-year-row"><div class="tvcs-year">'+year+'</div>'+cols.map(c=>{
 const items=es.filter(e=>e.lane===c.id);
 return '<div class="tvcs-lane-cell tvcs-'+c.id+'">'+items.map(e=>'<button type="button" data-tvcs-event="'+esc(e.id)+'" aria-expanded="'+String(state.openId===e.id)+'" class="tvcs-milestone'+(state.openId===e.id?' selected':'')+'"><span>'+esc(e.title)+'</span><small>'+esc(e.lane==='church'?'Kyrklig händelse':e.lane==='society'?'Samhällshändelse':'Kunskapshändelse')+' →</small></button>').join('')+'</div>';
 }).join('')+'</div>'+es.filter(e=>state.openId===e.id).map(e=>'<div class="tvcs-focus"><h4>'+e.year+' · '+esc(e.title)+'</h4><p>'+esc(e.detail)+'</p><p><strong>Belägg:</strong> '+esc(e.certainty)+'</p><p><a href="'+esc(sourceSafe(e.source)||'#')+'" target="_blank" rel="noopener noreferrer">Öppna källan ↗</a></p></div>').join('')).join('');
 return '<div class="tvcs-count" aria-live="polite">'+included.length+' historiska hållpunkter visas'+(state.topic==='all'?'':' för valt område')+'.</div>'+(included.length?'<div class="tvcs-timegrid" role="table" aria-label="Tre kronologiska fält">'+headers+rows+'</div>':'<div class="tvcs-empty">Inga individuellt källanknutna årtal är ännu registrerade för det här urvalet. Det är inte ett påstående att historien saknar sådana händelser.</div>');
}
function shell(){
 return '<div id="tvChurchShifts" class="tvcs-root"><div class="tvcs-intro"><span class="v888-kicker">NYTT FORSKNINGSSPÅR · HISTORISK JÄMFÖRELSE · TESTVERSION</span><h2>När kyrkan ändrade sin tolkning</h2><p>Hur förhåller sig bibeltolkning och kyrkliga beslut till samtidens kunskap och samhällsförändringar? Jämför daterade, källanknutna milstolpar i tre parallella fält. Ingen tidpunkt betyder att hela kristenheten samtidigt ändrat uppfattning.</p><p class="tvcs-method">Inspirerat av kapitel D2 i ditt underlag om tro, Bibel och samkönade relationer. Underlaget uttrycker en personlig slutsats; här prövas historiska skeenden och olika tolkningspositioner utan färdig teologisk facit.</p></div><div class="tvcs-tools"><h3>Välj forskningsområde</h3><div id="tvcsTopics" class="tvcs-topics"></div><label class="tvcs-toggle"><input id="tvcsWorld" type="checkbox" checked/> Visa omvärlden – samhälle och vetenskap</label></div><div class="tvcs-overview"><h3>Händelser på samma tidsaxel</h3><p class="tvcs-note">Klicka på en milstolpe för att läsa vad som hände och öppna dess källa. Sortering efter historiskt år, inte efter idéernas värde.</p><div id="tvcsTimeline"></div></div><div id="tvcsReading"></div><p class="tvcs-foot">Pågående forskningsgranskning. Inga datum är påhittade för att tidsankra teologiska frågor. Tidslinjens urval är inte en fullständig historia, och samband mellan samtidiga händelser är inte automatiskt orsakssamband.</p></div>';
}
function draw(){
 const root=document.getElementById('tvChurchShifts');if(!root)return;
 const topics=document.getElementById('tvcsTopics');
 topics.innerHTML='<button type="button" class="tvcs-chip'+(state.topic==='all'?' active':'')+'" data-tvcs-topic="all" aria-pressed="'+String(state.topic==='all')+'">Alla områden</button>'+data.topics.map(t=>'<button type="button" class="tvcs-chip'+(state.topic===t.id?' active':'')+'" data-tvcs-topic="'+esc(t.id)+'" aria-pressed="'+String(state.topic===t.id)+'">'+esc(t.label)+'</button>').join('');
 document.getElementById('tvcsTimeline').innerHTML=renderTimeline();
 document.getElementById('tvcsReading').innerHTML=renderReading(state.topic);
 const toggle=document.getElementById('tvcsWorld');if(toggle)toggle.checked=state.includeWorld;
}
function install(){
 const host=document.getElementById('researchView');if(!host||host.querySelector('#tvChurchShifts'))return;
 const old=host.querySelector('#v890Nav')||host.querySelector('#v888Track');
 if(old)old.insertAdjacentHTML('beforebegin',shell());else host.insertAdjacentHTML('afterbegin',shell());
 draw();
}
function init(){
 const host=document.getElementById('researchView');if(!host)return;
 install();
 host.addEventListener('click',e=>{
 const t=e.target.closest('[data-tvcs-topic]');if(t){const next=t.dataset.tvcsTopic;if(next==='all'||data.topics.some(x=>x.id===next)){state.topic=next;state.openId=null;draw()}return}
 const c=e.target.closest('[data-tvcs-event]');if(c){state.openId=state.openId===c.dataset.tvcsEvent?null:c.dataset.tvcsEvent;draw();}
 });
 host.addEventListener('change',e=>{if(e.target.id==='tvcsWorld'){state.includeWorld=Boolean(e.target.checked);state.openId=null;draw()}});
 new MutationObserver(()=>{if(!host.querySelector('#tvChurchShifts'))install()}).observe(host,{childList:true});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
window.TidensChurchShiftsV1={getState:()=>({...state}),getData:()=>data};
})();