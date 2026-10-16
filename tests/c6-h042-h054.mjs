import assert from 'node:assert/strict';
import fs from 'node:fs';
const data=fs.readFileSync('data/review-ledger.js','utf8');
for(const key of ['H042:', 'H054:']) assert.ok(data.includes(key));
console.log('H042 and H054 research records remain present.');
