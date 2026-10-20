/* H026 — conventional 63 BCE date for Pompey's intervention in Jerusalem. */
(function(root){
'use strict';
const item=Object.freeze({
 title:'Romerskt styre i Judeen inleds',
 phases:[Object.freeze({
  title:'Pompejus intar Jerusalem – traditionell datering',
  start:-63,end:-63,
  timeType:'historical-event',
  typeLabel:'HISTORISK HÄNDELSE – traditionellt 63 f.Kr.',
  evidence:'B',
  precision:'Vanlig datering 63 f.Kr.; alternativt år 64 har föreslagits.',
  reason:'Pompejus ingripande och intagandet av Jerusalem placeras vanligen år 63 f.Kr. i historiska översikter utifrån antik kronologi. En publicerad omprövning föreslår att belägringen avslutades redan 64 f.Kr.; här visas standarddateringen med öppet redovisad forskningsreservation. Detta daterar inte all romersk administration eller senare direktprovinsialisering till samma år.',
  sources:[
   {title:'Livius – Pompey’s Siege of Jerusalem',url:'https://www.livius.org/articles/concept/roman-jewish-wars/'},
   {title:'Josephus, Antiquitates XIV, 4 (antik källa)',url:'https://penelope.uchicago.edu/josephus/ant-14.html'},
   {title:'Duncan Cameron (2018), Towards a re-dating of Pompey’s conquest of Jerusalem',url:'https://doi.org/10.18647/3370/jjs-2018'}
  ]
 })],
 undated:'Händelsen dateras vanligen till 63 f.Kr. En forskningsartikel föreslår 64 f.Kr., varför årtalet ska läsas som konventionell datering med förbehåll.',
 sources:[{title:'Livius – Pompejus och Jerusalem',url:'https://www.livius.org/articles/concept/roman-jewish-wars/'}]
});
root.TIDENS_C7_DATING_PILOT=Object.freeze(Object.assign({},root.TIDENS_C7_DATING_PILOT||{},{H026:item}));
})(window);
