# B3.3 – Manuell visuell granskning av den isolerade prototypen

## Öppna prototypen

1. Öppna [HTML-filen i GitHub](https://github.com/Bjorne-web/tidens-vav/blob/main/previews/b33-isolated-view-preview.html).
2. Välj **Download raw file** / nedladdningsikonen på GitHub. Spara filen lokalt som `b33-isolated-view-preview.html`.
3. Dubbelklicka den sparade HTML-filen och öppna i en webbläsare. Den är självständig, behöver inga externa skript och ändrar inte någon annan app.
4. För mobiltest: öppna webbläsarens responsiva utvecklarverktyg med smal vy, eller flytta den sparade filen till mobilen. Visuell granskning är ännu inte genomförd av teamet.

**Viktigt:** GitHubs kodvy visar inte en körbar prototyp. För ett korrekt visuellt test måste den nedladdade filen öppnas i webbläsare. Detta är en isolerad demonstrationsfil och ingen live-publicerad Cloudflare-testlänk.

## Kontrollpass A – dator

- [ ] Fyra huvudingångar syns utan horisontell rullning.
- [ ] Tidslinjen, Temaspår, Jämförelse och Läsfönstret kan väljas.
- [ ] O124 ligger kvar som vald post när du byter vy.
- [ ] Lägg till O129 och O119 under Jämförelse, ta bort en post och kontrollera att minst en återstår.
- [ ] Byt huvudområde och post och gå tillbaka steg för steg. Aktiv vy, post, område och jämförelseurval ska återställas.
- [ ] Demonstrationens avsaknad av källprövade datum och forskning är tydligt markerad.

## Kontrollpass B – mobil och tillgänglighet

- [ ] Kontrollera 375 px och 768 px samt en bred datorskärm: inga kontroller ligger utanför fönstret.
- [ ] Jämförelsekort staplas när skärmen är smal.
- [ ] Testa med tangentbord (Tab, Skift+Tab, Retur och Blanksteg).
- [ ] Fokusmarkering är synlig och vald knapp kan identifieras.
- [ ] Rubriker, etiketter och status kan läsas utan att förlita sig på färg.
- [ ] Återgångsknappen fungerar även efter flera på varandra följande ändringar.

## Rapporteringsmall

Ange testad miljö (dator/mobil, webbläsare), vilka steg som fungerar, eventuella visuella problem och om du godkänner endast prototypens layout eller även dess interaktioner.

## Begränsningar inför B3.4

- Detta dokument **påstår inte** att manuella browser- eller mobiltester faktiskt utförts.
- Prototypen använder demonstrationsdata och saknar full forskningsvisning, verkliga tidslinjer och djuplänkar.
- Ingen integration görs i `index.html`, ordinarie filter, tidslinje eller C7.
- Integration kräver separat visuell återkoppling och därefter ett nytt testbart, avstängningsbart förslag.

**Illustrativ etappstatus:** B2.3 färdig → B3.1 färdig → B3.2 färdig → **B3.3 visuell manuell granskning pågår** → B3.4 väntar.
