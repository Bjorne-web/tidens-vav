// V8.46 source boundary regression
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
const ctx={};
vm.runInNewContext(read('data/data.generated.js'),ctx);
const original=vm.runInNewContext('originalEvents',ctx);
const research=vm.runInNewContext('events',ctx);
assert.equal(original.length,129);
assert.equal(research.length,64);
assert.equal(new Set([...original,...research].map(x=>x.id)).size,193);
assert.ok(original.every(x=>x.id.startsWith('O')));
assert.ok(research.every(x=>x.id.startsWith('H')));
const app=read('app.js');
for(const marker of ['function idEvent(id)','function renderArchive()','const original=originalEvents.find','const orig=originalEvents.find','...originalEvents.map','const docs=originalEvents.map']) {
 assert.ok(app.includes(marker),'Missing original data dependency: '+marker);
}
assert.ok(read('index.html').includes('id="archiveView"'));
console.log('V8.46: 193 unique records and critical migration dependencies preserved');
