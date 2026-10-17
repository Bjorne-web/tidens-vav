# Vetenskaplig slutgranskning – Tidens väv

Status: **pågår, inte färdig**. Ingen forskningspost får betecknas slutgranskad enbart för att den har en forskningsöversikt eller länk.

## Arbetsmetod per post

| Kontroll | Vad kontrolleras? |
|---|---|
| Identitet och kategori | ID, rubrik och kategori mot ursprungspost |
| Typ av datering | Berättad tid, texttillkomst, redaktion eller bevarat textvittne – skiljs åt |
| Tidsintervall | Relevant dateringsargument och rimlig osäkerhet |
| Primärkällor | Belägg från föremål, inskrifter och antika texter |
| Forskning | Relevanta vetenskapliga publikationer och skilda positioner |
| Samband | Direkt belagt, indirekt möjliggjort, jämförbar likhet eller hypotetisk påverkan |
| Intern konsekvens | Jämförelse med andra poster och kronologin |
| Slutsats | Explicit resultat och kvarstående begränsningar |

## Obligatoriskt vid varje ny post – religionshistorisk betydelse (från 2026-10-17)

Varje ny forskningspost ska **samtidigt** ha en individuell, källbelagd analys som visas i läsfönstret under rubriken **Betydelse för Israels religion, judendomen och kristendomen**. Posten får inte godkännas eller publiceras med tomt fält, standardsvar eller hänvisningen att betydelsen återstår att granska.

Fältet registreras normalt i `data/c7-religionshistorisk-betydelse.v890.js` under samma post-ID. `v839-reader-unified.js` hämtar texten från C7-fältet (eller ett individuellt källförankrat `religion`-fält). En artikeltext under `research[id].overview` eller `parallels` ersätter **inte** denna rubrik.

Texten ska sakligt skilja mellan (1) betydelsen för äldre israelitisk religion, (2) judisk text- och religionshistoria och (3) kristendomens idé- och tolkningshistoria. Beskriv när en faktisk påverkan är belagd och när kopplingen endast är *senare reception, jämförelse eller traditionell tolkning*. Om ett ämne uppstod senare än Israels religion, skriv uttryckligen att direkt inflytande saknas och förklara varför. Använd minst två relevanta, prövbara primär- eller forskningskällor med kortfattad källangivelse. Ge hellre en avgränsad ärlig bedömning än en skenbart allmängiltig slutsats.

**Godkännandegrind:** `node tests/new-post-religion-gate.mjs` kontrollerar nytillkomna forskningsposter som laddas av appen före initiering: alla måste ha individuell nivå, betydande text och källor. `node tests/smoke-c7.mjs` prövar dessutom att rubrik och innehåll faktiskt renderas i läsfönstret. Båda körs vid pull request. Försök aldrig kringgå grinden genom att utöka listan över historiska undantag.

**Tidigare publicerade poster att komplettera retroaktivt:** H066–H067 (Lilith) och AP001–AP006 (apokryferna) saknar ännu C7-bedömningar. De utgör en uttryckligt dokumenterad granskningsskuld, **inte** en norm för nya poster. Även övrigt äldre bestånd behöver systematisk C7-genomgång.

## Tillåtna granskningsstatusar

- **Ej granskad:** Inget dokumenterat kontrollarbete.
- **Granskning pågår:** Minst en kontroll dokumenterad men öppna frågor kvarstår.
- **Slutgranskad mot angivna källor:** Samtliga relevanta kontroller dokumenterade med prövbara referenser och redovisad osäkerhet.

## Granskningsjournal

| Post-ID | Post | Status | Genomförd källkontroll | Återstår |
|---|---|---|---|---|
| – | – | Ej granskad | Ingen postvis källkontroll har dokumenterats i denna V8.32-ändring. | Samtliga poster genomgås systematiskt. |

## Ändringshistorik

- V8.32: Journal och kriterier inrättade. Ingen post markerad som vetenskapligt slutgranskad.
