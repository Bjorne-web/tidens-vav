// V8.39 – alla 193 poster använder samma läsarstruktur utan innehållsförlust.
// Dependency-fritt: node tests/smoke-reader-universal-v839.mjs
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {execFileSync} from 'node:child_process';

const root=path.resolve(import.meta.dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const html=read('index.html');
for(const f of ['v839-reader-unified.js','v839-reader-unified.css']){
 assert.ok(html.includes(f),'Missing resource '+f);
 assert.ok(fs.existsSync(path.join(root,f)),'Missing file '+f);
}
assert.ok(html.indexOf('v838-reader-reflow.js')<html.indexOf('v839-reader-unified.js'),'New reader should be last');
execFileSync(process.execPath,['--check',path.join(root,'v839-reader-unified.js')]);

class Node {
 constructor(tag='div',className='',txt=''){
  this.tagName=tag.toLowerCase();this.className=className;this.textContent=txt;
  this.children=[];this.parentNode=null;this.id='';this.innerHTML='';
  this.classList={add:c=>{if(!this.className.split(/\s+/).includes(c))this.className+=' '+c}};
 }
 matches(selector){
  if(selector.startsWith('#'))return this.id===selector.slice(1);
  const [tag,cls]=selector.startsWith('.')?['',selector.slice(1)]:selector.split('.');
  return (!tag||this.tagName===tag.toLowerCase())&&(!cls||this.className.split(/\s+/).includes(cls));
 }
 append(...els){
  for(const n of els){
   if(n.parentNode)n.parentNode.children=n.parentNode.children.filter(x=>x!==n);
   this.children.push(n);n.parentNode=this;
  }
 }
 prepend(...els){
  for(const n of els.reverse()){
   if(n.parentNode)n.parentNode.children=n.parentNode.children.filter(x=>x!==n);
   this.children.unshift(n);n.parentNode=this;
  }
 }
 querySelector(sel){
  for(const n of this.children){if(n.matches(sel))return n;const sub=n.querySelector(sel);if(sub)return sub}
  return null;
 }
}
const n=(tag,cls='',text='')=>new Node(tag,cls,text);
let panel=null;
const ctx={
 window:{},URL,
 enc:x=>String(x).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;'),
 document:{getElementById:id=>id==='detail'?panel:null,createElement:tag=>n(tag)},
 state:{selected:'O067'},
 renderDetail(){},
 idEvent:id=>vm.runInContext('events.find(e=>e.id==='+JSON.stringify(id)+')||originalEvents.find(e=>e.id==='+JSON.stringify(id)+')',ctx)
};
vm.createContext(ctx);
vm.runInContext(read('data/data.generated.js'),ctx);
vm.runInContext(read('data/c7-religionshistorisk-betydelse.v890.js'),ctx);
vm.runInContext(read('v839-reader-unified.js'),ctx);
const api=ctx.window.TidensUniversalReader;
assert.ok(api?.modelFor&&api.renderArticle);
const records=vm.runInContext('[...events,...originalEvents]',ctx);
assert.equal(records.length,193);
for(const e of records){
 const model=api.modelFor(e),article=api.renderArticle(e);
 assert.ok(model&&model.id===e.id,'Every post must have a model '+e.id);
 for(const section of ['Vad var det?','Historiskt sammanhang','Konsekvenser och betydelse','Osäkerheter och viktiga preciseringar','Källor och läsvägar'])
   assert.ok(article.includes(section),'Missing standardized heading '+e.id+': '+section);
 const hasFaith=!!ctx.window.TIDENS_C7_RELIGION[e.id]||e.id==='O067';
 assert.equal(article.includes('Betydelse för Israels religion, judendomen och kristendomen'),hasFaith,'C7 individual context heading for '+e.id);
 assert.ok(article.includes('inte')||article.includes('återstår'),'Review scope missing '+e.id);
 assert.ok(!article.includes('fullständigt slutgranskad.'),'Must not label complete '+e.id);
}
const o=records.find(e=>e.id==='O067'),h=records.find(e=>e.id==='H005');
const oModel=api.modelFor(o),hModel=api.modelFor(h);
assert.ok(oModel.summary.includes('Gilgamesh'),'Original O067 dossier summary must be reused');
assert.ok(oModel.context.includes('Genesis'),'O067 dossier context must be reused');
assert.ok(oModel.limits.includes('kilskrift'),'O067 limits must be reused');
assert.ok(oModel.sources.some(s=>s.url.includes('britishmuseum.org')),'O067 source must be retained');
assert.ok(hModel.summary.includes('Gilgamesheposet'),'H005 research overview must be reused');
assert.ok(hModel.sources.some(s=>s.url.includes('britishmuseum.org')),'H005 research sources must be retained');
for(const e of [o,h]){
 const article=api.renderArticle(e);
 assert.ok(/parallell/i.test(article),'Flood comparison must be qualified');
 assert.ok(/inte|omdiskuterad/i.test(article),'No ungrounded direct dependence');
 assert.ok(article.includes('britishmuseum.org'),'British Museum reference must survive');
}

// Simulera sidopanelen för O067, vars äldre V8.28-underlag
// tidigare låg före eller i stället för V8.6:s artikel.
const grip=n('div');grip.id='v829ReaderGrip';
const width=n('div');width.id='v829WidthControls';
const bar=n('div','v84-reader-bar');
const kicker=n('div','kicker','O067'),title=n('h2','','Gilgamesheposet – flodberättelsen');
const meta=n('div','meta'),note=n('div','note'),warn=n('div','warn');
const dossier=n('section','v828-dossier'),links=n('section','v827-reader-rel');
const audit=n('section','v834-review');
panel=n('div');
panel.append(meta,grip,audit,dossier,note,links,width,kicker,title,bar,warn);
const oldNodes=[...panel.children];
ctx.renderDetail();
const article=panel.querySelector('.v839-unified-article');
const overview=panel.querySelector('details.v839-unified-overview');
assert.ok(article,'O067 must get an article before legacy dossier');
assert.ok(overview,'O067 must get a common collapsed research overview');
assert.ok(overview.children.includes(dossier),'Original research dossier must be preserved in overview');
assert.ok(overview.querySelector('.meta')===meta,'Metadata must remain available in overview');
assert.ok(overview.querySelector('.note')===note,'Original research notes must be preserved');
assert.ok(overview.querySelector('.warn')===warn,'Unreviewed original warning must survive');
assert.ok(article.innerHTML.includes('Gilgamesh'),'Article contains source-derived details');
assert.ok(article.innerHTML.includes('britishmuseum.org'),'Article keeps provenance');
const order=panel.children;
assert.ok(order.indexOf(title)<order.indexOf(article),'Title before main article');
assert.ok(order.indexOf(article)<order.indexOf(overview),'Article before overview');
assert.ok(order.indexOf(overview)<order.indexOf(links),'Overview before historical links');
assert.ok(order.includes(audit),'Scientific review panel retained');
for(const old of oldNodes){
 assert.ok(panel.children.includes(old)||overview.children.includes(old)||overview.querySelector('.v839-archive-metadata')?.children.includes(old),'No original reader nodes may be lost');
}
ctx.renderDetail();
assert.equal(panel.children.filter(x=>x.matches('.v86-article')).length,1,'No duplicate article on rerender');
assert.equal(panel.children.filter(x=>x.matches('.v839-unified-overview')).length,1,'No duplicate overview on rerender');

// Kontrollera forskningspost som inte har V8.6-artikel från början.
panel=n('div');panel.append(n('h2','','Gilgamesheposets utveckling'),n('div','meta'),n('section','v827-reader-rel'));
ctx.state.selected='H005';ctx.renderDetail();
assert.ok(panel.querySelector('.v839-unified-article'),'H005 must get same layout');
assert.ok(panel.querySelector('.v839-unified-overview'),'H005 must get same research overview');

// O049:s redan existerande källförankrade V8.6-artikel ska inte dupliceras.
panel=n('div');
const existing=n('section','v86-article');existing.innerHTML='Existing vetted article';
panel.append(n('h2','','Puniska krigen'),existing,n('section','v827-reader-rel'));
ctx.state.selected='O049';ctx.renderDetail();
assert.equal(panel.children.filter(x=>x.matches('.v86-article')).length,1);
assert.equal(existing.innerHTML,'Existing vetted article','Do not replace completed Punic War article');
assert.ok(panel.querySelector('.v839-unified-overview'));
console.log('OK: 193 base entries preserved; C7 religion section only where individually documented; original sources retained.');
