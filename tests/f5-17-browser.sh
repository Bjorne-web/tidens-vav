#!/usr/bin/env bash
set -euo pipefail
CHROME="$(command -v google-chrome || command -v chromium || command -v chromium-browser || true)"
test -n "$CHROME" || { echo 'Chromium required'; exit 1; }
node tests/f5-17-generate-staging.cjs
python3 -m http.server 8797 --bind 127.0.0.1 >out/f5-17/http.log 2>&1 &
SERVER=$!
trap 'kill "$SERVER" 2>/dev/null || true; rm -f f5-17-staging-test.html f5-15-staging-test.html f5-10-staging-test.html f5-9-staging-test.html f5-real-reader-test.html' EXIT
for i in $(seq 1 50); do
 if curl -fsS http://127.0.0.1:8797/f5-17-staging-test.html -o /dev/null 2>/dev/null; then break; fi
 sleep .2
done
for mode in desktop mobile; do
 if [[ "$mode" == mobile ]]; then size="390,844"; else size="1450,1000"; fi
 for scenario in stable-map immediate-map camera-drift navigation-drift; do
  "$CHROME" --headless --no-sandbox --disable-dev-shm-usage --disable-gpu --no-first-run --window-size="$size" --virtual-time-budget=18000 --dump-dom "http://127.0.0.1:8797/f5-17-staging-test.html?f517=$scenario&mode=$mode" >"out/f5-17/$mode-$scenario.html" 2>"out/f5-17/$mode-$scenario-chrome.log"
  node - "$mode" "$scenario" <<'NODE'
const fs=require('node:fs'),mode=process.argv[2],scenario=process.argv[3];
const html=fs.readFileSync('out/f5-17/'+mode+'-'+scenario+'.html','utf8');
const start=html.indexOf('<pre id="f517Report"'),body=start<0?-1:html.indexOf('>',start),end=body<0?-1:html.indexOf('</pre>',body);
if(body<0||end<0){console.error('F5.17 missing report',mode,scenario);process.exit(1)}
const raw=html.slice(body+1,end).replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>');
const x=JSON.parse(raw);
console.log('F5.17',mode,scenario,JSON.stringify(x).slice(0,1500));
if(!x.ok)process.exit(1);
NODE
 done
done
