# F5.21 – aktivering av separat Cloudflare-granskning

**Status 2026-11-04:** F5.20-paketet är genererat och Chromium-smoketestat; GitHub Actions saknade både `CLOUDFLARE_ACCOUNT_ID` och `CLOUDFLARE_API_TOKEN` i första F5.21-körningen. Ingen stagingdeployment har skett.

## Separat projekt – INTE befintlig produktion

1. Skapa ett **nytt** Cloudflare Pages-projekt med exakt namnet `tidens-vav-f5-review` i det avsedda kontot. Välj en separat projektidentitet och verifiera att det **inte** är det publicerade Tidens väv-projektet.
2. Skapa en Cloudflare API-token med minsta möjliga behörighet för Pages-skrivning i det aktuella kontot. Använd inte en global API-nyckel och dela aldrig token i chatt, PR eller kod.
3. Under GitHub-repot **Settings → Secrets and variables → Actions**: lägg till två *repository secrets* med namnen `CLOUDFLARE_ACCOUNT_ID` och `CLOUDFLARE_API_TOKEN`. Lägg inte in värdena i en textfil, en Issue eller commit.
4. Lägg även till *repository variable* `F5_REVIEW_DEPLOY_ENABLED=true` **enbart när du uttryckligen vill publicera till det nya granskningsprojektet**. Utan denna variabel byggs paketet men publiceringssteget är spärrat för PR-körningar.
5. Kör om PR #393:s checks genom en ny testcommit eller GitHubs tillgängliga re-run-gränssnitt, och kontrollera Actions-loggen. En publicering ska visa en verklig preview-URL från Wrangler. **Gissa aldrig URL.**
6. Om förhandsvisningen ska vara privat: konfigurera Cloudflare Access för stagingdomänen, kontrollera behörighet från en icke-inloggad webbläsare och dela först därefter granskningslänken.
7. Sätt `F5_REVIEW_DEPLOY_ENABLED=false` efter den avsedda körningen för att förhindra oavsiktliga PR-redeployments.

## Säkerhetsregler

- Workflow deployar **endast** om det skilda Pages-projektet `tidens-vav-f5-review` redan finns, Cloudflare API bekräftar exakt samma namn och projektet kan nås.
- En PR-körning får deploya endast från den specifika grenen `f5-21-cloudflare-isolated-preview-20261104`, när variabeln är `true` och kontouppgifterna är giltiga. `workflow_dispatch` kräver att workflow-filen finns på GitHubs default branch; det gäller inte denna ännu omergade PR.
- Stagingkopian har 33 C7-dateringsförklaringar och ett särskilt granskningsreglage. **Den är inte en färdig vetenskapligt kvalitetssäkrad publiceringsversion.**
- Inga commits i `main`, ingen merge av F5-utkast, ingen ändring av det befintliga Pages-projektet och ingen start av F6 ingår.
- Verifiera slutligen faktiskt fungerande URL, grafik, läsfönster, karta och återgång manuellt innan ett produktionsbeslut.
