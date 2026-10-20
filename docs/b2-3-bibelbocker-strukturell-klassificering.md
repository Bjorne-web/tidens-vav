# B2.3 – Bibelns 66 böcker, strukturell huvudklassificering

Kanoniska B001–B066 har primärt ämnesområde `bible` eftersom dessa ID:n entydigt betecknar Bibelns böcker i det verifierade bokregistret. Detta är **strukturell identifikation**, inte vetenskaplig granskning eller individuell bedömning av textens tillkomst, genre eller sekundära relationer.

Tidigare individuellt dokumenterad B001-pilot behåller sina särskilda sekundära ämneskopplingar. För B002–B066 lämnas `relatedAreas` tom tills de är sakligt prövade. `researchStatus` är fortsatt `unknown`. Originalets `reviewStatus`, tidsfält och kategorier lämnas helt orörda.

B067, D001 och andra serier klassificeras **inte** automatiskt som Bibeln av denna regel. Äldre `bibleOriginal`-berättelser får inga nya ID:n.

Test: `node tests/b2-bible-book-classification.test.cjs`. Den befintliga täckningskontrollen kan därutöver nu rapportera 66 klassificerade B-poster, men detta avser endast huvudområdets strukturella tillhörighet.

Fortsatt arbetsordning: senare D-böcker och AP-temaposter inventeras och bedöms separat. Därefter klassificering av H/O med explicit spårbarhet. Filterpanelen B2.4 väntar.
