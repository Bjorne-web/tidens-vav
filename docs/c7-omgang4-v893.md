# C7 – Religionshistorisk fördjupning, omgång 4

**Datum:** 18 oktober 2026  
**Status:** testgren, inte publicerad på `main`  
**Gren:** `c7-religionshistoria-omgang4-20261018`

## Syfte

Fördjupa samtliga fem Moseböckers religionshistoriska sammanhang utan att sammanblanda deras berättade tid med textens tillkomst och senare religiösa tolkningshistoria. Genesis (B001) ingår redan i godkänd C7-pilot; denna omgång kompletterar **B002–B005** och två nära anknutna historiska poster (**H007, H010**). Fokus på att skilja antika lagar, historisk minnesbildning, teologisk framställning och nutida tillämpning.

## Sex individuella analyser

| Post | Religionshistorisk huvudfråga | Vetenskaplig gränsdragning |
|---|---|---|
| B002, Andra Moseboken | Uttåg, befrielse, förbund, Sinai och lag | Textens lager och historisk händelse separeras; Wrights direktlån av Hammurabi diskuteras med alternativ |
| B003, Tredje Moseboken | Kult, prästskap, renhet, helighet och land | Prästerliga och helighetstraditioner redovisas utan att den teologiska tredelningen av lagen projiceras bakåt |
| B004, Fjärde Moseboken | Ökenvandring, folkgemenskap och prästerlig ordning | Berättelsens folkräkningar betraktas inte som oberoende arkeologiska befolkningsdata |
| B005, Femte Moseboken | Shema, exklusiv Jahvelojalitet och lagreform | Assyriska fördragsparalleller redovisas som omdiskuterat textförhållande |
| H007, Hammurabis regering | Mesopotamiska lagtexter och 2 Mos 21–23 | Wright, Edenburg och Van Seters skiljer sig om beroendeförhållanden och redaktion |
| H010, Mose och uttåget | Kulturellt minne och historiska miljöer | Historiska kärnhypoteser skiljs från belägg för storskaligt bibliskt uttåg |

## Verifierade akademiska läsvägar

Primär vetenskaplig grund: Thomas B. Dozeman, *Book of Exodus* (Oxford Bibliographies); David P. Wright, *Inventing God's Law* (Oxford, 2009); John Van Seters, *A Law Book for the Diaspora* (Oxford, 2002); Jeffrey Stackert, *Priestly/Holiness Codes* (Oxford Bibliographies); Reinhard Achenbach, *Priestly Law* (Oxford Handbook, 2019); Mary Douglas, *In the Wilderness* (Oxford, 2001); Adriane Leveen, *Becoming Israel in the Wilderness of Numbers* (Oxford Handbook, 2015); Stephen C. Russell, *Near Eastern Practice of Law in Deuteronomy* (Oxford Handbook, 2020); Laura Quick, *Deuteronomy 28 and Ancient Near Eastern Curses* (Oxford, 2017); Ronald Hendel, *The Exodus in Biblical Memory* (Oxford, 2005). Hoffmeier, *Israel in Egypt* (Oxford), tillför en mer historiserande argumentationslinje.

De individuella artiklarna innehåller direkta forskningslänkar och bibeltexter för källkontroll. Det sammanfattade forskningsläget är **inte** en slutgranskning av varje akademisk detalj eller en generell acceptans av en viss textteori.

## Integration och bevarande

- Datamodell: `data/c7-religionshistorisk-betydelse.v893.js`, lastas efter v890, v891 och v892 före läsvyerna.
- Bokposter använder befintlig `v858-book-reader.js` och dess C7-anslutning. Historiska H-poster använder `v839-reader-unified.js`.
- Inga ändringar av originaldateringar, grundposter, forskningsjournalens status eller gamla publikationer.
- Den redan godkända C7-sviten och parallella godkända poster ska bevaras.
- Totalt **minst 35** individuella C7-analyser efter denna batch, inklusive tidigare parallella godkännanden.

## Testgrind

1. Kör `node tests/smoke-c7-v893.mjs` och tidigare C7-testers regressionskontroller.
2. GitHub Actions statiska kontroller och obligatoriska C7-krav.
3. Kontrollera Cloudflare Preview **B002, B003, B004, B005, H007 och H010**; testa direkta källänkar, både bibelboks- och historieläsaren, mobil och skrivbord.
4. Verifiera särskilt B003 (sammanhang för Leviticus lagtexter), B005 (fördragsparalleller), H007 (lån eller gemensam rättsmiljö), H010 (olika historiska teorier).
5. Kontrollera att B001, H065 och H066–H069 samt andra C7-fördjupningar finns kvar och att H001 inte får en irrelevant standardtext.

**Publicering endast efter användarens testgodkännande.**
