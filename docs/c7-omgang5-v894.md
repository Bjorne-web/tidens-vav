# C7 – Religionshistorisk fördjupning, omgång 5

**Datum:** 18 oktober 2026.  
**Arbetsgren:** `c7-religionshistoria-omgang5-20261018`.  
**Status:** under test. Inte godkänd eller publicerad på `main`.  
**Utgångspunkt:** användargodkänd och sammanslagen C7 omgång 4, PR #87 (commit `2ba3ec7`).

## Syfte

Förstå hur det romerska styrets förändringar påverkade andra templets judendom och hur en judisk Jesusrörelse utvecklade de tidigaste bevarade kristna texterna. Materialet får aldrig läsa senare kyrkoteologi direkt bakåt som om den var en empirisk rekonstruktion av varje detalj under Jesu liv.

## Nya individuella fördjupningar

| ID | Ämne | Säkerhetsgräns |
|---|---|---|
| H026 | Romerskt styre i Judeen, år 63 f.Kr. | Pompejus erövring ≠ direkt romersk prefektadministration under hela perioden |
| H027 | Jesu födelse | Herodes och Quirinius ger kronologisk spänning; exakt födelseår och födelseplats kan inte verifieras |
| H028 | Jesu offentliga verksamhet | Judisk kontext tydlig; enskilda ord och scener kräver textkritisk prövning |
| H029 | Jesu korsfästelse | Romersk avrättning under Pilatus har starkt stöd, exakt dag osäker; inget kollektivt judiskt ansvar |
| H030 | Paulus autentiska brev | Sju brev med brett accepterat författarskap; 1 Kor 15 är ett tidigt textvittne, inte bevis för övernaturliga processer |
| H031 | Markusevangeliets tillkomst | Vanlig datering ca 65–75; Markusprioritet dominerar men Q är en hypotes och exakt datering osäker |

## Granskad forskningsinramning

- **Romersk och judisk historia:** Jodi Magness (2024), Andrew M. McClellan (2026), David A. deSilva (2024), Martin Goodman.
- **Födelse och kronologi:** Alden A. Mosshammer (2008) och Leroy A. Huizenga (2020), inklusive alternativa försök att förstå Quiriniusuppgiften.
- **Jesu förkunnelse:** Graham Stanton och Christopher Bryan om Guds rike och den judiska miljön.
- **Korsfästelse:** Helen K. Bond (2013, 2023), Nathanael J. Andrade (2025).
- **Paulus:** D. Moody Smith, Stephen J. Chester m.fl. (2025), Teresa Morgan (2020).
- **Markus:** James Keith Elliott (2015), Matthew Larsen (2023), S. G. F. Brandon om dateringsfrågan.

Varje post redovisar egen vetenskaplig bedömning och klickbara, särskilt identifierade forskningskällor. Bibelhänvisningar öppnar motsvarande kapitel/vers i Svenska Folkbibeln 2015 via YouVersion, där sådana källor tillförs.

## Tekniskt

- Ny datafil `data/c7-religionshistorisk-betydelse.v894.js` med sex avgränsade analyser, ingår efter v890–v893 och före läsaren.
- Ny `tests/smoke-c7-v894.mjs`, som kontrollerar både själva källavgränsningen och att innehållet visas med länkar.
- Ursprungliga H-poster, tidsintervall, karta och C6-källjournal förändras inte.
- **Minst 41** individuella C7-dossierer i denna arbetsgren, baserat på de 35 föregående och dessa sex. Detta är **inte** 41 fullständigt vetenskapligt slutgranskade poster.

## Förhandsgranskning

1. Kör GitHub Actions och `node tests/smoke-c7-v894.mjs` samt övriga C7-tester.
2. I Cloudflare Preview: kontrollera **H026–H031**. Läs särskilt kronologin i H027, den historiska gränsen i H029 och Q-hypotesen i H031.
3. Testa forskningslänkar, bibellänkar, Temaspår, navigering och mobilvisning.
4. Kontrollera att de tidigare B001–B005 samt H065, O027 och O076 behåller godkänt C7-innehåll.
5. Kontrollera en post utan individuell C7-text, exempelvis H001, så att intetsägande reservtext fortfarande är dold.

**Publicera inte förrän användaren testat och godkänt.**
