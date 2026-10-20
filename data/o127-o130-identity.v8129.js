/* C7: ämnesidentitet O127–O130, separerad från importerad historisk miljö. */
(function(){'use strict';
const names=Object.freeze({O127:'Församlingens födelse',O128:'Paulus brev',O129:'Jerusalems förstörelse',O130:'Uppenbarelseboken'});
const legacy={};
for(const [id,title] of Object.entries(names)){
 const matches=originalEvents.filter(x=>x.id===id);
 if(matches.length!==1)throw Error('Kanoniskt ID saknas eller används dubbelt: '+id);
 const e=matches[0];
 legacy[id]={title:e.title,start:e.start,end:e.end,dating:e.dating};
 e.legacyTitle=e.title;e.title=title;e.subject=title;
}
window.TIDENS_O127_O130_IDENTITY=Object.freeze({names,legacy});
})();