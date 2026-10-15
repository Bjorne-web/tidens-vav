import fs from 'node:fs';
import assert from 'node:assert/strict';
const html=fs.readFileSync('index.html','utf8');
const code=fs.readFileSync('v879-timeline-layout.js','utf8');
assert.ok(html.includes('Version 8.79'));
assert.ok(html.includes('v879-timeline-layout.js'));
for(const s of ['catFilters','evFilters','Markera alla','Avmarkera alla'])assert.ok(code.includes(s));
console.log('V8.79 filter checks OK');
