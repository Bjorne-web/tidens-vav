#!/usr/bin/env bash
set -euo pipefail
CHROME="$(command -v google-chrome || command -v chromium || command -v chromium-browser || true)"
test -n "$CHROME" || { echo 'Chromium required'; exit 1; }
node tests/f5-16-generate-timeline.cjs
python3 -m http.server 8796 --bind 127.0.0.1 >out/f5-16/http.log 2>&1 &
SERVER=$!
trap 'kill "$SERVER" 2>/dev/null || true; rm -f f5-16-staging-test.html f5-15-staging-test.html f5-10-staging-test.html f5-9-staging-test.html f5-real-reader-test.html' EXIT
for i in $(seq 1 50); do
 if curl -fsS http://127.0.0.1:8796/f5-16-staging-test.html -o /dev/null 2>/dev/null; then break; fi
 sleep .2
done
for mode in desktop mobile; do
 if [[ "$mode" == mobile ]]; then size="390,844"; else size="1450,1000"; fi
 "$CHROME" --headless --no-sandbox --disable-dev-shm-usage --disable-gpu --no-first-run --window-size="$size" --virtual-time-budget=65000 --dump-dom "http://127.0.0.1:8796/f5-16-staging-test.html?f515=$mode" >"out/f5-16/$mode-dom.html" 2>"out/f5-16/$mode-chrome.log"
 node - "$mode" <<'NODE'
const fs=require('node:fs'),mode=process.argv[2];
const html=fs.readFileSync('out/f5-16/'+mode+'-dom.html','utf8');
const start=html.indexOf('<pre id="f515Report"');
const body=start<0?-1:html.indexOf('>',start);
const end=body<0?-1:html.indexOf('</pre>',body);
const raw=body>=0&&end>=0?html.slice(body+1,end):null;
if(!raw){console.error('F5.16 report absent:',mode);process.exit(1)}
const decode=raw.replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>');
let report;try{report=JSON.parse(decode)}catch(error){console.error('Invalid report:',decode.slice(0,500),error);process.exit(1)}
console.log('F5.16',mode,JSON.stringify(report));
if(!report.ok||report.checks?.length!==33)process.exit(1);
NODE
 echo "F5.16 actual timeline PASS ($mode) 33/33"
done
