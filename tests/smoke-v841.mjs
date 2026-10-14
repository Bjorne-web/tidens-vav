// V8.41 – source-level Iranian/Jewish comparison, without false causal inference.
// Run: node tests/smoke-v841.mjs
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {execFileSync} from 'node:child_process';
const dir=path.resolve(import.meta.dirname,'..'),read=x=>fs.readFileSync(path.join(dir,x),'utf8');
const html=read('index.html');
const version=html.match(/Version 8\.(\d+)/);
assert.ok(version&&Number(version[1])>=41,'V8.41 or newer expected');
for(const file of ['data/c6-text-comparison.v841.js','v841-textcomparison.js','v841-textcomparison.css']){
 assert.ok(fs.existsSync(path.join(dir,file)),'Missing '+file);
 assert.ok(html.includes(file),'Not loaded '+file);
}
assert.ok(html.indexOf('data/c6-text-comparison.v841.js')<html.indexOf('v841-textcomparison.js'),'Comparison data must load before UI');
assert.ok(html.indexOf('v839-reader-unified.js')<html.indexOf('v841-textcomparison.js'),'Reader must load before new panel');
for(const file of ['data/c6-text-comparison.v841.js','v841-textcomparison.js','data/review-ledger.js','data/c6-progress.js'])
 execFileSync(process.execPath,['--check',path.join(dir,file)]);
const env={window:{}};
vm.runInNewContext(read('data/c6-text-comparison.v841.js'),env);
vm.runInNewContext(read('data/review-ledger.js'),env);
vm.runInNewContext(read('data/c6-progress.js'),env);
const d=env.window.TIDENS_TEXT_COMPARISON_V841;
assert.equal(d.sources.length,4);
assert.equal(d.comparisons.length,3);
assert.deepEqual(Array.from(d.sources,x=>x.id),['yt19','dan12','isa26','macc7']);
assert.deepEqual(Array.from(d.showFor),['O030','H023','H024']);
assert.ok(d.conclusion.includes('inte verifierad'),'Direct-dependence conclusion must remain qualified');
for(const p of d.sources){
 assert.ok(p.description.length>50,'Too little actual text analysis for '+p.id);
 assert.ok(p.time.length>60&&p.certainty.length>25,'Dating/scope missing for '+p.id);
 assert.ok(p.url.startsWith('https://')&&p.contextUrl.startsWith('https://'),'Traceable URLs expected');
 assert.ok(!/bevisad direkt överföring/i.test(p.certainty),'No invented dependence');
}
for(const comparison of d.comparisons){
 assert.ok(d.sources.some(s=>s.id===comparison.a)&&d.sources.some(s=>s.id===comparison.b),'Unknown passage');
 for(const key of ['common','difference','grade','argument','counter','scholarSource'])
  assert.ok(comparison[key]&&comparison[key].length>18,'No '+key+' in '+comparison.id);
 assert.ok(comparison.scholarSource.startsWith('https://'));
}
assert.ok(d.comparisons[0].grade.includes('omdiskuterad'),'Direction of influence must be nuanced');
const ledger=env.window.TIDENS_REVIEW_LEDGER;
const entries=Object.keys(ledger.claimChecks);
const checks=Object.values(ledger.claimChecks).reduce((n,arr)=>n+arr.length,0);
assert.ok(entries.length>=15,'Earlier 15 records with claim checks must remain');
assert.ok(checks>=24,'Earlier 24 claim checks must remain');
assert.ok(ledger.claimChecks.O030.length>=7,'Avestan source review missing');
assert.ok(ledger.claimChecks.H023.length>=3,'Daniel and Isaiah checks absent');
assert.equal(ledger.claimChecks.H024.length,1,'Maccabean text check absent');
assert.equal(Object.keys(ledger.completePostReviews).length,0,'Nothing fully peer reviewed');
const ids=new Set([...read('data/data.generated.js').matchAll(/"id":"([A-Z][0-9]{3,6})"/g)].map(m=>m[1]));
for(const id of entries)assert.ok(ids.has(id),'Review points to missing post '+id);
for(const id of ['O030','H023','H024'])for(const item of ledger.claimChecks[id]){
 assert.ok(item.scope.length>35&&item.limit.length>35,'Review lacks supporting and limiting context: '+id);
 assert.ok(/^https:\/\//.test(item.sourceUrl));
}
const status=env.window.TIDENS_C6_PROGRESS;
assert.equal(status.total,193);
assert.equal(status.history.at(-1).claimCheckPosts,entries.length);
assert.equal(status.history.at(-1).claimChecks,checks);
assert.equal(status.history.at(-1).wholeApproved,0);
class FakeNode{
 constructor(tag='div',txt=''){this.tagName=tag.toLowerCase();this.textContent=txt;this.className='';this.children=[];this.parentNode=null;this.attributes={};}
 matches(s){if(s.startsWith('.'))return this.className.split(' ').includes(s.slice(1));return this.tagName===s.toLowerCase()}
 append(...ns){for(const n of ns){if(n.parentNode)n.parentNode.children=n.parentNode.children.filter(x=>x!==n);this.children.push(n);n.parentNode=this}}
 insertBefore(n,anchor){if(n.parentNode)n.parentNode.children=n.parentNode.children.filter(x=>x!==n);const i=this.children.indexOf(anchor);this.children.splice(i<0?this.children.length:i,0,n);n.parentNode=this}
 remove(){if(this.parentNode)this.parentNode.children=this.parentNode.children.filter(x=>x!==this);this.parentNode=null}
 setAttribute(k,v){this.attributes[k]=v}
 querySelectorAll(selector){let a=[];for(const c of this.children){if(c.matches(selector))a.push(c);a.push(...c.querySelectorAll(selector))}return a}
}
const root=new FakeNode('div'),article=new FakeNode('section'),first=new FakeNode('h3','Konsekvenser och betydelse'),last=new FakeNode('h3','Osäkerheter och viktiga preciseringar');
article.className='v86-article';
article.append(first,last);root.append(article);
let baseCalls=0;
const dom={document:{createElement:tag=>new FakeNode(tag),getElementById:id=>id==='detail'?root:null},window:{TIDENS_TEXT_COMPARISON_V841:d},state:{selected:'O030'},renderDetail:()=>baseCalls++};
vm.runInNewContext(read('v841-textcomparison.js'),dom);
assert.equal(article.querySelectorAll('.v841-text-compare').length,1,'Must appear inside sourced article');
assert.ok(article.children.indexOf(article.querySelectorAll('.v841-text-compare')[0])<article.children.indexOf(last),'Comparison before uncertainty section');
dom.renderDetail();
assert.equal(article.querySelectorAll('.v841-text-compare').length,1,'No duplicates on rerender');
dom.state.selected='H023';dom.renderDetail();
assert.equal(article.querySelectorAll('.v841-text-compare').length,1,'Panel should exist for Daniel');
dom.state.selected='O067';dom.renderDetail();
assert.equal(article.querySelectorAll('.v841-text-compare').length,0,'Unrelated records should not inherit this analysis');
assert.ok(baseCalls>=3,'Previous reader must still render');
console.log('OK: 4 sourced passages / 3 contextual comparisons, 15 posts / 24 claims, reader inclusion, no false dependence, older functionality retained.');
