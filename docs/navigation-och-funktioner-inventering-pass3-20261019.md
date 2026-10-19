# Tidens väv – inventering pass 3: forskningsvyer och läsarfunktioner

**Datum:** 2026-10-19  
**Status:** Teknisk inventering klar; ingen implementation och inget godkännande för borttagning.  
**Grund:** Styrdokument v1.1. Kodgranskning av `index.html`, `v839-reader-unified.js`, `v838-reader-reflow.js`, `v842-reader-navigation.js`, `v893-research-hub.js`, `v890-research-bridge.js`, `v894-research-gantt.js` och tidigare inventeringar.

## 1. Huvudfynd

Det finns **minst tre olika forskningsrelaterade presentationsflöden** med delvis skilda syften:

1. **Postläsaren `#detail`:** öppnas för en vald historisk post. `v839-reader-unified.js` bygger enhetliga delar från flera befintliga datakällor och dekorerar `renderDetail()` utan att ta bort ursprungligt material. `v838-reader-reflow.js` och `v842-reader-navigation.js` styr läsarens ordning och religionshistorisk kontext.
2. **Forskningshubben `#researchView`:** `v893-research-hub.js` erbjuder tematiska fördjupningar, bl.a. livet efter döden, Guds godhet, fri vilja och nihilism. Den arbetar med temaval och särskilda undersidor, inte bara enskilda historiska poster.
3. **Specialiserade forskningsvisualiseringar:** `v894-research-gantt.js` ritar en särskild tidslinje för forskningsspår; `v890-research-bridge.js` tillför tvärgående filosofiska resonemang. De har eget urval och presentationslogik.

Detta är skilda uppgifter – **inte tre utbytbara versioner av samma forskningspost**.

## 2. Funktionell mappning mot målarkitekturen

| Befintlig funktion | Målplats | Åtgärd | Viktig reservation |
|---|---|---|---|
| `#detail` / universell läsare | **Snabbfönster** | Återanvänd datainsamling, post-ID, relaterade länkar och källhantering. Förenkla ytan. | Läsarens nuvarande fulla djup får inte försvinna. |
| Artikel och forskningsöversikt i läsaren | **Full forskningsvy** | Flytta presentationen till tydliga sektioner och innehållsnavigering. | Ingen omskrivning av C6/C7-data utan vetenskaplig granskning. |
| Religionshistorisk betydelse | **Full forskningsvy**, tydligt avsnitt | Behåll obligatoriskt och läsbart för relevanta poster. | Särskilj belägg, tolkning och samband. |
| Källor, bibellänkar, originalarkiv | **Källor och evidens** | Samla åtkomst men bevara proveniens och existerande länkar. | Arkiv får inte försvinna eller blandas med kuraterat material. |
| `#researchView` hubb med stora frågor | **Temaspår/Idéer & kunskap** | Bevara som tematiska forskningsvägar med postkopplingar. | En fråga som ”Är Gud god?” är inte automatiskt en historisk post. |
| `v894-research-gantt` | **Temaspår och Tidslinje** | Återanvänd visualiseringsprinciper; undvik separat Gantt-motor långsiktigt. | Ingen omedelbar ombyggnad av godkända tidslinjer. |
| `v890-research-bridge` | **Temaspår/Fördjupa** | Bevara historisk och filosofisk diskussion med explicit kunskapsstatus. | Filosofiska argument får inte markeras som historiskt bevis. |
| Mobil läsarpanel och läsordning | **Gemensam responsiv postvy** | Behåll etablerade ingångar och backfunktion tills ersättning är verifierad. | Mobiltest krävs för varje posttyp. |

## 3. Viktig arkitekturprincip: separera tre objekttyper

A. **Historisk forskningspost** (stabilt post-ID, tid, plats, källor, forskningsstatus, relationer).  
B. **Forskningsfråga/tema** (frågeställning, historia, argument och flera relaterade poster; behöver inte ha en enda datering).  
C. **Källa/fynd/dokument** (eget ursprung, datering, tolkning och referens till poster).

De tre typerna ska kunna länka till varandra, men **inte pressas in i identiska formulär**. En gemensam designfamilj kan ändå ge konsekvent användarupplevelse.

## 4. Rekommenderad full forskningsvy

För historiska poster:

1. Tydlig översikt: ID, titel, sammanfattning, illustration/bildstatus, datering och osäkerhet.
2. Historisk och geografisk kontext.
3. Forskning och konkurrerande tolkningar.
4. Källor och evidens, inklusive källornas art.
5. Betydelse för Israels religion, judendomen och kristendomen (när relevant).
6. Relaterade poster, med **typ av samband** och evidensgrad.
7. Teman och begrepp.
8. Dela, citera och återgå till tidigare utforskningskontext.

**Snabbfönstret** visar en kort sammanfattning och knappen *Öppna full forskningsvy*. Det får inte bli en ny, separat källa till forskningsinnehåll.

För **teman och filosofiska frågor** används ett besläktat upplägg med *Fråga → historisk utveckling → olika argument → vad forskningen kan/inte kan avgöra → relaterade poster/källor*. Undvik att skapa falsk exakthet i årtal.

## 5. Data- och integrationsrisker

- Läsaren samlar redan information från flera källor (`TIDENS_SPECIAL_RESEARCH`, `allOriginalResearchV828`, `research`, `v82Library`, `sourceCards`). Fastställ prioritering, konflikt- och fallbackregler innan nya vyer kodas.
- `renderDetail()` dekoreras av senare scripts. Direkta DOM-omflyttningar kan påverka ordning, länkar och händelselyssnare.
- Hubben och specialvisualiseringarna har separata temaurval och händelser. En framtida gemensam kontextmodell måste stödja såväl `postId` som `topicId`.
- Återanvänd stabila post-ID:n och externa källvägar; radera inte gamla navigationsrutter innan omdirigering och djuplänkar är testade.
- Gränsen mellan illustrativ bild och faktisk historisk källa ska vara tydlig. Bilder i fördjupning får inte ge en falsk känsla av säkerhet.
- Samordna med C7: datagranskning kan fortsätta parallellt, men forskningsposternas nya presentationskontrakt måste beslutas centralt.

## 6. Rekommenderade steg före första implementations-PR

1. Specificera ett **kanoniskt postkontrakt** och ett separat **temakontrakt** (fält, källprioritering, status och relationstyper).
2. Rita wireframes för snabbfönster/full forskningsvy, inklusive mobil och tematiska frågor.
3. Välj 3–4 testfall: vanlig historisk post, bibelbok, apokryf och ett större filosofiskt/religionshistoriskt tema.
4. Kör jämförelsetest mot dagens `#detail` och `#researchView`: källor, samband, bibellänkar och dateringar måste följa med.
5. Implementera en ny vy inkrementellt, utan att ta bort gammal läsare; avveckla först efter separat godkännande.

## 7. Föreslagen testmatris

| Test | Kontroll |
|---|---|
| F1 | Vanlig H-post: sammanfattning, källor, forskningsstatus, religionshistorisk betydelse |
| F2 | Bibelbok och apokryf: tillkomst kontra berättad tid, specialläsare och länkar |
| F3 | Stor forskningsfråga: temahistorik, skilda argument, inga fabricerade dateringar |
| F4 | Tidslinje/Karta/Temaspår/Jämför → snabbfönster → full vy → tillbaka |
| F5 | Mobil och tangentbordsnavigation genom hela läsflödet |
| F6 | C7-post: bilder, relaterade poster, källor och utgångspost fungerar |
| F7 | Direktlänkar och delning öppnar rätt post eller tema |
| F8 | Den äldre läsaren och V8.94 påverkas inte under testfasen |

**Slutsats:** Den fullständiga forskningsvyn ska vara en **gemensam läsupplevelse** byggd på det befintliga materialet. Tematiska forskningsfrågor blir relaterade kunskapsobjekt, inte en fristående ”forskningsö”.
