#!/usr/bin/env bash
set -euo pipefail
CHROME="$(command -v google-chrome || command -v chromium || command -v chromium-browser || true)"
test -n "$CHROME" || { echo 'Chromium required'; exit 1; }
node tests/f5-20-generate-package.cjs
test -f out/f5-20/site/review.html
test -f out/f5-20/site/review-controller.js
test -f out/f5-20/site/tests/f5-19-event-open.js
python3 -m http.server 8800 --directory out/f5-20/site --bind 127.0.0.1 >out/f5-20/http.log 2>&1 &
SERVER=$!
trap 'kill "$SERVER" 2>/dev/null || true' EXIT
for i in $(seq 1 60); do
 if curl -fsS 'http://127.0.0.1:8800/review.html' -o /dev/null 2>/dev/null; then break; fi
 sleep .2
done
for mode in desktop mobile; do
 if [[ "$mode" == mobile ]]; then size="390,844"; else size="1450,1000"; fi
 "$CHROME" --headless --no-sandbox --disable-dev-shm-usage --disable-gpu --no-first-run --window-size="$size" --virtual-time-budget=7000 --dump-dom "http://127.0.0.1:8800/review.html?f520smoke=1" >"out/f5-20/$mode-dom.html" 2>"out/f5-20/$mode-chrome.log"
 node - "$mode" <<'NODE'
const fs=require('node:fs'),mode=process.argv[2],s=fs.readFileSync('out/f5-20/'+mode+'-dom.html','utf8');
const i=s.indexOf('<pre id="f520Smoke"'),b=i<0?-1:s.indexOf('>',i),e=b<0?-1:s.indexOf('</pre>',b);
if(b<0||e<0){console.error('F5.20 review smoke missing',mode);process.exit(1)}
const x=s.slice(b+1,e).replace(/&quot;/g,'"').replace(/&amp;/g,'&');
console.log('F5.20 review smoke',mode,x);
const o=JSON.parse(x);
if(!o.ok||o.ids!==33)process.exit(1);
NODE
 "$CHROME" --headless --no-sandbox --disable-dev-shm-usage --disable-gpu --no-first-run --window-size="$size" --virtual-time-budget=3000 --screenshot="out/f5-20/$mode.png" "http://127.0.0.1:8800/review.html" > /dev/null 2>>"out/f5-20/$mode-chrome.log" || true
done
node tests/f5-12-undated-reader.test.cjs
node tests/f5-14-readiness.test.cjs
echo "F5.20 review package smoke complete; manual design and hardware acceptance remain"
