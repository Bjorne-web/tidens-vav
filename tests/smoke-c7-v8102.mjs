import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
const ids=['H037','H038','H039','H040','H041','H042'];
const path='data/c7-religionshistorisk-betydelse.v8102.js';
const sandbox={window:{}};vm.createContext(sandbox);
for(const v of [890,891,892,893,894,895,896,897,898,8101]){
 const p='data/c7-religionshistorisk-betydelse.v'+v+'.js';vm.runInContext(read(p),sandbox,{filename:p});
}
const before={...sandbox.window.TIDENS_C7_RELIGION};
assert.equal(Object.keys(before).length,80,'Previous C7 core should contain 80 analyses');
vm.runInContext(read(path),sandbox,{filename:path});
const after=sandbox.window.TIDENS_C7_RELIGION;
assert.deepEqual(Object.keys(after).filter(k=>!(k in before)).sort(),ids);
assert.equal(Object.keys(after).length,86);
for(const [id,v] of Object.entries(before)){assert.equal(after[id].paragraph,v.paragraph);assert.equal(after[id].level,v.level)}
const events=JSON.parse(read('data/data.generated.js').match(/let events=(\\[[\\s\\S]*?\\]);/)[1]);
for(const id of ids){
 assert.ok(events.some(e=>e.id===id),id+' missing in historical base');
 const x=after[id];assert.ok(x.paragraph.split(/\\s+/).length>=175,id+' too brief');
 assert.ok(x.sources.length>=3 && x.sources.some(s=>s[1].includes('bible.com')),id+' sources');
 for(const [label,url] of x.sources){assert.ok(label&&/^https:\\/\\//.test(url),id+' broken source shape')}
}
const html=read('index.html');assert.ok(html.includes('<script src="'+path+'"></script>'));
assert.ok(html.indexOf('v8101.js')<html.indexOf('v8102.js'));
assert.ok(html.includes('v900-timeline-landscape.js')&&html.includes('v887-home-areas.js'));
console.log('C7 omgång 11 PASS: 86 core analyses, H037–H042 added, previous 80 unmodified');
