import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const src=fs.readFileSync(new URL('../v843-timeline-workspace.js',import.meta.url),'utf8');
const entries=[{type:'post'},{type:'archive'},{type:'library'}];
vm.runInNewContext(src,{renderTimeline(){},window:{},v827Index:entries,document:{getElementById(){return null}}});
assert.deepEqual(entries.map(x=>x.type),['post','library']);
console.log('V8.47: imported archive entries excluded from public search index');
