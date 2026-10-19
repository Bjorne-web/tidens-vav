# C7 – fullständig registerinventering 2026-10-19

Underlag: publicerad `main` efter godkänd PR #112 (commit `80a1e24d`). Inventeringen räknar **unika post-ID:n i sex kanoniska tidslinje-/bokserier**, inte varje tidslinjes återgivna händelse eller varje käll-/temavärdering. Detaljer i forskningshubbar är separata och ska kartläggas som tematiska fördjupningar, inte dupliceras till nya ID utan behov. 

## Registertäckning

| Register | Totalt | Individuell C7 (ordinarie+separat nihilism) | Saknar samma C7-standard |
|---|---:|---:|---:|
| H001–H064 ursprunglig historia | 64 | 64 | 0 |
| H065–H069 kompletterande forskning | 5 | 5 | 0 |
| H070–H075 nihilism (egen C7-modul) | 6 | 6 | 0 |
| O001–O130, 129 faktiskt existerande ID | 129 | 4 | 125 |
| B001–B066 kanoniska böcker | 66 | 32 | 34 |
| D001–D011 apokryfiska bokposter | 11 | 0 i ordinarie C7; **11 har redan separat individuellt impact-avsnitt** | 11 formmässigt, inte innehållslöst |
| AP001–AP006 tematiska apokryfposter | 6 | 0 i ordinarie C7; befintliga korttexter finns | 6 formmässigt |
| **Totalt** | **287** | **111** | **176** |

*Observera*: Av de 111 C7-analyserna är 105 i `data/c7-religionshistorisk-betydelse.v890–v8107.js` och 6 i `data/c7-nihilism.v892.js`. De 11 D-bokposterna har redan individuella separata `impact`-texter och kan i första hand behöva kvalitetsanpassning och reader-integration. Siffran **176** är därför återstående poster för enhetlig C7-standard, inte 176 poster helt utan kunskapstext. C6:s slutgranskning är separat.

## Saknade O-poster efter kategori (125)

### Folk: 6 poster

- O001: Homo sapiens migration
- O002: Amerikas urfolk
- O003: Indoeuropéer
- O004: Sino-tibetanska folk
- O005: Semitiska folk
- O006: Bantu-expansionen

### Människans utveckling: 16 poster

- O007: ”Lucy”. Gick upprätt, små hjärnor, levde i Östafrika.
- O008: Första tydliga stenverktygen (Oldowan). Ökande hjärnvolym.
- O009: Första art som lämnar Afrika. Eldkontroll, avancerad kultur.
- O010: Förfader till neandertalare och moderna människor.
- O011: Anpassade för kyla, begravningar, verktyg, symboler.
- O012: Tidiga fynd i Marocko och Etiopien. Anatomiskt moderna.
- O013: Stora migrationen ut ur Afrika.
- O014: Grottmålningar i Europa, avancerad symbolik.
- O015: Jordbruk, bosättning, domesticering av djur.
- O016: Metallurgi, hjul, skriftens uppkomst.
- O017: Stadsbyggare, kilskrift, bevattningssystem.
- O018: Järnvapen, storskaliga arméer.
- O019: Antikens filosofer, matematiker och vetenskapsmän.
- O020: Feodalism, kyrkans makt, medeltida samhällen.
- O021: Fabriker, ångmaskin, urbanisering.
- O022: Digitalisering, globalisering, rymdålder.

### Religion: 11 poster

- O023: Förhistorisk religion
- O024: Mesopotamiska religioner (Sumer, Babylon, Assyrien)
- O025: Egyptisk religion
- O026: Judendom
- O030: Zoroastrism
- O031: Hinduism (vedisk)
- O032: Buddhism
- O033: Konfucianism/Daoism
- O034: Kristendom
- O035: Hinduism (klassisk)
- O036: Islam

### Civilisation: 11 poster

- O037: Mesopotamien
- O038: Egypten
- O039: Induskulturen
- O040: Akkadiska riket
- O041: Kina (dynastier)
- O042: Grekland antiken
- O043: Persiska imperier
- O044: Romarriket
- O045: Bysans
- O046: Europa (medeltid)
- O047: Europa (modern tid)

### Krig: 7 poster

- O048: Peloponnesiska kriget
- O049: Puniska krigen
- O050: Hundraårskriget
- O051: Trettioåriga kriget
- O052: Amerikanska inbördeskriget
- O053: Första världskriget
- O054: Andra världskriget

### Byggnadsverk: 11 poster

- O055: Cheopspyramiden
- O056: Kolossen på Rhodos
- O057: Kinesiska muren
- O058: Colosseum (Rom)
- O059: Hagia Sofia
- O060: Taj Mahal
- O061: Göbekli Tepe (Turkiet)
- O062: Baalbek (Libanon)
- O063: Puma Punku (Bolivia)
- O064: Nan Madol (Mikronesien)
- O065: Longyou Caves (Kina)

### Konflikterande berättelser: 27 poster

- O067: Gilgamesheposet – flodberättelsen
- O068: Atrahasis – flodberättelsen
- O069: Enuma Elish – kosmisk skapelse
- O070: Sumerisk skapelse/myt om människans skapelse av lera
- O071: Egyptiska skapelsemyter
- O072: Adapa – förlorad odödlighet
- O073: Sargon av Akkad – barnet i korg
- O074: Tammuz/Dumuzi – död & återuppståndelse
- O075: Osiris – död & återuppståndelse
- O077: Adonis – död & återkomst
- O078: Mithras – frälsare, måltid, uppståndelse
- O079: Hammurabis lag – gudomlig lag på tavlor
- O080: Fornorientaliska förbundsformer
- O081: Horus – gudason med mirakelfödsel
- O082: Herkules/Herakles – gudason, frälsare
- O083: Perseus – jungfrufödsel
- O084: Dionysos – gudason, följeslagare, måltid
- O085: Dionysos och 12 följeslagare
- O086: Herkules – 12 arbeten (hjältecykel)
- O087: Zoroastrism – kosmisk kamp, domedag
- O088: Mithraskult – rituell måltid
- O089: Dionysiska mysterier – vin som blod
- O090: Egyptisk visdom – Amenemope
- O091: Babylonisk teodicidialog (jfr Job)
- O092: Ninurta/Oannes – hjälte i “fisken”
- O093: Babel/Ziggurat-motiv
- O094: Samsons hjältemotiv (jfr Herkules)

### Bibelberättelser: 36 poster

- O095: Babylonisk exil/återvändande
- O096: Babylonisk exil/återvändande
- O097: Babylonisk exil
- O098: Babylonisk exil
- O099: Babylonisk exil
- O100: Babylonisk exil
- O101: Babylonisk exil
- O102: Exil/Post-exil, national identitet
- O103: Exil/Post-exil
- O104: Exil/Post-exil
- O105: Exil/Post-exil
- O106: Exil/Post-exil
- O107: Exil/Post-exil
- O108: Exil/Post-exil
- O109: Exil/Post-exil
- O110: Exil/Post-exil
- O111: Exil/Post-exil
- O112: Exil/Post-exil
- O113: Post-exil, tempel 2 byggs
- O114: Post-exil
- O115: Post-exil
- O116: Seleukidiskt förtryck
- O117: Persiskt styre, religiös reform
- O118: Diaspora-identitet
- O119: Visdom, teologi utvecklas
- O120: Tempelkult, redaktion
- O121: Post-exil, hellenism
- O122: Post-exil, universalism
- O123: Självstyre (Hasmonéer)
- O124: Romersk ockupation, förföljelse
- O125: Tempel förstört, diaspora
- O126: Post-70 kris
- O127: Förföljelse, diaspora
- O128: Förföljelse, teologi
- O129: Romersk krigföring
- O130: Kejsarkult & förföljelse

## Kanoniska bibelböcker utan ordinarie C7 (34)

- B006: Josua
- B007: Domarboken
- B008: Rut
- B009: Första Samuelsboken
- B010: Andra Samuelsboken
- B011: Första Kungaboken
- B012: Andra Kungaboken
- B013: Första Krönikeboken
- B014: Andra Krönikeboken
- B015: Esra
- B016: Nehemja
- B017: Ester
- B018: Job
- B019: Psaltaren
- B020: Ordspråksboken
- B021: Predikaren
- B022: Höga visan
- B023: Jesaja
- B024: Jeremia
- B025: Klagovisorna
- B026: Hesekiel
- B027: Daniel
- B028: Hosea
- B029: Joel
- B030: Amos
- B031: Obadja
- B032: Jona
- B033: Mika
- B034: Nahum
- B035: Habackuk
- B036: Sefanja
- B037: Haggai
- B038: Sakarja
- B039: Malaki

## Apokryfiska bokposter som har separat individuell impact-text (11)

D001–D011. Dessa är historiskt-kritiska redaktionella utkast i `data/apocrypha-books-v891.js`, inte tomma. Kontrollera, fördjupa och harmonisera mot C7:s gemensamma sidopanelsstandard i stället för att duplicera innehållet.

## Apokryfernas sex tematiska poster

AP001–AP006 i `data/apokryfer-granskning3.v888.js`. Separata från D001–D011. Metodgranska källor och omfattning, därefter ge enhetlig C7-visning där varje ID behålls.

## Åtgärdsordning

1. **B006–B039, 34 GT-böcker.** Slutför bibelböckernas individuella forskningspresentationer i 5–6 tydligt avgränsade omgångar. Pröva språk-, text-, och redaktionshistoria och jämför med redan färdiga B001–B005 och NT B040–B066.
2. **O067–O094 (27 saknade), konkurrerande berättelser.** Hög prioritet eftersom dessa jämförelser är centrala för projektets syfte. Viktigt att undvika påhittade historiska lån samt korrigera svepande jämförelser av till exempel Mithras och Jesus.
3. **O023–O036 (11 saknade), religionshistoriska översikter.** Individuella utkast med dokumenterade källor och kontakthistoriska begränsningar.
4. **O095–O130 (36 saknade), bibelberättelser och redaktion.** Kontrollera först semantisk dubbletthantering mot B-seriens 66 bibelböcker och H-seriens 64 historia-poster. Bevara post-ID och länkar; inte automatiskt slå samman.
5. **D001–D011, AP001–AP006 (17).** Återanvänd och fördjupa befintliga texter; testa läsfönster före merge.
6. **Övriga O001–O022, O037–O065 (51).** Prioritera faktisk biblisk relevans; kategorierna inkluderar världs- och naturhistoria där samband måste beskrivas som jämförande bakgrund, inte konstrueras.

## Regler för fortsatt arbete

- C7-täckning betyder individuell läsbar forskningsanalys under rätt betydelserubrik, inte C6-slutgranskning.
- Prioritera arkeologiska/kritiska primärkällor, starka sekundärkällor och tydliga källbegränsningar.
- Bevara ID:n, grunddateringar och användarens godkända layout. Separata PR:ar och manuellt testgodkännande före publicering.
- Registrera genomförd status automatiskt från samtliga aktiva datamoduler och räkna **unik ID-täckning**, inte antalet rader i enskilda filer.
- Existerande O095–O130 innehåller många likalydande etiketter; komplettera även den underliggande datakvalitetsinventeringen utan att radera poster utan beslut.
