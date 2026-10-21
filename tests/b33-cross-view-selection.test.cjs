const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const src=fs.readFileSync('v912-cross-view-themes-compare.js','utf8');
function exercise(compareIds){
 let added=[],selected=[],snap={selectedId:'H045',selectedPost:{title:'Ahab'}};const listeners={};
 const ctx={window:{TidensViewContextC1:{snapshot:()=>snap}},document:{body:{append(){}},getElementById(id){if(['navExplore','navCompare','navTimeline'].includes(id))return {addEventListener(type,cb){listeners[id]=cb}};return null},createElement(){return {setAttribute(){},hidden:true}}},queueMicrotask:fn=>fn(),compareIds,toggleCompare:id=>added.push(id),setSelected:id=>selected.push(id)};
 vm.runInNewContext(src,ctx);ctx.window.TidensCrossViewC23.onCompare();
 return {added,selected};
}
assert.deepEqual(exercise(undefined).added,[]);
assert.deepEqual(exercise({}).added,[]);
assert.deepEqual(exercise(['H045']).added,[]);
assert.deepEqual(exercise([]).added,['H045']);
assert.deepEqual(exercise([]).selected,['H045']);
const html=fs.readFileSync('index.html','utf8');assert(html.includes('v912-cross-view-themes-compare.js'));
console.log('Existing view comparison guarded against missing legacy list');
