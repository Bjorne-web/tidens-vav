# V8.46 – inventering av aktiva importberoenden

Väven har 64 forskningsposter (H-ID) och 129 äldre importposter (O-ID). De 129 får inte automatiskt en vetenskaplig status genom att de används av gränssnittet. Samtliga 193 ID:n bevaras tills ett fullständigt migreringsbeslut kan testas.

## Identifierade funktioner som fortfarande läser originalEvents
- `idEvent()`: gemensam uppslagning av poster för läsning och relationer.
- `renderArchive()`: sortering, kategorisering och sökning i originalarkivet.
- `allTimelineEvents`: sammanslagning för äldre tidslinjelägen.
- `v813` och `v814`: genererar vissa daterade historiska faser med data från originalposter.
- Universalsökningen: innehåller originalposter och öppnar dem via arkivet.
- Käll- och forskningskatalogen: dokumenterade individuella forskningsunderlag knyts till original-ID.
- Täckningspanelen: visar hur många originalposter som har individuellt forskningsunderlag.

## Beslutad utfasningsordning
1. Identifiera den källgranskade ersättaren för varje importerad post, med bibehållet stabilt ID eller explicit ID-mappning.
2. Migrera användning i historiska faser, sökning, relationer, karta och läspanel till oberoende källstrukturer.
3. Verifiera de fem historiska tidsnivåerna och granskningsstatusen.
4. Kontrollera att tidslinjen, mobilvyn, Temaspår och sidopanelen fungerar.
5. Koppla bort dataimporten först när inga aktiva funktioner längre beror på den. Bevara revisionshistorik utanför produktionsdata.

## Status vid V8.46
| Arbetsmoment | Status |
|---|---:|
| Strukturellt inventerade poster | 193 / 193 |
| Poster med C6-delgranskningsrapporter | 36 / 193 |
| Poster med registrerade påståendekontroller | 15 / 193 |
| Införda textförtydliganden | 11 / 11 |
| Fullständigt vetenskapligt slutgranskade | 0 / 193 |

Nästa tekniska etapp bör börja med att ersätta uppslagningen av importerade poster i den publika universalsökningen, först när separata forskningskatalogposter innehåller fullständig motsvarande information. Fram till dess är borttagning inte säker.
