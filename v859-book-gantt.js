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
  // V8.82: render Bible books as ordinary chronological Gantt ROWS, not a separate lane.
  function unifiedChronologicalBooks(){
    const gantt=document.querySelector('#lanes .v828-gantt');
    if(!gantt)return false;
    gantt.querySelectorAll('.v882-bible-gantt-row').forEach(n=>n.remove());
    if(!state.cat.has(CATEGORY))return true;
    const query=(document.getElementById('search')?.value||'').toLocaleLowerCase('sv');
    const visible=books.filter(b=>b.end>=state.min&&b.start<=state.max&&
      (!query||[b.id,b.title,b.genre,b.attributed,b.critical].join(' ').toLocaleLowerCase('sv').includes(query)));
    const years=Math.max(1,state.max-state.min);
    const starts=new Map(typeof v813Entries==='function'?v813Entries().map(e=>[e.id,e.start]):[]);
    const color=dark[CATEGORY];
    for(const b of visible){
      const row=document.createElement('div');row.className='v828-gantt-row v882-bible-gantt-row';
      row.dataset.v828Id=b.id;row.dataset.v882Start=String(b.start);
      const label=document.createElement('button');label.className='v828-gantt-label';label.type='button';
      label.title=b.title+' – föreslagen texttillkomst/redaktion';
      const mark=document.createElement('span');mark.className='v828-catmark';mark.style.background=color;
      const summary=document.createElement('span');const title=document.createElement('b');title.textContent=b.title;
      const subtitle=document.createElement('small');subtitle.textContent='Bibelns böcker · texttillkomst';summary.append(title,subtitle);label.append(mark,summary);
      const track=document.createElement('div');track.className='v828-gantt-track';track.setAttribute('role','img');
      track.setAttribute('aria-label',b.title+': preliminär texttillkomst '+fmt(b.start)+' – '+fmt(b.end));
      const left=Math.max(0,(Math.max(state.min,b.start)-state.min)/years*100);
      const right=Math.min(state.max,b.end);const width=Math.max(0,(right-Math.max(state.min,b.start))/years*100);
      const bar=document.createElement('span');bar.className=width<.27?'v828-point':'v828-period';
      bar.style.left=left+'%';bar.style.background=color;if(width>=.27)bar.style.width=Math.min(width,100-left)+'%';
      bar.title='Preliminärt intervall för textens tillkomst/redaktion – inte berättad tid';track.append(bar);
      const date=document.createElement('button');date.className='v828-gantt-date';date.type='button';
      date.textContent=fmt(b.start)+' – '+fmt(b.end);
      const open=()=>window.TidensOpenBookV858?.(b.id);
      label.addEventListener('click',open);date.addEventListener('click',open);
      row.append(label,track,date);gantt.append(row);starts.set(b.id,b.start);
    }
    const rows=[...gantt.querySelectorAll('.v828-gantt-row')];
    rows.sort((a,b)=>(starts.get(a.dataset.v828Id)??0)-(starts.get(b.dataset.v828Id)??0));
    rows.forEach(n=>gantt.append(n));
    const empty=gantt.querySelector('.empty');if(rows.length&&empty)empty.remove();
    return true;
  }
  function renderLane(){
    installFilter();
    const lanes=document.getElementById('lanes');if(!lanes)return;
    lanes.querySelector('.tv-book-lane')?.remove();
    if(unifiedChronologicalBooks())return;
    if(!state.cat.has(CATEGORY))return;
    const query=(document.getElementById('search')?.value||'').toLocaleLowerCase('sv');
    const shown=books.filter(b=>b.end>=state.min&&b.start<=state.max&&(!query||[b.title,b.genre,b.attributed,b.critical].join(' ').toLocaleLowerCase('sv').includes(query)));
    const lane=document.createElement('div');lane.className='lane tv-book-lane';
    const head=document.createElement('div');head.className='lanehead';head.textContent=CATEGORY;
    head.style.borderLeft='4px solid '+dark[CATEGORY];
    // Category mode uses the same individually labeled, proportional Gantt rows
    // as chronological mode. Never draw the old overlaid book-band diagram.
    const panel=document.createElement('div');panel.className='v828-gantt v882-bible-category-gantt';
    const span=Math.max(1,state.max-state.min);
    for(const b of shown.sort((a,b)=>a.start-b.start||a.end-b.end)){
      const row=document.createElement('div');row.className='v828-gantt-row v882-bible-gantt-row';
      row.dataset.v828Id=b.id;
      const label=document.createElement('button');label.type='button';label.className='v828-gantt-label';
      const colorMark=document.createElement('span');colorMark.className='v828-catmark';colorMark.style.background=dark[CATEGORY];
      const labelCopy=document.createElement('span');
      const title=document.createElement('b');title.textContent=b.title;
      const sub=document.createElement('small');sub.textContent='Bibelns böcker · texttillkomst';
      labelCopy.append(title,sub);label.append(colorMark,labelCopy);
      const track=document.createElement('div');track.className='v828-gantt-track';track.setAttribute('role','img');
      track.setAttribute('aria-label',b.title+': preliminär texttillkomst '+fmt(b.start)+' – '+fmt(b.end));
      const start=Math.max(state.min,b.start),end=Math.min(state.max,b.end);
      const left=Math.max(0,(start-state.min)/span*100),width=Math.max(0,(end-start)/span*100);
      const bar=document.createElement('span');bar.className=width<.27?'v828-point':'v828-period';
      bar.style.left=left+'%';bar.style.background=dark[CATEGORY];
      if(width>=.27)bar.style.width=Math.min(width,100-left)+'%';
      bar.title='Preliminärt intervall för textens tillkomst/redaktion, inte berättad tid';
      track.append(bar);
      const date=document.createElement('button');date.type='button';date.className='v828-gantt-date';
      date.textContent=fmt(b.start)+' – '+fmt(b.end);
      const open=()=>window.TidensOpenBookV858?.(b.id);
      label.addEventListener('click',open);date.addEventListener('click',open);
      row.append(label,track,date);panel.append(row);
    }
    if(!shown.length){const empty=document.createElement('div');empty.className='empty';empty.textContent='Inga bibelböcker inom det valda tidsintervallet';panel.append(empty)}
    lane.append(head,panel);
    const afterTextIndex=Object.keys(laneNames).indexOf('Bibeltext');
    const nextLane=afterTextIndex>=0?lanes.children[afterTextIndex+1]:null;
    lanes.insertBefore(lane,nextLane||null);
  }
  // Keep the guide lines of EVERY timeline lane aligned with calendar years.
  function syncGuideLines(){
    const span=Math.max(1,state.max-state.min);
    const step=span>5000?2000:span>1800?500:span>700?200:span>250?100:span>100?50:25;
    document.querySelectorAll('#lanes .lane:not(.tv-book-lane) .laneplot').forEach(plot=>{
      plot.querySelector('.tv-calendar-guide')?.remove();
      plot.style.backgroundImage='none';
      const guide=document.createElement('div');
      guide.className='tv-calendar-guide';
      guide.style.cssText='position:absolute;inset:0;pointer-events:none;';
      for(let y=Math.ceil(state.min/step)*step;y<=state.max;y+=step){
        const line=document.createElement('span');
        line.style.cssText='position:absolute;top:0;bottom:0;width:1px;background:rgba(34,62,97,.10);left:'+((y-state.min)/span*100)+'%;pointer-events:none;';
        guide.append(line);
      }
      plot.prepend(guide);
    });
  }
  const previous=renderTimeline;
  renderTimeline=function(){previous();renderLane();syncGuideLines()};
  renderLane();syncGuideLines();
  window.TidensBookTimelineV859=Object.freeze({count:books.length,category:CATEGORY});
})();
