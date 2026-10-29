# F3 – Verkliga postfall och källspårningsinventering

**Datum:** 2026-10-29 · **Status:** Statisk evidensinventering av aktuell main, inte produktionsintegration eller vetenskaplig nygranskning.

## Källor och kodkontroll
- `data/data.generated.js`: genererade H- och O-poster (ändras inte manuellt; filen hänvisar till data/*.json).
- `data/c7-religionshistorisk-betydelse.v890.js`: särskilda religionshistoriska bedömningar, med egen reservation om ej slutgranskade poster.
- `data/c7-dating-o067-gilgamesh.js`: dateringsfaser för ett bevarat textvittne, explicit **inte** berättelsens tillkomsttid.
- `data/apokryfer-granskning3.v888.js`: apokryfposter med serien **AP001–AP006**.
- `v897-research-read-model.js`: befintlig read-only-adapter, källföreträde och nuvarande proveniens.
- `v839-reader-unified.js`: äldre läsarens datainsamling och separata religionstext.

## Faktiskt identifierade poster
| Fall | Belagt i kod | Risk att hantera i F3 |
|---|---|---|
| **H045** | `data.generated.js`: ”Ahab i assyrisk inskrift: Qarqar”, `start=end=-853`, hög evidens, `reviewed:true`, källa British Museum, dateringskommentar om assyrisk årtalsram och propaganda | Redovisa grundpostens titel/datering/källa och status med tydlig proveniens; koppla inte automatiskt granskning av enskilt år till alla textfält |
| **B001** | C7-filen `v890` innehåller religionshistorisk betydelse för ”Första Moseboken” och skiljer berättad tid från textens framväxt. B001 hittades inte som `"id":"B001"` i `data.generated.js` (bibelböcker kan komma från annan datakälla) | Koppla rätt specialpost-ID och visa C7-betydelse utan att tappa dess källa. Verifiera bibelbokens kanoniska post och detaljfälten i senare F3-steg |
| **D001** | Inte funnen som `"id":"D001"` i genererad data. Apokryf-underlaget deklarerar uttryckligen AP001–AP006 | Använd inte D001 som automatiskt verifierad apokryf. Välj AP001 som **kandidat**; kontrollera vad AP001 representerar i läsmodellen innan användartest |
| **O067** | Grundposten ”Gilgamesheposet – flodberättelsen” har `start=-2100,end=-1600` men markerar dateringen ”Originaldatering – ej faktagranskad” | Denna tidsangivelse får inte presenteras som säker datering av bevarat manuskript eller faktisk flodhändelse |
| **O067 – C7 dateringsfas** | Separat fil `data/c7-dating-o067-gilgamesh.js` anger för bevarad assyrisk tavla XI `start=-700,end=-601,timeType=material-witness` | Bevara båda underlagen och **deras olika tidsbegrepp** i stället för att låta en siffra vinna tyst |
| **C7 betydelse** | `TIDENS_C7_RELIGION` ger en `level` och en substantiell `paragraph` för B001 | Ursprunget ska vara synligt och C7:s egna granskningsreservationer behållas |

## F3-fynd som påverkar kontraktet
1. **Samma numeriska fält är inte alltid samma faktauppgift:** O067:s originalår och tavla XI:s daterade textvittne är två *olika tidstyper*. Algoritmen ska skilja `event/composition/narrative/material-witness` innan den klassar värden som motsägelse.
2. **Fältvis prioritet krävs:** Ett C7-betydelseavsnitt eller ett dateringsdossier ska inte automatiskt få företräde för titel, sammanfattning eller annan metadata.
3. **Postens status är inte källans status:** `reviewed:true` på H045 och C7-betydelsetextens egen granskningsreservation ska inte smälta samman till ett generellt ”slutgranskad”.
4. **Apokryfers ID är specialfall:** AP-serien finns uttryckligt; D001 är ej verifierad i undersökta källor. Slutligt test-ID bestäms efter kontroll mot runtime/läsmodell.
5. **Avgränsning:** Inventeringen har kontrollerat tydliga förekomster och kodens deklarerade fält. Den är inte en fullständig dynamisk exekvering av alla lager i appens webbläsare.

## Beslutspunkter före F3-avslut
- Utökad ren modell behöver **typade tidsuppgifter** och fältvis härledning innan den kan kopplas till runtime.
- Verifiera hela B001-, AP001- och O067-lagren genom verklig adapterdiagnostik (utan dataändringar).
- Redovisa käll-/granskningsstatus som sammansatta, ursprungsmärkta fält och dokumentera specifika fältregler.
- PR #378 hålls separat och öppen tills beställarens godkännande; endast testkod/dokumentation.

**Ingen produktionskod eller vetenskapligt innehåll har ändrats i denna inventering.**
