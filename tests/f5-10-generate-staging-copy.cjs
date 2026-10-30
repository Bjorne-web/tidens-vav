'use strict';
const fs=require('node:fs'),assert=require('node:assert/strict');
require('./f5-10-catalog-inventory.cjs');
require('./f5-9-generate-staging-copy.cjs');
const html=fs.readFileSync('f5-9-staging-test.html','utf8');
const target='<script>window.TidensF5CandidateConfig={enabled:true,articles:window.__F5TestOnlyArticles,css:window.__F5TestOnlyReaderCss};</script>';
assert.equal(html.split(target).length,2,'Candidate config changed: stop before modifying temporary HTML');
const replacement='<script src="out/f5-10/browser-articles.js"></script>'+
 '<script>window.TidensF5CandidateConfig={enabled:true,'+
 'articles:{...window.__F5TestOnlyArticles,...window.__F510AdditionalArticles},'+
 'css:window.__F5TestOnlyReaderCss};</script>';
const script='<script src="tests/f5-10-browser-probe.js"></script>'+
 '<script src="tests/f5-10-special-readers.js"></script>';
const output=html.replace(target,replacement).replace('</body></html>',script+'</body></html>');
fs.writeFileSync('f5-10-staging-test.html',output,'utf8');
const published=fs.readFileSync('index.html','utf8');
assert(!published.includes('f5-10-browser-probe.js')&&!published.includes('f5-full-reader-bridge.js'));
console.log('F5.10 temporary full-app HTML generated from F5.9 without changing production scripts');
