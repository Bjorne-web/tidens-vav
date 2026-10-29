# F1 – Inventering och målarkitektur för den fullständiga forskningsvyn

**Datum:** 2026-10-29  
**Status:** F1 startad; beslutsunderlag för beställarens godkännande. **Ingen implementation godkänd.**  
**Överordnat beslut:** [Styrdokument v1.1](tidens-vav-design-och-arkitektur.md), godkänt 2026-10-19. B3.4:s sex huvudvyer är godkända och skyddas.

## 1. Inventerade underlag och verifieringsnivå
- PR #124, #125, #126: tre statiska inventeringar av äldre flikar, navigering, postöppning, djuplänkar, forskningshubb och specialläsare. De är **öppna**, 453 commits efter main vid inventeringen; materialet är underlag, inte merge-underlag.
- PR #127: målarkitektur v1 (öppen, 452 commits efter main). Återanvänd dess objektdefinitioner, dataidé och testmatris, inte dess gamla gren.
- PR #149: snabbfönstrets textfällning **redan sammanfogad**; ska inte byggas om utan särskilt skäl.
- PR #150: query-aktiverad läspilot för H-/B-/D-poster (**öppen**, 433 commits efter main). Ingen kod därifrån är integrerad via denna F1.
- **Aktuell main inspekterad:** `v839-reader-unified.js`, `v893-research-hub.js`, `v909-view-context-c1.js`, `v912-cross-view-themes-compare.js` samt `index.html`. Befintlig läsare, temahubb och vyöverskridande kontext kvarstår. Piloten `v904-full-research-pilot.js` är inte refererad av main.
- Granskningen i F1 är främst **kod-/dokumentinventering**, inte ett fullständigt nytt webbläsartest.

## 2. Nulägeskarta
| Delsystem | Befintlig funktion | F1-ställningstagande |
|---|---|---|
| `#detail` med `v839-reader-unified` | Sammanställer historiska poster ur flera källor och bevarar äldre DOM | Bas för snabbfönster samt mappning till full vy; inte radera |
| Befintlig snabböverblick/PR #149 | Kort och längre sammanfattningar | Behåll; undvik dubbla läsare |
| `#researchView` / `v893-research-hub` | Tematiska frågor såsom Guds godhet, fri vilja och liv efter döden | Tema-ingång, **inte** en historisk post med påhittad tidsmarkör |
| Specialvyer: bibelbok, apokryf, C6/C7, `v894` Gantt, `v890` forskningsbrygga | Särskilda innehålls- och visualiseringsvägar | Bevara tills funktionell motsvarighet och postkoppling verifierats |
| `v909` / `v912` med äldre `v829NavStack` | Vald post och delvis återgång/kontext | Återanvänd befintligt sessionstillstånd; definiera kompatibelt tillägg |
| `v904` pilot i PR #150 | Enkel fulläsning via `?fullreader=ID` | Referens för F2/F4, **inte** färdig produktionslösning |
| `v835-deeplinks` och `?tv_id=...&tv_view=...` | Djuplänkar samt specialfall för apokryfer | Bevara kompatibilitet; testa routning för varje posttyp |
| Fyra huvudområden | Bibeln, Religioner, Världshistoria och framtida Idéer & kunskap | Ingen taxonomimigrering i F1 |

## 3. Rekommenderad målarkitektur (beslutskandidat)
**Tre kunskapsobjekt:** (1) historisk `post` inklusive bibelbok/apokryf med särskild presentation, (2) `topic` / öppen forskningsfråga utan krav på datering, (3) `source` / källa eller fynd med proveniens. De länkas genom **typade, motiverade samband**. Fält som saknas får inte uppfinnas.

**Två läsnivåer, en datagrund:** Snabbfönster `#detail` visar ID, titel, kort sammanfattning, datumtyp och säkerhet, relevans och länk till fördjupning. Full forskningsvy visar översikt, tid/historisk och geografisk kontext, forskningsläge/tolkningsalternativ, källor med evidens, religionshistorisk betydelse när relevant, relaterade poster och begrepp. `topic` använder fråga → argument/traditioner → belägg och begränsningar → relaterade poster. `source` visar proveniens och tolkning.

**Läsmodell:** En readonly-adapter över existerande källor; stabilt kanoniskt ID, ingen ny parallell forskningsdatabas, explicit proveniens per fält. Lås konfliktordning innan implementering (t.ex. då originalpost och senare C7 beskriver samma fält). `reviewStatus` och datumstatus får inte överdrivas eller härledas ur bara filordning.

**Navigation:** Full forskningsvy som fördjupningsläge, inte sjunde huvudflik. Bevara post-ID, utgångsvy, filter, tidsfönster, jämförelseurval, scroll, tillbakaväg och gamla URL:er. Ta hänsyn till mobilens särskilda läsflöden. Behåll gamla funktioner tills samma innehåll testats i den nya vyn.

**Utseende:** De sex godkända huvudvyerna och exakta fyra SVG/färger är oförändrad referens. F2 tar fram responsiva skisser innan kod. Bilder och vetenskapliga säkerhetsgrader ska märkas korrekt.

## 4. Riskregister och arbetsordning
| Risk | Skydd |
|---|---|
| Dubbla/förlorade forskningsfält | Fältvis proveniens och test mot original, C6/C7, källor och specialposter |
| Löst tema presenteras som daterad händelse | Separat `topic`-kontrakt utan obligatoriskt datum |
| Gammal läsare eller mobilflöde bryts | Bevara parallellt tills acceptanstest F4–F6 |
| Djuplänk/Back/urval tappar post | Kontrakttest för post-ID, origin, filter, jämförelse och browser Back |
| C7:s vetenskapliga innehåll skrivs över | Endast read-only-adapter och avgränsade PR:er |
| Äldre grenar är hundratals commits bakom | Inga direkta merge/cherry-pick; ny gren från aktuell main per etapp |

## 5. Piloter och godkännandematris
- Historisk post **H045**, inklusive tidskontext och samband.
- **B001** som bibelbok: textens tillkomst kontra berättad tid.
- Apokryfpost **D001**, men verifiera dess nuvarande datatyp och ID före implementation.
- Temat **Är Gud god?**: historiska och filosofiska resonemang utan fiktiv datering.
- En källfördjupad **C7-post** vald vid F3/F4; kontroll av proveniens, religionshistorisk betydelse, bilder och forskningsstatus.

För varje pilot: snabbfönster → full vy → tillbaka; källor och osäkerheter; direktlänk; dator/mobil/tangentbord; bevarad tidslinje, karta, temaspår och jämförelseurval.

## 6. Beslutspunkter innan F2 / implementation
1. **Godkänn tre objekttyper** (`post/topic/source`) och två läsnivåer på *samma* kanoniska kunskapsbas.
2. **Godkänn full vy som routat fördjupningsläge med delbar URL**; vid F2 visualiseras exakt desktop/mobillayout och tillbaka-flöde.
3. **Godkänn att datakonfliktregler ska dokumenteras och granskas fältvis i F3**, innan adapterkod skriver något; inga okända eller osäkra fält fylls automatiskt.
4. **Bekräfta bevarandekrav:** `#detail`, forskningshubben, C6/C7, apokryfer och tidigare djuplänkar avvecklas inte förrän en fullgod testad ersättning finns.
5. **Bekräfta pilotfallen** ovan och att F2 endast är design/prototyp under separat godkännande.

## 7. F1 godkännandekriterium
Inventering och föreslagen arkitektur är dokumenterade. **F1 är inte godkänd enbart genom att denna PR skapas.** Beställaren granskar punkterna i avsnitt 6. Endast efter uttryckligt godkännande påbörjas F2; ingen implementation, datamigrering, global navigation eller produktionsvisning ändras av F1.
