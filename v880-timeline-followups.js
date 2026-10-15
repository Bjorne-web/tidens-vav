/* V8.80: simplify timeline sidebar without removing stateful controls. */
(function(){
 'use strict';
 const sidebar=document.getElementById('v84Sidebar');
 if(!sidebar)return;
 for(const [id,tag] of [['minYear','year-inputs'],['presets','presets'],['selectedMini','selected-post']]){
  const node=document.getElementById(id);const section=node&&node.closest('.section');
  if(section)section.classList.add('v880-secondary-'+tag);
 }
 const menu=document.getElementById('v827ResearchMenuBtn');
 if(menu&&!menu.title)menu.title='Fördjupade forskningsvyer: kronologi, arkeologi, Israels religion, exil, texttillkomst och originalarkiv';
})();
