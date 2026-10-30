# F3 – Fältvisa beslut om källföreträde (testförslag)

**Status 2026-10-29:** Isolerad testfunktion i PR #378, ej inkopplad i appens läsmodell.

## Regel
Ett källföreträde får bara användas för en **bestämd post och ett bestämt fält**, med angivet lager och skriftlig motivering. En regel för exempelvis B001:s sammanfattning får inte automatiskt styra H045, andra fält eller dateringslager.

Utan uttrycklig fältregel:
- Samma text från flera underlag kan visas utan värdekonflikt, men alla ursprung bevaras.
- Olika textvärden behålls som alternativ och modellen markerar olöst konflikt. Ingen källa väljs tyst.
- Om en beslutad källreferens saknas i aktuell data lämnas valet olöst, och testmodellen markerar `missing-origin`.
- Flera konkurrerande beslut för samma post/fält underkänns.
- Ett expliciterat företräde raderar **inte** konflikten eller alternativen.
- F3:s syntetiska test använder B001 som exempel-ID men säger **inte** att C7 faktiskt fått redaktionellt företräde för B001:s sammanfattning. Verkliga beslut fattas separat efter käll- och forskningsgranskning.

## Viktig gräns
Den befintliga `v897-research-read-model.js` tillämpar fortfarande sin äldre första-icke-tomma-värde-regel. `resolveScopedField` finns bara under `tests/`, anropas inte från `index.html`, ändrar inte C7 och är inget påstående om faktisk vetenskaplig kvalitetsgranskning.

## Kvar före F3-godkännande
1. Jämför fältspecifika lagerkonflikter i verkliga H045, B001, D001 och O067 (inklusive vilka versioner som faktiskt krockar).
2. Fastställ om någon konflikt ska vara ett aktivt redaktionellt beslut, i samråd med berörda C7-dataansvar.
3. Dokumentera rätt sorts temporal källa för `composition`, `narrative`, `event` och `material-witness` per post, inklusive när en äldre uppgift ännu är ogranskad.
4. Verifiera sluttest och bedöm fullständigt F3-underlag innan eventuell integration.

Ingen produktion eller huvudnavigation ändras av denna fas.
