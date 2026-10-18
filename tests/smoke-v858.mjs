import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
const html=read('index.html');
assert.ok(html.indexOf('v857-bible-books.js')<html.indexOf('v858-book-reader.js'));
const list=read('v857-bible-books.js');
assert.ok(list.includes('button.dataset.tvBook=b.id'));
assert.ok(!list.includes("button.addEventListener('click',()=>{detail.hidden=false"),'No competing inline book reader');
const reader=read('v858-book-reader.js');
for(const required of ["document.getElementById('detail')","renderDetail=function()","state.selected=b.id","v84OpenReader()","Visa sambanden i Temaspår","v827ShowRelations(related)","v84OpenReader()","B001:'H020'","B027:'H023'","B043:'H034'"]){
 assert.ok(reader.includes(required),'Missing book reader integration: '+required);
}
const ctx={window:{}};
vm.runInNewContext(read('data/bible-books-v857.js'),ctx);
assert.equal(ctx.window.TIDENS_BIBLE_BOOKS.length,66);
vm.runInNewContext(read('data/review-ledger.js'),ctx);
vm.runInNewContext(read('data/c6-progress.js'),ctx);
const checks=Object.values(ctx.window.TIDENS_REVIEW_LEDGER.claimChecks);
assert.ok(checks.reduce((n,x)=>n+x.length,0)>=36);
assert.ok(checks.filter(x=>x.length).length>=17);
const last=ctx.window.TIDENS_C6_PROGRESS.history.at(-1);
assert.equal(last.claimChecks,checks.reduce((n,x)=>n+x.length,0));
assert.equal(last.wholeApproved,0);
assert.equal(Object.keys(ctx.window.TIDENS_REVIEW_LEDGER.completePostReviews).length,0);
assert.ok(ctx.window.TIDENS_REVIEW_LEDGER.claimChecks.H020.some(x=>x.claim.includes('YHWH Elohim')));
console.log('V8.58: 66 book details use research reader, thematic link is cautious, C6 36/17/0');
