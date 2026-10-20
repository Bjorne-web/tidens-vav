# Etapp B3 – huvudnavigering, separat pilot

Ny huvudrad: **Hem · Tidslinje · Karta · Temaspår · Jämför · Om**.
Samtliga knappar anropar exakt de befintliga navigationsknapparna. Äldre specialvyer är fortfarande tillgängliga via **Fler vyer**. Den ursprungliga navigeringen finns kvar i DOM, men visas inte dubbelt.
Inga forskningsdata eller kart-/tidslinjealgoritmer ändras. Startsida och Gantt-innehåll berörs inte.

## Test
1. Navigera i tur och ordning mellan de sex ingångarna; kontrollera korrekt aktiv markering.
2. Gå via **Fler vyer** till t.ex. Arkeologi & Bibeln eller Fördjupningar och tillbaka till Tidslinje.
3. Testa globala sökfältet och forskningsmenyn.
4. Testa mindre skärmbredd och mobil – ingen överlappning eller borttappad navigation.
5. Kontrollera att startsidans ikonbild och Gantt-layouten är oförändrade.

Observera: Detta är etapp B:s huvudnavigation i **test**, inte en färdig ombyggnad av appens interna routing.
