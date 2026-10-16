# Tidens väv – fristående prototyper

Detta är en separat och ännu inte godkänd design- och kategoristudie i PR #70. Huvudappen i `main` är orörd.

## Testa i riktig webbläsare

Cloudflare Pages är enligt projektets README kopplad till `main` och kan skapa förhandsvisningar för andra grenar. Öppna **Cloudflare Dashboard → Workers & Pages → tidens-vav → Deployments** och välj den senaste *Preview*-deploymenten för grenen `taxonomy-prototype-20261016`. Lägg till `/prototypes/timeline-v1.html` efter preview-adressens domän för att visa den fristående tidslinjeprototypen. För kategoritestet använd `/prototypes/taxonomy-v1.html`.

Om ingen Preview-deployment finns är sidan ännu inte publicerad i en testmiljö. Gissa inte en URL; kontrollera då bygg- och deployinställningarna för Cloudflare Pages.

## Granskning

1. Byt mellan de fyra huvudområdena. D (filosofi) har ännu inga granskade poster.
2. Kontrollera sökning och filter på forskningsposter respektive äldre arkivposter.
3. Testa enstaka tidslinjemarkörer och deras koppling till postkorten.
4. Testa på mobil och dator. Markörerna är endast en förenklad demonstration; de ersätter inte Gantt-funktionen.
5. Arkivmaterialet är inte faktagranskat och varje ny huvudområdesplacering är preliminär.

Ingen av filerna ska automatiskt tas i bruk i produktionsnavigeringen innan innehållsgranskning och användargodkännande.
