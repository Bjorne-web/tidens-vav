# B3.3 – Första korrigerade integreringssteg i befintlig design

Den verkliga Cloudflare-versionen av Tidens väv har bekräftats visuellt av beställaren som designreferens för **Hem** och **Tidslinje**. Därför inför vi **inga nya visuella komponenter** i detta steg.

## Ändring

`v914-home-paths-c3.js`: den befintliga `open(id)`-funktionen avvisar nu okända och ännu inte aktiverade huvudområden innan den försöker navigera. Tidigare kunde ett anrop med t.ex. `ideas` falla igenom till Tidslinjen trots att motsvarande ingång ännu inte är implementerad.

Ändringen påverkar inte de tre redan aktiva ingångarna `bible`, `religion` och `history`. Deras befintliga navigation och befintliga filtreringsbeteende består.

## Oförändrat

- Originalfilen `index.html`, bild `Start-hero.png`, SVG-ikoner, startkort, hela CSS-kedjan och Gantt/tidsreglage.
- Originaldata, källprövade datum och C7.
- Fristående avvisad prototyp används inte som designmål.

## Kontroll

`tests/b33-existing-home-navigation.test.cjs` kör funktionen med simulerad DOM och verifierar både korrekta navigationsmål och att okända huvudområden inte leder till fel flik.

Detta är en liten **funktionell** integreringsändring, inte ett visuellt designgodkännande. Den ska testas som en Cloudflare-branch-preview innan sammanslagning. Ingen Cloudflare-previewadress får anges utan verifiering.

**Illustrativ process:** B2.3 klart → B3.1 klart → B3.2 klart → **B3.3 befintlig design med säker navigationspilot** → B3.4 återstår.
