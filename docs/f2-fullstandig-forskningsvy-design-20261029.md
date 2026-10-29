# F2 – Designspecifikation för gemensam forskningsvy

**Datum:** 2026-10-29 · **Status:** Designförslag för separat acceptans, **ingen implementation**.  
**Grund:** Godkänd F1 (PR #374), styrdokument v1.1, godkänd B3.4-design.

## 1. Designmål
En forskningspost ska vara lätt att förstå på två nivåer: **Snabbfönster → Full forskningsvy → Tillbaka till samma sammanhang**. Alla presentationsvarianter läser samma framtida kanoniska adapter; text och status dupliceras inte i UI. Forskning, tradition, hypotes och filosofiskt argument skiljs åt. Den godkända huvudnavigeringen, landskapsbilden, fyra områdesfärgerna och original-SVG:erna är oförändrade.

## 2. Informationshierarki
**Snabbfönster:** post-ID/objektstyp, titel, tydlig datumtyp och osäkerhet där relevant, 2–4 meningars översikt, en viktig koppling och knapparna `Öppna full forskningsvy`, `Tillbaka`. Befintliga `#detail` / specialläsare finns kvar tills ersättning är verifierad.

**Full forskningsvy:** kontextbunden topp med `← Tillbaka till [utgångsvy]`, eventuell `Jämför` och `Dela`; posthuvud med ID/typ, rubrik, sammanfattning och status; avsnittsnavigation; huvudtext; relaterade poster/samband. Utelämna tomma sektioner och deklarera när relevant forskningsinnehåll saknas utan att fabricera fält.

### Datorskiss, princip (inte HTML/implementerad prototyp)
```text
┌──────────────────────────────────────────────────────────────────────────┐
│ ← Tillbaka till Tidslinje           H045 · POST        [Jämför] [Dela] │
├──────────────────────────────────────────────────────────────────────────┤
│ AHAB OCH SLAGET VID QARQAR            853 f.Kr. · [Dateringsstatus]     │
│ Kort introduktion och källkritisk markering                             │
├───────────────┬─────────────────────────────────────┬───────────────────┤
│ INNEHÅLL      │ ARTIKEL                             │ SAMBAND           │
│ Översikt      │ Historisk kontext                   │ Relaterad post    │
│ Tid och plats │ Forskningsläge / tolkningar         │ Relationstyp      │
│ Forskning     │ Källor och evidens                  │ Varför relaterad? │
│ Källor        │ Betydelse när relevant              │                  │
│ Betydelse     │ Tidslinje/karta när belagd          │                  │
│ Samband       │                                     │                  │
└───────────────┴─────────────────────────────────────┴───────────────────┘
```

### Mobilskiss, princip
```text
┌───────────────────────────────┐
│ ← Tillbaka      [Dela]        │
│ H045 · Historisk post         │
│ Rubrik                        │
│ Datering + säkerhet           │
│ Sammanfattning                │
│ [Välj avsnitt ▾]              │
│ ─ Översikt ─                  │
│ Läsbar artikeltext            │
│ Källor (expanderbar lista)    │
│ Historisk/religiös betydelse  │
│ Relaterade poster             │
│ ← Tillbaka till utgångsvyn    │
└───────────────────────────────┘
```
Inga täckande permanenta sidopaneler på mobil. Tangentbordsfokus återgår till anropskontrollen. Användarens scroll, filter, kartläge/tid och jämförelseurval återställs enligt F5:s navigationstest.

## 3. Fyra pilotvarianter

| Typ | Exempel | Visningskontrakt |
|---|---|---|
| Historisk post | H045: Ahab och Qarqar | Tid och plats, forskningsläge, primärkällor, relationer |
| Bibelbok | B001: Första Moseboken | Skilj **berättad tid** från **textens tillkomst**, redaktion och källor |
| Apokryf | D001 – kontrollera ID mot aktuell läsmodell innan test | Texttradition, tillkomst, kanonstatus och existerande speciallänkar |
| Forskningsfråga | Är Gud god? | Fråga, historiska svar, argument och begränsningar – **ingen konstruerad datering** |

Därtill en källfördjupad C7-post för fält-, proveniens- och bildkontroller. `source` blir en separat typvisning för dokument/fynd med proveniens och relaterade poster, inte likställd med en historisk händelse.

## 4. Avsnitt och vetenskapliga etiketter
- **Historiska belägg:** källans typ, tid, proveniens och relevans.
- **Forskningsbedömning:** slutsats med evidensgrad, dateringsgrund och reservation.
- **Religiös tradition:** hur en tradition beskriver saken; gör inte traditionellt anspråk till automatiskt historiskt faktum.
- **Öppen hypotes / filosofiskt argument:** skilt från empirisk forskningsbedömning.
- **Sambandskort:** visar `samtidighet`, `motivlikhet`, `möjlig påverkan`, `dokumenterad kontakt` eller `alternativ tolkning` när belagt – alltid kort förklaring och osäkerhet.

Källhänvisningar och avsnittet **Betydelse för Israels religion, judendomen och kristendomen** ska finnas i relevant underlag utan att försvinna när texten läggs om.

## 5. Beslut om interaktioner före kod
1. **Fördjupningsläge, inte sjunde huvudflik.** Delbar URL ska bära kanoniskt objekt-ID och objekttyp, med bevarad kompatibilitet för befintliga `?tv_id=...`-länkar.
2. **Tillbaka** återställer rätt utgångsvy/post/urval och scroll; även browser Back och mobil stäng-knapp måste testas mot samma kontrakt innan F5.
3. **Källor öppnas spårbart** och får inte presenteras som verifierade enbart för att URL finns.
4. **Snabbfönster** fungerar fortsatt som orientering, full vy ska ge substantiellt mer innehåll, inte bara större text.
5. **F2 är en specifikation**; godkännande av F2 ger klartecken till F3 som separat adapterfas, inte automatiskt till produktion.

## 6. Visuella acceptanskriterier
- Dator och mobil har logisk rubrikordning och läsbar text; kontrast och fokus syns.
- Originalfärger/-ikoner bevaras på områdesnivå; forskningsstatus får egna tydliga textetiketter, inte bara färg.
- Inga blankrutor med låtsaskällor, påhittade datum eller dolda C7-reservationer.
- Historisk post, bibelbok, apokryf och forskningsfråga skiljer sig **innehållsligt**, men delar läsfamilj.
- Utgångs- och återgångsflöde är begripligt även på mobil.
- Ingen kod, URL-routning, data eller nuvarande produktionsgränssnitt ändras i denna PR.

## 7. Vad återstår för F3–F6?
**F3:** read-only-adapter och fältvis källföreträde. **F4:** implementerad full forskningsvy utan att riva befintlig läsare. **F5:** gemensam navigation, URL och tillbakaväg från fyra utforskningsvyer. **F6:** regression och stegvis konsolidering efter uttryckligt godkännande.
