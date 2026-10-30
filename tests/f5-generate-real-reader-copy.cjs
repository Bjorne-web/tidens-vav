'use strict';
// F5.5 test only: generate full app clone with real F4 articles, NOT application source edits.
const fs=require('node:fs'),path=require('node:path');
const {buildFixtures}=require('./f4-reader-fixtures.cjs');
const {renderFullReader}=require('./f4-reader-renderer.cjs');
const read=p=>fs.readFileSync(p,'utf8');
const original=read('index.html'),end='</body></html>';
if(!original.includes(end))throw new Error('App HTML structure changed');
if(original.includes('f5-real-reader-bridge.js'))throw new Error('Live index already loads F5 bridge: abort');
const selected=new Set(['H045','O067','B001','D001']);
const entries=buildFixtures().filter(x=>selected.has(x.entity.id));
if(entries.length!==4)throw new Error('F4 article specimens missing');
const articles=Object.fromEntries(entries.map(x=>[x.entity.id,renderFullReader(x)]));
const baseCss=read('prototypes/f4/reader-preview.css');
// Shadow DOM contains only F4 article; avoid importing global "body" or ".top" styles into app.
const css=baseCss.replace(/url\("__F4_APPROVED_HERO_IMAGE__"\)/g,'none');
const payload='window.__F5TestOnlyArticles='+JSON.stringify(articles)+';\n'+
 'window.__F5TestOnlyReaderCss='+JSON.stringify(css)+';\n';
const out='out/f5/integration';fs.mkdirSync(out,{recursive:true});
fs.writeFileSync(path.join(out,'f5-real-reader-data.js'),payload,'utf8');
// Copy changes only this temporary test page, never index.html.
const extra='<script src="out/f5/integration/f5-real-reader-data.js"></script>'+
 '<script src="tests/f5-real-reader-bridge.js"></script>';
fs.writeFileSync('f5-real-reader-test.html',original.replace(end,extra+end),'utf8');
fs.writeFileSync(path.join(out,'README.txt'),
 'F5.5 fristående test av riktig app med tillfällig F4-läsaröverlägg.\n'+
 'Testfil: f5-real-reader-test.html (skapas lokalt i repots rot och raderas efter CI).\n'+
 'H045/O067/B001/D001 visas med F4-renderern utan att ändra index.html eller app.js.\n'+
 'Overlay och extra JS finns enbart i testkopian. Inte produktionsintegration.\n','utf8');
console.log('F5.5 actual app clone generated:',entries.map(x=>x.entity.id).join(', '),
 'original script imports:',[...original.matchAll(/<script[^>]*src=/g)].length);
