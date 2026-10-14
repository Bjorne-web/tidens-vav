/* Tidens väv V8.36 – sökbar arbetsöversikt, utan falska granskningsstämplar.
   Påståendekontroll och fullständig artikelgranskning är separata begrepp. */
(function(){
 'use strict';
 const ledger=window.TIDENS_REVIEW_LEDGER;
 if(!ledger)return;
 const checksFor=id=>Array.isArray(ledger.claimChecks[id])?ledger.claimChecks[id]:[];
 const reviewedAsWhole=id=>Object.prototype.hasOwnProperty.call(ledger.completePostReviews,id);
 const statusFor=id=>reviewedAsWhole(id)?'full':checksFor(id).length?'partial':'pending';
 const statuses=Object.freeze({full:'Slutgranskad',partial:'Enskilda påståenden källprövade',pending:'Ingen registrerad källprövning'});
 const catalog=()=>{
   const unique=new Map();
   for(const e of [...events,...originalEvents]){
     if(e && typeof e.id==='string' && !unique.has(e.id)){
       unique.set(e.id,{id:e.id,title:e.title||e.id,original:!!e.original,status:statusFor(e.id),checks:checksFor(e.id).length});
     }
   }
   return [...unique.values()].sort((a,b)=>{
     const order={partial:0,full:1,pending:2};
     return order[a.status]-order[b.status]||a.title.localeCompare(b.title,'sv');
   });
 };
 const overall=()=>{
   const entries=catalog();
   return {
     total:entries.length,
     checkedPosts:entries.filter(e=>e.status==='partial').length,
     checkedClaims:entries.reduce((n,e)=>n+e.checks,0),
     fullReviews:entries.filter(e=>e.status==='full').length,
     pendingPosts:entries.filter(e=>e.status==='pending').length
   };
 };
 window.TidensKalloversikt=Object.freeze({catalog,overall,statusFor,statuses});

 const make=(tag,cls,text)=>{
   const e=document.createElement(tag);
   if(cls)e.className=cls;
   if(text!==undefined)e.textContent=text;
   return e;
 };
 function renderIndex(){
   const top=document.querySelector('#researchView .v82-top');
   if(!top)return;
   // Ett omrenderat forskningsbibliotek skapar sin egen uppdaterade översikt.
   top.querySelectorAll('.v836-index').forEach(n=>n.remove());
   const metrics=overall();
   const panel=make('details','v836-index');
   const header=make('summary','v836-index-summary', 'Granskningsöversikt – se status för alla poster');
   panel.append(header);
   const expl=make('p','v836-index-intro',
     'Detta är projektets redaktionella arbetsjournal, inte ett vetenskapligt intyg för posterna. En källa i en post innebär inte att påståendet har kontrollerats. Full granskning kräver dessutom kontroll av datering, alternativa tolkningar och forskning.');
   panel.append(expl);
   const stats=make('p','v836-index-metrics',
     metrics.total+' poster totalt · '+metrics.checkedClaims+' individuella påståenden källprövade i '+metrics.checkedPosts+' poster · '+metrics.fullReviews+' fullständigt slutgranskade · '+metrics.pendingPosts+' utan registrerad källprövning.');
   panel.append(stats);

   const controls=make('div','v836-index-controls');
   const label=make('label','','Sök post eller ID');
   const search=make('input');
   search.type='search';search.autocomplete='off';search.placeholder='T.ex. Göbekli Tepe, Babylon, H042';search.setAttribute('aria-label','Sök källgranskningsstatus');label.append(search);
   const selectLabel=make('label','','Visa granskningsstatus');
   const select=make('select');select.setAttribute('aria-label','Filtrera granskningsstatus');
   for(const [value,title] of [['all','Alla statusar'],['partial','Enskilda kontroller'],['pending','Ej källprövade'],['full','Fullständigt granskade']]){
     const o=make('option','',title);o.value=value;select.append(o);
   }
   selectLabel.append(select);
   controls.append(label,selectLabel);panel.append(controls);
   const info=make('div','v836-index-results');info.setAttribute('role','status');info.setAttribute('aria-live','polite');
   const list=make('ul','v836-index-list');
   const more=make('button','v836-index-more','Visa fler poster');
   more.type='button';
   panel.append(info,list,more);

   let limit=24;
   const renderRows=()=>{
     const q=search.value.trim().toLocaleLowerCase('sv');
     const filtered=catalog().filter(e=>(select.value==='all'||e.status===select.value) &&
       (!q || (e.title+' '+e.id).toLocaleLowerCase('sv').includes(q)));
     const shown=filtered.slice(0,limit);
     info.textContent=filtered.length ? 'Visar '+shown.length+' av '+filtered.length+' matchande poster.' : 'Inga poster matchar filtreringen.';
     list.replaceChildren();
     for(const e of shown){
       const li=make('li','v836-index-row');
       const open=make('button','v836-index-open',e.title+' · '+e.id);
       open.type='button';open.dataset.id=e.id;
       open.addEventListener('click',()=>setSelected(e.id));
       const state=make('span','v836-status v836-status-'+e.status,statuses[e.status] + (e.checks?' ('+e.checks+' påståenden)':''));
       li.append(open,state);
       list.append(li);
     }
     more.hidden=shown.length>=filtered.length;
   };
   search.addEventListener('input',()=>{limit=24;renderRows()});
   select.addEventListener('change',()=>{limit=24;renderRows()});
   more.addEventListener('click',()=>{limit+=24;renderRows()});
   renderRows();
   top.append(panel);
 }
 function extendClaimDetails(){
   const area=document.getElementById('detail');
   const item=idEvent(state.selected);
   if(!item || !area)return;
   const checks=checksFor(item.id);
   const nodes=area.querySelectorAll('.v834-claim');
   nodes.forEach((node,i)=>{
     const claim=checks[i];
     if(!claim||node.querySelector('.v836-source-classification'))return;
     const cls=make('p','v836-source-classification');
     const a=make('strong','','Påståendetyp: ');
     const val=make('span','',claim.claimType||'Inte klassificerad');
     const b=make('strong','',' · Källtyp: ');
     const src=make('span','',claim.sourceType||'Inte klassificerad');
     cls.append(a,val,b,src);
     node.prepend(cls);
   });
 }
 const oldResearch=renderResearch;
 renderResearch=function(){oldResearch();renderIndex()};
 const oldDetail=renderDetail;
 renderDetail=function(){oldDetail();extendClaimDetails()};
})();
