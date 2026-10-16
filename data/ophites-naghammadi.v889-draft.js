/* Granskning 5: Ophitiska traditioner och Nag Hammadi. Arbetsutkast 2026-10-16.
 * Två separata tidsnivåer. Ej C6-slutgranskade eller publicerade på main.
 * Bild H068: rekonstruktion FRÅN 1826, INTE antikt gnostiskt diagram.
 * Bild H069: Codex II folio 32, inte en sida ur Härskarnas natur.
 */
(function(){
  'use strict';
  if(typeof events==='undefined'||typeof research==='undefined')return;
  const records=[
    {
      id:'H068',category:'Religion & texter',
      title:'Ophiterna – när ormen blev kunskapens förmedlare',
      start:175,end:300,
      dating:'Antika vittnesmål om tolkningstraditioner, ca 175–300 e.Kr.; inte en organisations exakta livstid',
      evidence:'Medel',
      description:'I vissa tidiga gnostiska tolkningar av Eden blir ormen en förmedlare av kunskap. Begreppet ”ophiter” används av kyrkliga motståndare om svåravgränsade grupper och texter, inte en säkert enhetlig sekt.',
      bible:'1 Mos 2–3 (senare receptionshistoria); jämför 1 Mos 3:5, 22',
      source:'https://www.newadvent.org/fathers/0103130.htm',reviewed:false
    },
    {
      id:'H069',category:'Religion & texter',
      title:'Nag Hammadi – alternativa berättelser om Eden',
      start:300,end:399,
      dating:'Bevarat koptiskt handskriftsvittne (Codex II, 300-talet); texternas ursprung ofta äldre och omdiskuterat',
      evidence:'Hög',
      description:'I Nag Hammadi Codex II finns bland annat Johannesapokryfen, Härskarnas natur och Om världens ursprung. De bevarar olika omtolkningar av Genesis, där den lägre skaparmakten, Sofia och kunskapen får nya roller.',
      bible:'1 Mos 1–3 (gnostiska nytolkningar, inte äldre original till Genesis)',
      source:'https://www.gnosis.org/naghamm/hypostas.html',reviewed:false
    }
  ];
  for(const entry of records){
    if(!events.some(existing=>existing.id===entry.id))events.push(entry);
  }
  if(!research.H068)research.H068={
    overview:'Benämningen ”ophiter” kommer av grekiskans ophis, orm. Irenaeus beskriver omkring slutet av 100-talet en myt där Skaparen/Jaldabaoth är en lägre makt och ormen får en annan roll än i senare kyrklig standardtolkning. Origenes diskuterar under 200-talet ett diagram han knyter till ”ophiter”. Det är osäkert om uppgifterna beskriver en organiserad och kontinuerlig rörelse. Ophiter och naassener får inte automatiskt behandlas som identiska.',
    parallels:'I 1 Mos 3:5 utlovar ormen öppnade ögon och kunskap; i 3:22 säger Gud att människan har blivit som en av ”oss” genom kunskap om gott och ont. Dessa verser kan ge stoff för en omtolkning, men verserna i sig gör inte ormen till en positiv gestalt. Vissa gnostiska texter utlägger scenen som upplysning trots den lägre härskarens förbud. Jämför H020 (Genesis urhistoria), H069 (bevarade gnostiska texter) och H025 (judisk apokalyptisk mångfald); jämförelse betyder inte direkt beroende.',
    caution:'Irenaeus och Origenes skriver polemiskt och är inte neutrala etnografer. Uppgifter om levande ormar i riter kan inte verifieras som en generell ophitisk praktik; kristologin varierade och några källor beskriver också tydligt antijesuanska hållningar. Origenes diagram är känt genom motståndarnas beskrivning, inte som en bevarad antik originalbild. Diagrammet nedan är en REKONSTRUKTION från 1826, inte ett fynd från antiken.',
    sources:[
      ['Irenaeus – Mot heresierna 1.30 (antikt motståndarvittne)','https://www.newadvent.org/fathers/0103130.htm'],
      ['Origenes – Contra Celsum 6.24 (antikt motståndarvittne)','https://www.newadvent.org/fathers/04166.htm'],
      ['Tuomas Rasimus (2009), Paradise Reconsidered (akademisk monografi)','https://researchportal.helsinki.fi/en/publications/paradise-reconsidered-in-gnostic-mythmaking-rethinking-sethianism/'],
      ['Första Moseboken 3:5 och 3:22 (textjämförelse)','https://www.sefaria.org/Genesis.3'],
      ['Jacques Matter (1826) – bildens proveniens och licens','https://commons.wikimedia.org/wiki/File:Ophitediagram-matter.png']
    ],
    image:'https://commons.wikimedia.org/wiki/Special:FilePath/Ophitediagram-matter.png?width=640',
    credit:'Jacques Matter, Histoire critique du Gnosticisme (1826), historisk rekonstruktion av ett diagram; INTE ett antikt original. Public domain (Commons).',
    imageSource:'https://commons.wikimedia.org/wiki/File:Ophitediagram-matter.png',
    imageLicense:'Public domain',
    related:[{id:'H020',relation:'tolkning av äldre Genesistext; ej bevisat litterärt lån'},{id:'H069',relation:'jämför besläktade men inte automatiskt samma grupper'},{id:'H025',relation:'jämför olika judiska och kristna tolkningsmiljöer'}],
    reviewStatus:'Granskning pågår – primärkällor genomgångna i urval; ingen C6-slutgranskning'
  };
  if(!research.H069)research.H069={
    overview:'Nag Hammadi-samlingen upptäcktes i Egypten 1945. Codex II är ett koptiskt handskriftsvittne från 300-talet. I detta kodex finns bland annat Johannesapokryfen, Härskarnas natur och Om världens ursprung. Verken kan ha tidigare grekiska förlagor och äldre kompositionslager, men deras ursprungliga tillkomst kan inte enkelt dateras till själva handskriftens århundrade. De tre texterna visar variation snarare än ett enda enhetligt system.',
    parallels:'Härskarnas natur kallar ormen en undervisare och låter en kvinnlig andlig princip verka genom den. I andra närliggande texter skildras Sofia (Visheten) och en lägre världsskapande makt, ofta kallad Jaldabaoth. Det är alternativa antika läsningar av Genesis 1–3, inte en förlorad ”ursprunglig version” av bibeltexten. Jämför H020 (Genesis komposition), H068 (ophitiska etiketter och kyrkliga motbilder) och H025 (fler judiska apokalyptiska traditioner).',
    caution:'”Gnosticism” är ett analytiskt samlingsnamn, inte namnet på en enda kyrka. Nag Hammadi-biblioteket är inte identiskt med ophiterna. Man får inte sätta likhetstecken mellan Codex II:s 300-tal, verkens osäkra 100–300-talsrötter och berättelsens mytiska Eden. Bilden visar folio 32 med slutet av Johannesapokryfen och början av Thomasevangeliet; den är inte en illustration av ormen eller en sida ur Härskarnas natur.',
    sources:[
      ['Härskarnas natur – koptisk text i engelsk översättning (Bentley Layton)','https://www.gnosis.org/naghamm/hypostas.html'],
      ['Härskarnas natur – parallell översättning (Barnstone/Meyer)','https://www.gnosis.org/naghamm/Hypostas-Barnstone.html'],
      ['Tuomas Rasimus (2009) – relaterade Edenomtolkningar','https://researchportal.helsinki.fi/en/publications/paradise-reconsidered-in-gnostic-mythmaking-rethinking-sethianism/'],
      ['Irenaeus – Mot heresierna 1.30 (jämförelse med kyrkofäder)','https://www.newadvent.org/fathers/0103130.htm'],
      ['Nag Hammadi Codex II – handskriftsbild, proveniens och licens','https://commons.wikimedia.org/wiki/File:Nag_Hammadi_Codex_II.jpg']
    ],
    image:'https://commons.wikimedia.org/wiki/Special:FilePath/Nag_Hammadi_Codex_II.jpg?width=640',
    credit:'Nag Hammadi Codex II, folio 32 (300-talet); visar slutet av Johannesapokryfen och början av Thomasevangeliet. Detta är inte en sida ur Härskarnas natur. Handskriftsbild, public domain enligt Wikimedia Commons.',
    imageSource:'https://commons.wikimedia.org/wiki/File:Nag_Hammadi_Codex_II.jpg',
    imageLicense:'Public domain-markering enligt Wikimedia Commons',
    related:[{id:'H020',relation:'nytolkning av Genesis 1–3'},{id:'H068',relation:'jämförelse mellan antika polemiker och egna textvittnen'},{id:'H025',relation:'jämför texttraditionernas mångfald utan att påstå beroende'}],
    reviewStatus:'Granskning pågår – primärkällor genomgångna i urval; ingen C6-slutgranskning'
  };
})();
