'use strict';
const fs=require('node:fs'),path=require('node:path');
const {buildFixtures}=require('./f4-reader-fixtures.cjs');
const {renderFullReader}=require('./f4-reader-renderer.cjs');
const read=file=>fs.readFileSync(file,'utf8');
const bundle=(source,name)=>'(function(){const module={exports:{}};\n'+source+'\nwindow.'+name+'=module.exports;})();';
const nav=bundle(read('tests/f5-navigation-contract.cjs'),'F5Navigation');
const restore=bundle(read('tests/f5-restore-capabilities.cjs'),'F5Restore');
const host=bundle(read('tests/f5-return-host.cjs')
 .replace("const {planReturn}=require('./f5-restore-capabilities.cjs');","const {planReturn}=window.F5Restore;")
 .replace("const {createNavigationCoordinator}=require('./f5-navigation-contract.cjs');","const {createNavigationCoordinator}=window.F5Navigation;"),
 'F5ReturnHost');
const fixtures=buildFixtures().filter(x=>['H045','O067'].includes(x.entity.id));
const articles=fixtures.map(r=>'<section data-article="'+r.entity.id+'" hidden>'+renderFullReader(r)+'</section>').join('');
const views=['start','timeline','map','explore','compare','research','about','records'];
const navBtns=['timeline','map','explore','compare','research'].map(id=>
 '<button id="nav'+id+'" type="button">'+id+'</button>').join('');
const sections=views.map(name=>
 '<section id="'+name+'View" class="view hidden"><h2>'+name+'</h2><div class="longcontent">'+
 ('Historiskt urval – '+name+' · ').repeat(75)+'</div></section>').join('');
const css='*{box-sizing:border-box}body{margin:0;font:15px/1.4 system-ui;background:#f7faf7;color:#263d41}' +
 'header{background:#25454b;color:white;padding:12px 24px}' +
 '#actions{display:flex;flex-wrap:wrap;gap:9px;padding:12px}button{padding:10px;background:white;border:1px solid #bbc;border-radius:5px}' +
 '.hidden,[hidden]{display:none!important}#viewport{height:200px;overflow:auto;border:1px solid #85a;margin:12px;padding:12px}' +
 '.longcontent{min-height:850px;max-width:720px}#fullReader{background:white;padding:10px;border:1px solid #599}' +
 '#detail{height:225px;overflow:auto}#f5Status{font:11px monospace;white-space:pre-wrap}';
const scriptTag=js=>'<script>'+js.replace(/<\/script/gi,'<\\/script')+'</script>';
const html='<!doctype html><html lang="sv"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">'+
 '<title>F5.3 – Fristående navigationskontroll</title><style>'+css+'</style></head><body>'+
 '<header>F5.3 · Isolerad webbläsartestvärd – ingen produktionsnavigation</header>'+
 '<div id="actions">'+navBtns+'<button id="open" type="button">Öppna H045</button><button id="return" type="button">Tillbaka</button></div>'+
 '<div id="viewport">'+sections+'</div><div id="fullReader" hidden><div id="detail">'+articles+'</div></div>'+
 '<strong id="f5Result">Ej körd</strong><pre id="f5Status"></pre>'+
 scriptTag(nav)+scriptTag(restore)+scriptTag(host)+scriptTag(read('v909-view-context-c1.js'))+
 scriptTag(read('tests/f5-browser-harness-client.js'))+'</body></html>';
const out='out/f5';fs.mkdirSync(out,{recursive:true});
fs.writeFileSync(path.join(out,'f5-browser-return.html'),html,'utf8');
console.log('F5.3 isolated C1/F4 browser harness generated:',path.join(out,'f5-browser-return.html'));
