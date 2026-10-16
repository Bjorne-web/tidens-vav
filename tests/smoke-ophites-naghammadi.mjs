import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const data=fs.readFileSync('data/data.generated.js','utf8');
const overlay=fs.readFileSync('data/ophites-naghammadi.v889-draft.js','utf8');
const page=fs.readFileSync('index.html','utf8');
const source=fs.readFileSync('docs/ophiter-naghammadi-granskning5.md','utf8');
const src='data/ophites-naghammadi.v889-draft.js';
assert.equal(page.split(src).length-1,1,'New script must load exactly once');
assert.ok(page.indexOf('data/data.generated.js')<page.indexOf(src),'Main dataset loaded first');
assert.ok(page.indexOf(src)<page.indexOf('<script src="app.js"></script>'),'Post data must load before app');
const ctx={window:{}};vm.createContext(ctx);
vm.runInContext(data+'\n;globalThis.__snapshot={events,research,originalEvents};',ctx,{filename:'data/data.generated.js'});
const baseline=ctx.__snapshot.events.length;
assert.ok(!ctx.__snapshot.events.some(x=>['H068','H069'].includes(x.id)),'IDs must not already exist');
vm.runInContext(overlay,ctx,{filename:src});
assert.equal(ctx.__snapshot.events.length,baseline+2,'Exactly two records expected');
for(const id of ['H068','H069']){
  const matches=ctx.__snapshot.events.filter(e=>e.id===id);
  assert.equal(matches.length,1,'Exactly one event: '+id);
  const [e]=matches;
  assert.equal(e.category,'Religion & texter');
  assert.equal(e.reviewed,false,'Must not claim complete review');
  assert.ok(e.start>0 && e.end>=e.start,'Chronology needs positive CE years');
  assert.ok(['Hög','Medel','Låg','Osäker','Ej granskad'].includes(e.evidence),'Known UI evidence level');
  const r=ctx.__snapshot.research[id];
  assert.ok(r?.overview?.length>180);
  assert.ok(r?.parallels?.length>120);
  assert.ok(r?.caution?.length>130);
  assert.ok(r.sources.length>=5);
  for(const pair of r.sources)assert.ok(Array.isArray(pair)&&pair.length===2&&pair[1].startsWith('https://'),'Sources need name+url');
  assert.match(r.credit,/inte|INTE/i,'Image disclaimer required');
  assert.ok(r.image.startsWith('https://commons.wikimedia.org/wiki/Special:FilePath/'));
  assert.ok(r.imageSource.startsWith('https://commons.wikimedia.org/wiki/File:'));
  assert.ok(Array.isArray(r.related));
  for(const rel of r.related){
    assert.ok(ctx.__snapshot.events.some(e=>e.id===rel.id),'Linked post must exist in this branch: '+rel.id);
    assert.ok(rel.relation);
  }
  assert.match(r.reviewStatus,/Granskning pågår/);
}
const older=ctx.__snapshot.events.find(e=>e.id==='H068');
const codex=ctx.__snapshot.events.find(e=>e.id==='H069');
assert.ok(older.start>=150 && older.end<=300,'Ancient witnesses should be 2nd to 3rd centuries');
assert.ok(codex.start>=300 && codex.end<400,'Codex timeline date should reflect surviving 4th-century witness');
assert.match(codex.dating,/handskriftsvittne/i);
assert.match(ctx.__snapshot.research.H068.caution,/polemisk/i);
assert.match(ctx.__snapshot.research.H069.caution,/inte identiskt/i);
vm.runInContext(overlay,ctx,{filename:src});
assert.equal(ctx.__snapshot.events.length,baseline+2,'Overlay must be idempotent');
assert.ok(source.includes('H020')&&source.includes('H025'));
// Lilith and Apokryferna were published to main between draft review and this merge.
assert.ok(page.includes('data/lilith.v888-draft.js'),'Published Lilith must remain in integrated build');
assert.ok(page.includes('data/apokryfer-granskning3.v888.js'),'Published Apokryferna must remain in integrated build');
assert.ok(page.includes('v888-lilith-images.js'),'Published Lilith images must remain');
assert.ok(page.indexOf('data/lilith.v888-draft.js')<page.indexOf(src),'Published Lilith loads before Ophites');
assert.ok(page.indexOf('data/apokryfer-granskning3.v888.js')<page.indexOf(src),'Published Apokryferna loads before Ophites');
console.log('Granskning 5: two posts, unique IDs, sources, image credits, time levels, and separate staging verified');
