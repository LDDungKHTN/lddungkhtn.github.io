/* Hứng hoa quả: chơi đơn hoặc đối kháng 2 phe, 10 câu hỏi.
   Mỗi câu: các quả mang đáp án rơi từ trên cây xuống trong 15 giây. Mỗi người chơi là một con vật đang giơ hai tay cầm giỏ trên đầu,
   bước sang trái / phải trước camera (hoặc chạm, kéo, dùng phím) để đứng dưới quả mang đáp án đúng.
   Hứng đúng: quả vào giỏ của phe mình (+1 điểm). Hứng sai: quả thối rữa và bị vứt vào thùng rác.
   Đối kháng: màn hình chia đôi, mỗi phe một sân, một giỏ, một camera (máy có 2 camera) hoặc chung 1 camera chia đôi khung hình.
   Camera dùng bộ nhận dạng chung trong sack.js (DTKSACK.gcam), chỉ cần vị trí ngang của hai vai. */
(function(){
var A=window.DTKAPI;if(!A)return;
var N=10,DUR=15000,esc=A.esc,shuf=A.shuf,S=null,raf=0;
var FRUITS=['🍎','🍊','🍋','🍌','🍉','🍇','🍓','🍑','🍒','🍍','🥭','🍐','🥝','🍈'];
var PETS=[['🐻','Gấu'],['🐼','Gấu trúc'],['🐒','Khỉ'],['🦊','Cáo'],['🐰','Thỏ'],['🐸','Ếch'],['🐧','Chim cánh cụt'],['🐱','Mèo']];
function $(id){return document.getElementById(id)}
function snd(f,a){if(window.SND&&SND[f])SND[f](a)}
function setVh(){document.documentElement.style.setProperty('--vh',window.innerHeight+'px')}
function petOf(k,def){for(var i=0;i<PETS.length;i++)if(PETS[i][0]==k)return PETS[i];return def||PETS[0]}

/* ================= CON VẬT (SVG): đủ đầu, thân, chân, hai chi trước giơ lên cầm giỏ trên đầu ================= */
var LOOK={
 '🐻':{fur:'#8B5A2B',belly:'#D9A877',limb:'#7A4C22',ear:'round',earIn:'#D9A877',muzzle:'#E3BC8E',nose:'#3A2416'},
 '🐼':{fur:'#F4F4F4',belly:'#FFFFFF',limb:'#262626',ear:'round',earC:'#262626',earIn:'#4A4A4A',muzzle:'#FFFFFF',nose:'#262626',patch:1,legC:'#262626'},
 '🐒':{fur:'#7B4A2A',belly:'#E8C39E',limb:'#6A3F23',ear:'side',earIn:'#E8C39E',face:'#E8C39E',nose:'#4A2C18',tail:'curl'},
 '🦊':{fur:'#E8742C',belly:'#FFF4E6',limb:'#C95E1D',ear:'point',earIn:'#3A2416',muzzle:'#FFF4E6',nose:'#222',tail:'fox',legC:'#3A2416'},
 '🐰':{fur:'#E7E1EA',belly:'#FFFFFF',limb:'#D3CCD8',ear:'long',earIn:'#F6B6C8',muzzle:'#FFFFFF',nose:'#F28FAD',teeth:1},
 '🐸':{fur:'#5DBB46',belly:'#CDEB8B',limb:'#4CA338',ear:'frog'},
 '🐧':{fur:'#263238',belly:'#FFFFFF',limb:'#263238',ear:'none',face:'#FFFFFF',beak:'#F59E0B',legC:'#F59E0B'},
 '🐱':{fur:'#F2A541',belly:'#FFE3B8',limb:'#E08E2B',ear:'point',earIn:'#F7C6A3',muzzle:'#FFE3B8',nose:'#E2687A',tail:'cat',whisk:1}};
function petSVG(id,mood,cls){
 var L=LOOK[id]||LOOK['🐻'],ink='#2B1B12',f=L.fur,lm=L.limb,h='';
 /* Đuôi (phía sau thân) */
 if(L.tail=='fox')h+='<path d="M80 138 C104 136 114 116 106 98 C100 112 92 120 78 126Z" fill="'+f+'" stroke="'+lm+'" stroke-width="2"/><path d="M106 98 C110 106 108 112 104 116 C101 110 102 104 106 98Z" fill="#FFF4E6"/>';
 else if(L.tail=='cat')h+='<path d="M80 140 C100 140 104 124 98 110" stroke="'+lm+'" stroke-width="7" fill="none" stroke-linecap="round"/>';
 else if(L.tail=='curl')h+='<path d="M80 142 C102 146 108 126 98 120 C90 116 88 128 96 128" stroke="'+lm+'" stroke-width="5" fill="none" stroke-linecap="round"/>';
 /* Tai dài của thỏ nằm sau giỏ */
 if(L.ear=='long')h+='<ellipse cx="47" cy="30" rx="8" ry="24" transform="rotate(-10 47 30)" fill="'+f+'"/><ellipse cx="73" cy="30" rx="8" ry="24" transform="rotate(10 73 30)" fill="'+f+'"/><ellipse cx="47" cy="32" rx="4" ry="17" transform="rotate(-10 47 32)" fill="'+L.earIn+'"/><ellipse cx="73" cy="32" rx="4" ry="17" transform="rotate(10 73 32)" fill="'+L.earIn+'"/>';
 /* Chân */
 var lc=L.legC||lm;h+='<ellipse cx="45" cy="155" rx="12" ry="8" fill="'+lc+'"/><ellipse cx="75" cy="155" rx="12" ry="8" fill="'+lc+'"/>';
 /* Thân và bụng */
 h+='<ellipse cx="60" cy="124" rx="28" ry="29" fill="'+f+'"/><ellipse cx="60" cy="129" rx="18" ry="20" fill="'+L.belly+'"/>';
 if(L.patch)h+='<path d="M33 112 Q60 100 87 112 L86 120 Q60 110 34 120Z" fill="#262626"/>';
 /* Tai */
 var ec=L.earC||f;
 if(L.ear=='round')h+='<circle cx="39" cy="50" r="10" fill="'+ec+'"/><circle cx="81" cy="50" r="10" fill="'+ec+'"/><circle cx="39" cy="50" r="5" fill="'+L.earIn+'"/><circle cx="81" cy="50" r="5" fill="'+L.earIn+'"/>';
 else if(L.ear=='point')h+='<path d="M37 64 L35 38 L56 52Z" fill="'+f+'"/><path d="M83 64 L85 38 L64 52Z" fill="'+f+'"/><path d="M40 58 L39 44 L50 52Z" fill="'+L.earIn+'"/><path d="M80 58 L81 44 L70 52Z" fill="'+L.earIn+'"/>';
 else if(L.ear=='side')h+='<circle cx="33" cy="70" r="10" fill="'+f+'"/><circle cx="87" cy="70" r="10" fill="'+f+'"/><circle cx="33" cy="70" r="5.5" fill="'+L.earIn+'"/><circle cx="87" cy="70" r="5.5" fill="'+L.earIn+'"/>';
 /* Đầu */
 h+=L.ear=='frog'?'<ellipse cx="60" cy="72" rx="30" ry="23" fill="'+f+'"/>':'<circle cx="60" cy="71" r="25" fill="'+f+'"/>';
 if(L.face)h+='<ellipse cx="60" cy="'+(L.beak?76:77)+'" rx="'+(L.beak?18:17)+'" ry="'+(L.beak?16:14)+'" fill="'+L.face+'"/>';
 if(L.patch)h+='<ellipse cx="50" cy="68" rx="7" ry="9" transform="rotate(25 50 68)" fill="#262626"/><ellipse cx="70" cy="68" rx="7" ry="9" transform="rotate(-25 70 68)" fill="#262626"/>';
 /* Mắt */
 if(L.ear=='frog')h+='<circle cx="45" cy="52" r="10" fill="'+f+'"/><circle cx="75" cy="52" r="10" fill="'+f+'"/><circle cx="45" cy="51" r="7" fill="#fff"/><circle cx="75" cy="51" r="7" fill="#fff"/><circle cx="45" cy="52" r="3.6" fill="'+ink+'"/><circle cx="75" cy="52" r="3.6" fill="'+ink+'"/>';
 else{var ey=L.patch?68:66,ec2=L.patch?'#fff':ink;
  h+=mood=='happy'?'<path d="M45 '+(ey+1)+' Q50 '+(ey-5)+' 55 '+(ey+1)+' M65 '+(ey+1)+' Q70 '+(ey-5)+' 75 '+(ey+1)+'" stroke="'+(L.patch?'#fff':ink)+'" stroke-width="3" fill="none" stroke-linecap="round"/>'
   :'<circle cx="50" cy="'+ey+'" r="3.6" fill="'+ec2+'"/><circle cx="70" cy="'+ey+'" r="3.6" fill="'+ec2+'"/><circle cx="51.2" cy="'+(ey-1.2)+'" r="1.2" fill="'+(L.patch?ink:'#fff')+'"/><circle cx="71.2" cy="'+(ey-1.2)+'" r="1.2" fill="'+(L.patch?ink:'#fff')+'"/>';}
 /* Mõm, mũi, mỏ */
 if(L.muzzle)h+='<ellipse cx="60" cy="79" rx="11" ry="8" fill="'+L.muzzle+'"/>';
 if(L.beak)h+='<path d="M53 76 L67 76 L60 85Z" fill="'+L.beak+'"/>';
 else if(L.nose)h+='<ellipse cx="60" cy="75" rx="4" ry="3" fill="'+L.nose+'"/>';
 if(L.whisk)h+='<path d="M48 79 L34 76 M48 82 L34 84 M72 79 L86 76 M72 82 L86 84" stroke="'+ink+'" stroke-width="1.2" opacity=".6"/>';
 /* Miệng theo tâm trạng */
 var my=L.ear=='frog'?82:L.beak?88:83;
 if(!L.beak)h+=mood=='happy'?'<path d="M52 '+my+' Q60 '+(my+9)+' 68 '+my+'" stroke="'+ink+'" stroke-width="2.6" fill="#B23B4B" stroke-linecap="round"/>'
  :mood=='sad'?'<path d="M53 '+(my+5)+' Q60 '+(my-2)+' 67 '+(my+5)+'" stroke="'+ink+'" stroke-width="2.6" fill="none" stroke-linecap="round"/>'
  :'<path d="M55 '+my+' Q60 '+(my+4)+' 65 '+my+'" stroke="'+ink+'" stroke-width="2.4" fill="none" stroke-linecap="round"/>';
 if(L.teeth&&mood!='sad')h+='<rect x="57" y="'+(my+1)+'" width="6" height="4" fill="#fff"/>';
 if(mood=='happy')h+='<circle cx="44" cy="78" r="4.5" fill="#FF8FA3" opacity=".55"/><circle cx="76" cy="78" r="4.5" fill="#FF8FA3" opacity=".55"/>';
 if(mood=='sad')h+='<path d="M46 72 q-4 8 0 10 q4 -2 0 -10z" fill="#6EC6FF"/>';
 /* Hai chi trước giơ lên cầm giỏ */
 h+='<path d="M41 104 Q27 72 21 30" stroke="'+lm+'" stroke-width="11" fill="none" stroke-linecap="round"/><path d="M79 104 Q93 72 99 30" stroke="'+lm+'" stroke-width="11" fill="none" stroke-linecap="round"/>';
 /* Giỏ hoa quả trên đầu */
 h+='<path d="M17 13 H103 L93 42 Q60 50 27 42Z" fill="#C68642" stroke="#8A5523" stroke-width="2.5"/>'
  +'<path d="M22 23 H98 M25 33 H95 M38 15 L41 45 M60 15 V47 M82 15 L79 45" stroke="#8A5523" stroke-width="1.8" fill="none" opacity=".75"/>'
  +'<rect x="13" y="8" width="94" height="9" rx="4.5" fill="#DDA15E" stroke="#8A5523" stroke-width="2.5"/>';
 /* Bàn tay nắm vành giỏ */
 h+='<circle cx="20" cy="19" r="8" fill="'+lm+'"/><circle cx="100" cy="19" r="8" fill="'+lm+'"/>';
 return '<svg viewBox="0 0 120 166" class="'+(cls||'fr-svg')+'" aria-hidden="true">'+h+'</svg>';
}
function petIcon(id){return '<span class="fr-ico" style="display:inline-block;width:26px;height:36px;vertical-align:middle">'+petSVG(id,'idle','fr-svg')+'</span>'}

var CSS=''
+'body[data-game=fruit] .top,body[data-game=fruit] .seo,body[data-game=fruit] .site-footer,body[data-game=fruit] .sky{display:none}'
+'body[data-game=fruit] main#app{max-width:none;padding:0;margin:0}'
+'.fr-ico svg,.fr-svg{width:100%;height:100%;display:block;overflow:visible}'
+'.fr{display:flex;flex-direction:column;height:var(--vh,100vh);padding:6px;gap:6px;box-sizing:border-box;color:#fff}'
+'.fr-hud{display:flex;align-items:center;gap:8px;flex-wrap:wrap;font-weight:700}'
+'.fr-hud .gname{font-size:18px;margin-right:auto}'
+'.fr-pill{background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.3);border-radius:999px;padding:3px 10px;font-size:14px;white-space:nowrap}'
+'.fr-pill.p0{border-color:#7FB8FF}.fr-pill.p1{border-color:#FF9F9F}'
+'.fr-scene{position:relative;flex:1;min-height:0;display:flex;flex-direction:column;border-radius:16px;overflow:hidden;user-select:none;-webkit-user-select:none;'
+' background:radial-gradient(ellipse 60% 30% at 80% 8%,rgba(255,244,190,.9),transparent 60%),linear-gradient(#8fd3ff 0%,#c9efff 45%,#e9f9d8 70%,#9ed36a 82%,#6fae45 100%)}'
+'.fr-canopy{position:absolute;left:-5%;right:-5%;top:-34px;height:92px;z-index:1;background:radial-gradient(circle at 8% 60%,#2f8f3a 0 38px,transparent 39px),radial-gradient(circle at 22% 40%,#3aa548 0 48px,transparent 49px),radial-gradient(circle at 38% 65%,#2f8f3a 0 42px,transparent 43px),radial-gradient(circle at 54% 35%,#3aa548 0 50px,transparent 51px),radial-gradient(circle at 70% 62%,#2f8f3a 0 44px,transparent 45px),radial-gradient(circle at 86% 40%,#3aa548 0 48px,transparent 49px),radial-gradient(circle at 98% 62%,#2f8f3a 0 40px,transparent 41px)}'
+'.fr-q{position:relative;z-index:5;margin:8px 8px 0;background:rgba(18,30,80,.9);border:2px solid #9fd0ff;border-radius:14px;padding:6px 12px 8px;box-shadow:0 6px 16px rgba(0,0,0,.3);flex:none}'
+'.fr-q small{color:#cfe3ff;display:flex;align-items:center;gap:6px;flex-wrap:wrap;font-size:clamp(13px,1.4vw,16px)}.fr-q p{margin:3px 0 5px;font-weight:800;font-size:clamp(20px,3.2vw,36px);line-height:1.25}'
+'.fr-bar{height:7px;border-radius:9px;background:rgba(255,255,255,.2);overflow:hidden}.fr-bar i{display:block;height:100%;width:100%;background:linear-gradient(90deg,#7CFF9E,#FFD23F);transform-origin:left}'
+'.fr-bar.hot i{background:#FF6B6B}'
+'.fr-field{position:relative;flex:1;min-height:0;display:flex;gap:0}'
+'.fr-half{position:relative;flex:1;min-width:0;touch-action:none;overflow:hidden}'
+'.fr-vs .fr-half+.fr-half{border-left:4px solid rgba(255,255,255,.85)}'
+'.fr-vs .fr-half.h0{background:linear-gradient(transparent 60%,rgba(80,150,255,.18))}.fr-vs .fr-half.h1{background:linear-gradient(transparent 60%,rgba(255,110,110,.18))}'
+'.fr-tag{position:absolute;top:6px;left:50%;transform:translateX(-50%);z-index:4;font-weight:800;font-size:13px;padding:2px 10px;border-radius:999px;background:rgba(0,0,0,.45);white-space:nowrap}'
+'.fr-lanes{position:absolute;inset:0;display:flex;z-index:2}'
+'.fr-lane{flex:1;position:relative;border-left:2px dashed rgba(255,255,255,.4)}.fr-lane:first-child{border-left:0}'
+'.fr-lane.on{background:linear-gradient(transparent 25%,rgba(255,236,120,.3))}'
+'.fr-fruit{position:absolute;left:50%;top:0;transform:translateX(-50%);width:calc(100% - 6px);max-width:320px;display:flex;flex-direction:column;align-items:center;gap:2px;will-change:top;transition:opacity .4s}'
+'.fr-fruit i{font-style:normal;font-size:clamp(32px,6vh,60px);line-height:1;filter:drop-shadow(0 4px 3px rgba(0,0,0,.3));transition:filter .6s,transform .6s}'
+'.fr-fruit span{background:#fff;color:#1b2440;border-radius:12px;padding:4px 8px;font-weight:800;font-size:clamp(16px,2.4vw,30px);line-height:1.18;text-align:center;box-shadow:0 3px 8px rgba(0,0,0,.25);border:2px solid #1b2440;display:-webkit-box;-webkit-line-clamp:5;-webkit-box-orient:vertical;overflow:hidden;max-width:100%}'
+'.fr-vs .fr-fruit span{font-size:clamp(14px,1.75vw,24px);padding:3px 5px}'
+'.fr-fruit b{position:absolute;left:-2px;top:-4px;background:#1d4fd8;color:#fff;border-radius:50%;width:28px;height:28px;font-size:16px;display:flex;align-items:center;justify-content:center}'
+'.fr-fruit.right span{background:#4BE38D}.fr-fruit.right i{filter:drop-shadow(0 0 12px #FFE27A)}'
+'.fr-fruit.dim{opacity:.25}'
+'.fr-fruit.rot i{filter:sepia(1) saturate(2.5) hue-rotate(-25deg) brightness(.45);transform:scale(.85) rotate(-12deg)}.fr-fruit.rot span{background:#7a5a3a;color:#fff}'
+'.fr-fruit.rot::after{content:"🦠";position:absolute;top:-10px;right:18%;font-size:22px;animation:frfly .6s ease-in-out infinite alternate}'
+'@keyframes frfly{to{transform:translate(8px,-6px)}}'
+'.fr-fruit.toss{transition:left .8s ease-in,top .8s ease-in,transform .8s ease-in,opacity .8s;opacity:0;transform:translateX(-50%) rotate(260deg) scale(.4)}'
+'.fr-fruit.inbask{transition:left .7s ease-in-out,top .7s ease-in-out,transform .7s,opacity .7s;transform:translateX(-50%) scale(.35);opacity:.2}'
/* Con vật */
+'.fr-pet{position:absolute;bottom:6px;left:50%;z-index:4;width:clamp(78px,15vh,140px);height:calc(clamp(78px,15vh,140px)*1.38);transform:translateX(-50%);pointer-events:none}'
+'.fr-vs .fr-pet{width:clamp(66px,13vh,120px);height:calc(clamp(66px,13vh,120px)*1.38)}'
+'.fr-pet .body{width:100%;height:100%;filter:drop-shadow(0 6px 4px rgba(0,0,0,.28));transition:transform .15s;transform-origin:50% 90%}'
+'.fr-pet .shadow{position:absolute;left:15%;right:15%;bottom:-3px;height:10px;border-radius:50%;background:rgba(0,0,0,.25);z-index:-1}'
+'.fr-pet.happy .body{animation:frhop .5s}.fr-pet.sad .body{animation:frshake .5s}'
+'@keyframes frhop{40%{transform:translateY(-16%) scale(1.06)}}@keyframes frshake{20%,60%{transform:translateX(-8px)}40%,80%{transform:translateX(8px)}}'
/* Giỏ và thùng rác */
+'.fr-basket{position:absolute;top:30px;z-index:6;background:rgba(120,72,30,.9);border:3px solid #e2b06b;border-radius:12px 12px 18px 18px;padding:4px 8px;min-width:90px;max-width:34%}'
+'.fr-basket.l{left:8px}.fr-basket.r{right:8px}'
+'.fr-basket b{display:block;font-size:12px;color:#ffe9c2}.fr-basket div{font-size:clamp(16px,2.8vh,24px);line-height:1.15;letter-spacing:-2px;min-height:24px}'
+'.fr-basket div i{font-style:normal;display:inline-block;animation:frpop .5s}@keyframes frpop{0%{transform:scale(2.2)}100%{transform:none}}'
+'.fr-trash{position:absolute;bottom:8px;z-index:6;font-size:clamp(28px,5vh,42px)}.fr-trash.l{left:10px}.fr-trash.r{right:10px}'
+'.fr-fb{position:absolute;left:50%;top:40%;transform:translate(-50%,-50%);z-index:8;background:rgba(10,20,60,.92);border:2px solid #fff;border-radius:14px;padding:8px 14px;font-weight:800;font-size:clamp(14px,2.1vw,20px);text-align:center;width:max-content;max-width:88%;display:none}'
+'.fr-fb.show{display:block;animation:frpop .35s}.fr-fb.good{border-color:#4BE38D}.fr-fb.bad{border-color:#FF6B6B}.fr-fb small{display:block;font-weight:500;font-size:13px;color:#e6ecff;margin-top:4px}'
/* Camera ở góc trên của mỗi sân */
+'.fr-cam{position:absolute!important;top:auto;bottom:8px;z-index:3;opacity:.92;width:min(30%,190px);height:auto!important;aspect-ratio:4/3;border-width:2px;border-radius:10px}'
+'.fr-cam.l{left:8px}.fr-cam.r{right:8px}.fr-cam .gc-msg{font-size:11px;padding:3px 5px}'
+'.fr-cam select{position:absolute;left:3px;right:30px;bottom:3px;z-index:3;font-size:11px;max-width:calc(100% - 34px);background:rgba(10,18,60,.85);color:#fff;border:1px solid #9fd0ff;border-radius:6px}'
+'.fr-cam .fr-flip{position:absolute;right:3px;bottom:3px;z-index:3;width:24px;height:22px;padding:0;border-radius:6px;border:1px solid #9fd0ff;background:rgba(10,18,60,.85);color:#fff;font-size:12px}'
+'.fr-cal{position:absolute;inset:0;z-index:9;display:flex;align-items:center;justify-content:center;background:rgba(10,18,60,.55)}'
+'.fr-cal>div{background:#16205a;border:2px solid #9fd0ff;border-radius:16px;padding:14px 18px;max-width:min(92%,520px);text-align:center;display:flex;flex-direction:column;gap:8px}'
+'.fr-cal big{font-size:46px;font-weight:800;color:#FFD23F}.fr-cal p{margin:0}'
+'@media(max-height:540px) and (orientation:landscape){.fr-q{padding:4px 10px}.fr-q p{font-size:18px}.fr-qh p{font-size:16px}.fr-fruit i{font-size:28px}.fr-fruit span{font-size:15px}.fr-vs .fr-fruit span{font-size:13px}.fr-cam{width:min(26%,140px)}}'
/* Đối kháng: khung câu hỏi riêng trên sân mỗi phe; giỏ xuống góc dưới phía ngoài, camera ngay trên giỏ */
+'.fr-qh{position:absolute;left:6px;right:6px;top:6px;margin:0;padding:5px 9px 6px;z-index:5}'
+'.fr-qh p{font-size:clamp(17px,2.4vw,30px);margin:2px 0 4px;line-height:1.22}.fr-qh small{font-size:clamp(12px,1.2vw,15px)}'
+'.h1 .fr-qh{border-color:#FFB3B3}'
+'.fr-vs .fr-basket{top:auto;bottom:8px;z-index:3}.fr-vs .fr-cam{bottom:66px}'
+'@media(prefers-reduced-motion:reduce){.fr-pet.happy .body,.fr-pet.sad .body,.fr-fruit.rot::after{animation:none}}';
function css(){var o=$('frCss');if(o)o.remove();var s=document.createElement('style');s.id='frCss';s.textContent=CSS;document.head.appendChild(s)}

/* ================= BẮT ĐẦU ================= */
function start(){
 stop();css();
 var r=A.roster(),st=A.st,vs=st.mode=='vs',need=vs?2:1;
 if(st.sel.length!=need)return alert(vs?'Chế độ đối kháng: hãy chọn 2 thí sinh.':'Hãy chọn 1 thí sinh.');
 var P=A.pool().filter(function(q){return q.t=='mc'||q.t=='tf'});
 if(P.length<N)return alert('Phạm vi này chưa đủ '+N+' câu trắc nghiệm, đúng/sai. Hãy chọn phạm vi rộng hơn.');
 var byL=function(a,b){return a.l-b.l},qs,qs2=null;
 if(!vs)qs=A.fresh(P).slice(0,N).sort(byL).map(A.prep);
 else{
  /* Đối kháng: mỗi phe một bộ câu hỏi KHÁC NHAU nhưng từng cặp câu cùng cấp độ (và cùng dạng nếu được), để không nhìn bài nhau.
     Bỏ câu "nghe – chọn từ" vì hai phe nghe hai từ khác nhau cùng lúc sẽ lẫn. */
  var F=A.fresh(P.filter(function(q){return !q.lis}));
  if(F.length<2*N)return alert('Phạm vi này chưa đủ '+(2*N)+' câu cho hai phe. Hãy chọn phạm vi rộng hơn.');
  var a=F.slice(0,N).sort(byL),used={},rest=F.slice(N);
  a.forEach(function(q){used[F.indexOf(q)]=1});
  var b=a.map(function(q){
   var pick=function(t){for(var i=0;i<rest.length;i++){var x=rest[i];if(!x._u&&t(x)){x._u=1;return x}}return null};
   return pick(function(x){return x.l==q.l&&x.t==q.t})||pick(function(x){return x.l==q.l})||pick(function(x){return Math.abs(x.l-q.l)<=1})||pick(function(){return true});
  });
  rest.forEach(function(x){delete x._u});
  qs=a.map(A.prep);qs2=b.map(A.prep);
 }
 var cam=st.frcam!==false&&!!(window.DTKSACK&&DTKSACK.gcam);
 var p1=petOf(st.frpet),p2=petOf(st.frpet2,PETS[1]);if(vs&&p2[0]==p1[0])p2=PETS[(PETS.indexOf(p1)+1)%PETS.length];
 var mk=function(k,pet){return{k:k,p:r[st.sel[k]],pet:pet,tx:.5,ax:.5,basket:[],xp:0,stk:0,best:0,seen:0,flip:false,mood:'idle'}};
 S={qs:qs,i:-1,vs:vs,sides:vs?[mk(0,p1),mk(1,p2)]:[mk(0,p1)],cam:cam,phase:'cal',lock:true};
 S.sides[0].qs=qs;if(vs)S.sides[1].qs=qs2;
 A.setScreen('play');document.body.setAttribute('data-game','fruit');setVh();
 /* Bố trí mỗi sân: giỏ ở góc trên, camera ở góc dưới phía ngoài, thùng rác ở góc dưới đối diện camera */
 var half=function(sd){var k=sd.k,out=vs?(k?'r':'l'):'r',bsk=vs?out:'l',trash=out=='l'?'r':'l';
  return '<div class="fr-half h'+k+'" id="frH'+k+'">'
   /* Đối kháng: khung câu hỏi riêng ở đầu sân mỗi phe */
   +(vs?'<div class="fr-q fr-qh" id="frQ'+k+'"><small style="color:'+(k?'#FFB3B3':'#B9D8FF')+';font-weight:800">'+(k?'PHE 2':'PHE 1')+' · '+esc(sd.p.n)+'</small><p>Chuẩn bị!</p><div class="fr-bar"><i></i></div></div>':'')
   +'<div class="fr-lanes" id="frL'+k+'"></div>'
   +'<div class="fr-pet" id="frP'+k+'"><div class="body">'+petSVG(sd.pet[0],'idle')+'</div><span class="shadow"></span></div>'
   +'<div class="fr-basket '+bsk+'" id="frB'+k+'"><b>🧺 Giỏ '+(vs?esc(sd.p.n):'hoa quả')+'</b><div></div></div><div class="fr-trash '+trash+'" aria-hidden="true">🗑️</div>'
   +(cam?'<div class="gc-box fr-cam '+out+'" id="frC'+k+'"><video playsinline muted autoplay></video><canvas></canvas><div class="gc-msg"></div>'+(vs?'<select id="frSel'+k+'" aria-label="Chọn camera cho '+(k?'phe 2':'phe 1')+'" hidden></select><button class="fr-flip" data-act="frflip" data-v="'+k+'" aria-label="Đảo chiều trái phải" title="Đảo chiều trái – phải">⇆</button>':'')+'</div>':'')
   +'<div class="fr-fb" id="frFb'+k+'" role="status"></div></div>'};
 var pills=S.sides.map(function(sd){return '<span class="fr-pill p'+sd.k+'" id="frS'+sd.k+'">'+(vs?esc(sd.p.n)+': ':'')+'🍎 0 quả</span>'}).join('');
 var who=S.sides.map(function(sd){return AVH(sd.p.e)+' '+esc(sd.p.n)+' – '+sd.pet[1].toLowerCase()}).join(' ⚔️ ');
 document.getElementById('app').innerHTML='<div class="fr'+(vs?' fr-vs':'')+'">'
  +'<div class="fr-hud"><button class="btn ghost sm" data-act="frquit" aria-label="Thoát">✕</button><span class="gname">🧺 Hứng hoa quả'+(vs?' · Đối kháng':'')+'</span>'
  +'<span class="fr-pill" id="frNo">Câu 0/'+N+'</span>'+pills
  +'<button class="btn ghost sm" data-act="snd" aria-label="Bật hoặc tắt âm thanh">'+(window.SND&&!SND.isOn()?'🔇':'🔊')+'</button></div>'
  +'<div class="fr-scene" id="frScene"><div class="fr-canopy"></div>'
  +(vs?'':'<div class="fr-q" id="frQ"><small>'+who+'</small><p>Chuẩn bị hứng hoa quả!</p><div class="fr-bar" id="frBar"><i></i></div></div>')
  +'<div class="fr-field">'+S.sides.map(half).join('')+'</div>'
  +'<div class="fr-cal" id="frCal"><div><h3 style="margin:0">🧺 Sẵn sàng hứng hoa quả!</h3>'
  +(cam?'<p id="frCalMsg">📷 Đang mở camera…</p><small>'+(vs?'Mỗi phe đứng trước camera của phe mình (hoặc phe 1 bên trái, phe 2 bên phải nếu dùng chung 1 camera), cách khoảng 2 m. ':'Đứng cách camera khoảng 2 m. ')+'Bước sang trái, sang phải để con vật chạy theo. Đứng dưới quả mang đáp án đúng khi quả rơi xuống (15 giây).</small>'
   :'<p>'+(vs?'Phe 1: phím A / D · Phe 2: phím ← / →. Hoặc chạm, kéo trên sân của mình.':'Chạm hoặc kéo trên sân, hoặc dùng phím ← →.')+'</p><small>Đứng dưới quả mang đáp án đúng khi quả rơi xuống (15 giây).</small>')
  +'<big id="frCount"></big><button class="btn" data-act="frgo">▶ Bắt đầu</button></div></div>'
  +'</div></div>';
 S.sides.forEach(function(sd){bindPointer(sd)});
 if(cam)camStart();
 loop();
}

/* ================= CAMERA =================
   Chơi đơn: bộ camera một người của sack.js (chọn người gần camera nhất).
   Đối kháng: máy có từ 2 camera → mỗi phe một camera, mỗi camera một bộ nhận dạng; chỉ có 1 camera → chia đôi khung hình. */
var CAM={on:false,src:[],raf:0,last:0,devs:[]};
function posOf(lm){if(!lm||!lm[11]||!lm[12])return null;var v=function(p){return p.visibility==null||p.visibility>0.4};if(!v(lm[11])||!v(lm[12]))return null;return (lm[11].x+lm[12].x)/2}
function msgCal(t){var m=$('frCalMsg');if(m)m.textContent=t}
function camStart(){
 var me=S;
 if(!S.vs){
  DTKSACK.gcam.start($('frC0'),function(x,now){onPos(0,x,now)},posOf,{any:true}).then(function(ok){
   if(S!==me)return;if(!ok){S.cam=false;msgCal('Không dùng được camera – chạm, kéo hoặc dùng phím ← → để di chuyển.')}else msgCal('🧍 Bước vào khung hình…');
  });return;
 }
 if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia){S.cam=false;msgCal('Trình duyệt không hỗ trợ camera – dùng phím hoặc chạm để di chuyển.');return}
 var L=DTKSACK.gcam.lib;CAM.on=true;CAM.src=[];
 L.getStream(null).then(function(st0){
  if(S!==me||!CAM.on){st0.getTracks().forEach(function(t){t.stop()});return}
  var id0=(st0.getVideoTracks()[0].getSettings()||{}).deviceId;
  return navigator.mediaDevices.enumerateDevices().then(function(ds){
   CAM.devs=ds.filter(function(d){return d.kind=='videoinput'});
   var other=CAM.devs.filter(function(d){return d.deviceId&&d.deviceId!==id0})[0];
   CAM.src[0]={stream:st0,dev:id0,sides:other?[0]:[0,1],shared:!other};
   attach(0,st0);if(!other)attach(1,st0);
   fillSel();
   msgCal('⏳ Đang tải bộ nhận dạng động tác…');
   return L.sharedPL().then(function(pl){
    CAM.src[0].pl=pl;
    if(other)return useDev(1,other.deviceId);
   });
  });
 }).then(function(){
  if(S!==me||!CAM.on)return;msgCal(CAM.src[0]&&CAM.src[0].shared?'🧍 Camera chung: phe 1 đứng bên trái, phe 2 đứng bên phải khung hình…':'🧍 Mỗi phe bước vào khung hình camera của mình…');
  cancelAnimationFrame(CAM.raf);CAM.raf=requestAnimationFrame(camLoop);
 }).catch(function(e){
  if(S!==me)return;S.cam=false;msgCal(e&&e.name=='NotAllowedError'?'Chưa được phép dùng camera – dùng phím hoặc chạm để di chuyển.':'Không mở được camera (lần đầu cần mạng) – dùng phím hoặc chạm để di chuyển.');
 });
}
function attach(k,stream){var b=$('frC'+k);if(!b)return;b.classList.toggle('mirror',DTKSACK.gcam.face()=='user');var v=b.querySelector('video');v.srcObject=stream;var p=v.play();if(p&&p.catch)p.catch(function(){})}
function fillSel(){
 [0,1].forEach(function(k){var s=$('frSel'+k);if(!s)return;
  s.innerHTML=(CAM.devs.length<2?'':'<option value="">Camera chung (chia đôi)</option>')+CAM.devs.map(function(d,i){return '<option value="'+d.deviceId+'">'+esc(d.label||('Camera '+(i+1)))+'</option>'}).join('');
  var src=CAM.src[k]&&CAM.src[k].sides.indexOf(k)>=0?CAM.src[k]:CAM.src[0];s.value=src&&!src.shared?src.dev:'';
  s.hidden=CAM.devs.length<2;s.onchange=function(){useDev(k,s.value)};
 });
}
/* Cho phe k dùng camera riêng (id) hoặc quay về camera chung chia đôi (id rỗng) */
function useDev(k,id){
 var L=DTKSACK.gcam.lib,me=S;
 if(k==0){ /* Đổi camera của phe 1: mở lại nguồn 0 */
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
 CAM.src.forEach(function(s,si){
  if(!s||!s.pl)return;var b=$('frC'+s.sides[0]),v=b&&b.querySelector('video');if(!v||v.readyState<2||!v.videoWidth)return;
  var res;try{res=s.pl.detectForVideo(v,now)}catch(e){return}
  var poses=res&&res.landmarks||[];
  if(s.shared){
   /* Camera chung: người đứng bên trái khung hình (như soi gương) là phe 1, bên phải là phe 2 */
   [0,1].forEach(function(k){var best=null,bw=0;poses.forEach(function(p){var cx=posOf(p);if(cx==null)return;var mx=user?1-cx:cx;if((k==0?mx<0.5:mx>=0.5)){var w=Math.abs(p[11].x-p[12].x);if(w>bw){bw=w;best=p}}});
    var c=$('frC'+k);if(c)L.drawTo(c.querySelector('canvas'),v,best,k?'#FF6F6F':'#4C9AFF');
    var x=best?posOf(best):null;if(x!=null){var mx=user?1-x:x;seen[k]=1;onPos(k,k==0?mx/0.5:(mx-0.5)/0.5,now,true)}});
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
/* x: vị trí ngang (0–1). mapped=true: đã quy đổi sẵn theo nửa khung hình (camera chung) */
function onPos(k,x,now,mapped){
 if(!S)return;var sd=S.sides[k];if(!sd)return;
 if(x==null){sd.seen=0;return}
 var mx=mapped?x:(DTKSACK.gcam.face()=='user'?1-x:x),pos=mapped?Math.max(0,Math.min(1,(mx-0.1)/0.8)):Math.max(0,Math.min(1,(mx-0.18)/0.64));
 if(sd.flip)pos=1-pos;sd.tx=pos;
 if(S.phase=='cal'){
  if(!sd.seen)sd.seen=now;
  var all=S.sides.every(function(s){return s.seen&&now-s.seen>1200});
  if(all&&!S.cd){S.cd=Date.now();msgCal('✅ Máy đã nhận ra '+(S.vs?'cả hai phe':'em')+'! Bắt đầu sau…')}
  else if(!S.cd)msgCal(S.vs?'👀 Đang nhận diện: '+S.sides.map(function(s){return (s.k?'Phe 2 ':'Phe 1 ')+(s.seen?'✅':'…')}).join(' · '):'👀 Đang nhận diện… đứng yên một chút');
 }
}
/* Chạm / kéo / chuột trên sân của mình */
function bindPointer(sd){
 var h=$('frH'+sd.k);if(!h)return;
 var set=function(e){if(!S||e.target.closest('button,select'))return;var r=h.getBoundingClientRect();sd.tx=Math.max(0,Math.min(1,(e.clientX-r.left)/r.width))};
 h.addEventListener('pointerdown',function(e){sd.drag=true;set(e)});
 h.addEventListener('pointermove',function(e){if(sd.drag||e.pointerType=='mouse'&&e.buttons)set(e)});
 h.addEventListener('pointerup',function(){sd.drag=false});h.addEventListener('pointerleave',function(){sd.drag=false});
}
document.addEventListener('keydown',function(e){
 if(!S||!$('frScene'))return;var k=null,dir=0;
 if(e.key=='ArrowLeft'||e.key=='ArrowRight'){k=S.vs?1:0;dir=e.key=='ArrowLeft'?-1:1}
 else if(S.vs&&(e.key=='a'||e.key=='A'||e.key=='d'||e.key=='D')){k=0;dir=/a/i.test(e.key)?-1:1}
 if(k==null)return;e.preventDefault();var sd=S.sides[k],n=sd.n||4,lane=Math.max(0,Math.min(n-1,Math.floor(sd.tx*n)+dir));sd.tx=(lane+.5)/n;
});
function go(){if(!S||S.phase!='cal')return;var c=$('frCal');if(c)c.remove();S.phase='play';snd('tap');next()}

/* ================= CÂU HỎI ================= */
function next(){
 if(!S)return;S.i++;
 if(S.i>=S.qs.length)return end();
 S.lock=false;S.t0=Date.now();S.beat=0;
 $('frNo').textContent='Câu '+(S.i+1)+'/'+N;
 var qvs=[];
 /* Mỗi phe một câu hỏi riêng (chơi đơn: chỉ một phe) */
 S.sides.forEach(function(sd){
  var k=sd.k,q=sd.q=sd.qs[S.i],labels=q.t=='tf'?['Đúng','Sai']:q.o.slice(),n=sd.n=labels.length,fr=sd.fr=shuf(FRUITS).slice(0,n);
  sd.vals=q.t=='tf'?['1','0']:labels.map(function(x,j){return String(j)});
  var qv=Object.assign({},q,{o:labels,nol:1});qvs.push(qv);
  var head='<small>'+(S.vs?'<b style="color:'+(k?'#FFB3B3':'#B9D8FF')+'">'+(k?'PHE 2':'PHE 1')+' · '+esc(sd.p.n)+'</b> · ':'')+esc(q.c)+' – '+A.LVN[q.l-1]+(q.t=='tf'?' · Đúng hay sai?':'')+(A.sayB?' '+A.sayB(qv,'fr'+k):'')+'</small>';
  var card=$(S.vs?'frQ'+k:'frQ');card.innerHTML=head+'<p>'+esc(q.q)+'</p><div class="fr-bar"><i></i></div>';
  $('frL'+k).innerHTML=labels.map(function(t,j){return '<div class="fr-lane" data-l="'+j+'"><div class="fr-fruit" id="frF'+k+'_'+j+'"><b>'+'ABCD'[j]+'</b><i>'+fr[j]+'</i><span>'+esc(t)+'</span></div></div>'}).join('');
  var fb=$('frFb'+k);fb.className='fr-fb';setMood(sd,'idle');
 });
 /* Giọng đọc: chơi đơn đọc câu hỏi; đối kháng đọc lần lượt câu của phe 1 rồi phe 2 */
 if(A.sayAuto){
  if(!S.vs)A.sayAuto(qvs[0]);
  else{var a=qvs[0],b=qvs[1];A.sayAuto({q:(a.en?'Team 1: ':'Phe 1: ')+a.q+(a.en?'. Team 2: ':'. Phe 2: ')+b.q,t:'num',en:a.en&&b.en?1:0,c:a.c},'frboth')}
 }
}
function setMood(sd,m){if(sd.mood==m)return;sd.mood=m;var b=$('frP'+sd.k);if(b)b.querySelector('.body').innerHTML=petSVG(sd.pet[0],m)}
function loop(){
 cancelAnimationFrame(raf);
 var step=function(){
  if(!S||!$('frScene'))return;raf=requestAnimationFrame(step);
  var p=S.phase=='play'&&!S.lock?Math.min(1,(Date.now()-S.t0)/DUR):0,anyN=0;
  S.sides.forEach(function(sd){
   var n=sd.n||0;anyN=anyN||n;
   /* Con vật chạy theo vị trí người chơi, mượt; nghiêng người theo hướng chạy */
   var d=sd.tx-sd.ax;sd.ax+=d*0.22;var pe=$('frP'+sd.k);
   if(pe){pe.style.left=(6+sd.ax*88)+'%';var bd=pe.querySelector('.body');if(bd&&!pe.classList.contains('happy')&&!pe.classList.contains('sad'))bd.style.transform='rotate('+Math.max(-10,Math.min(10,d*70))+'deg)'}
   var lane=n?Math.max(0,Math.min(n-1,Math.floor(sd.ax*n))):-1;sd.lane=lane;
   var ls=$('frL'+sd.k);if(ls)[].forEach.call(ls.children,function(l,j){l.classList.toggle('on',j==lane&&S.phase=='play'&&!S.lock)});
   /* Quả rơi từ dưới khung câu hỏi của phe (đối kháng) hoặc từ đầu sân (chơi đơn) đến giỏ trên đầu con vật */
   if(p&&pe){var qc=S.vs?$('frQ'+sd.k):null,top=qc?qc.offsetTop+qc.offsetHeight+4:4,catchY=pe.offsetTop+pe.offsetHeight*0.06;
    for(var j=0;j<n;j++){var f=$('frF'+sd.k+'_'+j);if(f)f.style.top=Math.max(top,top+(catchY-f.offsetHeight-top)*p)+'px'}}
  });
  if(S.phase=='cal'&&S.cd){var left=3-Math.floor((Date.now()-S.cd)/1000),c=$('frCount');if(c)c.textContent=left>0?left:'';if(left<=0)go()}
  if(S.phase!='play'||S.lock||!anyN)return;
  [].forEach.call(document.querySelectorAll('.fr-bar'),function(bar){bar.firstChild.style.transform='scaleX('+(1-p).toFixed(3)+')';bar.classList.toggle('hot',p>0.7)});
  var sec=Math.ceil((1-p)*DUR/1000);if(sec<=5&&sec>0&&sec!==S.beat){S.beat=sec;snd('beat',sec)}
  if(p>=1)resolve();
 };
 raf=requestAnimationFrame(step);
}

/* ================= HỨNG QUẢ ================= */
function resolve(){
 if(!S||S.lock)return;S.lock=true;
 var me=S,anyOk=false,anyBad=false,anyE=false;
 S.sides.forEach(function(sd){
  var q=sd.q,k=sd.k,lane=sd.lane,v=sd.vals[lane],ok=A.judge(q,v),f=$('frF'+k+'_'+lane),pe=$('frP'+k),fb=$('frFb'+k),h=$('frH'+k);
  if(q.e)anyE=true;
  sd.vals.forEach(function(x,j){var e=$('frF'+k+'_'+j);if(!e||j==lane)return;if(A.judge(q,x))e.classList.add('right');else e.classList.add('dim')});
  pe.classList.remove('happy','sad');void pe.offsetWidth;
  if(ok){
   anyOk=true;sd.basket.push(sd.fr[lane]);sd.stk++;if(sd.stk>sd.best)sd.best=sd.stk;sd.xp+=10+2*q.l;
   setMood(sd,'happy');pe.classList.add('happy');
   var bk=$('frB'+k);if(f&&bk){f.classList.add('inbask');var hr=h.getBoundingClientRect(),br=bk.getBoundingClientRect(),lr=f.parentNode.getBoundingClientRect();f.style.left=(br.left-lr.left+br.width/2)+'px';f.style.top=(br.top-hr.top)+'px'}
   var fruit=sd.fr[lane];setTimeout(function(){if(S!==me)return;$('frB'+k).querySelector('div').insertAdjacentHTML('beforeend','<i>'+fruit+'</i>');$('frS'+k).textContent=(S.vs?sd.p.n+': ':'')+fruit+' '+sd.basket.length+' quả'},650);
   fb.className='fr-fb good show';fb.innerHTML='✅ Hứng đúng! '+sd.fr[lane]+' vào giỏ.';
  }else{
   anyBad=true;sd.stk=0;setMood(sd,'sad');pe.classList.add('sad');
   if(f){f.classList.add('rot');setTimeout(function(){if(S!==me||!f.parentNode)return;var hr=h.getBoundingClientRect(),tr=h.querySelector('.fr-trash').getBoundingClientRect(),lr=f.parentNode.getBoundingClientRect();f.classList.add('toss');f.style.left=(tr.left-lr.left+tr.width/2)+'px';f.style.top=(tr.top-hr.top)+'px'},1000)}
   fb.className='fr-fb bad show';fb.innerHTML='🤢 Quả hỏng rồi, vứt đi thôi!'+(S.vs?'':' Đáp án đúng: <b>'+esc(A.ansText(q))+'</b>'+(q.e?'<small>'+esc(q.e)+'</small>':''));
  }
 });
 if(anyOk)snd('happy');if(anyBad)setTimeout(function(){snd('crash')},anyOk?250:0);
 /* Đối kháng: đáp án đúng và lời giải hiện ở khung câu hỏi của từng phe */
 if(S.vs)S.sides.forEach(function(sd){var q=sd.q,qq=$('frQ'+sd.k);if(qq)qq.insertAdjacentHTML('beforeend','<small style="color:#9CFFB8;margin-top:4px;display:block">✔ Đáp án đúng: '+esc(A.ansText(q))+(q.e?' – '+esc(q.e):'')+'</small>')});
 setTimeout(function(){if(S===me&&S.phase=='play'){S.sides.forEach(function(sd){$('frP'+sd.k).classList.remove('happy','sad')});next()}},anyBad?(anyE?4200:3000):2300);
}

/* ================= KẾT THÚC ================= */
function end(){
 if(!S)return;var me=S;S.phase='end';
 if(window.DTKSACK&&DTKSACK.gcam)DTKSACK.gcam.stop();camStop();cancelAnimationFrame(raf);
 var res=S.sides.map(function(sd){var n=sd.basket.length;return A.award(sd.p.n,{xp:sd.xp+(n==N?50:0),streak:sd.best,badges:n>=8?['fruit']:[]})});
 A.setScreen('result');
 var big=function(sd,cls){var n=sd.basket.length;return '<div style="flex:1;min-width:150px"><div style="width:110px;height:150px;margin:0 auto">'+petSVG(sd.pet[0],cls)+'</div><b>'+AVH(sd.p.e)+' '+esc(sd.p.n)+'</b><div style="font-size:clamp(22px,4.5vw,34px);line-height:1.2;margin:4px 0">'+(sd.basket.join('')||'🍂')+'</div><p style="margin:0">Hứng được <b>'+n+'/'+N+'</b> quả</p></div>'};
 var head,body,party;
 if(S.vs){
  var a=S.sides[0],b=S.sides[1],na=a.basket.length,nb=b.basket.length,w=na==nb?null:(na>nb?a:b);party=!!w;
  head=w?'🏆 '+esc(w.p.n)+' THẮNG!':'🤝 HAI PHE HOÀ NHAU!';
  body='<div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">'+big(a,w===b?'sad':'happy')+big(b,w===a?'sad':'happy')+'</div>';
 }else{
  var sd=S.sides[0],n=sd.basket.length;party=n>=8;
  head=n==N?'🏆 GIỎ ĐẦY ẮP!':n>=5?'🧺 THU HOẠCH TỐT!':'🧺 CỐ LÊN NHÉ!';body=big(sd,n>=5?'happy':'sad');
 }
 document.getElementById('app').innerHTML=(party?A.confetti(30):'')+'<section class="hero center result'+(party?' win':'')+'"><h1 class="title sm">'+head+'</h1>'+body+'</section>'
  +'<div class="rewards">'+S.sides.map(function(sd,i){return A.rewardHTML(sd.p.n,sd.p.e,res[i])}).join('')+'</div><div class="cta"><button class="btn big" data-act="start">↻ Chơi lại</button><button class="btn ghost" data-act="menu">Đổi trò chơi</button></div>';
 snd(party||!S.vs&&S.sides[0].basket.length>=5?'win':'sad');
 A.celebrate(res);S=null;
}
function stop(){cancelAnimationFrame(raf);camStop();if(S&&window.DTKSACK&&DTKSACK.gcam)DTKSACK.gcam.stop();S=null}
function click(a,v){
 if(a=='frgo'){go();return true}
 if(a=='frflip'){var sd=S&&S.sides[+v];if(sd){sd.flip=!sd.flip;snd('tap')}return true}
 if(a=='frquit'){if(confirm('Dừng hứng hoa quả và thoát?')){stop();A.menu()}return true}
 return false;
}
window.addEventListener('resize',function(){if(S)setVh()});
window.DTKFRUIT={start:start,stop:stop,click:click,S:function(){return S},onPos:onPos,resolve:resolve,PETS:PETS,petSVG:petSVG,petIcon:petIcon};
})();
