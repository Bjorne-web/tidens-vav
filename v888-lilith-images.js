/* V8.88 Lilith: move licensed image from legacy collapsed metadata into visible unified reader.
   Other records and archive panels are unchanged. */
(function(){
 'use strict';
 const allowed=new Set(['H066','H067']);
 function promote(){
  if(typeof state==='undefined'||!allowed.has(state.selected))return;
  const root=document.getElementById('detail');
  const article=root?.querySelector('.v839-unified-article');
  const figure=root?.querySelector('.v839-unified-overview figure');
  if(!article||!figure)return;
  const image=figure.querySelector('img');
  if(!image)return;
  image.loading='lazy';
  image.style.cssText='display:block;width:100%;max-height:320px;object-fit:contain;border-radius:12px';
  figure.style.cssText='margin:14px 0;max-width:100%';
  const license=window.TIDENS_LILITH_ILLUSTRATIONS?.find(item=>item.id===state.selected);
  const caption=figure.querySelector('figcaption');
  if(caption && license?.source && !caption.querySelector('a')){
   const url=new URL(license.source);
   if(url.protocol==='https:'){
    const a=document.createElement('a');
    a.href=url.href;a.target='_blank';a.rel='noopener noreferrer';
    a.textContent=' Källa och licens ↗';
    caption.append(a);
   }
  }
  article.insertBefore(figure,article.querySelector('h3')||article.firstChild);
 }
 const old=renderDetail;
 renderDetail=function(){old();promote();};
 promote();
})();
