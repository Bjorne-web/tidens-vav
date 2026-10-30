# F3 – Samlad C7-kedja och normalisering av tidstyper

**Datum:** 30 oktober 2026  
**Status:** Test- och analysunderlag, inte godkänd integration. PR #378 får inte sammanfogas utan uttryckligt godkännande.

## 1. Varför den senaste utökningen behövdes
I appens `index.html` finns **37 C7-filer för religionshistorisk betydelse** och **78 C7-dateringsfiler**, utöver övriga forskningsregister. Det räcker inte att läsa grundfilen eller den första C7-filen: senare kompletteringar kan ge nya eller ändrade värden för samma ID.

`tests/f3-all-c7-layer-chain.test.cjs` laddar varje sådan fil i **samma ordning som appen**, i en separat Node VM, och kontrollerar:
- Att senare C7-betydelsefiler bevarar tidigare poster (inga oavsiktliga bortfall).
- Hur många nya poster/omskrivningar som följer av kedjan, och vilken fil som senast skrev ett fält.
- Vilka egna C7-dateringsregister och post-ID:n som faktiskt används.
- Vilka råa `timeType`-värden som finns, inklusive ej mappade varianter och odaterade poster.
- Att ett bevarat textvittne hålls isär från ett odokumenterat uppkomstår.

## 2. Viktig ny insikt – olika etiketter för samma tidstyp
Tidigare F3-testkod utgick från `event` och `composition`. Verkliga C7-filer använder bland annat:
- `historical-event` → intern kanonisk kategori `event`.
- `text-composition` → intern kanonisk kategori `composition`.
- `material-witness` → förblir `material-witness`.
- `narrative` → `narrative`, när det uttryckligen finns.

**Både originalbeteckning och normaliserad kategori behålls.** Okända `timeType`-värden hamnar i en särskild lista `unclassified` – de kastas inte bort och förvandlas inte automatiskt till historiska händelser. Full täckning kräver inspektion av samtliga råa C7-typer innan produktionskoppling.

## 2.1 Verifierat utfall från verklig GitHub Actions-körning
Det separata F3-jobbet i PR #378 slutfördes 30 oktober med följande resultat:
- **37** religionshistoriska C7-filer lästes; **202** unika poster fanns kvar efter kedjan, **0** innehållsöverskrivningar mellan filerna.
- **78** C7-dateringsfiler lästes; **82** unika post-ID:n identifierades i registren.
- **78** daterade faser rapporterades. De råa tidsbeteckningarna var: `historical-event` **41**, `historical-period` **2**, `material-witness` **25**, `text-composition` **9**, `textual-chronology` **1**.
- De två sistnämnda specialfallen `historical-period` och `textual-chronology` har därefter förts in som **egna** semantiska kategorier i F3-testmodellen, inte blandats ihop med händelse- eller tillkomstår. Senaste ändringen kräver egen grön CI-körning.
- Auditens **202** gäller C7:s sammanfogade betydelseposter, inte en uppskattning av hur många historiska händelser som finns totalt i appen.

**Viktigt fel i befintlig läsmodell:** `v897-research-read-model.js` skapar `postProvenance=Object.freeze({...provenance})` **innan** den anropar `pick()` för sammanfattning, kontext, betydelse och begränsningar. Det exporterade objektet saknar därför fältens faktiskt valda ursprung, även om `pick()` internt registrerar dessa. Felet bekräftades med verkliga O073/O030-poster i det separata F3-testet. Produktionskoden är ännu inte ändrad.

**Ny isolerad F3-pilot:** `tests/f3-evidence-assembly.cjs` bygger ett read-only-forskningsobjekt med separata källanspråk, bevarade omarkerade originaldateringar och typade C7-faser. Tester använder O067, B001 och O030 från aktuella datafiler. Detta är **inte** en fullständig produktionsadapter och läser ännu inte alla objekttyper/fält.

## 3. Textvariation är inte automatiskt forskningskonflikt
`classifyTextVariants` i det isolerade testbiblioteket använder tre konservativa utfall:
1. `identical`: texten är densamma i jämförda lager.
2. `editorial-extension-candidate`: en text börjar med hela den andra och kan vara en utökad redaktionell version.
3. `requires-semantic-review`: texterna skiljer sig på annat sätt och måste jämföras sakligt.

Detta är **teknisk sortering**, inte vetenskaplig evidensbedömning. Både förkortningar och omskrivningar kan ändra betydelse; en längre text är inte automatiskt bättre. En verklig saklig motsägelse får först markeras efter att samma referent, påstående, tidstyp och belägg jämförts.

Verifieringsfall: `O073.summary` = möjlig redaktionell utökning; `O030.summary` = semantisk mänsklig granskning krävs.

## 4. Kvar före F3-godkännande
- Genomförda CI-kontroller på **senaste** testversionen, inklusive C7-kedjan; analysera eventuella testfel.
- Dokumentera alla identifierade tidsbeteckningar och C7-överskrivningar i kodens faktiska laddningsordning.
- Slå fast proveniensmodell för C7:s `religion` och separata dateringsfaser, samt uttryckliga fältregler för verkliga konflikter.
- Bekräfta att formell F3-acceptans bygger på godkända tester och bevarade specialläsare, inte på att produktionen har fått en ny modell.

**Inga ändringar** i `index.html`, `v897-research-read-model.js`, C7-källfiler eller produktionslayout görs i detta teststeg.
