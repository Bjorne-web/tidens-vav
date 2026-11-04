'use strict';
const fs=require('node:fs'),assert=require('node:assert/strict');
require('./f5-18-generate-staging.cjs');
fs.mkdirSync('out/f5-19',{recursive:true});
let c2=fs.readFileSync('v910-cross-view-c2.js','utf8');
const marker="let previousMapYear=null;";
assert.equal(c2.split(marker).length,2);
c2=c2.replace(marker,marker+"\nlet mapGeneration=0,lastCompleted=0;");
const old="mapBtn?.addEventListener('click',()=>requestAnimationFrame(()=>requestAnimationFrame(syncToPost)));";
assert.equal(c2.split(old).length,2);
const replacement=`mapBtn?.addEventListener('click',()=>{
 const ticket=++mapGeneration;
 let signaled=false;
 const complete=()=>{
  if(signaled||ticket!==mapGeneration||snap()?.view!=='map')return;
  signaled=true;
  syncToPost();
  lastCompleted=ticket;
  window.dispatchEvent(new CustomEvent('TidensC2MapReady',{detail:{ticket}}));
 };
 requestAnimationFrame(()=>requestAnimationFrame(complete));
 // Responsive rendering can throttle/suspend nested RAF. The bounded
 // fallback uses the *same* guarded completion path, and never runs twice.
 setTimeout(complete,120);
});
document.querySelectorAll('[id^="nav"]').forEach(node=>{
 if(node!==mapBtn)node.addEventListener('click',()=>{mapGeneration++;});
});
window.TidensC2Ready=Object.freeze({current:()=>mapGeneration,completed:()=>lastCompleted});`;
c2=c2.replace(old,replacement);
fs.writeFileSync('out/f5-19/v910-c2-signal-candidate.js',c2);
let html=fs.readFileSync('f5-18-staging-test.html','utf8');
const orig='<script src="v910-cross-view-c2.js"></script>';
assert.equal(html.split(orig).length,2,'v910 original must appear once in staging copy');
html=html.replace(orig,'<script src="out/f5-19/v910-c2-signal-candidate.js"></script>');
for(const f of ['tests/f5-18-stable-open-candidate.js','tests/f5-18-map-probe.js']){
 const tag='<script src="'+f+'"></script>';
 assert.equal(html.split(tag).length,2,'unexpected F5.18 tag '+f);
 html=html.replace(tag,'');
}
html=html.replace('</body></html>',
 '<script src="tests/f5-19-event-open.js"></script><script src="tests/f5-19-probe.js"></script></body></html>');
assert(!fs.readFileSync('index.html','utf8').includes('f5-19-event-open.js'));
fs.writeFileSync('f5-19-staging-test.html',html);
fs.writeFileSync('out/f5-19/scope.json',JSON.stringify({
 phase:'F5.19',strategy:'test-only C2 completion event after actual syncToPost (two RAF frames)',
 note:'Changes only a generated copy of v910 in temporary full-app HTML',
 limitations:['Not production-ready','C2 synchrony is test-only contract','Only Chromium desktop/mobile widths','Not OS back, touch or screenreader']
},null,2)+'\n');
console.log('F5.19 event-driven C2 staging generated');
