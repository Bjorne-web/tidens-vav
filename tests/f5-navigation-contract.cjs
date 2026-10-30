'use strict';
// F5.1 test-only transition coordinator.
// This does NOT mutate the app's state or install event listeners.
// It relies on the already existing C1 view context and explicit host callbacks.
const nonblank=value=>typeof value==='string'&&value.trim()?value.trim():null;
const idPattern=/^(?:[A-Z][0-9]{3,6}|AP[0-9]{3})$/;
const allowedViews=Object.freeze(['explore','timeline','research']);
const clonePlain=(value)=>{
 if(value===null||['string','number','boolean'].includes(typeof value))return value;
 if(Array.isArray(value))return value.map(clonePlain);
 if(typeof value!=='object')throw new TypeError('Non-serializable view context');
 const out={};for(const [key,item] of Object.entries(value)){
  if(['__proto__','prototype','constructor'].includes(key))throw new TypeError('Unsafe context key');
  out[key]=clonePlain(item);
 }return out;
};
const freezeDeep=(value)=>{
 if(value&&typeof value==='object'){for(const item of Object.values(value))freezeDeep(item);Object.freeze(value)}
 return value;
};
function captureContext(existingContext,extra={}){
 if(!existingContext||typeof existingContext!=='object')throw new TypeError('C1 snapshot required');
 if(typeof existingContext.view!=='string'||!nonblank(existingContext.view))throw new TypeError('Missing source view');
 if(!extra||typeof extra!=='object'||Array.isArray(extra))throw new TypeError('Invalid extra context');
 // Keep exactly the C1 fields, plus explicit UI-only context not available in C1 yet.
 // No assumption that the existing application can restore unimplemented map/camera state.
 return freezeDeep({v:1,sourceView:existingContext.view,
  selectedId:nonblank(existingContext.selectedId),
  visibleSection:nonblank(existingContext.visibleSection),
  timeRange:clonePlain(existingContext.timeRange||{}),
  compareIds:clonePlain(existingContext.compareIds||[]),
  filters:clonePlain(existingContext.filters||{}),
  url:clonePlain(existingContext.url||{}),
  extra:clonePlain(extra)});
}
function currentLink(baseUrl,id,view='research'){
 if(!idPattern.test(id)||!allowedViews.includes(view))return null;
 let url;try{url=new URL(baseUrl)}catch{return null}
 if(!/^https?:$/.test(url.protocol))return null;
 url.search='';url.hash='';url.searchParams.set('tv_id',id);url.searchParams.set('tv_view',view);
 return url.toString();
}
function createNavigationCoordinator({getSnapshot,getExtra,openReader,restoreSnapshot,closeReader,hasRecord}){
 const fns={getSnapshot,getExtra,openReader,restoreSnapshot,closeReader,hasRecord};
 for(const [name,fn] of Object.entries(fns))if(typeof fn!=='function')throw new TypeError('Missing navigation callback: '+name);
 let session=null;
 return Object.freeze({
  isOpen:()=>!!session,
  active:()=>session?Object.freeze({id:session.id,kind:'post',sourceView:session.context.sourceView}):null,
  enter(id){
   if(session||!idPattern.test(id)||!hasRecord(id))return false;
   const snapshot=captureContext(getSnapshot(),getExtra());
   const newSession={id,context:snapshot};
   // Only enter after host callback succeeds; failed opening leaves existing context alone.
   try{if(openReader({id,context:snapshot})===false)return false}
   catch(_){return false}
   session=newSession;
   return true;
  },
  exit(reason='return'){
   if(!session)return false;
   const active=session;
   // Do not discard captured context if restoring fails or refuses.
   try{
    if(restoreSnapshot(active.context,reason)===false)return false;
    if(closeReader({id:active.id,reason})===false)return false;
   }catch(_){return false}
   session=null;return true;
  },
  // Browser Back must be owned by a future F5 host integration. This is only
  // an explicit message to the coordinator, not a history API manipulation.
  onBrowserBack(){return this.exit('browser-back')},
  onEscape(){return this.exit('escape')}
 });
}
module.exports={captureContext,currentLink,createNavigationCoordinator};
