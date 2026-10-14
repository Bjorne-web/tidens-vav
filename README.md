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

## C6 – grafisk framdrift i Fördjupningar (V8.36)
- Gå till **Fördjupningar** (inte ”Forskningsbiblioteket”; det var en äldre intern benämning). Under rubriken finns en synlig panel ”C6 – Så långt har den vetenskapliga granskningen kommit”.
- Fyra **separata** progressmått på totalt 193 poster: inventerade 193, C6-delgranskningsrapporter för 36, poster med enskild källprövning i V8.36-journalen 7 och fullständigt vetenskapligt slutgranskade 0.
- De åtta delgranskningsrapporterna och elva föreslagna textkorrigeringarna finns i den separata C6-arbetsgrenen `v8.33-forskningskvalitet` (PR #2). Korrigeringarna är ännu inte införda i V8.36.
- Vissa poster finns i både C6-rapporterna och källjournalen. Siffrorna får **inte summeras** eller tolkas som andel helt färdigt forskningsarbete.
- Underliggande källnära statusdata ligger i `data/c6-progress.js`. Vid varje faktisk C6-uppdatering ska man uppdatera listorna över dokumenterat berörda post-ID:n, korrigerings-ID:n, datum och historik. Ändringar kontrolleras av `node tests/smoke-c6-progress.mjs` och GitHub Actions.
- Panelen uppdateras genom en ny kodpublicering. Det finns **ingen bakgrundsprocess** som forskar kontinuerligt mellan samtalen.

## V8.37 – elva C6-textförtydliganden
- Elva redan dokumenterade förtydliganden från C6:s separata arbetsgren finns nu i `data/c6-text-clarifications.v837.js` (laddas efter genererad data, före appen).
- Gamla numeriska dateringar, evidensgrader och `reviewed`-flaggor ändras inte. Förbättrade källkort finns för samtliga elva berörda poster.
- Panelen under **Fördjupningar** visar nu införda textförtydliganden som separat mått (11 av 11). Ingen av de 193 posterna markeras fullständigt vetenskapligt slutgranskad.
- Du kan expandera listan över elva reviderade poster direkt i C6-statuspanelen; varje sådant läskort märks `Texten förtydligad` och uttryckligen `inte slutgranskad`.
- Se [C6 V8.37: källunderlag och exakta ändringar](docs/c6-implementation-v837.md).
- `node tests/smoke-v837.mjs` säkerställer att exakt elva beskrivningar ändras, att referenskort finns och att datumen är oförändrade.

## V8.38 – tydligare tidsperspektiv vid källprövning
- Fem ytterligare poster (H019, H020, H025, H034 och H056) har nu sex precist avgränsade påståendekontroller. **12 poster / 13 påståenden** i journalen totalt; **0 helgranskade**.
- I **Fördjupningar** visar källprövningskortet nu om varje nytt påstående gäller textens tillkomst, forskningsmodeller eller bevarade manuskript. 4Q201 och P52 används inte för att datera hela Henoksboken respektive Johannesevangeliets ursprung exakt.
- C6-statusens grafiska staplar räknar fortsatt poster med enskilda källkontroller och visar den uppdaterade historiken.
- Se [dokumenterad källkontroll och begränsningar](docs/c6-kallkontroll-v838.md).
- GitHub Actions kör `node tests/smoke-v838.mjs` med samtliga tidigare testfall.

## V8.38 – uppdaterad sidopanel enligt användarens skiss
- Läsarpanelens kärninnehåll visas nu i ordningen vald post/titel → källförankrad genomgång → samlad forskningsöversikt → historiska samband. Ej prioriterade äldre rutor ligger kvar längre ned.
- Ny underrubrik i V8.6-artiklar: **Betydelse för Israels religion, judendomen och kristendomen**. O049 (Puniska krigen), O043 (Perserriket) och O044 (Romarriket) har källhänvisad, försiktigt avgränsad kontext. Övriga poster märks uttryckligen ännu inte särskilt källprövade.
- Ingen automatisk slutsats om direkta religionshistoriska orsakssamband eller nya C6-godkännanden. [Detaljer och testplan](docs/lasarpanel-och-religionshistoria-v838.md).
- CI innehåller nu `node tests/smoke-reader-layout-v838.mjs`, som testar prioriterad ordning utan förlust av äldre innehåll.

## V8.39 – historisk samtidighet i Temaspår
- Vald post visas **alltid** som utgångspost på tidslinjen, även när kategorin inte är vald.
- De sex ikryssade kategorierna från användarens bild är aktiverade som standard, och samtliga 13 kategorier kan väljas till eller bort i Temaspår utan att huvudtidslinjens filter påverkas.
- Alla tillgängliga, daterade poster från valda kategorier som tidsmässigt överlappar det historiska jämförelsefönstret visas på **samma axel**. De grupperas efter kategori, även i listläge.
- Endast redaktionellt bedömda dateringar används för jämförelseposternas tidsmarkörer. Vald post som saknar bedömd datering visas ändå i en odaterad utgångsrad, aldrig på en fabricerad tidpunkt.
- O049 Puniska krigen visar fortsatt tre historiskt belagda krigsperioder under samma post-ID.
- Ingen direkt religionshistorisk påverkan påstås enbart genom samtidighet; läs de källkritiska fördjupningarna separat.
- Se [metod, kategorier och testplan](docs/temaspar-samtidighet-v839.md).
- Automatisk kontroll: `node tests/smoke-v839.mjs`, tillsammans med äldre regressionstester.

## V8.39 – enhetlig sidopanel för hela Väven
- Den sidopanel som godkänts för **Puniska krigen** används nu konsekvent för **alla 193 poster** (64 forskningsposter och 129 originalposter).
- Innehållsskillnader finns kvar: vetenskapliga källor används när de faktiskt finns; otillräckligt underlag märks öppet som inte källgranskat.
- **Gilgamesheposet – flodberättelsen (O067)** och forskningspost **H005** får samma rubrikstruktur och den samlade forskningsöversikten som övriga poster, samtidigt som gamla beskrivningar, källor och varningar bevaras.
- Den tidigare **V8.6-artikeln för Puniska krigen (O049)** behålls oförändrad; inga parallella artiklar skapas.
- Den nya Temaspår-tidslinjen med sex förvalda samtidskategorier ändras inte.
- Se [gemensam sidopanel och granskningsprinciper](docs/gemensam-sidopanel-v839.md).
- Nytt automatiskt test: `node tests/smoke-reader-universal-v839.mjs` för samtliga 193 poster och knutna underlagsstrukturer.
