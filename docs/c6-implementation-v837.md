# V8.37 – C6-förtydliganden överförda till testmiljön

## Avgränsning
Elva textförtydliganden från den separata arbetsgrenen `v8.33-forskningskvalitet` (utkast PR #2) har förts in i `data/c6-text-clarifications.v837.js`. Originalfilen `data/data.generated.js` ändras inte. De befintliga `start`, `end`, `id`, `evidence` och `reviewed` lämnas orörda. Ändringarna rättar eller nyanserar *beskrivningar* och lägger till akademiska källkort. Ingen post får status **fullständigt vetenskapligt slutgranskad**.

## Berörda 11 poster
- **H019 – Pentateukens sammansättning:** flera konkurrerande redaktionsmodeller, inte ett enda handskriftsdatum. Underlag: Reinhard Müller, [*Positions on Redaction*](https://academic.oup.com/edited-volume/34227/chapter-abstract/290228469).
- **H020 – Genesis 1–11:** äldre motiv, textlager och slutredaktion skiljs åt. Oxford Handbooks kapitel om redaktionsmodeller tillåter inte en exakt kompositionsdatering.
- **H021 – Deuteronomistiska historieskrivningen:** alternativa modeller före, under och efter exilen. Thomas Römer, [*The So-called Deuteronomistic History and Its Theories of Composition*](https://academic.oup.com/edited-volume/34226/chapter-abstract/290218228).
- **H023 – Daniels bok:** berättelsernas babyloniska miljö ska inte förväxlas med de apokalyptiska avsnittens tillkomst på 160-talet f.Kr. Carol Newsom, [*Daniel*](https://academic.oup.com/reference/62341/reference-article-abstract/554104979).
- **H024 – Mackabeerupproret:** tempelåterinvigning omkring 164 f.Kr. och senare politisk självständighet är olika steg. [Oxford Bibliographies](https://academic.oup.com/reference/62341/reference-article-abstract/554105746).
- **H025 – Första Henoksboken:** textsamling med olika tillkomsttider och separata handskriftsvittnen. James C. VanderKam, [*The Book of Enoch and the Qumran Scrolls*](https://academic.oup.com/edited-volume/34366/chapter-abstract/291495493).
- **H009 – Amarnabreven:** politisk miljö i 1300-talets Levant, inte bevis för Bibelns senare erövringsberättelse. [Met 24.2.12](https://www.metmuseum.org/art/collection/search/544696).
- **H017 – Kyros erövring av Babylon:** dateringen 539 f.Kr. och den babyloniska kungliga självframställningen. Inget direkt Jerusalemdekret i cylindern. [British Museum, föremål 90920](https://www.britishmuseum.org/collection/object/W_1880-0617-1941).
- **H037 – Egyptisk påverkan på Levanten:** Amarnabreven ger en avgränsad, tidsbunden källa, inte en bild av hela senbronsåldern. [The Met – The Amarna Letters](https://www.metmuseum.org/ja/essays/the-amarna-letters).
- **H042 – Sanherib och Taylorprismat:** skilj 701 f.Kr. års händelse från prismats datering omkring 691 f.Kr. [British Museum, Taylor Prism 91032](https://www.britishmuseum.org/collection/object/W_1855-1003-1).
- **H034 – Johannesevangeliet:** P52 dateras med osäker paleografi; dess tid är inte samma som evangeliets tillkomst. Brent Nongbri, [*Palaeography, Precision and Publicity*](https://www.cambridge.org/core/journals/new-testament-studies/article/abs/palaeography-precision-and-publicity-further-thoughts-on-pryliii457-p52/1D4E56BF0E9D4DDDA313D0C2754E2F28).

## C6:s grafiska status efter ändringen
Alla 193 poster är strukturellt inventerade. C6 har separata delgranskningsrapporter för 36 poster och den publicerade källjournalen innehåller sju kontrollerade enskilda påståenden. **11 av 11 identifierade textförtydliganden är nu tekniskt införda i V8.37:s testgren**. Samtliga bärande delar är fortfarande öppna för vetenskaplig prövning; **0 av 193 är slutgranskade**.

Observera att nämnda kategorier överlappar och har olika nämnare. Ingen redovisning av procentsats för totalt vetenskapligt färdigställande är tillåten baserad på en summa av dessa mått.

## Testning och fortsättning
- Kör `node tests/smoke-v837.mjs` och samtliga tidigare smoke-tester i GitHub Actions.
- Testa först `Fördjupningar`, välj några av de elva korrigerade posterna och läs både källor och reservationer.
- Kontrollera att `Temaspår` behåller grafisk tidslinje och att direktlänkar från V8.35 fortfarande fungerar.
- Ytterligare vetenskaplig granskning krävs för datering, originalkällor och konkurrerande forskningspositioner i dessa och övriga poster. Låt PR #2 vara ett separat källarkiv tills återstående innehåll har genomlysts.

## Versionshantering
Vid publicering uppdateras statusfilen `data/c6-progress.js`; varje verklig ändring ska redovisas i arbetsloggen. Det finns ingen automatiskt pågående forskning eller statusuppdatering utan en ny arbetsomgång och ny publicering.
