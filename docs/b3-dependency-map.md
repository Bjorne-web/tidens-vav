# B3 – Beroendekarta och genomförandeordning

**Beslutsunderlag – ingen UI- eller datamigration i denna PR.**

## Grundläge

B2.3 är avslutad som teknisk klassificeringsetapp: 129 O och 69 H klassificerade, med tester och identifierade källor. C7 fortsätter självständigt med forsknings- och dateringsprövning. PR #300 etablerade samordningsgrindarna.

## Öppna förslag och beroenden

| PR | Ansvarsområde | Relation till B3 | Grind |
|---|---|---|---|
| #127 | Målarkitektur för gemensam forskningsvy | Läsfönster, sammanhang och navigering | Samordna mot övergripande design innan implementation |
| #157 | Helhetsgranskning av huvudvyer | Definition av navigation/vykontext | Grund för gemensamt navigationskontrakt |
| #180 | Fyra huvudingångar och filterdimensioner | Principer för kategoriarkitektur | Harmoniera med B2.3:s läsmodell |
| #184 | Kategoriinventering och migrationsordning | Ordning för trygg stegvis ändring | Täcknings- och bakåtkompatibilitetstester |
| #300 | B3 designberedskap | Gemensamma skyddsregler | Publicerad; gäller som samordningsunderlag |

Dessa äldre PR är fortfarande öppna vid inventeringen; deras innehåll får inte massammanfogas eller ersätta senare beslut på `main` utan separat jämförelse.

## Rekommenderad ordning

1. **B3.1 – Beslutskarta:** samla de äldre dokumentens gemensamma principer, identifiera avvikande begrepp och utse ett styrande navigations- och kategorikontrakt. Håll detta på dokumentnivå tills godkänt.
2. **B3.2 – Designkontrakt:** definiera hur fyra huvudingångar relaterar till tidslinje, temaspår, jämförelse och läsfönster; säkra postidentitet, djuplänkar, mobilbeteende och tillbakaväg.
3. **B3.3 – Separat reversibel UI-pilot:** låt nya ämnesingångar provas bredvid gamla filter; visa inte ogrundat källprövade årtal. Testa jämförbara postantal, både dator/mobil och ångra-/återställningsväg.
4. **B3.4 – Beslut om migrering:** först efter användarens visuella godkännande och gröna regressionstester. C7:s datumgranskning hanteras alltjämt separat.

## Ej förhandlingsbara gränser

- **198 H/O-klassificeringar är preliminära**, inte 198 forskningsgodkända påståenden.
- **O066 saknas** och får inte skapas automatiskt.
- **23 poster med fem återanvända rubriker** behåller sina ursprungliga ID; alternativa visningsrubriker kräver separat beslut.
- **H066–H069 kommer från källfiler markerade som arbetsutkast** och är inte vetenskapligt slutgranskade.
- **Biblisk berättad tid, texttillkomst, materialvittne och historiska händelser** är olika dimensioner; O124–O126 får inte visas som att Jesu liv inträffade 70–100 e.Kr.
- Inga ändringar av originaldata, `index.html`, Gantt, filter, C7 eller befintlig design i detta steg.

## Statusnyckel för kommande uppdateringar

Rapportera alltid (a) senast sammanfogad PR, (b) aktuell test-PR och kontrollstatus, (c) aktuell B3-del, (d) nästa grind och (e) separat C7-status **utan att likställa klassificering med forskningsgodkännande**.
