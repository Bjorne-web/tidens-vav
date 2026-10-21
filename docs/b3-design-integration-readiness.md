# B3 – Beslutsunderlag för säker designintegrering

Den tekniska B2.3-piloten är avslutad, men **inget nytt gränssnitt eller filter aktiveras med denna PR**. Följande öppna förslag ska samordnas innan en ändring görs:

- PR #180: kategoriarkitektur med fyra huvudingångar.
- PR #184: källinventering, filterdimensioner och migrationsordning.
- PR #157: övergripande vy- och navigationsarkitektur.
- B2.3-slutrapport: `docs/b23-closeout-and-design-handoff.md`.

## Bygggrindar

1. **Beslutsavstämning:** En enda styrande definition för huvudingångarna Bibeln, Religioner, Världshistoria och Idéer & kunskap (intern kod: `bible`, `religions`, `world`, `ideas`). Etiketter och ingångarnas faktiska placering fastställs i övergripande design.
2. **Poster:** Bibehåll original-ID och originaldata; 129 O och 64 grund-H + fem kompletterande H har läsbaserad klassificering, inte forskningsmässigt godkännande.
3. **Tid:** Berättad tid, historisk händelse, komposition, materialvittne och reception förblir skilda. Särskilt O124–O126 får aldrig läsas som att Jesu liv inträffade 70–100 e.Kr.
4. **Rubriker:** Fem grupper av identiska rubriker omfattar 23 O-poster. Möjlig ny visningsetikett prövas separat, utan tyst namnbyte eller dubblettborttagning.
5. **Forskning:** C7 har fortsatt företräde och får inte få datum eller forskningsstatus ändrade av B3; `researchStatus: unknown` är inte ett godkännande.
6. **Integration:** Första framtida UI-piloten ska vara separat och reversibel, med jämförelse mot gamla filter, antal träffar, djuplänkar, mobilvy, tillgänglighet och återkomst till senaste vy. Ingen sådan UI-pilot görs i denna PR.

## Resultat och beslutspunkt

B3 kan använda klassificeringsmodellen för **planering och designvalidering**, men start av kodändringar i `index.html`, tidslinjens struktur, Gantt-vyer och filter kräver en särskild design-PR med explicit testgodkännande. De äldre öppna PR:erna bör inte massammanfogas; kontrollera deras aktualitet mot nuvarande `main` och undvik parallella migrationsspår.

Nästa del bör kartlägga beroenden mellan de tre öppna arkitekturförslagen och det fastställda styrdokumentet, och sedan föreslå ett gemensamt integrationssteg.
