# F4.2 – Responsiv läsbarhet, källpresentation och tillgänglighet

**Datum:** 30 oktober 2026  
**Status:** Utvecklat i fristående F4-testgren / utkast PR #379, **inte publicerat eller integrerat**.

## Mål och faktiskt genomförda ändringar
F4.2 bygger vidare på F2:s godkända fullständiga forskningsvy och F4.1:s sex befintliga forskningsfall. Ingen huvudflik eller produktionslayout ändras.

- **Mobil:** fällbar sektionnavigering (`details/summary`) ersätter fast innehållsmeny under 680 px. Innehåll, källa och samband visas i läsordning utan permanenta sidopaneler.
- **Dator/surfplatta:** dokumentets innehåll och relationer ligger i två/tre kolumner enligt F2-design. Sidans bredd och vertikala avstånd anpassas vid 1040 och 680 px.
- **Källobjekt:** visar registertyp, exakt proveniens och att registrerad länk *inte* innebär oberoende vetenskaplig verifiering. Den preciserade källanvändningen `supports` finns i relationen till jämförelsefallet.
- **Forskningsstatus:** ett uttryckligt preliminärt värde märks, och en saknad total granskningsstatus förklaras i stället för att presenteras som säker forskning.
- **Tangentbord:** återgångsknapp och `Escape` återgår till granskningsfilens exempelkatalog; fokus förs tillbaka till den knapp som öppnade läsningen. Den fristående prototypen bevarar katalogens scroll-läge. F4.2 använder lokalt frågeparameter `?record=...` endast för att förhandsgranska ett exempel direkt.
- **Tillgänglighet och innehåll:** tydliga rubriker, `lang=sv`, fokusmål för artikelrubriken, `rel=noopener noreferrer` på källänkar, HTML-escaping av all inskjuten källtext och reducerad rörelse vid användarpreferens.

## Automatiska kontroller
`tests/f4-reader-renderer.test.cjs` utökas med regressionskrav för mobilmenyn, status-/provenienstexter, fokushantering, synlighet för dolda paneler och säker rendering. Tester körs mot sex verkliga källbaserade exempel.

`tests/f4-browser-snapshots.sh` använder en riktig Chrome/Chromium-webbläsare via separat GitHub Actions:
- Dator 1440×1000: **H045**, **O067**, Amarnabrevets källobjekt.
- Mobil 390×844: **B001**, **D001**, frågan *Är Gud god?*.
- Varje test tar PNG-skärmbild, sparar renderad DOM och kontrollerar att sidans beräknade bredd inte överstiger viewporten (horisontellt överflöde).
- Skärmbilder och fristående `full-research-review.html` sparas endast som **GitHub Actions-testartefakt** `f4-standalone-review`, inte på Cloudflare Pages.

### Viktiga avgränsningar
1. Automatisk screenshot + overflow-test **ersätter inte** en kvalitativ visuell granskning av typografi, färgsättning och innehåll på olika mobiltelefoner.
2. Skärmbilder kan endast räknas som verifierade **när den senaste F4-workflowen avslutas med success**. Ange inte godkänt antal i förväg.
3. F4:s lokala `Tillbaka till exemplen` är **inte** appens kommande `Tillbaka till tidslinje/karta/temaspår/jämför`; sessionshistorik, djuplänkar och originalikoner är fortsatt F5:s ansvar.
4. Det här är **F4.2:s isolerade visualiserings-/interaktionspilot**, inte färdig webbapp. Det krävs fortsatt granskning, korrigeringar och separat godkännande av F4 innan någon produktionskoppling eller merge.
5. Alla relevanta vetenskapliga reservationer och originalkällor ska behållas; en längre text eller en museilänk är aldrig ett automatiskt bevis på slutsatser om Israels religion, judendom eller kristendom.

**Skydd:** PR #379 förblir utkast. Inga ändringar i `index.html`, appens sex huvudvyer, originalkartan, Cloudflare Pages, C7-data eller produktionsläsare.
