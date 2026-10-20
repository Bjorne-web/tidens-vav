/* B2.3 — read-only classification pilot, no changes to legacy models/UI. */
(function(root){
'use strict';
const AREAS=Object.freeze(['bible','religions','world','ideas']);
const overrides=Object.freeze({
 H030:{primaryArea:'bible',relatedAreas:['religions','world'],contentTypes:['epistle-collection','text-composition'],timeKinds:['composition']},
 H031:{primaryArea:'bible',relatedAreas:['religions','world'],contentTypes:['gospel','text-composition'],timeKinds:['composition']},
 H032:{primaryArea:'world',relatedAreas:['religions','bible'],contentTypes:['historical-event','military-conflict','temple-history'],timeKinds:['historical-event']},
 H033:{primaryArea:'bible',relatedAreas:['religions','world'],contentTypes:['gospels','text-composition'],timeKinds:['composition']},
 H034:{primaryArea:'bible',relatedAreas:['religions'],contentTypes:['gospel','text-redaction'],timeKinds:['composition']},
 H035:{primaryArea:'bible',relatedAreas:['religions','ideas'],contentTypes:['apocalyptic-literature','text-composition'],timeKinds:['composition']},
 H036:{primaryArea:'world',relatedAreas:['religions'],contentTypes:['historical-event','military-conflict'],timeKinds:['historical-period']},

 H023:{primaryArea:'bible',relatedAreas:['religions','world'],contentTypes:['text-redaction','apocalyptic-literature'],timeKinds:['composition']},
 H024:{primaryArea:'world',relatedAreas:['religions','bible'],contentTypes:['historical-event','military-conflict'],timeKinds:['historical-period']},
 H025:{primaryArea:'religions',relatedAreas:['bible','ideas'],contentTypes:['text-collection','apocalyptic-literature'],timeKinds:['composition','text-tradition']},
 H026:{primaryArea:'world',relatedAreas:['religions','bible'],contentTypes:['historical-event','political-history'],timeKinds:['historical-event']},
 H027:{primaryArea:'religions',relatedAreas:['bible','world'],contentTypes:['historical-person','birth-tradition'],timeKinds:['historical-reconstruction']},
 H028:{primaryArea:'religions',relatedAreas:['bible','world'],contentTypes:['historical-person','religious-movement'],timeKinds:['historical-reconstruction']},
 H029:{primaryArea:'world',relatedAreas:['religions','bible'],contentTypes:['historical-event','roman-execution'],timeKinds:['historical-reconstruction']},
 H014:{primaryArea:'world',relatedAreas:['bible','religions'],contentTypes:['historical-period','kingdoms'],timeKinds:['historical-period']},
 H015:{primaryArea:'world',relatedAreas:['bible','religions'],contentTypes:['historical-event','military-conflict'],timeKinds:['historical-event']},
 H016:{primaryArea:'world',relatedAreas:['bible','religions'],contentTypes:['historical-event','military-conflict'],timeKinds:['historical-event']},
 H017:{primaryArea:'world',relatedAreas:['religions'],contentTypes:['historical-event','empire'],timeKinds:['historical-event']},
 H018:{primaryArea:'religions',relatedAreas:['bible','world'],contentTypes:['temple-history','historical-event'],timeKinds:['historical-tradition']},
 H019:{primaryArea:'bible',relatedAreas:['religions'],contentTypes:['text-redaction'],timeKinds:['composition']},
 H020:{primaryArea:'bible',relatedAreas:['religions'],contentTypes:['text-redaction','biblical-narrative'],timeKinds:['composition']},
 H021:{primaryArea:'bible',relatedAreas:['religions','world'],contentTypes:['text-redaction','historiography'],timeKinds:['composition']},
 H022:{primaryArea:'world',relatedAreas:['religions'],contentTypes:['historical-event','empire'],timeKinds:['historical-event']},
 H008:{primaryArea:'bible',relatedAreas:['religions'],contentTypes:['biblical-narrative'],timeKinds:['narrated-hypothetical']},
 H009:{primaryArea:'world',relatedAreas:['religions'],contentTypes:['historical-period'],timeKinds:['historical-period']},
 H010:{primaryArea:'bible',relatedAreas:['religions'],contentTypes:['biblical-narrative'],timeKinds:['narrated-hypothetical']},
 H011:{primaryArea:'world',relatedAreas:['bible','religions'],contentTypes:['inscription','historical-evidence'],timeKinds:['historical-source']},
 H012:{primaryArea:'world',relatedAreas:['religions'],contentTypes:['archaeological-context'],timeKinds:['archaeological-period']},
 H013:{primaryArea:'bible',relatedAreas:['world','religions'],contentTypes:['biblical-narrative'],timeKinds:['narrated-debated']},
 H001:{primaryArea:'world',relatedAreas:[],contentTypes:['archaeological-site'],timeKinds:['historical-event']},
 H002:{primaryArea:'world',relatedAreas:[],contentTypes:['society'],timeKinds:['historical-event']},
 H003:{primaryArea:'world',relatedAreas:[],contentTypes:['monument','historical-period'],timeKinds:['historical-event']},
 H004:{primaryArea:'religions',relatedAreas:['bible'],contentTypes:['text','narrative'],timeKinds:['composition']},
 H005:{primaryArea:'religions',relatedAreas:['bible'],contentTypes:['text','narrative'],timeKinds:['composition']},
 H006:{primaryArea:'religions',relatedAreas:['bible'],contentTypes:['text','narrative'],timeKinds:['composition']},
 H007:{primaryArea:'world',relatedAreas:[],contentTypes:['historical-person','reign'],timeKinds:['historical-event']},
 AP001:{primaryArea:'religions',relatedAreas:['bible'],contentTypes:['canon-history','text-tradition'],timeKinds:['reception']},
 AP002:{primaryArea:'bible',relatedAreas:['religions'],contentTypes:['text-comparison','apocrypha-theme'],timeKinds:['composition']},
 AP003:{primaryArea:'bible',relatedAreas:['religions','ideas'],contentTypes:['text-comparison','apocrypha-theme'],timeKinds:['composition']},
 AP004:{primaryArea:'bible',relatedAreas:['religions'],contentTypes:['text-comparison','apocrypha-theme'],timeKinds:['composition','translation']},
 AP005:{primaryArea:'bible',relatedAreas:['religions'],contentTypes:['text-comparison','apocrypha-theme'],timeKinds:['composition']},
 AP006:{primaryArea:'bible',relatedAreas:['religions'],contentTypes:['text-comparison','apocrypha-theme'],timeKinds:['reception']},
 B001:{primaryArea:'bible',relatedAreas:['religions','ideas'],contentTypes:['bible-book','text'],timeKinds:['composition']},
 H045:{primaryArea:'world',relatedAreas:['bible','religions'],contentTypes:['event','inscription'],timeKinds:['historical-event']},
 O067:{primaryArea:'religions',relatedAreas:['bible','world'],contentTypes:['text','narrative'],timeKinds:['composition']},
 O123:{primaryArea:'world',relatedAreas:['religions','bible'],contentTypes:['event','political-history'],timeKinds:['historical-event']}
});
function classify(post){
 if(!post||typeof post.id!=='string'||!post.id.trim())return null;
 const isCanonicalBibleBook=/^B(?:0(?:0[1-9]|[1-5][0-9]|6[0-6]))$/.test(post.id);
 const isApocryphaBook=/^D0(?:0[1-9]|1[01])$/.test(post.id);
 const entry=overrides[post.id]||(isApocryphaBook?{primaryArea:'bible',relatedAreas:[],contentTypes:['apocryphal-book','text'],timeKinds:['composition']}:null)||(isCanonicalBibleBook?{primaryArea:'bible',relatedAreas:[],contentTypes:['bible-book','text'],timeKinds:['composition']}:null);
 const primary=entry?entry.primaryArea:'unclassified';
 return Object.freeze({
 id:post.id,
 legacyCategory:typeof post.category==='string'?post.category:null,
 primaryArea:primary,
 relatedAreas:Object.freeze(entry?[...entry.relatedAreas]:[]),
 contentTypes:Object.freeze(entry?[...entry.contentTypes]:[]),
 timeKinds:Object.freeze(entry?[...entry.timeKinds]:[]),
 researchStatus:'unknown',
 classificationStatus:post.id.startsWith('AP')&&overrides[post.id]?'pilot-proposal':isApocryphaBook?'structural-apocrypha-identity':isCanonicalBibleBook&&!overrides[post.id]?'structural-book-identity':entry?'pilot-proposal':'unclassified',
 source:isApocryphaBook?'B2.3 D-series apocrypha book identity, not canon or research sign-off':isCanonicalBibleBook&&!overrides[post.id]?'B2.3 B-series book identity, not research sign-off':'B2.3 manual example mapping; not research sign-off'
 });
}
const api=Object.freeze({areas:AREAS,get:classify,hasPilot:id=>Object.prototype.hasOwnProperty.call(overrides,id)});
if(typeof module!=='undefined'&&module.exports)module.exports=api;
if(root)root.TidensCategoryReadModel=api;
})(typeof window!=='undefined'?window:null);
