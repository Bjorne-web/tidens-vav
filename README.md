# Tidens väv – utveckling och publicering

Stabil webbapp: https://tidens-vav.pages.dev

Repositoryt innehåller de levererade **webbfilerna**. Den ursprungliga forskningsdatan i JSON och byggskriptet `build.py` hör till det fullständiga projektpaketet och ska bevaras separat.

## Gratis publicering
- Cloudflare Pages Free publicerar från `main`; andra grenar kan skapa Preview.
- Inget extra domännamn, ingen server, inga betalda API:er krävs.
- Skapa ändringar i separat gren. Godkänn testmiljö innan publicering på `main`.

## V8.33 – Aktuell undersökning i Temaspår
- Alla forsknings- och originalposter är valbara som egen undersökning.
- De sex färdiga temaspåren finns kvar.
- En vald post visas direkt i sitt sammanhang; datumlikhet tolkas inte som orsakssamband.
- Vid avsaknad av hållbar datering visas förklaring, ingen fabricerad placering.

## V8.34 – granskning med spårbar avgränsning
- `data/review-ledger.js`: källprövningsjournal för **enskilda påståenden**. Den är separat från det äldre fältet `reviewed` i tidiga data.
- `v834-review.js` och `v834-review.css`: visar status i läsfönstret samt översikt i forskningsbiblioteket.
- För närvarande är **två avgränsade påståenden** källkontrollerade: Tel Dan-stelen (H041) och Kyroscylindern (H054).
- **Noll hela forskningsposter har deklarerats slutgranskade** i V8.34-journalen. Lägg aldrig till en sådan deklaration endast för att en post har en länk eller äldre evidensgrad.
- Journalen beskriver vilken specifik utsaga som stöds, vilken källa som kontrollerats och vad som *inte* följer av materialet. Behåll den här transparensen vid varje ny granskning.
- Museikatalog och utställningstext är användbara källor till fynd, men full sakkunniggranskning av bredare historiska slutsatser fordrar fler oberoende vetenskapliga arbeten.

## Test
Kör `node tests/smoke-v834.mjs` på en utcheckad kopia av webbprojektet. Det verifierar filreferenser, syntaktisk JS, journalfält och att granskningsposternas ID finns i databasen.
Därutöver krävs **riktiga webbläsartester** på dator och mobil före merge, särskilt:
1. Temaspår: O030 (Zoroastrism), H017 (Babylon), byte till färdigt tema.
2. Forskningsbibliotek och läsfönster: kontrollera källprövningsöversikten.
3. H041 och H054: öppna redovisade källor och läs begränsningarna.
4. En annan post: märkning ”Ej vetenskapligt slutgranskad”.
5. Testa navigering, läsfönster, mobilmeny, karta och återgång.

## Långsiktig integrering
The World Behind the Word är den långsiktiga huvudappen. Tidens väv förblir ett fristående, kostnadsfritt historiskt verktyg fram till en beslutad integration med gemensamma stabila post-ID och forskningsunderlag.

## V8.35 – permanenta postlänkar som integrationsgrund
- En post kan öppnas direkt via `?tv_id=H054&tv_view=explore` utan att användaren behöver hitta den manuellt.
- Tillåtna vyer är `explore`, `timeline` och `research`; felaktiga ID:n ger en tydlig förklaring.
- Läskortet och Aktuell undersökning får en knapp för att kopiera direktlänken.
- Stabil postidentifiering, ingen delad backend och inget betaltillägg.
- Se [integrationskontraktet](docs/integration-contract-v1.md) för begränsningar och framtida koppling till The World Behind the Word.
- Testa med `node tests/smoke-v835.mjs` plus befintligt `node tests/smoke-v834.mjs`.

## V8.36 – sökbar granskningsöversikt
- En ny granskningsöversikt i Forskningsbiblioteket visar alla poster, filter på källprövning och direkt öppning av posten.
- Sju enskilda påståenden källprövade i sju poster (H001, H004, H005, H017, H041, H042 och H054). Fem tillkom i V8.36.
- Källtyp och påståendetyp redovisas utan att posten märks som slutgranskad. Noll fullständiga slutgranskningar är registrerade.
- Läs forskningsprotokollet i docs/kallprovningsprotokoll-v836.md.
- Testkörning: node tests/smoke-v836.mjs plus de tidigare testerna.
