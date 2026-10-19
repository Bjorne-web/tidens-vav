/* Stabilisering O095–O098: ett ID = ett ämne enligt styrdokument v1.1.
 * Körs efter data.generated.js men före app.js och Temaspårs vyer.
 * Ursprungsuppgifter och tidigare felkopplade historiska poster bevaras som proveniens.
 */
(function(){
 'use strict';
 const subjects=Object.freeze({
  O095:{title:'Skapelsen',heading:'Skapelseberättelserna i Första Moseboken',
    summary:'Första Moseboken 1–2 innehåller olika skapelseframställningar som behöver granskas utifrån sina egna textskikt. Den äldre etiketten om babylonisk exil avser en möjlig redaktionsmiljö, inte tidpunkten för en historisk skapelsehändelse.',
    context:'Sammansättning och datering av prästerliga och andra texttraditioner är omdiskuterad. Jämförelser med mesopotamiska skapelseberättelser kan belysa motiv och skillnader.',
    limits:'Den importerade dateringen 600–500 f.Kr. är inte faktagranskad och får inte framställas som fastställd tid för berättelsernas tillkomst.',
    sources:[{name:'Första Moseboken 1',url:'https://www.bible.com/sv/bible/417/GEN.1.B2000D'},{name:'Första Moseboken 2',url:'https://www.bible.com/sv/bible/417/GEN.2.B2000D'}]},
  O096:{title:'Syndafallet',heading:'Edenberättelsen: kunskap, ansvar och dödlighet',
    summary:'Första Moseboken 2–3 berättar om människan i trädgården, förbudet, ormen och konsekvenserna av att äta frukten. Termen syndafall är en senare tolkningskategori.',
    context:'Textens sammansättning, relation till vishetstraditioner och möjliga redaktionsmiljöer är omdiskuterade. Berättelsen ska inte förväxlas med de historiska deportationerna från Juda.',
    limits:'Originalregistrets period 600–500 f.Kr. är en ogranskad miljöuppgift, inte en historisk datering av Eden.',
    sources:[{name:'Första Moseboken 2–3',url:'https://www.bible.com/sv/bible/417/GEN.3.B2000D'},{name:'Romarbrevet 5 – senare reception',url:'https://www.bible.com/sv/bible/417/ROM.5.B2000D'}]},
  O097:{title:'Noas ark',heading:'Noaberättelsen: flodmotiv och textens sammansättning',
    summary:'Första Moseboken 6–9 beskriver Noa, floden, arken och förbundet efter katastrofen. Berättelsen har tydliga motivparalleller till äldre mesopotamiska flodtraditioner.',
    context:'Litterära jämförelser med Atrahasis och Gilgamesheposet belyser äldre flodmotiv, men visar inte att en global flod inträffat.',
    limits:'Importerade årtal avser högst en möjlig redaktionsmiljö och kan inte datera en världsomspännande flod.',
    sources:[{name:'Första Moseboken 6',url:'https://www.bible.com/sv/bible/417/GEN.6.B2000D'},{name:'Första Moseboken 9',url:'https://www.bible.com/sv/bible/417/GEN.9.B2000D'}]},
  O098:{title:'Babels torn',heading:'Babelberättelsen: språk, städer och ziggurater',
    summary:'Första Moseboken 11 berättar om byggandet av Babels torn och om språkens mångfald. Berättelsen har en möjlig kulturell bakgrund i Mesopotamiens städer och tempeltorn.',
    context:'Ziggurater kan belysa miljön men ger inte belägg för en historisk plötslig språkförbistring. Det persiska återvändandet är ett annat historiskt ämne.',
    limits:'600–500 f.Kr. är en importerad, ogranskad uppgift, inte en fastställd datering av berättelsen.',
    sources:[{name:'Första Moseboken 11',url:'https://www.bible.com/sv/bible/417/GEN.11.B2000D'},{name:'Apostlagärningarna 2 – senare reception',url:'https://www.bible.com/sv/bible/417/ACT.2.B2000D'}]}
 });
 const originalArchive={},formerDossiers={};
 for(const id of Object.keys(subjects)){
   const e=originalEvents.find(x=>x.id===id);
   if(!e)throw Error('Kanoniskt original-ID saknas: '+id);
   originalArchive[id]=Object.freeze({title:e.title,description:e.description,start:e.start,end:e.end,dating:e.dating,evidence:e.evidence});
   e.title=subjects[id].title;
   e.legacyTitle=originalArchive[id].title;
   e.subject=subjects[id].title;
   if(typeof allOriginalResearchV828!=='undefined'){
     formerDossiers[id]=allOriginalResearchV828[id]||null;
     const x=subjects[id];
     allOriginalResearchV828[id]={id,heading:x.heading,summary:x.summary,context:x.context,limits:x.limits,sources:x.sources,coverage:'ID-korrigering: ursprunglig källmiljö separat från berättelseämne'};
   }
 }
 const displaced=[];
 // O096 och O098 får inte betyda olika historiska händelser i olika vyer.
 for(const arr of [editorialChronologyV817]){
   for(let i=arr.length-1;i>=0;i--){
     if(arr[i].id==='O096'||arr[i].id==='O098')displaced.unshift(arr.splice(i,1)[0]);
   }
 }
 // Textdateringar O095/O097 är separata, uttryckligen osäkra forskningsbedömningar.
 // Lägg inte in O096/O098 i tidsgranskad kronologi förrän sådana texter granskats.
 window.TIDENS_O_IDENTITY_AUDIT=Object.freeze({
  version:1,subjects,originalArchive:Object.freeze(originalArchive),
  displacedChronology:Object.freeze(displaced),previousResearch:Object.freeze(formerDossiers)
 });
})();
