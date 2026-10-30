# F3 – Överlappningar och fältföreträden: kontroll av aktuella källor

**Datum:** 2026-10-29 · **Status:** verifierade kod-/dataobservationer, inte vetenskapliga slutbeslut.

| Fall | Belagt ursprung | Klassificering | Beslut för F3 |
|---|---|---|---|
| H045 Ahab/Qarqar | `data/data.generated.js`: historisk händelse 853 f.Kr., dateringskommentar, `reviewed:true`, British Museum-länk | Kompletterande metadata i grundpost; `reviewed:true` innebär inte att alla andra postfält är slutgranskade | Separera kronologi, evidensstatus, källa och fältgranskning |
| B001 Första Moseboken | `data/bible-books-v857.js`: tillkomst/redaktion -650 till -400, preliminär status; `data/c7-religionshistorisk-betydelse.v890.js`: religionshistorisk betydelsetext | Kompletterande **olika fält**, inte belagd motsägelse | Visa kompositionstid och C7-betydelse med egna ursprung; tilldela inte C7-texten företräde över all annan text |
| D001 Tobit | `data/apocrypha-books-v891.js`: tillkomst -250 till -150, berättad assyrisk tid, preliminär status, källor | **Olika tidsbegrepp**, inte konflikt | Håll `composition` och `narrative` separata och behåll specialpost-ID |
| AP001 kontra D001 | `data/apokryfer-granskning3.v888.js` kontra `data/apocrypha-books-v891.js` | **Olika objekttyper**, inte ID-konflikt | Behåll tematiska apokryfposter respektive individuella apokryfböcker |
| O067 Gilgamesheposet | `data/data.generated.js`: äldre ogranskad grunddatering -2100 till -1600; `data/c7-dating-o067-gilgamesh.js`: bevittnat material -700 till -601 med `timeType:material-witness` | **Inte belagd värdekonflikt för samma tidsbegrepp**: dateringen av tavla XI avser materiellt textvittne. Grundpostens tidsart är fortsatt otillräckligt specificerad. | Bevara ursprungsuppgiften som ogranskad och visa C7:s dokumenterade tid som **textvittnets tid**, utan att tyst ersätta originalvärdet |

## Viktig källmodellgräns
Den aktuella `v897-research-read-model.js` **försöker registrera fältvis proveniens men exporterar en tom snapshot**, eftersom kopian av `provenance` görs innan fälten väljs. Den väljer `summary/context/impact/limits` genom första icke-tomma textvärdet enligt en fast prioriterad lagerordning. Den redovisar inte konkurrerande textalternativ och innehåller ingen inbyggd källkonfliktlista. Den returnerar bara grundpostens `temporal.start/end`; C7:s separata `material-witness`-fas för O067 ingår alltså **inte** i den generella tidsstrukturen. C7:s särskilda `religion`-fält finns i läsmodellen, men dess proveniens registreras inte. Detta gäller även vanliga valda textfält i den exporterade modellen på grund av snapshot-ordningen.

Detta är en **bekräftad teknisk lucka**, inte bevis för att forskningstext är fel eller att källor faktiskt motsäger varandra.

## F3 beslutsrekommendation
1. Kör fortsatt fältkonfliktsanalys på verkliga överlappande forskningslager. Markera endast konflikt när två kandidater avser **samma sak**, samma post, samma fält och jämförbar tidstyp.
2. Inför särskild metadata för C7-dateringsfas och religionshistorisk betydelse, med fil-/fältproveniens. Läsarens befintliga visning ändras inte under F3.
3. När konflikt uppstår lämnas den olöst om inget **post- och fältspecifikt dokumenterat beslut** finns. Den isolerade modellen testar detta, men inget redaktionellt företräde har beslutats.
4. Källornas URL:er och kvalitetsbedömningar hålls isär. En fungerande länk är inte evidensklassning.

## Gräns för slutsatsen
Statiska utdrag och de tidigare isolerade runtime-testerna verifierar utvalda dataposter och modellbeteenden. De utgör inte en fullständig automatisk jämförelse av *samtliga* alternativa lager för dessa poster. Den fulla konfliktauditen kvarstår före F3:s slutgodkännande.

**Inga ändringar i produktionskod, innehåll eller huvudnavigation.** PR #378 förblir öppen.
