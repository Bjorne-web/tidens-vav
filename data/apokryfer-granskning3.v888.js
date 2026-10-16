/* Granskning 3: apokryferna. Utvecklingsunderlag, inte C6-slutgranskat.
   Post-ID:n AP001–AP006 undviker kollision med befintliga H- och O-serier.
   Tiderna avser ungefärliga litterära/kanonhistoriska kontexter, aldrig berättad tid. */
(function () {
  'use strict';
  if (typeof events === 'undefined' || typeof research === 'undefined') return;
  const rows = [
    {
      id:'AP001', category:'Religion & texter', title:'Apokryferna och Bibelns olika kanon',
      start:-300,end:400,dating:'Tidiga skriftsamlingar och kanondiskussioner; senare kanonhistoria fortsätter',evidence:'Ej granskad',
      description:'Olika judiska och kristna gemenskaper har brukat och auktoriserat delvis olika skriftsamlingar. Termerna apokryfer och deuterokanoniska böcker varierar med traditionen.',
      bible:'Septuaginta; judisk Tanakh; kristna kanontraditioner',source:'',reviewed:false,
      overview:'Det finns inte en enda historisk tidpunkt då alla judiska och kristna traditioner antog exakt samma samling böcker. Grekiska och hebreiska texttraditioner, liturgisk användning och senare kanonbeslut måste studeras var för sig.',
      parallels:'Jämför boklistor och bruk i judiska, protestantiska, katolska och olika ortodoxa traditioner.',
      caution:'En handskrifts innehåll bevisar inte automatiskt ett enhetligt kanonbeslut. Perioden här avser tidiga historiska förutsättningar: diskussioner om kanon fortsatte långt senare, bland annat under reformationen. Perioden är inte när en enda text författades.',
      refs:[['Oxford Bibliographies – Apocrypha and Pseudepigrapha (deSilva)','https://academic.oup.com/reference/62341/reference-article-abstract/554102278'],['Oxford Handbook – The Bible in Orthodox Christianity','https://academic.oup.com/edited-volume/41986']]
    },
    {
      id:'AP002',category:'Bibeltext',title:'Första och Andra Mackabeerboken – historieskrivning och uppståndelse',
      start:-150,end:70,dating:'Två verk med olika och omdiskuterade tillkomstperioder',evidence:'Ej granskad',
      description:'Första Mackabeerboken och Andra Mackabeerboken är olika verk. De vittnar om seleukidiska konflikter, martyrskap och uppståndelsehopp men dateras var för sig.',
      bible:'1 Mack; 2 Mack 7; Dan 12:2; Heb 11:35',source:'https://www.biblegateway.com/passage/?search=2%20Maccabees%207&version=NRSVUE',reviewed:false,
      overview:'Första Mackabeerboken ger ett historiografiskt perspektiv på tempelkris och politisk makt. Andra Mackabeerboken 7 gestaltar martyrernas hopp om ett framtida liv och kroppslig uppståndelse. Uppståndelseföreställningar förekommer också i andra judiska texter.',
      parallels:'Jämför 2 Mack 7 med Daniel 12:2 och Hebreerbrevet 11:35; jämför teman textnära utan att anta direkt beroende.',
      caution:'H024 täcker själva Mackaberupproret; den här posten gäller skrifternas tillkomst, tolkning och uppståndelsetro. Första Mackabeerboken dateras ofta omkring 100 f.Kr.; Andra Mackabeerbokens tillkomst diskuteras och kan inte ges samma säkra datering. Tidsintervallet här är en illustration av möjlig litterär kontext, inte en enskild bokdatering.',
      refs:[['2 Mackabeerboken 7 (primärtext)','https://www.biblegateway.com/passage/?search=2%20Maccabees%207&version=NRSVUE'],['Encyclopedia of the Bible – Books of Maccabees','https://www.biblegateway.com/resources/encyclopedia-of-the-bible/Books-Maccabees']]
    },
    {
      id:'AP003',category:'Bibeltext',title:'Salomos vishet – judisk vishet i grekisk miljö',
      start:-100,end:100,dating:'Brett diskuterat kompositionsintervall',evidence:'Ej granskad',
      description:'Grekiskspråkig judisk vishetslitteratur diskuterar rättfärdighet, odödlighet och avgudadyrkan i en hellenistisk värld.',
      bible:'Vish 3; 13–14; Rom 1:20–32',source:'',reviewed:false,
      overview:'Salomos vishet tillskrivs Salomo litterärt, men forskningen placerar skriften långt senare, vanligtvis i en hellenistisk judisk miljö och ofta i Alexandria.',
      parallels:'Jämför argumenten om gudskunskap och avgudadyrkan i Vish 13–14 och Rom 1:20–32.',
      caution:'Likartade motiv bevisar inte direkt litterärt beroende. Datering, författarskap och exakta filosofiska influenser diskuteras.',
      refs:[['Oxford Bibliographies – Wisdom of Solomon (Harrington)','https://academic.oup.com/reference/62341/reference-article-abstract/554110809'],['Wiley – Wisdom of Solomon (Chesnutt)','https://onlinelibrary.wiley.com/doi/10.1002/9781119158288.ch6']]
    },
    {
      id:'AP004',category:'Bibeltext',title:'Jesus Syraks vishet – Torah och vishet',
      start:-200,end:-100,dating:'Hebreisk komposition och senare grekisk översättning',evidence:'Ej granskad',
      description:'Syraks bok ger inblick i judisk undervisning och vishetskultur före Nya testamentet.',
      bible:'Syr prologen; Syr 5:11; Jak 1:19',source:'',reviewed:false,
      overview:'Jesus ben Sira skrev på hebreiska omkring 180 f.Kr. Hans sonson översatte verket till grekiska omkring 132 f.Kr.; översättarens prolog är en viktig kronologisk källa. Både kompositions- och översättningsdatering är historiska rekonstruktioner.',
      parallels:'Jämför råd om tal, lyssnande och moralisk urskillning med annan judisk vishetslitteratur och Jakobsbrevet.',
      caution:'Översättningens grekiska uttryck behöver skiljas från den hebreiska kompositionen och från bevarade textvittnen.',
      refs:[['Oxford Classical Dictionary – Ben Sira (Wright)','https://academic.oup.com/edited-volume/61673/chapter-abstract/550533627'],['Ben Sira manuscript project – Introduction','https://bensira.org/introduction.html']]
    },
    {
      id:'AP005',category:'Bibeltext',title:'Tobits bok – Rafael, Asmodeus och exilens tro',
      start:-250,end:-100,dating:'Föreslaget kompositionsintervall (osäkert)',evidence:'Ej granskad',
      description:'Tobits berättelse förenar diaspora, familjeetik och ängla- och demonmotiv. Arameiska och hebreiska fragment har hittats vid Qumran.',
      bible:'Tob 3–12; Qumranfragment av Tobit',source:'',reviewed:false,
      overview:'Berättelsen utspelar sig i en äldre assyrisk miljö men kompositionen dateras vanligtvis till andra templets tid. Rafael uppträder som vägledande och helande ängel, Asmodeus som destruktiv demon. Bland Qumranfynden finns fyra arameiska fragmentmanuskript (4Q196–199) och ett hebreiskt (4Q200).',
      parallels:'Jämför Qumranfragmentens textvittnen och bredare judiska änglatraditioner.',
      caution:'Skilj berättad tid från tillkomst och handskrifters datering. Tobit visar en tradition, inte en universell judisk angelologi.',
      refs:[['Oxford Bibliographies – Tobit','https://academic.oup.com/reference/62341/reference-article-abstract/554108602?login=false'],['Kowalski – Tobits arameiska och hebreiska Qumranmanuskript','https://czasopisma.kul.pl/index.php/ba/article/view/2133']]
    },
    {
      id:'AP006',category:'Religion & texter',title:'Apokryferna och Nya testamentet – textparalleller',
      start:-200,end:120,dating:'Jämförelseperiod, inte en enskild texts datering',evidence:'Ej granskad',
      description:'Textnära prövning av möjliga paralleller mellan judiska skrifter utanför vissa bibelkanon och de tidiga kristna texterna.',
      bible:'2 Mack 7 / Heb 11:35; Syr 5:11 / Jak 1:19; Vish 13–14 / Rom 1',source:'',reviewed:false,
      overview:'Tidiga kristna författare verkade i judiska idé- och skriftmiljöer med bredare litteratur än en senare avgränsad protestantisk kanon.',
      parallels:'Exempel för prövning: 2 Mack 7 jämfört med Heb 11:35; Syr 5:11 jämfört med Jak 1:19; Vish 13–14 jämfört med Rom 1:20–32.',
      caution:'Skilj direkta citat från allusion, gemensamma teman och möjlig påverkan. Dateringarna illustrerar litterära miljöer och får inte läsas som tillkomstår för en bok.',
      refs:[['Oxford Bibliographies – Apocrypha and Pseudepigrapha','https://academic.oup.com/reference/62341/reference-article-abstract/554102278'],['Encyclopedia of the Bible – Apocrypha','https://www.biblegateway.com/resources/encyclopedia-of-the-bible/Apocrypha']]
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