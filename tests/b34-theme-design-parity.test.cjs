const fs=require('node:fs');const assert=require('node:assert/strict');
const html=fs.readFileSync('index.html','utf8');const css=fs.readFileSync('v916-theme-design-parity.css','utf8');const js=fs.readFileSync('v916-theme-design-parity.js','utf8');
assert.match(html,/v916-theme-design-parity\.css/);assert.match(html,/v916-theme-design-parity\.js/);
assert.match(css,/#exploreView>\.tvb-theme-hero/);assert.match(css,/Start-hero\.png/);
assert.match(css,/\.tvb-theme-topic-grid/);assert.match(css,/--tv887-accent-religion/);
assert.match(js,/getElementById\('exploreView'\)/);assert.match(js,/cloneNode\(true\)/);
assert.doesNotMatch(js,/innerHTML/);assert.doesNotMatch(js,/getElementById\('timelineView'\)/);
console.log('B3.4 Temaspår design parity static checks: PASS');
