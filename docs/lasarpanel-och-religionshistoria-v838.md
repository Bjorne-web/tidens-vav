# V8.38 – Sidopanelen och religionshistorisk betydelse

## Utgångspunkt
Användarens dokument **Uppdateringsförslag V8.37** innehåller på sida 1 en skiss med önskad ordning i läsarpanelen och på sida 2 ett tillägg om religionernas historiska utveckling. Detta genomförs i V8.38:s ännu opublicerade testgren.

## Sidopanelens prioriterade ordning

1. Läsbredd och valda läsarkontroller (och befintlig sökfunktion i sidhuvudet).
2. Vald post och knappen Jämför.
3. Postens statusrubrik, ID och titel.
4. **Källförankrad genomgång** (V8.6-artikeln) som huvudinnehåll.
5. Hopfällbar **Samlad forskningsöversikt**.
6. **Historiska samband** och länken till Temaspår.
7. **Övriga befintliga informationsdelar längre ned**, inklusive originalmetadata, varningar, dokumenterade dateringsförslag, källjournal, textförtydliganden och äldre hjälprutor.

Ingen äldre ruta tas bort eller får sin datakälla ändrad. Ordningen tillämpas på befintliga DOM-element för att behålla deras händelsehanterare. På poster utan V8.6-genomgång behålls de äldre fördjupningarna; posterna får ingen fabricerad V8.6-artikel.

## Nytt avsnitt i V8.6-källförankrade artiklar
Rubrik: **Betydelse för Israels religion, judendomen och kristendomen**.

Placering: direkt efter **Konsekvenser och betydelse**, före **Osäkerheter och viktiga preciseringar**.

### O049 – De puniska krigen
**Indirekt kontext, inte direkt religiös påverkan.**
- Roms makt över västra Medelhavet förstärktes av konflikterna med Kartago.
- Senare romersk maktexpansion nådde östra Medelhavet och Judeen 63 f.Kr.
- Detta utgör politisk bakgrund till senare judiskt liv under romersk dominans och den tidiga kristna rörelsen.
- Det är **inte belagt** att de puniska krigen i sig orsakade förändringar i judiska läror eller kristendomens uppkomst.

Institutionella källor:
- [The Metropolitan Museum of Art – The Roman Republic](https://www.metmuseum.org/ja/essays/the-roman-republic)
- [The Metropolitan Museum of Art – The Eastern Mediterranean and Syria](https://82nd-and-fifth.metmuseum.org/toah/ht/04/wae.html)

### O044 – Romarriket
Romerskt styre och administration i Judeen är historisk kontext för tidig judendom och kristendom; detta betyder inte att enskilda dogmer är bevisat avledda ur romersk religion. Källa: Met:s kronologi för östra Medelhavet.

### O043 – Perserriket
Akemenidiskt styre efter babyloniska exilen förändrade de politiska ramarna för judiskt liv. Eventuellt persiskt religionsinflytande måste undersökas separat. Källa: [The Met – The Achaemenid Persian Empire](https://www.metmuseum.org/ja/essays/the-achaemenid-persian-empire-550-330-b-c).

### Övriga poster
Rubriken införs konsekvent i befintliga V8.6-källförankrade genomgångar, men innehållet anger tills vidare att särskild religionshistorisk källprövning återstår. Det är medvetet och ska ersättas med avgränsade, källbelagda analyser per post, inte med generellt eller spekulativt fyllnadsmaterial.

## Teknisk lösning
- `v838-reader-reflow.js`: omläggning av ordningen med befintliga noder och ny avgränsad religionshistorisk del i V8.6-artiklar.
- `v838-reader-reflow.css`: mobilvänlig gruppering, kontrast och avstånd.
- `tests/smoke-reader-layout-v838.mjs`: kontrollerar noder, ordning, ny underrubrik, källhänvisningar och att genomgången inte dubbleras.
- `app.js`, `data/data.generated.js` och Temaspårs tidslinje lämnas oförändrade.

## Att testa före publicering
Testa i Cloudflare Preview på både dator och mobil:
1. Läsarpanel för **O049 Puniska krigen** – läsbredd, vald post, genomgång, ny underrubrik, forskningsöversikt, historiska samband och resten nedanför.
2. O043/O044 – källprövad men kvalificerad religionshistorisk påverkan.
3. En annan V8.6-post – att ingen ogrundad direkt religiös påverkan påstås.
4. En forskningspost och en originalpost utan V8.6-artikel – ingen information förlorad.
5. Knapparna Jämför, Samlad forskningsöversikt, Läsbredd, Sök och Visa sambanden i Temaspår.
6. Grafisk tidslinje i Temaspår, direktlänkar, C6-panel och mobilläsning fungerar som före ändringen.

**Inget av detta gör de historiska posterna vetenskapligt slutgranskade.** C6-måtten förblir oförändrade av en layoutförändring.
