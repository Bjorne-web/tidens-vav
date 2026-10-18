/* Granskning 5 · Nihilism V8.92. Kör med node tests/smoke-nihilism-v892.mjs */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
const html=read('index.html');
const data=read('data/nihilism.v892.js');
const impact=read('data/c7-nihilism.v892.js');
const ui=read('v892-nihilism-research.js');
const css=read('v892-nihilism-research.css');
const expected=['H070','H071','H072','H073','H074','H075'];
for(const file of [data,impact,ui])new vm.Script(file);
assert.match(html,/v892-nihilism-research.css/);
assert.match(html,/v892-nihilism-research.js/);
const positions=['data/data.generated.js','data/nihilism.v892.js','data/c7-nihilism.v892.js','app.js','v892-nihilism-research.js'].map(x=>html.indexOf('src="'+x+'"'));
assert.ok(positions.every(x=>x>=0),'All resources must be included');
assert.ok(positions.every((x,i)=>i===0||x>positions[i-1]),'Load order must preserve timeline and C7 registry');
const sandbox={events:[],research:{},window:{TIDENS_C7_RELIGION:{}}};
vm.createContext(sandbox);vm.runInContext(data,sandbox);vm.runInContext(impact,sandbox);
assert.deepEqual([...sandbox.window.TIDENS_NIHILISM.ids],expected);
assert.equal(sandbox.events.length,6);
assert.deepEqual(sandbox.events.map(x=>x.start),[1799,1849,1862,1882,1887,1942]);
for(const id of expected){
 const e=sandbox.events.find(x=>x.id===id),r=sandbox.research[id],c=sandbox.window.TIDENS_C7_RELIGION[id];
 assert.ok(e&&r&&c,id+' has event, research and religion section');
 assert.equal(e.reviewed,false,id+' is not falsely reviewed');
 assert.equal(e.start,e.end,id+' represents publication, not imagined epoch');
 assert.ok(r.overview.length>320&&r.parallels.length>160&&r.caution.length>100,id+' has a substantial article');
 assert.ok(r.sources.length>=2&&r.sources.every(x=>/^https:\/\//.test(x[1])),id+' sources are links');
 assert.ok(c.paragraph.length>=900&&c.sources.length>=2,id+' has distinct substantial religious impact');
 assert.ok(ui.includes('tv_id=')&&ui.includes(id)===false,'Records appear via central date index rather than duplicate articles');
}
vm.runInContext(data,sandbox);assert.equal(sandbox.events.length,6,'Rerender must not duplicate records');
assert.ok(ui.includes('v892NihilismTrack')&&ui.includes('details class="v891-section"'));
assert.ok(ui.includes('TidensReview2BibleLink')&&ui.includes('replace(/\\[\\[([^\\]]+)\\]\\]/g'));
assert.match(css,/v892-chronology-grid/);
console.log('V8.92 nihilism: OK – 6 daterade poster, 6 individuella C7-analyser, 8 fördjupningsavsnitt, läsbara länkar.');
