/* Granskning 3 – automatiskt regressionstest av apokryfposter, utan webbläsare.
   Kör: node tests/smoke-apokryfer-granskning3.mjs */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const root = new URL('../', import.meta.url);
const read = path => fs.readFileSync(new URL(path, root),'utf8');
const html=read('index.html');
const overlay=read('data/apokryfer-granskning3.v888.js');
const links=read('v835-deeplinks.js');
const source=read('data/data.generated.js');

assert(html.includes('<script src="data/apokryfer-granskning3.v888.js"></script>'));
assert(html.indexOf('data/data.generated.js') < html.indexOf('data/apokryfer-granskning3.v888.js'));
assert(html.indexOf('data/apokryfer-granskning3.v888.js') < html.indexOf('<script src="app.js">'));
assert(links.includes('|AP[0-9]{3}'), 'AP-series IDs must be accepted by deep links');

const context={window:{},events:[{id:'H024',title:'Makkaberupproret'},{id:'H025',title:'1 Henok'}],research:{}};
vm.createContext(context);
vm.runInContext(overlay,context);
const ap=context.events.filter(e=>/^AP\d{3}$/.test(e.id));
assert.equal(ap.length,6);
assert.deepEqual(ap.map(e=>e.id).join(','),'AP001,AP002,AP003,AP004,AP005,AP006');
assert.equal(new Set(ap.map(e=>e.id)).size,6);
assert(ap.every(e=>e.reviewed===false));
assert(ap.every(e=>e.start<=e.end && e.start!==undefined && e.end!==undefined));
assert(ap.every(e=>Object.prototype.hasOwnProperty.call(context.research,e.id)));
assert(ap.every(e=>Array.isArray(context.research[e.id].sources) && context.research[e.id].sources.length>=1), 'All six entries must have scholarly references');
assert(ap.every(e=>e.evidence==='Ej granskad'), 'Preliminary articles must not overstate evidential standing');
assert(ap.every(e=>context.research[e.id].sources.every(s=>Array.isArray(s) && s.length===2 && /^https:\/\//.test(s[1]))), 'Reference URLs must be HTTPS');
const idLiteral=links.match(/const ID_PATTERN=\/(.+)\/;/);
assert(idLiteral,'ID pattern must exist');
const idPattern=new RegExp(idLiteral[1]);
assert(idPattern.test('AP001') && idPattern.test('AP006') && idPattern.test('H024'), 'Deep links must accept old and new IDs');
assert(!idPattern.test('APx01') && !idPattern.test('AP9999'), 'Malformed IDs must be rejected');
assert(context.events.some(e=>e.id==='H024') && context.events.some(e=>e.id==='H025'));
assert(!/"id":"AP00[1-6]"/.test(source), 'Duplicate IDs in generated data');
vm.runInContext(overlay,context);
assert.equal(context.events.length,8,'Double-loading must not duplicate');
console.log('OK: six apocrypha posts, uniqueness, link integration, preliminary status and safe reload');
