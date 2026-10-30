'use strict';
// Generated copy at repository root solely for F5.4 CI. No production index edit.
const fs=require('node:fs');
const html=fs.readFileSync('index.html','utf8');
const marker='</body></html>';
if(!html.includes(marker))throw new Error('Unexpected production HTML ending');
if(html.includes('src="tests/f5-live-app-probe.js"'))throw new Error('Production must not reference F5 probe');
const injected=html.replace(marker,'<script src="tests/f5-live-app-probe.js"></script>'+marker);
fs.writeFileSync('f5-live-test.html',injected,'utf8');
console.log('F5.4 generated isolated copy of real index.html:',[...injected.matchAll(/<script[^>]+src="/g)].length,'script imports');
