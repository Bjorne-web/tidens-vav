# Tidens väv – Etapp B: gemensamt grafiskt ramverk (v1)

## Beslut
Bygg ett gemensamt visuellt designsystem utan att riva redan godkända vyer.
Det här är en *första teknisk etapp*, inte en färdig ombyggnad av hela navigeringen.

### Målytor
- Karta: `#mapView`
- Temaspår: `#exploreView`
- Jämför: `#compareView`
- Om: `#aboutView`
- Postlista: `#recordsView` (stödvy)

### Gemensamma regler
- Centraliserade färg-, linje-, hörn-, avstånds- och skuggvariabler (`--tv-design-*`).
- Gemensam rubrikhierarki, läsbar text, kort och interaktionsfokus.
- Responsivt beteende med bibehållen funktionalitet.

### Saker som uttryckligen inte ändras
- Startsida `#startView` och dess godkända bild/ikoner.
- Tidslinje `#timelineView`, dess Gantt och skalning.
- Sidornas tillstånd, länkar, mobilnavigering och global sökning.
- Forskningsdata och separat pågående C7.
- PR #150:s ännu ej godkända fullständiga forskningsvy.

### Testprotokoll
1. Byt mellan Karta, Temaspår, Jämför, Om och Poster. Kontrollera att inget innehåll försvinner.
2. Kontrollera rubriker, kort, knappar samt responsiv bredd på dator/mobil.
3. Bekräfta att Startsida och Tidslinje är pixelmässigt oförändrade.
4. Kontrollera att globala sökfältet och befintliga länkar fungerar.
5. Rapportera eventuella olika eller överlappande stilar, så korrigerar vi selektivt.

### Nästa del av etapp B
Efter godkännande: samordna sidornas rubrikfält och tillstånd över huvudnavigationen.
Etapp A:s meny- och routningsarbete hanteras separat, så vi undviker dubbla navigationslager.
