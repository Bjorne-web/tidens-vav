# Obligatoriskt C7-innehåll vid nya poster (fr.o.m. 2026-10-17)

**Beslut:** En ny forskningspost får inte införas utan en individuell, källförankrad text under **Betydelse för Israels religion, judendomen och kristendomen**. Detta gäller även poster där koppling saknas eller enbart avser senare tolkning – i så fall ska det förklaras substantiellt, inte ersättas av en mallfras.

## Skrivkrav
1. Skriv självständigt om **tidig israelitisk religionshistoria**, **senare judiskt mottagande** och **kristet mottagande**, eller förklara uttryckligen varför någon av dem saknar belägg eller relevans.
2. Skilj **händelse**, **texters tillkomst**, **handskriftsvittne**, **religionshistorisk påverkan** och **efterhandsreception**. Motivlikhet är inte bevisat litterärt beroende.
3. Ange tydlig forskningsposition, osäkerhet och minst två relevanta läsbara källhänvisningar, helst primärtext och aktuell sakkunniggranskad litteratur. Att ett namn förekommer i Bibeln betyder inte att en senare legend fanns redan då.
4. Lägg innehållet i `window.TIDENS_C7_RELIGION[id]` i `data/c7-religionshistorisk-betydelse.v890.js` eller säkra motsvarande registrering *innan* den enhetliga läsaren laddas. Fälten är `level`, `paragraph`, `sources`.
5. Kontrollera synligheten under rätt rubrik i appen på **dator och mobil** och att alla källlänkar kan öppnas.
6. Lägg in och kör regressionstest för relevant post; ingen publicering innan tester och användargodkännande.

## Teknisk spärr
`tests/post-religion-gate.mjs` laddar skript på huvudsidans `data/`-nivå och kontrollerar nya forsknings-, original- och bibelboksposters individuella C7-innehåll och källor. Testet körs i GitHub Actions vid nya ändringar av data. För framtida poster i nya filtyper ska laddningsvägen omfattas av testet. Baslinjen (H001–H069, AP001–AP006, tidigare O001–O130 med O066 undantagen, samt B001–B066) är en strikt *migrationsavgränsning*, inte ett kvalitetsgodkännande av gamla poster. Därför har **H066–H067 dessutom en obligatorisk individuell kontroll**, trots att de redan låg i baslinjen.

Äldre poster som saknar motsvarande C7-analys är fortsatt ett *separat redaktionellt arbete* och får inte betecknas som vetenskapligt slutgranskade av detta test. När baslinjen utökas ska befintlig C7-text finnas innan ID:t tillkommer; ändra inte undantagen för att kringgå kontrollen.
