#!/usr/bin/env bash
set -euo pipefail
CHROME="$(command -v google-chrome || command -v chromium || command -v chromium-browser || true)"
test -n "$CHROME" || { echo 'Chromium unavailable'; exit 1; }
mkdir -p out/f5-9
node tests/f5-9-generate-staging-copy.cjs
python3 -m http.server 8771 --bind 127.0.0.1 >out/f5-9/http-server.log 2>&1 &
SERVER=$!
trap 'kill "$SERVER" 2>/dev/null || true; rm -f f5-9-staging-test.html f5-real-reader-test.html' EXIT
for i in $(seq 1 30); do
 if curl -fsS 'http://127.0.0.1:8771/f5-9-staging-test.html' -o /dev/null 2>/dev/null; then break; fi
 sleep .2
done
for scenario in timeline map explore compare research mobile browser-back bible apocrypha gilgamesh topic source invalid nested conflict-nav conflict-popstate conflict-camera resume deeplink; do
  if [[ "$scenario" == "mobile" ]]; then size="390,844"; else size="1450,1000"; fi
  url="http://127.0.0.1:8771/f5-9-staging-test.html?scenario=$scenario&autotest=1"
  if [[ "$scenario" == "deeplink" ]]; then url+="&tv_id=H045&tv_view=research"; fi
  "$CHROME" --headless --no-sandbox --disable-dev-shm-usage --disable-gpu --no-first-run \
    --virtual-time-budget=12000 --window-size="$size" --dump-dom "$url" \
    >"out/f5-9/$scenario-dom.html" 2>"out/f5-9/$scenario-chrome.log"
  if ! grep -q 'data-f59-result="PASS"' "out/f5-9/$scenario-dom.html"; then
    echo "F5.9 staging FAIL: $scenario"
    grep -A 12 'id="f59Report"' "out/f5-9/$scenario-dom.html" | head -25 || true
    tail -c 1000 "out/f5-9/$scenario-chrome.log" || true
    exit 1
  fi
  echo "F5.9 real app + candidate reader: PASS ($scenario)"
done
node - <<'NODE'
const fs=require('node:fs');
const names='timeline map explore compare research mobile browser-back bible apocrypha gilgamesh topic source invalid nested conflict-nav conflict-popstate conflict-camera resume deeplink'.split(' ');
const data={kind:'F5.9 unpublished staging candidate',passed:[],conflictRecovery:[],productionModified:false};
for(const scenario of names){
 const html=fs.readFileSync('out/f5-9/'+scenario+'-dom.html','utf8');
 const raw=html.match(/<pre id="f59Report"[^>]*>([\s\S]*?)<\/pre>/);
 if(!raw)throw Error('Scenario report absent: '+scenario);
 const s=raw[1].replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>');
 const x=JSON.parse(s);if(!x.ok)throw Error('Scenario failed: '+scenario);
 data.passed.push(scenario);
 if(scenario.startsWith('conflict')||scenario==='resume')data.conflictRecovery.push({scenario,events:x.events,audit:x.audit});
}
fs.writeFileSync('out/f5-9/staging-audit.json',JSON.stringify(data,null,2)+'\n');
console.log('F5.9 passed '+data.passed.length+'/'+names.length+' Chromium real-app staging scenarios.');
NODE
rm -f out/f5-9/*-dom.html
