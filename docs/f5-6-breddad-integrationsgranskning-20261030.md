# F5.6 – Breddad integrationsgranskning, felvägar och historik

**Datum:** 30 oktober 2026  
**PR:** #380 (fortsatt `draft`, byggd ovanpå F4:s `draft` PR #379).  
**Omfattning:** Endast tester och dokumentation, ingen ändring i den publicerade appen.

## Huvudsyfte
F5.5 visade att fyra verkliga F4-artiklar kunde öppnas och stängas i en tillfällig kopia av appens verkliga `index.html`. F5.6 breddar täckningen och fokuserar på sådant som en lyckad normal återgång **inte** bevisar: otillåtna ID:n, dubbla öppningar, fokus, gamla URL:er och navigation som ändras bakom läsaren.

## F5.6:s testförändringar
- `tests/f5-generate-real-reader-copy.cjs` tar med **alla sex F4-prototypobjekt**: H045, O067, B001, D001, `topic:good` och originalkällan från A01/Amarnabreven. F4:s befintliga datakontrakt behålls; källa och fråga får **inte** nya `tv_id`-format eller påhittade årtal.
- `tests/f5-real-reader-bridge.js` i den **tillfälliga appkopian** tillåter bara objekt som faktiskt finns i det genererade F4-underlaget. Okända eller illasinnat formade ID:n avvisas utan historikpost, ny läsare eller ändrad C1-kontext.
- Dubbla öppningar blockeras så att den första artikeln inte byts ut under en pågående läsning.
- Modalens tangentbordsfokus hålls inom testläsaren med en Tab/Shift+Tab-gräns; Escape använder samma återgångskedja. Detta är en **första browser-kontroll**, inte ett komplett skärmläsartest.
- **Säkerhetsgrind för samtidig navigation:** Innan läsaren stängs kontrollerar testadaptern att den underliggande appens C1-kontext och observerbara kartkamera är oförändrade sedan öppningen. Om en annan huvudflik öppnas bakom läsaren returneras **BLOCKED**, inte PASS. Testvärden behåller överlägget öppet för att inte påstå en lyckad återställning som inte skett.
- `tests/f5-real-reader-browser.sh` kör **17 webbläsarscenarier**: de ursprungliga nio plus Gilgamesh, filosofiskt ämne, källobjekt, ogiltigt ID, dubbelöppning, Tab-fokus, samtidiga vyändringar samt äldre H045-djuplänk. **16 förväntas PASS; 1 negativt scenario förväntas BLOCKED och redovisas som upptäckt konflikt.**

## Viktiga reservationer
1. **BLOCKED är inte en reparerad session.** Vid underliggande navigation är tillståndet redan ändrat; testadaptern signalerar att det är osäkert att kalla det återställt. Återhämtning/rollback och förebyggande spärrar måste designas före verklig integration.
2. **Kartan är fortfarande en risk.** Vid F5.5 hittades ett race i C2:s tvåstegscentrering, som testet numera inväntar vid normal kartöppning. Extrema snabba övergångar eller kartförflyttning under läsning är **inte** visade som säkra. Om Leaflet-kameran inte kan avläsas i en testkörning får testet inte användas som belägg för fungerande kameraåterställning.
3. Även om filosofiska frågor och källobjekt går att visa i det tillfälliga läsöverlägget betyder det **inte** att de fått URL-delning, full forskningskatalog eller navigering från den riktiga appens innehåll.
4. De automatiska testerna använder Chromium (mobil scenariot är en smal viewport), inte alla operativsystem, mobila webbläsare eller hjälptekniska verktyg.
5. Den verifierade `v897`-proveniensbuggen, specialläsarnas fulla täckning och bredare C7-granskning är fortfarande kvar. Ingen ny forskningsslutsats eller källdatering har utförts här.
6. Inga produktionsknappar har ändrats, och HTML-testfilen genereras/raderas inom CI. **F5.6 är ett förstärkt testunderlag, inte slutlig produktionsklarhet.**

## Diagnostik av fullappskörningar
Ett av de tidiga testförsöken avslutades innan Chrome hann genomföra ett Explore-scenario; dokumentet visade då bara texten `Manuell testvärd redo`. Den efterföljande kompletta körningen passerade samtliga 17 scenarier. F5.6 har därför fått en utökad Chromium-tidsbudget och skriver en **explicit kameraprovningsstatus** till `return-audit.json` för varje lyckad återgång.

Rapporten skiljer på **AVAILABLE** (Leaflet-centrum/zoom kunde faktiskt avläsas och jämföras) och **UNAVAILABLE** (ingen verifierbar kamera, så två `null`-värden får inte betraktas som ett verkligt kartrestore-test). Antalet kameramätningar ska anges från den senaste genomförda körningen, inte antas.

## Acceptans för den isolerade fasen
- Senaste F5-workflow + övriga CI måste vara godkända.
- Varje av de 17 scenarierna ska rapporteras i `return-audit.json`, inklusive att det negativa samtidighetsfallet **blockeras**.
- Differensen mellan #380 och F4-grenen får bara innehålla `tests/f5-*`, `docs/f5-*` samt `.github/workflows/f5-navigation-contract.yml`.
- PR #379 och #380 förblir utkast utan sammanfogning/publicering.

**Nästa beslutsgräns:** Genomför samlad F5-revisionsmatris efter godkänd F5.6 och föreslå därefter en **separat explicit** test- och acceptansplan för produktionsnära integration, utan att starta F6 eller distribuera något på eget initiativ.
