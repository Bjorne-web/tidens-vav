# B2.2 – Beslutsförslag för klassificering (2026-10-20)

**Status: för granskning, inte antaget eller publicerat.** Detta är ett förtydligande av design- och arkitekturstyrdokumentets v1.1 §3–4. Tidigare arbetsnamn C3.2 i PR #180 avser hädanefter **B2.2** enligt den återupptagna etapp B-ordningen.

## A. Huvudområden (användarens ingång)
- `bible` – Bibeln (blå), textens tillkomst, bibelböcker, bibelberättelser, kanon- och handskriftstraditioner.
- `religions` – Religioner (lila), Israels religion, judendom, kristendom och övrig religionshistoria.
- `world` – Världshistoria (grön), människor, samhällen, riken, händelser.
- `ideas` – Idéer & kunskap (ockra), filosofi, idéhistoria, vetenskapshistoria, kunskapsteori.

Fyra områden är **ingångar till samma poster**. Varje post har ett huvudområde efter prövning, samt 0–3 sakligt motiverade sekundärområden. Om prövning saknas är huvudområde `unclassified` tills den genomförs; försök aldrig härleda forskningsstatus ur området.

## B. Fem oberoende frågedimensioner (avancerade filter)
1. **Innehållstyp:** händelse, text/verk, bibelbok, apokryf, berättelse, person, plats, fynd/föremål, kultur/rike, byggnadsverk, idé/strömning. Multipla typer tillåts vid behov.
2. **Tidstyp:** händelse-/historisk datering, berättad tid, textens komposition/redaktion, manuskriptets datering, senare reception. Visa aldrig berättad tid som belagd händelsetid.
3. **Plats/kultur:** belagd geografisk relation, inte moderna statsgränser som om de vore antika.
4. **Forskningsstatus:** separat proveniens och C6/C7-resultat; `not_reviewed`, `part_reviewed`, `reviewed` endast om explicit register säger det. Skillnad mot **osäkerhet i enskilda påståenden**.
5. **Käll-/beläggstyp:** arkeologi, textvittne, inskription, senare tradition, jämförande analys; beläggens kvalitet redovisas postvis och inte per huvudkategori.

## C. Exempel på icke-exklusiva relationer
| Exempel | Primär ingång – preliminär | Andra perspektiv | Separat dimension / varning |
| --- | --- | --- | --- |
| Första Moseboken B001 | Bibeln | Religioner, Idéer & kunskap | Bok/textens komposition skild från berättad tid |
| Ahab och Qarqar H045 | Världshistoria | Bibeln, Religioner | Händelse; historiskt belägg och texttolkning var för sig |
| Gilgamesh / flodtraditioner O067 | Religioner (prövas) | Bibeln, Världshistoria | Textverk/berättelse; motivparallell ≠ bevisad direkt överföring |
| Enki/Ninhursag/Ninti H065 | Religioner (prövas) | Bibeln | Litterär tradition och relation till motiv |
| Makkaberupproret / hasmoneiskt självstyre O123 | Världshistoria (prövas) | Religioner, Bibeln | Skilj händelseförlopp, period och efterhandsrubrik |
| Bibelns 36 äldre berättelser | Bibeln (som relationer, inte nya ID utan prövning) | Varierar | Berättad tid och källtextens tillkomst hålls åtskilda |

Exemplen är **inte beslutade individuella klassificeringar**. Klassificering sker spårbart mot posterna och forskningsmaterialet.

## D. Bevarande- och testregler
1. Behåll kanoniska H/O/B/D/AP-ID:n, tidsfält, äldre råkategori, källor och C6/C7-status.
2. Forskningsberikning är ett lager på befintlig post, inte en ny post.
3. Om samma post visas i två områden, använd **samma ID och läsvy**, aldrig en separat kopia.
4. Adapter (B2.3) ska vara skrivskyddad och redovisa `unknown/unclassified`, täckning och konflikter öppet.
5. Filterpanel (B2.4) ska kunna återskapa dagens filtrerade resultat innan något äldre filter tas bort.
6. Arkeologi och vetenskaplig metod ska vara tvärgående, inte en konkurrerande femte huvudkategori.
7. Berättad tid, händelsetid och tillkomsttid får inte slås samman automatiskt.

## E. Öppna beslut före B2.3
- Taxonomins detaljer: vilka innehållstyper som är användbara utan överlappande checkboxar.
- Tydlig gräns mellan `Bible` och `Religioner` för texter som hör till båda.
- Hur poster utan tillräcklig källprövning ska visas i de fyra ingångarna utan att försvinna.
- Hur gamla `bibleOriginal` kopplas till B-/O-/H-ID:n efter manuell prövning.
- Vilka av dagens filter som ska ligga under **Avancerat** efter full täckningskontroll.

## Lägessteg
**B2.1:** ID-kontroller långt gångna, bibelberättelsers semantiska kopplingar öppna. **B2.2:** ovanstående modell för granskning. **B2.3/B2.4/B3:** ännu inte igång. **C:** pausad.
