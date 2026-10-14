// V8.39 – urval från användarens sex ikryssade kategorier, utan påhittade datum.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {execFileSync} from 'node:child_process';
const root=path.resolve(import.meta.dirname,'..');
const read=f=>fs.readFileSync(path.join(root,f),'utf8');
const html=read('index.html');
const js='v839-temaspar-context.js',css='v839-temaspar-context.css';
assert.ok(html.includes('Version 8.39'));
for(const file of [js,css]){
 assert.ok(fs.existsSync(path.join(root,file)),file+' missing');
 assert.ok(html.includes(file),file+' not loaded');
}
assert.ok(html.indexOf('v833-temaspar.js')<html.indexOf(js),'Overlay must follow historic Temaspår');
assert.ok(html.indexOf('v838-reader-reflow.js')<html.indexOf(js),'Overlay should load last');
execFileSync(process.execPath,['--check',path.join(root,js)]);
const pool=[
 {id:'H017',title:'Persien erövrar Babylon',category:'Historia',start:-539,end:-539},
 {id:'H105',title:'Judarna under hellenismen',category:'Religion & texter',start:-200,end:-140},
 {id:'H106',title:'Bibelberättelser',category:'Bibelberättelse',start:-170,end:-165},
 {id:'H107',title:'Textkomposition',category:'Bibeltext',start:-180,end:-120},
 {id:'H108',title:'Arkeologiskt fynd',category:'Arkeologi',start:-210,end:-145},
 {id:'O020',title:'Religiös rörelse',category:'Religion',start:-190,end:-150},
 {id:'O022',title:'Olika tidstyper',category:'Bibelberättelser',start:-166,end:-155},
 {id:'H109',title:'Historisk händelse',category:'Historia',start:-180,end:-170},
 {id:'O049',title:'Puniska krigen',category:'Krig',start:-264,end:-146},
 {id:'H110',title:'Homo sapiens',category:'Människans utveckling',start:-100000,end:-50000},
 {id:'O048',title:'Peloponnesiska kriget',category:'Krig',start:-431,end:-404},
];
const originalFocus={id:'O049',title:'Puniska krigen',category:'Krig',start:-264,end:-146,original:true};
const underdetermined={id:'O030',title:'Zoroastrism',category:'Religion',start:-1500,end:-600,original:true};
const all=new Map(pool.concat([underdetermined]).map(x=>[x.id,x]));
const ctx={
 window:{},
 document:{getElementById:()=>null},
 renderExplore(){},
 v829Focus:{id:null},
 idEvent:id=>all.get(id)||null,
 v83Display:'graph',
 v813BaseEntries:()=>({curated:pool.filter(e=>e.id.startsWith('H')),adopted:pool.filter(e=>e.id==='O020'||e.id==='O022'),segmented:[]}),
 enc:v=>String(v).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;'),
 v83FmtYear:y=>String(y),
};
vm.runInNewContext(read(js),ctx,{filename:js});
const api=ctx.window.TidensTemasparV839;
assert.ok(api);
const defaults=Array.from(api.selected()).sort();
assert.deepEqual(defaults,['Religion & texter','Bibelberättelse','Bibeltext','Arkeologi','Religion','Bibelberättelser'].sort());
assert.equal(api.categories.length,13,'All categories in screenshot should be selectable');
const m=api.modelFor(originalFocus);
assert.equal(m.segments.length,3,'Three Punic Wars phases required');
assert.deepEqual(Array.from(m.segments,p=>[p.start,p.end]),[[-264,-241],[-218,-201],[-149,-146]]);
assert.equal(m.window.historical,true,'Punic Wars separately sourced interval');
assert.equal(m.groups.length,6,'Show contemporaries from all six marked categories');
assert.equal(m.count,6,'No duplicate focus or unchecked categories in comparison');
assert.ok(!m.groups.some(g=>g.entries.some(x=>x.id==='H109')),'World history should not appear by default');
const view=api.renderFor(m,'graph');
assert.ok(view.includes('Första puniska kriget')&&view.includes('Andra puniska kriget')&&view.includes('Tredje puniska kriget'));
for(const name of ['Religion & texter','Bibelberättelser – berättad tid','Textens tillkomst','Arkeologi','Religioner','Bibeltexter och berättelser · olika tidstyper']){
 assert.ok(view.includes(name),'Missing visible category '+name);
}
assert.ok(view.includes('data-v839-read="O049"'),'Punic phases must point to real focus post');
assert.ok(view.includes('Kronologisk samtidighet innebär inte belagt inflytande'),'Causal inference warning missing');
const rows=api.renderFor(m,'list');
assert.ok(rows.includes('Första puniska kriget')&&rows.includes('Tredje puniska kriget'),'List mode must preserve focus');
assert.ok(rows.includes('data-v839-read="O049"'));
const undated=api.modelFor(underdetermined);
assert.equal(undated.segments.length,0,'Archive date must not become scientifically assessed');
assert.equal(undated.window.historical,false);
const undatedView=api.renderFor(undated,'graph');
assert.ok(undatedView.includes('Ingen källförsvarbar datering'),'Undated focus must be visible with no false anchor');
assert.ok(undatedView.includes('Utgångsposten har ingen separat källbedömd datering'),'Clearly mark provisional comparison window');
assert.ok(!undatedView.includes('data-v839-read="O030"'),'Unknown original date must not be plotted as real dated event');
const dated=api.modelFor(pool[0]);
assert.ok(dated.segments.some(e=>e.id==='H017'),'Curated focus must be present regardless of category filters');
assert.ok(api.renderFor(dated,'graph').includes('Persien erövrar Babylon'),'Different focus still visible');
console.log('OK: always visible focus, six selected categories in same time axis, verified three-war dates, list mode and honest undated focus.');
