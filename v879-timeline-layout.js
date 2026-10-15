/* V8.79: collapsible timeline filters */
(function(){
for(const [id,title] of [['catFilters','Kategori'],['evFilters','Evidensläge']]){
 const node=document.getElementById(id);if(!node)continue;
 const section=node.closest('.section');if(!section)continue;
 const heading=section.querySelector('h3');if(heading)heading.remove();
 const fold=document.createElement('details');fold.open=false;fold.className='v879-fold';
 const label=document.createElement('summary');label.textContent=title;fold.append(label);
 const actions=document.createElement('div');actions.className='v879-actions';
 const toggle=document.createElement('button');toggle.type='button';toggle.className='v879-toggle-all';
 const boxes=()=>[...node.querySelectorAll('input[type=checkbox]')].filter(x=>!x.disabled&&x.id!=='tvOnlyBooks');
 const sync=()=>{const list=boxes();const all=list.length>0&&list.every(x=>x.checked);toggle.textContent=all?'Avmarkera alla':'Markera alla';toggle.setAttribute('aria-pressed',String(all));};
 toggle.onclick=()=>{const list=boxes();const all=list.length>0&&list.every(x=>x.checked);const wanted=!all;const target=id==='catFilters'?state.cat:state.ev;for(const box of list){box.checked=wanted;if(wanted)target.add(box.value);else target.delete(box.value);}renderAll();sync();};
 node.addEventListener('change',sync);actions.append(toggle);
 fold.append(actions);
 section.append(fold);
 for(const child of [...section.children]){if(child!==fold)fold.append(child)}
 sync();
}

// Keep the old full-width pan tool available, but no longer permanently occupying the timeline.
const panel=document.getElementById('v827PanControls');
if(panel){
 const fold=document.createElement('details');fold.id='v879PanDisclosure';fold.className='v879-pan-disclosure';
 const summary=document.createElement('summary');summary.textContent='Visa tidsreglage';
 fold.append(summary);panel.parentNode.insertBefore(fold,panel);fold.append(panel);
 fold.addEventListener('toggle',()=>{summary.textContent=fold.open?'Dölj tidsreglage':'Visa tidsreglage';});
}
})();