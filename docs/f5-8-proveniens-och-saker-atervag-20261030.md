# F5.8 – Källspårning och säker återgång, isolerade rättningsförslag

**Datum:** 30 oktober 2026  
**Gren/PR:** `f5-navigation-integration-contract-20261030`, draft PR #380 (baserad på F4:s draft PR #379).  
**Status:** Icke aktiverad teknisk kandidat och automatiska tester. **Ingen ändring av produktionsfiler eller Cloudflare.**

## Syfte och avgränsning
Efter F5.7 återstod nio uttryckliga blockerare. Två särskilt viktiga har nu fått **separata rättningsförslag i tester**, men det innebär **inte** att dessa produktionshinder är åtgärdade. F5.8 ska ge ett bevis på att en liten förändring kan fungera utan att forskningsinnehåll går förlorat och samtidigt definiera en återgång som aldrig felaktigt påstår att en konflikt reparerats.

## A. Kandidat för källursprungsfelet i `v897`
Originalfilen `v897-research-read-model.js` skapar `postProvenance=Object.freeze({...provenance})` **innan** de fyra utvalda textfälten `summary`, `context`, `impact` och `limits` hämtas. Därför kan proveniensobjektet vara tomt fast källlagret levererade innehållet.

`tests/f5-8-generate-provenance-candidate.cjs` läser originalet med strikta kontroller för exakt förekomst och gör **endast** en kandidatförändring: kopieringen/frysningen av `provenance` sker i `snapshot` **efter att textfälten har valts**. Filen skrivs till `out/f5/candidate/v897-provenance-candidate.js`; originalfilen lämnas helt orörd. Om ursprungskoden har förändrats på ett oväntat sätt avbryts genereringen i stället för att tyst patcha fel kod.

`tests/f5-8-provenance-candidate.test.cjs` kör både verkligt original och kandidaten i en isolerad JavaScript-miljö. Testet kontrollerar att proveniensen för H045:s valda sammanfattning, historiska sammanhang, påverkan och begränsning pekar på **faktiskt använt källager och fältnamn**, inklusive aliasser, och att posternas texter, källänkar, år, boktyper och övriga egenskaper är oförändrade. Även fall med direkt postfält utan separat lager testas.

`tests/f5-8-real-app-provenance-browser.sh` skapar en **temporär fullappskopia** av oförändrad `index.html` och byter **enbart i testkopian** sökvägen till `v897` mot den genererade kandidatfilen. Chromium kontrollerar de faktiska H045/B001/D001/O067/H005/AP001-posternas ifyllda textfält och deras ursprungsangivelser där de finns. Resultatet skrivs till `out/f5/candidate/real-app-provenance-report.json`.

**Tolkning:** Ett grönt prov bevisar att *den begränsade kandidatförändringen* fungerar i de testade fallen. Det betyder inte att `v897` är korrigerad i den publicerade appen, att hela C7-källkedjan är färdiggranskad eller att varje refererad källa är vetenskapligt verifierad.

## B. Föreslagen säker återgång och avbruten navigation
Den nuvarande testläsaren kan upptäcka att C1-vyn eller Leaflet-kameran ändrats under läsning och returnerar då `BLOCKED`. Det är bättre än en falsk framgång, men en webbläsar-Back kan **redan ha ändrat historikpositionen** och den ursprungliga appvyn kan redan vara ändrad. F5.8 löser inte detta automatiskt.

`tests/f5-8-safe-return.cjs` är därför en **ren testmodell för en framtida återgångskontroll** med följande ordning:

1. Fånga en oföränderlig utgångsbild av C1-kontexten och kartkameran vid öppning.
2. Vid manuell stängning: gör en **förkontroll före `history.back()`**. Om något ändrats ska ingen historikändring startas.
3. Vid `popstate` efter redan påbörjad navigering: verifiera utgångsbilden på nytt innan läsaren stängs. Ett fel får inte betecknas som återställt.
4. Om konflikt föreligger krävs ett **uttryckligt val**: *Behåll aktuellt läge* (stäng läsaren utan att påstå att gammalt läge återställts), eller *Återställ tidigare läge* via faktiska värd-API:er. Det senare får endast rapporteras lyckat om både C1-kontext och kamera **verifierats efteråt**.
5. Om någon värdfunktion avvisar, kastar fel eller ger fel tillstånd ska testkontrollen förbli blockerad, inte ange framgång.

`tests/f5-8-safe-return.test.cjs` kontrollerar normal retur, avvisad historia, fel vid stängning, kameraförflyttning, konkurrerande vybyte, uttryckligt *behåll aktuellt*, avböjd eller partiell återställning samt återkomst via `popstate`.

**Tolkning:** Detta är en avgränsad, verifierbar **design**. Den är ännu inte kopplad till riktiga `v835`-historiken eller `app.js` och har inte löst atomär rollback eller snabba Leaflet-race i den verkliga appen.

## C. Revisionsstatus efter F5.8
Av F5.7:s 12 acceptansgrindar är fortfarande **3 testade som isolerade komponenter och 9 inte godkända för release**. Mer precist:

- **G05 – Proveniens:** rättningskandidat och selektiva regressionstester har tagits fram. **Blockerad i produktion** tills patchen är inkopplad, allkatalogtestad och uttryckligen godkänd.
- **G07 – Återhämtning:** säkerhetsregler och testfall finns. **Blockerad i produktion** tills de är kopplade till verklig apphistorik och återhämtningskontrollerna har testats i riktiga vyer.
- **G06 – Kartans samtidighet:** fortfarande blockerad. Normal testkörning väntar på C2:s två bildrutor; snabba interaktioner kan fortfarande skapa konflikt.
- **G04, G08–G12:** oförändrade integrations-, innehålls-, URL-, tillgänglighets- och acceptanskrav.

**Ingen ändring i `index.html`, `app.js`, `v897-research-read-model.js`, `v910-cross-view-c2.js`, `v835-deeplinks.js` eller Cloudflare.** F4:s PR #379 och F5:s PR #380 förblir utkast. Förslag på nästa steg är en **kontrollerad produktionlik stagingkandidat, men först efter separat godkännande**, där G05 och G07 integreras under full regressionsgranskning. F6 påbörjas inte.

## D. Verifieringskrav innan F5.8 kan markeras genomförd
- Den dedikerade F5-körningen på **senaste committen** är grön.
- Originalv897:s buggreproduktion från F5.7 fortsätter passera, och F5.8:s kandidatbevis visar motsvarande rättning utan innehållsförändring.
- Den fullständiga appkopian med utbytt kandidatmodell fungerar i Chromium, och JSON-rapporten visar andel spårbara ifyllda fält per verklig post.
- Testerna för återgångsmodellen visar att historik **inte** anropas när utgångsläget ändrats.
- F3/F4- och F5.1–F5.7-regressionerna är fortsatt gröna.
- Diffen från PR #380 till F4-grenen innehåller **endast** `tests/f5-*`, `docs/f5-*` och F5:s isolerade workflow.
