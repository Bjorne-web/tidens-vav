# Tidens väv – målarkitektur för forskningsvyn

**Version:** Förslag 1.0 · **Datum:** 2026-10-19 · **Status:** Designförslag för godkännande, inte genomförd implementation.  
**Överordnat styrdokument:** [Tidens väv – design och arkitektur v1.1](tidens-vav-design-och-arkitektur.md).  
**Källunderlag:** Inventering pass [1](navigation-och-funktioner-inventering-pass1-20261019.md), [2](navigation-och-funktioner-inventering-pass2-20261019.md) och [3](navigation-och-funktioner-inventering-pass3-20261019.md). Dessa ligger vid framtagningen i separata öppna dokumentations-PR:er (#124–126), så deras länkar fungerar efter att respektive PR har integrerats.

## 1. Arkitekturbeslut som föreslås

Forskningsvyn ska bli **en sammanhängande läsupplevelse med två presentationsnivåer** och **tre datatyper**. Vi bygger *inte* en ny separat databas för Fördjupa.

- **Snabbfönster:** lätt orientering utan att lämna tidslinje, karta, temaspår eller jämförelse.
- **Fullständig fördjupningsvy:** egen fokuserad läsyta, avsnittsnavigering, källor, evidens, kontext och kopplingar; återvänd till samma utgångsläge.
- **Kanoniska kunskapsobjekt:** `post`, `topic`, `source`. Samma forskningsdata renderas på flera sätt beroende på objektets typ.

**Upptäck → Utforska → Fördjupa → Återvänd**, med noll krav på särskild tro eller bestämd slutsats. Visa alternativ respektfullt men tillmät belägg deras faktiska styrka.

## 2. Informationsarkitektur och vyernas ansvar

| Del | Funktion | Ska inte göra |
|---|---|---|
| Hem | Väcka nyfikenhet; välja område, tema eller sökning | Vara en separat kopia av forskningsdatabasen |
| Tidslinje | Tid, samband, kategori, panorering | Bära hela forskningsartikeln i Gantt-korten |
| Karta | Platser, historiska regioner, tydlig osäkerhet | Presentera schematiska gränser som exakta |
| Temaspår | Historisk utveckling av frågeställningar/idéer | Skapa dubblettposter |
| Jämför | Strukturerad parallell läsning av 2+ objekt | Förlora urvalet när ett objekt öppnas |
| Snabbfönster | Besvara: ”Vad är detta och varför relevant?” | Visa full litteratur- eller källapparat |
| Full forskningsvy | Besvara: ”Hur vet vi det?” och ”Hur hänger det ihop?” | Göra filosofisk diskussion till historiska fakta |
| Sök | Hitta poster, teman, platser och källor | Skapa ytterligare en separat toppflik |
| Om | Metod, avgränsningar, transparens | Göra innehållsläsningen svårare |

**Navigation:** Hem · Tidslinje · Karta · Temaspår · Jämför · Om, med global sök. `Utforska` är samlingsbegrepp, inte flik. `Fördjupa` är fördjupningsläge, inte ny huvudflik. De fyra ämnesområdena är Bibeln, Religioner, Världshistoria, Idéer & kunskap.

## 3. Konkreta skisser i text

### 3.1 Snabbfönster på dator

```text
┌───────────────────────────────────────────────┐
│ [Tillbaka / stäng]                 [Jämför +] │
│ [Bild]  H045 · Ahab och slaget vid Qarqar      │
│         853 f.Kr. · dateringsstatus           │
│ Kort forskningssammanfattning (ca 100–160 ord)│
│ Varför relevant? · 1–2 tydliga samband        │
│ Källstatus: kort märkning + förklaring        │
│ [Öppna full forskningsvy →]                  │
└───────────────────────────────────────────────┘
```

Befintlig `#detail` och dess datafunktioner är utgångspunkt för snabbfönstret. Källor, källjournal och längre texter försvinner inte utan får tydligare plats i den fullständiga läsytan.

### 3.2 Full forskningsvy på dator

```text
┌────────────────────────────────────────────────────────────────────┐
│ ← Tillbaka till Tidslinje   [Post-ID] [Spara till Jämför] [Dela] │
├──────────────┬───────────────────────────────────┬─────────────────┤
│ INNEHÅLL     │ RUBRIK / BILD / ÖVERSIKT           │ SAMBAND         │
│ • Översikt   │ Datum och osäkerhet                │ relaterade      │
│ • Kontext    │ Historisk/geografisk kontext       │ poster / karta  │
│ • Forskning  │ Forskningsläge och alternativ      │ teman          │
│ • Källor     │ Evidens och referenser             │                 │
│ • Betydelse  │ Betydelse för Israels religion...  │                 │
│ • Relationer │ Relaterade poster med relationstyp │                 │
└──────────────┴───────────────────────────────────┴─────────────────┘
```

Mobil: en kolumn, tillbakaknapp överst, avsnittsmeny i hopfällbar meny och relaterade samband efter artikeltexten. Inga permanenta täckande sidopaneler.

### 3.3 Tematisk forskningsfråga

`Är Gud god?` ska visas som ett **tema/fråga**, med fråga → historiskt utvecklade svar → argument för och emot → vad som kan eller inte kan beläggas → källor/relaterade historiska poster. Temat behöver inte ha ett falskt ”start- och slutår”.

## 4. Föreslaget databärande kontrakt

Ett adapterlager läser befintliga poster från t.ex. `TIDENS_SPECIAL_RESEARCH`, `allOriginalResearchV828`, `research`, `v82Library` och `sourceCards`, utan att skriva över ursprungskällorna. Gemensam normaliserad **läsmodell**:

```text
ResearchEntity {
  id: string; kind: "post" | "topic" | "source";
  title: string; summary?: string;
  primaryArea?: "bible" | "religions" | "world" | "ideas";
  areaLinks?: string[]; categories?: string[];
  temporal?: {from?: number; to?: number; dateType?: string;
               certainty?: string; rationale?: string};
  places?: {id?: string; name: string; certainty?: string}[];
  status?: {reviewLevel?: string; evidence?: string; lastReviewed?: string};
  sections?: {id: string; title: string; contentRef: string}[];
  sources?: {id?: string; title: string; url?: string;
             sourceType?: string; evidenceRole?: string}[];
  relations?: {targetId: string; relationType: string;
               confidence?: string; rationale?: string}[];
  media?: {src: string; attribution?: string; mediaType?: string}[];
}
```

**Detta är ett målschema, inte ett påstående om befintliga fältnamn.** Inga äldre objekt skrivs automatiskt om. Adapterlagret ska härleda endast faktisk information; okända fält förblir okända. Källföreträde och konflikter måste lösas per fält med spårbarhet till originaldata. Undvik tyst prioritering av senast laddad fil. Behåll stabila post-ID:n. Möjliggör explicit `kind` för bibelbok/apokryf som undertyp i postpresentation om behov finns.

### Evidens och relationssemantik

Föreslagna relationstyper: `contemporary`, `motif-parallel`, `possible-influence`, `documented-contact`, `chronological-sequence`, `alternative-interpretation`, `textual-relationship`. En relation behöver **förklarande text och belägg/grad av osäkerhet**. Samband ska inte överdrivas.

Särskilj källtyp (primärtext, inskrift, arkeologiskt fynd, modern forskning), dateringsnivå, traditionell beskrivning, forskningsbedömning och forskningsdebatt. Visa inte godtyckliga färgmärken som antyder opublicerad kvalitetsgranskning.

## 5. Gemensam navigationskontext

```text
ExploreContext {
 originView: "home" | "timeline" | "map" | "themes" | "compare" | "search";
 originObjectId?: string; selectedObjectId?: string;
 timeWindow?: {min: number; max: number};
 areas?: string[]; categories?: string[];
 themeId?: string; comparisonIds?: string[];
 mapView?: {center?: [number,number]; zoom?: number};
 scroll?: number; readerScroll?: number;
}
```

Bygg vidare på befintliga `state.selected`, `v829NavStack`, `v829Focus`, `v827RelationFocus` och temaspårens tillstånd. **All återställning är en målfunktion som kräver praktiskt test**, inte redan bekräftad i alla vyer.

Navigeringskontrakt: öppna post utan att tappa vy → öppna full vy → tillbaka till samma vy, tidsintervall och relevanta filter. Browser Back, mobilens stäng/tillbaka och appens backknapp får inte ge motstridiga resultat. Behåll `?tv_id=...&tv_view=...` genom kompatibla interna routningsregler; befintliga djuplänkar får inte brytas.

## 6. Designkontrakt

- Godkända SVG-ikoner och färger för fyra huvudområden återanvänds oförändrat, tills en separat godkänd designmigration ändrar något.
- Samma typ av forskningsstatus ska beskrivas lika i samtliga vyer.
- Bildkälla/illustration och bildrättigheter måste framgå. Inga generiska bilder som framstår som fotografiska historiska belägg.
- Text prioritera pedagogisk klarhet, men tillåt djup efter val. Klarspråk + forskningsapparat, inte en svåröverskådlig jättelång panel.
- Tillgänglighet: tangentbordsnavigation, synliga fokustillstånd, korrekt rubrikordning, tydlig kontrast och test för mobil.
- Befintlig godkänd Startsida och V8.94 Tidslinje från PR #106 är **regressionsreferenser**.

## 7. Samordning med C7 och andra PR:er

C7 får fortsätta granska och lägga till forskningsinnehåll i `main` via vanliga PR:er. C7 **ska inte själv införa ny separat forskningsvy, ändra global navigation eller duplicera källdata**. Om gemensamma datafält behöver utökas: avstämning mot detta målkontrakt och särskild migrerings-PR.

Pass 1–3 (#124, #125, #126) är fristående dokumentations-PR:er. Lägg inte in deras ändringar genom breda cherry-picks av osynkade grenar; granska och integrera dem först. Detta dokument sammanfattar deras viktigaste slutsatser men ersätter inte deras inventeringsbevis.

## 8. Implementation i avgränsade etapper

1. **Målarkitektur godkänns.** Kontrollera dokumentation PR #124–126; slå samman separat efter godkännande.
2. **Designprototyp utan produktionspåverkan:** responsiv skiss för post, bibelbok/apokryf och tematisk fråga; använd befintliga godkända färger och ikoner.
3. **Adapter / läsmodell:** normaliserat API över befintliga data, utan datamigrering. Testa källproveniens, osäkerhet och specialfall.
4. **Snabbfönster:** en enda avgränsad testgren, utan att ta bort gamla `#detail` innan motsvarande innehåll finns i full vy.
5. **Full forskningsvy:** avsnittsnavigering och relationspanel, fortsatt tillgång till källor och C7:s obligatoriska betydelseavsnitt.
6. **Navintegration:** Tidslinje, Karta, Temaspår och Jämför öppnar samma enhet; återgång och djuplänk.
7. **Kontrollerad konsolidering:** först när testet är godkänt döljs gamla flikar, med bevarade direktvägar och innehåll.

## 9. Pilotfall och godkännandekriterier

**Testfall:** H045 (Ahab/Qarqar; tidslinje och relationer), B001 (Första Moseboken; bibelbok och tidstyper), en apokryfpost (specialläsare), ett tematiskt spår som *Är Gud god?*, samt en C7-fördjupad post med källor och bilder. Använd faktiska ID:n verifierade i aktuell databas för apokryf- och C7-testfall.

**Tester:**
- Varje post och tema öppnas korrekt från relevanta ingångar och återvänder med bevarad kontext.
- Inga källor, årtal, osäkerheter, bibellänkar, bilder eller religionshistoriska betydelsetexter försvinner.
- Stora frågor förblir tematiska, inte fabricerade ”daterade händelser”.
- Desktop/mobil, tangentbord, fokus, skärmläsningssemantik och direkta URL:er fungerar.
- Jämförelseurval och tidigare forskningsposter överlever vybyten.
- Godkänd tidslinje och dess panorering, kategoriinställningar, årsmarkeringar och hjälplinjer påverkas inte.
- Gamla `#detail` / `#researchView` får inte raderas innan deras funktioner har täckts av den nya modellen.

## 10. Öppna beslut före implementation

- Ska full forskningsvy ligga i samma dokument (routad vy) eller egen URL? Rekommendation: routad vy med delbar URL, men besluta efter prototyp.
- Prioritering när flera datafiler beskriver samma post eller fält.
- Gränsen mellan snabbfönster och full vy (mängd text, exakt sektionering).
- Vilken information som ska följa från karta respektive jämförelse.
- Om teman kräver en egen URL-typ från början.

**Beslutsstatus:** Detta dokument föreslår målarkitektur och implementationstrappa, men godkänner inte automatiskt framtida kodändringar.
