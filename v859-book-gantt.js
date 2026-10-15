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
  #lanes .tv-book-lane{display:block;grid-template-columns:none}
  #lanes .tv-book-lane .v882-bible-category-gantt{min-width:0;max-width:100%;overflow:hidden}
  #lanes .tv-book-lane .v882-bible-category-gantt .v828-gantt-row{width:100%;box-sizing:border-box}

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
    // Reuse the native category presentation and fold logic rather than a book-only lane.
    const compact=v7Mode==='compact';
    const lane=document.createElement('section');
    lane.className=(compact?'v7group':'v813-chartgroup')+' v813-group v815-category tv-book-lane';
    lane.dataset.v815Category=CATEGORY;
    const folded=v815Collapsed.has(CATEGORY);
    lane.classList.toggle('v815-folded',folded);
    const head=document.createElement(compact?'div':'header');
    if(compact)head.className='v815-compact-header';
    const fold=document.createElement('button');fold.type='button';fold.className='v815-toggle';
    fold.setAttribute('aria-expanded',String(!folded));
    const chevron=document.createElement('span');chevron.className='v815-chevron';chevron.textContent=folded?'▸':'▾';
    const title=document.createElement('strong');title.textContent=CATEGORY;
    const count=document.createElement('span');count.className='v815-count';count.textContent=shown.length+' '+(shown.length===1?'post':'poster');
    const action=document.createElement('span');action.className='v815-action';action.textContent=folded?'Visa poster':'Fäll ihop';
    fold.append(chevron,title,count,action);head.append(fold);lane.append(head);
    const summaryEntries=shown.map(b=>({start:b.start,end:b.end}));
    if(summaryEntries.length&&typeof v815RenderCategorySummary==='function'){
      const summary=document.createElement('div');
      summary.innerHTML=v815RenderCategorySummary(summaryEntries,Object.keys(laneNames).length);
      lane.append(...summary.children);
    }
    const body=document.createElement('div');body.className=compact?'v813-cardgrid':'v813-chartrows';
    body.id='v882-bible-category-body';fold.setAttribute('aria-controls',body.id);
    const entries=compact?(typeof v813Pick==='function'?v813Pick(shown,8):shown.slice(0,8)):shown;
    for(const b of entries){
      const label=document.createElement('button');label.type='button';
      label.className=compact?'v813-list-item research v882-bible-card':'v813-plotrow v882-bible-card';
      label.dataset.tvBook=b.id;
      if(compact){
        const name=document.createElement('strong');name.textContent=b.title;
        const dates=document.createElement('span');dates.textContent=fmt(b.start)+' – '+fmt(b.end);
        const note=document.createElement('small');note.textContent='Preliminär texttillkomst/redaktion';
        label.append(name,dates,note);
      }else{
        const plot=document.createElement('div');plot.className='v813-plotline';
        const lo=Math.max(b.start,state.min),hi=Math.min(b.end,state.max),span=Math.max(1,state.max-state.min);
        const x=Math.max(0,(lo-state.min)/span*100),width=Math.max(0,(hi-lo)/span*100);
        const bar=document.createElement('span');bar.className=width<.45?'v813-dot':'v813-range';
        bar.style.left=x+'%';if(width>=.45)bar.style.width=Math.min(width,100-x)+'%';
        bar.style.background=dark[CATEGORY];plot.append(bar);
        const labelText=document.createElement('span');labelText.className='v813-plotlabel';
        labelText.textContent=b.title+' · '+fmt(b.start)+' – '+fmt(b.end);
        label.append(plot,labelText);
      }
      label.title=b.title+' · preliminär texttillkomst/redaktion';
      label.addEventListener('click',()=>window.TidensOpenBookV858?.(b.id));body.append(label);
    }
    lane.append(body);
    if(shown.length>entries.length){const more=document.createElement('p');more.className='tiny';more.textContent='Fler tider finns under Detaljerad tidslinje eller genom att välja ett snävare tidsintervall.';lane.append(more)}
    fold.addEventListener('click',()=>{
      if(v815Collapsed.has(CATEGORY))v815Collapsed.delete(CATEGORY);else v815Collapsed.add(CATEGORY);
      const closed=v815Collapsed.has(CATEGORY);lane.classList.toggle('v815-folded',closed);
      fold.setAttribute('aria-expanded',String(!closed));chevron.textContent=closed?'▸':'▾';action.textContent=closed?'Visa poster':'Fäll ihop';
      if(typeof v815EnhanceWithoutRerender==='function')v815EnhanceWithoutRerender();
    });
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
