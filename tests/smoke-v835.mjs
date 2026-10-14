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

// Regressionskontroll: en egen undersökning ska inte ersätta tidslinjen
// med enbart text. Instrumentera en intern funktion endast i testminnet.
const temaspar=read('v833-temaspar.js');
execFileSync(process.execPath,['--check',path.join(root,'v833-temaspar.js')]);
assert.ok(temaspar.includes('focusTimeline(focus)'), 'Egen undersökning saknar sin tidslinje');
assert.ok(temaspar.includes("map.querySelectorAll('[data-v83read]')"), 'Tidslinjens läsknappar måste vara aktiva');
const testSource=temaspar.replace(
  '  function enhance() {',
  '  window.__renderFocusTimelineForSmokeTest=focusTimeline;\n  function enhance() {'
);
assert.notEqual(testSource,temaspar,'Kunde inte instrumentera regressionstestet');
const dated=[
  {id:'H017',title:'Persien erövrar Babylon',start:-539,end:-538,category:'Historia',v813Status:'research'},
  {id:'H041',title:'Tel Dan',start:-850,end:-800,category:'Arkeologi',v813Status:'research'},
  {id:'H054',title:'Kyroscylindern',start:-539,end:-538,category:'Arkeologi',v813Status:'research'}
];
const graphCalls=[],rowCalls=[];
const env={
  window:{},
  renderExplore:()=>{},
  v827ShowRelations:()=>{},
  document:{getElementById:()=>null},
  events:dated,
  originalEvents:[{id:'O030',title:'Zoroastrism',original:true}],
  enc:String,
  idEvent:id=>dated.find(x=>x.id===id),
  v829Focus:{id:null},
  v813Entries:()=>dated,
  v83FmtYear:String,
  v83Display:'graph',
  v83Current:()=>({id:'israel',name:'Israels religion',min:-1000,max:-100}),
  v83TopicEvents:()=>dated.slice(0,2),
  v83Graph:(theme,entries)=>{graphCalls.push({theme,entries});return '<div class="v83-plot-scroller">GRAFISK TIDSLINJE</div>'},
  v83TimelineRows:entries=>{rowCalls.push(entries);return '<div class="v83-sequence">KRONOLOGISK LISTA</div>'}
};
vm.runInNewContext(testSource,env,{filename:'v833-temaspar.js'});
const graph=env.window.__renderFocusTimelineForSmokeTest;
assert.equal(typeof graph,'function');
const datedView=graph(dated[0]);
assert.ok(datedView.includes('GRAFISK TIDSLINJE'), 'Daterad fokuspost ska ha grafisk tidslinje');
assert.equal(graphCalls.length,1);
assert.ok(graphCalls[0].entries.some(e=>e.id==='H017'),'Vald post saknas på tidslinjen');
assert.ok(datedView.includes('Närhet i tid'),'Vetenskaplig varning saknas');
env.v83Display='list';
assert.ok(graph(dated[0]).includes('KRONOLOGISK LISTA'),'Växling till lista fungerar inte');
env.v83Display='graph';
const undatedView=graph({id:'O030',title:'Zoroastrism',original:true});
assert.ok(undatedView.includes('GRAFISK TIDSLINJE'),'Odaterat fokus måste ha ett separat referensspår');
assert.ok(undatedView.includes('separat valda'),'Odaterat fokus måste få tydlig avgränsning');
assert.ok(!graphCalls.at(-1).entries.some(e=>e.id==='O030'),'Odaterad originalpost får inte placeras på grafisk axel');
console.log('OK: Temaspår har grafisk tidslinje, kronologisk lista och källkritisk odaterad referens.');
