# F3 – Faktisk överlappningsaudit av forskningsfält

**Datum:** 2026-10-29  
**Status:** Reproducerbar, isolerad kontroll. **Ingen produktionsintegration och inget vetenskapligt beslut om motstridiga källor.**

## Metod
`tests/f3-actual-overlap-audit.test.cjs` läser direkt ur `data/data.generated.js` och jämför de fem datalager som finns där och som ingår i den befintliga läsmodellens urval: `allOriginalResearchV828`, `sourceCardsV86`, `sourceCardsV810`, `sourceCardsV87`, `research`. För varje ID jämförs icke-tomma strängfält av samma namn. Dessutom körs befintlig `v897-research-read-model.js` mot en isolerad kopia av de verkliga lagren och en faktisk grundpost.

**Avgränsning:** Dessa fem lager är inte hela appens forskningsmaterial. `TIDENS_SPECIAL_RESEARCH`, `v82Library`, separata C7-kompletteringar, bibel- och apokryfspecialregister samt revisions-/dateringsjournaler behöver egen motsvarande audit. Identiska teckensträngar bevisar inte att två källor oberoende styrker påståendet.

## Utfall i de fem inventerade lagren
| Fält | Poster med >=2 värden | Textidentiska | Olika textvärden |
|---|---:|---:|---:|
| `summary` | 32 | 31 | 1 |
| `context` | 32 | 32 | 0 |
| `heading` | 32 | 32 | 0 |
| `limits` | 32 | 32 | 0 |
| `impact` | 0 | 0 | 0 |

**Enda observerade olika textversionen:** `O073` (Sargons födelselegend), fält `summary`: `allOriginalResearchV828` innehåller en längre version som börjar med exakt samma text som den kortare versionen i `sourceCardsV810`. Den längre texten lägger till en jämförelse med Moseberättelsen. Detta är en **redaktionell längd-/omfångsvariant**, inte en i audit belagd saklig motsägelse.

## Läsmodellens faktiskt observerade beteende
`v897-research-read-model.js` väljer den längre `O073.summary` från `allOriginalResearchV828` eftersom lagret ligger tidigare i den fasta prioriteringsordningen. Den väljer texten från `original` enligt sin kodade lagerordning, men **exporterar inte denna fältproveniens**: `postProvenance` skapas innan `pick()` fyller `provenance`. Den ger inte heller läsaren den kortare textvarianten. Den isolerade F3-konfliktmodellen flaggar två olika strängvärden och kräver separat beslut innan val, men får **inte** tolkas som bevis för innehållslig konflikt.

## Rekommenderad distinktion inför slutlig F3
1. **Textidentisk dubblering:** behåll båda lagrens ursprung utan konfliktsignal.
2. **Redaktionell variant:** visa vilken text som används och att alternativ finns; inte nödvändigtvis vetenskaplig motsägelse.
3. **Saklig motsägelse:** kräver semantisk prövning av samma påstående, samma datumtyp, samma referent och belägg; kan inte automatiskt fastställas utifrån olika strängar.
4. **Kompletterande fält:** C7:s särskilda religionshistoriska betydelse och dateringsfas ska få tydlig egen proveniens, inte konkurrera med helt andra fält.
5. **Olika tidsbegrepp:** separat `event`, `composition`, `narrative`, `material-witness`; de ska inte genom simpla jämförelser utlösa falska konflikter.

## Kvarstående kontrollpunkter
- Identifiera och ladda samtliga särskilda produktionslager som inte ingår i denna audit; kontrollera deras överlappningar per faktisk post och fält.
- Dokumentera en explicit redaktionell beslutsmodell för `duplicate`/`editorial-variant`/`substantive-conflict`/`different-semantic-field`, så att UI inte påstår att varje textskillnad är saklig motsägelse.
- Säkerställ att nya proveniensfält inte ger ut sken av källkritisk granskning som inte utförts.
- Formellt F3-godkännande krävs före merge/aktivering av forskningmodell i produktionsappen.

**GitHub-PR:** #378; dokument och tester ska stanna i arbetsgrenen tills separat godkännande. Ingen befintlig kod i appens `index.html`, `v897` eller C7-data ändras.

## Tillägg: separat speciallager, O030 (Zoroastrismen)
Den reproducibla kontrollen har utökats med `tests/f3-special-layer-runtime.test.cjs`. Den laddar `data/special-research.v840.js`, `allOriginalResearchV828`, C7:s särskilda religionshistoriska betydelsetexter och O067:s dateringsfil i isolerad VM, och kör verkliga `v897` mot dessa.

- **O030:** `TIDENS_SPECIAL_RESEARCH.O030.summary` och `allOriginalResearchV828.O030.summary` är olika textvärden. Nuvarande `v897` väljer speciallagrets sammanfattning men **saknar det utlovade lagernamnet i sitt exporterade `provenance`-objekt**, och visar inte originalversionen som alternativ. Detta är ännu **inte** en semantiskt fastställd vetenskaplig motsägelse.
- **B001:** C7:s religionshistoriska betydelsetext följer med som `religion` men inte med explicit lagernamn i `provenance`.
- **O067:** C7:s `material-witness`-fas kan laddas och har eget tidsslag, men nuvarande generella `temporal` visar endast grundpostens start/slut.

Tabellens 32 poster och överlappningsantal gäller fortfarande **endast de fem ursprungligen undersökta lagren**. O030 är ett *ytterligare* speciallagerfall och ska inte räknas in i denna tabell utan en ny systematisk helhetskörning. Inget redaktionellt företrädesbeslut har fattats.
