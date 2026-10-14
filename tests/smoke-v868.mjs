import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
const html=read('index.html');
assert.ok(/Version 8\.\d+ · upptäck, jämför och granska källorna/.test(html));
assert.ok(/Tidens väv V8\.\d+/.test(html));
assert.ok(!html.includes('Version 8.67'));
const ctx={window:{}};
for(const path of ['data/review-ledger.js','data/c6-progress.js','data/bible-books-v857.js'])vm.runInNewContext(read(path),ctx);
const journal=ctx.window.TIDENS_REVIEW_LEDGER,latest=ctx.window.TIDENS_C6_PROGRESS.history.at(-1);
const claimCount=Object.values(journal.claimChecks).reduce((n,v)=>n+v.length,0);
assert.ok(claimCount>=71);
assert.equal(latest.claimChecks,claimCount);
assert.equal(latest.claimCheckPosts,Object.keys(journal.claimChecks).length);
assert.ok(latest.claimCheckPosts>=31);
for(const id of ['H048','H049','H055']){
 const row=journal.claimChecks[id][0];assert.ok(row.sourceUrl.startsWith('https://'));
 assert.ok(row.limit.length>25);
}
assert.equal(ctx.window.TIDENS_BIBLE_BOOK_RESEARCH.B026.status,'delgranskad');
assert.ok(ctx.window.TIDENS_BIBLE_BOOK_RESEARCH.B026.sources.length>=2);
assert.equal(ctx.window.TIDENS_BIBLE_BOOKS.length,66);
assert.equal(Object.keys(journal.completePostReviews).length,0);
console.log('V8.68 OK: 71 checks in 31 posts, Ezekiel dossier, version 8.68');
