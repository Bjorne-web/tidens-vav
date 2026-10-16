import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const data=fs.readFileSync('data/data.generated.js','utf8');
const lilith=fs.readFileSync('data/lilith.v888-draft.js','utf8');
const page=fs.readFileSync('index.html','utf8');
assert.ok(page.includes('<script src="data/lilith.v888-draft.js"></script>'),'overlay script linked');
assert.ok(page.indexOf('data/lilith.v888-draft.js')<page.indexOf('app.js'),'data before app');
const context={window:{}};
vm.createContext(context);
vm.runInContext(data+'\n;globalThis.__test={events,research};',context);
const oldCount=context.__test.events.length;
vm.runInContext(lilith,context);
assert.equal(context.__test.events.length,oldCount+2);
for(const id of ['H066','H067']){
 const match=context.__test.events.filter(e=>e.id===id);
 assert.equal(match.length,1);
 assert.equal(match[0].category,'Religion & texter');
 assert.equal(match[0].reviewed,false);
 assert.ok(match[0].start<=match[0].end);
 assert.ok(context.__test.research[id].overview);
 assert.ok(context.__test.research[id].sources.length>=3);
}
vm.runInContext(lilith,context);
assert.equal(context.__test.events.length,oldCount+2,'overlay idempotent');
assert.ok(context.__test.events.find(e=>e.id==='H066').end<0);
assert.ok(context.__test.events.find(e=>e.id==='H067').start>=700);
console.log('Lilith draft integration checks passed');