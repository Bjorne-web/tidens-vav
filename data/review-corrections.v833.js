// V8.33 – spårbara, källkontrollerade preciseringar före appens initiering.
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
 ["Forskningsrapport V8.33 – källkontroll 06","https://github.com/Bjorne-web/tidens-vav/blob/v8.33-forskningskvalitet/docs/V8_33_KALLKONTROLL_06.md"]
 ]
};
for(const [id,refs] of Object.entries(references)){if(research[id]){const previous=research[id].sources||[];research[id].sources=[...previous.filter(s=>!String(s[1]||"").includes("bibleodyssey.org/")), ...refs];}}
// External references are displayed only when a research dossier exists in the base model.
if(!research.H009)research.H009={overview:"Amarnabreven visar egyptiskt beroende stadsfurstar i Levanten på 1300-talet f.Kr.",parallels:"Breven belägger senbronsålderns diplomatiska och politiska miljö, inte Bibelns erövringsberättelser.",caution:"Brevens datering är inte en datering av hela senbronsåldern eller av Israels framväxt.",sources:references.H009};
if(!research.H017)research.H017={overview:"Kyroscylindern är kunglig babylonisk legitimeringsretorik efter Kyros erövring av Babylon 539 f.Kr.",parallels:"Esra 1 skildrar ett judeiskt återvändande, men cylindern nämner inte uttryckligen Jerusalem eller judarna.",caution:"Direkt dokumentation av återvändandet måste sökas i andra källor.",sources:references.H017};
if(!research.H037)research.H037={overview:"Amarnabrev från levantinska stadsfurstar dokumenterar politiska kontakter med Egypten under 1300-talet f.Kr.",parallels:"Brevens historiska miljö kan jämföras med, men styrker inte, senare bibliska historieberättelser.",caution:"Ett enskilt textvittne eller tidsskikt belägger inte hela den angivna perioden.",sources:references.H037};
if(!research.H042)research.H042={overview:"Taylorprismat skrevs cirka 691 f.Kr. och återger Sanheribs framställning av 701 års fälttåg och tribut från Hiskia.",parallels:"Jämför 2 Kung 18–19 och Jes 36–37 utan att likställa politisk självframställning med en neutral krönika.",caution:"Händelsens år 701 och det bevarade prismats datering cirka 691 f.Kr. är olika.",sources:references.H042};
if(research.H020)research.H020.caution="Intervallet för Genesis 1–11 visar en omdiskuterad kompositions-/redaktionsmodell. Äldre motiv och senare handskriftsvittnen har andra tidsnivåer; ingen verifierad datering av Noas flod kan härledas.";
if(research.H025)research.H025.caution="Datera Väktarboken och övriga Henokskrifter var för sig. Qumrans arameiska fragment och senare grekiska/etiopiska handskrifter är skilda textvittnen och får inte ges samma datering.";
})();
