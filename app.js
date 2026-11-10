/* ĐẤU TRƯỜNG KHTN – ứng dụng chính (lớp 7, 8, 9 – bộ sách Kết nối tri thức)
   Kho câu hỏi nằm ở các file cauhoi-l7.js, cauhoi-l8.js, cauhoi-l9-*.js.
   Định dạng một câu: {b:số bài, t:'mc'|'tf'|'num', l:1-4, c:'chủ đề', q:'câu hỏi', o:[4 đáp án], a:đáp án, e:'giải thích'}
   l = 4 là câu nâng cao, chỉ xuất hiện khi chọn một bài/chương hoặc ở chế độ Ôn tập. */
(function(){
'use strict';
/* ================= DỮ LIỆU LỚP ================= */
var GR={
6:{n:6,files:['cauhoi-l6-hk1.js','cauhoi-l6-hk2.js'],tag:'Các phép đo, chất quanh ta, hỗn hợp · Tế bào, đa dạng thế giới sống · Lực, năng lượng, Trái Đất và bầu trời',
 bai:['Giới thiệu về Khoa học tự nhiên','An toàn trong phòng thực hành','Sử dụng kính lúp','Sử dụng kính hiển vi quang học','Đo chiều dài','Đo khối lượng','Đo thời gian','Đo nhiệt độ','Sự đa dạng của chất','Các thể của chất và sự chuyển thể','Oxygen. Không khí','Một số vật liệu','Một số nguyên liệu','Một số nhiên liệu','Một số lương thực, thực phẩm','Hỗn hợp các chất','Tách chất khỏi hỗn hợp','Tế bào – Đơn vị cơ bản của sự sống','Cấu tạo và chức năng các thành phần của tế bào','Sự lớn lên và sinh sản của tế bào','Thực hành: Quan sát và phân biệt một số loại tế bào','Cơ thể sinh vật','Tổ chức cơ thể đa bào','Thực hành: Quan sát và mô tả cơ thể đơn bào, cơ thể đa bào','Hệ thống phân loại sinh vật','Khoá lưỡng phân','Vi khuẩn','Thực hành: Làm sữa chua và quan sát vi khuẩn','Virus','Nguyên sinh vật','Thực hành: Quan sát nguyên sinh vật','Nấm','Thực hành: Quan sát các loại nấm','Thực vật','Thực hành: Quan sát và phân biệt một số nhóm thực vật','Động vật','Thực hành: Quan sát và nhận biết một số nhóm động vật ngoài thiên nhiên','Đa dạng sinh học','Tìm hiểu sinh vật ngoài thiên nhiên','Lực là gì?','Biểu diễn lực','Biến dạng của lò xo','Trọng lượng, lực hấp dẫn','Lực ma sát','Lực cản của nước','Năng lượng và sự truyền năng lượng','Một số dạng năng lượng','Sự chuyển hoá năng lượng','Năng lượng hao phí','Năng lượng tái tạo','Tiết kiệm năng lượng','Chuyển động nhìn thấy của Mặt Trời. Thiên thể','Mặt Trăng','Hệ Mặt Trời','Ngân Hà'],
 ch:[['Chương I. Mở đầu về Khoa học tự nhiên',1,8],['Chương II. Chất quanh ta',9,11],['Chương III. Một số vật liệu, nguyên liệu, nhiên liệu, lương thực – thực phẩm thông dụng',12,15],['Chương IV. Hỗn hợp. Tách chất ra khỏi hỗn hợp',16,17],['Chương V. Tế bào',18,21],['Chương VI. Từ tế bào đến cơ thể',22,24],['Chương VII. Đa dạng thế giới sống',25,39],['Chương VIII. Lực trong đời sống',40,45],['Chương IX. Năng lượng',46,51],['Chương X. Trái Đất và bầu trời',52,55]]},
7:{n:7,files:['cauhoi-l7.js'],tag:'Nguyên tử, liên kết hoá học · Tốc độ, âm thanh, ánh sáng, từ · Trao đổi chất, cảm ứng, sinh trưởng, sinh sản',
 bai:['Phương pháp và kĩ năng học tập môn KHTN','Nguyên tử','Nguyên tố hoá học','Sơ lược về bảng tuần hoàn các nguyên tố hoá học','Phân tử – Đơn chất – Hợp chất','Giới thiệu về liên kết hoá học','Hoá trị và công thức hoá học','Tốc độ chuyển động','Đo tốc độ','Đồ thị quãng đường – thời gian','Thảo luận về ảnh hưởng của tốc độ trong an toàn giao thông','Sóng âm','Độ to và độ cao của âm','Phản xạ âm, chống ô nhiễm tiếng ồn','Năng lượng ánh sáng. Tia sáng, vùng tối','Sự phản xạ ánh sáng','Ảnh của vật qua gương phẳng','Nam châm','Từ trường','Từ trường Trái Đất – Sử dụng la bàn','Khái quát về trao đổi chất và chuyển hoá năng lượng','Quang hợp ở thực vật','Một số yếu tố ảnh hưởng đến quang hợp','Thực hành: Chứng minh quang hợp ở cây xanh','Hô hấp tế bào','Một số yếu tố ảnh hưởng đến hô hấp tế bào','Thực hành: Hô hấp ở thực vật','Trao đổi khí ở sinh vật','Vai trò của nước và các chất dinh dưỡng đối với sinh vật','Trao đổi nước và các chất dinh dưỡng ở thực vật','Trao đổi nước và các chất dinh dưỡng ở động vật','Thực hành: Chứng minh thân vận chuyển nước và lá thoát hơi nước','Cảm ứng ở sinh vật và tập tính ở động vật','Vận dụng hiện tượng cảm ứng ở sinh vật vào thực tiễn','Thực hành: Cảm ứng ở sinh vật','Khái quát về sinh trưởng và phát triển ở sinh vật','Ứng dụng sinh trưởng và phát triển ở sinh vật vào thực tiễn','Thực hành: Quan sát, mô tả sự sinh trưởng và phát triển ở một số sinh vật','Sinh sản vô tính ở sinh vật','Sinh sản hữu tính ở sinh vật','Một số yếu tố ảnh hưởng và điều hoà, điều khiển sinh sản ở sinh vật','Cơ thể sinh vật là một thể thống nhất'],
 ch:[['Mở đầu',1,1],['Chương I. Nguyên tử. Sơ lược về bảng tuần hoàn',2,4],['Chương II. Phân tử. Liên kết hoá học',5,7],['Chương III. Tốc độ',8,11],['Chương IV. Âm thanh',12,14],['Chương V. Ánh sáng',15,17],['Chương VI. Từ',18,20],['Chương VII. Trao đổi chất và chuyển hoá năng lượng ở sinh vật',21,32],['Chương VIII. Cảm ứng ở sinh vật',33,35],['Chương IX. Sinh trưởng và phát triển ở sinh vật',36,38],['Chương X. Sinh sản ở sinh vật',39,42]]},
8:{n:8,files:['cauhoi-l8-hk1.js','cauhoi-l8-hk2.js'],tag:'Phản ứng hoá học, acid – base – muối · Áp suất, moment lực, điện, nhiệt · Cơ thể người, sinh vật và môi trường',
 bai:['Sử dụng một số hoá chất, thiết bị cơ bản trong phòng thí nghiệm','Phản ứng hoá học','Mol và tỉ khối chất khí','Dung dịch và nồng độ','Định luật bảo toàn khối lượng và phương trình hoá học','Tính theo phương trình hoá học','Tốc độ phản ứng và chất xúc tác','Acid','Base. Thang pH','Oxide','Muối','Phân bón hoá học','Khối lượng riêng','Thực hành xác định khối lượng riêng','Áp suất trên một bề mặt','Áp suất chất lỏng. Áp suất khí quyển','Lực đẩy Archimedes','Tác dụng làm quay của lực. Moment lực','Đòn bẩy và ứng dụng','Hiện tượng nhiễm điện do cọ xát','Dòng điện, nguồn điện','Mạch điện đơn giản','Tác dụng của dòng điện','Cường độ dòng điện và hiệu điện thế','Thực hành đo cường độ dòng điện và hiệu điện thế','Năng lượng nhiệt và nội năng','Thực hành đo năng lượng nhiệt bằng joulemeter','Sự truyền nhiệt','Sự nở vì nhiệt','Khái quát về cơ thể người','Hệ vận động ở người','Dinh dưỡng và tiêu hoá ở người','Máu và hệ tuần hoàn của cơ thể người','Hệ hô hấp ở người','Hệ bài tiết ở người','Điều hoà môi trường trong của cơ thể người','Hệ thần kinh và các giác quan ở người','Hệ nội tiết ở người','Da và điều hoà thân nhiệt ở người','Sinh sản ở người','Môi trường và các nhân tố sinh thái','Quần thể sinh vật','Quần xã sinh vật','Hệ sinh thái','Sinh quyển','Cân bằng tự nhiên','Bảo vệ môi trường'],
 ch:[['Mở đầu',1,1],['Chương I. Phản ứng hoá học',2,7],['Chương II. Một số hợp chất thông dụng',8,12],['Chương III. Khối lượng riêng và áp suất',13,17],['Chương IV. Tác dụng làm quay của lực',18,19],['Chương V. Điện',20,25],['Chương VI. Nhiệt',26,29],['Chương VII. Sinh học cơ thể người',30,40],['Chương VIII. Sinh vật và môi trường',41,47]]},
9:{n:9,files:['cauhoi-l9-hk1.js','cauhoi-l9-hk2.js'],tag:'Năng lượng, ánh sáng, điện, điện từ · Kim loại, hợp chất hữu cơ, tài nguyên · Di truyền, tiến hoá',
 bai:['Nhận biết một số dụng cụ, hoá chất. Thuyết trình một vấn đề khoa học','Động năng. Thế năng','Cơ năng','Công và công suất','Khúc xạ ánh sáng','Phản xạ toàn phần','Lăng kính','Thấu kính','Thực hành đo tiêu cự của thấu kính hội tụ','Kính lúp. Bài tập thấu kính','Điện trở. Định luật Ohm','Đoạn mạch nối tiếp, song song','Năng lượng của dòng điện và công suất điện','Cảm ứng điện từ. Nguyên tắc tạo ra dòng điện xoay chiều','Tác dụng của dòng điện xoay chiều','Vòng năng lượng trên Trái Đất. Năng lượng hoá thạch','Một số dạng năng lượng tái tạo','Tính chất chung của kim loại','Dãy hoạt động hoá học','Tách kim loại và việc sử dụng hợp kim','Sự khác nhau cơ bản giữa phi kim và kim loại','Giới thiệu về hợp chất hữu cơ','Alkane','Alkene','Nguồn nhiên liệu','Ethylic alcohol','Acetic acid','Lipid','Carbohydrate. Glucose và saccharose','Tinh bột và cellulose','Protein','Polymer','Sơ lược về hoá học vỏ Trái Đất và khai thác tài nguyên từ vỏ Trái Đất','Khai thác đá vôi. Công nghiệp silicate','Khai thác nhiên liệu hoá thạch. Nguồn carbon. Chu trình carbon và sự ấm lên toàn cầu','Khái quát về di truyền học','Các quy luật di truyền của Mendel','Nucleic acid và gene','Tái bản DNA và phiên mã tạo RNA','Dịch mã và mối quan hệ từ gene đến tính trạng','Đột biến gene','Nhiễm sắc thể và bộ nhiễm sắc thể','Nguyên phân và giảm phân','Nhiễm sắc thể giới tính và cơ chế xác định giới tính','Di truyền liên kết','Đột biến nhiễm sắc thể','Di truyền học với con người','Ứng dụng công nghệ di truyền vào đời sống','Khái niệm tiến hoá và các hình thức chọn lọc','Cơ chế tiến hoá','Sự phát sinh và phát triển sự sống trên Trái Đất'],
 ch:[['Mở đầu',1,1],['Chương I. Năng lượng cơ học',2,4],['Chương II. Ánh sáng',5,10],['Chương III. Điện',11,13],['Chương IV. Điện từ',14,15],['Chương V. Năng lượng với cuộc sống',16,17],['Chương VI. Kim loại. Sự khác nhau cơ bản giữa phi kim và kim loại',18,21],['Chương VII. Giới thiệu về chất hữu cơ. Hydrocarbon và nguồn nhiên liệu',22,25],['Chương VIII. Ethylic alcohol và acetic acid',26,27],['Chương IX. Lipid. Carbohydrate. Protein. Polymer',28,32],['Chương X. Khai thác tài nguyên từ vỏ Trái Đất',33,35],['Chương XI. Di truyền học Mendel. Cơ sở phân tử của hiện tượng di truyền',36,41],['Chương XII. Di truyền nhiễm sắc thể',42,46],['Chương XIII. Di truyền học với con người và đời sống',47,48],['Chương XIV. Tiến hoá',49,51]]}};
var GAMES={
 mil:{ico:'💰',name:'Ai là triệu phú',pick:['mc'],n:10,time:30,d:'10 câu từ dễ đến khó, tiền thưởng tăng dần, có quyền trợ giúp 50:50 và Đổi câu hỏi.'},
 flash:{ico:'⚡',name:'Nhanh như chớp',pick:['tf','mc'],n:10,time:10,d:'Đúng/sai và trắc nghiệm, mỗi câu 10 giây, trả lời càng nhanh điểm càng cao.'},
 num:{ico:'🔢',name:'Giải mã con số',pick:['num'],n:8,time:40,d:'Tính nhanh và nhập đáp án là một con số.'},
 squid:{ico:'🌉',name:'Vượt cầu sinh tồn',pick:['mc','tf'],n:10,time:30,solo:1,d:'Chơi đơn. Chọn đúng tấm kính để bước tiếp, chọn sai là sụp hố! Qua 8–10 bước để nhận cúp.'},
 sack:{ico:'🦘',name:'Nhảy bao bố',team:1,d:'Hai đội Xanh – Đỏ thi cùng lúc trên một màn hình, mỗi đội 10 câu. Đúng thì nhảy một bước.'}};
var MODES={solo:{ico:'🎯',name:'Chơi đơn',k:1,d:'Một mình thử thách và leo bảng vàng.'},vs:{ico:'⚔️',name:'Đối kháng',k:2,d:'Hai bạn thay phiên trả lời, ai nhiều điểm hơn thắng.'},relay:{ico:'🏃',name:'Tiếp sức',k:3,d:'Ba bạn chuyền gậy từng câu, đúng liên tiếp được thưởng chuỗi.'}};
var LADDER=[100,200,300,500,1000,2000,4000,8000,15000,30000];
var AV=['🦊','🐼','🐯','🐸','🦄','🐙','🚀','🤖','🦉','🐬','🦖','🐝'];
var LVN=['Dễ','Vừa','Khó','Nâng cao'];
var LEVELS=[[0,'Tân binh','🌱'],[150,'Nhà thám hiểm','🧭'],[400,'Nhà khoa học nhí','🔬'],[800,'Nhà nghiên cứu','🧪'],[1500,'Chuyên gia','🧠'],[2500,'Giáo sư','🎓'],[4000,'Thiên tài','🚀'],[6000,'Huyền thoại','👑']];
var BADGES=[['first','🎬','Lên sóng','Chơi ván đầu tiên'],['streak5','🔥','Chuỗi lửa','Đúng 5 câu liên tiếp'],['streak10','☄️','Sao chổi','Đúng 10 câu liên tiếp'],['mil','💰','Triệu phú tri thức','Vượt qua mọi câu hỏi Ai là triệu phú'],['flash','⚡','Tia chớp','Đúng từ 8 câu Nhanh như chớp trở lên'],['num','🔢','Thần số học','Giải đúng mọi câu Giải mã con số'],['bridge','🌉','Qua cầu','Về đích Vượt cầu sinh tồn'],['review','📚','Chăm ôn','Hoàn thành 5 lượt ôn tập'],['perfect','💯','Hoàn hảo','Ôn tập đúng 100% (từ 10 câu)'],['xp1000','🏆','Ngôi sao','Đạt 1000 điểm kinh nghiệm'],['xp5000','👑','Huyền thoại','Đạt 5000 điểm kinh nghiệm']];

/* ================= TIỆN ÍCH ================= */
var app=document.getElementById('app');
function $(s){return document.querySelector(s)}
function $$(s){return [].slice.call(document.querySelectorAll(s))}
function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function load(k,d){try{var v=JSON.parse(localStorage.getItem(k));return v==null?d:v}catch(e){return d}}
function save(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
function shuf(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=a[i];a[i]=a[j];a[j]=t}return a}
function snd(f,x){if(window.SND&&SND[f])SND[f](x)}
function fmt(n){return String(n).replace('.',',')}
function numVal(s){s=String(s).trim().replace(/\s/g,'').replace(',','.');return s===''?NaN:+s}
function ansText(q){return q.t=='mc'?'ABCD'[q.a]+'. '+q.o[q.a]:q.t=='tf'?(q.a?'ĐÚNG':'SAI'):fmt(q.a)}
function stars(l){return '<span class="stars" aria-label="'+LVN[l-1]+'">'+'★★★★'.slice(0,Math.min(l,4))+'<i>'+'★★★★'.slice(0,4-Math.min(l,4))+'</i></span>'}
function setScreen(n){document.body.setAttribute('data-scr',n);document.body.classList.remove('tight','tighter');document.body.classList.toggle('playing',n=='play'||n=='sack');window.scrollTo(0,0)}

/* ================= KHO CÂU HỎI ================= */
var BANK={},LOADING={};
function norm(q){
 if(!q||typeof q.q!='string')return null;
 q.l=Math.max(1,Math.min(4,+q.l||1));q.b=+q.b||0;
 if(q.t=='mc')return q.o&&q.o.length==4&&q.a>=0&&q.a<4?q:null;
 if(q.t=='tf')return typeof q.a=='boolean'?q:null;
 if(q.t=='num'){q.a=+q.a;return isFinite(q.a)?q:null}
 return null;
}
var DTK=window.DTK={
 data:function(g,qs){BANK[g]=(qs||[]).map(norm).filter(Boolean)},
 add:function(g,qs){BANK[g]=(BANK[g]||[]).concat((qs||[]).map(norm).filter(Boolean))},
 MC:function(b,l,c,q,ans,w1,w2,w3){return{t:'mc',b:b,l:l,c:c,q:q,o:[ans,w1,w2,w3],a:0}},
 TF:function(b,l,c,q,a,e){var r={t:'tf',b:b,l:l,c:c,q:q,a:a};if(e)r.e=e;return r},
 NUM:function(b,l,c,q,a,e){var r={t:'num',b:b,l:l,c:c,q:q,a:a};if(e)r.e=e;return r}};
/* Tương thích file xuất từ trang quản lý câu hỏi lớp 7 cũ (KH7Q.replaceAll / KH7Q.add) */
window.KH7Q={MC:DTK.MC,TF:DTK.TF,NUM:DTK.NUM,add:function(a){DTK.add(7,a)},replaceAll:function(a){DTK.data(7,a)}};
function loadGrade(g,cb){
 if(BANK[g]&&!LOADING[g])return cb&&cb();
 if(LOADING[g]){LOADING[g].push(cb);return}
 LOADING[g]=[cb];BANK[g]=BANK[g]||[];
 var fs=GR[g].files.slice();
 (function next(){
  if(!fs.length){var l=LOADING[g];LOADING[g]=null;l.forEach(function(f){f&&f()});return}
  var s=document.createElement('script');s.src=fs.shift();s.onload=next;s.onerror=next;document.body.appendChild(s);
 })();
}
function bank(){return BANK[st.g]||[]}
function gcfg(){return GR[st.g]}

/* ================= TRẠNG THÁI ================= */
var st={g:+load('dtk_grade',0)||0,mode:'solo',game:'mil',sel:[],av:AV[0],scope:'0',rlv:'all',rn:15,rvp:-1};
var S=null,tm=null;
function K(k){return 'kh'+st.g+'_'+k}
function roster(){return load(K('roster'),[])}
function setRoster(r){save(K('roster'),r)}

/* ================= CẤP ĐỘ & HUY HIỆU ================= */
function lvOf(xp){var i=0;while(i+1<LEVELS.length&&xp>=LEVELS[i+1][0])i++;return i}
function profs(){return load(K('prof'),{})}
function profOf(n){var p=profs()[n];return p||{xp:0,n:0,rv:0,b:{}}}
function lvChip(n){var p=profOf(n),i=lvOf(p.xp);return '<span class="lvl" title="'+LEVELS[i][1]+'">'+LEVELS[i][2]+' '+(i+1)+'</span>'}
/* r: {xp, streak, badges:[id...], review:true} → trả về {xp, up, nb:[huy hiệu mới]} */
function award(name,r){
 var all=profs(),p=all[name]||{xp:0,n:0,rv:0,b:{}},lv0=lvOf(p.xp),nb=[];
 p.xp+=Math.max(0,Math.round(r.xp||0));p.n++;if(r.review)p.rv=(p.rv||0)+1;
 var ids=['first'].concat(r.badges||[]);
 if(r.streak>=5)ids.push('streak5');if(r.streak>=10)ids.push('streak10');
 if(p.rv>=5)ids.push('review');if(p.xp>=1000)ids.push('xp1000');if(p.xp>=5000)ids.push('xp5000');
 ids.forEach(function(id){if(!p.b[id]){p.b[id]=Date.now();nb.push(id)}});
 all[name]=p;save(K('prof'),all);
 return {xp:Math.round(r.xp||0),up:lvOf(p.xp)>lv0?lvOf(p.xp):0,nb:nb,p:p};
}
function bdg(id){for(var i=0;i<BADGES.length;i++)if(BADGES[i][0]==id)return BADGES[i];return['?','🏅',id,'']}
function rewardHTML(name,e,res){
 var h='<div class="rw"><b>'+e+' '+esc(name)+'</b><span class="xp">+'+res.xp+' XP</span>';
 if(res.up)h+='<span class="up">⬆ Lên cấp '+(res.up+1)+': '+LEVELS[res.up][2]+' '+LEVELS[res.up][1]+'</span>';
 res.nb.forEach(function(id){var b=bdg(id);h+='<span class="nb">'+b[1]+' '+b[2]+'</span>'});
 return h+'</div>';
}
function celebrate(res){var n=0;res.forEach(function(r){n+=r.nb.length+(r.up?1:0)});if(n)setTimeout(function(){snd('badge')},700)}

/* ================= HEADER & ĐIỀU HƯỚNG ================= */
function header(){
 var c=$('#gchip');if(!c)return;
 if(st.g){c.hidden=false;c.className='gchip g'+st.g;c.innerHTML='Lớp '+st.g+' <span aria-hidden="true">⇄</span>';c.setAttribute('aria-label','Đang chọn lớp '+st.g+'. Bấm để đổi lớp')}else c.hidden=true;
}
function stopAll(){clearInterval(tm);tm=null;if(window.DTKSACK)DTKSACK.stop();document.body.classList.remove('sk-on');var o=$('.ovl');if(o)o.remove()}

/* ================= MÀN CHỌN LỚP ================= */
function gradeScreen(){
 stopAll();setScreen('grade');header();
 var card=function(g){var c=GR[g],n=BANK[g]&&!LOADING[g]?BANK[g].length:0;
  return '<button class="door g'+g+(st.g==g?' on':'')+'" data-act="pickg" data-v="'+g+'"><span class="num">'+g+'</span><span class="dl"><b>Lớp '+g+'</b><small>'+c.tag+'</small><em>'+(c.soon&&!n?'🛠 Đang soạn câu hỏi':n?n+' câu hỏi · '+c.bai.length+' bài':c.bai.length+' bài')+'</em></span></button>'};
 app.innerHTML='<section class="hero center"><div class="eyebrow">Gameshow ôn tập Khoa học tự nhiên</div><h1 class="title">ĐẤU TRƯỜNG<span>KHTN</span></h1><p>Bám sát sách <b>Kết nối tri thức</b>. Chọn lớp của bạn để bước lên sân khấu!</p></section><div class="doors">'+[6,7,8,9].map(card).join('')+'</div>';
 [6,7,8,9].forEach(function(g){if(!BANK[g]&&!LOADING[g])loadGrade(g,function(){if(document.body.getAttribute('data-scr')=='grade')gradeScreen()})});
}
function openGrade(g){
 g=+g;var c=GR[g];if(!c)return;
 var go=function(){
  if(c.soon&&!(BANK[g]||[]).length){alert('Câu hỏi lớp '+g+' đang được soạn, thầy cô sẽ cập nhật sớm. Bạn hãy chọn lớp khác nhé!');return gradeScreen()}
  st.g=g;save('dtk_grade',g);st.sel=[];st.scope='0';st.rvp=-1;home();
 };
 loadGrade(g,go);
}

/* ================= TRANG CHỦ LỚP ================= */
function home(){
 stopAll();setScreen('home');header();
 var r=roster(),c=gcfg();
 app.innerHTML='<section class="hero"><div class="eyebrow g'+st.g+'">Lớp '+st.g+' · '+bank().length+' câu hỏi · '+c.bai.length+' bài</div><h1 class="title">ĐẤU TRƯỜNG<span>KHTN '+st.g+'</span></h1><p>Trả lời câu hỏi như trên sân khấu truyền hình: chơi đơn, đối kháng, tiếp sức hoặc chia hai đội cả lớp.</p></section>'
 +'<section class="panel"><h2>🎤 Ghi danh thí sinh</h2>'
 +'<div class="row"><input id="nm" maxlength="16" placeholder="Tên của bạn" aria-label="Tên của bạn" autocomplete="off"><button class="btn" data-act="reg">Ghi danh</button></div>'
 +'<div class="avs" role="group" aria-label="Chọn biểu tượng">'+AV.map(function(e){return '<button class="av'+(e==st.av?' on':'')+'" data-act="av" data-v="'+e+'" aria-label="Chọn '+e+'">'+e+'</button>'}).join('')+'</div>'
 +'<div class="chips">'+(r.map(function(p,i){return '<span class="chip">'+p.e+' '+esc(p.n)+' '+lvChip(p.n)+'<button class="x" data-act="del" data-v="'+i+'" aria-label="Xoá '+esc(p.n)+'">×</button></span>'}).join('')||'<em class="muted">Chưa có ai ghi danh. Trò Nhảy bao bố và Ôn tập không cần ghi danh.</em>')+'</div></section>'
 +'<div class="cta"><button class="btn big" data-act="menu">Vào sân khấu ▶</button></div>'
 +'<div class="tiles">'
 +'<button class="tile" data-act="review"><span>📚</span><b>Ôn tập & luyện tập</b><small>Theo bài, theo chương, có câu nâng cao và lời giải thích.</small></button>'
 +'<button class="tile" data-act="prof"><span>🏅</span><b>Cấp độ & huy hiệu</b><small>Tích điểm kinh nghiệm, lên cấp, sưu tầm huy hiệu.</small></button>'
 +'<button class="tile" data-act="lb"><span>🏆</span><b>Bảng vàng</b><small>Điểm cao nhất trên máy này.</small></button>'
 +'</div>';
}
/* ================= PHẠM VI CÂU HỎI ================= */
function scopeInfo(){
 var s=String(st.scope),c=gcfg();
 if(s.charAt(0)=='c'){var r=c.ch[+s.slice(1)];if(r)return{name:r[0],f:function(q){return q.b>=r[1]&&q.b<=r[2]}}}
 else if(+s&&c.bai[+s-1]){var b=+s;return{name:'Bài '+b+'. '+c.bai[b-1],f:function(q){return q.b==b}}}
 return null;
}
function scopeName(){var s=scopeInfo();return s?s.name:'Tất cả các bài'}
function gamePool(){var s=scopeInfo();return s?bank().filter(s.f):bank().filter(function(q){return q.l<4})}
function scopeSelect(){
 var cnt={},B=bank(),c=gcfg();B.forEach(function(q){cnt[q.b]=(cnt[q.b]||0)+1});
 var h='<select id="scope" aria-label="Phạm vi câu hỏi"><option value="0">🌐 Tất cả các bài ('+B.length+' câu)</option>';
 c.ch.forEach(function(r,i){var n=0;for(var b=r[1];b<=r[2];b++)n+=cnt[b]||0;h+='<optgroup label="'+esc(r[0])+'"><option value="c'+i+'"'+(st.scope=='c'+i?' selected':'')+'>📘 Cả chương: '+esc(r[0].replace(/^Chương [IVXL]+\. /,''))+' ('+n+' câu)</option>';
  for(b=r[1];b<=r[2];b++){var k=cnt[b]||0;h+='<option value="'+b+'"'+(String(st.scope)==String(b)?' selected':'')+(k?'':' disabled')+'>Bài '+b+'. '+esc(c.bai[b-1])+' ('+(k?k+' câu':'đang soạn')+')</option>'}
  h+='</optgroup>'});
 return h+'</select>';
}
/* ================= SẢNH CHỌN TRÒ CHƠI ================= */
function menu(){
 stopAll();setScreen('menu');header();
 var g=GAMES[st.game],r=roster();
 if(g.solo)st.mode='solo';
 var k=MODES[st.mode].k;
 st.sel=st.sel.filter(function(i){return i<r.length}).slice(0,k);
 if(!st.sel.length&&r.length&&k==1)st.sel=[0];
 var need=g.team?0:k,ok=g.team||st.sel.length==k;
 app.innerHTML='<div class="bar-top"><button class="btn ghost sm" data-act="home">◀ Thí sinh</button><h2>Sảnh chờ</h2></div>'
 +'<section class="panel"><h3>① Phạm vi câu hỏi</h3>'+scopeSelect()+'<p class="muted small">Chọn một bài hoặc một chương: mỗi câu 30 giây, có cả câu nâng cao.</p></section>'
 +'<section class="panel"><h3>② Trò chơi</h3><div class="games">'+Object.keys(GAMES).map(function(id){var x=GAMES[id];return '<button class="game'+(id==st.game?' on':'')+'" data-act="game" data-v="'+id+'"><span class="gi">'+x.ico+'</span><b>'+x.name+'</b><small>'+x.d+'</small></button>'}).join('')+'</div></section>'
 +(g.team?'':'<section class="panel"><h3>③ Chế độ</h3><div class="modes">'+Object.keys(MODES).map(function(id){var m=MODES[id],dis=g.solo&&id!='solo';return '<button class="mode'+(id==st.mode?' on':'')+'" data-act="mode" data-v="'+id+'"'+(dis?' disabled':'')+'><b>'+m.ico+' '+m.name+'</b><small>'+m.d+'</small></button>'}).join('')+'</div>'
 +'<h3>④ Chọn '+need+' thí sinh</h3><div class="chips">'+r.map(function(p,i){var n=st.sel.indexOf(i);return '<button class="chip pick'+(n>=0?' on':'')+'" data-act="pick" data-v="'+i+'">'+(n>=0&&k>1?'<i class="ord">'+(n+1)+'</i>':'')+p.e+' '+esc(p.n)+'</button>'}).join('')+'</div>'
 +(r.length<need?'<p class="warn">Chế độ này cần '+need+' thí sinh. Hãy ghi danh thêm '+(need-r.length)+' bạn.</p><button class="btn ghost sm" data-act="home">Ghi danh thêm</button>':'')+'</section>')
 +'<div class="cta sticky"><button class="btn big" data-act="start"'+(ok?'':' disabled')+'>'+g.ico+' Bắt đầu '+g.name+'</button></div>';
}

/* ================= CHƠI: TRÌNH BÀY CÂU HỎI ================= */
var NOSHUF=/(các|những) (đáp án|ý|phương án) trên|cả [A-D] (và|,)|^[A-D] ?(và|,) ?[A-D]\b|^(A|B|C|D)\.?$/i;
function prep(q){
 var x={};for(var k in q)x[k]=q[k];
 if(q.t=='mc'&&!q.o.some(function(o){return NOSHUF.test(o)})){var p=shuf([0,1,2,3]);x.o=p.map(function(i){return q.o[i]});x.a=p.indexOf(q.a)}
 return x;
}
function pickQs(pool,n){return shuf(pool).slice(0,n).sort(function(a,b){return a.l-b.l}).map(prep)}
var RC=2*Math.PI*20;
function ring(){return '<div class="ring" aria-hidden="true"><svg viewBox="0 0 44 44"><circle cx="22" cy="22" r="20" class="rt"/><circle cx="22" cy="22" r="20" class="rv" id="rv" stroke-dasharray="'+RC.toFixed(2)+'" stroke-dashoffset="0"/></svg><b id="rs"></b></div>'}
function setRing(left,total){
 var v=$('#rv'),s=$('#rs');if(!v)return;
 v.setAttribute('stroke-dashoffset',(RC*(1-left/total)).toFixed(2));
 s.textContent=Math.ceil(left);
 var w=v.parentNode.parentNode;w.classList.toggle('hot',left<=5);
}
function optsHTML(q,act){
 if(q.t=='mc')return q.o.map(function(o,i){return '<button class="opt" data-act="'+act+'" data-v="'+i+'"><b>'+'ABCD'[i]+'</b><span>'+esc(o)+'</span></button>'}).join('');
 if(q.t=='tf')return '<button class="opt tf t" data-act="'+act+'" data-v="1"><b>Đ</b><span>Đúng</span></button><button class="opt tf f" data-act="'+act+'" data-v="0"><b>S</b><span>Sai</span></button>';
 return '<div class="numin"><input id="num" inputmode="decimal" autocomplete="off" placeholder="Nhập một con số" aria-label="Đáp án"><button class="btn" data-act="'+act+'" data-v="num">Chốt</button></div>';
}
function judge(q,v){
 if(v===null)return false;
 if(q.t=='mc')return +v==q.a;
 if(q.t=='tf')return (+v==1)==q.a;
 var x=numVal(v);return isFinite(x)&&Math.abs(x-q.a)<1e-6*Math.max(1,Math.abs(q.a));
}
function markOpts(q,v,sel){
 $$(sel||'.opt').forEach(function(b){
  var i=+b.getAttribute('data-v'),right=q.t=='mc'?i==q.a:(i==1)==q.a;
  if(right)b.classList.add('ok');else if(v!==null&&String(b.getAttribute('data-v'))==String(v))b.classList.add('bad');else b.classList.add('dim');
  b.disabled=true;
 });
 var n=$('#num');if(n){n.disabled=true;n.classList.add(judge(q,v)?'ok':'bad')}
}
/* Điện thoại nằm ngang: nếu nội dung dài làm tràn màn hình thì thu nhỏ chữ từng bậc */
function fitPlay(){
 var b=document.body;b.classList.remove('tight','tighter');
 if(!(window.matchMedia&&matchMedia('(max-height:540px) and (orientation:landscape)').matches))return;
 var over=function(){return document.documentElement.scrollHeight>window.innerHeight+1};
 if(over()){b.classList.add('tight');if(over())b.classList.add('tighter')}
}
window.addEventListener('resize',function(){if(document.body.classList.contains('playing'))fitPlay()});
function qClass(q){var L=q.q.length+(q.o?q.o.join('').length/2:0);return L>190?' xl':L>120?' lg':''}

/* ================= TRÒ CHƠI KIỂU TRUYỀN HÌNH (mil, flash, num) ================= */
function start(){
 var g=GAMES[st.game];
 if(g.team)return window.DTKSACK?DTKSACK.start():null;
 if(st.game=='squid')return sqStart();
 var r=roster(),si=scopeInfo(),P=gamePool(),pick=g.pick,n=g.n,time=g.time;
 var typed=P.filter(function(q){return pick.indexOf(q.t)>=0});
 if(si){if(typed.length<5){pick=['mc','tf','num'];typed=P}n=Math.min(10,typed.length);time=30}
 else if(typed.length<n)n=typed.length;
 if(!n)return alert('Phạm vi này chưa có câu hỏi phù hợp. Hãy chọn phạm vi khác.');
 var qs=pickQs(typed,n),used={};qs.forEach(function(q){used[q.q]=1});
 S={id:st.game,g:{ico:g.ico,name:g.name,time:time},qs:qs,spare:shuf(typed.filter(function(q){return !used[q.q]})),i:0,
  P:st.sel.map(function(i){return r[i]}),sc:st.sel.map(function(){return 0}),ok:st.sel.map(function(){return 0}),stk:st.sel.map(function(){return 0}),best:st.sel.map(function(){return 0}),
  xp:st.sel.map(function(){return 0}),st:0,fifty:true,swap:true,lock:false,mode:st.mode};
 ask();
}
function who(){return S.rv?0:S.mode=='vs'?S.i%2:S.mode=='relay'?S.i%3:0}
function ask(){
 var q=S.qs[S.i],g=S.g,w=who(),p=S.P[w],team=S.mode=='relay',mil=S.id=='mil'&&!S.rv;
 setScreen('play');S.lock=false;S.t0=Date.now();
 var score=S.rv?'<span class="sc">✔ '+S.sc[0]+'</span>':team?'<span class="sc">Đội '+S.sc.reduce(function(a,b){return a+b},0)+'</span>':S.P.map(function(x,i){return '<span class="sc'+(i==w&&S.P.length>1?' cur':'')+'">'+x.e+' '+S.sc[i]+'</span>'}).join('');
 var ladder=mil?'<ol class="ladder" aria-label="Thang tiền thưởng">'+S.qs.map(function(x,i){return '<li class="'+(i==S.i?'cur':i<S.i?'done':'')+(i==4||i==9?' safe':'')+'"><span>'+(i+1)+'</span>'+LADDER[i].toLocaleString('vi-VN')+'</li>'}).join('')+'</ol>':'';
 app.innerHTML='<div class="hud"><button class="btn ghost sm" data-act="quit" aria-label="Thoát ván chơi">✕</button><span class="gname">'+g.ico+' '+g.name+'</span><span class="qn">Câu '+(S.i+1)+'/'+S.qs.length+'</span>'+(S.rv?'':'<span class="turn">'+p.e+' '+esc(p.n)+(team?' cầm gậy':'')+'</span>')+'<span class="scores">'+score+'</span></div>'
 +'<div class="arena'+(mil?' has-ladder':'')+'">'+ladder
 +'<div class="qcard'+qClass(q)+'"><div class="qmeta"><span class="pill">'+esc(q.c)+'</span>'+stars(q.l)+(q.b?'<span class="muted">Bài '+q.b+'</span>':'')+(mil?'<span class="prize">💰 '+LADDER[S.i].toLocaleString('vi-VN')+'</span>':'')+'</div>'+(S.rv?'':ring())+'<p class="qtext">'+esc(q.q)+'</p></div>'
 +'<div class="answers'+(q.t=='tf'?' two':'')+'">'+optsHTML(q,'ans')+'</div>'
 +'<div class="tools">'+(mil&&S.fifty&&q.t=='mc'?'<button class="btn ghost sm" data-act="fifty">✂ 50:50</button>':'')+(mil&&S.swap&&S.spare.length?'<button class="btn ghost sm" data-act="swap">🔄 Đổi câu hỏi</button>':'')+'</div>'
 +'<div id="fb" class="fb" role="status" aria-live="polite"></div></div>';
 var inp=$('#num');if(inp&&!('ontouchstart' in window))inp.focus();
 fitPlay();clearInterval(tm);if(!S.rv){setRing(g.time,g.time);tm=setInterval(tick,100)}
}
function tick(){
 if(!S||S.lock){clearInterval(tm);return}
 var left=Math.max(0,S.g.time-(Date.now()-S.t0)/1000);
 setRing(left,S.g.time);
 if(left>0&&left<=5)snd('beat',left);
 if(left<=0)answer(null);
}
function fifty(){var q=S.qs[S.i];S.fifty=false;shuf([0,1,2,3].filter(function(i){return i!=q.a})).slice(0,2).forEach(function(i){var o=$('.opt[data-v="'+i+'"]');if(o){o.classList.add('gone');o.disabled=true}});var b=$('[data-act="fifty"]');if(b)b.remove()}
function swapQ(){if(!S.spare.length)return;var q=S.qs[S.i],c=null;for(var i=0;i<S.spare.length;i++)if(S.spare[i].t==q.t){c=S.spare.splice(i,1)[0];break}if(!c)c=S.spare.shift();S.qs[S.i]=prep(c);S.swap=false;ask()}
function answer(v){
 if(!S||S.lock)return;S.lock=true;clearInterval(tm);
 var q=S.qs[S.i],left=Math.max(0,S.g.time-(Date.now()-S.t0)/1000),w=who(),ok=judge(q,v),pts=0;
 if(ok){
  pts=S.id=='mil'?LADDER[S.i]:S.id=='flash'?100+Math.round(left/S.g.time*100):100*Math.min(q.l,3)+Math.round(left/S.g.time*50);
  S.st++;if(S.mode=='relay')pts+=Math.min(S.st-1,5)*20;
  S.sc[w]+=S.rv?1:pts;S.ok[w]++;S.stk[w]++;if(S.stk[w]>S.best[w])S.best[w]=S.stk[w];
  S.xp[w]+=S.rv?5+q.l:10+2*q.l+Math.min(S.stk[w],5)*2;
  snd('ok');
 }else{S.st=0;S.stk[w]=0;if(S.rv)S.wrong.push(S.qs[S.i]);snd('bad')}
 markOpts(q,v);
 var t=$('.tools');if(t)t.innerHTML='';
 var fb=$('#fb');fb.className='fb '+(ok?'good':'bad');
 fb.innerHTML=ok?'✅ Chính xác!'+(S.rv?'':' <b>+'+pts+'</b>')+(q.e&&S.rv?'<small>'+esc(q.e)+'</small>':'')
  :(v===null?'⏰ Hết giờ! ':'❌ Chưa đúng. ')+'Đáp án: <b>'+esc(ansText(q))+'</b>'+(q.e?'<small>'+esc(q.e)+'</small>':'');
 if(!ok)document.querySelector('.qcard').classList.add('shake');
 fitPlay();
 if(S.rv){fb.insertAdjacentHTML('beforeend','<button class="btn" data-act="next">'+(S.i+1<S.qs.length?'Câu tiếp ▶':'Xem kết quả')+'</button>');var nb=$('[data-act="next"]');if(nb)nb.focus();return}
 var d=ok?1500:(q.e?3200:2300),me=S;
 setTimeout(function(){
  if(S!==me)return;
  if(!ok&&S.id=='mil'&&S.mode=='solo')return end();
  next();
 },d);
}
function next(){if(!S)return;S.i++;S.i<S.qs.length?ask():end()}
function confetti(n){var h='';for(var i=0;i<(n||28);i++)h+='<span class="cf" style="left:'+Math.floor(Math.random()*98)+'%;animation-duration:'+(3+Math.random()*3).toFixed(1)+'s;animation-delay:'+(Math.random()*2).toFixed(1)+'s">'+['🎉','🎊','⭐','✨','🏅'][i%5]+'</span>';return '<div class="cfx" aria-hidden="true">'+h+'</div>'}
function end(){
 clearInterval(tm);if(S.rv)return rend();
 setScreen('result');
 var id=S.id,mode=S.mode,sum=S.sc.reduce(function(a,b){return a+b},0),n=S.qs.length;
 var tot=S.sc.map(function(s,i){return{p:S.P[i],s:s,i:i}}).sort(function(a,b){return b.s-a.s});
 var entries=mode=='relay'?[{n:'Đội '+S.P.map(function(p){return p.n}).join(', '),e:'🏃',g:id,s:sum}]:tot.map(function(x){return{n:x.p.n,e:x.p.e,g:id,s:x.s}});
 var lb=load(K('lb'),[]).concat(entries);lb.sort(function(a,b){return b.s-a.s});save(K('lb'),lb.slice(0,60));
 var res=S.P.map(function(p,i){
  var b=[],ok=S.ok[i];
  if(id=='mil'&&mode=='solo'&&ok==n&&n>=5)b.push('mil');
  if(id=='flash'&&mode=='solo'&&ok>=8)b.push('flash');
  if(id=='num'&&mode=='solo'&&ok==n&&n>=5)b.push('num');
  return {p:p,r:award(p.n,{xp:S.xp[i],streak:S.best[i],badges:b})};
 });
 var won=mode=='solo'?S.ok[0]>=Math.ceil(n*0.7):true;
 var tie=mode=='vs'&&tot[0].s==tot[1].s;
 var title=mode=='relay'?'Cả đội về đích với '+sum+' điểm!':mode=='vs'?(tie?'Hai bạn hoà nhau!':esc(tot[0].p.n)+' chiến thắng!'):id=='mil'?(S.ok[0]==n?'Triệu phú tri thức!':'Bạn dừng ở câu '+(S.i+1)):'Bạn đạt '+sum+' điểm!';
 app.innerHTML=(won?confetti():'')+'<section class="hero center result"><div class="trophy">'+(tie?'🤝':id=='mil'&&won&&mode=='solo'?'💰':won?'🏆':'🎯')+'</div><h1 class="title sm">'+title+'</h1><p>'+S.g.ico+' '+S.g.name+' · '+esc(scopeName())+'</p></section>'
 +'<div class="board">'+tot.map(function(x,k){return '<div class="'+(k==0&&tot.length>1&&x.s>tot[1].s?'first':'')+'"><span>'+x.p.e+' '+esc(x.p.n)+' <small>đúng '+S.ok[x.i]+'/'+(mode=='solo'?(id=='mil'?S.i+1:n):Math.floor((n-x.i+S.P.length-1)/S.P.length))+'</small></span><b>'+x.s.toLocaleString('vi-VN')+'</b></div>'}).join('')+'</div>'
 +'<div class="rewards">'+res.map(function(x){return rewardHTML(x.p.n,x.p.e,x.r)}).join('')+'</div>'
 +'<div class="cta"><button class="btn big" data-act="start">↻ Chơi lại</button><button class="btn ghost" data-act="menu">Đổi trò chơi</button></div><div id="lbx"></div>';
 if(won)snd('win');celebrate(res.map(function(x){return x.r}));
 showLB(id,$('#lbx'));
 S={id:null};
}
function quit(){if(confirm('Thoát ván chơi này?')){var rv=S&&S.rv;stopAll();clearInterval(qt);S=null;Q=null;rv?review():menu()}}

/* ================= ÔN TẬP & LUYỆN TẬP ================= */
function rvPool(){var s=scopeInfo(),P=s?bank().filter(s.f):bank();return P.filter(function(q){return st.rlv=='all'||(st.rlv=='basic'?q.l<3:q.l>=3)})}
function review(){
 stopAll();setScreen('review');header();
 var r=roster(),n=rvPool().length;
 app.innerHTML='<div class="bar-top"><button class="btn ghost sm" data-act="home">◀ Quay lại</button><h2>📚 Ôn tập & luyện tập</h2></div>'
 +'<section class="panel"><p class="muted">Không tính giờ. Mỗi câu hiện đáp án và lời giải thích; cuối lượt được ôn lại những câu làm sai.</p>'
 +'<h3>Phạm vi</h3>'+scopeSelect()
 +'<h3>Mức độ</h3><div class="chips">'+[['all','Tất cả'],['basic','Cơ bản'],['adv','Khó & nâng cao']].map(function(x){return '<button class="chip'+(st.rlv==x[0]?' on':'')+'" data-act="rlv" data-v="'+x[0]+'">'+x[1]+'</button>'}).join('')+'</div>'
 +'<h3>Số câu mỗi lượt</h3><div class="chips">'+[10,15,20,0].map(function(x){return '<button class="chip'+(st.rn==x?' on':'')+'" data-act="rn" data-v="'+x+'">'+(x||'Tất cả')+'</button>'}).join('')+'</div>'
 +(r.length?'<h3>Ai ôn tập? <small class="muted">(để nhận điểm kinh nghiệm)</small></h3><div class="chips"><button class="chip'+(st.rvp<0?' on':'')+'" data-act="rvp" data-v="-1">👤 Khách</button>'+r.map(function(p,i){return '<button class="chip'+(st.rvp==i?' on':'')+'" data-act="rvp" data-v="'+i+'">'+p.e+' '+esc(p.n)+'</button>'}).join('')+'</div>':'')
 +'</section><div class="cta"><button class="btn big" data-act="rstart"'+(n?'':' disabled')+'>Bắt đầu ôn ('+(st.rn&&st.rn<n?st.rn:n)+' câu)</button></div>';
}
function rrun(qs){
 var r=roster(),p=st.rvp>=0&&r[st.rvp]?r[st.rvp]:{n:'Khách',e:'👤',guest:1};
 S={id:'rv',rv:true,g:{ico:'📚',name:'Ôn tập',time:0},qs:qs,i:0,P:[p],sc:[0],ok:[0],stk:[0],best:[0],xp:[0],st:0,mode:'solo',wrong:[],lock:false};
 ask();
}
function rend(){
 setScreen('result');
 var w=S.wrong,n=S.qs.length,ok=S.sc[0],p=S.P[0],res=null;
 if(!p.guest)res=award(p.n,{xp:S.xp[0],streak:S.best[0],review:true,badges:ok==n&&n>=10?['perfect']:[]});
 var pc=Math.round(ok*100/n);
 app.innerHTML=(pc>=80?confetti(20):'')+'<section class="hero center result"><div class="trophy">'+(pc==100?'💯':pc>=80?'🌟':pc>=50?'👍':'💪')+'</div><h1 class="title sm">Đúng '+ok+'/'+n+' câu ('+pc+'%)</h1><p>'+esc(scopeName())+'</p></section>'
 +(res?'<div class="rewards">'+rewardHTML(p.n,p.e,res)+'</div>':'<p class="muted center">Ghi danh và chọn tên trước khi ôn để được cộng điểm kinh nghiệm.</p>')
 +(w.length?'<h2>Các câu cần ôn lại</h2><div class="wrongs">'+w.map(function(q){return '<div><p>'+esc(q.q)+'</p><b>✔ '+esc(q.t=='mc'?q.o[q.a]:ansText(q))+'</b>'+(q.e?'<small>'+esc(q.e)+'</small>':'')+'</div>'}).join('')+'</div>':'<p class="center">Tuyệt vời, bạn không sai câu nào!</p>')
 +'<div class="cta">'+(w.length?'<button class="btn big" data-act="rwrong">Ôn lại '+w.length+' câu sai</button>':'')+'<button class="btn ghost" data-act="review">Chọn phạm vi khác</button></div>';
 if(res)celebrate([res]);if(pc>=80)snd('win');
}

/* ================= HỒ SƠ & BẢNG VÀNG ================= */
function profile(){
 stopAll();setScreen('prof');header();
 var r=roster(),all=profs();
 app.innerHTML='<div class="bar-top"><button class="btn ghost sm" data-act="home">◀ Quay lại</button><h2>🏅 Cấp độ & huy hiệu</h2></div>'
 +(r.length?r.map(function(x){var p=all[x.n]||{xp:0,n:0,b:{}},i=lvOf(p.xp),nx=LEVELS[i+1],pc=nx?Math.round((p.xp-LEVELS[i][0])*100/(nx[0]-LEVELS[i][0])):100;
  return '<section class="panel prof"><div class="ph"><span class="big-av">'+x.e+'</span><div><b>'+esc(x.n)+'</b><small>'+LEVELS[i][2]+' Cấp '+(i+1)+' – '+LEVELS[i][1]+' · '+p.xp+' XP · '+p.n+' lượt chơi</small></div></div>'
  +'<div class="xpbar"><i style="width:'+pc+'%"></i></div><small class="muted">'+(nx?'Còn '+(nx[0]-p.xp)+' XP để lên '+nx[2]+' '+nx[1]:'Đã đạt cấp cao nhất!')+'</small>'
  +'<div class="bgs">'+BADGES.map(function(b){var has=p.b&&p.b[b[0]];return '<span class="bg'+(has?' has':'')+'" title="'+b[3]+'"><i>'+b[1]+'</i><b>'+b[2]+'</b><small>'+b[3]+'</small></span>'}).join('')+'</div></section>'}).join('')
 :'<section class="panel"><p>Chưa có thí sinh nào. Hãy ghi danh ở trang chủ để bắt đầu tích điểm kinh nghiệm.</p></section>')
 +'<section class="panel"><h3>Các cấp độ</h3><div class="lvls">'+LEVELS.map(function(l,i){return '<span>'+l[2]+' <b>'+(i+1)+'. '+l[1]+'</b> <small>'+l[0]+' XP</small></span>'}).join('')+'</div></section>';
}
function showLB(game,el){
 if(!el||!GAMES[game])return;var rows=load(K('lb'),[]).filter(function(x){return x.g==game}).slice(0,10);
 if(!rows.length){el.innerHTML='<p class="muted center">Chưa có điểm nào cho trò này.</p>';return}
 el.innerHTML='<h2>🏆 Bảng vàng – '+GAMES[game].name+'</h2><div class="board lb">'+rows.map(function(x,i){return '<div><span><i class="rk">'+(i<3?['🥇','🥈','🥉'][i]:i+1)+'</i> '+(x.e||'')+' '+esc(x.n)+'</span><b>'+(+x.s).toLocaleString('vi-VN')+'</b></div>'}).join('')+'</div>';
}
var lbGame='mil';
function lbScreen(){
 stopAll();setScreen('lb');header();
 app.innerHTML='<div class="bar-top"><button class="btn ghost sm" data-act="home">◀ Quay lại</button><h2>🏆 Bảng vàng lớp '+st.g+'</h2></div><div class="chips">'+['mil','flash','num'].map(function(id){return '<button class="chip'+(lbGame==id?' on':'')+'" data-act="lbg" data-v="'+id+'">'+GAMES[id].ico+' '+GAMES[id].name+'</button>'}).join('')+'</div><div id="lbx"></div><p class="muted small">Điểm chỉ lưu trên máy này.</p>';
 showLB(lbGame,$('#lbx'));
}

/* ================= VƯỢT CẦU SINH TỒN ================= */
var Q=null,qt=null;
function sqStart(){
 var r=roster();if(st.sel.length!=1)return alert('Trò này chơi một người: hãy chọn 1 thí sinh.');
 var P=gamePool().filter(function(q){return q.t=='mc'||q.t=='tf'});
 if(P.length<4)return alert('Phạm vi này chưa đủ câu trắc nghiệm cho trò chơi. Hãy chọn phạm vi rộng hơn.');
 var n=Math.min(P.length,8+Math.floor(Math.random()*3));
 Q={qs:pickQs(P,n),i:0,p:r[st.sel[0]],lock:false,stk:0,best:0,xp:0};
 sqAsk();
}
function sqOpts(q){
 if(q.t=='tf')return[{t:'Đúng',ok:q.a===true},{t:'Sai',ok:q.a===false}];
 var k=2+Math.floor(Math.random()*3),bad=shuf(q.o.filter(function(x,i){return i!=q.a})).slice(0,k-1).map(function(x){return{t:x,ok:false}});
 return shuf([{t:q.o[q.a],ok:true}].concat(bad));
}
function track(pos,fall,hop){
 var n=Q.qs.length,h='<div class="bridge" style="--n:'+(n+1)+'">';
 for(var j=0;j<=n;j++)h+='<div class="pane'+(j<pos?' done':'')+(j==pos?' cur':'')+(fall&&j==pos?' hole':'')+(j==n?' fin':'')+'">'+(j==pos?'<span class="hero-av'+(fall?' fall':'')+(hop?' hop':'')+'">'+Q.p.e+'</span>':(j==n?'🏁':''))+'</div>';
 return h+'</div>';
}
function sqAsk(){
 setScreen('play');
 var q=Q.qs[Q.i];Q.o=sqOpts(q);Q.lock=false;Q.t0=Date.now();
 app.innerHTML='<div class="hud"><button class="btn ghost sm" data-act="quit" aria-label="Thoát">✕</button><span class="gname">🌉 Vượt cầu sinh tồn</span><span class="qn">Bước '+(Q.i+1)+'/'+Q.qs.length+'</span><span class="turn">'+Q.p.e+' '+esc(Q.p.n)+'</span></div>'
 +track(Q.i)+'<div class="arena sq"><div class="qcard'+qClass(q)+'"><div class="qmeta"><span class="pill">'+esc(q.c)+'</span>'+stars(q.l)+'</div>'+ring()+'<p class="qtext">'+esc(q.q)+'</p></div>'
 +'<div class="glasses n'+Q.o.length+'">'+Q.o.map(function(o,i){return '<button class="glass" data-act="sq" data-v="'+i+'">'+esc(o.t)+'</button>'}).join('')+'</div><div id="fb" class="fb" role="status"></div></div>';
 fitPlay();clearInterval(qt);setRing(30,30);qt=setInterval(sqTick,100);
}
function sqTick(){
 if(!Q||Q.lock||!$('.glass')){clearInterval(qt);return}
 var left=Math.max(0,30-(Date.now()-Q.t0)/1000);setRing(left,30);
 if(left>0&&left<=5)snd('beat',left);
 if(left<=0)sqPick(-1);
}
function sqPick(i){
 if(!Q||Q.lock)return;Q.lock=true;clearInterval(qt);
 var o=Q.o[i],btns=$$('.glass');btns.forEach(function(b){b.disabled=true});
 if(o&&o.ok){
  btns[i].classList.add('ok');snd('step');Q.stk++;if(Q.stk>Q.best)Q.best=Q.stk;Q.xp+=10+2*Q.qs[Q.i].l;
  $('.bridge').outerHTML=track(Q.i+1,false,true);
  var me=Q;setTimeout(function(){if(Q!==me)return;Q.i++;if(Q.i>=Q.qs.length)sqWin();else sqAsk()},950);
 }else{
  if(btns[i])btns[i].classList.add('bad');
  var right='';Q.o.forEach(function(x,j){if(x.ok){if(btns[j])btns[j].classList.add('ok');right=x.t}});
  var tr=$('.bridge');if(tr)tr.outerHTML=track(Q.i,true);snd('crash');
  var q=Q.qs[Q.i];$('#fb').className='fb bad';$('#fb').innerHTML=(i<0?'⏰ Hết giờ! ':'')+'💥 Sụp hố! Đáp án đúng: <b>'+esc(right)+'</b>'+(q.e?'<small>'+esc(q.e)+'</small>':'');
  var me2=Q;setTimeout(function(){if(Q===me2)sqLose()},q.e?3400:2400);
 }
}
function sqEnd(win){
 setScreen('result');
 var res=award(Q.p.n,{xp:Q.xp+(win?50:0),streak:Q.best,badges:win?['bridge']:[]});
 app.innerHTML=(win?confetti(30):'')+'<section class="hero center result'+(win?' win':'')+'">'+(win?'<div class="cup">🏆</div><div class="wintxt">WIN</div><p>'+Q.p.e+' '+esc(Q.p.n)+' đã vượt qua '+Q.qs.length+' bước và về đích!</p>':'<div class="trophy">💥</div><h1 class="title sm">Bạn đã rơi xuống hố!</h1><p>Vượt qua '+Q.i+'/'+Q.qs.length+' bước. Thử lại nhé!</p>')+'</section>'
 +'<div class="rewards">'+rewardHTML(Q.p.n,Q.p.e,res)+'</div><div class="cta"><button class="btn big" data-act="start">↻ Chơi lại</button><button class="btn ghost" data-act="menu">Đổi trò chơi</button></div>';
 if(win)snd('win');else snd('sad');celebrate([res]);Q=null;
}
function sqWin(){sqEnd(true)}
function sqLose(){if(Q)sqEnd(false)}

/* ================= SỰ KIỆN ================= */
document.addEventListener('click',function(e){
 var b=e.target.closest?e.target.closest('[data-act]'):null;if(!b||b.disabled)return;
 var a=b.getAttribute('data-act'),v=b.getAttribute('data-v');
 if(a=='snd'){if(window.SND)SND.toggle();return}
 if(window.DTKSACK&&DTKSACK.click(a,v,b))return;
 switch(a){
 case 'grade':if(document.body.classList.contains('playing')&&!confirm('Thoát ván chơi để đổi lớp?'))return;S=null;Q=null;gradeScreen();break;
 case 'pickg':snd('tap');openGrade(v);break;
 case 'av':st.av=v;$$('.av').forEach(function(x){x.classList.toggle('on',x===b)});break;
 case 'reg':var inp=$('#nm'),n=inp.value.trim().replace(/\s+/g,' '),r=roster();if(!n)return inp.focus();
  if(r.some(function(p){return p.n.toLowerCase()==n.toLowerCase()}))return alert('Tên này đã có. Hãy thêm họ hoặc số để phân biệt.');
  if(r.length>=16)return alert('Tối đa 16 thí sinh trên một máy.');r.push({n:n,e:st.av});setRoster(r);snd('tap');home();setTimeout(function(){var x=$('#nm');if(x&&!('ontouchstart' in window))x.focus()},0);break;
 case 'del':var r2=roster(),p=r2[+v];if(p&&confirm('Xoá thí sinh '+p.n+'? Điểm kinh nghiệm của bạn ấy vẫn được giữ.')){r2.splice(+v,1);setRoster(r2);st.sel=[];st.rvp=-1;home()}break;
 case 'home':S=null;home();break;
 case 'menu':S=null;menu();break;
 case 'mode':st.mode=v;st.sel=st.sel.slice(0,MODES[v].k);menu();break;
 case 'game':st.game=v;snd('tap');menu();break;
 case 'pick':var i=+v,k=MODES[st.mode].k;if(st.sel.indexOf(i)>=0)st.sel=st.sel.filter(function(x){return x!=i});else if(k==1)st.sel=[i];else if(st.sel.length<k)st.sel.push(i);menu();break;
 case 'start':start();break;
 case 'quit':quit();break;
 case 'fifty':fifty();break;
 case 'swap':swapQ();break;
 case 'ans':if(v=='num'){var x=$('#num');if(x&&x.value.trim())answer(x.value);else if(x)x.focus()}else answer(v);break;
 case 'next':next();break;
 case 'review':review();break;
 case 'rlv':st.rlv=v;review();break;
 case 'rn':st.rn=+v;review();break;
 case 'rvp':st.rvp=+v;review();break;
 case 'rstart':var P=rvPool();rrun(st.rn?shuf(P).slice(0,st.rn).sort(function(a,b){return a.l-b.l}).map(prep):shuf(P).sort(function(a,b){return a.l-b.l}).map(prep));break;
 case 'rwrong':rrun(shuf(S.wrong));break;
 case 'prof':profile();break;
 case 'lb':lbScreen();break;
 case 'lbg':lbGame=v;lbScreen();break;
 case 'sq':sqPick(+v);break;
 }
});
document.addEventListener('change',function(e){
 if(e.target.id=='scope'){st.scope=e.target.value;var s=document.body.getAttribute('data-scr');if(s=='review')review();else if(s=='menu')menu()}
});
document.addEventListener('keydown',function(e){
 if(e.key!='Enter')return;
 if(e.target.id=='num'&&e.target.value.trim()){e.preventDefault();answer(e.target.value)}
 else if(e.target.id=='nm'){e.preventDefault();var b=$('[data-act="reg"]');if(b)b.click()}
});

/* Giao tiếp với trò Nhảy bao bố (sack.js) */
window.DTKAPI={dbg:function(){return{S:S,Q:Q,BANK:BANK,ask:ask,answer:answer,prep:prep}},pool:gamePool,scopeName:scopeName,esc:esc,shuf:shuf,prep:prep,judge:judge,ansText:ansText,menu:menu,setScreen:setScreen,confetti:confetti,LVN:LVN,stars:stars};

/* ================= KHỞI ĐỘNG ================= */
header();
if(st.g&&GR[st.g]&&!GR[st.g].soon)openGrade(st.g);else gradeScreen();
})();
