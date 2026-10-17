// Obligatorisk publiceringsgrind för NYA forskningsposter i Tidens väv.
// Läser samtliga datafiler som faktiskt laddas före appen, utan att ändra appen.
// Historiska undantag är explicita och utgör en kvarstående separat rättningsskuld.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
const root=new URL('../',import.meta.url);
const read=path=>fs.readFileSync(new URL(path,root),'utf8');
const html=read('index.html');
const beforeApp=html.split('<script src="app.js"></script>')[0];
assert.ok(beforeApp!==html,'Cannot locate application initialization');
const scripts=[...beforeApp.matchAll(/<script src="(data\/[^"]+\.js)"><\/script>/g)].map(m=>m[1]);
assert.ok(scripts.includes('data/data.generated.js'),'Base records missing');
assert.ok(scripts.includes('data/c7-religionshistorisk-betydelse.v890.js'),'C7 archive not loaded');

const context={window:{},URL};
vm.createContext(context);
let baselineIds=null;
for(const script of scripts){
  vm.runInContext(read(script),context,{filename:script});
  if(script==='data/data.generated.js'){
    baselineIds=new Set(vm.runInContext('events.map(e=>e.id)',context));
  }
}
assert.ok(baselineIds,'No baseline snapshot found');
const newEntries=vm.runInContext('events.map(({id,title})=>({id,title}))',context)
  .filter(({id})=>!baselineIds.has(id));
const unique=new Set(newEntries.map(e=>e.id));
assert.equal(unique.size,newEntries.length,'Duplicate new post IDs');
assert.ok(newEntries.some(e=>e.id==='H068')&&newEntries.some(e=>e.id==='H069'));

// Dokumenterad historisk rest från redan publicerade poster. Undantagen gäller
// endast dessa ID:n och får inte utvidgas när nya poster skapas.
const existingBacklog=new Set([
  'AP001','AP002','AP003','AP004','AP005','AP006' // Granskning 3 – Apokryferna
]);
const sources=vm.runInContext('research',context);
const c7=context.window.TIDENS_C7_RELIGION||{};
const targeted=context.window.TIDENS_SPECIAL_RESEARCH||{};
const missingHistorical=[];
for(const id of ['H066','H067','H068','H069']){
 assert.ok(c7[id]?.paragraph?.length>=550,id+': Lilith och Ophiter måste ha egna C7-analyser');
}
for(const e of newEntries){
  const faith=c7[e.id]||targeted[e.id]?.religion||sources[e.id]?.religion;
  if(!faith){
    assert.ok(existingBacklog.has(e.id),e.id+' ('+e.title+'): ny post saknar rubriken Betydelse för Israels religion, judendomen och kristendomen. Ingen publicering innan individuell källförankrad text finns.');
    missingHistorical.push(e.id);
    continue;
  }
  assert.ok(typeof faith.level==='string'&&faith.level.trim().length>=25,e.id+': vetenskaplig nivå saknas');
  assert.ok(typeof faith.paragraph==='string'&&faith.paragraph.trim().length>=550,e.id+': religionshistorisk betydelse är för kort eller saknas');
  assert.ok(!/religionshistorisk betydelse återstår|specifika religionshistoriska betydelse behöver granskas|kommer att kompletteras|ej ännu utrett/i.test(faith.paragraph),e.id+': intetsägande standardtext är inte en analys');
  assert.ok(Array.isArray(faith.sources)&&faith.sources.length>=2,e.id+': minst två specificerade källvägar krävs');
  for(const [name,url] of faith.sources){
    assert.ok(typeof name==='string'&&name.length>=15,e.id+': källbeskrivning för kort');
    assert.ok(typeof url==='string'&&new URL(url).protocol==='https:',e.id+': giltig käll-URL saknas');
  }
}
assert.ok(!missingHistorical.includes('H068')&&!missingHistorical.includes('H069'),'Granskning 5 must never be a legacy exception');
console.log(JSON.stringify({gate:'OK',newResearchPostCount:newEntries.length,idsWithMandatorySignificance:newEntries.map(e=>e.id).filter(id=>!missingHistorical.includes(id)),historicalRemediationBacklog:missingHistorical},null,2));
