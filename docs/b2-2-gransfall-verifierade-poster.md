# B2.2 – Gränsfallsprövning mot verkliga poster (2026-10-20)

**Status: förslag för granskning.** Inga poster är omklassificerade. Detta kompletterar `docs/b2-2-beslutsforslag-kategorimodell.md` och styrdokument v1.1.

## Verifierade exempel och prövning

| Post | Faktiskt äldre datavärde | Föreslagen primär ingång | Sekundära kopplingar | Avgörande separat dimension |
| --- | --- | --- | --- | --- |
| H045 Ahab/Qarqar | `Arkeologi`, år -853 | Världshistoria | Bibeln, Religioner | Historisk händelse samt assyrisk inskrift som belägg; arkeologi är ingen exklusiv huvudkategori |
| O067 Gilgamesheposets flodberättelse | `Konflikterande berättelser`, -2100 till -1600 i äldre arkivet | Religioner **preliminärt** | Bibeln, Världshistoria | Texttradition, motivparalleller och osäker sammansättning; arkivets datum får inte presenteras som entydigt källprövat |
| O123 Självstyre (Hasmonéer) | `Bibelberättelser`, -150 till -100 i äldre arkivet | Världshistoria **preliminärt** | Religioner, Bibeln | Hasmoneisk historia kontra Makkaberböckernas litterära återgivning och alternativ rubrik |
| B001 Första Moseboken | Bokpost i separat B-serie | Bibeln | Religioner, Idéer & kunskap | Bokredaktionens tid kontra berättelsernas tid |
| Äldre raden Skapelsen | `bibleOriginal`, array utan kanoniskt post-ID | Bibeln endast som relaterad berättelse efter prövning | Religioner, Idéer & kunskap | Berättad tid är mytisk, inte daterad historisk händelse; kontroll mot B001 |
| Äldre raden Noas ark | `bibleOriginal`, array utan kanoniskt post-ID | Bibeln endast som relaterad berättelse efter prövning | Religioner | Flodmotiv; kontroll mot B001, H/O paralleller, och separat datering av texter |

## Beslutsregler
1. **Vad undersöker posten primärt?** Historisk händelse → Världshistoria; bibelbok/textens framväxt → Bibeln; religionens praktik, gudsföreställningar och religionshistoria → Religioner; idé-/vetenskapshistoria → Idéer & kunskap. Detta är en redaktionell riktlinje, inte automatisk nyckelordsregel.
2. **Sekundära kopplingar är förstaklassrelationer**, inte kopierade poster; samma post-ID, samma källor och samma forskningsstatus från varje vy.
3. **Bibelns berättade kronologi får inte likställas med daterade historiska skeenden.** Visas som egen tidstyp om belägg finns; annars utan säker händelsetid.
4. **Gamla kategorier bevaras i metadata** och blir inte automatiskt nya huvudområden: `Arkeologi` är källtyp, `Bibelberättelser` är innehålls-/tidstyp, `Konflikterande berättelser` anger inte evidensstyrka.
5. **Unika post-ID:n och kontext går före namnlikhet.** En bok och dess berättelse är inte automatiskt dubbletter; en äldre positionsrad får länkas till bok/verk först när relationen är bedömd.
6. **Osäker klassificering ska synas öppet** som `unclassified` eller markerat preliminärt område, aldrig döljas ur sök eller historiskt arkiv.

## För fortsatt ställningstagande
- Ska `primaryArea` bestämmas av **postens ämne** även när användaren kommer via Bibeln? **Rekommendation: ja**, annars ändras ämnesidentitet med vy.
- Ska äldre `bibleOriginal` få nya självständiga forsknings-ID:n? **Rekommendation: nej, inte generellt**; pröva enskilda berättelser och använd relationer där de uppenbart pekar på befintliga poster.
- Ska användaren filtrera på **källtyp** och **forskningsstatus** separat? **Rekommendation: ja**; forskningsstatus är inte samma sak som historisk säkerhet.
- Om delar av Väven ännu saknar granskad primärkategori ska poster ändå kunna hittas? **Ja**, via Sök, gamla filter under övergången och en tydlig grupp 'Ännu inte klassificerade'.

## Nästa moment
Skriv en första **icke-destruktiv klassificeringsspecifikation** och låt B2.3-adaptern exponera `primaryArea`, `relatedAreas`, `contentTypes`, `timeKinds`, `researchStatus` tillsammans med ursprungs-ID och råkategori – utan att ändra forskningsdata. Påbörja inte adapter förrän detta beslut är godkänt.
