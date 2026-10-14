/* C6 V8.40 – operativt protokoll för vetenskapliga innehållskontroller.
 * Krav är inte godkännanden. Poster får först en helgranskningsstatus
 * när journalen uttryckligen redovisar fullständig genomgång.
 */
window.TIDENS_AUDIT_METHOD = Object.freeze({
 schemaVersion:1,
 lastUpdated:'2026-10-14',
 criteria:[
  {id:'påståenden',label:'Bärande påståenden avgränsade',description:'Inventera alla historiskt och religionshistoriskt betydelsefulla påståenden, inte bara ett valt exempel.'},
  {id:'primarkallor',label:'Källunderlag och genre kontrollerade',description:'Identifiera primärtext, arkeologiskt belägg och modern forskning. Läs själva materialet när det går; ett abstract är inte hela artikeln.'},
  {id:'tidsnivaer',label:'Dateringsnivåer redovisade',description:'Skilj på berättad tid, historiskt skeende, komposition, redaktion och den bevarade kopians datering.'},
  {id:'forskningslage',label:'Motstående forskningspositioner prövade',description:'Jämför oberoende facklitteratur, väsentliga invändningar och osäkerhet. Kräv inte falsk likvikt när beläggens styrka skiljer sig.'},
  {id:'paverkan',label:'Påverkan skiljd från likhet och samtidighet',description:'Redovisa kronologisk möjlighet, historisk kontaktyta, specifika textparalleller och belagd överföringskedja som fyra olika steg.'},
  {id:'redovisning',label:'Slutsatser, begränsningar och kontrollör dokumenterade',description:'Knyt varje slutsats till granskningsdatum, källa, avgränsning och ansvarig granskning. Markera inte hela posten klar utan genomgång av alla relevanta punkter.'}
 ],
 researchQueue:[
  {id:'O030',topic:'Zoroastrism → judisk eskatologi',reason:'Hög religionshistorisk betydelse, omstridd överföring och stora dateringsproblem',status:'Delvis källprövad: 6 avgränsade påståenden; ingen helgranskning'},
  {id:'H020',topic:'Genesis 1–11 ↔ Mesopotamiska traditioner',reason:'Risk att motivlikhet presenteras som direkt kopiering',status:'Enstaka påståenden källprövade; helgranskning återstår'},
  {id:'H025',topic:'Första Henok och Qumran',reason:'Risk att handskriftdatum förväxlas med samtliga delböckers tillkomst',status:'Enstaka påståenden källprövade; helgranskning återstår'},
  {id:'H034',topic:'Johannesevangeliet och P52',reason:'Paleografi används ibland felaktigt som exakt kompositionsdatum',status:'Enstaka påståenden källprövade; helgranskning återstår'},
  {id:'H005',topic:'Gilgamesheposet och flodtraditionen',reason:'Risk att antikt textvittne förväxlas med datering av en faktisk flod',status:'Äldre forskningsunderlag finns; helgranskning återstår'}
 ]
});
