# C7 omgång 29 – O095–O098: berättelser, texttillkomst och historia

**Styrning:** `docs/tidens-vav-design-och-arkitektur.md` v1.1. **Status:** ej publicerad testversion.

Fyra individuella C7-analyser kopplas till ursprungliga O-ID:
- **O095 Skapelsen:** Gen 1 och Gen 2, prästerliga och andra textskikt; babylonisk exil är möjlig redaktionsmiljö, inte säker datering av hela texten eller en skapelsehändelse.
- **O096 Syndafallet/Eden:** Gen 2–3, människans dödlighet, visdom och ansvar; senare arvsyndslära skiljs från hebreisk berättelse och judiska tolkningar.
- **O097 Noas ark:** Genesis 6–9, Atrahasis och Gilgamesh; konkret litterär motivkontakt men ingen belagd global flod.
- **O098 Babels torn:** Genesis 11, ziggurater och berättelsen om språk; ett förklarande litterärt motiv, inte belagd uppkomst av världens språk vid en historisk byggnad.

**Väsentlig källkritisk reservation:** Originalregistret har title = exilsmiljö och description = berättelseämne; `start=-600,end=-500` och `evidence=Ej granskad`. Denna PR varken ändrar datum, titel, källregister, berättad kronologi eller C6-status eller påstår att tidsspannet är verifierat. Texten hålls i den kanoniska O-postens C7-fält. PR #135 har separat kartläggning och är ännu inte publicerad.

**Avgränsning:** endast ny datafil `v8120`, scriptregistrering, regressionstest och CI. Ingen ändring av godkänd layout, sökflöde, läsfönster eller Temaspår. PR #134 (O091–O094) inväntar GitHub Actions och har ingen delad datafil med denna omgång.

**Täckning:** på publicerad main finns 162 ordinarie C7-analyser plus sex separata nihilismanalyser = 168 av 287. Denna PR tillför 4 och ger 172 av 287 om publicerad, även om PR #134 ännu inte slagits samman. Efter att både #134 och denna PR publicerats: 176 av 287, 111 återstår. Unika ID ska räknas, inte PR-nummer.

**Testgrind:** `node tests/smoke-c7-v8120.mjs` samt Github Actions. Manuell kontroll O095–O098: sökning → rätt forskningspost i läsfönster → C7-text → frivilligt Temaspår med bibehållet ID. Kontrollera att 'Babylonisk exil' inte presenteras som bevisad uppkomsttid, och att befintliga H045, O067, B039 fungerar på dator och mobil. Separat användargodkännande före publicering.
