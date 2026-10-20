# Etapp B2.1 – inventering av äldre och senare postkällor

Datum: 2026-10-20. Detta är en verifierad **delinventering**, inte Vävens slutliga unika postantal.

## Verifierade datakällor
| Källa | Antal | ID-kontroll | Anmärkning |
|---|---:|---|---|
| `events` i `data/data.generated.js` | 64 | 64 unika ID i serien | Fem lagrade kategorier |
| `originalEvents` i samma fil | 129 | 129 unika ID i serien | Åtta lagrade kategorier |
| `bibleOriginal` i samma fil | 36 | Använder inte samma post-ID-schema | Ej räkna som 35 dubbletter bara för att `id` saknas |
| `allOriginalResearchV828` | 129 nycklar | Nycklat objekt, ej array | Kräver korsjämförelse med `originalEvents` |
| `data/bible-books-v857.js` | 66 B-poster | 66 unika ID | Bibelbok, textens tillkomst |
| `data/apocrypha-books-v891.js` | 11 D-poster | 11 unika ID | Apokryfa böcker |
| `data/apokryfer-granskning3.v888.js` | 6 AP-poster | 6 unika ID | Tematiska apokryfposter, inte samma sak som D-serien |

**OBS:** Summan av ovanstående är inte en säker totalsiffra. Vissa objekt är forskningsberikningar av samma poster och flera C6/C7-inlägg tillkommer. Serien `bibleOriginal` måste identifieras efter sitt faktiska nyckelschema, inte efter ett påhittat `id`.

## Var står migrationsarbetet?
- **B2.1 – Datakällsinventering:** Pågår. Ovanstående källor verifierade; resterande C7 och korsjämförelse saknas.
- **B2.2 – Klassificeringsregler:** Preliminär modell i PR #180. Behöver beslut om blandade och flerdimensionella poster.
- **B2.3 – Read-only klassificeringsadapter:** Inte påbörjad.
- **B2.4 – Ny filterpanel:** Inte påbörjad.
- **B3 – Gemensamma bildhuvuden:** Inte påbörjad; skydda godkänt landskapsfoto.
- **C – Vidare integration:** Pausad enligt beslut.

## Nästa uppdatering
Inventera samtliga ID-serier och senare forskningsskript samt jämför dubbletter mellan `events`, `originalEvents`, `allOriginalResearchV828`, B/D/AP och C7. Skapa maskinellt reproducerbart test för att skilja unika poster från forskningsberikningar innan klassificering.

Inga befintliga forskningsdata, filter, layout, ikoner eller historiska datum ändras i denna PR.
