// Granskning 5: kontrollera obligatorisk C7-text i verklig Chromium-läsare, desktop + mobil.
const assert=require('node:assert/strict');
const fs=require('node:fs');
const http=require('node:http');
const path=require('node:path');
const {chromium}=require('playwright');
const root=process.cwd();
const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.png':'image/png'};
const server=http.createServer((req,res)=>{
 const pathname=decodeURIComponent(new URL(req.url,'http://127.0.0.1').pathname);
 const file=path.resolve(root,'.'+(pathname==='/'?'/index.html':pathname));
 if(!file.startsWith(root+path.sep)){res.writeHead(403);return res.end('Denied');}
 fs.readFile(file,(err,buf)=>{
  if(err){res.writeHead(404);return res.end('Not found');}
  res.setHeader('Content-Type',mime[path.extname(file)]||'application/octet-stream');
  res.end(buf);
 });
});
(async()=>{
 await new Promise(ok=>server.listen(0,'127.0.0.1',ok));
 const origin='http://127.0.0.1:'+server.address().port;
 const browser=await chromium.launch({headless:true});
 const pageErrors=[];
 try{
  for(const {id,mobile} of [{id:'H068',mobile:false},{id:'H069',mobile:true}]){
   const page=await browser.newPage(mobile?{viewport:{width:390,height:844},isMobile:true,hasTouch:true}:{viewport:{width:1280,height:900}});
   page.on('pageerror',err=>pageErrors.push(id+': '+err.message));
   await page.goto(origin+'/?tv_id='+id+'&tv_view=research',{waitUntil:'domcontentloaded'});
   await page.waitForFunction(expected=>document.querySelector('#detail .v839-faith-context')?.textContent?.length>650 && document.querySelector('#detail')?.textContent?.includes(expected),id,{timeout:20000});
   const box=page.locator('#detail .v839-unified-article .v839-faith-context');
   assert.equal(await box.count(),1,id+': religionshistorisk ruta saknas');
   assert.equal((await box.locator('h3').innerText()).trim(),'Betydelse för Israels religion, judendomen och kristendomen',id+': rubriken fel');
   const text=await box.locator('p:not(.v838-faith-level):not(.v838-faith-sources)').first().innerText();
   assert.ok(text.length>=550,id+': betydelsetexten är för kort');
   for(const word of ['israel','judendom','kristendom']){
    assert.ok(text.toLowerCase().includes(word),id+': saknar '+word);
   }
   assert.ok(await box.locator('ul li a[href^="https://"]').count()>=2,id+': källor saknas i läsfönstret');
   assert.ok(!text.includes('återstår att särskilt granska'),id+': intetsägande standardtext');
   await page.close();
  }
  assert.equal(pageErrors.length,0,'Javascriptfel: '+pageErrors.join(' | '));
  console.log('C7 Chromium godkänd – H068 dator, H069 mobil, rubriker, text, källor.');
 } finally {
  await browser.close();
 }
})().catch(err=>{console.error(err);process.exitCode=1;}).finally(()=>server.close());
