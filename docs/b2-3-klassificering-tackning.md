# B2.3 – Täckningsrapport för klassificeringen

**Status:** teknisk testpilot, inte ett beslut om massklassificering.

Automatiskt test `node tests/category-coverage.test.cjs` läser kanoniska H-, O-, B- och D-register och kör den publicerade skrivskyddade klassificeringsadaptern mot var och en. Rapporten delar upp varje serie i `classified` (föreslagen pilotklassificering) och `unclassified` (ännu inte klassificerad).

**Inga råkategorier, datum, ID:n eller forskningsstatus ändras.** Klassificeringsgraden ska inte användas som mått på vetenskaplig granskning.

Kontrollen omfattar inte automatiskt fem senare H-poster i separata skript, AP-temaposter eller äldre `bibleOriginal`-rader utan kanoniskt ID. Dessa kräver separata källadaptrar efter att identiteten säkerställts.

Nästa steg efter verifierad körning: identifiera vilka grupper av poster som kan få källgrundad klassificering enligt B2.2 och vilka som måste genomgå individuell redaktionell prövning. Ingen filterpanel utvecklas förrän täckningsrapport och klassificeringsregler godkänts.
