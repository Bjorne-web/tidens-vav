/* Tidens väv V8.35 – versionsoberoende djuplänkar till historiska poster.
   Inga externa appar kontaktas; integration sker via frivilligt öppnade HTTPS-länkar.
*/
(function () {
  'use strict';
  const PARAM_ID='tv_id';
  const PARAM_VIEW='tv_view';
  const ALLOWED=new Set(['explore','timeline','research']);
  const ID_PATTERN=/^(?:[A-Z][0-9]{3,6}|AP[0-9]{3})$/;

  function recordFor(id) {
    if(typeof id!=='string' || !ID_PATTERN.test(id))return null;
    return (typeof idEvent==='function' ? idEvent(id) : null) || (window.TIDENS_APOCRYPHA_BOOKS||[]).find(b=>b.id===id) || null;
  }

  function parse(search) {
    const params=new URLSearchParams(String(search || ''));
    if(!params.has(PARAM_ID))return null;
    const id=(params.get(PARAM_ID)||'').trim();
    if(!recordFor(id))return {error:'unknown-id'};
    const requested=params.get(PARAM_VIEW)||'explore';
    if(!ALLOWED.has(requested))return {error:'unknown-view'};
    return {id,view:requested};
  }

  function makeLink(id,mode='explore') {
    if(!recordFor(id) || !ALLOWED.has(mode))return null;
    const url=new URL(window.location.href);
    url.search='';
    url.hash='';
    url.searchParams.set(PARAM_ID,id);
    url.searchParams.set(PARAM_VIEW,mode);
    return url.href;
  }

  function showNotice(message) {
    const main=document.querySelector('.main') || document.body;
    if(!main)return;
    const notice=document.createElement('div');
    notice.className='v835-link-notice';
    notice.setAttribute('role','status');
    notice.textContent=message;
    main.prepend(notice);
  }

  function openRoute(route) {
    if(!route || route.error || !recordFor(route.id) || !ALLOWED.has(route.view))return false;
    if((window.TIDENS_APOCRYPHA_BOOKS||[]).some(b=>b.id===route.id)){
      view('timeline');return window.TidensOpenBookV858?.(route.id)||false;
    }
    if(route.view==='explore'){
      v829Focus.id=route.id;
      v827RelationFocus=route.id;
      view('explore');
      setSelected(route.id);
    }else if(route.view==='timeline'){
      view('timeline');
      setSelected(route.id);
      v829LocateResearch(route.id);
    }else if(route.view==='research'){
      view('research');
      setSelected(route.id);
      if(window.innerWidth<=900 && typeof v84OpenReader==='function')v84OpenReader();
    }
    return true;
  }

  async function copyLink(url,button,status) {
    if(!url)return;
    try{
      if(!navigator.clipboard?.writeText)throw new Error('Clipboard unsupported');
      await navigator.clipboard.writeText(url);
      if(status)status.textContent='Länken kopierad.';
    }catch(_){
      if(status)status.textContent='Kopiering kunde inte göras automatiskt. Öppna länken bredvid och kopiera webbadressen.';
    }
    if(button)button.blur();
  }

  function linkToolbar(id) {
    const link=makeLink(id,'explore');
    if(!link)return null;
    const isPreview=new URL(window.location.href).hostname!=='tidens-vav.pages.dev';
    const wrap=document.createElement('div');
    wrap.className='v835-share';
    const title=document.createElement('span');
    title.className='v835-share-title';
    title.textContent=isPreview?'Dela testversionen (förhandsvisning)':'Dela historisk undersökning';
    const copy=document.createElement('button');
    copy.type='button';
    copy.className='v835-copy';
    copy.textContent=isPreview?'Kopiera testlänk':'Kopiera länk';
    const anchor=document.createElement('a');
    anchor.href=link;
    anchor.target='_blank';
    anchor.rel='noopener noreferrer';
    anchor.textContent='Öppna direktlänk ↗';
    const status=document.createElement('span');
    status.className='v835-copy-status';
    status.setAttribute('role','status');
    status.setAttribute('aria-live','polite');
    copy.addEventListener('click',()=>copyLink(link,copy,status));
    wrap.append(title,copy,anchor,status);
    if(isPreview){const caution=document.createElement('span');caution.className='v835-preview-note';caution.textContent='Detta är en tillfällig testadress. Permanenta postlänkar använder tidens-vav.pages.dev efter publicering.';wrap.append(caution)}
    return wrap;
  }

  function decorateReader() {
    const panel=document.getElementById('detail');
    if(!panel)return;
    panel.querySelectorAll('.v835-share').forEach(node=>node.remove());
    const selected=recordFor(state.selected);
    if(!selected)return;
    const bar=panel.querySelector('.v84-reader-bar');
    const section=linkToolbar(selected.id);
    if(section) {
      if(bar)bar.insertAdjacentElement('afterend',section);
      else panel.prepend(section);
    }
  }

  function decorateExplore() {
    const focus=typeof v829Focus!=='undefined' ? recordFor(v829Focus.id) : null;
    const section=document.getElementById('v833Study');
    if(!focus || !section)return;
    const share=linkToolbar(focus.id);
    if(share)section.append(share);
  }

  // Används bara till att bygga URL och öppna tillåtna lokala poster.
  // Ingen postMessage-kanal eller åtkomst till den andra appens data finns.
  window.TidensVavLinks=Object.freeze({
    schemaVersion:1,
    parse,
    makeLink,
    openRoute,
    allowedViews:Object.freeze(['explore','timeline','research'])
  });

  const oldDetail=renderDetail;
  renderDetail=function(){oldDetail();decorateReader()};
  const oldExplore=renderExplore;
  renderExplore=function(){oldExplore();decorateExplore()};

  function initialize() {
    const route=parse(window.location.search);
    if(route?.error) {
      showNotice(route.error==='unknown-id'
        ? 'Posten i länken finns inte i denna version av Tidens väv. Kontrollera post-ID:t eller öppna en post i appen.'
        : 'Vyn i länken är inte tillgänglig. Tillåtna vyer är explore, timeline och research.');
    } else if(route){
      openRoute(route);
    } else {
      decorateReader();
    }
  }
  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',initialize,{once:true});
  } else initialize();
})();
