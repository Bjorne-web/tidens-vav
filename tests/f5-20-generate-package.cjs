'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
require('./f5-19-generate-staging.cjs');
const src=fs.readFileSync('f5-19-staging-test.html','utf8');
const old='<script src="tests/f5-19-probe.js"></script>';
assert.equal(src.split(old).length,2,'F5.19 probe changed; review integration');
let html=src.replace(old,'<script src="review-controller.js"></script>');
for(const name of ['tests/f5-9-staging-probe.js','tests/f5-10-browser-probe.js','tests/f5-10-special-readers.js','tests/f5-15-real-app-probe.js']){
 html=html.replace('<script src="'+name+'"></script>','');
}
const out='out/f5-20/site';fs.mkdirSync(out,{recursive:true});
const ignore=new Set(['.git','.github','.devcontainer','node_modules','out','tests','docs','dist','coverage']);
const filter=(srcPath)=>{
 const rel=path.relative(process.cwd(),srcPath);
 if(!rel)return true;
 const root=rel.split(path.sep)[0];
 if(ignore.has(root)||root.startsWith('.'))return false;
 if(root.endsWith('-staging-test.html')||root.endsWith('-reader-test.html'))return false;
 return true;
};
for(const name of fs.readdirSync('.')){
 if(!filter(path.resolve(name)))continue;
 const from=path.resolve(name),to=path.join(out,name);
 fs.cpSync(from,to,{recursive:true,force:true,filter});
}
for(const item of ['f5/integration','f5-10','f5-15','f5-19']){
 const from=path.join('out',item),to=path.join(out,'out',item);
 assert(fs.existsSync(from),'Missing generated F5 asset '+item);
 fs.mkdirSync(path.dirname(to),{recursive:true});
 fs.cpSync(from,to,{recursive:true,force:true});
}
fs.writeFileSync(path.join(out,'review.html'),html);
fs.copyFileSync('tests/f5-20-review-controller.js',path.join(out,'review-controller.js'));
const manifest={phase:'F5.20',type:'offline HTTP-served review package, not deployed',
entry:'review.html',reviewC7:33,limitations:[
 'No public staging URL or Cloudflare deployment',
 'This uses explicit review-only controls, not the live quick-reader entry',
 'Map readiness remains test candidate and manually reviewable',
 'Native smartphone/assistive technology and exhaustive catalogue not certified']};
fs.writeFileSync(path.join(out,'F5-README.json'),JSON.stringify(manifest,null,2)+'\n');
assert(!fs.readFileSync('index.html','utf8').includes('review-controller.js'));
console.log('F5.20 complete review package generated; file count:',fs.readdirSync(out).length);
