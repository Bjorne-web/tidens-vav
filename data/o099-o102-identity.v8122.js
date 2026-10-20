/* C7 omgång 30: semantisk identitet O099–O102, bibelberättelse är INTE datering. */
(function(){'use strict';
const m={
 O099:{name:'Abraham',summary:'Abrahamberättelserna i Genesis 12–25 ska analyseras som patriarktradition, inte som en daterad biografi från exiltiden.'},
 O100:{name:'Isak och Jakob',summary:'Berättelserna om Isak och Jakob rymmer flera traditioner om släktskap, förbund och Israels namn; exildatering är inte berättad händelsetid.'},
 O101:{name:'Josef i Egypten',summary:'Josefcykeln i Genesis 37–50 använder egyptiska motiv och familjenarrativ, men berättad miljö är inte identisk med textens tillkomst.'},
 O102:{name:'Uttåget ur Egypten (Mose)',summary:'Exodusberättelsen behandlar Israels befrielse och identitet. Händelsefrågan, litterär komposition och senare reception granskas separat.'}
};
const legacy={},oldResearch={},displaced=[];
for(const [id,x] of Object.entries(m)){
 const e=originalEvents.find(e=>e.id===id);if(!e)throw Error('Saknar originalpost '+id);
 legacy[id]=Object.freeze({title:e.title,description:e.description,start:e.start,end:e.end,evidence:e.evidence});
 e.legacyTitle=e.title;e.title=x.name;e.subject=x.name;
}
if(typeof allOriginalResearchV828!=='undefined'){
 oldResearch.O102=allOriginalResearchV828.O102;
 allOriginalResearchV828.O102={id:'O102',heading:'Uttåget ur Egypten: berättelse, historia och textutveckling',summary:m.O102.summary,context:'Exodus och Pentateukens litterära utveckling diskuteras inom historisk-kritisk forskning. Exil och persisk tid kan vara redaktionella miljöer, inte automatiskt händelsedatum.',limits:'Arkeologiska och textliga belägg prövas var för sig; det importerade 600–400 f.Kr. är ej faktagranskat.',sources:[{name:'Andra Moseboken 1',url:'https://www.bible.com/sv/bible/417/EXO.1.B2000D'},{name:'Andra Moseboken 14',url:'https://www.bible.com/sv/bible/417/EXO.14.B2000D'}]};
}
for(let i=editorialChronologyV817.length-1;i>=0;i--){
 if(editorialChronologyV817[i].id==='O102')displaced.unshift(editorialChronologyV817.splice(i,1)[0]);
}
window.TIDENS_O099_O102_IDENTITY=Object.freeze({m,legacy,oldResearch,displaced});
})();