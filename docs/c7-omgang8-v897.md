# C7 – Religionshistorisk fördjupning, omgång 8

**Datum:** 18 oktober 2026  
**Status:** Testgren, inte publicerad på `main`.  
**Gren:** `c7-religionshistoria-omgang8-20261018`  
**Bas:** Godkänd C7-omgång 7, PR #94, commit `340c174`.

## Inriktning

Åtta texter i bibelboksdelen kompletteras med en individuell historisk-kritisk analys av sin betydelse för judiska och tidiga kristna idéer. Brevens namn och traditionella författartillskrivningar är inte automatiskt bevis för faktiskt författarskap. Omgången är särskilt viktig för att dokumentera **hur en paulinsk eftertradition kan ha bearbetat Paulus argument**, och för att skilja det som står i texten från senare kyrkliga tolkningar.

## Poster

| ID | Ämne | Viktig avgränsning |
|---|---|---|
| B049 | Efesierbrevet | Paulus eller efterpaulinsk författare? Kristi kropp och patriarkala hushållskoder |
| B051 | Kolosserbrevet | Författarskap, kristologi, oklara motståndare och förhållandet till Efesierbrevet |
| B053 | Andra Thessalonikerbrevet | Paulusförfattarskap och olika modeller för förväntan om Herrens dag |
| B054 | Första Timotheosbrevet | Författarskap, församlingsledning, undervisning, kön och 1 Tim 2 |
| B055 | Andra Timotheosbrevet | Särdrag gentemot övriga pastoralbrev, förhållandet mellan skrifterna och senare kanon |
| B056 | Titusbrevet | Författarskap, hushållsordning, kvinnor, slavar och församlingsfunktioner |
| B058 | Hebreerbrevet | Anonym predikan, Melkisedek, förbund, templet och tolkningen av Israels skrifter |
| B059 | Jakobsbrevet | Judisk vishet, fattiga och rika, Abraham, tro och handling |

Totalt har **minst 64 C7-poster** egen religionshistorisk analys i omgång 8:s testgren: 56 tidigare och åtta till.

## Källmetod

De centrala forskningsankarna är följande:

- Minna Shkul, *Ephesians*, Oxford Bibliographies (2015). Brevets författarskap, etnicitet, församling och sociala ordning.
- Jerry L. Sumney, *Colossians*, Oxford Bibliographies (uppdaterad 2023). Kristologi, motståndare och författarskap.
- Richard Ascough, *Thessalonians*, Oxford Bibliographies (uppdaterad 2020). Olika bedömningar av de två brevens äkthet.
- Raymond F. Collins, *Pastorals*, Oxford Bibliographies (2010). Historisk forskningsdebatt och särskild bedömning av vart och ett av breven.
- Margaret Y. MacDonald, *The Deutero-Pauline Letters in Contemporary Research*, Oxford Handbook (2014). Paulus eftertradition, gemenskapsordning och kön.
- David E. Aune, *The Pastoral Letters*, Wiley/Blackwell (2010). Institutioner, historisk miljö och författarskap.
- Ellen B. Aitken och David A. deSilva, *Hebrews*, Oxford Bibliographies (uppdaterad 2024). Anonymitet och judisk texthistoria.
- Deborah W. Rooke, *Mysterious Melchizedek* (Oxford 2000). Antik judisk präst- och kungideologi.
- *The Letter of James: Contested Issues* och *The Reception History of the Letter of James*, Oxford Handbook (2024).

Varje post innehåller namngivna, klickbara forskningslänkar samt en biblisk textlänk för egen granskning. Den redaktionella statusen betecknar **en avgränsad forskningsfördjupning**, inte en vetenskaplig helgranskning av hela bibelboken.

## Kritiska begränsningar

1. Författarskapsfrågan måste presenteras separat för Efesierbrevet, Kolosserbrevet, 2 Thessalonikerbrevet och vart och ett av pastoralbreven. Konsensusnivån är inte densamma överallt.
2. Antik pseudepigrafi, sekreterare och kollektivt textskapande är historiska tolkningsfrågor; ingen av dessa modeller får automatisk status som bevisat upphov.
3. Pastoralbrevens uttalanden om kvinnors undervisning och slavar återges utan att godtyckligt tilldelas en obevisad lokal orsak eller en given tidlös tillämpning.
4. Hebreerbrevet är inte historiskt belagt som ett brev av Paulus. Dess templetik och förbundstolkning får inte användas för generaliserande påståenden om judendom som folk eller religion.
5. Jakobsbrevets undervisning om tro och gärningar får inte läsas enbart genom senare protestantiska kontroverser eller antas vara ett direkt svar på ett bestämt bevarat Paulusbrev.

## Teknisk lösning och test

- `data/c7-religionshistorisk-betydelse.v897.js` läses efter v890–v896 och före de befintliga läsvyerna.
- `tests/smoke-c7-v897.mjs` kontrollerar alla åtta nya poster, källkrav och forskningsreservationer samt att 56 tidigare C7-texter finns kvar.
- Ingen ändring av post-ID, datum, historisk grunddata, C6-slutgranskning eller navigering.

**Cloudflare Preview:** B049, B051, B053, B054, B055, B056, B058 och B059. Kontrollera särskilt B054 om 1 Tim 2, B058 om Hebreerbrevet och B059 om förhållandet mellan Jakob och Paulus. Testa mobil, dator, bibellänkar, forskningslänkar och äldre godkända poster.

**Ingen publicering på `main` före separat testgodkännande.**
