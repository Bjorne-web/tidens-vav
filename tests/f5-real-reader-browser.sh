#!/usr/bin/env bash
set -euo pipefail
CHROME="$(command -v google-chrome || command -v chromium || command -v chromium-browser || true)"
test -n "$CHROME" || { echo "Chromium unavailable"; exit 1; }
mkdir -p out/f5/integration/results
node tests/f5-generate-real-reader-copy.cjs
python3 -m http.server 8766 --bind 127.0.0.1 >out/f5/integration/server.log 2>&1 &
SERVER=$!
trap 'kill "$SERVER" 2>/dev/null || true; rm -f f5-real-reader-test.html' EXIT
for i in $(seq 1 35); do
  if curl -fsS 'http://127.0.0.1:8766/f5-real-reader-test.html' -o /dev/null 2>/dev/null; then break; fi
  sleep 0.2
done
for scenario in timeline map explore compare research mobile back bible apocrypha gilgamesh topic source invalid double tab interrupted deeplink; do
  if [[ "$scenario" == "mobile" ]]; then resolution="390,844"; else resolution="1450,1000"; fi
  url="http://127.0.0.1:8766/f5-real-reader-test.html?scenario=$scenario&autotest=1"
  "$CHROME" --headless --no-sandbox --disable-dev-shm-usage --disable-gpu --no-first-run \
    --virtual-time-budget=7500 --window-size="$resolution" --dump-dom "$url" \
    >"out/f5/integration/results/$scenario-dom.html" \
    2>"out/f5/integration/results/$scenario-chrome.log"
  expected="PASS"
  if [[ "$scenario" == "interrupted" ]]; then expected="BLOCKED"; fi
  if ! grep -q "data-f5-real-result=\"$expected\"" "out/f5/integration/results/$scenario-dom.html"; then
    echo "F5.5 real app overlay: FAILED scenario $scenario"
    grep -o 'data-f5-real-result="[^"]*"' "out/f5/integration/results/$scenario-dom.html" || true
    grep -A 25 'id="f5RealLog"' "out/f5/integration/results/$scenario-dom.html" | head -30 || true
    tail -c 700 "out/f5/integration/results/$scenario-chrome.log" || true
    exit 1
  fi
  if [[ "$scenario" == "interrupted" ]]; then
    echo "F5.6 unsafe background navigation: correctly BLOCKED ($scenario)"
  else
    echo "F5.6 real app + F4 overlay: PASS ($scenario)"
  fi
done
node - <<'NODE'
const fs=require('node:fs');
const scenarios=['timeline','map','explore','compare','research','mobile','back','bible','apocrypha','gilgamesh','topic','source','invalid','double','tab','interrupted','deeplink'];
const report={type:'F5.5 test-only actual app + F4 overlay',scenarios:[],productionModified:false};
for(const scenario of scenarios){
 const html=fs.readFileSync('out/f5/integration/results/'+scenario+'-dom.html','utf8');
 const m=html.match(/<pre id="f5RealLog"[^>]*>([\s\S]*?)<\/pre>/);
 if(!m)throw new Error('Missing log for '+scenario);
 const decode=s=>s.replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>');
 const data=JSON.parse(decode(m[1]));
 if(scenario==='interrupted'){
  if(!data.issues.some(x=>x.includes('Unsafe return: app-navigation-changed'))||
     !data.events.some(x=>x.includes('blocked app-navigation-changed')))
   throw new Error('Concurrent navigation was not safely detected '+JSON.stringify(data));
  report.scenarios.push({scenario,success:true,expectedOutcome:'BLOCKED',events:data.events});
 }else{
  if(data.issues.length)throw new Error('Return mismatch '+scenario+': '+JSON.stringify(data.issues));
  report.scenarios.push({scenario,success:true,expectedOutcome:'PASS',events:data.events});
 }
}
fs.writeFileSync('out/f5/integration/results/return-audit.json',JSON.stringify(report,null,2)+'\n');
console.log('F5.6: 16 positive real-app scenarios and 1 expected blocked concurrent-navigation case; audit recorded.');
NODE
# Retain the succinct audit rather than 9 repeated complete application DOM dumps.
rm -f out/f5/integration/results/*-dom.html
