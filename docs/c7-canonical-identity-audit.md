# Kanonisk identitetskontroll – O095–O130

Denna etapp inför en **automatiserad inventering**, inte en tyst omdöpning av nya poster. Testet kör originalregistrets datalager, tillämpar publicerade identitetskorrigeringar och jämför ämnesidentiteten med det dokumenterade ämnesregistret `docs/c7-o095-o130-id-mapping-20261019.json`.

Kontrollen säkerställer unika original-ID:n, att korrigerade poster behåller sin ursprungliga titel som `legacyTitle`, samt att varje identitetskorrigeringsskript är inkopplat i HTML. Ännu ej rättade ämnen rapporteras separat för bedömning innan ändring.

**Känd nästa grupp:** O127 Församlingens födelse, O128 Paulus brev, O129 Jerusalems förstörelse och O130 Uppenbarelseboken har importerade miljöetiketter som inte ska vara kanoniska huvudrubriker. Granska först att ingen separat historisk post bär samma ID, och skilj händelsedatum från textdatering.

**Vetenskaplig integritet:** Ämneskorrigering är inte datering och inte C6-slutgranskning. Ändringar i forskningsinnehåll, temaspår eller kronologiska intervall kräver separata källor, test och manuellt godkännande.

Kör: `node tests/audit-canonical-identity-c7.mjs`
