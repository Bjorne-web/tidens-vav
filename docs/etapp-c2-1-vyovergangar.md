# Etapp C2.1 – behåll vald forskningspost mellan huvudvyer

Minimal kontextremsa visas **endast när en post är vald** och endast i Tidslinje, Karta, Temaspår eller Jämför. Visar post-ID/titel ur godkända C1-adaptern och länkar till de tre andra huvudvyerna, med befintlig navigering.

## Viktigt
- Ingen extra lagring av post-ID, inga uppdateringar av data.
- Navigationsknapparna använder gamla fungerande vyknappar.
- Funktionen lovar **inte** automatiskt kartmarkering, temafiltrering eller tillägg till Jämför; detta tillhör senare C2-delsteg.
- Ingen inverkan på Start/Om eller den fullständiga forskningsvyn i separata PR #150.
- Remsan kan tills vidare ta lite vertikalt utrymme i Tidslinjen; testa särskilt att Gantt-positionering och pan fungerar som förr.

## Test
1. Välj H045 i Tidslinje; bekräfta att remsan visar H045 och rätt titel.
2. Välj `Visa i Karta`, `Visa i Temaspår` och `Visa i Jämför`; kontrollera aktiv vy och att valt post-ID är detsamma i remsan.
3. Välj annan post och repetera utan omladdning.
4. Testa mobil, sökning, filter och Gantt-pan.
5. Före postval ska ingen remsa visas. Knapparnas ordinarie navigering ska fortsatt fungera.
