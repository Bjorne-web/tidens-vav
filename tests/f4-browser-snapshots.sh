#!/usr/bin/env bash
set -euo pipefail
CHROME="$(command -v google-chrome || command -v chromium || command -v chromium-browser || true)"
if [[ -z "$CHROME" ]]; then echo "Chrome/Chromium not available for F4 visual check"; exit 1; fi
mkdir -p out/f4/screenshots
node <<'NODE'
const fs=require('fs');
const p='out/f4/full-research-review.html';
const source=fs.readFileSync(p,'utf8');
if(!source.includes('</body>'))throw Error('F4 review HTML incomplete');
const diagnostic='<script>document.documentElement.dataset.f4Overflow = document.documentElement.scrollWidth > document.documentElement.clientWidth ? "yes" : "no";</script>';
fs.writeFileSync('out/f4/snapshot-test.html',source.replace('</body>',diagnostic+'</body>'));
NODE
check(){
  local id="$1" label="$2" w="$3" h="$4" encoded uri
  encoded="$(node -e 'process.stdout.write(encodeURIComponent(process.argv[1]))' "$id")"
  uri="file://$PWD/out/f4/snapshot-test.html?record=$encoded"
  "$CHROME" --headless --no-sandbox --disable-dev-shm-usage --disable-gpu --hide-scrollbars --no-first-run --virtual-time-budget=1600 --window-size="$w,$h" \
    --screenshot="$PWD/out/f4/screenshots/$label.png" "$uri" >/dev/null 2>&1
  "$CHROME" --headless --no-sandbox --disable-dev-shm-usage --disable-gpu --no-first-run --virtual-time-budget=1600 --window-size="$w,$h" \
    --dump-dom "$uri" > "out/f4/screenshots/$label-dom.html" 2>/dev/null
  grep -q 'data-f4-overflow="no"' "out/f4/screenshots/$label-dom.html" || { echo "Horizontal overflow found: $label"; exit 1; }
  grep -Fq "data-panel=\"$id\"" "out/f4/screenshots/$label-dom.html" || { echo "Selected record missing: $label"; exit 1; }
  test -s "out/f4/screenshots/$label.png" || { echo "Screenshot missing: $label"; exit 1; }
  echo "F4 browser visual check PASS: $label ($w x $h)"
}
check H045 historical-desktop 1440 1000
check B001 genesis-mobile 390 844
check D001 tobit-mobile 390 844
check O067 gilgamesh-desktop 1440 1000
check topic:good goodness-mobile 390 844
check source:https://www.metmuseum.org/art/collection/search/544696 amarna-source-desktop 1440 1000

check_catalog(){
  local label="$1" w="$2" h="$3" uri
  uri="file://$PWD/out/f4/snapshot-test.html"
  "$CHROME" --headless --no-sandbox --disable-dev-shm-usage --disable-gpu --hide-scrollbars --no-first-run --virtual-time-budget=1800 --window-size="$w,$h" \
    --screenshot="$PWD/out/f4/screenshots/$label.png" "$uri" >/dev/null 2>&1
  "$CHROME" --headless --no-sandbox --disable-dev-shm-usage --disable-gpu --no-first-run --virtual-time-budget=1800 --window-size="$w,$h" \
    --dump-dom "$uri" > "out/f4/screenshots/$label-dom.html" 2>/dev/null
  grep -q 'data-f4-overflow="no"' "out/f4/screenshots/$label-dom.html" || { echo "Catalog horizontal overflow: $label"; exit 1; }
  grep -q 'class="f4-approved-hero"' "out/f4/screenshots/$label-dom.html" || { echo "Approved hero missing: $label"; exit 1; }
  grep -q 'f4-area-chip f4-area-bible' "out/f4/screenshots/$label-dom.html" || { echo "Approved area icons missing: $label"; exit 1; }
  test -s "out/f4/screenshots/$label.png" || { echo "Catalog screenshot missing: $label"; exit 1; }
  echo "F4 original-design catalog PASS: $label ($w x $h)"
}
check_catalog catalog-approved-desktop 1440 1000
check_catalog catalog-approved-mobile 390 844
