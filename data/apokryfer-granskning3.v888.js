/* Granskning 3: apokryferna. Utvecklingsunderlag, inte C6-slutgranskat.
   Post-ID:n AP001–AP006 undviker kollision med befintliga H- och O-serier.
   Tiderna avser ungefärliga litterära/kanonhistoriska kontexter, aldrig berättad tid. */
(function () {
  'use strict';
  if (typeof events === 'undefined' || typeof research === 'undefined') return;
  const rows = [
    {
      id:'AP001', category:'Religion & texter', title:'Apokryferna och Bibelns olika kanon',
      start:-300,end:400,dating:'Historisk utvecklingsperiod (inte ett beslutsår)',evidence:'Medel',
      description:'Olika judiska och kristna gemenskaper har brukat och auktoriserat delvis olika skriftsamlingar. Termerna apokryfer och deuterokanoniska böcker varierar med traditionen.',
      bible:'Septuaginta; judisk Tanakh; kristna kanontraditioner',source:'',reviewed:false,
      overview:'Det finns inte en enda historisk tidpunkt då alla judiska och kristna traditioner antog exakt samma samling böcker. Grekiska och hebreiska texttraditioner, liturgisk användning och senare kanonbeslut måste studeras var för sig.',
      parallels:'Jämför boklistor och bruk i judiska, protestantiska, katolska och olika ortodoxa traditioner.',
      caution:'En handskrifts innehåll bevisar inte automatiskt ett enhetligt kanonbeslut. Dateringen gäller en bred utvecklingsperiod, inte när en särskild text författades.',
      refs:[['Bibelns kanon – översikt, Encyclopaedia Britannica','https://www.britannica.com/topic/biblical-literature/The-Christian-canon']]
    },
    {
      id:'AP002',category:'Bibeltext',title:'Första och Andra Mackabeerboken – historieskrivning och uppståndelse',
      start:-150,end:-50,dating:'Ungefärlig tillkomstperiod, diskuterad',evidence:'Medel',
      description:'Mackabeerböckerna vittnar om seleukidiska konflikter, martyrskap och uppståndelsehopp. Skilj böckernas tillkomst från upprorets tid.',
      bible:'1 Mack; 2 Mack 7; Dan 12:2; Heb 11:35',source:'https://www.biblegateway.com/passage/?search=2%20Maccabees%207&version=NRSVUE',reviewed:false,
      overview:'Första Mackabeerboken ger ett historiografiskt perspektiv på tempelkris och politisk makt. Andra Mackabeerboken 7 gestaltar martyrernas hopp om ett framtida liv och kroppslig uppståndelse. Uppståndelseföreställningar förekommer också i andra judiska texter.',
      parallels:'Jämför 2 Mack 7 med Daniel 12:2 och Hebreerbrevet 11:35; jämför teman textnära utan att anta direkt beroende.',
      caution:'H024 täcker själva Mackaberupproret; den här posten gäller skrifternas form, tolkning och uppståndelsetro. Författarna och exakta kompositionsdatum är osäkra.',
      refs:[['2 Mackabeerboken 7 (primärtext)','https://www.biblegateway.com/passage/?search=2%20Maccabees%207&version=NRSVUE']]
    },
    {
      id:'AP003',category:'Bibeltext',title:'Salomos vishet – judisk vishet i grekisk miljö',
      start:-100,end:100,dating:'Brett diskuterat kompositionsintervall',evidence:'Medel',
      description:'Grekiskspråkig judisk vishetslitteratur diskuterar rättfärdighet, odödlighet och avgudadyrkan i en hellenistisk värld.',
      bible:'Vish 3; 13–14; Rom 1:20–32',source:'',reviewed:false,
      overview:'Salomos vishet tillskrivs Salomo litterärt, men forskningen placerar skriften långt senare, vanligtvis i en hellenistisk judisk miljö och ofta i Alexandria.',
      parallels:'Jämför argumenten om gudskunskap och avgudadyrkan i Vish 13–14 och Rom 1:20–32.',
      caution:'Likartade motiv bevisar inte direkt litterärt beroende. Datering, författarskap och exakta filosofiska influenser diskuteras.',
      refs:[]
    },
    {
      id:'AP004',category:'Bibeltext',title:'Jesus Syraks vishet – Torah och vishet',
      start:-200,end:-100,dating:'Hebreisk komposition och senare grekisk översättning',evidence:'Medel',
      description:'Syraks bok ger inblick i judisk undervisning och vishetskultur före Nya testamentet.',
      bible:'Syr prologen; Syr 5:11; Jak 1:19',source:'',reviewed:false,
      overview:'Jesus ben Sira skrev huvudsakligen på hebreiska tidigt under 100-talet f.Kr. Hans sonson översatte verket till grekiska senare under samma århundrade; prologen är en viktig kronologisk källa.',
      parallels:'Jämför råd om tal, lyssnande och moralisk urskillning med annan judisk vishetslitteratur och Jakobsbrevet.',
      caution:'Översättningens grekiska uttryck behöver skiljas från den hebreiska kompositionen och från bevarade textvittnen.',
      refs:[]
    },
    {
      id:'AP005',category:'Bibeltext',title:'Tobits bok – Rafael, Asmodeus och exilens tro',
      start:-250,end:-100,dating:'Föreslaget kompositionsintervall (osäkert)',evidence:'Medel',
      description:'Tobits berättelse förenar diaspora, familjeetik och ängla- och demonmotiv. Arameiska och hebreiska fragment har hittats vid Qumran.',
      bible:'Tob 3–12; Qumranfragment av Tobit',source:'',reviewed:false,
      overview:'Berättelsen utspelar sig i en äldre assyrisk miljö men kompositionen dateras vanligtvis till andra templets tid. Rafael uppträder som vägledande och helande ängel, Asmodeus som destruktiv demon.',
      parallels:'Jämför Qumranfragmentens textvittnen och bredare judiska änglatraditioner.',
      caution:'Skilj berättad tid från tillkomst och handskrifters datering. Tobit visar en tradition, inte en universell judisk angelologi.',
      refs:[]
    },
    {
      id:'AP006',category:'Religion & texter',title:'Apokryferna och Nya testamentet – textparalleller',
      start:-200,end:120,dating:'Jämförelseperiod, inte en enskild texts datering',evidence:'Medel',
      description:'Textnära prövning av möjliga paralleller mellan judiska skrifter utanför vissa bibelkanon och de tidiga kristna texterna.',
      bible:'2 Mack 7 / Heb 11:35; Syr 5:11 / Jak 1:19; Vish 13–14 / Rom 1',source:'',reviewed:false,
      overview:'Tidiga kristna författare verkade i judiska idé- och skriftmiljöer med bredare litteratur än en senare avgränsad protestantisk kanon.',
      parallels:'Exempel för prövning: 2 Mack 7 jämfört med Heb 11:35; Syr 5:11 jämfört med Jak 1:19; Vish 13–14 jämfört med Rom 1:20–32.',
      caution:'Skilj direkta citat från allusion, gemensamma teman och möjlig påverkan. Dateringarna illustrerar litterära miljöer och får inte läsas som tillkomstår för en bok.',
      refs:[]
    }
  ];
  for (const r of rows) {
    if (events.some(e=>e.id===r.id) || (Object.prototype.hasOwnProperty.call(research,r.id))) continue;
    const {overview,parallels,caution,refs,...event}=r;
    events.push(event);
    research[r.id]={overview,parallels,caution,sources:refs};
  }
  window.TIDENS_APOKRYFER_REVIEW={status:'preliminärt forskningsutkast; ej källslutgranskat',ids:rows.map(r=>r.id),relatedIds:['H023','H024','H025']};
})();