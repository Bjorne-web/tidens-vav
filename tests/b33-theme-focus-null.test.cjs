const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const source=fs.readFileSync('v912-cross-view-themes-compare.js','utf8');
function run(focus){const selected=[];const context={window:{TidensViewContextC1:{snapshot:()=>({selectedId:'H045',selectedPost:{title:'Ahab'}})}},document:{body:{append(){}},getElementById(){return {addEventListener(){}}},createElement(){return {setAttribute(){}}}},queueMicrotask:fn=>fn(),v829Focus:focus,v827RelationFocus:null,setSelected:id=>selected.push(id)};
vm.runInNewContext(source,context);context.window.TidensCrossViewC23.onThemes();return {selected,focus:context.v829Focus,relation:context.v827RelationFocus};}
assert.deepEqual(run(null).selected,['H045']);const x=run({});assert.equal(x.focus.id,'H045');assert.equal(x.relation,'H045');assert.equal(run('not-an-object').selected[0],'H045');
console.log('Theme focus guard preserves selected post and legacy relation focus');
