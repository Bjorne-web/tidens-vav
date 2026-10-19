# Funktionstest – läsmodell i PR #128

**Teststatus 2026-10-19:** isolerat JavaScript-körtest klart; verklig webbläsare i Cloudflare Preview återstår.

## Utfört körtest (ärligt avgränsat)

Läsmodellens JavaScript kördes i ett isolerat JavaScript-runtime mot de faktiska oförändrade bokregistren och test-försedda historiska postobjekt. Miljön saknar webbläsarens inbyggda `URL`; en enkel HTTPS/HTTP URL-klass användes enbart i körtestet.

- **B001**: hittad; `bible-book`; källkritisk introduktion, textens tillkomsttyp och berättad tid kan läsas.
- **D001**: hittad; `apocrypha-book`; två källänkar registrerade och deduplicerade, textens tillkomsttyp kan läsas.
- **H045 (testdubbel)**: hittad; `historical`; sammanfattning och källa från simulerat specialforskningslager kan läsas.
- **H005 (testdubbel)**: hittad utan fyllig beskrivning när inga forskningslager tillförs; korrekt utan att fabricera innehåll.
- **AP001 (testdubbel)**: saknas när objektet inte förekommer i data som simulerats. **Inte belägg för fel i riktiga appens AP001-data.**

## Att testa mot riktiga data i Preview

Öppna **`/tests/read-model-smoke.html`** på PR-preview. Den laddar originalappen i en iframe och testar direkt läsmodellen för H005, H045, B001, D001, AP001 och O067. Tabellen rapporterar vilka data som hittades och om källor och sammanfattning finns. En rad utan källor kan vara korrekt för vissa bokregister; jämför med den faktiska läsaren.

Kontrollera därefter utan testsidan i vanlig app:
1. Tidslinje och panorering är oförändrade.
2. Öppna H045 och O067. Kontrollera religionshistorisk betydelse och källhänvisningar mot befintlig panel.
3. Öppna B001 respektive D001. Kontrollera att berättad tid inte felpresenteras som textens tillkomst.
4. Temaspår, Karta och Jämför fungerar oförändrat.
5. Kontrollera att inga konsolfel inträffar.

**Inga synliga UI-ändringar är avsiktligt införda i pilotens vanliga vy.**

## Beslutsgräns

PR #128 ska inte slås samman förrän riktiga historiska poster, relevanta C7-texter och regressionspunkterna har godkänts. Körtestet ovan är *inte* en fullständig end-to-end-verifiering.

## Komplettering 2026-10-19: verkliga AP-data

Ett isolerat JavaScript-körtest har körts med **faktiskt innehåll från `data/apokryfer-granskning3.v888.js`** (sex `AP001–AP006`-poster), det riktiga `research`-objekt som källfilen registrerar, den aktuella adapterkoden samt de oförändrade 66 bibelböckerna och 11 apokryfiska bokposterna.

**Resultat:** AP001–AP006 har alla `found=true`, `hasSummary=true` och `hasSources=true`. B001 klassificeras som `bible-book`; D001 klassificeras som `apocrypha-book` med tillgängliga källor och tidstyp.

Den automatiserade kontrollen finns som `tests/read-model-real-data.cjs` och kan återköras med `node tests/read-model-real-data.cjs`. Detta verifierar datakontraktet, inte sidopanelens visuella beteende eller befintliga navigationsflöden i en verklig webbläsare.
