# F5.3 – Isolerad öppna–läsa–tillbaka-testkedja

**Datum:** 30 oktober 2026  
**Arbets-PR:** #380 (stackad draft mot F4:s draft #379).  
**Status:** Utvecklad i `tests/f5-*` och separat GitHub Actions. **Ingen aktivering i `index.html`, `app.js` eller produktion.**

## F5.3:s nyhet
Det finns nu ett **isolerat värdkontrakt**, `tests/f5-return-host.cjs`, som binder ihop:
- Det verkliga `v909-view-context-c1.js` för att hämta användarens ursprungliga vy, vald post, filter, tidsintervall och jämförelseposter.
- Den verkliga **F4-prototypens** fullständiga HTML-läsning av en historisk forskningspost (H045 och O067) utan att använda appens gamla läsare eller ändra deras funktion.
- F5.1:s öppna-/stängningskoordinator och F5.2:s kapacitetsgrind. Återgången avbryts innan öppning om värden saknar någon obligatorisk funktion.

`tests/f5-open-return-harness.test.cjs` verifierar öppning, fullständig artikel, återställning och efterkontroll i fem **simulerade värdlägen** (tidslinje, karta, temaspår, jämför och forskning). Testet använder dock C1-koden och F4-artikelrenderern från riktiga projektfiler. Skärmarna och återställningsfunktionerna är testdubblar; därför är detta ett kontrakts-/integrationstest, **inte** bevis på att produktionens karta och filter redan är integrerade.

## F5:s rena browser-harness
`tests/f5-generate-browser-harness.cjs` genererar `out/f5/f5-browser-return.html` som en **fristående webbläsartestfil**. Den bäddar in riktiga v909 C1, F5-kontrakt och H045/O067:s F4-HTML. I testfilen finns en **separat och tydligt markerad låtsasvärd** för vyer, filter, kartkamera, scroll och temaspår – inte ett alternativt tillstånd i produktionsappen.

`tests/f5-browser-return.sh` kör Chromium i sju scenarios: **timeline, map, explore, compare, research, mobile och browser-back**. Kontrollerar att öppen artikel syns, att återgången sker, att kontext/urval/scroll/fokus/kartvärden matchar sparad C1-kontext och att webbläsaren rapporterar `data-f5-result="PASS"`. **Browser Back** prövas via `history.pushState`/ `history.back` enbart i den isolerade testfilen. De äldre appfunktionerna för faktisk router/history är inte utbytta.

**Teknisk reservation:** Return-host stänger testläsaren innan återställning av vy, kamera, scroll och fokus, eftersom gamla `view()` och mobilöppnaren kan nollställa dessa. Kapaciteter måste finnas före öppning; ett fel *mitt i* en värdåterställning är ännu inte garanterat atomärt. Testet redovisar felet och behåller sessionen för åtgärd, inte en felaktig godkänd status. Full återgång utan partiell UI-mutation kräver särskild transaktions-/rollback-kontroll när värden kopplas på riktigt.

## Sluttest och ordning
F5:s eget workflow kontrollerar:
1. Isolerade C1/URL-kontrakt och verkliga legacy-API:er.
2. Öppna/läsa/återgå i en kontrollerad värd med oförändrad C1-kontext.
3. Sju Chromium-scenarier inklusive Browser Back.
4. F4:s forskningsvyregressioner och F3:s forskningsmodellregressioner.

En separat GitHub Actions-artefakt innehåller offline-testfilen; den ska inte publiceras på Cloudflare. Granskning av denna artefakt kan göras av beställaren utan att påverka den publicerade appen.

## Viktiga delar som fortfarande saknas inför aktiv F5-integration
- **Verklig värdadapter:** direkt anrop till de slutliga `app.js`-funktionerna i hela browsern, befintliga kartan, filtren och specialläsarna, utan testdubblar.
- **Riktig Leaflet-kamera:** `getCenter/getZoom` och `setView` i appens faktiska kartinstans, med återställning *efter* C2:s automatiska kartcentrering.
- **Riktig historik/scroll:** återgång till rätt huvudflik, samma scrollposition, mobilens öppna läsarläge, temaspårsgrafik och jämförurval.
- **Verklig rutning:** `popstate` måste samordnas med gamla `v835-deeplinks.js`, inklusive djuplänkar till H/B/D/AP/O och specialläsare. Inga nya `topic:`-URL:er utan beslut.
- **F3:s kända proveniensbrist** i `v897-research-read-model.js` måste rättas och regressionstestas innan ny modell aktiveras.
- **Fullständig datatäckning:** F4 använder sex verkliga prover; detta bevisar inte samtliga 200+ forskningsposter och specialfall.

## Skyddsbeslut
Det här är **F5.3:s testfas**, inte en färdig produktionsintegration. PR #379 och #380 förblir utkast. **Ingen merge, ingen förändring av `index.html`, inga Cloudflare-pushar, ingen start av F6**, förrän beställaren godkänt de relevanta stegen och riktiga integrationstester.
