'use strict';
const fs=require('node:fs');
const assert=require('node:assert/strict');
require('./f5-15-generate-staging.cjs');
fs.mkdirSync('out/f5-16',{recursive:true});
const base=fs.readFileSync('f5-15-staging-test.html','utf8');
const priorScript='<script src="tests/f5-15-real-app-probe.js"></script>';
assert.equal(base.split(priorScript).length,2,'Expected F5.15 probe exactly once');
const originalProbe=fs.readFileSync('tests/f5-15-real-app-probe.js','utf8');
const explore="const tab=document.getElementById('navExplore');";
assert.equal(originalProbe.split(explore).length,2,'Expected Explore selector once');
let timelineProbe=originalProbe.replace(explore,"const tab=document.getElementById('navTimeline');");
const snapshotNeedle="const initial=reader.getSnapshot(),camera=reader.getCamera(),url=location.href;";
assert.equal(timelineProbe.split(snapshotNeedle).length,2,'Expected snapshot check once');
const frameWait="await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));";
assert.equal(timelineProbe.split(frameWait).length,2,'Expected navigation frame wait exactly once');
timelineProbe=timelineProbe.replace(frameWait,"await wait(250);");
// Time-bounded wait avoids an unresolved nested animation frame on responsive navigation.
timelineProbe=timelineProbe.replace(snapshotNeedle,
 "const initial=reader.getSnapshot(),camera=reader.getCamera(),url=location.href;\n test(initial?.view==='timeline','Expected actual timeline view; got '+initial?.view);");
assert(!timelineProbe.includes('\\n'),'Unexpected literal backslash-n in probe');
fs.writeFileSync('out/f5-16/timeline-probe.js',timelineProbe);
fs.writeFileSync('f5-16-staging-test.html',base.replace(priorScript,'<script src="out/f5-16/timeline-probe.js"></script>'));
fs.writeFileSync('out/f5-16/scope.json',JSON.stringify({
phase:'F5.16',purpose:'actual app timeline tab on desktop and mobile viewport, 33 C7 articles',
production:false,
outOfScope:['mobile native OS back','map animation race','manual visual review','production quick-reader entry point','real device touch and screen reader']
},null,2));
console.log('F5.16 real timeline staging generated using F5.15 candidate, no production files edited');
