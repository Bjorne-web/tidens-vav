import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const read = p => fs.readFileSync(p,'utf8');
const html=read('index.html');
const ctx={window:{}};
vm.runInNewContext(read('data/review-ledger.js'),ctx);
vm.runInNewContext(read('data/c6-progress.js'),ctx);
vm.runInNewContext(read('data/bible-books-v857.js'),ctx);
const journal=ctx.window.TIDENS_REVIEW_LEDGER;
const latest=ctx.window.TIDENS_C6_PROGRESS.history.at(-1);
assert.match(html,/Version 8\.78/);
assert.match(html,/v8\.78-c6-20261015/);
assert.equal(ctx.window.TIDENS_BIBLE_BOOK_RESEARCH.B035.status,'delgranskad');
assert.match(ctx.window.TIDENS_BIBLE_BOOK_RESEARCH.B035.composition,/Kapitel 3/);
assert.ok(journal.claimChecks.H042.length>=2);
assert.ok(journal.claimChecks.H042.some(x=>x.sourceUrl.includes('1855-1003-1')));
assert.ok(journal.claimChecks.H042.some(x=>x.sourceUrl.includes('1896-0409-6')));
assert.equal(latest.claimChecks,Object.values(journal.claimChecks).reduce((a,x)=>a+x.length,0));
assert.equal(latest.claimCheckPosts,Object.keys(journal.claimChecks).length);
assert.equal(latest.claimChecks,97);
assert.equal(latest.claimCheckPosts,41);
assert.equal(Object.keys(journal.completePostReviews).length,0);
for(const file of ['v876-start-here.js','v843-timeline-workspace.js','v859-book-gantt.js','v858-book-reader.js'])assert.ok(read('index.html').includes(file));

// Search must include late-loaded Bible book records, not only timeline research posts.
const app=read('app.js');
assert.ok(app.includes("function v878SearchEntries()"));
assert.ok(app.includes("window.TIDENS_BIBLE_BOOKS||[]"));
assert.ok(app.includes("v878SearchEntries().map(e=>"));
assert.ok(app.includes("x.type==='book'"));
assert.ok(app.includes("window.TidensOpenBookV858(x.id)"));
const indexMatches=ctx.window.TIDENS_BIBLE_BOOKS.filter(b=>b.id==='B035'||b.title.toLowerCase().includes('habackuk'));
assert.equal(indexMatches.length,1);

console.log('V8.78: Habackuk profile, H042 source checks, C6 counts and existing UI assets OK');
