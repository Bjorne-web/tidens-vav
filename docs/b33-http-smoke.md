# B3.3 – Webbplatsen testas via HTTP, inte som lös HTML

PR #321 skapade en verifierad komplett webbplatsartefakt i GitHub Actions. Nästa kontroll startar en lokal HTTP-server och hämtar `index.html`, huvudsakliga CSS-filer, `Start-hero.png` och navigationsskriptet. Detta motverkar tidigare fel där en ensam HTML-fil visades utan design.

Denna kontroll verifierar **HTTP-svar, innehållstyp och filinnehåll**, men inte grafisk rendering, verkliga användarklick eller en publicerad Cloudflare Pages Preview. En offentlig förhandsvisningsadress ska endast delas när en konkret deployment verifierats.

Ingen ändring av Hem, Tidslinje, originaldata eller C7 görs.

**Illustrativ status:** B2.3 färdig → B3.1 färdig → B3.2 färdig → **B3.3 testkedja pågår** → B3.4 återstår.
