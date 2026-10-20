# Pilot för dateringsgranskning – O119–O122

Den antagna metoden i `docs/c7-dateringsgranskning-metod-v1.md` konkretiseras i maskinläsbara `data/c7-dateringspilot-o119-o122.v1.json`. Detta är **inventerings- och forskningsunderlag**, inte en synlig tidsaxeländring.

## Delresultat
- **Job (O119)**: ramberättelse och poetiska delar kan ha olika litterära tillkomsthistorier. Inget säkert datum för den berättade personen och ännu inget A/B-belagt intervall för textfasen.
- **Psaltaren (O120)**: flera samlings- och redaktionsfaser. Väl dokumenterade psalmhandskrifter från den senare andra tempelperioden, men inte samma sak som datum för enskilda psalmers ursprung. Peter W. Flints forskningsöversikt visar särskilt mångfalden av handskrifter och möjliga utgåvor; David Willgren Davage problematiserar föreställningen om en fixerad ordning. Nästa steg är **handskriftsspecifika katalogdateringar**. Inga generella exakttider konstrueras.
- **Ordspråksboken (O121)**: samlingshistoria och tydliga paralleller med egyptiska Amenemope; Michael V. Fox analyserar möjlig litterär beroenderelation. Välbelagd parallell är **inte** liktydig med belagd redaktionsdatering.
- **Jona (O122)**: ett brett möjligt litterärt tillkomstintervall 500–200 f.Kr. förekommer i forskningsdiskussionen, men är här märkt **C** och `display:false`. Profeten i 2 Kung 14 och den bevarade Jonaberättelsens skrivtid skiljs åt.

## Princip för nästa kodsteg
Daterade kort kan aktiveras först där en särskilt prövad fas har tillräcklig evidens, preciserad tidstyp och hänvisningsbara dateringsgrunder. Handskriftens tid, textens tid och berättad händelsetid får inte ha en gemensam flagga. Lägg ut tydlig `type` och `confidence` i UI och skriv en ny webbläsarregression. Ändra aldrig `originalEvents` importerade årtal som källarkiv.

## Beslut för detta steg
Denna PR behöver godkännas som **forskningsinventering**. Inga dateringar i Temaspår ändras av denna PR. Nästa särskilda tekniska PR får endast aktivera verifierade handskrifts-/redaktionsfaser och kräver nytt användartest.
