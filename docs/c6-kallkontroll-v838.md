# C6 – Vetenskaplig granskningsetapp V8.38

Senast uppdaterad: 2026-10-14. **Ingen av de 193 posterna är fullständigt slutgranskad.**

## Syfte

Skilja på (1) berättad tid eller uppgiven händelsetid, (2) textens sammansättning och redaktion, och (3) dateringen av bevarade textvittnen och kopior. Dessa tidsnivåer kan skilja sig med århundraden eller mer. Särskilt för antika texter är det metodfel att använda ett kopierat manuskript som ett exakt kompositionsdatum.

## Nya avgränsade källkontroller

### H019 – Pentateukens redaktionsmodeller (1 påstående)
Reinhard Müller, [Positions on Redaction (Oxford Handbook of the Pentateuch, 2021)](https://academic.oup.com/edited-volume/34227/chapter-abstract/290228469) redogör för flera redaktionsteorier och diskuterar externa vittnen från persisk och hellenistisk tid. **Stöder:** att forskningens modeller skiljer sig. **Stöder inte:** ett visst exakt kompositionsår eller avgörande mellan alla modeller. Granskat mot det öppet tillgängliga förlagsabstractet.

### H020 – Genesis 1–11, textens lager (1 påstående)
David M. Carr, [The Formation of Genesis 1–11: Biblical and Other Precursors (OUP, 2020)](https://academic.oup.com/book/32142) presenterar en detaljerad modell med prästerliga och icke-prästerliga strata, möjliga revisioner och interaktion med mesopotamisk litteratur. **Stöder:** att sådana modeller finns och att relationerna är komplexa. **Stöder inte:** en daterad världsomfattande flod, exakt enhetlig komposition eller oomtvistad direkt kopiering från ett bestämt epos. Förlagsabstract och kapitelöversikt har kontrollerats, inte hela monografin.

### H025 – 1 Henok som textsamling (2 påståenden)
- James C. VanderKam, [The Book of Enoch and the Qumran Scrolls (Oxford Handbook, 2011)](https://academic.oup.com/edited-volume/34366/chapter-abstract/291495493). Förlagsabstractet beskriver 1 Henok som olika skrifter, med flera författare och skilda tillkomsttider. Det innebär **inte** att alla delar var färdiga samtidigt.
- Library of Congress / Israel Antiquities Authority, [The Enoch Scroll: 4Q201](https://www.loc.gov/exhibits/scrolls/scr3.html) anger att fragmentet kopierades omkring **200–150 f.Kr.** Detta är dateringen av ett **bevarat fragment**, inte av den föreflodliga berättade tiden eller samlingens totala komposition.

### H034 – Johannesevangeliet och P52 (1 påstående)
Brent Nongbri, [Palaeography, Precision and Publicity (New Testament Studies, 2020)](https://www.cambridge.org/core/journals/new-testament-studies/article/abs/palaeography-precision-and-publicity-further-thoughts-on-pryliii457-p52/1D4E56BF0E9D4DDDA313D0C2754E2F28). Den vetenskapliga artikelns abstract förklarar att en precisionsdatering av **P52 omkring år 125 e.Kr.** inte kan hävdas enbart med paleografi och att möjliga dateringar kan sträcka sig in på 200-talet. **Stöder inte** ett exakt alternativt datum eller att evangeliets komposition därför skedde på 200-talet.

### H056 – Dödahavsrullarna (1 påstående)
[Library of Congress, The Qumran Library](https://loc.gov/exhibits/scrolls/libr.html) beskriver tusentals fragment, många olika texter på hebreiska, arameiska och grekiska. Handskriftssamlingens grova tidsram sträcker sig från **200-talet f.Kr. till 68 e.Kr.** Det är dateringar av vittnen, **inte** en exakt kompositionstid för varje verk som kopierats.

## Läget efter V8.38

- **193/193** poster inventerade (strukturellt).
- **36/193** poster behandlas som egna avsnitt i C6:s åtta tidigare delrapporter; rapporterna är inte fullgranskning.
- **12/193** poster har nu registrerade kontroller mot källor i granskningsjournalen, för sammanlagt **13 enskilda påståenden**.
- **11/11** tidigare föreslagna textförtydliganden överfördes i V8.37.
- **0/193** poster är slutgranskade vetenskapligt.

Måtten avser olika arbetsmoment och överlappar. De får inte summeras till procentuell totalfärdigställning.

## Tekniska avgränsningar

- Ändringar ligger i `data/review-ledger.js`, `data/c6-progress.js` samt `v838-time-levels.js/css`.
- `app.js`, `styles.css` och de genererade posternas originalfält är oförändrade.
- V8.35:s länkar och Temaspårs grafiska tidslinje har separata regressionstester.
- Den extra tidsnivåmarkeringen visas endast för nyregistrerade, explicit avgränsade källkontroller. Den ritar inga ogrundade tidsmarkörer på huvudtidslinjen.
- Test: `node tests/smoke-v838.mjs`, utöver alla tidigare CI-tester.
- Revisionsbehov för kommande steg: pröva artiklarnas primärtext, dateringsargument, forskning i motstående riktningar och eventuella översättningsfrågor. Att läsa och dokumentera ett akademiskt abstract är **inte** en fullständig sakkunniggranskning.

## Godkännande
V8.38 ska först köras som separat Cloudflare Preview. Bekräfta särskilt **Fördjupningar** → källkontroller på H025/H034/H056, C6-status, tidslinjen under Temaspår samt mobilens läsfönster.
