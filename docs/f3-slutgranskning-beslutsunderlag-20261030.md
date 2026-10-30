# F3 – Samlad slutgranskning och beslutsunderlag

**Datum:** 30 oktober 2026  
**Ärende:** PR #378, F3 – gemensam och källspårbar forskningsmodell.  
**Status:** Förslag till avslut av F3:s **modell- och testfas**, **inte** godkänd eller aktiverad produktionsintegration. **Beställarens uttryckliga godkännande krävs.**

## 1. Vad ingår i F3 – och vad ingår inte?
F3 levererar ett **fristående read-only-kontrakt med verkligt källprövade tekniska indata och automatiska regressionstester**. Det ersätter inte appens befintliga forskningsdata, skriver inte till någon databas och ändrar inte `index.html`, `v897-research-read-model.js`, huvudnavigering eller C7-forskningstexter. Allt ligger under `tests/`, `docs/` och en separat workflow.

**F3 levererar inte en ny aktiv forskningsläsare eller en fullständigt integrerad produktionsadapter.** Detta blir ett avgränsat arbete efter godkänd F3, inom F4/F5 och deras egna granskningstester.

## 2. Avstämning mot F1/F2-målen
| Krav | Resultat | Verifiering / reservation |
|---|---|---|
| Gemensamma `post`, `topic`, `source` | **Tillgängliga i isolerade modeller** | Gemensam konsumentform `id/kind/title/reviewStatus/temporal/relations/references/data` i `f3-unified-research-contract.cjs`; kanonisk produktionsadapter ej införlivad |
| Original-ID och dataintegritet | **Verifierat för pilotposter** | H045, B001, D001, O067, O030, O073, AP001 respektive temat `good`; bevarad input testas |
| Fältvis källursprung och konflikt | **Isolerad modell fungerar** | `resolveField` håller alternativ synliga, ingen tyst konfliktlösning; verkliga O073/O030-varianter identifieras |
| Vetenskaplig innebörd av konflikt | **Kontrollerad gräns** | Olika teckensträngar bevisar inte saklig motsägelse; redaktionella varianter / semantisk prövning åtskilda |
| Datering och källstatus | **Typat testkontrakt** | event, historical-period, composition, textual-chronology, narrative, material-witness; ogranskade original och omappade värden ska bevaras |
| C7:s omfattande data | **Systematiskt inventerad** | 37 filer för religionshistorisk betydelse → 202 unika poster, 0 överskrivningar. 78 dateringsfiler → 82 unika ID, 78 tidsfaser. Dessa är antal i testad laddningskedja, inte total appstatistik |
| Filosofisk forskningsfråga utan datum | **Testad** | `topic:good` – ”Är Gud god?” med originalspår och relationer; `temporal:null` |
| Källreferens med preciserad användning | **Testad** | Amarnabrevsexemplet A01, källa i Metropolitans museis register; `supports`-text och källfil bevaras. Länken betraktas inte som bevis i sig |
| Full produktionsadapter + UI | **Inte gjord, avsiktligt** | Ingen F4/F5-utveckling eller merge är godkänd |
| Samtliga F3-CI-tester | **Måste vara gröna på slutlig PR-head** | Bekräfta 11 egna teststeg och övriga automatiska kontroller före formellt F3-avslut |

## 3. Faktiska tekniska brister i nuvarande produktionsmodell
1. **För tidig proveniens-snapshot:** I `v897-research-read-model.js` skapas `postProvenance` innan `pick()` fyller på fältkällorna. Den exporterade proveniensen saknar därmed valda ursprung för vanliga textfält, trots att kodens interna `pick` antecknar dem.
2. **Separat C7-datering visas inte i generell tidsmodell:** bland annat O067:s materiella textvittne har riktig C7-fil men finns inte i `v897`s `temporal.start/end`.
3. **Alternativa textversioner visas inte:** O073:s längre och kortare Sargon-sammanfattning och O030:s två zoroastrism-sammanfattningar kräver explicit redaktionell granskning, inte en generell filordningsregel.
4. **Topics finns delvis i renderingskod:** bland annat frågan ”Är Gud god?” i `v889-research-tracks.js`; framtida flytt till datalager kräver migrationskontroll och bakåtkompatibilitet.
5. **Källobjektets identitet är preliminär:** `source:<https-url>` är en deterministisk *referensnyckel*, inte deduplicering av samma publikation över olika URL:er, upplagor eller digitala manifestationer. Föremålsproveniens och forskningsbedömning får inte automatiskt uppstå ur länken.

**Åtgärdsgräns:** F3:s tester bevisar inte att ovanstående brister är åtgärdade i produktionen. En produktionsfix kräver separat implementation, migreringsregler, reella regressionstester och acceptans.

## 4. Föreslaget beslut och avgränsad överlämning
**Rekommendation:** Acceptera F3 som **modell-, inventerings- och testfas** när den **senaste** CI-körningen är grön. Håll PR #378 dokumenterad och oförändrad tills beställaren uttryckligen godkänt dess avgränsning. En efterföljande merge av denna dokumentations- och test-PR kräver ett separat kontrollerat beslut och får inte förväxlas med införande av ny appfunktion.

**Obligatoriska villkor för F4/F5:**
- Anslut modellen utan en parallell sanningsdatabas; korrigera `v897`s fältspecifika proveniens med test på verkliga poster.
- Tillför typade C7-tidsfaser och källa/bedömningsstatus utan att skriva över äldre ursprungsdata; visa om underlaget är ogranskat.
- Utforma användarvisning av redaktionella varianter respektive sakliga konflikter med avgränsade, dokumenterade beslut.
- Bibehåll befintliga H/B/D/AP/O-ID:n, specialläsare, mobilläge, djup-länkar, `Tillbaka`-stacks, filter, karttid, jämförval och F2:s grafiska design. Verifiera testfall per typ.
- Prioritera säker rendering, arkivering och framåtriktad migration. Inga aktiva `topic`-URL:er antas existera förrän F5 har testat dem.

## 5. Beslutsalternativ
**A. Godkänn F3:s isolerade modell- och testresultat** som underlag för F4 (utan att godkänna produktionskod). PR #378 kan därefter stängas kontrollerat genom godkänd merge om CI och aktuell `main` är kontrollerade.  
**B. Begär komplettering av F3** och behåll PR öppen, utan att gå vidare till F4.

**Slutligt användargodkännande ännu inte givet. Inga produktionsändringar.**
