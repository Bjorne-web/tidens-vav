# V8.42 – förändringar i sidopanel och tidslinjens visningsläge

Uppdraget utgår från användarens dokument **”Uppdateringsförslag V8.41 till Tidens väv”** (två sidor, fyra numrerade ändringsförslag). Dokumentets **punkt 5 är tom**, och ingår därför inte i denna version.

## 1. Temaspår före samlad forskningsöversikt

Tidigare läsordning: **Källförankrad genomgång → Samlad forskningsöversikt → Historiska samband/Temaspår**.

Ny läsordning: **Källförankrad genomgång → Historiska samband/Temaspår → (eventuella bibeltextlänkar) → Samlad forskningsöversikt**.

Länkknappen *Visa sambanden i Temaspår* återanvänds i den befintliga panelen `.v827-reader-rel`. Ingen kopia av innehållet skapas och inga forskningspåståenden förändras.

## 2. Bibeltextlänkar direkt efter Temaspår

Om posten har den befintliga rutan **Läs de angivna bibeltexterna** (`.v89-bible-panel`) flyttas den till platsen direkt under Temaspår, **före** den utfällbara samlade forskningsöversikten. Om posten saknar bibelhänvisningar skapas ingen tom eller felaktig ruta.

Eventuella länkknappar till kapitlen på Bible.com samt befintliga textjämförelser och textutvecklingsmoduler återanvänds med sina ursprungliga länkar och händelsehanterare.

## 3. Källgranskning och delning längst ned

- **KÄLLGRANSKNING · V8.34** (`.v834-review`) placeras näst längst ned.
- **Dela historisk undersökning** (`.v835-share`) placeras allra längst ned. På Cloudflares testadress heter den fortfarande ”Dela testversionen”, eftersom den varnar för tillfälliga förhandslänkar.

Äldre kompletterande texter, forskningskort och källförankrade jämförelser finns kvar ovanför dessa två avslutande paneler.

## 4. Tydligare namn i fliken Tidslinje

Knappen som tidigare hette **Alla poster** i växlingen **Översikt / Alla poster** heter nu **Detaljerad tidslinje**. Den har samma tekniska ID (`v7expanded`) och samma knappfunktion som tidigare. Den visar fler händelseposter i vald period på proportionell tidsaxel eller kronologisk lista. Hjälptexten i tidslinjen förklarar det nya namnet.

Detta är en ändring av just **visningslägesknappen i fliken Tidslinje**. Det separata menyvalet **Poster** / **Alla poster** för att öppna en postlista ändras inte, eftersom det är en annan funktion.

## Teknisk avgränsning

- `v842-reader-navigation.js`: ordnar om de **befintliga DOM-noderna** efter alla tidigare `renderDetail`-lager och sätter ny etikett efter `renderTimeline`.
- `v842-reader-navigation.css`: förbättrar avstånd och mobilvisning.
- `index.html`: länkar de nya filerna och visar V8.42.
- `tests/smoke-v842.mjs`: prövar önskad ordning med/utan bibeltextlänkar, kvarvarande källrutor, bibehållna knapphändelser, inga dubbelkopior och oförändrad tidslinjefunktion.
- `app.js`, `data/data.generated.js`, `data/review-ledger.js` och Temaspårs urvalslogik ändras inte.
- C6:s senaste granskade framdrift är fortfarande 15 poster och 24 avgränsade påståendekontroller, samt 0 fullständigt slutgranskade.

## Manuell kontroll i Cloudflare Preview före godkännande

1. **Puniska krigen**: Källförankrad genomgång → Historiska samband/Temaspår → Samlad forskningsöversikt → resten; Källgranskning och delning ska vara sist.
2. **Noa och flodberättelsen**, eller annan post där *Läs de angivna bibeltexterna* finns: rutan ska ligga **direkt under Temaspår**, med fungerande länkar.
3. **Gilgamesheposet – flodberättelsen**: ingen förlorad V8.28-dossier eller källhänvisning; den gemensamma sidopanelsordningen ska vara densamma.
4. **Zoroastrism/Daniel**: V8.41:s källnära jämförelse med fyra antika textställen ska finnas kvar.
5. **Tidslinje**: kontrollera växlingen *Översikt / Detaljerad tidslinje* och att proportionella markörer och listvyn fungerar.
6. **Temaspår**: utgångspost och sex förvalda samtidskategorier kvar. Kontrollera på mobil.

**Produktion ska vänta på användarens test och uttryckliga godkännande av V8.42.**
