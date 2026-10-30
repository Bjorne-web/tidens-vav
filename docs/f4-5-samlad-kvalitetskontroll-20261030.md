# F4.5 – Samlad kvalitetskontroll och underlag för beslut

**Datum:** 30 oktober 2026  
**PR:** #379 (utkast, separat testgren)  
**Syfte:** Saklig kontroll mot den godkända F2-specifikationen – inte bara att skärmbilder eller GitHub-jobb blir gröna. Inga ändringar i produktionen.

## Kontrollerad leverans
F4-prototypen har en generell renderer för F3:s `post`, `topic`, `source` och prövas på sex verkliga exempel: H045, B001, D001, O067, `topic:good` och Amarnabrevets källreferens. Exemplen byggs på verkliga register. De historiska/bibliska fallen läser nu **samtliga C7-filer för religionshistorisk betydelse och datering i den laddningsordning som anges i `index.html`**, inte bara en tidig C7-version.

Källan för **B001:s religionshistoriska betydelse** härleds till den fil som faktiskt införde eller senast uppdaterade värdet. Inledningar och utvalda fält visar nu också ursprung. Renderer-testet prövar dessutom en extra `topic` som inte är något av de sex demonstrations-ID:na, för att motverka hårdkodad rendering.

## F2-kriterier – bedömning

| Kriterium | F4-teststatus | Begränsning |
|---|---|---|
| Gemensam läsfamilj för post, topic och source | **Uppfyllt i isolerad renderer** | Endast sex källbaserade pilotobjekt + generiskt tematisk testobjekt |
| B001/D001: tillkomst vs berättad tid | **Testat** | År och berättad tid kommer från befintliga preliminära register; ingen ny vetenskaplig datering |
| O067: ursprungsuppgift vs daterat textvittne | **Testat** | Ursprungsuppgiftens tidskategori är oklar, ska förbli markerad |
| H045: externa belägg, bakgrund och reservationspunkter | **Testat** | Registrerat källstöd, jämförelse med Kungaböckerna, datumgrund och begränsning hålls isär |
| Källors stöd och räckvidd | **Förbättrat och regressionstestat** | `supports`, `scope`, registertyp och kontrollmetadata visas där data faktiskt innehåller dem; länk innebär inte oberoende verifiering |
| Fältvis ursprung och C7-betydelse | **Testat i prototypen** | Produktionsläsaren `v897` har fortfarande F3:s konstaterade proveniensbrist |
| Texttradition och apokryfstatus | **Förbättrat och testat** | Traditionell författarangivelse för B001/D001 skiljs från styrkt författarskap; D001:s kanonstatus och AP005-hänvisning bevaras |
| Filosofisk forskningsfråga | **Testat utan påhittad datering/status** | `topic:good` har inget uttryckligt `reviewStatus` i källdata; tidigare testvärdet `draft` har nu tagits bort |
| Originalbild, färger och SVG-ikoner | **Testat** | PNG och SVG kommer från appens egna original; fristående testkatalog, inte en integrerad ny huvudflik |
| Tillgänglig mobil- och datorskiss | **Automatiskt testad** | 390×844 och 1440×1000 i Chromium, tangentbords- och overflowkontroller; inte fullständig skärmläsar- eller användartestning |
| Tillbaka till exakt utgångsläge | **Ej ingående** | F4:s `Tillbaka till exemplen` gäller bara testkatalog. F5 måste återställa utgångsvy, scroll, filter, karta/tid, jämförurval och historik |
| Snabbfönster → full vy, dela, jämför, djuplänkar | **Ej integrerat** | F5, med stöd för befintliga `?tv_id=...`-länkar |
| Fullständig käll- och postkatalog i liveapp | **Ej verifierad** | Testversionen visar representativa exempel, inte alla poster eller specialläsare. Inget sådant påstående får göras. |

## Sakliga rättelser under kvalitetskontrollen
1. Källuppgifter som "kontrollerad 2026-10-12" är **metadata i originalregistret**, inte bevis för att den aktuella F4-vyn själv verifierat varje slutsats.
2. Bibelreferensen för H045 är **jämförelsetext**, inte ett självständigt utombibliskt belägg för Qarqar.
3. O067:s källa har ett uttryckligt `scope` som begränsar vilka slutsatser textvittnet styrker; detta ska vara synligt.
4. D001:s hänvisning till AP005 är en **tematisk referens**, inte automatiskt historisk påverkan.
5. B001:s Mosesattribution är en **traditionsuppgift**, inte ett faktapåstående om säker författare.
6. `topic:good` hade tilldelats `reviewStatus:'draft'` av prototypens fixture, trots att källposten saknar sådan status. Det uppfunna testvärdet är borttaget.
7. F4-prototypen laddar numera C7:s verkliga filkedja; specificerad proveniens bör inte ersättas med en ospecifik etikett som "C7-register".

## Rekommenderad beslutspunkt
**F4 kan föreslås för acceptans som isolerad, utformad och automatiskt verifierad läskomponent** först när den senaste separata F4-workflowen och övrig CI är grön, och användaren har fått tillgång till en ny fristående granskningsfil. Detta godkännande är **inte** godkännande av produktionsintegration, allkatalogtäckning eller vetenskaplig omprövning.

**F5 överlämningskrav:**
- Montera den återanvändbara läskomponenten i befintlig app, under gemensamt godkänd header, inte en sjunde flik.
- Rätta `v897`s fältproveniens, verifiera samtliga aktiva C7-lager och bibehåll historiska originalvärden.
- Bibehåll existerande appvyer, specialläsare, responsivitet, karta/tidskoppling, filter, scroll, jämförläge, djuplänkar och back stack; koppla mot verklig katalog och läsarens faktiska anrop.
- Kör riktiga regressioner för alla typer, större posturval, källbrist och motstridiga fält; visa vetenskaplig status utan att hitta på.

## Ändringsskydd
PR #379 förblir **draft**, och endast `tests/f4-*`, `prototypes/f4/`, `docs/f4-*` och fristående workflow får ändras i detta steg. **Ingen merge, ingen Cloudflare-publicering, inga produktionsändringar, ingen F5-kod** före beställarens uttryckliga godkännande.
