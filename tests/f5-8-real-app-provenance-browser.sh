#!/usr/bin/env bash
set -euo pipefail
CHROME="$(command -v google-chrome || command -v chromium || command -v chromium-browser || true)"
test -n "$CHROME" || { echo 'Chromium required'; exit 1; }
mkdir -p out/f5/candidate
node tests/f5-8-generate-provenance-candidate.cjs
node tests/f5-generate-live-app-copy.cjs
node - <<'NODE'
const fs=require('node:fs'),assert=require('node:assert/strict');
const h=fs.readFileSync('f5-live-test.html','utf8');
const original='<script src="v897-research-read-model.js"></script>';
assert.equal(h.split(original).length,2,'Live v897 script order changed; abort!');
let withCandidate=h.replace(original,'<script src="out/f5/candidate/v897-provenance-candidate.js"></script>');
withCandidate=withCandidate.replace('</body></html>',
  '<script src="tests/f5-8-provenance-browser.js"></script></body></html>');
fs.writeFileSync('f5-8-provenance-test.html',withCandidate);
console.log('F5.8 test-only substitution in local HTML; main index unchanged.');
NODE
python3 -m http.server 8767 --bind 127.0.0.1 >out/f5/candidate/http-server.log 2>&1 &
SERVER=$!
trap 'kill "$SERVER" 2>/dev/null || true; rm -f f5-8-provenance-test.html f5-live-test.html' EXIT
for i in $(seq 1 30); do
 if curl -fsS 'http://127.0.0.1:8767/f5-8-provenance-test.html' -o /dev/null 2>/dev/null; then break; fi
 sleep 0.2
done
"$CHROME" --headless --no-sandbox --disable-dev-shm-usage --disable-gpu --no-first-run   --virtual-time-budget=8000 --window-size=1450,1000 --dump-dom   'http://127.0.0.1:8767/f5-8-provenance-test.html'   >out/f5/candidate/real-app-provenance-dom.html 2>out/f5/candidate/chrome.log
node - <<'NODE'
const fs=require('node:fs');
const h=fs.readFileSync('out/f5/candidate/real-app-provenance-dom.html','utf8');
const m=h.match(/<pre id="f5ProvenanceReport"[^>]*>([\s\S]*?)<\/pre>/);
if(!m)throw new Error('Candidate provenance check did not run');
const decode=x=>x.replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>');
const report=JSON.parse(decode(m[1]));
fs.writeFileSync('out/f5/candidate/real-app-provenance-report.json',JSON.stringify(report,null,2)+'\n');
console.log('F5.8 fullapp candidate: '+(report.success?'PASS':'FAIL')+'; records with fields='+report.matchedRecords);
for(const c of report.checks)console.log(c.id+': '+(c.available?c.withOrigin+'/'+c.fields:'not in model')+' text fields traceable');
if(!report.success)process.exitCode=1;
NODE
rm -f out/f5/candidate/real-app-provenance-dom.html
