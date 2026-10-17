/* V8.91 · Granskning 2 – källorienterade, fördjupade lästexter och verslänkar.
   Fristående redaktionellt lager: ändrar inga dateringar, C6-statusar eller huvudkategorier. */
(function(){
'use strict';
const BOOK=Object.freeze({
'Ps':'PSA','Job':'JOB','Pred':'ECC','Jes':'ISA','Dan':'DAN','Jona':'JON',
'1 Mos':'GEN','2 Mos':'EXO','3 Mos':'LEV','5 Mos':'DEU',
'1 Sam':'1SA','2 Sam':'2SA','1 Kung':'1KI','2 Kung':'2KI',
'2 Mack':'2MA','Mark':'MRK','Matt':'MAT','Luk':'LUK','Joh':'JHN',
'Rom':'ROM','1 Kor':'1CO','2 Kor':'2CO','1 Tim':'1TI','2 Tim':'2TI',
'Upp':'REV','Gal':'GAL','Heb':'HEB','Apg':'ACT','Ef':'EPH',
'Fil':'PHP','Jer':'JER','Hes':'EZK','Jak':'JAS','Jud':'JUD','1 Pet':'1PE'
});
const extra={
v888Track:[
{title:'1. Från familjegraven till Sheol: vad visar den äldre hebreiska Bibeln?',paragraphs:[
'En historisk undersökning bör börja med vad de äldsta texterna faktiskt säger, inte med den himmel–helvete-modell som många senare kristna läsare tar för given. I israelitiska gravskick och äldre bibliskt språk är döden nära förknippad med graven, släkten och att samlas till sina förfäder. Det betyder inte att alla israeliter hade exakt samma föreställning om tillvaron efter döden. Arkeologiska fynd, poesi och berättelser ger olika slags information och måste prövas var för sig.',
'I [[Ps 6:6]] frågar den bedjande vem som kan lovsjunga Gud i dödsriket. [[Job 7:9–10]] beskriver den döde som någon som inte återvänder till sitt hus, medan [[Pred 9:5–10]] betonar de dödas avskurenhet från de levandes verksamhet. Hos [[Jes 38:18]] knyts dödsriket till oförmågan att prisa Gud. Dessa formuleringar visar inte en färdig lära om evigt straff för onda människor; de speglar olika perspektiv på dödens förlust och gräns.',
'Forskaren Matthew Suriano skiljer mellan Sheol som ett föreställt dödsrike och Sheol som en bild för graven eller övergången från liv till död. Hans analys väger in gravbruk och föreställningar om förfäder. Den exakta innebörden måste avgöras i varje passage. Det är därför lika missvisande att översätta varje Sheol med det senare kristna helvetet som att påstå att ingen israelit kunde tänka sig någon fortsättning efter döden.',
'Berättelsen om kvinnan i En-Dor i [[1 Sam 28:7–20]], där Samuels gestalt åkallas, illustrerar att föreställningar om avlidna personer kunde vara mer varierade än vissa sammanfattningar av israelitisk dödstro antyder. Berättelsen visar en föreställningsvärld i texten; den bekräftar inte att händelsen faktiskt ägt rum.'
],assessment:'Belagt: Sheol har varierande betydelsefält och äldre israelitiska föreställningar är inte identiska med den senare tvådelade modellen. Osäkert: hur vanliga olika föreställningar var bland befolkningens skilda grupper.',sources:[
['Matthew Suriano, A History of Death in the Hebrew Bible (OUP, 2018)','https://academic.oup.com/book/9018'],
['Suriano, Death, Dying, and the Liminality of Sheol (kap. 7)','https://academic.oup.com/book/9018/chapter-abstract/155527592']
]},
{title:'2. Uppståndelse och dom: en mångstämmig utveckling under andra templets tid',paragraphs:[
'Under århundradena efter den babyloniska exilen finns allt tydligare belägg för att vissa judiska grupper talade om en framtida uppståndelse, gudomlig dom och skilda utgångar efter döden. Äldre profetiska bilder och senare apokalyptiska texter behöver däremot inte ha samma betydelse. [[Jes 26:19]] använder språk om döda som ska leva; forskare diskuterar hur bokstavligt och hur kollektivt formuleringen ska förstås i sin litterära miljö.',
'[[Dan 12:2]] är ett särskilt viktigt vittnesbörd eftersom texten uttryckligen skiljer mellan uppvaknande till evigt liv och uppvaknande till skam och avsky. Den apokalyptiska delen av Daniel brukar dateras till krisen under Antiochos IV på 160-talet f.Kr. Berättelsens handling utspelas däremot i en äldre babylonisk miljö. I Väven ska denna skillnad mellan berättad tid och texttillkomst alltid anges.',
'I [[2 Mack 7:9–14]] låter berättelsen om martyrerna hoppet om kroppslig uppståndelse svara på en akut rättvisefråga: kan makthavare döda människor som förblir trogna sin Gud utan att rättvisa någonsin skipas? Här blir livet efter döden en del av ett historiskt förankrat språk för hopp och motstånd. Författarens teologiska budskap ska inte utan vidare behandlas som en objektiv skildring av vad alla judar trodde.',
'I [[1 Henok 22]] möter läsaren avdelningar för de döda och väntan på framtida dom. Första Henoksboken är emellertid en samling med olika tillkomstlager. En passage kan inte användas för att datera hela verket. Länka till Vävens H025 och H057 men håll manuskriptets ålder, textens komposition och berättelsens föreställda urtid isär.',
'Judiska och iranska traditioner har betydande motivlikheter kring dom och återupprättelse. Den politiska och kulturella kontakten är väl belagd. Det är däremot omdiskuterat vilka enskilda idéer som kan förklaras av direkt påverkan från zoroastrismen, särskilt eftersom vissa iranska textvittnen är betydligt yngre än de händelser de används för att tolka. Även intern judisk utveckling och vidare främreorientaliska influenser behöver vägas in.'
],assessment:'Belagt: flera judiska efterlivsföreställningar samexisterar under andra templets tid. Omdiskuterat: exakt ordningsföljd, iransk påverkan och hur specifika bilder tolkades av olika grupper.',sources:[
['Daniel 12 och 2 Mack 7 – jämför Vävens dokumenterade källgenomgång','https://github.com/Bjorne-web/tidens-vav/blob/main/docs/c6-textjamforelse-v841.md'],
['Stanford Encyclopedia of Philosophy, Heaven and Hell in Christian Thought','https://plato.stanford.edu/entries/heaven-hell/']
]},
{title:'3. Jesus och Nya testamentet: flera ord, bilder och framtidshopp',paragraphs:[
'Det grekiska Nya testamentet använder inte ett enda entydigt ord som alltid motsvarar det svenska helvetet. Gehenna, Hades, paradis, Guds rike, den kommande tidsåldern, uppståndelse och eldsjön tillhör delvis olika bilder och genrer. Därför bör översättningen aldrig ensam styra en religionshistorisk slutsats.',
'I [[Mark 9:43–48]] förekommer Gehenna, ett ord med koppling till Hinnoms dal i Jerusalems omgivningar och med senare domsassociationer. Det betyder inte att alla Jesu utsagor kan reduceras till en faktisk geografisk plats. [[Luk 16:19–31]] berättar om den rike mannen och Lasaros, med Hades och en oöverstiglig klyfta. Berättelsens genre och retoriska mål är centrala: en liknelse eller varnande skildring behöver inte vara en bokstavlig karta över dödsrikets arkitektur.',
'I [[Luk 23:43]] används ordet paradis. [[1 Kor 15:12–28]] utvecklar Paulus tankar om uppståndelse och dödens nederlag. [[Upp 20:11–15]] berättar om dom och eldsjö, och [[Upp 21:1–5]] om ny himmel och ny jord. Uppenbarelseboken är apokalyptisk visionslitteratur. Symbolerna kan inte automatiskt fogas samman med Lukas berättelser till ett enda detaljerat geografiskt schema.',
'Även [[Matt 25:31–46]] behöver läsas i sin helhet: domen knyts där till handlingar gentemot hungriga, främlingar, sjuka och fångar. Vers 46 talar om evigt straff och evigt liv, men frågan om straffets art och den grekiska terminologins betydelse ingår i en lång exegetisk debatt. Den texten kan varken utelämnas av universalistiska läsare eller ensam avgöra varje detalj i en senare dogmatisk helveteslära.'
],assessment:'Belagt: NT rymmer flera ord och genrer för dom och framtida liv. Omdiskuterat: hur texterna bäst förenas teologiskt samt innebörden av domens slutliga utfall.',sources:[
['Stanford Encyclopedia of Philosophy, Heaven and Hell in Christian Thought','https://plato.stanford.edu/entries/heaven-hell/']
]},
{title:'4. Kyrkans senare tolkningar – varför dagens bilder inte är självklara',paragraphs:[
'När kristendomen växte i den grekisk-romerska världen uppstod möten mellan judiskt uppståndelsehopp och filosofiska resonemang om själens odödlighet. Dessa två motiv bör hållas isär även där senare kristen tradition kombinerat dem. Olika kristna författare betonade olika slags straff, rening, uppståndelse och slutlig återupprättelse.',
'Augustinus fick stort inflytande på den västkyrkliga läroutvecklingen, bland annat genom sin behandling av nåd, synd, dom och evigt straff. Origenes och Gregorios av Nyssa förknippas ofta med starka återupprättelsemotiv, men deras egna texter och senare receptionshistoria måste bedömas noggrant. Det går inte att beskriva fornkyrkan som fullständigt enig.',
'Medeltida föreställningar om skärseld, himmelska sfärer och underjordiska straffmiljöer utvecklades i flera teologiska och kulturella sammanhang. Dantes Den gudomliga komedin bidrog till bildvärlden men är en litterär gestaltning från medeltiden, inte en bibelskildring. I modern kristen diskussion skiljs ofta tre modeller: evigt medvetet straff, slutlig förintelse och allmän försoning. Modellerna bör beskrivas med sina starkaste textargument och tydliga invändningar.',
'En historisk slutsats är alltså inte att det saknas nytestamentliga domstexter. Slutsatsen är att en viss nutida, sammanhängande bild av himmel och helvete har formats genom tolkning, urval och utveckling över lång tid.'
],assessment:'Belagt: kristen efterlivslära har genomgått omfattande tolkningshistorisk utveckling. Ej historiskt bevisbart: vilken av de teologiska slutmodellerna som motsvarar verkligheten.',sources:[
['Stanford Encyclopedia of Philosophy, Heaven and Hell in Christian Thought (reviderad 2025)','https://plato.stanford.edu/entries/heaven-hell/'],
['Stanford Encyclopedia of Philosophy, Augustine of Hippo','https://plato.stanford.edu/entries/augustine/']
]}
],
'v889-good':[
{title:'1. Kan Guds godhet användas som premiss, eller måste den undersökas?',paragraphs:[
'Frågan ”Är Gud god?” är annorlunda än frågan ”Hur har människor beskrivit Guds godhet?”. Historisk bibelforskning kan kartlägga texternas föreställningar om rättvisa, nåd, våld och mänskligt lidande. Filosofin kan granska om olika påståenden om Gud är logiskt och moraliskt förenliga. Ingendera metoden kan ensam fastställa att en gudomlig varelse existerar eller objektivt är god.',
'Om varje handling blir god enbart därför att Gud befaller den uppstår frågan om godhet då betyder någonting mer än lydnad. Om Gud i stället vill det goda därför att det redan är gott kan moralen verka oberoende av Gud. Detta är en variant av Euthyfrons dilemma från antikens filosofi. Teistiska filosofer har föreslagit modifierade lösningar, exempelvis att godheten är förankrad i Guds natur snarare än i godtyckliga order.',
'Denna avgränsning är viktig för Vävens neutralitet. Vi kan undersöka en berättelses moral, även om dess författare förutsätter att Gud handlar rätt. Berättarens religiösa övertygelse är då ett föremål för analys, inte automatiskt studiens egen premiss.'
],assessment:'Forskningsfrågan kan undersökas historiskt och filosofiskt. Någon vetenskapligt fastställd slutdom om Guds moraliska väsen ges inte.',sources:[['Stanford Encyclopedia of Philosophy, Religion and Morality in Western Philosophy','https://plato.stanford.edu/entries/religion-morality/']]},
{title:'2. Forntida religion och Jobs bok – protest mot enkla svar',paragraphs:[
'Berättelser och vishetstexter från Mesopotamien brottas med oskyldigt lidande, gudarnas makt och den enskildes möjlighet att förstå sin olycka. Likheter med Jobs bok gör jämförelser relevanta, men de visar inte automatiskt ett dokumenterat textlån. Israelitiska författare arbetade inom en bredare gammalorientalisk tankevärld samtidigt som deras verk utvecklade egna argument.',
'I [[Job 1:1–22]] förlorar huvudpersonen familj och trygghet trots att berättelsen först beskriver honom som rättfärdig. Vännernas svar utgår i stor utsträckning från tanken att lidande måste ha en rättvis moralisk orsak. Jobs protester i [[Job 3]] och [[Job 9]] avvisar denna enkla logik. När Gud talar i [[Job 38–42]] ges inte ett entydigt kausalt svar på varför varje tragedi inträffade. Läsaren behöver skilja på prologens berättarperspektiv, vänners tal, Jobs tal och Guds tal.',
'Liknande spänningar finns i [[Ps 73]] där de orättfärdiga kan framstå som framgångsrika och den rättfärdige som plågad, samt i [[Pred 9:1–3]] där alla tycks dela samma öde. Dessa texter utmanar påståendet att Bibeln ger ett enda okomplicerat orsakssamband mellan synd och olycka.',
'En viktig forskningspoäng är att protesten mot gudomlig orättvisa inte bara är ett modernt eller religionskritiskt tillägg: flera bibliska texter bevarar själva sådana frågor. Det innebär inte att texterna entydigt förnekar Guds godhet. De uttrycker snarare en intern diskussion om vad tro och rättvisa får betyda i erfarenheten av lidande.'
],assessment:'Belagt: bibliska texter rymmer olika svar på lidandets problem. Omdiskuterat: Jobbokens redaktionshistoria och hur de enskilda rösterna vägs mot varandra.',sources:[['Stanford Encyclopedia of Philosophy, The Problem of Evil','https://plato.stanford.edu/entries/evil/']]},
{title:'3. Gudomligt våld, barmhärtighet och moraliska spänningar',paragraphs:[
'Gud framställs i olika bibliska böcker som skapare, befriare, domare, beskyddare och ibland som upphov till eller befallare av förödelse. [[5 Mos 20:16–18]] innehåller krigslagar med föreställningar om förintelse av fiendefolk. [[2 Mos 34:6–7]] kombinerar däremot långmod och förlåtelse med utsagor om att skuld inte lämnas ostraffad. Skillnaderna bör inte döljas genom att välja endast tilltalande texter.',
'I [[Hes 18:20–23]] argumenterar profeten för personligt ansvar och för att Gud inte gläder sig åt den skyldiges död. I [[Jona 4:1–11]] blir Guds förbarmande med en främmande stad föremål för en konflikt med profetens egen rättvisekänsla. I [[Matt 5:43–48]] uppmanas Jesu efterföljare att älska fienderna och anknyta detta till sin himmelske Fader.',
'En historisk-kritisk analys frågar vilka samhälleliga situationer och litterära traditioner som format texterna, och vilka begrepp om gudomlig rättvisa som de uttrycker. En konfessionell analys kan därtill söka en större helhet i kanon eller i Jesu undervisning. Dessa två arbetssätt behöver redovisas tydligt i stället för att förväxlas.'
],assessment:'Belagt: källmaterialet innehåller genuina spänningar. Metodisk försiktighet: genre, tillkomsttid och senare teologisk kanonläsning måste hållas isär.',sources:[['Stanford Encyclopedia of Philosophy, The Problem of Evil','https://plato.stanford.edu/entries/evil/']]},
{title:'4. Teodicé: vilka svar har filosofer föreslagit, och vad kostar de?',paragraphs:[
'Den klassiska konflikten kan uttryckas så: om Gud är fullkomligt god och allsmäktig, varför finns ondska och oskyldigt lidande? Det är viktigt att skilja det logiska problemet (är påståendena över huvud taget förenliga?) från det evidentiella problemet (gör mängden och arten av lidande Guds existens mindre sannolik?). Ett försvar som påvisar logisk möjlighet är inte samma sak som en förklaring av varför ett konkret barn drabbas av lidande.',
'Augustinus förknippas med synen att det onda är en brist eller förvrängning av det goda snarare än en självständig substans. Friviljeförsvar försöker förklara moraliskt ont genom skapade varelsers handlingsfrihet, men måste dessutom svara på frågor om naturkatastrofer, sjukdom och andra lidanden som inte verkar ha valts av människor. Själutvecklingsmodeller hävdar att svårigheter kan göra moraliskt växande möjligt; invändningen är att vissa lidanden snarare bryter ned än bygger upp.',
'Om allvarligt lidande i praktiken rättfärdigas med ett ännu okänt gott resultat krävs särskild epistemisk försiktighet. En sådan förklaring kan vara filosofiskt tänkbar utan att vi har belägg för att just det lidandet behövdes. Väven ska därför redovisa skälen för och emot varje modell i stället för att servera ett färdigt försvarstal för Gud.'
],assessment:'Ingen standardteodicé är enhälligt accepterad. Historiska modeller och nutida argument redovisas var för sig.',sources:[['Stanford Encyclopedia of Philosophy, The Problem of Evil','https://plato.stanford.edu/entries/evil/'],['Stanford Encyclopedia of Philosophy, Theodicies','https://plato.stanford.edu/entries/theodicies/']]}
],
'v889-will':[
{title:'1. Vad är det egentligen vi menar med fri vilja?',paragraphs:[
'Uttrycket fri vilja används om flera olika frågor. En handlar om vi kan välja mellan verkligt öppna handlingsalternativ. En annan gäller om våra beslut kan vara fria även när de har orsaker i arv, erfarenheter och hjärnans processer. En tredje gäller vilket slags kontroll som krävs för att någon rättvist ska få beröm eller skuld. Frågorna går inte att besvara genom att bara definiera ordet ”val”.',
'Libertariansk frihet innebär vanligen att fri vilja i relevant mening inte är förenlig med fullständig determinism. Kompatibilism hävdar däremot att en handling kan vara fri när den exempelvis uttrycker personens egna motiv och inte sker genom relevant tvång, även om motivens uppkomst har orsaker. Hård determinism och andra skeptiska positioner ifrågasätter om människor har den kontroll som en stark moralisk ansvarslära förutsätter.',
'När Väven redovisar äldre teologiska texter ska vi inte använda en modern filosofisk definition som om den vore författarens egen. Frågan om människan är lydig, syndig eller ansvarig är inte automatiskt samma fråga som den moderna debatten om deterministisk kausalitet.'
],assessment:'Belagt: flera väletablerade och konkurrerande begrepp om fri vilja existerar. Filosofisk oenighet kvarstår om vilket begrepp som bäst förklarar ansvar.',sources:[['Stanford Encyclopedia of Philosophy, Free Will','https://plato.stanford.edu/entries/freewill/']]},
{title:'2. Antik filosofi och bibeltexternas ansvarsbegrepp',paragraphs:[
'Aristoteles skilde mellan frivilliga och ofrivilliga handlingar och undersökte hur kunskap, tvång, karaktär och vana påverkar ansvar. Stoikerna diskuterade hur mänskligt omdöme kan vara ansvarigt även inom en kausalt ordnad världsbild. Dessa debatter är äldre än Augustinus och kan inte reduceras till kristendomens senare lära om fri vilja.',
'[[5 Mos 30:15–20]] ställer liv och död inför Israel som val knutna till förbundets lydnad. [[Hes 18:21–32]] betonar möjlighet till omvändelse och individuellt ansvar. Texterna utgör kraftfulla moraliska uppmaningar, men visar inte ensamma att deras författare förutsatte en viss modern metafysisk teori om orsak och frihet.',
'I [[Rom 7:14–25]] skildrar Paulus konflikten mellan vilja och handling, medan [[Rom 9:14–24]] diskuterar Guds val och makt i en argumentation om Israel och gudomlig barmhärtighet. Dessa avsnitt har blivit centrala i senare debatter om nåd och fri vilja, men måste först läsas i brevets eget sammanhang. [[Gal 5:13–23]] kopplar frihet till livsföring och Andens frukt snarare än till ett explicit svar på filosofisk determinism.'
],assessment:'Belagt: antiken och Bibeln rymmer skilda modeller för val och ansvar. Omstritt: vilken senare frihetslära som bäst överensstämmer med Paulus.',sources:[['Stanford Encyclopedia of Philosophy, Free Will','https://plato.stanford.edu/entries/freewill/']]},
{title:'3. Augustinus, nåden och reformationens stora konflikt',paragraphs:[
'Augustinus utvecklade under sin långa författarbana resonemang om frivilliga handlingar, viljans böjelse, synd och nådens verkan. Det är missvisande att behandla alla hans skrifter som om de uttryckte en statisk, oförändrad formulering. Konflikterna med pelagianska positioner skärpte frågan om människan av egen förmåga kan börja vända sig till Gud.',
'På 1500-talet diskuterade Erasmus och Luther människans vilja i relation till frälsning och Guds nåd. Deras motsättning visar att uttrycket ”fri vilja” kan ha olika räckvidd: en teolog kan erkänna många vardagliga val men förneka att människan på egen hand kan åstadkomma sin frälsning. Senare kalvinistiska, lutherska, arminianska och andra traditioner har därför inte en enda gemensam frihetsmodell.',
'Frågan blir särskilt svår när gudomlig utkorelse förenas med evigt straff. Om en människa inte förmår välja annorlunda i frälsningsfrågan: på vilken moralisk grund kan ett negativt utfall läggas henne till last? Svaret beror på hur nåd, frihet, förmåga och dom definieras, och bör presenteras med argument från de berörda traditionerna.'
],assessment:'Belagt: omfattande idéhistoriska skiljelinjer. Här redovisas en översikt, inte en uttömmande historia över kyrkans alla skolor.',sources:[['Stanford Encyclopedia of Philosophy, Augustine of Hippo','https://plato.stanford.edu/entries/augustine/'],['Stanford Encyclopedia of Philosophy, Free Will','https://plato.stanford.edu/entries/freewill/']]},
{title:'4. Guds förkunskap och neurovetenskap – olika slags problem',paragraphs:[
'Det teologiska fatalismproblemet kan sammanfattas så: om Gud ofelbart visste i går vad jag ska välja i morgon, verkar det omöjligt för mig att välja något annat. Ett svar skiljer kunskap från orsakande. Ett annat hävdar att Gud inte vet i en tidsordning som motsvarar vår. Ytterligare positioner ifrågasätter om framtida fria handlingar redan är bestämda sanningar. Varje lösning medför egna problem för synen på tid och gudomlig kunskap.',
'Neurologiska studier av beslut föreslår olika samband mellan hjärnaktivitet, medveten avsikt och handling. Experiment som mäter signaler inför enkla rörelser är inte samma sak som en studie av långsiktiga etiska beslut, och de visar inte utan ytterligare argument att all fri vilja saknas. På samma sätt bevisar brister i experimentens förutsägelser inte metafysisk frihet.',
'För Vävens del är slutsatsen metodisk: redovisa vad hjärnforskningen faktiskt mäter, vilka filosofiska antaganden tolkningen behöver och hur teologins påståenden om Guds vetande skiljer sig från empiriskt testbara hypoteser.'
],assessment:'Öppet forskningsläge: förkunskapens logiska problem har flera seriösa lösningsförsök; neurovetenskap avgör inte den metafysiska frågan ensam.',sources:[['Stanford Encyclopedia of Philosophy, Foreknowledge and Free Will (rev. 2026)','https://plato.stanford.edu/entries/free-will-foreknowledge/'],['Stanford Encyclopedia of Philosophy, Free Will','https://plato.stanford.edu/entries/freewill/']]}
],
'v890Bridge':[
{title:'1. Kan en god Gud döma till evigt straff?',paragraphs:[
'Utgångspunkten är en verklig konflikt mellan olika kristna påståenden: Gud är fullkomligt god, Gud är rättvis, människan är ansvarig och vissa texter skildrar ett slutligt straff. [[Matt 25:46]] talar om evigt straff och evigt liv. [[Upp 20:10–15]] använder bilden av eldsjön och den andra döden. Den exegetiska frågan är vad respektive text avser i sin litterära miljö. Den filosofiska frågan är om och hur ett oändligt straff skulle kunna vara proportionerligt.',
'Förespråkare för evigt medvetet straff kan betona Guds helighet, allvaret i en varaktig förkastelse av det goda och vissa domstexters språk. Förespråkare för villkorlig odödlighet eller förintelse hänvisar bland annat till död och förgängelse, exempelvis [[Rom 6:23]]. Universalistiska tolkningar pekar exempelvis på [[1 Kor 15:22–28]] och [[Rom 11:32]] och förstår Guds dom som ett led i slutlig försoning.',
'Dessa alternativ är inte lika starka i alla kyrkotraditioner och deras försvarare använder olika bibeltexter. Väven ska varken låtsas att frågan är avgjord eller skapa en falsk likställighet mellan historiska textbelägg och filosofiska värderingar.'
],assessment:'Tre skilda modeller är etablerade i kristen teologisk diskussion. Avgörandet mellan dem är exegetiskt, teologiskt och filosofiskt omstritt.',sources:[['Stanford Encyclopedia of Philosophy, Heaven and Hell in Christian Thought','https://plato.stanford.edu/entries/heaven-hell/']]},
{title:'2. Om Gud känner ett framtida val – vem ansvarar då?',paragraphs:[
'I [[Rom 9:19]] formulerar Paulus själv en invändning som liknar den senare frågan: varför förebrår Gud människan om ingen kan stå emot hans vilja? Brevets kontext handlar om Israel, löften och Guds barmhärtighet, och avsnittet är inte en fullständig modern framställning om determinism. Men det är relevant för den senare problemhistorien.',
'Filosofiskt måste vi skilja mellan att Gud *vet* vad som kommer att ske och att Gud *orsakar* det som sker. Att en betraktare vet vad någon gör är inte detsamma som att styra personens hand. Men när vetandet tänks som ofelbart och redan fastlagt uppstår frågan om den framtida handlingen över huvud taget kunde bli annorlunda. Detta kallas teologisk fatalism och har behandlats genom flera konkurrerande argument.',
'En djupare prövning kräver därför explicita definitioner: kräver ansvar att det fanns ett annat möjligt handlingsförlopp, eller räcker det att handlingen kom ur individens egna skäl och önskningar? Utan dessa definitioner pratar argumenten lätt förbi varandra.'
],assessment:'Det är belagt att frågan är logiskt komplicerad; ingen specifik lösning kan presenteras som oomstridd.',sources:[['Stanford Encyclopedia of Philosophy, Foreknowledge and Free Will','https://plato.stanford.edu/entries/free-will-foreknowledge/']]},
{title:'3. Kan Gud vilja rädda alla och samtidigt respektera deras frihet?',paragraphs:[
'[[1 Tim 2:3–4]] framställer Gud som någon som vill att alla människor ska räddas. [[Rom 11:32]] beskriver Guds barmhärtighet med ett universellt uttryck, och [[1 Kor 15:28]] talar om att Gud till sist ska vara allt, överallt. Dessa texter står i olika argumentationssammanhang och kan därför inte läsas som tre identiska påståenden.',
'En arminianskt präglad lösning säger att Guds kärlek riktas till alla men att människans verkliga frihet gör ett definitivt nej möjligt. En augustinskt orienterad modell betonar den verksamma nåden men kan begränsa vilka den till sist frälser. Universalistiska modeller argumenterar för att Guds vilja till försoning kan uppnå sitt mål utan tvång, exempelvis genom klarare insikt och förändrade motiv.',
'Det filosofiska problemet är vad ett evigt rationellt nej egentligen innebär. Är det en fri handling om personen saknar tillgång till avgörande kunskap? Kan något förbli ett meningsfullt val om konsekvenserna är oändliga och omöjliga att ompröva? Detta är argument för fortsatt prövning, inte ett bevis för universalism eller dess motsats.'
],assessment:'Oenighet kvarstår om både bibeltexternas tolkning och villkoren för frihet.',sources:[['Stanford Encyclopedia of Philosophy, Heaven and Hell in Christian Thought','https://plato.stanford.edu/entries/heaven-hell/']]},
{title:'4. Bestämmer Gud det goda – och kan samma norm pröva Guds handlingar?',paragraphs:[
'Om en handling kallas god enbart därför att Gud gör den eller kräver den riskerar bedömningen att bli cirkulär: Gud är god eftersom Gud gör det Gud själv betecknar som gott. Euthyfrons dilemma synliggör denna problematik, men senare teistiska filosofer har utvecklat fler alternativ än enbart de två enklaste ytterligheterna.',
'Den bibliska traditionen innehåller själv moraliska protester, exempelvis [[1 Mos 18:23–25]] där Abraham frågar om hela jordens domare inte ska handla rätt. I [[Job 9]] ställer Job frågor om makt och rättvisa. Detta gör det möjligt att skilja vördnad för Gud från antagandet att varje uppgiven gudomlig handling automatiskt är begripligt rättfärdig.',
'Den gemensamma undersökningen ska därför kunna hålla flera frågor öppna samtidigt: vad påstår texten att Gud vill, vilken moralisk norm förutsätts, vem formulerade traditionen och går den att försvara filosofiskt? Syftet är att göra argumenten synliga, inte att ge Väven en bekännelsemässig slutsats.'
],assessment:'Ett filosofiskt öppet problem med betydande religionshistorisk relevans; inte en empiriskt avgjord fråga.',sources:[['Stanford Encyclopedia of Philosophy, Religion and Morality in Western Philosophy','https://plato.stanford.edu/entries/religion-morality/']]}
]};
const enc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function bibleLink(label){
 if(label.trim()==='1 Henok 22')return '<a class="v891-verse" href="https://en.wikisource.org/wiki/The_Book_of_Enoch_(Charles)/Chapter_22" target="_blank" rel="noopener noreferrer" title="Läs äldre engelsk översättning av Första Henoksboken 22">'+enc(label)+' <span aria-hidden="true">↗</span></a>';
 const m=/^(?:(\d)\s+)?([A-Za-zÅÄÖåäö]+)\s+(\d+)(?::(\d+))?(?:[–-]\d+)?$/u.exec(label.trim());
 if(!m)return enc(label);
 const book=(m[1]?m[1]+' ':'')+m[2],code=BOOK[book];if(!code)return enc(label);
 const chapter=m[3],verse=m[4];
 // YouVersion 154 B2000 supports direct single-verse links; chapters are used for chapter-spanning citations.
 const url=book==='2 Mack'
 ? 'https://www.bible.com/sv/bible/417/'+code+'.'+chapter+'.B2000D'
 : 'https://www.bible.com/sv/bible/154/'+code+'.'+chapter+(verse?'.'+verse:'')+'.B2000';
 return '<a class="v891-verse" href="'+enc(url)+'" target="_blank" rel="noopener noreferrer" title="Öppna '+enc(label)+' i Bibel 2000">'+enc(label)+' <span aria-hidden="true">↗</span></a>';
}
function para(s){return '<p>'+enc(s).replace(/\[\[([^\]]+)\]\]/g,(_,ref)=>bibleLink(ref))+'</p>';}
function source(s){return '<li><a href="'+enc(s[1])+'" target="_blank" rel="noopener noreferrer">'+enc(s[0])+' ↗</a></li>';}
function render(items){return items.map((x,i)=>'<details class="v891-section" '+(i===0?'open':'')+'><summary>'+enc(x.title)+'</summary><div class="v891-reading">'+x.paragraphs.map(para).join('')+'<p class="v891-assessment"><strong>Forskningsbedömning:</strong> '+enc(x.assessment)+'</p><div class="v891-sourcebox"><strong>Vetenskapligt underlag</strong><ul>'+x.sources.map(source).join('')+'</ul></div></div></details>').join('')}
function enrich(){
 Object.entries(extra).forEach(([id,items])=>{
 const root=document.getElementById(id);if(!root||root.querySelector('.v891-section'))return;
 const olds=Array.from(root.children).filter(el=>el.tagName==='DETAILS');
 if(!olds.length)return;
 const slot=document.createElement('div');slot.className='v891-expanded';
 slot.innerHTML='<p class="v891-intro">Fördjupad, källorienterad genomgång. Klicka på bibelhänvisningarna för att läsa den angivna versen i Bibel 2000. Avsnittens forskningsbedömningar skiljer belägg från teologiska slutsatser.</p>'+render(items);
 olds[0].before(slot);
 olds.forEach(el=>el.remove());
 });
}
// Some brief surviving notes contain unlinked bible citations. Only replace text nodes,
// never existing anchors, headings, script content or the expanded sections (already linked).
const bareRefs=/(?:\b(?:[1-5]\s+)?(?:Mos|Mack|Sam|Kor|Tim|Pet|Kung)\s+\d+(?::\d+(?:[–-]\d+)?)?|\b(?:Ps|Job|Pred|Jes|Dan|Mark|Luk|Matt|Rom|Upp|Joh|Gal|Heb|Apg|Hes|Jer|Ef|Fil|Jak|Jud|Jona)\s+\d+(?::\d+(?:[–-]\d+)?)?)/gu;
function linkifyRest(root){
 if(typeof document.createTreeWalker!=='function'||typeof NodeFilter==='undefined')return;
 const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);const nodes=[];
 while(walker.nextNode()){const node=walker.currentNode;if(!node.parentElement||node.parentElement.closest('a,script,style,.v891-expanded'))continue;
 if(bareRefs.test(node.nodeValue))nodes.push(node);bareRefs.lastIndex=0;}
 nodes.forEach(node=>{const text=node.nodeValue;let p=0;const frag=document.createDocumentFragment();for(const match of text.matchAll(bareRefs)){
 if(match.index>p)frag.append(document.createTextNode(text.slice(p,match.index)));
 const wrap=document.createElement('span');wrap.innerHTML=bibleLink(match[0]);frag.append(wrap);p=match.index+match[0].length;}
 if(p<text.length)frag.append(document.createTextNode(text.slice(p)));node.replaceWith(frag);});
}
function apply(){
 enrich();
 for(const id of Object.keys(extra)){const root=document.getElementById(id);if(root)linkifyRest(root);}
}
function init(){
 const host=document.getElementById('researchView');if(!host)return;
 apply();
 // Existing research view regenerates when switching tabs. Restore expanded text afterwards.
 const observer=new MutationObserver(()=>{const missing=Object.keys(extra).some(id=>{const root=document.getElementById(id);return root&&!root.querySelector('.v891-section')});if(missing)apply();});
 observer.observe(host,{childList:true,subtree:false});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
window.TidensReview2BibleLink=bibleLink;
})();