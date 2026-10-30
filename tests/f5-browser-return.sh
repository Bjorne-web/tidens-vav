#!/usr/bin/env bash
set -euo pipefail
CHROME="$(command -v google-chrome || command -v chromium || command -v chromium-browser || true)"
test -n "$CHROME" || { echo 'Chromium unavailable'; exit 1; }
mkdir -p out/f5/results
node tests/f5-generate-browser-harness.cjs
for scenario in timeline map explore compare research mobile back; do
  url="file://$PWD/out/f5/f5-browser-return.html?scenario=$scenario&autotest=1"
  "$CHROME" --headless --no-sandbox --disable-dev-shm-usage --disable-gpu --no-first-run --virtual-time-budget=2900 --window-size=1200,800 --dump-dom "$url" >"out/f5/results/$scenario.html" 2>"out/f5/results/$scenario.log"
  if ! grep -q 'data-f5-result="PASS"' "out/f5/results/$scenario.html"; then
    echo "F5 browser test FAIL: $scenario"
    tail -c 3000 "out/f5/results/$scenario.html"
    tail -c 800 "out/f5/results/$scenario.log"
    exit 1
  fi
  grep -q 'data-f5-scenario="'$scenario'"' "out/f5/results/$scenario.html"
  echo "F5.3 Chromium open/read/return: PASS ($scenario)"
done
# The DOM dump reprints the complete research article and test code; do not
# ship redundant test HTML copies in the user's review artifact.
rm -f out/f5/results/*.html
echo "F5.3: 7 browser scenarios complete; return preview retained."
