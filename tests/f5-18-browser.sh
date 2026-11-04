#!/usr/bin/env bash
set -euo pipefail
CHROME="$(command -v google-chrome || command -v chromium || command -v chromium-browser || true)"
test -n "$CHROME" || { echo 'Chromium required'; exit 1; }
node tests/f5-18-generate-staging.cjs
python3 -m http.server 8798 --bind 127.0.0.1 >out/f5-18/http.log 2>&1 &
SERVER=$!
trap 'kill "$SERVER" 2>/dev/null || true; rm -f f5-18-staging-test.html f5-17-staging-test.html f5-15-staging-test.html f5-10-staging-test.html f5-9-staging-test.html f5-real-reader-test.html' EXIT
for i in $(seq 1 50); do
 if curl -fsS http://127.0.0.1:8798/f5-18-staging-test.html -o /dev/null 2>/dev/null; then break; fi
 sleep .2
done
for mode in desktop mobile; do
 if [[ "$mode" == mobile ]]; then size="390,844"; else size="1450,1000"; fi
 for scenario in stable-map immediate-map camera-drift navigation-drift cancel-pending; do
  "$CHROME" --headless --no-sandbox --disable-dev-shm-usage --disable-gpu --no-first-run --window-size="$size" --virtual-time-budget=22000 --dump-dom "http://127.0.0.1:8798/f5-18-staging-test.html?f518=$scenario&mode=$mode" >"out/f5-18/$mode-$scenario.html" 2>"out/f5-18/$mode-$scenario-chrome.log"
  node - "$mode" "$scenario" <<'NODE'
const fs=require('node:fs'),mode=process.argv[2],scenario=process.argv[3];
const html=fs.readFileSync('out/f5-18/'+mode+'-'+scenario+'.html','utf8');
const i=html.indexOf('<pre id="f518Report"'),b=i<0?-1:html.indexOf('>',i),e=b<0?-1:html.indexOf('</pre>',b);
if(b<0||e<0){console.error('F5.18 report missing',mode,scenario);process.exit(1)}
const raw=html.slice(b+1,e).replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>');
const r=JSON.parse(raw);console.log('F5.18',mode,scenario,JSON.stringify(r).slice(0,1400));
if(!r.ok)process.exit(1);
NODE
 done
done
