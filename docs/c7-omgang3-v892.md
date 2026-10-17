# C7 – religionshistorisk fördjupning, omgång 3 (V8.92)

**Datum:** 2026-10-17  
**Status:** Testgren, inte publicerad.  
**Gren:** `c7-religionshistoria-omgang3-20261017`.  
**Utgångspunkt:** Godkänd och sammanslagen C7 omgång 2, PR #81, `main` SHA `91c43fa`.

## Varför

Omgång 3 knyter ihop järnålderns politiska och religiösa historia med utvecklingen genom persisk och hellenistisk tid till rabbinsk judendom. Delmålet är att visa **hur föreställningar, texttraditioner och institutioner faktiskt förändrades** utan att fastställa för direkta beroenden.

## Nio nya analyser

| ID | Ämne | Viktig källbegränsning |
|---|---|---|
| H012 | Järnålderns bosättningar i höglandet | Keramik- och bebyggelsemönster är inte entydiga etiketter för etnicitet eller religion |
| H013 | David och Salomo | Tel Dan nämner dynastin yngre tid; rikets storlek är omstridd |
| H014 | Nordriket Israel och Juda | Kultisk mångfald; `asherah` är omstritt mellan gudinna och kultföremål |
| H015 | Samarias fall | Fördelningen mellan Salmanassar V och Sargon II bör inte förenklas |
| H018 | Andra templets återuppbyggnad | Esra/Haggai är centrala vittnen; synagogans exakta ursprung obelagt |
| H022 | Alexander och hellenismen | Grekiskt språkbruk ≠ automatiskt direkt teologiskt lån |
| H032 | Templet förstörs år 70 | Ingen omedelbar skiljelinje eller historiskt belagt Javne-kanonmöte |
| O029 | Rabbinsk judendom | Rabbinernas samhälleliga dominans växte fram gradvis |
| O076 | Baal, död och återkomst | Ingen direkt bevisad beroendekedja till kristen uppståndelsetro |

## Vetenskaplig metod

För varje post anges en individuell slutsats om säkerhetsgrad, en sammanhängande religionshistorisk fördjupning och 2–3 sökbara, identifierade källor med direkta länkar. Antika textställen inkluderas som klickbara läsvägar där det är relevant. Texter från Sefaria och forskningsartiklar är **olika källtyper**: den antika texten belägger sin egen formulering, medan modern forskning behövs för dateringar och beroendemodeller.

Särskilt jämförelsematerial:
- Israel Finkelstein om höglandsbosättningar och kronologi.
- The Jewish Museum och Tel Dan-stelen om `Davids hus`.
- Forskningsstudier om Kuntillet Ajrud, inklusive skiljaktiga Asheratolkningar.
- Na’aman och assyriska källor om Samarias fall.
- Cambridge History of Judaism om templet, rabbinerna och utvecklingen efter år 70.
- Oxford Academic (Smith, Law, Grabbe) om Baal och hellenistisk judendom.

### Notering om rubriker

O029 är redan i importerade data benämnd ”Judendom” med underrubriken ”Rabbinsk judendom”; religionshistorisk analys gör detta explicit utan att skriva över ID eller originaltitel. O076 har importerad rubrik ”Baal – död & återkomst”; C7 förtydligar att generell kategori ”döende och uppstående gudar” är omstridd. Inga nya händelsepost-ID:n skapas.

## Genomförande

- Ny `data/c7-religionshistorisk-betydelse.v892.js` inläst efter v890/v891 och före läsarpanel.
- 9 ytterligare poster gör att **minst 25** poster har en särskild C7-text räknat på C7:s två föregående omgångar. Dessutom har H066–H069 tillkommit genom parallella godkända uppdateringar på `main`; i sammanslagen Preview väntas därför **29** individuella C7-texter.
- C6-granskningsstatus, dateringar, historiska grunddata, kartor och tidigare källmaterial lämnas oförändrade.
- Ingen C7-text räknas som **fullständig vetenskaplig slutgranskning**.

## Test

1. `node tests/smoke-c7-v892.mjs` och tidigare C7-kontroller.
2. GitHub Actions hela statiska kontrollsviten.
3. Cloudflare Preview: H012, H013, H014, H015, H018, H022, H032, O029, O076.
4. Kontrollera särskilt H014:s två möjliga Asheratolkningar, O076:s restriktiva slutsats om uppståndelse, H032/O029 om templets förstörelse och rabbinsk utveckling.
5. Äldre C7-poster H065 och B001 ska fortsatt fungera; parallellt införda H066–H069 ska bevaras; H001 ska fortsatt sakna intetsägande standardskrivning.
6. Kontrollera öppning via direktlänk, mobil, källänkar, sökning och Temaspår.

**Publicering på main först efter användarens testgodkännande.**
