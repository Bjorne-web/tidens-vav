# F5.14 – samlad integrationsgranskning (utan publicering)

**Datum:** 2026-11-03. **Bas:** F5.13, PR #385; F5.12 #384; F5.11 #383; F5.10 #382; F5.9 #381; F5.1–F5.8 #380; F4 #379.

## Slutsats
F5.11, F5.12 och F5.13 har gröna CI-körningar. F5.13 omfattar **33/33** separata C7-odateringsförklaringar och automatiska Chromium-test på **1450×1000** och **390×844** i en **fristående granskningskopia**. F5.10 har teknisk täckning för 270 H/O/B/D-poster och ett 47-posters webbläsarurval i en verklig appkopia. Detta är inte en komplett releaseacceptans.

### Kvarstående produktionsgrindar (F5.7 G01–G12)
| Grind | Status i F5.14 | Villkor före release |
|---|---|---|
| G01 Full artikel i befintlig app | DELVIS | Inkoppling via godkänd befintlig navigation, ej ny huvudflik |
| G02 Kontext, karta och scroll tillbaka | DELVIS | Samtidig navigation, snabba kartanimationer och återhämtningsflöden i samlad kandidat |
| G03 Snabb- och bokläsare | DELVIS | Full specialfallsmatris, utan regressionsfel |
| G04 Aktiv läsarintegration | BLOCKERAD | Opt-in fullständig och manuellt godkänd staging; ingen main-aktivering |
| G05 Källursprung | DELVIS | v897-kandidaten visar fältproveniens i *verklig* integrationsväg |
| G06 Leaflet-kamera/race | BLOCKERAD | Snabba animationer och avbruten navigation verifieras |
| G07 Konflikter/återhämtning | BLOCKERAD | Dubbel Back, popstate, ny vy, borttaget objekt, ändrade filter |
| G08 Post/topic/source-katalog | DELVIS | AP/H-special, forskningsspår, kategori- och källobjekt samt URL-kontrakt |
| G09 Historik/djuplänkar | BLOCKERAD | v835-regression, Back/Forward och explicit topic/source-beslut |
| G10 Tillgänglighet och mobil | BLOCKERAD | Visuell manuell granskning, tangentbord, touch, skärmläsare, OS-back |
| G11 Vetenskaplig täckning | DELVIS | C7-faser och undated i riktig läsare; länktillgänglighet och källbedömning |
| G12 Staging/acceptans | BLOCKERAD | Samlad opublicerad stagingkandidat, beställarens godkännande |

**DELvis** betyder inte godkänd releasegrind; alla tolv behöver slutligt acceptansbeslut.

## Bekräftat genomfört
- F5.11 CI #41116673584: lyckad inventering och C7-lager, 215 artikelkandidater; 33 uteblivna odateringsmotiveringar i den ursprungliga F4-renderern identifierade.
- F5.12 CI #41117919366: separat adapter renderar 33/33 motiveringar.
- F5.13 CI #41119015171: automatisk öppna–tillbaka-kontroll i fristående Chrome desktop och mobil; paket genererat.
- Registrerad källänk i data är **inte** detsamma som fungerande URL eller vetenskapligt verifierat belägg.

## F5.14 acceptans för detta dokumentsteg
1. Få en tydlig kvarvarande riskmatris som inte felaktigt godkänner F5 för release.
2. Verifiera i CI att kända releaseblockerare förblir öppna och att ingen produktionsfil oavsiktligt ingår i F5.14.
3. Nästa *tekniska* steg föreslås vara en separat samlad stagingkandidat med riktig appkoppling som först låser G04–G09, sedan mobil/tillgänglighet och ämnes-/källkatalog. Användaren ska kunna granska en konkret URL och ge separat beslut innan main/Cloudflare.

**Inget i denna F5.14-gren ändrar app, index, v835, v897, v910 eller Cloudflare. Ingen merge, deploy eller F6-start är godkänd.**
