/* V8.59 – 66 books on a separate Gantt timeline with own category filter */
(function(){
const books=window.TIDENS_BIBLE_BOOKS||[];if(!books.length)return;
const root=document.getElementById('timelineView');if(!root)return;
const host=document.createElement('section');host.id='tvBooksGantt';host.className='tv-books-gantt';
host.innerHTML='<h3>Bibelns böcker – tillkomst i grafisk tidslinje</h3><p>Preliminära intervall för texttillkomst och redaktion, inte tiden för berättade händelser.</p><label><input type="checkbox" id="tvBooksOnly"> Visa enbart Bibelns böcker</label> <label>Urval <select id="tvGanttTestament"><option value="alla">GT och NT</option><option value="GT">GT</option><option value="NT">NT</option></select></label><div class="tv-gantt-scroll"><div class="tv-gantt-axis-label">Tidsaxel: 1000 f.Kr. – 150 e.Kr.</div><div id="tvBooksGanttRows"></div></div>';
root.prepend(host);
const style=document.createElement('style');
style.textContent='.tv-books-gantt{margin:15px 0;padding:14px;border:1px solid #cedae5;border-radius:12px;background:white}.tv-books-gantt label{display:inline-flex;align-items:center;gap:6px;margin:9px 12px 9px 0}.tv-gantt-scroll{max-height:440px;overflow:auto}.tv-gantt-row{display:grid;grid-template-columns:185px minmax(430px,1fr);gap:8px;align-items:center;padding:6px 5px;border-bottom:1px solid #e6ecf2}.tv-gantt-name{background:transparent;border:0;color:inherit;text-align:left;font-weight:600;cursor:pointer}.tv-gantt-track{height:27px;position:relative;background:repeating-linear-gradient(to right,#f6f8fa 0,#f6f8fa calc(25% - 1px),#dce4ed calc(25% - 1px),#dce4ed 25%)}.tv-gantt-bar{position:absolute;top:4px;height:19px;min-width:5px;background:#628bb5;border:1px solid #456c91;border-radius:4px;cursor:pointer}.tv-gantt-bar.nt{background:#bd956d;border-color:#a27a51}.tv-gantt-bar:focus-visible,.tv-gantt-name:focus-visible{outline:3px solid #2465b2;outline-offset:2px}.tv-gantt-axis-label{font-size:.8rem;color:#536b83;margin:7px 0}@media(max-width:650px){.tv-books-gantt{padding:8px}.tv-gantt-row{grid-template-columns:135px minmax(430px,1fr)}.tv-gantt-scroll{overflow:auto}}';
document.head.append(style);
const min=-1000,max=150,span=max-min,fmt=y=>y<0?Math.abs(y)+' f.Kr.':y+' e.Kr.';
const element=(tag,cls,txt)=>{const e=document.createElement(tag);e.className=cls;if(txt!==undefined)e.textContent=txt;return e;};
function draw(){const list=host.querySelector('#tvBooksGanttRows');list.replaceChildren();
const filter=host.querySelector('#tvGanttTestament').value;
for(const b of books.filter(x=>filter==='alla'||x.testament===filter)){
const row=element('div','tv-gantt-row'),name=element('button','tv-gantt-name',b.title),track=element('div','tv-gantt-track'),bar=element('button','tv-gantt-bar'+(b.testament==='NT'?' nt':''));
name.type='button';name.dataset.tvBook=b.id;bar.type='button';bar.dataset.tvBook=b.id;
const start=Math.max(0,Math.min(100,(b.start-min)/span*100)),width=Math.max(.5,Math.min(100-start,(b.end-b.start)/span*100));
bar.style.left=start+'%';bar.style.width=width+'%';bar.title=b.title+' – '+fmt(b.start)+' till '+fmt(b.end);bar.setAttribute('aria-label',bar.title);
track.append(bar);row.append(name,track);list.append(row);
}}
function onlyBooks(){const active=host.querySelector('#tvBooksOnly').checked;for(const e of root.querySelectorAll('.timeline-card'))e.hidden=active;const old=root.querySelector('#tvBiblicalBooks');if(old)old.hidden=active;}
host.querySelector('#tvGanttTestament').addEventListener('change',draw);
host.querySelector('#tvBooksOnly').addEventListener('change',onlyBooks);
const prior=renderTimeline;renderTimeline=function(){prior();onlyBooks();};draw();
window.TidensBookGanttV859=Object.freeze({bookCount:books.length});
})();
