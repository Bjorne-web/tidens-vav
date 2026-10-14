/* V8.40 – granskningsprocessen synlig i Fördjupningar. */
(function(){
 'use strict';
 const method=window.TIDENS_AUDIT_METHOD;
 if(!method)return;
 const make=(tag,className,text)=>{
  const el=document.createElement(tag);
  if(className)el.className=className;
  if(text!==undefined)el.textContent=text;
  return el;
 };
 function render(){
  const target=document.getElementById('c6Progress');
  if(!target)return;
  target.querySelectorAll('.v840-audit-protocol').forEach(el=>el.remove());
  const details=make('details','v840-audit-protocol');
  details.append(make('summary','','Så avgör vi om historisk forskning är tillräckligt granskad'));
  details.append(make('p','v840-audit-note','Detta är obligatoriska kontrollpunkter, inte redan utförda granskningar. Endast den dokumenterade journalen får ge en post status som vetenskapligt slutgranskad.'));
  const list=make('ol','v840-audit-criteria');
  for(const item of method.criteria){
   const li=make('li','');
   li.append(make('strong','',item.label),make('p','',item.description));
   list.append(li);
  }
  details.append(list);
  details.append(make('h4','','Prioriterade forskningsfrågor'));
  const pending=make('ul','v840-audit-queue');
  for(const entry of method.researchQueue){
   const li=make('li','');
   const button=make('button','v840-audit-open',entry.topic+' · '+entry.id);
   button.type='button';
   button.addEventListener('click',()=>{
    setSelected(entry.id);
    if(window.innerWidth<=900&&typeof v84OpenReader==='function')v84OpenReader();
   });
   li.append(button,make('p','',entry.reason),make('small','',entry.status));
   pending.append(li);
  }
  details.append(pending);
  target.append(details);
 }
 const prev=renderResearch;
 renderResearch=function(){prev();render()};
 window.TidensAuditMethod=Object.freeze({criteria:method.criteria,queue:method.researchQueue});
})();
