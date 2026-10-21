# Etapp B2 – Kategoriinventering och beslutsunderlag (2026-10-20)

**Status:** inventering, ej UI-byte. Kompletterar PR #180 och dess kategoriarkitektur. Etapp C pausas efter C3.1, tills kategoriarkitektur och gemensam grafisk helhet är förankrade.

## Kontroll av faktiskt basmaterial
I `data/data.generated.js`:
- `events`: **64 poster**. Historia 26, Arkeologi 14, Bibeltext 12, Religion & texter 8, Bibelberättelse 4.
- `originalEvents`: **129 poster**. Bibelberättelser 36, Konflikterande berättelser 28, Människans utveckling 16, Religion 14, Civilisation 11, Byggnadsverk 11, Krig 7, Folk 6.
- `bibleOriginal`: **36 poster**, utan samma `category`-fält.
- Summan ovan är **datakällornas poster, inte ett deduplicerat totalantal** och inte komplett inventering av senare skript: bibelböcker (B), apokryfer (D/AP) och parallella C6/C7-inlägg tillkommer.
- UI:s `laneNames` har dessutom visningsetiketter som inte är identiska med de lagrade råkategorierna.

## Vad måste ändras?
Befintlig filterlista blandar fyra olika frågor:
1. **Vad handlar posten om?** Bibeln, Religioner, Världshistoria, Idéer & kunskap.
2. **Vad är det för slags material?** Händelse, text/bok, fynd, person, plats, byggnad, idéströmning.
3. **Vilken tid avses?** Historisk kontext, berättad tid, textens tillkomst och senare reception kan skilja sig.
4. **Hur säker är kunskapen?** Forskningsstatus, evidens och källkritisk bedömning.

## Förslag till stabil målmodell
`primaryArea` är en av `bible|religions|world|ideas`, eller `unclassified` i väntan på granskning.
`relatedAreas` är noll eller flera andra relevanta perspektiv.
`contentTypes`, `timeKinds`, `researchStatus` och `places` är separata dimensioner.
`legacyCategory`, ursprungligt post-ID och ursprungliga tidsfält bevaras alltid i read-only migreringsadapter.

**Viktig begränsning:** En äldre etikett får inte automatiskt avgöra alla forskningsmässiga samband. Exempelvis kan `Religion & texter` inte utan granskning bli enbart Bibeln eller enbart Religioner, och `Konflikterande berättelser` är inte en historiskt vetenskaplig evidensklass.

## Första föreslagna arbetsordning inom B
**B2.1:** Slutför samtliga datasetinventeringar och dokumentera postunika ID:n, dubbletter, saknade kategorier och posternas källa/ursprung. Automatisera täckningsrapport.
**B2.2:** Fastställ fyra områden plus separata filterdimensioner, med okända fall öppet redovisade. Samordna med C7-granskning.
**B2.3:** Bygg icke-förstörande adapter och test med antal per område, exempelposter, dubbletter och oförändrade djuplänkar.
**B2.4:** Visa fyra huvudingångar + avancerade filter i separat test-PR, behåll gamla filter under migreringen.
**B3:** Bygg gemensamma bildhuvuden för huvudflikarna med **befintligt godkänt landskapsfoto som stilreferens**, inte ett nytt konstlat motiv. Helhetsgranska på dator/mobil.
**C återupptas:** Verifiera alla kopplingar Tidslinje–Karta–Temaspår–Jämför mot de nya kategorierna.

## Frysregel
Ingen automatiserad massomklassificering och inga ändringar i befintliga `category`-värden, `events`, `originalEvents`, C6/C7, Gantt, startsidesbild eller SVG-ikoner förrän adapter och testprotokoll godkänts.
