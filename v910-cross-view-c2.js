/* C2.2: automatic temporal + geographical context on navigation.
 * No new coordinates or boundaries: use established geo markers/regions only.
 * H037 maps to the EXISTING late Bronze Age Levant context (G4), approximate. */
(function(){
'use strict';
let previousMapYear=null;
const snap=()=>window.TidensViewContextC1?.snapshot?.();
const val=()=>snap()?.selectedId||null;
function rangeYear(post){
 const t=post?.temporal;
 if(!Number.isFinite(t?.start)||!Number.isFinite(t?.end)||t.end<t.start)return null;
 const mid=Math.round((t.start+t.end)/2);
 return mid>=-10000&&mid<=150?mid:null;
}
function geoBounds(id){
 if(!id||typeof geo==='undefined'||!window.L)return null;
 const directMarkers=geo.markers.filter(x=>x.linked===id&&Number.isFinite(x.lat)&&Number.isFinite(x.lon));
 const directRegions=geo.regions.filter(x=>(x.linked||[]).includes(id));
 const regions=directMarkers.length||directRegions.length?directRegions:
  id==='H037'?geo.regions.filter(x=>x.id==='G4'):[];
 const coords=[...directMarkers.map(x=>[x.lat,x.lon]),...regions.flatMap(r=>(r.poly||[]).map(([lon,lat])=>[lat,lon]))];
 return coords.length?L.latLngBounds(coords):null;
}
function syncToPost(){
 const s=snap(),id=s?.selectedId;
 if(!id)return;
 const y=rangeYear(s.selectedPost);
 try{
  if(y!==null&&typeof state!=='undefined'){
   if(previousMapYear===null)previousMapYear=state.mapYear;
   state.mapYear=y;
   if(typeof renderMap==='function')renderMap();
  }
  const bounds=geoBounds(id);
  if(bounds&&typeof leafletMap!=='undefined'&&leafletMap){
   leafletMap.invalidateSize();
   leafletMap.fitBounds(bounds.pad(.35),{maxZoom:7,animate:false});
  }
 }catch(err){console.warn('Kartkoppling kunde inte justeras',err)}
}
function restorePreviousTime(){
 if(previousMapYear===null)return;
 try{state.mapYear=previousMapYear;if(typeof renderMap==='function')renderMap()}catch(_){}
 previousMapYear=null;
}
const mapBtn=document.getElementById('navMap'),timelineBtn=document.getElementById('navTimeline');
mapBtn?.addEventListener('click',()=>requestAnimationFrame(()=>requestAnimationFrame(syncToPost)));
timelineBtn?.addEventListener('click',restorePreviousTime);
window.TidensCrossViewC2=Object.freeze({syncToPost,restorePreviousTime});
})();
