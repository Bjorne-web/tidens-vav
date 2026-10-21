# B3.3 – Fullständig testartefakt

Workflowen `.github/workflows/b33-site-bundle.yml` paketerar webbappens filer tillsammans, inte en lös HTML-kopia. Den använder den befintliga visuella designen för Hem och Tidslinje, inklusive `Start-hero.png` och befintliga CSS-filer.

För att kontrollera paketet: öppna PR:ens Checks-flik, välj `B3.3 site bundle` och ladda ned artefakten `tidens-vav-site-bundle` från körningens artefakter. Filernas relativa sökvägar ska behållas när paketet packas upp.

**Avgränsning:** Det här är en GitHub Actions-artefakt, inte en publicerad Cloudflare Pages Preview. Någon verifierad PR-specifik Cloudflare-adress finns ännu inte. En fungerande offentlig förhandsvisning kräver att en faktisk Pages-deployment kontrolleras. Manuell granskning av designen återstår.

Inga källposter, C7-data, startsidans design eller tidslinjens layout ändras.

**Illustrativ etappstatus:** B2.3 klar → B3.1 klar → B3.2 klar → **B3.3 testdistribution pågår** → B3.4 återstår.
