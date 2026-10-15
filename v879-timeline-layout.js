/* V8.79: collapsible timeline filters */
(function(){
for(const [id,title] of [['catFilters','Kategori'],['evFilters','Evidensläge']]){
 const node=document.getElementById(id);if(!node)continue;
 const section=node.closest('.section');if(!section)continue;
 const heading=section.querySelector('h3');if(heading)heading.remove();
 const fold=document.createElement('details');fold.open=true;fold.className='v879-fold';
 const label=document.createElement('summary');label.textContent=title;fold.append(label);
 const actions=document.createElement('div');actions.className='v879-actions';
 for(const [name,want] of [['Markera alla',true],['Avmarkera alla',false]]){
  const button=document.createElement('button');button.type='button';button.textContent=name;
  button.onclick=()=>{for(const box of node.querySelectorAll('input[type=checkbox]')){if(box.disabled||box.checked===want)continue;box.click();}};
  actions.append(button);
 }
 fold.append(actions);
 section.append(fold);
 for(const child of [...section.children]){if(child!==fold)fold.append(child)}
}
})();