/* V8.79: collapsible timeline filters */
(function(){
for(const [id,title] of [['catFilters','Kategori'],['evFilters','Evidensläge']]){
 const node=document.getElementById(id);if(!node)continue;
 const section=node.closest('.section');if(!section)continue;
 const heading=section.querySelector('h3');if(heading)heading.remove();
 const fold=document.createElement('details');fold.open=true;fold.className='v879-fold';
 const label=document.createElement('summary');label.textContent=title;fold.append(label);
 section.append(fold);
 for(const child of [...section.children]){if(child!==fold)fold.append(child)}
}
})();