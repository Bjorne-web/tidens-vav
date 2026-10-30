# F3 – Ämnesfrågor och källobjekt i den gemensamma forskningsmodellen

**Datum:** 30 oktober 2026  
**Status:** Separat, testbar modell i PR #378. Ingen kod är inkopplad i produktionsappen.

## Kontrollerade verkliga underlag
- `v889-research-tracks.js` innehåller ett **`good`**-spår med rubriken *Är Gud god?*, introduktion, **tre** resonerande avsnitt, två befintliga postlänkar (`O119`, `O030`) och externa referenser till *Stanford Encyclopedia of Philosophy*. Innehållet ligger idag i en renderingsmodul och är **inte** ett självständigt, kanoniskt datalager.
- `data/church-shifts.v892.js` har andra ämnesnycklar, som `heliocentrism` och `sexuality`, med rubriker och beskrivningar; daterade milstolpar finns som **separata händelser**, inte som datum på själva frågan.
- `data/data.generated.js` / `archaeologyCasesV818` har ett arkeologiskt jämförelsefall **A01** om Amarnabreven. Dess `sources[0]` har titel, URL, `type` och fältet `supports` som preciserar **vilken utsaga** referensen används till. `type:'research'` är källfilens etikett och får inte tyst omdefinieras till primärfynd/oberoende evidens.
- De existerande `post`-objektens original-ID:n förblir oförändrade. `topic` och `source` är separat namngivna objekt och förvandlas inte till daterade tidslinjeposter.

## Modellkontrakt och identitet
**Topic (frågeställning/område):** `topic:<befintlig-ämnesnyckel>`, exempelvis `topic:good`. `kind:'topic'`, rubrik, frågebeskrivning, avsnitt, källreferenser och typade relationer till befintliga poster. `temporal:null` för ämnet självt. Undereventens datum kopplas bara genom referenser och förblir självständiga.

**Source (identifierad källreferens):** `source:<normaliserad-http(s)-URL>` ger deterministisk identitet utan en ny parallell databas. Ursprunglig titel, källfil, eventuell typetikett och källanvändning (post-/fall-ID, precis `supports`-text) följer med. `independentlyVerified:false` betyder i denna prototyp bara att en referenslänk **inte i sig** utgör oberoende bevis. Ingen annan forskningsklassning eller föremålsdatering antas.

**Relation:** `from`, `to`, `relationType`, `rationale`, `origin` och eventuella explicit uppgivna evidensreferenser. En allmän klickbar länk betecknas `links-post`; ett arkeologiskt källkort som återges av ett fall betecknas `cited-by`. Ingendera likställs med bevisad historisk påverkan.

**Begränsningar:**
- URL som identifierare är en första läsbart deterministisk nyckel. Samma publikation kan ha flera URL:er eller olika upplagor och kräva en senare beslutad identitetsstrategi. Inga sammanslagningar mellan olika URL:er görs utan metadata.
- Topic-ID `topic:good` ligger *utanför* den befintliga `v897`-postadaptern som accepterar post-ID:n. Inga äldre djuplänkar ändras i F3; en framtida url-/navigeringsbrygga är F5.
- F3 läser verkligt spårinnehåll i testmiljö, men dagens `good`-innehåll är fortfarande implementerat i en renderingsmodul. En eventuell flytt till kanoniskt register får inte göras utan migrations- och regressionskontroll.
- Source-objektet är en **referens** och inte ett påstående om att ett föremål i museet bevisar varje slutsats som står i den länkade forskningsposten.

## Kontroll- och teststatus
`tests/f3-topic-source-contract.cjs` är en ren, frusen kontraktsmodell. `tests/f3-topic-source-contract.test.cjs` hämtar de faktiska objekten från `v889-research-tracks.js` respektive `archaeologyCasesV818` via en avgränsad testläsning; kontrollerar frågans odaterade status, befintliga O119/O030-relationer, referens-URL:er, preciserade källanspråk, säkra URL:er och oförändrade originaldata.

**Ingen produktionskod i `index.html`, `v897`, `v889` eller C7 har ändrats.** PR #378 förblir öppen för separat F3-granskning och godkännande. F4/F5 har inte startats.
