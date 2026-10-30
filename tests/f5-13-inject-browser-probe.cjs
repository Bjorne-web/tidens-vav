'use strict';
const fs=require('node:fs');
const p='out/f5-13/review.html';
let html=fs.readFileSync(p,'utf8');
const script=`<script>(function(){
const mode=new URLSearchParams(location.search).get('probe');
if(!mode)return;
const issues=[],panels=[...document.querySelectorAll('[data-panel]')],buttons=[...document.querySelectorAll('[data-open]')];
const isMobile=mode==='mobile',expected=33;
function test(ok,msg){if(!ok)issues.push(msg)}
test(panels.length===expected,'panel count '+panels.length);
test(buttons.length===expected,'button count '+buttons.length);
test(document.querySelector('meta[name="viewport"]')?.content.includes('width=device-width'),'viewport meta');
test(document.documentElement.scrollWidth<=innerWidth+2,'horizontal overflow initial '+document.documentElement.scrollWidth+'/'+innerWidth);
const c=document.getElementById('catalog');
for(let i=0;i<buttons.length;i++){
 const b=buttons[i],id=b.dataset.open;
 b.click();
 const visible=panels.filter(p=>!p.hidden);
 test(c.hidden,'catalog not hidden '+id);
 test(visible.length===1&&visible[0].dataset.panel===id,'wrong panel '+id);
 const pane=visible[0];
 test(!!pane?.querySelector('.c7-undated-reason p')?.textContent.trim(),'missing reason '+id);
 test(!!pane?.querySelector('.c7-undated-reason small')?.textContent.trim(),'missing provenance '+id);
 test(document.documentElement.scrollWidth<=innerWidth+2,'horizontal overflow open '+id+' '+document.documentElement.scrollWidth+'/'+innerWidth);
 pane.querySelector('.back')?.click();
 test(!c.hidden&&panels.every(p=>p.hidden),'return failed '+id);
 test(document.activeElement===b,'return focus failed '+id);
}
buttons[0]?.click();
document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true}));
test(!c.hidden,'Escape does not return');
const report={ok:issues.length===0,mode,viewport:[innerWidth,innerHeight],records:buttons.length,openReturnChecks:buttons.length,issues};
const pre=document.createElement('pre');pre.id='f513Report';pre.textContent=JSON.stringify(report);pre.dataset.status=report.ok?'PASS':'FAIL';document.body.appendChild(pre);
})();</script>`;
html=html.replace('</body>',script+'</body>');
fs.writeFileSync('out/f5-13/browser-probe.html',html);
