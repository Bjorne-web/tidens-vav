# C2.2 – Automatisk geografisk och tidsmässig samordning

## Funktion
När användaren öppnar **Karta** via huvudnavigationen anpassas visningen automatiskt till vald forskningspost, när uppgifterna går att härleda till befintliga data. Inga extra knappar används.

- **Tid:** mittpunkten i postens registrerade dateringsintervall används för visning av historiska lager. Det är ett kartvisningsår, inte en ny exakt vetenskaplig datering.
- **Geografi:** använd de redan registrerade platspunkterna och regionspolygonerna för post-ID. Leaflets karta flyttas/zoomar med `fitBounds`.
- **H037:** ännu ingen direkt länkad kartpolygon; använd den redan befintliga regionen G4, *Sen bronsålder i Levanten*, som **ungefärlig kontext** för kanaaneiska stadsstater. Ingen ny plats eller gräns skapas.
- När användaren går tillbaka till **Tidslinje** återställs den tidigare karttiden.
- Om en post saknar geografiskt underlag används inga gissade koordinater.

## Funktionstest
1. Välj H037 och navigera till Karta **via huvudfliken**; kartans år ska ändras till ca 1300 f.Kr. och Leaflet-kartan ska visa Levanten.
2. Bekräfta att inga extra knappar för att visa vald post/anpassa år längre behövs.
3. Gå tillbaka till Tidslinje och sedan till Karta med annan post med registrerad geografisk koppling.
4. Kontrollera återställd tidigare karttid efter återgång.
5. Kontrollera att övrig Gantt, startsida, källor och C7 fortfarande fungerar.

## Separat fastställt designkrav
Alla sex huvudflikar ska senare få en gemensam, godkänd typ av bildhuvud inspirerad av **befintliga Tidslinjeheron**. Undvik konstlade och tillrättalagda motiv. Det är en separat helhetsdesignuppgift, inte del av denna PR.
