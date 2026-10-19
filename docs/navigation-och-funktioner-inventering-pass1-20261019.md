# Inventering av navigation och funktioner – pass 1

**Datum:** 2026-10-19 · **Status:** Pågående inventering; INGA borttagningar godkända.  
**Bas:** `main` efter fastställt styrdokument v1.1 (PR #123).  
**Metod:** Statisk inspektion av `index.html`, `app.js` och befintliga scriptreferenser. Detta är **inte** ett slutfört beteendetest av samtliga vägar.

## 1. Samlad nulägesbild

HTML innehåller **18 navigationsflikar** (`navStart`, `navPilot`, `navTimeline`, `navChronology`, `navArchaeology`, `navReligion`, `navExile`, `navHellenism`, `navRoman`, `navExplore`, `navRecords`, `navCompare`, `navMap`, `navParallels`, `navFormation`, `navArchive`, `navResearch`, `navAbout`). Samtliga har en korresponderande `*View` i markup. Separat finns ett forskningsmenyflöde med nio undersidor.

**Målbild:** Hem, Tidslinje, Karta, Temaspår, Jämför, Om; gemensam Sök; Fördjupa som postvy. `Utforska` är ett samlingsbegrepp, inte en flik.

## 2. Funktion-för-funktion: preliminär mappning

| Nuläge (DOM-ID) | Roll enligt styrdokument | Rekommendation | Kontroll före ändring |
|---|---|---|---|
| Börja här (`navStart`) | Hem | **Behåll**, omdöp i nya menyn | Startsida, huvudkort, sök, djuplänkar |
| Testa appen (`navPilot`) | Hjälp/introduktion | **Integrera** i Hem/Om; ta bort från toppmenyn | Onboarding och alla interna länkar |
| Tidslinje (`navTimeline`) | Tidslinje | **Behåll** V8.94-referens | Gantt, kategori, reglage, bibelböcker, apokryfer |
| Granskad kronologi (`navChronology`) | Tidslinje/Fördjupa | **Integrera**, bibehåll källgranskningen | Dateringsstatus, egna poster, djuplänkar |
| Arkeologi & Bibeln (`navArchaeology`) | Sök/filter/Fördjupa | **Integrera** som forskningsspår | Fynd, kartkopplingar, dokument |
| Israels religion (`navReligion`) | Temaspår/Religioner | **Integrera** som ingång/tema | Ämnesinnehåll och historiska relationer |
| Exil & texter (`navExile`) | Temaspår/Fördjupa | **Integrera** | Källor, teman, djuplänkar |
| Andra templets tid (`navHellenism`) | Temaspår/Tidslinje | **Integrera** | Periodgränser och postlänkar |
| Jesus & Rom (`navRoman`) | Temaspår/Tidslinje | **Integrera** | Poster, kronologi, kopplingar |
| Temaspår (`navExplore`) | Temaspår | **Behåll**; harmonisera navigation | Utgångspost, postlänkar, ämnesflöden |
| Poster (`navRecords`) | Sök/resultat/Fördjupa | **Integrera** i sökning och postöversikter | Alla poster kan nås via annan ingång |
| Jämför (`navCompare`) | Jämför | **Behåll** | Valda poster, länkbarhet, synk |
| Karta (`navMap`) | Karta | **Behåll** | Platser, lager, tidsurval, historiska gränser |
| Textparalleller (`navParallels`) | Jämför/Fördjupa | **Integrera** som källjämförelse | Motivparalleller vs belagd påverkan |
| Textens tillkomst (`navFormation`) | Tidslinje/Fördjupa | **Integrera** som textforskningsperspektiv | Dateringslager, textstadier, källor |
| Originalarkiv (`navArchive`) | Källor och evidens | **Bevara som avancerad källa**, ej toppflik | Proveniens och dokumentlänkar |
| Fördjupningar (`navResearch`) | Fördjupa / forskningsingång | **Omforma** snarare än radera | C6/C7, läsare, forskningsstatus, bilder |
| Om (`navAbout`) | Om | **Behåll** och utveckla metod/transparens | Äldre statiska texter, versioner |

**Ingen tabellrad innebär beslut om deletion.** Att integrera betyder att innehåll/funktioner först ges en säker ny ingång.

## 3. Befintliga korskopplingar och tekniska risker

- Grundläggande `view(v)`, `setSelected(id)` och `renderAll()` i `app.js` binder navigering, läsfönster, jämförelse och karta samman. Flera senare versionsscript utökar/ersätter dessa. En framtida menyändring måste därför omfatta mer än HTML.
- Forskningsmenyn `v827ResearchMenu` innehåller nio äldre ämnesvyer. Inventera dess knappar, mobilmeny och djuplänkar före konsolidering.
- `#detail`, `#selectedMini`, `#v84ReadPeek` och `#v84BottomNav` bildar separata läs-/mobilflöden som behöver en gemensam kontextmodell.
- Tidslinjen använder påbyggda script (bl.a. `v843-timeline-workspace`, `v879-timeline-layout`, `v881-gantt-category-controls`, `v900-timeline-landscape`, `v894-timeline-rebuild`). Ändra inte deras redan godkända samverkan utan regressionstest.
- Kategorierna i kod (`laneNames`, `dark`) är äldre taxonomier, skilda från de fyra nya huvudområdena. **Idéer & kunskap** kräver inventering och datamigreringsplan, inte enbart byte av etikett.
- Bibelns böcker, apokryferna, C6/C7-fördjupningar, temaspår och relaterade poster har specialkod; allt måste skyddas mot bortfall vid menyförenkling.

## 4. Rekommenderad fortsättning för pass 2

1. Skapa **rutt- och ingångsmatris**: varje navknapp, forskningsmeny, mobilknapp och länk till dess faktiska `view`/post-ID/mål.
2. Inventera **postöppning och kontextbevarande** (från Tidslinje, Karta, Temaspår, Jämför, Sök), inklusive utgångspost och Tillbaka.
3. Upprätta **datamappning** från gamla kategorier till Bibeln, Religioner, Världshistoria, Idéer & kunskap; testa tvärkopplingar innan migrering.
4. Testa **desktop och mobil** samt direktlänkar; noterade brutna vägar blir egna fix-PR:er.
5. Skapa en **målstruktur/wireframe** och föreslå därefter första rena navigations-PR. Vänta med borttagning till test.

## 5. Beslutsgrind

**Inventering pass 1 är ett analysresultat, inte godkännande för kodändringar.** Frys PR #106:s godkända V8.94-beteende och låt C7 fortsätta utan att kringgå gemensam designmodell.
