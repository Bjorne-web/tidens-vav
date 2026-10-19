# Forskningsvy – läsmodellens datakontroll, pilot

**Datum:** 2026-10-19  
**Gren:** `v897-research-read-model-pilot-20261019` / PR #128  
**Status:** Statisk datakontroll genomförd; körtest och UI-regression återstår.

## Verifierad inventering av separata bokregister

| Kontroll | 66 bibelböcker (B001–B066) | 11 apokryfiska bokposter (D001–D011) |
|---|---:|---:|
| Antal poster | 66 | 11 |
| Dubbla ID inom register | 0 | 0 |
| `critical` (källkritisk introduktion) | 66 | 11 |
| `dateType` | 66 | 11 |
| `narrativeTime` | 66 | 11 |
| `reviewStatus` | 66 | 11 |
| `primary`-textlänk | 0 | 11 |
| Källposter i `sources` | 0 | 22 |

Kontrollen baseras på faktiska data i `data/bible-books-v857.js` och `data/apocrypha-books-v891.js`. Avsaknad av källposter i bibelboksregistret är **inte** ett bevis för att källor saknas i andra lager.

## Genomförda korrigeringar i read-only-adaptern

1. Accepterar även apokryfernas D-serie och identifierar undertyp från **faktiskt registerinnehåll**.
2. Hämtar äldre lexikala forskningsobjekt där de inte exponeras på `window`.
3. Använder `critical` som sista alternativ för kort introduktion om övrig sammanfattning saknas.
4. Bevarar båda typerna av apokryfiska textlänkar: `sources` samt `primary`, med URL-deduplicering.
5. Bevarar fältet `dateType` så att preliminär tillkomst skiljs från berättad tid.
6. Lägger till `diagnose(ids)` som läser utan att ändra UI eller data; religionshistoriska kommentarer behandlas både som objekt och text utan att sprida tecken som objektegenskaper.

## Körtest som **återstår**

I aktiv webbläsare för PR-preview:

```js
TidensResearchReadModel.diagnose(['H005','H045','B001','D001','AP001'])
```

Kontrollera särskilt: hittas alla fem i körning? Har H005/H045 den väntade kontexten och relevanta källor? Får B001 undertyp `bible-book`, D001 `apocrypha-book`? Är `reviewStatus` preliminärt där det ska vara det? Finns källor/källproveniens i H-poster? Förekommer C7-religionshistorisk betydelse där den är registrerad?

Öppna sedan appens nuvarande läsarpanel från Tidslinje, Karta, Temaspår och Jämför och kontrollera att den fungerar som tidigare. Panorering, Gantt-hjälplinjer, Bibelns böcker och apokryferna ska också fungera oförändrat.

**Resultatet i tabellen ovan är statisk datakontroll, inte en bekräftad end-to-end-verifiering av JavaScript-körning.**

## Nästa grind

Bygg snabbfönstret först efter verifierat beteende i webbläsare och att källprioritet/proveniens för minst en H-post och en C7-post har granskats.
