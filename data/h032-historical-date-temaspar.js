/* H032 – independently sourced historical-event placement; no legacy-date mutation. */
(function(root){
 'use strict';
 const h032=Object.freeze({
  title:'Jerusalems andra tempel förstörs',
  phases:[Object.freeze({
   title:'Andra templets förstörelse – romarnas belägring av Jerusalem',
   start:70,end:70,
   timeType:'historical-event',
   typeLabel:'HISTORISK HÄNDELSE – 70 e.Kr.',
   evidence:'A',
   precision:'Året 70 e.Kr. är historiskt väl belagt; exakt kalenderdag behandlas inte som fastställd.',
   reason:'Den romerska belägringen under Titus och templets förstörelse dateras till år 70 e.Kr. Flavius Josephus är en central antik källa. Den exakta kalenderdagen och överföringen mellan antika kalendrar är mer omdiskuterad än årtalet.',
   sources:[
    {title:'Livius – Roman-Jewish Wars, chronology 66–74',url:'https://www.livius.org/articles/concept/roman-jewish-wars/roman-jewish-wars-5/'},
    {title:'Josephus – Jewish War, bok VI (antik källa och kronologi)',url:'https://www.josephus.org/FlJosephus2/warChronology7Fall.html'}
   ]
  })],
  undated:'Året 70 e.Kr. är historiskt belagt. Precis kalenderdag är osäkrare. Detta gäller templets förstörelse – inte när evangeliernas berättelser om templet skrevs.',
  sources:[{title:'Livius – judiska kriget 66–70',url:'https://www.livius.org/articles/concept/roman-jewish-wars/roman-jewish-wars-5/'}]
 });
 root.TIDENS_C7_DATING_PILOT=Object.freeze(Object.assign({},root.TIDENS_C7_DATING_PILOT||{},{H032:h032}));
})(window);
