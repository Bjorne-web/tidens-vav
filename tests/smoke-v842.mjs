// V8.42: exact user-requested reader order; no section or event-handler loss.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {execFileSync} from 'node:child_process';
const root=path.resolve(import.meta.dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
const html=read('index.html');
assert.ok(html.includes('Version 8.42'),'Version must be V8.42');
for(const file of ['v842-reader-navigation.js','v842-reader-navigation.css']){
 assert.ok(fs.existsSync(path.join(root,file)),file+' missing');
 assert.ok(html.includes(file),file+' must load in page');
}
assert.ok(html.indexOf('v841-textcomparison.js')<html.indexOf('v842-reader-navigation.js'),'Final layout must follow research comparison');
execFileSync(process.execPath,['--check',path.join(root,'v842-reader-navigation.js')]);
assert.ok(!/<link[^>]*<link/i.test(html),'No malformed stylesheets');

class Node{
 constructor(tag='div',className='',content=''){
  this.tagName=tag.toLowerCase();this.className=className;this.textContent=content;
  this.children=[];this.parentNode=null;this.id='';this.attributes={};this.onclick=null;
  this.classList={add:value=>{if(!this.className.split(/\s+/).includes(value))this.className+=' '+value}};
 }
 matches(selector){
  if(selector.startsWith('#'))return this.id===selector.slice(1);
  const [tag,cls]=selector.startsWith('.')?['',selector.slice(1)]:selector.split('.');
  return (!tag||this.tagName===tag.toLowerCase())&&(!cls||this.className.split(/\s+/).includes(cls));
 }
 append(...nodes){for(const n of nodes){if(n.parentNode)n.parentNode.children=n.parentNode.children.filter(x=>x!==n);this.children.push(n);n.parentNode=this}}
 setAttribute(key,val){this.attributes[key]=String(val)}
}
const n=(tag,cls='',txt='')=>new Node(tag,cls,txt);
const expanded=n('button','','Alla poster');expanded.id='v7expanded';let clicks=0;expanded.onclick=()=>clicks++;
const stats=n('p','', 'Kronologisk översikt; välj Alla poster för proportionell graf / fullständig lista.');
const nodesById={v7expanded:expanded,v7stats:stats};
let readerPanel=n('div'),readCalls=0,timeCalls=0;
const ctx={
 window:{},
 document:{getElementById:id=>id==='detail'?readerPanel:(nodesById[id]||null)},
 renderDetail(){readCalls++},
 renderTimeline(){timeCalls++;stats.textContent='Kronologisk översikt; välj Alla poster för proportionell graf / fullständig lista.'}
};
function prepare(withBible){
 readerPanel=n('div');
 const grip=n('div');grip.id='v829ReaderGrip';
 const width=n('div');width.id='v829WidthControls';
 const toolbar=n('div','v84-reader-bar');
 const kicker=n('div','kicker','TIDENS VÄV · KÄLLFÖRANKRAD GENOMGÅNG');
 const title=n('h2','','Vald post');
 const article=n('section','v86-article');
 const themes=n('section','v827-reader-rel');
 const bible=withBible?n('section','v89-bible-panel'):null;
 const overview=n('details','v839-unified-overview');
 const sources=n('section','v834-review');
 const sharing=n('div','v835-share');
 const special=n('section','v841-text-compare');
 const legacy=n('div','v89-appendix');
 sharing.onclick=()=>clicks++;
 // Deliberately scrambled original layout, including all non-priority material.
 readerPanel.append(sources,sharing,legacy,overview,grip,title,toolbar,special,width,article,themes,kicker,...(bible?[bible]:[]));
 return {grip,width,toolbar,kicker,title,article,themes,bible,overview,sources,sharing,special,legacy,all:[...readerPanel.children]};
}
const first=prepare(true);
vm.runInNewContext(read('v842-reader-navigation.js'),ctx,{filename:'v842-reader-navigation.js'});
const ordered=(arr)=>arr.map(node=>node===first.grip?'grip':node===first.width?'width':node===first.toolbar?'toolbar':node===first.kicker?'kicker':node===first.title?'title':node===first.article?'article':node===first.themes?'themes':node===first.bible?'bible':node===first.overview?'overview':node===first.sources?'sources':node===first.sharing?'sharing':node===first.special?'special':'legacy');
assert.deepEqual(ordered(readerPanel.children),['grip','width','toolbar','kicker','title','article','themes','bible','overview','legacy','special','sources','sharing'],'Wrong layout order with Bible links');
assert.ok(readerPanel.className.includes('v842-reader-order'));
assert.equal(new Set(readerPanel.children).size,first.all.length);
for(const old of first.all)assert.ok(readerPanel.children.includes(old),'Existing reader node lost');
readerPanel.children.at(-1).onclick();
assert.equal(clicks,1,'Share action must survive moving elements');
ctx.renderDetail();assert.equal(readCalls,1);
assert.deepEqual(ordered(readerPanel.children),['grip','width','toolbar','kicker','title','article','themes','bible','overview','legacy','special','sources','sharing'],'Must remain stable on rerender');
assert.equal(new Set(readerPanel.children).size,first.all.length,'Rerender must not duplicate sections');

const second=prepare(false);
const mapped=()=>{
 const c=readerPanel.children;
 assert.deepEqual(c.slice(0,8),[second.grip,second.width,second.toolbar,second.kicker,second.title,second.article,second.themes,second.overview],'Bible-free post should place overview directly after Temaspår');
 assert.equal(c.at(-2),second.sources,'Review footer must be penultimate');
 assert.equal(c.at(-1),second.sharing,'Sharing must be last');
 assert.ok(!c.some(x=>x.className.includes('v89-bible-panel')),'Never insert fake Bible references');
};
ctx.renderDetail();mapped();
assert.equal(readCalls,2);
assert.equal(expanded.textContent,'Detaljerad tidslinje','The user-facing button label must be descriptive');
assert.ok(expanded.attributes['aria-label'].includes('alla poster'),'Accessible label should preserve the exact scope');
expanded.onclick();assert.equal(clicks,2,'Original timeline-button interaction must survive relabeling');
ctx.renderTimeline();assert.equal(timeCalls,1,'Existing timeline renderer must continue');
assert.equal(stats.textContent,'Kronologisk översikt; välj Detaljerad tidslinje för proportionell graf / fullständig lista.');
ctx.window.TidensLayoutV842.nameTimelineControl();
assert.equal(expanded.textContent,'Detaljerad tidslinje','Timeline toggle label must be idempotent');
assert.ok(!read('v842-reader-navigation.js').includes('innerHTML='),'Layout should move nodes, not rewrite existing dynamic content');
console.log('OK: Temaspår before overview, optional Bible block next, review/share last, all old reader nodes preserved, timeline toggle renamed without behavior change.');
