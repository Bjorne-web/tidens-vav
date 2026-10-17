# C7 – inventering och första religionshistoriska fördjupningen (arbetsgren)

**Datum:** 2026-10-16  
**Status:** Arbetsgren, testas innan godkänd publicering. **Inte vetenskapligt slutgranskat.**  
**Gren:** `c7-religionshistoria-pilot-20261016`  
**Befintlig produktionsgren (`main`) lämnas oförändrad i denna omgång.**

## Inventerat tekniskt underlag

- `data/data.generated.js` innehåller **64 forskningsposter (H001–H064)** och **129 originalposter (O...)**, sammanlagt **193**.
- `data/dilmun-ninti.v887.js` kompletterar med **H065** om den saknas. I faktisk läsvy blir det därför **194 historiska poster**.
- `data/bible-books-v857.js` innehåller **66 bibelböcker**, med separat läsvy i `v858-book-reader.js`.
- Hela den aktuella materialmängden är därmed **260 visade objektstyper/poster (194 + 66)**. Detta är en *teknisk* översikt, inte en värdering av hur många posttexter som är vetenskapligt fullständiga.
- Reservtexten var implementerad i `v839-reader-unified.js` för alla poster utan en specifik religionstext, i `v838-reader-reflow.js` för äldre V8.6-artiklar och i `v858-book-reader.js` för bibelböcker.
- Innan C7 fanns särskilt avgränsade religionshistoriska texter för vissa poster, däribland O030 (zoroastrism), H005/O067 (flodberättelse) och O043/O044/O049 (persisk/romersk historisk kontext). De ska inte ersättas slentrianmässigt.

## Redaktionell modell

**C7-analyser bygger på dokumenterbara, individuella påståenden.** Vi skiljer mellan:

1. Historiskt belagt sammanhang (händelse, kontakt, bevarat vittne).
2. Text- eller motivparallell utan belagd enskild överföringsväg.
3. Specifik hypotes om påverkan eller mottext, som tillskrivs aktuell forskning.
4. Avsaknad av tillräcklig evidens; inget samband får hittas på för att fylla en mall.

En C7-post måste innehålla en saklig sammanhängande förklaring, en avgränsad epistemisk nivå, kontrollerbara källor och en tydlig begränsning. Identiskt upprepade standardsatser ska inte användas som ersättning för analys. En historiskt irrelevant post kan sakna avsnittet helt.

## Pilot: sex innehållsposter

| ID | Post | Centralt samband | Bedömning |
|---|---|---|---|
| H004 | Atrahasis | Genesis 6–9, flodtraditioner | Motivparalleller belagda; överföringsväg öppen |
| H005 | Gilgamesheposet | Tavla XI och Noaberättelsen | Stark textparallell; inga förenklade kopieringspåståenden |
| H006 | Enūma eliš | Genesis 1 och babylonisk skapelseideologi | Kulturell bakgrund; specificerad mottextshypotes |
| H016 | Jerusalems fall och exilen | Jeremias, Hesekiels och senare traditionsbildning | Direkt historiskt sammanhang; ingen omedelbar monoteistisk brytpunkt påstås |
| H065 | Enki, Ninhursag, Dilmun och Ninti | Genesis 2–3, revben/sida och liv | Historisk jämförelse; direkt översatt ordvits inte belagd |
| B001 | Första Moseboken | Judisk Torah, kristet GT och forntida berättelsetraditioner | Central kanonisk roll; sammansatt tillkomst |

**Observera:** Ninti-exemplet baseras på Oxford ETCSL men presenteras inte som ett direkt textberoende. `ti`-ordleken är en forskningshypotes och ETCSL:s rad 279 ger dessutom en annan kontext för Nintis funktion. Genesis 2:21–23 och 3:20 måste behandlas som två olika verssammanhang.

## Gränssnitt och status

- `data/c7-religionshistorisk-betydelse.v890.js` tillför en fristående källdatamodell knuten till **existerande ID:n**.
- `v839-reader-unified.js` visar ett eget religionshistoriskt avsnitt med källor **bara** när en individuell bedömning finns.
- `v838-reader-reflow.js` respekterar C7 i äldre källartiklar och bevarar de tre tidigare avgränsade O043/O044/O049-analyserna.
- `v858-book-reader.js` visar C7 för B001 men tar bort likalydande platshållare för övriga böcker; övriga forskningsfördjupningar finns kvar.
- Inga historiska datum, kategorier, post-ID, källjournaler eller C6-helgranskningsstatusar förändras.
- **En källhänvisad C7-fördjupning innebär inte att hela posten är vetenskapligt slutgranskad.**

## Fortsatt prioritering

Prioritera i nästa omgång H011 (Merneptah), H017 (Babylon), H019–H025 (textens tillkomst), O027/O076 (gudaförsamling och El/Baal/Jahve), O030 (befintlig källprövning och revidering vid behov), samt bibelböckerna B002–B005. Välj nya ämnen efter kunskapsvärde, samband och kvalitet på primärkällor – inte endast efter avsaknad av text.

## Godkännande och kontroll

1. `node tests/smoke-c7.mjs`
2. `node tests/smoke-reader-universal-v839.mjs` (uppdaterad för att inte kräva en tom standardrubrik på samtliga poster)
3. Ordinarie kontrollsvit i GitHub Actions.
4. Visuell kontroll i Preview av H004, H005, H006, H016, H065 och B001, samt en post utan C7 (t.ex. H001). Kontrollera även mobil, källänkar och tidigare O043/O044/O049.
5. Publicera på `main` endast efter användarens testgodkännande. Det är **inte** samma sak som vetenskaplig helgranskning.

## Forskningskällor

Källorna är integrerade per post i datamodellen. För pilotens övergripande metodik: Oxford University Press (David M. Carr, *The Formation of Genesis 1–11*, 2020), Metropolitan Museum of Art (mesopotamisk skapelse och judisk diaspora), British Museum (Atrahasis, Gilgamesh och babyloniska tavlor) samt Oxford ETCSL (Enki och Ninhursag).
