#!/usr/bin/env bash
set -euo pipefail
CHROME="$(command -v google-chrome || command -v chromium || command -v chromium-browser || true)"
test -n "$CHROME" || { echo 'Chromium required'; exit 1; }
mkdir -p out/f5-10
node tests/f5-10-generate-staging-copy.cjs
python3 -m http.server 8772 --bind 127.0.0.1 >out/f5-10/http-server.log 2>&1 &
SERVER=$!
trap 'kill "$SERVER" 2>/dev/null || true; rm -f f5-10-staging-test.html f5-9-staging-test.html f5-real-reader-test.html' EXIT
for i in $(seq 1 35); do
 if curl -fsS 'http://127.0.0.1:8772/f5-10-staging-test.html' -o /dev/null 2>/dev/null; then break; fi
 sleep .2
done
for scenario in desktop mobile map; do
  if [[ "$scenario" == "mobile" ]]; then size="390,844"; else size="1450,1000"; fi
  url="http://127.0.0.1:8772/f5-10-staging-test.html?f510test=1&scenario=$scenario"
  "$CHROME" --headless --no-sandbox --disable-dev-shm-usage --disable-gpu --no-first-run \
    --virtual-time-budget=45000 --window-size="$size" --dump-dom "$url" \
    >"out/f5-10/$scenario-dom.html" 2>"out/f5-10/$scenario-chrome.log"
  if ! grep -q 'data-f510-result="PASS"' "out/f5-10/$scenario-dom.html"; then
    echo "F5.10 broad real app catalog FAIL: $scenario"
    grep -A 12 'id="f510Report"' "out/f5-10/$scenario-dom.html" | head -30 || true
    tail -c 1500 "out/f5-10/$scenario-chrome.log" || true
    exit 1
  fi
  echo "F5.10 expanded real corpus: PASS ($scenario)"
done
node - <<'NODE'
const fs=require('node:fs');
const report={kind:'F5.10 actual-app extended corpus browser acceptance',scenarios:[]};
const decode=s=>s.replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>');
for(const scenario of ['desktop','mobile','map']){
 const html=fs.readFileSync('out/f5-10/'+scenario+'-dom.html','utf8');
 const m=html.match(/<pre id="f510Report"[^>]*>([\s\S]*?)<\/pre>/);
 if(!m)throw new Error('Missing report '+scenario);
 const x=JSON.parse(decode(m[1]));
 if(!x.ok||!x.originalUnchanged||x.missingCamera>0)throw new Error('F5.10 failed verification: '+JSON.stringify(x));
 report.scenarios.push(x);
}
report.totalOpenAndReturn=report.scenarios.reduce((sum,s)=>sum+s.passed,0);
fs.writeFileSync('out/f5-10/wide-browser-audit.json',JSON.stringify(report,null,2)+'\n');
console.log('F5.10 total actual browser open/return checks:',report.totalOpenAndReturn);
NODE
rm -f out/f5-10/*-dom.html
