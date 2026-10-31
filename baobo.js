/* Nhảy bao bố: 2 đội Xanh và Đỏ thi đấu cùng lúc, mỗi đội 10 câu. Đúng thì nhảy 1 bước, sai thì đứng yên. */
(function(){
var G=window.KH7G;if(!G)return;
var N=10,TIME=30,S=null,tmr=null;
GAMES.sack={ico:'🦘',name:'Nhảy bao bố',pick:['mc','tf','num'],n:N,time:TIME,d:'2 đội Xanh và Đỏ thi đấu cùng lúc, mỗi đội 10 câu. Trả lời đúng thì nhảy một bước, sai thì đứng yên. Chơi theo bài hoặc chương.'};
var NAME={b:'ĐỘI XANH',r:'ĐỘI ĐỎ'},LV=['Dễ','Vừa','Khó','Nâng cao'];
function setVh(){document.documentElement.style.setProperty('--vh',window.innerHeight+'px')}
function compact(){return window.matchMedia&&window.matchMedia('(max-height:540px) and (orientation:landscape)').matches}
function fit(el){
 if(!el)return;el.classList.remove('sm','xs');
 if(!compact())return;
 if(el.scrollHeight>el.clientHeight+1){el.classList.add('sm');if(el.scrollHeight>el.clientHeight+1)el.classList.add('xs')}
}
function sndIcon(){var b=document.querySelector('[aria-label="Bật hoặc tắt âm thanh"]');return b?b.textContent:'🔊'}
function snd(f,a){if(window.KH7SND&&KH7SND[f])KH7SND[f](a)}
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
/* ---------- Phạm vi câu hỏi và chia đề ---------- */
function scopeName(){var s=G.scope;return s.ch?G.CHUONG[s.ch-1][0]:s.b?'Bài '+s.b+' – '+G.BAI[s.b-1]:'Tất cả câu hỏi'}
function split(){
 var P=G.pool()||BANK.filter(function(q){return q.l<4});
 if(P.length<N)return null;
 var byL=function(a){return a.slice().sort(function(x,y){return x.l-y.l})},A,B;
 if(P.length>=2*N){
  var s=byL(shuf(P)),pick=[];
  for(var i=0;i<2*N;i++)pick.push(s[Math.floor(i*s.length/(2*N))]);
  A=[];B=[];pick.forEach(function(q,i){(i%2?B:A).push(q)});
 }else{var set=shuf(P).slice(0,N);A=set.slice();B=set.slice()}
 return[byL(shuf(A)),byL(shuf(B))];
}
function mk(k,qs){return{k:k,qs:qs,i:0,ok:0,ms:0,lock:false,t0:0,done:false,mt:null}}
/* ---------- Giao diện ---------- */
function lane(k){
 var st='';for(var i=1;i<=N;i++)st+='<i data-n="'+i+'"></i>';
 return '<div class="sk-lane sk-l'+k+'" id="ln'+k+'" style="--p:0"><div class="sk-fin">🏁 ĐÍCH 🏁</div><div class="sk-steps">'+st+'</div><div class="sk-mv"><span class="sk-tag">'+NAME[k].replace('ĐỘI ','')+'</span><div class="sk-hp" id="hp'+k+'">'+face(k,'idle')+'</div></div></div>';
}
function sackStart(){
 stop();app.style.maxWidth='1320px';
 var T=split();
 if(!T){app.style.maxWidth='';document.body.classList.remove('sk-on');return alert('Phạm vi này chưa đủ '+N+' câu hỏi. Hãy chọn một chương hoặc tất cả câu hỏi.')}
 document.body.classList.add('sk-on');setVh();
 S={b:mk('b',T[0]),r:mk('r',T[1]),over:false};
 app.innerHTML='<div class="sk-top"><b>🦘 Nhảy bao bố</b><span>'+esc(scopeName())+'</span><button class="btn ghost sk-snd" data-act="sksnd" aria-label="Bật hoặc tắt âm thanh">'+sndIcon()+'</button><button class="btn ghost" data-act="menu">Thoát</button></div>'
  +'<div class="sk-rot">📱 Xoay ngang điện thoại để xem cả hai đội trên một màn hình, không phải cuộn.</div>'
  +'<div class="sk"><section class="sk-p sk-pb" id="pn_b"></section><div class="sk-stage"><div class="sk-lanes">'+lane('b')+lane('r')+'</div></div><section class="sk-p sk-pr" id="pn_r"></section></div>';
 showQ(S.b);showQ(S.r);
 tmr=setInterval(tick,100);
}
function head(t){return '<div class="sk-h"><b>'+NAME[t.k]+'</b><span>Câu '+Math.min(t.i+1,N)+'/'+N+' – Đúng '+t.ok+'</span></div>'}
function body(t,q){
 if(q.t=='mc')return q.o.map(function(o,i){return '<button class="opt" data-act="sk" data-t="'+t.k+'" data-v="'+i+'"><b>'+'ABCD'[i]+'</b>'+esc(o)+'</button>'}).join('');
 if(q.t=='tf')return '<button class="opt" data-act="sk" data-t="'+t.k+'" data-v="1"><b>Đ</b>Đúng</button><button class="opt" data-act="sk" data-t="'+t.k+'" data-v="0"><b>S</b>Sai</button>';
 return '<div class="row"><input id="skn_'+t.k+'" inputmode="decimal" placeholder="Nhập một con số" aria-label="Đáp án"><button class="btn" data-act="sk" data-t="'+t.k+'" data-v="num">Chốt</button></div>';
}
function showQ(t){
 var el=document.getElementById('pn_'+t.k);if(!el||!S)return;
 if(t.i>=N){t.done=true;el.innerHTML=head(t)+'<div class="sk-wait">'+(t.ok==N?'🎉 Đúng cả 10 câu!<br>Xuất sắc!':'Đã xong 10 câu!')+'<br><small>Đang chờ đội kia…</small></div>';return check()}
 var q=t.qs[t.i];t.lock=false;t.t0=Date.now();
 el.innerHTML=head(t)+'<div class="sk-bar"><i id="bar_'+t.k+'"></i></div><div class="sk-q"><small>'+esc(q.c)+' – '+LV[q.l-1]+'</small><p>'+esc(q.q)+'</p></div><div class="sk-a">'+body(t,q)+'</div><div class="sk-fb" id="fb_'+t.k+'" role="status"></div>';
 fit(el);
}
function ansT(q){return q.t=='mc'?'ABCD'[q.a]+'. '+q.o[q.a]:q.t=='tf'?(q.a?'ĐÚNG':'SAI'):String(q.a)}
/* ---------- Nhân vật phản ứng ---------- */
function setMood(t,m){var hp=document.getElementById('hp'+t.k);if(hp)hp.innerHTML=face(t.k,m)}
function cls(t,c){var hp=document.getElementById('hp'+t.k);if(!hp)return;hp.classList.remove('hop','shake','party');void hp.offsetWidth;if(c)hp.classList.add(c)}
function hop(t){
 var ln=document.getElementById('ln'+t.k);if(!ln)return;
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
 var q=t.qs[t.i],ok;t.ms+=Math.min(TIME*1000,Date.now()-t.t0);
 if(v===null)ok=false;
 else if(q.t=='mc')ok=+v==q.a;
 else if(q.t=='tf')ok=(+v==1)==q.a;
 else ok=Math.abs(parseFloat(String(v).replace(',','.'))-q.a)<1e-9;
 var el=document.getElementById('pn_'+t.k);
 el.querySelectorAll('.opt').forEach(function(b){var i=+b.dataset.v,right=q.t=='mc'?i==q.a:(i==1)==q.a;if(right)b.classList.add('ok');else if(v!==null&&String(b.dataset.v)==String(v))b.classList.add('bad');b.disabled=true});
 var fb=document.getElementById('fb_'+t.k);
 fb.textContent=ok?'✅ Đúng rồi! Nhảy 1 bước!':(v===null?'⏰ Hết giờ! ':'❌ Sai rồi! ')+'Đáp án: '+ansT(q)+(q.e?' – '+q.e:'');
 fit(el);
 if(ok){t.ok++;hop(t);snd('step')}else{wrong(t);snd('buzz')}
 var sp=el.querySelector('.sk-h span');if(sp)sp.textContent='Câu '+Math.min(t.i+1,N)+'/'+N+' – Đúng '+t.ok;
 setTimeout(function(){if(!S||S.over)return;t.i++;showQ(t)},ok?1100:1800);
}
function tick(){
 if(!S||S.over||!document.querySelector('.sk')){clearInterval(tmr);return}
 var mn=99;
 [S.b,S.r].forEach(function(t){
  if(t.done||t.lock)return;
  var left=Math.max(0,TIME-(Date.now()-t.t0)/1000),bar=document.getElementById('bar_'+t.k);
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
 if(w){setMood(w,'joy');cls(w,'party');setMood(l,'cry');cls(l,'shake');snd('win');setTimeout(function(){snd('sad')},1800);
  ti='🏆 '+NAME[w.k]+' CHIẾN THẮNG!'}
 else{setMood(a,'happy');setMood(b,'happy');snd('win');ti='🤝 HAI ĐỘI HÒA NHAU!'}
 var cf='';for(var i=0;i<26;i++)cf+='<span class="sk-cf" style="left:'+Math.floor(Math.random()*98)+'%;animation-duration:'+(3+Math.random()*3).toFixed(1)+'s;animation-delay:'+(Math.random()*2).toFixed(1)+'s">'+['🎉','🎊','⭐','✨'][i%4]+'</span>';
 var big=function(t,m){return '<div class="sk-who">'+face(t.k,m)+'<b>'+NAME[t.k]+'</b><small>Đúng '+t.ok+'/'+N+' – '+sec(t.ms)+'</small></div>'};
 var d=document.createElement('div');d.className='sk-end';d.id='skend';
 d.innerHTML=(w?cf:'')+'<div class="sk-card"><h1>'+ti+'</h1><div class="sk-two">'+(w?big(w,'joy')+big(l,'cry'):big(a,'happy')+big(b,'happy'))+'</div><p>'+(why||'Cùng số câu đúng và thời gian trả lời gần như bằng nhau.')+'</p><button class="btn big" data-act="start">Chơi lại</button> <button class="btn ghost" data-act="menu">Đổi trò chơi</button></div>';
 document.body.appendChild(d);
}
function stop(){document.body.classList.remove('sk-on');clearInterval(tmr);S=null;var e=document.getElementById('skend');if(e)e.remove();app.style.maxWidth=''}
/* ---------- Nối vào ứng dụng ---------- */
var _oc=app.onclick;
window.addEventListener('resize',function(){if(S){setVh();fit(document.getElementById('pn_b'));fit(document.getElementById('pn_r'))}});
app.onclick=function(e){
 var b=e.target.closest&&e.target.closest('button');
 if(b&&b.dataset.act=='sksnd'){var hb=document.querySelector('header [aria-label="Bật hoặc tắt âm thanh"]');if(hb){hb.click();b.textContent=hb.textContent}return}
 if(b&&b.dataset.act=='sk'&&!b.disabled){
  var t=S&&S[b.dataset.t];if(!t)return;
  if(b.dataset.v=='num'){var inp=document.getElementById('skn_'+t.k);if(inp&&inp.value.trim())pick(t,inp.value)}else pick(t,b.dataset.v);
  return;
 }
 return _oc.call(app,e);
};
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('#skend button');if(b){var a=b.dataset.act;var d=document.getElementById('skend');if(d)d.remove();if(a=='start'){stop();sackStart()}else{stop();menu()}}},true);
document.addEventListener('keydown',function(e){if(e.key=='Enter'&&S&&e.target.id&&e.target.id.indexOf('skn_')==0){var t=S[e.target.id.slice(4)];if(t&&e.target.value.trim())pick(t,e.target.value)}});
var _menu=menu;
menu=function(){
 stop();_menu.apply(this,arguments);
 if(game=='sack'){
  var sb=app.querySelector('[data-act=start]');if(sb)sb.disabled=false;
  [].slice.call(app.querySelectorAll('h2')).forEach(function(h){if(h.textContent.indexOf('người chơi')>0){h.style.display='none';var n=h.nextElementSibling;if(n&&n.classList.contains('chips'))n.style.display='none'}});
 }
};
var _home=home;home=function(){stop();return _home.apply(this,arguments)};
var _start=start;start=function(){if(game=='sack')return sackStart();stop();return _start.apply(this,arguments)};
if(typeof review=='function'){var _rv=review;review=function(){stop();return _rv.apply(this,arguments)}}
window.KH7SACK={S:function(){return S},pick:pick,face:face};
/* ---------- Giao diện ---------- */
var st=document.createElement('style');
st.textContent=''
+'.sk-top{display:flex;flex-wrap:wrap;gap:8px 16px;align-items:center;margin:6px 0 10px;font-size:18px}.sk-top span{opacity:.85;flex:1;min-width:0}.sk-top .btn{margin:0}'
+'.sk{display:grid;grid-template-columns:minmax(0,1fr) minmax(260px,.9fr) minmax(0,1fr);gap:12px;align-items:stretch}'
+'.sk-p{--tc:#2F6FD6;background:var(--card);border:3px solid var(--tc);border-radius:20px;padding:12px;display:flex;flex-direction:column;gap:8px;min-height:480px}.sk-pr{--tc:#D63A3F}'
+'.sk-h{display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap;background:var(--tc);color:#fff;border-radius:12px;padding:6px 12px;font-weight:800}'
+'.sk-bar{height:10px;border-radius:8px;background:var(--line);overflow:hidden}.sk-bar i{display:block;height:100%;width:100%;background:linear-gradient(90deg,var(--tc),#FFD23F)}'
+'.sk-q{background:var(--bg);border-radius:14px;padding:10px 12px}.sk-q small{opacity:.75}.sk-q p{font-size:clamp(17px,2vw,21px);font-weight:700;margin:.2em 0 0;line-height:1.3}'
+'.sk-a{display:grid;gap:8px}.sk-a .opt{border-color:var(--tc);border-radius:16px;padding:9px 14px;font-size:16px}.sk-a .opt.ok{border-color:var(--ok)}.sk-a .opt.bad{border-color:var(--bad)}'
+'.sk-fb{font-weight:800;min-height:1.4em}.sk-wait{margin:auto;text-align:center;font-size:22px;font-weight:800}'
+'.sk-stage{border-radius:20px;overflow:hidden;background:linear-gradient(#7fd0ff,#d6f1ff 45%,#e9f7d3);border:3px solid var(--line)}.sk-lanes{display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:8px;height:100%}'
+'.sk-lane{--lh:470px;--ch:118px;--cw:96px;--fh:34px;--U:calc(var(--lh) - var(--ch) - var(--fh));--lc:#2F6FD6;position:relative;height:var(--lh);border-radius:14px;overflow:hidden;background:linear-gradient(#92dc92,#5db55d);border:4px solid var(--lc)}.sk-lr{--lc:#D63A3F}'
+'.sk-fin{position:absolute;top:0;left:0;right:0;height:var(--fh);display:grid;place-items:center;font:800 13px/1 system-ui;color:#fff;text-shadow:0 1px 2px #000;background:repeating-conic-gradient(#1b1b1b 0 25%,#7a7a7a 0 50%) 0 0/16px 16px}'
+'.sk-steps{position:absolute;left:0;right:0;bottom:0;height:var(--U);display:flex;flex-direction:column-reverse}.sk-steps i{flex:1;border-top:2px dashed rgba(255,255,255,.75);position:relative}.sk-steps i::after{content:attr(data-n);position:absolute;left:4px;top:2px;font:700 11px/1 system-ui;color:#fff}'
+'.sk-mv{position:absolute;left:50%;width:var(--cw);height:var(--ch);margin-left:calc(var(--cw) / -2);bottom:calc(var(--p) * var(--U) / 10);transition:bottom .55s cubic-bezier(.3,.8,.4,1)}'
+'.sk-hp{width:100%;height:100%;transform-origin:50% 100%}.chr{width:100%;height:100%;display:block;overflow:visible}'
+'.sk-tag{position:absolute;left:50%;top:-20px;transform:translateX(-50%);background:var(--lc);color:#fff;font:800 12px/1 system-ui;padding:3px 9px;border-radius:999px;white-space:nowrap}'
+'.sk-fl{position:absolute;left:50%;top:-34px;transform:translateX(-50%);font-weight:800;color:#fff;text-shadow:0 2px 4px rgba(0,0,0,.6);white-space:nowrap}'
+'.sk-end{position:fixed;inset:0;background:rgba(10,5,40,.8);z-index:30;display:grid;place-items:center;padding:16px;overflow:auto}.sk-card{background:var(--card);color:var(--ink);border-radius:24px;padding:20px;max-width:640px;text-align:center;position:relative;z-index:2}.sk-card h1{font-size:clamp(24px,5vw,40px)}'
+'.sk-two{display:flex;justify-content:center;gap:28px;flex-wrap:wrap}.sk-who{display:flex;flex-direction:column;align-items:center}.sk-who .chr{width:140px;height:175px}.sk-who small{opacity:.8}'
+'.sk-cf{position:fixed;top:-40px;font-size:26px;z-index:1}'
+'@media(prefers-reduced-motion:no-preference){.sk-hp.hop{animation:skhop .55s}.sk-hp.shake{animation:skshake .6s}.sk-hp.party{animation:skparty .5s infinite}.sk-fl{animation:skfl 1s forwards}.sk-cf{animation:skcf linear infinite}'
+'@keyframes skhop{0%{transform:none}20%{transform:scale(1.14,.84)}50%{transform:translateY(-36px) scale(.92,1.1)}80%{transform:scale(1.1,.9)}100%{transform:none}}'
+'@keyframes skshake{0%,100%{transform:none}20%{transform:translateX(-9px) rotate(-7deg)}40%{transform:translateX(9px) rotate(7deg)}60%{transform:translateX(-6px) rotate(-4deg)}80%{transform:translateX(6px) rotate(4deg)}}'
+'@keyframes skparty{0%,100%{transform:translateY(0) rotate(-5deg)}50%{transform:translateY(-26px) rotate(5deg)}}'
+'@keyframes skfl{from{opacity:1}to{opacity:0;top:-80px}}@keyframes skcf{to{transform:translateY(112vh) rotate(360deg)}}}'
+'@media(max-width:760px){.sk{grid-template-columns:1fr}.sk-stage{order:-1}.sk-p{min-height:0}.sk-lane{--lh:300px;--ch:86px;--cw:70px;--fh:28px}.sk-top span{order:3;flex-basis:100%}}'
+'.sk-rot{display:none;background:#FFF3C4;color:#5a4300;border-radius:12px;padding:6px 10px;margin:0 0 8px;font-weight:700;font-size:14px}.sk-snd{margin:0!important;padding:2px 10px!important}'
+'@media(max-width:760px) and (orientation:portrait){.sk-rot{display:block}}'
+'@media(max-height:540px) and (orientation:landscape){'
+'body.sk-on header{display:none}body.sk-on{min-height:0}body.sk-on #app{padding:4px 8px 6px;max-width:none}'
+'.sk-top{flex-wrap:nowrap;margin:0 0 4px;font-size:14px;gap:8px;height:34px;align-items:center}.sk-top b{white-space:nowrap}.sk-top span{order:0;flex:1 1 auto;flex-basis:auto;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:12px}.sk-top .btn{padding:2px 12px;font-size:13px;box-shadow:none;margin:0}'
+'.sk{grid-template-columns:minmax(0,1fr) minmax(150px,.62fr) minmax(0,1fr);gap:6px;height:calc(var(--vh,100vh) - 52px)}.sk-stage{order:0;border-width:2px;border-radius:12px}.sk-lanes{padding:4px;gap:4px}'
+'.sk-lane{--lh:calc(var(--vh,100vh) - 64px);--ch:74px;--cw:62px;--fh:20px;border-width:3px;border-radius:10px}.sk-fin{font-size:9px}.sk-steps i::after{font-size:9px;top:1px}.sk-tag{font-size:10px;top:-15px;padding:2px 6px}.sk-fl{font-size:11px;top:-26px}'
+'.sk-p{min-height:0;height:100%;padding:5px;gap:4px;border-width:2px;border-radius:12px}.sk-h{padding:2px 8px;font-size:12px;border-radius:8px}.sk-bar{height:6px}'
+'.sk-q{padding:4px 8px;border-radius:8px}.sk-q small{font-size:10px}.sk-q p{font-size:13px;line-height:1.25;margin:0}'
+'.sk-a{gap:4px}.sk-a .opt{padding:3px 8px;font-size:12px;gap:6px;border-width:2px;border-radius:12px;line-height:1.2}.sk-a .opt b{min-width:20px;height:20px;font-size:11px}.sk-a .row{gap:4px;margin:0}.sk-a input{padding:4px 8px;font-size:13px}.sk-a .btn{padding:3px 12px;font-size:13px}'
+'.sk-fb{font-size:11px;min-height:0;line-height:1.25}.sk-wait{font-size:15px}'
+'.sk-p.sm .sk-q p{font-size:12px}.sk-p.sm .sk-a .opt{font-size:11px;padding:2px 6px}.sk-p.sm .sk-fb{font-size:10px}'
+'.sk-p.xs .sk-q p{font-size:11px}.sk-p.xs .sk-a .opt{font-size:10px;padding:1px 6px}.sk-p.xs .sk-a .opt b{min-width:16px;height:16px;font-size:9px}.sk-p.xs .sk-fb{font-size:9px}'
+'.sk-card{padding:8px 12px}.sk-card h1{font-size:18px;margin:0 0 4px}.sk-who .chr{width:70px;height:88px}.sk-two{gap:16px}.sk-card p{margin:4px 0;font-size:12px}.sk-card .btn.big{font-size:15px;padding:6px 20px;margin-top:6px}'
+'}';
document.head.appendChild(st);
})();
