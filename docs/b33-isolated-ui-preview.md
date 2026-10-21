# B3.3 – Isolerad visuell testpilot

Testfil: `previews/b33-isolated-view-preview.html`. Den är **inte länkad från index.html** och kan öppnas direkt som en separat demonstrationssida i testgrenen. Ingen ändring av produktionsappens navigation, originaldata eller C7 sker.

## Första demonstrationsomgången

- Fyra huvudområden visas som orientering, skilda från fyra arbetsvyer: Tidslinjen, Temaspår, Jämförelse och Läsfönstret.
- Vald post behålls mellan vyerna via `selectedPostId`; enkel återgång via `returnContext`.
- Tre **hårdkodade demonstrationsposter** (`O124`, `O129`, `O119`) används endast för att pröva navigationsbeteendet, inte för historisk faktavisning. Ingen pålitlig datumlinje eller faktisk källvisning utges för att vara implementerad.
- Mobil layout växlar från två kolumner till en, utan att dölja kontroller.
- Posten O124 får en synlig reservation om icke faktagranskad originaldatering.
- Prototypens Jämförelse/Temaspår/Läsfönster är **endast ytor som demonstrerar postidentitet och navigation**, inte fullständigt fungerande forskningsfunktioner.

## Kriterier innan nästa PR

1. Användaren granskar visuellt desktop/mobil och godkänner informationshierarki.
2. Separat test krävs för verkliga data, flera jämförelseposter, djuplänkar, tillgänglighet och synkronisering av vyernas tillstånd.
3. Först därefter kan en reversibel appintegrering övervägas, med tydlig avstängning och jämförelse mot befintligt gränssnitt.
4. C7:s vetenskapliga prövning har företräde för alla daterings- och källfrågor.

## Illustrativ processstatus

B2.3 avslutad → B3.1 avslutad → B3.2 avslutad → **B3.3 prototyp pågår** → B3.4 framtida migreringsbeslut. Denna ordning är schematisk och inget procentvärde för faktiskt färdigställande.
