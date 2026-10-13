# Tidens väv – webbutveckling

Publicerad statisk webbapp: https://tidens-vav.pages.dev

## Arkitektur och kostnad
- Hosting: Cloudflare Pages (statisk webbplats på gratisnivån).
- Källkod: GitHub. Produktionsgren: `main`.
- Ändringar görs i separata utvecklingsgrenar och testas via Cloudflare Preview innan de förs över till `main`.
- Ingen betal-API, backend eller extra domän behövs för detta upplägg.
- Den fullständiga källdatan och `build.py` finns fortfarande i det separata projektpaketet. Filen `data/data.generated.js` är genererad, inte den primära forskningskällan.

## Mappstruktur i detta repository
- `index.html` – ingångssida (i roten).
- `app.js` och `styles.css` – befintligt program (i roten, inte i `src/`).
- `data/data.generated.js` – levererade forsknings- och tidslinjedata.
- `assets/` – exempelvis bakgrundskarta.
- `v833-temaspar.js` och `v833-temaspar.css` – avgränsade förbättringar från V8.33.

## V8.33 – temaspår för granskning
- Valfri forsknings- eller originalpost kan väljas som **Aktuell undersökning**.
- De sex färdiga temaspåren finns kvar, som en **separat** ingång.
- Den valda posten syns även i avsnittet för historiskt sammanhang.
- För en dateringsbar forskningspost visas kronologiskt närliggande poster som jämförelsepunkter, **inte** som bevisade orsakssamband.
- En ursprungspost utan vetenskapligt försvarbar tidsplacering får ingen påhittad placering.
- Historiska relationer från den tidigare modellen behålls utan nya konstruerade beroenden.

## Testlista före merge
1. Välj Temaspår på dator och mobil, kontrollera att Aktuell undersökning ligger överst.
2. Välj `O030` (Zoroastrism). Kontrollera att utgångsposten syns och att inget ogrundat årtal visas.
3. Välj `H017` (Persien erövrar Babylon). Kontrollera kronologisk kontext och att närhet i tid inte beskrivs som beroende.
4. Byt till ett av de sex färdiga temaspåren, kontrollera att egen undersökning återställs.
5. Gå från Fördjupningar till Visa sambanden i Temaspår. Kontrollera orienteringen och återgång.
6. Kontrollera knapparna Läs vald post och Se posten i huvudtidslinjen, mobilmenyer, karta och JavaScript-konsol.

## Gränser
- V8.33 innebär **inte** en vetenskaplig slutgranskning av forskningsposter.
- Kortens närhet i tid innebär inte att geografiska eller religiösa relationer har belagts.
- Externa källor och Leaflet kan påverkas av nätverksåtkomst.
- The World Behind the Word ändras inte; integration ska ske stegvis med stabila post-id och tydligt källunderlag.
