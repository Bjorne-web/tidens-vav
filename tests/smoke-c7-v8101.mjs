/* C7 V8.101: eight historical-religious dossiers, with source and Bible access. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const root=new URL('../',import.meta.url);
const read=p=>fs.readFileSync(new URL(p,root),'utf8');
const index=read('index.html');
const path='data/c7-religionshistorisk-betydelse.v8101.js';
const content=read(path);
assert.doesNotThrow(()=>new vm.Script(content),'C7 data must parse');
const prior=Array.from({length:9},(_,i)=>'data/c7-religionshistorisk-betydelse.v'+(890+i)+'.js');
const sandbox={window:{}};vm.createContext(sandbox);
for(const p of prior)vm.runInContext(read(p),sandbox,{filename:p});
const earlier={...sandbox.window.TIDENS_C7_RELIGION};
vm.runInContext(content,sandbox,{filename:path});
const final=sandbox.window.TIDENS_C7_RELIGION;
const expected=Array.from({length:8},(_,i)=>'H'+String(47+i).padStart(3,'0'));
const added=Object.keys(final).filter(id=>!(id in earlier)).sort();
assert.deepEqual(added,expected,'Only the eight existing H047-H054 may be added');
assert.equal(Object.keys(final).length,Object.keys(earlier).length+8,'Keep all earlier C7 analysis entries');
for(const [id,v] of Object.entries(earlier)){
 assert.equal(final[id].paragraph,v.paragraph,'Previously approved analysis changed: '+id);
 assert.equal(final[id].level,v.level,'Previously approved certainty changed: '+id);
}
const events=JSON.parse(read('data/data.generated.js').match(/let events=(\[[\s\S]*?\]);/)[1]);
for(const id of expected){
 const event=events.find(e=>e.id===id);
 assert.ok(event,id+' must be a pre-existing historical record, not a newly invented post');
 const d=final[id];
 assert.ok(d&&d.paragraph&&d.level,id+' must have meaningful standalone C7 analysis');
 assert.ok(d.paragraph.length>=1100&&d.paragraph.split(/\s+/).length>=175,id+' insufficient depth');
 assert.ok(!/återstår att särskilt granska|Texternas betydelse inom/i.test(d.paragraph),id+' generic placeholder');
 assert.ok(/israel|juda|juden|judendom|judisk|judeisk/i.test(d.paragraph),id+' lacks relationship to Israel/Judaism');
 assert.ok(/kristendom|kristen|kristna|kristet|kristna/i.test(d.paragraph),id+' lacks bounded Christian reception');
 assert.ok(/diskuter|omstrid|tolkning|inte|ingen|osäker|måste/i.test(d.paragraph),id+' missing source-critical reservation');
 assert.ok(d.sources.length>=3,id+' insufficient source coverage');
 const links=new Set();
 for(const [name,url] of d.sources){
  assert.ok(name&&name.length>=24,id+' unlabeled source');
  assert.match(url,/^https:\/\/[^\s<>"]+$/i,id+' unsafe source URL');
  assert.ok(!links.has(url),id+' duplicate URL');
  links.add(url);
 }
 assert.ok(d.sources.some(s=>s[1].includes('bible.com')),id+' lacks direct biblical passage');
 assert.ok(d.sources.filter(s=>!s[1].includes('bible.com')).length>=2,id+' lacks independently useful research sources');
}
const pageOrder=prior.map(p=>index.indexOf('<script src="'+p+'"></script>'));
assert.ok(pageOrder.every((pos,i)=>pos>=0&&(i===0||pos>pageOrder[i-1])),'Prior C7 modules order changed');
const addPos=index.indexOf('<script src="'+path+'"></script>');
assert.ok(addPos>pageOrder.at(-1)&&addPos<index.indexOf('<script src="app.js">'),'New records must load before reader initialization');
assert.ok(index.includes('v900-timeline-landscape.js')&&index.includes('v899-c7-reader-links.js'),'Do not regress approved layout or source links');
assert.ok(index.includes('v887-home-areas.js')&&index.includes('v892-topic-navigation.js'),'Preserve shared icon system');
console.log('C7 omgång 10 PASS: eight unique H047-H054, '+Object.keys(final).length+' history/Bible C7 entries preserved, sources, scholarly caution, date data untouched.');
