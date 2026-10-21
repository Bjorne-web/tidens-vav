# B2.3 – Samlad kontroll av H001–H069

Den systematiska pilotklassificeringen är upprättad för H001–H069, men vetenskaplig slutgranskning och gränssnittskoppling återstår.

## Ursprung och identitet
- H001–H064 ligger i `data/data.generated.js`.
- H065 ligger i `data/dilmun-ninti.v887.js`.
- H066–H067 ligger i `data/lilith.v888-draft.js`.
- H068–H069 ligger i `data/ophites-naghammadi.v889-draft.js`.

Det automatiska testet kontrollerar total och unika ID, att samtliga har pilotklassificering inom fyra huvudområden, att den valda huvudsakliga kategorin inte dupliceras bland relaterade områden, och att originalobjekten inte muteras. Dessutom behålls `researchStatus: unknown` för alla.

**Viktiga reservationer:** `pilot-proposal` innebär inte slutgiltigt vetenskapligt godkännande. Testet verifierar struktur och tillgängliga källager, **inte** att alla historiska sakuppgifter eller datum är korrekta. Innehållet i `-draft.js` har fortfarande sin ursprungliga granskningsstatus.

Efter godkänt och sammanfogat auditsteg kan B2.3 fortsätta med O-seriens innehåll och de övriga serierna, före B2.4:s gemensamma filterlogik.
