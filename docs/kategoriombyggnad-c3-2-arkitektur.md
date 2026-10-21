# Tidens väv – Kategoriombyggnad: besluts- och migrationsplan (C3.2)

## Varför arbetet prioriteras
Dagens sidfilter blandar innehållsområden (Religioner), historiska perspektiv (Världshistoria), källtyper (Arkeologi), berättad tid (Bibelberättelser), verk (Bibelns böcker), upplysande kategorier och forskningens evidensläge. Det är grundorsaken till att filterlistan känns ologisk. Den får **inte** bestå som slutlig användarmodell.

## Fyrdelad orientering
1. **Bibeln** – kanoniska texter, apokryfer, texttradition och textens tillkomst, berättelsernas historiska kontext.
2. **Religioner** – Israels religion, judendomens utveckling, kristendomens framväxt, omvärldens religioner.
3. **Världshistoria** – samhällen, riken, konflikter, platser, arkeologiskt belagda händelser och mänsklighetens historia.
4. **Idéer & kunskap** – filosofi, vetenskapliga traditioner, idéhistoriska och kunskapsteoretiska perspektiv. Tidigare benämning Filosofi migreras först när innehåll och UI är redo.

Dessa fyra är **huvudingångar**, inte nödvändigtvis exklusiva ämnesetiketter. En forskningspost kan knytas till flera ingångar med ett prioriterat huvudområde och väldokumenterade samband.

## Separata filterdimensioner
- **Huvudområde:** en eller flera av de fyra ingångarna.
- **Innehållstyp:** historisk händelse, arkeologiskt fynd, text/verk, bibelbok, apokryf, idéströmning, person, plats.
- **Tid:** faktisk käll-/tillkomsttid, berättad tid och historisk period måste skiljas åt.
- **Forskningsstatus/evidens:** källprövad, preliminär, osäker/omdiskuterad, ej granskad. Får aldrig utläsas direkt ur en kategori.
- **Kultur och plats:** regioner/kulturer är en separat dimension där information finns.

## Översättning av synliga äldre kategorier – preliminär
| Nuvarande filteretikett | Ny huvudingång eller dimension | Notering |
| --- | --- | --- |
| Världshistoria | Världshistoria | Kan ha delområden |
| Religion & texter | Religioner + Bibeln beroende på post | Granska post för post |
| Bibelberättelser – berättad tid | Bibeln + tidstyp | Berättad tid är inte textens tillkomsttid |
| Textens tillkomst | Bibeln + tidstyp/innehållstyp | Gäller även andra texter och ska kunna korsfiltreras |
| Arkeologi | Källtyp/metod och Världshistoria | Fynd kan också vara relevanta för Bibeln och Religioner |
| Folk | Världshistoria + innehållstyp | Inga förenklade etniska klassificeringar |
| Människans utveckling | Världshistoria | Vetenskapligt/arkeologiskt perspektiv |
| Civilisationer & riken | Världshistoria | Innehållstyp: samhälle/rike |
| Religioner | Religioner | Både Israel och omvärld |
| Byggnadsverk & faser | Världshistoria + byggnadsverk | Även religiösa anknytningar |
| Krig & konflikter | Världshistoria + händelsetyp | |
| Historiska & religiösa berättelser | Världshistoria/Religioner/Bibeln | Kräver postgranskning |
| Bibeltexter – olika tidstyper | Bibeln + tidstyp | |
| Bibelns böcker | Bibeln + innehållstyp bok | |
| Apokryferna | Bibeln + innehållstyp apokryf | Kanonstatus specificeras efter tradition |

## Migrationsordning och skydd
1. Inventera **alla befintliga poster**, faktiskt category-värde, tidsfält, filter och alla hänvisningar. Relevanta C6/C7-arbeten pågår parallellt.
2. Skapa en **read-only klassificeringsadapter**: mappa kända poster till nya dimensioner, med explicita okända/osäkra värden. Automatisk massklassificering utan källstöd är förbjuden.
3. Prova fyra nya huvudområdesfilter **bredvid** de gamla i en separat PR. Godkänn postantal, sökbarhet, postrelationer, Gantt och mobil innan byte.
4. Flytta äldre filter till ett **Avancerat filter**. Ta inte bort dem förrän deras funktionalitet finns i de nya dimensionerna.
5. Uppdatera Startsida, Tidslinje, Temaspår, Karta och Jämför stegvis för samma klassificeringsmodell.
6. Avsluta med ett heltäckande regressionstest: ingen post, tid, forskningsstatus eller användarlänk får försvinna.

## Övriga öppna designbeslut
- Befintligt godkänt heromotiv ligger till grund för **gemensamma bildhuvuden** i alla sex huvudflikar. Inga konstruerade religiösa landskap.
- Den befintliga kartkopplingen behålls. Kartans grafik jämförs separat med The World Behind the Word.
- PR #150 (full forskningsvy) integreras senare, efter strukturarbetet.

## Nästa tekniska steg: C3.3
Inventering av rådata och dess kategorivärden i automatiska tester; därefter en icke-förstörande adapter i egen test-PR.
