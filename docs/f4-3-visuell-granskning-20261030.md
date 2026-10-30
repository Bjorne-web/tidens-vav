# F4.3 – Visuell granskning mot godkänd F2-design

**Datum:** 30 oktober 2026  
**Status:** Kvalitativ granskning utförd på sex verkliga F4.2-skärmbilder. Justeringar i separat F4-testgren; godkännande av hela F4 eller produktion **saknas**.

## Granskningsunderlag
- F2:s godkända designkontrakt (`docs/f2-fullstandig-forskningsvy-design-20261029.md`).
- Verkliga skärmbilder från F4.2:s GitHub Actions-artefakt med dator 1440×1000 (H045, O067, Amarnabreven som källobjekt) och mobil 390×844 (B001, D001, `topic:good`).
- Aktuell appdesign, särskilt `v887-home-areas.css`, `v905-design-foundation.css`, `v895-research-visual-unification.css` och `v917-compare-design-parity.css`.

## Kvalitativ visuell slutsats
**Positivt:** Skärmbilderna visar läsbar typografi, begriplig sektionering, tydligt skilda dateringsbegrepp och öppet markerade forskningsreservationer. På dator går det att läsa forskningsinnehållet med innehållsmeny och en separat sambandsyta. Mobilen har en enkel innehållsknapp och ingen täckande sidopanel. Automatiska Chrome-tester bekräftade inget horisontellt överflöde i de sex fallen.

**Identifierade och åtgärdade problem:**
1. **Dubblerad introduktion:** B001/D001 och `topic:good` visade samma inledning både i huvudkort och i avsnittet Översikt. Prototypen visar nu avsnittet endast om det innehåller en annan registrerad sammanfattning; H045 behåller en egen sakligt distinkt översikt.
2. **Felaktig datumförväntan:** Tema och separat källreferens hade ett generiskt Tid och datering-avsnitt trots att de inte är historiska händelser. Det utelämnas nu.
3. **Onödigt hård fokusram:** Programmatisk fokus på rubrik syntes som en tjock ruta. Nu används en diskret men synlig markering som fortfarande gör tangentbordsfokus upptäckbart.
4. **Onödigt lång statustext:** Forskningsstatus formuleras kortare men saknad granskningsstatus förblir explicit.
5. **Saknade originalområdesfärger:** Den ursprungliga testprototypen använde bara turkos. Nu används färgerna direkt från `v887-home-areas.css`: Bibeln `#347ccb`, Religioner `#9465bf`, Världshistoria `#259779`, Filosofi/idéer `#b17929`.
6. **Engelsk statusetikett:** `draft` visas som `Forskningsutkast`, medan originalvärdet i forskningsmodellen är oförändrat.

## Fortsatt avstånd till F2:s fullständiga design
- Prototypen har **inte** appens gemensamma landskapsbild `Start-hero.png`, samma huvudrad som på de sex godkända flikarna eller original-SVG-ikonerna. F2 säger att den fullständiga forskningsvyn ska ligga i befintlig vyfamilj, inte bli en sjunde huvudflik. **Ingen separat imitation av huvudmenyn ska därför byggas in i den framtida funktionen.** Anpassningen måste göras när läsaren monteras under godkänd appstruktur och därefter testas visuellt.
- Prototypexemplen täcker endast sex utvalda poster. Den gamla läsarens specialfunktioner, bilder, kartkopplingar, ämnesrelationer och den fullständiga källkatalogen ingår inte.
- Prototypens `Tillbaka till exemplen` bevarar bara lokal katalogkontext. Återgång till rätt vy, filter, kartposition, scroll, webbläsarhistorik och djuplänkar är F5-arbete, och funktioner får inte utlovas före implementation.
- Statusmarkeringarna beskriver *underlagets* granskning, inte en ny vetenskaplig omprövning. Textens historiska slutsatser har inte omprövats genom denna visuella granskning.
- Bilderna verifierar en faktisk Chromium-rendering, inte full användartestning med skärmläsare eller samtliga mobilplattformar.

## Acceptanskriterier inför F4-avslut
1. F4:s isolerade testworkflow och hela PR:ns senaste CI ska vara gröna efter ändringarna.
2. Ny granskningsartefakt med mobil- och datorskärmbilder ska finnas och motsvara slutlig kod.
3. Användaren ska kunna granska fristående HTML utan att publicera eller sammanfoga PR.
4. Den verkliga appens gemensamma huvuddesign, områdesikoner och navigationssammanhang får **inte** brytas av integrationen; detta är en tydlig separat gräns mot F5 och kräver egen visuell regression.
5. F4 får inte beskrivas som integrerad i produktionen bara för att den isolerade förhandsvyn klarat tester.

**Beslut:** F4.3 förbereds för godkännande av dess **isolerade visuella prototyp**; full F4-acceptans och sammanslagning av PR #379 kräver beställarens uttryckliga beslut. PR är draft och produktionen oförändrad.
