# B3.4 – Integrerad slutkontroll av huvudvyer (21 oktober 2026)

## Utgångsläge
Designen för Hem och Tidslinje är godkänd referens. Karta (PR #353), Temaspår (PR #359), Jämför (PR #363) och Om (PR #368) är visuellt godkända av beställaren och sammanfogade med main. Original-ID, källprövning och C7-innehåll ägs fortsatt av C7.

## Samlad automatisk kontroll
Den nya `b34-integrated-views-regression.yml` samkör 11 befintliga testskript: 5 för navigering/postöverföring, 4 för designkontrakt och 2 för webbplatsens statiska tillgångar och HTTP-hämtning. Testerna ska vara gröna i en PR från aktuell main; ingen appkod ändras av denna grind.

## Vad testerna INTE bevisar
De simulerar inte en komplett faktisk användarsession i webbläsaren. De kan inte ensamma verifiera filter- och tidsintervall under alla övergångar, återgång efter flera vybyten, läsfönstrets bevarande, tangentbordsåtkomst, mobilbredd eller slutlig Cloudflare-produktion.

## Manuell slutacceptans – utför i faktisk Cloudflare Preview
1. Hem → Tidslinje → Karta → Temaspår → Jämför → Om → Tidslinje. Varje vy visar den godkända grafiska strukturen.
2. Välj en existerande post med original-ID i Tidslinjen. Besök Karta, Temaspår och Jämför. Kontrollera att samma post väljs när den är relevant och att inga godtyckliga ersättningsposter visas.
3. Välj två verkliga jämförelseposter. Växla mellan Jämför och Tidslinje och kontrollera jämförelseurval och möjligheten att återgå. Testa även ogiltigt/ej valt fokusobjekt.
4. Ändra kategori och tidsintervall. Verifiera förväntat genomslag respektive bibehållna värden vid vybyte; kontrollera att tidsbegrepp inte sammanblandas.
5. Kontrollera filterpanelens plats och huvudytans bredd för Jämför och Om, även vid smal skärm. Testa läsfönster, länkar och tangentbordsnavigation.
6. Kontrollera att befintliga historiska poster, källor, dateringsreservationer och C7-granskningsstatus inte förändrats av designetappen.
7. Verifiera slutligen produktionsdriftsättning på Cloudflare efter godkänd integrering.

## Beslutsgrind
Automatiska tester och manuell acceptans dokumenteras separat. Ingen formell slutstängning av B3.4 innan dessa sju steg är verifierade eller avvikelser uttryckligen accepterade av beställaren. Denna PR ändrar varken forskning, datamodell, navigation eller layout.
