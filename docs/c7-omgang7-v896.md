# C7 – Religionshistorisk fördjupning, omgång 7

**Datum:** 18 oktober 2026  
**Status:** separat testgren, ej publicerad på huvudversionen  
**Gren:** `c7-religionshistoria-omgang7-20261018`  
**Utgångspunkt:** användargodkänd C7 omgång 6, [PR #92](https://github.com/Bjorne-web/tidens-vav/pull/92)

## Syfte och redaktionell avgränsning

Huvudmålet är att visa hur Paulus och andra judiska Jesusanhängare förhöll sig till Torah, folken, sociala hierarkier och romersk makt under första och andra århundradet. Vi utgår från **befintliga ID**, tillför individuella analyser, källor och osäkerheter, samt undviker att göra senare kyrkliga normer och kontroverser till självklara uttalanden om antika förhållanden.

## Åtta kompletterade poster

| ID | Rubrik | Särskilt forskningsproblem |
|---|---|---|
| H036 | Bar Kokhba-upproret | Mynt som primärvittnen; direkta orsaker och militärt förlopp omdiskuterade |
| B044 | Apostlagärningarna | Historiskt material kontra litterär-teologisk framställning; jämför Paulus egna brev |
| B045 | Romarbrevet | Israel, icke-judar och Torah; konkurrerande Paulusforskning och kontextuell sexualetik |
| B046 | Första Korinthierbrevet | Sociala konflikter, Herrens måltid, antik etik, gränser för moderna kategorier |
| B047 | Andra Korinthierbrevet | Delbrevshypoteser, auktoritet, lidande och apostolisk försoning |
| B048 | Galaterbrevet | Omskärelse, förbund, tillhörighet och Gal 3:28; jämför Apg med kritisk metod |
| B050 | Filipperbrevet | Kristushymn, fängelsemiljö, status och omdiskuterad tillkomstort |
| B057 | Filemonbrevet | Onesimos, romerskt slaveri, obelagd automatisk frigivning och senare kristet bruk |

### Belägg, hypoteser och begränsningar

- Mynt från Bar Kokhba-rörelsen bekräftar självständighetsanspråk men avgör inte ensamma upprorets motiv; Hanan Eshels forskningsöversikt visar oenigheten.
- Apostlagärningarna är ett senare litterärt vittne till rörelsens tidiga historia. Paulus brev måste också läsas som **självständiga källor**, inte pressas in i en harmoniserad tidslinje.
- I Paulusforskningen förekommer olika modeller för relationen mellan Torah, Israel och icke-judar. Matthew Thiessen och John G. Gager ger skilda bidrag till debatten.
- 1 Kor 6 och Rom 1 måste analyseras i antik kontext; läggning, relation och handling är inte självklara motsvarigheter i första århundradets klassificeringar.
- 2 Kor kan vara en sammanfogning av flera brev, men exakt delningsmodell saknar konsensus.
- Fil 2:6–11 kan omfatta tidigare traditionsmaterial; ursprunget kan inte fastslås säkert.
- Filemon säger inte entydigt att Onesimos friges och belägger inte en omedelbart abolitionistisk tidig kyrka.

## Referenser och metod

Källorna är länkade direkt i varje post i `data/c7-religionshistorisk-betydelse.v896.js`. Centrala läsvägar:

- Hanan Eshel, *The Bar Kochba Revolt, 132–135*, Cambridge History of Judaism; Bank of Israel och The Jewish Museum för materiella vittnen.
- Christopher R. Matthews, *Acts of the Apostles*, Oxford Bibliographies.
- Matthew Thiessen, *Paul and the Gentile Problem* (Oxford 2016), och John G. Gager, *Reinventing Paul* (Oxford 2002).
- Stephen J. Chester m.fl. (2025) om 1 Kor; Cavan W. Concannon (2014) om Korinths sociala miljö.
- Thomas D. Stegman, *Second Corinthians* (Oxford Bibliographies), och Ivor H. Jones (Cambridge 2008).
- Jerry L. Sumney (uppdaterad 2024) och Ryan S. Schellenberg (2021) om Filipperbrevet.
- Laura Salah Nasrallah (2018), Katherine A. Shaner (2018) och Oxford Bibliographies (2022) om Filemon och Onesimos.

**Forskningsfördjupning är inte liktydig med fullständig vetenskaplig helgranskning.** Rubriken visas individuellt enbart för poster med konkret religionshistorisk analys.

## Genomförande och testgrind

- Ny modul `data/c7-religionshistorisk-betydelse.v896.js` lastas efter tidigare C7-moduler och före såväl kronologins som bibelböckernas läsvyer.
- `tests/smoke-c7-v896.mjs` verifierar åtta nya individuella analyser, 48 tidigare C7-poster, källor, bevarande av ID:n och att reservtexter förblir dolda.
- Totalt **minst 56 C7-dossierer** i den nya testgrenen.
- Originaltidslinje, bibelböckernas befintliga ID och dateringar, C6-slutstatus och andra godkända poster lämnas oförändrade.
- **Cloudflare Preview:** testa H036, B044, B045, B046, B047, B048, B050 och B057 på mobil och dator. Kontrollera texter, källänkar, särskilt Rom 1 och 1 Kor 6, samt att H065, B001 och B066 fortfarande fungerar.
- Inga ändringar på `main` utan användarens separata godkännande av omgång 7.
