/* V8.59 revision – one common chronology, book lane is a category. */
(function(){
  const books=[...(window.TIDENS_BIBLE_BOOKS||[]),...(window.TIDENS_APOCRYPHA_BOOKS||[])];
  if(!books.length||typeof renderTimeline!=='function'||typeof state==='undefined')return;
  const CATEGORY='Bibelns böcker';
  const AP_CATEGORY='Apokryferna';
  const bookCategory=b=>b.apocryphal?AP_CATEGORY:CATEGORY;
  colors[CATEGORY]='#e3eef8';
  dark[CATEGORY]='#497baa';
  state.cat.add(CATEGORY);
  state.cat.add(AP_CATEGORY);
  colors[AP_CATEGORY]='#f3e7d8';dark[AP_CATEGORY]='#9c6736';
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
    const createCategory=(category)=>{
      const label=document.createElement('label');label.className='check';
      const input=document.createElement('input');input.type='checkbox';input.value=category;input.checked=state.cat.has(category);
      const dot=document.createElement('span');dot.className='dot';dot.style.background=dark[category];
      label.append(input,dot,document.createTextNode(category));filters.append(label);
      input.addEventListener('change',()=>{if(input.checked)state.cat.add(category);else state.cat.delete(category);renderAll()});
      return input;
    };
    toggle=createCategory(CATEGORY);
    createCategory(AP_CATEGORY);
    const makeOnly=(category,id,label)=>{
      const row=document.createElement('label');row.className='tv-only-filter';
      const input=document.createElement('input');input.type='checkbox';input.id=id;
      row.append(input,document.createTextNode(label));filters.append(row);
      return input;
    };
    const onlyBooks=makeOnly(CATEGORY,'tvOnlyBooks','Visa enbart Bibelns böcker');
    const onlyApocrypha=makeOnly(AP_CATEGORY,'tvOnlyApocrypha','Visa enbart apokryferna');
    let selectedOnly=null;
    function setOnly(category,enabled){
      if(enabled){
        if(!selectedOnly){savedCategories=new Set(state.cat);savedRange=[state.min,state.max]}
        selectedOnly=category;
        state.cat.clear();state.cat.add(category);
        state.min=-1000;state.max=150;
      }else if(selectedOnly===category){
        state.cat.clear();
        for(const value of savedCategories||[CATEGORY,AP_CATEGORY])state.cat.add(value);
        if(savedRange)[state.min,state.max]=savedRange;
        selectedOnly=null;savedCategories=null;savedRange=null;
      }
      onlyBooks.checked=selectedOnly===CATEGORY;
      onlyApocrypha.checked=selectedOnly===AP_CATEGORY;
      for(const input of filters.querySelectorAll('input[type="checkbox"]')){
        if(input.id!=='tvOnlyBooks'&&input.id!=='tvOnlyApocrypha')input.checked=state.cat.has(input.value);
      }
      renderAll();
    }
    onlyBooks.addEventListener('change',()=>setOnly(CATEGORY,onlyBooks.checked));
    onlyApocrypha.addEventListener('change',()=>setOnly(AP_CATEGORY,onlyApocrypha.checked));
  }
  function fmt(y){return y<0?Math.abs(y)+' f.Kr.':y+' e.Kr.'}
  // V8.82: render Bible books as ordinary chronological Gantt ROWS, not a separate lane.
  function unifiedChronologicalBooks(){
    const gantt=document.querySelector('#lanes .v828-gantt');
    if(!gantt)return false;
    gantt.querySelectorAll('.v882-bible-gantt-row').forEach(n=>n.remove());
    if(!state.cat.has(CATEGORY)&&!state.cat.has(AP_CATEGORY))return true;
    const query=(document.getElementById('search')?.value||'').toLocaleLowerCase('sv');
    const visible=books.filter(b=>state.cat.has(bookCategory(b))&&b.end>=state.min&&b.start<=state.max&&
      (!query||[b.id,b.title,b.genre,b.attributed,b.critical].join(' ').toLocaleLowerCase('sv').includes(query)));
    const years=Math.max(1,state.max-state.min);
    const starts=new Map(typeof v813Entries==='function'?v813Entries().map(e=>[e.id,e.start]):[]);
    for(const b of visible){
      const category=bookCategory(b),color=dark[category];
      const row=document.createElement('div');row.className='v828-gantt-row v882-bible-gantt-row';
      row.dataset.v828Id=b.id;row.dataset.v882Start=String(b.start);row.dataset.v891Category=category;
      const label=document.createElement('button');label.className='v828-gantt-label';label.type='button';
      label.title=b.title+' – föreslagen texttillkomst/redaktion';
      const mark=document.createElement('span');mark.className='v828-catmark';mark.style.background=color;
      const summary=document.createElement('span');const title=document.createElement('b');title.textContent=b.title;
      const subtitle=document.createElement('small');subtitle.textContent=category+' · texttillkomst';summary.append(title,subtitle);label.append(mark,summary);
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
    lanes.querySelectorAll('.tv-book-lane').forEach(n=>n.remove());
    if(unifiedChronologicalBooks())return;
    for(const cat of [CATEGORY,AP_CATEGORY]){
    if(!state.cat.has(cat))continue;
    const query=(document.getElementById('search')?.value||'').toLocaleLowerCase('sv');
    const shown=books.filter(b=>bookCategory(b)===cat&&b.end>=state.min&&b.start<=state.max&&(!query||[b.title,b.genre,b.attributed,b.critical].join(' ').toLocaleLowerCase('sv').includes(query)));
    // Reuse the native category presentation and fold logic rather than a book-only lane.
    const compact=v7Mode==='compact';
    const lane=document.createElement('section');
    lane.className=(compact?'v7group':'v813-chartgroup')+' v813-group v815-category tv-book-lane';
    lane.dataset.v815Category=cat;
    const folded=v815Collapsed.has(cat);
    lane.classList.toggle('v815-folded',folded);
    const head=document.createElement(compact?'div':'header');
    if(compact)head.className='v815-compact-header';
    const fold=document.createElement('button');fold.type='button';fold.className='v815-toggle';
    fold.setAttribute('aria-expanded',String(!folded));
    const chevron=document.createElement('span');chevron.className='v815-chevron';chevron.textContent=folded?'▸':'▾';
    const title=document.createElement('strong');title.textContent=cat;
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
      let label;
      if(compact){
        label=document.createElement('button');label.type='button';
        label.className='v813-list-item research v882-bible-card';
        label.dataset.tvBook=b.id;
        const name=document.createElement('strong');name.textContent=b.title;
        const dates=document.createElement('span');dates.textContent=fmt(b.start)+' – '+fmt(b.end);
        const note=document.createElement('small');note.textContent='Preliminär texttillkomst/redaktion';
        label.append(name,dates,note);
      }else{
        // Match native v813 rows: structural div, proportional line, positioned
        // clickable label and a separate date. A button as row breaks CSS layout.
        const row=document.createElement('div');row.className='v813-plotrow research v882-bible-card';
        row.dataset.tvBook=b.id;
        const plot=document.createElement('div');plot.className='v813-plotline';
        const lo=Math.max(b.start,state.min),hi=Math.min(b.end,state.max),span=Math.max(1,state.max-state.min);
        const x=Math.min(99.5,Math.max(0,(lo-state.min)/span*100));
        const width=Math.max(0,(hi-lo)/span*100);
        const bar=document.createElement('span');bar.className=width<.45?'v813-dot':'v813-range';
        bar.style.left=x+'%';if(width>=.45)bar.style.width=Math.max(.2,Math.min(width,100-x))+'%';
        bar.style.background=dark[cat];plot.append(bar);
        label=document.createElement('button');label.type='button';
        label.className='v884-book-label';label.textContent=b.title;label.dataset.tvBook=b.id;
        const date=document.createElement('span');date.className='v813-plotdate';
        date.textContent=fmt(b.start)+' – '+fmt(b.end);
        row.classList.add('v884-book-three-columns');
        row.append(label,plot,date);body.append(row);
      }
      label.title=b.title+' · preliminär texttillkomst/redaktion';
      label.addEventListener('click',()=>window.TidensOpenBookV858?.(b.id));
      if(compact)body.append(label);
    }
    lane.append(body);
    if(shown.length>entries.length){const more=document.createElement('p');more.className='tiny';more.textContent='Fler tider finns under Detaljerad tidslinje eller genom att välja ett snävare tidsintervall.';lane.append(more)}
    fold.addEventListener('click',()=>{
      if(v815Collapsed.has(cat))v815Collapsed.delete(cat);else v815Collapsed.add(cat);
      const closed=v815Collapsed.has(cat);lane.classList.toggle('v815-folded',closed);
      fold.setAttribute('aria-expanded',String(!closed));chevron.textContent=closed?'▸':'▾';action.textContent=closed?'Visa poster':'Fäll ihop';
      if(typeof v815EnhanceWithoutRerender==='function')v815EnhanceWithoutRerender();
    });
    const afterTextIndex=Object.keys(laneNames).indexOf('Bibeltext');
    const nextLane=afterTextIndex>=0?lanes.children[afterTextIndex+1]:null;
    lanes.insertBefore(lane,nextLane||null);
    }
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
  window.TidensBookTimelineV859=Object.freeze({count:books.length,category:CATEGORY,apocryphaCategory:AP_CATEGORY,apocryphaCount:books.filter(b=>b.apocryphal).length});
})();
