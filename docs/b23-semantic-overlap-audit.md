# B2.3 – Upprepade rubriker och semantiska överlapp

En inventering av `originalEvents` visar **fem grupper med exakt samma rubrik**, omfattande **23 skilda källposter**. Lika rubrik är inte samma sak som identiskt innehåll: varje post har ett eget ID och en särskiljande beskrivning.

| Originalrubrik | Poster | Tolkningsrisk |
|---|---|---|
| Judendom | O026–O029 (4) | Olika faser av religionens utveckling; får inte automatiskt slås ihop |
| Babylonisk exil/återvändande | O095–O096 (2) | Skapelsen och Syndafallet anges i beskrivningen, men rubriken ser ut som händelsedatering |
| Babylonisk exil | O097–O101 (5) | Noa, Babel, patriarktraditioner och Josef får inte dateras till exilen som berättade händelser |
| Exil/Post-exil | O103–O112 (10) | Sinai, ökenvandring, erövrings- och kungaberättelser blandas under en tidsrubrik |
| Post-exil | O114–O115 (2) | Jeremias varningar och exilen i Babylon är olika berättelser/historiska perioder |

Ingen automatiskt konstaterad *fullständig innehållsdubblett*: testen detekterar **rubriköverlapp**, inte identitet hos historiska skeenden eller texter.

## Rekommenderad separat åtgärdsordning

1. Behåll samtliga original-ID och originalbeskrivningar under B2.3; märk rubriköverlapp som redaktionella kontrollpunkter.
2. I framtida presentationslager: visa särskiljande ämnesetikett från beskrivningen i stället för enbart gemensam originalrubrik, men gör först separat designprövning.
3. Låt C7 pröva forskningsdateringar och eventuell omtolkning av exil- och efterexilrubriker, inte denna klassificerings-PR.

Regressionstestet bevakar att det finns **fem** rubrikgrupper och att de **23** registrerade ID:na förblir separata. Ny avvikelse stoppar testet så att ändringen kan granskas. Detta är en strukturell redaktionskontroll, inte vetenskaplig slutgranskning.
