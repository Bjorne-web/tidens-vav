#!/usr/bin/env node
/* B2.3: audit category coverage on canonical H/O/B/D sources, read-only. */
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),data=path.join(root,'data');
const model=require('../v915-category-read-model.js');
const source=fs.readFileSync(path.join(data,'data.generated.js'),'utf8');
function read(name){const match=new RegExp('(?:let|const)\\s+'+name+'=').exec(source);assert(match,'Missing '+name);return JSON.parse(source.slice(match.index+match[0].length,source.indexOf(';\n',match.index)))}
function objects(file,globalName){const text=fs.readFileSync(path.join(data,file),'utf8');const match=new RegExp('(?:window\\.)?'+globalName+'\\s*=\\s*Object\\.freeze\\(\\s*(\\[)').exec(text);assert(match,'Missing '+globalName);const start=text.indexOf('[',match.index),end=text.lastIndexOf(']');assert(end>start,'Missing end '+globalName);return JSON.parse(text.slice(start,end+1))}
const sources={
 H:read('events'),O:read('originalEvents'),
 B:objects('bible-books-v857.js','TIDENS_BIBLE_BOOKS'),
 D:objects('apocrypha-books-v891.js','TIDENS_APOCRYPHA_BOOKS')
};
const report={sources:{},total:0,classified:0,unclassified:0,collisionIds:[],unclassifiedExamples:[]};
const global=new Set();
for(const [type,posts] of Object.entries(sources)){const stats={total:posts.length,classified:0,unclassified:0};for(const post of posts){
 assert(post&&post.id&&post.id.startsWith(type),'Unexpected ID in '+type);
 if(global.has(post.id))report.collisionIds.push(post.id);global.add(post.id);
 const unchanged=JSON.stringify(post),category=model.get(post);
 assert(category&&category.id===post.id);assert.equal(JSON.stringify(post),unchanged);
 if(category.primaryArea==='unclassified'){stats.unclassified++;if(report.unclassifiedExamples.length<12)report.unclassifiedExamples.push(post.id)}
 else {stats.classified++;assert(model.areas.includes(category.primaryArea))}
}report.sources[type]=stats;report.total+=stats.total;report.classified+=stats.classified;report.unclassified+=stats.unclassified}
assert.equal(report.collisionIds.length,0,'Cross-series ID collisions');assert.equal(report.total,report.classified+report.unclassified);
console.log(JSON.stringify(report,null,2));
