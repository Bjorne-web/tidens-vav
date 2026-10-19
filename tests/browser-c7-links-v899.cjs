// Browser regression for C7 research-source clicks, Bible refs and matching card layout.
const assert=require('node:assert/strict');
const fs=require('node:fs'),http=require('node:http'),path=require('node:path');
const {chromium}=require('playwright');
const root=process.cwd();
const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.svg':'image/svg+xml'};
const server=http.createServer((req,res)=>{
 const pathname=decodeURIComponent(new URL(req.url,'http://127.0.0.1').pathname);
 const file=path.resolve(root,'.'+(pathname==='/'?'/index.html':pathname));
 if(!file.startsWith(root+path.sep)){res.writeHead(403);return res.end('Forbidden')}
 fs.readFile(file,(err,contents)=>{
  if(err){res.writeHead(404);return res.end('Not found')}
  res.setHeader('Content-Type',mime[path.extname(file)]||'application/octet-stream');res.end(contents);
 });
});
(async()=>{
 await new Promise(done=>server.listen(0,'127.0.0.1',done));
 const browser=await chromium.launch({headless:true});
 const errors=[];
 try{
  const page=await browser.newPage({viewport:{width:1200,height:850}});
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:'+server.address().port+'/?tv_id=H007&tv_view=research',{waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>document.querySelector('#detail .v838-faith-impact')?.textContent.includes('Hammurabi'),null,{timeout:20000});
  const historical=page.locator('#detail .v838-faith-impact');
  assert.equal(await historical.count(),1,'H007 must show one research impact card');
  assert.ok((await historical.locator('a.tv-c7-bible-ref').count())>0,'H007 must link Exodus legal comparison');
  const histColor=await historical.evaluate(e=>getComputedStyle(e).backgroundColor);
  const histLinks=historical.locator('ul li a[href^="https://"]');
  assert.ok(await histLinks.count()>=2,'Historical source links');
  const histFallback=historical.locator('a.tv-c7-source-fallback');
  assert.ok(await histFallback.count()>=1,'Scholarly fallback visible in H007');
  const popupWait=page.waitForEvent('popup',{timeout:15000});
  await histLinks.first().click();
  const popup=await popupWait;
  assert.ok(popup.url().startsWith('https://'),'Historical source should open an external HTTPS target');
  await popup.close();
  assert.equal(await page.evaluate(()=>window.TidensOpenBookV858('B065')),true,'Open Jude');
  const book=page.locator('#detail .tv-book-reader');
  assert.equal(await book.count(),1,'Jude book reader should load');
  const faith=book.locator('.v838-faith-impact');
  assert.equal(await faith.count(),1,'Jude must share same impact card class');
  assert.equal(await faith.evaluate(e=>getComputedStyle(e).backgroundColor),histColor,'History and Bible book use same card background');
  assert.equal(await faith.locator('h3').first().innerText(),'Betydelse för Israels religion, judendomen och kristendomen');
  const verse=faith.locator('a.tv-c7-bible-ref').filter({hasText:'Judas 14–15'});
  assert.equal(await verse.count(),1,'Jude Enoch reference has Bible link');
  assert.ok((await verse.first().getAttribute('href')).endsWith('/JUD.1.SFB15'),'Single-chapter Jude URL must be chapter 1');
  assert.ok(await faith.locator('a.tv-c7-source-fallback').count()>=1,'Book reader has search fallback');
  const bookSources=faith.locator('ul li a[href^="https://"]');
  assert.ok(await bookSources.count()>=5,'Named scholarly sources remain clickable');
  const popupWait2=page.waitForEvent('popup',{timeout:15000});
  await bookSources.first().click();
  const popup2=await popupWait2;
  assert.ok(popup2.url().startsWith('https://'),'Jude source click opens tab');
  await popup2.close();
  await page.setViewportSize({width:390,height:844});
  assert.equal(await faith.count(),1,'Mobile viewport retains the same card');
  assert.equal(await faith.evaluate(e=>getComputedStyle(e).backgroundColor),histColor,'Mobile card keeps same background');
  assert.deepEqual(errors,[],'Browser JS errors');
  console.log('C7 browser OK: H007 and B065 matching cards, Bible links, actual popups, desktop/mobile.');
  await page.close();
 } finally {await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1}).finally(()=>server.close());
