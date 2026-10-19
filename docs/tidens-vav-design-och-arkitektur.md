# Tidens väv – styrdokument för arkitektur, design och utveckling

**Version:** 1.1 · **Datum:** 2026-10-19 · **Status:** Godkänd målbild och vägledande designprinciper; implementation sker stegvis efter separat testgodkännande.

## 1. Vision och pedagogiskt förhållningssätt

Tidens väv ska väcka människors upptäckarlust och hjälpa dem att se bortom invanda föreställningar om Bibeln, historia, religion, idéer och vetenskap. Det ska vara möjligt att få sina perspektiv konstruktivt utmanade – att *rubba sina cirklar* – utan att känna sig angripen eller styrd mot ett på förhand bestämt svar.

Vi vill öppna dörrar, inte bestämma var människor ska landa. Besökare med religiös tro, annan livsåskådning eller osäker hållning ska mötas med samma respekt. Målet är bättre underbyggd förståelse och fördjupad reflektion, inte att skapa konfrontation eller vinna en trosdebatt.

**Redaktionell regel:** skilj tydligt mellan historiska belägg, forskningsbaserade slutsatser, öppna hypoteser, religiösa traditioners egna anspråk och normativa/filosofiska resonemang. Presentera olika perspektiv sakligt utan falsk balans: slutsatsernas tyngd ska avspegla beläggen. Frågor får förbli öppna där forskningen inte kan avgöra dem.

**Kärnprincip:** Vi bygger inte separata öar av information. Vi bygger sambanden mellan dem.

## 2. Sammanhängande användarresa

**Upptäck → Utforska → Fördjupa**, med smidig väg tillbaka.

- **Upptäck:** En lugn, inspirerande startsida med sök, huvudområden och ingångar för nyfikna användare.
- **Utforska:** Ett *samlingsbegrepp, inte en separat flik*. Användaren utforskar samma material genom **Tidslinje, Karta, Temaspår och Jämför**.
- **Fördjupa:** Samma forskningspost kan öppnas från samtliga vyer. Ett snabbt läsfönster ger orientering; en fullständig forskningsvy ger förklaringar, källor och samband.

Bevara relevant valt område, tidsfönster, filter och utgångspost vid byte av perspektiv. Användaren ska alltid kunna återvända till där utforskningen började.

## 3. Huvudområden och tvärgående vetenskap

Fyra jämställda **ingångar till en gemensam kunskapsbas**, med ett tydligt fokus på Bibeln och dess historiska omvärld:

1. **Bibeln** – blå: böcker, berättelser, texttraditioner, sammansättning och historisk kontext.
2. **Religioner** – lila: Israels religion, judendom, kristendom och andra traditioners historia.
3. **Världshistoria** – grön: människor, kulturer, samhällen, riken och historiska skeenden.
4. **Idéer & kunskap** – ockra/orange: filosofi, idéhistoria, etik, kunskapsteori, vetenskapshistoria och föränderliga världsbilder.

**Beslut:** tidigare etiketten *Filosofi* ersätts i målarkitekturen av *Idéer & kunskap*. Detta innebär inte att alla gamla poster automatiskt klassificeras om; en separat, spårbar kartläggning och migrering krävs.

**Vetenskap är dessutom tvärgående.** Källkritik, forskningsmetoder, evidensstyrka, dateringsosäkerhet och jämförelse av tolkningar ska vara tydliga i **alla** fyra områden. Vetenskap ska inte vara en exklusiv femte innehållsö. Vetenskapshistoria hör däremot hemma som *historiskt ämnesinnehåll* under Idéer & kunskap och kan ha kopplingar till andra områden.

Varje forskningspost har ett primärt område och kan kopplas till flera andra. En motivparallell är inte automatiskt bevis för direkt beroende.

## 4. Huvudnavigering och ansvar

**Hem | Tidslinje | Karta | Temaspår | Jämför | Om** samt gemensam **Sök**.

- **Hem:** inspirera och hjälpa besökaren välja väg.
- **Tidslinje:** kronologiska relationer, periodval och Gantt.
- **Karta:** geografi och historiska platser, med tidskontext och försiktighet kring rekonstruerade gränser.
- **Temaspår:** följ ett ämnes utveckling genom poster och perioder, utan egen parallell databas.
- **Jämför:** analysera valda poster sida vid sida, särskilt kontext, källor, likheter, skillnader och osäkerheter.
- **Om:** syfte, metod, avgränsningar och transparens.
- **Sök:** hittar poster, begrepp, teman, geografiska platser och eventuellt källor; leder vidare till valfri relevant vy.

**Utforska** och **Fördjupa** är inte permanenta huvudflikar. Äldre flikar saknar bevarandekrav: funktioner granskas, återanvänds där de behövs, slås ihop eller tas bort från toppnavigationen. Forskningsinnehåll och källreferenser får inte försvinna i detta arbete.

**Designregel:** håll isär *navigation* (vart?), *filter* (vad visas?) och *fördjupning* (vad betyder detta?).

## 5. Forskningsvyn: två läsnivåer

### 5.1 Snabbfönster
Öppnas i Tidslinje, Karta, Temaspår eller Jämför; visar post-ID, titel, datering och säkerhet, kort sammanfattning, huvudområde, viktiga kopplingar samt länken **Öppna full forskningsvy**. Ska inte rycka användaren från sammanhanget.

### 5.2 Fullständig forskningsvy
En enhetlig vy med tydlig innehållsnavigering:
- Översikt och bilder (illustrationer märkta som sådana)
- Tidslinje och historisk kontext
- Forskning, alternativa tolkningar och källkritiska begränsningar
- Källor och evidens (med bedömning av primär- och sekundärkällor)
- **Betydelse för Israels religion, judendomen och kristendomen** i relevanta poster, med substantiell text
- Geografisk kontext
- Relaterade poster och sambandsförklaringar
- Teman och begrepp
- Delning och export när ändamålsenligt

Samma kanoniska post ska öppnas oavsett ingång. Två läsnivåer betyder **inte två databaser**. Utformningen ska fungera på både dator och mobil.

## 6. Gemensam informations- och sambandsmodell

Varje post ska ha stabilt ID, titel, sammanfattning, primärt område, sekundära kopplingar, kategorier, tid/typ av tid, dateringsosäkerhet, plats/region, posttyp, evidens/forskningsstatus, källor, bilder med rättigheter/metadata, religionshistorisk betydelse, relationer och teman.

Relationer bör kunna beskriva sin **art** (t.ex. samtidighet, motivlikhet, möjlig påverkan, dokumenterad kontakt, motsatt tolkning) samt evidensnivå, inte bara vara klickbara länkar.

Gemensamt urval och lämpliga filter ska följa användaren mellan vyer utan att bryta tidigare funktioner. Det ska alltid vara möjligt att återställa urvalet. En och samma post och dess relationer används av tidslinje, kartläge, temaspår, jämförelse, läsfönster och sök.

## 7. Grafiskt designsystem

Utgå från redan godkända hero-/landskapsbilden, områdesfärgerna och **exakt samma SVG-ikoner** i alla vyer. Byt inte till approximativa symboler. Bygg återanvändbara kort, knappar, filter, typer av forskningsstatus, sidhuvud och navigering.

Visuellt: varmt, välkomnande, lugnt och lättläst; generösa men genomtänkta ytor, tydlig informationshierarki, progressiv fördjupning. Visa osäkerhet begripligt och skilj illustrativa bilder från historiska fotografier/föremålsbilder. Mobilanpassning och tillgänglighet är grundkrav.

**Referens:** Godkänd och publicerad PR #106 / V8.94 är referens för startsidans och tidslinjens etablerade detaljer. Deras funktioner ändras inte oavsiktligt vid ombyggnad av andra vyer.

## 8. Teknisk riktning och samordning

GitHub + Cloudflare Pages. Utgå från aktuell `main`; små, testbara PR:er med separat Preview. Tydlig separation mellan datamodell, vetenskapligt innehåll, UI-komponenter och vylogik; undvik dubblerad DOM- och reglagekod. Källhänvisningar, post-ID:n och korslänkar ska bevaras. Dokumentera gemensamma designbeslut i GitHub.

**C6/C7** äger fortsatt forsknings- och källkvalitet inom den gemensamma modellen. Layoutarbetet får inte skriva över deras data; forskningsuppdateringar får inte skapa parallella designsystem. Planera integration och kontrollera pågående PR:er före merge.

**The World Behind the Word** är långsiktigt huvudapp; Tidens väv utvecklas separat och kostnadseffektivt tills teknisk integration är motiverad.

## 9. Arbetssätt och godkännandekriterier

**Förslag → konsekvensbedömning → avgränsad PR → test (inkl. regression) → användargodkännande → publicering.**

Varje PR ska ange syfte, berörda vyer, beroenden, testpunkter och vilka godkända funktioner som uttryckligen inte ändras. Ingen okontrollerad merge av föråldrade grenar. Korrigera uppkomna regressionsfel före publicering.

En etapp är klar först när användaren förstår dess funktion, dess samband med andra vyer fungerar, innehållet är intakt, dator/mobil är testade, och användaren har godkänt.

## 10. Prioriterad utvecklingsplan

1. **Fastställ detta styrdokument och inventera gamla flikar**, funktioner, postlänkar och befintliga designdubbletter. Inventeringen föregår borttagning.
2. **Bygg en gemensam navigations- och kontextmodell** samt konkreta designspecifikationer för snabbfönster/full forskningsvy.
3. **Färdigställ Fördjupa** med C6/C7-underlaget. Testa särskilt läsflöden, forskningsstatus och källor.
4. **Integrera Karta, Temaspår och Jämför**, så att val av post/period/område kan följas mellan vyerna.
5. **Utveckla gemensam sökning och filterlogik** samt genomför kontrollerad migrering till *Idéer & kunskap*.
6. När helhetsdesignen är stabil: återuppta köade visualiseringar om **Himmel och Helvete**, **Frikyrkans framväxt** och **Astrologi**.

## 11. Öppna frågor som kräver eget beslut

- Exakt responsiv layout och interaktion för snabbfönster respektive full forskningsvy.
- Hur långt gemensamma filter ska delas och när de bör nollställas.
- Precis mappning av äldre flikar och gamla kategorier till de sex navigationsvalen.
- Hur historiska forskningsmetoder ska exponeras utan ett eget femte huvudområde.
- Vilka relationstyper som ska kunna redigeras, granskas och visualiseras.

## 12. Beslutsfrågor för varje framtida ändring

1. Gör förändringen Väven lättare att upptäcka, förstå och använda?
2. Synliggör den verkliga samband utan att överdriva beläggen?
3. Hjälper den användaren att ifrågasätta invanda föreställningar respektfullt, utan att styra mot en på förhand given trosuppfattning?
4. Följer den gemensamt designsystem, informationsmodell och navigation?
5. Bevarar den redan godkänd funktionalitet och spårbar vetenskaplig kvalitet?

> **Ledstjärna:** Väven ska inte tala om *vad* människan måste tro. Den ska hjälpa henne att förstå *varför* hon tror som hon gör, vilka historiska perspektiv som finns, och hur väl olika påståenden kan underbyggas.
