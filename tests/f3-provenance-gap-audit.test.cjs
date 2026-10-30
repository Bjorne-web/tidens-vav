'use strict';
// Non-production F3 contract audit: documented limitations of current adapter.
const fs=require('node:fs'),assert=require('node:assert/strict');
const model=fs.readFileSync('v897-research-read-model.js','utf8');
const dating=fs.readFileSync('data/c7-dating-o067-gilgamesh.js','utf8');
const religion=fs.readFileSync('data/c7-religionshistorisk-betydelse.v890.js','utf8');
// Presence of source-specific records and absence of their integration in generic read model.
assert.match(dating,/TIDENS_C7_DATING_GILGAMESH/);
assert.match(dating,/"timeType":\s*"material-witness"/);
assert.doesNotMatch(model,/TIDENS_C7_DATING_GILGAMESH/);
assert.match(religion,/TIDENS_C7_RELIGION/);
assert.match(model,/const religion=maybe\('TIDENS_C7_RELIGION',id\)/);
assert.match(model,/provenance\[key\]=\{layer:layer.label,field\}/);
assert.doesNotMatch(model,/provenance\.religion\s*=/);
assert.match(model,/return v}}}/);
console.log('F3 provenance-gap audit: PASS (records present; read model lacks temporal C7 integration and religion field provenance)');
