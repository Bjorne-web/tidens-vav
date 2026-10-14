/* V8.57 – independent biblical-book research lane, linked to composition studies. */
(function(){
  const books=window.TIDENS_BIBLE_BOOKS||[];
  if(!books.length)return;
  const css=document.createElement('style');css.textContent=`
  .tv-books{margin:20px 0;padding:18px;border:1px solid #d1dce7;border-radius:14px;background:#fff}
  .tv-books h3{margin:0 0 7px}.tv-books p{max-width:85ch}
  .tv-book-controls{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin:12px 0}
  .tv-book-controls input,.tv-book-controls select{padding:8px;border-radius:7px;border:1px solid #bfcbd5}
  .tv-book-list{display:grid;grid-template-columns:repeat(auto-fit,minmax(235px,1fr));gap:8px;max-height:390px;overflow:auto}
  .tv-book-item{display:flex;align-items:flex-start;gap:8px;text-align:left;padding:9px;border:1px solid #e2eaf0;border-radius:9px;background:#f9fbff;cursor:pointer}
  .tv-book-item:hover,.tv-book-item:focus-visible{outline:2px solid #547b9f}
  .tv-book-date{font-size:.75rem;opacity:.72;display:block}.tv-book-detail{margin:15px 0;padding:14px;background:#f4f7fb;border-radius:9px}
  .tv-book-detail dl{display:grid;grid-template-columns:9em 1fr;gap:7px}.tv-book-detail dt{font-weight:700}
  .tv-book-period{height:6px;background:#dfe6ed;border-radius:4px;overflow:hidden;margin-top:8px}
  .tv-book-period span{display:block;height:100%;background:#58799b}
  @media(max-width:650px){.tv-book-detail dl{grid-template-columns:1fr}.tv-books{padding:11px}}
  `;document.head.append(css);
  function render(){
    const host=document.getElementById('timelineView');if(!host)return;
    let section=document.getElementById('tvBiblicalBooks');
    if(!section){
      section=document.createElement('section');section.id='tvBiblicalBooks';section.className='tv-books';
      host.append(section);
      section.innerHTML=`<h3>Bibelns böcker – textens tillkomst</h3><p>66 böcker i den protestantiska kanon. Dateringarna nedan är <b>preliminära forskningsintervall för texternas tillkomst eller redaktion</b>, inte datum för händelser i berättelserna. Traditionell författartillskrivning skiljs från historisk-kritisk bedömning. Inga av dessa bokposter är slutgranskade.</p><div class="tv-book-controls"><label><input type="checkbox" id="tvBookVisible" checked> Visa bokkategorin</label><select id="tvBookTestament"><option value="Alla">GT och NT</option><option>GT</option><option>NT</option></select><input id="tvBookQuery" placeholder="Sök bibelbok…" aria-label="Sök bibelböcker" /></div><div id="tvBookList" class="tv-book-list"></div><div id="tvBookDetail" class="tv-book-detail" hidden></div><p class="small">Hitta historiska händelser i de vanliga tidslinjeposterna. Utforska parallella textlager under <button type="button" id="tvBookFormation">Textens tillkomst ↗</button>.</p>`;
      section.querySelector('#tvBookVisible').addEventListener('change',update);
      section.querySelector('#tvBookTestament').addEventListener('change',update);
      section.querySelector('#tvBookQuery').addEventListener('input',update);
      section.querySelector('#tvBookFormation').addEventListener('click',()=>{if(typeof view==='function')view('formation')});
    }
    update();
  }
  function update(){
    const section=document.getElementById('tvBiblicalBooks');if(!section)return;
    const show=section.querySelector('#tvBookVisible').checked;
    const list=section.querySelector('#tvBookList');
    const detail=section.querySelector('#tvBookDetail');
    list.hidden=!show;if(!show){detail.hidden=true;return;}
    const test=section.querySelector('#tvBookTestament').value;
    const q=section.querySelector('#tvBookQuery').value.toLocaleLowerCase('sv');
    const selected=books.filter(b=>(test==='Alla'||b.testament===test)&&b.title.toLocaleLowerCase('sv').includes(q));
    const format=n=>n<0?Math.abs(n)+' f.Kr.':n+' e.Kr.';
    list.replaceChildren();
    for(const b of selected){
      const button=document.createElement('button');button.type='button';button.className='tv-book-item';
      const begin=Number.isFinite(b.start)?format(b.start):'oklar',end=Number.isFinite(b.end)?format(b.end):'oklar';
      const min=-1000,max=150,at=Math.max(0,Math.min(100,((b.start-min)/(max-min))*100)),len=Math.max(2,Math.min(100-at,((b.end-b.start)/(max-min))*100));
      button.innerHTML=`<span><b>${b.title}</b><span class="tv-book-date">${begin} – ${end} · ${b.genre} · preliminärt</span><span class="tv-book-period"><span style="width:${len}%;margin-left:${at}%"></span></span></span>`;
      button.addEventListener('click',()=>{detail.hidden=false;detail.replaceChildren();const h=document.createElement('h4');h.textContent=b.title;detail.append(h);const dl=document.createElement('dl');for(const [key,value] of [['Kategori',b.testament+' · '+b.genre],['Traditionell tillskrivning',b.attributed],['Forskningens diskussion',b.critical],['Föreslagen texttillkomst',begin+' – '+end],['Berättad tid',b.narrativeTime],['Status','Preliminär forskningspost; full källgranskning återstår']]){const dt=document.createElement('dt');dt.textContent=key;const dd=document.createElement('dd');dd.textContent=value;dl.append(dt,dd);}detail.append(dl);const profile=window.TIDENS_BIBLE_BOOK_RESEARCH?.[b.id];if(profile){const p=document.createElement('p');p.textContent='Forskningsfördjupning ('+profile.status+'): '+profile.composition+' Kontext: '+profile.context;detail.append(p);const ul=document.createElement('ul');for(const source of profile.sources){const li=document.createElement('li'),a=document.createElement('a');a.href=source.url;a.target='_blank';a.rel='noopener noreferrer';a.textContent=source.title;li.append(a);ul.append(li);}detail.append(ul);}else{const p=document.createElement('p');p.textContent='Individuell källgranskning och fullständig forskningspost återstår.';detail.append(p);}});
      list.append(button);
    }
    if(!selected.length)list.textContent='Ingen bok matchar sökningen.';
  }
  if(typeof renderTimeline==='function'){const previous=renderTimeline;renderTimeline=function(){previous();render()}}
  render();
})();
