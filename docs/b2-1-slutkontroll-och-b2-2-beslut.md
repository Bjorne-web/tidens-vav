# B2.1 – Sammanfattning inför kategoribeslut (2026-10-20)

## Kontrollresultat
Det automatiserade testet i `tests/category-source-audit.cjs` är godkänt på uppdaterad PR #191.

- 37 C7-källfiler i religionshistoriskt material kontrolleras.
- 66 olika B-ID:n förekommer i dessa filer och matchar samtliga 66 kanoniska bibelboksposter.
- Inga D-ID:n hittades i just dessa 37 filer. Detta innebär **inte** att apokryferna saknar egna forskningsanalyser i andra filer.
- Inga okända B- eller D-ID:n upptäcktes.
- 36 äldre `bibleOriginal`-rader uppfyller kontrollen för titel och bok-/textfält. Detta är **strukturell** kontroll, inte semantisk deduplicering.
- Tidigare: 129 forskningsberikningar matchar 129 O-poster; H065–H069 har separata källfiler.

## Kvar innan B2.1 kan formellt stängas
Äldre bibelrader kräver ett ställningstagande om de representerar självständiga berättelser, korslänkar till B-poster eller annat. Säkerställ dessutom att senare nya skript kan följas genom fortsatta automatiska kontrollkörningar.

## Rekommendation för B2.2
Besluta fyrdelad huvudnavigering och separata filterdimensioner för ämne, innehållstyp, tidstyp, evidens, plats. Håll postens stabila ID och gamla råkategori oförändrade. Tillåt flera ämneskopplingar; obligatorisk primärklassificering ska kunna vara `unclassified` tills manuell granskning genomförts.

## Stoppvillkor
Ingen massmigrering av de 36 berättelserna och ingen automatisk nedskrivning av forskningsstatus. C6/C7-forskningsgranskning ligger utanför denna ID-kontroll.
