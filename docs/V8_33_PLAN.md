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


## Beslutad omfattning: färdigställ hela C6 som ett sammanhållet uppdrag
Användaren har begärt att V8.33 ska drivas som en fullständig vetenskaplig slutgranskning och inte avrapporteras efter varje enskild liten grupp. Detta är prioriterat framför nya funktioner och separat integrationsutveckling.

**Omfattning:** samtliga 64 bearbetade tidslinjeposter och samtliga 129 originalposter inklusive forskningsfördjupningar, samt övergripande kronologi och de viktigaste korshänvisningarna.

### Obligatorisk prövning per post
1. Bryt ut prövbara historiska påståenden och skilj dem från förklarande och teologiskt språk.
2. Särskilj berättad tid, händelsedatering, textkomposition, redaktion och bevarat textvittne.
3. Verifiera central arkeologi och primärtexter mot föremålskatalog, edition eller inskrift när tillämpligt.
4. Kontrollera tolkning och datering mot relevant vetenskaplig sekundärlitteratur; redovisa när forskare är oense.
5. Märk historiska samband enligt typ och evidens, så textlikhet inte automatiskt blir direkt påverkan.
6. Jämför med andra poster så kategorier, årtal och formuleringar inte motsäger varandra.
7. Korrigera brister i källmaterialet och dokumentera både åtgärd och kvarstående begränsning.

### Acceptanskriterier
- Ett tydligt statusfält per post med individuellt dokumenterade kontroller; äldre `reviewed: true` räknas inte som godkännande.
- Inget samlat påstående om slutgranskning förrän alla 193 poster faktiskt passerat kontrollerna.
- En gemensam slutrapport med korrigerade poster, kvarstående öppna frågor och källförteckning.
- Nya fakta kräver granskningsbara referenser; formuleringar av typen ”enligt forskningen” utan källstöd måste förtydligas.
- Produktion V8.32 ändras inte före genomgång, teknisk Preview-testning och användarens godkännande.

### Genomförandebegränsning
Granskningen utförs endast i aktiva arbetspass. En GitHub-branch eller plan innebär inte att arbete fortsätter obevakat i bakgrunden. Dokumentera faktiskt uppnådda kontroller; lova inte kvalitetssäkring som inte är genomförd.

## Källkontroll 02 dokumenterad 2026-10-13
- H002, H003, H006, H007 och H011 delvis källkontrollerade mot British Museum, Metropolitan Museum of Art, Louvre och University of Chicago.
- Dokumentation: `docs/V8_33_KALLKONTROLL_02.md`.
- Sammanlagt åtta poster har nu dokumenterade delkontroller i omgång 01–02; inga poster markeras slutgranskade.
- Återstår bland annat genomgång av H008–H010, H012, specialistlitteratur för H006 samt fullständig kontroll av O-poster.

## Källkontroll 03 dokumenterad 2026-10-13
- H008, H009, H010, H012 och H013 genomgångna på delpåståendenivå: se `docs/V8_33_KALLKONTROLL_03.md`.
- 13 av 193 poster har nu dokumenterade delkontroller, 0 slutgranskade.
- Prioriterade öppna frågor: berättad kontra belagd tid för Abraham och uttåget, senbronsålderns vassalstater, etnicitet i höglandsbosättningar och innebörden av Tel Dan-inskriften.
