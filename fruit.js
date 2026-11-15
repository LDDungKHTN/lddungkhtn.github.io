/* Hứng hoa quả: một người chơi, 10 câu hỏi.
   Mỗi câu: các quả mang đáp án rơi từ trên cây xuống trong 20 giây. Người chơi đóng vai con vật,
   bước sang trái / phải trước camera (hoặc chạm, kéo, dùng phím mũi tên) để đứng dưới quả mang đáp án đúng.
   Hứng đúng: quả vào giỏ ở góc màn hình (+1 điểm). Hứng sai: quả thối rữa và bị vứt vào thùng rác.
   Điểm = số quả trong giỏ. Camera dùng bộ nhận dạng chung trong sack.js (DTKSACK.gcam), chỉ cần vị trí ngang của vai. */
(function(){
var A=window.DTKAPI;if(!A)return;
var N=10,DUR=20000,esc=A.esc,shuf=A.shuf,S=null,raf=0;
var FRUITS=['🍎','🍊','🍋','🍌','🍉','🍇','🍓','🍑','🍒','🍍','🥭','🍐','🥝','🍈'];
var PETS=[['🐻','Gấu'],['🐼','Gấu trúc'],['🐒','Khỉ'],['🦊','Cáo'],['🐰','Thỏ'],['🐸','Ếch'],['🐧','Chim cánh cụt'],['🐱','Mèo']];
function $(id){return document.getElementById(id)}
function snd(f,a){if(window.SND&&SND[f])SND[f](a)}
function setVh(){document.documentElement.style.setProperty('--vh',window.innerHeight+'px')}
function pet(){var k=A.st.frpet;for(var i=0;i<PETS.length;i++)if(PETS[i][0]==k)return PETS[i];return PETS[0]}

var CSS=''
+'body[data-game=fruit] .top,body[data-game=fruit] .seo,body[data-game=fruit] .site-footer,body[data-game=fruit] .sky{display:none}'
+'body[data-game=fruit] main#app{max-width:none;padding:0;margin:0}'
+'.fr{display:flex;flex-direction:column;height:var(--vh,100vh);padding:6px;gap:6px;box-sizing:border-box;color:#fff}'
+'.fr-hud{display:flex;align-items:center;gap:8px;flex-wrap:wrap;font-weight:700}'
+'.fr-hud .gname{font-size:18px;margin-right:auto}'
+'.fr-pill{background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.3);border-radius:999px;padding:3px 10px;font-size:14px;white-space:nowrap}'
+'.fr-scene{position:relative;flex:1;min-height:0;border-radius:16px;overflow:hidden;touch-action:none;user-select:none;-webkit-user-select:none;'
+' background:radial-gradient(ellipse 60% 30% at 80% 8%,rgba(255,244,190,.9),transparent 60%),linear-gradient(#8fd3ff 0%,#c9efff 45%,#e9f9d8 70%,#9ed36a 82%,#6fae45 100%)}'
+'.fr-hill{position:absolute;bottom:0;left:-10%;right:-10%;height:26%;background:radial-gradient(ellipse 40% 60% at 25% 100%,#7cc457,transparent 70%),radial-gradient(ellipse 45% 70% at 80% 100%,#86cf5e,transparent 70%)}'
+'.fr-canopy{position:absolute;left:-5%;right:-5%;top:-30px;height:92px;background:radial-gradient(circle at 8% 60%,#2f8f3a 0 38px,transparent 39px),radial-gradient(circle at 22% 40%,#3aa548 0 48px,transparent 49px),radial-gradient(circle at 38% 65%,#2f8f3a 0 42px,transparent 43px),radial-gradient(circle at 54% 35%,#3aa548 0 50px,transparent 51px),radial-gradient(circle at 70% 62%,#2f8f3a 0 44px,transparent 45px),radial-gradient(circle at 86% 40%,#3aa548 0 48px,transparent 49px),radial-gradient(circle at 98% 62%,#2f8f3a 0 40px,transparent 41px);filter:drop-shadow(0 6px 6px rgba(0,0,0,.25))}'
+'.fr-q{position:absolute;left:8px;right:8px;top:8px;z-index:5;background:rgba(18,30,80,.88);border:2px solid #9fd0ff;border-radius:14px;padding:6px 12px 8px;box-shadow:0 6px 16px rgba(0,0,0,.3)}'
+'.fr-q small{color:#cfe3ff;display:flex;align-items:center;gap:6px;flex-wrap:wrap}.fr-q p{margin:3px 0 4px;font-weight:800;font-size:clamp(15px,2.3vw,22px);line-height:1.3}'
+'.fr-bar{height:7px;border-radius:9px;background:rgba(255,255,255,.2);overflow:hidden}.fr-bar i{display:block;height:100%;width:100%;background:linear-gradient(90deg,#7CFF9E,#FFD23F);transform-origin:left}'
+'.fr-bar.hot i{background:#FF6B6B}'
+'.fr-lanes{position:absolute;inset:0;display:flex;z-index:2}'
+'.fr-lane{flex:1;position:relative;border-left:2px dashed rgba(255,255,255,.35)}.fr-lane:first-child{border-left:0}'
+'.fr-lane.on{background:linear-gradient(transparent 25%,rgba(255,236,120,.28))}'
+'.fr-fruit{position:absolute;left:50%;top:0;transform:translateX(-50%);width:calc(100% - 10px);max-width:240px;display:flex;flex-direction:column;align-items:center;gap:2px;will-change:top;transition:opacity .4s}'
+'.fr-fruit i{font-style:normal;font-size:clamp(38px,6.5vh,64px);line-height:1;filter:drop-shadow(0 4px 3px rgba(0,0,0,.3));transition:filter .6s,transform .6s}'
+'.fr-fruit span{background:#fff;color:#1b2440;border-radius:10px;padding:3px 7px;font-weight:800;font-size:clamp(11px,1.6vw,16px);line-height:1.2;text-align:center;box-shadow:0 3px 8px rgba(0,0,0,.25);display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;overflow:hidden;max-width:100%}'
+'.fr-fruit b{position:absolute;left:-4px;top:-4px;background:#1d4fd8;color:#fff;border-radius:50%;width:22px;height:22px;font-size:12px;display:flex;align-items:center;justify-content:center}'
+'.fr-fruit.right span{background:#4BE38D}.fr-fruit.right i{filter:drop-shadow(0 0 12px #FFE27A)}'
+'.fr-fruit.dim{opacity:.25}'
+'.fr-fruit.rot i{filter:sepia(1) saturate(2.5) hue-rotate(-25deg) brightness(.45);transform:scale(.85) rotate(-12deg)}.fr-fruit.rot span{background:#7a5a3a;color:#fff}'
+'.fr-fruit.rot::after{content:"🦠";position:absolute;top:-10px;right:18%;font-size:22px;animation:frfly .6s ease-in-out infinite alternate}'
+'@keyframes frfly{to{transform:translate(8px,-6px)}}'
+'.fr-fruit.toss{transition:left .8s ease-in,top .8s ease-in,transform .8s ease-in,opacity .8s;opacity:0;transform:translateX(-50%) rotate(260deg) scale(.4)}'
+'.fr-fruit.inbask{transition:left .7s ease-in-out,top .7s ease-in-out,transform .7s,opacity .7s;transform:translateX(-50%) scale(.35);opacity:.2}'
/* Con vật */
+'.fr-pet{position:absolute;bottom:calc(2% + 8px);left:50%;z-index:4;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;pointer-events:none}'
+'.fr-pet .hat{font-size:clamp(30px,5vh,48px);line-height:.9;margin-bottom:-10px;position:relative;z-index:1}'
+'.fr-pet .ani{font-size:clamp(64px,13vh,120px);line-height:1;filter:drop-shadow(0 6px 4px rgba(0,0,0,.3));transition:transform .15s}'
+'.fr-pet .shadow{width:70%;height:10px;border-radius:50%;background:rgba(0,0,0,.25);margin-top:-6px}'
+'.fr-pet.happy .ani{animation:frhop .5s}.fr-pet.sad .ani{animation:frshake .5s}'
+'@keyframes frhop{40%{transform:translateY(-22%) scale(1.1)}}@keyframes frshake{20%,60%{transform:translateX(-8px)}40%,80%{transform:translateX(8px)}}'
/* Giỏ và thùng rác */
+'.fr-basket{position:absolute;left:8px;bottom:8px;z-index:6;background:rgba(120,72,30,.88);border:3px solid #e2b06b;border-radius:12px 12px 18px 18px;padding:4px 8px;min-width:96px;max-width:38%}'
+'.fr-basket b{display:block;font-size:13px;color:#ffe9c2}.fr-basket div{font-size:clamp(18px,3vh,26px);line-height:1.15;letter-spacing:-2px;min-height:26px}'
+'.fr-basket div i{font-style:normal;display:inline-block;animation:frpop .5s}@keyframes frpop{0%{transform:scale(2.2)}100%{transform:none}}'
+'.fr-trash{position:absolute;right:10px;bottom:8px;z-index:6;font-size:clamp(30px,5vh,44px)}'
+'.fr-fb{position:absolute;left:50%;top:46%;transform:translate(-50%,-50%);z-index:8;background:rgba(10,20,60,.92);border:2px solid #fff;border-radius:14px;padding:10px 16px;font-weight:800;font-size:clamp(16px,2.4vw,22px);text-align:center;max-width:86%;display:none}'
+'.fr-fb.show{display:block;animation:frpop .35s}.fr-fb.good{border-color:#4BE38D}.fr-fb.bad{border-color:#FF6B6B}.fr-fb small{display:block;font-weight:500;font-size:14px;color:#e6ecff;margin-top:4px}'
/* Camera ở góc trên phải */
+'.fr-cam{position:absolute!important;right:8px;top:auto;bottom:calc(8px + 9vh);z-index:6;width:min(24%,190px);height:auto!important;aspect-ratio:4/3;border-width:2px;border-radius:10px}'
+'.fr-cam .gc-msg{font-size:11px;padding:3px 5px}'
+'.fr-cal{position:absolute;inset:0;z-index:9;display:flex;align-items:center;justify-content:center;background:rgba(10,18,60,.55)}'
+'.fr-cal>div{background:#16205a;border:2px solid #9fd0ff;border-radius:16px;padding:14px 18px;max-width:min(92%,460px);text-align:center;display:flex;flex-direction:column;gap:8px}'
+'.fr-cal big{font-size:46px;font-weight:800;color:#FFD23F}'
+'@media(max-height:540px) and (orientation:landscape){.fr-q{padding:4px 10px}.fr-q p{font-size:15px}.fr-pet .ani{font-size:56px}.fr-fruit i{font-size:34px}}'
+'@media(prefers-reduced-motion:reduce){.fr-pet.happy .ani,.fr-pet.sad .ani,.fr-fruit.rot::after{animation:none}}';
function css(){if($('frCss'))return;var s=document.createElement('style');s.id='frCss';s.textContent=CSS;document.head.appendChild(s)}

/* ---------- Bắt đầu ---------- */
function start(){
 stop();css();
 var r=A.roster(),st=A.st;if(st.sel.length!=1)return alert('Trò này chơi một người: hãy chọn 1 thí sinh.');
 var P=A.pool().filter(function(q){return q.t=='mc'||q.t=='tf'});
 if(P.length<N)return alert('Phạm vi này chưa đủ '+N+' câu trắc nghiệm, đúng/sai. Hãy chọn phạm vi rộng hơn.');
 var qs=A.fresh(P).slice(0,N).sort(function(a,b){return a.l-b.l}).map(A.prep);
 var cam=st.frcam!==false&&!!(window.DTKSACK&&DTKSACK.gcam);
 S={qs:qs,i:-1,p:r[st.sel[0]],pet:pet(),cam:cam,phase:'cal',tx:.5,ax:.5,basket:[],xp:0,stk:0,best:0,seen:0,lock:true,keyStep:0};
 A.setScreen('play');document.body.setAttribute('data-game','fruit');setVh();
 document.getElementById('app').innerHTML='<div class="fr">'
  +'<div class="fr-hud"><button class="btn ghost sm" data-act="frquit" aria-label="Thoát">✕</button><span class="gname">🧺 Hứng hoa quả</span>'
  +'<span class="fr-pill" id="frNo">Câu 0/'+N+'</span><span class="fr-pill" id="frScore">🍎 0 quả</span>'
  +'<button class="btn ghost sm" data-act="snd" aria-label="Bật hoặc tắt âm thanh">'+(window.SND&&!SND.isOn()?'🔇':'🔊')+'</button></div>'
  +'<div class="fr-scene" id="frScene"><div class="fr-hill"></div><div class="fr-canopy"></div>'
  +'<div class="fr-lanes" id="frLanes"></div>'
  +'<div class="fr-q" id="frQ"><small>'+AVH(S.p.e)+' '+esc(S.p.n)+' đóng vai '+S.pet[1].toLowerCase()+' '+S.pet[0]+'</small><p>Chuẩn bị hứng hoa quả!</p><div class="fr-bar" id="frBar"><i></i></div></div>'
  +'<div class="fr-pet" id="frPet"><span class="hat">🧺</span><span class="ani">'+S.pet[0]+'</span><span class="shadow"></span></div>'
  +'<div class="fr-basket" id="frBasket"><b>🧺 Giỏ hoa quả</b><div></div></div><div class="fr-trash" aria-hidden="true">🗑️</div>'
  +(cam?'<div class="gc-box fr-cam" id="frCam"><video playsinline muted autoplay></video><canvas></canvas><div class="gc-msg"></div></div>':'')
  +'<div class="fr-fb" id="frFb" role="status"></div>'
  +'<div class="fr-cal" id="frCal"><div><h3 style="margin:0">'+S.pet[0]+' Sẵn sàng hứng hoa quả!</h3>'
  +(cam?'<p id="frCalMsg">📷 Đang mở camera…</p><small>Đứng cách camera khoảng 2 m. Bước sang trái, sang phải để '+S.pet[1].toLowerCase()+' chạy theo. Đứng dưới quả mang đáp án đúng khi quả rơi xuống.</small>'
   :'<p>Chạm hoặc kéo trên sân, hoặc dùng phím ← → để di chuyển.</p><small>Đứng dưới quả mang đáp án đúng khi quả rơi xuống.</small>')
  +'<big id="frCount"></big><button class="btn" data-act="frgo">▶ Bắt đầu</button></div></div>'
  +'</div></div>';
 bindPointer();
 if(cam){
  var me=S;
  DTKSACK.gcam.start($('frCam'),onPos,posOf,{any:true}).then(function(ok){
   if(S!==me)return;var m=$('frCalMsg');
   if(!ok){S.cam=false;if(m)m.textContent='Không dùng được camera – chạm, kéo hoặc dùng phím ← → để di chuyển.'}
   else if(m)m.textContent='🧍 Bước vào khung hình…';
  });
 }
 loop();
}
/* Vị trí ngang của người chơi (trung điểm hai vai, 0–1 theo khung ảnh gốc) */
function posOf(lm){if(!lm||!lm[11]||!lm[12])return null;var v=function(p){return p.visibility==null||p.visibility>0.4};if(!v(lm[11])||!v(lm[12]))return null;return (lm[11].x+lm[12].x)/2}
function onPos(x,now){
 if(!S)return;
 if(x==null){S.seen=0;if(S.phase=='cal'){var m=$('frCalMsg');if(m&&S.cam)m.textContent='🧍 Bước vào khung hình…'}return}
 /* Camera trước hiển thị như soi gương: người bước sang phải thì ảnh gốc dịch sang trái */
 var mx=DTKSACK.gcam.face()=='user'?1-x:x;
 S.tx=Math.max(0,Math.min(1,(mx-0.18)/0.64));
 if(S.phase=='cal'){
  if(!S.seen)S.seen=now;var m2=$('frCalMsg');
  if(now-S.seen>1200&&!S.cd){S.cd=Date.now();if(m2)m2.textContent='✅ Máy đã nhận ra em! Bắt đầu sau…'}
  else if(!S.cd&&m2)m2.textContent='👀 Đang nhận diện… đứng yên một chút';
 }
}
/* Chạm / kéo / chuột trên sân chơi */
function bindPointer(){
 var sc=$('frScene');if(!sc)return;
 var set=function(e){if(!S||e.target.closest('button'))return;var r=sc.getBoundingClientRect();S.tx=Math.max(0,Math.min(1,(e.clientX-r.left)/r.width))};
 sc.addEventListener('pointerdown',function(e){S&&(S.drag=true);set(e)});
 sc.addEventListener('pointermove',function(e){if(S&&(S.drag||e.pointerType=='mouse'&&e.buttons))set(e)});
 window.addEventListener('pointerup',function(){if(S)S.drag=false});
}
document.addEventListener('keydown',function(e){
 if(!S||!$('frScene'))return;var n=S.n||4;
 if(e.key=='ArrowLeft'||e.key=='ArrowRight'){e.preventDefault();var lane=Math.min(n-1,Math.floor(S.tx*n));lane=Math.max(0,Math.min(n-1,lane+(e.key=='ArrowLeft'?-1:1)));S.tx=(lane+.5)/n}
});
function go(){if(!S||S.phase!='cal')return;var c=$('frCal');if(c)c.remove();S.phase='play';snd('tap');next()}

/* ---------- Câu hỏi ---------- */
function next(){
 if(!S)return;S.i++;
 if(S.i>=S.qs.length)return end();
 var q=S.q=S.qs[S.i],labels=q.t=='tf'?['Đúng','Sai']:q.o.slice(),n=S.n=labels.length,fr=shuf(FRUITS).slice(0,n);
 S.vals=q.t=='tf'?['1','0']:labels.map(function(x,j){return String(j)});
 S.fr=fr;S.lock=false;S.t0=Date.now();S.beat=0;
 $('frNo').textContent='Câu '+(S.i+1)+'/'+N;
 var qv=Object.assign({},q,{o:labels,nol:1});
 $('frQ').innerHTML='<small>'+esc(q.c)+' – '+A.LVN[q.l-1]+(q.t=='tf'?' · Đúng hay sai?':'')+(A.sayB?' '+A.sayB(qv):'')+'</small><p>'+esc(q.q)+'</p><div class="fr-bar" id="frBar"><i></i></div>';
 $('frLanes').innerHTML=labels.map(function(t,j){return '<div class="fr-lane" data-l="'+j+'"><div class="fr-fruit" id="frF'+j+'"><b>'+'ABCD'[j]+'</b><i>'+fr[j]+'</i><span>'+esc(t)+'</span></div></div>'}).join('');
 var fb=$('frFb');fb.className='fr-fb';
 if(A.sayAuto)A.sayAuto(qv);
}
function geom(){
 var sc=$('frScene'),q=$('frQ'),pt=$('frPet');if(!sc||!q||!pt)return null;
 /* Quả rơi từ dưới khung câu hỏi xuống đến khi chạm giỏ trên đầu con vật */
 return{top:q.offsetTop+q.offsetHeight+6,catchY:pt.offsetTop+12,h:sc.clientHeight};
}
function loop(){
 cancelAnimationFrame(raf);
 var step=function(){
  if(!S||!$('frScene'))return;raf=requestAnimationFrame(step);
  /* Con vật chạy theo vị trí người chơi, mượt */
  var d=S.tx-S.ax;S.ax+=d*0.22;var pe=$('frPet');
  if(pe){pe.style.left=(4+S.ax*92)+'%';var ani=pe.querySelector('.ani');if(ani&&!pe.classList.contains('happy')&&!pe.classList.contains('sad'))ani.style.transform='rotate('+Math.max(-14,Math.min(14,d*90))+'deg)'+(d<-0.003?' scaleX(-1)':'')}
  var n=S.n||0,lane=n?Math.max(0,Math.min(n-1,Math.floor(S.ax*n))):-1;
  [].forEach.call(document.querySelectorAll('.fr-lane'),function(l,j){l.classList.toggle('on',j==lane&&S.phase=='play'&&!S.lock)});
  if(S.phase=='cal'&&S.cd){var left=3-Math.floor((Date.now()-S.cd)/1000),c=$('frCount');if(c)c.textContent=left>0?left:'';if(left<=0)go()}
  if(S.phase!='play'||S.lock||!n)return;
  var g=geom();if(!g)return;
  var p=Math.min(1,(Date.now()-S.t0)/DUR);
  for(var j=0;j<n;j++){var f=$('frF'+j);if(f)f.style.top=Math.max(g.top,g.top+(g.catchY-f.offsetHeight-g.top)*p)+'px'}
  var bar=$('frBar');if(bar){bar.firstChild.style.transform='scaleX('+(1-p).toFixed(3)+')';bar.classList.toggle('hot',p>0.75)}
  var sec=Math.ceil((1-p)*DUR/1000);if(sec<=5&&sec>0&&sec!==S.beat){S.beat=sec;snd('beat',sec)}
  if(p>=1)catchIt(lane);
 };
 raf=requestAnimationFrame(step);
}

/* ---------- Hứng quả ---------- */
function catchIt(lane){
 if(!S||S.lock)return;S.lock=true;
 var q=S.q,v=S.vals[lane],ok=A.judge(q,v),me=S,f=$('frF'+lane),pe=$('frPet'),fb=$('frFb');
 S.vals.forEach(function(x,j){var e=$('frF'+j);if(!e||j==lane)return;if(A.judge(q,x))e.classList.add('right');else e.classList.add('dim')});
 pe.classList.remove('happy','sad');void pe.offsetWidth;
 if(ok){
  S.basket.push(S.fr[lane]);S.stk++;if(S.stk>S.best)S.best=S.stk;S.xp+=10+2*q.l;
  pe.classList.add('happy');snd('happy');
  var bk=$('frBasket');if(f&&bk){f.classList.add('inbask');var sc=$('frScene').getBoundingClientRect(),br=bk.getBoundingClientRect(),lr=f.parentNode.getBoundingClientRect();f.style.left=(br.left-lr.left+br.width/2)+'px';f.style.top=(br.top-sc.top)+'px'}
  setTimeout(function(){if(S!==me)return;var bd=$('frBasket').querySelector('div');bd.insertAdjacentHTML('beforeend','<i>'+S.fr[lane]+'</i>');$('frScore').textContent=S.fr[lane]+' '+S.basket.length+' quả'},650);
  fb.className='fr-fb good show';fb.innerHTML='✅ Hứng đúng rồi! '+S.fr[lane]+' vào giỏ.';
 }else{
  S.stk=0;pe.classList.add('sad');snd('crash');
  if(f){f.classList.add('rot');setTimeout(function(){if(S!==me||!f.parentNode)return;var sc=$('frScene').getBoundingClientRect(),lr=f.parentNode.getBoundingClientRect();f.classList.add('toss');f.style.left=(sc.right-lr.left-30)+'px';f.style.top=(sc.height-40)+'px'},1000)}
  fb.className='fr-fb bad show';fb.innerHTML='🤢 Quả hỏng rồi, vứt đi thôi! Đáp án đúng: <b>'+esc(A.ansText(q))+'</b>'+(q.e?'<small>'+esc(q.e)+'</small>':'');
 }
 setTimeout(function(){if(S===me&&S.phase=='play'){pe.classList.remove('happy','sad');next()}},ok?2300:(q.e?4200:3000));
}

/* ---------- Kết thúc ---------- */
function end(){
 if(!S)return;var p=S.p,n=S.basket.length,best=n>=8;S.phase='end';
 if(window.DTKSACK&&DTKSACK.gcam)DTKSACK.gcam.stop();cancelAnimationFrame(raf);
 var res=A.award(p.n,{xp:S.xp+(n==N?50:0),streak:S.best,badges:best?['fruit']:[]});
 A.setScreen('result');
 document.getElementById('app').innerHTML=(best?A.confetti(30):'')+'<section class="hero center result'+(best?' win':'')+'"><div class="res-avs">'+AVH(p.e,n>=5?'win':'sad','full')+'</div>'
  +'<h1 class="title sm">'+(n==N?'🏆 GIỎ ĐẦY ẮP!':n>=5?'🧺 THU HOẠCH TỐT!':'🧺 CỐ LÊN NHÉ!')+'</h1>'
  +'<div style="font-size:clamp(28px,6vw,44px);line-height:1.2;margin:6px 0">'+(S.basket.join('')||'🍂')+'</div>'
  +'<p>'+AVH(p.e)+' '+esc(p.n)+' cùng '+S.pet[1].toLowerCase()+' '+S.pet[0]+' hứng được <b>'+n+'/'+N+'</b> quả. Điểm: <b>'+n+'</b>.</p></section>'
  +'<div class="rewards">'+A.rewardHTML(p.n,p.e,res)+'</div><div class="cta"><button class="btn big" data-act="start">↻ Chơi lại</button><button class="btn ghost" data-act="menu">Đổi trò chơi</button></div>';
 if(n>=5)snd('win');else snd('sad');
 A.celebrate([res]);S=null;
}
function stop(){cancelAnimationFrame(raf);if(S&&window.DTKSACK&&DTKSACK.gcam)DTKSACK.gcam.stop();S=null}
function click(a){
 if(a=='frgo'){go();return true}
 if(a=='frquit'){if(confirm('Dừng hứng hoa quả và thoát?')){stop();A.menu()}return true}
 return false;
}
window.addEventListener('resize',function(){if(S)setVh()});
window.DTKFRUIT={start:start,stop:stop,click:click,S:function(){return S},onPos:onPos,catchIt:catchIt,PETS:PETS};
})();
