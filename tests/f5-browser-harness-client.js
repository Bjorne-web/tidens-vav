(function(){'use strict';
// F5 browser-only TEST HOST: actual F4 content and v909 C1, simulated app callbacks.
const query=new URLSearchParams(location.search);
const scenario=query.get('scenario')||'timeline';
const sourceView=scenario==='back'?'map':scenario==='mobile'?'timeline':scenario;
const article=document.getElementById('fullReader');
const viewport=document.getElementById('viewport');
const detail=document.getElementById('detail');
const result=document.getElementById('f5Result');
const log=[];
let reportFinished=false;
function showView(name){
 for(const el of document.querySelectorAll('.view'))el.classList.toggle('hidden',el.id!==name+'View');
}
function same(a,b){return JSON.stringify(a)===JSON.stringify(b)}
function report(ok,msg){
 if(reportFinished)return;
 reportFinished=true;document.body.dataset.f5Result=ok?'PASS':'FAIL';
 document.body.dataset.f5Scenario=scenario;
 result.textContent=(ok?'PASS: ':'FAIL: ')+msg;
 document.getElementById('f5Status').textContent=JSON.stringify({view:state.view,selected:state.selected,
  mapYear:state.mapYear,zoom:camera.getZoom(),theme:theme,themeMode:mode,
  scroll:viewport.scrollTop,detail:detail.scrollTop,compare:compareIds,calls:log},null,2);
}
window.addEventListener('error',e=>report(false,e.message||'browser exception'));
const camera={center:[36,38],zoom:6,
 getCenter(){return {lat:this.center[0],lng:this.center[1]}},
 getZoom(){return this.zoom},
 setView(center,zoom){this.center=[center[0],center[1]];this.zoom=zoom}
};
let theme='israel',mode='graph';
const state=window.state={view:sourceView,selected:'H045',min:-955,max:-745,mapYear:-850,
 cat:new Set(['Historia','Arkeologi']),ev:new Set(['Hög'])};
const compareIds=window.compareIds=['H045','O067'];
window.TidensResearchReadModel={has:id=>['H045','O067'].includes(id),get:id=>({id:id,kind:'post'})};
showView(sourceView);
const browserSnapshot=()=>window.TidensViewContextC1.snapshot();
function extra(){const center=camera.getCenter();return{
 mapYear:state.mapYear,mapCamera:{lat:center.lat,lng:center.lng,zoom:camera.getZoom()},
 theme:theme,themeMode:mode,scrollY:viewport.scrollTop,readerScroll:detail.scrollTop,
 focusId:document.activeElement&&document.activeElement.id||'nav'+sourceView
};}
const host={
 snapshot:browserSnapshot,captureExtra:extra,
 hasPost:id=>['H045','O067'].includes(id),
 openReader:({id})=>{
  article.hidden=false;detail.scrollTop=0;
  for(const el of document.querySelectorAll('[data-article]'))el.hidden=el.dataset.article!==id;
  state.view='research';showView('research');viewport.scrollTop=0;
  state.mapYear=-200;camera.setView([0,0],2);theme='humans';mode='list';
  state.cat=new Set(['Bibel']);compareIds.splice(0,compareIds.length,'O067');log.push('open');
 },
 closeReader:()=>{article.hidden=true;log.push('close');return true},
 selectedPost:c=>{state.selected=c.selectedId;log.push('selection')},
 filters:c=>{state.cat=new Set(c.filters.categories);state.ev=new Set(c.filters.evidence);log.push('filters')},
 timelineRange:c=>{state.min=c.timeRange.min;state.max=c.timeRange.max;log.push('range')},
 mapYear:c=>{state.mapYear=c.extra.mapYear;log.push('year')},
 theme:c=>{theme=c.extra.theme;log.push('theme')},
 themeMode:c=>{mode=c.extra.themeMode;log.push('themeMode')},
 comparison:c=>{compareIds.splice(0,compareIds.length,...c.compareIds);log.push('compare')},
 view:c=>{state.view=c.sourceView;showView(state.view);viewport.scrollTop=0;log.push('view')},
 mapCamera:c=>{camera.setView([c.extra.mapCamera.lat,c.extra.mapCamera.lng],c.extra.mapCamera.zoom);log.push('camera')},
 readerScroll:c=>{detail.scrollTop=c.extra.readerScroll;log.push('readerScroll')},
 scroll:c=>{viewport.scrollTop=c.extra.scrollY;log.push('scroll')},
 focus:c=>{document.getElementById(c.extra.focusId)?.focus();log.push('focus')},
 verifyRestored:c=>{
  const now=browserSnapshot(),x=extra();
  const ok=now.view===c.sourceView&&now.selectedId===c.selectedId&&
   now.timeRange.min===c.timeRange.min&&now.timeRange.max===c.timeRange.max&&
   same([...now.filters.categories],[...c.filters.categories])&&
   same([...now.filters.evidence],[...c.filters.evidence])&&
   same([...compareIds],[...c.compareIds])&&same(x,c.extra)&&article.hidden;
  log.push('verify-'+ok);return ok;
 }
};
function initialize(){
 const integration=window.F5ReturnHost.createF5HostIntegration(host);
 document.getElementById('nav'+sourceView).focus();
 viewport.scrollTop=180;detail.scrollTop=95;
 const saved={context:browserSnapshot(),extra:extra()};
 function finish(){
  const after=browserSnapshot();
  const ok=integration.diagnostics().status==='restored'&&
   after.view===saved.context.view&&after.selectedId===saved.context.selectedId&&
   same(extra(),saved.extra);
  report(ok,ok?'C1/F4 host return passed':'Snapshot mismatch or '+integration.diagnostics().status);
 }
 function open(){
  if(!integration.coordinator.enter('H045')){
   report(false,'Open blocked '+integration.diagnostics().status);return false;
  }
  if(article.hidden||!detail.innerHTML.includes('Ahab')){
   report(false,'Full article not displayed');return false;
  }
  return true;
 }
 document.getElementById('open').addEventListener('click',open);
 document.getElementById('return').addEventListener('click',()=>{
  if(!integration.coordinator.exit())report(false,'Return failed');else finish();
 });
 document.addEventListener('keydown',e=>{
  if(e.key==='Escape'&&integration.coordinator.isOpen()){
   e.preventDefault();
   if(!integration.coordinator.onEscape())report(false,'Escape failed');else finish();
  }
 });
 window.addEventListener('popstate',()=>{
  if(integration.coordinator.isOpen()){
   if(!integration.coordinator.onBrowserBack())report(false,'Browser Back failed');else finish();
  }
 });
 if(!query.has('autotest'))return;
 if(!open())return;
 if(scenario==='back'){
  history.pushState({f5:true},'',location.pathname+location.search+'#f5-article');
  history.back();
  setTimeout(()=>{if(!reportFinished)report(false,'Browser Back did not fire')},1600);
 }else document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true}));
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initialize,{once:true});
else initialize();
})();