#!/usr/bin/env node
// B2.1: reproducible source coverage, never modifies data.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const source=fs.readFileSync(path.join(root,'data/data.generated.js'),'utf8');
function parse(name){const mark=new RegExp('(?:let|const)\\s+'+name+'=').exec(source);assert(mark,'Missing '+name);const start=mark.index+mark[0].length;const end=source.indexOf(';\n',start);return JSON.parse(source.slice(start,end))}
const events=parse('events'), originals=parse('originalEvents'), enrich=parse('allOriginalResearchV828'), bible=parse('bibleOriginal');
const set=a=>new Set(a), h=set(events.map(x=>x.id)),o=set(originals.map(x=>x.id)),research=set(Object.keys(enrich));
const folder=path.join(root,'data'),files=fs.readdirSync(folder).filter(x=>/^c7-religionshistorisk-betydelse.*\.js$/.test(x)).sort();
const ids=new Set(),filesWithoutIds=[],occurrences=[];
for(const file of files){const s=fs.readFileSync(path.join(folder,file),'utf8');const found=[...s.matchAll(/["'](O\d{3})["']\s*:/g)].map(m=>m[1]);if(!found.length)filesWithoutIds.push(file);for(const id of found)ids.add(id);occurrences.push({file,ids:found})}
const bBooks=fs.readFileSync(path.join(folder,'bible-books-v857.js'),'utf8'),dBooks=fs.readFileSync(path.join(folder,'apocrypha-books-v891.js'),'utf8'),ap=fs.readFileSync(path.join(folder,'apokryfer-granskning3.v888.js'),'utf8');
const count=(s,re)=>set([...s.matchAll(re)].map(m=>m[1])).size;
const report={events:events.length,originals:originals.length,bibleOriginal:bible.length,originalResearchKeys:research.size,researchWithoutO:[...research].filter(x=>!o.has(x)),oWithoutResearch:[...o].filter(x=>!research.has(x)),hAndOOverlap:[...h].filter(x=>o.has(x)),c7Files:files.length,c7UniqueO:ids.size,c7UnknownO:[...ids].filter(x=>!o.has(x)),c7NoIdFiles:filesWithoutIds,bibleBooks:count(bBooks,/"id"\s*:\s*"(B\d{3})"/g),apocryphaBooks:count(dBooks,/"id"\s*:\s*"(D\d{3})"/g),apocryphaThemes:count(ap,/\bid\s*:\s*['"](AP\d{3})['"]/g)};
console.log(JSON.stringify(report,null,2));
assert.equal(report.researchWithoutO.length,0,'Research keys without O');assert.equal(report.oWithoutResearch.length,0,'O without research');
assert.equal(report.c7UnknownO.length,0,'C7 points to missing O');
assert.equal(report.hAndOOverlap.length,0,'H/O collision');
