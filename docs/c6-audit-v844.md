# V8.44 – C6: verifierbar kvalitet före fler färdigmarkeringar

## Syfte
Denna etapp förstärker C6:s kvalitetssäkring och ändrar **inte** forskningstexterna, bedömda dateringar eller antalet slutgranskade poster. Separata påståendekontroller får aldrig förväxlas med helgranskning.

## Utgångsläge, verifierat mot datafilerna
- 193 poster: 129 original och 64 forskningsposter.
- 36 poster förekommer i åtta tidigare C6-delrapporter.
- 15 poster har 24 dokumenterade kontroller av avgränsade påståenden.
- 11 textförtydliganden är registrerade som införda.
- 0 poster har fullständig signering i `completePostReviews`.

## Ny kontroll
`tests/smoke-v844-c6-audit.mjs` avläser **journalen och statusfilen direkt** och kontrollerar:
1. Unika historiska post-ID:n och hänvisningar till faktiskt existerande poster.
2. Varje journals kontroll har specificerat påstående, källa, källtyp, dateringsnivå, osäkerhet, begränsning och forskningsställning.
3. HTTPS-källadresser och giltiga granskningsdatum som inte ligger efter statusdatumet.
4. Antalet dokumenterade påståenden och berörda poster stämmer med den senast rapporterade statusen.
5. Slutgranskning får endast räknas genom uttryckliga poster i `completePostReviews`, aldrig härledas från andra mått.
6. CI kör kontrollen efter befintliga tester.

Detta är en **strukturell och redovisningsteknisk granskning**, inte en oberoende kontroll att samtliga källor stöder varje påstående. En fungerande URL eller fullständigt schema innebär inte vetenskaplig kvalitet.

## Föreslagen efterföljande forskningsetapp
Nästa sakgranskning bör fokusera på Israelitisk religion och kanaaneisk kontext, med El, Jahve, Ashera, gudaförsamling och monolatri. Pröva varje huvudtes med identifierade primärkällor (t.ex. relevanta Ugarittexter, Kuntillet Ajrud-inskrifterna och bibliska textvittnen), dateringsosäkerhet, forskningspositioner och alternativtolkningar. Dokumentera först efter faktisk källkontroll och utan att tillskriva samtidighet automatisk idépåverkan.

## Publiceringsspärr
V8.44 ligger på egen gren tills användaren har sett och godkänt testversionen. Ändra inte `main` för V8.44 utan uttryckligt godkännande.
