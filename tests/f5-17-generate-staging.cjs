'use strict';
const fs=require('node:fs'),assert=require('node:assert/strict');
require('./f5-15-generate-staging.cjs');
fs.mkdirSync('out/f5-17',{recursive:true});
const html=fs.readFileSync('f5-15-staging-test.html','utf8');
const prev='<script src="tests/f5-15-real-app-probe.js"></script>';
assert.equal(html.split(prev).length,2,'F5.15 probe inclusion must be unique');
const draft=html.replace(prev,'<script src="tests/f5-17-map-race-probe.js"></script>');
assert(draft.includes('candidates/f5/f5-full-reader-bridge.js'),'Candidate bridge missing');
assert(!fs.readFileSync('index.html','utf8').includes('f5-17-map-race-probe.js'),'Production app was edited');
fs.writeFileSync('f5-17-staging-test.html',draft);
fs.writeFileSync('out/f5-17/scope.json',JSON.stringify({
 phase:'F5.17',kind:'isolated map race and history conflict audit',
 scenarios:['stable-map','immediate-map','camera-drift','navigation-drift'],
 coverage:'actual app copy with F5.9 candidate; isolated C7 sample O065',
 limitations:['Only Chromium desktop/mobile viewports','No touch or OS back','No manual visual acceptance','No public staging deployment','No rapid sequential switching stress','No production changes']
},null,2)+'\n');
console.log('F5.17 isolated actual map staging generated');
