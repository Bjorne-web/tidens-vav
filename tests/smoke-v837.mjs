// V8.37 – källkritiska C6-textförtydliganden och regressionsskydd.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';

const root=path.resolve(import.meta.dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const index=read('index.html');
const overlay='data/c6-text-clarifications.v837.js';
assert.ok(index.includes('Version 8.37'),'Förväntar V8.37');
assert.ok(index.includes(overlay),'C6-förtydliganden laddas inte');
assert.ok(index.indexOf('data/data.generated.js')<index.indexOf(overlay),'C6 måste läsas efter grunddata');
assert.ok(index.indexOf(overlay)<index.indexOf('src="app.js"'),'C6 måste läsas före programstart');
for(const file of [overlay,'v836-c6-progress.js','data/c6-progress.js'])
  execFileSync(process.execPath,['--check',path.join(root,file)]);

const sandbox={window:{}};
vm.createContext(sandbox);
vm.runInContext(read('data/data.generated.js'),sandbox);
const original=vm.runInContext('events.map(e=>({id:e.id,start:e.start,end:e.end,title:e.title,evidence:e.evidence,reviewed:e.reviewed,description:e.description}))',sandbox);
const origById=new Map(original.map(e=>[e.id,e]));
vm.runInContext(read(overlay),sandbox);
const updated=vm.runInContext('events.map(e=>({id:e.id,start:e.start,end:e.end,title:e.title,evidence:e.evidence,reviewed:e.reviewed,description:e.description}))',sandbox);
const corrected=updated.filter(e=>e.description!==origById.get(e.id)?.description);
const intended=['H019','H020','H021','H023','H024','H025','H009','H017','H037','H042','H034'];
assert.deepEqual(Array.from(corrected,e=>e.id).sort(),intended.slice().sort(),'Bara de 11 avsedda beskrivningarna får ändras');
for(const e of updated){
 const o=origById.get(e.id);
 for(const key of ['start','end','title','evidence','reviewed'])
   assert.equal(e[key],o[key],e.id+': detta fält får inte ändras: '+key);
}
assert.equal(sandbox.window.TIDENS_C6_CORRECTIONS.appliedIds.length,11);
assert.ok(corrected.find(e=>e.id==='H034')?.description.includes('P52'));
assert.ok(corrected.find(e=>e.id==='H023')?.description.includes('Antiochos IV'));
assert.ok(corrected.find(e=>e.id==='H042')?.description.includes('691'));
const references=vm.runInContext('Object.fromEntries(["H009","H017","H019","H020","H021","H023","H024","H025","H034","H037","H042"].map(id=>[id,research[id]?.sources||[]]))',sandbox);
for(const [id,refs] of Object.entries(references)){
 assert.ok(refs.length>0,'Research sources missing for '+id);
 for(const r of refs){assert.ok(Array.isArray(r)&&typeof r[0]==='string'&&typeof r[1]==='string');}
}
vm.runInContext(read('data/c6-progress.js'),sandbox);
vm.runInContext(read('data/review-ledger.js'),sandbox);
const p=sandbox.window.TIDENS_C6_PROGRESS;
assert.equal(new Set(p.proposedCorrectionIds).size,11);
assert.deepEqual(new Set(p.implementedCorrectionIds),new Set(intended));
assert.equal(p.partialReportIds.length,36,'Delgranskningsrapporterna får inte räknas om vid textändring');
assert.equal(Object.keys(sandbox.window.TIDENS_REVIEW_LEDGER.completePostReviews).length,0);
assert.ok(read('v836-c6-progress.js').includes('Införda textförtydliganden'));
console.log('OK: exactly 11 descriptions corrected, original dates preserved, C6 progress updated and no false scientific approval.');
