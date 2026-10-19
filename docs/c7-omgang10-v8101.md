# C7 – Religionshistorisk fördjupning, omgång 10 (V8.101)

**Datum:** 19 oktober 2026  
**Status:** Testgren; väntar på användarens testgodkännande.  
**Gren:** `c7-religionshistoria-omgang10-20261019`  
**Bas:** Senast godkänd och publicerad C7 omgång 9, PR #98, commit `fbecec93` på `main`.

## Vetenskaplig avsikt

Detta är en **individuell religionshistorisk fördjupning av befintliga poster**, inte en fullständig C6-helgranskning. Analysdjup, källkritiska reservationer och uppdelningen mellan primärbelägg, akademiska hypoteser och senare judisk/kristen reception följer godkänd omgång 9.

Åtta valda poster var identifierade i den äldre basdatan men saknade dedikerad C7-analys. De bildar ett sammanhängande källkritiskt tvärsnitt från sena bronsålderns kanaaneiska religion till Perserrikets styre.

| ID | Befintlig post | Fördjupning och tydlig gräns |
|---|---|---|
| H047 | Ugaritiska Baalcykeln | Fysiska lertavlor, Baal/El/Athirat, Ps 29 och gemensamt västsemitiskt bildspråk; *inga obevisade direkta kopieringskedjor*. |
| H048 | Kuntillet Ajrud | Jahve av Samaria/Teman och "hans asherah"; gudinna respektive kultobjekt är verklig forskningsdebatt, inte samma etablerade faktum. |
| H049 | Judeiska kvinnostatyetter | Utbredning i hushåll, osäker funktion och koppling till Asherah; bibelns "Himlens drottning" identifieras inte automatiskt med fynden. |
| H050 | Jesaja 40–55 | Exilisk formulering av exklusiv monoteism och Kyros som Jahves redskap; textskiktens tillkomst och socialt genomslag skiljs. |
| H051 | Babylonkrönikan | **597 f.Kr.** är inte Jerusalems senare tempelförstörelse **587/586 f.Kr.**; babyloniskt och bibliskt perspektiv är olika. |
| H052 | Lachishbreven | Primära hebreiska ostraka som belägg för administration och samtida språk; eld-/Azeka-tolkningar förblir omdebatterade. |
| H053 | Elephantine | YHW-templet och petitionen 407 f.Kr.; diversitet i judisk/jahvetrogen persertid kontra centraliseringsidealet i 5 Mos 12. |
| H054 | Kyroscylindern | Marduk och babylonisk kungapropaganda; **inga direkta omnämnanden av Jerusalem eller judarnas återvändande**, trots bibelns berättelse om Kyros. |

## Källornas karaktär och åtkomst

De **28 registrerade källhänvisningarna** omfattar faktiska museiposter (Louvren och British Museum), vetenskapliga publikationer med olika ståndpunkter (bland annat Smoak–Schniedewind och Na'aman–Lissovsky), artiklar i TheTorah.com där författarskap och forskning redovisas, samt direkta bibelkapitel i Bible.com.

**Verifiering och begränsning:** Artikel- och museiposternas identitet och relevans har kontrollerats genom sökning, men varje extern webbadress har **inte** kunnat öppnas end-to-end i en vanlig användarwebbläsare. British Museum kan exempelvis ge 403-svar till automatiska verktyg och enstaka artiklar kan ge 429. Detta är inte bevis för att länken är fel för användaren. Länkkontroll måste därför ingå i manuell testning; försök inte dölja fel genom att ersätta vetenskapliga referenser med generiska sökmotorresultat. Den godkända C7-läsaren erbjuder redan alternativ publikationssökning för vissa förlag.

### Primära källor och akademiska ankare

- **H047:** Louvren AO 16643, faktisk tavla ur Baalcykeln; historiskt diskuterade motivparalleller i Ps 29 och Hab 3.
- **H048:** Jeremy Smoak & William Schniedewind (2019), *Religion at Kuntillet ʿAjrud*; Nadav Na'aman & Nurit Lissovsky (2008) med delvis annan kontextförklaring; Jun Kim (2018) med kritisk ikonografi- och grammatikprövning.
- **H049:** Aaron Greener, arkeologisk översikt över judeiska kvinnliga terrakottafiguriner; ingen tvärsäker Asherah-identifikation.
- **H050:** Historisk-kritiska analyser av Deuterojesajas monoteistiska utsagor och Kyros; övergången från exklusiv Jahvelojalitet till existentiella utsagor nyanseras.
- **H051:** British Museum BM 21946, samt kungaböckernas parallellberättelse.
- **H052:** British Museum BM 125702 och BM 125704, källkritisk läsning av fragmentariska ostraka.
- **H053:** Papyrer om YHW-templet vid Elephantine och brevet till Bagoas från 407 f.Kr.; flera dokumenttyper och sociala praktiker.
- **H054:** British Museums Kyroscylinder BM 90920, samt Ezra och Jesaja; texttyp och innehåll åtskiljs.

## Tekniska gränser

- Ny datafil `data/c7-religionshistorisk-betydelse.v8101.js` laddas **efter** v890–v898 men **före** läsarpanelerna.
- Ny kontroll `tests/smoke-c7-v8101.mjs` bekräftar åtta nya, unika ID, minst 175 ord per individuell analys, källhänvisningar och bibellänkar.
- Totalen i den ordinarie C7-registret ökar från **72 till 80 analyser**; separat publicerade sex nihilism-analyser ligger i annan datamodul. Detta är en registrerad innehållstäckning, inte fullständig vetenskaplig slutgranskning.
- Ingen ändring av `data/data.generated.js`, posttitlar, post-ID:n, historiska datum, C6-progress, källjournal eller kategorier.
- **Viktig samordning med ”4. Tidens väv”:** Behåll publicerade `v900-timeline-landscape.js/css`, de godkända SVG-ikonerna i `v887-home-areas.js`/`v892-topic-navigation.js`, och källkortslänkarna `v899-c7-reader-links.js/css`. Den pågående PR #103 ska inte merjas oförändrad.

## Manuellt test innan publicering

1. Öppna i testversionen H047 och H048. Läs textens källkritiska reservationer om Baal och Asherah; källkortet ska vara samma blå som på tidigare godkända C7-poster.
2. Öppna H049 och H050. Testa bibelställe till Jer 44 respektive Jes 45.
3. Öppna H051 och H052. Kontrollera att kronologisk skillnad 597 / 587–586 tydligt framgår, och prova British Museum-länkarna.
4. Öppna H053 och H054. Jämför Elephantines tempel med 5 Mos 12, samt Kyroscylindern med Esra 1.
5. Stickprov H007 och B065: layout, källor och äldre C7-innehåll ska vara oförändrade.
6. Växla mellan **Börja här** och **Tidslinje**: landskapsbild och ikoner ska finnas kvar, liksom ”Flytta i tiden”, filtret och Gantt-vyn.
7. Publicera på `main` först efter särskilt **Test = OK** från användaren.
