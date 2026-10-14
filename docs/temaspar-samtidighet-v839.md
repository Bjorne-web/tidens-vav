# Temaspår V8.39 – utgångspost och samtidiga historiska kategorier

## Krav från användarens test av V8.38
Vald post ska **alltid vara synlig i Temaspårs tidslinje**, oavsett kategori eller om postens datering är vetenskapligt fastställd. Kategorier som är markerade i användarens skärmbild ska **som standard** visas när de har daterbara poster i samma tidsintervall.

Målet är att kunna börja med en händelse i världshistorien och undersöka dess relation till utvecklingen av Israels religion, judendomen och kristendomen – utan att tidsmässig närhet felaktigt likställs med påverkan.

## Sex förvalda kategorier
- Religion & texter (`Religion & texter`)
- Bibelberättelser – berättad tid (`Bibelberättelse`)
- Textens tillkomst (`Bibeltext`)
- Arkeologi (`Arkeologi`)
- Religioner (`Religion`)
- Bibeltexter och berättelser · olika tidstyper (`Bibelberättelser`)

Parenteserna visar datans ursprungliga kategorinamn. Alla tretton befintliga kategorier, inklusive Världshistoria, Krig, Folk och Civilisationer, är valbara i samma panel. De sex ovan är markerade vid ny sidladdning. Användaren kan ändra kategoriurvalet under undersökningen; dessa inställningar påverkar **inte** huvudtidslinjens filter.

## Så byggs den gemensamma tidslinjen
1. Vald post läggs alltid i raden **UTGÅNGSPOST**, även om dess kategori är avmarkerad.
2. För daterbara och redaktionellt bedömda poster används deras bedömda position från `v813BaseEntries()`. Den valda posten kan innehålla flera källbedömda faser.
3. För O049 visas de tre separat kontrollerade puniska krigen: 264–241, 218–201 och 149–146 f.Kr. De delar samma original-ID och öppnar samma läskort.
4. Det aktuella tidsspannet utökas med en kontextmarginal för att synliggöra händelser före och efter. Jämförelseposter tas med när deras bedömda intervall överlappar det synliga tidsfönstret och deras kategori är vald. De grupperas per kategori.
5. Originalposter som saknar separat bedömd datering visas **utan årtalsmarkör** i en särskild rad. Om arkivet innehåller ett användbart äldre intervall får detta bara användas som **sökfönster** för potentiella jämförelser; det är uttryckligen inte en källstödd datering av utgångsposten.
6. Grafisk tidslinje och kronologisk lista visar samma urval och samma valda utgångspost. Läsknappar leder till befintliga post-ID:n.
7. Det äldre fällbara underlaget **Visa fördjupad daterings- och jämförelsekommentar** finns kvar.

Kronologisk samtidighet är en nödvändig möjlig förutsättning för vissa historiska relationer men **inte belägg för orsaks- eller religionshistoriskt beroende**. En sådan koppling måste redovisas med egna källor och forskningsläge i postens fördjupning.

## Påverkan på andra delar av Väven
Detta är en separat förbättring (`v839-temaspar-context.js/css`) som läggs ovanpå den tidigare Temaspårsfunktionen. Den påverkar inte äldre `app.js`, `styles.css`, `data/data.generated.js`, C6-granskningsjournal eller sidopanelens godkända disposition.

Den nya tidslinjen visas enbart när en individuell utgångspost valts. Välj något av de sex **färdiga temaspåren** för att använda deras befintliga urval och grafiska tidslinje.

## Testning
- Kör `node tests/smoke-v839.mjs` samt samtliga tidigare GitHub Actions-tester.
- Välj O049 Puniska krigen: tre faser i den egna utgångsraden, och jämförelseposter från de sex valda kategorierna inom ungefär samma historiska tidsspann.
- Aktivera Världshistoria: ytterligare jämförelser ska visas utan att O049 försvinner.
- Avmarkera Religion & texter: motsvarande jämförelser ska försvinna, men O049 ligga kvar.
- Växla till kronologisk lista: samma poster och datum, och befintliga läsknappar fungerar.
- Välj H017 eller annan forskningspost med bedömd tid och kontrollera den valda postens rad.
- Välj O030: om tid inte är källbedömd ska posten ändå vara synlig **utan** daterad markör och arkivintervall ska uttryckligen vara provisoriskt sökfönster.
- Prova på mobil. Tidslinjen ska kunna rullas i sidled utan att hela sidan behöver breddas.
- Kontrollera att de **färdiga** temaspåren och V8.38:s omarbetade läsarpanel fortsätter att fungera.

## Status
Kodändringen gör ingen forskningspost fullständigt vetenskapligt slutgranskad och ändrar inte C6:s framdriftstal. Publicering till `main` kräver godkänd Cloudflare Preview.
