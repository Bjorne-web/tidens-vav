'use strict';
// F3: real content examples for textual vs substantive classification.
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const {classifyTextVariants}=require('./f3-provenance-core.cjs');
const line=fs.readFileSync('data/data.generated.js','utf8').split('\n')
 .find(line=>line.startsWith('const allOriginalResearchV828='));
assert(line);
const original=JSON.parse(line.slice(line.indexOf('=')+1).replace(/;\s*$/,''));
const context=vm.createContext({window:{}});
vm.runInContext(fs.readFileSync('data/special-research.v840.js','utf8'),context,{timeout:2000});
const sargonSourceLine=fs.readFileSync('data/data.generated.js','utf8').split('\n')
 .find(line=>line.startsWith('const sourceCardsV810='));
assert(sargonSourceLine);
const cards=JSON.parse(sargonSourceLine.slice(sargonSourceLine.indexOf('=')+1).replace(/;\s*$/,''));
const sargon=classifyTextVariants([original.O073.summary,cards.O073.summary]);
assert.equal(sargon.kind,'editorial-extension-candidate');
assert(sargon.requiresReview,'Editorial extension still needs human review');
const zoro=classifyTextVariants([original.O030.summary,context.window.TIDENS_SPECIAL_RESEARCH.O030.summary]);
assert.equal(zoro.kind,'requires-semantic-review');
assert.notEqual(zoro.kind,'substantive-conflict');
assert.equal(classifyTextVariants([original.O068.summary,original.O068.summary]).kind,'identical');
console.log('F3 real classification: O073 editorial extension candidate, O030 human semantic review');
