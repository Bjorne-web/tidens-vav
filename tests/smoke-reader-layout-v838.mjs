// V8.38 – regressionstest av användarens läsarpanelskiss.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {execFileSync} from 'node:child_process';

const root=path.resolve(import.meta.dirname,'..');
const read=x=>fs.readFileSync(path.join(root,x),'utf8');
const html=read('index.html');
for(const x of ['v838-reader-reflow.js','v838-reader-reflow.css']){
 assert.ok(html.includes(x),'Missing index link: '+x);
 assert.ok(fs.existsSync(path.join(root,x)),'Missing file: '+x);
}
assert.ok(html.indexOf('v838-time-levels.js')<html.indexOf('v838-reader-reflow.js'),'Reader reorder must run last');
assert.ok(!/<link[^>]*<link/i.test(html),'Invalid CSS markup');
execFileSync(process.execPath,['--check',path.join(root,'v838-reader-reflow.js')]);
class FakeNode {
 constructor(tag='div',cls='',text=''){this.tagName=tag.toLowerCase();this.className=cls;this.textContent=text;this.children=[];this.parentNode=null;this.href='';this.rel='';this.target='';this.id='';this.attrs={};this.classList={add:x=>{if(!this.className.split(' ').includes(x))this.className+=' '+x}};}
 matches(selector){
  if(selector.startsWith('.'))return this.className.split(/\s+/).includes(selector.slice(1));
  if(selector.startsWith('#'))return this.id===selector.slice(1);
  return this.tagName===selector.toLowerCase();
 }
 append(...nodes){for(const node of nodes){if(node.parentNode)node.parentNode.children=node.parentNode.children.filter(x=>x!==node);this.children.push(node);node.parentNode=this}}
 prepend(...nodes){for(const node of nodes.slice().reverse()){if(node.parentNode)node.parentNode.children=node.parentNode.children.filter(x=>x!==node);this.children.unshift(node);node.parentNode=this}}
 insertBefore(node,anchor){if(node.parentNode)node.parentNode.children=node.parentNode.children.filter(x=>x!==node);const i=this.children.indexOf(anchor);this.children.splice(i<0?this.children.length:i,0,node);node.parentNode=this}
 setAttribute(k,v){this.attrs[k]=v}
 querySelector(selector){for(const node of this.children){if(node.matches(selector))return node;const child=node.querySelector?.(selector);if(child)return child}return null}
}
const n=(tag,cls,text)=>new FakeNode(tag,cls,text);
const panel=n('div'),article=n('section','v86-article'),details=n('details','v828-collapsed'),rel=n('section','v827-reader-rel');
const intro=n('h3','','Vad var det?'),consequences=n('h3','','Konsekvenser och betydelse'),uncertainty=n('h3','','Osäkerheter och viktiga preciseringar'),sources=n('h3','','Kontrollerade källor');
article.append(intro,consequences,uncertainty,sources);
const grip=n('div');grip.id='v829ReaderGrip';
const width=n('div');width.id='v829WidthControls';
const bar=n('div','v84-reader-bar');
const kicker=n('div','kicker','ORIGINALPOST · EJ FAKTAGRANSKAD · O049');
const title=n('h2','','Puniska krigen');
const audit=n('section','v834-review'), oldMeta=n('div','meta'),share=n('div','v835-share');
panel.append(audit,share,grip,bar,oldMeta,title,details,article,width,rel,kicker);
const originalNodes=new Set(panel.children);
let renderCalls=0;
const context={document:{getElementById:id=>id==='detail'?panel:null,createElement:tag=>n(tag),createTextNode:text=>n('text','',text)},
window:{},state:{selected:'O049'},idEvent:id=>({id}),renderDetail:()=>{renderCalls++}};
vm.runInNewContext(read('v838-reader-reflow.js'),context,{filename:'v838-reader-reflow.js'});
context.renderDetail();
assert.equal(renderCalls,1);
assert.deepEqual(panel.children.slice(0,8).map(x=>x===grip?'grip':x===width?'width':x===bar?'bar':x===kicker?'kicker':x===title?'title':x===article?'article':x===details?'details':x===rel?'relations':'other'),
 ['grip','width','bar','kicker','title','article','details','relations']);
assert.equal(new Set(panel.children).size,originalNodes.size,'No old content must disappear');
for(const old of originalNodes)assert.ok(panel.children.includes(old),'Old material lost');
const faith=article.querySelector('.v838-faith-impact');
assert.ok(faith,'Religious influence section missing');
assert.ok(article.children.indexOf(faith)<article.children.indexOf(uncertainty),'Faith relevance must appear before uncertainty');
assert.ok(faith.children.some(x=>x.textContent.includes('Indirekt politisk')),'Punic Wars require qualified indirect significance');
assert.ok(faith.children.some(x=>x.children.some(y=>y.tagName==='a')),'Context needs traceable sources');
// Running again must not duplicate the new section.
context.renderDetail();
assert.equal(article.children.filter(x=>x.matches('.v838-faith-impact')).length,1,'Duplicated significance section');
// An unrelated event must not receive a made-up direct religious influence.
context.state.selected='O048';
context.renderDetail();
assert.ok(article.querySelector('.v838-faith-impact').textContent==='','Rerendering preserves content without replacing existing section');
console.log('OK: original reader nodes preserved, priority order matches user layout, context is sourced and not duplicated.');
