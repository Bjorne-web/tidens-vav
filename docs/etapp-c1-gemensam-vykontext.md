# Etapp C1 – Gemensam vykontext (test)

## Syfte
En enda **skrivskyddad** adapter för intern aktiv vy, synlig sektion, vald forskningspost, tidsintervall, kategorifilter, evidensfilter och poster i Jämför.
Använder gamla lexicala `state` och `compareIds` genom säkra avläsningar när `snapshot()` kallas. Bygger **inte** en andra uppsättning state.

## API
`window.TidensViewContextC1.snapshot()` returnerar fryst ögonblicksbild.
`window.TidensViewContextC1.diagnose()` returnerar samma bild och enkla varningar.

## Test
Öppna förhandsversionen med `?contextdebug=1`.
I Tidslinje: välj H045. Tryck *Uppdatera status* och kontrollera `selectedId: "H045"`.
Gå till Karta, Temaspår och Jämför, kontrollera den synliga sektionen och valt post-ID.
Lägg till en post i Jämför och kontrollera compareIds.
Ändra tidsintervall i Tidslinjen och bekräfta ändrade min/max.
Prova också vanliga URL utan `contextdebug`: ingen synlig ändring alls.

## Avsiktliga begränsningar
- C1 ändrar **inte** navigation, urval, URL eller data.
- C1 implementerar inte bakåtknapp/djuplänkar; det ingår i senare C2.
- Legacy-vyer kan ge mismatch mellan internt `view` och visad sektion; detta rapporteras och döljs inte.
- PR #150 lämnas pausad och orörd.
