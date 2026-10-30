'use strict';
// F5.2 read-only preflight planner. No browser API or application state mutation.
// A saved value does NOT prove that app.js can restore it. Required host APIs
// are explicit; missing capabilities block any active return integration.
const finite=x=>typeof x==='number'&&Number.isFinite(x);
const knownViews=new Set(['start','timeline','map','explore','compare','research','about',
 'records','parallels','archive','formation','religion']);
const requireValidContext=c=>{
 if(!c||c.v!==1||!knownViews.has(c.sourceView))throw new TypeError('Unsupported return context');
 if(c.timeRange){
  const {min,max}=c.timeRange;
  if((min!=null||max!=null)&&!(finite(min)&&finite(max)&&min<max))throw new TypeError('Invalid time range');
 }
 if(c.extra?.scrollY!=null&&(!finite(c.extra.scrollY)||c.extra.scrollY<0))throw new TypeError('Invalid scroll');
 if(c.extra?.mapYear!=null&&!finite(c.extra.mapYear))throw new TypeError('Invalid map year');
 if(c.extra?.mapCamera){
  const camera=c.extra.mapCamera;
  if(!finite(camera.lat)||!finite(camera.lng)||!finite(camera.zoom))throw new TypeError('Invalid map camera');
 }
};
function planReturn(context,available){
 requireValidContext(context);
 if(!available||typeof available!=='object')throw new TypeError('Restoration capability report required');
 const extra=context.extra||{};
 const steps=[
  {id:'restore-selection',capability:'selectedPost',required:!!context.selectedId},
  {id:'restore-filters',capability:'filters',required:!!context.filters},
  {id:'restore-time-range',capability:'timelineRange',required:finite(context.timeRange?.min)&&finite(context.timeRange?.max)},
  {id:'restore-map-year',capability:'mapYear',required:context.sourceView==='map'||finite(extra.mapYear)},
  {id:'restore-theme',capability:'theme',required:context.sourceView==='explore'||typeof extra.theme==='string'},
  {id:'restore-theme-mode',capability:'themeMode',required:typeof extra.themeMode==='string'},
  {id:'restore-compare',capability:'comparison',required:context.sourceView==='compare'||(context.compareIds||[]).length>0},
  {id:'restore-view',capability:'view',required:true},
  // Must restore camera AFTER view switches and map auto-sync hooks.
  {id:'restore-map-camera',capability:'mapCamera',required:!!extra.mapCamera},
  {id:'restore-reader-position',capability:'readerScroll',required:finite(extra.readerScroll)},
  {id:'restore-scroll',capability:'scroll',required:finite(extra.scrollY)},
  {id:'restore-focus',capability:'focus',required:!!extra.focusId}
 ];
 const selected=steps.filter(x=>x.required).map(x=>Object.freeze({...x,supported:available[x.capability]===true}));
 const blocked=selected.filter(x=>!x.supported).map(x=>x.id);
 return Object.freeze({sourceView:context.sourceView,ready:blocked.length===0,
  steps:Object.freeze(selected),blockers:Object.freeze(blocked)});
}
module.exports={planReturn};
