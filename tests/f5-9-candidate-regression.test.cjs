'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),cp=require('node:child_process');
const active=fs.readFileSync('v897-research-read-model.js','utf8');
const candidate=fs.readFileSync('candidates/f5/v897-research-read-model.js','utf8');
cp.execFileSync(process.execPath,['tests/f5-8-generate-provenance-candidate.cjs']);
const previous=fs.readFileSync('out/f5/candidate/v897-provenance-candidate.js','utf8');
assert.equal(candidate,previous,'Candidate must match previously vetted minimal v897 fix byte-for-byte');
assert.notEqual(candidate,active,'Candidate must not be the original broken model');
assert(fs.readFileSync('index.html','utf8').includes('<script src="v897-research-read-model.js"></script>'),
 'Published HTML must continue using original script pending release decision');
assert(!fs.readFileSync('index.html','utf8').includes('f5-full-reader-bridge.js'));
const reader=fs.readFileSync('candidates/f5/f5-full-reader-bridge.js','utf8');
assert(reader.includes("window.TidensF5CandidateConfig?.enabled!==true"),'Candidate must fail closed without explicit opt-in');
assert(reader.includes('function requestClose()'),'Explicit return function required');
assert(reader.indexOf('const reason=changed();if(reason){block(reason);return false}')<
 reader.indexOf("audit.push('back-request');history.back()"),'Preflight must precede browser history');
assert(reader.includes("audit.push('close:'+outcome)"),'Distinguish restored-original versus keep-current');
assert(reader.includes('session.historyPopped=true'),'Browser Back path must be tracked');
for(const p of ['candidates/f5/v897-research-read-model.js','candidates/f5/f5-full-reader-bridge.js']){
 cp.execFileSync(process.execPath,['--check',p]);
}
console.log('F5.9 production-shaped candidate: PASS – v897 identical to vetted fix, opt-in only, preflight before history, active app untouched');
