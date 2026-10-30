'use strict';
const fs=require('node:fs'),path=require('node:path');
const {buildFixtures}=require('./f4-reader-fixtures.cjs');
const {renderReviewPage}=require('./f4-reader-renderer.cjs');
const out=path.join('out','f4');fs.mkdirSync(out,{recursive:true});
const items=buildFixtures();
fs.writeFileSync(path.join(out,'full-research-review.html'),renderReviewPage(items),'utf8');
fs.writeFileSync(path.join(out,'README.txt'),
 'Tidens väv – F4 separat granskningsprototyp.\n'+
 'Öppna full-research-review.html i en webbläsare.\n'+
 'Den här filen är fristående och ändrar inte produktionsappen.\n'+
 'Datainnehållet återges från sex verkliga forskningsposter och källobjekt i repot.\n'+
 'Tillbaka och växling mellan exemplen fungerar endast inne i prototypen.\n'+
 'Riktig navigation, URL, scroll och befintlig appintegration hör till F5.\n','utf8');
console.log('F4 standalone preview created:',path.join(out,'full-research-review.html'),'cases:',items.length);
