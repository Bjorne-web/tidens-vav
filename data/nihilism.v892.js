/* Granskning 5 · Nihilism · V8.92 Preview. Publikationsår skiljs från idéernas ursprung. Ingen C6-slutgranskning. */
(function(){
'use strict';
if(typeof events==='undefined'||typeof research==='undefined')return;
const rows=[
  {
    "id": "H070",
    "category": "Religion & texter",
    "title": "1799 – Jacobi introducerar nihilismen i idealismdebatten",
    "start": 1799,
    "end": 1799,
    "dating": "Utgivningsår för Jacobis öppna brev till Fichte; inte startåret för alla nihilistiska idéer",
    "evidence": "Hög",
    "description": "I sitt öppna brev 1799 använder Friedrich Heinrich Jacobi nihilism som filosofisk anklagelse mot Fichtes idealism. Begreppets innebörd skiljer sig från senare rysk och existentialistisk nihilism.",
    "bible": "Idéhistorisk jämförelse med Job och Predikaren, inte bibliskt beroende",
    "source": "https://plato.stanford.edu/entries/friedrich-jacobi/",
    "reviewed": false
  },
  {
    "id": "H071",
    "category": "Religion & texter",
    "title": "1849 – Kierkegaard och förtvivlans problem",
    "start": 1849,
    "end": 1849,
    "dating": "Utgivningsår för Sygdommen til Døden",
    "evidence": "Hög",
    "description": "Søren Kierkegaard analyserar jaget, förtvivlan och relationen till Gud i Sjukdomen till döds (1849). Ett kristet-existentiellt svar på meningskrisen, inte ett nihilistiskt manifest.",
    "bible": "Job; Psaltaren – motivjämförelse, inte direkt litterärt beroende",
    "source": "https://plato.stanford.edu/entries/kierkegaard/",
    "reviewed": false
  },
  {
    "id": "H072",
    "category": "Religion & texter",
    "title": "1862 – Turgenjevs Fäder och söner populariserar ”nihilisten”",
    "start": 1862,
    "end": 1862,
    "dating": "Romanens första publiceringsår",
    "evidence": "Hög",
    "description": "Ivan Turgenjevs roman Fäder och söner skildrar Bazarov som nihilist. I 1860-talets Ryssland gäller termen opposition mot auktoriteter och sociala traditioner, inte en enda filosofi om livets mening.",
    "bible": "Ingen direkt bibelhistorisk koppling; modern kristendoms- och auktoritetskritik",
    "source": "https://www.encyclopedia.com/arts/educational-magazines/fathers-and-sons",
    "reviewed": false
  },
  {
    "id": "H073",
    "category": "Religion & texter",
    "title": "1882 – Nietzsche: ”Gud är död” i Den glada vetenskapen",
    "start": 1882,
    "end": 1882,
    "dating": "Första upplagans publiceringsår; tänkandets utveckling fortsätter i senare verk",
    "evidence": "Hög",
    "description": "Friedrich Nietzsche publicerar Den glada vetenskapen 1882. Formuleringen ”Gud är död” behandlar förlusten av kristendomens självklarhet som kulturell och moralisk grund, inte en bokstavlig guds död.",
    "bible": "Kristendomens moraltraditioner – 1800-talets receptionshistoria",
    "source": "https://plato.stanford.edu/entries/nietzsche/",
    "reviewed": false
  },
  {
    "id": "H074",
    "category": "Religion & texter",
    "title": "1887 – Nietzsche undersöker moralens ursprung",
    "start": 1887,
    "end": 1887,
    "dating": "Publiceringsår för Till moralens genealogi och utökad Den glada vetenskapen",
    "evidence": "Hög",
    "description": "Till moralens genealogi (1887) granskar historiska och psykologiska förklaringar till europeiska moralvärden. Nietzsche vill analysera och omvärdera värden; det är inte samma sak som att säga att allt saknar värde.",
    "bible": "Kristna moralbegrepp och asketiska ideal som senare receptionshistoria",
    "source": "https://plato.stanford.edu/entries/nietzsche/",
    "reviewed": false
  },
  {
    "id": "H075",
    "category": "Religion & texter",
    "title": "1942 – Camus och den absurda tillvaron",
    "start": 1942,
    "end": 1942,
    "dating": "Publiceringsår för essän Myten om Sisyfos",
    "evidence": "Hög",
    "description": "Albert Camus publicerar Myten om Sisyfos (1942). Han beskriver kollisionen mellan människans behov av mening och världens tystnad och söker ett sätt att leva utan färdiga metafysiska svar.",
    "bible": "Job, Predikaren och kristet hopp – tematiska jämförelser, inte textberoende",
    "source": "https://plato.stanford.edu/entries/camus/",
    "reviewed": false
  }
];
const articles={
  "H070": {
    "overview": "Jacobis öppna brev till Johann Gottlieb Fichte 1799 hör till den så kallade ateismstriden i den tyskspråkiga filosofin. Han använder ordet nihilism för att kritisera en idealism som, enligt honom, låter filosofiskt systemtänkande upplösa verklighetens konkreta individualitet och mening. Detta är en historiskt specifik anklagelse, inte en allmän definition av alla senare nihilistiska ståndpunkter. Den tyska idealismens relation till tro, vetande, förnuft och det personliga jaget är central för att förstå varför ordet uppkommer just här.",
    "parallels": "Job och Predikaren undersöker lidande, förgänglighet och mänsklig kunskaps begränsning långt tidigare; varken de hebreiska verken eller Jacobi ska därför beskrivas som delar av en direkt sammanhängande nihilistisk rörelse. I 1800-talets Europa omtolkades förhållandet mellan religion och förnuft i en ny politisk och filosofisk miljö.",
    "caution": "Belagt: brevet 1799 och den dokumenterade användningen av termen. Bedömningsfråga: hur Jacobis invändningar förhåller sig till senare existentiell respektive rysk politisk nihilism. Filosofisk kritik av ett system bevisar inte att systemet är falskt.",
    "sources": [
      [
        "Stanford Encyclopedia of Philosophy – Friedrich Heinrich Jacobi",
        "https://plato.stanford.edu/entries/friedrich-jacobi/"
      ],
      [
        "Benjamin Crowe (2021), Jacobi on Revolution and Practical Nihilism, Cambridge",
        "https://doi.org/10.1017/9781108647441.010"
      ]
    ],
    "related": [
      {
        "id": "H071",
        "relation": "senare kristen existentiell reaktion"
      },
      {
        "id": "H073",
        "relation": "annan definition av modern nihilism"
      }
    ]
  },
  "H071": {
    "overview": "Kierkegaard publicerar Sygdommen til Døden 1849 under pseudonymen Anti-Climacus. Förtvivlan skildras som ett problem i människans relation till sig själv och till den makt som, i bokens kristna tolkningsram, har skapat jaget. Kierkegaard arbetar med inre erfarenhet, ansvar, självförståelse och kristen tro snarare än med empiriska bevis för Gud. Därför är verket ett betydelsefullt existensfilosofiskt jämförelsefall till nihilismens meningskris, trots att Kierkegaard inte själv företräder en nihilistisk slutsats.",
    "parallels": "Kierkegaards frågor kan jämföras med Jobs protest inför lidandet och med Predikarens erfarenhet av tillvarons flyktighet. Här gäller likheter mellan existentiella frågor, inte en påstådd obruten filosofisk tradition från biblisk tid till 1800-talet.",
    "caution": "Publiceringsåret är säkert; tolkningen av Kierkegaards pseudonymitet och hans argument är omdiskuterad. Texten utgår från ett kristet perspektiv och ska inte behandlas som ett neutralt filosofiskt belägg för att Gud existerar.",
    "sources": [
      [
        "Stanford Encyclopedia of Philosophy – Søren Kierkegaard",
        "https://plato.stanford.edu/entries/kierkegaard/"
      ],
      [
        "Stanford Encyclopedia of Philosophy – Existentialism",
        "https://plato.stanford.edu/entries/existentialism/"
      ]
    ],
    "related": [
      {
        "id": "O119",
        "relation": "Job – äldre jämförelse om lidande; originalpost ej slutgranskad"
      },
      {
        "id": "H073",
        "relation": "alternativ historisk respons på meningskris"
      }
    ]
  },
  "H072": {
    "overview": "Turgenjevs roman Fäder och söner publiceras 1862 i ett Ryssland där generationskonflikter, reformdebatt, naturvetenskaplig auktoritet och opposition mot etablerade institutioner står i centrum. Bazarov kallar sig nihilist, men romanens begrepp syftar framför allt på vägran att acceptera äldre auktoriteter och ideal utan prövning. Rysk nihilism i denna miljö bör därför skiljas från senare existentialnihilism om att tillvaron saknar mening; etiketten fick dessutom flera betydelser i den politiska debatten.",
    "parallels": "Romanens konflikter om familj, tradition och auktoritet gör den relevant för kristendomens samhällsställning i 1800-talets Ryssland. Romanfiguren kan inte användas som direkt dokumentation av alla samtida politiska grupper eller som en generellt accepterad definition av nihilism.",
    "caution": "Belagt: romanens publicering 1862 och användningen av benämningen. Omdiskuterat: hur representativ Bazarov var för ryska studentrörelser och olika radikala kretsar. En litterär gestalt är inte en empirisk kartläggning av människor.",
    "sources": [
      [
        "Encyclopedia.com – Fathers and Sons (1862), literary and historical analysis",
        "https://www.encyclopedia.com/arts/educational-magazines/fathers-and-sons"
      ],
      [
        "Stanford Encyclopedia of Philosophy – Existentialism (historical context)",
        "https://plato.stanford.edu/entries/existentialism/"
      ]
    ],
    "related": [
      {
        "id": "H070",
        "relation": "begreppets tidigare tyska användning"
      },
      {
        "id": "H073",
        "relation": "annan filosofisk kontext"
      }
    ]
  },
  "H073": {
    "overview": "I Den glada vetenskapen 1882 formulerar Nietzsche i parabeln om den galne människan (§125) uttrycket ”Gud är död”. Det är inte berättelsen om att ett övernaturligt väsen bokstavligen upphört att leva. Formuleringen beskriver en europeisk kultur där kristen tro inte längre fungerar som självklar grund för sanning, moral och samhällelig mening. Nietzsche framställer denna förskjutning som både möjlighet och förlust, ett omvälvande problem vars följder ännu inte förståtts fullt ut.",
    "parallels": "Predikaren frågar vilken varaktig vinning människan får av allt sitt arbete, medan Job ifrågasätter en förenklad moralisk världsordning. Men de hebreiska skrifterna förutsätter sina egna religiösa textvärldar; Nietzsche analyserar i stället ett modernt europeiskt sammanbrott för en tidigare kristen auktoritetsstruktur.",
    "caution": "Nietzsches formulering ska inte reduceras till tesen att Gud logiskt motbevisats eller att alla ateister automatiskt är nihilister. 1882 års första upplaga bör skiljas från den utökade upplagan 1887. Hans analys av europeisk kultur är filosofisk, inte ett kvantitativt bevis för hela Europas religionsutveckling.",
    "sources": [
      [
        "Stanford Encyclopedia of Philosophy – Friedrich Nietzsche",
        "https://plato.stanford.edu/entries/nietzsche/"
      ],
      [
        "Stanford Encyclopedia of Philosophy – Existentialism",
        "https://plato.stanford.edu/entries/existentialism/"
      ]
    ],
    "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Nietzsche1882.jpg?width=640",
    "credit": "Friedrich Nietzsche fotograferad av Gustav Adolf Schultze 1882. Public domain, Wikimedia Commons. Historiskt porträtt, inte illustration av 1882 års bok.",
    "related": [
      {
        "id": "H074",
        "relation": "1887 års vidareutveckling av moralbegreppen"
      },
      {
        "id": "H070",
        "relation": "tidigare begreppshistoria"
      }
    ]
  },
  "H074": {
    "overview": "Till moralens genealogi (1887) består av tre avhandlingar där Nietzsche försöker härleda moraliska begrepp till historiska sociala relationer, psykologiska processer och ideal. Han skiljer mellan olika värderingssätt och granskar skuld, samvete, askes och lidandets betydelse i europeisk kultur. Hans metod är genealogisk: i stället för att ta en morals allmängiltighet för given undersöker han hur den blev självklar. Nietzsche använder samtidigt starkt värderande argument och ska därför inte kallas en enkel förespråkare för total värdelöshet.",
    "parallels": "Detta är en viktig senare tolkningshistorisk kontaktpunkt mellan kristen etik och modern moralfilosofi, särskilt föreställningar om skuld, försoning och självförnekelse. Bibliska texter tillkom dock i helt andra historiska världar; Nietzsche ger inte en arkeologisk rekonstruktion av hur israelitisk religion uppstod.",
    "caution": "1887 som publiceringsår är väl belagt. Genealogins psykologiska och historiska generaliseringar är omstridda och bör inte presenteras som forskningsmässigt fastställda orsaker till all kristen moral. Genealogiskt ursprung är inte i sig ett argument för moraliskt falskhet.",
    "sources": [
      [
        "Stanford Encyclopedia of Philosophy – Friedrich Nietzsche, critique of morality",
        "https://plato.stanford.edu/entries/nietzsche/"
      ],
      [
        "Stanford Encyclopedia of Philosophy – Religion and Morality",
        "https://plato.stanford.edu/entries/religion-morality/"
      ]
    ],
    "related": [
      {
        "id": "H073",
        "relation": "1882 års parabel om Guds död"
      },
      {
        "id": "H075",
        "relation": "mening och värdeskapande utan given teleologi"
      }
    ]
  },
  "H075": {
    "overview": "I essän Myten om Sisyfos (1942) beskriver Camus det absurda som spänningen mellan människans längtan efter klarhet, mening och en värld som inte erbjuder ett slutgiltigt svar. Utgångspunkten är inte att alla känslor av glädje, solidaritet eller engagemang är illusioner. Tvärtom diskuterar Camus hur människan kan leva utan att avfärda erfarenheten, och han tar uttryckligen avstånd från självmord som svar på det absurda. Sisyfos används som litterär symbol för att fortsätta trots livets ofullständiga svar.",
    "parallels": "Predikaren och Job kan användas som äldre teman för frågor om begränsad kunskap, förgänglighet och oskyldigt lidande. Camus ger inget historiskt bevis för hur deras författare tänkte, och hans absurdism är inte identisk med en filosofisk position som förnekar allt slags värde.",
    "caution": "Camus förknippas ofta med existentialism men motsatte sig själv vissa sådana etiketter. Metafysisk meningslöshet och den mänskliga upplevelsen av en meningsfull relation eller uppgift måste hållas isär. Utgivningsåret 1942 är historiskt, inte en datering av när människor först upplevde absurditet.",
    "sources": [
      [
        "Stanford Encyclopedia of Philosophy – Albert Camus",
        "https://plato.stanford.edu/entries/camus/"
      ],
      [
        "Stanford Encyclopedia of Philosophy – The Meaning of Life",
        "https://plato.stanford.edu/entries/life-meaning/"
      ]
    ],
    "related": [
      {
        "id": "H073",
        "relation": "Nietzsches äldre problem om mening och värden"
      },
      {
        "id": "O119",
        "relation": "Jobs bok – jämförelse, inte litterärt bevisat beroende"
      }
    ]
  }
};
for(const item of rows){if(!events.some(e=>e.id===item.id))events.push(item);if(!research[item.id])research[item.id]=articles[item.id];}
window.TIDENS_NIHILISM=Object.freeze({ids:rows.map(x=>x.id),status:'Källorienterad forskningsfördjupning; ej C6-slutgranskad',version:'8.92-preview'});
})();
