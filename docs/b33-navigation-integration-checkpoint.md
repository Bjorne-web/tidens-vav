# B3.3 – Samlad kontroll inför övergång till B3.4

## Genomförd teknik

- PR #315 och #317: säkrare navigering från redan godkända ämneskort på Hem.
- PR #334: skydd för äldre jämförelselista vid övergång till Jämför.
- PR #336: skydd för ofullständigt fokusobjekt vid övergång till Temaspår.
- PR #338: ingen onödig tom statuspanel vid återgång till Tidslinjen.
- PR #319, #321 och #323: kontroll av webbplatsens tillgångar, fullständig testartefakt och HTTP-hämtning.

## Gemensam teknisk grind

Den nya workflowen `b33-navigation-release-gate.yml` kör de befintliga B3.3-testerna **tillsammans** för navigering och full webbplatsleverans. Den ändrar inte själva appen.

## Beslutspunkt före B3.4

Grönt CI betyder inte att hela användarresan är godkänd i verklig webbläsare. Innan B3.3 förklaras färdig behövs:
1. En ny, faktisk Cloudflare Preview för det slutliga integrationsförslaget.
2. Ett manuellt kontrollpass: välj post i Tidslinjen, öppna Temaspår, öppna Jämför och återvänd.
3. Verifikation att Hem och Tidslinje fortfarande har exakt godkänd landskapsbild, ikoner och layout i dator/mobil.
4. Beslut om B3.4, utan att C7:s forskning eller originaldata påverkas.

**Illustrativ etappöversikt:** B2.3 färdig → B3.1 färdig → B3.2 färdig → **B3.3 samlad teknisk kontroll pågår** → B3.4 återstår.
