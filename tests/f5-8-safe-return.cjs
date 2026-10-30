'use strict';
// F5.8: recovery state-machine proposal, NOT a production router.
// Never calls history.back() if the current app context/camera has drifted.
// A popstate event can already have happened: it must not be reported as
// safely restored without independent verification.
function clone(x){return JSON.parse(JSON.stringify(x))}
function makeRecoveryController({readCurrent,readCamera,beginHistoryBack,closeOverlay,restoreOriginal}){
 const fns={readCurrent,readCamera,beginHistoryBack,closeOverlay,restoreOriginal};
 for(const [name,fn] of Object.entries(fns))
  if(typeof fn!=='function')throw new TypeError('Missing recovery callback '+name);
 let active=null,last=Object.freeze({state:'idle',reason:null});
 const mark=(state,reason=null)=>{last=Object.freeze({state,reason});return last};
 const equal=(x,y)=>JSON.stringify(x)===JSON.stringify(y);
 function check(){
  if(!active)return mark('idle');
  if(!equal(readCurrent(),active.context))return mark('blocked','app-context-drift');
  if(!equal(readCamera(),active.camera))return mark('blocked','map-camera-drift');
  return mark('safe-to-return');
 }
 return Object.freeze({
  state:()=>last,
  begin(context,camera){
   if(active||context===null||typeof context!=='object')return false;
   active={context:clone(context),camera:clone(camera)};
   mark('reading');return true;
  },
  requestReturn(){
   if(!active||last.state==='history-pending')return false;
   if(check().state!=='safe-to-return')return false;
   // Invoked only after checking drift, BEFORE navigating history.
   try{
    if(beginHistoryBack()===false){mark('blocked','history-back-refused');return false}
    mark('history-pending');return true;
   }catch(_){mark('blocked','history-back-exception');return false}
  },
  onPopState(){
   if(!active)return false;
   if(check().state!=='safe-to-return')return false;
   try{
    if(closeOverlay({outcome:'restored-original'})===false){mark('blocked','close-refused');return false}
   }catch(_){mark('blocked','close-exception');return false}
   active=null;mark('closed-original');return true;
  },
  // Explicit user acknowledgement: keep newer app state. Not a claim that
  // the earlier context was restored, and never an automatic repair.
  keepCurrent(){
   if(!active||last.state!=='blocked')return false;
   try{
    if(closeOverlay({outcome:'keep-current'})===false)return false;
   }catch(_){return false}
   active=null;mark('closed-current');return true;
  },
  restoreOriginal(){
   if(!active||last.state!=='blocked')return false;
   try{
    if(restoreOriginal(clone(active.context),clone(active.camera))!==true){
      mark('blocked','restore-refused');return false
    }
    if(!equal(readCurrent(),active.context)||!equal(readCamera(),active.camera)){
      mark('blocked','restore-mismatch');return false
    }
    if(closeOverlay({outcome:'restored-original'})===false){
      mark('blocked','close-refused');return false
    }
   }catch(_){mark('blocked','restore-exception');return false}
   active=null;mark('closed-original');return true;
  },
  // Never pretend a deferred history event was successfully handled while
  // another underlying view was active.
  abandon(){if(!active)return false;mark('blocked','requires-explicit-recovery');return true}
 });
}
module.exports={makeRecoveryController};
