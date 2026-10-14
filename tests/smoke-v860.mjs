import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
const ctx={window:{}};
vm.runInNewContext(read('data/bible-books-v857.js'),ctx);
const books=ctx.window.TIDENS_BIBLE_BOOKS,profiles=ctx.window.TIDENS_BIBLE_BOOK_RESEARCH;
assert.equal(books.length,66);
for(const id of ['B040','B041','B042','B043']){
 assert.equal(profiles[id].status,'delgranskad');
 assert.ok(profiles[id].composition.length>100);
 assert.ok(profiles[id].context.length>100);
 assert.ok(profiles[id].limits.length>70);
 assert.ok(profiles[id].sources.length>=2);
}
vm.runInNewContext(read('data/review-ledger.js'),ctx);
vm.runInNewContext(read('data/c6-progress.js'),ctx);
const checks=Object.values(ctx.window.TIDENS_REVIEW_LEDGER.claimChecks);
assert.ok(checks.reduce((n,a)=>n+a.length,0)>=38);
assert.equal(ctx.window.TIDENS_C6_PROGRESS.history.at(-1).claimChecks,checks.reduce((n,a)=>n+a.length,0));
assert.equal(Object.keys(ctx.window.TIDENS_REVIEW_LEDGER.completePostReviews).length,0);
console.log('V8.60: four gospel dossiers, C6 38 checks, zero complete reviews');
