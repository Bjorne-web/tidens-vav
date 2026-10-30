'use strict';
// Generates a test-only full application HTML using F5.9 candidate files.
// The published index.html and v897 are never edited.
const fs=require('node:fs'),assert=require('node:assert/strict');
require('./f5-generate-real-reader-copy.cjs');
const existing=fs.readFileSync('f5-real-reader-test.html','utf8');
const oldModel='<script src="v897-research-read-model.js"></script>';
assert.equal(existing.split(oldModel).length,2,'v897 original script not found exactly once');
const oldBridge='<script src="tests/f5-real-reader-bridge.js"></script>';
assert.equal(existing.split(oldBridge).length,2,'Old F5 test bridge not found exactly once');
const candidateModel='<script src="candidates/f5/v897-research-read-model.js"></script>';
const candidateBridge='<script>window.TidensF5CandidateConfig={enabled:true,articles:window.__F5TestOnlyArticles,css:window.__F5TestOnlyReaderCss};</script>'+
 '<script src="candidates/f5/f5-full-reader-bridge.js"></script>'+
 '<script src="tests/f5-9-staging-probe.js"></script>';
const copy=existing.replace(oldModel,candidateModel).replace(oldBridge,candidateBridge);
fs.writeFileSync('f5-9-staging-test.html',copy,'utf8');
const published=fs.readFileSync('index.html','utf8');
assert(!published.includes('f5-full-reader-bridge.js'),'Candidate script accidentally linked in production');
assert(published.includes(oldModel),'Production v897 must remain original');
console.log('F5.9 staged copy generated; production HTML unchanged');
