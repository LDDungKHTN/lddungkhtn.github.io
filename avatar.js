/* Avatar học sinh (vẽ bằng SVG): đồng phục sơ mi – quần tây hoặc đồ thể dục, đeo khăn quàng đỏ.
   Khác nhau ở khuôn mặt, kiểu tóc (nam/nữ) và có đeo kính hay không.
   AVH(mã, tâm trạng, kiểu) – mã 'h1'…'h12'; tâm trạng: 'idle' | 'happy' | 'sad' | 'win';
   kiểu: 'face' (đầu và cổ áo, dùng trong danh sách) | 'full' (cả người, dùng trong trò chơi).
   Mã cũ là emoji vẫn hiển thị được (đổi sang mã học sinh tương ứng). */
(function(){
var OLD=['🦊','🐼','🐯','🐸','🦄','🐙','🚀','🤖','🦉','🐬','🦖','🐝'];
var CODES=['h1','h2','h3','h4','h5','h6','h7','h8','h9','h10','h11','h12'];
/* [giới tính, kiểu tóc, màu tóc, kính, đồng phục, màu da, tên mô tả] */
var DEF={
 h1:['m','short','#1b1b1b',0,'shirt','#F6C9A0','Nam, tóc ngắn, áo sơ mi'],
 h2:['f','long','#1b1b1b',0,'shirt','#F8CFA8','Nữ, tóc dài, áo sơ mi'],
 h3:['m','short','#1b1b1b',1,'shirt','#EDB98F','Nam, đeo kính, áo sơ mi'],
 h4:['f','pony','#1b1b1b',1,'shirt','#F6C9A0','Nữ, tóc buộc, đeo kính, áo sơ mi'],
 h5:['m','spiky','#1b1b1b',0,'sport','#EDB98F','Nam, tóc dựng, đồ thể dục'],
 h6:['f','pony','#4a2a17',0,'sport','#F8CFA8','Nữ, tóc buộc, đồ thể dục'],
 h7:['m','curly','#4a2a17',1,'sport','#F6C9A0','Nam, tóc xoăn, đeo kính, đồ thể dục'],
 h8:['f','braid','#1b1b1b',1,'sport','#EDB98F','Nữ, tóc tết, đeo kính, đồ thể dục'],
 h9:['m','short','#4a2a17',0,'sport','#F8CFA8','Nam, tóc nâu, đồ thể dục'],
 h10:['f','bob','#4a2a17',0,'shirt','#F6C9A0','Nữ, tóc ngắn, áo sơ mi'],
 h11:['m','spiky','#4a2a17',1,'shirt','#F8CFA8','Nam, tóc dựng, đeo kính, áo sơ mi'],
 h12:['f','braid','#4a2a17',0,'shirt','#EDB98F','Nữ, tóc tết, áo sơ mi']};
function norm(e){var i=OLD.indexOf(e);if(i>=0)return CODES[i];return DEF[e]?e:null}
function hairBack(d){var c=d[2];
 if(d[1]=='long')return '<path d="M21 30 Q19 9 40 9 Q61 9 59 30 L62 60 Q51 64 40 61 Q29 64 18 60 Z" fill="'+c+'"/>';
 if(d[1]=='bob')return '<path d="M21 30 Q19 9 40 9 Q61 9 59 30 L60 46 Q50 49 40 47 Q30 49 20 46 Z" fill="'+c+'"/>';
 if(d[1]=='pony')return '<path d="M55 16 Q70 18 66 34 Q64 46 70 54 Q58 52 58 38 Q57 28 52 22 Z" fill="'+c+'"/><circle cx="57" cy="19" r="3.2" fill="#FF5C8A"/>';
 if(d[1]=='braid'){var s='';[[22,0],[58,1]].forEach(function(p){for(var k=0;k<4;k++)s+='<ellipse cx="'+(p[0]+(p[1]?1:-1)*k*0.6)+'" cy="'+(42+k*6)+'" rx="4.2" ry="3.6" fill="'+c+'"/>';s+='<circle cx="'+(p[0]+(p[1]?2:-2))+'" cy="66" r="2.6" fill="#FF5C8A"/>'});return s}
 return '';
}
function hairFront(d){var c=d[2];
 if(d[0]=='f')return '<path d="M22.5 31 Q22 12 40 11 Q58 12 57.5 31 Q55 21 47 19 Q44 24 34 23 Q27 24 22.5 31 Z" fill="'+c+'"/>'+(d[1]=='long'||d[1]=='bob'?'<rect x="27" y="15" width="6" height="2.6" rx="1.3" fill="#FF5C8A" transform="rotate(-20 30 16)"/>':'');
 if(d[1]=='spiky')return '<path d="M22.5 31 Q21 20 26 15 L27 8 L31 13 L34 5 L37 12 L41 4 L44 12 L48 6 L49 13 L54 9 L54 16 Q59 21 57.5 31 Q54 22 40 21 Q27 22 22.5 31 Z" fill="'+c+'"/>';
 if(d[1]=='curly'){var s='<path d="M22.5 31 Q22 14 40 13 Q58 14 57.5 31 Q53 23 40 22 Q27 23 22.5 31 Z" fill="'+c+'"/>';[[25,20],[31,14],[38,11],[45,12],[51,15],[56,21],[28,17],[42,15],[49,17]].forEach(function(p){s+='<circle cx="'+p[0]+'" cy="'+p[1]+'" r="5" fill="'+c+'"/>'});return s}
 return '<path d="M22.5 31 Q21 11 40 11 Q59 11 57.5 31 Q56 22 50 20 Q46 24 36 22 Q28 22 22.5 31 Z" fill="'+c+'"/>';
}
function face(d,mood){
 var ink='#2B1B12',e,m,x='';
 if(mood=='happy'||mood=='win'){
  e='<path d="M29.5 33 Q33 28.5 36.5 33 M43.5 33 Q47 28.5 50.5 33" stroke="'+ink+'" stroke-width="2.2" fill="none" stroke-linecap="round"/>';
  m='<path d="M33.5 39.5 Q40 48 46.5 39.5 Z" fill="#8B1E2D"/><path d="M36.5 43.6 Q40 46 43.5 43.6 Q40 42 36.5 43.6Z" fill="#FF8FA0"/>';
 }else if(mood=='sad'){
  e='<path d="M30 33.5 Q33 35.5 36 33.5 M44 33.5 Q47 35.5 50 33.5" stroke="'+ink+'" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M29 27.5 L36 30 M51 27.5 L44 30" stroke="'+ink+'" stroke-width="1.8" stroke-linecap="round"/>';
  m='<path d="M35 44 Q40 40.5 45 44" stroke="'+ink+'" stroke-width="2" fill="none" stroke-linecap="round"/>';
  x='<path d="M49 37 q-2.4 4.4 0 6 q2.4 -1.6 0 -6z" fill="#6EC6FF"/>';
 }else{
  e='<ellipse cx="33" cy="32" rx="2.3" ry="2.9" fill="'+ink+'"/><ellipse cx="47" cy="32" rx="2.3" ry="2.9" fill="'+ink+'"/><circle cx="33.8" cy="31" r=".9" fill="#fff"/><circle cx="47.8" cy="31" r=".9" fill="#fff"/>';
  m='<path d="M35.5 40.5 Q40 44 44.5 40.5" stroke="'+ink+'" stroke-width="2" fill="none" stroke-linecap="round"/>';
 }
 var brows=mood=='sad'?'':'<path d="M29.5 26.5 Q33 25 36.5 26.5 M43.5 26.5 Q47 25 50.5 26.5" stroke="'+d[2]+'" stroke-width="1.6" fill="none" stroke-linecap="round"/>';
 var gl=d[3]?'<g fill="rgba(255,255,255,.18)" stroke="#23262e" stroke-width="1.6"><circle cx="33" cy="32.5" r="5.6"/><circle cx="47" cy="32.5" r="5.6"/></g><path d="M38.6 32 L41.4 32 M27.4 31.5 L23.5 30 M52.6 31.5 L56.5 30" stroke="#23262e" stroke-width="1.6"/>':'';
 return '<circle cx="23.5" cy="33" r="3.2" fill="'+d[5]+'"/><circle cx="56.5" cy="33" r="3.2" fill="'+d[5]+'"/><circle cx="40" cy="31" r="17" fill="'+d[5]+'"/>'
  +'<ellipse cx="28.5" cy="38.5" rx="3" ry="1.8" fill="#FF9BA8" opacity=".55"/><ellipse cx="51.5" cy="38.5" rx="3" ry="1.8" fill="#FF9BA8" opacity=".55"/>'
  +hairFront(d)+brows+e+m+gl+x;
}
function body(d,mood){
 var sk=d[5],sport=d[4]=='sport',top=sport?'#1E5BD8':'#FFFFFF',pant=sport?'#1E5BD8':'#1F2A5A',lineC=sport?'#FFFFFF':'#C9D2E3';
 var up=mood=='win'||mood=='happy';
 var arm=function(sx,ex,ey){var mx=(sx+ex)/2+(ex<40?-1:1),my=(55+ey)/2;
  return sport?'<path d="M'+sx+' 55 L'+ex+' '+ey+'" stroke="'+top+'" stroke-width="8" stroke-linecap="round"/><path d="M'+sx+' 55 L'+ex+' '+ey+'" stroke="#fff" stroke-width="1.6" stroke-dasharray="0 3 30"/><circle cx="'+ex+'" cy="'+ey+'" r="4" fill="'+sk+'"/>'
   :'<path d="M'+sx+' 55 L'+mx+' '+my+'" stroke="'+top+'" stroke-width="9" stroke-linecap="round"/><path d="M'+mx+' '+my+' L'+ex+' '+ey+'" stroke="'+sk+'" stroke-width="6" stroke-linecap="round"/><circle cx="'+ex+'" cy="'+ey+'" r="4" fill="'+sk+'"/>'};
 var arms=up?arm(25,14,38)+arm(55,66,38):mood=='sad'?arm(25,22,82)+arm(55,58,82):arm(25,16,80)+arm(55,64,80);
 var torso='<path d="M23 56 Q25 49 33 48.5 L47 48.5 Q55 49 57 56 L59 86 L21 86 Z" fill="'+top+'" stroke="'+(sport?'#123c9a':'#D5DCEA')+'" stroke-width="1"/>';
 var det=sport?'<path d="M40 52 L40 86" stroke="#fff" stroke-width="1.4"/><path d="M23 70 L57 70" stroke="#fff" stroke-width="1" opacity=".0"/>'
  :'<circle cx="40" cy="64" r=".9" fill="#9aa6bd"/><circle cx="40" cy="71" r=".9" fill="#9aa6bd"/><circle cx="40" cy="78" r=".9" fill="#9aa6bd"/><path d="M33 49 L37.5 55 L40 50.5 L42.5 55 L47 49" fill="#fff" stroke="#D5DCEA" stroke-width=".8"/>';
 var legs='<rect x="25.5" y="84" width="13" height="27" rx="3" fill="'+pant+'"/><rect x="41.5" y="84" width="13" height="27" rx="3" fill="'+pant+'"/>'
  +(sport?'<path d="M27 86 L27 110 M53 86 L53 110" stroke="#fff" stroke-width="1.5"/>':'<rect x="23" y="83" width="34" height="3.2" rx="1" fill="#141a33"/>')
  +'<ellipse cx="31" cy="113" rx="8" ry="4" fill="'+(sport?'#fff':'#1a1a1a')+'" stroke="#333" stroke-width=".8"/><ellipse cx="49" cy="113" rx="8" ry="4" fill="'+(sport?'#fff':'#1a1a1a')+'" stroke="#333" stroke-width=".8"/>';
 var scarf='<path d="M31.5 49 Q40 56.5 48.5 49" stroke="#E3262E" stroke-width="3.6" fill="none" stroke-linecap="round"/><path d="M40 53 L33.5 67 L37.6 67.6 L40 56 Z M40 53 L46.5 67 L42.4 67.6 L40 56 Z" fill="#E3262E"/><path d="M38 51.5 L42 51.5 L41.4 55.5 L38.6 55.5 Z" fill="#B8141C"/>';
 return legs+arms+torso+det+scarf+'<rect x="36.5" y="44" width="7" height="7" fill="'+sk+'"/>';
}
function svg(e,mood,mode){
 var d=DEF[e];mood=mood||'idle';
 var head=hairBack(d)+face(d,mood);
 if(mood=='sad')head='<g transform="translate(0 5) rotate(10 40 48)">'+head+'</g>';
 var halo=mood=='win'?'<ellipse cx="40" cy="6" rx="13" ry="3.6" fill="none" stroke="#FFD43B" stroke-width="2.4"/>':'';
 var vb=mode=='full'?'0 0 80 120':'14 4 52 58';
 return '<svg class="avs-svg" viewBox="'+vb+'" aria-hidden="true">'+(mode=='full'?body(d,mood):'<rect x="22" y="50" width="36" height="14" rx="6" fill="'+(d[4]=='sport'?'#1E5BD8':'#fff')+'"/><path d="M31.5 49 Q40 56.5 48.5 49" stroke="#E3262E" stroke-width="3.6" fill="none"/><path d="M40 53 L35 62 L45 62 Z" fill="#E3262E"/><rect x="36.5" y="44" width="7" height="7" fill="'+d[5]+'"/>')+head+halo+'</svg>';
}
window.AVCODES=CODES;
window.AVNORM=function(e){return norm(e)||e};
window.AVNAME=function(e){var c=norm(e);return c?DEF[c][6]:'Biểu tượng'};
window.AVH=function(e,mood,mode){
 var c=norm(e);if(!c)return '<span class="avh emo">'+String(e||'🙂').replace(/[<>&"]/g,'')+'</span>';
 return '<span class="avh'+(mode=='full'?' full':'')+(mood=='win'?' win':mood=='sad'?' sad':'')+'">'+svg(c,mood,mode)+'</span>';
};
})();
