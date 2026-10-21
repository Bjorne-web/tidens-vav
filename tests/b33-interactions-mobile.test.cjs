const fs=require('node:fs'),assert=require('node:assert/strict');
const html=fs.readFileSync('previews/b33-isolated-view-preview.html','utf8');
const index=fs.readFileSync('index.html','utf8');
for(const token of ["state.comparisonIds.length>1","state.comparisonIds.filter","state.comparisonIds.push(id)","state.returnContext.push({","prev.view","prev.post","prev.area","grid.className='columns'","@media(max-width:720px)","aria-pressed","document.createElement('article')"])assert(html.includes(token),'Missing '+token);
assert(!index.includes('b33-isolated-view-preview.html'),'Demo must not be linked from production index');
assert(!html.includes('data/data.generated.js'),'Demo must not import original source data');
console.log('B3.3 comparison, navigation and mobile isolation gates pass');
