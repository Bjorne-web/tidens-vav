# C7 – Omgång 6: evangelier och tidig apokalyptik

**Datum:** 18 oktober 2026  
**Status:** Preview på separat arbetsgren. **Inte publicerad på main.**  
**Gren:** `c7-religionshistoria-omgang6-20261018`

## Omfattning och princip

Den godkända omgången 5 (PR #91) innehöll C7-texter för romerska Judeen, Jesus, Paulus och Markus. Omgång 6 följer hur olika evangelier, och en judisk-kristen apokalyptisk skrift, omformade och tolkade Jesusrörelsens minnen. Vi fördelar materialet mellan **historiens tidslinjeposter** (H033–H035) och **bibelböckernas egna poster** (B040, B042, B043, B066). Detta är inte nya tidslinjehändelser och skapar inga dubletter.

| ID | Post | Särskild religionshistorisk inriktning |
|---|---|---|
| H033 | Matteus- och Lukasevangeliernas tillkomst | Litterära källrelationer, Markusprioritet, Q och Farrer, dateringsosäkerhet |
| H034 | Johannesevangeliets slutliga form | Logos/vishet, sammansättning, johanneisk gemenskap som hypotes, textens polemik |
| H035 | Uppenbarelsebokens tillkomst | Judisk apokalyptik, Rom, kejsarkult, Domitianus och äldre dateringsalternativ |
| B040 | Matteusevangeliet | Torah, Messias, uppfyllelsemotiv, judisk internpolemik och senare antijudiskt bruk |
| B042 | Lukasevangeliet | Judiskt eskatologiskt hopp, de utsatta, hospitality, Lukas–Apostlagärningarna |
| B043 | Johannesevangeliet | Logos, tidig kristologi, grekspråkig miljö, osäkra gemenskapsrekonstruktioner |
| B066 | Uppenbarelseboken | Patmosförfattaren, romersk maktkritik, Babylon, nytt Jerusalem, senare tolkningar |

## Forskningsunderlag

Artiklarna länkar direkt till bland annat:

- Alicia D. Myers, *An Introduction to the Gospels and Acts* (Oxford, 2021), om Matteus, Lukas och Johannes i judisk och romersk miljö.
- Christopher R. Matthews, *Gospel of Luke*, Oxford Bibliographies (reviderad 2023), om skriftens anonyma författarskap och dateringsdiskussion.
- Isaac W. Oliver, *Luke's Jewish Eschatology* (Oxford, 2021), om hoppet om Israels framtida upprättelse.
- *The Oxford Handbook of Johannine Studies* (2018); Tobias Nicklas (2018), om Johannesevangeliets relation till judendom; Benjamin E. Reynolds (2020) om judisk apokalyptik.
- Craig R. Koester (red.), *The Oxford Handbook of the Book of Revelation* (2020); Steven J. Friesen (2001); Leonard L. Thompson (1990); Warren Carter (2020) om Rom, apokalyptik och kejsarkult.

Källuppgifterna och specifika bibliska kapitlen är klickbara per post. Forskningsreferenserna underbygger var och en ett avgränsat påstående, inte att en hel text är slutligt vetenskapligt granskad.

### Centrala källkritiska reservationer

- *Q* är en litterär rekonstruktion, **inte** ett bevarat handskriftsfynd. Farrerhypotesen är ett relevant alternativ.
- Evangelierna är anonyma i grundtexterna; kyrkliga författartillskrivningar är historiska traditioner som behöver analyseras självständigt.
- Evangeliernas skarpa polemik mot andra judiska grupper får **inte** läsas som en sann beskrivning av judar i allmänhet.
- 'Johanneisk gemenskap' och flera redaktionsstadier är forskningsmodeller som inte kan bevisas direkt ur textens alla detaljer.
- Uppenbarelsebokens författare Johannes identifieras inte utan vidare med evangelisten. Den romerska kejsarkulten var ett brett historiskt fenomen, inte ett bevis för specifika obligatoriska dekret eller universell förföljelse under Domitianus.
- Antika apokalypser får en lång senare receptionshistoria; nutida framtidsscheman ska inte föras tillbaka på första århundradets miljö som säkra historiska fakta.

## Tekniskt utförande

- `data/c7-religionshistorisk-betydelse.v895.js` läses **efter** C7 v890–v894, **före** de befintliga historiska och bibelboksbaserade läsvyerna.
- Sju individuella C7-analyser gör att den kumulativa mängden uppgår till **minst 48** i denna gren, där 41 tidigare godkända bevaras.
- Alla grunddataposternas ID, dateringar och C6-granskningsstatus är oförändrade.
- `tests/smoke-c7-v895.mjs` provar källor, forskningsreservationer, läsarpanel, bibelboksschema och tidigare C7-data i GitHub Actions.

## Preview-test

1. Kontrollera **H033, H034, H035, B040, B042, B043, B066** i Cloudflare Preview.
2. Granska särskilt H033 (Q vs Farrer), B040 (judisk polemik), H034/B043 (Johannesevangeliets judiska sammanhang), H035/B066 (Uppenbarelseboken och Rom).
3. Testa akademiska länkar, bibelställen, mobil-läsare, sökfunktion och temaspår samt att tidigare godkända H026 och B003 fortfarande fungerar.
4. Godkänn publicering **först efter** visuell och redaktionell granskning.

**Inga ändringar på main före användarens godkännande.**
