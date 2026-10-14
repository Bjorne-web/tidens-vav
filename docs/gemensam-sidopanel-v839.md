# V8.39 – en gemensam sidopanel för samtliga 193 poster

## Bakgrund
Användarens test av V8.39 visade att den nya sidopanelen fungerade för **Puniska krigen (O049)**, men att bland annat **Gilgamesheposet – flodberättelsen (O067)** fortfarande hade en annan disposition.

Orsaken var att V8.38:s omläggning prioriterade `.v86-article`, en artikeltyp som bara finns för delar av materialet. Många originalposter, inklusive O067, använder i stället `.v828-dossier` eller `.v828-collapsed`. Andra poster, exempelvis H005 (Gilgamesheposets utveckling), har sin forskningsinformation i andra underlag.

## Gemensam läsordning
För **varje** av de 64 forskningsposterna och 129 originalposterna gäller nu:
1. Läsbredd och läsarkontroller, vald post och jämförelseknappar
2. Postens ID och titel
3. En sammanhållen forskningsgenomgång med samma underrubriker
4. **Samlad forskningsöversikt** – utfällbar
5. **Historiska samband** och knappen för Temaspår
6. Tidigare källjournaler, särskilda forskningsrapporter, kompletterande rutor och övriga uppgifter längre ned

Genomgången visar alltid samma underrubriker: *Vad var det?*, *Historiskt sammanhang*, *Konsekvenser och betydelse*, *Betydelse för Israels religion, judendomen och kristendomen*, *Osäkerheter och viktiga preciseringar*, samt *Källor och läsvägar*.

## Innehållet måste vara ärligt om kunskapsläget
- Finns en befintlig fullare **V8.6-artikel** (till exempel Puniska krigen) återanvänds den **utan omskrivning**.
- För andra originalposter återanvänds i första hand deras **V8.28-forskningsunderlag** (till exempel O067:s sammanfattning, historisk kontext, begränsningar och hänvisning till British Museum).
- För forskningsposter används i första hand deras existerande underlag, till exempel H005:s forskningsbeskrivning och källor till Gilgamesheposet.
- Om en uppgift saknas syns det öppet som *ännu inte dokumenterat/källprövat*, inte som en ny forskningsslutsats.
- Det finns **ingen automatisk helgranskning** av en post genom denna formändring.
- När Gilgamesh jämförs med Genesis redovisas motivlikheter och skillnaden mellan texthistoria och bevarade manuskript; inga nya direkta kopieringskedjor påstås.

## Ingen information försvinner
Befintliga DOM-element **flyttas**, i stället för att raderas eller kopieras. Äldre V8.28-underlag, basmetadata, varningar och källhänvisningar behålls i **Samlad forskningsöversikt**. Vetenskapliga källkontroller, historiska samband, länkdelning och andra kompletterande paneler ligger kvar. Äldre eventlyssnare på knappar bevaras.

Två nya filer implementerar detta: `v839-reader-unified.js` och `v839-reader-unified.css`. `app.js`, `data/data.generated.js`, `styles.css` och **Temaspårs nya V8.39-tidslinje ändras inte**.

## Regressionstester
Kör `node tests/smoke-reader-universal-v839.mjs`. Testet:
- Går igenom samtliga **193** post-ID:n och kontrollerar att forskningsgenomgångens sex huvudrubriker finns.
- Verifierar att O067:s V8.28-underlag och H005:s forskningskällor går vidare till den enhetliga genomgången.
- Bekräftar att O049:s existerande artikel inte ersätts eller dupliceras.
- Kontrollerar att äldre noder och varningar finns kvar efter omläggningen och att ordningen är densamma.
- Skyddar mot dubblerad artikel och utfällbar översikt vid upprepad uppdatering av läsfönstret.

Tidigare tester för Temaspårs tidslinje, kategorifilter och C6-journalen körs också.

## Manuell test i Cloudflare Preview
1. Öppna **O049 Puniska krigen**. Kontrollera att layouten du redan tyckte om är bevarad.
2. Öppna **O067 Gilgamesheposet – flodberättelsen**. Kontrollera att den nu har samma rubrikordning, en begriplig sammanhållen genomgång, *Samlad forskningsöversikt* med den tidigare V8.28-texten och *Historiska samband*.
3. Öppna **H005 Gilgamesheposets utveckling**. Kontrollera att dess forskningsinformation och länkar till British Museum finns kvar.
4. Öppna någon originalpost med mycket kort forskningsunderlag och kontrollera att inga obelagda slutsatser fyllts i.
5. Testa läsbredd, källor, Jämför, Visa sambanden i Temaspår och mobilens läsfönster.
6. Kontrollera att V8.39:s tidslinje fortfarande alltid visar vald post och de sex förvalda jämförelsekategorierna.

**Först när denna Preview är testad och godkänd bör V8.39 publiceras till main.**
