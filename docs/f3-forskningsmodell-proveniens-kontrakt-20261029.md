# F3 – Källspårbar forskningsmodell: kontrakt och testpilot

**Datum:** 2026-10-29 · **Status:** Testgren, **inte godkänd eller aktiverad i appen**.  
**Grund:** F1 (PR #374), F2 (godkänd PR #377), styrdokument v1.1.

## Nuläge i aktuell main
`v897-research-read-model.js` tillhandahåller `TidensResearchReadModel.get/has/diagnose`. Den fungerar som read-only-pilot. För `summary`, `context`, `impact` och `limits` väljer `pick()` den första ifyllda strängen i en fast lagerordning (special → original → olika sourceCards → library → research → post) och registrerar valt lager/fält i `provenance`. Den visar **inte** övriga konkurrerande värden; källornas företräde är inte motiverat fältvis. `sources` dedupliceras per URL och bär `origin`, men ursprungliga källroller/granskningsnivåer är inte systematiskt modellerade. `religion` hämtas från C7 eller speciallager och behöver explicit proveniens. Datum hämtas från grundposten och måste skilja tillkomst från berättad tid.

**Risk:** Att ersätta dagens modell direkt kan ge tyst dataförlust. F3 testar därför först ett fristående kontrakt med syntetiska data.

## Föreslagna kontrakt
- `post`, `topic` och `source` är olika objekttyper med stabilt ID. Bibelbok och apokryf är subtyper av `post`.
- Varje faktapåstående som exponeras från ett lager får `value`, `origin`, `originalField` och `reviewState` (om uttryckligen angivet). Källornas URL eller ID ska behållas; länksäkerhet och vetenskaplig verifiering är olika saker.
- Om två lager har olika icke-tomma värden får användarmodellen `conflict: true` och `alternatives`, utan att låtsas att konflikten är löst. En möjlig rekommenderad visning väljs bara när det finns en **beslutad, dokumenterad fältregel**; annars `selected: null`.
- `temporal` skiljer `eventTime`, `narrativeTime`, `compositionTime` och deras osäkerheter. Inga datum härleds från temafrågor eller ikonfärger.
- Relationer blir `relationType`, `targetId`, `rationale`, `evidence` när källorna stöder detta; motivparallell innebär inte automatiskt direkt påverkan.
- Frånvaro av uppgift betyder **saknas/inte granskad**, inte falskt, säkert eller slutgiltigt daterat.

## Separat testpilot (ingen produktionskoppling)
`tests/f3-provenance-core.cjs` innehåller en ren funktion som tar testlager och uttryckliga regler och returnerar en fryst, källspårbar, konfliktsynlig representation. Den läser inte fält från `window`, DOM eller C7:s produktionsdata. `tests/f3-provenance-core.test.cjs` testar sammanfallande uppgifter, olösta konflikter, uttrycklig prioritet, oförändrade indata, ogiltiga fältvärden och specialfallet berättad tid. Ingen `index.html`-referens skapas.

## F3:s uppföljande granskningspunkter
1. Kartlägg den verkliga uppsättningen ursprungslager och tillåtna fält i H045, B001, en verifierad apokryfpost samt vald C7-post.
2. Fastställ fält-för-fält vad som är auktoritativt original, granskad senare komplettering, parallell text respektive en ännu olöst konflikt. Vetenskapligt omdöme beslutas med C7, inte via filordning.
3. Definiera separat `topic`/ `source`-läsning för forskningsfrågor och inskrifter/manuskript.
4. Bestäm hur konflikter och källstatus ska återges begripligt i F4, utan att överdriva vetenskaplig säkerhet.
5. Inför endast godkänd adapter på en ny avgränsad testgren. **Ingen produktionskoppling eller merge av F3-kod utan beställarens uttryckliga godkännande.**

## Acceptanskriterier för F3
- Beslutat källkontrakt och dokumenterad konflikthantering.
- Ren testpilot klarar CI:s syntetiska källkonflikter.
- Aktuella postfält och C7:s daterings-/betydelsefält verifierade mot verkliga poster innan produktionsadapter får övervägas.
- Godkännande av F3 sker uttryckligen; F4 startar först därefter.
