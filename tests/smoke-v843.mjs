// V8.43: sticky timeline controls, all extra content below, short category names.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {execFileSync} from 'node:child_process';
const root=path.resolve(import.meta.dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
const html=read('index.html'),css=read('v843-timeline-workspace.css');
assert.ok(html.includes('Version 8.43'));
for(const f of ['v843-timeline-workspace.js','v843-timeline-workspace.css']){
 assert.ok(fs.existsSync(path.join(root,f)),'Missing '+f);
 assert.ok(html.includes(f),'Unlinked '+f);
}
assert.ok(html.indexOf('v842-reader-navigation.js')<html.indexOf('v843-timeline-workspace.js'),'Timeline stage must load last');
assert.ok(css.includes('position:sticky') && css.includes('--tv-header-height'),'Controls must stick below header');
assert.ok(css.includes('max-width:1200px')&&css.includes('min-width:1201px'),'Responsive desktop widths must be defined');
assert.ok(css.includes('#catFilters .check')&&css.includes('white-space:nowrap'),'Desktop category labels should not wrap');
assert.ok(css.includes('max-width:900px'),'Mobile fallback required');
execFileSync(process.execPath,['--check',path.join(root,'v843-timeline-workspace.js')]);
class Node{
 constructor(tag='div',cls='',text=''){
  this.tagName=tag.toLowerCase();this.className=cls;this.textContent=text;this.children=[];this.parentNode=null;this.id='';this.title='';this.attrs={};this.childNodes=[];this.nodeType=1;
  this.classList={add:x=>{if(!this.className.split(' ').includes(x))this.className+=' '+x}};
 }
 matches(selector){
  if(selector.startsWith('.'))return this.className.split(/\s+/).includes(selector.slice(1));
  if(selector.startsWith('#'))return this.id===selector.slice(1);
  const [tag,cls]=selector.split('.');
  return this.tagName===tag.toLowerCase()&&(!cls||this.className.split(/\s+/).includes(cls));
 }
 append(...nodes){for(const n of nodes){if(n.parentNode)n.parentNode.children=n.parentNode.children.filter(x=>x!==n);this.children.push(n);n.parentNode=this}}
 querySelector(selector){
  for(const node of this.children){if(node.matches(selector))return node;const nested=node.querySelector(selector);if(nested)return nested}
  return null;
 }
 querySelectorAll(selector){return this.children.flatMap(n=>[...(n.matches(selector)?[n]:[]),...n.querySelectorAll(selector)])}
 insertBefore(n,reference){
  if(n.parentNode)n.parentNode.children=n.parentNode.children.filter(x=>x!==n);
  const at=this.children.indexOf(reference);this.children.splice(at<0?this.children.length:at,0,n);n.parentNode=this;
 }
 insertAdjacentElement(where,node){
  assert.equal(where,'afterend');
  const p=this.parentNode,at=p.children.indexOf(this);
  if(node.parentNode)node.parentNode.children=node.parentNode.children.filter(x=>x!==node);
  p.children.splice(at+1,0,node);node.parentNode=p;
 }
 setAttribute(key,val){this.attrs[key]=val}
}
const n=(tag,cls)=>new Node(tag,cls);
const root=n('section');root.id='timelineView';
const toolbar=n('div','toolbar'),callout=n('div','v83-inline-callout'),panel=n('div','v813-panel');
const controls=n('div','v7toolbar');controls.id='v7toolbar';
const pan=n('div','v827-pancontrols');pan.id='v827PanControls';
const card=n('div','timeline-card'),axis=n('div','axis');axis.id='axis',epochs=n('div');epochs.id='epochs',lanes=n('div');lanes.id='lanes';
card.append(axis,epochs,lanes);
const foot=n('div','footcard');
root.append(toolbar,callout,panel,controls,pan,card,foot);
const initial=[...root.children,axis,epochs,lanes];
const catFilters=n('div');catFilters.id='catFilters';
const full={
 'Historia':'Världshistoria','Religion & texter':'Religion & texter','Bibelberättelse':'Bibelberättelser – berättad tid',
 'Bibeltext':'Textens tillkomst','Arkeologi':'Arkeologi','Folk':'Folk','Människans utveckling':'Människans utveckling',
 'Civilisation':'Civilisationer och historiska riken','Religion':'Religioner','Byggnadsverk':'Byggnadsverk och byggnadsfaser',
 'Krig':'Krig och separata konflikter','Konflikterande berättelser':'Historiska och religiösa berättelser',
 'Bibelberättelser':'Bibeltexter och berättelser · olika tidstyper'
};
const labels=[];
for(const key of Object.keys(full)){
 const label=n('label','check'),checkbox=n('input'),dot=n('span','dot'),t={nodeType:3,textContent:full[key]};
 checkbox.value=key;checkbox.checked=true;label.append(checkbox,dot);label.childNodes=[checkbox,dot,t];catFilters.append(label);labels.push({key,label,checkbox,t});
}
let renderCount=0;
const env={
 window:{},
 document:{getElementById:id=>id==='timelineView'?root:id==='catFilters'?catFilters:null,createElement:tag=>n(tag)},
 laneNames:full,
 renderTimeline(){renderCount++}
};
vm.runInNewContext(read('v843-timeline-workspace.js'),env,{filename:'v843-timeline-workspace.js'});
const api=env.window.TidensTimelineV843;
assert.ok(api?.structure&&api?.categoryLabels);
const sticky=root.children[0];
assert.equal(sticky.id,'v843StickyControls','Controls should be first');
assert.deepEqual(sticky.children,[controls,pan,axis],'Order, pan and scale must be together');
assert.equal(root.children[1],card,'Actual timeline goes directly below sticky tools');
assert.deepEqual(root.children.slice(2),[toolbar,callout,panel,foot],'All previous content moved below chart');
assert.deepEqual(card.children,[epochs,lanes],'Existing plotted epochs and rows must not disappear');
for(const e of initial)assert.ok(root.children.includes(e)||sticky.children.includes(e)||card.children.includes(e),'Old DOM node missing');
for(const {key,label,checkbox,t} of labels){
 assert.equal(checkbox.value,key,'Filter ID must remain stable');
 assert.equal(checkbox.checked,true,'Original selection unchanged');
 assert.equal(label.title,full[key],'Complete label available as tooltip');
 assert.equal(label.attrs['aria-label'],'Kategori: '+full[key],'Assistive tech sees full category name');
 assert.equal(t.textContent,api.shortNames[key],'Visible category name shortened only');
}
assert.equal(api.shortNames['Bibelberättelser'],'Bibeltexter · olika tidstyper');
env.renderTimeline();
assert.equal(renderCount,1,'Existing rendering should still run');
assert.equal(root.children.filter(x=>x.id==='v843StickyControls').length,1,'Must never add second sticky header');
assert.deepEqual(sticky.children,[controls,pan,axis],'Rerender preserves control order');
assert.deepEqual(root.children.slice(2),[toolbar,callout,panel,foot],'Rerender preserves content order');
// Controls retain identity and listeners: no innerHTML rewriting.
assert.ok(!read('v843-timeline-workspace.js').includes('innerHTML'),'DOM nodes must be moved, not rebuilt');
console.log('OK: fixed order/pan/time-scale, full timeline first, every previous section below, thirteen original category keys and labels preserved.');
