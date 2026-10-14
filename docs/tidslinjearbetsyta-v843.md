# V8.43 – ombyggd tidslinjearbetsyta

## Utgångspunkt
Användarens **Uppdateringsförslag V8.42.docx**, en sida med skiss, innehåller tre ändringspunkter:
1. Vänsterpanelen ska vara så pass bred att kategorinamn inte radbryts. Förslagsvis kortare namn med samma innebörd.
2. **Ordning**, **Flytta i tiden** och tidsskalan ska ligga kvar när man scrollar ned genom tidslinjen.
3. Allt övrigt innehåll som tidigare låg ovanför själva tidslinjen ska flyttas till **under tidslinjen**.

## Kategorinamnen i vänsterpanelen
Kategorins **interna ID är oförändrat**. Ändringen berör enbart den korta visningsetiketten i filterpanelen. Fullständig betydelse finns i etikettens hjälptext (title/aria-label).

| Fullt tidigare namn | Kort synligt namn |
|---|---|
| Världshistoria | Världshistoria |
| Religion & texter | Religion & texter |
| Bibelberättelser – berättad tid | Bibelns berättade tid |
| Textens tillkomst | Textens tillkomst |
| Arkeologi | Arkeologi |
| Folk | Folk |
| Människans utveckling | Människans utveckling |
| Civilisationer och historiska riken | Civilisationer & riken |
| Religioner | Religioner |
| Byggnadsverk och byggnadsfaser | Byggnadsverk & faser |
| Krig och separata konflikter | Krig & konflikter |
| Historiska och religiösa berättelser | Historiska & religiösa berättelser |
| Bibeltexter och berättelser · olika tidstyper | Bibeltexter · olika tidstyper |

På datorer blir filterkolumnen cirka **345 px** bred (>1200 px fönster), respektive **330 px** bred mellan 901–1200 px. Vid mobilbredd förblir filtermenyn utfällbar; kompakta kategorinamn kan radbrytas som tillgänglighetsreserv för mycket smala skärmar.

## Ny arbetsordning på sidan Tidslinje

### Fasta kontroller (sticky)
En gemensam, sammanhållen yta innehåller:
- **Ordning**, tidsperiod och växlingen **Översikt / Detaljerad tidslinje**, med befintliga expandera/fäll ihop-knappar.
- **Flytta i tiden** med pilknappar och det befintliga panoreringsreglaget.
- **Tidsskalan** med dess befintliga genererade tickmarkeringar.

Kontrollpanelen använder `position: sticky` och fäster under webbplatsens huvudnavigering på desktop. På mobil är den kompakt och fäster i visningsytans överkant, utan att ändra perioder eller panoreringslogik.

### Därefter
Själva **tidslinjen**, med alla dess tidsfaser, kategorirader och händelsekort.

### Efter tidslinjen
Allt annat befintligt material, inklusive övriga verktyg, introduktionsrutor, metodbeskrivningar, legends, datumsäkerhet och sammanfattning om olika tidsperspektiv. Dessa flyttas utan att tas bort eller ändras innehållsligt.

## Vad som inte ändras
- Inga forskningsposter, original-ID:n, textbeskrivningar eller årtal.
- Ingen Temaspårskod eller de sex förvalda samtidskategorierna.
- Ingen källjournal, granskningsstatus eller sidopanelsstruktur för valda läsposter.
- Ingen ändring av kategoriernas faktiska `input.value` eller kopplade klickhändelser.
- Ingen ny abonnemangskostnad.

## Tekniska ändringar
- `v843-timeline-workspace.js`: flyttar **befintliga** DOM-noder, kortar endast synlig etikett i kategorifilter, bibehåller tillstånd och eventlyssnare.
- `v843-timeline-workspace.css`: bredare filterkolumn, obrutna kategorirader på desktop, responsiva fasta tidskontroller, motsvarande placering av originalskalan i olika tidslinjelägen.
- `index.html`: länkar de två filerna sist, visar V8.43.
- `tests/smoke-v843.mjs`: kontrollerar fast kontrollordning, tidslinje före äldre texter, 13 ursprungliga kategori-ID:n, bibehållna filtertillstånd, inga duplicerade element och layoutens responsiva regler.
- Samtliga äldre regressionstester körs i GitHub Actions.

## Manuell test i Cloudflare Preview
1. Öppna **Tidslinje** på dator. Kontrollera att kategorierna i vänsterpanelen får plats på en rad.
2. Kontrollera att direkt under den fasta kontrollpanelen visas tidslinjen, **inte** tidigare introduktions- eller metodtexter.
3. Scrolla ned i tidslinjen: **Ordning, Flytta i tiden och tidsskalan** ska vara synliga och användbara. Ändra kategorier, tid och ordning. Kontrollera att tidsskalan fortsätter matcha händelsernas lägen.
4. Testa **Översikt** samt **Detaljerad tidslinje** och kronologisk sortering. Särskilt viktig kontroll: olika tidslinjelägen har delvis olika vänstermarginaler på skalan.
5. Scrolla förbi tidslinjen: introduktions- och metodrutorna ska ligga **under** tidslinjen.
6. Testa mobil: utfällbara filter, sidledes läsning där det behövs och kompakta reglage; kontrollera att övriga gränssnitt inte täcks.
7. Gå till **Temaspår** och öppna exempelvis **Puniska krigen**. Bekräfta att utgångsposten och de samtidiga kategorierna fungerar som tidigare.
8. Öppna valfri posts **sidopanel**, till exempel **Gilgamesheposet**, och kontrollera att V8.42:s ordning med Temaspår/bibeltextlänkar/källgranskning behålls.

### Publicering
V8.43 går bara till Cloudflares förhandsvisning tills användaren uttryckligen har godkänt den. V8.42 är produktionsgrenens godkända version.
