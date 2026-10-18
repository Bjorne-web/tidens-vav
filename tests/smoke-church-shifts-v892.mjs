/* Granskning 6: versioned editorial timeline and dual-lane preview checks. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
const html=read('index.html');
const data=read('data/church-interpretation-shifts.v892.js');
const js=read('v892-church-shifts.js');
const css=read('v892-church-shifts.css');
for(const asset of ['data/church-interpretation-shifts.v892.js','v892-church-shifts.js','v892-church-shifts.css'])assert.ok(html.includes(asset),'Missing index asset '+asset);
assert.ok(html.indexOf('data/church-interpretation-shifts.v892.js')<html.indexOf('v892-church-shifts.js'));
assert.doesNotThrow(()=>new vm.Script(data));assert.doesNotThrow(()=>new vm.Script(js));
const ctx={window:{}};vm.runInNewContext(data,ctx);
const m=ctx.window.TIDENS_CHURCH_SHIFTS_V892;
assert.ok(m&&m.topics&&m.events,'Missing editorial data');
assert.equal(m.topics.length,12,'D2 themes + ocker and same-sex: 12');
assert.ok(m.events.length>=23,'Expected world and church anchors');
assert.equal(new Set(m.topics.map(x=>x.id)).size,m.topics.length);
const known=new Set(m.topics.map(x=>x.id));
for(const topic of m.topics){
 assert.ok(topic.title&&topic.brief&&topic.detail.length>=2&&topic.questions.length>=2,'Missing depth '+topic.id);
 assert.ok(topic.sources.length>0&&topic.sources.every(s=>s[1].startsWith('https://')),'Missing primary source '+topic.id);
}
for(const event of m.events){
 assert.ok(known.has(event.topic),'Unknown topic for '+event.title);
 assert.ok(Number.isInteger(event.year)&&event.year>=1500&&event.year<=2026,'Invalid time anchor '+event.year);
 assert.ok(['church','world'].includes(event.lane));
 assert.ok(event.source.startsWith('https://'),'Invalid timeline source');
}
assert.ok(m.events.some(e=>e.year===1958&&e.topic==='women'&&e.lane==='church'));
assert.ok(m.events.some(e=>e.year===2009&&e.topic==='same-sex'&&e.lane==='church'));
assert.ok(m.events.some(e=>e.year===2009&&e.topic==='same-sex'&&e.lane==='world'));
assert.ok(m.events.some(e=>e.year===2023&&e.title.includes('Fiducia')));
assert.ok(m.events.some(e=>e.year===2023&&e.title.includes('Church of England')));
const mainTheme=m.topics.find(t=>t.id==='same-sex');
assert.equal(mainTheme.sections?.length,7,'Sexuality research needs seven fully described subtopics');
assert.ok(mainTheme.sections.every(s=>s.title&&s.body.length>=170),'Missing nuanced text');
assert.ok(js.includes('v892-chapter-list'),'Extra research chapters must be presented');
assert.match(js,/Tidsankarna är daterade händelser/);
assert.ok(js.includes('data-event')&&js.includes('data-choose-topic')&&js.includes('scrollIntoView'));
assert.ok(js.includes('www.bible.com/sv/bible/154'));
assert.ok(css.includes('max-width:680px')&&css.includes('grid-template-columns'),'Missing mobile timeline');
const hook={readyState:'loading',addEventListener(){}};
assert.doesNotThrow(()=>vm.runInNewContext(js,{window:ctx.window,document:hook}));
console.log('Granskning 6 PASS – 12 themes, '+m.events.length+' dates, church/world lanes, source links, responsive timeline.');
