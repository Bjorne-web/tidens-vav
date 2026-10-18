/* Granskning 3 fortsättning: Chromium-test för 11 bokposter på gemensam tidslinje. */
const assert=require('node:assert/strict');
const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const {chromium}=require('playwright');
const root=process.cwd(),mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.png':'image/png'};
const server=http.createServer((req,res)=>{
  const target=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  const file=path.resolve(root,'.'+(target==='/'?'/index.html':target));
  if(!file.startsWith(root+path.sep)){res.writeHead(403);return res.end('Forbidden')}
  fs.readFile(file,(err,bytes)=>{if(err){res.writeHead(404);return res.end('Not found')}
  res.setHeader('Content-Type',mime[path.extname(file)]||'application/octet-stream');res.end(bytes)});
});
(async()=>{
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 const origin='http://127.0.0.1:'+server.address().port;
 const browser=await chromium.launch({headless:true});
 const errors=[];
 try{
   const page=await browser.newPage({viewport:{width:1365,height:900}});
   page.on('pageerror',e=>errors.push('desktop: '+e.message));
   await page.goto(origin+'/?tv_id=D001&tv_view=timeline',{waitUntil:'domcontentloaded'});
   await page.locator('#detail .tv-book-reader h2').waitFor({timeout:20000});
   assert.match(await page.locator('#detail .tv-book-reader h2').textContent(),/Tobit/);
   assert.match(await page.locator('#detail .tv-book-reader').innerText(),/Betydelse för Israels religion/);
   assert.match(await page.locator('#detail .tv-book-reader').innerText(),/Rafael och Asmodeus/);
   const summary=await page.evaluate(()=>window.TidensBookTimelineV859);
   assert.equal(summary.count,77);assert.equal(summary.apocryphaCount,11);
   await page.selectOption('#v827Order','chrono');
   await page.waitForFunction(()=>document.querySelectorAll('#lanes .v882-bible-gantt-row[data-v891-category="Apokryferna"]').length>0,{timeout:15000});
   assert.equal(await page.locator('#lanes .v882-bible-gantt-row[data-v891-category="Apokryferna"]').count(),11,'all 11 shown alongside canonical books');
   const d3=page.locator('#lanes .v882-bible-gantt-row[data-v828-id="D003"] .v828-gantt-label');
   await d3.click();
   assert.match(await page.locator('#detail .tv-book-reader h2').innerText(),/Ester enligt den grekiska texten/);
   assert.match(await page.locator('#detail .tv-book-reader').innerText(),/[Gg]rekiska Ester/);
   await page.locator('#v881CategoryStrip button[data-category="Apokryferna"]').click();
   assert.equal(await page.locator('#lanes .v882-bible-gantt-row[data-v891-category="Apokryferna"]').count(),0,'hide apocrypha independently');
   await page.locator('#v881CategoryStrip button[data-category="Apokryferna"]').click();
   assert.equal(await page.locator('#lanes .v882-bible-gantt-row[data-v891-category="Apokryferna"]').count(),11,'restore all apocrypha');
   await page.evaluate(()=>{const cb=document.querySelector('#tvOnlyApocrypha');cb.checked=true;cb.dispatchEvent(new Event('change',{bubbles:true}))});
   await page.waitForFunction(()=>document.querySelectorAll('#lanes .v882-bible-gantt-row').length===11,{timeout:10000});
   assert.equal(await page.locator('#lanes .v882-bible-gantt-row').count(),11,'apocrypha-only filter excludes biblical book rows');
   assert((await page.locator('#v881CategoryStrip button[data-category="Apokryferna"]').getAttribute('aria-pressed'))==='true');
   const mobile=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
   mobile.on('pageerror',e=>errors.push('mobile: '+e.message));
   await mobile.goto(origin+'/?tv_id=D010&tv_view=timeline',{waitUntil:'domcontentloaded'});
   await mobile.locator('#detail .tv-book-reader h2').waitFor({timeout:20000});
   assert.match(await mobile.locator('#detail .tv-book-reader h2').innerText(),/Tillägg till Daniel/);
   assert.match(await mobile.locator('#detail .tv-book-reader').innerText(),/Susanna/);
   assert.equal(await mobile.locator('#detail .tv-book-reader a[href*="academic.oup.com"]').count()>0,true);
   assert.deepEqual(errors,[]);
   console.log('OK browser V8.91: desktop Gantt 77 rows, 11 apocrypha, category filter, historical reader and mobile deep link');
 }finally{await browser.close();await new Promise(resolve=>server.close(resolve))}
})().catch(err=>{console.error(err);process.exitCode=1});
