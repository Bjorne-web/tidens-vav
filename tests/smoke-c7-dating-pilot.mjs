import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const context={window:{}};
vm.runInNewContext(fs.readFileSync('data/c7-dating-pilot-o119-o122.js','utf8'),context);
const data=context.window.TIDENS_C7_DATING_PILOT;
assert.deepEqual(Object.keys(data).sort(),['O119','O120','O121','O122']);
for(const [id,record] of Object.entries(data)){
 assert(record.title && record.undated,id+' title/uncertainty');
 for(const phase of record.phases){
  assert(['text-composition','material-witness','historical-event','narrated-time'].includes(phase.timeType),id+' typed time');
  assert(['A','B'].includes(phase.evidence),id+' evidence gate');
  assert(Number.isFinite(phase.start)&&Number.isFinite(phase.end)&&phase.end>=phase.start,id+' dates');
  assert(phase.typeLabel && phase.reason,id+' phase annotation');
  assert(phase.sources.length>=2&&phase.sources.every(x=>x.url.startsWith('https://')),id+' sources');
 }
}
assert.equal(data.O119.phases[0].timeType,'text-composition');
assert.equal(data.O120.phases[0].timeType,'material-witness');
assert.equal(data.O121.phases.length,0);
assert.equal(data.O122.phases.length,0);
const renderer=fs.readFileSync('v839-temaspar-context.js','utf8');
assert(renderer.includes('window.TIDENS_C7_DATING_PILOT?.[focus.id]'));
assert(renderer.includes('typeLabel'));
const html=fs.readFileSync('index.html','utf8');
assert(html.indexOf('data/c7-dating-pilot-o119-o122.js')<html.indexOf('v839-temaspar-context.js'));
console.log('C7 dating pilot checks pass.');
