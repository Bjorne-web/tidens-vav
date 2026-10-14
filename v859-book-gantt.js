/* V8.59 revision – one common chronology, book lane is a category. */
(function(){
  const books=window.TIDENS_BIBLE_BOOKS||[];
  if(!books.length||typeof renderTimeline!=='function'||typeof state==='undefined')return;
  const CATEGORY='Bibelns böcker';
  colors[CATEGORY]='#e3eef8';
  dark[CATEGORY]='#497baa';
  state.cat.add(CATEGORY);
  let savedCategories=null,savedRange=null;
  const style=document.createElement('style');
  style.textContent=`
  #tvBiblicalBooks,#tvBooksGantt{display:none!important}
  #lanes .tv-book-lane .lanehead{border-left-color:#497baa!important}
  .tv-book-band{position:absolute;top:0;height:5px;border-radius:3px;background:#86accf}
  .tv-book-end{position:absolute;top:-4px;height:13px;min-width:5px;border-radius:6px;background:#497baa;opacity:.8;border:1px dashed #254b6e}
  .tv-book-hit{position:absolute;top:0;height:22px;background:transparent;border:0;cursor:pointer}
  .tv-book-hit:focus-visible{outline:3px solid #285da0;outline-offset:2px}
  .tv-book-label{font-size:12px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;position:absolute;left:0;top:8px;max-width:100%;pointer-events:none;color:#264966}
  .tv-book-row{position:absolute;height:26px;left:0;right:0}
  .tv-book-legend{grid-column:1/-1;padding:7px 10px;font-size:.75rem;color:#4a6680}
  .tv-only-filter{display:inline-flex;gap:6px;align-items:center;padding:3px 6px;border:1px solid #cbd9e6;border-radius:6px}
  `;document.head.append(style);
  const filters=document.getElementById('catFilters');
  let toggle=null;
  function installFilter(){
    if(!filters||toggle)return;
    const label=document.createElement('label');label.className='check';
    toggle=document.createElement('input');toggle.type='checkbox';toggle.value=CATEGORY;toggle.checked=true;
    const dot=document.createElement('span');dot.className='dot';dot.style.background=dark[CATEGORY];
    label.append(toggle,dot,document.createTextNode(CATEGORY));filters.append(label);
    toggle.addEventListener('change',()=>{if(toggle.checked)state.cat.add(CATEGORY);else state.cat.delete(CATEGORY);renderAll()});
    const onlyLabel=document.createElement('label');onlyLabel.className='tv-only-filter';
    const only=document.createElement('input');only.type='checkbox';only.id='tvOnlyBooks';
    onlyLabel.append(only,document.createTextNode('Visa enbart Bibelns böcker'));
    filters.append(onlyLabel);
    only.addEventListener('change',()=>{
      if(only.checked){
        savedCategories=new Set(state.cat);savedRange=[state.min,state.max];
        state.cat.clear();state.cat.add(CATEGORY);toggle.checked=true;
        state.min=-1000;state.max=150;
      }else{
        if(savedCategories){state.cat.clear();for(const c of savedCategories)state.cat.add(c)}
        if(savedRange){[state.min,state.max]=savedRange}
        toggle.checked=state.cat.has(CATEGORY);savedCategories=null;savedRange=null;
      }
      for(const input of filters.querySelectorAll('input[type="checkbox"]')){
        if(input.id!=='tvOnlyBooks')input.checked=state.cat.has(input.value);
      }
      renderAll();
    });
  }
  function fmt(y){return y<0?Math.abs(y)+' f.Kr.':y+' e.Kr.'}
  function renderLane(){
    installFilter();
    const lanes=document.getElementById('lanes');if(!lanes)return;
    lanes.querySelector('.tv-book-lane')?.remove();
    if(!state.cat.has(CATEGORY))return;
    const query=(document.getElementById('search')?.value||'').toLocaleLowerCase('sv');
    const shown=books.filter(b=>b.end>=state.min&&b.start<=state.max&&(!query||[b.title,b.genre,b.attributed,b.critical].join(' ').toLocaleLowerCase('sv').includes(query)));
    const lane=document.createElement('div');lane.className='lane tv-book-lane';
    const head=document.createElement('div');head.className='lanehead';head.textContent=CATEGORY;
    head.style.borderLeft='4px solid '+dark[CATEGORY];
    const plot=document.createElement('div');plot.className='laneplot';plot.style.position='relative';
    const viewSpan=Math.max(1,state.max-state.min),slots=[];
    // The grid follows calendar years, not fixed 100px screen positions.
    plot.style.backgroundImage='none';
    const grid=document.createElement('div');
    grid.className='tv-book-time-grid';
    grid.style.cssText='position:absolute;inset:0;pointer-events:none;z-index:0;';
    const step=viewSpan>5000?2000:viewSpan>1800?500:viewSpan>700?200:viewSpan>250?100:viewSpan>100?50:25;
    for(let year=Math.ceil(state.min/step)*step;year<=state.max;year+=step){
      const tick=document.createElement('span');
      tick.className='tv-book-yearline';
      tick.style.cssText='position:absolute;top:0;bottom:0;width:1px;background:rgba(34,62,97,.12);left:'+((year-state.min)/viewSpan*100)+'%;pointer-events:none;';
      tick.dataset.year=String(year);
      grid.append(tick);
    }
    plot.append(grid);
    for(const b of shown.sort((a,b)=>a.start-b.start)){
      const start=Math.max(b.start,state.min),end=Math.min(b.end,state.max);
      const x=Math.max(0,(start-state.min)/viewSpan*100);
      const duration=Math.max(.15,(end-start)/viewSpan*100);
      const visualWidth=Math.min(100-x,Math.max(duration,Math.min(26,2200/viewSpan)));
      if(visualWidth<=0)continue;
      let slot=0;while(slots[slot]!==undefined&&x<slots[slot]+1.5)slot++;
      slots[slot]=x+visualWidth;
      const row=document.createElement('div');row.className='tv-book-row';row.style.top=(8+slot*32)+'px';
      const line=document.createElement('span');line.className='tv-book-band';line.style.left=x+'%';line.style.width=visualWidth+'%';
      const endMarker=document.createElement('span');endMarker.className='tv-book-end';
      endMarker.style.left=Math.max(0,x+visualWidth-0.75)+'%';endMarker.style.width='0.75%';
      endMarker.title='Övre gräns i ett preliminärt dateringsintervall – inte belagt datum för fastställande';
      const hit=document.createElement('button');hit.type='button';hit.className='tv-book-hit';
      hit.dataset.tvBook=b.id;hit.style.left=x+'%';hit.style.width=visualWidth+'%';
      hit.addEventListener('click',e=>{
        e.stopPropagation();
        if(typeof window.TidensOpenBookV858==='function')window.TidensOpenBookV858(b.id);
      });
      hit.setAttribute('aria-label',b.title+', föreslagen tillkomst '+fmt(b.start)+' – '+fmt(b.end));
      hit.title=b.title+' · preliminär texttillkomst '+fmt(b.start)+'–'+fmt(b.end);
      const title=document.createElement('span');title.className='tv-book-label';title.textContent=b.title;
      title.style.left=x+'%';title.style.top='12px';title.style.maxWidth=Math.max(8,100-x)+'%';
      row.append(line,endMarker,hit,title);plot.append(row);
    }
    plot.style.height=Math.max(90,15+Math.max(1,slots.length)*32)+'px';
    if(!shown.length){const e=document.createElement('div');e.className='empty';e.textContent='Inga bibelböcker inom det valda tidsintervallet';plot.append(e)}
    lane.append(head,plot);
    const legend=document.createElement('div');legend.className='tv-book-legend';
    legend.textContent='Tunt band = preliminärt tillkomst-/redaktionsintervall. Mörk markering = intervallets osäkra slutgräns, inte ett fastställelsedatum. Klicka på bandet för forskningsposten.';
    lane.append(legend);
    const afterTextIndex=Object.keys(laneNames).indexOf('Bibeltext');
    const nextLane=afterTextIndex>=0?lanes.children[afterTextIndex+1]:null;
    lanes.insertBefore(lane,nextLane||null);
  }
  const previous=renderTimeline;
  renderTimeline=function(){previous();renderLane()};
  renderLane();
  window.TidensBookTimelineV859=Object.freeze({count:books.length,category:CATEGORY});
})();
