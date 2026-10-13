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
 H023:[
 ["Forskningsrapport V8.33 – källkontroll 06","https://github.com/Bjorne-web/tidens-vav/blob/v8.33-forskningskvalitet/docs/V8_33_KALLKONTROLL_06.md"]
 ]
};
for(const [id,refs] of Object.entries(references)){if(research[id]){const previous=research[id].sources||[];research[id].sources=[...previous.filter(s=>!String(s[1]||"").includes("bibleodyssey.org/")), ...refs];}}
if(research.H020)research.H020.caution="Intervallet för Genesis 1–11 visar en omdiskuterad kompositions-/redaktionsmodell. Äldre motiv och senare handskriftsvittnen har andra tidsnivåer; ingen verifierad datering av Noas flod kan härledas.";
if(research.H025)research.H025.caution="Datera Väktarboken och övriga Henokskrifter var för sig. Qumrans arameiska fragment och senare grekiska/etiopiska handskrifter är skilda textvittnen och får inte ges samma datering.";
})();
