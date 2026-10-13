# Tidens väv — V8.30 publiceringsklar statisk webbapp

Denna mapp innehåller en fristående publiceringsversion (ingen backend).

## Gratis publicering via GitHub + Cloudflare Pages

1. Skapa ett separat GitHub-repository, exempelvis `tidens-vav`, och ladda upp **innehållet i denna mapp till repositoryts rot**.
2. I Cloudflare Dashboard: Workers & Pages → Create → Pages → Connect to Git → välj repository.
3. Produktionsgren: `main`. Framework preset: `None`. Build command: lämna tomt. Build output directory: `/` (repo-roten; välj `.` om gränssnittet kräver ett värde).
4. Publicera och öppna den tilldelade `*.pages.dev`-adressen.
5. För utveckling: skapa en separat branch, gör ändringarna där och kontrollera Preview-URL innan merge till `main`.

**Observera:** Detta är ett publiceringspaket. Behåll det fullständiga V8.30-projektpaketet för redigering av JSON och regenerering med `python3 build.py`; kopiera då uppdaterade webbfiler (`index.html`, `src/`, `data/data.generated.js`, `assets/`) till detta repository.

Ingen domän behövs. Under gratisplanernas användningsgränser ska detta inte skapa extra hostingkostnader. Kontrollera inställningarna och aktuella villkor innan godkännande.

## Kända begränsningar

- Inga ändringar av Temaspårs konceptuella struktur.
- Forskningsmaterialet har inte blivit fullständigt vetenskapligt slutgranskat.
- Kartan hämtar Leaflet från unpkg och kan därför vara beroende av extern åtkomst.
- Detta paket innebär inte att webbpublicering har genomförts.
