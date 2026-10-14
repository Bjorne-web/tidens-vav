// V8.37 – källkritiska textförtydliganden härledda ur C6-arbetsgrenen.
// De ändrar inte årtal, post-ID eller etiketten för vetenskaplig slutgranskning.
// Ändra aldrig den autogenererade grundfilen direkt. Inga 'reviewed' flaggor sätts.
(function(){
const corrections={
 H019:{description:"Pentateukens textlager och redaktion diskuteras i flera konkurrerande forskningsmodeller. Intervallet visar en möjlig redaktionsmiljö, inte ett säkert kompositionsdatum."},
 H020:{description:"Genesis 1–11 rymmer äldre traditioner och flera möjliga textlager. Det angivna intervallet gäller forskningsmodeller för tillkomst/redaktion, inte en verifierad urhändelse eller ett exakt färdigställande."},
 H021:{description:"Josua–Kungaböckernas deuteronomistiska redaktion förklaras genom olika modeller, däribland exiliska och föreexiliska stadier. Tidsspannet är en rekonstruktion, inte en bevarad daterad handskrift."},
 H023:{description:"De apokalyptiska avsnittens slutform brukar förläggas till Antiochos IV:s tid omkring 160-talet f.Kr. Berättelsernas babyloniska miljö ska inte förväxlas med textens komposition."},
 H024:{description:"Mackabeerupprorets första fas mot seleukidisk politik och tempelkris. Återinvigningen av templet och senare politisk självständighet är skilda historiska händelser."},
 H025:{description:"1 Henok är en samling skrifter med olika tillkomsttider och bevarade textvittnen. Intervallet är en översiktsram, inte en enhetlig bokdatering."},
 H009:{description:"Amarnabreven visar att flera stadsfurstar i Levanten var knutna till Egyptens kung under 1300-talet f.Kr. Belägget gäller politiska förhållanden vid denna tid och styrker inte en senare biblisk erövringsberättelse."},
 H017:{description:"Kyroscylindern ger en babylonisk kunglig framställning av Kyros erövring år 539 f.Kr. Den nämner inte uttryckligen Jerusalem eller judar; återvändandet måste bedömas genom andra källor."},
 H037:{description:"Amarnabreven belägger egyptiskt inflytande över levanteniska stadsfurstar under 1300-talet f.Kr. Brevens vittnesmål gäller en viss period inom sen bronsålder; inte ett enat Israel eller hela perioden."},
 H042:{description:"Sanheribs fälttåg mot Juda år 701 f.Kr. har assyriska textvittnen. Taylorprismat nedtecknades omkring 691 f.Kr. och skildrar tidigare händelser ur kungens eget perspektiv."},
 H034:{description:"Johannesevangeliets slutform dateras ofta till slutet av första eller början av andra århundradet, men dateringen är en forskningsrekonstruktion. P52 kan inte ge ett exakt kompositionsdatum."}
};
for(const e of events){if(corrections[e.id])Object.assign(e,corrections[e.id]);}
const references={
 H019:[[ "Reinhard Müller (2021): Positions on Redaction", "https://academic.oup.com/edited-volume/34227/chapter-abstract/290228469" ]],
 H021:[[ "Thomas Römer (2020): The So-called Deuteronomistic History and Its Theories of Composition", "https://academic.oup.com/edited-volume/34226/chapter-abstract/290218228" ]],
 H024:[[ "Oxford Bibliographies: Maccabean Revolt", "https://academic.oup.com/reference/62341/reference-article-abstract/554105746" ]],
 H034:[[ "Brent Nongbri (2020): Palaeography, Precision and Publicity (P52)", "https://www.cambridge.org/core/journals/new-testament-studies/article/abs/palaeography-precision-and-publicity-further-thoughts-on-pryliii457-p52/1D4E56BF0E9D4DDDA313D0C2754E2F28" ]],
 H020:[
 ["R. Müller (2021), Positions on Redaction – redaktionsmodeller och textvittnen","https://academic.oup.com/edited-volume/34227/chapter-abstract/290228469"],
 ["B. J. Schwartz (2021), The Documentary Hypothesis – litterära argument","https://academic.oup.com/edited-volume/34227/chapter-abstract/290227903"]
 ],
 H025:[
 ["J. C. VanderKam (2011), The Book of Enoch and the Qumran Scrolls","https://academic.oup.com/edited-volume/34366/chapter-abstract/291495493"]
 ],
 H009:[["Metropolitan Museum: Amarnabrev från Abi-milku, Tyros","https://www.metmuseum.org/art/collection/search/544696"]],
 H017:[["British Museum: Kyroscylindern, BM 90920","https://www.britishmuseum.org/collection/object/W_1880-0617-1941"]],
 H037:[["Metropolitan Museum: Amarnabreven och kanaaneiska stadsfurstar","https://www.metmuseum.org/ja/essays/the-amarna-letters"]],
 H042:[["British Museum: Taylorprismat, BM 91032","https://www.britishmuseum.org/collection/object/W_1855-1003-1"]],
 H023:[
 ["Carol Newsom (2010): Daniel – Oxford Bibliographies","https://academic.oup.com/reference/62341/reference-article-abstract/554104979"]
 ]
};
for(const [id,refs] of Object.entries(references)){
 if(!research[id])continue;
 const previous=Array.isArray(research[id].sources)?research[id].sources:[];
 const seen=new Set(previous.map(s=>String(s[1]||'')));
 research[id].sources=[...previous,...refs.filter(r=>!seen.has(String(r[1]||'')))];
}
// External references are displayed only when a research dossier exists in the base model.
if(!research.H009)research.H009={overview:"Amarnabreven visar egyptiskt beroende stadsfurstar i Levanten på 1300-talet f.Kr.",parallels:"Breven belägger senbronsålderns diplomatiska och politiska miljö, inte Bibelns erövringsberättelser.",caution:"Brevens datering är inte en datering av hela senbronsåldern eller av Israels framväxt.",sources:references.H009};
if(!research.H017)research.H017={overview:"Kyroscylindern är kunglig babylonisk legitimeringsretorik efter Kyros erövring av Babylon 539 f.Kr.",parallels:"Esra 1 skildrar ett judeiskt återvändande, men cylindern nämner inte uttryckligen Jerusalem eller judarna.",caution:"Direkt dokumentation av återvändandet måste sökas i andra källor.",sources:references.H017};
if(!research.H037)research.H037={overview:"Amarnabrev från levantinska stadsfurstar dokumenterar politiska kontakter med Egypten under 1300-talet f.Kr.",parallels:"Brevens historiska miljö kan jämföras med, men styrker inte, senare bibliska historieberättelser.",caution:"Ett enskilt textvittne eller tidsskikt belägger inte hela den angivna perioden.",sources:references.H037};
if(!research.H042)research.H042={overview:"Taylorprismat skrevs cirka 691 f.Kr. och återger Sanheribs framställning av 701 års fälttåg och tribut från Hiskia.",parallels:"Jämför 2 Kung 18–19 och Jes 36–37 utan att likställa politisk självframställning med en neutral krönika.",caution:"Händelsens år 701 och det bevarade prismats datering cirka 691 f.Kr. är olika.",sources:references.H042};
// Lägg till ett sakligt forskningskort där grunddatan ännu saknar eget underlag.
// Post-ID, årtal, kategori och äldre källor i andra kort förblir intakta.
const newDossiers={
 H019:{
  overview:"Pentateukens sammansättning är föremål för skilda dokument-, tilläggs- och redaktionsmodeller. Det angivna intervallet är en övergripande forskningsram, inte en daterad handskrift.",
  parallels:"Texters berättade tid, föreslagna textlager och bevarade manuskript ska hållas isär.",
  caution:"Ett enskilt slutdatum för hela Pentateuken är inte säkert historiskt fastställt.",
  sources:references.H019
 },
 H021:{
  overview:"Josua–Kungaböckernas deuteronomistiska bearbetning diskuteras inom flera modeller, från föreexiliska till exiliska och efterexiliska stadier.",
  parallels:"Jämför Noths exiliska modell, Cross josianska redaktion och Smends flerskiktsmodell som olika forskningspositioner.",
  caution:"Ett sammanhållet historieverk av en enda författare är en omstridd rekonstruktion, inte en bevarad författarsignatur.",
  sources:references.H021
 },
 H024:{
  overview:"Det mackabeiska upprorets inledande fas började under Antiochos IV. Återinvigningen av Jerusalems tempel dateras ofta till 164 f.Kr.; självständigheten följde senare.",
  parallels:"Skilj religiös omorganisation, återupptaget tempelbruk och politiska förändringar.",
  caution:"Postens intervall ska inte läsas som att självständigheten var uppnådd när templet återinvigdes.",
  sources:references.H024
 },
 H034:{
  overview:"Johannesevangeliets komposition och slutredaktion dateras i forskning med hjälp av litterära och historiska argument. P52 är ett senare bevarat fragment.",
  parallels:"P52 är ett manuskriptvittne; dess paleografiska datering är inte kompositionstid för Johannesevangeliet.",
  caution:"P52:s handstilsdatering medger större osäkerhet än en exakt placering omkring 125 e.Kr. Det ger inte ett säkert slutdatum för evangeliets komposition.",
  sources:references.H034
 }
};
for(const [id,dossier] of Object.entries(newDossiers)){if(!research[id])research[id]=dossier;}
if(research.H020)research.H020.caution="Intervallet för Genesis 1–11 visar en omdiskuterad kompositions-/redaktionsmodell. Äldre motiv och senare handskriftsvittnen har andra tidsnivåer; ingen verifierad datering av Noas flod kan härledas.";
if(research.H025)research.H025.caution="Datera Väktarboken och övriga Henokskrifter var för sig. Qumrans arameiska fragment och senare grekiska/etiopiska handskrifter är skilda textvittnen och får inte ges samma datering.";
// Logga enbart införandet av begränsade textförtydliganden.
// Dessa får aldrig förväxlas med journalens godkända sakpåståenden.
const h011=events.find(e=>e.id==='H011');if(h011){h011.description='Merneptahs egyptiska segerinskrift omkring 1207 f.Kr. nämner Israel i Kanaan. Namnformen är belagd, men textens militära anspråk och gruppens ursprung är inte därmed verifierade.';h011.bible='';h011.source='Merneptahstelen JE 31408; UCL Digital Egypt; Hasel (1994).';}
window.TIDENS_C6_CORRECTIONS=Object.freeze({schemaVersion:1,appliedIds:Object.freeze(Object.keys(corrections)),source:'v8.33-forskningskvalitet – C6',status:'text clarification, not full scientific review'});
})();
