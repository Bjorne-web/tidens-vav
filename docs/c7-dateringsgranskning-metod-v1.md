# C7 – obligatorisk parallell dateringsgranskning (förslag v1)

## Bakgrund
I Temaspår visas många originalposter som odaterade. Spärren är avsiktlig: importerade årtal kan beskriva en redaktionsmiljö i stället för berättad händelsetid, eller vara kopplade till fel post-ID. Att ta bort spärren är inte acceptabelt.

## Beslutspunkt
Varje pågående och kommande C7-batch ska innehålla en separat **dateringsbedömning** per post, och samtidigt göra en eftersyn av tidigare C7-poster som saknar separat prövad tid. Ändring av kronologi görs först efter källkontroll, automatisk regression och användarens testgodkännande.

### Obligatorium per kanoniskt ID
1. Säkerställ ämnesidentitet och att ingen annan kronologi har samma ID för ett annat ämne.
2. Bestäm **vad** som kan dateras: (a) historisk händelse/förlopp, (b) textens olika tillkomst-/redaktionsskeden, (c) berättad tid, (d) daterad materiell källa/handskrift. Dessa får aldrig vara samma tidsfält utan typmarkering.
3. Ange start, slut, kalenderkonvention (f.Kr./e.Kr.), precisionsnivå, kort motivering, minst två relevanta självständiga källor där möjligt, och vetenskaplig oenighet/alternativa rekonstruktioner.
4. Bedöm evidens: **A väldokumenterat**, **B brett forskningsstöd men osäker marginal**, **C omstritt/ungefärligt**, **D otillräckligt**. A/B är aldrig synonymt med fullständig C6-slutgranskning. Förekommer oenighet om enskilda år bör redovisas intervall/alternativ.
5. C/D får inte godtyckligt omvandlas till ett skenbart säkert årtal. Där C finns starkt belagda avgränsningspunkter för en viss textfas kan **endast den fasen** visas, med rätt typetikett och osäkerhetsnot.
6. Visningsregel i Temaspår: A/B med separat belagd, explicit angiven tidstyp kan visas som daterad fas; osäker/flerdelad litterär tillkomst som flera märkta faser eller som redovisat möjligt tidsintervall utan falsk precision. D visas fortsatt utan tidsmarkör och med konkret orsak i stället för generell standardtext.
7. Om en daterad fas är **textens tillkomst**, märk tydligt: 'TEXTENS TILLKOMST – inte händelsens tid'. En sådan fas får aldrig visas som om berättelsen utspelade sig då.
8. Bevara originalregistrets importerade år och proveniens som arkivuppgifter. Ingen automatisk omskrivning av original eller förändrad C6-status.
9. Utöka regressionstest: korrekt O-ID, tidstyp, typetikett, källor, A/B-gräns och ingen sammanblandning mellan historisk händelse och textens redaktion. C7-batch kan bli innehållsmässigt klar även om datering är D; dess dateringsstatus måste då vara uttrycklig.

## Pilot – O119–O122
- **O119 Jobs bok:** litterär ram och poetiska delar kan ha olika ålder; pröva om något brett litterärt intervall är försvarbart. Datera inte Jobs berättade liv som historisk biografi.
- **O120 Psaltaren:** 150 psalmer med lång och flerstegad tillkomst, senare samlingshistoria och handskriftliga hållpunkter. Lägg möjliga *separata* dateringar för relevanta tillkomst-/sammanställningsfaser och en självständig handskriftsfas där källstöd finns. Ingen enda 'Psaltaren skrevs år X'-markör.
- **O121 Ordspråksboken:** särskilj äldre vishetssamlingar, senare redaktion, egyptiska litterära paralleller och uppgifter om handskrifter.
- **O122 Jona:** skilj bibliskt omnämnd profet (2 Kung 14) från Jonabokens litterära tillkomst. Ingen historiskt daterad resa i en fisk.

## Arbetsordning
A. Granska och dokumentera dateringsprincipen.
B. Testa pilot O119–O122 med utförliga källbelagda tidstyper, mänsklig översyn och läsfönster/Temaspår.
C. Lägg obligatoriskt dateringsfält i varje ny C7-omgång och beta av äldre avsaknader successivt.
D. Publicera först efter separat användartest och godkända kontroller.

**Denna PR är metodunderlag och lägger inte till osäkrade tidsmarkörer i appen.**
