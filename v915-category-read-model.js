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
 const entry=overrides[post.id]||null;
 const primary=entry?entry.primaryArea:'unclassified';
 return Object.freeze({
 id:post.id,
 legacyCategory:typeof post.category==='string'?post.category:null,
 primaryArea:primary,
 relatedAreas:Object.freeze(entry?[...entry.relatedAreas]:[]),
 contentTypes:Object.freeze(entry?[...entry.contentTypes]:[]),
 timeKinds:Object.freeze(entry?[...entry.timeKinds]:[]),
 researchStatus:'unknown',
 classificationStatus:entry?'pilot-proposal':'unclassified',
 source:'B2.3 manual example mapping; not research sign-off'
 });
}
const api=Object.freeze({areas:AREAS,get:classify,hasPilot:id=>Object.prototype.hasOwnProperty.call(overrides,id)});
if(typeof module!=='undefined'&&module.exports)module.exports=api;
if(root)root.TidensCategoryReadModel=api;
})(typeof window!=='undefined'?window:null);
