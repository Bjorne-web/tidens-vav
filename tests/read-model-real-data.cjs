/* Automated regression checks: run via node tests/read-model-real-data.cjs */
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const root=require('node:path').resolve(__dirname,'..');
const load=p=>fs.readFileSync(require('node:path').join(root,p),'utf8');
const context=vm.createContext({window:{},URL,console});
vm.runInContext(load('data/bible-books-v857.js'),context);
vm.runInContext(load('data/apocrypha-books-v891.js'),context);
context.events=[];context.research={};
vm.runInContext(load('data/apokryfer-granskning3.v888.js'),context);
context.idEvent=id=>context.events.find(e=>e.id===id)||null;
vm.runInContext(load('v897-research-read-model.js'),context);
const model=context.window.TidensResearchReadModel;
assert(model,'Read model must be exposed');
for(let i=1;i<=6;i++){
 const id='AP'+String(i).padStart(3,'0'),item=model.get(id);
 assert(item,id+' not found');
 assert(item.summary,id+' missing summary');
 assert(item.sources.length,id+' missing sources');
 assert.equal(item.kind,'post');
}
const book=model.get('B001'),apocrypha=model.get('D001');
assert.equal(book?.subtype,'bible-book');
assert(book.summary&&book.dateType&&book.narrativeTime);
assert.equal(apocrypha?.subtype,'apocrypha-book');
assert(apocrypha.summary&&apocrypha.dateType&&apocrypha.narrativeTime);
assert(apocrypha.sources.length>=2);
assert(apocrypha.sources.some(s=>s.url.includes('bibeln.se')));
assert.equal(model.get('INVALID'),null);
console.log('PASS: AP001–AP006, B001, D001 and invalid-ID handling');
