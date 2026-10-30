'use strict';
const assert=require('node:assert/strict');
const {buildFixtures}=require('./f4-reader-fixtures.cjs');
const {renderFullReader,renderReviewPage,esc}=require('./f4-reader-renderer.cjs');
const records=buildFixtures();
assert.equal(records.length,6);
assert.deepEqual(records.map(x=>x.entity.id),['H045','B001','D001','O067','topic:good','source:https://www.metmuseum.org/art/collection/search/544696']);
const html=renderReviewPage(records);
assert(html.startsWith('<!doctype html>')&&html.includes('lang="sv"'));
assert.equal((html.match(/class="panel"/g)||[]).length,6);
assert.equal((html.match(/class="reader"/g)||[]).length,6);
assert.equal((html.match(/class="back"/g)||[]).length,6);
assert.equal((html.match(/<main>/g)||[]).length,6);
assert.equal((html.match(/<nav class="desktop-toc" aria-label="Innehåll">/g)||[]).length,6);
assert.equal((html.match(/<details class="mobile-toc">/g)||[]).length,6);
assert.equal((html.match(/<nav aria-label="Innehåll på mobil">/g)||[]).length,6);
assert.equal((html.match(/<aside aria-label="Samband">/g)||[]).length,6);
assert(html.includes('Bevarat textvittne'),'O067 manuscript section missing');
assert(html.includes('Ursprungsdatering – tidsbegrepp oklart'),'Unclassified original timeline date missing');
assert(html.includes('Betydelse för Israels religion, judendomen och kristendomen'),'C7 significance must be retained');
assert(html.includes('Berättad tid (inte tillkomstdatum)'),'Narrated time must not be mistaken for composition');
assert(html.includes('Kanon och tradition'),'Apocryphal tradition must be visible');
assert(!renderFullReader(records[4]).includes('Tid och datering'),'Philosophical topic must not acquire a time section');
assert(!renderFullReader(records[5]).includes('Tid och datering'),'Undated source reference must not acquire a time section');
assert(renderFullReader(records[1]).includes('Textens tillkomst'),'Biblical composition time must remain visible');
assert(html.includes('Är Gud god?')&&html.includes('Tobit')&&html.includes('Ahab'));
assert(html.includes('noopener noreferrer'),'External references need safe tab links');
assert(!html.includes('href="javascript:'),'No executable source URLs');
for(const r of records)assert(renderFullReader(r).includes('data-record="'+esc(r.entity.id)+'"'));
const malicious={...records[0],entity:{...records[0].entity,title:'<script>alert("x")</script>'}};
const rendered=renderFullReader(malicious);
assert(!rendered.includes('<script>alert'),'Untrusted title must be escaped');
assert(rendered.includes('&lt;script&gt;'),'Unsafe tag must display as text');
assert.throws(()=>renderFullReader({}),/record/);
const source=records[5].entity;
assert.equal(source.data.independentlyVerified,false);
assert(!source.reviewStatus,'Do not invent research verification for museum link');
const d=records.find(x=>x.entity.id==='D001');
assert.equal(d.entity.reviewStatus,'preliminary');
const b=records.find(x=>x.entity.id==='B001');
assert.equal(b.entity.data.temporal.composition.selected.start,-650);
console.log('F4 isolated full reader: PASS – 6 real specimens, semantic sections, chronology, C7, source provenance, responsive HTML, XSS escaping');

const fs=require('node:fs');
const css=fs.readFileSync('prototypes/f4/reader-preview.css','utf8');
assert(css.includes('@media(max-width:680px)'));
assert(css.includes('.columns>.mobile-toc{display:block'),'Mobile nav must be displayed on narrow screens');
assert(css.includes('.columns>.desktop-toc{display:none'),'Desktop nav must be hidden on narrow screens');
assert(css.includes('[hidden]{display:none!important}'),'Nonselected reader panels must never occupy space');
assert(css.includes('prefers-reduced-motion'),'Respect reduced motion preferences');
assert(html.includes('Välj avsnitt'),'Mobile section selector missing');
assert(html.includes('data-record="source:https://www.metmuseum.org/art/collection/search/544696"'));
assert(html.includes('Källobjektets registrerade uppgifter'),'Source must show provenance, not just link');
assert(html.includes('Vetenskaplig granskning'),'Source verification must be stated');
assert(html.includes('Sammantagen forskningsstatus är inte angiven'),'Unstated status must be explicit');
assert(html.includes('record-heading'),'Article must supply focus target');
assert(html.includes("event.key==='Escape'"),'Standalone review must support Escape to return');
assert(html.includes("trigger||document.querySelector('.option')"),'Focus should return to source catalog card');
assert(html.includes("params.get('record')"),'Isolated preview may open a given specimen directly');
assert(html.includes('scrollY=window.scrollY'),'Local catalog scroll position must be restored');
console.log('F4.2 accessibility and responsive layout contracts: PASS');

const genesisHtml=renderFullReader(records[1]);
assert.equal((genesisHtml.match(/Flera traditioner och senare redaktion; Genesis 1–11 skall inte läsas som daterad urhistoria\./g)||[]).length,1,
 'Do not repeat a post summary in header and overview');
const goodnessHtml=renderFullReader(records[4]);
assert(!goodnessHtml.includes('id="topic:good-overview"'),'Do not duplicate philosophical introduction in overview');
assert(!goodnessHtml.includes('id="topic:good-time"'),'Topic has no contrived dated-event section');
const sourceHtml=renderFullReader(records[5]);
assert(!sourceHtml.includes('id="source:https://www.metmuseum.org/art/collection/search/544696-time"'),
 'Source reference must not invent a date section');
assert(css.includes('record-heading:focus-visible'),'Keep a restrained visible focus cue');
console.log('F4.3 real screenshot feedback regression: PASS');

assert(html.includes('data-area="bible"'),'Bibel posts must carry original category accent');
assert(html.includes('data-area="religion"'),'Religious subjects must carry original category accent');
assert(html.includes('data-area="history"'),'History and sources must carry original category accent');
assert(html.includes('data-area="ideas"'),'Philosophical topic must carry original category accent');
for(const color of ['#347ccb','#9465bf','#259779','#b17929']){
 assert(css.includes(color),'F2-approved area color missing: '+color);
}
assert.equal(records[4].entity.reviewStatus,null,'Do not invent review status for original research topic');
assert(!renderFullReader(records[4]).includes('Forskningsutkast'),'An undated topic cannot inherit a fabricated draft review status');
console.log('F4.3 original area colors and Swedish status: PASS');

const {originalAreaIcons,originalHeroDataUri}=require('./f4-original-design-assets.cjs');
const originalIcons=originalAreaIcons();
for(const k of ['bible','religion','history','philosophy']){
 assert(originalIcons[k].startsWith('<svg '),'Missing approved '+k+' original icon');
 assert(html.includes(originalIcons[k]),'Approved original SVG not present for '+k);
}
const hero=originalHeroDataUri();
assert(hero.startsWith('data:image/png;base64,'),'Original landscape was not embedded as PNG');
assert(html.includes(hero),'Review HTML does not contain the original Start-hero.png image');
assert(!html.includes('__F4_APPROVED_HERO_IMAGE__'),'Hero placeholder must be resolved');
assert(html.includes('class="f4-approved-hero"'),'Landscape context header missing');
assert.equal((html.match(/class="f4-area-chip /g)||[]).length,4,'Four real category cards must render');
assert(html.includes('aria-label="Fyra kunskapsområden"'));
assert(!html.includes('class="f4-area-chip f4-area-bible" role="button"'),'Area chips should not pretend to be navigational tabs');
assert(!html.includes('id="tvPrimaryNav"'),'Preview must not create an independent seventh main navigation');
assert(html.includes('class="record-label"'),'Article should include its original category SVG');
console.log('F4.4 approved landscape and original SVG icon parity: PASS');

const historical=renderFullReader(records[0]);
assert(historical.includes('Registrerat stöd:'),'Historical source must expose stated support');
assert(historical.includes('Daterat kungligt föremål och inskrift'),'Preserve H045 source specific supports');
assert(historical.includes('assyriskt år'),'Preserve original H045 date basis');
assert(historical.includes('1 Kung 22'),'Keep biblical comparison text');
assert(historical.includes('inte att denna text styrker'),'Do not conflate biblical and external evidence');
assert(historical.includes('2026-10-12'),'Retain source-card verification *metadata*');
assert(historical.includes('inte en oberoende granskning här'),'Do not present verification metadata as independent verification');
const gilgamesh=renderFullReader(records[3]);
assert(gilgamesh.includes('Primärtext eller bakgrundskälla'),'Retain O067 source-scope caveat');
assert(gilgamesh.includes('Originaldatering – ej faktagranskad'),'Retain the unreviewed original dating note');
const tobit=renderFullReader(records[2]);
assert(tobit.includes('AP005'),'Keep existing apocrypha topic relation');
assert(tobit.includes('inte belagda historiska påverkansvägar'),'Do not mislabel thematic links as historical influence');
assert(tobit.includes('Texttradition och datering'),'Book-specific research details must be visible');
assert(tobit.includes('Tobit (berättelsens huvudperson; ej belagd författare)'),'Preserve author attribution caveat');
const genesis=renderFullReader(records[1]);
assert(genesis.includes('Traditionell författarangivelse – inte bevisad författare'),'Traditional attribution must not be treated as fact');
assert(genesis.includes('Mose'),'Retain supplied traditional authorship label as source context');
console.log('F4.5 provenance and scholarly scope: PASS – historical source support, manuscript limits, apocrypha relations, no fabricated review');

const h045Origin=records[0].overviewOrigin;
assert.equal(h045Origin,'data/data.generated.js:events.H045.description');
assert(renderFullReader(records[0]).includes('Visa textfältens ursprung'),
 'Historical reader must expose an accessible provenance disclosure');
assert(renderFullReader(records[0]).includes(h045Origin),
 'Historical introduction must expose exact origin when details are expanded');
assert(!renderFullReader(records[0]).includes('Inledningens ursprung: '),
 'Technical provenance must not clutter the research article header');
assert(renderFullReader(records[0]).includes('<dd>sourceCardsV86</dd>'),
 'Selected historical context and interpretation must retain the source layer in details');
assert.equal(records[1].entity.data.religion.origin,'data/c7-religionshistorisk-betydelse.v890.js',
 'C7 provenance must name the actual significance file despite loading the full chain');
assert(renderFullReader(records[1]).includes('data/c7-religionshistorisk-betydelse.v890.js'));
assert(!renderFullReader(records[4]).includes('Forskningsutkast'),'No invented topic status');
const {assembleResearchObject}=require('./f3-unified-research-contract.cjs');
const sample=assembleResearchObject('topic',{key:'extra-study',label:'Ett test av läskontraktet',
 description:'Ett ospecifikt forskningsspår',sections:[{title:'Introduktion',body:'Text enligt testunderlag',origin:'test-only'}]});
const sampleEntry={entity:sample,category:'ideas',overviewOrigin:'test-only'};
const another=renderFullReader(sampleEntry);
assert(another.includes('Ett test av läskontraktet')&&another.includes('Text enligt testunderlag'),
 'Full reader must work for different topic IDs, not just six selected hardcoded IDs');
assert(!another.includes('Tid och datering'),'Generic philosophical topic has no fabricated event year');
console.log('F4 quality: full C7 sequence provenance and generic reader test – PASS');

assert(html.includes('class="provenance-details"'),'Field provenance needs a discoverable disclosure');
assert(html.includes('class="record-heading"'),'Main heading remains accessible after metadata move');
assert(!renderFullReader(records[2]).includes('Inledningens ursprung: data/'),
 'Raw registry paths must not dominate mobile research article lead');
console.log('F4 final reading audit: field origins retained without intrusive file paths in the header – PASS');
