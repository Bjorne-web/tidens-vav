# B2.1 – Kontroll av C7-filer och äldre bibelposter

**Status 2026-10-20:** Källstrukturer verifierade, fullständig ID-täckningskontroll återstår.

## Verifierat
- I aktuell main finns **37 separata filer** som matchar `data/c7-religionshistorisk-betydelse*.js`. Filantal är inte postantal.
- Huvudkällan innehåller **64 H-poster** och **129 O-poster** med stabila ID:n.
- Äldre `bibleOriginal` innehåller **36 strukturerade rader som positionsarrayer**, inte objekt med `id`. Exempel: Skapelsen / Genesis / berättad miljö och förslag om tillkomsttid; Syndafallet / Genesis.
- Dessa rader får inte masskonverteras till nya post-ID:n innan deras överlappning med bibelböcker, originalarkiv och berättad tidsdimension är kontrollerad.
- Tidigare kontroll: `allOriginalResearchV828` har exakt 129 nycklar motsvarande 129 O-poster, dvs. berikningar, inte extra poster.

## Fortfarande öppet
- Samtliga 37 C7-filers faktiska O-ID-täckning och eventuella konflikter med parallella forskningsskript.
- Entydig matchning av de 36 bibelraderna till kanoniskt ID respektive fristående berättelse.
- Separat täckning för B-, D- och AP-serierna och nyare C7-identitetslager.
- Uppdaterat unikt totalantal kan inte lämnas innan den kontrollen är klar.

## Fast beslutad arbetsordning
1. B2.1: fullständig korsjämförelse inklusive dessa öppna frågor.
2. B2.2: besluta huvudområde, sekundära områden, innehållstyp, tidstyp och forskningsstatus.
3. B2.3: read-only klassificeringsadapter samt automatiska kontinuitetstester.
4. B2.4: ny filterpanel, gamla filter behålls tills utbytet verifierats.
5. B3: gemensam bildbaserad grafisk helhet med tidigare godkänd bild som förlaga.
6. Därefter återuppta C.

**Ingen kod-, kategori- eller UI-migration har skett i denna rapport.**
