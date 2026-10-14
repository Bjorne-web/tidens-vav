import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
const ctx={window:{}};
for(const file of ['data/review-ledger.js','data/c6-progress.js','data/bible-books-v857.js'])vm.runInNewContext(read(file),ctx);
const journal=ctx.window.TIDENS_REVIEW_LEDGER,history=ctx.window.TIDENS_C6_PROGRESS.history.at(-1);
const ids=Object.keys(journal.claimChecks),total=Object.values(journal.claimChecks).reduce((n,v)=>n+v.length,0);
assert.equal(ids.length,26);assert.equal(total,65);
assert.equal(history.claimCheckPosts,ids.length);assert.equal(history.claimChecks,total);
for(const id of ['H050','H052','H053']){
 const claim=journal.claimChecks[id][0];assert.ok(claim.sourceUrl.startsWith('https://'));
 assert.ok(claim.scope.length>10&&claim.limit.length>20);
}
const jeremiah=ctx.window.TIDENS_BIBLE_BOOK_RESEARCH.B024;
assert.equal(jeremiah.status,'delgranskad');assert.ok(jeremiah.sources.length>=2);
assert.equal(ctx.window.TIDENS_BIBLE_BOOKS.length,66);
assert.equal(Object.keys(journal.completePostReviews).length,0);
console.log('OK V8.66: 65 checks across 26 posts; Jeremiah research profile and no completed C6 reviews');
