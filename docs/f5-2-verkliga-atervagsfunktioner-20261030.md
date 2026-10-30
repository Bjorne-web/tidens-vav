# F5.2 – Faktiska återställningsfunktioner i befintlig app

**Datum:** 30 oktober 2026  
**PR:** #380, stackad på F4:s testgren, fortfarande **draft**  
**Status:** Källinventering och isolerade funktionstester. Ingen ändring i `app.js`, `index.html`, `v910`, publicerad app eller Cloudflare.

## Faktiskt granskade komponenter
- `app.js`: grundläggande `view(...)`, `setSelected(...)`, tidsintervall via `state.min/max`, `v827MoveViewport(...)`, `v83SetTheme(...)`, `v84OpenReader(...)`, `v84CloseReader(...)`, `renderMap(...)`, `leafletMap` och slutliga omslag av vyfunktioner.
- `v909-view-context-c1.js`: det aktuella gemensamma snapshotobjektet.
- `v910-cross-view-c2.js`: kartkoppling med `syncToPost()` och `restorePreviousTime()`.
- `v835-deeplinks.js`: befintlig `?tv_id=...&tv_view=explore|timeline|research`.
- `v898-quick-research-pilot.js`: snabbfönstrets öppning/stängning, dess befintliga knapp för fördjupning och bibel-/apokryfvägen.

## Inventering: vad som faktiskt kan återställas?
| Tillstånd | Befintlig funktion/åtkomst | F5.2-bedömning |
|---|---|---|
| Vald post | `setSelected(id)` + `state.selected` | **API finns**, men återställning måste samordnas med vyernas omritning och bok-/specialläsare |
| Aktiv vy | `view(destination)` omsluten av flera äldre lager | **API finns**, men äldre omslag kan ändra scroll, läsarläge och tematisk returväg |
| Tidsintervall | `state.min/max`, `v827MoveViewport`, `renderAll` | **Delvis**: `v827MoveViewport` bevarar aktuell intervallbredd och kan inte ensam återställa ett godtyckligt tidigare spann |
| Kategorier och evidensfilter | `state.cat`, `state.ev` och `renderAll` | **Åtkomligt**. Ändring och visuell synk måste ske via kontrollerade värdanrop, annars kan kryssrutor och filtrering skilja sig |
| Kartår | `state.mapYear`, `renderMap()`, `TidensCrossViewC2.restorePreviousTime()` | **Delvis**: C2 återställer tidigare år efter `syncToPost`, men annan navigering kan påverka samma state |
| Kartans centrum och zoom | `leafletMap` (Leaflet-objekt), `fitBounds()` i C2 | **Lucka**: inget dedikerat återgångs-API för sparad mittpunkt/zoom hittades. F5 måste först fånga `getCenter/getZoom` och återställa `setView` under kontrollerade förhållanden |
| Temaspår | `v83Theme`, `v83SetTheme()`, `v83Display` | **Delvis**: temat kan väljas, men valet `humans` tvingar listläge och ett senare temabyte återställer inte automatiskt ett tidigare grafiskt läge |
| Jämförelseurval | `compareIds`, `renderCompare()` | **Åtkomligt** men kräver testad synk med befintliga jämförelseknappar och returvägen till temaspåret |
| Scroll på sidan | `window.scrollTo()` efter vybyte | **Lucka**: appens v84-omslag nollställer scroll vid vybyte. F5 måste återställa scroll **efter** bytet och omritningen |
| Mobilens läsare | `v84OpenReader()`, `v84CloseReader()` och fokusreferens | **Delvis**: öppning återställer läsarens `scrollTop` till 0; läsposition måste fångas separat och återställas efter öppning |
| Webbläsarens Back | `v835` hanterar direktlänkar; F5.1 testkoordinator finns | **Inte integrerat**: inga nya `history.pushState/popstate`-lyssnare har införts; detta måste testas mot befintlig intern navigation innan aktivering |
| Bok-/apokryfspecialläsare | `TidensOpenBookV858` + gamla läsarfunktioner | **Kvar att verifiera** i en separat regressionsmatris innan faktisk F5-integration |

### Vad har faktiskt körts?
`tests/f5-real-app-api.test.cjs` plockar ut och exekverar avgränsade verkliga funktionsdefinitioner från `app.js` i Node VM (tidslinjepanorering, tema-byte, mobil öppna/stäng). Testet kör också **den riktiga C2-modulen** i VM och kontrollerar att kartåret kan återställas efter postcentrerad synkning, medan ingen motsvarande återställning av kameran finns.

Detta är mer än statisk källgranskning, **men inte ett end-to-end-test av hela appen**: `app.js` har flera omdefinieringar och omslag av `view`, specialläsarlogik och DOM. Verifiering av hela användarsessionens återgång återstår.

`tests/f5-restore-capabilities.cjs` tar fram en explicit återställningsplan. Testen kräver att varje behövd återställningskapacitet är tillgänglig. När en kartvy exempelvis saknar funktion för kameran, scroll, temaspårsläge eller fokus markeras planen **`ready:false`** och anger vilka steg som blockerar. Kartkamera och scroll ligger i planeringen **efter** vybytet, eftersom tidigare funktioner annars kan skriva över dem.

## Nästa prioriterade steg – F5.3
1. Bygg en testbar **värdadapter** för faktiska vy-/filter-/kart-/temaspårs-API:er, med reglerad ordning och explicit avbryt vid saknade kapaciteter.
2. Kör riktiga webbläsartester av open → fullständig forskningsvy → tillbaka från tidslinje, karta, temaspår, Jämför och mobil läsning, med jämförelse av före/efter-state.
3. Skydda befintliga `v835`-länkar och `v898`-snabbfönstret; koppla inte in en ny knapp förrän återgångstesterna fungerar.
4. Styr åtgärden av `v897`s verifierade proveniens-snapshot-brist som en separat integration med forskningsregressioner.
5. Behåll originalgrafik, flikar och tillbakahistorik utan kopierad huvudnavigation eller ett nytt globalt state.

## Beslutsgräns
**F5.2 levererar granskningsbar kapacitetskarta och isolerade regressionsprov.** Ingen i projektet bör kalla `captureContext`, `restorePreviousTime` eller F5:s planeringsmodell för ett färdigt produktionssäkert återställningsflöde. PR #380 och F4:s PR #379 förblir öppna utkast tills användaren uttryckligen godkänner senare steg. Ingen merge, Cloudflare-publicering, ändring av `index.html` eller produktionsnavigering.
