// Browser check: C7 omgång 10 H047-H054, source links, scripture, unchanged layout.
const assert=require('node:assert/strict');
const fs=require('node:fs'),http=require('node:http'),path=require('node:path');
const {chromium}=require('playwright');
const root=process.cwd();
const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.svg':'image/svg+xml'};
const server=http.createServer((req,res)=>{
 const pathname=decodeURIComponent(new URL(req.url,'http://127.0.0.1').pathname);
 const file=path.resolve(root,'.'+(pathname==='/'?'/index.html':pathname));
 if(!file.startsWith(root+path.sep)){res.writeHead(403);return res.end('Denied')}
 fs.readFile(file,(err,body)=>{
  if(err){res.writeHead(404);return res.end('Not found')}
  res.setHeader('Content-Type',mime[path.extname(file)]||'application/octet-stream');res.end(body);
 });
});
(async()=>{
 await new Promise(done=>server.listen(0,'127.0.0.1',done));
 const browser=await chromium.launch({headless:true});
 const origin='http://127.0.0.1:'+server.address().port;
 const errors=[];
 try{
  for(const id of ['H047','H048','H049','H050','H051','H052','H053','H054']){
   const page=await browser.newPage({viewport:{width:1280,height:800}});
   page.on('pageerror',e=>errors.push(id+': '+e.message));
   await page.goto(origin+'/?tv_id='+id+'&tv_view=research',{waitUntil:'domcontentloaded'});
   await page.waitForFunction(expected=>{
    const el=document.querySelector('#detail .v838-faith-impact');
    return el?.querySelector('.v838-faith-level')?.textContent &&
     document.getElementById('detail')?.textContent?.includes(expected) &&
     el.textContent.length>=1150;
   },id,{timeout:20000});
   const card=page.locator('#detail .v838-faith-impact');
   assert.equal(await card.count(),1,id+': significance must use exactly one approved blue card');
   assert.equal((await card.locator('h3').innerText()).trim(),'Betydelse för Israels religion, judendomen och kristendomen');
   assert.ok((await card.locator('ul.v839-unified-sources a[href^="https://"]').count())>=3,id+': link cards missing');
   assert.ok((await card.locator('a.tv-c7-bible-ref').count())>=1,id+': missing automatic passage link');
   if(id==='H051') assert.ok((await card.innerText()).includes('597 f.Kr.'));
   if(id==='H054') assert.ok((await card.innerText()).includes('Jerusalem'));
   if(id==='H047'||id==='H053'){
    const link=card.locator('ul.v839-unified-sources li a[href^="https://"]').first();
    const popupPromise=page.waitForEvent('popup',{timeout:12000});
    await link.click();
    const popup=await popupPromise;
    assert.ok(popup.url().startsWith('https://'),id+': primary link did not open in new tab');
    await popup.close();
   }
   await page.close();
  }
  const mobile=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
  mobile.on('pageerror',e=>errors.push('mobile: '+e.message));
  await mobile.goto(origin+'/?tv_id=H048&tv_view=research',{waitUntil:'domcontentloaded'});
  await mobile.waitForFunction(()=>document.querySelector('#detail .v838-faith-impact')?.textContent.length>1100,null,{timeout:20000});
  assert.equal(await mobile.locator('#detail .v838-faith-impact').count(),1,'Mobile H048 retains research card');
  assert.deepEqual(errors,[],'Browser JS errors');
  await mobile.close();
  console.log('C7 omgång 10 Chromium PASS: all H047–H054 blue readers, Bible & research links, desktop/mobile.');
 } finally {await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1}).finally(()=>server.close());
