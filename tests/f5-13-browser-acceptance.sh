#!/usr/bin/env bash
set -euo pipefail
CHROME="$(command -v google-chrome || command -v chromium || command -v chromium-browser || true)"
test -n "$CHROME" || { echo 'Chromium required'; exit 1; }
node tests/f5-13-generate-preview.cjs
node tests/f5-13-inject-browser-probe.cjs
for mode in desktop mobile; do
 if [[ "$mode" == mobile ]]; then size="390,844"; else size="1450,1000"; fi
 "$CHROME" --headless --no-sandbox --disable-dev-shm-usage --disable-gpu --no-first-run --window-size="$size" --virtual-time-budget=10000 --dump-dom "file://$PWD/out/f5-13/browser-probe.html?probe=$mode" >"out/f5-13/$mode-dom.html" 2>"out/f5-13/$mode-chrome.log"
 if ! grep -q 'data-status="PASS"' "out/f5-13/$mode-dom.html"; then
  echo "F5.13 browser acceptance FAIL: $mode"; grep 'id="f513Report"' "out/f5-13/$mode-dom.html" || true; exit 1
 fi
 echo "F5.13 browser acceptance PASS ($mode)"
done
