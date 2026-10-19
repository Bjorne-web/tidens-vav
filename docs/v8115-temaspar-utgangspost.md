# Temaspår – säkerställ vald utgångspost (V8.115)

**Bakgrund:** H045 – Ahab/Qarqar visades som tidsplacerad utgångspost eftersom dateringen ingår bland särskilt bedömda tidslägen. Originalposter som O067–O071 har däremot ännu inte separat källgranskade datum. När användaren bytte utgångspost i Temaspårs väljare uppdaterades inte den egna undersökningens grafiska vy för H/O-poster förrän en annan åtgärd utlöste en omritning.

**Rättning:**
1. Postbyte i Temaspårs väljare ritar nu om vyn även för H- och O-poster, så att vald ID/titel visas omedelbart.
2. Post utan separat bedömt datum visas som tydligt markerad utgångspost med läsknapp, men **utan falsk tidsmarkör**.
3. Ingen ändring av originaldateringar eller C6/C7-granskningsstatus, av huvudtidslinjens layout eller av befintliga källor.
4. Nytt Chromium-test i dator- och mobilbredd: H045 tidsplacerad, O067 tydligt identifierad utan tidspinne, B039 tidsplacerad och vald som nytt fokus.

**Manuellt test:** Öppna Temaspår, välj H045, byt i samma väljare till O067 och B039 och kontrollera att utgångsposten följer valet utan sidomladdning. Testa läsknappen för O067 och kategoriurvalet. Källvärdering och oberoende datering ska fortsatt behandlas i C6.

**Publicering:** separat godkännande och grönt browser-test krävs.
