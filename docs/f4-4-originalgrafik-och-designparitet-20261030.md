# F4.4 – Grafisk paritet mot Tidens vävs godkända huvudvy

**Datum:** 30 oktober 2026  
**Arbetsgren:** `f4-isolated-full-research-view-pilot-20261030`, utkast PR #379. **Separat granskningsprototyp; inga produktionsändringar.**

## Källor för grafiken
- **Originalbild:** `Start-hero.png`, precis samma PNG som används i appens godkända tidslinje och andra vyer. CSS-bakgrunden i testprototypen använder bildens originaldata; ingen nygenererad/liknande ersättningsbild används. Originalbilden bäddas in som data-URI vid generering av fristående HTML, så granskningsfilen kan öppnas utan nätverk.
- **Originalikoner:** De fyra exakta SVG-strängarna ur `v887-home-areas.js` (appens `window.TidensAreaIcons`) läses i den isolerade Node-testmiljön. Ingen ny teckning av samma symboler och inga modifierade ikoner.
- **Områdesfärger:** Referensvärden direkt från `v887-home-areas.css`: Bibeln `#347ccb`, Religioner `#9465bf`, Världshistoria `#259779`, Filosofi `#b17929`.
- **Ytprincip och proportioner:** Följer godkänd princip från `v900-timeline-landscape.css` och `v917-compare-design-parity.css`: samma bild, övertoning, 31 % bildposition, bruten panel, serif-typografi och gemensamma områdeskort.

## Hur läsaren hålls som ett fördjupningsläge – inte sjunde flik
- Testkatalogen får en visuell introduktion med den **verkliga landskapsbilden** och fyra **statiska** områdesmarkörer. De är förklarande orientering, **inte en ny kopia av huvudappens navigationsknappar**.
- Den valda forskningstexten behåller sin egentliga lässtruktur: artikelhuvud, avsnittsnavigering, källor, historiska dateringstyper, C7-betydelse och samband. Relevant original-SVG visas i artikelhuvudet som ämnesmarkör.
- F4 monteras **inte** i `index.html`. Det är fortfarande först i F5 som en fullständig läsare kan anslutas till existerande huvudnavigation och ärva gemensam banner utan dubbla toppar eller bruten Tillbaka-historik.

## Verifieringskrav
1. Separat F4-regressionstest ska kontrollera att PNG är identisk med källfilens byteinnehåll och att de fyra original-SVG:erna faktiskt finns i HTML.
2. Testa både katalog och artikel i Chromium på dator (1440×1000) och mobil (390×844), utan horisontellt överflöde. Katalogens landskapsbild och originalikoner ska vara synliga i skärmbilderna.
3. Inga nya huvudflikar, ingen Cloudflare-publicering och ingen sammanfogning av PR #379.
4. Dokumentera eventuella kvarstående designavvikelser före godkännande. Godkänd testprototyp är **inte** automatiskt en produktionsgodkänd forskningsvy.

**Viktigt:** Bilderna ersätter inte en senare riktig integration med redan godkänd huvudrad. Om appens originalgrafik uppdateras måste denna prototyp granskas på nytt eftersom testet läser de aktuella källfilerna.
