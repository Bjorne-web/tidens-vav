import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
const ctx={window:{}};
vm.runInNewContext(read('data/bible-books-v857.js'),ctx);
const books=ctx.window.TIDENS_BIBLE_BOOKS,profiles=ctx.window.TIDENS_BIBLE_BOOK_RESEARCH;
assert.equal(books.length,66);
for(const id of ['B001','B002','B003','B004','B005']){
 const p=profiles[id];assert.equal(p.status,'delgranskad');
 assert.ok(p.composition.length>65&&p.context.length>65&&p.limits.length>40);
 assert.ok(p.sources.length>=2);
}
vm.runInNewContext(read('data/review-ledger.js'),ctx);
vm.runInNewContext(read('data/c6-progress.js'),ctx);
const ledger=ctx.window.TIDENS_REVIEW_LEDGER;
const count=Object.values(ledger.claimChecks).reduce((n,a)=>n+a.length,0);
assert.equal(count,39);
assert.equal(ctx.window.TIDENS_C6_PROGRESS.history.at(-1).claimChecks,count);
assert.equal(Object.keys(ledger.claimChecks).length,17);
assert.equal(Object.keys(ledger.completePostReviews).length,0);
assert.ok(ledger.claimChecks.H019.some(c=>c.claim.includes('Femte Mosebokens')));
console.log('V8.61: five Torah profiles, 39 C6 claim checks, zero whole reviews');
