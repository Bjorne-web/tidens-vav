# B3.3 – Återgång till godkänd design för Hem och Tidslinje

## Korrigerat beslut

Den tidigare fristående prototypen `previews/b33-isolated-view-preview.html` har en egen grafisk design som **inte är godkänd**. PR #313 har stängts utan sammanslagning. Den tidigare demonstrationsfilen kan ligga kvar som teknisk historik, men får **inte** betraktas som visuell målbild.

## Styrande referenser

- `docs/tidens-vav-design-och-arkitektur.md` v1.1 och `docs/etapp-b-designramverk-v1.md`.
- Den faktiska sidan `index.html`.
- Samma omslagsbild `Start-hero.png` och befintlig stil för Hem i `v887-home-areas.css`.
- Samma tidslinjehero och komponentsystem i `v900-timeline-landscape.css`, samt befintliga typografi- och navigationsstilar.
- Huvudvyerna `#startView` och `#timelineView` är visuellt låsta i denna etapp. Befintliga SVG-ikoner återanvänds från samma källkod; inga approximativa ersättare.

## Testbar designreferens

`b33-approved-design-preview.html` i repositoriets rot är en **exakt kopia av `index.html`** i denna PR. Den placeras i roten för att CSS, bilder och skript ska använda **identiska relativa sökvägar** som huvudappen.

När filen öppnas från samma GitHub-gren eller laddas ned tillsammans med resten av projektets filer ska Hem och Tidslinje se likadana ut som befintlig app. En ensam nedladdad HTML-fil räcker **inte**, eftersom originaldesignen använder externa CSS/JS-filer och bildresurser.

Denna milstolpe visar **visuell identitet, inte en ny funktion**. Skillnaden mot tidigare felaktig prototyp är medvetet att ingen egen design introduceras. Följande separata implementation får utgå från originalvyerna och befintliga klassnamn i stället för nya visuella komponenter.

## Testgrind

1. Jämför Hem och Tidslinje med nuvarande produktionsversion i dator och mobil; samma bild, ikoner, bredd, typografi och navigering.
2. Välj en post och kontrollera befintliga Temaspår, Jämförelse och Läsfönster.
3. Granska hur B3.2:s navigationskontrakt senare kan kopplas in utan att flytta, ersätta eller duplicera befintliga meny- och vykomponenter.
4. Först efter visuellt godkänd designidentitet ska en avstängningsbar integrationspilot föreslås. Inga C7- eller originaldataändringar görs här.

**Illustrativ övergripande process:** B2.3 avslutad → B3.1 avslutad → B3.2 avslutad → **B3.3 återankrad till godkänd Hem/Tidslinje-design, granskning pågår** → B3.4 senare integration.
