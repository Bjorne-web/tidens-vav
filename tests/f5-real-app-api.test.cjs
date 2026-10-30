'use strict';
// F5.2: execute narrow real app.js functions in isolated VM, NOT a production integration.
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const app=fs.readFileSync('app.js','utf8');
function actualFunction(name){
 const a=app.indexOf('function '+name+'(');assert(a>=0,'Missing app function '+name);
 const start=a;
 // Real target functions either occupy one line or close with a standalone }.
 const firstEnd=app.indexOf('\n',start);
 const line=app.slice(start,firstEnd);
 if(line.endsWith('}'))return line;
 const final=app.indexOf('\n}',firstEnd);
 assert(final>=0,'Missing function end '+name);
 return app.slice(start,final+2);
}
// Timeline panning uses original function. It preserves the existing span, so
// it is NOT a complete arbitrary min/max zoom-restoration API.
{
 const calls=[],context={state:{min:-1000,max:0},v827Universe:{lo:-2000,hi:300},
  renderAll:()=>calls.push('renderAll'),v827UpdatePan:()=>calls.push('updatePan')};
 vm.runInNewContext(actualFunction('v827MoveViewport'),context,{timeout:2000});
 context.v827MoveViewport(-850);
 assert.equal(context.state.min,-850);
 assert.equal(context.state.max,150);
 assert.deepEqual(calls,['renderAll','updatePan']);
 context.v827MoveViewport(-850);assert.equal(calls.length,2,'No redraw for identical pan');
 // Changing desired span needs a different operation than v827MoveViewport.
 assert.equal(context.state.max-context.state.min,1000);
}
{
 const context={v83Theme:'israel',v83Display:'graph',calls:0,renderExplore(){this.calls++}};
 // Inline function refers to bare renderExplore; count through shared object.
 context.renderExplore=()=>context.calls++;
 vm.runInNewContext(actualFunction('v83SetTheme'),context,{timeout:2000});
 context.v83SetTheme('humans');
 assert.equal(context.v83Theme,'humans');
 assert.equal(context.v83Display,'list');
 assert.equal(context.calls,1);
 context.v83SetTheme('israel');
 assert.equal(context.v83Theme,'israel');
 assert.equal(context.v83Display,'list','Existing API does not restore earlier graph mode!');
}
// Actual mobile reader functions reset scrollTop. The next phase must restore
// it separately, AFTER invoking the existing mobile reader.
{
 const classes=new Set(),focusCalls=[];
 const backdrop={hidden:true},detail={scrollTop:450},
  closeButton={focus(opts){focusCalls.push('close')}},
  prior={isConnected:true,focus(opts){focusCalls.push('prior')}};
 const context={document:{body:{classList:{
  add:x=>classes.add(x),remove:x=>classes.delete(x),contains:x=>classes.has(x)
 }},activeElement:prior},window:{},v84PreviousFocus:null,
  v84HideMore(){},v84Mobile:()=>true,
  el:id=>({detail, v84ReaderBackdrop:backdrop,v84ReaderClose:closeButton})[id]};
 vm.runInNewContext(actualFunction('v84ReaderVisible'),context,{timeout:2000});
 vm.runInNewContext(actualFunction('v84OpenReader'),context,{timeout:2000});
 vm.runInNewContext(actualFunction('v84CloseReader'),context,{timeout:2000});
 context.v84OpenReader();
 assert(classes.has('v84-reader-open'));
 assert.equal(backdrop.hidden,false);
 assert.equal(detail.scrollTop,0,'Opening mobile reader clears prior reader scroll');
 assert.deepEqual(focusCalls,['close']);
 context.v84CloseReader();
 assert.equal(backdrop.hidden,true);
 assert(!classes.has('v84-reader-open'));
 assert.deepEqual(focusCalls,['close','prior']);
}
// Live C2 hooks: switching toward map may alter mapYear, and original function
// can return it; but it does NOT restore Leaflet center or zoom.
{
 const source=fs.readFileSync('v910-cross-view-c2.js','utf8');
 const state={mapYear:-600};
 const selectedPost={temporal:{start:-853,end:-853}};
 const clicks={};
 const bounds={pad:()=>bounds};
 const camera={invalidateSize(){},fitBounds(){this.called=true},called:false};
 const context={
  window:{TidensViewContextC1:{snapshot:()=>({selectedId:'H045',selectedPost})},L:true},
  state,geo:{markers:[{linked:'H045',lat:36,lon:38}],regions:[]},
  L:{latLngBounds:()=>bounds},leafletMap:camera,
  renderMap(){},
  document:{getElementById:id=>({addEventListener:(type,fn)=>{clicks[id]=fn}})},
  requestAnimationFrame(fn){fn()},console
 };
 vm.runInNewContext(source,context,{timeout:2000});
 context.window.TidensCrossViewC2.syncToPost();
 assert.equal(state.mapYear,-853);
 assert.equal(camera.called,true);
 context.window.TidensCrossViewC2.restorePreviousTime();
 assert.equal(state.mapYear,-600);
 // Camera restoration is not performed by restorePreviousTime().
 assert(!('restoreCamera' in context.window.TidensCrossViewC2));
}
console.log('F5.2 real app API behavior: PASS (timeline span, theme mode limitation, mobile reader scroll, mapYear vs camera)');
