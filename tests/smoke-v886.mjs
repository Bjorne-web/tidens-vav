import fs from 'node:fs';import assert from 'node:assert/strict';
const h=fs.readFileSync('index.html','utf8'), app=fs.readFileSync('app.js','utf8'), css=fs.readFileSync('v886-research-menu.css','utf8');
assert.ok(h.includes('Version 8.86'));assert.ok(h.includes('v8.86-menu-20261016'));
assert.ok(h.includes('v886-research-menu.css'));
assert.ok(app.includes('v886-menu-intro'));
assert.ok(app.includes('Komplement till Tidslinje, Temaspår och Poster'));
assert.ok(app.includes('v827ResearchLinks.map'));
assert.ok(css.includes('#v827ResearchMenu .v886-menu-intro'));
console.log('V8.86 menu semantics and destinations preserved');
