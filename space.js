/* Bảo vệ Trái Đất: chơi đơn (15 câu), đối kháng 2 phe chia đôi màn hình (15 câu, câu hỏi hai bên khác nhau) hoặc 2 đội theo lượt (tối đa 20 câu); mỗi câu 15 giây.
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
/* Thêm: chia đôi sân (đối kháng), khung câu hỏi riêng mỗi phe, nền sao chuyển động như tàu đang lao đi truy đuổi */
CSS+=''
+'.sp-scene{background:radial-gradient(ellipse 50% 40% at 80% 10%,rgba(120,80,255,.35),transparent 70%),linear-gradient(#03041a,#0a1240 60%,#122060)}'
+'.sp-stars{position:absolute;inset:0;z-index:0;pointer-events:none;overflow:hidden}'
+'.sp-stars i{position:absolute;left:0;right:0;top:-100%;height:200%;display:block}'
+'.sp-stars .s1{background-image:radial-gradient(1px 1px at 10% 10%,#fff,transparent),radial-gradient(1px 1px at 30% 35%,#fff,transparent),radial-gradient(1px 1px at 55% 20%,#cfe3ff,transparent),radial-gradient(1px 1px at 80% 40%,#fff,transparent),radial-gradient(1px 1px at 92% 8%,#fff,transparent),radial-gradient(1px 1px at 45% 45%,#fff,transparent);background-size:100% 50%;animation:spscroll 9s linear infinite;opacity:.7}'
+'.sp-stars .s2{background-image:radial-gradient(1.6px 1.6px at 20% 25%,#fff,transparent),radial-gradient(1.6px 1.6px at 65% 5%,#fff,transparent),radial-gradient(2px 2px at 85% 30%,#bfe1ff,transparent),radial-gradient(1.6px 1.6px at 40% 40%,#fff,transparent);background-size:100% 50%;animation:spscroll 5s linear infinite}'
+'.sp-stars .s3{background-image:linear-gradient(transparent,rgba(170,220,255,.55),transparent),linear-gradient(transparent,rgba(170,220,255,.4),transparent),linear-gradient(transparent,rgba(255,255,255,.5),transparent);background-size:2px 70px,2px 110px,1px 50px;background-position:18% 10%,72% 30%,46% 5%;background-repeat:no-repeat;animation:spscroll 1.6s linear infinite}'
+'.sp-stars .s4{background-image:linear-gradient(transparent,rgba(170,220,255,.45),transparent),linear-gradient(transparent,rgba(255,255,255,.4),transparent);background-size:2px 90px,1px 60px;background-position:88% 20%,8% 35%;background-repeat:no-repeat;animation:spscroll 2.3s linear infinite}'
+'@keyframes spscroll{from{transform:translateY(0)}to{transform:translateY(50%)}}'
+'.sp-field{display:flex;gap:0;overflow:visible;z-index:1}'
+'.sp-half{position:relative;flex:1;min-width:0;touch-action:none;overflow:hidden}'
+'.sp-vs .sp-half+.sp-half{border-left:4px solid rgba(255,255,255,.85)}'
+'.sp-vs .sp-half.h0{background:linear-gradient(rgba(80,150,255,.10),transparent 40%)}.sp-vs .sp-half.h1{background:linear-gradient(rgba(255,110,110,.10),transparent 40%)}'
+'.sp-qh{position:absolute;left:6px;right:6px;top:6px;margin:0;padding:5px 9px 6px;z-index:6}'
+'.sp-qh p{font-size:clamp(17px,2.3vw,28px);margin:2px 0 4px;line-height:1.22}.sp-qh small{font-size:clamp(12px,1.2vw,15px)}'
+'.h1 .sp-qh{border-color:#FFB3B3}'
+'.sp-vs .sp-rock>span{font-size:clamp(14px,1.7vw,22px);padding:3px 5px}.sp-vs .sp-rock .rk{width:clamp(50px,10vh,90px);height:clamp(50px,10vh,90px)}'
+'.sp-vs .sp-ship{width:clamp(58px,11vh,104px);height:calc(clamp(58px,11vh,104px)*1.42)}'
+'.sp-vs .sp-cam{bottom:8px;width:min(34%,170px)}.sp-vs .h0 .sp-cam{left:8px;right:auto}'
+'.sp-cam select{position:absolute;left:3px;right:30px;bottom:3px;z-index:3;font-size:11px;max-width:calc(100% - 34px);background:rgba(10,18,60,.85);color:#fff;border:1px solid #9fd0ff;border-radius:6px}'
+'.sp-cam .sp-flip{position:absolute;right:3px;bottom:3px;z-index:3;width:24px;height:22px;padding:0;border-radius:6px;border:1px solid #9fd0ff;background:rgba(10,18,60,.85);color:#fff;font-size:12px}'
+'.sp-pill.p0{border-color:#7FB8FF}.sp-pill.p1{border-color:#FF9F9F}.sp-pill.cur{background:rgba(255,226,122,.35);border-color:#FFE27A}'
+'.sp-wait{position:absolute;left:50%;bottom:36%;transform:translateX(-50%);z-index:7;background:rgba(10,16,60,.85);border:1px solid #8fb8ff;border-radius:10px;padding:4px 10px;font-size:13px;font-weight:700;white-space:nowrap}'
/* Tàu nghiêng theo hướng bay: xoay + thu hẹp như đang lượn */
+'.sp-ship .body{transition:none}';

function css(){var o=$('spCss');if(o)o.remove();var s=document.createElement('style');s.id='spCss';s.textContent=CSS;document.head.appendChild(s)}

/* ================= BẮT ĐẦU ================= */
var NT=20; /* 2 đội theo lượt: tối đa 20 câu (mỗi đội 10 câu) */
function start(){
 stop();css();
 var r=A.roster(),st=A.st,vs=st.mode=='vs',turn=st.mode=='turn',need=vs?2:1;
 if(turn?st.sel.length<2:st.sel.length!=need)return alert(turn?'Chế độ 2 đội theo lượt: hãy chọn từ 2 thí sinh trở lên.':vs?'Chế độ đối kháng: hãy chọn 2 thí sinh.':'Hãy chọn 1 thí sinh.');
 var P=A.pool().filter(function(q){return q.t=='mc'||q.t=='tf'}),byL=function(a,b){return a.l-b.l},qs,qs2=null;
 var need2=turn?NT:vs?2*N:N;
 if(P.length<(turn?10:N))return alert('Phạm vi này chưa đủ câu trắc nghiệm, đúng/sai. Hãy chọn phạm vi rộng hơn.');
 if(turn)qs=A.fresh(P).slice(0,NT).map(A.prep);
 else if(!vs)qs=A.fresh(P).slice(0,N).sort(byL).map(A.prep);
 else{
  /* Đối kháng: mỗi phe một bộ câu hỏi KHÁC NHAU, từng cặp cùng cấp độ (và cùng dạng nếu được); bỏ câu nghe để hai phe không lẫn tiếng */
  var F=A.fresh(P.filter(function(q){return !q.lis}));
  if(F.length<need2)return alert('Phạm vi này chưa đủ '+need2+' câu cho hai phe. Hãy chọn phạm vi rộng hơn.');
  var a=F.slice(0,N).sort(byL),rest=F.slice(N);
  var b=a.map(function(q){
   var pick=function(t){for(var i=0;i<rest.length;i++){var x=rest[i];if(!x._u&&t(x)){x._u=1;return x}}return null};
   return pick(function(x){return x.l==q.l&&x.t==q.t})||pick(function(x){return x.l==q.l})||pick(function(x){return Math.abs(x.l-q.l)<=1})||pick(function(){return true});
  });
  rest.forEach(function(x){delete x._u});
  qs=a.map(A.prep);qs2=b.map(A.prep);
 }
 var cam=st.spcam!==false&&!!(window.DTKSACK&&DTKSACK.gcam);
 var mk=function(k){return{k:k,p:r[st.sel[k]],tx:.5,ax:.5,vx:0,tilt:0,n:0,lane:-1,kill:0,hits:0,xp:0,stk:0,best:0,seen:0,flip:false}};
 S={i:-1,vs:vs,turn:turn,sides:vs?[mk(0),mk(1)]:[mk(0)],cam:cam,phase:'cal',lock:true};
 S.sides[0].qs=qs;if(vs)S.sides[1].qs=qs2;
 if(turn){S.T=A.teamsOf(st.sel.map(function(i){return r[i]}));S.tm=[{kill:0,hits:0},{kill:0,hits:0}];S.ps={};S.sides[0].p={n:'Đội Xanh',e:S.T[0][0].e}}
 A.setScreen('play');document.body.setAttribute('data-game','space');setVh();
 var half=function(sd){var k=sd.k,out=vs?(k?'r':'l'):'r';
  return '<div class="sp-half h'+k+'" id="spH'+k+'">'
   +(vs?'<div class="sp-q sp-qh" id="spQ'+k+'"><small style="color:'+(k?'#FFB3B3':'#B9D8FF')+';font-weight:800">'+(k?'PHE 2':'PHE 1')+' · '+esc(sd.p.n)+'</small><p>Chuẩn bị!</p><div class="sp-bar"><i></i></div></div>':'')
   +'<div class="sp-earth s3" id="spE'+k+'"></div><div class="sp-lanes" id="spL'+k+'"></div>'
   +'<div class="sp-ship" id="spShip'+k+'"><div class="body">'+shipSVG()+'</div></div>'
   +(cam?'<div class="gc-box sp-cam" id="spC'+k+'"><video playsinline muted autoplay></video><canvas></canvas><div class="gc-msg"></div>'+(vs?'<select id="spSel'+k+'" aria-label="Chọn camera cho '+(k?'phe 2':'phe 1')+'" hidden></select><button class="sp-flip" data-act="spflip" data-v="'+k+'" aria-label="Đảo chiều trái phải" title="Đảo chiều trái – phải">⇆</button>':'')+'</div>':'')
   +'<div class="sp-fb" id="spFb'+k+'" role="status"></div></div>'};
 var pills=turn?[0,1].map(function(t){return '<span class="sp-pill p'+t+'" id="spS'+t+'">'+teamTxt(t)+'</span>'}).join('')
  :vs?S.sides.map(function(sd){return '<span class="sp-pill p'+sd.k+'" id="spS'+sd.k+'">'+sideTxt(sd)+'</span>'}).join('')
  :'<span class="sp-pill" id="spKill0">👾 Tiêu diệt: 0</span><span class="sp-pill" id="spS0">'+lifeTxt(0)+'</span>';
 var who=turn?'🔵 Đội Xanh: '+S.T[0].map(function(p){return esc(p.n)}).join(', ')+' ⚔️ 🔴 Đội Đỏ: '+S.T[1].map(function(p){return esc(p.n)}).join(', ')
  :S.sides.map(function(sd){return AVH(sd.p.e)+' '+esc(sd.p.n)}).join(' ⚔️ ');
 document.getElementById('app').innerHTML='<div class="sp'+(vs?' sp-vs':'')+'">'
  +'<div class="sp-hud"><button class="btn ghost sm" data-act="spquit" aria-label="Thoát">✕</button><span class="gname">🚀 Bảo vệ Trái Đất'+(vs?' · Đối kháng':turn?' · 2 đội':'')+'</span>'
  +'<span class="sp-pill" id="spNo">Câu 0/'+(turn?NT:N)+'</span>'+pills
  +'<button class="btn ghost sm" data-act="snd" aria-label="Bật hoặc tắt âm thanh">'+(window.SND&&!SND.isOn()?'🔇':'🔊')+'</button></div>'
  +'<div class="sp-scene" id="spScene"><div class="sp-stars" aria-hidden="true"><i class="s1"></i><i class="s2"></i><i class="s3"></i><i class="s4"></i></div>'
  +(vs?'':'<div class="sp-q" id="spQ"><small>'+who+'</small><p>Chuẩn bị cất cánh!</p><div class="sp-bar"><i></i></div></div>')
  +'<div class="sp-field" id="spField">'+S.sides.map(half).join('')+'</div>'
  +'<div class="sp-cal" id="spCal"><div><h3 style="margin:0">🚀 Bảo vệ Trái Đất!</h3>'
  +'<p>Sinh vật ngoài hành tinh '+alienIcon()+' đang nấp trong thiên thạch mang <b>đáp án đúng</b>.</p>'
  +(turn?'<p>'+who+'</p><small>Mỗi câu một bạn ra lái tàu, hai đội thay phiên nhau (mỗi đội tối đa '+(NT/2)+' câu). Mỗi đội có một Trái Đất 3 lớp khiên: đội nào để Trái Đất bị tấn công quá 3 lần thì thua; nếu cả hai trụ vững, đội tiêu diệt nhiều sinh vật hơn thắng.</small>':'')
  +(vs?'<small>Mỗi phe một nửa màn hình, câu hỏi hai bên khác nhau. Phe nào để Trái Đất của mình bị tấn công quá 3 lần thì thua; nếu cả hai trụ vững sau '+N+' câu, phe tiêu diệt nhiều sinh vật hơn thắng.</small>':'')
  +(cam?'<p id="spCalMsg">📷 Đang mở camera…</p><small>'+(vs?'Mỗi phe đứng trước camera của phe mình (hoặc phe 1 bên trái, phe 2 bên phải nếu dùng chung 1 camera), cách khoảng 2 m. ':'Đứng cách camera khoảng 2 m. ')+'Bước sang trái, sang phải để lái tàu. Dừng tàu dưới thiên thạch đủ <b>5 giây</b> để bắn laser.</small>'
   :'<p>'+(vs?'Phe 1: phím A / D · Phe 2: phím ← / →. Hoặc chạm, kéo trên nửa sân của mình.':'Chạm hoặc kéo trên sân, hoặc dùng phím ← → để lái tàu.')+'</p><small>Dừng tàu dưới thiên thạch đủ <b>5 giây</b> để bắn laser.</small>')
  +(vs||turn?'':'<small>'+N+' câu, mỗi câu 15 giây. Chọn sai, sinh vật sẽ tấn công Trái Đất – Trái Đất có 3 lớp khiên, bị tấn công quá 3 lần là thua.</small>')
  +'<big id="spCount"></big><button class="btn" data-act="spgo">▶ Bắt đầu</button></div></div>'
  +'</div></div>';
 S.sides.forEach(bindPointer);
 if(cam)camStart();
 loop();
}
function shields(h){var a='';for(var i=0;i<MAXHIT;i++)a+=i<MAXHIT-h?'🛡️':'💔';return h>MAXHIT?'💥':a}
function lifeTxt(k){return '🌍 '+shields(S.sides[k].hits)}
function sideTxt(sd){return esc(sd.p.n)+': 👾'+sd.kill+' '+shields(sd.hits)}
function teamTxt(t){var m=S.tm[t];return (t?'🔴 Đội Đỏ':'🔵 Đội Xanh')+': 👾'+m.kill+' '+shields(m.hits)}
function hitsOf(sd){return S.turn?S.tm[S.team].hits:sd.hits}
function pillUpd(sd,hit){
 var el;
 if(S.turn){el=$('spS'+S.team);el.textContent=teamTxt(S.team)}
 else if(S.vs){el=$('spS'+sd.k);el.textContent=sideTxt(sd)}
 else{$('spKill0').textContent='👾 Tiêu diệt: '+sd.kill;el=$('spS0');el.textContent=lifeTxt(0)}
 if(hit&&el){el.classList.remove('hit');void el.offsetWidth;el.classList.add('hit')}
}

/* ================= CAMERA =================
   Chơi đơn / 2 đội: bộ camera một người của sack.js.
   Đối kháng: máy có từ 2 camera → mỗi phe một camera; chỉ có 1 camera → chia đôi khung hình (phe 1 bên trái, phe 2 bên phải). */
var CAM={on:false,src:[],raf:0,last:0,devs:[],lastMx:null,lastT:[0,0]};
function posOf(lm){if(!lm||!lm[11]||!lm[12])return null;var v=function(p){return p.visibility==null||p.visibility>0.4};if(!v(lm[11])||!v(lm[12]))return null;return (lm[11].x+lm[12].x)/2}
function msgCal(t){var m=$('spCalMsg');if(m)m.textContent=t}
function camStart(){
 var me=S;
 if(!S.vs){
  DTKSACK.gcam.start($('spC0'),function(x,now){onPos(0,x,now)},posOf,{any:true}).then(function(ok){
   if(S!==me)return;if(!ok){S.cam=false;msgCal('Không dùng được camera – chạm, kéo hoặc dùng phím ← → để lái tàu.')}else msgCal('🧍 Bước vào khung hình…');
  });return;
 }
 if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia){S.cam=false;msgCal('Trình duyệt không hỗ trợ camera – dùng phím hoặc chạm để lái tàu.');return}
 var L=DTKSACK.gcam.lib;CAM.on=true;CAM.src=[];CAM.lastMx=null;CAM.lastT=[0,0];
 L.getStream(null).then(function(st0){
  if(S!==me||!CAM.on){st0.getTracks().forEach(function(t){t.stop()});return}
  var id0=(st0.getVideoTracks()[0].getSettings()||{}).deviceId;
  return navigator.mediaDevices.enumerateDevices().then(function(ds){
   CAM.devs=ds.filter(function(d){return d.kind=='videoinput'});
   var other=CAM.devs.filter(function(d){return d.deviceId&&d.deviceId!==id0})[0];
   CAM.src[0]={stream:st0,dev:id0,sides:other?[0]:[0,1],shared:!other};
   attach(0,st0);if(!other)attach(1,st0);
   fillSel();msgCal('⏳ Đang tải bộ nhận dạng động tác…');
   return L.sharedPL().then(function(pl){CAM.src[0].pl=pl;if(other)return useDev(1,other.deviceId)});
  });
 }).then(function(){
  if(S!==me||!CAM.on)return;msgCal(CAM.src[0]&&CAM.src[0].shared?'🧍 Camera chung: phe 1 đứng trong vùng XANH bên trái, phe 2 trong vùng ĐỎ bên phải, chừa khoảng trống ở giữa. Chỉ cần bước trong vùng của mình…':'🧍 Mỗi phe bước vào khung hình camera của mình…');
  cancelAnimationFrame(CAM.raf);CAM.raf=requestAnimationFrame(camLoop);
 }).catch(function(e){
  if(S!==me)return;S.cam=false;msgCal(e&&e.name=='NotAllowedError'?'Chưa được phép dùng camera – dùng phím hoặc chạm để lái tàu.':'Không mở được camera (lần đầu cần mạng) – dùng phím hoặc chạm để lái tàu.');
 });
}
function attach(k,stream){var b=$('spC'+k);if(!b)return;b.classList.toggle('mirror',DTKSACK.gcam.face()=='user');var v=b.querySelector('video');v.srcObject=stream;var p=v.play();if(p&&p.catch)p.catch(function(){})}
function fillSel(){
 [0,1].forEach(function(k){var s=$('spSel'+k);if(!s)return;
  s.innerHTML=(CAM.devs.length<2?'':'<option value="">Camera chung (chia đôi)</option>')+CAM.devs.map(function(d,i){return '<option value="'+d.deviceId+'">'+esc(d.label||('Camera '+(i+1)))+'</option>'}).join('');
  var src=CAM.src[k]&&CAM.src[k].sides.indexOf(k)>=0?CAM.src[k]:CAM.src[0];s.value=src&&!src.shared?src.dev:'';
  s.hidden=CAM.devs.length<2;s.onchange=function(){useDev(k,s.value)};
 });
}
function useDev(k,id){
 var L=DTKSACK.gcam.lib,me=S;
 if(k==0){
  return L.getStream(id||null).then(function(st){
   if(S!==me){st.getTracks().forEach(function(t){t.stop()});return}
   var old=CAM.src[0];if(old&&old.stream&&!(CAM.src[1]&&CAM.src[1].stream===old.stream))old.stream.getTracks().forEach(function(t){t.stop()});
   CAM.src[0]={stream:st,dev:id,pl:old&&old.pl,sides:CAM.src[1]?[0]:[0,1],shared:!CAM.src[1]};attach(0,st);if(!CAM.src[1])attach(1,st);fillSel();
  });
 }
 var o=CAM.src[1];if(o){o.stream.getTracks().forEach(function(t){t.stop()});CAM.src[1]=null}
 if(!id){CAM.src[0].sides=[0,1];CAM.src[0].shared=true;attach(1,CAM.src[0].stream);fillSel();return Promise.resolve()}
 CAM.src[0].sides=[0];CAM.src[0].shared=false;
 return L.getStream(id).then(function(st){
  if(S!==me){st.getTracks().forEach(function(t){t.stop()});return}
  CAM.src[1]={stream:st,dev:id,sides:[1],shared:false};attach(1,st);fillSel();
  return (CAM.pl1?Promise.resolve(CAM.pl1):L.makePL(1).then(function(pl){CAM.pl1=pl;return pl})).then(function(pl){if(CAM.src[1])CAM.src[1].pl=pl});
 }).catch(function(){useDev(1,'')});
}
function camLoop(){
 if(!CAM.on||!S)return;CAM.raf=requestAnimationFrame(camLoop);
 var now=performance.now();if(now-CAM.last<Math.max(110,(CAM.cost||0)*2.5))return;CAM.last=now;if(document.hidden)return;
 var t0=performance.now(),L=DTKSACK.gcam.lib,user=DTKSACK.gcam.face()=='user',seen={};
 CAM.src.forEach(function(s){
  if(!s||!s.pl)return;var b=$('spC'+s.sides[0]),v=b&&b.querySelector('video');if(!v||v.readyState<2||!v.videoWidth)return;
  var res;try{res=s.pl.detectForVideo(v,now)}catch(e){return}
  var poses=res&&res.landmarks||[];
  if(s.shared){
   /* Camera chung: mỗi phe một vùng chơi, giữa có khoảng trống; máy nhớ vị trí lần trước để không nhầm người */
   var lm0=CAM.lastMx||(CAM.lastMx=[null,null]);[0,1].forEach(function(k){if(lm0[k]!=null&&now-(CAM.lastT[k]||0)>2500)lm0[k]=null});
   var as=L.split.assign(poses,user,lm0);
   [0,1].forEach(function(k){var a=as[k],c=$('spC'+k),cv=c&&c.querySelector('canvas');
    if(cv){L.drawTo(cv,v,a?a.p:null,k?'#FF6F6F':'#4C9AFF');L.split.overlay(cv,k,user)}
    if(a){lm0[k]=a.mx;CAM.lastT[k]=now;seen[k]=1;onPos(k,L.split.pos(k,a.mx),now,true)}});
  }else{
   var k=s.sides[0],best=null,bw=0;poses.forEach(function(p){var w=Math.abs(p[11].x-p[12].x);if(w>bw){bw=w;best=p}});
   L.drawTo(b.querySelector('canvas'),v,best,k?'#FF6F6F':'#4C9AFF');
   var x=best?posOf(best):null;if(x!=null){seen[k]=1;onPos(k,x,now)}
  }
 });
 S.sides.forEach(function(sd){if(!seen[sd.k])onPos(sd.k,null,now)});
 var dt=performance.now()-t0;CAM.cost=CAM.cost?CAM.cost*0.8+dt*0.2:dt;
}
function camStop(){CAM.on=false;cancelAnimationFrame(CAM.raf);CAM.src.forEach(function(s){if(s&&s.stream)s.stream.getTracks().forEach(function(t){t.stop()})});CAM.src=[]}
function onPos(k,x,now,mapped){
 if(!S)return;var sd=S.sides[k];if(!sd)return;
 if(x==null){sd.seen=0;return}
 var mx=mapped?x:(DTKSACK.gcam.face()=='user'?1-x:x),pos=mapped?Math.max(0,Math.min(1,mx)):Math.max(0,Math.min(1,(mx-0.18)/0.64));
 if(sd.flip)pos=1-pos;sd.tx=pos;
 if(S.phase=='cal'){
  if(!sd.seen)sd.seen=now;
  var all=S.sides.every(function(s){return s.seen&&now-s.seen>1200});
  if(all&&!S.cd){S.cd=Date.now();msgCal('✅ Máy đã nhận ra '+(S.vs?'cả hai phe':'em')+'! Cất cánh sau…')}
  else if(!S.cd)msgCal(S.vs?'👀 Đang nhận diện: '+S.sides.map(function(s){return (s.k?'Phe 2 ':'Phe 1 ')+(s.seen?'✅':'…')}).join(' · '):'👀 Đang nhận diện… đứng yên một chút');
 }
}

/* ================= ĐIỀU KHIỂN BẰNG CHẠM / PHÍM ================= */
function shipPct(ax){return 4+ax*92}
function laneOf(ax,n){return n?Math.max(0,Math.min(n-1,Math.floor(shipPct(ax)/100*n))):-1}
function toLane(j,n){return Math.max(0,Math.min(1,((j+.5)/n*100-4)/92))}
function bindPointer(sd){
 var h=$('spH'+sd.k);if(!h)return;var drag=false;
 var set=function(e){if(!S||e.target.closest('button,select'))return;var r=h.getBoundingClientRect();sd.tx=Math.max(0,Math.min(1,((e.clientX-r.left)/r.width*100-4)/92))};
 h.addEventListener('pointerdown',function(e){drag=true;set(e)});
 h.addEventListener('pointermove',function(e){if(drag||e.pointerType=='mouse'&&e.buttons)set(e)});
 h.addEventListener('pointerup',function(){drag=false});h.addEventListener('pointerleave',function(){drag=false});
}
document.addEventListener('keydown',function(e){
 if(!S||!$('spScene'))return;var k=null,dir=0;
 if(e.key=='ArrowLeft'||e.key=='ArrowRight'){k=S.vs?1:0;dir=e.key=='ArrowLeft'?-1:1}
 else if(S.vs&&(e.key=='a'||e.key=='A'||e.key=='d'||e.key=='D')){k=0;dir=/a/i.test(e.key)?-1:1}
 if(k==null)return;e.preventDefault();var sd=S.sides[k],n=sd.n||4,j=Math.max(0,Math.min(n-1,laneOf(sd.tx,n)+dir));sd.tx=toLane(j,n);
});
function go(){if(!S||S.phase!='cal')return;var c=$('spCal');if(c)c.remove();S.phase='play';snd('tap');next()}

/* ================= CÂU HỎI ================= */
function next(){
 if(!S)return;S.i++;
 if(S.i>=(S.turn?NT:N))return end();
 S.lock=false;S.t0=Date.now();S.beat=0;S.done=0;
 $('spNo').textContent='Câu '+(S.i+1)+'/'+(S.turn?NT:N);
 if(S.turn){var tm=S.team=S.i%2,mem=S.T[tm];S.who=mem[Math.floor(S.i/2)%mem.length];
  [0,1].forEach(function(t){$('spS'+t).classList.toggle('cur',t==tm)});
  $('spE0').className='sp-earth s'+Math.max(0,MAXHIT-S.tm[tm].hits)}
 var qvs=[];
 S.sides.forEach(function(sd){
  var k=sd.k,q=sd.q=sd.qs[S.i%sd.qs.length],labels=q.t=='tf'?['Đúng','Sai']:q.o.slice(),n=sd.n=labels.length;
  sd.vals=q.t=='tf'?['1','0']:labels.map(function(x,j){return String(j)});sd.fired=false;sd.dw=null;
  var qv=Object.assign({},q,{o:labels,nol:1});qvs.push(qv);
  var head='<small>'+(S.turn?'<b style="color:'+(S.team?'#FFB3B3':'#B9D8FF')+'">Lượt '+(S.team?'🔴 Đội Đỏ':'🔵 Đội Xanh')+': '+AVH(S.who.e)+' '+esc(S.who.n)+'</b> · ':'')+(S.vs?'<b style="color:'+(k?'#FFB3B3':'#B9D8FF')+'">'+(k?'PHE 2':'PHE 1')+' · '+esc(sd.p.n)+'</b> · ':'')+esc(q.c)+' – '+A.LVN[q.l-1]+(q.t=='tf'?' · Đúng hay sai?':'')+(A.sayB?' '+A.sayB(qv,'sp'+k):'')+'</small>';
  var card=$(S.vs?'spQ'+k:'spQ');card.innerHTML=head+'<p>'+esc(q.q)+'</p><div class="sp-bar"><i></i></div>';
  /* Đối kháng: thiên thạch nằm ngay dưới khung câu hỏi của phe */
  if(S.vs)$('spL'+k).style.top=(card.offsetTop+card.offsetHeight)+'px';
  var seed=Math.floor(Math.random()*90);
  $('spL'+k).innerHTML=labels.map(function(t,j){return '<div class="sp-lane" data-l="'+j+'"><div class="sp-rock" id="spR'+k+'_'+j+'"><b>'+'ABCD'[j]+'</b><div class="rk"><i class="ring"></i>'+rockSVG(seed+j*17+k*7)+(A.judge(q,sd.vals[j])?'<div class="al">'+alienSVG()+'</div>':'')+'</div><span>'+esc(t)+'</span></div></div>'}).join('');
  $('spFb'+k).className='sp-fb';var wt=$('spW'+k);if(wt)wt.remove();
 });
 /* 2 đội: báo đổi lượt 2,5 giây để bạn tiếp theo vào trước camera */
 if(S.turn){
  S.lock=true;var me=S,fb0=$('spFb0');fb0.className='sp-fb show '+(S.team?'bad':'good');
  fb0.innerHTML='🔄 Lượt của '+(S.team?'🔴 Đội Đỏ':'🔵 Đội Xanh')+'<br>'+AVH(S.who.e)+' <b>'+esc(S.who.n)+'</b> vào lái tàu!';snd('tap');
  setTimeout(function(){if(S!==me||S.phase!='play')return;fb0.className='sp-fb';S.lock=false;S.t0=Date.now();if(A.sayAuto)A.sayAuto(qvs[0])},2500);
  return;
 }
 if(A.sayAuto){
  if(!S.vs)A.sayAuto(qvs[0]);
  else{var a=qvs[0],b=qvs[1];A.sayAuto({q:(a.en?'Team 1: ':'Phe 1: ')+a.q+(a.en?'. Team 2: ':'. Phe 2: ')+b.q,t:'num',en:a.en&&b.en?1:0,c:a.c},'spboth')}
 }
}
function loop(){
 cancelAnimationFrame(raf);
 var step=function(){
  if(!S||!$('spScene'))return;raf=requestAnimationFrame(step);
  var now=Date.now(),p=S.phase=='play'&&!S.lock?Math.min(1,(now-S.t0)/DUR):0,act=S.phase=='play'&&!S.lock;
  S.sides.forEach(function(sd){
   /* Tàu bay theo vị trí người chơi; nghiêng (xoay + lượn) về phía đang bay, càng bay nhanh càng nghiêng */
   var prev=sd.ax;sd.ax+=(sd.tx-sd.ax)*0.18;var v=sd.ax-prev;sd.vx+=(v-sd.vx)*0.35;
   var want=Math.max(-24,Math.min(24,sd.vx*1400));sd.tilt+=(want-sd.tilt)*0.2;
   var sh=$('spShip'+sd.k);
   if(sh){sh.style.left=shipPct(sd.ax)+'%';var bd=sh.querySelector('.body');if(bd&&!sh.classList.contains('fire'))bd.style.transform='rotate('+sd.tilt.toFixed(2)+'deg) scaleX('+(1-Math.abs(sd.tilt)/80).toFixed(3)+')'}
   var lane=laneOf(sd.ax,sd.n);sd.lane=lane;
   var ls=$('spL'+sd.k);if(ls)[].forEach.call(ls.children,function(l,j){l.classList.toggle('on',j==lane&&act&&!sd.fired)});
   if(!act||!sd.n||sd.fired)return;
   /* Giữ tàu gần giữa một thiên thạch đủ 5 giây thì bắn (không đếm khi đứng ở ranh giới hai ô) */
   var w=100/sd.n,mid=Math.abs(shipPct(sd.ax)-(lane+.5)*w)<0.36*w;
   if(!sd.dw||sd.dw.lane!==lane||!mid)sd.dw={lane:lane,t:now};
   var hp=Math.min(1,(now-sd.dw.t)/HOLD);
   [].forEach.call(ls.children,function(l,j){var rg=l.querySelector('.ring');if(rg)rg.style.setProperty('--p',j==lane?hp.toFixed(3):0)});
   if(hp>=1||p>=1)fire(sd,lane);
  });
  if(S.phase=='cal'&&S.cd){var left=3-Math.floor((now-S.cd)/1000),c=$('spCount');if(c)c.textContent=left>0?left:'';if(left<=0)go()}
  if(!act)return;
  [].forEach.call(document.querySelectorAll('.sp-bar'),function(bar){bar.firstChild.style.transform='scaleX('+(1-p).toFixed(3)+')';bar.classList.toggle('hot',p>0.66)});
  var sec=Math.ceil((1-p)*DUR/1000);if(sec<=5&&sec>0&&sec!==S.beat){S.beat=sec;snd('beat',sec)}
 };
 raf=requestAnimationFrame(step);
}

/* ================= BẮN LASER ================= */
function fire(sd,lane){
 if(!S||S.lock||sd.fired)return;sd.fired=true;
 var me=S,k=sd.k,q=sd.q,ok=A.judge(q,sd.vals[lane]),field=$('spH'+k),sh=$('spShip'+k),rk=$('spR'+k+'_'+lane),fb=$('spFb'+k);
 var good=-1;sd.vals.forEach(function(v,j){if(A.judge(q,v))good=j});
 /* Điểm: chơi đơn / đối kháng tính cho phe; 2 đội tính cho đội đang có lượt và cho bạn đang lái */
 var tm=S.turn?S.tm[S.team]:sd,pl=S.turn?(S.ps[S.who.n]=S.ps[S.who.n]||{p:S.who,xp:0,stk:0,best:0}):sd;
 if(ok){tm.kill++;pl.stk++;if(pl.stk>pl.best)pl.best=pl.stk;pl.xp+=10+2*q.l}else{tm.hits++;pl.stk=0}
 sd.ok=ok;
 var fr=field.getBoundingClientRect(),sr=sh.getBoundingClientRect(),rr=rk.querySelector('.rk').getBoundingClientRect();
 var x=sr.left+sr.width/2-fr.left,y1=rr.top+rr.height/2-fr.top,y2=sr.top+sr.height*0.12-fr.top;
 var lz=document.createElement('div');lz.className='sp-laser';lz.style.left=x+'px';lz.style.top=y1+'px';lz.style.height=Math.max(10,y2-y1)+'px';field.appendChild(lz);
 sh.classList.remove('fire');void sh.offsetWidth;sh.classList.add('fire');snd('zap');
 setTimeout(function(){if(lz.parentNode)lz.remove();sh.classList.remove('fire')},600);
 sd.vals.forEach(function(v,j){if(j!=lane&&j!=good){var e=$('spR'+k+'_'+j);if(e)e.classList.add('dim')}});
 setTimeout(function(){
  if(S!==me)return;
  rk.classList.add('blast');snd('crash');
  if(ok){
   rk.classList.add('reveal','zap','right');pillUpd(sd,false);
   setTimeout(function(){if(S===me)snd('happy')},600);
   fb.className='sp-fb good show';fb.innerHTML='🎯 Chính xác! Sinh vật ngoài hành tinh đã bị tiêu diệt.';
  }else{
   var gr=$('spR'+k+'_'+good);
   setTimeout(function(){
    if(S!==me||!gr)return;
    gr.classList.add('blast','reveal','right');snd('crash');
    var gb=gr.querySelector('.rk').getBoundingClientRect(),f2=field.getBoundingClientRect(),eb=$('spE'+k).getBoundingClientRect();
    var al=gr.querySelector('.al');if(al)al.style.opacity='0';
    var at=document.createElement('div');at.className='sp-atk';at.innerHTML=alienSVG();
    at.style.left=(gb.left+gb.width/2-f2.left)+'px';at.style.top=(gb.top+gb.height/2-f2.top)+'px';field.appendChild(at);void at.offsetWidth;
    at.classList.add('go');at.style.top=(eb.top-f2.top+10)+'px';
    setTimeout(function(){
     if(S!==me)return;at.remove();var e=$('spE'+k);e.className='sp-earth hurt s'+Math.max(0,MAXHIT-tm.hits);snd('sad');pillUpd(sd,true);
     setTimeout(function(){if(S===me)e.classList.remove('hurt')},700);
    },1300);
   },650);
   fb.className='sp-fb bad show';fb.innerHTML='💥 Bắn trượt! Sinh vật đang tấn công Trái Đất!'+(S.vs?'':'<br>Đáp án đúng: <b>'+esc(A.ansText(q))+'</b>'+(q.e?'<small>'+esc(q.e)+'</small>':''));
  }
  if(S.vs)$('spQ'+k).insertAdjacentHTML('beforeend','<small style="color:#9CFFB8;margin-top:4px;display:block">✔ Đáp án đúng: '+esc(A.ansText(q))+(q.e?' – '+esc(q.e):'')+'</small>');
 },350);
 S.done++;
 /* Đối kháng: phe bắn xong trước chờ phe kia (hoặc hết giờ) */
 if(S.done<S.sides.length){field.insertAdjacentHTML('beforeend','<div class="sp-wait" id="spW'+k+'">⏳ Chờ phe bạn…</div>');setTimeout(function(){var w=$('spW'+k);if(w)w.remove()},1500);return}
 S.lock=true;
 var anyBad=S.sides.some(function(s){return !s.ok}),anyE=S.sides.some(function(s){return !s.ok&&s.q.e});
 var lost=S.turn?S.tm[S.team].hits>MAXHIT:S.sides.some(function(s){return s.hits>MAXHIT});
 var last=S.i+1>=(S.turn?NT:N);
 setTimeout(function(){if(S!==me||S.phase!='play')return;if(lost||last)end();else next()},!anyBad?2600:(anyE&&!S.vs?4800:3800));
}

/* ================= KẾT THÚC ================= */
function end(){
 if(!S)return;S.phase='end';
 if(window.DTKSACK&&DTKSACK.gcam)DTKSACK.gcam.stop();camStop();cancelAnimationFrame(raf);
 if(S.turn)return endTeams();
 if(S.vs)return endVs();
 var sd=S.sides[0],win=sd.hits<=MAXHIT,res=A.award(sd.p.n,{xp:sd.xp+(win?40:0)+(win&&sd.hits==0?30:0),streak:sd.best,badges:win?['space']:[]});
 A.setScreen('result');
 var head=!win?'💥 TRÁI ĐẤT ĐÃ THẤT THỦ!':sd.hits==0?'🏆 TRÁI ĐẤT AN TOÀN TUYỆT ĐỐI!':'🛡️ BẢO VỆ TRÁI ĐẤT THÀNH CÔNG!';
 var body=heroPics()+'<p><b>'+AVH(sd.p.e)+' '+esc(sd.p.n)+'</b></p>'
  +'<p>Tiêu diệt <b>'+sd.kill+'</b> sinh vật ngoài hành tinh'+(win?' qua '+N+' câu':' sau '+(S.i+1)+' câu')+'. Trái Đất bị tấn công <b>'+sd.hits+'</b> lần.</p>';
 show(win,head,body,[A.rewardHTML(sd.p.n,sd.p.e,res)]);A.celebrate([res]);S=null;
}
function heroPics(){return '<div style="display:flex;gap:16px;justify-content:center;align-items:center;flex-wrap:wrap"><div style="width:90px;height:128px">'+shipSVG()+'</div><div style="width:90px;height:90px">'+alienSVG()+'</div></div>'}
function show(party,head,body,rw){
 A.setScreen('result');
 document.getElementById('app').innerHTML=(party?A.confetti(30):'')+'<section class="hero center result'+(party?' win':'')+'"><h1 class="title sm">'+head+'</h1>'+body+'</section>'
  +'<div class="rewards">'+rw.join('')+'</div><div class="cta"><button class="btn big" data-act="start">↻ Chơi lại</button><button class="btn ghost" data-act="menu">Đổi trò chơi</button></div>';
 snd(party?'win':'sad');
}
/* Đối kháng: phe để Trái Đất thất thủ thì thua; cả hai trụ vững thì so số sinh vật tiêu diệt, rồi số lần bị tấn công */
function endVs(){
 var a=S.sides[0],b=S.sides[1],fa=a.hits>MAXHIT,fb=b.hits>MAXHIT,w=null;
 if(fa!=fb)w=fa?b:a;else if(a.kill!=b.kill)w=a.kill>b.kill?a:b;else if(a.hits!=b.hits)w=a.hits<b.hits?a:b;
 var res=S.sides.map(function(sd){var safe=sd.hits<=MAXHIT;return A.award(sd.p.n,{xp:sd.xp+(sd===w?30:0),streak:sd.best,badges:sd===w&&safe?['space']:[]})});
 var card=function(sd){return '<div style="flex:1;min-width:150px"><div style="width:80px;height:114px;margin:0 auto">'+shipSVG()+'</div><b>'+AVH(sd.p.e)+' '+esc(sd.p.n)+'</b><p style="margin:4px 0">👾 Tiêu diệt <b>'+sd.kill+'</b><br>🌍 Bị tấn công <b>'+sd.hits+'</b> lần'+(sd.hits>MAXHIT?' – thất thủ!':'')+'</p></div>'};
 show(!!w,w?'🏆 '+esc(w.p.n)+' THẮNG!':'🤝 HAI PHE HOÀ NHAU!','<div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">'+card(a)+card(b)+'</div>',S.sides.map(function(sd,i){return A.rewardHTML(sd.p.n,sd.p.e,res[i])}));
 A.celebrate(res);S=null;
}
/* 2 đội: đội để Trái Đất bị tấn công quá 3 lần thua; cả hai trụ vững thì đội tiêu diệt nhiều sinh vật hơn thắng */
function endTeams(){
 var m=S.tm,f0=m[0].hits>MAXHIT,f1=m[1].hits>MAXHIT,w=-1;
 if(f0!=f1)w=f0?1:0;else if(m[0].kill!=m[1].kill)w=m[0].kill>m[1].kill?0:1;else if(m[0].hits!=m[1].hits)w=m[0].hits<m[1].hits?0:1;
 var all=S.T[0].concat(S.T[1]),res=all.map(function(p){var s=S.ps[p.n]||{xp:0,best:0},t=S.T[0].indexOf(p)>=0?0:1;return A.award(p.n,{xp:s.xp+(t==w?30:0),streak:s.best,badges:t==w&&m[t].hits<=MAXHIT?['space']:[]})});
 var team=function(t){return '<div style="flex:1;min-width:160px"><div style="width:80px;height:114px;margin:0 auto">'+shipSVG()+'</div><b style="color:'+(t?'#FF9F9F':'#7FB8FF')+'">'+(t?'🔴 Đội Đỏ':'🔵 Đội Xanh')+'</b><div class="small">'+S.T[t].map(function(p){return AVH(p.e)+' '+esc(p.n)}).join(', ')+'</div><p style="margin:4px 0">👾 Tiêu diệt <b>'+m[t].kill+'</b><br>🌍 Bị tấn công <b>'+m[t].hits+'</b> lần'+(m[t].hits>MAXHIT?' – thất thủ!':'')+'</p></div>'};
 show(w>=0,w<0?'🤝 HAI ĐỘI HOÀ NHAU!':'🏆 '+(w?'ĐỘI ĐỎ':'ĐỘI XANH')+' THẮNG!','<div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">'+team(0)+team(1)+'</div>',all.map(function(p,i){return A.rewardHTML(p.n,p.e,res[i])}));
 A.celebrate(res);S=null;
}
function stop(){cancelAnimationFrame(raf);camStop();if(S&&window.DTKSACK&&DTKSACK.gcam)DTKSACK.gcam.stop();S=null}
function click(a,v){
 if(a=='spgo'){go();return true}
 if(a=='spflip'){var sd=S&&S.sides[+v];if(sd){sd.flip=!sd.flip;snd('tap')}return true}
 if(a=='spquit'){if(confirm('Dừng trò Bảo vệ Trái Đất và thoát?')){stop();A.menu()}return true}
 return false;
}
window.addEventListener('resize',function(){if(S)setVh()});
window.DTKSPACE={start:start,stop:stop,click:click,S:function(){return S},onPos:onPos,fire:fire,shipSVG:shipSVG,alienSVG:alienSVG};
})();
