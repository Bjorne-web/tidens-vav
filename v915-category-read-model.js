/* B2.3 — read-only classification pilot, no changes to legacy models/UI. */
(function(root){
'use strict';
const AREAS=Object.freeze(['bible','religions','world','ideas']);
const overrides=Object.freeze({
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
 classificationStatus:isApocryphaBook?'structural-apocrypha-identity':isCanonicalBibleBook&&!overrides[post.id]?'structural-book-identity':entry?'pilot-proposal':'unclassified',
 source:isApocryphaBook?'B2.3 D-series apocrypha book identity, not canon or research sign-off':isCanonicalBibleBook&&!overrides[post.id]?'B2.3 B-series book identity, not research sign-off':'B2.3 manual example mapping; not research sign-off'
 });
}
const api=Object.freeze({areas:AREAS,get:classify,hasPilot:id=>Object.prototype.hasOwnProperty.call(overrides,id)});
if(typeof module!=='undefined'&&module.exports)module.exports=api;
if(root)root.TidensCategoryReadModel=api;
})(typeof window!=='undefined'?window:null);
