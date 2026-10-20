# B2.3 – Skrivskyddad klassificeringspilot

**Status:** test-PR, inte publicerad. Ansluts **inte** till `index.html`, `app.js` eller huvuddata. Ingen påverkan på befintligt gränssnitt.

`v915-category-read-model.js` är en separat adapter: `TidensCategoryReadModel.get(post)`. Adaptern returnerar frysta kopior med ID, oförändrad råkategori, primärområde, relaterade områden, innehållstyper, tidstyper och explicit okänd forskningsstatus.

Endast fyra manuellt prövade **illustrativa** pilotposter B001, H045, O067, O123 har föreslagna klassificeringar. Dessa är inte slutligt beslutade och märks `pilot-proposal`. Alla övriga poster får `primaryArea: unclassified` och förblir sökbara i det befintliga systemet eftersom UI inte ändras.

Avsiktligt sätts `researchStatus: unknown` även för pilotposter – C6/C7-status får inte gissas ur befintlig kategori, `reviewed` eller textens innehåll.

Test: `node tests/category-read-model.test.cjs` bekräftar samma ID, kategori, frysta utdata, osäkra klassificeringar och noll mutation av gamla poster.

**Nästa:** granska klassificeringarna och bestäm hur explicita forskningsstatusregister och äldre berättelser ska kopplas in; därefter större täckningspilot för B2.3, före B2.4.
