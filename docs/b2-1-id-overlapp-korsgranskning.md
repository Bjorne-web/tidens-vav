# B2.1 – Korsgranskning av postidentitet och forskningsberikningar

Datum: 2026-10-20. **Delrapport 2**, dokumentation utan ändring i UI eller data.

## Verifierat i `data/data.generated.js`
- `events`: **64 unika H-ID:n**.
- `originalEvents`: **129 unika O-ID:n**.
- `allOriginalResearchV828`: **129 nycklar**.
- Korsmängd mellan H-ID och O-ID: **0**.
- Korsmängd mellan O-ID och forskningsnycklarna: **129 av 129**.
- Forskningsnycklar utan motsvarande O-post: **0**.

**Slutsats:** De 129 forskningsobjekten ska behandlas som forskningsberikningar av 129 redan befintliga O-poster, **inte** som 129 nya poster.

## Kontroller av senare C7
Senare separata filer finns åtminstone till `data/c7-religionshistorisk-betydelse.v8131.js` (omgång 37). Dessa innehåller kompletterande forskningsresonemang nycklade med O-ID:n, t.ex. O127. Filer för ämnesidentitet, såsom `data/o127-o130-identity.v8129.js`, ändrar presentationen av befintliga O-poster och kräver samma ID-bevarande i migreringen.

C7-täckningen är **ännu inte fullständigt kartlagd och räknad**. Inga slutsatser om antalet slutgranskade poster dras här.

## Kända övriga postserier
- B001–B066, 66 bibelböcker.
- D001–D011, 11 apokryfiska böcker.
- AP001–AP006, sex tematiska apokryfposter (separata från D).
- `bibleOriginal`: 36 äldre bibelposter utan samma `id`-schema; tilldela **inte** nya ID:n förrän likhet och relation till B/H/O är bedömd.

## Arbetsregel för kategoriombyggnaden
- En post har **ett stabilt kanoniskt ID**. Berikningar, forskningsgranskningar, bilder och alternativa rubriker knyts till detta ID och får inte räknas som separata historiska poster.
- Identifiera innehållskategori på forskningsposten, inte på antalet separata skriptfiler.
- Behåll gamla kategori-/filternamn och årtal som spårbara metadata under övergången.
- Klassificera inte tvetydiga poster maskinellt som säkra, utan markera dem för manuell granskning.

## Lägeskontroll efter denna uppdatering
| Delmoment | Status |
| --- | --- |
| B2.1 – Identifiera grundserier | Verifierat |
| B2.1 – O-poster kontra forskningsberikningar | Verifierat, 129/129 |
| B2.1 – Samtliga senare C7-tillägg, B/D/AP och äldre `bibleOriginal` | Fortsatt kontroll återstår |
| B2.2 – Fyra huvudområden och filterdimensioner | Arkitekturförslag finns, inte slutgodkänt |
| B2.3 – Read-only klassificeringsadapter | Ej påbörjad |
| B2.4 – Ny filterpanel | Ej påbörjad |
| B3 – Gemensamma bildhuvuden | Ej påbörjad |
| C – Koppling mellan vyer | Pausad |

Nästa steg: generera en **reproducerbar ID- och källtäckningsrapport** över senare C7-filer, B/D/AP och tvetydiga äldre bibelposter innan första klassificeringsadapter implementeras.
