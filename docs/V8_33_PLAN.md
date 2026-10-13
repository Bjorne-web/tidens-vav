# V8.33 – forskningskvalitet och integrationsförberedelser

## Utgångsläge
V8.32 är godkänd av användaren och ligger på `main`. C3 (grafisk kontext i Temaspår) och C5 (intervallreglaget) är godkända genom användartest. C6 (vetenskaplig slutgranskning) återstår.

## Prioritet 1 – C6
- Inventera alla forskningsposter och deras källhänvisningar.
- Skilj mellan ursprungspost, forskningsrekonstruktion och traditionell tolkning.
- Dokumentera per post: id, granskade påståenden, datumsort, primärkällor, sekundärkällor, forskningsläge, status, återstående brister.
- Märk inte en post som slutgranskad utan sakligt dokumenterad kontroll.
- Publicera en spårbar sammanfattning över granskade och ännu ogranskade poster.

## Prioritet 2 – stabil integrationsförberedelse
- Behåll Tidens väv som fristående kostnadsfri webbapp.
- Dokumentera permanenta, stabila post-ID:n och stöd för framtida djuplänkar.
- The World Behind the Word blir framtida huvudplattform, men bibeltexten ska inte bestämma världshistoriens struktur.
- Separera evidensklassificering från relationstyper och ge källor per påstående.

## Releasekrav
- Gör inga större förändringar av Temaspår utan särskild granskning.
- Validera kod och dataladdning innan Preview.
- Godkänn inte produktion utan användartest av berörda användarflöden.
- Hosting och tekniska beroenden ska inte kräva extra löpande kostnader.

## Inventering genomförd 2026-10-13
- 193 poster inventerade i `V8_33_POSTINVENTERING.csv`: 129 originalposter (O) och 64 bearbetade tidslinjeposter (H).
- Samtliga 129 originalposter har en post i `allOriginalResearchV828`; detta är **innehållstäckning, inte vetenskapligt godkännande**.
- 38 av 64 bearbetade poster har tomt direktfält `source`; kontrollera andra forskningsreferenser innan slutsats om saknade källor.
- 23 bearbetade poster har äldre `reviewed: true`. Dessa är **inte** automatiskt slutgranskade enligt V8.33-kraven.
- Ingen post har i detta steg fått status vetenskapligt slutgranskad.
- Se maskinläsbar sammanfattning `V8_33_INVENTERING.json`.

## Nästa sakgranskning
Börja med poster där direktkällan saknas och förankra textpåståenden i verifierbara primär- och sekundärkällor. Undvik att jämställa ett tillgängligt allmänt uppslagsverk med en primärkälla.
