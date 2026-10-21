# B3.3 – Förhandsvisning som faktiskt laddar hela Väven

Den visuellt godkända utgångspunkten är `https://tidens-vav.pages.dev/`, kopplad till projektets Cloudflare Pages. De tidigare fristående HTML-kopiorna var fel metod: originalvyn laddar CSS, JS och `Start-hero.png` via relativa sökvägar. Kopian `b33-approved-design-preview.html` har inte publicerats och PR #314 är stängd.

## Inför kommande testlänkar

- Publicera **projektets rot** med `index.html`, CSS, JS, `data/` och bildfiler tillsammans. Ingen enskild HTML-fil som saknar resurser.
- Sidan Hem och Tidslinje ska återanvända `v887-home-areas.css`, `v900-timeline-landscape.css`, `Start-hero.png` och existerande SVG-källor.
- Använd Cloudflare Pages branch/PR Preview om det faktiskt är aktiverat i projektets Cloudflare-konfiguration. Varken Github Actions-tester eller en PR-länk bevisar en offentlig deploy.
- **Verifiera** en konkret förhandsvisningsadress genom att öppna sidan och kontrollera: HTTP-svar, fungerande CSS/JS/bilder och Hem/Tidslinjens visuella identitet. Ge inte användaren en gissad Pages-länk.
- Om Cloudflare-preview inte är tillgänglig: dokumentera driftblockeraren och ordna nödvändig behörig konfiguration innan fler designändringar kan godkännas visuellt.

## Genomförd teknisk kontroll

`tests/b33-preview-assets.test.cjs` kontrollerar alla relativa script-/stylesheet-länkar i `index.html` och de faktiska filerna i projektroten. Testet skyddar mot den tidigare felaktiga metoden att bara dela en lös HTML-fil. Det kontrollerar även `Start-hero.png` och befintliga CSS-filer för Hem och Tidslinje.

**Begränsning:** testet gör ingen nätverkskontroll av Cloudflare och ersätter inte en fungerande publik preview eller manuell visuell granskning.

**Illustrativ etappöversikt:** B2.3 avslutad → B3.1 avslutad → B3.2 avslutad → **B3.3 design bevarad; förhandsvisningens driftsättning återstår** → B3.4 väntar. C7 körs separat.
