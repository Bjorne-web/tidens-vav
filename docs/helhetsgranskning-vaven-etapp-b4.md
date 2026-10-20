# Tidens väv – helhetsgranskning efter etapp B4

## Beslutad användarresa
**Upptäck → Utforska → Fördjupa.** Sex huvudingångar: Hem, Tidslinje, Karta, Temaspår, Jämför, Om. Gemensam sökning. Forskningsposter och evidensgrund gemensamma mellan vyerna.

## Inventerat i aktuell main
| Yta | Teknisk anknytning | Nuvarande status | Nästa arkitekturarbete |
| --- | --- | --- | --- |
| Hem | startView / navStart | Godkänd hero och fyra ämneskort. **Bevara.** | Verifiera att korten leder vidare till rätt utforskning |
| Tidslinje | timelineView / navTimeline | Godkänd Gantt och interaktion. **Bevara.** | Behåll navigeringskontext vid övergång till annan vy |
| Karta | mapView / navMap | Ingår i gemensam typografisk bas och sidhuvud. | Kontrollera val av samma post-ID och tur/retur till tidslinjen |
| Temaspår | exploreView / navExplore | Ingår i gemensam typografisk bas och sidhuvud. | Enhetliga temalänkar och bevarad historisk kontext |
| Jämför | compareView / navCompare | Ingår i gemensam typografisk bas och sidhuvud. | Post-ID, urval och återgång mellan vyer |
| Om | aboutView / navAbout | Gemensamt sidhuvud. | Sammanhållen beskrivning av syfte, metod, källkritik |
| Forskningsfördjupning | tidens forskningsadapter + befintlig panel | Testpilot i PR #150, ännu inte integrerad. | Pausad tills gemensamma övergångar finns |

## Viktig arkitekturfråga
Källan har **19 sektioner** inklusive äldre undersidor. Huvudnavigationens sex knappar är ett *presentationslager som delegerar till gamla knappar*; den interna routingmodellen är ännu inte ersatt. Det finns dessutom en global sökruta och en separat Forskningsområden-meny. Äldre funktioner ska inte tas bort innan deras innehåll och länkar är inventerade.

## Ordning framåt – stora delresultat
1. **Etapp C1: Kontextmodell.** Definiera post-ID, aktiv vy, användarens val, historiskt tidsintervall, urval i Jämför, eventuellt tema och återvändväg. Läs av gamla data; inga dataskrivningar. Inkludera robusta webbadresser/djuplänkar och tur/retur.
2. **Etapp C2: Fungerande sammanhang mellan huvudvyer.** Koppla Tidslinje ↔ Karta ↔ Temaspår ↔ Jämför och verifiera att samma post och urval följer med. En vy i taget, separata test-PR.
3. **Etapp C3: Ingångar på startsidan.** De fyra områdena ska leda till relevanta översikter i huvudvyerna; behåll exakt godkänd bild och ikoner.
4. **Etapp D: Fullständig forskningsvy.** Utgå från den befintliga gemensamma forskningsmodellen; integrera först efter godkända övergångar. En läsare, inte parallella permanenta läsytor.
5. **Regression & mobil.** Testa sökning, gamla specialvyer, bakåtknapp, djuplänkar, tangentbord, mobil och alla data/post-ID.

## Avgränsningar
Ingen ny sidhuvuds- eller snabbfönsterfinjustering här. Skydda startsidan, Gantt, forskningsdata och parallella C7. Publicera inte PR #150 i väntan på integrationsbeslut.

## Testkriterier för kommande C1
- Kontinuitet hos post-ID och vald vy kan fastställas utan DOM-ändringar.
- Varje koppling som saknas redovisas öppet, inte maskeras.
- Ingen ofrivillig nollställning av Gantt, jämförelseurval eller filter.
- Gamla 19 vyer fungerar under migreringen.
