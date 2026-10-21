const fs=require('node:fs');const assert=require('node:assert/strict');
const html=fs.readFileSync('previews/b33-isolated-view-preview.html','utf8');
const doc=fs.readFileSync('docs/b33-user-journey-review.md','utf8');
const index=fs.readFileSync('index.html','utf8');
for(const term of ['function saveContext()','comparisonIds:[...state.comparisonIds]','state.comparisonIds=[...prev.comparisonIds]','saveContext();state.originView','saveContext();state.area','saveContext();state.selectedPostId','state.returnContext.pop()','@media(max-width:720px)','aria-pressed'])assert(html.includes(term),'Missing '+term);
for(const term of ['O124','O129','O119','manuell visuell granskning','tillgänglighet','C7','O066','B3.4'])assert(doc.toLowerCase().includes(term.toLowerCase()),'Missing '+term);
assert(!index.includes('b33-isolated-view-preview.html'),'Preview is not isolated');
assert(!html.includes('data/data.generated.js'),'Preview must not alter original data');
console.log('B3.3 user journey and return-context guardrails pass; manual visual review remains');
