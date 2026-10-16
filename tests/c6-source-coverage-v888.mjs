import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const ctx={window:{}};vm.createContext(ctx);
vm.runInContext(fs.readFileSync('data/review-ledger.js','utf8'),ctx);
const ledger=ctx.window.TIDENS_REVIEW_LEDGER;
const alerts=[], stats={claims:0,posts:0,missingSource:0,missingScope:0,missingLimit:0,invalidUrl:0};
for(const [id,checks] of Object.entries(ledger.claimChecks||{})){
 if(!checks.length)continue;stats.posts++;
 for(let i=0;i<checks.length;i++){
  const item=checks[i];stats.claims++;
  if(!item.sourceTitle||!item.sourceUrl){stats.missingSource++;alerts.push(id+' #'+(i+1)+': no source title or link');}
  if(!item.scope){stats.missingScope++;alerts.push(id+' #'+(i+1)+': no claim scope');}
  if(!item.limit){stats.missingLimit++;alerts.push(id+' #'+(i+1)+': no stated limitation');}
  if(item.sourceUrl&&!/^https:\/\//.test(item.sourceUrl)){stats.invalidUrl++;alerts.push(id+' #'+(i+1)+': source URL not https');}
 }
}
assert.ok(stats.claims>0);
assert.equal(Object.keys(ledger.completePostReviews||{}).length,0,'Do not imply whole-post review');
console.log('C6 source metadata audit:',JSON.stringify(stats));
if(alerts.length)console.log('Follow-up candidates (not newly verified):\\n'+alerts.slice(0,25).join('\\n'));
if(process.env.C6_STRICT==='1')assert.equal(alerts.length,0,'Source metadata gaps remain');
