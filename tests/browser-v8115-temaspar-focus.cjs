// Regression: byte av vald utgångspost ska uppdatera Temaspår direkt.
const assert=require('node:assert/strict');
const fs=require('node:fs'),http=require('node:http'),path=require('node:path');
const {chromium}=require('playwright');
const root=process.cwd(),mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.svg':'image/svg+xml'};
const server=http.createServer((req,res)=>{
 const name=decodeURIComponent(new URL(req.url,'http://127.0.0.1').pathname);
 const file=path.resolve(root,'.'+(name==='/'?'/index.html':name));
 if(!file.startsWith(root+path.sep)){res.writeHead(403);return res.end('Forbidden')}
 fs.readFile(file,(err,data)=>{if(err){res.writeHead(404);return res.end('Missing')}res.setHeader('Content-Type',mime[path.extname(file)]||'application/octet-stream');res.end(data)});
});
(async()=>{
 await new Promise(done=>server.listen(0,'127.0.0.1',done));
 const browser=await chromium.launch({headless:true});
 try{
  for(const width of [1280,390]){
   const page=await browser.newPage({viewport:{width,height:850}});
   const errors=[];page.on('pageerror',e=>errors.push(e.message));
   await page.goto('http://127.0.0.1:'+server.address().port+'/',{waitUntil:'domcontentloaded'});
   await page.evaluate(()=>document.getElementById('navExplore').click());
   await page.locator('#v833PostSelect').waitFor();
   await page.selectOption('#v833PostSelect','H045');
   await page.locator('.v839-focus-row .v839-focus-card').waitFor();
   assert.match(await page.locator('.v839-focus-row').innerText(),/H045|Qarqar/);
   // O067 har en individuell C7-text, men originalregistrets årtal är ej prövat.
   await page.selectOption('#v833PostSelect','O067');
   const row=page.locator('.v839-focus-row');
   await row.locator('.v839-undated').waitFor();
   const rowText=await row.innerText();
   assert.match(rowText,/O067/);
   assert.match(rowText,/Gilgamesheposet/);
   assert.match(rowText,/inte separat källprövat/);
   assert.equal(await row.locator('.v839-point').count(),0,'Ej granskad originalpost får inte få tidsmarkör');
   assert.equal(await row.locator('[data-v839-read="O067"]').count(),1);
   // Byt vidare utan omladdning: fokus måste uppdateras direkt.
   await page.selectOption('#v833PostSelect','B039');
   await page.locator('.v839-focus-row .v839-focus-card').waitFor();
   assert.match(await page.locator('.v839-focus-row').innerText(),/Malaki/);
   // Regression av den faktiska knappen i läsfönstret, inte bara väljaren.
   for(const id of ['H045','O067','B039','B001']){
    const result=await page.evaluate(id=>{
     // Börja på en annan vy och välj posten via dess normala läsfönster.
     view('timeline');
     if(id.startsWith('B'))window.TidensOpenBookV858(id);
     else setSelected(id);
     const reader=document.querySelector('#detail');
     const btn=[...reader.querySelectorAll('button')].find(b=>b.textContent.includes('Visa sambanden i Temaspår'));
     if(!btn)return {error:'Saknar knapp',id,reader:reader.innerText.slice(0,250)};
     btn.click();
     return {focus:v829Focus.id,view:state.view};
    },id);
    assert.equal(result.focus,id,width+'px: actual reader button must preserve '+id+' as origin: '+JSON.stringify(result));
    assert.equal(result.view,'explore',width+'px: reader button must navigate to Temaspår');
    await page.locator('#v833Study h2').waitFor();
    assert.equal(await page.locator('#v833PostSelect').inputValue(),id,width+'px: research picker must match clicked reader origin');
    if(id==='O067')assert.match(await page.locator('.v839-focus-row').innerText(),/Gilgamesheposet/);
   }
   // Verkliga globala sökfältet: O067 måste hittas och leda till vald post i Temaspår.
   await page.evaluate(()=>view('timeline'));
   await page.locator('#search').fill('O067');
   const searchPanel=page.locator('#v827SearchResults');
   await searchPanel.locator('[data-v827-result]').first().waitFor();
   assert.match(await searchPanel.innerText(),/Gilgamesheposet/);
   assert.doesNotMatch(await searchPanel.innerText(),/Inga matchande poster/);
   await searchPanel.locator('[data-v827-result]').first().click();
   const opened=await page.evaluate(()=>({id:state.selected,view:state.view,reader:document.querySelector('#detail')?.innerText||'',button:[...document.querySelectorAll('#detail button')].some(b=>b.textContent.includes('Visa sambanden i Temaspår'))}));
   assert.equal(opened.id,'O067',width+'px: search result must select O067');
   assert.equal(opened.view,'timeline',width+'px: search result must remain in reader/timeline, not force Temaspår');
   assert.match(opened.reader,/Gilgamesheposet/);
   assert.equal(opened.button,true,width+'px: reader must offer the optional Temaspår action');
   await page.evaluate(()=>[...document.querySelectorAll('#detail button')].find(b=>b.textContent.includes('Visa sambanden i Temaspår')).click());
   assert.equal(await page.locator('#v833PostSelect').inputValue(),'O067',width+'px: explicit Temaspår action must retain selected O067');
   assert.deepEqual(errors,[],width+'px: Javascript errors');
   await page.close();
  }
  console.log('PASS: Temaspår H045, O067, B039; synlig korrekt utgångspost och mobilvy');
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1}).finally(()=>server.close());
