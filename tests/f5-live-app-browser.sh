#!/usr/bin/env bash
set -euo pipefail
CHROME="$(command -v google-chrome || command -v chromium || command -v chromium-browser || true)"
test -n "$CHROME" || { echo 'Chromium unavailable'; exit 1; }
mkdir -p out/f5/live
node tests/f5-generate-live-app-copy.cjs
python3 -m http.server 8765 --bind 127.0.0.1 >out/f5/live/http-server.log 2>&1 &
SERVER=$!
trap 'kill "$SERVER" 2>/dev/null || true; rm -f f5-live-test.html' EXIT
for n in $(seq 1 25); do
 if curl -fsS 'http://127.0.0.1:8765/f5-live-test.html' -o /dev/null; then break; fi
 sleep 0.2
done
"$CHROME" --headless --no-sandbox --disable-dev-shm-usage --disable-gpu --no-first-run \
 --virtual-time-budget=8500 --window-size=1450,1000 --dump-dom \
 'http://127.0.0.1:8765/f5-live-test.html' > out/f5/live/full-app-dom.html 2>out/f5/live/chrome.log
node - <<'NODE'
const fs=require('node:fs');
const content=fs.readFileSync('out/f5/live/full-app-dom.html','utf8');
const found=content.match(/<pre id="f5LiveReport"[^>]*>([\s\S]*?)<\/pre>/);
if(!found)throw new Error('F5 live app probe did not finish; inspect app startup errors');
const decode=s=>s.replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>');
const report=JSON.parse(decode(found[1]));
fs.writeFileSync('out/f5/live/live-app-inventory.json',JSON.stringify(report,null,2)+'\n');
const expected=['actual C1 snapshot','actual v897 has H045','actual v898 quick reader',
 'real timeline tab','real map tab','real explore tab','real compare tab',
 'real research tab','real H045 quick reader open/close',
 'real book reader B001','real book reader D001'];
const names=report.checks.map(c=>c.name);
for(const name of expected)if(!names.includes(name))throw new Error('F5.4 missing test: '+name);
for(const c of report.checks)console.log((c.ok?'PASS':'FAIL')+' F5.4 '+c.name+' '+c.detail);
console.log('F5.4 documented gaps:',report.blockers.length,
 'unhandled errors:',report.runtimeErrors.length,'failed checks:',report.failed.length);
if(report.failed.length)process.exitCode=1;
NODE
# The complete document snapshot can contain repeated private/offline source data.
# Retain only the concise test report, not the entire application DOM.
rm -f out/f5/live/full-app-dom.html
