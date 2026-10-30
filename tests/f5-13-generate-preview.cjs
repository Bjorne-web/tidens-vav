'use strict';
const fs=require('node:fs'),path=require('node:path');
const {reportRows,latestDating}=require('./f5-11-c7-source-inventory.cjs');
const {assembleResearchObject}=require('./f3-unified-research-contract.cjs');
const {renderFullReader}=require('./f4-reader-renderer.cjs');
const {renderUndatedReason}=require('./f5-12-undated-reader-candidate.cjs');
const rows=reportRows.filter(row=>{const e=latestDating[row.id]?.entry;return e&&Array.isArray(e.phases)&&e.phases.length===0&&typeof e.undated==='string'&&e.undated.trim()});
const options=[],panels=[];
for(const row of rows){
 const entry=latestDating[row.id];
 const entity=assembleResearchObject('post',{id:row.id,title:row.title||row.id,sourceLayers:[{id:'f5-13-preview',fields:{summary:'Källspårbar dateringsförklaring för granskning.'}}]});
 const page=renderUndatedReason(renderFullReader({entity,category:'history'}),row.id,entry.entry.undated,entry.file);
 options.push('<button type="button" class="choose" data-open="'+row.id+'">'+row.id+' – '+escapeHtml(row.title||row.id)+'</button>');
 panels.push('<article data-panel="'+row.id+'" hidden>'+page+'</article>');
}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
const css=fs.readFileSync('prototypes/f4/reader-preview.css','utf8').replace(/__F4_APPROVED_HERO_IMAGE__/g,'');
const html='<!doctype html><html lang="sv"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>F5.13 – separat granskning</title><style>'+css+'\nbody{margin:0}.review-list{padding:24px;max-width:900px;margin:auto}.choose{display:block;margin:8px 0;padding:12px;width:100%;text-align:left}.c7-undated-reason{padding:16px;border:1px solid currentColor;border-radius:8px;margin:12px 0}</style></head><body><section class="review-list" id="catalog"><h1>F5.13 – odaterade forskningsposter</h1><p>Endast granskningskopia. Inte en publicerad vy.</p>'+options.join('')+'</section>'+panels.join('')+'<script>(function(){const list=document.querySelector("#catalog"),panels=[...document.querySelectorAll("[data-panel]")];let origin=null;function back(){panels.forEach(x=>x.hidden=true);list.hidden=false;origin?.focus();}document.querySelectorAll("[data-open]").forEach(b=>b.addEventListener("click",()=>{origin=b;list.hidden=true;panels.forEach(x=>x.hidden=x.dataset.panel!==b.dataset.open);document.querySelector("[data-panel]:not([hidden]) .record-heading")?.focus();}));document.querySelectorAll(".back").forEach(b=>b.addEventListener("click",back));document.addEventListener("keydown",e=>{if(e.key==="Escape"&&list.hidden)back();});})();</script></body></html>';
fs.mkdirSync('out/f5-13',{recursive:true});fs.writeFileSync('out/f5-13/review.html',html);
fs.writeFileSync('out/f5-13/manifest.json',JSON.stringify({count:rows.length,ids:rows.map(x=>x.id),scope:'isolated preview, no real-app route or map integration'},null,2));
if(rows.length!==33)throw new Error('Expected 33 missing C7 explanations; re-review catalog');
console.log('F5.13 preview generated for',rows.length,'records');
