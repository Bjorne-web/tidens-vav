'use strict';
const fs=require('node:fs'),assert=require('node:assert/strict');
require('./f5-17-generate-staging.cjs');
fs.mkdirSync('out/f5-18',{recursive:true});
const input=fs.readFileSync('f5-17-staging-test.html','utf8');
const existing='<script src="tests/f5-17-map-race-probe.js"></script>';
assert.equal(input.split(existing).length,2,'Expect F5.17 map probe once');
const scripts='<script src="tests/f5-18-stable-open-candidate.js"></script>'+
 '<script src="tests/f5-18-map-probe.js"></script>';
const html=input.replace(existing,scripts);
assert(!fs.readFileSync('index.html','utf8').includes('f5-18-stable-open-candidate.js'));
fs.writeFileSync('f5-18-staging-test.html',html);
fs.writeFileSync('out/f5-18/scope.json',JSON.stringify({
 phase:'F5.18',candidate:'opt-in map stabilization before opening article',
 baseline:'F5.17 immediate map opening generated blocked camera-changed in desktop/mobile',
 tested:['stable-map','immediate-map','camera-drift','navigation-drift','cancel-pending'],
 limitations:['Stability is sampled at 75ms; not a complete Leaflet moveend contract',
 'No repeated stress or actual hardware','No real production quick-reader button','No production or deployment']
},null,2)+'\n');
console.log('F5.18 isolated map stabilization candidate generated');
