#!/usr/bin/env bash
set -euo pipefail
CHROME="$(command -v google-chrome || command -v chromium || command -v chromium-browser || true)"
test -n "$CHROME" || { echo 'Chromium required'; exit 1; }
node tests/f5-15-generate-staging.cjs
python3 -m http.server 8795 --bind 127.0.0.1 >out/f5-15/http.log 2>&1 &
SERVER=$!
trap 'kill "$SERVER" 2>/dev/null || true; rm -f f5-15-staging-test.html f5-10-staging-test.html f5-9-staging-test.html f5-real-reader-test.html' EXIT
for i in $(seq 1 50); do
 if curl -fsS 'http://127.0.0.1:8795/f5-15-staging-test.html' -o /dev/null 2>/dev/null; then break; fi
 sleep .2
done
for mode in desktop mobile; do
 if [[ "$mode" == mobile ]]; then size="390,844"; else size="1450,1000"; fi
 "$CHROME" --headless --no-sandbox --disable-dev-shm-usage --disable-gpu --no-first-run --window-size="$size" --virtual-time-budget=65000 --dump-dom "http://127.0.0.1:8795/f5-15-staging-test.html?f515=$mode" >"out/f5-15/$mode-dom.html" 2>"out/f5-15/$mode-chrome.log"
 if ! grep -q 'data-status="PASS"' "out/f5-15/$mode-dom.html"; then
  echo "F5.15 real app C7 staging FAIL ($mode)"
  grep 'id="f515Report"' "out/f5-15/$mode-dom.html" | tail -c 4000 || true
  exit 1
 fi
 echo "F5.15 real app C7 staging PASS ($mode) 33 articles"
done
