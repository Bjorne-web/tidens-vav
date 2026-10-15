import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const load=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
const html=load('index.html');
assert.ok(html.includes('Version 8.84 · upptäck, jämför och granska källorna'));
assert.ok(html.includes('Bygge v8.84-range-20261015'));
const ctx={window:{}};
for(const p of ['data/review-ledger.js','data/c6-progress.js','data/bible-books-v857.js'])vm.runInNewContext(load(p),ctx);
const ledger=ctx.window.TIDENS_REVIEW_LEDGER,progress=ctx.window.TIDENS_C6_PROGRESS.history.at(-1);
const count=Object.values(ledger.claimChecks).reduce((n,rows)=>n+rows.length,0);
assert.ok(count>=80);
assert.ok(Object.keys(ledger.claimChecks).length>=38);
assert.equal(progress.claimChecks,count);
assert.equal(progress.claimCheckPosts,Object.keys(ledger.claimChecks).length);
for(const id of ['H043','H057','H059']){
 const row=ledger.claimChecks[id][0];
 assert.ok(row.sourceUrl.startsWith('https://'));
 assert.ok(row.limit.length>30 && row.scope.length>20);
}
assert.equal(ctx.window.TIDENS_BIBLE_BOOK_RESEARCH.B029.status,'delgranskad');
assert.ok(ctx.window.TIDENS_BIBLE_BOOK_RESEARCH.B029.sources.length>=2);
assert.equal(ctx.window.TIDENS_BIBLE_BOOKS.length,66);
assert.equal(Object.keys(ledger.completePostReviews).length,0);
console.log('OK V8.71: Joel, 80 scoped checks in 38 posts, no full reviews');
