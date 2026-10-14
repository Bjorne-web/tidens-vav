# Tidens väv ↔ The World Behind the Word
## Stabilt länkkontrakt, version 1 (V8.35)

**Beslutad riktning:** The World Behind the Word är på sikt huvudappen. Tidens väv är tills vidare ett separat, kostnadsfritt historiskt verktyg som ska kunna integreras utan tidig sammanslagning.

Detta dokument beskriver bara hur apparna kan **länka till en specifik post**. Det är inte ett gemensamt API, inte ett påstående om delad forskningsdatabas och inte en färdig integration i huvudappen.

### Format för inkommande HTTPS-länkar

`https://tidens-vav.pages.dev/?tv_id=H054&tv_view=explore`

- `tv_id` är Tidens vävs stabila post-ID, exempelvis `H054` (Kyroscylindern), `H041` (Tel Dan-stelen) eller `O030` (Zoroastrism).
- `tv_view` väljer ingång: `explore` (Temaspår, förvalt), `timeline` (tidslinje) eller `research` (forskningsvyn).
- Ett känt post-ID kan öppnas även när posten saknar säker datering. Tidslinjen ska då förklara begränsningen i stället för att hitta på ett årtal.
- Ogiltigt eller okänt ID ger ett förklarande meddelande, inte en automatisk omdirigering till en annan historisk post.
- Länkad post är en **undersökningspunkt**, inte ett påstående om att dess tolkning är slutgranskad.
- Länkformatet är avsiktligt versionsoberoende: det innehåller inte `V8.35`.

### Exempel
- `https://tidens-vav.pages.dev/?tv_id=H054&tv_view=explore`
- `https://tidens-vav.pages.dev/?tv_id=H041&tv_view=timeline`
- `https://tidens-vav.pages.dev/?tv_id=O030&tv_view=research`

### Förvaltningsregler
1. **Återanvänd aldrig ett befintligt post-ID till en annan historisk företeelse.**
2. Behåll länkarna kompatibla när rubriker, dateringar eller layout ändras.
3. Vid framtida sammanslagning måste dubblerade forskningsposter få en tydlig mappning mellan respektive apps egna ID:n. Dela inte texter enbart för att titlarna liknar varandra.
4. Håll dateringskategorier, källhänvisningar, granskningsjournal, forskningsposition och berättad tid skilda åt.
5. Ingen `postMessage`-kommunikation eller åtkomst till The World Behind the Words privata data införs av detta kontrakt. En sådan integration kräver separat beslut och säker origin-kontroll.
6. Länken fungerar utan externa API:er, konton, ny server eller extra hostingkostnader.
7. Tidens väv förblir en fristående app som kan undersökas oberoende av Bibeln.

### Testning
`node tests/smoke-v835.mjs` kontrollerar kända och ogiltiga ID:n, tillåtna vyer, genererade URL:er och val av målpost. GitHub Actions kör detta tillsammans med V8.34:s befintliga kontroller.

**Före produktionspublicering:** kontrollera Cloudflare Preview på dator och mobil. Prova att klistra in exempeladresserna i webbläsaren, att kopiera en postlänk i läsfönstret och att navigera tillbaka. Bekräfta särskilt att ingen påhittad kronologisk eller kausal relation uppstår.

### När huvudappen ska integreras
Nästa designarbete i *The World Behind the Word* är att avgöra på vilka bibeltext- och forskningssidor en länk till Tidens väv är relevant. Den andra appens faktiska tekniska integration ska **inte** påbörjas förrän dess kod och identifierare är granskade.
