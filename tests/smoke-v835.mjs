// V8.35 – kostnadsfritt smoke-test för framtida appintegration.
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {execFileSync} from 'node:child_process';

const root=path.resolve(import.meta.dirname,'..');
const read=name=>fs.readFileSync(path.join(root,name),'utf8');
const page=read('index.html');
const script='v835-deeplinks.js',style='v835-deeplinks.css';
for(const name of [script,style]){
  assert.ok(fs.existsSync(path.join(root,name)),'Missing '+name);
  assert.ok(page.includes(name),'Not referenced by index.html: '+name);
}
assert.ok(page.includes('Version 8.35'),'Incorrect version');
assert.ok(page.indexOf('v834-review.js')<page.indexOf(script),'Scripts loaded out of order');
execFileSync(process.execPath,['--check',path.join(root,script)]);

const ids=new Set(['H041','H054','O030']);
const nav=[];
let onLoad;
const ctx={
  URL,URLSearchParams,
  window:{location:{href:'https://tidens-vav.pages.dev/',search:'',origin:'https://tidens-vav.pages.dev',pathname:'/'}},
  document:{readyState:'loading',addEventListener:(name,fn)=>{if(name==='DOMContentLoaded')onLoad=fn}},
  idEvent:id=>ids.has(id)?{id,title:id}:null,
  v829Focus:{id:null},
  v827RelationFocus:null,
  state:{selected:'H041'},
  view:v=>nav.push(['view',v]),
  setSelected:id=>nav.push(['selected',id]),
  v829LocateResearch:id=>nav.push(['locate',id]),
  renderDetail:()=>{},
  renderExplore:()=>{},
};
vm.runInNewContext(read(script),ctx,{filename:script});
const API=ctx.window.TidensVavLinks;
assert.equal(API.schemaVersion,1);
assert.ok(typeof onLoad==='function','Expected deferred initialization');
assert.equal(API.parse(''),null);
assert.equal(API.parse('?tv_id=H041').id,'H041');
assert.equal(API.parse('?tv_id=H041').view,'explore');
assert.equal(API.parse('?tv_id=O030&tv_view=timeline').view,'timeline');
assert.equal(API.parse('?tv_id=H041&tv_view=bad').error,'unknown-view');
assert.equal(API.parse('?tv_id=H999&tv_view=explore').error,'unknown-id');
assert.equal(API.parse('?tv_id=%3Cscript%3E').error,'unknown-id');
assert.equal(API.makeLink('H999'),null);
assert.equal(API.makeLink('H041','bad'),null);
assert.equal(API.makeLink('H054','explore'),'https://tidens-vav.pages.dev/?tv_id=H054&tv_view=explore');
assert.equal(API.openRoute(API.parse('?tv_id=O030&tv_view=explore')),true);
assert.equal(ctx.v829Focus.id,'O030');
assert.equal(ctx.v827RelationFocus,'O030');
assert.deepEqual(nav.map(x=>x.join(':')),['view:explore','selected:O030']);
nav.length=0;
assert.equal(API.openRoute(API.parse('?tv_id=H041&tv_view=timeline')),true);
assert.deepEqual(nav.map(x=>x.join(':')),['view:timeline','selected:H041','locate:H041']);
nav.length=0;
assert.equal(API.openRoute(API.parse('?tv_id=H054&tv_view=research')),true);
assert.deepEqual(nav.map(x=>x.join(':')),['view:research','selected:H054']);
assert.equal(API.openRoute(API.parse('?tv_id=H999')),false);
assert.equal(nav.some(x=>x[0]==='locate'),false);
console.log('OK: V8.35 stable link parsing, URL generation, route selection and invalid-ID handling.');
