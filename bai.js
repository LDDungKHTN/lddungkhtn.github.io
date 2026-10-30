/* Luyện tập theo bài + trò chơi Vượt cầu sinh tồn. File này tự được nạp bởi sound.js. */
(function(){
var BAI=['PP và kĩ năng học KHTN','Nguyên tử','Nguyên tố hoá học','Sơ lược bảng tuần hoàn','Phân tử – Đơn chất – Hợp chất','Giới thiệu liên kết hoá học','Hoá trị và công thức hoá học','Tốc độ chuyển động','Đo tốc độ','Đồ thị quãng đường – thời gian','Tốc độ và an toàn giao thông','Sóng âm','Độ to và độ cao của âm','Phản xạ âm, chống ô nhiễm tiếng ồn','Năng lượng ánh sáng, tia sáng, vùng tối','Sự phản xạ ánh sáng','Ảnh của vật qua gương phẳng','Nam châm','Từ trường','Chế tạo nam châm điện','Khái quát trao đổi chất, chuyển hoá năng lượng','Quang hợp ở thực vật','Yếu tố ảnh hưởng đến quang hợp','Thực hành: quang hợp ở cây xanh','Hô hấp tế bào','Yếu tố ảnh hưởng đến hô hấp tế bào','Thực hành: hô hấp ở thực vật','Trao đổi khí ở sinh vật','Vai trò của nước và chất dinh dưỡng','Trao đổi nước, chất dinh dưỡng ở thực vật','Trao đổi nước, chất dinh dưỡng ở động vật','Thực hành: vận chuyển nước, thoát hơi nước','Cảm ứng và tập tính ở động vật','Vận dụng cảm ứng vào thực tiễn','Thực hành: cảm ứng ở sinh vật','Khái quát sinh trưởng và phát triển','Ứng dụng sinh trưởng, phát triển','Thực hành: quan sát sinh trưởng, phát triển','Sinh sản vô tính','Sinh sản hữu tính','Yếu tố ảnh hưởng, điều hoà sinh sản','Cơ thể là một thể thống nhất'];
/* Gắn bài cho câu hỏi có sẵn: "đoạn chữ trong câu hỏi|số bài" */
var MAP='Trừ hydrogen|2;Hạt nào trong nguyên tử|2;trung hòa về điện|2;đặc khít|2;tập trung chủ yếu ở hạt nhân|2;số electron luôn|2;carbon có 6 proton|2;tổng 18 hạt|2;xếp theo chiều tăng dần|4;cùng một hàng|4;cùng một cột|4;Năm 1869|4;gồm bao nhiêu nguyên tố|4;kim loại tập trung|4;chu kì 3|4;H₂O có tổng cộng|5;glucose C₆H₁₂O₆|5;trong phân tử nước H₂O thuộc|6;Liên kết ion|6;hợp chất ion|6;Hợp chất ion|6;cộng hóa trị, hóa trị|7;Trong chất cộng hóa trị|7;nguyên tử O có hóa trị|7;phân tử CO₂|7;phân tử CaCO₃|7;phân tử KNO₃|7;phân tử methane|7;hóa trị III|7;phần trăm khối lượng|7;KHÔNG phải là đơn vị|8;1 m/s|8;chạy 120 m|8;Đổi 36 km/h|8;Ô tô đi với tốc độ|8;Đổi 15 m/s|8;tốc độ trung bình|8;2 km đầu|8;Hai xe xuất phát|8;Dụng cụ nào dùng trong phòng|9;đồ thị quãng đường|10;Các nguồn âm|12;chân không|12;tần số càng lớn|13;Biên độ dao động|13;dao động 1200|13;cứng, nhẵn|14;ô nhiễm tiếng ồn|14;dạng của năng lượng|15;nguồn sáng hẹp|15;định luật phản xạ|16;pháp tuyến|16;khuếch tán|16;gương phẳng|17;Đặt hai nam châm|18;bào quan nào|22;So với sinh sản vô tính|40;Nam châm hút được|18;Kim nam châm|19;đường sức từ|19;nam châm điện|20;sắt non|20;tổng quát của hô hấp|25;phân gi|21;Phơi khô|26;hiệu suất sinh năng lượng|25;lục lạp|22;Khí carbon dioxide đi từ|22;Sản phẩm của quá trình quang hợp|22;giải phóng khí oxygen|22;nước và carbon dioxide tổng hợp|22;6CO₂|22;khi hít vào|28;dung môi|29;ống tiêu hóa|31;Cảm ứng ở sinh vật là|33;hướng về phía có ánh sáng|33;tập tính di cư|33;Tập tính giúp|33;Sinh trưởng ở sinh vật là|36;Mô phân sinh|36;nhân tố chủ yếu|36;tiêu diệt muỗi|37;Sinh sản ở sinh vật là|39;sinh sản vô tính|39;Sinh sản hữu tính ở động vật|40;Hormone là yếu tố|41';
var pairs=MAP.split(';').map(function(x){return x.split('|')});
function MC(b,l,c,q,ans,w1,w2,w3){var o=shuf([ans,w1,w2,w3]);return{t:'mc',b:b,l:l,c:c,q:q,o:o,a:o.indexOf(ans)}}
function TF(b,l,c,q,a,e){var r={t:'tf',b:b,l:l,c:c,q:q,a:a};if(e)r.e=e;return r}
function NUM(b,l,c,q,a){return{t:'num',b:b,l:l,c:c,q:q,a:a}}
var NEW=[
MC(1,1,'Phương pháp','Bước đầu tiên của phương pháp tìm hiểu tự nhiên là gì?','Quan sát, đề xuất vấn đề cần tìm hiểu','Viết báo cáo kết quả','Thực hiện kế hoạch','Rút ra kết luận'),
MC(1,2,'Phương pháp','Sau khi đưa ra dự đoán, bước tiếp theo là gì?','Lập kế hoạch kiểm tra dự đoán','Viết báo cáo','Đề xuất vấn đề','Kết thúc nghiên cứu'),
TF(1,2,'Phương pháp','Nếu kết quả không phù hợp với dự đoán thì có thể xây dựng lại dự đoán.',true),
NUM(1,2,'Phương pháp','Phương pháp tìm hiểu tự nhiên gồm mấy bước?',5),
TF(1,1,'Phương pháp','Quan sát, đo, dự đoán là các kĩ năng cần có khi học môn Khoa học tự nhiên.',true),
MC(3,1,'Nguyên tử','Nguyên tố hóa học là tập hợp các nguyên tử cùng loại, có cùng số hạt nào trong hạt nhân?','Proton','Neutron','Electron','Cả neutron và electron'),
MC(3,1,'Nguyên tử','Kí hiệu hóa học của nguyên tố carbon là gì?','C','Ca','Cl','Co'),
MC(3,1,'Nguyên tử','Kí hiệu hóa học của nguyên tố sắt là gì?','Fe','S','Si','F'),
TF(3,1,'Nguyên tử','Mỗi nguyên tố hóa học có một kí hiệu hóa học riêng.',true),
NUM(3,2,'Nguyên tử','Nguyên tố oxygen có điện tích hạt nhân là +8. Hạt nhân có bao nhiêu proton?',8),
TF(11,1,'Tốc độ','Tốc độ xe càng lớn thì quãng đường phanh càng dài.',true),
MC(11,2,'Tốc độ','Vì sao cần giữ khoảng cách an toàn với xe phía trước?','Tốc độ càng lớn thì cần quãng đường dừng xe càng dài','Để xe chạy nhanh hơn','Khoảng cách không ảnh hưởng gì','Để xe đỡ tốn xăng'),
MC(11,1,'Tốc độ','Biển báo tốc độ tối đa cho biết điều gì?','Tốc độ lớn nhất xe được phép chạy','Tốc độ nhỏ nhất phải chạy','Chiều dài đoạn đường','Số làn đường'),
TF(11,2,'Tốc độ','Đội mũ bảo hiểm đúng cách giúp giảm nguy cơ chấn thương khi xảy ra tai nạn.',true),
NUM(11,3,'Tốc độ','Xe máy chạy 72 km/h. Tốc độ đó bằng bao nhiêu m/s?',20),
MC(23,1,'Quang hợp','Nguyên liệu của quang hợp lấy từ môi trường là gì?','Nước và carbon dioxide','Glucose và oxygen','Tinh bột và nước','Oxygen và nitrogen'),
MC(23,1,'Quang hợp','Yếu tố nào sau đây ảnh hưởng đến quang hợp?','Ánh sáng','Màu sắc chậu trồng','Tuổi của người trồng','Hình dáng chậu'),
TF(23,2,'Quang hợp','Nhiệt độ quá cao hoặc quá thấp đều làm giảm quang hợp.',true),
TF(23,2,'Quang hợp','Trồng cây quá dày giúp mọi lá nhận nhiều ánh sáng hơn.',false,'Lá che nhau nên nhận ít ánh sáng hơn.'),
MC(23,3,'Quang hợp','Làm thế nào để tăng quang hợp trong nhà kính?','Điều chỉnh hợp lí ánh sáng, nhiệt độ, carbon dioxide và nước','Giảm hết ánh sáng','Ngừng tưới nước','Tăng nhiệt độ thật cao'),
MC(24,1,'Quang hợp','Dung dịch iodine dùng để nhận biết chất nào trong lá cây?','Tinh bột','Glucose','Nước','Oxygen'),
TF(24,1,'Quang hợp','Tinh bột gặp dung dịch iodine chuyển sang màu xanh tím.',true),
MC(24,2,'Quang hợp','Khí sinh ra khi lá quang hợp làm que đóm còn tàn đỏ bùng cháy là khí nào?','Oxygen','Carbon dioxide','Nitrogen','Hơi nước'),
TF(24,2,'Quang hợp','Phần lá bị che tối hoàn toàn vẫn tạo được tinh bột bình thường.',false,'Thiếu ánh sáng thì lá không quang hợp được.'),
MC(24,3,'Quang hợp','Thí nghiệm chứng minh quang hợp cần ánh sáng thường che một phần lá bằng gì?','Giấy đen không cho ánh sáng đi qua','Tấm kính trong suốt','Màng bọc thực phẩm','Một chiếc lá khác'),
MC(27,1,'Hô hấp','Khí nào làm nước vôi trong hóa đục?','Carbon dioxide','Oxygen','Nitrogen','Hydrogen'),
TF(27,1,'Hô hấp','Hạt đang nảy mầm hô hấp mạnh hơn hạt khô.',true),
MC(27,2,'Hô hấp','Hạt nảy mầm trong bình kín, nhiệt độ trong bình thay đổi thế nào?','Tăng lên','Giảm xuống','Không đổi','Luôn bằng 0°C'),
TF(27,2,'Hô hấp','Thực vật chỉ hô hấp vào ban ngày.',false,'Thực vật hô hấp cả ngày lẫn đêm.'),
MC(27,3,'Hô hấp','Thí nghiệm hô hấp ở thực vật thường dùng hạt nảy mầm vì…','Hạt nảy mầm hô hấp mạnh','Hạt không hô hấp','Hạt chỉ quang hợp','Hạt không cần oxygen'),
MC(30,1,'Trao đổi chất','Rễ cây hấp thụ nước chủ yếu qua bộ phận nào?','Lông hút','Chóp rễ','Thân cây','Lá'),
MC(30,1,'Trao đổi chất','Nước và muối khoáng được vận chuyển từ rễ lên lá qua đâu?','Mạch gỗ','Mạch rây','Vỏ thân','Khí khổng'),
TF(30,2,'Trao đổi chất','Thoát hơi nước ở lá chủ yếu diễn ra qua khí khổng.',true),
MC(30,2,'Trao đổi chất','Mạch rây vận chuyển chất nào?','Chất hữu cơ do lá tạo ra','Nước từ rễ lên','Khí oxygen','Chỉ muối khoáng'),
TF(30,3,'Trao đổi chất','Thoát hơi nước giúp hạ nhiệt độ cho lá cây.',true)];
var B0=typeof BANK0!='undefined'?BANK0:BANK;
B0.push.apply(B0,NEW);
B0.forEach(function(q){if(!q.b)for(var i=0;i<pairs.length;i++)if(q.q.indexOf(pairs[i][0])>=0){q.b=+pairs[i][1];break}});
if(typeof rebuild=='function')rebuild();
var scope={b:0,ch:0};
var CHUONG=[['Chương I – Nguyên tử, bảng tuần hoàn',2,4],['Chương II – Phân tử, liên kết hóa học',5,7],['Chương III – Tốc độ',8,11],['Chương IV – Âm thanh',12,14],['Chương V – Ánh sáng',15,17],['Chương VI – Từ',18,20],['Chương VII – Trao đổi chất và chuyển hóa năng lượng ở sinh vật',21,32],['Chương VIII – Cảm ứng ở sinh vật',33,35],['Chương IX – Sinh trưởng và phát triển ở sinh vật',36,38],['Chương X – Sinh sản ở sinh vật',39,42]];
GAMES.squid={ico:'🌉',name:'Vượt cầu sinh tồn',pick:['mc','tf'],n:10,time:30,d:'Chơi đơn. Chọn đúng để bước tiếp, chọn sai là sụp hố! Qua 8–10 bước để về đích nhận cúp.'};
function lp(b){return BANK.filter(function(q){return q.b==b}).map(function(q){return q.l>3?Object.assign({},q,{l:3}):q})}
function scopePool(){
 if(scope.ch){var r=CHUONG[scope.ch-1];return BANK.filter(function(q){return q.b>=r[1]&&q.b<=r[2]}).map(function(q){return q.l>3?Object.assign({},q,{l:3}):q})}
 return scope.b?lp(scope.b):null;
}
function sel2(id,pairs,v){return'<select id="'+id+'" style="max-width:100%">'+pairs.map(function(x){return'<option value="'+x[0]+'"'+(x[0]==v?' selected':'')+'>'+esc(x[1])+'</option>'}).join('')+'</select>'}
function snd(f){if(window.KH7SND&&KH7SND[f])KH7SND[f](arguments[1])}
function bopts(){
 var cnt={};BANK.forEach(function(q){if(q.b)cnt[q.b]=(cnt[q.b]||0)+1});
 var L=[['0','Tất cả câu hỏi (ngẫu nhiên)']];
 CHUONG.forEach(function(r,i){var c=0;for(var b=r[1];b<=r[2];b++)c+=cnt[b]||0;L.push(['c'+(i+1),r[0]+' ('+c+' câu)'])});
 BAI.forEach(function(n,i){var c=cnt[i+1]||0;L.push([String(i+1),'Bài '+(i+1)+' – '+n+' ('+c+' câu'+(c<5?', đang bổ sung':'')+')'])});
 return L;
}
/* --- Menu: thêm lựa chọn phạm vi câu hỏi theo bài --- */
var _menu=menu;
menu=function(){
 _menu();
 var h=[].slice.call(app.querySelectorAll('h2')).filter(function(x){return x.textContent.indexOf('người chơi')>0})[0];
 if(h)h.insertAdjacentHTML('beforebegin','<h2>Luyện tập theo bài hoặc chương</h2><p>Mỗi câu có 30 giây. Chọn một bài hoặc một chương để chỉ luyện câu hỏi trong phạm vi đó.</p>'+sel2('p_b',bopts(),scope.ch?'c'+scope.ch:scope.b));
};
var _oc=app.onchange;
app.onchange=function(e){if(e.target.id=='p_b'){var v=String(e.target.value);if(v.charAt(0)=='c'){scope.ch=+v.slice(1);scope.b=0}else{scope.b=+v;scope.ch=0}return}return _oc&&_oc.call(app,e)};
/* --- Bắt đầu ván: theo bài (30 giây/câu, 5–10 câu) hoặc Vượt cầu --- */
var _start=start;
start=function(){
 if(game=='squid'){if(mode!='solo'||sel.length!=1)return alert('Trò này chơi một người: hãy chọn chế độ Chơi đơn.');return sqStart()}
 if(!scope.b&&!scope.ch)return _start();
 var all=BANK.slice(),pool=scopePool(),g=GAMES[game];
 var typed=pool.filter(function(q){return g.pick.indexOf(q.t)>=0});
 var pick=typed.length>=5?g.pick:['mc','tf','num'];
 var n=Math.min(10,pool.filter(function(q){return pick.indexOf(q.t)>=0}).length);
 if(!n)return alert('Bài này chưa có câu hỏi.');
 GAMES[game]=Object.assign({},g,{pick:pick,n:n,time:30});
 var sp=Array.prototype.splice;sp.apply(BANK,[0,BANK.length].concat(pool));
 try{_start()}finally{GAMES[game]=g;sp.apply(BANK,[0,BANK.length].concat(all))}
};
/* --- Vượt cầu sinh tồn --- */
var Q=null,qt=null;
function sqStart(){
 var pool=(scopePool()||BANK).filter(function(q){return(q.t=='mc'||q.t=='tf')&&q.l<4});
 if(pool.length<2)return alert('Chưa đủ câu trắc nghiệm cho trò chơi này.');
 var n=Math.min(pool.length,8+Math.floor(Math.random()*3));
 Q={qs:shuf(pool).slice(0,n).sort(function(a,b){return a.l-b.l}),i:0,p:roster[sel[0]],lock:false};
 sqAsk();
}
function sqOpts(q){
 if(q.t=='tf')return[{t:'Đúng',ok:q.a===true},{t:'Sai',ok:q.a===false}];
 var k=2+Math.floor(Math.random()*3),bad=shuf(q.o.filter(function(x,i){return i!=q.a})).slice(0,k-1).map(function(x){return{t:x,ok:false}});
 return shuf([{t:q.o[q.a],ok:true}].concat(bad));
}
function track(pos,fall,hop){
 var n=Q.qs.length,h='<div class="track">';
 for(var j=0;j<=n;j++)h+='<div class="tile'+(j<pos?' done':'')+(j==pos?' cur':'')+(fall&&j==pos?' hole':'')+'">'+(j==pos?'<span class="av'+(fall?' fall':'')+(hop?' hop':'')+'">'+Q.p.e+'</span>':(j==n?'🏁':''))+'</div>';
 return h+'</div>';
}
function sqAsk(){
 var q=Q.qs[Q.i];Q.o=sqOpts(q);Q.lock=false;Q.t0=Date.now();
 app.innerHTML='<div class="hud"><span>🌉 Vượt cầu – bước '+(Q.i+1)+'/'+Q.qs.length+'</span><span class="turn">'+Q.p.e+' '+esc(Q.p.n)+'</span></div><div class="bar"><i id="tb"></i></div>'+track(Q.i)+'<div class="q"><small>'+esc(q.c)+'</small><p>'+esc(q.q)+'</p></div><div class="panels">'+Q.o.map(function(o,i){return'<button class="glass" data-act="sq" data-v="'+i+'">'+esc(o.t)+'</button>'}).join('')+'</div><div id="fb" role="status"></div>';
 clearInterval(qt);qt=setInterval(sqTick,100);
}
function sqTick(){
 if(!Q||Q.lock||!document.querySelector('.glass')){clearInterval(qt);return}
 var left=Math.max(0,30-(Date.now()-Q.t0)/1000),b=$('#tb');
 if(b)b.style.width=left/30*100+'%';
 if(left>0&&left<=5)snd('beat',left);
 if(left<=0)sqPick(-1);
}
function sqPick(i){
 if(!Q||Q.lock)return;Q.lock=true;clearInterval(qt);
 var o=Q.o[i],btns=document.querySelectorAll('.glass');
 if(!btns.length){clearInterval(qt);return}
 if(o&&o.ok){
  btns[i].classList.add('ok');snd('step');
  $('.track').outerHTML=track(Q.i+1,false,true);
  setTimeout(function(){Q.i++;if(Q.i>=Q.qs.length)sqWin();else sqAsk()},900);
 }else{
  if(btns[i])btns[i].classList.add('bad');
  var right='';Q.o.forEach(function(x,j){if(x.ok){if(btns[j])btns[j].classList.add('ok');right=x.t}});
  var tr=$('.track');if(tr)tr.outerHTML=track(Q.i+1,true);snd('crash');
  $('#fb').textContent=(i<0?'⏰ Hết giờ! ':'')+'💥 Sụp hố! Đáp án đúng: '+right;
  setTimeout(sqLose,2300);
 }
}
function again(){return '<button class="btn big" data-act="start">Chơi lại</button> <button class="btn ghost" data-act="menu">Đổi trò chơi</button>'}
function sqLose(){app.innerHTML='<section class="hero"><h1>💥 Bạn đã rơi xuống hố!</h1><p>Bạn vượt qua '+Q.i+'/'+Q.qs.length+' bước. Thử lại nhé!</p></section>'+again()}
function sqWin(){snd('win');app.innerHTML='<section class="hero win"><div class="cup">🏆</div><div class="wintxt">WIN</div><div class="spark">✨ 🎉 ✨ 🎊 ✨</div><p>'+Q.p.e+' '+esc(Q.p.n)+' đã vượt qua '+Q.qs.length+' bước và về đích!</p></section>'+again()}
var _oc2=app.onclick;
app.onclick=function(e){var b=e.target.closest&&e.target.closest('button');if(b&&b.dataset.act=='sq'&&!b.disabled){ac2();return sqPick(+b.dataset.v)}return _oc2.call(app,e)};
function ac2(){}
/* --- Quản lý câu hỏi: chọn bài --- */
if(typeof mform=='function'){
 var _mf=mform,_mr=mread,_ma=mAct;
 mform=function(d){_mf(d);var c=document.getElementById('f_c');if(c)c.parentNode.insertAdjacentHTML('beforeend',sel2('f_b',[['0','Không thuộc bài nào']].concat(BAI.map(function(n,i){return[String(i+1),'Bài '+(i+1)+' – '+n]})),M.b0||0))};
 mread=function(){var r=_mr(),e=document.getElementById('f_b');if(e){M.b0=+e.value||0}if(M.b0)r.b=M.b0;return r};
 mAct=function(a,v){if(a=='m_edit'){var q=BANK[+v];M.b0=q&&q.b||0}else if(a=='m_new')M.b0=0;return _ma(a,v)};
}
/* --- Giao diện --- */
var st=document.createElement('style');
st.textContent='.track{display:flex;gap:4px;margin:14px 0}.tile{flex:1;min-width:0;height:46px;border-radius:10px;border:2px solid var(--line);display:grid;place-items:center;background:var(--card);font-size:22px}.tile.done{background:var(--ok);opacity:.55}.tile.cur{border-color:var(--gold)}.tile.hole{background:#000;border-color:var(--bad)}.av{display:inline-block}.panels{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px}.glass{font:inherit;font-weight:700;color:var(--ink);padding:18px 12px;border-radius:14px;border:3px solid var(--cyan);background:linear-gradient(135deg,rgba(120,220,255,.35),rgba(255,255,255,.12));cursor:pointer}.glass.ok{background:var(--ok);border-color:var(--ok);color:#fff}.glass.bad{background:var(--bad);border-color:var(--bad);color:#fff}.win{text-align:center}.cup{font-size:clamp(90px,28vw,150px);line-height:1}.wintxt{font-size:clamp(64px,22vw,120px);font-weight:800;color:var(--gold);line-height:1;text-shadow:0 0 24px var(--gold)}.spark{font-size:30px;margin:8px 0}@media(prefers-reduced-motion:no-preference){.av.hop{animation:hop .6s}.av.fall{animation:fall 1.4s ease-in forwards}.cup{animation:cup 1.1s ease-out}.wintxt{animation:glow 1.2s ease-in-out infinite alternate}.spark{animation:cup 1.6s}@keyframes hop{40%{transform:translateY(-18px) scale(1.2)}}@keyframes fall{to{transform:translateY(150px) rotate(540deg) scale(.2);opacity:0}}@keyframes cup{from{transform:scale(0) rotate(-30deg)}70%{transform:scale(1.2)}}@keyframes glow{to{text-shadow:0 0 52px var(--gold);transform:scale(1.06)}}}@media(prefers-reduced-motion:reduce){.hole .av{opacity:.3}}';
document.head.appendChild(st);
window.KH7DBG={Q:function(){return Q},BAI:BAI};
window.KH7G={scope:scope,pool:scopePool,CHUONG:CHUONG,BAI:BAI};
/* Nạp các đợt câu hỏi bổ sung: cauhoi2.js, cauhoi3.js, ... (dừng khi không còn file) */
window.KH7Q={MC:MC,TF:TF,NUM:NUM,add:function(a){B0.push.apply(B0,a);if(typeof rebuild=='function')rebuild()},replaceAll:function(a){B0.splice(0,B0.length);B0.push.apply(B0,a);if(typeof rebuild=='function')rebuild()}};
var kq=2;
function nx(){var s=document.createElement('script');s.src='cauhoi'+kq+'.js';s.onload=function(){kq++;nx()};s.onerror=function(){};document.body.appendChild(s)}
/* Nếu có cauhoi-tong.js (xuất từ trang quản lý) thì nó thay thế toàn bộ ngân hàng gốc; các file cauhoi4.js trở đi vẫn được thêm lên trên. */
var ts=document.createElement('script');ts.src='cauhoi-tong.js';ts.onload=function(){kq=4;nx()};ts.onerror=function(){nx()};document.body.appendChild(ts);
/* Trò Nhảy bao bố (2 đội) nằm trong baobo.js */
var bg=document.createElement('script');bg.src='baobo.js';document.body.appendChild(bg);
})();
