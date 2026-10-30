# F4.1 – Full forskningsvy: separat första läsprototyp

**Datum:** 30 oktober 2026  
**Bas:** Godkänd F3 (squash `2844e36ef30c93985eb5e49cf48beec9aabc305c`) och F2-design.  
**Status:** Ej produktionsgodkänd. Separat granskningsgren och egen CI; ingen ändring i `index.html`, `v897-research-read-model.js`, C7, produktionens navigation eller CSS.

## Vad är byggt i första F4-steget?

- `tests/f4-reader-fixtures.cjs` bygger **sex faktiska visningsfall** direkt ur nuvarande källfiler, genom F3:s isolerade read-only-modell: **H045** Ahab och Qarqar; **B001** Första Moseboken; **D001** Tobit; **O067** Gilgamesheposet; **topic:good** Är Gud god?; en faktisk `source:`-referens från **A01** Amarnabreven.
- `tests/f4-reader-renderer.cjs` implementerar en **fristående semantisk HTML-vy**: posthuvud, innehållsnavigering, huvudartikel och sambandskolumn; datumtyper, separat berättad tid, C7:s religionshistoriska betydelse, källreferenser och forskningsstatus. Avsnitt utan underlag utelämnas där det är möjligt, förutom översikt/källor som visar tydlig informationsbrist.
- `prototypes/f4/reader-preview.css` ger en **responsiv trekolumnsvy på större skärmar** och linjär mobilvy. F4:s prototyp har ett eget testhuvud; den är **inte** avsedd att ersätta appens godkända gemensamma landskapsbild, huvudmeny eller fyra områdesikoner.
- `tests/f4-generate-review.cjs` genererar en **självständig lokal HTML-granskningsfil** med växling mellan exempel och fungerande `Tillbaka till exemplen`. Granskningsfilen byggs och publiceras enbart som GitHub Actions-testartefakt, inte på Cloudflare Pages.
- `tests/f4-reader-renderer.test.cjs` verifierar faktiska data, relevant F2-innehåll, rubrik- och sidstruktur, HTML-escaping, källänkar, C7-datering, kanonstatus och att ingen filosofisk fråga får påhittade dateringar.

## Gränser för vad den här prototypen bevisar

1. **Detta är inte en produktionsadapter.** F4 läser verkliga källfiler vid testkörning och återanvänder F3-funktioner under `tests/`; ingen aktiv app-kod byts ut.
2. **Källor har olika status.** En registrerad URL utgör inte självständigt belägg för varje slutsats; inga nya forskningsomdömen har gjorts.
3. **O067:s originaldatering** förblir markerad med oklar tidskategori medan C7:s bevarade textvittne får en egen tidskategori. **D001/B001** skiljer texttillkomst från berättad tid. `topic:good` och källobjektet får ingen påhittad händelsedatering.
4. Prototypens `Tillbaka till exemplen` är **inte** löfte om återställning av appens tidslinje, sökfilter, karta eller webbläsarhistorik. Det hör till F5.
5. Visning av `post`/`topic`/`source` följer samma läsfamilj, men all specialfunktionalitet, fullständig källfilskatalog, karta, temaspår, `Jämför`, handskriftspresentation och integrerad snabbvy är **inte** färdiga.
6. Den verkliga källbristen i produktionsmodellen `v897` är ännu inte ändrad. En eventuell produktionsfix måste ha en separat utvärdering och ditt godkännande.

## F4:s nästa avgränsade steg

**F4.2**: genomgång av den självständiga granskningsfilen på dator/mobil, justera F2-layout och källstatus efter test, stärk fullständig läsbarhet inklusive bok-/apokryfspecifika avsnitt och relationers proveniens. **F4.3**: samlad UI-acceptans innan eventuell F5-integration; F4:s testbranch får inte sammanfogas eller aktiveras utan uttryckligt godkännande.

## Godkännandepunkt

**F4.1 är endast en test- och prototypleverans.** Separat F4-CI och granskningsfil ska valideras innan användaren får ett godkännandeförslag. Inga produktionsändringar.
