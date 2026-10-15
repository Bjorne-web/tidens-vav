import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
const ctx={window:{}};
vm.runInNewContext(read('data/review-ledger.js'),ctx);
vm.runInNewContext(read('data/c6-progress.js'),ctx);
vm.runInNewContext(read('data/bible-books-v857.js'),ctx);
const ledger=ctx.window.TIDENS_REVIEW_LEDGER;
const ids=Object.keys(ledger.claimChecks);
const count=Object.values(ledger.claimChecks).reduce((n,rows)=>n+rows.length,0);
const current=ctx.window.TIDENS_C6_PROGRESS.history.at(-1);
assert.ok(count>=62);
assert.ok(ids.length>=23);
assert.equal(current.claimChecks,count);
assert.equal(current.claimCheckPosts,ids.length);
for(const id of ['H051','H055','H058']){
 const row=ledger.claimChecks[id][0];
 assert.ok(/^2026-10-(14|15)$/.test(row.verified));
 assert.ok(row.sourceUrl.startsWith('https://'));
 assert.ok(row.scope.length>10 && row.limit.length>20);
}
assert.equal(Object.keys(ledger.completePostReviews).length,0);
assert.equal(ctx.window.TIDENS_BIBLE_BOOK_RESEARCH.B023.status,'delgranskad');
assert.equal(ctx.window.TIDENS_BIBLE_BOOKS.length,66);
console.log('OK V8.65: 3 new posts, 62 scoped checks in 23 posts; Isaiah dossier; 0 finished reviews');
