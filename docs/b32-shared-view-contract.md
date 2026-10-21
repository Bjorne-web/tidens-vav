# B3.2 – Gemensamt designkontrakt för Tidens väv

**Planerings- och testkontrakt. Ingen gränssnittsändring i denna PR.**

## Princip

En och samma postidentitet ska följa med användaren mellan **Tidslinjen**, **Temaspår**, **Jämförelse** och **Läsfönstret**. Postens källdata och forskningsstatus förblir separata från navigation och presentation. Utgå från B2.3:s `primaryArea`, `relatedAreas`, `contentTypes` och `timeKinds` som skrivskyddade analytiska uppgifter, inte som färdiga forskningsslutsatser.

## Vyernas gemensamma kontrakt

| Vy | Ansvar | Övergång |
|---|---|---|
| Tidslinjen | Utforska ordning, tidsintervall och poster med olika tidstyper | Post → Temaspår, Jämförelse eller Läsfönster |
| Temaspår | Visa ämnesmässiga samband utan att ge motivlikhet status som belagd påverkan | Bevara ursprungspost och vald temakontext |
| Jämförelse | Ställa två eller flera poster och deras evidens- och tidsdimensioner bredvid varandra | Bevara vald mängd och aktiv utgångspost |
| Läsfönstret | Visa originaluppgift, tolkning, källvittnen och forskningsreservationer separat | Tillbaka till samma vy och vald post |

## Minsta navigationskontext

- `selectedPostId`: stabilt ursprungligt ID; ingen identitet baserad på rubrik (23 poster delar rubriker).
- `originView`: vy som öppnade posten och behövs för tillbakagång.
- `comparisonIds`: ordnad samling ID:n utan dubletter (endast relevant för Jämförelse).
- `themeContext`: valfritt tema som inte får ändra originalpostens identitet.
- `timeDimension`: explicit val av berättad tid, historisk händelse, textens tillkomst, materialvittne eller reception när underlag finns.
- `returnContext`: tidigare vyinställningar, inklusive tidsintervall och användarens val.

Post-ID får inte automatiskt kompletteras med O066. Varje saknad post ska hanteras tydligt, inte ersättas av en annan post.

## Synliga principer inför B3.3

1. Fyra huvudingångar: Bibeln, Religioner, Världshistoria och Idéer & kunskap. De kompletterar vyerna; de ersätter inte navigationen.
2. För O095–O126: visa aldrig exilrubriker eller 70–100 e.Kr. som om de vore källprövade tidpunkter för berättade händelser. Berättad tid och textkomposition skiljs i presentationen.
3. För H066–H069: kompletteringsfiler markerade arbetsutkast får inte automatiskt visas som slutgranskad forskning.
4. Alla ändringar i filter, Gantt, mobilvy, djuplänkar eller gränssnitt görs först i separat reversibel UI-pilot.
5. Befintlig navigering och C7:s vetenskapliga arbetsflöde behåller företräde. Detta kontrakt styr endast kommande tester och designbeslut.

## Godkännandegrind

Före UI-implementation krävs godkännande av sammanhängande vyflöde, mobilstrategi, filtersemantik, djuplänkar och återgång. Jämför antalet poster och navigationsmöjligheter före/efter en pilot. C7-data och källprövning ändras inte genom kontraktet.

**Rapporteringskrav:** varje uppdatering ska innehålla en **illustrativ etappöversikt** med markerad avslutad, pågående och återstående B3-del. Grafik/progress är schematisk, aldrig uppmätt färdigställandegrad.
