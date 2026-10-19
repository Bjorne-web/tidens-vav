# Inventering pass 2 – navigeringsvägar, poster och kontext

**Datum:** 2026-10-19 · **Underlag:** statisk granskning av `main`, främst `app.js`, `v835-deeplinks.js`, `v839-temaspar-context.js`, `v887-home-areas.js` och `index.html`.  
**Status:** Teknisk inventering, inte fullständigt webbläsartest. Ingen kodändring.

## 1. Konstaterade vägval och ingångar

| Ingång | Aktuell mekanism | Behåll/åtgärd i målarkitektur |
|---|---|---|
| Hem och fyra områdeskort | `v887-home-areas.js`; särskild hantering av Bibelns böcker i Tidslinje | Behåll som tydlig väg till gemensamt områdesfilter; kontrollera posturval |
| Tidslinje | `view('timeline')`, `setSelected(id)`, `renderTimeline()`; särskild bokläsare | Behåll; öppna snabbpost och full forskningsvy, bevara period |
| Karta | `view('map')`, `renderMap()`, delad `state.selected` | Behåll; kontrollera geografisk fokus och period vid vidare navigering |
| Temaspår | Intern `explore`-vy, `v829Focus`, `v827RelationFocus`, `v83Theme`; `v839-temaspar-context.js` återanvänder `setSelected` | Yttre etikett Temaspår; bevara utgångspost, temaval och relationer |
| Jämför | `view('compare')`, `renderCompare()`; `v84CompareOrigin` lagrar temaspårssammanhang | Behåll; integrera återväg även från andra ingångar |
| Sök/Poster | Gemensam `#search` triggar `renderAll()`; `recordsView` är separat lista | Utveckla en gemensam sökingång; inventera hela räckvidden före sammanläggning |
| Forskningsmeny | `v827ResearchLinks` med nio ämnesrutter | Integrera som forsknings-/tematiska ingångar, inte ny toppmeny |
| Mobilnavigation | `[data-v84nav]`, `v84MoreButton`, `v84ReadPeek`, `v84OpenReader` | Enhetlig responsiv navigation och postöppning |
| Djuplänk | `?tv_id=...&tv_view=explore|timeline|research` i `v835-deeplinks.js` | Bevara befintliga URL:er genom kompatibilitetslager |
| Apokryf-länk | Specialfall `TidensOpenBookV858` från djuplänkar | Måste fortsätta fungera efter navigationens renovering |

## 2. Delad kontext och navigationshistorik

- `state.view` och `state.selected` används över flera vyer; `setSelected(id)` uppdaterar läsfönster, postlista, jämförelse, karta (om aktiv), paralleller, arkiv och minivisning.
- `v829NavStack` innehåller redan snapshots av **vy, vald post, scroll, läsarposition, katalogfilter, relation, tema, visningsläge, tidsfönster, ordning och evidensurval**.
- `v829Back()` återställer flera av dessa värden. Detta är en **viktig befintlig investering** och bör återanvändas, inte ersättas med enklare tillbaka-knapp.
- Detta är sessionstillstånd. Djuplänkar kan i nuläget enbart begära tre vyer. Målarkitekturen behöver en medveten modell för delbara länkar kontra temporär session.
- Mobilvisning har särskild läsarpanel och fler-meny. Dessa flöden kräver separat praktiskt regressionstest.

## 3. Identifierade risker och integrationskrav

**R1 – Olika namn för samma koncept.** `explore` betyder Temaspår i koden, medan *Utforska* ska vara ett samlingsbegrepp. Interna rutt-ID:n bör tills vidare bevaras men yttre etiketter separeras.

**R2 – Flera postöppningsvägar.** Standardpost, bibelbok och apokryf hanteras delvis olika. En framtida forskningsvy måste definiera typanpassade innehåll utan att bryta post-ID:n.

**R3 – Bakåtväg och utgångspost.** Temaspår arbetar med utgångspost/relation, jämförelse minns viss temakontext, medan allmän navigation använder `v829NavStack`. Kontinuiteten är ännu inte bevisad för alla övergångar.

**R4 – Djuplänkskompatibilitet.** De befintliga offentliga query-parametrarna måste fortsatt öppna samma post efter ombyggnad; omdirigera till rätt ny vy internt.

**R5 – Söksystemets räckvidd.** Nuvarande gemensamma sökruta uppdaterar många renderingar, men det är ännu inte verifierat att den täcker samtliga forskningsposter, specialtyper, temaspår och platser.

**R6 – Många versionsvisa omskrivningar.** `view`, `renderTimeline`, `setSelected` och läsarnavigering har utökats av senare scripts. En ny gemensam navigationsmodell får inte införas genom att ändra bara toppmenyn.

**R7 – Parallelldrift C7.** Ny forskningsdata, temalänkar och läsfönstertexter behöver samordnas med styrdokument v1.1. C7 får fortsätta innehållsarbetet, men undvika okontrollerade ändringar av global navigation, fyra huvudområdens SVG/färger, kanoniska post-ID:n och gemensam forskningsvy. Samordna PR före merge.

## 4. Obligatorisk testmatris före navigationsombyggnad

| Prov | Utgång | Kontroll |
|---|---|---|
| T1 | Tidslinje → post → tillbaka | Tid, kategorier, scroll och post bevaras |
| T2 | Karta → post → tillbaka | Kartläge, plats och urval bevaras |
| T3 | Temaspår → post → Jämför → tillbaka | Utgångspost, tema och jämförelseurval bevaras |
| T4 | Sök → post → annan vy → tillbaka | Samma kanoniska post, ingen dubblett eller borttappad sökning |
| T5 | Direktlänk till `explore`, `timeline`, `research` | Befintliga URL:er förblir fungerande |
| T6 | Bibelböcker och apokryfer | Särskilda läsare och tidslinjekopplingar fungerar |
| T7 | Mobilmeny → post → läsarpanel → tillbaka | Alla kontroller fungerar och vald post består |
| T8 | C7-post med relaterade poster → Temaspår | Fungerande utgångspost och bibehållna samband |
| T9 | Tidslinje Gantt/kategori, panningsreglage | Publicerad V8.94 fungerar oförändrat |

## 5. Rekommenderat nästa arbete

1. Avstämning av dokumenterade rutter mot faktisk webbläsarfunktion (test T1–T9).
2. Kartlägg samtliga befintliga specialvyer och besluta vilken information som ska nås via Karta, Temaspår, Jämför eller Fördjupa.
3. Definiera en **kanonisk navigationskontext** och kompatibla URL-regler – föreslå detta i en separat design-PR, **utan implementation** till att börja med.
4. Därefter ta fram forskningsvyns responsiva wireframe och en säker teknisk migreringsordning.

**Beslutsgräns:** Detta dokument är ett inventeringsresultat. Inga flikar, djuplänkar eller data tas bort i detta pass.
