# V8.33 – första implementerade forskningskorrigeringar

## Teknik
Filen `data/data.generated.js` är autogenererad och ska inte redigeras direkt. I V8.33 laddas `data/review-corrections.v833.js` efter grunddatan och före `app.js`. Ändringarna är avsiktligt begränsade till text och referenser; tidsaxlarnas numeriska start-/slutvärden lämnas oförändrade tills full dateringsprövning genomförts.

## Rättade poster
- **H019:** Pentateukens tillkomst skiljs från ett säkert daterat manuskript; flera forskningsmodeller.
- **H020:** Genesis 1–11 får förtydligad kompositions-/redaktionsosäkerhet, samt referenser till specifika kapitel i *The Oxford Handbook of the Pentateuch* i stället för en allmän portalsida.
- **H021:** Deuteronomistisk historieskrivning framställs inte som en enda säker redaktion.
- **H023:** Apokalyptisk slutform skiljs från Daniels berättade tid, med länk till V8.33:s granskningsunderlag.
- **H024:** Makkabeerupproret märks som en första fas; tempelåterinvigning och senare självständighet hålls isär.
- **H025:** Första Henok markeras som textsamling med flera dateringsnivåer och hänvisning till VanderKams specialistöversikt.
- **H034:** Johannesevangeliets kompositionsdatering skiljs från den osäkra paleografiska dateringen av P52.

## Källkontroll
- Reinhard Müller (2021), *Positions on Redaction*: https://academic.oup.com/edited-volume/34227/chapter-abstract/290228469
- Baruch J. Schwartz (2021), *The Documentary Hypothesis*: https://academic.oup.com/edited-volume/34227/chapter-abstract/290227903
- James C. VanderKam (2011), *The Book of Enoch and the Qumran Scrolls*: https://academic.oup.com/edited-volume/34366/chapter-abstract/291495493
- Brent Nongbri (2020), *Palaeography, Precision and Publicity*: https://www.cambridge.org/core/journals/new-testament-studies/article/abs/palaeography-precision-and-publicity-further-thoughts-on-pryliii457-p52/1D4E56BF0E9D4DDDA313D0C2754E2F28

## Test
JavaScript-utvärdering med datamodell + korrigeringsfil visar att de sju avsedda posternas beskrivningar uppdaterats, att H025:s källpost är tillgänglig och att `index.html` refererar till rätt fil i rätt ordning. **Fullständig webbläsarverifiering och vetenskaplig slutgranskning återstår.**

Ingen post har fått slutgranskningsflagga, och V8.32 i produktion är orörd.
