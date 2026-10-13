
const colors={"Historia":"#dfeaf7","Religion & texter":"#ede4f7","Bibelberättelse":"#fde5d6","Bibeltext":"#f9dfe6","Arkeologi":"#def1df"};
const dark={"Historia":"#6d93c6","Religion & texter":"#8b70bf","Bibelberättelse":"#d88455","Bibeltext":"#bf6e86","Arkeologi":"#5a9c63"};
const laneNames={"Historia":"Världshistoria","Religion & texter":"Religion & texter","Bibelberättelse":"Bibelberättelser – berättad tid","Bibeltext":"Textens tillkomst","Arkeologi":"Arkeologi","Folk":"Folk","Människans utveckling":"Människans utveckling","Civilisation":"Civilisationer","Religion":"Religioner","Byggnadsverk":"Byggnadsverk","Krig":"Krig","Konflikterande berättelser":"Historiska och religiösa berättelser","Bibelberättelser":"Bibelberättelser"};
const periods=[["Antiken / Bibeln",-10000,150],["10 000–2000 f.Kr.",-10000,-2000],["3000–1000 f.Kr.",-3000,-1000],["1500–500 f.Kr.",-1500,-500],["700–100 f.Kr.",-700,-100],["200 f.Kr.–150 e.Kr.",-200,150],["Senare historia",100,2025],["Människans ursprung",-3900000,-10000],["Hela materialet",-3900000,2025]];
const eras=[["Förhistorisk tid",-10000,-3300,"#f1ebdd"],["Bronsålder",-3300,-1200,"#dcefdc"],["Järnålder",-1200,-586,"#dcebf5"],["Babylon/Persien",-586,-332,"#e8def5"],["Hellenistisk",-332,-63,"#e9eef8"],["Romersk",-63,150,"#f7dee2"]];
/* Data: events finns i data/data.generated.js */
/* Data: research finns i data/data.generated.js */
/* Data: geo finns i data/data.generated.js */
/* Data: originalEvents finns i data/data.generated.js */
/* Data: bibleOriginal finns i data/data.generated.js */
let compareIds=[];
let playTimer=null;
let state={view:'timeline',min:-10000,max:150,mapYear:-600,cat:new Set(Object.keys(laneNames)),ev:new Set(['Hög','Medel','Låg','Osäker','Ej granskad']),selected:'H005'};
const el=id=>document.getElementById(id);
function fmt(y){if(y===null||y===undefined||!Number.isFinite(y))return 'Okänd tid';return y<0?`${Math.abs(y)} f.Kr.`:y>0?`${y} e.Kr.`:'1 f.Kr./e.Kr.'}
function enc(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function idEvent(id){return events.find(e=>e.id===id)||originalEvents.find(e=>e.id===id)}
function matches(e){const q=el('search').value.toLocaleLowerCase('sv');return state.cat.has(e.category)&&state.ev.has(e.evidence)&&(!q||[e.title,e.description,e.bible,e.dating,e.category,e.id].join(' ').toLocaleLowerCase('sv').includes(q))&&(e.end>=state.min&&e.start<=state.max)}
function checkboxSet(container,values,set,loc){el(container).innerHTML=values.map(v=>`<label class="check"><input type="checkbox" value="${enc(v)}" ${set.has(v)?'checked':''}><span class="dot" style="background:${loc==='cat'?(dark[v]||'#777'):({'Hög':'#279367','Medel':'#d69c2c','Låg':'#dd6d49','Osäker':'#9da7b4','Ej granskad':'#d18a50'}[v])}"></span>${enc(v)}</label>`).join('');el(container).querySelectorAll('input').forEach(i=>i.addEventListener('change',()=>{if(i.checked)set.add(i.value);else set.delete(i.value);renderAll()}))}
function color(cat){return colors[cat]||'#eff2f6'}
function view(v){state.view=v;['timeline','records','compare','map','parallels','archive','about'].forEach(name=>{el(name+'View').classList.toggle('hidden',name!==v);el('nav'+name[0].toUpperCase()+name.slice(1)).classList.toggle('active',name===v)});renderAll()}
function setSelected(id){state.selected=id;renderDetail();renderRecords();renderCompare();if(state.view==='map')renderMap();renderParallels();renderArchive();updateMini()}
function updateMini(){const e=idEvent(state.selected)||events[0];el('selectedMini').textContent=e?`${e.id} · ${e.title}`:'–'}
function clamp(n,min,max){return Math.max(min,Math.min(max,n))}
function normalizeRange(){if(state.min>state.max){let t=state.min;state.min=state.max;state.max=t;}state.min=clamp(state.min,-3900000,2025);state.max=clamp(state.max,-3900000,2025)}
function renderTimeline(){const filtered=events.filter(matches);el('visible').textContent=`${filtered.length} av ${events.length} forskningsposter visas`;const span=state.max-state.min||1;const steps=span>5000?2000:span>1800?500:span>700?200:span>250?100:span>100?50:25;let ticks=[];for(let y=Math.ceil(state.min/steps)*steps;y<=state.max;y+=steps)ticks.push({y,p:(y-state.min)/span*100});el('axis').innerHTML=ticks.map(t=>`<span class="tick" style="left:${t.p}%">${fmt(t.y)}</span>`).join('');el('epochs').innerHTML=eras.filter(a=>a[2]>=state.min&&a[1]<=state.max).map(a=>{const left=Math.max(state.min,a[1]),right=Math.min(state.max,a[2]);return `<div class="epoch" style="width:${(right-left)/span*100}%;background:${a[3]}" title="${enc(a[0])}">${enc(a[0])}</div>`}).join('');let lanes='';for(const [cat,label] of Object.entries(laneNames)){const ee=filtered.filter(e=>e.category===cat).sort((a,b)=>a.start-b.start);let slots=[],bars='';for(const e of ee){let s=Math.max(e.start,state.min),end=Math.min(e.end,state.max);let x=(s-state.min)/span*100;let realWidth=Math.max(1,(end-s)/span*100);let width=Math.max(7,Math.min(42,realWidth));x=Math.min(x,100-width);let slot=0;while(slots[slot]!=null&&x<slots[slot]+1.8)slot++;slots[slot]=x+width;const uncertain=/hypotetisk|berättad tid/i.test(e.dating);bars+=`<button class="event ${uncertain?'uncertain':''} ${e.id===state.selected?'selected':''}" data-id="${e.id}" style="left:${x}%;width:${width}%;top:${9+slot*32}px;background:${color(cat)};border-left:4px solid ${dark[cat]};z-index:${8-slot}" title="${enc(e.title)} · ${fmt(e.start)}–${fmt(e.end)}">${enc(e.title)}</button>`}const ht=Math.max(90,(slots.length||1)*32+15);lanes+=`<div class="lane"><div class="lanehead" style="border-left:4px solid ${dark[cat]}">${label}</div><div class="laneplot" style="height:${ht}px">${bars||'<div class="empty">Inga poster i valt intervall</div>'}</div></div>`}el('lanes').innerHTML=lanes;el('lanes').querySelectorAll('.event').forEach(b=>b.onclick=()=>setSelected(b.dataset.id))}
function renderRecords(){const filtered=events.filter(matches).sort((a,b)=>a.start-b.start);el('recordsView').innerHTML=`<div class="toolbar"><div><div class="small">VY · FORSKNINGSPOSTER</div><div class="range">${filtered.length} poster i urvalet</div></div><div class="small">Klicka på en post för att läsa i högerpanelen eller lägg till i jämförelse.</div></div><div class="tablelist">${filtered.map(e=>`<div class="rowcard"><div><div class="kicker">${enc(e.category)} · ${enc(e.id)}</div><h4>${enc(e.title)}</h4><div class="rowmeta">${fmt(e.start)} – ${fmt(e.end)} · ${enc(e.dating)} · Evidens: ${enc(e.evidence)}</div><div>${enc(e.description)}</div><div class="small" style="margin-top:7px"><b>Bibelkoppling:</b> ${enc(e.bible||'Ej angiven')}</div></div><div class="rowactions"><button data-read="${e.id}">Läs</button><button data-compare="${e.id}">${compareIds.includes(e.id)?'I jämförelse':'Jämför'}</button></div></div>`).join('')}</div>`;el('recordsView').querySelectorAll('[data-read]').forEach(b=>b.onclick=()=>setSelected(b.dataset.read));el('recordsView').querySelectorAll('[data-compare]').forEach(b=>b.onclick=()=>toggleCompare(b.dataset.compare))}
function toggleCompare(id){if(compareIds.includes(id))compareIds=compareIds.filter(x=>x!==id); else {if(compareIds.length>=4)compareIds.shift();compareIds.push(id);} renderCompare();renderRecords();}
function renderCompare(){const selected=compareIds.map(idEvent).filter(Boolean);const suggestions=[["Flodtraditionerna",['H004','H005','H020']],["Moseböckernas tillkomst",['H019','H020','H021']],["Jesus och evangelierna",['H027','H029','H031','H033']],["Kungariken & imperier",['H014','H015','H017','H026']]];el('compareView').innerHTML=`<div class="footcard" style="margin-bottom:14px"><h3>Jämför historiska skeenden och texttraditioner</h3><p>Välj två till fyra poster och klicka på en av dem för att läsa fördjupningen i högerpanelen. I kartvyn markeras den valda posten geografiskt när det finns geodata.</p><div class="compare-toolbar">${suggestions.map(([name,ids],i)=>`<button data-pack="${i}">${enc(name)}</button>`).join('')}<button id="clearCompare">Rensa urval</button></div><div class="small" style="margin-top:8px">Aktuellt urval: ${selected.length?selected.map(e=>enc(e.id)).join(', '):'Inget valt ännu.'}</div></div>${!selected.length?'<div class="empty">Ingen post vald ännu. Lägg till från Poster, Tidslinje eller snabburvalen ovan.</div>':`<div class="compare-grid">${selected.map(e=>`<div class="compare-card ${e.id===state.selected?'active-reading':''}" style="border-top:4px solid ${dark[e.category]||'#718096'}"><div class="kicker">${enc(e.category)} · ${enc(e.id)}</div><h3><button data-read="${e.id}">${enc(e.title)} ↗</button></h3><div class="compare-meta"><b>Period:</b> ${fmt(e.start)} – ${fmt(e.end)}</div><div class="compare-meta"><b>Evidens:</b> ${enc(e.evidence)}</div><div class="compare-meta"><b>Dateringsslag:</b> ${enc(e.dating)}</div><p>${enc(e.description)}</p><p><b>Bibelkoppling:</b> ${enc(e.bible||'Ej angiven')}</p><div><button class="reader-button" data-read="${e.id}">Läs i högerpanelen →</button> <button class="compare-link" data-remove="${e.id}">Ta bort</button></div></div>`).join('')}</div><div class="compare-section"><h3>Jämförelsetabell</h3><div style="overflow-x:auto"><table class="compare-table"><thead><tr><th>Aspekt</th>${selected.map(e=>`<th>${enc(e.title)}</th>`).join('')}</tr></thead><tbody>${[['Tidsintervall',e=>fmt(e.start)+' – '+fmt(e.end)],['Vilken tid avses?',e=>e.dating],['Evidens för uppgiften',e=>e.evidence],['Koppling till Bibeln',e=>e.bible||'Ej angiven'],['Kort beskrivning',e=>e.description],['Fördjupad läsning',e=>(research[e.id]?.overview||'–')],['Paralleller / relationer',e=>(research[e.id]?.parallels||'–')],['Försiktighetsnotis',e=>(research[e.id]?.caution||'–')]].map(([name,fn])=>`<tr><th>${name}</th>${selected.map(e=>`<td>${enc(fn(e))}</td>`).join('')}</tr>`).join('')}</tbody></table></div></div>`}`;el('compareView').querySelectorAll('[data-pack]').forEach(b=>b.onclick=()=>{compareIds=suggestions[+b.dataset.pack][1].slice();if(compareIds.length)setSelected(compareIds[0]);renderCompare();renderRecords()});const cc=el('clearCompare');if(cc)cc.onclick=()=>{compareIds=[];renderCompare();renderRecords()};el('compareView').querySelectorAll('[data-read]').forEach(b=>b.onclick=()=>setSelected(b.dataset.read));el('compareView').querySelectorAll('[data-remove]').forEach(b=>b.onclick=()=>{compareIds=compareIds.filter(x=>x!==b.dataset.remove);renderCompare();renderRecords()})}
function findGeoForEvent(id){return {regions:geo.regions.filter(r=>(r.linked||[]).includes(id)),markers:geo.markers.filter(m=>m.linked===id)}}
function detailHtml(e){if(!e)return '<div class="empty">Ingen post vald.</div>';const more=research[e.id]||{};const hero=more.image?`<figure><img src="${enc(more.image)}" alt="Illustration för ${enc(e.title)}" onerror="this.closest('figure').style.display='none'"><figcaption class="tiny">${enc(more.credit||'')||''}</figcaption></figure>`:'';const geoFor=findGeoForEvent(e.id);return `<div class="kicker">${e.original?'ORIGINALPOST · EJ FAKTAGRANSKAD':'VALD FORSKNINGSPOST'} · ${enc(e.id)}</div><h2>${enc(e.title)}</h2><div class="small">${enc(e.category)} · ${fmt(e.start)} – ${fmt(e.end)}</div>${hero}<div class="meta"><div><div class="tiny">Dateringsslag</div><b>${enc(e.dating)}</b></div><div><div class="tiny">Evidensläge</div><b>${enc(e.evidence)}</b></div><div><div class="tiny">Bibelkoppling</div><b>${enc(e.bible||'Ej angiven')}</b></div><div><div class="tiny">Kartkoppling</div><b>${geoFor.regions.length||geoFor.markers.length?'Ja':'Inte ännu'}</b></div></div><p>${enc(e.description||e.sub||'')}</p>${e.original?'<div class="warn">Uppgiften kommer från originalarket. Både datering och sakuppgifter behöver granskas innan de används som vetenskapliga belägg.</div>':''}${more.overview?`<div class="note"><b>Övergripande information</b><div class="small" style="margin-top:6px">${enc(more.overview)}</div></div>`:''}${more.parallels?`<div class="note"><b>Paralleller / relationer</b><div class="small" style="margin-top:6px">${enc(more.parallels)}</div></div>`:''}${more.caution?`<div class="note"><b>Forskningsmässig försiktighet</b><div class="small" style="margin-top:6px">${enc(more.caution)}</div></div>`:''}${(geoFor.regions.length||geoFor.markers.length)?`<div class="note"><b>Geografisk läsning</b><div class="small" style="margin-top:6px">${geoFor.regions.length?`Områden: ${enc(geoFor.regions.map(r=>r.label).join(', '))}. `:''}${geoFor.markers.length?`Platser: ${enc(geoFor.markers.map(m=>m.label).join(', '))}.`:''}</div></div>`:''}${more.sources?.length?`<div class="sources"><b>Källor</b>${more.sources.map(([name,url])=>`<a target="_blank" rel="noopener noreferrer" href="${enc(url)}">${enc(name)} ↗</a>`).join('')}</div>`:''}${e.source?`<div class="sources" style="margin-top:8px"><a target="_blank" rel="noopener noreferrer" href="${enc(e.source)}">Postens käll-URL ↗</a></div>`:''}<div class="tiny" style="margin-top:14px">Obs: källbilder i högerpanelen hämtas online när länk finns. HTML-filen i sig fungerar lokalt utan internet, men externa bilder gör det inte alltid.</div>`}
function renderDetail(){el('detail').innerHTML=detailHtml(idEvent(state.selected)||events[0])}
function mapProject(lon,lat){const w=880,h=560,minLon=20,maxLon=60,minLat=20,maxLat=43;const x=(lon-minLon)/(maxLon-minLon)*w;const y=(maxLat-lat)/(maxLat-minLat)*h;return [x,y]}
function polyPath(poly){return poly.map((p,i)=>{const [x,y]=mapProject(p[0],p[1]);return `${i?'L':'M'}${x.toFixed(1)},${y.toFixed(1)}`}).join(' ')+' Z'}
function buildBaseMap(){const land1=[[20,43],[27,43],[33,41.5],[36,40.5],[39,39.5],[41,38.5],[42,37.5],[42,36],[41.3,35],[40,34],[39,33],[37,32],[35.8,31.3],[34.5,31],[33.4,30],[32.3,29],[31,29],[29.5,30],[29.2,31],[29.3,32.5],[30.3,34.2],[31.5,35.3],[32.8,36.5],[33.7,37.4],[34.5,38.3],[33.6,39.0],[30.0,40.0],[25.0,41.0],[20,41]];const arabia=[[34,31],[37,31.2],[39.5,30.7],[43,30.8],[47,29.5],[50,27.5],[53.5,24.5],[56,22.2],[60,20],[45,20],[38,22.3],[35.5,25.5],[34.5,28.5]];const anatolia=[[20,43],[37,43],[42,40],[42,38],[39,38.6],[35,39],[31,40],[27,40.6],[24,41.8]];return `<path d="${polyPath(anatolia)}" fill="#ebe2c9" stroke="#c9bea0" stroke-width="1.2"></path><path d="${polyPath(land1)}" fill="#ece2c6" stroke="#c9bea0" stroke-width="1.2"></path><path d="${polyPath(arabia)}" fill="#ebdfc2" stroke="#c9bea0" stroke-width="1.2"></path>`}
function yearActive(item){return item.start<=state.mapYear&&item.end>=state.mapYear}
function renderMap(){const activeRegions=geo.regions.filter(yearActive);const filteredEvents=events.filter(matches);const activeMarkers=geo.markers.filter(m=>yearActive(m) && filteredEvents.some(e=>e.id===m.linked));const selected=idEvent(state.selected);const selectedGeo=findGeoForEvent(state.selected);const regionHtml=activeRegions.map(r=>`<button data-read="${(r.linked&&r.linked[0])||''}" class="${selectedGeo.regions.some(a=>a.id===r.id)?'active':''}"><b>${enc(r.label)}</b><div class="tiny">${fmt(r.start)} – ${fmt(r.end)} · ${enc(r.kind)}</div></button>`).join('')||'<div class="tiny">Inga schematiska regioner i det valda året.</div>';const markerHtml=activeMarkers.slice(0,14).map(m=>`<button data-read="${enc(m.linked)}" class="${selectedGeo.markers.some(a=>a.id===m.id)?'active':''}">${enc(m.label)}<div class="tiny">${fmt(m.start)} – ${fmt(m.end)} · ${enc(m.kind)}</div></button>`).join('')||'<div class="tiny">Inga aktiva markörer i det valda året inom aktuellt filter.</div>';
 let svg=`<svg id="mapSvg" viewBox="0 0 880 560" xmlns="http://www.w3.org/2000/svg" aria-label="Historisk karta"><defs><filter id="shadow"><feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.16"/></filter></defs><rect x="0" y="0" width="880" height="560" fill="#cfe7f5"/>${buildBaseMap()}<g opacity="0.25">`;
 for(let lon=25;lon<60;lon+=5){const [x1,y1]=mapProject(lon,20),[x2,y2]=mapProject(lon,43);svg+=`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#ffffff" stroke-width="1"/>`;}
 for(let lat=25;lat<43;lat+=5){const [x1,y1]=mapProject(20,lat),[x2,y2]=mapProject(60,lat);svg+=`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#ffffff" stroke-width="1"/>`;}
 svg+='</g>';
 activeRegions.forEach(r=>{svg+=`<path d="${polyPath(r.poly)}" fill="${r.color}" fill-opacity="0.35" stroke="${r.color}" stroke-width="2" stroke-opacity="0.85" filter="url(#shadow)"></path>`; const c=r.poly.reduce((a,p)=>[a[0]+p[0],a[1]+p[1]],[0,0]); const [x,y]=mapProject(c[0]/r.poly.length,c[1]/r.poly.length); svg+=`<text x="${x}" y="${y}" text-anchor="middle" font-size="12" font-weight="700" fill="#2b415e">${enc(r.label)}</text>`;});
 const labels=[['Medelhavet',26.5,34.5],['Nilen',31.0,27.5],['Jerusalem',35.23,31.78],['Babylon',44.42,32.54],['Nineve',43.15,36.36],['Uruk',45.64,31.32],['Giza',31.13,29.98]];
 labels.forEach(([name,lon,lat])=>{const [x,y]=mapProject(lon,lat);svg+=`<text x="${x}" y="${y}" fill="#476479" font-size="11" font-style="italic">${enc(name)}</text>`});
 activeMarkers.forEach(m=>{const [x,y]=mapProject(m.lon,m.lat);const sel=m.linked===state.selected;svg+=`<g data-id="${m.linked}" class="map-marker"><circle cx="${x}" cy="${y}" r="${sel?7:5}" fill="${sel?'#174377':'#ffffff'}" stroke="${sel?'#174377':'#355977'}" stroke-width="2" filter="url(#shadow)"></circle><circle cx="${x}" cy="${y}" r="${sel?2.5:2}" fill="${sel?'#fff':'#355977'}"></circle>${sel?`<text x="${x+8}" y="${y-8}" font-size="12" font-weight="700" fill="#17304a">${enc(m.label)}</text>`:''}</g>`});
 // if selected has geodata but is not active this year, ghost-highlight it
 if(selected){selectedGeo.markers.filter(m=>!yearActive(m)).forEach(m=>{const [x,y]=mapProject(m.lon,m.lat);svg+=`<g><circle cx="${x}" cy="${y}" r="6" fill="none" stroke="#17304a" stroke-dasharray="3 3" stroke-width="2"></circle><text x="${x+8}" y="${y-8}" font-size="11" fill="#17304a">${enc(m.label)} (vald post, ej aktiv detta år)</text></g>`})}
 svg += `</svg>`;
 el('mapView').innerHTML=`<div class="map-card"><div class="map-top"><div><div class="small">VY · KARTA</div><div class="range">Geografisk utveckling kring ${fmt(state.mapYear)}</div></div><div class="slider-wrap"><button class="playbtn" id="playMap">${playTimer?'Pausa':'Spela'}</button><button class="outlinebtn" id="stepBack">←</button><button class="outlinebtn" id="stepForward">→</button><input type="range" id="mapSlider" min="-10000" max="150" step="25" value="${state.mapYear}"><span class="badge">${fmt(state.mapYear)}</span></div></div><div class="map-grid"><div><div class="map-svg-wrap">${svg}</div><div class="map-caption"><div class="small"><b>Aktivt år:</b> ${fmt(state.mapYear)} · <b>Aktiva regioner:</b> ${activeRegions.length} · <b>Aktiva markörer:</b> ${activeMarkers.length}</div><div class="legend"><span class="item"><span class="dot" style="background:#d96078"></span>Riken/epoker</span><span class="item"><span class="dot" style="background:#fff;border:2px solid #355977"></span>Platser/händelser</span></div></div><div class="warn" style="margin-top:10px">Skuggade områden är schematiska. De illustrerar ungefärlig utbredning och historisk förändring – inte exakta gränser för varje enskilt år.</div></div><div class="map-list"><section><b>Aktiva regioner & riken</b>${regionHtml}</section><section><b>Aktiva platser & händelser</b>${markerHtml}</section><section><b>Vald forskningspost</b><div class="small" style="margin-top:6px">${selected?enc(selected.id)+' · '+enc(selected.title):'–'}</div><div class="tiny" style="margin-top:6px">Gå gärna till Jämför-vyn för att ställa flera poster sida vid sida.</div><button id="goCompare">Öppna Jämför</button></section></div></div></div>`;
 el('mapSlider').oninput=e=>{state.mapYear=+e.target.value;renderMap()};el('stepBack').onclick=()=>{state.mapYear=clamp(state.mapYear-25,-10000,150);renderMap()};el('stepForward').onclick=()=>{state.mapYear=clamp(state.mapYear+25,-10000,150);renderMap()};el('playMap').onclick=togglePlay;el('goCompare').onclick=()=>view('compare');el('mapView').querySelectorAll('[data-read]').forEach(b=>b.onclick=()=>b.dataset.read&&setSelected(b.dataset.read))}
function togglePlay(){if(playTimer){clearInterval(playTimer);playTimer=null;renderMap();return;} playTimer=setInterval(()=>{state.mapYear += state.mapYear< -1000 ? 100 : state.mapYear < -200 ? 50 : 10; if(state.mapYear>150){clearInterval(playTimer);playTimer=null;state.mapYear=150;} renderMap();},500);renderMap()}
function zoom(f){const center=(state.min+state.max)/2,span=(state.max-state.min)*f/2;state.min=Math.round(center-span);state.max=Math.round(center+span);normalizeRange();renderAll()}
function renderPresets(){el('presets').innerHTML=periods.map((p,i)=>`<button class="chip" data-p="${i}">${enc(p[0])}</button>`).join(' ');el('presets').querySelectorAll('button').forEach(b=>b.onclick=()=>{const p=periods[+b.dataset.p];state.min=p[1];state.max=p[2];state.mapYear=Math.round((p[1]+p[2])/2);renderAll()})}

// V6: alla 129 originalposter är nu synliga i samma tidslinje som forskningsposterna.
// En post är inte kvalitetsgranskad bara för att den visas.
const researchEvents=events;
const allTimelineEvents=[...researchEvents,...originalEvents];
const originalCats=new Set(originalEvents.map(e=>e.category));
Object.assign(colors,{"Folk":"#f3e2d1","Människans utveckling":"#e1e7ed","Civilisation":"#f3e5bf","Religion":"#e9e0f4","Byggnadsverk":"#e5e6e8","Krig":"#f6ded8","Konflikterande berättelser":"#f8e8da","Bibelberättelser":"#f9e0d3"});
Object.assign(dark,{"Folk":"#a97745","Människans utveckling":"#73859b","Civilisation":"#b08d31","Religion":"#8769aa","Byggnadsverk":"#77848d","Krig":"#c77361","Konflikterande berättelser":"#bf8f50","Bibelberättelser":"#d08564"});
function matches(e){
 const q=el('search').value.toLocaleLowerCase('sv');
 return state.cat.has(e.category)&&state.ev.has(e.evidence)&&(!q||[e.title,e.sub,e.description,e.bible,e.dating,e.category,e.id].join(' ').toLocaleLowerCase('sv').includes(q))&&(e.end>=state.min&&e.start<=state.max);
}
function renderTimeline(){
 const filtered=allTimelineEvents.filter(matches);
 const nOriginal=filtered.filter(e=>e.original).length, nResearch=filtered.length-nOriginal;
 el('visible').textContent=`${filtered.length} poster i tidslinjen (${nResearch} bearbetade + ${nOriginal} original)`;
 const span=Math.max(1,state.max-state.min);
 const steps=span>1000000?500000:span>100000?50000:span>10000?2000:span>5000?1000:span>1800?500:span>700?200:span>250?100:span>100?50:25;
 const ticks=[];
 for(let y=Math.ceil(state.min/steps)*steps;y<=state.max;y+=steps)ticks.push({y,p:(y-state.min)/span*100});
 el('axis').innerHTML=ticks.map(t=>`<span class="tick" style="left:${t.p}%">${fmt(t.y)}</span>`).join('');
 el('epochs').innerHTML=eras.filter(a=>a[2]>=state.min&&a[1]<=state.max).map(a=>{const left=Math.max(state.min,a[1]),right=Math.min(state.max,a[2]);return `<div class="epoch" style="width:${(right-left)/span*100}%;background:${a[3]}" title="${enc(a[0])}">${enc(a[0])}</div>`}).join('');
 let lanes='';
 for(const [cat,label] of Object.entries(laneNames)){
  const ee=filtered.filter(e=>e.category===cat).sort((a,b)=>a.start-b.start);
  if(!ee.length)continue;
  let slots=[],bars='';
  for(const e of ee){
   const a=Math.max(e.start,state.min),b=Math.min(e.end,state.max);
   let x=(a-state.min)/span*100;
   const realWidth=Math.max(0.15,(b-a)/span*100);
   const width=Math.max(5.5,Math.min(38,realWidth));
   x=Math.min(x,100-width);
   let slot=0;
   while(slots[slot]!=null&&x<slots[slot]+1.2)slot++;
   slots[slot]=x+width;
   const uncertain=e.original||/hypotetisk|berättad tid/i.test(e.dating);
   bars+=`<button class="event ${uncertain?'uncertain':''} ${e.id===state.selected?'selected':''}" data-id="${e.id}" style="left:${x}%;width:${width}%;top:${8+slot*31}px;background:${color(cat)};border-left:4px solid ${dark[cat]};z-index:${200-slot}" title="${enc(e.title)} · ${fmt(e.start)}–${fmt(e.end)}${e.original?' · Original, ej granskad':''}">${e.original?'◇ ':''}${enc(e.title)}</button>`;
  }
  const ht=Math.max(63,(slots.length||1)*31+14);
  lanes+=`<div class="lane"><div class="lanehead" style="border-left:4px solid ${dark[cat]}">${label}<div class="tiny">${ee.length} poster${originalCats.has(cat)?' · ej faktagranskade':''}</div></div><div class="laneplot" style="height:${ht}px">${bars}</div></div>`;
 }
 el('lanes').innerHTML=lanes||'<div class="empty">Inga poster i tidsintervallet. Prova ett större intervall.</div>';
 el('lanes').querySelectorAll('.event').forEach(b=>b.onclick=()=>setSelected(b.dataset.id));
}
function renderRecords(){
 const filtered=allTimelineEvents.filter(matches).sort((a,b)=>a.start-b.start);
 el('recordsView').innerHTML=`<div class="toolbar"><div><div class="small">VY · SAMTLIGA POSTER</div><div class="range">${filtered.length} poster i urvalet</div></div><div class="small">◇ = originalpost, ännu inte faktagranskad</div></div><div class="tablelist">${filtered.map(e=>`<div class="rowcard"><div><div class="kicker">${e.original?'◇ ORIGINAL · EJ GRANSKAD':'BEARBETAD'} · ${enc(e.category)} · ${enc(e.id)}</div><h4>${enc(e.title)}</h4><div class="rowmeta">${fmt(e.start)} – ${fmt(e.end)} · ${enc(e.dating)} · ${enc(e.evidence)}</div><div>${enc(e.description||e.sub||'Originalpost utan kommentar')}</div></div><div class="rowactions"><button data-read="${e.id}">Läs</button><button data-compare="${e.id}">Jämför</button></div></div>`).join('')}</div>`;
 el('recordsView').querySelectorAll('[data-read]').forEach(b=>b.onclick=()=>setSelected(b.dataset.read));
 el('recordsView').querySelectorAll('[data-compare]').forEach(b=>b.onclick=()=>toggleCompare(b.dataset.compare));
}
function renderAll(){normalizeRange();el('minYear').value=state.min;el('maxYear').value=state.max;renderTimeline();renderRecords();renderCompare();if(state.view==='map')renderMap();renderDetail();renderParallels();renderArchive();updateMini()}
// init and listeners
checkboxSet('catFilters',Object.keys(laneNames),state.cat,'cat');checkboxSet('evFilters',['Hög','Medel','Låg','Osäker','Ej granskad'],state.ev,'ev');renderPresets();
el('search').addEventListener('input',renderAll);el('minYear').addEventListener('change',e=>{state.min=+e.target.value;renderAll()});el('maxYear').addEventListener('change',e=>{state.max=+e.target.value;renderAll()});el('zoomOut').onclick=()=>zoom(1.45);el('zoomIn').onclick=()=>zoom(0.7);el('fitAll').onclick=()=>{state.min=-3900000;state.max=2025;renderAll()};el('navTimeline').onclick=()=>view('timeline');el('navRecords').onclick=()=>view('records');el('navCompare').onclick=()=>view('compare');el('navMap').onclick=()=>view('map');el('navAbout').onclick=()=>view('about');el('navParallels').onclick=()=>view('parallels');el('navArchive').onclick=()=>view('archive');

// Version 5 extensions. Original data deliberately NOT merged into curated research rows.
const textParallels=[
{title:'Flodens orsak',family:'Flodtraditionerna',refs:['1 Mos 6:5–13','Atrahasis III','Gilgamesh XI'],notes:['Genesis knyter domen till människors ondska och våld.','I Atrahasis framträder människors oljud som ett motiv för gudarnas beslut.','I Gilgamesh återges floden i efterhand genom Utnapishtims berättelse.'],caution:'Motivlikheten innebär inte att en bestämd historisk flod har bekräftats.',ids:['H020','H004','H005']},
{title:'Förvarningen och båten',family:'Flodtraditionerna',refs:['1 Mos 6:14–22','Atrahasis III','Gilgamesh XI'],notes:['Noa får instruktioner om arkens byggnad och vad han ska ta med sig.','Enki/Ea förmedlar räddningsinstruktionen till Atrahasis.','Utnapishtim får en varning och bygger ett fartyg.'],caution:'Jämför berättelsefunktion och formulering innan slutsatser om direkt beroende.',ids:['H020','H004','H005']},
{title:'Fåglar och land',family:'Flodtraditionerna',refs:['1 Mos 8:6–12','Atrahasis: inget direkt motsvarande motiv i samma form','Gilgamesh XI'],notes:['Noa sänder ut fåglar för att undersöka om vattnet dragit sig tillbaka.','Ett direkt motsvarande fågelmotiv är inte belagt i samma form i Atrahasisfragmenten.','Utnapishtim sänder ut duva, svala och korp.'],caution:'Här är Genesis–Gilgamesh-parallellen mer specifik än Genesis–Atrahasis.',ids:['H020','H004','H005']},
{title:'Guds söner och väktarna',family:'Väktartraditionen',refs:['1 Mos 6:1–4','1 Henok 6–11','Jud 14–15'],notes:['Den korta Genesispassagen nämner Guds söner, människodöttrar och jättar.','Väktarboken utvecklar en berättelse om änglarnas överträdelser och spridning av förbjuden kunskap.','Judasbrevet återger en profetia från Henoktraditionen (1 Henok 1:9).'],caution:'Henok är en mångskiktad texttradition; delarna har olika tillkomsthistorier.',ids:['H020','H025']},
{title:'Daniels historiska miljö och boktillkomst',family:'Daniel',refs:['Dan 1–6','Dan 7–12','Makkaberkrisen ca 167–164 f.Kr.'],notes:['Berättelserna utspelar sig i babylonisk/persisk miljö.','De apokalyptiska visionerna speglar på flera punkter hellenistisk maktpolitik.','Slutlig apokalyptisk form dateras av många forskare till Antiochos IV:s tid.'],caution:'Berättad tid är inte samma sak som textens slutliga redaktion.',ids:['H023','H024']},
{title:'Jesus och evangeliernas kronologi',family:'Evangelierna',refs:['Matt 2','Luk 2','Mark 13'],notes:['Matteus knyter födelseberättelsen till Herodes den store.','Lukas knyter födelseberättelsen till skattskrivningen under Quirinius.','Markus återger templet som kommande katastrof, vilket är viktigt för dateringsdiskussionen.'],caution:'Evangelierna ger inte en fullt harmoniserad kronologi.',ids:['H027','H031','H032']}
];
let archiveQuery='';let archiveCategory='Alla';let parallelFamily='Alla';let storyIndex=0;
const stories=[
{year:-3500,title:'De första stora städerna',desc:'Uruk och andra samhällen i södra Mesopotamien växer fram. Skrift och institutioner skapar en ny historisk miljö.',post:'H002',lat:31.32,lon:45.64,zoom:6},
{year:-2600,title:'Egyptens pyramider',desc:'Monumentala byggnadsprojekt visar den egyptiska kungamaktens styrka långt före den tid som senare bibelberättelser ofta förläggs till.',post:'H003',lat:29.98,lon:31.13,zoom:7},
{year:-1750,title:'Mesopotamiska texttraditioner',desc:'Atrahasis och den bredare mesopotamiska berättelsevärlden ger bakgrund till senare bibliska motiv. Det är textens existens vi kan belägga.',post:'H004',lat:32.54,lon:44.42,zoom:6},
{year:-1208,title:'Namnet Israel på en egyptisk stele',desc:'Merneptahs inskrift ger ett tidigt utombibliskt belägg för en grupp benämnd Israel.',post:'H011',lat:31.78,lon:35.23,zoom:7},
{year:-722,title:'Assyriens erövring',desc:'Nordriket Israels fall och den assyriska stormaktspolitiken skapar nya förutsättningar för Levanten.',post:'H015',lat:32.28,lon:35.2,zoom:7},
{year:-586,title:'Jerusalem förstörs',desc:'Templets fall och exilen är avgörande historisk kontext för flera bibliska texter och redaktioner.',post:'H016',lat:31.78,lon:35.23,zoom:8},
{year:-539,title:'Persien tar Babylon',desc:'Nya imperiala ordningar förändrar förutsättningarna för judéer i Babylonien och Juda.',post:'H017',lat:32.54,lon:44.42,zoom:6},
{year:-165,title:'Daniel och makkabertiden',desc:'Daniels apokalyptiska delar kan förstås mot bakgrund av den seleukidiska krisen.',post:'H023',lat:31.78,lon:35.23,zoom:8},
{year:30,title:'Jesus i romerskt Judeen',desc:'Judeen är en del av den romerska maktsfären. Jesu avrättning placeras oftast omkring år 30 eller 33.',post:'H029',lat:31.78,lon:35.23,zoom:8},
{year:70,title:'Det andra templet förstörs',desc:'Romarnas erövring av Jerusalem får djupgående betydelse för judisk och kristen historia.',post:'H032',lat:31.78,lon:35.23,zoom:8}
];
function renderParallels(){const families=['Alla',...new Set(textParallels.map(x=>x.family))];const selected=textParallels.filter(p=>parallelFamily==='Alla'||p.family===parallelFamily);el('parallelsView').innerHTML=`<div class="toolbar"><div><div class="small">VY · TEXTPARALLELLER</div><div class="range">Parallella motiv, texter och dateringar</div></div><div><select id="familySelect">${families.map(f=>`<option ${f===parallelFamily?'selected':''}>${enc(f)}</option>`).join('')}</select></div></div><div class="warn" style="margin-bottom:12px">Detta är sammanfattningar av motiv och textrelationer, inte ordagranna översättningar. Referenserna visar var originaltexterna bör läsas och jämföras.</div><div class="text-grid">${selected.map(p=>`<div class="text-card"><div class="par-label">${enc(p.family)}</div><h3>${enc(p.title)}</h3>${p.refs.map((ref,i)=>`<div style="padding:8px 0;border-top:1px solid #e8edf4"><b>${enc(ref)}</b><p style="margin:5px 0">${enc(p.notes[i])}</p></div>`).join('')}<div class="archive-warning">${enc(p.caution)}</div><div class="storybar" style="margin-top:12px">${p.ids.map(id=>`<button data-par-read="${id}">${enc(idEvent(id)?.title||id)} ↗</button>`).join('')}</div></div>`).join('')}</div>`;el('familySelect').onchange=e=>{parallelFamily=e.target.value;renderParallels()};el('parallelsView').querySelectorAll('[data-par-read]').forEach(b=>b.onclick=()=>setSelected(b.dataset.parRead))}
function renderArchive(){const cats=['Alla',...new Set(originalEvents.map(e=>e.category))].sort((a,b)=>a==='Alla'?-1:b==='Alla'?1:a.localeCompare(b,'sv'));const filtered=originalEvents.filter(e=>(archiveCategory==='Alla'||archiveCategory===e.category)&&[e.title,e.sub,e.category,e.description].join(' ').toLocaleLowerCase('sv').includes(archiveQuery.toLocaleLowerCase('sv')));el('archiveView').innerHTML=`<div class="toolbar"><div><div class="small">VY · DITT ORIGINALMATERIAL</div><div class="range">${filtered.length} av ${originalEvents.length} originalposter</div></div><div class="storybar"><input id="archiveSearch" placeholder="Sök i originalarkivet" value="${enc(archiveQuery)}" style="padding:9px;border-radius:9px;border:1px solid #ccd9e7"><select id="archiveCat" style="padding:9px;border:1px solid #ccd9e7;border-radius:9px">${cats.map(c=>`<option ${c===archiveCategory?'selected':''}>${enc(c)}</option>`).join('')}</select></div></div><div class="archive-warning" style="margin-bottom:12px">Samtliga 129 originalposter är inlästa här. De har inte faktagranskats. Särskilt de mycket långa tidsperioderna och mytiska händelserna bör granskas innan de tas in i den kuraterade tidslinjen.</div><div class="archive-grid">${filtered.map(e=>`<div class="archive-card"><div><div class="par-label">${enc(e.category)} · ${e.id}</div><h4>${enc(e.title)}</h4><div class="small">${e.start!=null?fmt(e.start):'Okänd start'}${e.end!=null?' – '+fmt(e.end):''} · ${enc(e.sub)}</div></div><div class="storybar"><button data-original="${e.id}">Öppna ↗</button></div></div>`).join('')}</div>`;const inp=el('archiveSearch');inp.oninput=e=>{archiveQuery=e.target.value;const pos=inp.selectionStart;renderArchive();el('archiveSearch').focus();el('archiveSearch').setSelectionRange(pos,pos)};el('archiveCat').onchange=e=>{archiveCategory=e.target.value;renderArchive()};el('archiveView').querySelectorAll('[data-original]').forEach(b=>b.onclick=()=>setSelected(b.dataset.original))}
const nativeMapRender=renderMap;
let leafletMap=null,leafletTile=null,leafletLayers=null,storyMapBox=null;
function regionAtYear(r,year){return year>=r.start&&year<=r.end}
function jumpStory(i){storyIndex=Math.max(0,Math.min(stories.length-1,i));const st=stories[storyIndex];state.mapYear=st.year;state.selected=st.post;renderDetail();updateMini();renderMap();if(leafletMap)leafletMap.flyTo([st.lat,st.lon],st.zoom,{duration:.6});}
function removeMapLayers(){if(leafletLayers){leafletLayers.clearLayers();}}
function rebuildMapBase(){
 if(leafletMap)return;
 leafletMap=L.map('modernMap',{zoomControl:true,preferCanvas:true,scrollWheelZoom:false,minZoom:2}).setView([24,24],3);
 leafletLayers=L.layerGroup().addTo(leafletMap);
 const offlineBase='assets/bakgrundskarta.png';
 const bounds=[[-40,-30],[65,110]];
 leafletTile=L.imageOverlay(offlineBase,bounds,{interactive:false,opacity:1}).addTo(leafletMap);
 leafletTile.bringToBack();
 const n=el('mapLoadNote'); if(n)n.textContent='Baskartan är inbyggd och laddas utan extern kartserver. Nutida geografi är orienteringsstöd – inte historiska gränser. Flera områden har nu mer formade polygoner än tidigare.';

}
function refreshLeafletLayers(){
 if(!leafletMap)return;
 removeMapLayers();
 const active=geo.regions.filter(r=>regionAtYear(r,state.mapYear));
 const marks=geo.markers.filter(m=>regionAtYear(m,state.mapYear));
 const visibleTypes=window.mapVisibleTypes||new Set(['kärnområde','kulturregion','rike','imperium','inflytelsesfär','hypotes','plats']);
 active.filter(r=>visibleTypes.has(r.areaType||'kulturregion')).forEach(r=>{
  const isHyp=r.areaType==='hypotes';
  const isInfluence=r.areaType==='inflytelsesfär';
  const isCore=r.areaType==='kärnområde';
  const style={color:r.color,weight:isCore?3:2,fillColor:r.color,fillOpacity:isHyp?.08:isInfluence?.12:isCore?.32:.21,dashArray:(isHyp||isInfluence)?'7 6':null};
  const layer=L.polygon(r.poly.map(([lon,lat])=>[lat,lon]),style).addTo(leafletLayers);
  layer.bindPopup(`<b>${enc(r.label)}</b><br><b>Typ:</b> ${enc(r.areaType||'Region')}<br>${fmt(r.start)}–${fmt(r.end)}<br>${enc(r.note)}<br><i>Illustrativ approximation – inte källverifierad historisk gräns.</i>`);
 });
 marks.forEach(m=>{const sel=m.linked===state.selected;L.circleMarker([m.lat,m.lon],{radius:sel?9:5,color:sel?'#123e73':'#ffffff',weight:2,fillColor:sel?'#ffbc67':'#245a90',fillOpacity:1}).addTo(leafletLayers).bindPopup(`<b>${enc(m.label)}</b><br>${fmt(m.start)}–${fmt(m.end)}<br>Klicka för att läsa om händelsen`).on('click',()=>setSelected(m.linked))});
}
renderMap=function(){
 if(!window.L){nativeMapRender();if(el('mapView')&&!el('mapLoadNote'))el('mapView').insertAdjacentHTML('afterbegin','<div id="mapLoadNote" class="warn">Den interaktiva baskartan kunde inte laddas. Den schematiska reservkartan visas. Internet krävs för OpenStreetMap.</div>');return;}
 const active=geo.regions.filter(r=>regionAtYear(r,state.mapYear));const marks=geo.markers.filter(m=>regionAtYear(m,state.mapYear));const st=stories[storyIndex];
 // Keep Leaflet's container in the DOM during slider updates: replacing it would otherwise destroy the map.
 if(!el('modernMap')){
  el('mapView').innerHTML=`<div class="map-card"><div class="story-header"><div><div class="small">VY · GEOGRAFISK BASKARTA MED HISTORISKA LAGER · STÖRRE VÄRLDSUTSNITT</div><div id="mapSummary" class="range"></div></div><div class="storybar"><button id="yearBack">← 25 år</button><input type="range" id="modernYear" min="-10000" max="150" step="1" value="${state.mapYear}" aria-label="Historiskt år"><button id="yearNext">25 år →</button></div></div><div class="map-grid"><div><div id="modernMap" role="application" aria-label="Karta över Afrika, Europa och västra Asien med historiska lager"></div><div class="archive-warning modern-info">Kartbakgrund: inbyggd geografisk karta med större världsutsnitt (nutida geografi som orienteringsstöd). Färgade områden illustrerar historiska kärnområden, riken eller inflytelsesfärer och <b>är fortfarande ungefärliga historiska approximationer</b>, men flera polygoner är nu mer formade än i föregående version. Rulla med två fingrar eller använd kartans zoomkontroller.</div><div class="tiny" id="mapLoadNote" style="margin:8px 0"></div><div class="footcard" style="margin-top:12px"><div class="story-header"><div><div class="kicker">BERÄTTANDE KARTLÄGE</div><h3 id="storyHeading"></h3></div><div class="storybar"><button id="storyPrev">← Föregående</button><button id="storyNext">Nästa →</button></div></div><p id="storyDescription"></p><div class="tiny" id="storyCount"></div><button class="reader-button" id="storyRead">Läs vald forskningspost →</button></div></div><div class="map-list"><section><b>Historiska nedslag</b><div class="story-list" id="storyList"></div></section><section><b>Områden aktiva detta år</b><div id="regionList"></div></section></div></div></div>`;
  rebuildMapBase();
  el('modernYear').oninput=e=>{state.mapYear=+e.target.value;renderMap()};el('yearBack').onclick=()=>{state.mapYear=Math.max(-10000,state.mapYear-25);renderMap()};el('yearNext').onclick=()=>{state.mapYear=Math.min(150,state.mapYear+25);renderMap()};el('storyPrev').onclick=()=>jumpStory(storyIndex-1);el('storyNext').onclick=()=>jumpStory(storyIndex+1);el('storyRead').onclick=()=>setSelected(stories[storyIndex].post);
 }
 el('mapSummary').textContent=`${fmt(state.mapYear)} · ${active.length} schematiska områden · ${marks.length} händelsepunkter`;
 el('modernYear').value=state.mapYear;
 el('storyHeading').textContent=`${st.title} · ${fmt(st.year)}`;
 el('storyDescription').textContent=st.desc;
 el('storyCount').textContent=`Berättelse ${storyIndex+1} av ${stories.length}`;
 el('storyList').innerHTML=stories.map((x,i)=>`<button class="story-item ${i===storyIndex?'active':''}" data-story="${i}"><strong>${fmt(x.year)} · ${enc(x.title)}</strong><span>${enc(x.desc.slice(0,90))}…</span></button>`).join('');
 el('regionList').innerHTML=active.map(r=>`<button data-region="${enc(r.id)}">${enc(r.label)}</button>`).join('')||'<div class="small">Inga områden i modellen detta år.</div>';
 el('storyList').querySelectorAll('[data-story]').forEach(b=>b.onclick=()=>jumpStory(+b.dataset.story));
 el('regionList').querySelectorAll('[data-region]').forEach(b=>b.onclick=()=>{const r=geo.regions.find(x=>x.id===b.dataset.region);if(r){const center=r.poly.reduce((acc,p)=>[acc[0]+p[1],acc[1]+p[0]],[0,0]);const lat=center[0]/r.poly.length, lon=center[1]/r.poly.length; const z=(r.poly.length>10?5:(r.poly.length>7?6:7)); leafletMap.flyTo([lat,lon],z)}});
 refreshLeafletLayers();
 requestAnimationFrame(()=>{if(leafletMap)leafletMap.invalidateSize({pan:false})});
};
// archive read supplement; don't claim validation on original text
const v4Detail=detailHtml;
detailHtml=function(e){const html=v4Detail(e);if(!e?.original)return html;return html.replace('</h2>', '</h2><div class="archive-warning"><b>Originalpost – inte faktagranskad.</b> Dateringar och begrepp återges från ditt äldre ark. De är ännu inte korrigerade mot forskning eller oberoende källor.</div>')};
// Rebind functions after extensions have loaded
el('navParallels').onclick=()=>view('parallels');el('navArchive').onclick=()=>view('archive');renderAll();

// V7 – selectable compact overview, mobile reader, dates through 2100, curated knowledge cards.
/* Data: v7Deep finns i data/data.generated.js */
const v7Periods={early:[-3900000,-10000],bronze:[-4000,-1000],biblical:[-1200,200],classical:[-600,600],modern:[1000,2100],all:[-3900000,2100]};
let v7Mode='compact';
function v7SortedVisible(){return allTimelineEvents.filter(matches).sort((a,b)=>a.start-b.start)}
// Override v6 rendering with a compact, readable overview: 8 chronological cards per category max.
const v7OldTimeline=renderTimeline;
renderTimeline=function(){
 const entries=v7SortedVisible();const orig=entries.filter(x=>x.original).length;
 el('visible').textContent=`${entries.length} av 165 poster · ${orig} original · ${entries.length-orig} bearbetade`;
 el('v7stats').textContent=v7Mode==='compact'?'Översikt: högst åtta poster per kategori, välj Alla poster för fullständigt innehåll.':'Fullständigt innehåll i valt tidsintervall.';
 if(v7Mode==='full'){v7OldTimeline();return;}
 const span=Math.max(1,state.max-state.min);
 const t1=state.min,t2=state.max;
 el('axis').innerHTML=`<span class="tick" style="left:12%">${fmt(t1)}</span><span class="tick" style="left:50%">${fmt(Math.round((t1+t2)/2))}</span><span class="tick" style="left:88%">${fmt(t2)}</span>`;
 el('epochs').innerHTML='<div class="epoch" style="width:100%;background:#eaf1f9">Översikt av valt tidsintervall · välj en post för fördjupning</div>';
 let out='';for(const [cat,label] of Object.entries(laneNames)){
 const sub=entries.filter(x=>x.category===cat);if(!sub.length)continue;
 // Stable evenly spaced sample of chronological data, prioritizing non-original research; all accessible in full mode.
 const preferred=sub.slice().sort((a,b)=>(a.original===b.original?0:a.original?1:-1));
 const take=sub.length<=8?sub:sub.filter((x,i)=>i===0||i===sub.length-1||i%Math.max(1,Math.ceil(sub.length/6))===0).slice(0,8);
 const cards=take.map(e=>`<button class="v7event ${e.id===state.selected?'selected':''}" data-id="${enc(e.id)}" style="border-left:4px solid ${dark[e.category]||'#8ca3bd'}"><span class="name">${e.original?'◇ ':''}${enc(e.title)}</span><span class="date">${fmt(e.start)} – ${fmt(e.end)}${e.original?' · ej granskad':''}</span></button>`).join('');
 out+=`<section class="v7group"><h3>${enc(label)} <span class="small">(${sub.length} poster)</span></h3><div class="v7cards">${cards}</div>${sub.length>8?`<div class="tiny" style="margin-top:8px">Fler poster finns under ”Alla poster” eller i fliken Poster.</div>`:''}</section>`;
 }el('lanes').innerHTML=out||'<div class="empty">Inga poster i detta intervall. Prova en annan period.</div>';
 el('lanes').querySelectorAll('[data-id]').forEach(b=>b.onclick=()=>setSelected(b.dataset.id));
};
const v7OldDetail=detailHtml;
function furtherReadingLinks(e){
 const entry=externalSearch[e.id]||{};
 const title=String(e.title||'').trim();
 const term=String(entry.britannicaTerm||'').trim();
 const generalQuery=e.original && e.sub ? `${e.sub} ${title}` : title;
 const wideUrl='https://www.google.com/search?q='+encodeURIComponent(generalQuery);
 let parts=[];
 if(entry.britannicaUrl){
   parts.push(`<a class="readinglink" target="_blank" rel="noopener noreferrer" href="${enc(entry.britannicaUrl)}">Läs om ämnet hos Britannica (engelska) ↗</a>`);
 }else if(term){
   const queryUrl='https://www.britannica.com/search?query='+encodeURIComponent(term);
   parts.push(`<a class="readinglink" target="_blank" rel="noopener noreferrer" href="${enc(queryUrl)}">Sök på Britannica (engelska: ${enc(term)}) ↗</a>`);
 } 
 parts.push(`<a class="readinglink" target="_blank" rel="noopener noreferrer" href="${enc(wideUrl)}">Sök ämnet på webben (svenska) ↗</a>`);
 const notice=term?'Britannicas sökning använder en engelsk ämnesterm. Det är en söklänk, inte en granskad källhänvisning.':'Ingen tillräckligt tydlig engelsk Britannica-term finns ännu för denna post. Använd den bredare sökningen tills vi har en ämnesspecifik källa.';
 return `<div class="external-search-links">${parts.join('')}<p class="tiny">${notice}</p></div>`;
}
detailHtml=function(e){let html=v7OldDetail(e);if(!e)return html;const d=v7Deep[e.id];if(d){const panel=`<section class="v7read"><h3>Vad var detta?</h3><p>${enc(d.summary)}</p><h3>Historiskt sammanhang</h3><p>${enc(d.context)}</p><h3>Vad innebar det?</h3><p>${enc(d.impact)}</p><h3>Klimat och andra påverkande faktorer</h3><p>${enc(d.climate)}</p><h3>Dateringar och osäkerheter</h3><p>${enc(d.dates)}</p><h3>Läs vidare</h3>${d.sources.map(([name,url])=>`<a class="readinglink" target="_blank" rel="noopener noreferrer" href="${enc(url)}">${enc(name)} ↗</a>`).join('')}</section>`;html+=panel;}else if(!(typeof allOriginalResearchV828!=='undefined'&&allOriginalResearchV828[e.id]) && !(typeof sourceCardsV86!=='undefined'&&sourceCardsV86[e.id]) && !(typeof sourceCardsV87!=='undefined'&&sourceCardsV87[e.id]) && !(typeof primaryTextsV88!=='undefined'&&primaryTextsV88[e.id]) && !(typeof sourceCardsV810!=='undefined'&&sourceCardsV810[e.id]) && !(typeof hellenisticCasesV822!=='undefined'&&hellenisticCasesV822.some(c=>c.anchor===e.id)) && !(typeof research!=='undefined'&&research[e.id]?.overview)){html+=`<div class="muted-box v7read"><b>Fördjupning kommer i senare forskningsgenomgång</b><p>Posten har ännu inte en separat faktagranskad fördjupning. Ursprungliga datum och beskrivningar ska inte betraktas som verifierade bara för att de finns i tidslinjen.</p>${furtherReadingLinks(e)}</div>`;}return html;};
// allow future on time axis, but never project historical records into future
normalizeRange=function(){if(state.min>state.max){let t=state.min;state.min=state.max;state.max=t;}state.min=clamp(state.min,-3900000,2100);state.max=clamp(state.max,-3900000,2100);};
function v7ApplyPeriod(mode){const pp=v7Periods[mode]||v7Periods.biblical;state.min=pp[0];state.max=pp[1];renderAll();}
const v7Fit=document.getElementById('fitAll');v7Fit.onclick=()=>{el('v7focus').value='all';v7ApplyPeriod('all')};
el('v7focus').onchange=e=>v7ApplyPeriod(e.target.value);
el('v7compact').onclick=()=>{v7Mode='compact';el('v7compact').classList.add('on');el('v7expanded').classList.remove('on');renderAll()};
el('v7expanded').onclick=()=>{v7Mode='full';el('v7expanded').classList.add('on');el('v7compact').classList.remove('on');renderAll()};
el('v7read').onclick=()=>document.getElementById('detail').scrollIntoView({behavior:'smooth',block:'start'});
// opening selected post on mobile should reveal reading panel without losing nav
const v7OldSetSelected=setSelected;
setSelected=function(id){v7OldSetSelected(id);if(window.matchMedia('(max-width:900px)').matches){document.getElementById('detail').scrollIntoView({behavior:'smooth',block:'start'});}};
// broader modern periods: no false implication 2027–2100 has recorded historical events
const v7OldRenderAll=renderAll;
renderAll=function(){v7OldRenderAll();if(state.max>=2026){const v=el('v7stats');if(v)v.textContent+=' · Framtida år är tomma tills faktiska händelser läggs till.';}};
el('v7focus').value='biblical';v7ApplyPeriod('biblical');
const v7FixedView=view;view=function(name){v7FixedView(name);if(name==='map'&&window.L){setTimeout(()=>{if(leafletMap)leafletMap.invalidateSize({pan:false})},100)}};


// V7.3 — geographic layer distinctions, navigation and legibility.
window.mapVisibleTypes = new Set(['kärnområde','kulturregion','rike','imperium','inflytelsesfär','hypotes','plats']);
const mapTypeChoices=[['kärnområde','Kärnområden'],['kulturregion','Kulturregioner'],['rike','Riken'],['imperium','Imperier'],['inflytelsesfär','Inflytelsesfärer'],['hypotes','Hypotetiska riken'],['plats','Platsregioner']];
const originalMapRenderV73=renderMap;
renderMap=function(){
 originalMapRenderV73();
 const mapBox=el('modernMap');if(!mapBox)return;
 if(!el('mapV73Controls')){
  const wrap=document.createElement('div');wrap.id='mapV73Controls';wrap.className='footcard';wrap.style.cssText='margin:10px 0;padding:12px';
  wrap.innerHTML=`<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:8px"><b>Kartlager</b><span class="tiny">Välj geografisk betydelse – ytorna är ännu inte vetenskapligt rekonstruerade gränser.</span><button id="mapWorld" class="reader-button" style="margin-left:auto">🌍 Världsöversikt</button><button id="mapRegion" class="reader-button">Östra Medelhavet</button></div><div id="mapTypeFilters" style="display:flex;flex-wrap:wrap;gap:6px"></div><div class="tiny" style="margin-top:8px"><b>Heldragen kant:</b> schematiskt kärnområde/rike. <b>Streckad kant:</b> hypotetiskt område eller inflytelsesfär. <b>Färgton:</b> kategorisering, inte grad av vetenskapligt belägg.</div>`;
  mapBox.insertAdjacentElement('afterend',wrap);
  el('mapWorld').onclick=()=>leafletMap&&leafletMap.flyTo([17,24],3,{duration:.5});
  el('mapRegion').onclick=()=>leafletMap&&leafletMap.flyTo([32.5,38.5],5,{duration:.5});
  const filters=el('mapTypeFilters');
  filters.innerHTML=mapTypeChoices.map(([id,label])=>`<label style="display:flex;align-items:center;gap:4px;padding:5px 8px;border:1px solid #dce4ee;border-radius:9px;font-size:12px;background:#f8fbff"><input type="checkbox" data-area="${id}" checked>${label}</label>`).join('');
  filters.querySelectorAll('input').forEach(input=>input.onchange=()=>{if(input.checked)window.mapVisibleTypes.add(input.dataset.area);else window.mapVisibleTypes.delete(input.dataset.area);refreshLeafletLayers()});
 }
};
renderMap();

// V8.1 – focused research batch, keeping V7.3 map and previous views unchanged.
/* Data: v81Research finns i data/data.generated.js */
const v81PreviousDetail=detailHtml;
detailHtml=function(e){
  let html=v81PreviousDetail(e);
  if(!e || !v81Research[e.id])return html;
  const d=v81Research[e.id];
  const srcs=d.sources.map(([name,url])=>`<a class="readinglink" href="${enc(url)}" target="_blank" rel="noopener noreferrer">${enc(name)} ↗</a>`).join('');
  // Replace previous V7 generic/deep card for this record if present: retain original facts above it.
  html=html.replace(/<section class="v7read">[\s\S]*?<\/section>/g,'').replace(/<div class="muted-box v7read">[\s\S]*?<\/div>/g,'');
  return html+`<section class="v7read" style="border:1px solid #d6e6f6;border-radius:13px;padding:16px;background:#fbfdff;margin-top:14px"><div class="kicker">TIDENS VÄV · FORSKNINGSFÖRDJUPNING V8.1</div><h3>${enc(d.heading)}</h3><h3>Vad var det?</h3><p>${enc(d.summary)}</p><h3>Historiskt sammanhang</h3><p>${enc(d.context)}</p><h3>Vad innebar det?</h3><p>${enc(d.impact)}</p><h3>Klimat, miljö och drivkrafter</h3><p>${enc(d.climate)}</p><h3>Dateringar och osäkerheter</h3><p>${enc(d.dates)}</p><h3>Vidare läsning och underlag</h3>${srcs}<p class="tiny">Fördjupningen är en första källförankrad sammanfattning, inte en fullständig sakkunniggranskning. Källor kan innehålla olika forskningstraditioner.</p></section>`;
};
// Keep V7.3 function callbacks; adding a reading-card status in left pane is a lightweight, optional enhancement.
const v81Style=document.createElement('style');
v81Style.textContent='.v81note{margin:10px 0;padding:10px;border-radius:10px;background:#edf5fd;border:1px solid #d6e6f6;font-size:12px}.v7read p{line-height:1.6}';
document.head.appendChild(v81Style);
renderDetail();

// V8.2 – Mesopotamien, Egypten, Indus och Israels religiösa historia.
// Forskningsartiklar är knutna till oförändrade post-ID:n; originaldateringar skrivs inte om i tysthet.
/* Data: v82Research finns i data/data.generated.js */
const v82Library={...Object.fromEntries(Object.entries(v81Research).map(([id,d])=>[id,{...d,id,theme:({O001:'Migrationerna',O007:'Människans utveckling',O009:'Människans utveckling',O012:'Människans utveckling',O013:'Migrationerna',O015:'Jordbruk',O017:'Mesopotamien',H001:'Religionernas historia',H002:'Mesopotamien',O008:'Teknikhistoria'}[id]||'Förhistoria'),sourceVersion:'V8.1'}])),...Object.fromEntries(Object.entries(v82Research).map(([id,d])=>[id,{...d,sourceVersion:'V8.2'}]))};
let v82Theme='Alla områden';
let v82Query='';
const v82Styles=document.createElement('style');
v82Styles.textContent=`
.v82-top{padding:20px 22px;background:linear-gradient(110deg,#f9fbff,#eff5fc);border:1px solid #dce6f2;border-radius:16px;margin-bottom:14px}
.v82-top h2{margin:4px 0 8px;font-size:23px;line-height:1.2}
.v82-library-controls{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-top:14px}
.v82-library-controls input,.v82-library-controls select{border:1px solid #d7e2f0;background:white;border-radius:10px;padding:10px;color:#163250;min-width:200px;flex:1}
.v82-library-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(235px,1fr));gap:12px}
.v82-library-card{padding:16px;background:#fff;border:1px solid #dce6f2;border-radius:15px;display:flex;flex-direction:column;gap:9px;box-shadow:0 4px 12px rgba(22,43,75,.04)}
.v82-library-card.selected{border-color:#79a5d7;box-shadow:0 0 0 3px #e5f0ff}
.v82-library-card .label{color:#427196;font-size:11px;font-weight:750;letter-spacing:.03em;text-transform:uppercase}
.v82-library-card h3{font-size:16px;margin:0;line-height:1.35}
.v82-library-card p{font-size:12.5px;color:#52667d;line-height:1.55;margin:0;flex:1}
.v82-library-card button{background:#e8f2fd;color:#1f568a;border:1px solid #d0e3f7;border-radius:9px;text-align:left;padding:10px 11px;font-size:12px;font-weight:700}
.v82read h3{font-size:14px;margin:18px 0 7px;color:#173c66}
.v82read p{line-height:1.67;color:#30445d;margin:0}
.v82read .v82-divider{border-top:1px solid #e0e9f4;margin:17px 0}
.v82read .v82-sources{display:grid;gap:8px;margin-top:6px}
.v82read .v82-sources a{background:#fff;border:1px solid #d9e7f5;border-radius:9px;padding:10px 11px;display:block;overflow-wrap:anywhere;font-size:12px}
.v82read .v82-related{display:flex;flex-wrap:wrap;gap:7px;margin-top:10px}
.v82read .v82-related button{border:1px solid #d3e2f2;background:#fff;border-radius:9px;padding:8px;font-size:12px;color:#215b92}
.v82-method{border-left:4px solid #427da7;padding:10px 12px;background:#f1f7ff;border-radius:0 8px 8px 0}
@media(max-width:760px){.v82-top{padding:14px}.v82-top h2{font-size:20px}.v82-library-grid{grid-template-columns:1fr}.v82-library-controls{display:grid;grid-template-columns:1fr}.v82-library-controls input,.v82-library-controls select{width:100%;min-width:0}}
`;
document.head.appendChild(v82Styles);
const v82PriorView=view;
view=function(v){
 if(v==='research'){
   state.view='research';
   ['timeline','records','compare','map','parallels','archive','research','about'].forEach(name=>{
      const sect=el(name+'View'),btn=el('nav'+name[0].toUpperCase()+name.slice(1));
      if(sect)sect.classList.toggle('hidden',name!==v);
      if(btn)btn.classList.toggle('active',name===v);
   });
   renderResearch(); renderDetail();updateMini();
 }else{
   el('researchView').classList.add('hidden');el('navResearch').classList.remove('active');
   v82PriorView(v);
 }
};
function renderResearch(){
 const themes=['Alla områden',...new Set(Object.values(v82Library).map(d=>d.theme))];
 const entries=Object.values(v82Library).filter(d=> (v82Theme==='Alla områden'||d.theme===v82Theme) && ( !v82Query || [d.heading,d.summary,d.theme,d.id].join(' ').toLocaleLowerCase('sv').includes(v82Query.toLocaleLowerCase('sv'))));
 el('researchView').innerHTML=`<div class="v82-top"><div class="kicker">TIDENS VÄV · FORSKNINGSBIBLIOTEK V8.2</div><h2>Från de första städerna till Israels religiösa historia</h2><div class="small">26 forskningsfördjupningar, varav 16 nya i V8.2. Filtrera på tema och öppna artikeln i läsfönstret.</div><div class="v82-library-controls"><select id="v82ThemeSelect" aria-label="Välj forskningsområde">${themes.map(t=>`<option ${t===v82Theme?'selected':''}>${enc(t)}</option>`).join('')}</select><input id="v82Find" type="search" placeholder="Sök bland fördjupningarna" value="${enc(v82Query)}" aria-label="Sök forskningsfördjupningar"><span class="chip">${entries.length} av 26 artiklar</span></div></div><div class="v82-library-grid">${entries.map(d=>`<div class="v82-library-card ${d.id===state.selected?'selected':''}"><div class="label">${enc(d.theme)} · ${enc(d.id)} · ${enc(d.sourceVersion)}</div><h3>${enc(d.heading)}</h3><p>${enc(d.summary.length>190?d.summary.slice(0,188)+'…':d.summary)}</p><div class="tiny">${d.sources.length} källhänvisningar · arbetsversion</div><button data-v82open="${enc(d.id)}">Öppna artikeln i läsfönstret →</button></div>`).join('')}</div><div class="footcard" style="margin-top:14px"><b>Hur ska materialet läsas?</b><p class="small">Tidslinjens ursprungsdatum är inte automatiskt rättade när en V8.2-artikel nyanserar dem. Läs särskilt <i>Vad vet vi – och hur vet vi det?</i> samt <i>Osäkerheter och alternativa förklaringar</i>. Källorna visar var du kan fördjupa dig; artiklarna är ännu inte fullständigt sakkunniggranskade.</p></div>`;
 el('v82ThemeSelect').onchange=e=>{v82Theme=e.target.value;renderResearch()};
 el('v82Find').oninput=e=>{v82Query=e.target.value;const pos=e.target.selectionStart;renderResearch();const inp=el('v82Find');inp.focus();try{inp.setSelectionRange(pos,pos)}catch(_){}};
 el('researchView').querySelectorAll('[data-v82open]').forEach(b=>b.onclick=()=>{setSelected(b.dataset.v82open);if(state.view==='research')renderResearch();const panel=el('detail');if(panel){panel.scrollTop=0;if(window.matchMedia('(max-width:1200px)').matches)panel.scrollIntoView({behavior:'smooth',block:'start'})}});
}
const v82PrevDetail=detailHtml;
detailHtml=function(e){
 let html=v82PrevDetail(e);
 if(!e || !v82Research[e.id])return html;
 const d=v82Research[e.id];
 // Other generations of editorial content may exist; avoid duplicated generic V7 reading card.
 html=html.replace(/<section class="v7read">[\s\S]*?<\/section>/g,'').replace(/<div class="muted-box v7read">[\s\S]*?<\/div>/g,'');
 const srcs=d.sources.map(([name,url])=>`<a target="_blank" rel="noopener noreferrer" href="${enc(url)}">${enc(name)} ↗</a>`).join('');
 const related=d.related.filter(id=>idEvent(id)).map(id=>`<button data-v82related="${enc(id)}">${enc(idEvent(id).title)} ↗</button>`).join('');
 return html+`<section class="v82read" style="border:1px solid #d6e5f3;border-radius:13px;padding:16px;background:#fcfdff;margin-top:14px"><div class="kicker">TIDENS VÄV · FORSKNINGSFÖRDJUPNING V8.2 · ${enc(d.theme)}</div><h2 style="margin:8px 0 13px;font-size:19px">${enc(d.heading)}</h2><h3>Vad var det?</h3><p>${enc(d.summary)}</p><h3>Historiskt sammanhang</h3><p>${enc(d.context)}</p><h3>Vilken betydelse fick det?</h3><p>${enc(d.impact)}</p><h3>Vad vet vi – och hur vet vi det?</h3><div class="v82-method"><p>${enc(d.how)}</p></div><h3>Osäkerheter och alternativa förklaringar</h3><p>${enc(d.uncertainty)}</p><h3>Koppling till Bibeln och äldre traditioner</h3><p>${enc(d.bible)}</p><h3>Klimat och geografiska förutsättningar</h3><p>${enc(d.climate)}</p><div class="v82-divider"></div><h3>Vidare läsning och källor</h3><div class="v82-sources">${srcs}</div><h3>Fortsätt utforska</h3><div class="v82-related">${related||'<span class="small">Inga kopplade poster.</span>'}</div><p class="tiny" style="margin-top:14px">${enc(d.status)}. En källhänvisning stöder de centrala delarna av artikeln men inte nödvändigtvis varje formulering. Det äldre originalets metadata har inte automatiskt skrivits om.</p></section>`;
};
const v82OriginalRenderDetail=renderDetail;
renderDetail=function(){
 v82OriginalRenderDetail();
 el('detail').querySelectorAll('[data-v82related]').forEach(b=>b.onclick=()=>{
  setSelected(b.dataset.v82related);
  if(state.view==='research')renderResearch();
  el('detail').scrollTop=0;
 });
};
const v82PreviousSetSelected=setSelected;
setSelected=function(id){v82PreviousSetSelected(id);if(state.view==='research')renderResearch();};
el('navResearch').onclick=()=>view('research');
renderDetail();


// === Tidens väv 8.3: Temaspår, kronologiska samband och kontextuell läsning ===
const v83Themes=[
 {id:'israel',name:'Israels framväxt',tagline:'Kanaan, Israel, Juda och texternas tillkomst',summary:'Följ hur befolkningsgrupper i södra Levanten gradvis framträder som Israel, hur kungariken formas och hur stormakternas expansion och exilen påverkar den senare litterära traditionen. Ett textvittne, en historisk händelse och en bibelberättelse har inte nödvändigtvis samma datum.',min:-1600,max:-100,ids:['H009','H011','H012','O027','H013','H064','H014','H015','H016','H017','H018','H019','H020','H021','H023','H024'],context:'Merneptahstelen belägger namnet Israel men inte Bibelns skildring av uttåget. Höglandsbosättningarna kan undersökas arkeologiskt. Senare bibeltexter är historiska vittnen och teologiska tolkningar – inte automatiskt samtidiga protokoll.'},
 {id:'civilizations',name:'De första civilisationerna',tagline:'Jordbruk, städer, administration och skrift',summary:'Följ övergångar från bofast jordbruk till städer och stater i Mesopotamien, Egypten och Indusregionen. Områdenas utveckling överlappar men förklaras inte av en enda gemensam orsak.',min:-10500,max:-1100,ids:['O015','H001','O017','H002','O037','O038','H003','O039','O040','H007'],context:'Stadsbildning ägde rum på olika sätt. Klimat och flodmiljöer gav förutsättningar men bestämde inte på egen hand samhällsorganisation, skrift eller kungamakt.'},
 {id:'texts',name:'Flodberättelser och Genesis',tagline:'Atrahasis, Gilgamesh och Pentateukens redaktion',summary:'Jämför äldre mesopotamiska flodtraditioner med Första Mosebokens urhistoria. Här visar vi särskilt att en texts belägg, berättade miljö och senare sammansättning tillhör olika kronologiska nivåer.',min:-2200,max:-250,ids:['O024','H004','H005','H006','H020','H019','H021'],context:'Motivlikheter mellan Atrahasis, Gilgamesh och Genesis är verkliga, men de fastställer inte ensamma en enkel linje av direkt kopiering. Tidsintervallen visar texttraditioner och forskningsrekonstruktioner, inte datum för en faktisk global flod.'},
 {id:'religion',name:'Från Kanaan till judendom',tagline:'El, Baal, Jahve och religiös omformning',summary:'Följ den västsemitiska religionsmiljön under brons- och järnåldern, hur israelitisk religionsutövning förändras och hur exilisk och efterexilisk tid bidrar till senare judisk identitet.',min:-1600,max:-150,ids:['H009','O024','O076','H011','H012','O026','O027','H015','H016','O028','H018','H019','H025'],context:'Skilj mellan vad vi vet genom inskrifter, kultföremål och texter och forskarnas rekonstruktioner. Orden monolatri och monoteism är analytiska begrepp, inte etiketter som varje forntida individ själv använde.'},
 {id:'humans',name:'Människans långa historia',tagline:'Evolution, migration och bofasthet',summary:'Från tidiga människoformer och den upprätta gången till Homo sapiens, spridningen ut ur Afrika och förändringarna under tidig jordbrukstid.',min:-3900000,max:-8000,ids:['O007','O008','O009','O012','O001','O013','H001','O015'],context:'Detta temaspår omfattar miljoner år. Därför visar vi medvetet kronologiska steg i stället för en enda linjär axel där händelser de senaste årtusendena skulle tryckas ihop till en punkt.'},
 {id:'nt',name:'Jesus och de tidiga kristna texterna',tagline:'Romersk miljö, Paulus, evangelier och tempelkris',summary:'Jämför Jesu historiska verksamhet och död, de äldsta breven, Jerusalems förstörelse och evangeliernas tillkomst. Dessa perioder överlappar men är inte identiska.',min:-100,max:150,ids:['H026','H027','H028','H029','H030','H031','H032','H033','H034','H035','H036'],context:'Korsfästelsen accepteras brett som historisk händelse; ett exakt år är mer omdiskuterat. Evangeliernas tillkomst efter flera av de skildrade händelserna betyder att texttid och berättad tid behöver visas separat.'}
];
const v83Links=[
 {theme:'israel',from:'H009',to:'H011',kind:'context',label:'Samma historiska region',note:'Merneptahstelen ger ett egyptiskt vittnesbörd om namnet Israel i eller nära Kanaan, i en värld av senbronsåldersstater och egyptiskt inflytande.'},
 {theme:'israel',from:'H011',to:'H012',kind:'debate',label:'Indikationer och rekonstruktion',note:'Det äldsta utombibliska namn-belägget och bosättningsmönstren i höglandet kan läsas tillsammans, men en viss bosättning kan inte direkt identifieras med de människor som inskriften beskriver.'},
 {theme:'israel',from:'H014',to:'H015',kind:'continuity',label:'Politisk följd',note:'Assyriens erövring av Samaria är en avgörande historisk vändpunkt för Nordriket Israel.'},
 {theme:'israel',from:'H016',to:'H019',kind:'context',label:'Historisk miljö för textredaktion',note:'Exilen hör till sammanhangen för forskningsmodeller om Pentateukens utformning, men varje textlager har inte en verifierad exilisk datering.'},
 {theme:'israel',from:'H023',to:'H024',kind:'context',label:'Samma krismiljö',note:'Daniels apokalyptiska slutredaktion och makkabertiden kopplas vanligen till den seleukidiska krisen under 160-talet f.Kr.'},
 {theme:'civilizations',from:'O015',to:'H002',kind:'continuity',label:'Lång samhällsomvandling',note:'Jordbruk och bosättning var viktiga förutsättningar för större stadssamhällen, men utvecklingen var mångfasetterad och regional.'},
 {theme:'civilizations',from:'H002',to:'O037',kind:'context',label:'Regionalt sammanhang',note:'Uruks stadskultur ingår i Mesopotamiens vidare samhällshistoria; ordet Mesopotamien beskriver inte ett enhetligt rike.'},
 {theme:'civilizations',from:'O038',to:'H003',kind:'context',label:'Egyptens kungamakt',note:'Pyramidbyggena hör till Gamla rikets administration, kungsideologi och arbetsorganisation.'},
 {theme:'texts',from:'H004',to:'H005',kind:'literary',label:'Delad flodtradition',note:'Atrahasis och Gilgamesheposet delar centrala flodmotiv. Vilken textversion som påverkat en annan måste prövas separat.'},
 {theme:'texts',from:'H005',to:'H020',kind:'literary',label:'Tematiska motivparalleller',note:'Fartyget, överlevarna och de utsända fåglarna kan jämföras med Genesis 6–9, men textens teologi och kompositionshistoria skiljer sig.'},
 {theme:'texts',from:'H019',to:'H020',kind:'context',label:'Textlig helhet och del',note:'Genesis urhistoria studeras inom Pentateukens bredare och omdebatterade redaktionshistoria.'},
 {theme:'religion',from:'O076',to:'O027',kind:'debate',label:'Religionshistorisk relation',note:'Forskning om Baal, El och Jahve utgår från olika slags källor. Enkla modeller där alla människor trodde likadant är osäkra.'},
 {theme:'religion',from:'H011',to:'O027',kind:'context',label:'Identitet och religiös utveckling',note:'Att namnet Israel beläggs på 1200-talet f.Kr. säger inte i sig exakt hur gruppens religiösa uppfattningar såg ut.'},
 {theme:'religion',from:'H016',to:'O028',kind:'context',label:'Exilens betydelse',note:'Förlusten av tempel och kungamakt bidrog till nya institutioner och omtolkningar, men detta skedde inte i ett enda dokumenterbart steg.'},
 {theme:'humans',from:'O009',to:'O012',kind:'debate',label:'Inte samma människoslag',note:'Homo erectus och Homo sapiens skiljer sig åt och representerar olika tidsmässiga delar av människosläktets historia.'},
 {theme:'humans',from:'O012',to:'O001',kind:'continuity',label:'Ursprung och spridning',note:'Homo sapiens utvecklades i Afrika innan större och mindre migrationer förde grupper till andra delar av världen.'},
 {theme:'humans',from:'O013',to:'O015',kind:'debate',label:'Regionalt olika förlopp',note:'Människans spridning och jordbrukets uppkomst är olika utvecklingsprocesser; jordbruk utvecklades oberoende i flera regioner.'},
 {theme:'nt',from:'H029',to:'H030',kind:'context',label:'Historisk och litterär kronologi',note:'Paulus brev är skrivna efter Jesu död och är bland de tidigaste bevarade kristna texterna.'},
 {theme:'nt',from:'H032',to:'H031',kind:'debate',label:'Kronologi under diskussion',note:'Markusevangeliet dateras ofta nära Jerusalems förstörelse år 70; exakt före- eller efterdatering diskuteras.'},
 {theme:'nt',from:'H031',to:'H033',kind:'literary',label:'Synoptiska relationer',note:'En dominerande forskningsmodell är att Matteus och Lukas använde Markus, medan källornas antal och relationer diskuteras.'}
];
function v83Label(e){return e.original && v82Library[e.id]?.heading ? v82Library[e.id].heading : e.title;}
const v83Kinds={context:['Historiskt sammanhang','context'],continuity:['Långsiktigt förlopp','continuity'],literary:['Textparallell','literary'],debate:['Tolkning / osäkerhet','debate']};
let v83Theme='israel';let v83Display='graph';let v83ShowConnections=true;
const v83PrevView=view;
view=function(v){
 if(v==='explore'){
  state.view='explore';
  ['timeline','records','compare','map','parallels','archive','research','explore','about'].forEach(name=>{
   const sec=el(name+'View'),btn=el('nav'+name[0].toUpperCase()+name.slice(1));
   if(sec)sec.classList.toggle('hidden',name!=='explore');
   if(btn)btn.classList.toggle('active',name==='explore');
  });
  renderExplore();renderDetail();updateMini();
 }else{
  el('exploreView').classList.add('hidden');el('navExplore').classList.remove('active');
  v83PrevView(v);
 }
};
function v83FmtYear(y){if(y<=-1000000)return `${(Math.abs(y)/1000000).toLocaleString('sv-SE',{maximumFractionDigits:1})} milj. år sedan`;
 if(y<=-100000)return `${Math.round(Math.abs(y)/1000)} 000 f.Kr.`;
 return fmt(y);
}
function v83Current(){return v83Themes.find(t=>t.id===v83Theme)||v83Themes[0]}
function v83Event(id){return (typeof allTimelineEvents!=='undefined'?allTimelineEvents:events).find(x=>x.id===id)}
function v83TopicEvents(t){return t.ids.map(v83Event).filter(Boolean).sort((a,b)=>a.start-b.start)}
function v83Type(e){if(e.category==='Bibeltext'||e.category==='Bibelberättelse'||e.category==='Bibelberättelser')return 'texter';
 if(e.category==='Religion & texter'||e.category==='Religioner')return 'religion';
 if(e.category==='Arkeologi')return 'arkeologi';
 return 'historia';}
const v83Lanes=[['historia','Samhälle & historia','Statsbildning, migration, makt'],['arkeologi','Arkeologi & belägg','Materiella spår'],['religion','Religion & tradition','Religiösa miljöer och motiv'],['texter','Bibel och skrift','Texttillkomst eller berättad tid']];
function v83Graph(t,entries){
 if(t.id==='humans')return `<div class="v83-empty">För den mycket långa förhistorien används en kronologisk följd i stället för en missvisande tidsaxel över nästan fyra miljoner år. Välj <b>Kronologisk lista</b> nedan.</div>`;
 const len=t.max-t.min;let scale=820;
 let tickCount=7;let ticks=[];
 for(let i=0;i<=tickCount;i++){const y=Math.round(t.min+(len/tickCount)*i);ticks.push({y,p:100*i/tickCount})}
 let content=`<div class="v83-axis">${ticks.map(x=>`<span class="v83-tick" style="left:${x.p}%">${enc(v83FmtYear(x.y))}</span>`).join('')}</div>`;
 for(const [kind,title,sub] of v83Lanes){
  const items=entries.filter(e=>v83Type(e)===kind).sort((a,b)=>a.start-b.start);let slots=[];let marks='';
  for(const e of items){
   const actual=((Math.max(t.min,Math.min(t.max,e.start))-t.min)/len*scale);
   const duration=Math.max(3,(Math.min(e.end,t.max)-Math.max(e.start,t.min))/len*scale);
   let left=Math.max(0,Math.min(scale-150,actual));
   let slot=0;while(slots[slot]!=null && left<slots[slot]+8){slot++;}
   slots[slot]=left+146;
   const top=slot*71+7;
   const original=!!e.original;
   marks+=`<div class="v83-stem" style="left:${actual}px;height:${Math.max(0,(slot+1)*71-top-50)}px"></div>`;
   marks+=`<span class="v83-rangebar" style="left:${actual}px;width:${Math.max(3,Math.min(duration,scale-actual))}px;background:${dark[e.category]||'#628baa'}"></span>`;
   marks+=`<span class="v83-anchor" style="left:${actual}px;background:${dark[e.category]||'#628baa'}"></span>`;
   marks+=`<button class="v83-event-card ${e.id===state.selected?'active':''} ${original?'unreviewed':''}" data-v83read="${enc(e.id)}" style="left:${left}px;top:${top}px;border-left:4px solid ${dark[e.category]||'#78a1c6'}"><b>${enc(v83Label(e))}</b><small>${enc(v83FmtYear(e.start))}${e.start===e.end?'':' → '+enc(v83FmtYear(e.end))}</small></button>`;
  }
  const height=Math.max(78,Math.max(1,slots.length)*71+12);
  content+=`<div class="v83-lane"><div class="v83-lane-label">${title}<small>${sub}</small></div><div class="v83-lane-body" style="height:${height}px">${marks||'<span class="tiny" style="position:absolute;top:15px;left:12px">Inga poster i detta spår</span>'}</div></div>`;
 }
 return `<div class="v83-plot-scroller" aria-label="Grafisk tidslinje – kan rullas i sidled"><div class="v83-plot">${content}</div></div><div class="v83-caption">Tidsaxeln är linjär inom valt tema. Händelsernas markörer ligger på daterad position; korten staplas för läsbarhet. Streckade kort markerar ursprungsuppgifter. Dra i sidled på mobil.</div>`;
}
function v83TimelineRows(entries){return `<div class="v83-sequence">${entries.map((e,i)=>`<article class="v83-sequence-item"><div class="v83-sequence-number">${i+1}</div><div><div class="v83-dating">${enc(v83FmtYear(e.start))} – ${enc(v83FmtYear(e.end))} ${e.original?'<em>· ej faktagranskad</em>':''}</div><h4>${enc(v83Label(e))}</h4><p>${enc((v82Library[e.id]?.summary)||e.description||'Beskrivning saknas.')}</p><div class="v83-line-actions"><button data-v83read="${enc(e.id)}">Läs i högerpanelen →</button>${v82Library[e.id]?`<span class="chip">Fördjupning finns</span>`:''}</div></div></article>`).join('')}</div>`}
function v83LinkCards(t){let pairs=v83Links.filter(l=>l.theme===t.id).filter(l=>v83Event(l.from)&&v83Event(l.to));
 return `<div class="v83-connections">${pairs.map(l=>{let a=v83Event(l.from),b=v83Event(l.to),k=v83Kinds[l.kind];return `<article class="v83-connection"><span class="v83-tag ${k[1]}">${k[0]}</span><h4>${enc(v83Label(a))} <span aria-hidden="true">↔</span> ${enc(v83Label(b))}</h4><p>${enc(l.note)}</p><div class="v83-toolbar-actions"><button data-v83read="${enc(l.from)}">Läs första</button><button data-v83read="${enc(l.to)}">Läs andra</button><button data-v83compare="${enc(l.from)}|${enc(l.to)}">Jämför båda →</button></div></article>`}).join('')}</div>`;
}
function v83SetTheme(id){v83Theme=id;if(id==='humans')v83Display='list';renderExplore();}
function renderExplore(){
 const t=v83Current(),entries=v83TopicEvents(t),linked=v83Links.filter(x=>x.theme===t.id),deep=entries.filter(e=>!!v82Library[e.id]).length;
 el('exploreView').innerHTML=`<div class="v83-path-hero"><div class="kicker">TIDENS VÄV · TEMASPÅR V8.3</div><h2>Se sambanden – inte bara årtalen</h2><p>Välj en historisk undersökning och följ ett urval av relevanta poster i ett sammanhängande förlopp. Alla <b>165 poster</b> finns kvar i huvudtidslinjen och postarkivet.</p><div class="v83-metrics"><span>6 temaspår</span><span>26 forskningsfördjupningar i biblioteket</span><span>Alla tidigare funktioner kvar</span></div></div>
 <div class="v83-paths">${v83Themes.map(x=>`<button class="v83-path-choice ${t.id===x.id?'active':''}" data-v83theme="${x.id}" aria-pressed="${t.id===x.id}"><b>${enc(x.name)}</b><span>${enc(x.tagline)}</span></button>`).join('')}</div>
 <section class="v83-panel" style="margin-top:0"><div class="kicker">AKTUELL UNDERSÖKNING</div><h3 style="margin:5px 0 8px">${enc(t.name)}</h3><p class="small" style="font-size:13px;line-height:1.65;margin:0">${enc(t.summary)}</p><div class="v83-metrics" style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px"><span>${entries.length} utvalda poster</span><span>${deep} med fördjupning</span><span>${linked.length} kommenterade samband</span><span>${enc(v83FmtYear(t.min))} till ${enc(v83FmtYear(t.max))}</span></div></section>
 <div class="v83-toolbar"><div><b>Följ utvecklingen</b><div class="tiny">Öppna en post för att läsa den utan att lämna spåret.</div></div><div class="v83-toolbar-actions">${t.id==='humans'?'':`<button data-v83mode="graph" class="${v83Display==='graph'?'on':''}">Grafisk tidslinje</button>`}<button data-v83mode="list" class="${v83Display==='list'||t.id==='humans'?'on':''}">Kronologisk lista</button><button id="v83ShowMain">Se perioden i huvudtidslinjen ↗</button></div></div>
 <div class="v83-explore-map">${v83Display==='list'||t.id==='humans'?v83TimelineRows(entries):v83Graph(t,entries)}</div>
 <div class="v83-context"><b>Vad behöver man vara försiktig med?</b> ${enc(t.context)}</div>
 <section class="v83-panel"><h3>Samband att undersöka</h3><p class="small">Här skiljer vi mellan historiskt sammanhang, långsiktig utveckling, textparalleller och omdiskuterade kopplingar. Sambanden är redaktionella vägvisare – inte bevis för att varje händelse orsakade nästa.</p>${v83LinkCards(t)}</section>`;
 el('exploreView').querySelectorAll('[data-v83theme]').forEach(b=>b.onclick=()=>v83SetTheme(b.dataset.v83theme));
 el('exploreView').querySelectorAll('[data-v83mode]').forEach(b=>b.onclick=()=>{v83Display=b.dataset.v83mode;renderExplore()});
 el('exploreView').querySelectorAll('[data-v83read]').forEach(b=>b.onclick=()=>{setSelected(b.dataset.v83read);const p=el('detail');if(p){p.scrollTop=0;if(window.matchMedia('(max-width:1200px)').matches)p.scrollIntoView({behavior:'smooth',block:'start'})}});
 el('exploreView').querySelectorAll('[data-v83compare]').forEach(b=>b.onclick=()=>{const pair=b.dataset.v83compare.split('|');compareIds=pair;state.selected=pair[0];view('compare');renderDetail()});
 el('v83ShowMain').onclick=()=>{state.min=t.min;state.max=t.max;v7Mode='compact';view('timeline');if(el('v7expanded'))el('v7expanded').classList.remove('on');if(el('v7compact'))el('v7compact').classList.add('on');renderAll()};
}
const v83PreviousSelected=setSelected;
setSelected=function(id){v83PreviousSelected(id);if(state.view==='explore')renderExplore()};
el('navExplore').onclick=()=>view('explore');
el('v83OpenExplore').onclick=()=>view('explore');



// === Tidens väv V8.4: mobile-first navigation and preserved research reading ===
let v84LastView='timeline';
let v84CompareOrigin=null;
let v84PreviousFocus=null;
const v84Mobile=()=>window.matchMedia('(max-width:900px)').matches;
const v84Sidebar=el('v84Sidebar');
const v84FilterToggle=el('v84FilterToggle');
function v84SetFilters(open){
 v84Sidebar.classList.toggle('v84-filters-open',!!open);
 v84FilterToggle.setAttribute('aria-expanded',String(!!open));
 v84FilterToggle.querySelector('span').textContent=open?'▴':'▾';
}
v84FilterToggle.onclick=()=>v84SetFilters(!v84Sidebar.classList.contains('v84-filters-open'));
function v84HideMore(){
 el('v84MoreMenu').hidden=true;el('v84MoreBackdrop').hidden=true;
 document.body.classList.remove('v84-more-open');el('v84MoreButton').setAttribute('aria-expanded','false');
}
function v84ShowMore(){
 v84CloseReader(false);
 el('v84MoreMenu').hidden=false;el('v84MoreBackdrop').hidden=false;
 document.body.classList.add('v84-more-open');el('v84MoreButton').setAttribute('aria-expanded','true');
 el('v84MoreClose').focus();
}
function v84ReaderVisible(){return document.body.classList.contains('v84-reader-open')}
function v84OpenReader(){
 if(!v84Mobile()){const panel=el('detail');panel.scrollTop=0;return;}
 v84HideMore();v84PreviousFocus=document.activeElement;
 document.body.classList.add('v84-reader-open');el('v84ReaderBackdrop').hidden=false;
 el('detail').scrollTop=0;
 const close=el('v84ReaderClose');if(close)close.focus({preventScroll:true});
}
function v84CloseReader(restoreFocus=true){
 if(!v84ReaderVisible())return;
 document.body.classList.remove('v84-reader-open');el('v84ReaderBackdrop').hidden=true;
 if(restoreFocus&&v84PreviousFocus?.isConnected)v84PreviousFocus.focus({preventScroll:true});
}
function v84DecorateReader(){
 const panel=el('detail');if(!panel)return;
 const e=idEvent(state.selected)||v83Event(state.selected);
 const bar=document.createElement('div');bar.className='v84-reader-bar';
 bar.innerHTML=`<strong>VALD POST · ${enc(e?.id||'')}</strong><div class="v84-reader-actions"><button id="v84ReaderCompare" type="button">${compareIds.includes(state.selected)?'I jämförelse ✓':'＋ Jämför'}</button><button id="v84ReaderClose" class="v84-close" type="button" aria-label="Stäng läsfönstret">✕ Stäng</button></div>`;
 panel.prepend(bar);
 el('v84ReaderCompare').onclick=()=>{
  if(!compareIds.includes(state.selected))toggleCompare(state.selected);
  v84DecorateReaderButton();
 };
 el('v84ReaderClose').onclick=()=>v84CloseReader();
 el('v84PeekLabel').textContent=e?e.title:'Läs vald post';
}
function v84DecorateReaderButton(){
 const b=el('v84ReaderCompare');if(b)b.textContent=compareIds.includes(state.selected)?'I jämförelse ✓':'＋ Jämför';
}
const v84PriorRenderDetail=renderDetail;
renderDetail=function(){v84PriorRenderDetail();v84DecorateReader()};
const v84PriorRenderExplore=renderExplore;
renderExplore=function(){
 v84PriorRenderExplore();
 el('exploreView').querySelectorAll('[data-v83read]').forEach(b=>b.onclick=()=>setSelected(b.dataset.v83read));
 const graphic=el('exploreView').querySelector('.v83-plot-scroller');
 if(graphic){graphic.setAttribute('tabindex','0');graphic.setAttribute('role','region');graphic.setAttribute('aria-label','Grafisk tidslinje, använd sidledssvep eller piltangenter');}
};
const v84PriorRenderResearch=renderResearch;
renderResearch=function(){
 v84PriorRenderResearch();
 el('researchView').querySelectorAll('[data-v82open]').forEach(b=>b.onclick=()=>setSelected(b.dataset.v82open));
};
// Avoid V7/V8.2 scrollIntoView on mobile: selecting a record opens a focused reading sheet.
setSelected=function(id){
 const e=idEvent(id)||v83Event(id);
 if(!e)return;
 state.selected=id;
 renderDetail();renderRecords();renderCompare();
 if(state.view==='map')renderMap();
 renderParallels();renderArchive();updateMini();
 if(state.view==='research')renderResearch();
 if(state.view==='explore')renderExplore();
 v84DecorateReaderButton();
 if(v84Mobile())v84OpenReader();else {el('detail').scrollTop=0;}
};
function v84RefreshNavigation(){
 document.querySelectorAll('[data-v84nav]').forEach(btn=>{
  const active=btn.dataset.v84nav===state.view;
  btn.classList.toggle('active',active);
  if(active)btn.setAttribute('aria-current','page');else btn.removeAttribute('aria-current');
 });
 const moreViews=['records','map','parallels','formation','archive','about','religion','exile'];
 el('v84MoreButton').classList.toggle('active',moreViews.includes(state.view));
 document.querySelectorAll('.top .tab').forEach(b=>{if(b.classList.contains('active'))b.setAttribute('aria-current','page');else b.removeAttribute('aria-current')});
}
const v84PriorView=view;
view=function(destination){
 const old=state.view;
 if(destination==='compare' && old==='explore')v84CompareOrigin=v83Theme;
 if(destination!=='compare' && destination!=='explore')v84CompareOrigin=null;
 v84CloseReader(false);v84HideMore();
 v84PriorView(destination);
 v84RefreshNavigation();
 if(destination!==old){window.scrollTo({top:0,behavior:'instant'});}
};
function v84RenderReturn(){
 if(state.view!=='compare'||!v84CompareOrigin)return;
 const c=el('compareView');if(!c)return;
 const name=v83Themes.find(t=>t.id===v84CompareOrigin)?.name||'Temaspår';
 const row=document.createElement('div');row.className='v84-return';
 row.innerHTML=`<span>Jämför utvalda poster från: <b>${enc(name)}</b></span><button type="button" id="v84ReturnExplore">← Tillbaka till temaspåret</button>`;
 c.prepend(row);
 el('v84ReturnExplore').onclick=()=>{v83Theme=v84CompareOrigin;view('explore')};
}
const v84PriorRenderCompare=renderCompare;
renderCompare=function(){v84PriorRenderCompare();v84RenderReturn();v84DecorateReaderButton()};
// Contextual compare always retains a return route when started from a pathway.
function v84Go(dest){view(dest);if(v84Mobile())v84SetFilters(false)}
document.querySelectorAll('[data-v84nav]').forEach(b=>b.onclick=()=>v84Go(b.dataset.v84nav));
el('v84MoreButton').onclick=()=>v84ShowMore();
el('v84MoreClose').onclick=()=>v84HideMore();
el('v84MoreBackdrop').onclick=()=>v84HideMore();
el('v84ReaderBackdrop').onclick=()=>v84CloseReader();
el('v84ReadPeek').onclick=()=>v84OpenReader();
if(el('v7read'))el('v7read').onclick=()=>v84OpenReader();
window.addEventListener('keydown',e=>{
 if(e.key==='Escape'){if(v84ReaderVisible())v84CloseReader();else if(!el('v84MoreMenu').hidden)v84HideMore()}
});
window.addEventListener('resize',()=>{
 if(!v84Mobile()){v84CloseReader(false);v84HideMore();}
});

// V8.6: curator-sourced reading cards for priority original records.
// These DO NOT validate the unchanged original dates or replace primary sources.
const v86PriorDetailHtml=detailHtml;
detailHtml=function(e){
 const result=v86PriorDetailHtml(e);
 const card=e&&sourceCardsV86[e.id];
 if(!card)return result;
 const sources=card.sources.map((s,i)=>`<li class="v86-source"><a href="${enc(s.url)}" target="_blank" rel="noopener noreferrer">${enc(s.name)} ↗</a><div class="tiny">${enc(s.type)} · Stöder: ${enc(s.supports)}</div></li>`).join('');
 return result+`<section class="v86-article"><div class="kicker">TIDENS VÄV · V8.6 · KÄLLFÖRANKRAD GENOMGÅNG</div><h2>${enc(card.heading)}</h2><span class="v86-tag">Källornas ämnesrelevans kontrollerad</span><p class="tiny">Den äldre originalpostens formulering och tidsintervall är fortfarande ogranskade och visas separat ovanför.</p><h3>Vad var det?</h3><p>${enc(card.summary)}</p><h3>Historiskt sammanhang</h3><p>${enc(card.context)}</p><h3>Konsekvenser och betydelse</h3><p>${enc(card.impact)}</p><h3>Osäkerheter och viktiga preciseringar</h3><p>${enc(card.limits)}</p><h3>Kontrollerade källor</h3><ol class="v86-sources">${sources}</ol><p class="tiny">Källornas innehåll har kontrollerats för ämnesrelevans. Detta är inte en oberoende sakkunniggranskning av varje mening. Flera källor är översikter och inte antika primärkällor.</p></section>`;
};

// initial reading card and navigation states; no changes to historical map data.
renderDetail();v84RefreshNavigation();v84SetFilters(false);




// V8.7: source-aware evaluation of religious parallels. Historical original values are not changed.
const v87OldDetail=detailHtml;
detailHtml=function(e){
 const base=v87OldDetail(e);
 const card=e&&sourceCardsV87[e.id];
 if(!card)return base;
 const sourceList=card.sources.map(s=>`<li><a href="${enc(s.url)}" target="_blank" rel="noopener noreferrer">${enc(s.name)} ↗</a><div class="tiny">${enc(s.type)} · Stöder: ${enc(s.supports)}</div></li>`).join('');
 return base+`<section class="v87-article"><div class="kicker">TIDENS VÄV · V8.7 · RELIGIONSHISTORISK GRANSKNING</div><h2>${enc(card.heading)}</h2><p class="v87-warning"><b>Separera belagd likhet från påstådd påverkan.</b> Originalpostens gamla datering och etikett är fortfarande ogranskade. Detta forskningskort nyanserar dem, men skriver inte över originalet.</p><h3>Vad var detta?</h3><p>${enc(card.summary)}</p><h3>Historiskt sammanhang och dateringar</h3><p>${enc(card.context)}</p><h3>Betydelse</h3><p>${enc(card.impact)}</p><h3>Problem med originalpåståendet</h3><p>${enc(card.limits)}</p><h3>Jämförelse med bibeltexter</h3><p>${enc(card.parallels)}</p><div class="v87-assessment"><b>Bedömning av sambandet</b><p>${enc(card.assessment)}</p></div><h3>Ämnesspecifika källor</h3><ol class="v87-sources">${sourceList}</ol><p class="tiny">Källorna är genomgångna för relevant innehåll och rätt ämne, inte en fullständig sakkunniggranskning av varje påstående. Museiobjekt styrker främst vad som är avbildat eller dokumenterat, inte att alla forskare är eniga om tolkningen.</p></section>`;
};

const v87OldParallels=renderParallels;
renderParallels=function(){
 v87OldParallels();
 const root=el('parallelsView');if(!root)return;
 const e=Object.entries(sourceCardsV87);
 const groups=[...new Set(e.map(([,c])=>c.theme))];
 const block=document.createElement('section');block.className='v87-index';
 block.innerHTML=`<div class="v87-indexhead"><div><div class="kicker">V8.7 · NYTT FÖRDJUPNINGSSPÅR</div><h2>Religionshistoriska paralleller – källkritiskt prövade</h2><p>Här finns ${e.length} originalposter med granskade motiv och forskningsfrågor. Öppna en post för full analys i läsfönstret. Tidslinjens ursprungliga datering har inte skrivits över.</p></div><div class="v87-count">${e.length} kort</div></div><div class="v87-groups">${groups.map(g=>`<div class="v87-group"><h3>${enc(g)}</h3><div class="v87-cardgrid">${e.filter(([,c])=>c.theme===g).map(([id,c])=>`<button type="button" data-v87read="${id}" class="v87-card"><span class="tiny">${id} · Originalpost</span><strong>${enc(c.heading)}</strong><span>${enc(c.assessment)}</span><span class="v87-cardlink">Läs forskningskort →</span></button>`).join('')}</div></div>`).join('')}</div>`;
 root.prepend(block);
 block.querySelectorAll('[data-v87read]').forEach(btn=>btn.onclick=()=>setSelected(btn.dataset.v87read));
};
renderParallels();renderDetail();



// V8.8 — traceable text locations. These are NOT universal source attestations of historical event dates.
let v88Topic='Alla';
const v88PriorDetail=detailHtml;
detailHtml=function(e){
 const base=v88PriorDetail(e), entry=e&&primaryTextsV88[e.id];
 if(!entry)return base;
 const passages=entry.passages.map((p,i)=>`<li class="v88-passage">
  <div class="v88-passage-top"><strong>${enc(p.reference)}</strong><span class="v88-status ${p.status.startsWith('Textställe kontrollerat')?'v88-ok':'v88-pending'}">${enc(p.status)}</span></div>
  <div class="v88-kind">${enc(p.kind)}</div>
  <div class="v88-sourcetitle">${enc(p.label)}</div>
  <p>${enc(p.what)}</p><a href="${enc(p.url)}" target="_blank" rel="noopener noreferrer">${p.bible2000Links?"Läs på svenska i Bibel 2000 (Bible.com) ↗":"Öppna text eller källpost ↗"}</a>${p.bible2000Links?.length>1?`<div class="v89-bible-extras">${p.bible2000Links.map(item=>`<a href="${enc(item.url)}" target="_blank" rel="noopener noreferrer">${enc(item.label)} ↗</a>`).join()}</div>`:""}
 </li>`).join('');
 const related=(entry.related||[]).filter(id=>idEvent(id)||originalEvents.some(x=>x.id===id)).map(id=>`<button type="button" data-v88related="${enc(id)}">${enc((idEvent(id)||originalEvents.find(x=>x.id===id))?.title||id)} ↗</button>`).join('');
 return base+`<section class="v88-article"><div class="kicker">TIDENS VÄV · V8.8 · PRIMÄRTEXTER OCH TEXTVITTNEN</div><h2>${enc(entry.topic)}</h2><div class="v88-theme">${enc(entry.genre)}</div><h3>Detta kan vi belägga</h3><p>${enc(entry.claim)}</p><h3>Exakta källställen (${entry.passages.length})</h3><ol class="v88-list">${passages}</ol><div class="v88-caution"><strong>Vad detta inte bevisar</strong><p>${enc(entry.limit)}</p></div>${related?`<h3>Fortsätt undersöka</h3><div class="v88-related">${related}</div>`:''}<p class="tiny">Källstatus gäller endast det angivna textstället eller föremålet – inte hela postens äldre tidsintervall. Hänvisningar till antika författares återberättelser och museiobjekt är särskilt märkta.</p></section>`;
};
const v88PriorRenderDetail=renderDetail;
renderDetail=function(){v88PriorRenderDetail();el('detail').querySelectorAll('[data-v88related]').forEach(btn=>btn.onclick=()=>setSelected(btn.dataset.v88related))};

// Render a separately navigable register within the existing Textparalleller view.
const v88PriorRenderParallels=renderParallels;
renderParallels=function(){
 v88PriorRenderParallels();
 const root=el('parallelsView');if(!root)return;
 const entries=Object.entries(primaryTextsV88);
 const topics=['Alla',...new Set(entries.map(([,e])=>e.genre))];
 if(!topics.includes(v88Topic))v88Topic='Alla';
 const selected=entries.filter(([,e])=>v88Topic==='Alla'||e.genre===v88Topic);
 const block=document.createElement('section');block.className='v88-index';
 block.innerHTML=`<div class="v88-indexhead"><div><div class="kicker">V8.8 · KÄLLTEXTREGISTER</div><h2>Gå till själva texten</h2><p>17 poster med 23 angivna textställen, antika textvittnen eller forskningshänvisningar. Textställe, belägg och tolkningsgräns redovisas separat. Öppna en post i läsfönstret för detaljer.</p></div><span class="v88-count">${selected.length} / 17 poster</span></div>
 <div class="v88-controls"><label for="v88Topic">Välj typ av textjämförelse</label><select id="v88Topic">${topics.map(x=>`<option value="${enc(x)}" ${x===v88Topic?'selected':''}>${enc(x)}</option>`).join('')}</select></div>
 <div class="v88-grid">${selected.map(([id,e])=>`<article class="v88-card"><div class="kicker">${enc(id)} · ${enc(e.genre)}</div><h3>${enc(e.topic)}</h3><p>${enc(e.claim)}</p><div class="v88-refchips">${e.passages.map(p=>`<span>${enc(p.reference)}</span>`).join('')}</div><button type="button" data-v88read="${id}">Läs källställen och bedömning →</button></article>`).join('')}</div>
 <div class="v88-foot"><b>Tre olika slags hänvisningar</b><p><b>Primärtext:</b> antik eller biblisk text som kan läsas i översättning. <b>Textvittne:</b> ett bevarat föremål, exempelvis en lertavla eller papyrus. <b>Forskningshänvisning:</b> pekar ut ett textställe där direkt översättning ännu inte kontrollerats. Dessa har olika bevisvärde.</p></div>`;
 root.prepend(block);
 block.querySelector('#v88Topic').onchange=e=>{v88Topic=e.target.value;renderParallels()};
 block.querySelectorAll('[data-v88read]').forEach(btn=>btn.onclick=()=>setSelected(btn.dataset.v88read));
};
renderParallels();renderDetail();


// V8.9 – aligned motif cards. Editorial summaries, never claimed as full quotations.
let v89PairId='birds',v89MotifIndex=0, v810Theme='Alla';
function v89Selected(){return textPairsV810Combined.find(x=>x.id===v89PairId)||textPairsV810Combined[0]}
function v89CompareColumn(source,paraphrase,side){
 const open=`<a target="_blank" rel="noopener noreferrer" href="${enc(source.url)}">${source.bible2000Links?'Läs på svenska i Bibel 2000 ↗':'Öppna källstället ↗'}</a>`;
 return `<article class="v89-source v89-${side}"><span class="v89-label">${side==='left'?'TEXT A':'TEXT B'}</span><h3>${enc(source.title)}</h3><div class="v89-reference">${enc(source.reference)}</div>${source.bibleTranslation?`<div class="v89-bible-translation">Svensk läsning: ${enc(source.bibleTranslation)} · Bible.com</div>`:""}<dl><dt>Ursprungsspråk</dt><dd>${enc(source.language)}</dd><dt>Textvittne / källtyp</dt><dd>${enc(source.witness)}</dd><dt>Tidsangivelse</dt><dd>${enc(source.dating)}</dd></dl><div class="v89-reading"><strong>Svenskt innehållsreferat – inte ett ordagrant citat</strong><p>${enc(paraphrase)}</p></div><div class="v89-foot-actions">${open}${source.bible2000Links?.length>1?source.bible2000Links.slice(1).map(l=>`<a target="_blank" rel="noopener noreferrer" href="${enc(l.url)}">${enc(l.label)} ↗</a>`).join(''):""}${source.post?`<button type="button" data-v89post="${enc(source.post)}">Läs post ${enc(source.post)} ↗</button>`:''}</div><div class="v89-status">${enc(source.status)}</div></article>`;
}
function v89RenderLab(){
 let pair=v89Selected();if(v810Theme!=='Alla'&&pair.theme!==v810Theme){v89PairId=textPairsV810Combined.find(p=>p.theme===v810Theme)?.id||'birds';pair=v89Selected()}v89MotifIndex=Math.max(0,Math.min(v89MotifIndex,pair.segments.length-1));const step=pair.segments[v89MotifIndex];
 const root=el('parallelsView');if(!root)return;
 const box=document.createElement('section');box.className='v89-lab';box.id='v89Lab';
 const themes=['Alla',...new Set(textPairsV810Combined.map(p=>p.theme))];
 const selectedPairs=textPairsV810Combined.filter(p=>v810Theme==='Alla'||p.theme===v810Theme);
 box.innerHTML=`<div class="v89-head"><div><div class="kicker">V8.10 · KÄLLKRITISK TEXTJÄMFÖRELSE</div><h2>Text mot text</h2><p>Välj två antika texttraditioner och jämför ett motiv i taget. Referaten är våra egna sammanfattningar, inte antika originalcitat eller kompletta översättningar.</p></div><span class="v89-count">${textPairsV810Combined.length} jämförelser · ${textPairsV810Combined.reduce((n,x)=>n+x.segments.length,0)} motiv</span></div>
 <div class="v89-picker"><label for="v810Theme">Filtrera ämne<select id="v810Theme">${themes.map(t=>`<option value="${enc(t)}" ${t===v810Theme?'selected':''}>${enc(t)}</option>`).join('')}</select></label><label for="v89Pick">Välj textpar<select id="v89Pick">${selectedPairs.map(p=>`<option value="${enc(p.id)}" ${p.id===pair.id?'selected':''}>${enc(p.title)}</option>`).join('')}</select></label><button type="button" class="v89-navbtn" id="v89NextPair">Nästa textpar →</button></div>
 <h3 class="v89-title">${enc(pair.title)}</h3><p class="v89-sub">${enc(pair.subtitle)}</p><div class="v89-logic"><b>Bedömning av historiskt samband:</b> ${enc(pair.dependence)}</div>
 <div class="v89-chips" aria-label="Välj motiv">${pair.segments.map((s,i)=>`<button type="button" data-v89motif="${i}" aria-pressed="${i===v89MotifIndex?'true':'false'}" class="${i===v89MotifIndex?'active':''}">${i+1}. ${enc(s.title)}</button>`).join('')}</div>
 <div class="v89-cols">${v89CompareColumn(pair.left,step.left,'left')}${v89CompareColumn(pair.right,step.right,'right')}</div>
 <div class="v89-analysis"><div class="v89-compare-row"><h4>Detta är likt</h4><p>${enc(step.similarity)}</p></div><div class="v89-compare-row"><h4>Detta skiljer sig</h4><p>${enc(step.difference)}</p></div><div class="v89-compare-row v89-uncertain"><h4>Vad jämförelsen inte kan bevisa</h4><p>${enc(step.warning)}</p></div><div class="v89-compare-row"><h4>Samlad forskningsbedömning</h4><p>${enc(pair.assessment)}</p></div></div>
 <p class="v89-notice"><b>Metod:</b> En träff på samma motiv kan ge stöd för en traditionell eller litterär relation men bevisar inte en historisk händelse. Datera alltid det bevarade handskriftsvittnet separat från textens ursprung och den berättade tiden.</p>
 ${pair.extra.length?`<div class="v89-appendix"><b>Ytterligare källvittnen:</b> ${pair.extra.map(x=>`<a target="_blank" rel="noopener noreferrer" href="${enc(x.url)}">${enc(x.label)} ↗</a>`).join(' · ')}</div>`:''}`;
 root.prepend(box);
 box.querySelector('#v810Theme').onchange=e=>{v810Theme=e.target.value;v89PairId=textPairsV810Combined.find(p=>v810Theme==='Alla'||p.theme===v810Theme).id;v89MotifIndex=0;renderParallels()};
 box.querySelector('#v89Pick').onchange=e=>{v89PairId=e.target.value;v89MotifIndex=0;renderParallels()};
 box.querySelector('#v89NextPair').onclick=()=>{const i=selectedPairs.findIndex(p=>p.id===v89PairId);v89PairId=selectedPairs[(i+1)%selectedPairs.length].id;v89MotifIndex=0;renderParallels()};
 box.querySelectorAll('[data-v89motif]').forEach(b=>b.onclick=()=>{v89MotifIndex=+b.dataset.v89motif;renderParallels()});
 box.querySelectorAll('[data-v89post]').forEach(b=>b.onclick=()=>setSelected(b.dataset.v89post));
}
const v89PreviousParallels=renderParallels;
renderParallels=function(){v89PreviousParallels();v89RenderLab()};
function v89OpenForPost(id){
 const p=textPairsV810Combined.find(p=>p.left.post===id||p.right.post===id);
 if(!p)return;
 v89PairId=p.id;v810Theme='Alla';v89MotifIndex=0;
 v84CloseReader(false);view('parallels');
 const root=el('v89Lab');if(root)root.scrollIntoView({behavior:'instant',block:'start'});
}
const v89PreviousRenderDetail=renderDetail;
renderDetail=function(){
 v89PreviousRenderDetail();
 const list=textPairsV810Combined.filter(p=>p.left.post===state.selected||p.right.post===state.selected);
 if(!list.length)return;
 const a=document.createElement('div');a.className='v89-appendix';
 a.innerHTML=`<b>Jämför källtexter</b>${list.map(x=>`<button type="button" class="reader-button" data-v89from="${enc(x.id)}">${enc(x.title)} →</button>`).join('')}`;
 el('detail').appendChild(a);
 a.querySelectorAll('[data-v89from]').forEach(b=>b.onclick=()=>{v89PairId=b.dataset.v89from;v810Theme='Alla';v89MotifIndex=0;v84CloseReader(false);view('parallels');el('v89Lab')?.scrollIntoView({behavior:'instant',block:'start'})});
};
renderParallels();renderDetail();


// V8.9.1 – original Swedish Bible 2000 links; book/chapter only (verse ranges remain visible as reference text).
const bible2000Pattern = [
 ['GEN',/^(?:1\s*mos(?:eboken)?|genesis)\b/i],
 ['EXO',/^(?:2\s*mos(?:eboken)?|exodus)\b/i],
 ['LEV',/^(?:3\s*mos(?:eboken)?|leviticus)\b/i],
 ['NUM',/^(?:4\s*mos(?:eboken)?|numeri)\b/i],
 ['DEU',/^(?:5\s*mos(?:eboken)?|deuteronomium)\b/i],
 ['JOS',/^(?:jos(?:ua)?)\b/i],
 ['JDG',/^(?:dom(?:arboken)?)\b/i],
 ['1SA',/^(?:1\s*sam(?:uelsboken)?)\b/i],
 ['2SA',/^(?:2\s*sam(?:uelsboken)?)\b/i],
 ['1KI',/^(?:1\s*kung(?:aboken)?)\b/i],
 ['2KI',/^(?:2\s*kung(?:aboken)?)\b/i],
 ['EZR',/^(?:esra)\b/i],
 ['ISA',/^(?:jes(?:aja)?)\b/i],
 ['JER',/^(?:jer(?:emia)?)\b/i],
 ['EZK',/^(?:hes(?:ekiel)?)\b/i],
 ['DAN',/^(?:dan(?:iel)?)\b/i],
 ['PSA',/^(?:ps(?:altaren)?)\b/i],
 ['PRO',/^(?:ords(?:pråksboken)?)\b/i],
 ['MAT',/^(?:matt?(?:eus)?)\b/i],
 ['MRK',/^(?:mark(?:us)?)\b/i],
 ['LUK',/^(?:luk(?:as)?)\b/i],
 ['JHN',/^(?:joh(?:annes)?(?:evangeliet)?)\b/i],
 ['ACT',/^(?:apg|apostlagärningarna)\b/i],
 ['ROM',/^(?:rom(?:arbrevet)?)\b/i],
 ['1CO',/^(?:1\s*kor(?:inthierbrevet)?)\b/i],
 ['2CO',/^(?:2\s*kor(?:inthierbrevet)?)\b/i],
 ['GAL',/^(?:gal(?:aterbrevet)?)\b/i],
 ['HEB',/^(?:heb(?:reerbrevet)?)\b/i],
 ['JUD',/^(?:jud(?:asbrevet)?)\b/i],
 ['REV',/^(?:upp(?:enbarelseboken)?)\b/i]
];
function bible2000LinksForReference(reference){
 if(!reference)return [];
 // Parse only explicit book+chapter notation, do not guess book from a generic title.
 const segments=String(reference).split(/\s*\/\s*|\s*;\s*/).map(x=>x.trim());
 const found=[];
 for(const segment of segments){
  const book=bible2000Pattern.find(([,rx])=>rx.test(segment));
  if(!book)continue;
  const match=segment.match(book[1]);
  const rest=segment.slice(match[0].length).trim();
  let m=rest.match(/^(\d{1,3})(?::\d{1,3})?\s*[–-]\s*(\d{1,3})/);
  let ch=[];
  // Only interpret the end of a dash as a chapter if there is no colon before the dash.
  if(m&&!rest.slice(0,rest.indexOf('–')>=0?rest.indexOf('–'):rest.indexOf('-')).includes(':')){
    const from=+m[1],to=+m[2];
    if(to>=from&&to-from<=3) for(let n=from;n<=to;n++)ch.push(n);
    else ch=[from];
  } else {
    m=rest.match(/^(\d{1,3})/);
    if(m)ch=[+m[1]];
  }
  if(!ch.length&&book[0]==='JUD'&&/\bv\.?\s*\d+/.test(rest))ch=[1];
  for(const chapter of ch){
   if(chapter<1||chapter>150)continue;
   const url=`https://www.bible.com/sv/bible/417/${book[0]}.${chapter}.B2000D`;
   if(!found.some(v=>v.url===url)) found.push({label:`${match[0]} ${chapter}`,url});
  }
 }
 return found.slice(0,8);
}
const v891PriorDetailHtml=detailHtml;
detailHtml=function(e){
 const base=v891PriorDetailHtml(e);
 const links=e&&bible2000LinksForReference(e.bible);
 if(!links?.length)return base;
 return base+`<section class="v89-bible-panel"><b>Läs de angivna bibeltexterna</b><p>${enc(e.bible)} · Bibel 2000 på svenska (Bible.com). Länkarna öppnar hela kapitlet; välj verserna enligt hänvisningen.</p><div class="v89-bible-extras">${links.map(l=>`<a target="_blank" rel="noopener noreferrer" href="${enc(l.url)}">${enc(l.label)} ↗</a>`).join('')}</div></section>`;
};
// Refresh the selected reader after the new source presentation has been installed.
renderDetail();


// V8.10 — six source-aware historical cards, based on individually identified primary texts and studies.
const v810PreviousDetail=detailHtml;
detailHtml=function(e){
 const base=v810PreviousDetail(e), card=e&&sourceCardsV810[e.id];
 if(!card)return base;
 const src=card.sources.map(s=>`<li><a href="${enc(s.url)}" target="_blank" rel="noopener noreferrer">${enc(s.name)} ↗</a><div class="tiny">${enc(s.type)} · Stöder: ${enc(s.supports)}</div></li>`).join('');
 return base+`<section class="v87-article v810-article"><div class="kicker">TIDENS VÄV · V8.10 · NY FORSKNINGSFÖRDJUPNING</div><h2>${enc(card.heading)}</h2><div class="v87-warning"><b>Originalpostens årtal står kvar som arkivuppgift.</b> Skilj mellan berättad tid, textens tillkomst och bevarade vittnen.</div><h3>Vad handlar detta om?</h3><p>${enc(card.summary)}</p><h3>Historiskt sammanhang och källornas ålder</h3><p>${enc(card.context)}</p><h3>Betydelse</h3><p>${enc(card.impact)}</p><h3>Vad behöver korrigeras eller nyanseras?</h3><p>${enc(card.limits)}</p><h3>Samband med bibeltexter</h3><p>${enc(card.parallels)}</p><div class="v87-assessment"><b>Vetenskaplig bedömning</b><p>${enc(card.assessment)}</p></div><h3>Källor och exakt vad de stöder</h3><ol class="v87-sources">${src}</ol><p class="tiny">Källurvalet bygger på genomgång av ämnesanknytningen; bedömningen ersätter inte sakkunnig peer review av hela artikeln.</p></section>`;
};
const v810PrevRenderParallels=renderParallels;
renderParallels=function(){
 v810PrevRenderParallels();
 const host=el('parallelsView');if(!host)return;
 const cards=Object.entries(sourceCardsV810);
 const section=document.createElement('section');section.className='v810-directory';
 section.innerHTML=`<div class="kicker">V8.10 · NYA FÖRDJUPNINGAR</div><h2>Sex historiska källgranskningar</h2><p>Fördjupningar av äldre originalposter. Samtliga ursprungliga årtal visas oförändrade som arkivuppgifter.</p><div class="v810-cardgrid">${cards.map(([id,c])=>`<button class="v810-researchlink" data-v810read="${enc(id)}" type="button"><small>${enc(id)} · ${enc(c.theme)}</small><strong>${enc(c.heading)}</strong><span>${enc(c.assessment)}</span><em>Öppna i läsfönstret →</em></button>`).join('')}</div>`;
 const lab=el('v89Lab'); if(lab)lab.after(section);else host.prepend(section);
 section.querySelectorAll('[data-v810read]').forEach(b=>b.onclick=()=>setSelected(b.dataset.v810read));
};
renderParallels();renderDetail();

// V8.11: composition history, distinct from the narrative date and surviving manuscripts.
// Data in textbildning_v811.json; these scholarly dating ranges are illustrative, NOT exact dates.
let v811Area='Alla',v811Find='',v811Selected='genesis-creation',v811Compare=[];
const v811Get=id=>formationCasesV811.find(x=>x.id===id);
const v811Year=y=>y<0?`${Math.abs(y)} f.Kr.`:`${y} e.Kr.`;
const v811ScalePct=y=>Math.min(100,Math.max(0,(y+1000)/1350*100));
function v811Timeline(d){
 const start=[-1000,-500,0,350];
 const track=(label,range,type)=>`<div class="v811-trackrow"><span>${label}</span><div class="v811-track" title="${enc(range.label)}"><div class="v811-range ${type}" style="left:${v811ScalePct(range.from)}%;width:${Math.max(.4,v811ScalePct(range.to)-v811ScalePct(range.from))}%"></div></div></div>`;
 return `<div class="v811-scale"><div class="v811-scaleheader">${start.map(v=>`<span style="position:absolute;left:${v811ScalePct(v)}%;transform:translateX(${v===-1000?'0':v===350?'-100%':'-50%'})">${v811Year(v)}</span>`).join('')}</div>${track('Tillkomst / redaktion',d.composition,'')}${track('Textvittne',d.witness,'witness')}<div class="tiny" style="margin-top:8px">Färgbanden visar breda arbetsintervall. De bevarade textvittnena kan höra till hela boken, inte nödvändigtvis alla de verser som diskuteras.</div></div>`;
}
function v811CaseHtml(d){
 const sourceLinks=d.sources.map(s=>`<div class="v811-source"><a href="${enc(s.url)}" target="_blank" rel="noopener noreferrer">${enc(s.title)} ↗</a><small>${enc(s.kind)} · ${enc(s.supports)}</small></div>`).join('');
 const links=d.links.map(l=>`<a href="${enc(l.url)}" target="_blank" rel="noopener noreferrer">${enc(l.label)} ↗</a>`).join('');
 const related=d.related.filter(id=>idEvent(id)).map(id=>`<button type="button" data-v811post="${enc(id)}">${enc(idEvent(id).title)} ↗</button>`).join('');
 const pairs=d.linkedPairs.filter(id=>textPairsV810Combined.some(p=>p.id===id)).map(id=>`<button type="button" data-v811pair="${enc(id)}">Jämför: ${enc(textPairsV810Combined.find(p=>p.id===id).title)} ↗</button>`).join('');
 return `<article class="v811-article"><div class="kicker">KÄLLKRITISK FALLSTUDIE · ${enc(d.area)} · V8.11</div><h2>${enc(d.title)}</h2><div class="small">${enc(d.scope)} · Säkerhet: ${enc(d.confidence)}</div>
 <div class="v811-times"><div class="v811-time"><span class="name">Berättad tid</span><div class="content">${enc(d.setting)}</div></div><div class="v811-time"><span class="name">Textens tillkomst</span><div class="content">${enc(d.composition.label)}</div></div><div class="v811-time"><span class="name">Bevarade vittnen</span><div class="content">${enc(d.witness.label)}</div></div></div>
 ${v811Timeline(d)}<h3>Så kan texten ha vuxit fram</h3><div class="v811-stages">${d.stages.map(s=>`<div class="v811-stage"><strong>${enc(s.name)}</strong><div class="when">${enc(s.when)}</div><p>${enc(s.detail)}</p></div>`).join('')}</div>
 <h3>Vad bygger bedömningen på?</h3><ul class="v811-bullets">${d.observations.map(o=>`<li>${enc(o)}</li>`).join('')}</ul>
 <div class="v811-caution"><b>Vad vi inte kan slå fast</b><p>${enc(d.limits)}</p></div>
 <h3>Undersök själv</h3><p><b>${enc(d.question)}</b></p><div class="v811-links">${links}</div>
 <h3>Gå vidare i Tidens väv</h3><div class="v811-links">${related}${pairs||''}</div>
 <h3>Forskningsunderlag och textvittnen</h3><div class="v811-sources">${sourceLinks}</div>
 <div class="v811-links"><button type="button" data-v811add="${enc(d.id)}" class="v811-compare-action">${v811Compare.includes(d.id)?'Ta bort ur jämförelse':'＋ Jämför denna text med en annan'}</button></div>
 <p class="tiny">Tillkomstperioder är pedagogiska intervall och kan representera flera olika redaktionella modeller. Datering av handskrifter är inte datering av originalverk. Källurvalet är en forskningsöversikt, inte en kritisk fulltextutgåva.</p></article>`;
}
function v811CompareHtml(){if(!v811Compare.length)return '';
 const rows=v811Compare.map(id=>v811Get(id)).filter(Boolean);
 return `<section class="v811-comparison" id="v811Comparison"><div style="display:flex;flex-wrap:wrap;justify-content:space-between;gap:10px"><h3>Jämför tillkomsthistorier (${rows.length}/2)</h3><button type="button" class="v811-compare-action" data-v811clear>Rensa</button></div>${rows.length===1?'<div class="v811-empty">Välj ytterligare en fallstudie för att jämföra berättad tid, skriftlig tillkomst och bevarade textvittnen.</div>':`<div class="v811-comparegrid">${rows.map(d=>`<div><h4>${enc(d.title)}</h4><dl><dt>Berättad tid</dt><dd>${enc(d.setting)}</dd><dt>Komposition / redaktion</dt><dd>${enc(d.composition.label)}</dd><dt>Textvittnen</dt><dd>${enc(d.witness.label)}</dd><dt>Osäkerhet</dt><dd>${enc(d.limits)}</dd></dl><button class="v811-compare-action" type="button" data-v811select="${enc(d.id)}">Läs studien →</button></div>`).join('')}</div>`}</section>`;
}
function v811Render(){
 const root=el('formationView');if(!root)return;
 const areas=['Alla',...new Set(formationCasesV811.map(x=>x.area))];
 const filtered=formationCasesV811.filter(x=>(v811Area==='Alla'||x.area===v811Area)&&[x.title,x.scope,x.setting,x.area,...x.observations].join(' ').toLocaleLowerCase('sv').includes(v811Find.toLocaleLowerCase('sv')));
 let item=v811Get(v811Selected)||formationCasesV811[0];
 if(filtered.length&&!filtered.some(x=>x.id===item.id))item=filtered[0];
 root.innerHTML=`<header class="v811-hero"><div class="kicker">TIDENS VÄV · V8.11 · FORSKNINGSVERKTYG</div><h2>Hur växte Bibelns texter fram?</h2><p>Undersök hur äldre traditioner, redaktioner och bevarade handskrifter förhåller sig till varandra. De här datumen är inte en alternativ kronologi för vad som ”hände” i berättelserna.</p><div class="v811-methodgrid"><div><strong>1. Berättad tid</strong><span>När berättelsen är förlagd; ibland mytisk eller inte historiskt daterbar.</span></div><div><strong>2. Tillkomst och redaktion</strong><span>När forskare bedömer att texter sammanställdes eller omarbetades, ofta osäkert.</span></div><div><strong>3. Handskriftsvittnen</strong><span>De materiella kopior vi har i dag. De är ofta betydligt yngre än texten.</span></div></div></header>
 <div class="v811-controls"><label>Välj område<select id="v811Area">${areas.map(a=>`<option ${a===v811Area?'selected':''}>${enc(a)}</option>`).join('')}</select></label><label>Sök i fallstudier<input id="v811Search" type="search" placeholder="Sök t.ex. Jesaja eller textvittne" value="${enc(v811Find)}"/></label><span class="chip">${filtered.length} av ${formationCasesV811.length} studier</span></div>
 ${v811CompareHtml()}<div class="v811-layout"><div class="v811-directory" aria-label="Välj bok eller text">${filtered.map(d=>`<button type="button" class="v811-item ${d.id===item.id?'selected':''}" data-v811select="${enc(d.id)}" aria-pressed="${d.id===item.id}"><small>${enc(d.area)} · ${enc(d.scope)}</small><strong>${enc(d.title)}</strong><span>${enc(d.composition.label)}</span></button>`).join('')||'<div class="v811-empty">Inga studier matchar sökningen.</div>'}</div>${filtered.length?v811CaseHtml(item):'<div class="v811-empty">Justera sökningen för att läsa ett forskningskort.</div>'}</div>`;
 root.querySelector('#v811Area').onchange=e=>{v811Area=e.target.value;v811Render()};
 root.querySelector('#v811Search').oninput=e=>{v811Find=e.target.value;const pos=e.target.selectionStart;v811Render();const inp=el('v811Search');inp.focus();try{inp.setSelectionRange(pos,pos)}catch(_){}};
 root.querySelectorAll('[data-v811select]').forEach(b=>b.onclick=()=>{v811Selected=b.dataset.v811select;v811Render();});
 root.querySelectorAll('[data-v811post]').forEach(b=>b.onclick=()=>{setSelected(b.dataset.v811post)});
 root.querySelectorAll('[data-v811pair]').forEach(b=>b.onclick=()=>{v89PairId=b.dataset.v811pair;v810Theme='Alla';v89MotifIndex=0;view('parallels');});
 root.querySelectorAll('[data-v811add]').forEach(b=>b.onclick=()=>{const id=b.dataset.v811add;if(v811Compare.includes(id)){v811Compare=v811Compare.filter(x=>x!==id)}else{if(v811Compare.length>=2)v811Compare.shift();v811Compare.push(id)}v811Render();});
 root.querySelectorAll('[data-v811clear]').forEach(b=>b.onclick=()=>{v811Compare=[];v811Render()});
}
const v811PriorView=view;
view=function(destination){
 if(destination==='formation'){
  v84CloseReader(false);v84HideMore();state.view='formation';
  document.querySelectorAll('.main > section[id$="View"]').forEach(s=>s.classList.toggle('hidden',s.id!=='formationView'));
  document.querySelectorAll('.top .tab').forEach(b=>b.classList.toggle('active',b.id==='navFormation'));
  v811Render();v84RefreshNavigation();
  el('navFormation').classList.add('active');window.scrollTo({top:0,behavior:'instant'});
 }else{
  el('formationView').classList.add('hidden');el('navFormation').classList.remove('active');v811PriorView(destination);
 }
};
el('navFormation').onclick=()=>view('formation');
// From a historical research record, return directly to the related formation case.
const v811PriorRenderDetail=renderDetail;
renderDetail=function(){v811PriorRenderDetail();const cases=formationCasesV811.filter(c=>c.related.includes(state.selected));if(!cases.length)return;
 const box=document.createElement('div');box.className='v89-appendix';box.innerHTML=`<b>Textens tillkomst · V8.11</b><div class="v811-links">${cases.map(c=>`<button type="button" data-v811from="${enc(c.id)}">${enc(c.title)} →</button>`).join('')}</div>`;el('detail').appendChild(box);box.querySelectorAll('[data-v811from]').forEach(b=>b.onclick=()=>{v811Selected=b.dataset.v811from;view('formation')});
};
renderDetail();


// V8.12 – redaktionell guide och källkritisk kronologi, separerad från originalarkivet.
let v812Query='', v812Kind='Alla områden';
const v812Find=id=>editorialChronologyV812.find(d=>d.id===id);
const v812PrettyPeriod=d=>d.period||'Osäker datering';
function v812Start(){
 el('startView').innerHTML=`<div class="v812-hero"><div class="kicker">TIDENS VÄV · V8.31 · FORSKNINGSVERSION FÖR TESTLÄSNING</div><h1>Hur hänger världshistorien, Bibeln och de äldre texterna ihop?</h1><p>Följ civilisationer och historiska skeenden, läs källtexter bredvid varandra och undersök vad forskarna vet – och vad de fortfarande diskuterar. Börja med någon av de tre vägarna nedan.</p></div>
 <div class="v812-quick"><button data-v812dest="explore"><b>01 · Följ ett historiskt spår</b><span>Utforska bland annat Israels framväxt eller de första civilisationerna i sitt historiska sammanhang.</span><em>Öppna temaspår →</em></button><button data-v812dest="parallels"><b>02 · Jämför antika texter</b><span>Undersök Genesis, Gilgamesh, Enoksboken och andra traditioner – motiv för motiv, med textställen.</span><em>Öppna textjämförelser →</em></button><button data-v812dest="chronology"><b>03 · Kontrollera årtalen</b><span>Se källförankrade dateringsbedömningar och var originalarkets gamla årtal behöver rättas eller förstås annorlunda.</span><em>Öppna granskad kronologi →</em></button></div>
 <div class="v812-indicators"><span>171 tidslinjeposter totalt</span><span>13 textjämförelser</span><span>11 fallstudier om textens tillkomst</span><span>${editorialChronologyV812.length} nya kronologiska kontroller</span></div>
 <div class="v812-notes"><h3>Så läser du uppgifterna</h3><div class="v812-method"><div><b>Forskningsunderlag</b><p>Fördjupningar och granskade kronologinotiser anger källa, vilken uppgift den stöder och vad som är osäkert. En källa stöder inte automatiskt hela artikeln.</p></div><div><b>Originalarkiv</b><p>129 poster är bevarade från ett äldre arbetsark. Titlar, dateringar och kategorier kan vara felaktiga. Därför visas de inte som färdig historisk kunskap.</p></div><div><b>Tre skilda tider</b><p>Vi skiljer händelsens tid, en berättelses miljö och tidpunkten när en text skrevs eller redigerades.</p></div><div><b>Kartan</b><p>Geografiska områden är schematiska och gränserna är inte exakt historiskt rekonstruerade. Kartan är främst ett orienteringsstöd.</p></div></div></div>
 <div class="v812-notes"><h3>Vill du läsa Bibeln?</h3><p>Hänvisningar till bibliska kapitel öppnas på svenska i Bibel 2000 hos Bible.com. Andra antika texter öppnas hos respektive källutgåva. Internet behövs för dessa externa länkar.</p><button type="button" class="v811-compare-action" data-v812dest="formation">Undersök när Bibelns böcker skrevs →</button></div>`;
 el('startView').querySelectorAll('[data-v812dest]').forEach(b=>b.onclick=()=>view(b.dataset.v812dest));
}
function v812Chronology(){
 const themes=['Alla områden',...new Set(editorialChronologyV812.map(x=>x.kind))];
 const filtered=editorialChronologyV812.filter(d=>(v812Kind==='Alla områden'||d.kind===v812Kind)&&[d.title,d.id,d.summary,d.correction,d.kind,d.reference].join(' ').toLocaleLowerCase('sv').includes(v812Query.toLocaleLowerCase('sv'))).sort((a,b)=>(a.start===null? -1:a.start)-(b.start===null?-1:b.start));
 el('chronologyView').innerHTML=`<header class="v811-hero"><div class="kicker">V8.19 · KÄLLKRITISK KVALITETSKONTROLL</div><h2>Källprövad kronologi – med originalet bevarat</h2><p>Här skiljer vi mellan datum för faktiska historiska skeenden, litterär tillkomst och senare religiösa traditioner. Under varje kort står varför den ursprungliga dateringen ibland var missvisande. Tidsintervallen är inte bevisade exakta årtal.</p><div class="v812-indicators"><span>${editorialChronologyV812.length} prioriterade poster</span><span>${editorialChronologyV812.reduce((n,d)=>n+d.sources.length,0)} ämnesspecifika hänvisningar</span><span>129 originalposter finns kvar orörda</span></div></header>
 <div class="v812-controls"><label>Område<select id="v812Kind">${themes.map(t=>`<option ${t===v812Kind?'selected':''}>${enc(t)}</option>`).join('')}</select></label><label>Sök ämne eller text<input type="search" id="v812Find" placeholder="t.ex. Jesus, exil, Baalbek" value="${enc(v812Query)}"/></label><span class="chip">${filtered.length} av ${editorialChronologyV812.length}</span></div>
 <div class="v812-feature-list">${filtered.map(d=>`<article class="v812-feature" data-v812card="${enc(d.id)}"><div class="v812-feature-meta">${enc(d.kind)} · ${enc(d.id)} · ${enc(v812PrettyPeriod(d))}</div><h3>${enc(d.title)}</h3><p>${enc(d.summary)}</p><div class="v812-feature-note"><b>Vad var problemet i originalet?</b> ${enc(d.correction)}</div><p class="v812-source-detail"><b>Evidens och osäkerhet:</b> ${enc(d.certainty)}</p><details class="v812-proof"><summary>Vilken uppgift stöder källan?</summary><ul>${d.sources.map(x=>`<li><b>${enc(x.name)}:</b> ${enc(x.supports)}</li>`).join('')}</ul></details><div class="v812-feature-src">${d.sources.map(x=>`<a href="${enc(x.url)}" title="${enc(x.supports)}" target="_blank" rel="noopener noreferrer">${enc(x.name)} ↗</a>`).join('')}<button type="button" data-v812original="${enc(d.id)}">Visa originalpost ${enc(d.id)} ↗</button></div></article>`).join('')||'<div class="v811-empty">Inget träffar den aktuella sökningen.</div>'}</div>`;
 el('v812Kind').onchange=e=>{v812Kind=e.target.value;v812Chronology()};
 el('v812Find').oninput=e=>{v812Query=e.target.value;let pos=e.target.selectionStart;v812Chronology();el('v812Find').focus();try{el('v812Find').setSelectionRange(pos,pos)}catch(_){}};
 el('chronologyView').querySelectorAll('[data-v812original]').forEach(b=>b.onclick=()=>setSelected(b.dataset.v812original));
}
const v812EarlierView=view;
view=function(dest){
 document.body.classList.toggle('v812-start',dest==='start');
 document.body.classList.toggle('v812-chronology',dest==='chronology');
 if(dest==='start'||dest==='chronology'){
  v84CloseReader(false);v84HideMore();
  state.view=dest;
  document.querySelectorAll('.main > section[id$="View"]').forEach(s=>s.classList.toggle('hidden',s.id!==dest+'View'));
  document.querySelectorAll('.top .tab').forEach(b=>b.classList.toggle('active',b.id==='nav'+dest[0].toUpperCase()+dest.slice(1)));
  if(dest==='start')v812Start();else v812Chronology();
  v84RefreshNavigation();
  window.scrollTo({top:0,behavior:'instant'});
 }else{
  el('startView').classList.add('hidden');el('chronologyView').classList.add('hidden');
  el('navStart').classList.remove('active');el('navChronology').classList.remove('active');
  v812EarlierView(dest);
 }
};
el('navStart').onclick=()=>view('start');el('navChronology').onclick=()=>view('chronology');
// Mobile nav was bound in V8.4 before these routes existed: replace handlers for newly added destinations.
document.querySelectorAll('[data-v84nav="start"],[data-v84nav="chronology"]').forEach(b=>b.onclick=()=>v84Go(b.dataset.v84nav));
// Make the original archive intelligible without altering or overwriting imported source data.
const v812EarlierArchive=renderArchive;
renderArchive=function(){
 v812EarlierArchive();
 el('archiveView').querySelectorAll('[data-original]').forEach(b=>{
  const e=originalEvents.find(x=>x.id===b.dataset.original), c=b.closest('.archive-card');
  if(!e||!c)return;
  if(e.category==='Bibelberättelser'&&e.sub){const h=c.querySelector('h4');if(h){h.innerHTML=`<span class="v812-archive-sub">${enc(e.sub)}</span><div class="v812-archive-oldtitle">Originalrubrik: ${enc(e.title)} · dateringen nedan är inte automatiskt händelsens tid</div>`;}}
  const d=v812Find(e.id);
  if(d){let tag=document.createElement('div');tag.className='tiny';tag.style.marginTop='8px';tag.textContent='Ny källkritisk dateringsnotis finns i Granskad kronologi.';c.querySelector('div').appendChild(tag);}
 });
};
const v812EarlierRenderDetail=renderDetail;
renderDetail=function(){
 v812EarlierRenderDetail();
 const e=idEvent(state.selected), d=v812Find(state.selected);
 if(!e?.original)return;
 const note=document.createElement('div');note.className='v812-flag';
 const additional=d?`<p><b>Redaktionell bedömning:</b> ${enc(d.title)} · ${enc(d.period)}.</p><p>${enc(d.correction)}</p><button data-v812jump type="button">Läs dateringskontrollen →</button>`:
   (e.category==='Bibelberättelser'?'<p>Äldre originaluppgift. För bibelberättelser kan årtalet avse en föreslagen texttillkomst i stället för när händelsen utspelar sig.</p>':'<p>Äldre originaluppgift. Den ursprungliga dateringen kan sammanföra skilda dynastier, händelser eller tidsperioder. Se tidslinjens separata källbedömningar för en mer precis tolkning.</p>');
 note.innerHTML='<strong>Viktigt om denna originalsiffra</strong>'+additional;
 const bar=el('detail').querySelector('.v84-reader-bar');if(bar)bar.insertAdjacentElement('afterend',note);else el('detail').prepend(note);
 const btn=note.querySelector('[data-v812jump]');if(btn)btn.onclick=()=>{v812Query=d.title;v812Kind='Alla områden';view('chronology')};
};
renderArchive(); renderDetail(); view('start');


// Förankrade V8.1-arbetsbedömningar för att tidsaxeln ska kunna visa människans tidiga historia.
const v814Prehistory = [
 {id:'O007',category:'Människans utveckling',start:-3850000,end:-2950000,title:'Australopithecus afarensis – artens tidsrymd',dating:'Fossilbaserat artintervall, ungefärligt. Lucy som individ levde cirka 3,2 miljoner år sedan.',status:'research'},
 {id:'O012',category:'Människans utveckling',start:-300000,end:-300000,title:'Tidiga Homo sapiens – fynd omkring 300 000 år',dating:'Fyndhorisont, inte en exakt tidpunkt för artens uppkomst.',status:'research'}
];
// V8.13 · Vetenskaplig dateringsmodell i tidslinjen. Originalfilen ändras aldrig.
let v813Scope='guided';
const v813EditorialMap=new Map(editorialChronologyV812.map(d=>[d.id,d]));
laneNames['Civilisation']='Civilisationer och historiska riken';
laneNames['Krig']='Krig och separata konflikter';
laneNames['Byggnadsverk']='Byggnadsverk och byggnadsfaser';
laneNames['Bibelberättelser']='Bibeltexter och berättelser · olika tidstyper';
const v813PhaseIds=new Set(timelinePhasesV813.map(d=>d.id));
// Äldre H-poster med samma historiska ämne finns kvar i Poster/Fördjupningar,
// men visas inte som dubbla tider när en särskild korrigering finns.
const v813Superseded=new Set(['H001','H015','H018','H024','H027','H028','H029','H030','H032','H035']);
function v813BaseEntries(){
 const curated=events.filter(e=>!v813Superseded.has(e.id)).map(e=>({...e,v813Status:'research',v813Label:e.title,v813Original:e.id}));
 const adopted=[];
 for(const d of editorialChronologyV812){
  if(d.start==null||d.end==null||v813PhaseIds.has(d.id))continue;
  const original=originalEvents.find(x=>x.id===d.id);if(!original)continue;
  adopted.push({...original,start:d.start,end:d.end,title:d.title,displayTitle:d.title,v813Label:d.title,v813Original:d.id,v813Status:'assessed',v813Dossier:d,dating:d.kind});
 }
 const segmented=timelinePhasesV813.map((d,i)=>{
  const original=originalEvents.find(x=>x.id===d.id);
  return {...original,...d,id:d.id,v813Part:i,v813Label:d.title,v813Original:d.id,v813Status:'phased',v813Dossier:d,dating:d.type};
 });
 return {curated,adopted,segmented};
}
function v813Entries(){
 const {curated,adopted,segmented}=v813BaseEntries();
 if(v813Scope==='checked')return [...adopted,...segmented];
 return [...curated,...adopted,...segmented,...v814PrehistoryEntries()];
}

function v813Allowed(e){
 const q=el('search').value.toLocaleLowerCase('sv');
 return state.cat.has(e.category) && (e.v813Status!=='original'||state.ev.has('Ej granskad')) &&
    (e.v813Status==='original'||state.ev.has(e.evidence)||e.v813Status==='assessed'||e.v813Status==='phased') &&
    (e.end>=state.min&&e.start<=state.max) &&
    (!q||[e.v813Label,e.title,e.sub,e.description,e.bible,e.category,e.id,e.dating].join(' ').toLocaleLowerCase('sv').includes(q));
}
function v813StatusText(e){return ({research:'Forskningspost · datering preliminär',assessed:'Särskilt källprövad dateringsbedömning',phased:'Källbedömd historisk fas',original:'Importerad Exceluppgift – ej granskad'})[e.v813Status]}
function v813DateString(e){return e.start===e.end?fmt(e.start):`${fmt(e.start)} – ${fmt(e.end)}`}
function v813Palette(e){return e.v813Status==='phased'?'#1c766c':e.v813Status==='assessed'?'#2c6b9b':e.v813Status==='original'?'#a8acb9':'#70859c'}
function v813Pick(entries,n=8){
 if(entries.length<=n)return entries;
 const s=entries.slice().sort((a,b)=>a.start-b.start||a.end-b.end);
 const ids=new Set();const out=[];
 for(let i=0;i<n;i++){
  let idx=Math.round((s.length-1)*i/(n-1));
  // Nearby records may share an interval: favour a distinct year when possible.
  let preferred=idx;
  if(out.length&&s[preferred].start===out[out.length-1].start){
   for(let j=idx+1;j<s.length;j++){if(s[j].start!==out[out.length-1].start&&!ids.has(`${s[j].id}:${s[j].start}`)){preferred=j;break}}
  }
  let k=`${s[preferred].id}:${s[preferred].start}:${s[preferred].end}`;
  if(!ids.has(k)){out.push(s[preferred]);ids.add(k)}
 }
 return out;
}
function v813Card(e){return `<button class="v813-list-item ${e.v813Status} ${e.id===state.selected?'selected':''}" type="button" data-v813read="${enc(e.id)}" title="${enc(v813StatusText(e))}"><strong>${enc(e.v813Label)}</strong><span>${enc(v813DateString(e))}</span><small>${enc(v813StatusText(e))}${e.v813Status==='original'?' · ursprungstider': ''}</small></button>`}
function v813Timeline(){
 const included=v813Entries();const entries=included.filter(v813Allowed).sort((a,b)=>a.start-b.start||a.end-b.end);
 const shownOriginal=entries.filter(e=>e.v813Status==='original').length;
 const shownAssessed=entries.filter(e=>e.v813Status==='assessed').length;
 const shownPhased=entries.filter(e=>e.v813Status==='phased').length;
 const shownCurated=entries.filter(e=>e.v813Status==='research').length;
 const distinctDated=new Set(entries.filter(e=>e.v813Status!=='research').map(x=>x.v813Original)).size;
 el('visible').textContent=`${entries.length} tidsmarkeringar · ${shownCurated} forskningsposter · ${shownAssessed} särskilt källprövade · ${shownPhased} historiska faser${shownOriginal?' · '+shownOriginal+' original':''}`;
 el('v7stats').textContent=v7Mode==='compact'?'Kronologisk översikt; välj Alla poster för proportionell graf / fullständig lista.':'Proportionell tidsaxel på dator · kronologisk lista på mobil. Smala streck markerar korta förlopp, inte breda block.';
 el('v813Summary').innerHTML=`<span><b>${editorialChronologyV812.length} dateringsnotiser</b> sedan V8.12–V8.17; ${editorialChronologyV812.filter(x=>x.start!==null).length} kan ritas på tidsaxeln.</span><span><b>${timelinePhasesV813.length} fasmarkeringar</b> för ${v813PhaseIds.size} sammansatta originalposter.</span><span><b>Importerade schablonårtal visas inte.</b> Originalarkivet finns kvar för spårbarhet.</span>`;
 const span=Math.max(1,state.max-state.min);
 const steps=span>1000000?500000:span>100000?50000:span>10000?2000:span>5000?1000:span>1800?500:span>700?200:span>250?100:span>100?50:span>45?10:5;
 el('timelineView').classList.toggle('v814-scale-mode',v7Mode!=='compact');
 if(v7Mode==='compact'){
  el('axis').innerHTML=`<span class="tick" style="left:5%">${fmt(state.min)}</span><span class="tick" style="left:47%">${fmt(Math.round((state.min+state.max)/2))}</span><span class="tick" style="left:86%">${fmt(state.max)}</span>`;
  el('epochs').innerHTML='<div class="epoch" style="width:100%;background:#eaf1f8">Urval av historiska nedslag – korten är inte ritade i tidsskala</div>';
  el('lanes').innerHTML=Object.entries(laneNames).map(([cat,label])=>{const group=entries.filter(e=>e.category===cat);if(!group.length)return '';const shown=v813Pick(group,8);return `<section class="v7group v813-group"><h3>${enc(label)} <span class="small">(${group.length} markeringar)</span></h3><div class="v813-cardgrid">${shown.map(v813Card).join('')}</div>${group.length>shown.length?'<p class="tiny">Fler tider finns under Alla poster eller genom att välja ett snävare tidsintervall.</p>':''}</section>`}).join('')||'<div class="empty">Inga poster i tidsintervallet med valt visningsläge. Justera period eller filter.</div>';
 }else{
  const ticks=v814AxisTicks(state.min,state.max,el('axis').getBoundingClientRect().width);
  el('axis').innerHTML=ticks.map(t=>`<span class="tick" style="left:${t.left}%">${v814AxisLabel(t.year,span)}</span>`).join('');
  el('epochs').innerHTML='<div class="epoch" style="width:100%;background:#edf3fa">Tidsaxel – intervall i verklig längd, korta händelser som markörer</div>';
  el('lanes').innerHTML=Object.entries(laneNames).map(([cat,label])=>{
   const group=entries.filter(e=>e.category===cat);if(!group.length)return '';
   const rows=group.map(e=>{
    const s=Math.max(e.start,state.min),t=Math.min(e.end,state.max);let x=(s-state.min)/span*100;const w=Math.max(0,(t-s)/span*100);let isPoint=e.start===e.end||w<.45;
    const left=Math.min(99.5,Math.max(0,x));const end=Math.min(100,left+w);
    const alignRight=x>76;
    const label=`${enc(e.v813Label)} (${enc(v813DateString(e))})`;
    return `<div class="v813-plotrow ${e.v813Status}" data-v813id="${enc(e.id)}"><div class="v813-plotline">${isPoint?`<span class="v813-dot" style="left:${left}%" title="${label}"></span>`:`<span class="v813-range" style="left:${left}%;width:${Math.max(.2,end-left)}%;background:${v813Palette(e)}" title="${label}"></span>`}<button type="button" data-v813read="${enc(e.id)}" class="v813-plotlabel ${alignRight?'right':''}" style="left:${left}%" title="${label}">${enc(e.v813Label)}</button></div><span class="v813-plotdate">${enc(v813DateString(e))}</span></div>`;
   }).join('');
   return `<section class="v813-chartgroup"><header><b>${enc(label)}</b><span>${group.length} tider</span></header><div class="v813-chartrows">${rows}</div></section>`;
  }).join('')||'<div class="empty">Inga daterade poster i valt intervall.</div>';
 }
 el('lanes').querySelectorAll('[data-v813read]').forEach(b=>b.onclick=()=>setSelected(b.dataset.v813read));
}
renderTimeline=v813Timeline;
function v813RefreshSourceNote(){
 const originalId=state.selected;
 const phases=timelinePhasesV813.filter(x=>x.id===originalId), note=v813EditorialMap.get(originalId);
 if(!phases.length&&!note)return;
 const box=document.createElement('section');box.className='v813-reader-note';
 const sets=phases.length?phases:[note];
 box.innerHTML=`<div class="kicker">KÄLLFÖRANKRADE TIDSPERIODER · UPPDATERAD V8.18</div><h3>Rekommenderad visning på tidslinjen</h3>${sets.map(x=>`<div class="v813-sourceinterval"><b>${enc(x.title)}</b><span>${enc(x.period||v813DateString(x))}</span>${x.explanation?`<p>${enc(x.explanation)}</p>`:''}${x.certainty?`<p>${enc(x.certainty)}</p>`:''}${x.sources?`<div class="v813-sourcelinks">${x.sources.map(u=>`<a target="_blank" rel="noopener noreferrer" href="${enc(u.url)}" title="${enc(u.supports)}">${enc(u.name)} ↗</a>`).join('')}</div>`:''}</div>`).join('')}<p class="tiny">Ursprungliga årtal finns kvar i Originalarkivet. Här redovisas särskilda dateringsbedömningar, inte nya historiska fakta utan källstöd.</p>`;
 const reader=el('detail'),flag=reader.querySelector('.v812-flag'),bar=reader.querySelector('.v84-reader-bar');
 if(flag)flag.insertAdjacentElement('afterend',box);else if(bar)bar.insertAdjacentElement('afterend',box);else reader.prepend(box);
}
const v813PriorDetail=renderDetail;
renderDetail=function(){v813PriorDetail();v813RefreshSourceNote();};
const v813PriorView=view;
view=function(dest){v813PriorView(dest);if(dest==='timeline'){v813Timeline();}};
el('v813Scope').onchange=e=>{v813Scope=e.target.value;renderAll();};
el('v813Method').onclick=()=>{const d=el('v813MethodDetails');d.open=!d.open;if(d.open)d.scrollIntoView({block:'nearest',behavior:'smooth'});};
// A reviewed interval should also inform searches, not only the plotted axis.
renderTimeline();renderDetail();


// V8.14 – användarstyrd tidsaxel och forskningsstatus. Originaldata används inte för plottning.

function v814PrehistoryEntries(){
 return v814Prehistory.map(x=>{const orig=originalEvents.find(o=>o.id===x.id);return {...orig,...x,v813Status:'research',v813Label:x.title,v813Original:x.id,evidence:'Osäker'};});
}
function v814FilterMatch(e){
 const q=el('search').value.trim().toLocaleLowerCase('sv');
 return state.cat.has(e.category) &&
  (e.v813Status==='assessed'||e.v813Status==='phased'||state.ev.has(e.evidence)) &&
  (!q||[e.v813Label,e.title,e.sub,e.description,e.bible,e.category,e.id,e.dating].join(' ').toLocaleLowerCase('sv').includes(q));
}
function v814AutoFit(){
 const active=v813Entries().filter(v814FilterMatch);
 if(!active.length){window.v814FitResult='empty';return false;}
 let lo=Math.min(...active.map(e=>e.start));
 let hi=Math.max(...active.map(e=>e.end));
 const span=Math.max(1,hi-lo);
 // Små marginaler: automatisk skalning ändrar aldrig posternas faktiska datum.
 const pad=span>100000?Math.round(span*.018):Math.max(12,Math.round(span*.035));
 state.min=Math.max(-3900000,Math.floor(lo-pad));
 state.max=Math.min(2100,Math.ceil(hi+pad));
 if(state.max<=state.min)state.max=state.min+1;
 window.v814FitResult={lo,hi,selectionCount:active.length,min:state.min,max:state.max};
 return true;
}
function v814ChooseMode(mode){
 v813Scope=mode==='checked'?'checked':'guided';
 el('v813Scope').value=v813Scope;
 v814AutoFit();renderAll();
}
// The date scale describes actual included posts and adapts directly when a category changes.
el('catFilters').querySelectorAll('input').forEach(input=>input.addEventListener('change',()=>{
 if(state.view==='timeline'){v814AutoFit();renderAll();}
}));
el('evFilters').querySelectorAll('input').forEach(input=>input.addEventListener('change',()=>{
 if(state.view==='timeline'){v814AutoFit();renderAll();}
}));
el('search').addEventListener('input',()=>{
 if(state.view==='timeline'){v814AutoFit();renderAll();}
});
el('v813Scope').onchange=e=>v814ChooseMode(e.target.value);
el('fitAll').onclick=()=>v814AutoFit()&&renderAll();
const v814PreviousPresets=renderPresets;
// "Hela tidsrymden" betyder här hela det filtrerade forskningsunderlaget.
el('v7focus').onchange=e=>e.target.value==='all'?(v814AutoFit()&&renderAll()):v7ApplyPeriod(e.target.value);
el('presets').querySelectorAll('[data-p]').forEach(btn=>{
 const idx=Number(btn.dataset.p);
 if(periods[idx] && periods[idx][0]==='Hela materialet'){
  btn.onclick=()=>{el('v7focus').value='all';if(v814AutoFit())renderAll();};
  btn.textContent='Hela forskningsurvalet';
 }
});
// Dynamiskt takavstånd för vänstermenyn och den fastklistrade tidsskalan.
function v814UpdateHeader(){
 const top=document.querySelector('.top');
 const desktop=window.matchMedia('(min-width:901px)').matches;
 const ht=desktop&&top?Math.ceil(top.getBoundingClientRect().height):0;
 document.documentElement.style.setProperty('--tv-header-height',ht+'px');
}
if(window.ResizeObserver){new ResizeObserver(v814UpdateHeader).observe(document.querySelector('.top'));}
window.addEventListener('resize',v814UpdateHeader);
v814UpdateHeader();
// Tidsperioden vid första inträdet utgår från vald fokusperiod; "Anpassa" anpassar till aktuella filter.

// Maximal läsbar ticktäthet, även vid 3–4 miljoner års spann.
function v814AxisTicks(lo,hi,pixels){
 const span=Math.max(1,hi-lo),target=Math.max(2,Math.floor((pixels||650)/130));
 const rough=span/target,power=10**Math.floor(Math.log10(rough));
 const base=rough/power,unit=(base<=1?1:base<=2?2:base<=5?5:10)*power;
 const ticks=[];
 for(let y=Math.ceil(lo/unit)*unit;y<=hi;y+=unit){ticks.push({year:y,left:(y-lo)/span*100});if(ticks.length>14)break;}
 if(ticks.length<2){return [{year:lo,left:0},{year:hi,left:100}];}
 return ticks;
}
function v814AxisLabel(y,span){
 if(y===0)return 'kring år 1';
 if(Math.abs(y)>=1000000){return (Math.abs(y)/1000000).toLocaleString('sv-SE',{maximumFractionDigits:1})+' milj. '+(y<0?'f.Kr.':'e.Kr.');}
 return fmt(y);
}
// V8.1:s forskningsbaserade förhistoriska markörer skiljer artintervall från enskilda fossil.
const v814PrevDetail=renderDetail;
renderDetail=function(){
 v814PrevDetail();
 const e=v814Prehistory.find(x=>x.id===state.selected);
 if(!e)return;
 const research=v81Research[state.selected];
 const note=document.createElement('section');note.className='v813-reader-note';
 const msg=e.id==='O007'?'Tidslinjens intervall avser artens fossilhistoriska tid, inte Lucys personliga livstid (omkring 3,2 miljoner år sedan).':'Cirka 300 000 år avser en fossilbaserad fyndhorisont, inte ett exakt datum för artens uppkomst.';
 note.innerHTML=`<div class="kicker">V8.14 · DATERINGSFÖRKLARING</div><h3>${enc(e.title)}</h3><p>${enc(msg)}</p>${research?.sources?.map(v=>`<a target="_blank" rel="noopener noreferrer" href="${enc(v[1])}" style="display:block;margin-top:6px">${enc(v[0])} ↗</a>`).join('')||''}`;
 el('detail').appendChild(note);
};


// V8.15 – hierarkisk, proportionell tidslinje. Tillståndet behålls mellan filtreringar och vybyten.
// Hopfällning är endast presentation: posterna förblir med i filtret och tidsaxelns beräkning.
const v815Collapsed = new Set(Object.keys(laneNames));
function v815RenderCategorySummary(group, index) {
 const lo=Math.max(state.min, Math.min(...group.map(e=>e.start)));
 const hi=Math.min(state.max, Math.max(...group.map(e=>e.end)));
 const span=Math.max(1,state.max-state.min);
 const left=Math.min(100,Math.max(0,100*(lo-state.min)/span));
 const right=Math.min(100,Math.max(0,100*(hi-state.min)/span));
 const single=right-left<.12;
 const dateText=lo===hi?fmt(lo):`${fmt(lo)} – ${fmt(hi)}`;
 return `<div class="v815-summaryrow" role="img" aria-label="Tidsutbredning för kategorins ${group.length} synliga poster: ${enc(dateText)}. Innebär inte en sammanhängande historisk händelse." title="Tidigaste början till senaste slut bland kategorins synliga poster – inte en sammanhängande epok"><div class="v815-summarytrack">${single?`<span class="v815-summarypoint" style="left:${left}%"></span>`:`<span class="v815-summaryline" style="left:${left}%;width:${Math.max(.12,right-left)}%"></span><span class="v815-endpoint" style="left:${left}%"></span><span class="v815-endpoint" style="left:${right}%"></span>`}</div><span class="v815-summarydate">${enc(dateText)}</span></div>`;
}
function v815EnhanceTimeline() {
 const container=el('lanes');if(!container)return;
 const groups=v813Entries().filter(v813Allowed);
 const ordered=Object.entries(laneNames).filter(([cat])=>groups.some(e=>e.category===cat));
 const nodes=[...container.children].filter(n=>n.matches('.v813-chartgroup,.v7group'));
 // Båda visningslägena använder samma skalningsformel för sammanfattningsstrecken.
 const compact=v7Mode==='compact';
 el('timelineView').classList.add('v815-hierarchical');
 if(compact){
  const ticks=v814AxisTicks(state.min,state.max,el('axis').getBoundingClientRect().width);
  el('axis').innerHTML=ticks.map(t=>`<span class="tick" style="left:${t.left}%">${v814AxisLabel(t.year,Math.max(1,state.max-state.min))}</span>`).join('');
  el('epochs').innerHTML='<div class="epoch" style="width:100%;background:#edf3fa">Kategoriernas tidsstreck är proportionella · postkorten i översikten är inte skalenliga</div>';
 }
 ordered.forEach(([cat,label],i)=>{
  const section=nodes[i];if(!section)return;
  const group=groups.filter(e=>e.category===cat);
  const body=section.querySelector(compact?'.v813-cardgrid':'.v813-chartrows');
  const heading=section.querySelector(compact?'h3':'header');
  if(!heading||!body)return;
  const folded=v815Collapsed.has(cat);
  const controlId=`v815-section-${i}`;
  body.id=controlId;
  const header=document.createElement(compact?'div':'header');
  if(compact)header.className='v815-compact-header';
  header.innerHTML=`<button type="button" class="v815-toggle" data-v815-cat="${enc(cat)}" aria-controls="${controlId}" aria-expanded="${!folded}" title="${folded?'Visa':'Dölj'} poster i ${enc(label)}"><span class="v815-chevron" aria-hidden="true">${folded?'▸':'▾'}</span><strong>${enc(label)}</strong><span class="v815-count">${group.length} ${group.length===1?'post':'poster'}</span><span class="v815-action">${folded?'Visa poster':'Fäll ihop'}</span></button>`;
  heading.replaceWith(header);
  header.insertAdjacentHTML('afterend',v815RenderCategorySummary(group,i));
  section.dataset.v815Category=cat;
  section.classList.toggle('v815-folded',folded);
  section.classList.add('v815-category');
  header.querySelector('.v815-toggle').addEventListener('click',()=>{
   if(v815Collapsed.has(cat))v815Collapsed.delete(cat);else v815Collapsed.add(cat);
   // No date change and no re-rendering needed; preserve position and current selection.
   const isFolded=v815Collapsed.has(cat);
   section.classList.toggle('v815-folded',isFolded);
   const btn=header.querySelector('.v815-toggle');
   btn.setAttribute('aria-expanded',String(!isFolded));
   btn.querySelector('.v815-chevron').textContent=isFolded?'▸':'▾';
   btn.querySelector('.v815-action').textContent=isFolded?'Visa poster':'Fäll ihop';
   btn.title=(isFolded?'Visa':'Dölj')+' poster i '+label;
   const active=[...el('lanes').querySelectorAll('.v815-category')];
   el('v815CollapseStatus').textContent=`${active.filter(s=>v815Collapsed.has(s.dataset.v815Category)).length} av ${active.length} kategorier hopfällda`;
  });
 });
 const status=el('v815CollapseStatus');if(status){status.textContent=`${ordered.filter(([c])=>v815Collapsed.has(c)).length} av ${ordered.length} kategorier hopfällda`}
}
const v815PreviousTimeline=v813Timeline;
v813Timeline=function(){v815PreviousTimeline();v815EnhanceTimeline();};
renderTimeline=v813Timeline;
function v815SetAll(collapse){
 if(collapse){Object.keys(laneNames).forEach(c=>v815Collapsed.add(c));}
 else v815Collapsed.clear();
 v815EnhanceWithoutRerender();
}
function v815EnhanceWithoutRerender(){
 el('lanes').querySelectorAll('.v815-category').forEach(section=>{
  const cat=section.dataset.v815Category, folded=v815Collapsed.has(cat);
  section.classList.toggle('v815-folded',folded);
  const btn=section.querySelector('.v815-toggle');
  btn.setAttribute('aria-expanded',String(!folded));
  btn.querySelector('.v815-chevron').textContent=folded?'▸':'▾';
  btn.querySelector('.v815-action').textContent=folded?'Visa poster':'Fäll ihop';
 });
 const nodes=el('lanes').querySelectorAll('.v815-category');
 el('v815CollapseStatus').textContent=`${[...nodes].filter(s=>v815Collapsed.has(s.dataset.v815Category)).length} av ${nodes.length} kategorier hopfällda`;
}
el('v815CollapseAll').addEventListener('click',()=>v815SetAll(true));
el('v815ExpandAll').addEventListener('click',()=>v815SetAll(false));
// Correct the initial V8.14 rendering to include fold controls after initialization.
renderTimeline();


// V8.18 – archaeological comparison: a biblical text is not automatically independent corroboration.
let v818Filter='Alla ämnen',v818Query='',v818Expanded='A05';
function v818Render(){
 const kinds=['Alla ämnen',...new Set(archaeologyCasesV818.map(x=>x.tag))];
 const selected=archaeologyCasesV818.filter(c=>(v818Filter==='Alla ämnen'||c.tag===v818Filter)&&[c.title,c.period,c.archaeology,c.biblical,c.id].join(' ').toLocaleLowerCase('sv').includes(v818Query.toLocaleLowerCase('sv')));
 el('archaeologyView').innerHTML=`<header class="v818-hero"><div class="kicker">V8.19 · KUNGARIKENA OCH ARKEOLOGI</div><h2>David, Salomo, Omri och Ahab – vad kan beläggas?</h2><p>Undersök Israels och Judas tidiga historia genom att hålla isär <b>berättelse</b>, <b>materiellt fynd</b>, <b>historisk tolkning</b> och <b>vad som inte går att belägga</b>. Samma fynd kan leda till olika forskarslutsatser.</p><div class="v812-indicators"><span>${archaeologyCasesV818.length} källkritiska fallstudier</span><span>${archaeologyCasesV818.reduce((n,c)=>n+c.sources.length,0)} ämnesspecifika forskningshänvisningar</span><span>Inga erövringsår sätts utan oberoende belägg</span></div></header>
 <div class="v818-controls"><label>Forskningsområde<select id="v818Filter">${kinds.map(k=>`<option ${v818Filter===k?'selected':''}>${enc(k)}</option>`).join('')}</select></label><label>Sök fallstudie<input id="v818Query" type="search" value="${enc(v818Query)}" placeholder="Jeriko, David, Merneptah …"/></label><span class="chip">${selected.length} av ${archaeologyCasesV818.length}</span></div>
 <div class="v818-cases">${selected.map(c=>`<article class="v818-case" id="v818-${enc(c.id)}"><button type="button" class="v818-head" data-v818open="${enc(c.id)}" aria-expanded="${v818Expanded===c.id}"><span><span class="v818-tag">${enc(c.tag)} · ${enc(c.period)}</span><strong>${enc(c.title)}</strong><span class="tiny">${enc(c.status)}</span></span><span aria-hidden="true">${v818Expanded===c.id?'▾':'▸'}</span></button>${v818Expanded===c.id?`<div class="v818-details"><div class="v818-grid"><section><h4>Vad säger Bibeln?</h4><p>${enc(c.biblical)}</p></section><section><h4>Vad visar fynden?</h4><p>${enc(c.archaeology)}</p></section><section><h4>Vad kan vi dra för slutsats?</h4><p>${enc(c.assessment)}</p></section><section class="v818-limits"><h4>Vad bevisar detta inte?</h4><p>${enc(c.limits)}</p></section></div>${Array.isArray(c.positions)&&c.positions.length?`<div class="v819-debate"><div class="v819-debate-title">Två publicerade tolkningar – pröva argumenten</div><div class="v819-debate-grid">${c.positions.map(p=>`<section><h4>${enc(p.school)}</h4><p>${enc(p.claim)}</p><p class="tiny"><b>Argument:</b> ${enc(p.support)}</p></section>`).join('')}</div><p class="tiny">Olika forskningspositioner innebär inte att alla slutsatser har samma stöd. Läs originalartiklarna innan du bedömer konflikten.</p></div>`:''}<details class="v812-proof"><summary>Källornas räckvidd</summary><ul>${c.sources.map(u=>`<li><b>${enc(u.name)}:</b> ${enc(u.supports)}</li>`).join('')}</ul></details><div class="v818-links">${c.sources.map(u=>`<a target="_blank" rel="noopener noreferrer" href="${enc(u.url)}">${enc(u.name)} ↗</a>`).join('')}${c.bibleLinks.map(u=>`<a target="_blank" rel="noopener noreferrer" href="${enc(u.url)}">${enc(u.name)} ↗</a>`).join('')}${c.linked?`<button type="button" data-v818event="${enc(c.linked)}">Öppna tidslinjepost →</button>`:''}</div></div>`:''}</article>`).join('')||'<p>Inga fallstudier matchar sökningen.</p>'}</div><div class="v818-method"><b>Viktigt:</b> En inskrift kan ge ett starkt belägg för en plats, en dynasti eller ett namn, utan att bekräfta en hel biblisk berättelse. Dateringar av arkeologiska föremål är inte alltid datum för de händelser texten berättar om.</div>`;
 el('v818Filter').onchange=e=>{v818Filter=e.target.value;v818Render()};
 el('v818Query').oninput=e=>{v818Query=e.target.value;const pos=e.target.selectionStart;v818Render();el('v818Query').focus();try{el('v818Query').setSelectionRange(pos,pos)}catch(_){}};
 el('archaeologyView').querySelectorAll('[data-v818open]').forEach(b=>b.onclick=()=>{v818Expanded=v818Expanded===b.dataset.v818open?'':b.dataset.v818open;v818Render()});
 el('archaeologyView').querySelectorAll('[data-v818event]').forEach(b=>{b.onclick=()=>{setSelected(b.dataset.v818event);if(window.innerWidth<820)v84OpenReader()}});
}
const v818EarlierView=view;
view=function(dest){
 if(dest==='archaeology'){
  if(!archaeologyCasesV818.some(c=>c.linked===state.selected)){state.selected='H045';renderDetail();updateMini();}
  v84CloseReader(false);v84HideMore();state.view='archaeology';document.body.classList.remove('v812-start','v812-chronology');
  document.querySelectorAll('.main > section[id$="View"]').forEach(s=>s.classList.toggle('hidden',s.id!=='archaeologyView'));
  document.querySelectorAll('.top .tab').forEach(b=>b.classList.toggle('active',b.id==='navArchaeology'));
  v818Render();v84RefreshNavigation();window.scrollTo({top:0,behavior:'instant'});
 }else{el('archaeologyView').classList.add('hidden');el('navArchaeology').classList.remove('active');v818EarlierView(dest)}
};
el('navArchaeology').onclick=()=>view('archaeology');
document.querySelectorAll('[data-v84nav="archaeology"]').forEach(b=>b.onclick=()=>v84Go('archaeology'));
const v818EarlierDetail=renderDetail;
renderDetail=function(){v818EarlierDetail();const matches=archaeologyCasesV818.filter(c=>c.linked===state.selected);if(!matches.length)return;const panel=document.createElement('section');panel.className='v818-reader';panel.innerHTML=`<h3>Arkeologi &amp; Bibeln</h3><p>Jämför denna händelse med de materiella fynden och Bibelns berättelse. De är olika sorters källor.</p>${matches.map(c=>`<button data-v818jump="${enc(c.id)}" type="button">${enc(c.title)} →</button>`).join('')}`;el('detail').appendChild(panel);panel.querySelectorAll('[data-v818jump]').forEach(b=>b.onclick=()=>{v818Expanded=b.dataset.v818jump;v818Filter='Alla ämnen';v818Query='';view('archaeology')});};
// Link the new investigative route from the first-visit start page.
const v818EarlierStart=v812Start;
v812Start=function(){v818EarlierStart();const first=el('startView').querySelector('.v812-quick');if(first){const b=document.createElement('button');b.type='button';b.innerHTML='<b>04 · Vad kan arkeologin belägga?</b><span>Jeriko, Merneptah, Davids hus och den tidiga israelitiska historien.</span><em>Öppna Arkeologi &amp; Bibeln →</em>';b.onclick=()=>view('archaeology');first.appendChild(b)}const indicator=el('startView').querySelector('.v812-indicators span');if(indicator)indicator.textContent=events.length+originalEvents.length+' tidslinjeposter totalt';};
// Keep the chronology counter and visible app version accurate.
const v818EarlierChronology=v812Chronology;
v812Chronology=function(){v818EarlierChronology();const k=el('chronologyView').querySelector('.v811-hero .kicker');if(k)k.textContent='V8.19 · KÄLLKRITISK KVALITETSKONTROLL';};
const v818PreviousRenderTimeline=renderTimeline;
renderTimeline=function(){v818PreviousRenderTimeline();const s=el('v813Summary');if(s){s.querySelectorAll('span').forEach(n=>{if(n.textContent.includes('V8.12–V8.17'))n.innerHTML=n.innerHTML.replace('V8.12–V8.17','V8.12–V8.19')})}};


// V8.20 – Religionshistorisk undersökningsvy. Källmaterial i data/religionshistoria_v820.json.
let v820Filter='Alla teman',v820Query='',v820Expanded='R04';
function v820Render(){
 const host=el('religionView');
 const themes=['Alla teman',...new Set(religionCasesV820.map(c=>c.theme))];
 const cards=religionCasesV820.filter(c=>(v820Filter==='Alla teman'||c.theme===v820Filter)&&[c.title,c.summary,c.period,c.kind].join(' ').toLocaleLowerCase('sv').includes(v820Query.toLocaleLowerCase('sv')));
 host.innerHTML=`<header class="v820-hero"><div class="kicker">V8.20 · RELIGIONSHISTORISK KÄLLGRANSKNING</div><h2>Från El och Baal till Jahve och monoteismen</h2><p>Följ olika vittnen till religionernas förändring i Israel och Juda. <b>Fynd och belagda textformuleringar</b> skiljs från <b>historiska rekonstruktioner</b> och <b>senare teologiska tolkningar</b>. Olika grupper kan samtidigt ha praktiserat olika former av tro.</p><div class="v820-headstats"><span>${religionCasesV820.length} undersökningar</span><span>${religionCasesV820.reduce((n,c)=>n+c.sources.length,0)} ämnesspecifika forskningslänkar</span><span>4 nya tidsmarkeringar med avgränsad betydelse</span></div></header>
 <div class="v820-phases" aria-label="Historiska sammanhang"><div><strong>Sen bronsålder</strong><small>Ugarits bevarade texter</small></div><div><strong>Järnåldern</strong><small>Regionala Jahvetraditioner</small></div><div><strong>700–600-tal f.Kr.</strong><small>Pluralitet och reformideal</small></div><div><strong>Exil och eftertid</strong><small>Exklusiv gudsretorik</small></div></div><p class="v820-phase-note">Kronologiska forskningsmiljöer – <b>inte</b> fyra entydiga eller universella religionsstadier.</p>
 <div class="v820-controls"><label>Område<select id="v820Filter" aria-label="Välj religionshistoriskt tema">${themes.map(x=>`<option ${x===v820Filter?'selected':''}>${enc(x)}</option>`).join('')}</select></label><label>Sök<input id="v820Query" type="search" value="${enc(v820Query)}" placeholder="Ashera, Ps 82, monolatri …" aria-label="Sök religionshistoriska fall"></label><span class="chip">${cards.length} av ${religionCasesV820.length}</span></div>
 <div class="v820-cards">${cards.map(c=>`<article class="v820-card" id="v820-${enc(c.id)}"><button type="button" data-v820open="${enc(c.id)}" class="v820-cardhead" aria-expanded="${v820Expanded===c.id}"><span><span class="v820-label">${enc(c.theme)} · ${enc(c.kind)} · ${enc(c.period)}</span><strong>${enc(c.title)}</strong><small>${enc(c.status)}</small></span><span aria-hidden="true">${v820Expanded===c.id?'▾':'▸'}</span></button>${v820Expanded===c.id?`<div class="v820-body"><p class="v820-summary">${enc(c.summary)}</p><div class="v820-grid"><section><h4>Vad har vi belägg för?</h4><p>${enc(c.evidence)}</p></section><section><h4>Historisk tolkning</h4><p>${enc(c.interpretation)}</p></section><section class="v820-limits"><h4>Vad följer inte av beläggen?</h4><p>${enc(c.limits)}</p></section></div>${Array.isArray(c.positions)&&c.positions.length?`<div class="v820-debate"><h4>Forskarna tolkar samma material olika</h4><div class="v820-debate-grid">${c.positions.map(p=>`<section><b>${enc(p.school)}</b><p>${enc(p.claim)}</p><small><b>Argument:</b> ${enc(p.support)}</small></section>`).join('')}</div></div>`:''}<details class="v820-proof"><summary>Vad stödjer respektive källa?</summary><ul>${c.sources.map(u=>`<li><b>${enc(u.name)}:</b> ${enc(u.supports)}</li>`).join('')}</ul></details><div class="v820-links">${c.sources.map(u=>`<a href="${enc(u.url)}" target="_blank" rel="noopener noreferrer">${enc(u.name)} ↗</a>`).join('')}${c.bible.map(u=>`<a href="${enc(u.url)}" target="_blank" rel="noopener noreferrer">${enc(u.name)} ↗</a>`).join('')}${c.linked?`<button type="button" data-v820event="${enc(c.linked)}">Läs tidslinjeposten →</button>`:''}</div></div>`:''}</article>`).join('')||'<div class="empty">Inga undersökningar matchar sökningen.</div>'}</div><div class="v820-footer"><b>Hur bedöms materialet?</b><p>”Belagt” kan här avse att en inskrift finns och har daterats, inte att en viss tolkning av gudaföreställningen därmed är bevisad. Tidsintervallen beskriver när källor eller litterära miljöer kan beläggas; de är inte daterade startpunkter för människors tro.</p><button type="button" id="v820ToTimeline">Se det historiska sammanhanget i tidslinjen →</button></div>`;
 el('v820Filter').onchange=e=>{v820Filter=e.target.value;v820Render()};
 el('v820Query').oninput=e=>{v820Query=e.target.value;let pos=e.target.selectionStart;v820Render();el('v820Query').focus();try{el('v820Query').setSelectionRange(pos,pos)}catch(_){}};
 host.querySelectorAll('[data-v820open]').forEach(b=>b.onclick=()=>{v820Expanded=v820Expanded===b.dataset.v820open?'':b.dataset.v820open;v820Render()});
 host.querySelectorAll('[data-v820event]').forEach(b=>b.onclick=()=>{setSelected(b.dataset.v820event);if(window.innerWidth<820)v84OpenReader()});
 el('v820ToTimeline').onclick=()=>{view('timeline')};
}
const v820PreviousView=view;
view=function(dest){
 if(dest==='religion'){
  v84CloseReader(false);v84HideMore();state.view=dest;
  document.body.classList.remove('v812-start','v812-chronology');document.body.classList.add('v820-religion');
  document.querySelectorAll('.main > section[id$="View"]').forEach(section=>section.classList.toggle('hidden',section.id!=='religionView'));
  document.querySelectorAll('.top .tab').forEach(btn=>btn.classList.toggle('active',btn.id==='navReligion'));
  v820Render();v84RefreshNavigation();window.scrollTo({top:0,behavior:'instant'});
 }else{document.body.classList.remove('v820-religion');el('religionView').classList.add('hidden');el('navReligion').classList.remove('active');v820PreviousView(dest)}
};
el('navReligion').onclick=()=>view('religion');
document.querySelectorAll('[data-v84nav="religion"]').forEach(b=>b.onclick=()=>v84Go('religion'));
const v820PreviousStart=v812Start;
v812Start=function(){v820PreviousStart();const cards=el('startView').querySelector('.v812-quick');if(cards&&!cards.querySelector('[data-v820start]')){let btn=document.createElement('button');btn.type='button';btn.dataset.v820start='';btn.innerHTML='<b>05 · Hur växte den israelitiska gudstron fram?</b><span>El, Baal, Jahve, Ashera, inskrifter och forskningsdebatt.</span><em>Undersök Israels religion →</em>';btn.onclick=()=>view('religion');cards.appendChild(btn)}};
const v820EarlierDetail=renderDetail;
renderDetail=function(){v820EarlierDetail();const found=religionCasesV820.filter(c=>c.linked===state.selected);if(!found.length)return;const box=document.createElement('section');box.className='v820-reader';box.innerHTML=`<h3>Israels religion · V8.20</h3><p>Jämför denna tidsmarkering med inskrifter, bibeltexter och forskningspositioner.</p>${found.map(c=>`<button type="button" data-v820jump="${enc(c.id)}">${enc(c.title)} →</button>`).join('')}`;el('detail').appendChild(box);box.querySelectorAll('[data-v820jump]').forEach(b=>b.onclick=()=>{v820Expanded=b.dataset.v820jump;v820Filter='Alla teman';v820Query='';view('religion')})};


// V8.21 – Källkritisk kedja mellan exil, persisk tid och bibeltexternas tillkomst.
let v821Theme='Alla ämnen',v821Search='',v821Active='X01',v821CompareA='X01',v821CompareB='X07';
const v821Stages=[['597 f.Kr.','Babylonkrönikan','X01'],['587/586 f.Kr.','Templets förstörelse','X02'],['539 f.Kr.','Kyros och Babylon','X04'],['ca 515 f.Kr.','Andra templet','X06'],['407 f.Kr.','Jahvetemplet på Elephantine','X07']];
function v821Render(){
 const host=el('exileView');if(!host)return;
 const themeOptions=['Alla ämnen',...new Set(exileCasesV821.map(c=>c.theme))];
 const filtered=exileCasesV821.filter(c=>(v821Theme==='Alla ämnen'||c.theme===v821Theme)&&[c.title,c.summary,c.date,c.kind].join(' ').toLocaleLowerCase('sv').includes(v821Search.toLocaleLowerCase('sv')));
 const optionHtml=(selected)=>exileCasesV821.map(c=>`<option value="${enc(c.id)}" ${c.id===selected?'selected':''}>${enc(c.title)}</option>`).join('');
 const a=exileCasesV821.find(c=>c.id===v821CompareA),b=exileCasesV821.find(c=>c.id===v821CompareB);
 const summary=c=>`<section><div class="v821-compare-kicker">${enc(c.date)} · ${enc(c.kind)}</div><h4>${enc(c.title)}</h4><p><b>Vad är belagt?</b> ${enc(c.fact)}</p><p><b>Vad vet vi inte?</b> ${enc(c.limits)}</p></section>`;
 host.innerHTML=`<header class="v820-hero"><div class="kicker">V8.21 · KÄLLOR, KRIS OCH REDAKTION</div><h2>Exil, återvändande och bibeltexternas förändring</h2><p>Undersök den babyloniska och persiska perioden genom <b>samtida inskrifter, arameiska brev och bibeltexter</b>. Varje källa avgränsas: fyndets datering, berättad historia och modern tolkning är inte samma sak.</p><div class="v820-headstats"><span>${exileCasesV821.length} källkritiska fall</span><span>4 nya tidslinjeposter</span><span>Bibel 2000 på svenska</span></div></header>
 <div class="v821-chain" aria-label="Kronologiska hållpunkter">${v821Stages.map((st,i)=>`<button type="button" data-v821-stage="${st[2]}" class="v821-milestone"><small>${enc(st[0])}</small><strong>${enc(st[1])}</strong></button>`).join('<span aria-hidden="true" class="v821-arrow">→</span>')}</div><p class="v820-phase-note">Denna följd visar daterade hållpunkter, inte en enkel orsakskedja eller att alla judiska grupper utvecklades på samma sätt.</p>
 <div class="v821-compare"><h3>Jämför två olika slags källor</h3><p>Välj två fall för att se vad själva underlagen faktiskt ger oss och var slutsatserna måste begränsas.</p><div class="v821-compare-controls"><label>Första undersökningen<select id="v821CompareA">${optionHtml(v821CompareA)}</select></label><label>Andra undersökningen<select id="v821CompareB">${optionHtml(v821CompareB)}</select></label></div><div class="v821-compare-grid">${summary(a)}${summary(b)}</div></div>
 <div class="v820-controls"><label>Ämnesområde<select id="v821Theme">${themeOptions.map(x=>`<option ${x===v821Theme?'selected':''}>${enc(x)}</option>`).join('')}</select></label><label>Sök<input id="v821Search" type="search" placeholder="Jeremia, Kyros, Elephantine …" value="${enc(v821Search)}"></label><span class="chip">${filtered.length} av ${exileCasesV821.length}</span></div>
 <div class="v820-cards">${filtered.map(c=>`<article class="v820-card" id="v821-${c.id}"><button type="button" class="v820-cardhead" data-v821-open="${c.id}" aria-expanded="${v821Active===c.id}"><span><span class="v820-label">${enc(c.theme)} · ${enc(c.date)}</span><strong>${enc(c.title)}</strong><small>${enc(c.tag)}</small></span><span aria-hidden="true">${v821Active===c.id?'▾':'▸'}</span></button>${v821Active===c.id?`<div class="v820-body"><p class="v820-summary">${enc(c.summary)}</p><div class="v820-grid"><section><h4>Vad har vi belägg för?</h4><p>${enc(c.fact)}</p></section><section><h4>Historisk tolkning</h4><p>${enc(c.interpretation)}</p></section><section class="v820-limits"><h4>Vad belägger källorna inte?</h4><p>${enc(c.limits)}</p></section></div>${c.positions?.length?`<div class="v820-debate"><h4>Flera forskningspositioner</h4><div class="v820-debate-grid">${c.positions.map(p=>`<section><b>${enc(p.school)}</b><p>${enc(p.claim)}</p><small>${enc(p.support)}</small></section>`).join('')}</div></div>`:''}<details class="v820-proof"><summary>Vad stödjer respektive källa?</summary><ul>${c.sources.map(u=>`<li><b>${enc(u.name)}:</b> ${enc(u.supports)}</li>`).join('')}</ul></details><div class="v820-links">${c.sources.map(u=>`<a href="${enc(u.url)}" target="_blank" rel="noopener noreferrer">${enc(u.name)} ↗</a>`).join('')}${c.bible.map(u=>`<a href="${enc(u.url)}" target="_blank" rel="noopener noreferrer">${enc(u.name)} ↗</a>`).join('')}${c.linked?`<button data-v821-event="${enc(c.linked)}" type="button">Visa forskningspost →</button>`:''}</div></div>`:''}</article>`).join('')||'<div class="empty">Inga matchande undersökningar.</div>'}</div>
 <div class="v820-footer"><b>Att kontrollera själv</b><p>Börja gärna med den babyloniska krönikan från 597 f.Kr., jämför Kyroscylindern med Esra 1 och läs sedan Elephantinebrevet från 407 f.Kr. Jämför vilka frågor en samtida inskrift kan besvara och vilka frågor en senare bibeltext ställer.</p><button id="v821Timeline" type="button">Visa händelserna i tidslinjen →</button><button id="v821Religion" type="button">Föregående epok: Israels religion →</button></div>`;
 el('v821Theme').onchange=e=>{v821Theme=e.target.value;v821Render()};
 el('v821Search').oninput=e=>{v821Search=e.target.value;const caret=e.target.selectionStart;v821Render();el('v821Search').focus();try{el('v821Search').setSelectionRange(caret,caret)}catch(_){}};
 el('v821CompareA').onchange=e=>{v821CompareA=e.target.value;v821Render()};el('v821CompareB').onchange=e=>{v821CompareB=e.target.value;v821Render()};
 host.querySelectorAll('[data-v821-stage]').forEach(button=>button.onclick=()=>{const id=button.dataset.v821Stage;v821Theme='Alla ämnen';v821Search='';v821Active=id;v821Render();const card=el('v821-'+id);card?.scrollIntoView({behavior:'smooth',block:'start'})});
 host.querySelectorAll('[data-v821-open]').forEach(button=>button.onclick=()=>{v821Active=v821Active===button.dataset.v821Open?'':button.dataset.v821Open;v821Render()});
 host.querySelectorAll('[data-v821-event]').forEach(button=>button.onclick=()=>setSelected(button.dataset.v821Event));
 el('v821Timeline').onclick=()=>view('timeline');el('v821Religion').onclick=()=>view('religion');
}
const v821PreviousView=view;
view=function(dest){
 if(dest==='exile'){
  v84CloseReader(false);v84HideMore();state.view='exile';
  document.body.classList.remove('v812-start','v812-chronology','v820-religion');document.body.classList.add('v821-exile');
  document.querySelectorAll('.main > section[id$="View"]').forEach(section=>section.classList.toggle('hidden',section.id!=='exileView'));
  document.querySelectorAll('.top .tab').forEach(button=>button.classList.toggle('active',button.id==='navExile'));
  v821Render();v84RefreshNavigation();window.scrollTo({top:0,behavior:'instant'});
 }else{document.body.classList.remove('v821-exile');el('exileView').classList.add('hidden');el('navExile').classList.remove('active');v821PreviousView(dest)}
};
el('navExile').onclick=()=>view('exile');document.querySelectorAll('[data-v84nav="exile"]').forEach(button=>button.onclick=()=>v84Go('exile'));
const v821PriorStart=v812Start;
v812Start=function(){v821PriorStart();const holder=el('startView').querySelector('.v812-quick');if(holder&&!holder.querySelector('[data-v821start]')){const b=document.createElement('button');b.type='button';b.dataset.v821start='';b.innerHTML='<b>06 · Vad hände efter Jerusalems fall?</b><span>Babylons krönika, Kyroscylindern, Elephantine och bibeltexternas redaktion.</span><em>Utforska exil och texter →</em>';b.onclick=()=>view('exile');holder.appendChild(b)}};
const v821PriorRenderDetail=renderDetail;
renderDetail=function(){v821PriorRenderDetail();const matching=exileCasesV821.filter(c=>c.linked===state.selected);if(!matching.length)return;const sec=document.createElement('section');sec.className='v820-reader';sec.innerHTML=`<h3>Exil &amp; texter · V8.21</h3><p>Vad berättar källorna, och vad måste fortfarande tolkas?</p>${matching.map(c=>`<button type="button" data-v821-jump="${enc(c.id)}">${enc(c.title)} →</button>`).join('')}`;el('detail').appendChild(sec);sec.querySelectorAll('[data-v821-jump]').forEach(button=>button.onclick=()=>{v821Active=button.dataset.v821Jump;v821Theme='Alla ämnen';v821Search='';view('exile')})};


// V8.22 – Hellenistisk historia, Qumranbibliotek och de tre olika typerna av texttid.
let v822Theme='Alla ämnen',v822Search='',v822Active='T06',v822CompareA='T06',v822CompareB='T07';
const v822Periods=[
 ['ca 300 f.Kr.','Grekisk språkmiljö','T01'],
 ['ca 200 f.Kr.','Henokfragment 4Q201','T06'],
 ['167–164 f.Kr.','Mackabéernas kris','T03'],
 ['ca 100 f.Kr.','Jesajarullen','T07'],
 ['ca 30–50 e.Kr.','11QPsᵃ – psalmsamlingen','T08']
];
function v822Case(id){return hellenisticCasesV822.find(c=>c.id===id)}
function v822Render(){
 const host=el('hellenismView');if(!host)return;
 const themes=['Alla ämnen',...new Set(hellenisticCasesV822.map(c=>c.theme))];
 const cards=hellenisticCasesV822.filter(c=>(v822Theme==='Alla ämnen'||c.theme===v822Theme)&&[c.title,c.summary,c.period,c.kind,c.witness,c.composition].join(' ').toLocaleLowerCase('sv').includes(v822Search.toLocaleLowerCase('sv')));
 const options=current=>hellenisticCasesV822.map(c=>`<option value="${enc(c.id)}" ${c.id===current?'selected':''}>${enc(c.title)}</option>`).join('');
 const a=v822Case(v822CompareA)||hellenisticCasesV822[0],b=v822Case(v822CompareB)||hellenisticCasesV822[1];
 const comparison=c=>`<section><div class="v821-compare-kicker">${enc(c.kind)} · ${enc(c.period)}</div><h4>${enc(c.title)}</h4><p><b>Textens tillkomst:</b> ${enc(c.composition)}</p><p><b>Bevarat vittne:</b> ${enc(c.witness)}</p><p><b>Vad visar det inte?</b> ${enc(c.limits)}</p></section>`;
 host.innerHTML=`<header class="v820-hero"><div class="kicker">V8.22 · HELLENISM, TEXTVITTNEN &amp; JUDISK MÅNGFALD</div><h2>Andra templets tid: från grekiska bibeltexter till Qumran</h2><p>Följ judiskt liv från hellenistiska kungariken till Dödahavsrullarna och den litterära värld som föregick Nya testamentet. <b>En bok kan vara äldre än dess äldsta bevarade exemplar</b> – och ett modernt fynddatum är inte en antik datering.</p><div class="v820-headstats"><span>${hellenisticCasesV822.length} källkritiska undersökningar</span><span>5 nya tidsmarkeringar</span><span>Primärkällor, museer och forskningslänkar</span></div></header>
 <div class="v822-periods" aria-label="Välj historisk eller textlig hållpunkt">${v822Periods.map(st=>`<button type="button" data-v822-stage="${st[2]}"><small>${enc(st[0])}</small><b>${enc(st[1])}</b></button>`).join('')}</div>
 <p class="v820-phase-note">Markeringarna gäller olika saker: språkmiljö, manuskript och politiska händelser. De bildar inte en enkel orsakskedja.</p>
 <div class="v821-compare"><h3>Jämför två källors ålder och bevisvärde</h3><p>Pröva till exempel Henokfragmentet mot Jesajarullen: båda är fysiska textvittnen, men dateringen av handskriften är inte ett datum för textens ursprung.</p><div class="v821-compare-controls"><label>Första källan<select id="v822CompareA">${options(v822CompareA)}</select></label><label>Andra källan<select id="v822CompareB">${options(v822CompareB)}</select></label></div><div class="v821-compare-grid">${comparison(a)}${comparison(b)}</div></div>
 <div class="v820-controls"><label>Forskningsområde<select id="v822Theme" aria-label="Välj tema">${themes.map(t=>`<option ${t===v822Theme?'selected':''}>${enc(t)}</option>`).join('')}</select></label><label>Sök bland undersökningarna<input id="v822Search" type="search" value="${enc(v822Search)}" placeholder="Septuaginta, 4Q201, Daniel, psalmer …"></label><span class="chip">${cards.length} av ${hellenisticCasesV822.length}</span></div>
 <div class="v820-cards">${cards.map(c=>`<article class="v820-card" id="v822-${c.id}"><button type="button" class="v820-cardhead" data-v822-open="${c.id}" aria-expanded="${v822Active===c.id}"><span><span class="v820-label">${enc(c.theme)} · ${enc(c.period)}</span><strong>${enc(c.title)}</strong><small>${enc(c.status)}</small></span><span aria-hidden="true">${v822Active===c.id?'▾':'▸'}</span></button>${v822Active===c.id?`<div class="v820-body"><p class="v820-summary">${enc(c.summary)}</p><div class="v822-three"><div><small>Textens tillkomst</small><p>${enc(c.composition)}</p></div><div><small>Bevarad handskrift / källa</small><p>${enc(c.witness)}</p></div><div><small>Modern upptäckt / forskningsmetod</small><p>${enc(c.discovery)}</p></div></div><div class="v820-grid"><section><h4>Vad belägger källorna?</h4><p>${enc(c.fact)}</p></section><section><h4>Hur tolkar forskningen det?</h4><p>${enc(c.interpretation)}</p></section><section class="v820-limits"><h4>Vad kan vi inte slå fast?</h4><p>${enc(c.limits)}</p></section></div><details class="v820-proof"><summary>Kontrollera vad varje forskningskälla stöder</summary><ul>${c.sources.map(u=>`<li><b>${enc(u.name)}:</b> ${enc(u.supports)}</li>`).join('')}</ul></details><div class="v820-links">${c.sources.map(u=>`<a href="${enc(u.url)}" target="_blank" rel="noopener noreferrer">${enc(u.name)} ↗</a>`).join('')}${c.bible.map(u=>`<a href="${enc(u.url)}" target="_blank" rel="noopener noreferrer">${enc(u.name)} ↗</a>`).join('')}${c.anchor?`<button type="button" data-v822-event="${enc(c.anchor)}">Visa kopplad tidslinjepost →</button>`:''}</div></div>`:''}</article>`).join('')||'<div class="empty">Inga undersökningar matchar ditt urval.</div>'}</div>
 <div class="v820-footer"><b>Ett viktigt nästa steg i undersökningen</b><p>Prova 4Q201 och 1QIsaᵃ sida vid sida. Öppna sedan källbilderna. Fråga dig: Vad är faktiskt daterat – själva kopian, den tidigare traditionen eller händelserna i texten?</p><button id="v822Prev" type="button">← Föregående epok: Exil &amp; texter</button><button id="v822Timeline" type="button">Se de daterade textvittnena i tidslinjen →</button></div>`;
 el('v822Theme').onchange=e=>{v822Theme=e.target.value;v822Render()};
 el('v822Search').oninput=e=>{v822Search=e.target.value;let pos=e.target.selectionStart;v822Render();const inp=el('v822Search');inp.focus();try{inp.setSelectionRange(pos,pos)}catch(_){}};
 el('v822CompareA').onchange=e=>{v822CompareA=e.target.value;v822Render()};el('v822CompareB').onchange=e=>{v822CompareB=e.target.value;v822Render()};
 host.querySelectorAll('[data-v822-stage]').forEach(btn=>btn.onclick=()=>{v822Theme='Alla ämnen';v822Search='';v822Active=btn.dataset.v822Stage;v822Render();el('v822-'+v822Active)?.scrollIntoView({behavior:'smooth',block:'start'})});
 host.querySelectorAll('[data-v822-open]').forEach(btn=>btn.onclick=()=>{v822Active=v822Active===btn.dataset.v822Open?'':btn.dataset.v822Open;v822Render()});
 host.querySelectorAll('[data-v822-event]').forEach(btn=>btn.onclick=()=>setSelected(btn.dataset.v822Event));
 el('v822Prev').onclick=()=>view('exile');el('v822Timeline').onclick=()=>view('timeline');
}
const v822PriorView=view;
view=function(dest){
 if(dest==='hellenism'){
  v84CloseReader(false);v84HideMore();state.view=dest;
  document.body.classList.remove('v812-start','v812-chronology','v820-religion','v821-exile');document.body.classList.add('v822-hellenism');
  document.querySelectorAll('.main > section[id$="View"]').forEach(section=>section.classList.toggle('hidden',section.id!=='hellenismView'));
  document.querySelectorAll('.top .tab').forEach(btn=>btn.classList.toggle('active',btn.id==='navHellenism'));
  v822Render();v84RefreshNavigation();el('v84MoreButton').classList.add('active');window.scrollTo({top:0,behavior:'instant'});
 }else{document.body.classList.remove('v822-hellenism');el('hellenismView').classList.add('hidden');el('navHellenism').classList.remove('active');v822PriorView(dest)}
};
el('navHellenism').onclick=()=>view('hellenism');
document.querySelectorAll('[data-v84nav="hellenism"]').forEach(btn=>btn.onclick=()=>v84Go('hellenism'));
const v822PriorStart=v812Start;
v812Start=function(){v822PriorStart();const holder=el('startView').querySelector('.v812-quick');if(holder&&!holder.querySelector('[data-v822-start]')){const btn=document.createElement('button');btn.type='button';btn.dataset.v822Start='';btn.innerHTML='<b>07 · Dödahavsrullarna och den judiska textvärlden</b><span>Hellenismen, Septuaginta, Mackabéerupproret, 4Q201, Jesajarullen och judiska grupper.</span><em>Utforska andra templets tid →</em>';btn.onclick=()=>view('hellenism');holder.appendChild(btn)}};
const v822PriorDetail=renderDetail;
renderDetail=function(){v822PriorDetail();const found=hellenisticCasesV822.filter(c=>c.anchor===state.selected);if(!found.length)return;const sec=document.createElement('section');sec.className='v820-reader';sec.innerHTML=`<h3>Andra templets tid · V8.22</h3><p>Följ textens tillkomst, manuskriptets datering och själva forskningskällan.</p>${found.map(c=>`<button type="button" data-v822-jump="${enc(c.id)}">${enc(c.title)} →</button>`).join('')}`;el('detail').appendChild(sec);sec.querySelectorAll('[data-v822-jump]').forEach(btn=>btn.onclick=()=>{v822Active=btn.dataset.v822Jump;v822Theme='Alla ämnen';v822Search='';view('hellenism')})};

// V8.23: romerskt Judeen och de första kristna källorna.
let v823Theme='Alla ämnen',v823Search='',v823Active='J03',v823CompareA='J03',v823CompareB='J08';
function v823Render(){
 const host=el('romanView'); if(!host)return;
 const themes=['Alla ämnen',...new Set(romanCasesV823.map(c=>c.theme))];
 const cards=romanCasesV823.filter(c=>(v823Theme==='Alla ämnen'||c.theme===v823Theme)&&[c.title,c.summary,c.fact,c.theme].join(' ').toLocaleLowerCase('sv').includes(v823Search.toLocaleLowerCase('sv')));
 const opt=(selected)=>romanCasesV823.map(c=>`<option value="${enc(c.id)}" ${selected===c.id?'selected':''}>${enc(c.title)}</option>`).join('');
 const compare=(c)=>`<section><div class="v821-compare-kicker">${enc(c.period)} · ${enc(c.kind)}</div><h4>${enc(c.title)}</h4><p><b>Källbelägg:</b> ${enc(c.fact)}</p><p><b>Forskningsbedömning:</b> ${enc(c.interpretation)}</p><p><b>Begränsning:</b> ${enc(c.limits)}</p></section>`;
 const a=romanCasesV823.find(c=>c.id===v823CompareA)||romanCasesV823[0],b=romanCasesV823.find(c=>c.id===v823CompareB)||romanCasesV823[7];
 host.innerHTML=`<div class="v820-hero"><div class="kicker">FORSKNINGSVY · V8.23</div><h2>Jesus, romerskt Judeen och den tidiga kristna textvärlden</h2><p>Följ källor som mynt, arkeologi, Paulusbrev och evangelier. Att en person eller händelse är historiskt belagd betyder inte att varje berättad detalj därmed är det.</p><div class="v820-headstats"><span>8 källkritiska fallstudier</span><span>Fysiska fynd ↔ litterära källor</span><span>Bibel 2000 på svenska</span></div></div>
 <div class="v821-chain">${['J01','J02','J03','J05','J06','J07','J08'].map(id=>{const c=romanCasesV823.find(x=>x.id===id);return `<button class="v821-milestone" data-v823-stage="${id}"><small>${enc(c.period)}</small><strong>${enc(c.title)}</strong></button>`}).join('<span class="v821-arrow">→</span>')}</div>
 <div class="v821-compare"><h3>Jämför vad två källor kan belägga</h3><p>Du väljer två undersökningar. Läs vad materialet faktiskt stöder och vad det inte säger.</p><div class="v821-compare-controls"><label>Första undersökningen<select id="v823CompareA">${opt(v823CompareA)}</select></label><label>Andra undersökningen<select id="v823CompareB">${opt(v823CompareB)}</select></label></div><div class="v821-compare-grid">${compare(a)}${compare(b)}</div></div>
 <div class="v820-controls"><label>Forskningsområde<select id="v823Theme">${themes.map(t=>`<option ${v823Theme===t?'selected':''}>${enc(t)}</option>`).join('')}</select></label><label>Sök fallstudier<input id="v823Search" type="search" value="${enc(v823Search)}" placeholder="Herodes, Pilatus, Paulus, år 70 …"></label><span class="chip">${cards.length} av ${romanCasesV823.length}</span></div>
 <div class="v820-cards">${cards.map(c=>`<article class="v820-card" id="v823-${c.id}"><button class="v820-cardhead" type="button" data-v823-open="${c.id}" aria-expanded="${v823Active===c.id}"><span><span class="v820-label">${enc(c.theme)} · ${enc(c.period)}</span><strong>${enc(c.title)}</strong><small>${enc(c.kind)}</small></span><span>${v823Active===c.id?'▾':'▸'}</span></button>${v823Active===c.id?`<div class="v820-body"><p class="v820-summary">${enc(c.summary)}</p><div class="v820-grid"><section><h4>Belagt i källorna</h4><p>${enc(c.fact)}</p></section><section><h4>Forskningsbedömning</h4><p>${enc(c.interpretation)}</p></section><section class="v820-limits"><h4>Vad kan inte beläggas?</h4><p>${enc(c.limits)}</p></section></div><details class="v820-proof"><summary>Vad stöder respektive källa?</summary><ul>${c.sources.map(u=>`<li><b>${enc(u.name)}:</b> ${enc(u.supports)}</li>`).join('')}</ul></details><div class="v820-links">${c.sources.map(u=>`<a href="${enc(u.url)}" target="_blank" rel="noopener noreferrer">${enc(u.name)} ↗</a>`).join('')}${c.bible.map(u=>`<a href="${enc(u.url)}" target="_blank" rel="noopener noreferrer">${enc(u.name)} ↗</a>`).join('')}${c.anchor?`<button type="button" data-v823-event="${enc(c.anchor)}">Öppna tidslinjepost →</button>`:''}</div></div>`:''}</article>`).join('')||'<div class="empty">Inga matchande undersökningar.</div>'}</div><div class="v820-footer"><b>Metod</b><p>Skilj styrkta härskarperioder och materiella fynd från den senare kristna texttraditionens enskilda berättelser. Alternativa evangeliedateringar finns; intervall ska inte misstas för exakta skrivdatum.</p><button id="v823Previous" type="button">← Andra templets tid</button><button id="v823Timeline" type="button">Till tidslinjen →</button></div>`;
 el('v823Theme').onchange=e=>{v823Theme=e.target.value;v823Render()};el('v823Search').oninput=e=>{v823Search=e.target.value;let pos=e.target.selectionStart;v823Render();el('v823Search').focus();try{el('v823Search').setSelectionRange(pos,pos)}catch(_){}};
 el('v823CompareA').onchange=e=>{v823CompareA=e.target.value;v823Render()};el('v823CompareB').onchange=e=>{v823CompareB=e.target.value;v823Render()};
 host.querySelectorAll('[data-v823-stage]').forEach(btn=>btn.onclick=()=>{v823Theme='Alla ämnen';v823Search='';v823Active=btn.dataset.v823Stage;v823Render();el('v823-'+v823Active)?.scrollIntoView({behavior:'smooth',block:'start'})});
 host.querySelectorAll('[data-v823-open]').forEach(btn=>btn.onclick=()=>{v823Active=v823Active===btn.dataset.v823Open?'':btn.dataset.v823Open;v823Render()});
 host.querySelectorAll('[data-v823-event]').forEach(btn=>btn.onclick=()=>setSelected(btn.dataset.v823Event));
 el('v823Previous').onclick=()=>view('hellenism');el('v823Timeline').onclick=()=>view('timeline');
}
const v823PriorView=view;
view=function(dest){if(dest==='roman'){
 v84CloseReader(false);v84HideMore();state.view=dest;
 document.body.classList.remove('v812-start','v812-chronology','v820-religion','v821-exile','v822-hellenism');document.body.classList.add('v823-roman');
 document.querySelectorAll('.main > section[id$="View"]').forEach(section=>section.classList.toggle('hidden',section.id!=='romanView'));
 document.querySelectorAll('.top .tab').forEach(btn=>btn.classList.toggle('active',btn.id==='navRoman'));
 v823Render();v84RefreshNavigation();el('v84MoreButton').classList.add('active');window.scrollTo({top:0,behavior:'instant'});
 }else{document.body.classList.remove('v823-roman');el('romanView').classList.add('hidden');el('navRoman').classList.remove('active');v823PriorView(dest)}};
el('navRoman').onclick=()=>view('roman');document.querySelectorAll('[data-v84nav="roman"]').forEach(btn=>btn.onclick=()=>v84Go('roman'));
const v823PriorStart=v812Start;
v812Start=function(){v823PriorStart();const holder=el('startView').querySelector('.v812-quick');if(holder&&!holder.querySelector('[data-v823-start]')){const btn=document.createElement('button');btn.type='button';btn.dataset.v823Start='';btn.innerHTML='<b>08 · Jesus och den romerska världen</b><span>Herodes, Pilatus, tempelkult, Paulusbrev och Jerusalems förstöring.</span><em>Utforska Jesu historiska miljö →</em>';btn.onclick=()=>view('roman');holder.appendChild(btn)}};
const v823PriorDetail=renderDetail;
renderDetail=function(){v823PriorDetail();const found=romanCasesV823.filter(c=>c.anchor===state.selected);if(!found.length)return;const sec=document.createElement('section');sec.className='v820-reader';sec.innerHTML=`<h3>Romerskt Judeen · V8.23</h3><p>Undersök belägg, tolkning och begränsningar.</p>${found.map(c=>`<button type="button" data-v823-jump="${enc(c.id)}">${enc(c.title)} →</button>`).join('')}`;el('detail').appendChild(sec);sec.querySelectorAll('[data-v823-jump]').forEach(btn=>btn.onclick=()=>{v823Theme='Alla ämnen';v823Search='';v823Active=btn.dataset.v823Jump;view('roman')})};

// V8.25: förstagångsvägledning utan påverkan på forskningsdata eller kartan.
const v825BeforeStart=v812Start;
v812Start=function(){v825BeforeStart();const host=el('startView');if(host.querySelector('#v825Welcome'))return;
 const guide=document.createElement('section');guide.id='v825Welcome';guide.className='v825-welcome';
 guide.innerHTML=`<div class="v825-welcome-head"><div><small>SNABBSTART · 5–10 MINUTER</small><h3>Välj en väg in i historien</h3><p>Du behöver inte förstå alla funktioner från början. Börja med en källa och följ sedan sambanden.</p></div><span class="v825-beta">Forskningsversion · ej slutgranskad</span></div><div class="v825-steps"><button type="button" data-v825-go="timeline"><strong>1. Se historien</strong><span>Fäll ihop och öppna kategorierna i tidslinjen.</span></button><button type="button" data-v825-go="parallels"><strong>2. Jämför texter</strong><span>Följ till exempel Noa och Gilgamesh till källtexterna.</span></button><button type="button" data-v825-go="roman"><strong>3. Pröva ett belägg</strong><span>Se vad Pilatus mynt faktiskt kan visa.</span></button></div><p class="v825-note"><b>Så läser du uppgifterna:</b> Ett fynd, en historisk tolkning och ett religiöst påstående är inte samma slags kunskap. Appen markerar skillnaderna, men inte alla poster är färdiggranskade. Originalarkivet är en historisk arbetsfil, inte en vetenskaplig tidslinje.</p>`;
 const quick=host.querySelector('.v812-quick');if(quick)quick.before(guide);else host.prepend(guide);
 guide.querySelectorAll('[data-v825-go]').forEach(btn=>btn.onclick=()=>view(btn.dataset.v825Go));
};

// V8.26: privat användartest och lokal återkoppling. Inget skickas automatiskt.
let v826PilotRendered=false;
function v826Render(){const host=el('pilotView');if(v826PilotRendered)return;v826PilotRendered=true;
 host.innerHTML=`<div class="v826-hero"><div class="kicker">TIDENS VÄV V8.26 · PRIVAT TESTVERSION</div><h2>Hjälp oss att göra historien lättare att utforska</h2><p>Den här testguiden tar ungefär 10 minuter. Du behöver inga särskilda kunskaper om Bibeln eller antikens historia. Alla uppgifter sparas lokalt i den öppna sidan och skickas inte vidare av appen.</p><p><b>Viktigt:</b> Materialet är under utveckling. Vissa dateringar är preliminära; den historiska kartan är schematisk.</p></div>
 <div class="v826-block"><h3>1. Prova fyra saker</h3><p>Du kan öppna funktionen och återvända hit med <b>Testa appen</b>. Markera de moment du provat.</p><div class="v826-tasks">
 <label><input type="checkbox" data-v826-done="1"><span><b>Tidslinjen</b><small>Fäll ihop kategorier, öppna en post och prova ett filter.</small></span><button type="button" data-v826-go="timeline">Öppna →</button></label>
 <label><input type="checkbox" data-v826-done="2"><span><b>Text mot text</b><small>Jämför Noa och Gilgamesh; öppna en svensk bibellänk.</small></span><button type="button" data-v826-go="parallels">Öppna →</button></label>
 <label><input type="checkbox" data-v826-done="3"><span><b>Vad kan källan bevisa?</b><small>Läs fallstudien om Pontius Pilatus och jämför källor.</small></span><button type="button" data-v826-go="roman">Öppna →</button></label>
 <label><input type="checkbox" data-v826-done="4"><span><b>Undersök en osäker datering</b><small>Studera Textens tillkomst och se hur osäkerhet redovisas.</small></span><button type="button" data-v826-go="formation">Öppna →</button></label>
 </div></div>
 <div class="v826-block"><h3>2. Berätta vad du tycker</h3><div class="v826-form"><label for="v826Easy">Hur lätt var det att hitta rätt?<select id="v826Easy"><option>Inte bedömt</option><option>Mycket lätt</option><option>Ganska lätt</option><option>Ganska svårt</option><option>Mycket svårt</option></select></label><label for="v826Sources">Förstod du skillnaden mellan belägg och tolkning?<select id="v826Sources"><option>Inte bedömt</option><option>Ja, tydligt</option><option>Delvis</option><option>Nej, otydligt</option></select></label><label for="v826Platform">Vad testade du på?<select id="v826Platform"><option>Inte angivet</option><option>Mobil</option><option>Dator</option><option>Surfplatta</option></select></label><label for="v826Feedback">Vad fungerade bra, var blev du förvirrad och vad borde förbättras?<textarea rows="6" id="v826Feedback" placeholder="Skriv gärna konkret vilken vy eller post det gäller ..."></textarea></label></div>
 <div class="v826-actions"><button id="v826Export" type="button">Ladda ner min återkoppling (.txt)</button><button id="v826Copy" type="button">Visa text att kopiera</button></div><div id="v826ExportStatus" role="status" aria-live="polite"></div><textarea id="v826CopyText" rows="6" readonly hidden aria-label="Din återkoppling för kopiering"></textarea><p class="v826-private">Inga svar skickas automatiskt till utvecklaren. När du laddat ner filen kan du själv bifoga den i ett mejl eller skicka texten vidare.</p></div>
 <div class="v826-block v826-caveats"><h3>Vad innebär källkritiken?</h3><p><b>Historiskt fynd:</b> vi kan undersöka ett konkret föremål. <b>Forskningsbedömning:</b> tolkningen kräver argument och kan vara omstridd. <b>Religiös berättelse:</b> en text kan analyseras historiskt utan att dess trosinnehåll avgörs av arkeologin.</p><button data-v826-go="start" type="button">Till startsidan →</button></div>`;
 host.querySelectorAll('[data-v826-go]').forEach(btn=>btn.onclick=()=>view(btn.dataset.v826Go));
 const report=()=>{const done=[...host.querySelectorAll('[data-v826-done]')].map((c,i)=>`${c.checked?'[X]':'[ ]'} Moment ${i+1}`).join('\n');return ['TIDENS VÄV – TESTÅTERKOPPLING V8.26','',done,'','Hitta rätt: '+el('v826Easy').value,'Belägg och tolkning: '+el('v826Sources').value,'Testad enhet: '+el('v826Platform').value,'','Synpunkter:',el('v826Feedback').value||'(inga inskrivna synpunkter)','', 'Denna rapport har skapats lokalt och inte skickats automatiskt.'].join('\n')};
 el('v826Export').onclick=()=>{const file=new Blob([report()],{type:'text/plain;charset=utf-8'});const url=URL.createObjectURL(file),a=document.createElement('a');a.href=url;a.download='Tidens_vav_V8_26_aterkoppling.txt';document.body.appendChild(a);a.click();a.remove();URL.revokeObjectURL(url);el('v826ExportStatus').textContent='En textfil har förberetts för nedladdning. Om inget händer: använd ”Visa text att kopiera”.'};
 el('v826Copy').onclick=()=>{const box=el('v826CopyText');box.hidden=false;box.value=report();box.select();el('v826ExportStatus').textContent='Markera och kopiera texten nedanför, eller ladda ner filen.'};
}
const v826PrevView=view;
view=function(dest){if(dest==='pilot'){v84CloseReader(false);v84HideMore();state.view=dest;document.body.classList.remove('v812-start','v812-chronology','v820-religion','v821-exile','v822-hellenism','v823-roman');document.body.classList.add('v826-pilot');document.querySelectorAll('.main > section[id$="View"]').forEach(section=>section.classList.toggle('hidden',section.id!=='pilotView'));document.querySelectorAll('.top .tab').forEach(btn=>btn.classList.toggle('active',btn.id==='navPilot'));v826Render();v84RefreshNavigation();window.scrollTo({top:0,behavior:'instant'});}else{document.body.classList.remove('v826-pilot');el('pilotView').classList.add('hidden');el('navPilot').classList.remove('active');v826PrevView(dest)}};
el('navPilot').onclick=()=>view('pilot');document.querySelectorAll('[data-v84nav="pilot"]').forEach(btn=>btn.onclick=()=>v84Go('pilot'));
const v826BeforeStart=v812Start;
v812Start=function(){v826BeforeStart();const host=el('startView');if(host.querySelector('#v826Invitation'))return;const note=document.createElement('div');note.id='v826Invitation';note.className='v826-invitation';note.innerHTML='<div><b>Vill du testa och ge återkoppling?</b><p>En enkel provrunda tar cirka tio minuter och hjälper oss hitta sådant som en ny användare fastnar på.</p></div><button type="button" id="v826OpenPilot">Öppna testguiden →</button>';const guide=host.querySelector('#v825Welcome');if(guide)guide.before(note);else host.prepend(note);note.querySelector('button').onclick=()=>view('pilot')};
// V8.27 – förbättringsförslag A: panorerbar tid, tydligare tidsintervall,
// kronologi tvärs över kategorier, försiktigt modellerade samband och samlad navigation.
const v827Connections=[
 {from:'H064',to:'H016',kind:'Historisk följd',strength:'Starkt historiskt stöd för förstörelsen',detail:'Den äldre tempeltraditionen avslutas i bibeltexterna med Jerusalems babyloniska erövring och tempelförstörelse. Den exakta uppförandedateringen under Salomo är däremot osäker.',source:'https://www.smithsonianmag.com/history/what-is-beneath-the-temple-mount-920764/'},
 {from:'H016',to:'H018',kind:'Föregående historiskt skede',strength:'Tydlig kronologisk följd – flera mellanliggande beslut',detail:'Återuppbyggnaden under persisk tid följer den babyloniska förstöringen. En tidsföljd är inte i sig belägg för en enkel direkt orsak.',source:'https://www.smithsonianmag.com/history/the-secret-excavation-of-jerusalem-180978888/'},
 {from:'H017',to:'H018',kind:'Historisk förutsättning',strength:'Persisk erövring belagd; Jerusalems finansiering återges i Esra',detail:'Kyros erövrade Babylon 539 f.Kr. Det förändrade de politiska förutsättningarna för ett tempelbygge i Jerusalem. Esra 6:3–8 nämner finansiering ur kunglig skattkammare; ett separat samtida persiskt Jerusalemdekret är inte bevarat.',source:'https://www.britishmuseum.org/collection/object/W_1880-0617-1941'},
 {from:'H054',to:'H018',kind:'Källjämförelse – inte direkt bevis',strength:'Kyroscylindern nämner inte uttryckligen Jerusalem',detail:'Kyroscylindern belyser persisk kunglig legitimering och återställande av vissa kultplatser. Den bekräftar inte i sig varje detalj om Andra templets byggnad eller finansiering.',source:'https://www.britishmuseum.org/collection/object/W_1880-0617-1941'},
 {from:'H014',to:'H064',kind:'Historiskt sammanhang',strength:'Övergripande miljö, inte exakt byggår',detail:'Det förmonarkiska och kungatida Judas politiska miljö är relevant för den äldre tempeltraditionen. Det ger inte direkt arkeologiskt stöd för kung Salomos byggnad.',source:'https://www.smithsonianmag.com/history/what-is-beneath-the-temple-mount-920764/'},
 ...v83Links.map(l=>({from:l.from,to:l.to,kind:({context:'Historiskt sammanhang',continuity:'Långsiktig utveckling',debate:'Omstridd koppling',literary:'Textparallell'})[l.kind]||l.label,strength:l.kind==='debate'?'Tolkning / osäkerhet':'Samband att pröva',detail:l.note,source:null}))
];
let v827RelationFocus='H018';
function v827LinksFor(id){return v827Connections.filter(r=>r.from===id||r.to===id)}
function v827RelationCards(id){const links=v827LinksFor(id);if(!links.length)return '<p class="small">Inga enskilda samband dokumenterade för denna post ännu. Det betyder inte att historiska relationer saknas.</p>';
 return links.map(r=>{const a=idEvent(r.from)||v83Event(r.from),b=idEvent(r.to)||v83Event(r.to);return `<article class="v827-relation"><div class="v827-reltype">${enc(r.kind)} · ${enc(r.strength)}</div><div class="v827-relpath">${enc(a?.title||r.from)} <span aria-hidden="true">→</span> ${enc(b?.title||r.to)}</div><p>${enc(r.detail)}</p><div class="v827-linkrow"><button data-v827-read="${enc(r.from)}">Läs: ${enc(a?.title||r.from)}</button><button data-v827-read="${enc(r.to)}">Läs: ${enc(b?.title||r.to)}</button>${r.source?`<a href="${enc(r.source)}" target="_blank" rel="noopener noreferrer">Källa ↗</a>`:''}</div></article>`}).join('')}
function v827BindRelations(root){root.querySelectorAll('[data-v827-read]').forEach(b=>b.addEventListener('click',()=>{const id=b.dataset.v827Read;if(!idEvent(id))return;setSelected(id);if(window.innerWidth<=900)v84OpenReader()}));}
function v827ShowRelations(id){v827RelationFocus=id;view('explore');document.getElementById('v827RelationFocus')?.scrollIntoView({block:'start',behavior:'smooth'})}
const v827OldDetail=renderDetail;
renderDetail=function(){v827OldDetail();const event=idEvent(state.selected);if(!event)return;const root=el('detail'),lines=v827LinksFor(event.id);const box=document.createElement('section');box.className='v827-reader-rel';box.innerHTML=`<h3>Historiska samband <small>(${lines.length})</small></h3><p>Se vad som föregick eller följde på denna post och hur stark kopplingen är. En pil betyder inte automatiskt bevisad orsak.</p><button id="v827JumpRel" type="button">Visa sambanden i Temaspår →</button>`;root.append(box);box.querySelector('button').onclick=()=>v827ShowRelations(event.id)};
const v827OldExplore=renderExplore;
renderExplore=function(){v827OldExplore();const host=el('exploreView');if(host.querySelector('#v827RelationFocus'))return;const current=idEvent(v827RelationFocus)||idEvent('H018');const box=document.createElement('section');box.id='v827RelationFocus';box.className='v827-relationship-panel';box.innerHTML=`<div class="kicker">SAMBAND &amp; BEROENDEN · KÄLLKRITISK MODELL</div><h2>Vad hänger ihop – och hur vet vi det?</h2><p>Välj en post. Kopplingarna har olika bevisvärde: historisk förutsättning, kronologisk följd, textparallell eller omstridd tolkning.</p><label for="v827RelationSelect">Välj forskningspost<select id="v827RelationSelect">${events.filter(e=>v827LinksFor(e.id).length).map(e=>`<option value="${enc(e.id)}" ${e.id===v827RelationFocus?'selected':''}>${enc(e.title)}</option>`).join('')}</select></label><div id="v827RelationCards">${v827RelationCards(v827RelationFocus)}</div>`;
 const insert=host.querySelector('.v83-panel');if(insert)insert.before(box);else host.prepend(box);
 box.querySelector('select').onchange=e=>{v827RelationFocus=e.target.value;box.querySelector('#v827RelationCards').innerHTML=v827RelationCards(v827RelationFocus);v827BindRelations(box)};v827BindRelations(box)};

// Search across thematic research, primary timeline records, and the original archive.
const v827SearchInput=el('search');const v827SearchPanel=document.createElement('div');v827SearchPanel.id='v827SearchResults';v827SearchPanel.hidden=true;v827SearchPanel.setAttribute('role','listbox');v827SearchInput.setAttribute('aria-label','Sök i hela Tidens väv');v827SearchInput.placeholder='Sök i hela Tidens väv – händelser, texter, fynd, ämnen…';v827SearchInput.after(v827SearchPanel);
const v827Modules=[['archaeology','Arkeologi',archaeologyCasesV818,'v818'],['religion','Israels religion',religionCasesV820,'v820'],['exile','Exil & texter',exileCasesV821,'v821'],['hellenism','Andra templets tid',hellenisticCasesV822,'v822'],['roman','Jesus & Rom',romanCasesV823,'v823'],['formation','Textens tillkomst',formationCasesV811,'v811']];
function v827Entries(){return [
 ...events.map(e=>({type:'post',id:e.id,title:e.title,sub:e.description||'',target:'timeline',badge:'Tidslinjepost'})),
 ...originalEvents.map(e=>({type:'archive',id:e.id,title:e.title,sub:e.description||'',target:'archive',badge:'Original · ej granskat'})),
 ...v827Modules.flatMap(([target,badge,arr])=>arr.map(c=>({type:'case',id:c.id,title:c.title,sub:[c.summary,c.context,c.fact,c.interpretation,c.assessment,c.theme].filter(Boolean).join(' '),target,badge}))),
 ...Object.entries(v82Library).map(([id,d])=>({type:'library',id,title:d.heading,sub:d.summary||'',target:'research',badge:'Forskningsfördjupning'})),
 ...textPairsV810Combined.map(x=>({type:'pair',id:x.id,title:x.title,sub:[x.subtitle,x.assessment].join(' '),target:'parallels',badge:'Text mot text'}))
]}
const v827Index=v827Entries();
function v827RenderSearch(){const query=v827SearchInput.value.trim().toLocaleLowerCase('sv');if(query.length<2){v827SearchPanel.hidden=true;return}
 const results=v827Index.map(e=>({e,score:e.title.toLocaleLowerCase('sv').includes(query)?3:e.sub.toLocaleLowerCase('sv').includes(query)?1:0})).filter(x=>x.score).sort((a,b)=>b.score-a.score||a.e.title.localeCompare(b.e.title,'sv')).slice(0,16);
 v827SearchPanel.innerHTML=`<div class="v827-searchhint">Sökresultat i hela projektet · ${results.length===16?'16 första träffarna':results.length+' träffar'}</div>`+ (results.length?results.map(({e},i)=>`<button type="button" role="option" data-v827-result="${i}"><small>${enc(e.badge)}</small><b>${enc(e.title)}</b></button>`).join(''):'<p>Inga matchande poster. Prova ett annat ord.</p>');v827SearchPanel.hidden=false;
 v827SearchPanel.querySelectorAll('[data-v827-result]').forEach(b=>b.onclick=()=>{const x=results[Number(b.dataset.v827Result)].e;v827SearchPanel.hidden=true;v827SearchInput.value='';v827SearchInput.dispatchEvent(new Event('input',{bubbles:true}));
 if(x.type==='post'){view('timeline');setSelected(x.id)}
 else if(x.type==='archive'){archiveQuery=x.title;view('archive');renderArchive()}
 else if(x.type==='library'){v82Query='';v82Theme='Alla områden';view('research');setSelected(x.id);renderResearch()}
 else if(x.type==='pair'){v89PairId=x.id;v810Theme='Alla';v89MotifIndex=0;view('parallels')}
 else {if(x.target==='religion'){v820Filter='Alla teman';v820Query='';v820Expanded=x.id}if(x.target==='exile'){v821Filter='Alla teman';v821Query='';v821Expanded=x.id}if(x.target==='hellenism'){v822Theme='Alla ämnen';v822Search='';v822Active=x.id}if(x.target==='roman'){v823Theme='Alla ämnen';v823Search='';v823Active=x.id}if(x.target==='formation'){v811Area='Alla';v811Find='';v811Selected=x.id}view(x.target);setTimeout(()=>{const node=document.getElementById(({'archaeology':'v818','religion':'v820','exile':'v821','hellenism':'v822','roman':'v823'})[x.target]+'-'+x.id);node?.scrollIntoView({behavior:'smooth',block:'center'})},30)}
 });}
v827SearchInput.addEventListener('input',v827RenderSearch);v827SearchInput.addEventListener('focus',v827RenderSearch);document.addEventListener('click',e=>{if(!v827SearchPanel.contains(e.target)&&e.target!==v827SearchInput)v827SearchPanel.hidden=true});

// Hierarchical menu: research modules remain accessible without taking up the main tab row.
const v827MenuBtn=el('v827ResearchMenuBtn'),v827Menu=el('v827ResearchMenu');
const v827ResearchLinks=[['chronology','Granskad kronologi'],['archaeology','Arkeologi & Bibeln'],['religion','Israels religion'],['exile','Exil & texter'],['hellenism','Andra templets tid'],['roman','Jesus & Rom'],['formation','Textens tillkomst'],['archive','Originalarkiv'],['pilot','Testa appen']];
v827Menu.innerHTML=v827ResearchLinks.map(([target,label])=>`<button type="button" role="menuitem" data-v827-view="${target}">${label}</button>`).join('');
function v831PositionResearchMenu(){
 if(window.matchMedia('(max-width:900px)').matches){
  const rect=v827MenuBtn.getBoundingClientRect();
  const top=Math.max(8,Math.min(rect.bottom+7,Math.max(8,window.innerHeight-180)));
  v827Menu.style.setProperty('--v831-research-top',`${Math.round(top)}px`);
 }else{v827Menu.style.removeProperty('--v831-research-top')}
}
v827MenuBtn.onclick=()=>{v827Menu.hidden=!v827Menu.hidden;v827MenuBtn.setAttribute('aria-expanded',String(!v827Menu.hidden));if(!v827Menu.hidden)v831PositionResearchMenu()};
window.addEventListener('resize',()=>{if(!v827Menu.hidden)v831PositionResearchMenu()});
window.addEventListener('scroll',()=>{if(!v827Menu.hidden)v831PositionResearchMenu()},{passive:true});
window.addEventListener('keydown',e=>{if(e.key==='Escape'&&!v827Menu.hidden){v827Menu.hidden=true;v827MenuBtn.setAttribute('aria-expanded','false');v827MenuBtn.focus()}});
v827Menu.querySelectorAll('[data-v827-view]').forEach(b=>b.onclick=()=>{v827Menu.hidden=true;v827MenuBtn.setAttribute('aria-expanded','false');view(b.dataset.v827View)});
document.addEventListener('click',e=>{if(!v827Menu.contains(e.target)&&e.target!==v827MenuBtn){v827Menu.hidden=true;v827MenuBtn.setAttribute('aria-expanded','false')}});

// Panorering: behåll det kompletta filtrerade intervall som forskningsuniversum,
// men visa i första hand en hanterbar del av det. Ingen datering ändras.
let v827Universe={lo:state.min,hi:state.max},v827Order='category',v827Ready=false,v827Auto=true;
const v827NativeAutoFit=v814AutoFit;
function v827ViewportSpan(total,entries){const recent=entries.filter(e=>e.start>=-12000).length; if(recent>=12)return Math.min(total,3500);if(total>1000000)return Math.min(total,180000);if(total>100000)return Math.min(total,25000);if(total>10000)return Math.min(total,3500);if(total>6000)return Math.min(total,2500);return total;}
function v827ChooseAnchor(entries,lo,hi,span){if(hi-lo<=span)return lo;const years=entries.map(x=>x.start).sort((a,b)=>a-b);let best=years[0],count=0;
 for(const start of years){const end=start+span;const n=years.filter(y=>y>=start&&y<=end).length;if(n>count){count=n;best=start}}
 return Math.max(lo,Math.min(hi-span,best-span*.07))}
function v827UpdatePan(){const s=el('v827PanSlider');if(!s)return;const total=v827Universe.hi-v827Universe.lo,windowSpan=state.max-state.min;const movable=Math.max(0,total-windowSpan);s.disabled=movable<=0;s.value=String(movable?Math.round((state.min-v827Universe.lo)/movable*10000):0);el('v827WindowLabel').textContent=`${fmt(Math.round(state.min))} – ${fmt(Math.round(state.max))} · hela urvalet ${fmt(Math.round(v827Universe.lo))} – ${fmt(Math.round(v827Universe.hi))}`}
function v827Fit({preserve=false}={}){const entries=v813Entries().filter(v814FilterMatch);if(!entries.length)return false;
 const lo=Math.min(...entries.map(e=>e.start)),hi=Math.max(...entries.map(e=>e.end));let total=Math.max(1,hi-lo),pad=total>100000?total*.007:Math.max(4,total*.018);v827Universe={lo:Math.max(-3900000,Math.floor(lo-pad)),hi:Math.min(2100,Math.ceil(hi+pad))};
 const full=v827Universe.hi-v827Universe.lo;const desired=Math.min(full,v827ViewportSpan(full,entries));
 let start=preserve?Math.max(v827Universe.lo,Math.min(v827Universe.hi-desired,state.min)):v827ChooseAnchor(entries,v827Universe.lo,v827Universe.hi,desired);
 state.min=Math.floor(start);state.max=Math.min(v827Universe.hi,Math.ceil(start+desired));v827UpdatePan();return true}
v814AutoFit=function(){if(!v827Ready)return v827NativeAutoFit();return v827Fit({preserve:false})};
function v827MoveViewport(start){const width=state.max-state.min;const min=-3900000,max=2100-width;const next=Math.floor(Math.min(max,Math.max(min,start)));if(next===state.min)return;state.min=next;state.max=Math.ceil(next+width);const padding=Math.max(width,100);v827Universe.lo=Math.max(-3900000,Math.min(v827Universe.lo,next-padding));v827Universe.hi=Math.min(2100,Math.max(v827Universe.hi,state.max+padding));renderAll();v827UpdatePan()}
const v827Pan=el('v827PanSlider');v827Pan.addEventListener('input',()=>{const delta=Math.max(0,v827Universe.hi-v827Universe.lo-(state.max-state.min));v827MoveViewport(v827Universe.lo+Number(v827Pan.value)/10000*delta)});
el('v827PanLeft').onclick=()=>v827MoveViewport(state.min-(state.max-state.min)*.65);el('v827PanRight').onclick=()=>v827MoveViewport(state.min+(state.max-state.min)*.65);
// Intercept the two legacy zoom buttons so they zoom the visible section, not the entire research universe.
function v827Zoom(factor){const old=state.max-state.min,full=v827Universe.hi-v827Universe.lo;const desired=Math.max(Math.min(full,old*factor),Math.min(1,full));const center=(state.max+state.min)/2;state.min=Math.max(v827Universe.lo,Math.min(v827Universe.hi-desired,center-desired/2));state.max=state.min+desired;renderAll();v827UpdatePan()}
for(const [id,factor] of [['zoomIn',.6],['zoomOut',1.65]])el(id).addEventListener('click',e=>{e.stopImmediatePropagation();v827Zoom(factor)},true);
// Hoverless drag on chart background, avoiding event buttons and scroll gesture conflicts.
let v827Dragging=null;const plot=el('lanes');plot.addEventListener('pointerdown',e=>{if(e.target.closest('button,a,input,select')||e.button!==0)return;v827Dragging={x:e.clientX,start:state.min,id:e.pointerId};});
window.addEventListener('pointerup',()=>v827Dragging=null);window.addEventListener('pointercancel',()=>v827Dragging=null);window.addEventListener('pointermove',e=>{if(!v827Dragging||e.pointerId!==v827Dragging.id||!e.buttons)return;const dx=e.clientX-v827Dragging.x;if(Math.abs(dx)<5)return;const width=Math.max(300,plot.getBoundingClientRect().width-220);const delta=dx/width*(state.max-state.min);v827MoveViewport(v827Dragging.start-delta)});
function v827Chronological(){const entries=v813Entries().filter(v814FilterMatch).sort((a,b)=>a.start-b.start||a.end-b.end);el('lanes').innerHTML=`<section class="v827-chronological"><header><h3>Alla kategorier – kronologiskt</h3><p>Sorterat efter startdatum. Berättad tid, historiska händelser och texttillkomst är olika typer av dateringar.</p></header>${entries.map(e=>`<button type="button" class="v827-chronoitem" data-v827-id="${enc(e.id)}"><span class="v827-chrono-when">${enc(v813DateString(e))}</span><span><b>${enc(e.v813Label||e.title)}</b><small>${enc(e.category)} · ${enc(v813StatusText(e))}</small></span></button>`).join('')||'<p>Inga poster matchar filtret.</p>'}</section>`;
 el('v7stats').textContent=`${entries.length} kronologiskt sorterade poster · alla kategorier`;el('v815CollapseStatus').textContent='';el('timelineView').classList.add('v827-chrono-mode');el('lanes').querySelectorAll('[data-v827-id]').forEach(b=>b.onclick=()=>setSelected(b.dataset.v827Id));}
const v827BeforeTimeline=renderTimeline;
function v827PaintTimeline(){v827BeforeTimeline();el('timelineView').classList.toggle('v827-chrono-mode',v827Order==='chrono');if(v827Order==='chrono'){v827Chronological()}else if(v7Mode!=='compact'){
 // Replace overlay labels with independent left-column labels: keep actual period start/end unobstructed.
 el('lanes').querySelectorAll('.v813-plotrow').forEach(row=>{const label=row.querySelector('.v813-plotlabel');if(label){label.classList.add('v827-leftlabel');label.removeAttribute('style');row.prepend(label)}})
 }v827UpdatePan()}
renderTimeline=v827PaintTimeline;
// Some older navigation callbacks call v813Timeline directly, so use the same final renderer there.
v813Timeline=v827PaintTimeline;
el('v827Order').onchange=e=>{v827Order=e.target.value;renderTimeline()};
// Filtering triggers the inherited autopan fitter; it now recomputes the universe and sensible window.
v827Ready=true;v827Fit();renderAll();
// Put relevant connections beside the second-temple context in thematic pathways.

// V8.27: allow topic studies to occupy full content width; timeline filter only on timeline-related views.
const v827FinalView=view;
view=function(dest){v827FinalView(dest);document.body.dataset.v827View=dest};
document.body.dataset.v827View=state.view;

// V8.28 – originalposternas forskningsöversikter och proportionell kronologisk Gantt-vy.
// Separera alltid originalets importerade årtal från forskningsbedömningen.
const v828Coverage = Object.keys(allOriginalResearchV828).length;
const v828OldDetail = detailHtml;
detailHtml = function(e){
 const old = v828OldDetail(e);
 if(!e || !e.original || !allOriginalResearchV828[e.id]) return old;
 const c=allOriginalResearchV828[e.id], fresh=c.coverage.includes('Ny individuell');
 const refs=(c.sources||[]).filter(s=>/^https?:\/\//.test(s.url||''));
 const sourceHtml=refs.length?`<ul class="v828-sources">${refs.map(s=>`<li><a href="${enc(s.url)}" target="_blank" rel="noopener noreferrer">${enc(s.name)} ↗</a><small>${enc(s.scope||'Bakgrundskälla')}</small></li>`).join('')}</ul>`:'<p>Källhänvisning måste kompletteras.</p>';
 const node=`<section class="v828-dossier ${fresh?'v828-new':''}"><div class="kicker">V8.28 · FORSKNINGSUNDERLAG FÖR ORIGINALPOST ${enc(e.id)}</div><h2>${enc(c.heading)}</h2><p class="v828-sourcewarning">Originalets årtal är arkivuppgifter, inte en verifierad datering. ${enc(c.certainty)}.</p><h3>Vad handlar det om?</h3><p>${enc(c.summary)}</p><h3>Historisk och vetenskaplig kontext</h3><p>${enc(c.context)}</p><h3>Vad är osäkert?</h3><p>${enc(c.limits)}</p><h3>Källor och läsvägar</h3>${sourceHtml}<small class="v828-coverage">${enc(c.coverage)} · Länkarna kan vara primärtexter, ämneskällor eller bredare översikter. De är inte alla direkta belägg för varje mening.</small></section>`;
 return fresh?old+node:old+`<details class="v828-collapsed"><summary>Samlad forskningsöversikt för originalpost ${enc(e.id)} – öppna</summary>${node}</details>`;
};
// Förse källarkivet med en begriplig forskningsingång, utan att korrigera dess originalvärden.
const v828OldArchive=renderArchive;
renderArchive=function(){
 v828OldArchive();const root=el('archiveView');
 const banner=document.createElement('div');banner.className='v828-archivebanner';
 banner.innerHTML=`<strong>${v828Coverage} av ${originalEvents.length} originalposter har nu ett individuellt forskningsunderlag.</strong><p>Öppna en post för att läsa bedömningar och källor. Originalårtal är fortfarande bevarade oförändrade, även när fördjupningen förklarar att de är missvisande.</p>`;
 const warning=root.querySelector('.archive-warning');warning?.after(banner);
 root.querySelectorAll('.archive-card').forEach(card=>{const btn=card.querySelector('[data-original]');if(btn){btn.textContent='Läs källkritisk genomgång ↗';btn.setAttribute('title','Läs original och separat forskningsfördjupning')}});
};
// Full chronological Gantt: every selected category on one time scale.
const v828Colors={
 'Historia':'#28619b','Religion & texter':'#7946a6','Bibelberättelse':'#ae6b26','Bibeltext':'#af5077',
 'Arkeologi':'#277f67','Folk':'#5769a0','Människans utveckling':'#107c83',
 'Civilisation':'#497b35','Religion':'#7946a6','Byggnadsverk':'#71528e',
 'Krig':'#aa513a','Konflikterande berättelser':'#af5077','Bibelberättelser':'#ae6b26'
};
function v828CategoryColor(cat){return v828Colors[cat]||'#536b81'}
// Main chronological mode is still a timeline, not a plain list.
v827Chronological=function(){
 const entries=v813Entries().filter(v814FilterMatch).filter(e=>e.end>=state.min&&e.start<=state.max)
   .sort((a,b)=>a.start-b.start||a.end-b.end);
 const total=Math.max(1,state.max-state.min);
 const legendCats=[...new Set(entries.map(e=>e.category))];
 const legend=legendCats.map(c=>`<span class="v828-color-key"><i style="background:${v828CategoryColor(c)}"></i>${enc(laneNames[c]||c)}</span>`).join('');
 const rows=entries.map(e=>{
  const s=Math.max(e.start,state.min),end=Math.min(e.end,state.max);
  const pos=Math.max(0,Math.min(100,(s-state.min)/total*100));
  const width=Math.max(0,(end-s)/total*100);
  const point=e.start===e.end||width<.27;
  const c=v828CategoryColor(e.category);
  const status=e.v813Status==='assessed'?'Särskilt källprövad datering':e.v813Status==='phased'?'Historisk fas':'Forskningspost – dateringen kan vara preliminär';
  const mark=point?`<span class="v828-point" style="left:${pos}%;background:${c}" title="${enc(status)}"></span>`:`<span class="v828-period" style="left:${pos}%;width:${Math.min(width,100-pos)}%;background:${c}" title="${enc(status)}"></span>`;
  return `<div class="v828-gantt-row" data-v828-id="${enc(e.id)}"><button class="v828-gantt-label" data-v828-read="${enc(e.id)}" title="${enc(e.v813Label||e.title)}"><span class="v828-catmark" style="background:${c}"></span><span><b>${enc(e.v813Label||e.title)}</b><small>${enc(laneNames[e.category]||e.category)}</small></span></button><div class="v828-gantt-track" role="img" aria-label="${enc(e.v813Label||e.title)}: ${enc(v813DateString(e))}">${mark}</div><button class="v828-gantt-date" data-v828-read="${enc(e.id)}">${enc(v813DateString(e))}</button></div>`
 }).join('');
 el('lanes').innerHTML=`<section class="v828-gantt"><div class="v828-gantt-intro"><h3>Samlad kronologisk tidslinje</h3><p>Samtliga valda kategorier sorteras efter starttid. Tidsstreck och punkter följer samma proportionella skala. Panorera för att utforska andra århundraden.</p><div class="v828-categories">${legend}</div></div>${rows||'<div class="empty">Inga forskningsposter i detta tidsfönster. Panorera eller zooma ut.</div>'}</section>`;
 el('v7stats').textContent=`${entries.length} markeringar i synligt tidsfönster · alla valda kategorier kronologiskt`;
 el('v815CollapseStatus').textContent='Kronologisk vy med proportionella tidsstreck';
 el('timelineView').classList.add('v827-chrono-mode','v828-chrono-gantt','v814-scale-mode');
 el('lanes').querySelectorAll('[data-v828-read]').forEach(btn=>btn.onclick=()=>setSelected(btn.dataset.v828Read));
 // Show scale with the same tick calculation as the standard proportionate view.
 const w=el('axis').getBoundingClientRect().width||1000;
 const ticks=v814AxisTicks(state.min,state.max,w);
 el('axis').innerHTML=ticks.map(t=>`<span class="tick" style="left:${t.left}%">${v814AxisLabel(t.year,total)}</span>`).join('');
};
// Preserve the mode toggle, but undo the earlier timeline-hide rules when chronological is selected.
const v828PrevTimeline=renderTimeline;
renderTimeline=function(){v828PrevTimeline();el('timelineView').classList.toggle('v828-chrono-gantt',v827Order==='chrono');};
v813Timeline=renderTimeline;
// Default blue/violet/orange palette is sharpened for clarity in filters and controls.
Object.assign(dark,v828Colors);
// Rerender current view after installing V8.28 hooks.
renderAll();

// Research library: a separate, searchable view of the 129 archived source-connected dossiers.
const v828OldLibrary=renderResearch;
renderResearch=function(){
 v828OldLibrary();const host=el('researchView');
 if(host.querySelector('#v828Catalog'))return;
 const section=document.createElement('section');section.id='v828Catalog';section.className='v828-catalog';
 const docs=originalEvents.map(o=>({...allOriginalResearchV828[o.id],category:o.category,original:o}));
 section.innerHTML=`<div class="kicker">V8.28 · ORIGINALPOSTERNAS FORSKNINGSLAGER</div><h2>129 källkritiska genomgångar</h2><p>Alla originalposter har nu en separat, identifierbar forskningsöversikt med osäkerheter och läsvägar. Originalarkets årtal är bevarade men är inte norm för den rekommenderade tidslinjen.</p><div class="v828-catalog-controls"><input id="v828CatalogSearch" type="search" placeholder="Sök bland samtliga 129 forskningsunderlag…" aria-label="Sök forskningsunderlag"><select id="v828CatalogCategory" aria-label="Välj kategori"><option value="">Alla kategorier</option>${[...new Set(originalEvents.map(o=>o.category))].sort((a,b)=>a.localeCompare(b,'sv')).map(c=>`<option value="${enc(c)}">${enc(c)}</option>`).join('')}</select></div><p class="v828-catalog-count" id="v828CatalogCount">129 genomgångar</p><div class="v828-catalog-grid">${docs.map(d=>`<button class="v828-catalog-card" type="button" data-v828-catalog-id="${enc(d.id)}" data-search="${enc([d.heading,d.summary,d.context,d.original.sub].join(' ').toLocaleLowerCase('sv'))}" data-cat="${enc(d.category)}"><span>${enc(d.id)} · ${enc(d.category)}</span><b>${enc(d.heading)}</b><small>${enc(d.coverage)}</small></button>`).join('')}</div><p class="v828-catalog-method">Metod: forskningsöversikter är inte synonymt med slutlig vetenskaplig granskning. Primärtextlänkar, ämneskällor och uppslagsverk har olika bevisvärde.</p>`;
 host.prepend(section);
 const search=section.querySelector('#v828CatalogSearch'),cat=section.querySelector('#v828CatalogCategory');
 function refilter(){const q=search.value.trim().toLocaleLowerCase('sv');let n=0;section.querySelectorAll('.v828-catalog-card').forEach(b=>{const visible=(!q||b.dataset.search.includes(q))&&(!cat.value||cat.value===b.dataset.cat);b.hidden=!visible;if(visible)n++});section.querySelector('#v828CatalogCount').textContent=`${n} av 129 forskningsunderlag visas`}
 search.addEventListener('input',refilter);cat.addEventListener('change',refilter);
 section.querySelectorAll('[data-v828-catalog-id]').forEach(b=>b.onclick=()=>{setSelected(b.dataset.v828CatalogId);if(window.innerWidth<=900&&typeof v84OpenReader==='function')v84OpenReader()});
};

// V8.29 – orientering, kontextnavigation och ett läsbart forskningsfönster.
// Alla forsknings- och arkivdata lämnas oförändrade. Historiska länkar får inte tolkas som belagda kausalsamband.
const v829NavStack=[];
let v829Restoring=false, v829ReaderWidth=410;
const v829Focus={id:null,view:null};
function v829Snapshot(){
 const c=el('v828Catalog');
 return {view:state.view,selected:state.selected,scroll:window.scrollY,detailScroll:el('detail').scrollTop,
  catalogQ:c?.querySelector('#v828CatalogSearch')?.value||'',catalogCat:c?.querySelector('#v828CatalogCategory')?.value||'',catalogScroll:c?.querySelector('.v828-catalog-grid')?.scrollTop||0,
  relation:v827RelationFocus,theme:v83Theme,display:v83Display,min:state.min,max:state.max,order:v827Order,scope:v813Scope};
}
function v829UpdateBack(){
 const btn=el('v829Back');if(!btn)return;
 btn.disabled=v829NavStack.length===0;
 btn.title=btn.disabled?'Ingen tidigare vy i denna session':'Tillbaka till '+v829NavStack[v829NavStack.length-1].view;
 btn.setAttribute('aria-label',btn.title);
 const label=el('v829BackCount');if(label)label.textContent=v829NavStack.length?`(${v829NavStack.length})`:'';
}
function v829Back(){
 if(!v829NavStack.length)return;
 const prev=v829NavStack.pop();v829Restoring=true;
 v827RelationFocus=prev.relation;v83Theme=prev.theme;v83Display=prev.display;
 v827Order=prev.order;v813Scope=prev.scope;
 const scope=el('v813Scope');if(scope)scope.value=prev.scope;
 const order=el('v827Order');if(order)order.value=prev.order;
 view(prev.view);state.min=prev.min;state.max=prev.max;
 // Changing selection must not create another breadcrumb in the history.
 if(idEvent(prev.selected)){setSelected(prev.selected)}
 if(prev.view==='timeline'){renderTimeline()}
 const catalog=el('v828Catalog');if(prev.view==='research'&&catalog){
  const q=catalog.querySelector('#v828CatalogSearch'),cat=catalog.querySelector('#v828CatalogCategory');
  if(q){q.value=prev.catalogQ;q.dispatchEvent(new Event('input',{bubbles:true}))}
  if(cat){cat.value=prev.catalogCat;cat.dispatchEvent(new Event('change',{bubbles:true}))}
  const list=catalog.querySelector('.v828-catalog-grid');if(list)list.scrollTop=prev.catalogScroll;
 }
 v829Restoring=false;v829UpdateBack();v829UpdateSelections();
 requestAnimationFrame(()=>{window.scrollTo({top:prev.scroll,behavior:'instant'});el('detail').scrollTop=prev.detailScroll});
}
const v829PrevView=view;
view=function(dest){
 if(!v829Restoring&&state.view!==dest){v829NavStack.push(v829Snapshot());if(v829NavStack.length>40)v829NavStack.shift()}
 v829PrevView(dest);v829UpdateBack();v829UpdateSelections();
};
// Standalone and unobtrusive back navigation, accessible on both desktop and mobile.
const v829BackBar=document.createElement('div');v829BackBar.id='v829BackBar';v829BackBar.innerHTML=`<button type="button" id="v829Back">← Tillbaka <span id="v829BackCount"></span></button><span id="v829CurrentLocation" aria-live="polite"></span>`;
document.querySelector('.main').prepend(v829BackBar);
el('v829Back').onclick=v829Back;
window.addEventListener('keydown',event=>{if(event.altKey&&event.key==='ArrowLeft'&&!event.target.closest('input,textarea,[contenteditable]')){event.preventDefault();v829Back()}});
function v829UpdateSelections(){
 document.querySelectorAll('[data-v828-catalog-id]').forEach(b=>{
  const on=b.dataset.v828CatalogId===state.selected;
  b.classList.toggle('v829-selected',on);b.setAttribute('aria-pressed',String(on));
 });
 document.querySelectorAll('.v828-gantt-row[data-v828-id],.v813-plotrow[data-id],.v815-category [data-id],.v83-event-card[data-v83read]').forEach(row=>{
  const id=row.dataset.v828Id||row.dataset.id||row.dataset.v83read;
  row.classList.toggle('v829-selected',id===state.selected);
 });
 const dest=el('v829CurrentLocation');if(dest)dest.textContent=({research:'Fördjupningar',timeline:'Tidslinje',explore:'Temaspår',archive:'Originalarkiv',parallels:'Textparalleller',formation:'Textens tillkomst'})[state.view]||'';
}
const v829PrevSelected=setSelected;
setSelected=function(id){v829PrevSelected(id);v829UpdateSelections();};
const v829PrevLibrary=renderResearch;
let v829CatalogQuery='',v829CatalogCat='',v829CatalogScroll=0;
renderResearch=function(){
 const old=el('v828Catalog');if(old){
  v829CatalogQuery=old.querySelector('#v828CatalogSearch')?.value??v829CatalogQuery;
  v829CatalogCat=old.querySelector('#v828CatalogCategory')?.value??v829CatalogCat;
  v829CatalogScroll=old.querySelector('.v828-catalog-grid')?.scrollTop??v829CatalogScroll;
 }
 v829PrevLibrary();const fresh=el('v828Catalog');
 if(fresh){
  const q=fresh.querySelector('#v828CatalogSearch'),cat=fresh.querySelector('#v828CatalogCategory');
  if(q){q.value=v829CatalogQuery;q.dispatchEvent(new Event('input',{bubbles:true}));q.addEventListener('input',()=>v829CatalogQuery=q.value)}
  if(cat){cat.value=v829CatalogCat;cat.dispatchEvent(new Event('change',{bubbles:true}));cat.addEventListener('change',()=>v829CatalogCat=cat.value)}
  const grid=fresh.querySelector('.v828-catalog-grid');if(grid){grid.scrollTop=v829CatalogScroll;grid.addEventListener('scroll',()=>v829CatalogScroll=grid.scrollTop,{passive:true})}
 }
 v829UpdateSelections();
};
const v829PrevTimeline=renderTimeline;
renderTimeline=function(){v829PrevTimeline();v829UpdateSelections()};
v813Timeline=renderTimeline;

// All origin posts can be inspected in Temaspår even if they do not belong to one of the six older curated tracks.
// No undocumented dependency is fabricated. Specific Zoroastrian parallels are suggestions for critical comparison, not causal claims.
const v829ResearchLinks={
 'O030':[{id:'H017',why:'Persisk politisk kontext från 539 f.Kr. – inte en datering av Zarathustra.'},
         {id:'H023',why:'Daniels apokalyptik: jämförelse av idéhistoriska motiv, inte belägg för ett enkelt persiskt textlån.'}],
 'O087':[{id:'H017',why:'Persisk kontaktmiljö – ingen säker beviskedja för idéöverföring.'}]
};
const v829PriorShowRelations=v827ShowRelations;
v827ShowRelations=function(id){
 v829Focus.id=id;v829Focus.view=state.view;
 v829PriorShowRelations(id);
 // Base render has only a dropdown of already-curated connections. Rebuild so the originating post is shown.
 renderExplore();
 document.getElementById('v827RelationFocus')?.scrollIntoView({block:'start',behavior:'instant'});
};
const v829PrevExplore=renderExplore;
renderExplore=function(){
 v829PrevExplore();const panel=el('v827RelationFocus');if(!panel)return;
 const id=v829Focus.id;
 if(!id)return;
 const event=idEvent(id);if(!event)return;
 v827RelationFocus=id;
 const sel=panel.querySelector('#v827RelationSelect');
 if(sel&&!Array.from(sel.options).some(o=>o.value===id))sel.prepend(new Option(`${event.title} (utgångspost)`,id));
 if(sel)sel.value=id;
 const old=panel.querySelector('#v829OriginCard');if(old)old.remove();
 const origin=document.createElement('div');origin.id='v829OriginCard';origin.className='v829-origin';
 const dossier=allOriginalResearchV828[id];const proposed=v829ResearchLinks[id]||[];
 const actions=proposed.map(p=>{const target=idEvent(p.id);return target?`<div class="v829-candidate"><button data-v829-candidate="${enc(p.id)}" type="button">${enc(target.title)} →</button><small>${enc(p.why)}</small></div>`:''}).join('');
 origin.innerHTML=`<span class="kicker">DU KOM FRÅN DENNA POST</span><h3>${enc(dossier?.heading||event.title)} <small>· ${enc(id)}</small></h3><p>${enc(dossier?.summary||event.description||'Ingen sammanfattning tillgänglig.')}</p><p class="v829-caution">${event.original?'Originalarkivets årtal är inte en källprövad datering. ':''}Den här posten ingår inte automatiskt i de sex äldre temaspåren. Vi visar därför ursprungsposten här utan att påstå att den har ett bevisat orsakssamband med andra poster.</p><button type="button" data-v829-readorigin>Läs utgångsposten i läsfönstret →</button>${actions?'<h4>Jämför med historiska sammanhang (inte bevisade beroenden)</h4>'+actions:''}`;
 const grid=panel.querySelector('#v827RelationCards');panel.insertBefore(origin,grid);
 origin.querySelector('[data-v829-readorigin]').onclick=()=>{setSelected(id);if(window.innerWidth<=900)v84OpenReader()};
 origin.querySelectorAll('[data-v829-candidate]').forEach(b=>b.onclick=()=>{setSelected(b.dataset.v829Candidate);if(window.innerWidth<=900)v84OpenReader()});
 if(grid)grid.innerHTML=v827RelationCards(id);
 v827BindRelations(panel);
 if(sel)sel.onchange=()=>{v829Focus.id=sel.value;renderExplore();document.getElementById('v827RelationFocus')?.scrollIntoView({block:'start',behavior:'instant'})};
};

// A thematic 'show in the main timeline' action highlights the real research marker instead of losing it.
let v829Located=null;
function v829HighlightTarget(id,scroll=false){
 document.querySelectorAll('.v829-target').forEach(n=>n.classList.remove('v829-target'));
 const nodes=[...el('lanes').querySelectorAll('[data-v828-id],[data-v827-id],[data-id],[data-v813-id],[data-v83read]')];
 const node=nodes.find(n=>[n.dataset.v828Id,n.dataset.v827Id,n.dataset.id,n.dataset.v813Id,n.dataset.v83read].includes(id));
 if(node){node.classList.add('v829-target');if(scroll)requestAnimationFrame(()=>{if(node.isConnected)node.scrollIntoView({block:'center',inline:'nearest',behavior:'instant'});});return true}
 return false;
}
function v829LocateResearch(id){
 // Only locate the requested record, never silently substitute a different one.
 const entries=v813Entries().filter(x=>Number.isFinite(x.start)&&Number.isFinite(x.end));
 const target=entries.find(x=>x.id===id && x.v813Status!=='original');
 const info=el('v829CurrentLocation');
 if(!target){
  v829Located=null;
  info.textContent='Ingen källprövad tidsplacering finns för '+(idEvent(id)?.title||id)+'. Ingen annan post markeras.';
  return false;
 }
 v829Located=target.id;
 v7Mode='expanded';el('v7expanded').classList.add('on');el('v7compact').classList.remove('on');
 if(el('v827Order'))el('v827Order').value='chrono';v827Order='chrono';
 // Remove search/filter restrictions which would otherwise conceal the requested marker.
 const search=el('search');if(search && search.value){search.value='';}
 if(target.category)state.cat.add(target.category);
 if(target.evidence)state.ev.add(target.evidence);
 const center=(target.start+target.end)/2;
 const span=Math.max(350,Math.min(2200,(target.end-target.start)*4+450));
 state.min=Math.max(-3900000,Math.floor(center-span/2));
 state.max=Math.min(2100,Math.ceil(state.min+span));
 const pad=Math.max(100,span*.8);
 v827Universe={lo:Math.max(-3900000,state.min-pad),hi:Math.min(2100,state.max+pad)};
 renderAll();v827UpdatePan();
 const found=v829HighlightTarget(target.id,true);
 info.textContent=(found?'Markerad i tidslinjen: ':'Tidsintervallet visas men markören kunde inte hittas: ')+(target.v813Label||target.title);
 return found;
}
el('exploreView').addEventListener('click',e=>{
 if(e.target.closest('[data-v83theme]'))v829Focus.id=null;
 const btn=e.target.closest('#v83ShowMain');if(!btn)return;
 e.preventDefault();e.stopImmediatePropagation();
 const target=state.selected;
 view('timeline');v829LocateResearch(target);
},true);
const v829PrevTimeline2=renderTimeline;
renderTimeline=function(){v829PrevTimeline2();if(v829Located && state.view==='timeline')v829HighlightTarget(v829Located);};
v813Timeline=renderTimeline;

// Use one name for each category in both filter checkboxes and the timeline, retaining internal data keys.
function v829CorrectCategoryLabels(){
 el('catFilters').querySelectorAll('label.check').forEach(label=>{
  const name=label.querySelector('input')?.value;if(!name||!laneNames[name])return;
  const last=[...label.childNodes].reverse().find(n=>n.nodeType===Node.TEXT_NODE);
  if(last)last.textContent=laneNames[name];
  label.title=`Kategori: ${laneNames[name]}`;
 });
}
v829CorrectCategoryLabels();

// Pan over a real two-sided range, without manufacturing historical content outside documented periods.
const v829PreviousFit=v827Fit;
v827Fit=function(options={}){
 const result=v829PreviousFit(options);if(!result)return result;
 const width=state.max-state.min;
 const padding=Math.max(100,width*.75);
 v827Universe.lo=Math.max(-3900000,Math.min(v827Universe.lo,state.min-padding));
 v827Universe.hi=Math.min(2100,Math.max(v827Universe.hi,state.max+padding));
 v827UpdatePan();return result;
};
// Make both directions accessible even if the slider starts at the edge of the research range.
const v829PanLeft=el('v827PanLeft'),v829PanRight=el('v827PanRight');
for(const button of [v829PanLeft,v829PanRight])button.title+=' · även tomma år kan visas; inga händelser hittas på';

// Desktop reading width is user-adjustable, with a minimal impact on the timeline. Mobile keeps its bottom sheet.
const v829Reader=el('detail');
const v829Grip=document.createElement('div');v829Grip.id='v829ReaderGrip';v829Grip.role='separator';v829Grip.tabIndex=0;v829Grip.setAttribute('aria-label','Ändra läsfönstrets bredd');v829Grip.setAttribute('aria-orientation','vertical');
v829Reader.prepend(v829Grip);
const v829WidthControls=document.createElement('div');v829WidthControls.id='v829WidthControls';v829WidthControls.innerHTML='<b>Läsbredd</b><button id="v829Narrow" type="button" aria-label="Gör läsfönstret smalare">−</button><button id="v829Wide" type="button" aria-label="Gör läsfönstret bredare">＋</button>';
const v829ReaderBar=v829Reader.querySelector('.v84-reader-bar');if(v829ReaderBar)v829ReaderBar.after(v829WidthControls);else v829Reader.prepend(v829WidthControls);
function v829SetReaderWidth(width){v829ReaderWidth=Math.round(Math.min(Math.min(680,window.innerWidth*.51),Math.max(320,width)));document.documentElement.style.setProperty('--v829-reader-width',v829ReaderWidth+'px');}
v829SetReaderWidth(v829ReaderWidth);
el('v829Narrow').onclick=()=>v829SetReaderWidth(v829ReaderWidth-80);el('v829Wide').onclick=()=>v829SetReaderWidth(v829ReaderWidth+80);
let v829Resize=null;
v829Grip.addEventListener('pointerdown',e=>{if(window.innerWidth<=1100)return;v829Resize={x:e.clientX,width:v829ReaderWidth};v829Grip.setPointerCapture(e.pointerId)});
v829Grip.addEventListener('pointermove',e=>{if(v829Resize)v829SetReaderWidth(v829Resize.width+v829Resize.x-e.clientX)});
v829Grip.addEventListener('pointerup',()=>v829Resize=null);
v829Grip.addEventListener('pointercancel',()=>v829Resize=null);
v829Grip.addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();v829SetReaderWidth(v829ReaderWidth+(e.key==='ArrowLeft'?40:-40))}});
// Details are recreated on selection: reattach width controls to the current top bar, without stealing article space.
const v829PrevDetail=renderDetail;
renderDetail=function(){v829PrevDetail();const r=el('detail');if(!r.querySelector('#v829ReaderGrip'))r.prepend(v829Grip);const bar=r.querySelector('.v84-reader-bar');if(bar)bar.after(v829WidthControls);else r.prepend(v829WidthControls);v829UpdateSelections()};
// Finish with a consistent initial state.
v829UpdateBack();v829UpdateSelections();renderDetail();
