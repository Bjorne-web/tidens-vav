import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
const html=read('index.html');
assert.ok(/Version 8\.\d+ · upptäck, jämför och granska källorna/.test(html));
assert.ok(/Tidens väv V8\.\d+/.test(html));
assert.ok(!html.includes('Version 8.59'),'Outdated page version must not appear');
const context={window:{}};
for(const p of ['data/review-ledger.js','data/c6-progress.js','data/bible-books-v857.js'])vm.runInNewContext(read(p),context);
const journal=context.window.TIDENS_REVIEW_LEDGER;
const stats=context.window.TIDENS_C6_PROGRESS.history.at(-1);
const total=Object.values(journal.claimChecks).reduce((n,list)=>n+list.length,0);
assert.ok(total>=68);assert.equal(stats.claimChecks,total);
assert.ok(Object.keys(journal.claimChecks).length>=29);
assert.equal(stats.claimCheckPosts,Object.keys(journal.claimChecks).length);
for(const id of ['H045','H046','H047']){
const item=journal.claimChecks[id][0];
assert.ok(item.sourceUrl.startsWith('https://'));
assert.ok(item.limit.length>30);
}
const profile=context.window.TIDENS_BIBLE_BOOK_RESEARCH.B025;
assert.equal(profile.status,'delgranskad');
assert.ok(profile.sources.length>=2);
assert.equal(context.window.TIDENS_BIBLE_BOOKS.length,66);
assert.equal(Object.keys(journal.completePostReviews).length,0);
console.log('V8.67: version header correct, C6 68/29, Lamentations, zero complete reviews');
