# C7 – Religionshistorisk fördjupning, omgång 9

**Datum:** 18 oktober 2026  
**Status:** Testgren; ännu inte publicerad på `main`.  
**Gren:** `c7-religionshistoria-omgang9-20261018`  
**Bas:** Godkänd C7 omgång 8, PR #95, GitHub-commit `c8f8099`.

## Syfte

Färdigställ en **individuell religionshistorisk analys för alla 27 kanoniska nytestamentliga böckerna**. Detta avser endast C7:s avsnitt om respektive boks betydelse och utgör inte en vetenskaplig helgranskning av varje bok. Posternas identitet, dateringar, källjournal och övriga C6-statusar ska vara oförändrade.

## Åtta nya fördjupningar

| ID | Bok | Religiös utveckling och centrala reservationer |
|---|---|---|
| B041 | Markusevangeliet | Markusprioritet och judisk kontext; anonym text; Mark 16:9–20 tillhör inte den tidigast rekonstruerbara texten |
| B052 | Första Thessalonikerbrevet | Mycket tidig äkta Pauluskorrespondens; eskatologi och diskussion om 1 Thess 2:13–16 |
| B060 | Första Petrusbrevet | Författarskapsdebatt; diasporaidentitet och lidande utan påstått universellt förföljelsedekret |
| B061 | Andra Petrusbrevet | Vanligen bedömt som senare pseudonym skrift; Judasparalleller, parusians fördröjning och kanonhistoria |
| B062 | Första Johannesbrevet | Kristologiska konflikter, kärlek, osäker motståndarkonstruktion; antikristretorik |
| B063 | Andra Johannesbrevet | 'Den äldste', mottagarens identitet, kärlek och gränser för gästfrihet |
| B064 | Tredje Johannesbrevet | Gajus, Diotrefes, resande förkunnare och lokala auktoritetskonflikter |
| B065 | Judasbrevet | Direkt citat ur 1 Henok 1:9; gemensamt stoff med 2 Petrus och receptionshistorien |

## Källor som faktiskt verifierats och används

Nya primära forskningsankare omfattar:

- James Keith Elliott, *Gospel of Mark*, Oxford Bibliographies (2015), och Marie Noonan Sabin, *Reopening the Word* (Oxford, 2002).
- Richard Ascough, *Thessalonians*, Oxford Bibliographies (2020), och Laura Salah Nasrallah, *On History and Love: Thessalonikē* (Oxford 2018).
- Duane F. Watson, *1 Peter: Contested Issues* (Oxford 2024), och David G. Horrell (2002), samt diskussionen om socialt lidande.
- Travis B. Williams, *2 Peter and Jude: Contested Issues* (Oxford 2024), A. Chadwick Thornhill, *2 Peter* (Cambridge 2025).
- Urban von Wahlde, *Johannine Letters*, Oxford Bibliographies (2018), och William M. Wright IV, *The Johannine Letters: Contested Issues* (Oxford 2024).
- James M. Scott, *Jude the Obscure* (2023), Simon J. Joseph (2013), Nicholas J. Moore (2013) om Första Henoksbokens roll i Judasbrevets text och reception.

Varje C7-dossier innehåller sin egen religionshistoriska bedömning, källkritiska begränsningar, forskningslänkar och bibliska primärtexter för vidare läsning. Direkta textsamband (Judas/1 Henok) hålls isär från möjliga motivparalleller. Inte heller likhet mellan johanneiska skrifter ger säker identitet mellan författarna.

## Särskilda granskningspunkter

1. **B041:** separera handskrifternas senare slutvarianter från Markus ursprungliga textform; förklara inte Markus enbart som källa till Matteus/Lukas.
2. **B052:** äkthet och tidig datering skiljs från osäkerhet kring interpolationshypotesen för 1 Thess 2:13–16.
3. **B060–B061:** bedöm författarskapet olika för respektive brev; koppla förföljelsebilder till verkliga romerska sociala förhållanden.
4. **B062–B064:** brevets egna aktörer och motståndare skiljs från moderna rekonstruktioner av en enda johanneisk gemenskap.
5. **B065:** citatet ur Henok 1:9 beläggs direkt. Detta får inte göras till bevis för att hela Henoksboken var kanonisk i varje judisk eller kristen tradition.

## Teknisk och innehållslig testplan

- Ny modul: `data/c7-religionshistorisk-betydelse.v898.js`, inläst efter v890–v897 och före båda läsarpanelerna.
- Ny kontroll: `tests/smoke-c7-v898.mjs`, som räknar **27 av 27 NT-böcker med C7-text**, granskar åtta nya bedömningar, källor och att tidigare texter är kvar.
- Totalt minst **72 individuella C7-analyser**, varav tidigare 64 är användargodkända.
- Ingen ny post skapas. Befintliga ID, historiska dateringar, C6-statusar, kartor och navigering bibehålls.
- I Cloudflare Preview ska **B041, B052, B060, B061, B062, B063, B064 och B065** öppnas. Verifiera samtidigt B054, B066, H065, sökning, källänkar och mobilvisning.
- Kontrollera särskilt Judasbrevets hänvisning till Henok och att läsarpanelen inte återinför generisk religionstext.

**Publicering på main först efter användarens testgodkännande.**
