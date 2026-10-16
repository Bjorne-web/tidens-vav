/* Granskning 2: smoke-check source-linked tracks and isolated renderings. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname=path.dirname(fileURLToPath(import.meta.url));
const root=path.join(__dirname,'..');
const read=f=>fs.readFileSync(path.join(root,f),'utf8');
const index=read('index.html');
const first=read('v888-research-tracks.js');
const other=read('v889-research-tracks.js');
const bridge=read('v890-research-bridge.js');
const css=read('v888-research-tracks.css');
const css2=read('v890-research-bridge.css');
for(const asset of ['v888-research-tracks.js','v889-research-tracks.js','v890-research-bridge.js','v888-research-tracks.css','v890-research-bridge.css']){
  assert.ok(index.includes(asset),'Missing HTML reference: '+asset);
}
for(const script of [first,other,bridge]) assert.doesNotThrow(()=>new vm.Script(script));
for(const word of ['Sheol','Gehenna','Hades','1 Henok','Dan 12:2','2 Mack','Suriano']) assert.ok(first.includes(word),'Missing researched term '+word);
for(const word of ['Är Gud god?','Den fria viljan','Augustinus','kompatibilism','Aristoteles']) assert.ok(other.includes(word),'Missing track '+word);
for(const word of ['Matteus 25','Rom 9','Euthyfron','förkunskap','proportionalitet']) assert.ok(bridge.includes(word),'Missing bridge term '+word);
assert.ok(first.includes('commons.wikimedia.org/wiki/Special:FilePath/BD_Weighing_of_the_Heart.jpg'));
assert.ok(first.includes('Public Domain'),'Missing image license label');
assert.ok(first.includes('inte en bild av hebreisk Sheol'),'Missing historical image distinction');
assert.ok(css.includes('max-width:720px') && css2.includes('max-width:720px'),'Missing mobile styles');
const data=read('data/data.generated.js');
for(const id of ['O075','O030','H023','H024','H025','H057','O119']) assert.ok(data.includes('"id":"'+id+'"'),'Unknown existing ID '+id);
assert.ok(first.includes('Pågående vetenskaplig granskning'));
assert.ok(bridge.includes('inte vetenskapligt slutgranskade'));
const nodes=[];
const idsOf=html=>Array.from(html.matchAll(/\bid="([^"]+)"/g),m=>m[1]);
const insert=(position,html,anchorId)=>{
 const ids=idsOf(html);assert.ok(ids.length,'Expected new id in injected markup');
 let at=position==='afterbegin'?0:position==='beforeend'?nodes.length:nodes.indexOf(anchorId)+(position==='afterend'?1:0);
 assert.ok(at>=0,'Unknown parent anchor '+anchorId);
 nodes.splice(at,0,...ids);
};
const host={
 querySelector(selector){
 const id=selector.replace(/^#/,'');if(!nodes.includes(id))return null;
 return {insertAdjacentHTML:(position,html)=>insert(position,html,id)};
 },
 insertAdjacentHTML:(position,html)=>insert(position,html,null)
};
const callbacks=[];
class MutationObserver{constructor(cb){this.cb=cb}observe(){callbacks.push(this.cb)}}
const document={readyState:'complete',getElementById:id=>id==='researchView'?host:null};
for(const code of [first,other,bridge]) vm.runInNewContext(code,{document,window:{},MutationObserver});
const expected=['v890Nav','v888Track','v889-good','v889-will','v890Bridge'];
assert.deepEqual(nodes,expected,'All tracks should be grouped at top in meaningful order');
for(const cb of callbacks)cb();
assert.deepEqual(nodes,expected,'Rerender listeners must not duplicate sections');
console.log('Granskning 2: PASS – 3 research tracks, bridge, license, known IDs, mobile rules, grouped order and no duplicate rendering.');
