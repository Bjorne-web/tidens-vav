# B3.3 – Respektera befintlig navigering på Hem

Den befintliga visuella designen på Cloudflare har godkänts och är styrande. För de redan fungerande korten Bibeln, Religioner och Historia har vi förstärkt händelsehanteringen i `v914-home-paths-c3.js`.

När en målknapp tillfälligt saknas får kortets standardhantering vara kvar: vi avbryter **inte** längre klicket utan att kunna navigera. Kända kort med tillgängliga mål använder samma vyer och befintliga filter som tidigare. Filosofi/Idéer förblir utanför denna pilot.

Testet kör en simulerad DOM-händelse och verifierar att avbrutna klick bara sker när en verklig navigationsknapp finns. Det ersätter **inte** ett visuellt test i en Cloudflare-förhandsvisning.

**Orörda:** `index.html`, startsidans bild, SVG:er, CSS, tidslinjens layout, poster, dateringar och C7.

**Illustrativ process:** B2.3 färdig → B3.1 färdig → B3.2 färdig → **B3.3 inkrementell integration i godkänd design pågår** → B3.4 återstår.
