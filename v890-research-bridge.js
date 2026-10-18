/* Granskning 2: tvärgående filosofiska frågor utan påståenden om bevisad gudsteologi. */
(function(){
'use strict';
const questions=[
{q:'Kan ett evigt straff vara rättvist?',history:'Matteus 25:46, Markus 9:43–48 och Uppenbarelseboken 20 ingår i olika textgenrer. De måste först analyseras i sitt sammanhang, före en senare sammanhängande helveteslära.',a:'Förespråkare för evigt straff betonar syndens allvar, gudomlig dom och en slutlig åtskillnad.',b:'Kritiker pekar på proportionalitet mellan begränsade mänskliga handlingar och oändligt straff. Andra kristna modeller är förintelse och slutlig försoning.',limit:'Varken textjämförelse eller filosofiskt resonemang kan ensamt bevisa vilken eskatologisk verklighet som finns.'},
{q:'Om Gud vet framtiden – kan människan välja annorlunda?',history:'Problemet knyter samman föreställningar om gudomlig förkunskap, allmakt och mänskligt ansvar. Senantik och medeltida filosofi ger olika lösningsförsök.',a:'En vanlig invändning är att ofelbar förkunskap tycks göra framtida handlingar nödvändiga.',b:'Ett klassiskt motargument skiljer mellan att veta ett val och att orsaka valet. Andra teorier om tid, frihet och gudomlig kunskap finns.',limit:'Det är en öppen filosofisk diskussion. Inga neurovetenskapliga experiment avgör ensamma vad ofelbar gudomlig förkunskap innebär.'},
{q:'Kan Gud rädda alla utan att kränka deras frihet?',history:'Spänningen diskuteras i den kristna traditionens debatter om nåd, människans gensvar, slutlig dom och apokatastasis.',a:'Invändningen mot universalism är att en människa kan välja att avvisa Guds gemenskap, möjligen för alltid.',b:'Universalistiska argument hävdar att fri vilja kan bestå när okunnighet och missförstånd undanröjs, och att försoning inte behöver innebära tvång.',limit:'Båda argumenten förutsätter särskilda begrepp om frihet och Guds godhet; förespråkarnas slutsatser är inte vetenskapligt avgjorda.'},
{q:'Är något gott därför att Gud vill det?',history:'Platons Euthyfron ställer frågan om det gudfruktiga är gott i kraft av gudarnas gillande eller om gudarna gillar det därför att det är gott.',a:'En stark version av gudomlig befallningsteori förankrar moralisk plikt i gudomlig vilja.',b:'Invändningen gäller risken för godtycklighet. Förfinade teistiska svar skiljer mellan Guds väsentliga godhet och enskilda påbud.',limit:'Moraliska grundfrågor får inte framställas som historiskt fastslagna teologiska fakta.'}
];
const sources=[
{name:'Stanford: Heaven and Hell in Christian Thought (rev. 2025)',url:'https://plato.stanford.edu/entries/heaven-hell/'},
{name:'Stanford: Foreknowledge and Free Will (rev. 2026)',url:'https://plato.stanford.edu/entries/free-will-foreknowledge/'},
{name:'Stanford: Religion and Morality in Western Philosophy',url:'https://plato.stanford.edu/entries/religion-morality/'},
{name:'Stanford: Free Will',url:'https://plato.stanford.edu/entries/freewill/'}];
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const nav='<nav id="v890Nav" class="v890-nav" aria-label="Forskningsspår i Granskning 2"><span>Utforska:</span><a href="#v888Track">Himmel och helvete</a><a href="#v889-good">Är Gud god?</a><a href="#v889-will">Den fria viljan</a><a href="#v890Bridge">När frågorna möts</a></nav>';
function html(){return '<section class="v888-track v890-bridge" id="v890Bridge" aria-label="Gemensamma filosofiska frågor">'+
'<div class="v888-head"><span class="v888-kicker">GRANSKNING 2 · SAMBAND MELLAN FORSKNINGSSPÅREN</span><h2>När frågorna möts</h2>'+
'<p>Om Gud är god, människan har fri vilja och det finns ett slutligt straff – hur kan påståendena förenas? Följ fyra forskningsfrågor där källornas historia skiljs från filosofiska argument och teologiska ställningstaganden.</p>'+
'<p class="v888-warning">Filosofiska positioner återges utan att någon väljs som appens svar.</p></div>'+
questions.map((x,i)=>'<details'+(i===0?' open':'')+'><summary>'+(i+1)+'. '+esc(x.q)+'</summary><div class="v888-body"><p><strong>Historisk ingång:</strong> '+esc(x.history)+'</p><p><strong>Argument A:</strong> '+esc(x.a)+'</p><p><strong>Argument B:</strong> '+esc(x.b)+'</p><p><strong>Begränsning:</strong> '+esc(x.limit)+'</p></div></details>').join('')+
'<div class="v888-columns"><div><h3>Läs relevanta texter</h3><p>Matt 25:31–46; Mark 9:43–48; Rom 9; Rom 11; 1 Kor 15:22–28; 1 Tim 2:4. Texttillkomst, författarskap och genre måste bedömas postvis.</p></div><div><h3>Filosofiska översikter</h3><ul>'+sources.map(s=>'<li><a target="_blank" rel="noopener noreferrer" href="'+esc(s.url)+'">'+esc(s.name)+' ↗</a></li>').join('')+'</ul></div></div>'+
'<p class="v888-footer">Forskningsstatus: översikt och jämförelser, inte vetenskapligt slutgranskade enskilda påståenden i C6-journalen.</p></section>';}
function install(){
const host=document.getElementById('researchView');if(!host)return;
const first=host.querySelector('#v888Track');
if(!host.querySelector('#v890Nav')){if(first)first.insertAdjacentHTML('beforebegin',nav);else host.insertAdjacentHTML('afterbegin',nav);}
if(host.querySelector('#v890Bridge'))return;
const anchor=host.querySelector('#v889-will');if(anchor)anchor.insertAdjacentHTML('afterend',html());else host.insertAdjacentHTML('beforeend',html());
}
function init(){const host=document.getElementById('researchView');if(!host)return;install();new MutationObserver(()=>{if(!host.querySelector('#v890Bridge')||!host.querySelector('#v890Nav'))install()}).observe(host,{childList:true});}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();