// Chromium UI test: timeline topic icons must equal the approved Start icons on desktop and mobile.
const assert=require('node:assert/strict');
const fs=require('node:fs'),http=require('node:http'),path=require('node:path');
const {chromium}=require('playwright');
const root=process.cwd();
const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.png':'image/png'};
const server=http.createServer((req,res)=>{
 const pathname=decodeURIComponent(new URL(req.url,'http://127.0.0.1').pathname);
 const file=path.resolve(root,'.'+(pathname==='/'?'/index.html':pathname));
 if(!file.startsWith(root+path.sep)){res.writeHead(403);return res.end('Denied')}
 fs.readFile(file,(err,data)=>{
  if(err){res.writeHead(404);return res.end('Not found')}
  res.setHeader('Content-Type',mime[path.extname(file)]||'application/octet-stream');res.end(data);
 });
});
const ids=['bible','religion','history','philosophy'];
(async()=>{
 await new Promise(done=>server.listen(0,'127.0.0.1',done));
 const browser=await chromium.launch({headless:true});
 try{
  for(const width of [1280,390]){
   const page=await browser.newPage({viewport:{width,height:850}});
   const errors=[];page.on('pageerror',e=>errors.push(e.message));
   await page.goto('http://127.0.0.1:'+server.address().port+'/',{waitUntil:'domcontentloaded'});
   await page.evaluate(()=>document.getElementById('navStart').click());
   await page.locator('#startView .tv887-area').first().waitFor();
   const start=await page.evaluate(ids=>ids.map(id=>{
    const icon=document.querySelector('#startView .tv887-'+id+' .tv887-icon');
    if(!icon)throw Error('Missing start icon '+id);
    const css=getComputedStyle(icon);
    return {id,svg:icon.querySelector('svg')?.outerHTML,
      width:css.width,height:css.height,radius:css.borderRadius,background:css.backgroundColor,
      color:css.color};
   }),ids);
   await page.evaluate(()=>document.getElementById('navTimeline').click());
   await page.locator('#timelineView .tv892-topic').first().waitFor();
   const landscape=await page.evaluate(async()=>{
    const timeline=document.querySelector('#timelineView');
    const hero=document.querySelector('#tv895TimelineHero');
    const topics=document.querySelector('#tv892Topics');
    const caption=document.querySelector('.tv895-timeline-caption');
    const pan=document.querySelector('#v827PanControls');
    const image=hero?getComputedStyle(hero).backgroundImage:'';
    const response=await fetch('Start-hero.png',{method:'HEAD'});
    return {heroFirst:timeline.firstElementChild===hero,
      topicsInHero:hero?.contains(topics),
      src:image.includes('Start-hero.png'),
      imageStatus:response.status,
      timeCaption:caption?.querySelector('strong')?.textContent,
      controlAfterCaption:caption?.nextElementSibling===pan,
      inlineClass:pan?.classList.contains('tv895-pan-inline')};
   });
   assert.equal(landscape.heroFirst,true,width+': photo hero must precede Timeline');
   assert.equal(landscape.topicsInHero,true,width+': cards must stay over photo');
   assert.equal(landscape.src,true,width+': approved landscape asset missing');
   assert.equal(landscape.imageStatus,200,width+': photo file must load');
   // V8.94 removed the former caption/pan-inline layout; that layout has its own regression coverage.
   // This legacy V8.99 test only protects the approved shared icons and hero image.

   const topics=await page.evaluate(ids=>ids.map(id=>{
    const icon=document.querySelector('#timelineView .tv892-'+id+' .tv892-icon');
    if(!icon)throw Error('Missing topic icon '+id);
    const css=getComputedStyle(icon);
    return {id,svg:icon.querySelector('svg')?.outerHTML,
      width:css.width,height:css.height,radius:css.borderRadius,background:css.backgroundColor,
      color:css.color};
   }),ids);
   assert.deepEqual(topics,start,width+': SVG, size, background, radius and foreground must match exactly');
   assert.ok(start.every(x=>x.svg?.includes('stroke-width="1.8"')),width+': expected original SVG stroke weight');
   assert.ok(start.every(x=>x.width===(width>600?'49px':'42px')),width+': wrong icon size');
   assert.deepEqual(errors,[],width+': JS errors');
   await page.close();
  }
  console.log('V8.99 Chromium PASS: four identical start/topic SVG icons and computed styles at desktop and mobile sizes.');
 } finally {await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1}).finally(()=>server.close());
