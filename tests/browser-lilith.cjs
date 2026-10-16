// Targeted Chromium regression for two Lilith entries, desktop and mobile.
// Runs against a local static server, not the published Cloudflare version.
const assert=require('node:assert/strict');
const http=require('node:http');
const fs=require('node:fs');
const path=require('node:path');
const {chromium}=require('playwright');
const root=process.cwd(),mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg'};
const server=http.createServer((req,res)=>{
 const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
 const file=path.resolve(root,'.'+(pathname==='/'?'/index.html':pathname));
 if(!file.startsWith(root+path.sep)){res.writeHead(403);return res.end('Denied');}
 fs.readFile(file,(err,buf)=>{
  if(err){res.writeHead(404);return res.end('Not found');}
  res.setHeader('Content-Type',mime[path.extname(file)]||'application/octet-stream');
  res.end(buf);
 });
});
(async()=>{
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 const origin='http://127.0.0.1:'+server.address().port;
 const browser=await chromium.launch({headless:true});
 const errors=[];
 try {
  const page=await browser.newPage({viewport:{width:1300,height:900}});
  page.on('pageerror',e=>errors.push('Desktop: '+e.message));
  await page.goto(origin+'/?tv_id=H066&tv_view=explore',{waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>document.querySelector('#detail h2')?.textContent?.includes('Lilith'),{timeout:20000});
  assert.match(await page.locator('#detail .v839-unified-article h2').innerText(),/Lilith/);
  assert.equal(await page.locator('#detail .v839-unified-article figure img').count(),1,'H066 illustration is displayed');
  assert.match(await page.locator('#detail .v839-unified-article figure figcaption').innerText(),/INTE belagd/);
  const result=await page.evaluate(()=>{
    state.min=-1000;state.max=1100;renderAll();
    const both=events.filter(e=>['H066','H067'].includes(e.id));
    const lookup=window.TidensVavLinks?.parse('?tv_id=H067&tv_view=explore');
    return {n:both.length,ids:both.map(x=>x.id),linked:lookup?.id,searchMatches:both.filter(x=>x.title.toLowerCase().includes('lilith')).length};
  });
  assert.equal(result.n,2);assert.equal(result.linked,'H067');assert.equal(result.searchMatches,2);
  await page.evaluate(()=>{view('records');renderRecords();});
  assert.match(await page.locator('#recordsView').innerText(),/H066/);
  assert.match(await page.locator('#recordsView').innerText(),/H067/);
  await page.goto(origin+'/?tv_id=H067&tv_view=explore',{waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>document.querySelector('#detail h2')?.textContent?.includes('Adams första hustru'),{timeout:20000});
  assert.equal(await page.locator('#detail .v839-unified-article figure img').count(),1,'H067 illustration is displayed');
  assert.match(await page.locator('#detail .v839-unified-article figure figcaption').innerText(),/1887/);
  const mobile=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
  mobile.on('pageerror',e=>errors.push('Mobile: '+e.message));
  await mobile.goto(origin+'/?tv_id=H067&tv_view=research',{waitUntil:'domcontentloaded'});
  await mobile.waitForFunction(()=>document.querySelector('#detail h2')?.textContent?.includes('Adams första hustru'),{timeout:20000});
  assert.equal(await mobile.locator('#detail .v839-unified-article figure img').count(),1);
  assert.equal(errors.length,0,'No uncaught browser JavaScript errors: '+errors.join(' | '));
  console.log('Lilith Chromium integration passed: desktop deep links, records search, both illustrations, mobile reader.');
 } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;}).finally(()=>server.close());
