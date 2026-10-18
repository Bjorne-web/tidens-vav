/* V8.96 – Nihilism + V8.95 research hub integration */
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const html=read('index.html'),hub=read('v893-research-hub.js'),gantt=read('v894-research-gantt.js');
const data=read('data/nihilism.v892.js'),c7=read('data/c7-nihilism.v892.js'),chron=read('data/nihilism-research-gantt.v896.js'),research=read('v892-nihilism-research.js');
for(const s of [data,c7,chron,hub,gantt,research])new vm.Script(s);
const ids=['H070','H071','H072','H073','H074','H075'];
const paths=['data/data.generated.js','data/nihilism.v892.js','data/c7-nihilism.v892.js','app.js','data/research-chronology.v894.js','data/nihilism-research-gantt.v896.js','v893-research-hub.js','v894-research-gantt.js','v892-nihilism-research.js'];
const positions=paths.map(p=>html.indexOf('src="'+p+'"'));
assert.ok(positions.every(i=>i>=0));
assert.ok(positions.every((i,k)=>k===0||i>positions[k-1]),'Load ordering');
assert.match(html,/v8\.96-nihilism-publish-20261018/);
assert.match(html,/href="v892-nihilism-research\.css"/);
const sandbox={events:[],research:{},window:{TIDENS_C7_RELIGION:{},TIDENS_BIG_QUESTIONS_TIMELINE:{events:[]}}};
vm.createContext(sandbox);
vm.runInContext(data,sandbox);vm.runInContext(c7,sandbox);vm.runInContext(chron,sandbox);
assert.deepEqual([...sandbox.events.map(e=>e.id)],ids);
const questionEvents=sandbox.window.TIDENS_BIG_QUESTIONS_TIMELINE.events;
assert.equal(questionEvents.length,6);
assert.deepEqual([...questionEvents.map(e=>e.relatedPostId)],ids);
assert.ok(questionEvents.every(e=>e.topics.includes('nihilism')));
for(const e of sandbox.events){
assert.ok(sandbox.research[e.id]?.sources.length>=2);
assert.ok(sandbox.window.TIDENS_C7_RELIGION[e.id]?.paragraph.length>900);
assert.equal(e.reviewed,false);
}
vm.runInContext(chron,sandbox);assert.equal(questionEvents.length,6,'No duplicate chronology markers');
assert.ok(hub.includes("id:'nihilism'"));
assert.ok(hub.includes("target:'v892NihilismTrack'"));
assert.ok(hub.includes("'v892NihilismTrack'")&&hub.includes("'nihilism'") );
assert.ok(gantt.includes("'nihilism'"));
assert.ok(gantt.includes('nihilism:['));
assert.ok(research.includes('TidensResearchHub.select(id)'));
console.log('V8.96 OK: sex poster, C7 per post, research hub card and native graph timeline; no duplicate events.');
