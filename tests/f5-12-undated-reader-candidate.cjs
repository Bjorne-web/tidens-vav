'use strict';
// Opt-in presentation adapter only. Never modifies F4 or app production readers.
const {esc}=require('./f4-reader-renderer.cjs');
function renderUndatedReason(html,id,reason,origin){
 if(typeof reason!=='string'||!reason.trim())return html;
 const sectionId=String(id)+'-time';
 const anchor='<section class="article-section" id="'+esc(sectionId)+'">';
 const start=html.indexOf(anchor);
 if(start<0)throw new Error('Missing F4 time section for '+id);
 const end=html.indexOf('</section>',start);
 if(end<0)throw new Error('Unclosed F4 time section for '+id);
 const snippet='<div class="caution c7-undated-reason" role="note"><h3>Varför säker datering saknas</h3><p>'+esc(reason)+'</p>'+
 (origin?'<small>Uppgift registrerad i: '+esc(origin)+'</small>':'')+'</div>';
 return html.slice(0,end)+snippet+html.slice(end);
}
module.exports={renderUndatedReason};
