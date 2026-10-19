# C7 omgång 24 – Adapa, Sargon, Dumuzi och Osiris

**Status:** separat testversion, inte sammanslagen med main. Framtagen enligt `docs/tidens-vav-design-och-arkitektur.md` v1.1 med en kanonisk post per ID och oförändrad vylogik.

## Poster

- **O072 Adapa:** motiv om odödlighet och visdom; ingen belagd direkt härledning av Genesis 3.
- **O073 Sargon av Akkad:** motivet barnet i tätad korg och Mose i Andra Moseboken 2; legenden och dess senare textvittnen dateras separat från den historiske härskaren.
- **O074 Dumuzi/Tammuz:** nedstigning, klagan och Hesekiel 8:14; säkra och osäkra paralleller till senare kristen uppståndelsetolkning skiljs.
- **O075 Osiris:** egyptisk efterlivsteologi och gudens roll i dödsriket; inte utan vidare liktydigt med Jesu uppståndelse.

**Vetenskaplig begränsning:** Grundregistrets importerade tidsspann är inte slutgranskade. C7 analyserar samband och källkritik men fastställer inte dateringar eller C6-slutstatus. Motivlikhet är inte direkt beroende.

**Teknisk avgränsning:** En C7-datamodul `v8115`, scriptregistrering i `index.html`, regressionstest och CI-rad. Oförändrade post-ID, tidslinje, sök- och Temaspårnavigering. PR bygger på publicerad `main` med godkända PR #122.

**Beroende:** PR #121 (O067–O071) är en separat ännu ej publicerad C7-omgång. PR för O072–O075 kan granskas tekniskt oberoende, men täckningsräkningen måste uppdateras när båda förenats i main. Räkna unika ID:n, inte parallella forskningsdatabaser.

**Test:** kör `node tests/smoke-c7-v8115.mjs` och GitHub Actions. Sök upp var och en av O072–O075; klick ska öppna läsfönstret först, sedan ska knappen ”Visa sambanden i Temaspår” bevara rätt ID. Testa dator och mobil, externa källlänkar och fortsatt funktion för H045, O067 och B039.

**Publicering:** först efter användarens testgodkännande.
