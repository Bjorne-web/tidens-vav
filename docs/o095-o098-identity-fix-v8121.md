# Rättning av identitetskollision O095–O098 · v8.121

Styrdokument v1.1: samma ID måste avse samma forskningspost i sök, läsfönster, tidslinje och Temaspår.

**Verifierad orsak:** `originalEvents` har O095 Skapelsen, O096 Syndafallet, O097 Noas ark och O098 Babels torn i beskrivningsfältet, men importerad historisk miljö som synlig titel. `editorialChronologyV817` och `allOriginalResearchV828` återanvände O096 för Judas deportationer och O098 för persiskt återvändande.

**Teständring:** `data/o095-o098-identity-fix.v8121.js` laddas efter `data/data.generated.js`, före `app.js` och vyerna. Rättar de fyra synliga originaltitlarna enligt ämnet och återställer individuella läsfönsterstexter med försiktig datering och källor. Exil och persiskt återvändande tas bort från de två *felmärkta* tidsserieplatserna, men deras kompletta källuppgifter och ursprungliga forskningsdossierer bevaras i `window.TIDENS_O_IDENTITY_AUDIT` i testversionen. De ska granskas mot befintliga separata historiska poster och få rätt kanonisk identitet i en senare godkänd migration. O095 och O097:s faktagranskade textkompositionsposter bibehålls.

**Avgränsning:** Ingen historisk datering, C6-status eller biblisk primärtext ändras. `data/data.generated.js` förblir genererad och oförändrad. PR #136 (C7-analys av dessa ID) avvaktar integrering; ingen ändring till PR #134 eller #135.

**Testpunkter:** (1) global sökning O095–O098 hittar rätt berättelse; (2) läsfönstrets titel och sammanfattning stämmer med ID; (3) Temaspårs utgångspost visar samma rubrik och markerar inte importerad datering som vetenskapligt fastställd; (4) inte längre O096 deportationer eller O098 persiskt återvändande i tidslinjen under fel ID; (5) befintlig exilkronologi är bevarad för framtida korrekt ID-mappning; (6) regression H045, O067, B039, andra O-poster; (7) dator och mobil.

**Viktigt:** Kontrollera all UI i förhandsversion innan godkännande. Efterföljande kodgenerering av `data/data.generated.js` ska behålla den separata identitetskorrigeringens scriptposition eller migrera principen till källmodellen.
