# F5.7 – Samlad integrationsrevision och formella godkännandekrav

**Datum:** 30 oktober 2026  
**Projekt:** Tidens väv  
**Granskad version:** F5:s oaktiverade testgren i draft-PR #380, baserad på F4:s draft-PR #379.  
**Beslut:** **Inte redo för produktionsintegration, sammanfogning eller F6.** Dokumentet är en revisionsrapport, inte ett nytt produktionsbeslut.

## 1. Samlad slutsats
F5.1–F5.6 har gett väsentligt bättre underlag än bara en fungerande prototyp: befintlig appkod har laddats och testats i Chromium, sex skilda F4-objekt har renderats i en **tillfällig kopia** av den riktiga appen och återgång har testats mot C1, URL, scroll, fokus och avläst Leaflet-kamera. F5.6 redovisade 16 positiva fall och ett medvetet **BLOCKED** när huvudvyn ändrades bakom artikeln, med mätbar kamera i 15 positiva returfall.

**Det är fortfarande en testkoppling, inte en aktiverad produktionsfunktion.** F4-artiklarna är statiska exempel från sex objekt; den befintliga snabbfönsterknappen leder fortfarande till den gamla fördjupningen. Vi har ännu inget belägg för hela postkatalogen, en säker snabb kartövergång eller en fungerande återhämtningsväg när den underliggande vyn hinner ändras.

F5.7 lägger till ett negativt verkligt Leaflet-test, där kameran avsiktligt flyttas medan artikeln är öppen. Det ska ge **BLOCKED**, inte PASS. Den separata källbaserade acceptanskontrollen ska dessutom återge den faktiska proveniensbristen i `v897`, och skriva en maskinläsbar matris över allt som fortfarande blockerar en release.

## 2. Acceptansmatris

| ID | Område | Nuvarande belägg | Inför aktivering |
|---|---|---|---|
| G01 | Full forskningsartikel över befintlig app | **Verifierat i testkopia**, med F4:s verkliga HTML | Inkoppling till godkänd huvudnavigation, ingen sjunde huvudflik |
| G02 | Återgång med C1, filter, scroll, URL och karta | **Verifierat i isolerade normaltillstånd** | Riktiga vybyte-/snabbvägar, snabba samtidiga övergångar och enhetstester |
| G03 | Befintliga snabb- och bokläsare | **Grundtester godkända** för H045/B001/D001 | Fler bok-, apokryf- och specialfall samt mobil |
| G04 | Aktiv produktionsläsare | **Blockerat** – inte inkopplad | Separat produktionskandidat, testsida och beställargodkännande |
| G05 | Källursprung per valt textfält | **Blockerat** – verifierad bugg i `v897` | Rätta proveniens innan data visas som spårbart forskningsunderlag |
| G06 | Kartans auto-centrering och kamerarestaurering | **Blockerat** – två uppskjutna frames och tidigare upptäckt race | Säker avbrytning/synk av kamerarörelse och snabb navigation |
| G07 | Samtidig navigation och felåterhämtning | **Blockerat** – F5 upptäcker men reparerar inte konflikt | Spärra olämpliga åtgärder eller ge bevisat säkert återställningsförfarande |
| G08 | Post-/ämnes-/källkatalogen | **Blockerat** – sex F4-prover, inte alla poster | Generell objektadapter + täckningsrapport för alla typer |
| G09 | Historik och delningslänkar | **Blockerat** – testhistoria, ej live `v835`-integration | Samordna Back/Forward/djuplänk och beslut om topic/source-URL:er |
| G10 | Tillgänglighet och mobil | **Blockerat** – Chromium-smal viewport/Tab-test är otillräckligt | Skärmläsare, fokusfälla, touch, reducerad rörelse och OS-Tillbaka |
| G11 | Vetenskaplig täckning och dateringskategorier | **Blockerat** – begränsat urval | Granska källspårning, typade datum, osäkerheter, C7 och specialfall |
| G12 | Staging, acceptans och lansering | **Blockerat** – endast draft-PR:er | Separata granskningstillfällen och uttryckligt beslut om varje steg |

**Summering:** 3 av 12 grindar har styrkta tester för en *isolerad* komponent; **9 av 12 blockerar fortfarande en release**. Ett grönt CI på denna granskning betyder att riskerna är **korrekt fångade**, inte att dessa nio punkter är lösta.

## 3. Konkret reproducerad felorsak i v897

I `v897-research-read-model.js` skapas `postProvenance=Object.freeze({...provenance})` innan `snapshot.summary`, `snapshot.context`, `snapshot.impact` och `snapshot.limits` anropar `pick(...)`, som först då fyller objektet `provenance`. Det utåt exponerade `snapshot.provenance` förblir därför tomt trots att källdata valdes.

F5.7:s nya test kör **den verkliga `v897`-koden** i en isolerad VM med en registrerad H045-post och ett tydligt källager. Testet kontrollerar att både summary och context verkligen hittas och att proveniensobjektet ändå blir tomt. Detta är ett uttryckligt **felbelägg och releasehinder**, inte en reparation av `v897`.

**Godkännandekrav:** rätta felet i separat, framtida integrationskod; testa före/efter för prioriterade fält och C7:s verkliga ursprung; säkerställ att metadata inte felaktigt gör en länk till vetenskapligt verifierat belägg.

## 4. Kartan och en säker returväg

`v910-cross-view-c2.js` registrerar kartnavigering med `requestAnimationFrame(()=>requestAnimationFrame(syncToPost))`. Vid F5.5 ändrades kameran efter att testet tagit dess utgångsvärde; testet korrigerades till att invänta normal färdigcentrering. Det löser **inte** en användare som öppnar artikeln snabbt innan ramen är färdig.

F5.7 testar dessutom att en **avsiktlig Leaflet-förflyttning medan artikeln är öppen** rapporteras som osäker `BLOCKED`. Om underliggande navigation byter C1-vy rapporteras också `BLOCKED`. Men `history.back()` kan redan ha skett när detta upptäcks. Denna olösta partiella återgång är en **kritisk blockerare**: inget får kallas säkert återställt bara för att koden kan upptäcka en konflikt.

**Godkännandekrav:** formell tillståndsmaskin för stängning, fel och återhämtning; hantera dubbel Back, stängning under pågående kameraflytt, borttagen post, uppdaterad filterlista och nav i två fönster; bevara det som redan fungerar.

## 5. Täckning och användarupplevelse
- Verifiera **samtliga** objektgrupper mot verklig datakatalog, inte bara sex prototyper; gör rapport över vilka som har sammanfattning, dateringar, källor, C7-betydelse, kopplingar och specialläsare.
- Behåll original `Start-hero.png`, områdesikonerna och samma sex huvudvyer. Den fullständiga artikeln ska vara en fördjupning under den valda posten, inte en ny konkurrerande navigationsfamilj.
- Låt befintliga `v835`-djuplänkar fungera oförändrat. `topic:good` och `source:...` har ännu **inte** ett beslutat offentligt djuplänksformat.
- Testa med verklig användning: svensk mobilläsning, tangentbord, skärmläsare, kartzoom/år, framåt-/bakåtknappar, fokus efter stängning och lång forskningsartikel utan avskuren text.

## 6. Kontroller och nästa arbete
`tests/f5-7-acceptance-gates.test.cjs` dokumenterar **12 grindar**, återger den faktiska `v897`-buggen, kontrollerar C2:s uppskjutna kartkörning och bevakar att ingen F5-testkoppling laddas av produktionens `index.html`. Den genererar `out/f5/readiness/f5-7-acceptance-gates.json` som följer med GitHub Actions-artefakten. Browser-testet ska nu omfatta **18 scenarier**: 16 normala/negativa PASS och två **avsiktligt BLOCKED** (samtidig navigation respektive kartflytt).

**Beslut som behövs senare:** först acceptera F5 som *undersöknings- och testfas* med erkända releasehinder. Därefter kan en **separat produktionsnära staginggren** byggas för att åtgärda G04–G12. Den får inte aktiveras eller sammanfogas med main utan nytt uttryckligt godkännande.

### Skydd
**Ingen kod har ändrats i produktionens `index.html`, `app.js`, `v897`, `v910`, `v835` eller Cloudflare.** F4-PR #379 och F5-PR #380 förblir utkast. Ingen lansering eller F6-start är godkänd. 
