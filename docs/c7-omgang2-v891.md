# C7 – Religionshistorisk fördjupning, omgång 2

**Status:** Ny testgren; ej publicerad på `main`.  
**Datum:** 17 oktober 2026.  
**Bas:** Sammanslagen och användargodkänd C7-pilot, PR #78 (`main`-commit `dee1647`).

## Varför denna omgång

Första omgången gav individuellt källförankrade analyser åt sex centrala poster. Andra omgången prioriterar övergångar och utvecklingsförlopp där särskilt många historiska missförstånd lätt uppstår: Israels framväxt, kanaaneisk religion, exilens efterspel, Bibelns redaktion samt de apokalyptiska och judiska traditioner ur vilka delar av kristendomen senare växte fram.

## Tio nya individuella religionshistoriska analyser

| Post | Relevans | Viktig reservation |
|---|---|---|
| H011 Merneptahstelen | Ett tidigt utombibliskt namn på Israel | Varken Israels teologi eller uttågshistorien beläggs av inskriften |
| H017 Persien erövrar Babylon | Nya ramar för tempel och diaspora | Kyroscylindern nämner inte judéer uttryckligen |
| H019 Pentateukens redaktion | Torahs sammansatta textutveckling | Ingen universellt accepterad fyrkällemodell och exakt slutdatering |
| H020 Genesis urhistoria | Mesopotamiska paralleller och bibeltextens lager | Motivlikhet ≠ direkt textkopiering |
| H021 Deuteronomistisk historieskrivning | Teologiskt bearbetat historieberättande | Flera konkurrerande kompositionsmodeller |
| H023 Daniel | Apokalyptik i Antiochoskrisens miljö | Bokens äldre berättelser skilda från sena visionskapitel |
| H024 Makkaberupproret | Tempelkris, chanukka, hasmoneiska rikets framväxt | Inte enkelt 'judendom mot grekisk kultur' |
| H025 Första Henoksboken | Andra templets judiska apokalyptik, Judasbrevets citat | Direkta citat gäller specifikt material, inte automatiskt all kanon |
| O027 Tidig israelitisk religion | Historisk kontakt med kanaaneisk gudavärld | Skiftande praxis; inte homogen monoteism |
| O028 Andra templets judendom | Mångfalden bakom judendomens och kristendomens framväxt | Gradvis religionsutveckling, varierande Torahpraktiker |

Notera att post O027 i äldre import är namngiven **Judendom** med underrubrik **Israelitisk religion**. Religionshistorisk analys använder den senare, kronologiskt mer precis, benämningen utan att skriva över grundpostens ID eller titel.

## Genomförande

- Ny datafil `data/c7-religionshistorisk-betydelse.v891.js` med 10 individuella, längre texter.
- Varje text har egen tydlig epistemisk nivå, primärtextanknytning där relevant, förklarad religiös betydelse, avgränsning och minst två identifierbara akademiska källor.
- Datafilen laddas **efter** den godkända C7-piloten men **före** läsarmodulerna. Sex tidigare poster bevaras oförändrade.
- Totalt **16 individuella C7-analyser** i testgrenen.
- Ingen ändring av historiska tidsintervall, C6-källjournal, helgranskningsstatus eller postidentifierare.
- Undersökningarna är **inte liktydiga med fullständig vetenskaplig slutgranskning**.

## Källhantering

Primärt används Oxford University Press, Oxford Bibliographies, museimaterial och namngivna forskare med relevanta publikationer. Särskilt jämförs Lewis för tidig Jahvereligion, Carr och Römer för redaktion och Torah, Newsom/Holm för Daniel, VanderKam/Nickelsburg för Henok, samt Goodman, Reed och Adler för andra templets judendom. Länkarna och författaruppgifterna redovisas direkt i datafilen vid varje post.

## Testlista

1. `node tests/smoke-c7-v891.mjs`: exakt 10 nya analyser, 16 totalt, bibehållna ID:n, källor och statusreservationer.
2. `node tests/smoke-c7.mjs`: tidigare godkänd C7-pilot kvar.
3. `node tests/smoke-reader-universal-v839.mjs` samt övrig statisk kontrollsvit: navigation och sidopanel fortsatt intakt.
4. Testa i Cloudflare Preview **H011, H017, H019, H020, H021, H023, H024, H025, O027, O028**.
5. Kontrollera att **H001** fortsatt saknar intetsägande religionshistorisk standardtext och att **H005**, **H065** och **B001** fortfarande har föregående C7-innehåll.
6. Kontrollera mobil/dator, källänkar, sökning, temaspår och bibelböckernas sidopanel.

**Publiceringsgrind:** Inga nya ändringar på `main` före användarens godkända förhandsgranskning.
