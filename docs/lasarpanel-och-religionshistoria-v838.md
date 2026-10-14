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


## Komplettering efter test: Puniska krigen saknades i Temaspårs tidslinje

Användarens skärmbild visade att **O049 Puniska krigen** valdes som utgångspost, men att den grafiska tidslinjen i stället visade det färdiga spåret **Israels framväxt**. Orsaken var att V8.33:s rutin för egna undersökningar avfärdade *samtliga originalposter* som odaterbara, även sådana där en separat källförankrad genomgång redan anger väletablerade årtal.

V8.38 korrigerar nu enbart den uttryckligen källkontrollerade originalposten **O049**. Tidslinjen visar tre avgränsade faser med gemensamt original-ID (så läsknappen leder till den verkliga posten):

- **Första puniska kriget:** 264–241 f.Kr.
- **Andra puniska kriget:** 218–201 f.Kr.
- **Tredje puniska kriget:** 149–146 f.Kr.

Källor: [Dexter Hoyos, *Punic Wars*, Wiley 2011](https://onlinelibrary.wiley.com/doi/abs/10.1002/9781444338232.wbeow506) och [Metropolitan Museum of Art – Italian Peninsula, 1000 B.C.–1 A.D.](https://www.metmuseum.org/pt/toah/ht/04/eust.html).

Detta är en **avgränsad kontroll av datum och krigsindelning**, inte en helgranskning av O049. Originalpostens importerade intervall och forskningsjournalen ändras inte. Inga nya, icke-existerande post-ID:n skapas. I listläge ska samma tre krig finnas.

**Övriga originalposter** utan separat försvarbar datering förblir odaterade i undersökningsläget och kan endast få separat orienteringsspår med tydlig varning. När fler originalposter källkontrolleras kan de föras in i samma avgränsade datumregister.

### Att kontrollera efter denna rättning
1. Välj O049 under Temaspår. Det ska stå **De puniska krigen** som utgångspost och visa **första, andra och tredje puniska kriget** inom cirka 300–110 f.Kr.
2. Växla **Grafisk tidslinje / Kronologisk lista**. Alla tre faserna ska finnas i båda.
3. Öppna något av krigskorten. Samtliga leder till originalpost **O049**, inte till ett påhittat underpost-ID.
4. Välj t.ex. **O030**. Det får fortfarande inte en påhittad dateringsmarkör.
5. Kontrollera att sidopanelens godkända utformning och de färdiga temaspåren fungerar som förut.

CI inkluderar utökade tester i `tests/smoke-v835.mjs` för krigsintervallen, att tidsaxeln har eget tema, att sammanhängande originalperiod inte maskeras som ett enda krig och att listvyn fungerar.
