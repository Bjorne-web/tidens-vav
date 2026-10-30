# F5.9 – Opublicerad produktionsnära integrationskandidat

**Datum:** 30 oktober 2026  
**Gren:** `f5-9-integration-candidate-20261030`  
**Bas:** F5:s testade arbetsgren i draft PR #380; F4 ligger fortfarande i draft PR #379.

## Syfte
F5.8 gav ett minimalt förslag på rättning av källursprung i `v897` och en separat modell för att undvika osäkra återgångar. F5.9 samlar dessa i **en egen produktionslik kandidatgren med testade filer och en lokal kopia av den riktiga appen**. Den aktiva applikationen är helt oförändrad.

## Faktiskt byggt
1. **`candidates/f5/v897-research-read-model.js`** är en fullständig, produktionsformad kopia av forskningsmodellen där per-fält-proveniensen fryses **efter** att de fyra utvalda textfälten hämtats. Innehållsfält, dateringar, källänkshantering och objekt-ID:n lämnas orörda. En automatisk byte-för-byte-jämförelse med F5.8:s tidigare godkända kandidat säkerställer att ingen extra semantisk förändring smugit sig in.
2. **`candidates/f5/f5-full-reader-bridge.js`** är en särskild, **opt-in** integrationskandidat för F4:s fullständiga forskningsartikel. Den monterar ett Shadow DOM-avgränsat läsöverlägg ovanpå appen utan att skriva om huvudflikar, `view()`, `setSelected()`, Leaflet eller forskningsregistret. Den kräver uttrycklig `TidensF5CandidateConfig.enabled=true` och F4-artikeldata från värden – utan detta gör den ingenting.
3. **Säkerhetsgräns inför Tillbaka:** före `history.back()` jämförs faktisk C1-kontext och Leaflet-kameran mot värdena vid öppning. Drift blockerar återgången **innan** historiken ändras. Om browser Back redan utlöst `popstate` görs ytterligare kontroll. Överlägget skiljer på **återställt ursprungsläge** och **behåll aktuellt läge**, där det senare är ett separat, uttryckligt användarval.
4. **Historikhantering vid konflikt:** om tidigare Back redan har skett undviker återhämtningsvalet att backa en gång till. Om konflikten upptäcks före Back tas överläggets historikpost bort vid det explicita valet att behålla aktuellt läge. Valet *Fortsätt läsa* kan återupprätta en överläggspost efter ett tidigare `popstate`.
5. **`tests/f5-9-generate-staging-copy.cjs`** skapar `f5-9-staging-test.html` från hela riktiga appens `index.html`, ersätter originalets v897-skriptväg endast i **testkopian**, och lägger till opt-in-kandidaten där. HTML-filen raderas efter test.
6. **`tests/f5-9-staging-probe.js`** och `tests/f5-9-staging-browser.sh` kör verklig Chromium-DOM mot appkopian för ordinarie vyer, F4-objekt, mobilbredd, webbläsarens Back, avvisade ID:n, dubbelöppning och konflikter i navigation/karta.

## Öppna begränsningar och releasehinder
Detta är **en stagingkandidat, inte en publicerad funktion**. Endast F4:s sex exempel ingår. Det finns ingen produktionsknapp eller universell adapter för alla registrerade poster. Den befintliga snabbläsaren, specialläsarna och `v835`-djuplänkarna ska fortsätta fungera oförändrat.

Konflikthanteringen är avgränsad: den ger ett **säkrare och verifierbart val** för att behålla aktuellt läge, men inte ett generellt säkert `restoreOriginal()` för alla C1-, tema-, scroll- och Leaflet-tillstånd. Samtidig navigation och en extern historikförflyttning under läsning är fortfarande risker som behöver fler tester. Den nuvarande kandidaten fångar C1/kamera, men inte samtliga möjliga sidokomponenter (t.ex. scrollposition i interna läspaneler, temaspårsgrafer eller specialläsares aktiva paneler).

Mobilen testas i Chromium med smal viewport, inte som en faktisk mobil med OS-Tillbaka och skärmläsare. F5.9 löser inte heller full vetenskaplig verifiering av poster, C7-dateringar eller allmänt beslutat URL-format för `topic:` och `source:`-objekt.

**Viktigt om snabb kartnavigering:** Den tidigare observerade C2-centreringen i två animation frames inväntas i testflödet. Detta är **inte** bevis för att extremt snabbt öppnande under pågående kartanimation är säkert i samtliga fall.

## Verifiering och acceptans
- Separat F5.9-workflow: kandidatens syntax och opt-in-skydd; rättningskandidaten måste vara identisk med den tidigare granskade versionen; F5.8:s källspårnings-/säkerhetsregressioner fortsätter passera.
- **19 Chromium-scenarier** kör mot en lokalt servad kopia av verkliga appen, med normal återgång, äldre djuplänk, flera objekttyper och konfliktval.
- F3/F4-regressioner och tidigare F5-tester förblir gröna.
- GitHub Actions-artifact med `out/f5-9/staging-audit.json`, samt kandidatfiler för granskning.

**Inga ändringar i produktionens `index.html`, aktiva `v897`, `app.js`, `v910`, `v835`, C7, huvudgrafik eller Cloudflare.** Den nya PR:n är stackad som **utkast mot F5-grenen**, inte mot `main`. Ingen merge, F6-start eller publicering utan uttryckligt beslut. F5.7:s återstående releasehinder ska fortsatt redovisas, inte strykas bara för att en kandidat passerar tester.
