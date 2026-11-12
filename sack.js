/* Nhảy bao bố: 2 đội Xanh và Đỏ thi đấu cùng lúc trên một màn hình, mỗi đội 10 câu.
   Đúng thì nhân vật nhảy 1 bước, sai thì đứng yên. Dùng các hàm chung trong app.js qua window.DTKAPI. */
(function(){
var A=window.DTKAPI;if(!A)return;
var N=10,TIME=30,S=null,tmr=null,esc=A.esc,shuf=A.shuf;
var NAME={b:'ĐỘI XANH',r:'ĐỘI ĐỎ'},LV=A.LVN;
function $(id){return document.getElementById(id)}
function snd(f,a){if(window.SND&&SND[f])SND[f](a)}
function setVh(){document.documentElement.style.setProperty('--vh',window.innerHeight+'px')}
function compact(){return window.matchMedia&&window.matchMedia('(max-height:540px) and (orientation:landscape)').matches}
function fit(el){
 if(!el)return;el.classList.remove('sm','xs','xxs');var p=el.parentNode;if(p)p.classList.remove('xxs');
 if(!compact())return;
 var over=function(){return el.scrollHeight>el.clientHeight+1};
 if(over()){el.classList.add('sm');if(over()){el.classList.add('xs');if(over()){el.classList.add('xxs');if(p)p.classList.add('xxs')}}}
}
/* ---------- Nhân vật trong bao bố (SVG) ---------- */
function face(k,mood){
 var C=k=='b'?{s:'#4C9AFF',d:'#1F5FCC'}:{s:'#FF6F6F',d:'#C62F35'},skin='#FFD9B8',ink='#2B1B12';
 var joy=mood=='joy',arms=joy
  ?'<path d="M34 80 L14 44 M86 80 L106 44" stroke="'+skin+'" stroke-width="9" stroke-linecap="round"/><circle cx="14" cy="42" r="7.5" fill="'+skin+'"/><circle cx="106" cy="42" r="7.5" fill="'+skin+'"/>'
  :'<ellipse cx="29" cy="94" rx="8" ry="9" fill="'+skin+'"/><ellipse cx="91" cy="94" rx="8" ry="9" fill="'+skin+'"/>';
 var eyes,mouth,extra='';
 if(mood=='happy'||joy){
  eyes='<path d="M42 45 Q49 36 56 45 M64 45 Q71 36 78 45" stroke="'+ink+'" stroke-width="4" fill="none" stroke-linecap="round"/>';
  mouth='<path d="M45 54 Q60 80 75 54 Z" fill="#8B1E2D"/><path d="M51 66 Q60 73 69 66 Q60 61 51 66Z" fill="#FF8FA0"/>';
  extra='<circle cx="40" cy="57" r="5" fill="#FF9BA8" opacity=".75"/><circle cx="80" cy="57" r="5" fill="#FF9BA8" opacity=".75"/>';
  if(joy)extra+='<path d="M100 10 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3z M12 14 l2 6 6 2 -6 2 -2 6 -2 -6 -6 -2 6 -2z" fill="#FFD43B"/>';
 }else if(mood=='sad'){
  eyes='<circle cx="49" cy="47" r="3.8" fill="'+ink+'"/><circle cx="71" cy="47" r="3.8" fill="'+ink+'"/><path d="M42 36 L56 41 M78 36 L64 41" stroke="'+ink+'" stroke-width="3.5" stroke-linecap="round"/>';
  mouth='<path d="M48 64 Q60 53 72 64" stroke="'+ink+'" stroke-width="3.5" fill="none" stroke-linecap="round"/>';
  extra='<path d="M44 53 q-5 9 0 12 q5 -3 0 -12z" fill="#6EC6FF"/>';
 }else if(mood=='cry'){
  eyes='<path d="M42 40 L55 46 L42 52 M78 40 L65 46 L78 52" stroke="'+ink+'" stroke-width="3.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>';
  mouth='<path d="M45 68 Q60 52 75 68 Q60 62 45 68Z" fill="#8B1E2D"/>';
  extra='<path d="M46 54 q-7 14 -3 24 M74 54 q7 14 3 24" stroke="#6EC6FF" stroke-width="5" fill="none" stroke-linecap="round"/>';
 }else{
  eyes='<circle cx="49" cy="45" r="4.2" fill="'+ink+'"/><circle cx="71" cy="45" r="4.2" fill="'+ink+'"/><circle cx="50.5" cy="43.5" r="1.4" fill="#fff"/><circle cx="72.5" cy="43.5" r="1.4" fill="#fff"/>';
  mouth='<path d="M48 57 Q60 65 72 57" stroke="'+ink+'" stroke-width="3.5" fill="none" stroke-linecap="round"/>';
 }
 return '<svg viewBox="0 0 120 150" class="chr" aria-hidden="true">'
  +'<path d="M22 92 Q60 82 98 92 L108 138 Q60 152 12 138 Z" fill="#D8B27C" stroke="#97723F" stroke-width="3"/>'
  +'<path d="M28 106 H92 M24 120 H96" stroke="#B58C55" stroke-width="2.5" stroke-dasharray="5 4"/>'
  +'<rect x="38" y="68" width="44" height="30" rx="12" fill="'+C.s+'"/>'
  +'<rect x="24" y="86" width="72" height="10" rx="5" fill="'+C.d+'"/>'
  +arms
  +'<circle cx="60" cy="44" r="29" fill="'+skin+'"/>'
  +'<path d="M31 36 Q60 12 89 36 L89 30 Q60 4 31 30Z" fill="'+C.d+'"/><rect x="31" y="30" width="58" height="8" rx="4" fill="'+C.s+'"/>'
  +eyes+mouth+extra+'</svg>';
}
/* ---------- Chia đề cho hai đội ---------- */
function split(){
 /* Chỉ dùng câu trắc nghiệm nhiều lựa chọn và đúng/sai (trả lời được bằng động tác) */
 var P=A.pool().filter(function(q){return q.t=='mc'||q.t=='tf'});
 if(P.length<N)return null;
 var byL=function(a){return a.slice().sort(function(x,y){return x.l-y.l})},X,Y;
 if(P.length>=2*N){
  var s=byL(shuf(P)),pick=[];
  for(var i=0;i<2*N;i++)pick.push(s[Math.floor(i*s.length/(2*N))]);
  X=[];Y=[];pick.forEach(function(q,i){(i%2?Y:X).push(q)});
 }else{var set=shuf(P).slice(0,N);X=set.slice();Y=set.slice()}
 return[byL(shuf(X)).map(A.prep),byL(shuf(Y)).map(A.prep)];
}
function mk(k,qs){return{k:k,qs:qs,i:0,ok:0,ms:0,lock:false,t0:0,done:false,mt:null}}
/* ---------- Giao diện ---------- */
function lane(k){
 var st='';for(var i=1;i<=N;i++)st+='<i data-n="'+i+'"></i>';
 return '<div class="sk-lane sk-l'+k+'" id="ln'+k+'" style="--p:0"><div class="sk-fin">🏁 ĐÍCH 🏁</div><div class="sk-steps">'+st+'</div><div class="sk-mv"><span class="sk-tag">'+NAME[k].replace('ĐỘI ','')+'</span><div class="sk-hp" id="hp'+k+'">'+face(k,'idle')+'</div></div></div>';
}
function start(){
 stop();
 var T=split();
 if(!T)return alert('Phạm vi này chưa đủ '+N+' câu trắc nghiệm và đúng/sai. Hãy chọn một chương hoặc tất cả các bài.');
 var cam=!!(A.skCam&&A.skCam());
 A.setScreen('sack');document.body.classList.add('sk-on');document.body.classList.toggle('sk-camon',cam);setVh();
 S={b:mk('b',T[0]),r:mk('r',T[1]),over:false,cam:cam};
 var pane=function(k){return '<section class="sk-p sk-p'+k+'" id="pn_'+k+'">'+(cam?camFrame(k):'')+'<div class="sk-body" id="pb_'+k+'"></div></section>'};
 document.getElementById('app').innerHTML='<div class="sk-top"><b>🦘 Nhảy bao bố</b><span>'+esc(A.scopeName())+(cam?' · 📷 trả lời bằng động tác':'')+'</span>'+(cam?'<button class="btn ghost sm" data-act="skflip" aria-label="Đổi camera trước hoặc sau">🔄 '+(camFace()=='user'?'Camera trước':'Camera sau')+'</button>':'')+'<button class="btn ghost sm sk-snd" data-act="snd" aria-label="Bật hoặc tắt âm thanh">'+(window.SND&&!SND.isOn()?'🔇':'🔊')+'</button><button class="btn ghost sm" data-act="skquit">Thoát</button></div>'
  +'<div class="sk-rot">📱 Xoay ngang điện thoại để xem cả hai đội trên một màn hình, không phải cuộn.</div>'
  +(cam?'<div class="sk-legend">Giữ động tác 1 giây để chốt: <b>A</b> ✋ giơ tay trái · <b>B</b> giơ tay phải ✋ · <b>C</b> 🙌 giơ hai tay · <b>D</b> 🤸 dang ngang hai tay · <b>Đúng</b> 🙌 · <b>Sai</b> 🤸</div>':'')
  +'<div class="sk">'+pane('b')+'<div class="sk-stage"><div class="sk-lanes">'+lane('b')+lane('r')+'</div></div>'+pane('r')+'</div>';
 showQ(S.b);showQ(S.r);
 if(cam){
  /* Chờ camera sẵn sàng rồi mới tính giờ; quá 25 giây thì vẫn bắt đầu (chạm để trả lời) */
  S.wait=true;var w=document.createElement('div');w.id='skwait';w.className='sk-waitcam';w.innerHTML='<div><b>📷 Đang chuẩn bị camera…</b><small>Đồng hồ chỉ chạy khi camera đã sẵn sàng.</small><button class="btn ghost sm" data-act="skgo">Bắt đầu luôn (chạm để trả lời)</button></div>';
  document.querySelector('.sk').appendChild(w);var me=S;setTimeout(function(){if(S===me)camReady()},25000);
  camStart();
 }
 tmr=setInterval(tick,100);
}
function head(t){return '<div class="sk-h"><b>'+NAME[t.k]+'</b><span>Câu '+Math.min(t.i+1,N)+'/'+N+' – Đúng '+t.ok+'</span></div>'}
/* Nhãn động tác: dạng đầy đủ và dạng gọn (khi màn hình chật) */
var GMC=[['✋ Tay trái','✋T'],['Tay phải ✋','P✋'],['🙌 Hai tay','🙌'],['🤸 Dang ngang','🤸']];
function body(t,q){
 var g=function(s){return S&&S.cam?'<i class="ges"><em class="gf">'+s[0]+'</em><em class="gc">'+s[1]+'</em></i>':''};
 if(q.t=='mc')return q.o.map(function(o,i){return '<button class="opt" data-act="sk" data-t="'+t.k+'" data-v="'+i+'"><b>'+'ABCD'[i]+'</b><span>'+esc(o)+'</span>'+g(GMC[i])+'</button>'}).join('');
 if(q.t=='tf')return '<button class="opt" data-act="sk" data-t="'+t.k+'" data-v="1"><b>Đ</b><span>Đúng</span>'+g(GMC[2])+'</button><button class="opt" data-act="sk" data-t="'+t.k+'" data-v="0"><b>S</b><span>Sai</span>'+g(GMC[3])+'</button>';
 return '<div class="row"><input id="skn_'+t.k+'" inputmode="decimal" autocomplete="off" placeholder="Nhập một con số" aria-label="Đáp án"><button class="btn" data-act="sk" data-t="'+t.k+'" data-v="num">Chốt</button></div>';
}
function showQ(t){
 var el=$('pb_'+t.k);if(!el||!S)return;
 t.armed=false;t.calm=0;t.hv=null;
 if(t.i>=N){t.done=true;el.innerHTML=head(t)+'<div class="sk-wait">'+(t.ok==N?'🎉 Đúng cả 10 câu!<br>Xuất sắc!':'Đã xong 10 câu!')+'<br><small>Đang chờ đội kia…</small></div>';return check()}
 var q=t.qs[t.i];t.lock=false;t.t0=Date.now();
 el.innerHTML=head(t)+'<div class="sk-bar"><i id="bar_'+t.k+'"></i></div><div class="sk-q"><small>'+esc(q.c)+' – '+LV[q.l-1]+'</small><p>'+esc(q.q)+'</p></div><div class="sk-a">'+body(t,q)+'</div><div class="sk-fb" id="fb_'+t.k+'" role="status"></div>';
 fit(el);
}
/* ---------- Nhân vật phản ứng ---------- */
function setMood(t,m){var hp=$('hp'+t.k);if(hp)hp.innerHTML=face(t.k,m)}
function cls(t,c){var hp=$('hp'+t.k);if(!hp)return;hp.classList.remove('hop','shake','party');void hp.offsetWidth;if(c)hp.classList.add(c)}
function hop(t){
 var ln=$('ln'+t.k);if(!ln)return;
 ln.style.setProperty('--p',t.ok);
 setMood(t,t.ok>=N?'joy':'happy');cls(t,'hop');
 var f=document.createElement('span');f.className='sk-fl';f.textContent='+1 🎉';ln.querySelector('.sk-mv').appendChild(f);setTimeout(function(){f.remove()},1000);
 clearTimeout(t.mt);
 if(t.ok>=N)t.mt=setTimeout(function(){cls(t,'party')},600);else t.mt=setTimeout(function(){setMood(t,'idle')},1100);
}
function wrong(t){setMood(t,'sad');cls(t,'shake');clearTimeout(t.mt);t.mt=setTimeout(function(){if(S&&!S.over){setMood(t,'idle');cls(t,'')}},1500)}
/* ---------- Trả lời ---------- */
function pick(t,v){
 if(!S||S.over||t.lock||t.done)return;t.lock=true;
 var q=t.qs[t.i],ok=A.judge(q,v);t.ms+=Math.min(TIME*1000,Date.now()-t.t0);
 var el=$('pb_'+t.k);
 [].forEach.call(el.querySelectorAll('.opt'),function(b){var i=+b.getAttribute('data-v'),right=q.t=='mc'?i==q.a:(i==1)==q.a;if(right)b.classList.add('ok');else if(v!==null&&String(b.getAttribute('data-v'))==String(v))b.classList.add('bad');b.disabled=true});
 var inp=$('skn_'+t.k);if(inp)inp.disabled=true;
 $('fb_'+t.k).textContent=ok?'✅ Đúng rồi! Nhảy 1 bước!':(v===null?'⏰ Hết giờ! ':'❌ Sai rồi! ')+'Đáp án: '+A.ansText(q)+(q.e?' – '+q.e:'');
 fit(el);
 if(ok){t.ok++;hop(t);snd('happy')}else{wrong(t);snd('sad')}
 /* Khung của đội: xanh khi đúng, đỏ khi sai */
 var pn=$('pn_'+t.k);if(pn){pn.classList.remove('flash-ok','flash-bad');void pn.offsetWidth;pn.classList.add(ok?'flash-ok':'flash-bad');clearTimeout(t.ft);t.ft=setTimeout(function(){pn.classList.remove('flash-ok','flash-bad')},ok?1500:2300)}
 var sp=el.querySelector('.sk-h span');if(sp)sp.textContent='Câu '+Math.min(t.i+1,N)+'/'+N+' – Đúng '+t.ok;
 var me=S;setTimeout(function(){if(S!==me||S.over)return;t.i++;showQ(t)},ok?1100:(q.e?2600:1800));
}
function tick(){
 if(!S||S.over||!document.querySelector('.sk')){clearInterval(tmr);return}
 if(S.wait)return;
 var mn=99;
 [S.b,S.r].forEach(function(t){
  if(t.done||t.lock)return;
  var left=Math.max(0,TIME-(Date.now()-t.t0)/1000),bar=$('bar_'+t.k);
  if(bar)bar.style.width=left/TIME*100+'%';
  if(left<mn)mn=left;
  if(left<=0)pick(t,null);
 });
 if(mn>0&&mn<=5)snd('beat',mn);
}
/* ---------- Kết thúc ---------- */
function check(){if(S&&S.b.done&&S.r.done&&!S.over)setTimeout(finish,900)}
function sec(ms){return (ms/1000).toFixed(1).replace('.',',')+' giây'}
function finish(){
 if(!S||S.over)return;S.over=true;clearInterval(tmr);
 var a=S.b,b=S.r,w=null,why='';
 if(a.ok!=b.ok){w=a.ok>b.ok?a:b;why='Đúng nhiều câu hơn'}
 else if(Math.abs(a.ms-b.ms)>=10){w=a.ms<b.ms?a:b;why='Bằng số câu đúng, đội trả lời nhanh hơn thắng'}
 var l=w?(w===a?b:a):null,ti;
 if(w){setMood(w,'joy');cls(w,'party');setMood(l,'cry');cls(l,'shake');snd('win');setTimeout(function(){snd('sad')},1800);ti='🏆 '+NAME[w.k]+' CHIẾN THẮNG!'}
 else{setMood(a,'happy');setMood(b,'happy');snd('win');ti='🤝 HAI ĐỘI HOÀ NHAU!'}
 var big=function(t,m){return '<div class="sk-who">'+face(t.k,m)+'<b>'+NAME[t.k]+'</b><small>Đúng '+t.ok+'/'+N+' – '+sec(t.ms)+'</small></div>'};
 var d=document.createElement('div');d.className='sk-end ovl';d.id='skend';
 d.innerHTML=(w?A.confetti(26):'')+'<div class="sk-card"><h1>'+ti+'</h1><div class="sk-two">'+(w?big(w,'joy')+big(l,'cry'):big(a,'happy')+big(b,'happy'))+'</div><p>'+(why||'Cùng số câu đúng và thời gian trả lời gần như bằng nhau.')+'</p><button class="btn big" data-act="start">↻ Chơi lại</button> <button class="btn ghost" data-act="menu">Đổi trò chơi</button></div>';
 document.body.appendChild(d);
}
function stop(){camStop();document.body.classList.remove('sk-on','sk-camon');clearInterval(tmr);if(S)S.over=true;S=null;var e=$('skend');if(e)e.remove()}
/* Nhận các nút bấm thuộc trò này; trả về true nếu đã xử lý */
function click(a,v,b){
 if(a=='skflip'){
  if(!S||!S.cam)return true;
  A.setSkFace(camFace()=='user'?'environment':'user');
  b.textContent='🔄 '+(camFace()=='user'?'Camera trước':'Camera sau');
  camStop();['b','r'].forEach(function(k){var s=$('csel_'+k);if(s)s.value=''});camStart();return true;
 }
 if(a=='skgo'){camReady();return true}
 if(a=='skquit'){if(confirm('Thoát trò Nhảy bao bố?')){stop();A.menu()}return true}
 if(a!='sk')return false;
 var t=S&&S[b.getAttribute('data-t')];if(!t)return true;
 if(v=='num'){var inp=$('skn_'+t.k);if(inp&&inp.value.trim())pick(t,inp.value)}else pick(t,v);
 return true;
}
window.addEventListener('resize',function(){if(S){setVh();fit($('pb_b'));fit($('pb_r'))}});
document.addEventListener('keydown',function(e){if(e.key=='Enter'&&S&&e.target.id&&e.target.id.indexOf('skn_')==0){var t=S[e.target.id.slice(4)];if(t&&e.target.value.trim())pick(t,e.target.value)}});
/* ================= TRẢ LỜI BẰNG ĐỘNG TÁC QUA CAMERA =================
   Dùng MediaPipe Pose Landmarker (chạy trên máy, không gửi hình ảnh đi đâu).
   Mặc định 1 camera chia đôi: Đội Xanh đứng bên trái màn hình, Đội Đỏ bên phải.
   Máy có từ 2 camera thì mỗi đội có thể chọn camera riêng. */
var MPV='0.10.14',MPCDN='https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@'+MPV,
 MPMODEL='https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task',
 HOLD=1000,CAM={on:false,src:{},raf:0,last:0,devs:[]},MPLIB=null,PL={};
var GNAME={L:'✋ Tay trái',R:'Tay phải ✋',BOTH:'🙌 Hai tay',SIDE:'🤸 Dang ngang'};
function camFrame(k){return '<div class="sk-cam" id="cam_'+k+'"><div class="sk-cin"><video playsinline muted autoplay></video><canvas></canvas></div><span class="sk-ctag">'+(k=='b'?'Đội Xanh':'Đội Đỏ')+'</span><span class="sk-cges" id="ges_'+k+'"></span><div class="sk-cst" id="cst_'+k+'">📷 Đang mở camera…</div><select class="sk-csel" id="csel_'+k+'" aria-label="Chọn camera" hidden></select></div>'}
function camMsg(k,m){var e=$('cst_'+k);if(e){e.textContent=m||'';e.hidden=!m}}
function vis(p){return !!p&&(p.visibility==null||p.visibility>0.35)}
/* Nhận dạng động tác từ các điểm mốc cơ thể (toạ độ ảnh 0–1, trục y hướng xuống).
   11/12: vai trái/phải, 13/14: khuỷu tay, 15/16: cổ tay (trái/phải của chính học sinh). */
function classify(lm){
 if(!lm)return null;var ls=lm[11],rs=lm[12],le=lm[13],re=lm[14],lw=lm[15],rw=lm[16];
 if(!vis(ls)||!vis(rs))return null;
 var sw=Math.sqrt((ls.x-rs.x)*(ls.x-rs.x)+(ls.y-rs.y)*(ls.y-rs.y));if(sw<0.03)return null;
 function up(w,s){return vis(w)&&w.y<s.y-0.55*sw}
 function side(w,e,s){return vis(w)&&Math.abs(w.y-s.y)<0.6*sw&&Math.abs(w.x-s.x)>1.1*sw&&(!vis(e)||Math.abs(e.y-s.y)<0.7*sw)}
 var uL=up(lw,ls),uR=up(rw,rs),sL=side(lw,le,ls),sR=side(rw,re,rs);
 if(uL&&uR)return 'BOTH';if(sL&&sR)return 'SIDE';if(uL&&!sR)return 'L';if(uR&&!sL)return 'R';return null;
}
function gestVal(q,g){if(!g)return null;if(q.t=='tf')return g=='BOTH'?'1':g=='SIDE'?'0':null;return {L:'0',R:'1',BOTH:'2',SIDE:'3'}[g]}
function loadLib(){if(MPLIB)return MPLIB;var imp=new Function('u','return import(u)');MPLIB=imp(MPCDN+'/vision_bundle.mjs').then(function(m){return m.FilesetResolver.forVisionTasks(MPCDN+'/wasm').then(function(fs){return{m:m,fs:fs}})});MPLIB.catch(function(){MPLIB=null});return MPLIB}
function makePL(n){
 return loadLib().then(function(L){
  var o=function(d){return{baseOptions:{modelAssetPath:MPMODEL,delegate:d},runningMode:'VIDEO',numPoses:n,minPoseDetectionConfidence:0.5,minTrackingConfidence:0.5}};
  return L.m.PoseLandmarker.createFromOptions(L.fs,o('GPU')).catch(function(){return L.m.PoseLandmarker.createFromOptions(L.fs,o('CPU'))});
 }).then(function(pl){
  /* Chạy thử một lần trên ảnh trống: lần nhận dạng đầu tiên luôn rất chậm, làm trước để vào trận không bị khựng */
  try{var c=document.createElement('canvas');c.width=c.height=64;c.getContext('2d').fillRect(0,0,64,64);pl.detectForVideo(c,performance.now())}catch(e){}
  return pl;
 });
}
/* Tải sẵn bộ nhận dạng (gọi từ màn hình chuẩn bị). Dùng chung một lần tải cho cả trận. */
function sharedPL(){if(!PL.p){PL.p=makePL(2).then(function(pl){PL.shared=pl;return pl});PL.p.catch(function(){PL.p=null})}return PL.p}
function preload(){if(!navigator.mediaDevices)return;sharedPL().catch(function(){})}
/* Trận đấu chỉ bắt đầu tính giờ khi camera và bộ nhận dạng đã sẵn sàng */
function camReady(){if(!S||!S.wait)return;S.wait=false;var w=$('skwait');if(w)w.remove();[S.b,S.r].forEach(function(t){if(!t.lock&&!t.done)t.t0=Date.now()})}
/* Camera trước ('user') hay camera sau ('environment'). Camera trước hiển thị kiểu soi gương; camera sau hiển thị như ảnh thật. */
function camFace(){return A.skFace?A.skFace():'user'}
function getStream(id){var c={audio:false,video:{width:{ideal:640},height:{ideal:480},frameRate:{ideal:24,max:30}}};if(id)c.video.deviceId={exact:id};else c.video.facingMode={ideal:camFace()};return navigator.mediaDevices.getUserMedia(c)}
function attach(k,stream,shared){var f=$('cam_'+k);if(!f)return;f.classList.toggle('half',!!shared);f.classList.toggle('right',!!shared&&k=='r');var v=f.querySelector('video');v.srcObject=stream;var p=v.play();if(p&&p.catch)p.catch(function(){})}
/* Mỗi nguồn: {id, stream, video, teams:['b','r'] hoặc ['b'], pl} */
function camStart(){
 if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia){['b','r'].forEach(function(k){camMsg(k,'Trình duyệt này không hỗ trợ camera. Hãy chạm để chọn đáp án.')});camReady();return}
 CAM.on=true;CAM.src={};CAM.mirror=camFace()=='user';document.body.classList.toggle('sk-nomirror',!CAM.mirror);
 ['b','r'].forEach(function(k){camMsg(k,'📷 Đang mở camera '+(CAM.mirror?'trước':'sau')+'…')});
 getStream(null).then(function(stream){
  if(!CAM.on){stream.getTracks().forEach(function(t){t.stop()});return}
  CAM.src.shared={stream:stream,teams:['b','r']};attach('b',stream,true);attach('r',stream,true);
  camMsg('b','⏳ Đang tải bộ nhận dạng động tác…');camMsg('r','⏳ Đang tải bộ nhận dạng động tác…');
  navigator.mediaDevices.enumerateDevices().then(function(ds){CAM.devs=ds.filter(function(d){return d.kind=='videoinput'});if(CAM.devs.length>1)['b','r'].forEach(fillSel)}).catch(function(){});
  return sharedPL().then(function(pl){if(!CAM.on)return;camMsg('b','');camMsg('r','');CAM.raf=requestAnimationFrame(loop);camReady()});
 }).catch(function(e){
  var m=e&&e.name=='NotAllowedError'?'Chưa được phép dùng camera. Hãy cho phép quyền camera rồi chơi lại, hoặc chạm để chọn đáp án.':'Không mở được camera hoặc bộ nhận dạng (cần mạng ở lần đầu). Hãy chạm để chọn đáp án.';
  ['b','r'].forEach(function(k){camMsg(k,m)});camReady();
 });
}
function fillSel(k){
 var s=$('csel_'+k);if(!s)return;
 s.innerHTML='<option value="">Camera chung (chia đôi)</option>'+CAM.devs.map(function(d,i){return '<option value="'+d.deviceId+'">'+A.esc(d.label||('Camera '+(i+1)))+'</option>'}).join('');
 s.hidden=false;s.onchange=function(){useOwn(k,s.value)};
}
/* Cho một đội dùng camera riêng (hoặc quay lại dùng chung) */
function useOwn(k,id){
 var old=CAM.src[k];if(old){old.stream.getTracks().forEach(function(t){t.stop()});delete CAM.src[k]}
 var sh=CAM.src.shared;
 if(!id){if(sh){if(sh.teams.indexOf(k)<0)sh.teams.push(k);attach(k,sh.stream,true)}return}
 if(sh){sh.teams=sh.teams.filter(function(x){return x!=k})}
 camMsg(k,'📷 Đang mở camera…');
 getStream(id).then(function(st){
  CAM.src[k]={stream:st,teams:[k]};attach(k,st,false);
  return PL[k]?PL[k]:makePL(1).then(function(pl){PL[k]=pl;return pl});
 }).then(function(){camMsg(k,'')}).catch(function(){camMsg(k,'Không mở được camera này.');useOwn(k,'')});
}
function loop(){
 if(!CAM.on)return;CAM.raf=requestAnimationFrame(loop);
 /* Nhận dạng khoảng 8–10 lần/giây là đủ để chốt động tác giữ 1 giây; máy yếu thì tự giãn ra để không giật */
 var now=performance.now();if(now-CAM.last<Math.max(110,(CAM.cost||0)*2.5))return;CAM.last=now;
 if(document.hidden)return;var t0=performance.now();
 var seen={};
 Object.keys(CAM.src).forEach(function(key){
  var s=CAM.src[key],pl=key=='shared'?PL.shared:PL[key];if(!pl||!s.teams.length)return;
  var v=$('cam_'+s.teams[0]).querySelector('video');if(!v||v.readyState<2||!v.videoWidth)return;
  var res;try{res=pl.detectForVideo(v,now)}catch(e){return}
  var poses=res&&res.landmarks||[];
  s.teams.forEach(function(k){
   var lm=null;
   if(key=='shared'){var best=0;poses.forEach(function(p){var cx=(p[11].x+p[12].x)/2,mx=CAM.mirror?1-cx:cx,w=Math.abs(p[11].x-p[12].x);if((k=='b'?mx<0.5:mx>=0.5)&&w>best){best=w;lm=p}})}
   else lm=poses[0]||null;
   seen[k]=1;draw(k,v,lm);onGesture(k,classify(lm),now);
  });
 });
 ['b','r'].forEach(function(k){if(!seen[k])onGesture(k,null,now)});
 var dt=performance.now()-t0;CAM.cost=CAM.cost?CAM.cost*0.8+dt*0.2:dt;
}
function draw(k,v,lm){var c=$('cam_'+k);if(c)drawTo(c.querySelector('canvas'),v,lm,k=='b'?'#4C9AFF':'#FF6F6F')}
function drawTo(c,v,lm,col){
 if(!c)return;
 if(c.width!=v.videoWidth){c.width=v.videoWidth;c.height=v.videoHeight}
 var x=c.getContext('2d');x.clearRect(0,0,c.width,c.height);if(!lm)return;
 var P=function(i){return[lm[i].x*c.width,lm[i].y*c.height]};
 x.lineWidth=Math.max(4,c.width/120);x.strokeStyle=col;x.lineCap='round';
 [[11,12],[11,13],[13,15],[12,14],[14,16],[11,23],[12,24],[23,24]].forEach(function(s){if(!vis(lm[s[0]])||!vis(lm[s[1]]))return;var a=P(s[0]),b=P(s[1]);x.beginPath();x.moveTo(a[0],a[1]);x.lineTo(b[0],b[1]);x.stroke()});
 [15,16].forEach(function(i){if(!vis(lm[i]))return;var a=P(i);x.fillStyle='#FFD23F';x.beginPath();x.arc(a[0],a[1],c.width/50,0,7);x.fill()});
}
/* Giữ cùng một động tác đủ HOLD ms thì chốt đáp án. Sau mỗi câu phải hạ tay xuống trước khi trả lời câu mới. */
function onGesture(k,g,now){
 var t=S&&S[k],gs=$('ges_'+k);if(gs)gs.textContent=g?GNAME[g]:'';
 if(!t||S.over||t.lock||t.done){if(t)t.hv=null;return}
 var el=$('pb_'+k);if(!el)return;
 if(!t.armed){
  if(!g){if(!t.calm)t.calm=now;if(now-t.calm>300)t.armed=true}else t.calm=0;
  return;
 }
 var q=t.qs[t.i],v=gestVal(q,g);
 [].forEach.call(el.querySelectorAll('.opt'),function(b){var on=v!=null&&b.getAttribute('data-v')==v;b.classList.toggle('hold',on);if(!on)b.style.removeProperty('--hp')});
 if(v==null){t.hv=null;return}
 if(t.hv!==v){t.hv=v;t.hs=now}
 var pr=Math.min(1,(now-t.hs)/HOLD),b=el.querySelector('.opt[data-v="'+v+'"]');if(b)b.style.setProperty('--hp',Math.round(pr*100)+'%');
 if(pr>=1){t.hv=null;pick(t,v)}
}
function camStop(){
 CAM.on=false;cancelAnimationFrame(CAM.raf);
 Object.keys(CAM.src).forEach(function(k){CAM.src[k].stream.getTracks().forEach(function(t){t.stop()})});CAM.src={};
}
/* ===== Camera một người (dùng cho Ai là triệu phú) =====
   box chứa <video>, <canvas>, .gc-msg; onG(cử chỉ, thời điểm) được gọi khoảng 9 lần/giây.
   Trả về Promise<true> khi camera và bộ nhận dạng đã sẵn sàng, <false> nếu không dùng được. */
var G1=null;
function gcamStart(box,onG){
 gcamStop();
 var me=G1={raf:0,last:0,cost:0,stream:null},msg=function(m){var e=box.querySelector('.gc-msg');if(e){e.textContent=m||'';e.hidden=!m}};
 box.classList.toggle('mirror',camFace()=='user');
 if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia){msg('Trình duyệt này không hỗ trợ camera. Hãy chạm để chọn đáp án.');return Promise.resolve(false)}
 msg('📷 Đang mở camera '+(camFace()=='user'?'trước':'sau')+'…');
 return getStream(null).then(function(st){
  if(G1!==me){st.getTracks().forEach(function(t){t.stop()});return false}
  me.stream=st;var v=box.querySelector('video');v.srcObject=st;var p=v.play();if(p&&p.catch)p.catch(function(){});
  msg('⏳ Đang tải bộ nhận dạng động tác…');
  return sharedPL().then(function(pl){
   if(G1!==me)return false;msg('');
   var loop=function(){
    if(G1!==me)return;me.raf=requestAnimationFrame(loop);
    var now=performance.now();if(now-me.last<Math.max(110,me.cost*2.5))return;me.last=now;
    if(document.hidden||v.readyState<2||!v.videoWidth)return;
    var t0=performance.now(),res;try{res=pl.detectForVideo(v,now)}catch(e){return}
    var best=null,bw=0;(res&&res.landmarks||[]).forEach(function(q){var w=Math.abs(q[11].x-q[12].x);if(w>bw){bw=w;best=q}});
    drawTo(box.querySelector('canvas'),v,best,'#FFC24D');
    try{onG(classify(best),now)}catch(e){}
    var dt=performance.now()-t0;me.cost=me.cost?me.cost*0.8+dt*0.2:dt;
   };
   me.raf=requestAnimationFrame(loop);return true;
  });
 }).catch(function(e){
  if(G1===me)msg(e&&e.name=='NotAllowedError'?'Chưa được phép dùng camera. Hãy cho phép quyền camera, hoặc chạm để chọn đáp án.':'Không mở được camera (lần đầu cần có mạng). Hãy chạm để chọn đáp án.');
  return false;
 });
}
function gcamStop(){if(!G1)return;cancelAnimationFrame(G1.raf);if(G1.stream)G1.stream.getTracks().forEach(function(t){t.stop()});G1=null}
window.DTKSACK={gcam:{start:gcamStart,stop:gcamStop,on:function(){return !!G1},gestVal:gestVal,face:camFace},face:face,start:start,preload:preload,stop:stop,click:click,S:function(){return S},pick:pick,classify:classify,gestVal:gestVal,onGesture:onGesture};
})();
