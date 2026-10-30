# F5.5 – Första faktiska men oaktiverade läsarkopplingen

**Datum:** 30 oktober 2026  
**PR:** #380 (stackad, utkast), F4-underlag i PR #379.  
**Status:** Testkod mot verklig app, ingen produktionsändring. Godkännande av F5.5 förutsätter grönt separat CI efter senaste commit.

## Vad som verkligen är byggt
F5.5 skapar en **temporär kopia av riktiga appens `index.html`**, inklusive alla ordinarie skript i faktisk laddningsordning. Enbart den temporära kopian får två tillägg i slutet: en genererad datafil med riktiga F4-artiklar och ett testscript för en forskningsvy.

- `tests/f5-generate-real-reader-copy.cjs`: bygger `f5-real-reader-test.html` (raderas efter test) och `out/f5/integration/f5-real-reader-data.js`, med F4:s redan testade HTML för **H045, O067, B001 och D001**.
- `tests/f5-real-reader-bridge.js`: visar F4-artikeln i ett **Shadow DOM-överlägg ovanpå befintliga appen**. Testknappen är synlig **endast i den genererade testkopian**. Den ändrar inte befintlig `view()`, `setSelected()`, snabbfönster, bokläsare, filter eller kartfunktioner. `Shadow DOM` separerar F4-prototypens CSS från den gamla appens CSS och undviker att skapa en sjunde huvudflik.
- Överlägget använder testkopians `history.pushState` med oförändrad URL. **Tillbaka**, Escape och Browser Back använder `history.back` och `popstate` för att stänga överlägget. Efteråt jämför testet C1:s vy, vald post, urval, filter, tidsintervall, fönsterscroll och fokus, samt kartkamera/kartår när de kan avläsas. Dessa värden läses från faktisk appkontext – testet skapar ingen parallell produktionsstate.
- `tests/f5-real-reader-browser.sh`: startar den verkliga HTML-kopian på lokal HTTP och provar **nio Chromium-scenarier**: tidslinje, karta, temaspår, Jämför, forskning, mobil, Browser Back, Första Moseboken och Tobit. Alla förutsätter att rätt F4-HTML verkligen öppnats och att uppmätta före-/eftervärden är lika.
- Separat F5-workflow fortsätter köra F5.1–F5.4, F4 och F3:s regressionstester.

## Riktigt upptäckt kartproblem under F5.5
Den första fullappskörningen underkändes för kartscenariot trots att C1, scroll, kartår, URL och fokus var identiska före/efter: **kamerans centrum/zoom hade förändrats**. Detta berodde på att appens befintliga `v910-cross-view-c2.js` schemalägger automatisk kartcentrering över **två animation frames** vid byte till kartfliken. Det första testet tog därmed en kamerabild **innan** själva appens pågående kartnavigering var färdig.

Det testbara normalflödet har nu ändrats så att appens två `requestAnimationFrame`-anrop och en kort renderingsbuffert får slutföras före artikelöppningen och före dess kontext fångas. Den senare verkliga Chromium-körningen godkände kartscenariot. **Detta bevisar inte att extremt snabb användarinteraktion mitt under pågående automatcentrering är fullt hanterad.** Framtida riktig integrationsadapter måste förhindra eller koordinera denna övergång, inte enbart förlita sig på en testfördröjning.

## Designprincip och viktiga avgränsningar
**F5.5 provar en säkrare möjlig integrationsstrategi: en fullständig forskningsvy som ett överlägg över utgångsvyn, snarare än ett nytt byte av appens globalt valda vy.** Därigenom undviker vi potentiellt förlust av scroll, kartkamera och filter vid själva läsningen. Det betyder inte att vi har löst varje återställningsfall där den underliggande appens globala vy måste bytas.

Det som ännu INTE är färdigt:
1. Det finns **ingen faktisk produktionsknapp** och ingen ändring i `index.html`. Först vid en separat godkänd integrationsfas kan en läsarknapp erbjudas i snabbläsare, tidslinje, poster och andra sammanhang.
2. I nuläget används fyra verkliga exempel, **inte hela katalogen**. Källkoppling och bok-/apokryf-/specialfall behöver bredare genomgång. Det är inte belagt att varje post kan renderas.
3. Browser Back testas med en extra historikpost **enbart i testkopian**. Att koppla denna metod till den riktiga gamla djuplänksmodulen `v835`, bokläsare och adressdelning kräver fler isolerade verifieringar.
4. F4:s fristående layout är fortfarande en prototyp. Den verkliga navigeringsdesignen och områdesgrafiken har företräde; läsarens överlägg får inte lägga en ny huvudmeny över den.
5. Kända vetenskapliga integrationsbrister, särskilt `v897`s felaktiga proveniens-snapshot och C7:s typade dateringar, är **inte rättade i produktionen**. En grön test-PR innebär inte att dessa rättats.
6. Överlägget är ännu inte fullständigt genomgånget för skärmläsare, mobilens back-knapp, fel under öppning, eller återgång efter externt navigationsbyte medan det är öppet. Dessa fall måste förekomma i acceptansmatrisen.
7. Sidans verkliga Leaflet-instans kan saknas i vissa webbläsar- eller nätverkslägen; när ingen kamera finns ska frånvaro redovisas, **inte** räknas som ett godkänt kartrestore-test.

## Granskning och nästa grind
- Den senaste dedikerade F5-körningen ska visa att den **riktiga** appen startar oförändrad och att nio nya överläggsscenarier passerar utan förlorat C1-sammanhang eller trasiga befintliga läsare.
- En browser-artefakt med kort `return-audit.json` ska läggas under Actions, utan att någon produktsida distribueras.
- Efter detta fortsätter F5.6 med breddad postkatalog, mer realistiska mobil-/fokus-/tangentbordsfall och test av återgång efter förändrad vy; därefter krävs **uttryckligt godkännande** för verklig integration.

**Skydd:** PR #380 kvar som draft, stackad på PR #379. Ändringar enbart i `tests/f5-*`, `docs/f5-*` och F5:s CI. Ingen merge, Cloudflare-publicering, produktionskodändring eller F6-start.
