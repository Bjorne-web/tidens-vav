'use strict';
// F5.8 PROPOSAL ONLY: generate a minimal v897 provenance fix in out/f5/candidate.
// Does not write the production v897-research-read-model.js file.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const original=fs.readFileSync('v897-research-read-model.js','utf8');
const oldDeclaration=' const postProvenance=Object.freeze({...provenance});\n';
const oldUse='  sources:Object.freeze(sources),provenance:postProvenance,';
const newUse='  sources:Object.freeze(sources),provenance:Object.freeze({...provenance}),';
assert.equal(original.split(oldDeclaration).length,2,'Unexpected original v897 provenance declaration, STOP');
assert.equal(original.split(oldUse).length,2,'Unexpected original v897 provenance field, STOP');
assert(original.indexOf(oldDeclaration)<original.indexOf("summary:pick('summary'"),'Upstream v897 changed; STOP for review');
const output=original.replace(oldDeclaration,'').replace(oldUse,newUse);
assert(!output.includes('postProvenance'),'Removed premature snapshot ref');
assert(output.includes("summary:pick('summary'"),'Read-model selection remains present');
const dir='out/f5/candidate';fs.mkdirSync(dir,{recursive:true});
fs.writeFileSync(path.join(dir,'v897-provenance-candidate.js'),output,'utf8');
const countChanged=(original.length-output.length);
fs.writeFileSync(path.join(dir,'CHANGELOG.txt'),
 'F5.8 – enbart isolerat förslag på korrigerad v897-källspårning.\n'+
 'Kopierar proveniens i snapshot-objektet EFTER summary/context/impact/limits har hämtats.\n'+
 'Originalfilen v897-research-read-model.js är oförändrad.\n'+
 'Ingen produktion och ingen merge till main.\n'+
 'Längdskillnad i förslaget: '+countChanged+' tecken.\n','utf8');
console.log('F5.8 candidate generated from unchanged real v897; minimal provenance snapshot shift:',countChanged,'characters');
