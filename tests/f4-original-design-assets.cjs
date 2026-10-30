'use strict';
// F4 test-only visual parity: read the application's original image and SVG registry.
const fs=require('node:fs');
const vm=require('node:vm');
const assert=require('node:assert/strict');
let iconsCache=null;
function originalAreaIcons(){
 if(iconsCache)return iconsCache;
 const js=fs.readFileSync('v887-home-areas.js','utf8');
 const m=js.match(/const iconSvg=(\{[\s\S]*?\n  \});/);
 assert(m,'Approved v887 icon registry is missing or changed');
 const parsed=vm.runInNewContext('('+m[1]+')',Object.create(null),{timeout:1000});
 const iconNames=['bible','religion','history','philosophy'];
 for(const name of iconNames){
  const markup=parsed[name];
  assert(typeof markup==='string'&&markup.startsWith('<svg ')&&markup.endsWith('</svg>'),'Unexpected '+name+' icon');
  assert(!/<script|onload=|onclick=|javascript:/i.test(markup),'Unsafe icon registry content');
 }
 iconsCache=Object.freeze(Object.fromEntries(iconNames.map(k=>[k,parsed[k]])));
 return iconsCache;
}
function originalHeroDataUri(){
 const source=fs.readFileSync('Start-hero.png');
 const png=Buffer.from([137,80,78,71,13,10,26,10]);
 assert(source.subarray(0,8).equals(png),'Original Start-hero.png is not PNG');
 return 'data:image/png;base64,'+source.toString('base64');
}
module.exports={originalAreaIcons,originalHeroDataUri};
