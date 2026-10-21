const fs=require('node:fs');const assert=require('node:assert/strict');
const index=fs.readFileSync('index.html','utf8');
const preview=fs.readFileSync('b33-approved-design-preview.html','utf8');
assert.equal(preview,index,'B3.3 baseline must match approved app HTML exactly');
for(const f of ['Start-hero.png','v887-home-areas.css','v900-timeline-landscape.css','styles.css','v907-primary-navigation.css'])assert(fs.existsSync(f),'Missing original design dependency: '+f);
const home=fs.readFileSync('v887-home-areas.css','utf8');const timeline=fs.readFileSync('v900-timeline-landscape.css','utf8');
assert(home.includes('Start-hero.png'));assert(timeline.includes('Start-hero.png'));
assert(index.includes('id="startView"'));assert(index.includes('id="timelineView"'));
console.log('B3.3 approved-design baseline equals existing app HTML and reuses actual assets');
