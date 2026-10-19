# C7 – Omgång 22 (V8.113)

**Status:** Separat testversion, ännu inte publicerad.

Sex individuella historisk-kritiska analyser: B034 Nahum, B035 Habackuk, B036 Sefanja, B037 Haggai, B038 Sakarja och B039 Malaki. Innehållet särskiljer historiska miljöer, senare textlager, teologisk retorik och judisk/kristen reception. Även jämförelser mot Assyrien, Babylonien och det persiska Juda är förankrade i en källkritisk framställning.

**Täckning:** 133 publicerade ordinarie C7-poster före uppdateringen, 139 efter godkännande. Med sex separata nihilismtexter innebär detta 145 av 287 inventerade poster, 142 återstår. Samtliga 66 kanoniska bibelböcker B001–B066 får då individuella C7-texter. Detta innebär inte C6-slutgranskning.

**Teknisk omfattning:** Ny C7-datamodul, scriptregistrering i index, regressionstest med fullständighetskrav för B001–B066 samt CI-rad. Inga ändringar i layout eller befintliga dateringar.

**Testplan:** Öppna B034–B039 i bibelböckernas läsfönster, kontrollera underrubrik, källhänvisningar och svenska bibellänkar. Kör `node tests/smoke-c7-v8113.mjs`, befintliga CI-kontroller och regression på B028 och H064. Prova externa länkar manuellt. Publicera först efter användargodkännande.
