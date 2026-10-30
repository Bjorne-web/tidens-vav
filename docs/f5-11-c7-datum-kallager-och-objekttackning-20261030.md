# F5.11 – C7:s källager, datumtyper och forskningsobjekt utanför grundregistren

**Datum:** 30 oktober 2026  
**PR:** #383 (draft), stackad ovanpå F5.10:s draft #382.  
**Beslut:** Detta är en *isolerad, läsande datainventering och teknisk kandidatsammanfogning* – inte aktivering i den publicerade appen eller vetenskapligt slutgodkännande.

## 1. Varför F5.11 behövs

F5.10 visade att **270 av 270** poster kan få en F3-modell och renderas med F4, i dessa fyra grundregister: 64 H-händelser, 129 O-poster, 66 B-böcker och 11 D-böcker. Samtidigt kvarstod särskilt **104 poster utan separat HTTP(S)-källänk i den då använda generella lagerkombinationen** och **129 O-poster med ospecificerad importerad årtalstyp**. Dessa siffror avser *enbart den lästa registermodellen*, inte allt källmaterial som finns i appen.

F5.11 granskar därutöver **37 C7-filer för religionshistorisk betydelse** och **78 C7-filer för individuella dateringar**, hämtade i den ordning de faktiskt laddas från `index.html`. Dessa register lagrar bland annat daterade materialvittnen, texters tillkomst, historiska händelser och uttrycklig text om **varför någon säker årtalsfas inte kan sättas**. Den skillnaden måste bevaras.

## 2. Kontrollerad datamodell

`tests/f5-11-c7-source-inventory.cjs` exekverar varje datalager i isolerad JavaScript-miljö, **utan att skriva tillbaka till originalfiler**, och noterar vilket *senast aktiva* skript som registrerar respektive post och fält. Om flera C7-filer ändrat samma post bevaras också uppdateringshistorikens skriptsökvägar, så det går att upptäcka om en äldre datering senare har ersatts.

Varje datumfas måste behålla ursprungliga `start`, `end`, `timeType`, `typeLabel`, `evidence`, `reason`, `sources` och **filursprung**. Okända datumtyper får inte tyst konverteras. Om `phases: []` kombineras med en `undated`-förklaring är det ett **avsiktligt odaterat forskningsunderlag**, inte tillstånd att använda den gamla importens generella årtal som säker händelsemarkör.

`tests/f5-11-layered-reader.test.cjs` sammanför därefter utvalda ursprungliga H/O/B/D-poster med sina verkliga C7-faser och betydelsetexter genom F3:s **read-only-modell**, och renderar dem med F4:s faktiska artikelrenderer. Testet kräver att daterade faser behåller korrekt vetenskaplig *tidstyp* och exakt källfil, att ursprungliga O-datum fortfarande är **`legacy-unspecified`**, och att tomma C7-faser **inte** förvandlas till daterade påståenden.

F5.11 redovisar uttryckligen även om F4:s nuvarande artikelrenderer **inte visar hela C7:s `undated`-motivering** trots att uppgiften finns i datalagret. Det är i så fall en **kvarstående funktionsbrist** inför produktionskandidaten; ingen vetenskaplig förklaring ska tappas bort utan att det upptäcks.

## 3. Forskningsobjekt utanför de fyra grundregistren

Inventeringen omfattar andra registrerade klasser och håller isär dem i rapporten:

- AP001–AP006 som tematiska apokryfposter (skilda från D001–D011, de enskilda böckerna).
- De senare H-tilläggen för Enki/Dilmun/Ninti, Lilith, ophitiska traditioner/Nag Hammadi och nihilism, som registreras via separata appskript.
- De idéhistoriska forskningsspåren i `v889-research-tracks.js`, vilka är *frågor* och inte daterade historiska händelser.
- Separata registrerade arkeologi-, religions-, exil-, hellenism- och romarfall i `data.generated.js`. Dessa inventeras som egna klassificerade *fall*, inte godtyckligt som H/O-poster.
- `TIDENS_BIG_QUESTIONS_TIMELINE`: filosofiska och kyrkohistoriska kronologipunkter med egna IQ-ID:n; sådana tidslinjepunkter är inte automatiskt fristående forskningsartiklar.
- `TIDENS_REVIEW_LEDGER`: källkontroll på **påståendenivå**. Ett granskat påstående betyder inte att hela posten är vetenskapligt slutgranskad.

Objekt-ID:n ska kontrolleras mot grundregistren så att separata publiceringslager inte tyst ger samma ID två olika betydelser.

## 4. Granskningsfiler och acceptans

Dedikerat workflow `F5.11 C7 source and object coverage audit` ska efter godkänd CI producera:

- `out/f5-11/c7-coverage.json`: summerad täckning, datumtyper, uttryckligt odaterade poster, ursprung, kringliggande objektklasser, kända begränsningar.
- `out/f5-11/per-post-c7.json`: exakt post för post: sista aktiva C7-dateringsfil, tidigare uppdateringar, faktiska faser, osäkerhetsförklaring och registrerade länkar.
- `out/f5-11/layered-reader-audit.json`: vilka F3/F4-artiklar som fått korrekt sammanförda tidsfaser/källursprung och vilka `undated`-förklaringar den befintliga F4-vyn ännu inte visar.

Både F5.10:s kataloginventering och centrala F3/F4/F5.9-regressioner måste förbli gröna. Inget får ge sken av att de ursprungliga `reviewed`- eller `evidence`-fälten utgör en oberoende vetenskaplig kvalitetskontroll.

## 5. Öppna blockerare efter inventeringen

F5.11 **bevisar datatillgång och kandidatkoppling**, inte färdig aktivering. Den löser inte automatiskt befintlig F5.7-risklista: universell artikeladapter för fler typer, färdiga `topic:`-/`source:`-djuplänkar, fullständig mobil/tillgänglighet, snabb kartanimation och säker tillbakahistorik, källkontroll av varje vetenskapligt påstående eller faktisk produktionstestning.

Särskilt ska **C7:s uttryckligt odaterade poster, dateringsfaser och eventuella konkurrerande dateringar** integreras synligt och granskas innan nya tidsmarkörer får visas i den ordinarie appen.

**Versionsskydd:** PR #383 är en **draft** ovanpå #382, som bygger på #381, #380 och #379. Endast `tests/f5-11-*`, `docs/f5-11-*` och isolerat workflow ändras. **Ingen merge, förändring av `main`, ny aktiv flik, Cloudflare-publicering eller F6-start.**
