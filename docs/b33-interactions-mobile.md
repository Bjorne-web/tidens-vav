# B3.3 – Interaktioner och mobilanpassning i isolerad pilot

Fortsättning på isolerade `previews/b33-isolated-view-preview.html`, **inte** produktionsappen.

- **Jämförelse**: klickbara knappar lägger till eller tar bort demonstrationsposter. Minst en vald jämförelsepost behålls, och posterna visas sida vid sida eller staplas i mobilvy.
- **Tillbakagång**: en historikpost sparar vy, post-ID och huvudområde. Knappen Tillbaka återställer dessa tre, i stället för att enbart byta flik. Detta är fortfarande en lokal demo utan beständig lagring eller djuplänkar.
- **Mobil**: kontroller får flexibla bredder och jämförelsekort staplas. Självständig visuell mobilgranskning återstår.
- **Begränsning**: posttitlar är demonstrationer. Inga källdata eller nya datum hämtas. De faktiska forskningsfunktionerna i C7 eller appen ändras inte.

## Test och nästa grind

Kontrollera klickbar jämförelse, tillbakagång efter byte av post/huvudområde, tangentbordsnavigering och visuell mobilvy. Avstå fortsatt från appintegrering tills användaren godkänt prototypens form och funktion, och en separat testbar UI-PR för integrering har beslutats. Exemplet ger inga belägg för historiska beroenden eller kronologi.

**Illustrativ etappstatus:** B2.3 klar → B3.1 klar → B3.2 klar → **B3.3 pågår** → B3.4 återstår. Forskningsspåret C7 är separat.
