/* Granskning 4: Lilith. Arbetsutkast för testgren 2026-10-16.
   Två traditionshistoriska lager med egna dateringar. Ej C6-slutgranskade. */
(function(){
 'use strict';
 if(typeof events==='undefined'||typeof research==='undefined') return;
 const records=[
 {id:'H066',category:'Religion & texter',title:'Lilith – från nattväsen till judisk demontradition',start:-700,end:-100,dating:'Textvittnen och traditionsutveckling; inte väsendets levnadstid',evidence:'Medel',description:'Hebreiskans lilit återfinns i Jesaja 34:14 och en Lilith-gestalt i judisk demontradition. Förbindelser till mesopotamiska lilītu diskuteras; ingen obruten identitet får antas.',bible:'Jes 34:14 (ej Adams hustru)',source:'https://www.sefaria.org/Isaiah.34.14',reviewed:false},
 {id:'H067',category:'Religion & texter',title:'Lilith som Adams första hustru – en medeltida nytolkning',start:800,end:1000,dating:'Ungefärlig datering av Ben Siras alfabet, inte Genesis eller den berättade händelsen',evidence:'Hög',description:'Ben Siras alfabet framställer Lilith som en kvinna skapad ur jord liksom Adam. Hon vägrar underordning och lämnar honom. Berättelsen finns inte i Första Moseboken.',bible:'1 Mos 1:27; 2:7, 21–23 (senare tolkning, inte originaltext)',source:'https://www.sefaria.org/Sheet.95978',reviewed:false}
 ];
 for(const r of records)if(!events.some(x=>x.id===r.id))events.push(r);
 if(!research.H066)research.H066={
 overview:'Jesaja 34:14 använder hebreiskans lilit i en poetisk skildring av ödeläggelse. Namnet eller benämningen knyts i senare judiska texter till farliga nattväsen. Besläktade mesopotamiska benämningar, bland annat lilītu, hör till den större jämförelsebakgrunden, men forskningen skiljer ordlikhet och motivlikhet från belagd kontinuitet.',
 parallels:'En text från Qumran (4Q510–511, ofta kallad Songs of the Sage) nämner Lilith tillsammans med onda andar. Senantika besvärjelseskålar och talmudiska traditioner visar ytterligare omgestaltning av demonföreställningar. Dessa vittnen berättar inte i sig att Lilith var Adams hustru.',
 caution:'Postens tidsintervall ger ett ungefärligt ankare för den hebreiska textmiljön och får inte tolkas som start och slut för Lilithtron. Datering av Jes 34 och Qumrantraditioner kräver uppdelning. Den omtalade babyloniska Nattens drottning-reliefen kan inte säkert identifieras som Lilith.',
 sources:[['Jesaja 34:14 – hebreisk text och översättning','https://www.sefaria.org/Isaiah.34.14'],['Jewish Encyclopedia – Lilith (äldre referensöversikt)','https://www.jewishencyclopedia.com/articles/9986-lilith'],['British Museum – Queen of the Night (omstridd ikonografi)','https://www.britishmuseum.org/collection/object/W_2003-0718-1']]
 };
 if(!research.H067)research.H067={
 overview:'I den medeltida texten Ben Siras alfabet presenteras Lilith som en hustru skapad ur jorden före Eva. Hon och Adam grälar om ställning och jämlikhet. Hon uttalar Guds namn och flyger bort. Berättelsen omfattar också skyddsamuletter mot hot mot barn. Det rör sig om judisk legend, inte om en utelämnad passage ur Genesis.',
 parallels:'Genesis 1:27 berättar att människan skapas som man och kvinna, medan Genesis 2 formar kvinnan efter mannen. Äldre rabbinska utläggningar kan tala om en tidigare kvinna; identifikationen med Lilith är bevarad i en senare framställning. Detta illustrerar reception och harmonisering, inte ett bevis att Genesisförfattarna tänkte på Lilith.',
 caution:'Ben Siras alfabet är inte samma text som den deuterokanoniska Syraks bok/Jesus Syraks vishet. Att legendens Lilith försvarar jämlikhet innebär inte att hela medeltidstexten är en modern frigörelseberättelse; texten beskriver henne också som demonisk. Den exakta tillkomsttidpunkten och genrebestämningen diskuteras.',
 sources:[['Ben Siras alfabet – textutdrag med källangivelse (Sefaria)','https://www.sefaria.org/Sheet.95978'],['Genesis 1:27','https://www.sefaria.org/Genesis.1.27'],['Genesis 2:7–23','https://www.sefaria.org/Genesis.2.7-23'],['Lilith: Lady Flying in Darkness – traditionsöversikt','https://www.myjewishlearning.com/article/lilith-lady-flying-in-darkness/']]
 };
 window.TIDENS_LILITH_ILLUSTRATIONS=[
 {id:'H066',source:'https://www.britishmuseum.org/collection/object/W_2003-0718-1',credit:'Nattens drottning, Babylonien. Omdebatterad identitet; INTE säker avbildning av Lilith. Referenslänk, ingen licensklarerad inbäddning.'},
 {id:'H067',source:'https://commons.wikimedia.org/wiki/File:Lilith_(John_Collier_painting).jpg',credit:'John Collier, Lilith (1887), konstnärlig eftertolkning, inte antikt belägg. Kontrollera filens licens och URL före inbäddning.'}
 ];
})();