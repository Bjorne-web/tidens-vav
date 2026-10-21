# B3.3 – Sammanhållet användarflöde i isolerad pilot

B3.3-piloten är isolerad i `previews/b33-isolated-view-preview.html`. Denna PR förbättrar tillbakagången så att inte enbart vybyten, utan även byte av huvudområde, exempelpost och jämförelseurval kan återställas. Inga originaldata, C7-poster eller delar av huvudappens gränssnitt ändras.

## Genomgånget flöde och förväntat resultat

1. **Start:** Välj O124 i Tidslinjen och kontrollera att samma post-ID syns i sammanhangspanelen.
2. **Växla vy:** Öppna Temaspår och Läsfönstret. Valt post-ID ska bevaras.
3. **Jämför:** Välj Jämförelse, lägg till O129 och O119, och ta bort en post. Urvalet uppdateras utan att originalposters identiteter ändras.
4. **Ändra ämnesingång:** Byt mellan Bibeln och Religioner. Vykontext och vald post ska bevaras.
5. **Återgå:** Gå bakåt stegvis genom ovanstående val. Historiken återställer vy, post, huvudområde och jämförelse-ID:n.
6. **Mobil:** Upprepa flödet med smal skärmbredd. Navigationsknappar ska brytas om och jämförelsekort staplas. Detta kräver **manuell visuell granskning**; statiska tester verifierar bara att mobilregler finns.
7. **Tillgänglighet:** Kontrollera tabb-ordning, synlig fokusmarkering, knapparnas lägen och läsbarhet. Separat skärmläsartest återstår.

## Tydliga begränsningar

- Prototypen hanterar endast tre demonstrationsposter och saknar verkliga källtexter, forskningsfördjupningar och källprövade dateringar.
- `returnContext` är en lokal historik, inte webbläsarens historik eller en beständig djuplänk.
- Enhetstestet säkrar återställningskodens omfattning, men är **inte ett genomfört visuellt användartest**. Inget formellt designgodkännande föreligger utan en granskning i dator/mobil.
- O066 saknas i originalkällan och konstrueras inte av prototypen.

## Grind för nästa del

När interaktionspiloten är visuellt godkänd ska en separat plan för verkliga data, djuplänkar, användarval och avstängningsbar integration tas fram. C7:s vetenskapliga prövning hålls separat.

**Övergripande arbetsprocess – illustrativt:** B2.3 färdig → B3.1 färdig → B3.2 färdig → **B3.3 test och visuell granskning pågår** → B3.4 återstår.
