/* C7 omgång 36: ett kanoniskt ämne per O-ID. Ursprungliga etiketter och år bevaras som proveniens. */
(function(){'use strict';
 const names=Object.freeze({O123:'Makkaberupproret',O124:'Jesu födelse',O125:'Jesu offentliga verksamhet',O126:'Jesu korsfästelse'});
 const legacy={};
 for(const [id,name] of Object.entries(names)){
  const matches=originalEvents.filter(e=>e.id===id);
  if(matches.length!==1)throw Error('C7 identitetskonflikt '+id+': '+matches.length+' originalposter');
  const e=matches[0];
  legacy[id]={title:e.title,start:e.start,end:e.end,dating:e.dating};
  e.legacyTitle=e.title;
  e.title=name;
  e.subject=name;
 }
 window.TIDENS_O123_O126_IDENTITY=Object.freeze({names,legacy});
})();
