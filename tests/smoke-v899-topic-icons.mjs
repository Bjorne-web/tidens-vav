// Regression: startsidan and timeline navigation reuse the *same* four inline SVG icons.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const read=path=>fs.readFileSync(new URL('../'+path,import.meta.url),'utf8');
const startSource=read('v887-home-areas.js');
const topicSource=read('v892-topic-navigation.js');
const homeCss=read('v887-home-areas.css');
const topicCss=read('v892-topic-navigation.css');
const html=read('index.html');
const home={classList:{contains:()=>true}};
let markup='';
const section={set innerHTML(value){markup=value},get innerHTML(){return markup},addEventListener(){}};
const navHost={querySelector(sel){
 if(sel==='#tv892Topics')return null;
 if(sel==='.v7toolbar')return {parentNode:{insertBefore(value){assert.equal(value,section)}}};
 return null;
}};
const ctx={
 window:{v812Start:()=>{}},
 document:{
  getElementById(id){return id==='startView'?home:id==='timelineView'?navHost:null},
  createElement(tag){assert.equal(tag,'section');return section}
 }
};
vm.createContext(ctx);
vm.runInContext(startSource,ctx,{filename:'v887-home-areas.js'});
const icons=ctx.window.TidensAreaIcons;
assert.ok(icons,'Startsidan måste exportera kanoniskt ikonregister');
assert.ok(Object.isFrozen(icons),'Ikonregistret ska vara oföränderligt');
for(const id of ['bible','religion','history','philosophy']){
 assert.match(icons[id],/^<svg\b/,'Saknar original-SVG för '+id);
 assert.match(icons[id],/stroke-width="1\.8"/,'Originalets linjetjocklek måste bibehållas');
}
vm.runInContext(topicSource,ctx,{filename:'v892-topic-navigation.js'});
assert.equal((markup.match(/<svg\b/g)||[]).length,4,'Varje ämneskort måste visa exakt ett SVG');
assert.ok(!/📖|🏛|🌍|◈/.test(topicSource),'Emoji/ersättningssymboler får inte förekomma i navigering');
for(const id of ['bible','religion','history','philosophy']){
 assert.ok(markup.includes(icons[id]),id+': navigeringen använder inte samma SVG-källa');
 assert.ok(markup.includes('class="tv892-topic tv892-'+id+'"'),id+': kortet saknas');
}
assert.ok(markup.includes('tv892-icon tv887-shared-icon'),'Exakt samma ikonklass ska återanvändas');
assert.ok(startSource.includes('tv887-icon tv887-shared-icon'),'Startsidan ska också använda delade klassen');
assert.match(homeCss,/\.tv887-shared-icon\{display:grid;place-items:center;flex:0 0 49px;width:49px;height:49px;border-radius:14px;color:#fff;background:var\(--accent\)\}/);
assert.match(homeCss,/\.tv887-shared-icon svg\{display:block;width:30px;height:30px\}/);
assert.match(homeCss,/@media\(max-width:600px\)\{\.tv887-shared-icon\{width:42px;height:42px;flex-basis:42px\}\}/);
for(const id of ['bible','religion','history','philosophy']){
 assert.ok(homeCss.includes('--tv887-accent-'+id+':'),'Saknar gemensam accent '+id);
 assert.ok(topicCss.includes('var(--tv887-accent-'+id+')'),'Tidslinjen använder inte gemensam accent '+id);
}
assert.ok(!/\.tv892-icon\{[^}]*width:/.test(topicCss),'Tidslinjen får inte ersätta startsidans storlek');
assert.ok(html.indexOf('v887-home-areas.js')<html.indexOf('v892-topic-navigation.js'),'Käll-SVG måste laddas före navigeringen');
assert.ok(html.includes('v887-home-areas.css')&&html.includes('v892-topic-navigation.css'));
console.log('V8.99 icon matching OK: identical 4 SVG sources, 4 accents, 49/42px sizes, stroke, backgrounds and load order.');
