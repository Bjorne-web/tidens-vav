# B2.1 – Reproducerbar ID-kontroll

Det här tillägget består endast av ett Node-test i `tests/category-source-audit.cjs`. Det skriver aldrig till data och påverkar inte appen.

Kör `node tests/category-source-audit.cjs` mot utcheckad PR-gren för att få JSON-sammanställning av:
- H/O-serier och deras forskningsberikningar
- samtliga C7-religionshistoriska filer, unika O-ID:n, okända O-ID:n och filer utan identifierade O-nycklar
- B-, D- och AP-serierna samt `bibleOriginal`

Testet avbryter vid okända O-ID:n eller berikningar utan motsvarande originalpost. Filer utan O-nycklar rapporteras men betraktas inte automatiskt som fel – de kan ha annan struktur och behöver granskas.

**Status:** Skript framtaget för verifiering. Inga rapporterade C7-täckningstal är påstått uppmätta förrän testet körts. B2.2 inleds först när avvikelserna har analyserats.
