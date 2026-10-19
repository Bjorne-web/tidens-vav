# C7 kontrollinventering av importerade O095–O130

**Status:** analys och förslag, inte innehållsmigrering. Baseras på faktiska `originalEvents` i `data/data.generated.js` på `main`, 2026-10-19. Följer styrdokument v1.1: en kanonisk kunskapsbas, stabila post-ID, åtskillnad mellan belagd historia, textdatering och berättad tid.

## Varför omgången måste granskas före C7-texter

O095–O130 utgör **36 poster** med kategorin `Bibelberättelser`. I dessa anges ofta en **tillkomst- eller tolkningsmiljö i `title`**, medan den bibliska berättelsen eller bibelboken ligger i `description`. Exempel: O095 har titeln ”Babylonisk exil/återvändande” och beskrivningen ”Skapelsen”; O096 har samma titel men ”Syndafallet”; O097 heter ”Babylonisk exil” men beskriver ”Noas ark”. Detta är en systematisk semantisk kollision, inte bara duplicerade rubriker.

Om C7 bygger en vanlig post om ”Babylonisk exil” av O095 utan att hantera `description` kan posten presentera skapelseberättelsens tillkomst som om en enskild historisk händelse under exilen vore fastställd. Samma risk gäller många efterföljande poster. O124–O130 kombinerar nytestamentliga ämnen med komplexa romerska miljöetiketter. Ingen automatisk massomskrivning bör ske.

## Grupper i källregistret

| ID | Berättelse/ämne i befintligt beskrivningsfält | Title-fältets historiska etikett |
|---|---|---|
| O095–O098 | Skapelsen; Syndafallet; Noas ark; Babels torn | Babylonisk exil/återvändande eller Babylonisk exil |
| O099–O101 | Abraham; Isak & Jakob; Josef i Egypten | Babylonisk exil |
| O102–O106 | Mose/uttåget; Sinai & Lagen; Ökenvandringen; Josuas erövringar; Domartiden | Exil/Post-exil eller exil/post-exil/nationell identitet |
| O107–O112 | Saul; David & Goliat; Salomos tempel; rikets delning; Elia/Elisha; assyrisk erövring | Exil/Post-exil |
| O113–O122 | Jesaja; Jeremia; Babyloniska exilen; Daniel i lejongropen; hemvändande och andra templet; Ester; Job; Psalmer; Ordspråksboken; Jona | Blandade efterexil-, seleukid-, perser-, diaspora-, visdoms- och tempelrelaterade etiketter |
| O123–O130 | Makkaberupproret; Jesus föds; Jesu tjänst; korsfästelsen; församlingens födelse; Paulus brev; Jerusalems förstörelse; Uppenbarelseboken | Hasmonéer och olika romerska/påföljande miljöetiketter |

## Föreslagen redaktionell och teknisk hantering

1. **Frys befintliga ID och registrera i en separat, granskningsbar mappning** `O-ID → faktiskt bibliskt ämne (description) → hypotes om redaktionell miljö (title) → eventuell befintlig kanonisk H-/B-/AP-post`. Koppla bara där identiteten är prövad. Ändra inte källregistret i denna audit.
2. **Skilj berättad tidsnivå, textens uppkomst, återgivning/komposition, redaktion och senare reception.** Etiketten ”Babylonisk exil” får inte bli en okvalificerad datering av hela Skapelsen eller berättelserna om patriarkerna.
3. **Hantering i framtida läsfönster:** visningsrubrik bör fånga berättelseämnet utan att kasta bort originaletiketten eller identifieraren. Redovisa titel-/beskrivningskonflikten och evidensstatus tydligt; lösning kräver eget design-/datamodellbeslut enligt v1.1.
4. **Dubblettprövning före ny C7:** sök befintliga H-, B-, AP- och O-poster. Exempelvis skapelsetexter och Ordspråksboken har redan ämnesrelaterade fördjupningar; detta betyder inte automatiskt att importerade O-poster ska tas bort eller räknas som slutgranskade.
5. **C6 separat:** Inget antagande om arkeologisk säkerhet, vetenskaplig slutgranskning eller exakthet i importerade datum medföljer denna inventering.
6. **Testgrind:** Sök på O095 och se både ”Skapelsen” och dess originaletikett, jämför mot B001, utan sammanblandning; kontrollera motsvarande för O097, O113, O124 och O130. Behåll användarresan sök → läsfönster → frivilligt Temaspår.

## Beslutsförslag

**Tillstyrk att nästa C7-innehållsomgång för O095–O130 föregås av en explicit ID- och betydelsemappning i läsmodellen.** Inga befintliga datum/titlar eller 36 poster ändras utan ett särskilt godkännande. Fokus är att skydda posternas historiska och vetenskapliga betydelse, inte att fylla C7-räknaren med felaktigt relaterade analyser.

**PR #134** omfattar separat O091–O094 och måste bli godkänd av CI före sammanslagning. Denna inventering gör inga ändringar i den PR:n.
