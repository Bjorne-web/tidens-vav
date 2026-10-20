# B2.3 – AP001–AP006, tematiska apokryfposter

**Pilotklassificering – ej forskningsmässigt slutgodkänd.** De sex befintliga AP-posterna är historisk-kritiska teman, inte sex ytterligare bokposter. Ingen ändring i originalmaterialet.

| Post | Primärområde i piloten | Relation | Skäl |
| --- | --- | --- | --- |
| AP001 Olika bibelkanon | Religioner | Bibeln | Kanonhistoria mellan gemenskaper |
| AP002 Makkabeerböckerna | Bibeln | Religioner | Textjämförelse och uppståndelsemotiv |
| AP003 Salomos vishet | Bibeln | Religioner, Idéer & kunskap | Grekisk-judisk vishetslitteratur |
| AP004 Jesus Syraks vishet | Bibeln | Religioner | Textens komposition och översättning |
| AP005 Tobits bok | Bibeln | Religioner | Berättelse- och motivjämförelse |
| AP006 Apokryfer och NT | Bibeln | Religioner | Litterära samband och reception |

`classificationStatus: pilot-proposal`, `researchStatus: unknown` även när ursprunglig post har annat granskningsfält. AP-serien får innehållstyp `apocrypha-theme` eller `canon-history`, **aldrig** `apocryphal-book`. D001–D011 behåller sin separata bokidentitet.

Gränsdragningen AP001 Religioner vs AP002–AP006 Bibeln är ett redaktionellt **förslag**, inte en automatisk kategoriomvandling. Särskilt AP006:s koppling till Nya testamentet är tematiskt, inte ett belägg för direkt litterärt beroende.

Test: `node tests/b2-apocrypha-themes.test.cjs` samt befintliga B/D- och täckningstester. Ingen UI-ändring.
