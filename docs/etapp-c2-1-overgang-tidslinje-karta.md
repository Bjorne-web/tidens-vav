# Etapp C2.1 – Följ vald post från Tidslinje till Karta

- Visar en kort sammanhangsrad när en forskningspost är vald och användaren står i Tidslinje eller Karta.
- Använder C1:s skrivskyddade snapshot och Vävens **befintliga** navigationsknappar.
- **Visa samma post i Karta** öppnar Karta med samma valda post-ID. Det garanterar *inte* en geografisk kartnål; saknas koordinater ändras inte kartdata.
- I Karta visas **Tillbaka till Tidslinje**.
- Ingen ändring av forskningsdata, gamla läsare, zoom eller godkänd Gantt-layout.

## Test
1. Välj en post i Tidslinjen via den gamla postlistan eller annan metod som registrerar `selectedId`.
2. Kontrollera att sammanhangsraden visar rätt ID och titel.
3. Välj **Visa samma post i Karta**, kontrollera att posten är vald där.
4. Välj **Tillbaka till Tidslinje** och kontrollera att samma ID finns kvar.
5. Testa utan vald post – raden ska inte visas.
6. Testa mobil och andra huvudvyer – de ska vara oförändrade.

Inga ändringar i URL eller browserhistorik i C2.1; det görs först när den gemensamma routingen är mogen.
