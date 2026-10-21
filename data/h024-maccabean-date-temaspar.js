/* Independent source assessment of H024; preserves original entries. */
(function(root){
'use strict';
const sourceA={title:'World History Encyclopedia – Maccabean Revolt',url:'https://www.worldhistory.org/article/827/the-maccabean-revolt/'};
const sourceB={title:'Bible Gateway – Maccabees',url:'https://www.biblegateway.com/resources/encyclopedia-of-the-bible/Maccabees'};
const record={
 title:'Makkaberupproret',
 phases:[
 {title:'Makkaberupprorets tidiga fas',start:-167,end:-160,timeType:'historical-period',typeLabel:'UPPROR 167–160 f.Kr.',evidence:'B',reason:'Fasen under Judas Mackabaios dateras vanligen 167–160 f.Kr. Den hasmoneiska kampen fortsatte därefter.',sources:[sourceA,sourceB]},
 {title:'Återinvigning av Jerusalems tempel',start:-164,end:-164,timeType:'historical-event',typeLabel:'TEMPLETS ÅTERINVIGNING',evidence:'B',reason:'Återinvigningen omkring 164 f.Kr. markerar inte slutet på hela konflikten.',sources:[sourceA,sourceB]}
 ],
 undated:'Flerårigt konfliktförlopp med separat tempelåterinvigning. Tidsintervallet är inte en datering av Makkabeerböckernas författande.',
 sources:[sourceA,sourceB]
};
root.TIDENS_C7_DATING_PILOT=Object.freeze(Object.assign({},root.TIDENS_C7_DATING_PILOT||{},{H024:record}));
})(window);
