/* V8.92 – tests for source-backed church reinterpretation timelines. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
const html=read('index.html');
const source=read('v892-church-shifts.js');
const css=read('v892-church-shifts.css');
const dataSource=read('data/church-shifts.v892.js');
for(const asset of ['data/church-shifts.v892.js','v892-church-shifts.js','v892-church-shifts.css'])assert.ok(html.includes(asset),'Missing page link to '+asset);
assert.ok(html.indexOf('data/church-shifts.v892.js')<html.indexOf('v892-church-shifts.js'),'Research source must load first');
assert.ok(html.indexOf('v891-expanded-research.js')<html.indexOf('v892-church-shifts.js'),'Bible deep link integration must load first');
for(const js of [dataSource,source])assert.doesNotThrow(()=>new vm.Script(js),'Invalid JS');
const window={TidensReview2BibleLink:ref=>'<a href="https://www.bible.com/sv/bible/154/MAT.5.1.B2000">'+ref+'</a>'};
vm.runInNewContext(dataSource,{window});
const data=window.TIDENS_CHURCH_SHIFTS;
assert.equal(data.topics.length,12);
assert.equal(data.events.length,67);
assert.deepEqual([...new Set(data.events.map(x=>x.lane))].sort(),['church','science','society']);
assert.equal(new Set(data.events.map(x=>x.id)).size,data.events.length);
assert.ok(data.events.every(e=>Number.isInteger(e.year)&&e.year>=1&&e.year<=2026));
assert.ok(data.events.every(e=>e.source.startsWith('https://')&&e.certainty&&e.detail&&e.topic));
assert.ok(data.events.every(e=>data.topics.some(t=>t.id===e.topic)),'Every event must belong to documented theme');
assert.ok(data.events.find(e=>e.year===1958)?.title.includes('kvinnliga präster'));
assert.ok(data.events.find(e=>e.year===1960)?.title.includes('kvinnliga präster'));
assert.ok(data.events.find(e=>e.year===2005)?.title.includes('partnerskapsvälsignelse'));
assert.ok(data.events.find(e=>e.year===2009)?.title.includes('samkönade'));
assert.ok(data.events.some(e=>e.year===1944&&e.lane==='society'));
assert.equal(new Set(data.events.map(e=>e.topic)).size,12,'Every theme must have at least one chronological anchor');
assert.ok(data.topics.every(t=>data.events.filter(e=>e.topic===t.id).length>=4),'Every topic needs at least four milestones');
assert.ok(css.includes('max-width:790px')&&css.includes('max-width:520px'),'Responsive layouts missing');
let exists=false;
const fields={tvcsTopics:'',tvcsTimeline:'',tvcsReading:'',tvcsWorld:{checked:true}};
const listeners={};let replacements=0;
const host={
 querySelector(sel){if(sel==='#tvChurchShifts')return exists?{}:null;if(sel==='#v890Nav')return {insertAdjacentHTML(_,mark){exists=mark.includes('tvChurchShifts');replacements++}};return null},
 insertAdjacentHTML(_,mark){exists=mark.includes('tvChurchShifts');replacements++},
 addEventListener(k,fn){listeners[k]=fn}
};
const document={readyState:'complete',getElementById(id){
 if(id==='researchView')return host;if(id==='tvChurchShifts'&&exists)return{};
 if(!(id in fields))return null;
 return {set innerHTML(v){fields[id]=v},get innerHTML(){return fields[id]},
 set checked(v){fields[id]={checked:v}},get checked(){return fields[id]?.checked}};
}};
class MO{constructor(cb){this.cb=cb}observe(){}}
class SafeURL{constructor(url){if(!url.startsWith('https://'))throw Error('unsafe');this.protocol='https:';this.href=url}}
vm.runInNewContext(source,{window,document,MutationObserver:MO,URL:SafeURL});
assert.ok(exists);
assert.ok(fields.tvcsTimeline.includes('Stonewallupproret'),'Timeline did not render');
assert.ok(fields.tvcsTopics.includes('Samkönade relationer'));
assert.ok(!fields.tvcsReading.includes('Fördjupning: Homosexualitet'),'Longform should not dominate all view');
const event=([s,data])=>({target:{closest:key=>key===s?{dataset:data}:null}});
listeners.click(event(['[data-tvcs-topic]',{tvcsTopic:'sexuality'}]));
assert.equal(window.TidensChurchShiftsV1.getState().topic,'sexuality');
assert.ok(fields.tvcsReading.includes('Fördjupning: Homosexualitet'));
assert.ok(fields.tvcsReading.includes('LEV.18')||fields.tvcsReading.includes('3 Mos 18'));
assert.ok(fields.tvcsTimeline.includes('Stonewallupproret'));
assert.ok(!fields.tvcsTimeline.includes('Kopernikus'));
const first=data.events.find(x=>x.topic==='sexuality'&&x.lane==='church');
listeners.click(event(['[data-tvcs-event]',{tvcsEvent:first.id}]));
assert.ok(fields.tvcsTimeline.includes(first.detail),'Clicked point detail must open');
listeners.change({target:{id:'tvcsWorld',checked:false}});
assert.ok(!fields.tvcsTimeline.includes('Stonewallupproret'),'Hide social history when requested');
assert.ok(fields.tvcsTimeline.includes('partnerskapsvälsignelse'));
listeners.click(event(['[data-tvcs-topic]',{tvcsTopic:'women'}]));
assert.ok(fields.tvcsTimeline.includes('1958'));
assert.ok(!fields.tvcsTimeline.includes('1973'));
assert.equal(replacements,1,'Module must be installed once');
console.log('V8.92 PASS – 67 source-backed milestones, 12 themes, scripture, filters, source details and responsive layout');
