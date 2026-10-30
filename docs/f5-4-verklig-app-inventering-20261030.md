# F5.4 – Riktig app, bevarade funktioner och integrationsgränser

**Datum:** 30 oktober 2026  
**Arbete:** F5:s stackade draft-PR #380 ovanpå F4:s draft-PR #379.  
**Status:** Fullappens verkliga HTML/JS körs i separat Chromium-testmiljö. Ingen kod i `index.html`, `app.js` eller publicerade appen har ändrats.

## Varför F5.4 behövs
F5.3 testade en *simulerad värd* med den riktiga C1-modellen och F4:s forskningsartikel. Det var inte ett test av den stora appens egna huvudflikar, specialläsare eller laddningsordning. F5.4 laddar därför en **tillfällig kopia av hela appens oförändrade `index.html`**, servad lokalt i CI. I kopian läggs endast ett testskript sist, `tests/f5-live-app-probe.js`. Det finns **ingen** sådan referens i den ordinarie appen.

`tests/f5-generate-live-app-copy.cjs` bygger kopian, `tests/f5-live-app-browser.sh` serverar den från repots rot under Chromium-körning, och testskriptet skriver en JSON-rapport med sanningsvärde per kontroll. Den tillfälliga HTML-filen raderas efteråt. Testets logg och rapport ligger bara i `out/f5/live/` som GitHub Actions-artefakt; ingen Cloudflare-publicering.

## Riktiga komponenter som verifieras
- **274 vanliga skriptimporter** i testkopian från appens källfiler och befintliga ordning, däribland äldre appkod, C7, böcker, apokryfer, v897, v898, C1, C2 och huvudvyns designsystem.
- **C1 i den kompletta appen**: `TidensViewContextC1.snapshot()` fungerar med det faktiskt renderade dokumentet.
- **Gemensam forskningsmodell:** befintlig `TidensResearchReadModel.has('H045')` svarar.
- **Fem verkliga navigationskontroller:** `navTimeline`, `navMap`, `navExplore`, `navCompare` och `navResearch` klickas genom appens eget eventsystem. C1:s angivna `view` och `visibleSection` kontrolleras, inte antas.
- **H045:s riktiga snabbfönster:** `TidensQuickResearchPilot.open/close` öppnar och stänger den gamla läsaren, med riktig titel, och ett nytt test jämför C1:s vy/vald post/filter/jämförelse/tidsintervall före och efter.
- **Två specialläsare:** `TidensOpenBookV858('B001')` för Första Moseboken och `TidensOpenBookV858('D001')` för Tobit, samt faktisk lästext med rätt post-ID. Detta är **inte** en regression för alla bibel-/apokryfposter.
- **Äldre direktlänkar:** verklig `TidensVavLinks.parse` för `?tv_id=H045&tv_view=research`; inga nya URL-regler har införts.
- **Kart-API-inventering:** rapporten undersöker om faktisk Leaflet finns och om den interna kartinstansen erbjuder `getCenter/getZoom/setView`. Detta är endast läsning, **inte bevis på att kartans kamera kan återställas i en verklig användarsession**.

## Skillnad mot en färdig integration
F5.4:s fullappstest kontrollerar **befintliga funktioner** och deras laddning/rendering. Det kopplar **inte** den nya F4-artikeln till den gamla appen. Även om hela denna kontroll är grön betyder det alltså inte att fullständiga läsaren fungerar från alla flikar, att Browser Back kan återställa kartan eller att källursprung har rättats i v897.

De återstående luckorna är konkreta:
1. **Riktiga värdanrop** för att öppna den nya F4-vyn inuti befintligt gränssnitt och återställa C1 plus karta/temaspår/filter/scroll i rätt ordning; ingen sjunde flik.
2. **Leaflet-instansens kamera** och C2:s automatcentrering, inklusive återställning efter att vyn växlats.
3. **Temaspårsvisningsläge, mobilt läsarläge, markerad post och jämförurval**; de olika sena omslagen kring `view()` och `setSelected()` måste observeras med riktiga UI-testfall.
4. **Webbläsarhistorik/djuplänkar** för H/B/D/AP/O, uppdatering av delningsadress och Browser Back på riktigt, inte bara i F5:s isolerade testvärd.
5. **F3-proveniensbuggen** i `v897` och fullständiga C7-typfaser måste åtgärdas och granskas i separat icke-publicerad integrationskod.
6. **Återställning vid fel mitt i processen** är ännu inte atomär: F5.3 har en fail-closed startkontroll men ingen generell rollback om återställningen halvvägs misslyckas.
7. **Större mängd verkliga poster** och alla specialläsare, däribland mobilfall och nätverksfria kartfall, har ännu inte end-to-end-verifierats.

## Automatiska acceptansgrindar
- Fullappstestet måste rapportera individuellt resultat för C1, v897, v898, de fem huvudflikarna, snabbfönstrets stängning och B001/D001, samt äldre H045-djuplänk.
- Den tidigare simulerade F5.3-kedjan (sju scenarier), F4-renderern och F3-forskningsmodellen ska förbli gröna.
- Alla ändrade filer på PR #380 ska fortsatt begränsas till `tests/f5-*`, `docs/f5-*` och `.github/workflows/f5-navigation-contract.yml`.
- **F5.4 färdigställs först när senaste dedikerade F5-jobbet och övrig CI är godkända.**

## Rekommenderat nästa utvecklingssteg: F5.5
Bygg en **avsiktligt ännu oaktiverad** värdadapter för full forskningsvy ovanpå appens befintliga element och funktionsanrop; kör sedan webbläsarregressioner från samtliga utgångsvyer, bibel-/apokryfspecialläsare och kartpositioner. Bevara snabbläsaren och den godkända startsidans/gemensamma flikarnas design tills varje återgång är verifierad. Användaren måste uttryckligen godkänna framtida sammanfogning och eventuell publicering.

**Skydd:** PR #379 och #380 förblir draft. Ingen merge, ingen aktivering av produktionsläsaren, ingen Cloudflare-deploy och ingen F6-start.
