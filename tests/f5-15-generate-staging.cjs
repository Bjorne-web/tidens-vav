'use strict';
const fs=require('node:fs'),assert=require('node:assert/strict');
const {reportRows,latestDating}=require('./f5-11-c7-source-inventory.cjs');
const {assembleResearchObject}=require('./f3-unified-research-contract.cjs');
const {renderFullReader}=require('./f4-reader-renderer.cjs');
const {renderUndatedReason}=require('./f5-12-undated-reader-candidate.cjs');
require('./f5-10-generate-staging-copy.cjs');
const candidates={};
for(const row of reportRows){
 const c7=latestDating[row.id];
 if(!c7||!Array.isArray(c7.entry?.phases)||c7.entry.phases.length!==0||
  typeof c7.entry.undated!=='string'||!c7.entry.undated.trim())continue;
 const entity=assembleResearchObject('post',{
  id:row.id,title:row.title||row.id,
  sourceLayers:[{id:'f5-15-staging',fields:{summary:'Dateringsförklaring från registrerat C7-underlag'}}]
 });
 candidates[row.id]=renderUndatedReason(renderFullReader({entity,category:'history'}),
  row.id,c7.entry.undated,c7.file);
}
assert.equal(Object.keys(candidates).length,33,'C7 corpus changed: review all undated records');
fs.mkdirSync('out/f5-15',{recursive:true});
fs.writeFileSync('out/f5-15/c7-undated-articles.js',
 'window.__F515UndatedArticles='+JSON.stringify(candidates)+';\n');
const existing=fs.readFileSync('f5-10-staging-test.html','utf8');
const needle='<script>window.TidensF5CandidateConfig={enabled:true,';
assert.equal(existing.split(needle).length,2,'F5 staged config changed');
const replaced=existing.replace(needle,
 '<script src="out/f5-15/c7-undated-articles.js"></script>'+needle)
 .replace('articles:{...window.__F5TestOnlyArticles,...window.__F510AdditionalArticles},',
 'articles:{...window.__F5TestOnlyArticles,...window.__F510AdditionalArticles,...window.__F515UndatedArticles},');
assert(replaced.includes('...window.__F515UndatedArticles}'),'Additional C7 data not mounted');
const script='<script src="tests/f5-15-real-app-probe.js"></script>';
fs.writeFileSync('f5-15-staging-test.html',replaced.replace('</body></html>',script+'</body></html>'));
const original=fs.readFileSync('index.html','utf8');
assert(!original.includes('f5-15-real-app-probe.js')&&!original.includes('f5-full-reader-bridge.js'));
fs.writeFileSync('out/f5-15/manifest.json',JSON.stringify({
 stage:'isolated actual-app HTML copy with F5.9 reader candidate',
 c7UndatedCount:Object.keys(candidates).length,ids:Object.keys(candidates),
 limitations:['Not published','Not linked to real quick-reader UI','Not complete catalog integration',
 'Desktop/mobile viewport only','Real navigation and map conflict race conditions remain']
},null,2)+'\n');
console.log('F5.15 generated isolated actual-app copy with',Object.keys(candidates).length,'undated C7 records');
