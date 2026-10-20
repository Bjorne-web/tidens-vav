# C2.3 – Temaspår och Jämför

Vid övergång via de befintliga huvudflikarna hämtas vald post från C1. Temaspår får post-ID som befintligt relationsfokus och Jämför får posten insatt om den inte redan ingår.

Begränsning: Temaspår får rätt fokus-ID men alla temaspårs layouter visar ännu inte en automatisk rullning till posten. Jämför är begränsad av sitt tidigare maximala urval om fyra poster; vid fullt urval gäller den befintliga appens beteende.

## Test
1. Välj H037 i Tidslinjen; öppna Temaspår och kontrollera att vald post/forskningspanelen förblir H037.
2. Öppna Jämför; H037 ska vara med, utan att du manuellt behöver lägga till den.
3. Navigera bort och tillbaka: samma post ska inte läggas till dubbelt.
4. Välj en annan post; kontrollera att Jämför och Temaspår tar emot det nya ID:t.
5. Testa mobil och gamla specialvyer. Den godkända startsidan, tidslinjen, kartkopplingen och C7 ändras inte.
