/* Giải cứu người bị nạn: một người chơi, trả lời bằng vận động cơ thể trước camera.
   Nhân vật (ảnh đại diện của thí sinh) bị nhốt trong phòng kín, nước đổ vào từ trên trần.
   Đúng: mở thêm một van thoát nước dưới sàn. Sai: nước đổ vào nhanh hơn. Sai quá 3 câu hoặc nước ngập kín: thất bại.
   A: quay người sang trái · B: quay người sang phải · C: đưa hai tay lên cao và vỗ tay · D: cúi người về phía trước.
   Câu đúng/sai: A = Đúng, B = Sai. Dùng camera và bộ nhận dạng chung trong sack.js (DTKSACK.gcam). */
(function(){
var A=window.DTKAPI;if(!A)return;
var VALVES=10,MAXW=3,HOLD=900,esc=A.esc,shuf=A.shuf,S=null,tmr=null;
var GES={L:['↩️','Quay trái'],R:['↪️','Quay phải'],C:['👏','Vỗ tay trên đầu'],D:['🙇','Cúi người']};
var KEY=['L','R','C','D'];
function $(id){return document.getElementById(id)}
function snd(f,a){if(window.SND&&SND[f])SND[f](a)}
function hyp(a,b){return Math.sqrt(a*a+b*b)}

/* ---------- Giao diện riêng của trò (CSS gắn kèm) ---------- */
var CSS=''
+'body[data-game=rescue] .top,body[data-game=rescue] .seo,body[data-game=rescue] .site-footer,body[data-game=rescue] .sky{display:none}'
+'body[data-game=rescue] main#app{max-width:none;padding:0;margin:0}'
+'.rs{display:flex;flex-direction:column;height:var(--vh,100vh);padding:8px;gap:8px;box-sizing:border-box;color:#fff}'
+'.rs-hud{display:flex;align-items:center;gap:8px;flex-wrap:wrap;font-weight:700}'
+'.rs-hud .gname{font-family:var(--fd,inherit);font-size:18px;margin-right:auto}'
+'.rs-pill{background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.25);border-radius:999px;padding:3px 10px;font-size:14px;white-space:nowrap}'
+'.rs-pill i{font-style:normal;opacity:.3}.rs-pill i.on{opacity:1}'
+'.rs-main{flex:1;min-height:0;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:10px}'
+'@media(orientation:portrait){.rs-main{grid-template-columns:1fr;grid-template-rows:minmax(0,42%) minmax(0,1fr)}}'/* Phòng kín */
+'.rs-scene{position:relative;min-height:0;border-radius:16px;overflow:hidden;border:6px solid #5B6475;background:#3A3F4B;box-shadow:inset 0 0 0 3px #2A2E37,0 6px 22px rgba(0,0,0,.45)}'
+'.rs-wall{position:absolute;inset:0;background:linear-gradient(#0000 96%,rgba(0,0,0,.25) 0) 0 0/100% 28px,linear-gradient(90deg,#0000 97%,rgba(0,0,0,.22) 0) 0 0/56px 28px,linear-gradient(#59606E,#454B57)}'
+'.rs-win{position:absolute;left:8%;top:30%;width:16%;height:14%;background:repeating-linear-gradient(90deg,#222 0 4px,transparent 4px 14px),linear-gradient(#1B2A44,#2E4E7A);border:4px solid #2A2E37;border-radius:4px}'
+'.rs-sign{position:absolute;left:4%;right:40%;top:6%;font-size:12px;color:#FFD23F;font-weight:800;letter-spacing:.5px;opacity:.9}'
+'.rs-danger{position:absolute;left:0;right:0;top:12%;border-top:3px dashed rgba(255,80,80,.8)}'
+'.rs-danger span{position:absolute;right:6px;top:-20px;font-size:11px;color:#FF8080;font-weight:800}'
/* Ống nước trên trần */
+'.rs-pipe{position:absolute;right:16%;top:0;width:44px;height:9%;background:linear-gradient(90deg,#6F7787,#B9C0CC,#6F7787);border-radius:0 0 6px 6px;z-index:3}'
+'.rs-pipe::after{content:"";position:absolute;left:-8px;right:-8px;bottom:-8px;height:12px;background:linear-gradient(90deg,#59606E,#A9B1BE,#59606E);border-radius:4px}'
+'.rs-stream{position:absolute;right:calc(16% + 22px);top:9%;width:var(--fw,16px);transform:translateX(50%);bottom:calc(var(--floor) + var(--lv) * (100% - var(--floor)) / 100);background:repeating-linear-gradient(180deg,rgba(120,200,255,.95) 0 14px,rgba(70,160,240,.9) 14px 28px);background-size:100% 28px;animation:rsfall .35s linear infinite;border-radius:0 0 8px 8px;z-index:2;transition:width .4s}'
+'@keyframes rsfall{to{background-position:0 28px}}'
+'.rs-splash{position:absolute;right:calc(16% + 22px);transform:translate(50%,50%);bottom:calc(var(--floor) + var(--lv) * (100% - var(--floor)) / 100);width:calc(var(--fw,16px)*3.4);height:14px;border-radius:50%;background:radial-gradient(rgba(220,245,255,.95),rgba(120,200,255,0) 70%);z-index:3;animation:rssp .3s ease-in-out infinite alternate}'
+'@keyframes rssp{to{transform:translate(50%,50%) scale(1.3,.8)}}'
/* Nước */
+'.rs-water{position:absolute;left:0;right:0;bottom:var(--floor);height:calc(var(--lv) * (100% - var(--floor)) / 100);background:linear-gradient(rgba(70,170,255,.62),rgba(20,90,200,.78));z-index:4;transition:height .2s linear}'
+'.rs-water::before{content:"";position:absolute;left:0;right:0;top:-9px;height:12px;background:radial-gradient(ellipse 18px 9px at 18px 9px,rgba(110,195,255,.75) 98%,transparent 100%) 0 0/36px 12px repeat-x;animation:rswave 1.6s linear infinite}'
+'@keyframes rswave{to{background-position:36px 0}}'
+'.rs-bub{position:absolute;bottom:0;width:8px;height:8px;border-radius:50%;border:2px solid rgba(255,255,255,.7);animation:rsbub 2.4s ease-in infinite}'
+'@keyframes rsbub{from{transform:translateY(0);opacity:.9}to{transform:translateY(-160px);opacity:0}}'
/* Sàn và van */
+'.rs-floor{position:absolute;left:0;right:0;bottom:0;height:var(--floor);background:linear-gradient(#2A2E37,#1E2128);display:flex;justify-content:space-around;align-items:center;z-index:5;padding:0 2%}'
+'.rs-valve{position:relative;width:min(7.8%,40px);aspect-ratio:1;border-radius:50%;border:3px solid #C0392B;background:radial-gradient(#7A1E16 30%,#A93226 32% 40%,#3B3F47 42%);box-shadow:0 0 0 2px #111}'
+'.rs-valve::before,.rs-valve::after{content:"";position:absolute;left:50%;top:6%;bottom:6%;width:14%;margin-left:-7%;background:#E74C3C;border-radius:3px}'
+'.rs-valve::after{transform:rotate(90deg)}'
+'.rs-valve.open{border-color:#2ECC71;animation:rsspin 1s linear infinite}'
+'.rs-valve.open::before,.rs-valve.open::after{background:#2ECC71}'
+'@keyframes rsspin{to{transform:rotate(360deg)}}'
+'.rs-valve.open+.rs-swirl,.rs-swirl{display:none}'
+'.rs-drain{position:absolute;bottom:calc(var(--floor) - 4px);width:min(7%,30px);height:22px;transform:translateX(-50%);border-radius:50%;background:radial-gradient(rgba(10,40,90,.9),rgba(10,40,90,0) 70%);z-index:6;opacity:0;transition:opacity .4s}'
+'.rs-drain.on{opacity:1;animation:rsspin 1.2s linear infinite}'
/* Nhân vật */
+'.rs-man{position:absolute;left:52%;transform:translateX(-50%);width:auto;height:40%;aspect-ratio:3/5;bottom:calc(var(--floor) + var(--mb,0%));z-index:4;transition:bottom .25s linear}'
+'.rs-man .avh.full{display:block}'
+'.rs-man.shake{animation:rsshake .5s}.rs-man.hop{animation:rshop .6s}'
+'@keyframes rsshake{25%{transform:translateX(-56%)}75%{transform:translateX(-44%)}}'
+'@keyframes rshop{40%{transform:translate(-50%,-14%)}}'
+'.rs-help{position:absolute;left:50%;transform:translateX(-50%);bottom:calc(var(--floor) + var(--mb,0%) + 41%);background:#fff;color:#C0392B;font-weight:800;font-size:13px;border-radius:10px;padding:2px 8px;z-index:6;white-space:nowrap;animation:rshelp 1s ease-in-out infinite alternate}'
+'@keyframes rshelp{to{transform:translateX(-50%) scale(1.1)}}'
+'.rs-scene.danger{border-color:#E74C3C;animation:rsalarm 1s infinite}'
+'@keyframes rsalarm{50%{border-color:#7B241C}}'
+'.rs-gauge{position:absolute;right:6px;top:14%;bottom:calc(var(--floor) + 6px);width:10px;background:rgba(0,0,0,.35);border-radius:6px;z-index:7;overflow:hidden}'
+'.rs-gauge i{position:absolute;left:0;right:0;bottom:0;height:calc(var(--lv) * 1%);background:linear-gradient(#FF5E5E,#FFD23F 40%,#4FC3F7);transition:height .2s linear}'
+'.rs-lvtxt{position:absolute;right:20px;bottom:calc(var(--floor) + 6px);z-index:7;font-weight:800;font-size:13px;background:rgba(0,0,0,.45);border-radius:8px;padding:1px 6px}'
/* Camera */
+'.rs-cam.gc-box{position:absolute;left:6px;top:6px;width:36%;height:auto;max-height:none;aspect-ratio:4/3;z-index:8;border-width:2px}'
+'.rs-cam .gc-ges{font-size:13px}.rs-cam .gc-msg{font-size:12px;padding:4px 6px}'
/* Lúc khởi động: camera to ở giữa phía trên để người chơi thấy mình, hướng dẫn ở phía dưới */
+'.rs-scene.cal .rs-cam.gc-box{z-index:10;inset:6px;width:auto;height:auto;aspect-ratio:auto}'
+'.rs-calbox{text-align:center}.rs-calbox h3{margin:0 0 4px;font-size:19px}.rs-calbox p{margin:4px 0;font-size:14px}'
/* Lớp phủ khởi động, kết thúc */
+'.rs-ovl{position:absolute;inset:0;z-index:9;display:flex;align-items:center;justify-content:center;background:rgba(6,10,40,.78);padding:12px;text-align:center}'
+'.rs-ovl>div{max-width:440px}.rs-ovl h3{margin:0 0 6px;font-size:20px}.rs-ovl p{margin:4px 0;font-size:14px}'
+'.rs-try{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:8px 0}'
+'.rs-try span{border:2px solid rgba(255,255,255,.3);border-radius:10px;padding:4px 2px;font-size:12px;line-height:1.2}'
+'.rs-try span b{display:block;font-size:22px}.rs-try span.on{border-color:#2ECC71;background:rgba(46,204,113,.25)}.rs-try span.done{border-color:#2ECC71}'
+'.rs-cal{height:8px;border-radius:6px;background:rgba(255,255,255,.2);overflow:hidden;margin:6px 0}.rs-cal i{display:block;height:100%;width:0;background:#2ECC71;transition:width .1s}'
/* Câu hỏi */
+'.rs-side{display:flex;flex-direction:column;gap:8px;min-height:0;overflow:auto}'
+'.rs-q{background:rgba(10,16,70,.85);border:2px solid #8EA2FF;border-radius:16px;padding:10px 12px}'
+'.rs-q small{color:#C9D3FF}.rs-q p{margin:4px 0 0;font-size:clamp(16px,2.3vw,22px);font-weight:700;line-height:1.35}'
+'.rs-opts{display:grid;grid-template-columns:1fr 1fr;gap:8px}'
+'.rs-opt{position:relative;overflow:hidden;display:flex;align-items:center;gap:8px;text-align:left;border-radius:14px;border:2px solid #8EA2FF;background:linear-gradient(#1C2A8A,#0F1859);color:#fff;font:inherit;font-size:clamp(14px,1.8vw,18px);padding:8px 10px;min-height:54px;cursor:pointer}'
+'.rs-opt>*{position:relative;z-index:1}'
+'.rs-opt>b{flex:none;width:30px;height:30px;border-radius:50%;background:#FFD23F;color:#1B1B3A;display:flex;align-items:center;justify-content:center;font-size:16px}'
+'.rs-opt>span{flex:1}'
+'.rs-opt>em{flex:none;font-style:normal;font-size:11px;text-align:center;line-height:1.1;opacity:.9;max-width:64px}.rs-opt>em i{display:block;font-style:normal;font-size:22px}'
+'.rs-opt.cam{cursor:default}'
+'.rs-opt.hold{border-color:#FFD23F;box-shadow:0 0 16px rgba(255,210,63,.7)}'
+'.rs-opt.hold::before{content:"";position:absolute;left:0;top:0;bottom:0;width:var(--hp,0%);background:rgba(255,210,63,.4);z-index:0}'
+'.rs-opt.ok{border-color:#2ECC71;background:linear-gradient(#1E8449,#145A32)}.rs-opt.bad{border-color:#E74C3C;background:linear-gradient(#B03A2E,#78281F)}.rs-opt.dim{opacity:.5}'
+'.rs-fb{min-height:22px;font-weight:700;font-size:15px}.rs-fb.good{color:#7DFFB0}.rs-fb.bad{color:#FFB3A8}.rs-fb small{display:block;font-weight:400;color:#E6E9FF;margin-top:2px}'
+'@media(max-height:540px) and (orientation:landscape){.rs{padding:4px;gap:4px}.rs-hud .gname{font-size:15px}.rs-pill{font-size:12px;padding:1px 8px}.rs-q{padding:6px 8px}.rs-q p{font-size:15px}.rs-opt{min-height:40px;padding:4px 8px;font-size:13px}.rs-opt>em{font-size:10px}.rs-opt>em i{font-size:16px}.rs-side{gap:4px}}'
+'@media(max-width:600px){.rs-opts{grid-template-columns:1fr}.rs-opt{min-height:44px}}'
+'@media(prefers-reduced-motion:reduce){.rs-stream,.rs-water::before,.rs-bub,.rs-valve.open,.rs-scene.danger{animation:none}}';
function css(){if($('rsCss'))return;var s=document.createElement('style');s.id='rsCss';s.textContent=CSS;document.head.appendChild(s)}

/* ---------- Nhận dạng động tác (toạ độ quy về đơn vị chiều cao khung hình) ----------
   B: tư thế chuẩn của người chơi (đứng thẳng, nhìn màn hình), được đo lúc khởi động và cập nhật dần. */
var B=null,LAST=null;
function classify(lm,ar){
 LAST=null;if(!lm)return null;
 var P=function(i){var p=lm[i];return p?{x:p.x*ar,y:p.y,z:(p.z||0)*ar,v:p.visibility==null?1:p.visibility}:{x:0,y:0,z:0,v:0}};
 var ls=P(11),rs=P(12),no=P(0),lw=P(15),rw=P(16);
 if(ls.v<.4||rs.v<.4)return null;
 var mx=(ls.x+rs.x)/2,my=(ls.y+rs.y)/2,sw=hyp(ls.x-rs.x,ls.y-rs.y),nOk=no.v>.4,hy=nOk?my-no.y:null;
 LAST={sw:sw,my:my,hy:hy,sg:ls.x>rs.x?1:-1};
 if(!B)return null;
 var up=function(w){return w.v>.4&&w.y<my-0.45*B.sw};
 var off=nOk?(no.x-mx)/B.sw*B.sg:0,dz=(ls.z-rs.z)/B.sw,g=null;
 if(up(lw)&&up(rw)&&hyp(lw.x-rw.x,lw.y-rw.y)<1.5*B.sw)g='C';
 else{
  /* Xét quay người trước: khi quay nghiêng, hai vai chụm lại nên đầu trông như thấp xuống, dễ nhầm với cúi người
     (đo thử thực tế: quay người thì độ rộng vai còn 12–25%, cúi người thì vai rộng ra vì gần camera hơn) */
  var narrow=sw<0.72*B.sw;
  if(narrow&&(Math.abs(dz)>0.3||Math.abs(off)>0.14))g=Math.abs(dz)>0.3?(dz>0?'L':'R'):(off>0?'L':'R');
  else if(Math.abs(off)>0.34&&sw<0.86*B.sw)g=off>0?'L':'R';
  else if(!narrow&&((hy!=null&&hy<0.45*B.ny)||(my-B.y)>0.6*B.sw||(!nOk&&(my-B.y)>0.35*B.sw)))g='D';
 }
 /* Đứng yên, nhìn thẳng thì cập nhật dần tư thế chuẩn (người chơi tiến lại gần hoặc lùi ra xa) */
 if(!g&&nOk&&Math.abs(off)<0.1&&!up(lw)&&!up(rw)&&hy>0.7*B.ny){
  var a=sw>0.8*B.sw?0.03:0.01;B.sw+=(sw-B.sw)*a;B.y+=(my-B.y)*a;B.ny+=(hy-B.ny)*a;B.sg=LAST.sg;
 }
 return g;
}
/* Mỗi động tác ứng với giá trị đáp án: câu trắc nghiệm A–D → 0–3; câu đúng/sai: A (quay trái) = Đúng, B (quay phải) = Sai */
function gVal(q,g){if(!g)return null;if(q.t=='tf')return g=='L'?'1':g=='R'?'0':null;return String(KEY.indexOf(g))}

/* ---------- Bắt đầu ván ---------- */
function start(){
 stop();css();
 var r=A.roster(),st=A.st;if(st.sel.length!=1)return alert('Trò này chơi một người: hãy chọn 1 thí sinh.');
 var P=A.pool().filter(function(q){return q.t=='mc'||q.t=='tf'});
 if(P.length<VALVES+MAXW)return alert('Phạm vi này chưa đủ câu trắc nghiệm, đúng/sai. Hãy chọn phạm vi rộng hơn.');
 var qs=A.fresh(P).slice(0,Math.min(P.length,24)).sort(function(a,b){return a.l-b.l}).map(A.prep);
 var cam=!!st.rscam&&!!(window.DTKSACK&&DTKSACK.gcam);
 S={qs:qs,i:0,p:r[st.sel[0]],lv:8,open:0,wrong:0,ok:0,xp:0,best:0,stk:0,burst:0,phase:cam?'cal':'play',cam:cam,lock:true,armed:false,calm:0,hv:null,last:Date.now(),beat:0,mood:'idle'};
 B=null;
 A.setScreen('play');document.body.setAttribute('data-game','rescue');setVh();
 var vs='';for(var i=0;i<VALVES;i++)vs+='<span class="rs-valve" id="rsv'+i+'"></span>';
 var dr='';for(i=0;i<VALVES;i++)dr+='<span class="rs-drain" id="rsd'+i+'" style="left:'+(2+96*(i+.5)/VALVES)+'%"></span>';
 document.getElementById('app').innerHTML='<div class="rs">'
  +'<div class="rs-hud"><button class="btn ghost sm" data-act="rsquit" aria-label="Thoát">✕</button><span class="gname">🌊 Giải cứu người bị nạn</span>'
  +'<span class="rs-pill" id="rsValves">🔧 Van mở: 0/'+VALVES+'</span><span class="rs-pill" id="rsLives"></span>'
  +'<button class="btn ghost sm" data-act="snd" aria-label="Bật hoặc tắt âm thanh">'+(window.SND&&!SND.isOn()?'🔇':'🔊')+'</button></div>'
  +'<div class="rs-main"><div class="rs-scene" id="rsScene" style="--lv:'+S.lv+';--floor:13%">'
  +'<div class="rs-wall"></div><div class="rs-win"></div><div class="rs-sign">⚠ PHÒNG KÍN – CHỈ MỞ ĐƯỢC VAN BẰNG KIẾN THỨC!</div><div class="rs-danger"><span>MỨC NGUY HIỂM</span></div>'
  +'<div class="rs-pipe"></div><div class="rs-stream" id="rsStream"></div><div class="rs-splash"></div>'
  +'<div class="rs-man" id="rsMan">'+AVH(S.p.e,'idle','full')+'</div><div class="rs-help" id="rsHelp">CỨU TÔI VỚI!</div>'
  +'<div class="rs-water" id="rsWater"><span class="rs-bub" style="left:20%"></span><span class="rs-bub" style="left:46%;animation-delay:.8s"></span><span class="rs-bub" style="left:74%;animation-delay:1.6s"></span></div>'
  +dr+'<div class="rs-floor">'+vs+'</div><div class="rs-gauge"><i></i></div><div class="rs-lvtxt" id="rsLvTxt"></div>'
  +(cam?'<div class="gc-box rs-cam" id="rsCam"><video class="gc-bg" playsinline muted autoplay></video><video class="gc-sharp" playsinline muted autoplay aria-hidden="true"></video><canvas></canvas><span class="gc-ges" id="rsGes"></span><div class="gc-msg"></div></div>':'')
  +'</div><div class="rs-side" id="rsSide"></div></div></div>';
 lives();render();
 if(cam)calStart();else ask();
 clearInterval(tmr);tmr=setInterval(tick,100);
}
function setVh(){document.documentElement.style.setProperty('--vh',window.innerHeight+'px')}
function lives(){var e=$('rsLives');if(!e||!S)return;var h='';for(var i=0;i<MAXW;i++)h+='<i class="'+(i<MAXW-S.wrong?'on':'')+'">❤️</i>';e.innerHTML='Được sai: '+h}

/* ---------- Khởi động camera: đo tư thế chuẩn rồi cho thử động tác ---------- */
function calStart(){
 var sc=$('rsScene'),o=document.createElement('div');o.className='rs-q rs-calbox';o.id='rsOvl';
 o.innerHTML='<div><h3>📷 Chuẩn bị giải cứu</h3><p><small>Đứng cách camera khoảng 2 m, thấy rõ đầu, vai và hai tay.</small></p><p id="rsCalMsg">Đang mở camera…</p><div class="rs-cal"><i id="rsCalBar"></i></div>'
  +'<div class="rs-try">'+KEY.map(function(k,i){return '<span id="rsTry'+k+'"><b>'+GES[k][0]+'</b>'+'ABCD'[i]+'. '+GES[k][1]+'</span>'}).join('')+'</div>'
  +'<p><small>Thử từng động tác: ô sáng xanh là máy đã nhận ra. Đưa hai tay lên vỗ tay để bắt đầu, hoặc bấm nút.</small></p>'
  +'<button class="btn" data-act="rsgo">▶ Bắt đầu giải cứu</button></div>';
 $('rsSide').appendChild(o);sc.classList.add('cal');
 S.cal={n:0,ok:false,goT:0};
 var me=S;
 DTKSACK.gcam.start($('rsCam'),onG,classify).then(function(ok){
  if(S!==me)return;
  if(!ok){S.cam=false;var m=$('rsCalMsg');if(m)m.textContent='Không dùng được camera – chuyển sang chạm màn hình để chọn đáp án.';setTimeout(function(){if(S===me&&S.phase=='cal')go()},2200)}
  else{var m2=$('rsCalMsg');if(m2)m2.textContent='Đứng thẳng, nhìn vào màn hình, thấy rõ đầu, vai và hai tay…'}
 });
}
function go(){if(!S||S.phase!='cal')return;var o=$('rsOvl');if(o)o.remove();var sc=$('rsScene');if(sc)sc.classList.remove('cal');S.phase='play';S.last=Date.now();snd('tap');ask()}
function onG(g,now){
 if(!S)return;
 var ge=$('rsGes');if(ge)ge.textContent=g?GES[g][0]+' '+GES[g][1]:'';
 if(S.phase=='cal'){
  if(!B){
   /* Đo tư thế chuẩn trong khoảng 1,5 giây khi người chơi đứng yên */
   if(LAST&&LAST.hy!=null){S.cal.n++;if(!S.cal.acc)S.cal.acc={sw:0,y:0,ny:0};S.cal.acc.sw+=LAST.sw;S.cal.acc.y+=LAST.my;S.cal.acc.ny+=LAST.hy}
   var bar=$('rsCalBar');if(bar)bar.style.width=Math.min(100,S.cal.n/12*100)+'%';
   if(S.cal.n>=12){var a=S.cal.acc,n=S.cal.n;B={sw:a.sw/n,y:a.y/n,ny:Math.max(0.02,a.ny/n),sg:LAST.sg};var m=$('rsCalMsg');if(m)m.textContent='✅ Máy đã nhận ra em! Thử các động tác bên dưới.';snd('happy')}
   return;
  }
  KEY.forEach(function(k){var t=$('rsTry'+k);if(t){t.classList.toggle('on',g==k);if(g==k)t.classList.add('done')}});
  if(g=='C'){if(!S.cal.goT)S.cal.goT=now;else if(now-S.cal.goT>1500)go()}else S.cal.goT=0;
  return;
 }
 if(S.phase!='play'||S.lock){S.hv=null;return}
 if(!S.armed){if(!g){if(!S.calm)S.calm=now;if(now-S.calm>400)S.armed=true}else S.calm=0;return}
 var q=S.q,v=gVal(q,g),side=$('rsSide');if(!side)return;
 [].forEach.call(side.querySelectorAll('.rs-opt'),function(b){var on=v!=null&&b.getAttribute('data-v')==v;b.classList.toggle('hold',on);if(!on)b.style.removeProperty('--hp')});
 if(v==null){S.hv=null;return}
 if(S.hv!==v){S.hv=v;S.hs=now}
 var pr=Math.min(1,(now-S.hs)/HOLD),b=side.querySelector('.rs-opt[data-v="'+v+'"]');if(b)b.style.setProperty('--hp',Math.round(pr*100)+'%');
 if(pr>=1){S.hv=null;pick(v)}
}

/* ---------- Câu hỏi ---------- */
function ask(){
 if(!S)return;
 if(S.i>=S.qs.length){S.qs=shuf(S.qs).map(A.prep);S.i=0}
 var q=S.q=S.qs[S.i],cam=S.cam;
 var em=function(k){return cam?'<em><i>'+GES[k][0]+'</i>'+GES[k][1]+'</em>':''};
 var opts=q.t=='mc'?q.o.map(function(o,i){return '<button class="rs-opt'+(cam?' cam':'')+'" '+(cam?'':'data-act="rsans" ')+'data-v="'+i+'"><b>'+'ABCD'[i]+'</b><span>'+esc(o)+'</span>'+em(KEY[i])+'</button>'}).join('')
  :'<button class="rs-opt'+(cam?' cam':'')+'" '+(cam?'':'data-act="rsans" ')+'data-v="1"><b>A</b><span>Đúng</span>'+em('L')+'</button><button class="rs-opt'+(cam?' cam':'')+'" '+(cam?'':'data-act="rsans" ')+'data-v="0"><b>B</b><span>Sai</span>'+em('R')+'</button>';
 $('rsSide').innerHTML='<div class="rs-q"><small>Câu '+(S.ok+S.wrong+1)+' · '+esc(q.c)+' – '+A.LVN[q.l-1]+(q.t=='tf'?' · Đúng hay sai?':'')+(A.sayB?' '+A.sayB(q):'')+'</small><p>'+esc(q.q)+'</p></div><div class="rs-opts">'+opts+'</div><div class="rs-fb" id="rsFb" role="status">'+(cam?'Giữ động tác khoảng 1 giây để chốt đáp án.':'Chạm vào đáp án em chọn.')+'</div>';
 if(A.sayAuto)A.sayAuto(q);
 S.lock=false;S.armed=false;S.calm=0;S.hv=null;
}
function pick(v){
 if(!S||S.lock||S.phase!='play')return;S.lock=true;
 var q=S.q,ok=A.judge(q,v),side=$('rsSide');
 [].forEach.call(side.querySelectorAll('.rs-opt'),function(b){var i=+b.getAttribute('data-v'),right=q.t=='mc'?i==q.a:(i==1)==q.a;b.classList.remove('hold');if(right)b.classList.add('ok');else if(String(b.getAttribute('data-v'))==String(v))b.classList.add('bad');else b.classList.add('dim');b.disabled=true});
 var fb=$('rsFb'),me=S;
 if(ok){
  S.ok++;S.stk++;if(S.stk>S.best)S.best=S.stk;S.xp+=10+2*q.l;
  var vi=S.open++;var ve=$('rsv'+vi),de=$('rsd'+vi);if(ve)ve.classList.add('open');if(de)de.classList.add('on');
  S.burst-=10;mood('happy',1300);anim('hop');snd('happy');
  var e=$('rsValves');if(e)e.textContent='🔧 Van mở: '+S.open+'/'+VALVES;
  fb.className='rs-fb good';fb.innerHTML='✅ Chính xác! Van thoát nước số '+S.open+' đã mở.';
  if(S.open>=VALVES){S.phase='win';setTimeout(function(){if(S===me)win()},900);return}
  setTimeout(function(){if(S===me&&S.phase=='play'){S.i++;ask()}},1600);
 }else{
  S.wrong++;S.stk=0;S.burst+=7;mood('sad',1800);anim('shake');snd('crash');lives();
  fb.className='rs-fb bad';fb.innerHTML='❌ Sai rồi! Nước đổ vào nhanh hơn. Đáp án đúng: <b>'+esc(A.ansText(q).replace(/^ĐÚNG$/,'A. Đúng').replace(/^SAI$/,'B. Sai'))+'</b>'+(q.e?'<small>'+esc(q.e)+'</small>':'');
  if(S.wrong>MAXW){S.phase='flood';return}
  setTimeout(function(){if(S===me&&S.phase=='play'){S.i++;ask()}},q.e?3200:2300);
 }
}

/* ---------- Nước chảy theo thời gian ---------- */
function rateIn(){return 0.6*(1+0.4*S.wrong)}   /* % mỗi giây */
function tick(){
 if(!S||!$('rsScene')){clearInterval(tmr);return}
 var now=Date.now(),dt=Math.min(0.5,(now-S.last)/1000);S.last=now;
 if(S.phase=='play'){
  var d=(rateIn()-0.1*S.open)*dt;
  if(S.burst){var s=Math.sign(S.burst)*Math.min(Math.abs(S.burst),12*dt);S.burst-=s;d+=s}
  S.lv=Math.max(0,Math.min(100,S.lv+d));
  if(S.lv>=100){S.phase='flood'}
 }else if(S.phase=='flood'){S.lv=Math.min(100,S.lv+14*dt);if(S.lv>=100){S.phase='lost';lose()}}
 else if(S.phase=='win'){S.lv=Math.max(0,S.lv-25*dt)}
 render();
 if(S.phase=='play'&&S.lv>80&&now-S.beat>1000){S.beat=now;snd('beat',3)}
}
function render(){
 var sc=$('rsScene');if(!sc||!S)return;
 sc.style.setProperty('--lv',S.lv.toFixed(1));
 var flow=S.phase=='win'?0:S.phase=='flood'?40:Math.min(40,12+S.wrong*8);
 var stEl=$('rsStream');if(stEl){stEl.style.setProperty('--fw',flow+'px');stEl.style.display=flow?'':'none';sc.querySelector('.rs-splash').style.display=flow?'':'none'}
 /* Nhân vật đứng trên sàn, nước dâng cao thì nổi lên theo mặt nước (đầu vẫn nhô lên) */
 var mb=Math.max(0,Math.min(56,S.lv*0.87-28));sc.style.setProperty('--mb',mb+'%');
 sc.classList.toggle('danger',S.phase!='win'&&S.lv>75);
 var t=$('rsLvTxt');if(t)t.textContent='💧 '+Math.round(S.lv)+'%';
 if(!S.mt){var m=S.phase=='win'?'win':S.lv>60?'sad':'idle';if(m!=S.mood)setMood(m)}
}
function setMood(m){S.mood=m;var e=$('rsMan');if(e)e.innerHTML=AVH(S.p.e,m,'full')}
function mood(m,ms){setMood(m);clearTimeout(S.mt);var me=S;S.mt=setTimeout(function(){if(S===me){S.mt=0;S.mood=''}},ms)}
function anim(c){var e=$('rsMan');if(!e)return;e.classList.remove('hop','shake');void e.offsetWidth;e.classList.add(c)}

/* ---------- Kết thúc ---------- */
function win(){
 if(!S)return;var me=S;setMood('win');anim('hop');snd('win');
 var h=$('rsHelp');if(h){h.textContent='CẢM ƠN BẠN! 🎉';h.style.color='#1E8449'}
 setTimeout(function(){if(S===me)end(true)},2600);
}
function lose(){
 if(!S)return;var me=S;setMood('sad');snd('sad');
 var h=$('rsHelp');if(h)h.textContent='…';
 setTimeout(function(){if(S===me)end(false)},2000);
}
function end(ok){
 DTKSACK&&DTKSACK.gcam&&DTKSACK.gcam.stop();clearInterval(tmr);
 var p=S.p,res=A.award(p.n,{xp:S.xp+(ok?50:0),streak:S.best,badges:ok?['rescue']:[]}),why=S.wrong>MAXW?'Đã trả lời sai quá '+MAXW+' câu.':'Nước đã ngập kín căn phòng.';
 A.setScreen('result');
 document.getElementById('app').innerHTML=(ok?A.confetti(30):'')+'<section class="hero center result'+(ok?' win':'')+'"><div class="res-avs">'+AVH(p.e,ok?'win':'sad','full')+'</div>'
  +(ok?'<h1 class="title sm">🌊 GIẢI CỨU THÀNH CÔNG!</h1><p>'+AVH(p.e)+' '+esc(p.n)+' đã mở đủ '+VALVES+' van thoát nước, trả lời đúng '+S.ok+' câu, sai '+S.wrong+' câu.</p>'
   :'<h1 class="title sm">Giải cứu chưa thành công!</h1><p>'+why+' Đã mở '+S.open+'/'+VALVES+' van. Ôn lại bài và thử lại nhé!</p>')
  +'</section><div class="rewards">'+A.rewardHTML(p.n,p.e,res)+'</div><div class="cta"><button class="btn big" data-act="start">↻ Chơi lại</button><button class="btn ghost" data-act="menu">Đổi trò chơi</button></div>';
 A.celebrate([res]);S=null;
}
function stop(){clearInterval(tmr);if(S&&window.DTKSACK&&DTKSACK.gcam)DTKSACK.gcam.stop();S=null;B=null}
function click(a,v){
 if(a=='rsgo'){go();return true}
 if(a=='rsans'){pick(v);return true}
 if(a=='rsquit'){if(confirm('Dừng giải cứu và thoát?')){stop();A.menu()}return true}
 return false;
}
window.addEventListener('resize',function(){if(S)setVh()});
window.DTKRESCUE={start:start,stop:stop,click:click,classify:classify,S:function(){return S},B:function(){return B},setB:function(b){B=b},onG:onG,pick:pick};
})();
