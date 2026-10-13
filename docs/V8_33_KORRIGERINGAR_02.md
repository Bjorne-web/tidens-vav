# V8.33 – faktiska forskningskorrigeringar 02

Datum: 2026-10-13. Komplettering till `V8_33_KORRIGERINGAR_01.md`.

## Ändringar i testgrenen

- **H009:** Amarnabreven belägger egyptisk överhöghet över vissa stadsfurstar i Levanten under 1300-talet f.Kr. Den belagda miljön stöder inte automatiskt de bibliska erövringsskildringarna. Föremål: Met 24.2.12, https://www.metmuseum.org/art/collection/search/544696
- **H017:** Kyroscylindern vittnar om Kyros erövring av Babylon 539 f.Kr. men nämner inte uttryckligen judar/Jerusalem. Föremål: British Museum 90920, https://www.britishmuseum.org/collection/object/W_1880-0617-1941
- **H037:** Egyptisk inblandning i Levanten stöds av Amarnabreven, men dessa daterar inte en föregiven enhetlig politisk struktur för hela 1400–1200-talet f.Kr. Översikt: https://www.metmuseum.org/ja/essays/the-amarna-letters
- **H042:** Åtskillnad mellan Sanheribs fälttåg mot Juda 701 f.Kr. och Taylorprismats tillverkning cirka 691 f.Kr.; texten är en assyrisk kunglig framställning. British Museum 91032: https://www.britishmuseum.org/collection/object/W_1855-1003-1

Dessa fyra poster har fått förtydligade **beskrivningar** och ämnesspecifika forskningsunderlag med källhänvisningar via `data/review-corrections.v833.js`. Ursprungliga numeriska tidsintervall, postidentifierare och äldre granskningsflaggor har inte ändrats.

## Teknisk verifiering
JavaScript-utvärdering av grunddata plus korrigeringsfil passerar. Poster H009, H017, H037 och H042 finns och motsvarande forskningsunderlag har källor. Full webbläsartestning och historisk slutgranskning återstår.

## Kvalitetsbegränsning
Museikataloger ger god evidens för enskilda föremål, men behandlar inte alltid hela den historiska rekonstruktionens forskningsläge. Därför kvarstår status **delvis källkontrollerad**, inte slutgranskad. V8.32 i produktion är oförändrad.
