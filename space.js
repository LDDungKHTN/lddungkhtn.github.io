/* Bảo vệ Trái Đất: chơi đơn, 15 câu hỏi, mỗi câu 15 giây.
   Các đáp án là những thiên thạch lơ lửng (không rơi) phía trên Trái Đất; bên trong thiên thạch đáp án đúng có một sinh vật ngoài hành tinh.
   Người chơi lái tàu vũ trụ ở phía dưới (bước sang trái / phải trước camera, hoặc chạm, kéo, phím ← →),
   dừng tàu dưới một thiên thạch đủ 5 giây thì tàu bắn tia laser vào thiên thạch đó.
   – Đúng: thiên thạch vỡ, lộ ra sinh vật ngoài hành tinh và nó bị tiêu diệt.
   – Sai: chỉ thiên thạch đã chọn vỡ; sinh vật trong thiên thạch đáp án đúng chui ra tấn công Trái Đất.
   Khi hết giờ (còn dưới 5 giây thì không kịp giữ đủ 5 giây) tàu dừng ở đâu thì bắn vào thiên thạch ở đó.
   Trái Đất có 3 lớp khiên: bị tấn công quá 3 lần (lần thứ 4) là thua. Camera dùng bộ nhận dạng chung trong sack.js. */
(function(){
var A=window.DTKAPI;if(!A)return;
var N=15,DUR=15000,HOLD=5000,MAXHIT=3,esc=A.esc,shuf=A.shuf,S=null,raf=0;
function $(id){return document.getElementById(id)}
function snd(f,a){if(window.SND&&SND[f])SND[f](a)}
function setVh(){document.documentElement.style.setProperty('--vh',window.innerHeight+'px')}

/* ================= HÌNH VẼ (SVG) ================= */
/* Tàu con thoi: thùng nhiên liệu màu cam phía sau, thân tàu trắng có cánh tam giác, hai tên lửa đẩy hai bên, lửa phụt phía dưới */
function shipSVG(){
 return '<svg viewBox="0 0 120 170" class="sp-svg" aria-hidden="true"><defs>'
 +'<linearGradient id="spTank" x1="0" x2="1"><stop offset="0" stop-color="#A9521A"/><stop offset=".45" stop-color="#F08A2E"/><stop offset="1" stop-color="#9A4615"/></linearGradient>'
 +'<linearGradient id="spWhite" x1="0" x2="1"><stop offset="0" stop-color="#B9C2CC"/><stop offset=".5" stop-color="#FFFFFF"/><stop offset="1" stop-color="#AEB7C2"/></linearGradient>'
 +'<radialGradient id="spFire" cx=".5" cy=".2" r=".8"><stop offset="0" stop-color="#FFFDE0"/><stop offset=".35" stop-color="#FFD23F"/><stop offset=".75" stop-color="#FF7A1A"/><stop offset="1" stop-color="#FF3D00" stop-opacity="0"/></radialGradient></defs>'
 /* Lửa */
 +'<g class="sp-fire"><ellipse cx="60" cy="150" rx="9" ry="18" fill="url(#spFire)"/><ellipse cx="27" cy="150" rx="6" ry="14" fill="url(#spFire)"/><ellipse cx="93" cy="150" rx="6" ry="14" fill="url(#spFire)"/></g>'
 /* Thùng nhiên liệu cam */
 +'<path d="M44 40 Q44 6 60 2 Q76 6 76 40 V118 H44Z" fill="url(#spTank)"/><path d="M44 30 H76" stroke="#1E3A8A" stroke-width="2"/>'
 /* Cánh tam giác */
 +'<path d="M48 70 L8 112 Q6 120 14 121 L106 121 Q114 120 112 112 L72 70Z" fill="url(#spWhite)" stroke="#5B6573" stroke-width="1.5"/>'
 +'<path d="M12 117 H108" stroke="#2B2F36" stroke-width="3"/>'
 /* Thân tàu trắng */
 +'<path d="M48 46 Q48 26 60 20 Q72 26 72 46 V118 H48Z" fill="url(#spWhite)" stroke="#5B6573" stroke-width="1.5"/>'
 +'<circle cx="60" cy="40" r="5" fill="#2B3440" stroke="#8C96A3" stroke-width="2"/>'
 +'<path d="M49 62 H71 M49 84 H71 M49 104 H71" stroke="#8C96A3" stroke-width="1.2"/><rect x="55" y="66" width="10" height="14" rx="2" fill="#C9D1DA"/>'
 /* Động cơ chính */
 +'<path d="M52 118 H68 L66 132 H54Z" fill="#6B7380"/><path d="M53 122 H67 M53 126 H67" stroke="#3A414B" stroke-width="1.2"/>'
 /* Hai tên lửa đẩy */
 +[27,93].map(function(x){return '<path d="M'+(x-7)+' 42 Q'+(x-7)+' 26 '+x+' 18 Q'+(x+7)+' 26 '+(x+7)+' 42 V128 H'+(x-7)+'Z" fill="url(#spWhite)" stroke="#5B6573" stroke-width="1.5"/>'
  +'<path d="M'+(x-7)+' 42 Q'+(x-7)+' 26 '+x+' 18 Q'+(x+7)+' 26 '+(x+7)+' 42Z" fill="#E0701F"/>'
  +'<path d="M'+(x-7)+' 60 H'+(x+7)+' M'+(x-7)+' 84 H'+(x+7)+' M'+(x-7)+' 106 H'+(x+7)+'" stroke="#2B2F36" stroke-width="2"/>'
  +'<path d="M'+(x-8)+' 128 H'+(x+8)+' L'+(x+5)+' 136 H'+(x-5)+'Z" fill="#6B7380"/>'}).join('')
 +'</svg>';
}
/* Thiên thạch: khối đá xù xì có miệng hố */
function rockSVG(seed){
 var pts=[],n=11;for(var i=0;i<n;i++){var a=i/n*Math.PI*2,r=40+((seed*7+i*13)%9)-2;pts.push((50+Math.cos(a)*r).toFixed(1)+','+(50+Math.sin(a)*r*0.9).toFixed(1))}
 return '<svg viewBox="0 0 100 100" class="sp-svg" aria-hidden="true"><defs><radialGradient id="spRk'+seed+'" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#9C8E80"/><stop offset=".6" stop-color="#5E544B"/><stop offset="1" stop-color="#2E2924"/></radialGradient></defs>'
 +'<polygon points="'+pts.join(' ')+'" fill="url(#spRk'+seed+')" stroke="#241F1B" stroke-width="2"/>'
 +'<circle cx="38" cy="36" r="8" fill="#4A4239" stroke="#2A241F" stroke-width="1.5"/><circle cx="62" cy="58" r="11" fill="#4A4239" stroke="#2A241F" stroke-width="1.5"/>'
 +'<circle cx="34" cy="64" r="5" fill="#4A4239"/><circle cx="66" cy="30" r="4" fill="#4A4239"/><circle cx="52" cy="46" r="3" fill="#4A4239"/></svg>';
}
/* Sinh vật ngoài hành tinh: khối nhớt xanh lá, đầu tròn, mắt đen to, nhiều xúc tu */
function alienSVG(){
 return '<svg viewBox="0 0 120 120" class="sp-svg" aria-hidden="true"><defs><radialGradient id="spSlime" cx=".4" cy=".3" r=".8"><stop offset="0" stop-color="#B6FF6A"/><stop offset=".55" stop-color="#3FD13A"/><stop offset="1" stop-color="#159A2A"/></radialGradient></defs>'
 +'<ellipse cx="60" cy="104" rx="46" ry="11" fill="#2FB838"/>'
 +'<path d="M30 70 Q8 74 12 54 Q16 40 26 50 Q20 58 28 60" stroke="#35C43A" stroke-width="8" fill="none" stroke-linecap="round"/>'
 +'<path d="M90 70 Q112 74 108 54 Q104 40 94 50 Q100 58 92 60" stroke="#35C43A" stroke-width="8" fill="none" stroke-linecap="round"/>'
 +'<path d="M36 66 Q30 92 22 104 M48 70 Q46 96 42 106 M60 72 V108 M72 70 Q74 96 78 106 M84 66 Q90 92 98 104" stroke="#35C43A" stroke-width="10" fill="none" stroke-linecap="round"/>'
 +'<ellipse cx="60" cy="44" rx="32" ry="34" fill="url(#spSlime)"/>'
 +'<ellipse cx="46" cy="46" rx="10" ry="14" transform="rotate(20 46 46)" fill="#0E1A12"/><ellipse cx="74" cy="46" rx="10" ry="14" transform="rotate(-20 74 46)" fill="#0E1A12"/>'
 +'<ellipse cx="43" cy="40" rx="3" ry="4" fill="#fff" opacity=".8"/><ellipse cx="71" cy="40" rx="3" ry="4" fill="#fff" opacity=".8"/>'
 +'<ellipse cx="60" cy="66" rx="3" ry="4.5" fill="#0E1A12"/>'
 +'<circle cx="48" cy="22" r="3" fill="#D9FFB0" opacity=".7"/><circle cx="20" cy="30" r="6" fill="#4BE04A"/><circle cx="102" cy="24" r="5" fill="#4BE04A"/></svg>';
}
function alienIcon(){return '<span style="display:inline-block;width:30px;height:30px;vertical-align:middle">'+alienSVG()+'</span>'}

var CSS=''
+'body[data-game=space] .top,body[data-game=space] .seo,body[data-game=space] .site-footer,body[data-game=space] .sky{display:none}'
+'body[data-game=space] main#app{max-width:none;padding:0;margin:0}'
+'.sp-svg{width:100%;height:100%;display:block;overflow:visible}'
+'.sp{display:flex;flex-direction:column;height:var(--vh,100vh);padding:6px;gap:6px;box-sizing:border-box;color:#fff}'
+'.sp-hud{display:flex;align-items:center;gap:8px;flex-wrap:wrap;font-weight:700}.sp-hud .gname{font-size:18px;margin-right:auto}'
+'.sp-pill{background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.3);border-radius:999px;padding:3px 10px;font-size:14px;white-space:nowrap}'
+'.sp-pill.hit{background:rgba(255,80,80,.45);animation:spshake .5s}'
+'.sp-scene{position:relative;flex:1;min-height:0;display:flex;flex-direction:column;border-radius:16px;overflow:hidden;user-select:none;-webkit-user-select:none;'
+' background:radial-gradient(1px 1px at 12% 20%,#fff,transparent),radial-gradient(1.5px 1.5px at 32% 64%,#fff,transparent),radial-gradient(1px 1px at 52% 12%,#fff,transparent),radial-gradient(2px 2px at 72% 42%,#cfe3ff,transparent),radial-gradient(1px 1px at 88% 18%,#fff,transparent),radial-gradient(1.5px 1.5px at 8% 52%,#fff,transparent),radial-gradient(1px 1px at 64% 78%,#fff,transparent),radial-gradient(1px 1px at 42% 36%,#fff,transparent),radial-gradient(1.5px 1.5px at 94% 66%,#fff,transparent),radial-gradient(ellipse 50% 40% at 80% 10%,rgba(120,80,255,.35),transparent 70%),linear-gradient(#03041a,#0a1240 60%,#122060)}'
+'.sp-q{position:relative;z-index:6;margin:8px 8px 0;background:rgba(14,22,70,.92);border:2px solid #8fb8ff;border-radius:14px;padding:6px 12px 8px;box-shadow:0 6px 16px rgba(0,0,0,.4);flex:none}'
+'.sp-q small{color:#cfe3ff;display:flex;align-items:center;gap:6px;flex-wrap:wrap;font-size:clamp(13px,1.4vw,16px)}.sp-q p{margin:3px 0 5px;font-weight:800;font-size:clamp(20px,3.1vw,34px);line-height:1.25}'
+'.sp-bar{height:7px;border-radius:9px;background:rgba(255,255,255,.2);overflow:hidden}.sp-bar i{display:block;height:100%;width:100%;background:linear-gradient(90deg,#7CFFEA,#FFD23F);transform-origin:left}.sp-bar.hot i{background:#FF6B6B}'
+'.sp-field{position:relative;flex:1;min-height:0;touch-action:none;overflow:hidden}'
/* Trái Đất ở đáy màn hình, có lớp khiên phát sáng */
+'.sp-earth{position:absolute;left:-25%;right:-25%;bottom:calc(-1 * min(60vw,90vh));height:calc(min(60vw,90vh) + 16%);border-radius:50% 50% 0 0/40% 40% 0 0;z-index:1;'
+' background:radial-gradient(ellipse 18% 10% at 40% 8%,rgba(60,170,80,.9),transparent 70%),radial-gradient(ellipse 14% 7% at 66% 6%,rgba(70,160,70,.85),transparent 70%),radial-gradient(ellipse 22% 8% at 22% 12%,rgba(255,255,255,.5),transparent 70%),linear-gradient(#5ec8ff,#1f6fd1 30%,#0b3a8a);'
+' box-shadow:0 -6px 30px rgba(120,200,255,.8),inset 0 10px 30px rgba(255,255,255,.35);transition:filter .3s}'
+'.sp-earth.s3{box-shadow:0 -6px 30px rgba(120,200,255,.8),0 -14px 0 2px rgba(110,240,255,.35),0 -26px 0 2px rgba(110,240,255,.22),0 -38px 0 2px rgba(110,240,255,.14),inset 0 10px 30px rgba(255,255,255,.35)}'
+'.sp-earth.s2{box-shadow:0 -6px 30px rgba(120,200,255,.8),0 -14px 0 2px rgba(110,240,255,.35),0 -26px 0 2px rgba(110,240,255,.22),inset 0 10px 30px rgba(255,255,255,.35)}'
+'.sp-earth.s1{box-shadow:0 -6px 30px rgba(120,200,255,.8),0 -14px 0 2px rgba(110,240,255,.35),inset 0 10px 30px rgba(255,255,255,.35)}'
+'.sp-earth.hurt{animation:spshake .6s;filter:sepia(.6) hue-rotate(-40deg) saturate(3)}'
+'.sp-lanes{position:absolute;inset:0;display:flex;z-index:2}'
+'.sp-lane{flex:1;position:relative;border-left:2px dashed rgba(160,200,255,.18)}.sp-lane:first-child{border-left:0}'
+'.sp-lane.on{background:linear-gradient(rgba(120,220,255,.16),transparent 75%)}'
/* Thiên thạch lơ lửng, vòng tròn tiến độ giữ 5 giây */
+'.sp-rock{position:absolute;left:50%;top:6%;transform:translateX(-50%);width:calc(100% - 8px);max-width:300px;display:flex;flex-direction:column;align-items:center;gap:4px}'
+'.sp-rock .rk{position:relative;width:clamp(60px,13vh,120px);height:clamp(60px,13vh,120px);animation:spfloat 3.2s ease-in-out infinite}'
+'.sp-lane:nth-child(2) .rk{animation-delay:-.8s}.sp-lane:nth-child(3) .rk{animation-delay:-1.6s}.sp-lane:nth-child(4) .rk{animation-delay:-2.4s}'
+'.sp-rock .rk>svg{transition:transform .4s,opacity .4s}'
+'.sp-rock .ring{position:absolute;display:block;left:-9px;top:-9px;width:calc(100% + 18px)!important;height:calc(100% + 18px)!important;margin:0;padding:0;border-radius:50%;background:conic-gradient(#7CFFEA calc(var(--p,0)*1turn),rgba(255,255,255,.08) 0);-webkit-mask:radial-gradient(farthest-side,transparent calc(100% - 7px),#000 calc(100% - 6px));mask:radial-gradient(farthest-side,transparent calc(100% - 7px),#000 calc(100% - 6px));opacity:0;transition:opacity .2s}'
+'.sp-lane.on .ring{opacity:1}'
+'.sp-rock .al{position:absolute;inset:6%;opacity:0;transform:scale(.3);transition:transform .45s,opacity .45s}'
+'.sp-rock>span{background:#fff;color:#14204a;border-radius:12px;padding:4px 8px;font-weight:800;font-size:clamp(16px,2.3vw,28px);line-height:1.18;text-align:center;box-shadow:0 3px 8px rgba(0,0,0,.35);border:2px solid #14204a;display:-webkit-box;-webkit-line-clamp:5;-webkit-box-orient:vertical;overflow:hidden;max-width:100%}'
+'.sp-rock b{position:absolute;left:-2px;top:-4px;z-index:2;background:#7c3aed;color:#fff;border-radius:50%;width:28px;height:28px;font-size:16px;display:flex;align-items:center;justify-content:center}'
+'.sp-rock.dim{opacity:.25;transition:opacity .5s}'
+'.sp-rock.right span{background:#4BE38D}'
+'.sp-rock.blast .rk>svg{transform:scale(1.6) rotate(25deg);opacity:0}'
+'.sp-rock.blast .rk::after{content:"💥";position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:clamp(50px,11vh,100px);animation:spboom .7s forwards}'
+'.sp-rock.reveal .al{opacity:1;transform:scale(1)}'
+'.sp-rock.zap .al{animation:spzap 1s .55s forwards}'
+'@keyframes spfloat{50%{transform:translateY(-9px) rotate(4deg)}}'
+'@keyframes spboom{0%{transform:scale(.3);opacity:1}70%{opacity:1}100%{transform:scale(1.5);opacity:0}}'
+'@keyframes spzap{0%{filter:none}30%{filter:brightness(3) drop-shadow(0 0 14px #7CFFEA)}100%{transform:scale(.1) rotate(90deg);opacity:0;filter:brightness(3)}}'
+'@keyframes spshake{20%,60%{transform:translateX(-8px)}40%,80%{transform:translateX(8px)}}'
/* Sinh vật lao xuống tấn công Trái Đất */
+'.sp-atk{position:absolute;z-index:7;width:clamp(56px,11vh,100px);height:clamp(56px,11vh,100px);transform:translate(-50%,-50%);transition:left 1.3s ease-in,top 1.3s ease-in,transform 1.3s ease-in;pointer-events:none}'
+'.sp-atk.go{transform:translate(-50%,-50%) scale(1.5) rotate(-10deg)}'
/* Tàu vũ trụ */
+'.sp-ship{position:absolute;bottom:9%;left:50%;z-index:5;width:clamp(70px,14vh,130px);height:calc(clamp(70px,14vh,130px)*1.42);transform:translateX(-50%);pointer-events:none}'
+'.sp-ship .body{width:100%;height:100%;filter:drop-shadow(0 0 10px rgba(120,200,255,.45));transition:transform .15s;transform-origin:50% 80%}'
+'.sp-fire{animation:spflame .12s infinite alternate;transform-origin:60px 132px}@keyframes spflame{to{transform:scaleY(1.25)}}'
+'.sp-ship.fire .body{animation:sprecoil .3s}@keyframes sprecoil{40%{transform:translateY(8%)}}'
/* Tia laser */
+'.sp-laser{position:absolute;z-index:4;width:8px;margin-left:-4px;border-radius:4px;background:linear-gradient(#fff,#7CFFEA 30%,#00E5FF);box-shadow:0 0 12px #00E5FF,0 0 26px #00E5FF;transform-origin:bottom;animation:splaser .45s forwards;pointer-events:none}'
+'@keyframes splaser{0%{transform:scaleY(0);opacity:1}40%{transform:scaleY(1);opacity:1}100%{transform:scaleY(1);opacity:0}}'
+'.sp-fb{position:absolute;left:50%;top:46%;transform:translate(-50%,-50%);z-index:8;background:rgba(10,16,60,.94);border:2px solid #fff;border-radius:14px;padding:8px 14px;font-weight:800;font-size:clamp(14px,2.1vw,20px);text-align:center;width:max-content;max-width:88%;display:none}'
+'.sp-fb.show{display:block;animation:sppop .35s}.sp-fb.good{border-color:#4BE38D}.sp-fb.bad{border-color:#FF6B6B}.sp-fb small{display:block;font-weight:500;font-size:13px;color:#e6ecff;margin-top:4px}'
+'@keyframes sppop{0%{transform:translate(-50%,-50%) scale(1.6)}100%{transform:translate(-50%,-50%)}}'
+'.sp-cam{position:absolute!important;top:auto;bottom:8px;right:8px;z-index:6;opacity:.92;width:min(28%,180px);height:auto!important;aspect-ratio:4/3;border-width:2px;border-radius:10px}.sp-cam .gc-msg{font-size:11px;padding:3px 5px}'
+'.sp-cal{position:absolute;inset:0;z-index:9;display:flex;align-items:center;justify-content:center;background:rgba(5,8,40,.6)}'
+'.sp-cal>div{background:#141c58;border:2px solid #8fb8ff;border-radius:16px;padding:14px 18px;max-width:min(92%,540px);text-align:center;display:flex;flex-direction:column;gap:8px}'
+'.sp-cal big{font-size:46px;font-weight:800;color:#FFD23F}.sp-cal p{margin:0}'
+'@media(max-height:540px) and (orientation:landscape){.sp-q{padding:4px 10px}.sp-q p{font-size:18px}.sp-rock span{font-size:15px}.sp-rock .rk{width:52px;height:52px}.sp-cam{width:min(24%,130px)}}'
+'@media(prefers-reduced-motion:reduce){.sp-rock .rk,.sp-fire{animation:none}}';
function css(){var o=$('spCss');if(o)o.remove();var s=document.createElement('style');s.id='spCss';s.textContent=CSS;document.head.appendChild(s)}

/* ================= BẮT ĐẦU ================= */
function start(){
 stop();css();
 var r=A.roster(),st=A.st;
 if(st.sel.length!=1)return alert('Hãy chọn 1 thí sinh.');
 var P=A.pool().filter(function(q){return q.t=='mc'||q.t=='tf'});
 if(P.length<N)return alert('Phạm vi này chưa đủ '+N+' câu trắc nghiệm, đúng/sai. Hãy chọn phạm vi rộng hơn.');
 var qs=A.fresh(P).slice(0,N).sort(function(a,b){return a.l-b.l}).map(A.prep);
 var cam=st.spcam!==false&&!!(window.DTKSACK&&DTKSACK.gcam);
 S={qs:qs,i:-1,p:r[st.sel[0]],tx:.5,ax:.5,n:0,lane:-1,kill:0,hits:0,xp:0,stk:0,best:0,seen:0,cam:cam,phase:'cal',lock:true};
 A.setScreen('play');document.body.setAttribute('data-game','space');setVh();
 document.getElementById('app').innerHTML='<div class="sp">'
  +'<div class="sp-hud"><button class="btn ghost sm" data-act="spquit" aria-label="Thoát">✕</button><span class="gname">🚀 Bảo vệ Trái Đất</span>'
  +'<span class="sp-pill" id="spNo">Câu 0/'+N+'</span><span class="sp-pill" id="spKill">👾 Tiêu diệt: 0</span><span class="sp-pill" id="spLife">'+lifeTxt()+'</span>'
  +'<button class="btn ghost sm" data-act="snd" aria-label="Bật hoặc tắt âm thanh">'+(window.SND&&!SND.isOn()?'🔇':'🔊')+'</button></div>'
  +'<div class="sp-scene" id="spScene">'
  +'<div class="sp-q" id="spQ"><small>'+AVH(S.p.e)+' '+esc(S.p.n)+' – phi công tàu vũ trụ</small><p>Chuẩn bị cất cánh!</p><div class="sp-bar" id="spBar"><i></i></div></div>'
  +'<div class="sp-field" id="spField"><div class="sp-earth s3" id="spEarth"></div><div class="sp-lanes" id="spL"></div>'
  +'<div class="sp-ship" id="spShip"><div class="body">'+shipSVG()+'</div></div>'
  +(cam?'<div class="gc-box sp-cam" id="spC"><video playsinline muted autoplay></video><canvas></canvas><div class="gc-msg"></div></div>':'')
  +'<div class="sp-fb" id="spFb" role="status"></div></div>'
  +'<div class="sp-cal" id="spCal"><div><h3 style="margin:0">🚀 Bảo vệ Trái Đất!</h3>'
  +'<p>Sinh vật ngoài hành tinh '+alienIcon()+' đang nấp trong thiên thạch mang <b>đáp án đúng</b>.</p>'
  +(cam?'<p id="spCalMsg">📷 Đang mở camera…</p><small>Đứng cách camera khoảng 2 m. Bước sang trái, sang phải để lái tàu. Dừng tàu dưới thiên thạch đủ <b>5 giây</b> để bắn laser.</small>'
   :'<p>Chạm hoặc kéo trên sân, hoặc dùng phím ← → để lái tàu.</p><small>Dừng tàu dưới thiên thạch đủ <b>5 giây</b> để bắn laser.</small>')
  +'<small>'+N+' câu, mỗi câu 15 giây. Chọn sai, sinh vật sẽ tấn công Trái Đất – Trái Đất có 3 lớp khiên, bị tấn công quá 3 lần là thua.</small>'
  +'<big id="spCount"></big><button class="btn" data-act="spgo">▶ Bắt đầu</button></div></div>'
  +'</div></div>';
 bindPointer();
 if(cam)camStart();
 loop();
}
function lifeTxt(){var h=S?S.hits:0,a='';for(var i=0;i<MAXHIT;i++)a+=i<MAXHIT-h?'🛡️':'💔';return '🌍 '+(h>MAXHIT?'💥':a)}

/* ================= ĐIỀU KHIỂN ================= */
function posOf(lm){if(!lm||!lm[11]||!lm[12])return null;var v=function(p){return p.visibility==null||p.visibility>0.4};if(!v(lm[11])||!v(lm[12]))return null;return (lm[11].x+lm[12].x)/2}
function msgCal(t){var m=$('spCalMsg');if(m)m.textContent=t}
function camStart(){
 var me=S;
 DTKSACK.gcam.start($('spC'),function(x,now){onPos(x,now)},posOf,{any:true}).then(function(ok){
  if(S!==me)return;if(!ok){S.cam=false;msgCal('Không dùng được camera – chạm, kéo hoặc dùng phím ← → để lái tàu.')}else msgCal('🧍 Bước vào khung hình…');
 });
}
function onPos(x,now){
 if(!S)return;
 if(x==null){S.seen=0;return}
 var mx=DTKSACK.gcam.face()=='user'?1-x:x;S.tx=Math.max(0,Math.min(1,(mx-0.18)/0.64));
 if(S.phase=='cal'){
  if(!S.seen)S.seen=now;
  if(now-S.seen>1200&&!S.cd){S.cd=Date.now();msgCal('✅ Máy đã nhận ra em! Cất cánh sau…')}
  else if(!S.cd)msgCal('👀 Đang nhận diện… đứng yên một chút');
 }
}
/* Vị trí ngang của tàu (phần trăm bề rộng sân) theo giá trị điều khiển 0–1 */
function shipPct(ax){return 4+ax*92}
function laneOf(ax,n){return n?Math.max(0,Math.min(n-1,Math.floor(shipPct(ax)/100*n))):-1}
function toLane(j,n){return Math.max(0,Math.min(1,((j+.5)/n*100-4)/92))}
function bindPointer(){
 var h=$('spField');if(!h)return;var drag=false;
 var set=function(e){if(!S||e.target.closest('button,select'))return;var r=h.getBoundingClientRect();S.tx=Math.max(0,Math.min(1,((e.clientX-r.left)/r.width*100-4)/92))};
 h.addEventListener('pointerdown',function(e){drag=true;set(e)});
 h.addEventListener('pointermove',function(e){if(drag||e.pointerType=='mouse'&&e.buttons)set(e)});
 h.addEventListener('pointerup',function(){drag=false});h.addEventListener('pointerleave',function(){drag=false});
}
document.addEventListener('keydown',function(e){
 if(!S||!$('spScene'))return;if(e.key!='ArrowLeft'&&e.key!='ArrowRight')return;e.preventDefault();
 var n=S.n||4,j=Math.max(0,Math.min(n-1,laneOf(S.tx,n)+(e.key=='ArrowLeft'?-1:1)));S.tx=toLane(j,n);
});
function go(){if(!S||S.phase!='cal')return;var c=$('spCal');if(c)c.remove();S.phase='play';snd('tap');next()}

/* ================= CÂU HỎI ================= */
function next(){
 if(!S)return;S.i++;
 if(S.i>=S.qs.length)return end();
 S.lock=false;S.t0=Date.now();S.beat=0;S.dw=null;
 $('spNo').textContent='Câu '+(S.i+1)+'/'+N;
 var q=S.q=S.qs[S.i],labels=q.t=='tf'?['Đúng','Sai']:q.o.slice(),n=S.n=labels.length;
 S.vals=q.t=='tf'?['1','0']:labels.map(function(x,j){return String(j)});
 var qv=Object.assign({},q,{o:labels,nol:1});
 $('spQ').innerHTML='<small>'+esc(q.c)+' – '+A.LVN[q.l-1]+(q.t=='tf'?' · Đúng hay sai?':'')+(A.sayB?' '+A.sayB(qv,'sp'):'')+'</small><p>'+esc(q.q)+'</p><div class="sp-bar" id="spBar"><i></i></div>';
 var seed=Math.floor(Math.random()*90);
 $('spL').innerHTML=labels.map(function(t,j){return '<div class="sp-lane" data-l="'+j+'"><div class="sp-rock" id="spR'+j+'"><b>'+'ABCD'[j]+'</b><div class="rk"><i class="ring"></i>'+rockSVG(seed+j*17)+(A.judge(q,S.vals[j])?'<div class="al">'+alienSVG()+'</div>':'')+'</div><span>'+esc(t)+'</span></div></div>'}).join('');
 $('spFb').className='sp-fb';
 if(A.sayAuto)A.sayAuto(qv);
}
function loop(){
 cancelAnimationFrame(raf);
 var step=function(){
  if(!S||!$('spScene'))return;raf=requestAnimationFrame(step);
  var now=Date.now(),p=S.phase=='play'&&!S.lock?Math.min(1,(now-S.t0)/DUR):0;
  /* Tàu bay theo vị trí người chơi, nghiêng theo hướng bay */
  var d=S.tx-S.ax;S.ax+=d*0.2;var sh=$('spShip');
  if(sh){sh.style.left=shipPct(S.ax)+'%';var bd=sh.querySelector('.body');if(bd&&!sh.classList.contains('fire'))bd.style.transform='rotate('+Math.max(-12,Math.min(12,d*80))+'deg)'}
  var lane=laneOf(S.ax,S.n);S.lane=lane;
  var ls=$('spL');if(ls)[].forEach.call(ls.children,function(l,j){l.classList.toggle('on',j==lane&&S.phase=='play'&&!S.lock)});
  if(S.phase=='cal'&&S.cd){var left=3-Math.floor((now-S.cd)/1000),c=$('spCount');if(c)c.textContent=left>0?left:'';if(left<=0)go()}
  if(S.phase!='play'||S.lock||!S.n)return;
  /* Giữ tàu dưới cùng một thiên thạch đủ 5 giây thì bắn */
  /* Chỉ đếm khi tàu nằm gần giữa thiên thạch (không đếm khi đứng ở ranh giới hai ô) */
  var w=100/S.n,mid=Math.abs(shipPct(S.ax)-(lane+.5)*w)<0.36*w;
  if(!S.dw||S.dw.lane!==lane||!mid)S.dw={lane:lane,t:now};
  var hp=Math.min(1,(now-S.dw.t)/HOLD);
  [].forEach.call(ls.children,function(l,j){var rg=l.querySelector('.ring');if(rg)rg.style.setProperty('--p',j==lane?hp.toFixed(3):0)});
  var bar=$('spBar');if(bar){bar.firstChild.style.transform='scaleX('+(1-p).toFixed(3)+')';bar.classList.toggle('hot',p>0.66)}
  var sec=Math.ceil((1-p)*DUR/1000);if(sec<=5&&sec>0&&sec!==S.beat){S.beat=sec;snd('beat',sec)}
  if(hp>=1||p>=1)fire(lane);
 };
 raf=requestAnimationFrame(step);
}

/* ================= BẮN LASER ================= */
function fire(lane){
 if(!S||S.lock)return;S.lock=true;
 var me=S,q=S.q,ok=A.judge(q,S.vals[lane]),field=$('spField'),sh=$('spShip'),rk=$('spR'+lane),fb=$('spFb');
 var good=-1;S.vals.forEach(function(v,j){if(A.judge(q,v))good=j});
 if(!ok){S.stk=0;S.hits++}
 /* Tia laser từ mũi tàu tới thiên thạch */
 var fr=field.getBoundingClientRect(),sr=sh.getBoundingClientRect(),rr=rk.querySelector('.rk').getBoundingClientRect();
 var x=sr.left+sr.width/2-fr.left,y1=rr.top+rr.height/2-fr.top,y2=sr.top+sr.height*0.12-fr.top;
 var lz=document.createElement('div');lz.className='sp-laser';lz.style.left=x+'px';lz.style.top=y1+'px';lz.style.height=Math.max(10,y2-y1)+'px';field.appendChild(lz);
 sh.classList.remove('fire');void sh.offsetWidth;sh.classList.add('fire');snd('zap');
 setTimeout(function(){if(lz.parentNode)lz.remove()},600);
 S.vals.forEach(function(v,j){if(j!=lane&&j!=good){var e=$('spR'+j);if(e)e.classList.add('dim')}});
 setTimeout(function(){
  if(S!==me)return;
  rk.classList.add('blast');snd('crash');
  if(ok){
   /* Đúng: lộ sinh vật và tiêu diệt nó */
   rk.classList.add('reveal','zap','right');S.kill++;S.stk++;if(S.stk>S.best)S.best=S.stk;S.xp+=10+2*q.l;
   $('spKill').textContent='👾 Tiêu diệt: '+S.kill;
   setTimeout(function(){if(S===me)snd('happy')},600);
   fb.className='sp-fb good show';fb.innerHTML='🎯 Chính xác! Sinh vật ngoài hành tinh đã bị tiêu diệt.';
  }else{
   /* Sai: chỉ thiên thạch vỡ; sinh vật ở thiên thạch đáp án đúng chui ra lao xuống Trái Đất */
   var gr=$('spR'+good);
   setTimeout(function(){
    if(S!==me||!gr)return;
    gr.classList.add('blast','reveal','right');snd('crash');
    var gb=gr.querySelector('.rk').getBoundingClientRect(),f2=field.getBoundingClientRect(),eb=$('spEarth').getBoundingClientRect();
    var al=gr.querySelector('.al');if(al)al.style.opacity='0';
    var at=document.createElement('div');at.className='sp-atk';at.innerHTML=alienSVG();
    at.style.left=(gb.left+gb.width/2-f2.left)+'px';at.style.top=(gb.top+gb.height/2-f2.top)+'px';field.appendChild(at);void at.offsetWidth;
    at.classList.add('go');at.style.left=(gb.left+gb.width/2-f2.left)+'px';at.style.top=(eb.top-f2.top+10)+'px';
    setTimeout(function(){
     if(S!==me)return;at.remove();var e=$('spEarth');e.className='sp-earth hurt s'+Math.max(0,MAXHIT-S.hits);snd('sad');
     var lf=$('spLife');lf.textContent=lifeTxt();lf.classList.remove('hit');void lf.offsetWidth;lf.classList.add('hit');
     setTimeout(function(){if(S===me)e.classList.remove('hurt')},700);
    },1300);
   },650);
   fb.className='sp-fb bad show';fb.innerHTML='💥 Bắn trượt! Sinh vật ngoài hành tinh đang tấn công Trái Đất!<br>Đáp án đúng: <b>'+esc(A.ansText(q))+'</b>'+(q.e?'<small>'+esc(q.e)+'</small>':'');
  }
 },350);
 var lost=!ok&&S.hits>MAXHIT,last=S.i+1>=S.qs.length;
 setTimeout(function(){if(S!==me||S.phase!='play')return;sh.classList.remove('fire');if(lost||last)end();else next()},ok?2600:(q.e?4800:3800));
}

/* ================= KẾT THÚC ================= */
function end(){
 if(!S)return;var me=S;S.phase='end';
 if(window.DTKSACK&&DTKSACK.gcam)DTKSACK.gcam.stop();cancelAnimationFrame(raf);
 var win=S.hits<=MAXHIT,res=A.award(S.p.n,{xp:S.xp+(win?40:0)+(win&&S.hits==0?30:0),streak:S.best,badges:win?['space']:[]});
 A.setScreen('result');
 var head=!win?'💥 TRÁI ĐẤT ĐÃ THẤT THỦ!':S.hits==0?'🏆 TRÁI ĐẤT AN TOÀN TUYỆT ĐỐI!':'🛡️ BẢO VỆ TRÁI ĐẤT THÀNH CÔNG!';
 var body='<div style="display:flex;gap:16px;justify-content:center;align-items:center;flex-wrap:wrap"><div style="width:90px;height:128px">'+shipSVG()+'</div><div style="width:90px;height:90px">'+alienSVG()+'</div></div>'
  +'<p><b>'+AVH(S.p.e)+' '+esc(S.p.n)+'</b></p>'
  +'<p>Tiêu diệt <b>'+S.kill+'</b> sinh vật ngoài hành tinh'+(win?' qua '+N+' câu':' sau '+(S.i+1)+' câu')+'. Trái Đất bị tấn công <b>'+S.hits+'</b> lần.</p>';
 document.getElementById('app').innerHTML=(win?A.confetti(30):'')+'<section class="hero center result'+(win?' win':'')+'"><h1 class="title sm">'+head+'</h1>'+body+'</section>'
  +'<div class="rewards">'+A.rewardHTML(S.p.n,S.p.e,res)+'</div><div class="cta"><button class="btn big" data-act="start">↻ Chơi lại</button><button class="btn ghost" data-act="menu">Đổi trò chơi</button></div>';
 snd(win?'win':'sad');A.celebrate([res]);S=null;
}
function stop(){cancelAnimationFrame(raf);if(S&&window.DTKSACK&&DTKSACK.gcam)DTKSACK.gcam.stop();S=null}
function click(a){
 if(a=='spgo'){go();return true}
 if(a=='spquit'){if(confirm('Dừng trò Bảo vệ Trái Đất và thoát?')){stop();A.menu()}return true}
 return false;
}
window.addEventListener('resize',function(){if(S)setVh()});
window.DTKSPACE={start:start,stop:stop,click:click,S:function(){return S},onPos:onPos,fire:fire,shipSVG:shipSVG,alienSVG:alienSVG};
})();
