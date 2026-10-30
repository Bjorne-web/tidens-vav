# F5.10 – Utökad katalog- och specialläsargranskning

**Datum:** 30 oktober 2026  
**Gren:** `f5-10-catalog-acceptance-20261030`  
**PR:** #382 (draft, stackad ovanpå F5.9:s PR #381).  
**Status:** Isolerad katalog- och webbläsartestning. Ingen produktionsintegration, merge, Cloudflare-publicering eller F6-start.

## 1. Omfattning och metod

F5.10 utvidgar F5.9:s sex specialutvalda F4-exempel med en **bred teknisk kataloginventering av fyra verkliga grundregister**. Skriptet `tests/f5-10-catalog-inventory.cjs` läser de oförändrade källfilerna:

- **Historiska händelser**: `data/data.generated.js:events`, 64 poster.
- **Äldre historiska och religionshistoriska poster**: `data/data.generated.js:originalEvents`, 129 poster.
- **Bibelns böcker**: `data/bible-books-v857.js`, 66 poster.
- **Apokryfiska/deuterokanoniska böcker**: `data/apocrypha-books-v891.js`, 11 poster.

**Summa: 270 poster** som ligger i dessa fyra register. Detta är **inte alla forskningsobjekt i Tidens väv**: de separata tematiska AP-posterna, C7-specialposter, forskningsfrågor, källobjekt, arkeologiska fall och andra kategorier har egna register eller läsvägar och räknas inte in här.

Varje post får en F3-kompatibel modell och renderas med F4:s verkliga läsarkod. ID, titel, datumtyp, registrerade källänkar och förekomst av sammanfattande text inventeras. Originalfälten `critical` för böcker och `description` för händelser mappas uttryckligen som **sammanfattningsalias**, med sin faktiska ursprungsbeteckning. Det innebär inte att ett nytt vetenskapligt resonemang har skrivits.

## 2. Faktiskt kända innehållsluckor

Den inledande inventeringen kunde rendera 270/270 poster. Den visar samtidigt **104 poster utan en separat HTTP(S)-källänk i de lästa registrens fält/lager**: 38 av 64 historiska händelser och 66 av 66 bokposter. Det ska **inte** tolkas som att dessa poster saknar källor någon annanstans i appen eller att alla 104 saknar vetenskaplig grund. Det bevisar att den generella modellen behöver ansluta och granska fler källager innan källtäckning kan bedömas som färdig.

Alla **129 äldre originalposter** bär fortfarande generellt importerade *ursprungsdatum* som klassas som **`legacy-unspecified`** i denna generella väg. Deras dateringar får inte tyst presenteras som textens tillkomsttid, säkra historiska händelsedatum eller tidpunkter för materiella textvittnen. Relevanta C7-dateringsfaser och religionshistoriska betydelsefält är **ännu inte generellt fogade till hela denna katalog**. F4:s sex tidigare exempel, inklusive Gilgamesheposets särskilda textvittne, ska därför inte misstolkas som att varje originalpost redan fått korrekt dateringsklass.

Katalogen exporteras till `out/f5-10/catalog-inventory.json` och `catalog-all-items.json`. De dokumenterar faktisk titel/ID, datumtyp, om text kan visas och antal existerande källänkar för varje post. **Tekniskt renderbar ≠ innehållsligt eller vetenskapligt slutgranskad.**

## 3. Verkliga webbläsartester

`tests/f5-10-generate-staging-copy.cjs` bygger en lokal tillfällig HTML-kopia av den riktiga appen med den tidigare **oaktiverade F5.9-kandidaten** och ytterligare faktiska F3/F4-artiklar. Appens ordinarie `index.html` är oförändrad.

Ett deterministiskt och spritt urval av **47 faktiska poster** tas från de fyra registren: 12 historiska, 12 originalposter, 12 bibelböcker och samtliga 11 apokryfiska böcker. Webbkontrollen delar upp dessa mellan tre separata Chromium-utföranden, i stället för att hålla en enda långtgående webbläsarsession öppen:

- Dator / temaspår: urvalet öppnas, full F4-artikel läses och stängs via Browser Back.
- Mobilbredd 390 px / tidslinje: samma kontroll för en annan delmängd.
- Karta: en tredje delmängd, med C1, URL och faktiskt avläst Leaflet-kamera före/efter återgång.

Den tidigare sexpostskatalogen från F5.9 finns kvar. Inga nya aktiva länkar eller flikar införs i produktionen.

`tests/f5-10-special-readers.js` kör därutöver appens **befintliga `TidensOpenBookV858`** mot ett större stickprov av bibel- och apokryfböcker. Kontrollpunkter: att den gamla läsaren kan öppna varje vald post och att faktiskt visad text hör ihop med rätt post/titel. Detta är ett regresstest på de gamla specialläsarna, **inte** belägg för att samtliga av appens specialläsartyper redan fungerar i den nya forskningsvyn.

Resultaten exporteras till `out/f5-10/wide-browser-audit.json`, inklusive antal öppna–läsa–återgå, kameraavläsningar och vilka B/D-läsare som öppnades.

## 4. Krav för godkänd F5.10-testfas

- Hela det inventerade 270-postsurvalet ska bygga och rendera, utan tyst käll-/datumuppfinning.
- Separata innehållsluckor, inklusive 104 poster utan källänkar och originalposternas oklara datumtyper, ska finnas kvar som **öppna krav**, inte gömmas i en grön testsiffra.
- Samtliga 47 valda F4-artiklar ska öppna och återgå i Chromium fördelat på dator, mobilbredd och kartvy.
- Det större stickprovet av befintliga bok-/apokryfspecialläsare ska passera.
- F3/F4 och F5.9:s tidigare regressionskontroller ska fortsätta vara gröna.
- PR #382 får ändra endast `tests/f5-10-*`, `docs/f5-10-*` och sin isolerade CI. **Ingen aktiv produktionsfil.**

## 5. Vad som återstår innan integration/lansering

F5.10 **stänger inte** F5.7:s nio releaseblockerare. Framför allt återstår fullständig datakatalog utanför H/O/B/D, generell C7-datering och källproveniens, anslutning av snabbläsare och specialläsare till en gemensam fullständig forskningsvy, verkliga mobila enheter/tillgänglighet, snabb Leaflet-navigation under pågående rörelse, robust historik/återhämtning, riktig Cloudflare-staging och separat beställargodkännande av eventuell release.

**Rekommenderad nästa kontroll:** först en explicit datatäckningsplan för resterande objektgrupper, sedan verifierad C7-koppling och källrevision; fortsätt endast i isolerade staging- eller testgrenar fram till uttryckligt godkänd integration.
