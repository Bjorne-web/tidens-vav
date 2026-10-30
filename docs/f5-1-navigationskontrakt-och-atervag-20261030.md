# F5.1 – Navigationskontrakt och skydd av användarkontext

**Datum:** 30 oktober 2026  
**Arbetsgren:** `f5-navigation-integration-contract-20261030`  
**Bas:** den isolerade F4-testgrenen för PR #379 (inte sammanfogad).  
**Status:** Första teststeget i F5. Ingen produktionsintegration, publicering eller sammanfogning.

## Mål
Utforma den kritiska övergången **Snabbfönster / tidslinje / karta / temaspår / Jämför → full forskningsvy → tillbaka till exakt samma sammanhang**, utan att skapa ett konkurrerande globalt app-tillstånd och utan att förlora fungerande djuplänkar.

### Verifierade befintliga integrationspunkter
- `v909-view-context-c1.js` ger redan `window.TidensViewContextC1.snapshot()`: synlig vy, vald post, tidsintervall, jämförelse-ID:n, kategorifilter, evidensfilter samt `tv_id`/`tv_view`. **Den här C1-kontexten ska vara primär informationskälla**, inte ett nytt parallellt tillstånd.
- `v835-deeplinks.js` hanterar idag `?tv_id=<POST-ID>&tv_view=explore|timeline|research`. Nya länkar måste bevara detta, även till befintliga bok-/specialläsare. Existerande `topic:good` och `source:https://...` är **inte** giltiga äldre `tv_id`-värden; vi får inte hitta på ett nytt URL-format genom att kalla dem post-ID:n.
- `v898-quick-research-pilot.js` har öppnings-/stängningsfunktioner, men den befintliga fullknappen öppnar den äldre fördjupningen. Den används tills den nya fullständiga forskningsvyn är integrerad och regressionstestad.
- `app.js` äger `view(...)`, `setSelected(...)` och mobil läsarhantering. Dessa ska återanvändas där det är möjligt i en senare **uttryckligen godkänd** integrationsfas, inte skrivas över av F5.1:s testmodul.
- C1 täcker ännu inte entydigt scrollposition, kartans mitt/zoom, aktivt temaspår, markerad karta eller eventuellt mobilt läsarstatus; detta kräver **explicit kompletterande fångst och återställning**. Ett testvärde är inte bevis för att ett existerande app-API redan kan återställa dessa.

## Vad F5.1 faktiskt levererar
`tests/f5-navigation-contract.cjs` innehåller:
1. `captureContext`: tar en oföränderlig kopia av den befintliga C1-vykontexten samt öppet angiven extra UI-kontext (exempelvis scroll, karta och temaspår). Ingen global state muteras.
2. `currentLink`: skapar *endast* befintliga godkända postlänkar och tillåtna `tv_view`-lägen. Okänt ID eller `topic` avvisas i stället för att omtolkas.
3. `createNavigationCoordinator`: isolerat kontrakt för öppning, stängning, Browser Back och Escape, som **kräver värdens explicita callbacks** för öppning och återställning. Förhindrar dubbla öppningar och bibehåller det fångade sammanhanget om återställningen avbryts.

Detta är **inte** en ny produktionsrouter, ingen modifiering av browser history, inga globala eventlyssnare och ingen ändring i `index.html`.

`tests/f5-navigation-contract.test.cjs` kör faktiskt `v909-view-context-c1.js` i en isolerad VM med simulerad appstate för `timeline`, `explore`, `map`, `compare` och `research`, och verifierar kopierat urval, filter, tidsintervall, jämförelseposter och uttryckligt separat kart-/scrollkontext. Testerna kontrollerar att F5-modulen **inte muterar befintlig appstate**.

`tests/f5-deeplink-compatibility.test.cjs` kör den **verkliga** befintliga `v835-deeplinks.js` i isolerad VM och jämför genererade URL:er för alla tre godkända `tv_view`-lägen. Okända eller utökade objekt-ID:n avvisas.

F5:s dedikerade GitHub Actions-workflow kör dessutom regressionskontroll av F4:s forskningsvy och F3:s gemensamma forskningsmodell.

## Viktig integrationsgräns
Detta testkontrakt **garanterar inte att produktionen kan återställa kartans centrum/zoom eller scroll bara genom att vi har sparat siffrorna**. Därför måste F5.2 först identifiera fungerande återställningsanrop och testa dem i verkliga appvyer (inklusive mobilläget) innan någon länk/historik ändras. Dessutom måste vi åtgärda F3:s verifierade `v897`-proveniens-snapshot-brist vid framtida godkänd produktionintegration.

## Nästa avgränsade etapp – F5.2
- Lista faktiska öppnings- och återgångs-API:er för varje utgångsvy och validera vilka UI-tillstånd som kan återställas.
- Bygg en **separat testhärva** som använder dessa API:er, utan produktionsändring; först efter verkligt godkännande en integrerad läsare under befintliga sex huvudvyer.
- Behåll alla äldre post-, bibel-, apokryf-, special- och temaspårsläsare tills motsvarande regressionstester är godkända.
- Behandla browser Back, webbläsarens delnings-URL:er och mobilens stängknapp explicit; enbart `Escape` och lokal Tillbaka i F4-katalogen räcker inte.

## Skyddsbeslut
Den här grenen har **stackad draft-PR med bas i F4:s ännu öppna PR #379**. Det gör att F5-kod kan utvecklas i ett kontrollerat isolerat lager utan att F4 måste sammanfogas eller något slås på i Cloudflare. **Ingen merge, ingen distribution och ingen produktionskodändring** utan uttryckligt godkännande.
