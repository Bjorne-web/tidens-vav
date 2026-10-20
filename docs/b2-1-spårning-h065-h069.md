# B2.1 – Kontroll av H065–H069 (2026-10-20)

Den utökade kontrollen i `tests/category-source-audit.cjs` har körts med grönt resultat.

| ID | Ytterligare källfil | Forskningstillägg |
|---|---|---|
| H065 | `data/dilmun-ninti.v887.js` | `data/c7-religionshistorisk-betydelse.v890.js` |
| H066, H067 | `data/lilith.v888-draft.js` | samma C7-källa |
| H068, H069 | `data/ophites-naghammadi.v889-draft.js` | samma C7-källa |

Dessa fem återfinns inte i `events` i äldre `data/data.generated.js`. De ska **inte** kallas saknade förrän postregistreringen i tilläggsskripten och körningens användning av skripten har kontrollerats. De är spårade till separata källfiler.

C7-filernas första två ID-format som inventerats ger 69 distinkta H-ID och 67 distinkta O-ID. De övriga C7-filerna kan hantera **B-ID:n**, vilket kräver ytterligare ID-uttag innan C7-täckningen kan fastställas fullständigt.

B2.1 är därför fortsatt öppet för bibelbokseriens C7-täckning och `bibleOriginal`-radernas semantiska överlappning med andra poster. Ingen omklassificering eller ändring i användargränssnittet genomförs.
