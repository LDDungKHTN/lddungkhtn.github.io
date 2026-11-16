/* Giải cứu thú cưng: trả lời bằng vận động cơ thể trước camera (hoặc chạm màn hình).
   Cún con hoặc mèo con bị nhốt trong phòng kín, nước đổ vào từ trên trần.
   Đúng: mở thêm một van thoát nước dưới sàn. Sai: nước đổ vào nhanh hơn. Sai quá 3 câu hoặc nước ngập kín: thất bại.
   2 đội theo lượt: hai phòng (Đội Xanh – cún con, Đội Đỏ – mèo con), hai đội thay nhau trả lời; đội nào mở đủ 10 van trước thắng.
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
+'@media(prefers-reduced-motion:reduce){.rs-stream,.rs-water::before,.rs-bub,.rs-valve.open,.rs-scene.danger{animation:none}}'
/* Giao diện thêm: thú cưng (SVG), chế độ 2 đội (hai phòng hai bên, câu hỏi ở giữa) */
+'.rs-man svg{width:100%;height:100%;display:block;overflow:visible;filter:drop-shadow(0 4px 4px rgba(0,0,0,.35))}'
+'.rs-team{position:absolute;left:6px;top:6px;z-index:8;font-weight:800;font-size:13px;padding:2px 10px;border-radius:999px;background:rgba(0,0,0,.55)}'
+'.rs-turn .rs-main{grid-template-columns:minmax(0,1fr) minmax(0,1.05fr) minmax(0,1fr)}'
+'.rs-turn .rs-scene.cur{border-color:#FFE27A;box-shadow:0 0 0 3px #FFE27A,0 0 24px rgba(255,226,122,.7)}'
+'.rs-turn .rs-scene.t0 .rs-team{color:#B9D8FF}.rs-turn .rs-scene.t1 .rs-team{color:#FFB3B3}'
+'.rs-turn .rs-cam.gc-box{position:relative;left:auto;top:auto;width:100%;max-width:360px;margin:0 auto;flex:none}'
+'.rs-turn .rs-side.cal .rs-cam.gc-box{max-width:none}'
+'.rs-turnbox{border-radius:14px;padding:8px 10px;text-align:center;font-weight:800;font-size:clamp(15px,1.8vw,20px)}'
+'.rs-turnbox.t0{background:rgba(37,99,235,.35);border:2px solid #7FB8FF}.rs-turnbox.t1{background:rgba(192,57,43,.35);border:2px solid #FF9F9F}'
+'.rs-pill.t0{border-color:#7FB8FF}.rs-pill.t1{border-color:#FF9F9F}'
+'@media(orientation:portrait){.rs-turn .rs-main{grid-template-columns:1fr 1fr;grid-template-rows:minmax(0,40%) minmax(0,1fr)}.rs-turn .rs-side{grid-column:1 / span 2;grid-row:2}}';
function css(){var o=$('rsCss');if(o)o.remove();var s=document.createElement('style');s.id='rsCss';s.textContent=CSS;document.head.appendChild(s)}

/* ================= THÚ CƯNG CẦN GIẢI CỨU (SVG): cún con và mèo con =================
   mood: idle (sợ hãi, vẫy tay kêu cứu) · happy (vui) · sad (khóc) · win (được cứu, giơ hai tay) */
function petSVG(kind,mood){
 var cat=kind=='cat',fur=cat?'#B8B9C9':'#E2A86A',dark=cat?'#7E8096':'#9A5F2E',light=cat?'#F1F1F6':'#FBE6C8',ink='#2B1B12',h='';
 /* Đuôi */
 h+=cat?'<path d="M86 168 C112 166 116 140 104 126" stroke="'+fur+'" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M106 132 l6 -3 M109 141 l6 0 M108 151 l6 2" stroke="'+dark+'" stroke-width="3"/>'
  :'<path d="M86 166 C108 162 112 146 106 134" stroke="'+fur+'" stroke-width="9" fill="none" stroke-linecap="round" class="rs-tail"/>';
 /* Chân và thân */
 h+='<ellipse cx="45" cy="187" rx="13" ry="9" fill="'+fur+'"/><ellipse cx="75" cy="187" rx="13" ry="9" fill="'+fur+'"/>';
 h+='<ellipse cx="60" cy="150" rx="31" ry="36" fill="'+fur+'"/><ellipse cx="60" cy="157" rx="19" ry="25" fill="'+light+'"/>';
 if(cat)h+='<path d="M36 136 q8 -4 12 2 M34 152 q8 -4 12 2 M84 136 q-8 -4 -12 2 M86 152 q-8 -4 -12 2" stroke="'+dark+'" stroke-width="3" fill="none" stroke-linecap="round"/>';
 /* Vòng cổ: cún có thẻ tên, mèo có chuông */
 h+='<path d="M36 112 Q60 124 84 112" stroke="'+(cat?'#E84393':'#E74C3C')+'" stroke-width="7" fill="none" stroke-linecap="round"/>'+(cat?'<circle cx="60" cy="122" r="5.5" fill="#F7C948" stroke="#B7791F" stroke-width="1.5"/>':'<circle cx="60" cy="122" r="5.5" fill="#F7C948" stroke="#B7791F" stroke-width="1.5"/><text x="60" y="124.5" font-size="6" text-anchor="middle" fill="#7A4B0B" font-weight="700">♥</text>');
 /* Tay: sợ hãi thì vẫy một tay kêu cứu, được cứu thì giơ cả hai tay */
 var up='<path d="M36 132 Q20 112 22 92" stroke="'+fur+'" stroke-width="12" fill="none" stroke-linecap="round"/><circle cx="22" cy="90" r="8" fill="'+light+'"/>';
 var upR='<path d="M84 132 Q100 112 98 92" stroke="'+fur+'" stroke-width="12" fill="none" stroke-linecap="round"/><circle cx="98" cy="90" r="8" fill="'+light+'"/>';
 var down='<path d="M36 134 Q28 152 36 164" stroke="'+fur+'" stroke-width="12" fill="none" stroke-linecap="round"/><circle cx="37" cy="165" r="7.5" fill="'+light+'"/>';
 var downR='<path d="M84 134 Q92 152 84 164" stroke="'+fur+'" stroke-width="12" fill="none" stroke-linecap="round"/><circle cx="83" cy="165" r="7.5" fill="'+light+'"/>';
 h+=mood=='win'||mood=='happy'?up+upR:mood=='sad'?down+downR:'<g class="rs-wave">'+up+'</g>'+downR;
 /* Tai */
 if(cat)h+='<path d="M30 50 L34 14 L56 36Z" fill="'+fur+'"/><path d="M90 50 L86 14 L64 36Z" fill="'+fur+'"/><path d="M35 42 L37 22 L50 36Z" fill="#F6A6C1"/><path d="M85 42 L83 22 L70 36Z" fill="#F6A6C1"/>';
 /* Đầu */
 h+='<circle cx="60" cy="62" r="36" fill="'+fur+'"/>';
 if(cat)h+='<path d="M50 30 l3 10 M60 28 v11 M70 30 l-3 10" stroke="'+dark+'" stroke-width="3" stroke-linecap="round"/>';
 else h+='<ellipse cx="44" cy="52" rx="12" ry="10" fill="'+light+'" opacity=".55"/>';
 h+='<ellipse cx="60" cy="76" rx="20" ry="15" fill="'+light+'"/>';
 /* Tai cụp của cún (vẽ sau đầu để rủ xuống hai bên) */
 if(!cat)h+='<ellipse cx="25" cy="58" rx="11" ry="22" transform="rotate(18 25 58)" fill="'+dark+'"/><ellipse cx="95" cy="58" rx="11" ry="22" transform="rotate(-18 95 58)" fill="'+dark+'"/>';
 /* Mắt */
 if(mood=='happy'||mood=='win')h+='<path d="M41 60 Q47 52 53 60 M67 60 Q73 52 79 60" stroke="'+ink+'" stroke-width="3.5" fill="none" stroke-linecap="round"/>';
 else h+='<ellipse cx="47" cy="58" rx="6.5" ry="7.5" fill="'+ink+'"/><ellipse cx="73" cy="58" rx="6.5" ry="7.5" fill="'+ink+'"/><circle cx="49.5" cy="55" r="2.6" fill="#fff"/><circle cx="75.5" cy="55" r="2.6" fill="#fff"/><circle cx="45" cy="61" r="1.2" fill="#fff"/><circle cx="71" cy="61" r="1.2" fill="#fff"/>'
  +'<path d="M39 49 Q46 47 53 44 M81 49 Q74 47 67 44" stroke="'+ink+'" stroke-width="2.6" fill="none" stroke-linecap="round"/>';
 /* Mũi, miệng, râu */
 h+=cat?'<path d="M56 70 L64 70 L60 75Z" fill="#E86A92"/>':'<ellipse cx="60" cy="70" rx="7" ry="5" fill="'+ink+'"/><ellipse cx="58" cy="68.5" rx="2" ry="1.2" fill="#fff" opacity=".7"/>';
 if(mood=='happy'||mood=='win')h+='<path d="M50 78 Q60 92 70 78 Z" fill="#B23B4B"/><path d="M55 84 Q60 92 65 84 Q60 86 55 84Z" fill="#FF8FA3"/>';
 else if(mood=='sad')h+='<path d="M52 86 Q60 79 68 86" stroke="'+ink+'" stroke-width="2.6" fill="none" stroke-linecap="round"/><path d="M44 66 q-5 10 0 13 q5 -3 0 -13z" fill="#6EC6FF"/><path d="M76 66 q-5 10 0 13 q5 -3 0 -13z" fill="#6EC6FF"/>';
 else h+='<ellipse cx="60" cy="83" rx="4.5" ry="5.5" fill="#7A1F2B"/>';
 if(cat)h+='<path d="M44 74 L24 70 M44 78 L24 80 M76 74 L96 70 M76 78 L96 80" stroke="'+ink+'" stroke-width="1.4" opacity=".55"/>';
 if(mood!='sad')h+='<circle cx="38" cy="72" r="5" fill="#FF8FA3" opacity=".5"/><circle cx="82" cy="72" r="5" fill="#FF8FA3" opacity=".5"/>';
 return '<svg viewBox="0 0 120 200" aria-hidden="true">'+h+'</svg>';
}
var PETNAME={dog:'cún con',cat:'mèo con'};

/* ---------- Nhận dạng động tác (toạ độ quy về đơn vị chiều cao khung hình) ----------
   B: tư thế chuẩn của người chơi (đứng thẳng, nhìn màn hình), được đo lúc khởi động (và mỗi khi đổi người ở chế độ 2 đội), cập nhật dần. */
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

/* ---------- Bắt đầu ván ----------
   Chơi đơn: một phòng. 2 đội theo lượt: hai phòng (Đội Xanh – cún con, Đội Đỏ – mèo con), câu hỏi ở giữa,
   hai đội thay nhau trả lời cho phòng của mình; đội nào mở đủ van trước thắng, phòng nào ngập / sai quá 3 câu thì đội đó thua. */
function start(){
 stop();css();
 var r=A.roster(),st=A.st,turn=st.mode=='turn';
 if(turn?st.sel.length<2:st.sel.length!=1)return alert(turn?'Chế độ 2 đội theo lượt: hãy chọn từ 2 thí sinh trở lên.':'Trò này chơi một người: hãy chọn 1 thí sinh.');
 var P=A.pool().filter(function(q){return q.t=='mc'||q.t=='tf'});
 if(P.length<VALVES+MAXW)return alert('Phạm vi này chưa đủ câu trắc nghiệm, đúng/sai. Hãy chọn phạm vi rộng hơn.');
 var qs=A.fresh(P).slice(0,Math.min(P.length,turn?48:24)).sort(function(a,b){return a.l-b.l}).map(A.prep);
 var cam=!!st.rscam&&!!(window.DTKSACK&&DTKSACK.gcam);
 var room=function(k,pet){return{k:k,pet:pet,lv:8,open:0,wrong:0,burst:0,ok:0,phase:'play',mood:'',mt:0}};
 S={qs:qs,i:0,n:0,p:r[st.sel[0]],turn:turn,rooms:turn?[room(0,'dog'),room(1,'cat')]:[room(0,st.rspet=='cat'?'cat':'dog')],cur:0,
  xp:0,best:0,stk:0,phase:cam?'cal':'play',cam:cam,lock:true,armed:false,calm:0,hv:null,last:Date.now(),beat:0};
 if(turn){S.T=A.teamsOf(st.sel.map(function(i){return r[i]}));S.ps={};S.p=S.T[0][0]}
 B=null;
 A.setScreen('play');document.body.setAttribute('data-game','rescue');setVh();
 var camBox=cam?'<div class="gc-box rs-cam" id="rsCam"><video class="gc-bg" playsinline muted autoplay></video><video class="gc-sharp" playsinline muted autoplay aria-hidden="true"></video><canvas></canvas><span class="gc-ges" id="rsGes"></span><div class="gc-msg"></div></div>':'';
 var pills=S.rooms.map(function(R){var k=R.k;return '<span class="rs-pill'+(turn?' t'+k:'')+'" id="rsValves'+k+'">'+(turn?(k?'🔴 ':'🔵 '):'')+'🔧 Van mở: 0/'+VALVES+'</span><span class="rs-pill'+(turn?' t'+k:'')+'" id="rsLives'+k+'"></span>'}).join('');
 var scenes=S.rooms.map(function(R){return sceneHTML(R,turn?'':camBox)});
 document.getElementById('app').innerHTML='<div class="rs'+(turn?' rs-turn':'')+'">'
  +'<div class="rs-hud"><button class="btn ghost sm" data-act="rsquit" aria-label="Thoát">✕</button><span class="gname">🌊 Giải cứu thú cưng'+(turn?' · 2 đội':'')+'</span>'
  +pills
  +'<button class="btn ghost sm" data-act="snd" aria-label="Bật hoặc tắt âm thanh">'+(window.SND&&!SND.isOn()?'🔇':'🔊')+'</button></div>'
  +'<div class="rs-main">'+(turn?scenes[0]+'<div class="rs-side" id="rsSide">'+camBox+'<div id="rsQ"></div></div>'+scenes[1]:scenes[0]+'<div class="rs-side" id="rsSide"><div id="rsQ"></div></div>')+'</div></div>';
 S.rooms.forEach(function(R){lives(R);render(R)});
 if(cam)calStart();else if(turn)swap();else ask();
 clearInterval(tmr);tmr=setInterval(tick,100);
}
function sceneHTML(R,camBox){
 var k=R.k,vs='',dr='',i;
 for(i=0;i<VALVES;i++)vs+='<span class="rs-valve" id="rsv'+k+'_'+i+'"></span>';
 for(i=0;i<VALVES;i++)dr+='<span class="rs-drain" id="rsd'+k+'_'+i+'" style="left:'+(2+96*(i+.5)/VALVES)+'%"></span>';
 var help=R.pet=='cat'?'MEO MEO! CỨU EM!':'GÂU GÂU! CỨU EM!';
 return '<div class="rs-scene t'+k+'" id="rsScene'+k+'" style="--lv:'+R.lv+';--floor:13%">'
  +(S.turn?'<span class="rs-team">'+(k?'🔴 PHÒNG ĐỘI ĐỎ':'🔵 PHÒNG ĐỘI XANH')+'</span>':'')
  +'<div class="rs-wall"></div><div class="rs-win"></div>'+(S.turn?'':'<div class="rs-sign">⚠ PHÒNG KÍN – CHỈ MỞ ĐƯỢC VAN BẰNG KIẾN THỨC!</div>')+'<div class="rs-danger"><span>MỨC NGUY HIỂM</span></div>'
  +'<div class="rs-pipe"></div><div class="rs-stream" id="rsStream'+k+'"></div><div class="rs-splash"></div>'
  +'<div class="rs-man" id="rsMan'+k+'">'+petSVG(R.pet,'idle')+'</div><div class="rs-help" id="rsHelp'+k+'">'+help+'</div>'
  +'<div class="rs-water"><span class="rs-bub" style="left:20%"></span><span class="rs-bub" style="left:46%;animation-delay:.8s"></span><span class="rs-bub" style="left:74%;animation-delay:1.6s"></span></div>'
  +dr+'<div class="rs-floor">'+vs+'</div><div class="rs-gauge"><i></i></div><div class="rs-lvtxt" id="rsLvTxt'+k+'"></div>'
  +camBox+'</div>';
}
function setVh(){document.documentElement.style.setProperty('--vh',window.innerHeight+'px')}
function lives(R){var e=$('rsLives'+R.k);if(!e||!S)return;var h='';for(var i=0;i<MAXW;i++)h+='<i class="'+(i<MAXW-R.wrong?'on':'')+'">❤️</i>';e.innerHTML='Được sai: '+h}
function curRoom(){return S.rooms[S.cur]||S.rooms[0]}

/* ---------- Khởi động camera: đo tư thế chuẩn rồi cho thử động tác ---------- */
function calStart(){
 var o=document.createElement('div');o.className='rs-q rs-calbox';o.id='rsOvl';
 o.innerHTML='<div><h3>📷 Chuẩn bị giải cứu</h3>'+(S.turn?'<p class="rs-turnbox t0">🔵 Đội Xanh: '+S.T[0].map(function(p){return esc(p.n)}).join(', ')+'<br>🔴 Đội Đỏ: '+S.T[1].map(function(p){return esc(p.n)}).join(', ')+'</p><p><small>Bạn đầu tiên: <b>'+esc(S.p.n)+'</b> (Đội Xanh). Mỗi lượt một bạn ra trước camera.</small></p>':'')
  +'<p><small>Đứng cách camera khoảng 2 m, thấy rõ đầu, vai và hai tay.</small></p><p id="rsCalMsg">Đang mở camera…</p><div class="rs-cal"><i id="rsCalBar"></i></div>'
  +'<div class="rs-try">'+KEY.map(function(k,i){return '<span id="rsTry'+k+'"><b>'+GES[k][0]+'</b>'+'ABCD'[i]+'. '+GES[k][1]+'</span>'}).join('')+'</div>'
  +'<p><small>Thử từng động tác: ô sáng xanh là máy đã nhận ra. Đưa hai tay lên vỗ tay để bắt đầu, hoặc bấm nút.</small></p>'
  +'<button class="btn" data-act="rsgo">▶ Bắt đầu giải cứu</button></div>';
 $('rsQ').appendChild(o);
 (S.turn?$('rsSide'):$('rsScene0')).classList.add('cal');
 S.cal={n:0,ok:false,goT:0};
 var me=S;
 DTKSACK.gcam.start($('rsCam'),onG,classify).then(function(ok){
  if(S!==me)return;
  if(!ok){S.cam=false;var m=$('rsCalMsg');if(m)m.textContent='Không dùng được camera – chuyển sang chạm màn hình để chọn đáp án.';setTimeout(function(){if(S===me&&S.phase=='cal')go()},2200)}
  else{var m2=$('rsCalMsg');if(m2)m2.textContent='Đứng thẳng, nhìn vào màn hình, thấy rõ đầu, vai và hai tay…'}
 });
}
function go(){if(!S||S.phase!='cal')return;var o=$('rsOvl');if(o)o.remove();var sc=$('rsScene0');if(sc)sc.classList.remove('cal');var sd=$('rsSide');if(sd)sd.classList.remove('cal');S.phase='play';S.last=Date.now();snd('tap');if(S.turn)S.rooms.forEach(function(R){var e=$('rsScene'+R.k);if(e)e.classList.toggle('cur',R.k==0)});ask()}

/* ---------- 2 đội: đổi lượt ----------
   Lượt chẵn của Đội Xanh, lượt lẻ của Đội Đỏ; trong đội các bạn lần lượt thay nhau.
   Đổi người: nước tạm ngừng dâng, máy ghi nhớ lại tư thế của bạn mới (khoảng 1,5 giây) rồi mới hỏi. */
function swap(){
 if(!S)return;
 var t=S.cur=S.n%2,mem=S.T[t],np=mem[Math.floor(S.n/2)%mem.length];S.p=np;
 S.rooms.forEach(function(R){var e=$('rsScene'+R.k);if(e)e.classList.toggle('cur',R.k==t)});
 var first=S.phase=='play'&&S.n==0&&!S.cam;
 S.phase='swap';S.lock=true;S.swapT=Date.now();S.cal={n:0,acc:null};
 if(S.cam)B=null;
 $('rsQ').innerHTML='<div class="rs-q rs-turnbox t'+t+'">🔄 Lượt của '+(t?'🔴 Đội Đỏ':'🔵 Đội Xanh')+'<br><span style="font-size:1.3em">'+AVH(np.e)+' '+esc(np.n)+'</span><br><small style="font-weight:600">'+(S.cam?'Vào trước camera, đứng thẳng nhìn màn hình…':'Chuẩn bị trả lời cho '+(t?'mèo con':'cún con')+' của đội mình!')+'</small>'+(S.cam?'<div class="rs-cal"><i id="rsCalBar"></i></div>':'')+'</div>';
 snd('tap');
 if(!S.cam){var me=S;setTimeout(function(){if(S===me&&S.phase=='swap'){S.phase='play';S.last=Date.now();ask()}},first?1200:2200)}
 else{var me2=S;setTimeout(function(){if(S===me2&&S.phase=='swap'&&!B&&LAST){/* quá 12 giây chưa đo xong: dùng tư thế gần nhất */B={sw:LAST.sw,y:LAST.my,ny:Math.max(0.02,LAST.hy||0.1),sg:LAST.sg}}if(S===me2&&S.phase=='swap'){S.phase='play';S.last=Date.now();ask()}},12000)}
}
function onG(g,now){
 if(!S)return;
 var ge=$('rsGes');if(ge)ge.textContent=g?GES[g][0]+' '+GES[g][1]:'';
 if(S.phase=='swap'){
  if(B)return;
  if(LAST&&LAST.hy!=null){S.cal.n++;if(!S.cal.acc)S.cal.acc={sw:0,y:0,ny:0};S.cal.acc.sw+=LAST.sw;S.cal.acc.y+=LAST.my;S.cal.acc.ny+=LAST.hy}
  var bar=$('rsCalBar');if(bar)bar.style.width=Math.min(100,S.cal.n/12*100)+'%';
  if(S.cal.n>=12&&Date.now()-S.swapT>1500){var a=S.cal.acc,n=S.cal.n;B={sw:a.sw/n,y:a.y/n,ny:Math.max(0.02,a.ny/n),sg:LAST.sg};snd('happy');S.phase='play';S.last=Date.now();ask()}
  return;
 }
 if(S.phase=='cal'){
  if(!B){
   /* Đo tư thế chuẩn trong khoảng 1,5 giây khi người chơi đứng yên */
   if(LAST&&LAST.hy!=null){S.cal.n++;if(!S.cal.acc)S.cal.acc={sw:0,y:0,ny:0};S.cal.acc.sw+=LAST.sw;S.cal.acc.y+=LAST.my;S.cal.acc.ny+=LAST.hy}
   var bar2=$('rsCalBar');if(bar2)bar2.style.width=Math.min(100,S.cal.n/12*100)+'%';
   if(S.cal.n>=12){var a2=S.cal.acc,n2=S.cal.n;B={sw:a2.sw/n2,y:a2.y/n2,ny:Math.max(0.02,a2.ny/n2),sg:LAST.sg};var m=$('rsCalMsg');if(m)m.textContent='✅ Máy đã nhận ra em! Thử các động tác bên dưới.';snd('happy')}
   return;
  }
  KEY.forEach(function(k){var t=$('rsTry'+k);if(t){t.classList.toggle('on',g==k);if(g==k)t.classList.add('done')}});
  if(g=='C'){if(!S.cal.goT)S.cal.goT=now;else if(now-S.cal.goT>1500)go()}else S.cal.goT=0;
  return;
 }
 if(S.phase!='play'||S.lock){S.hv=null;return}
 if(!S.armed){if(!g){if(!S.calm)S.calm=now;if(now-S.calm>400)S.armed=true}else S.calm=0;return}
 var q=S.q,v=gVal(q,g),side=$('rsQ');if(!side)return;
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
 var q=S.q=S.qs[S.i],cam=S.cam,t=S.cur;
 var em=function(k){return cam?'<em><i>'+GES[k][0]+'</i>'+GES[k][1]+'</em>':''};
 var opts=q.t=='mc'?q.o.map(function(o,i){return '<button class="rs-opt'+(cam?' cam':'')+'" '+(cam?'':'data-act="rsans" ')+'data-v="'+i+'"><b>'+'ABCD'[i]+'</b><span>'+esc(o)+'</span>'+em(KEY[i])+'</button>'}).join('')
  :'<button class="rs-opt'+(cam?' cam':'')+'" '+(cam?'':'data-act="rsans" ')+'data-v="1"><b>A</b><span>Đúng</span>'+em('L')+'</button><button class="rs-opt'+(cam?' cam':'')+'" '+(cam?'':'data-act="rsans" ')+'data-v="0"><b>B</b><span>Sai</span>'+em('R')+'</button>';
 var R=curRoom();
 $('rsQ').innerHTML=(S.turn?'<div class="rs-turnbox t'+t+'" style="padding:4px 8px;font-size:15px">Lượt '+(t?'🔴 Đội Đỏ':'🔵 Đội Xanh')+': '+AVH(S.p.e)+' '+esc(S.p.n)+'</div>':'')
  +'<div class="rs-q"><small>Câu '+(S.turn?S.n+1:R.ok+R.wrong+1)+' · '+esc(q.c)+' – '+A.LVN[q.l-1]+(q.t=='tf'?' · Đúng hay sai?':'')+(A.sayB?' '+A.sayB(q):'')+'</small><p>'+esc(q.q)+'</p></div><div class="rs-opts">'+opts+'</div><div class="rs-fb" id="rsFb" role="status">'+(cam?'Giữ động tác khoảng 1 giây để chốt đáp án.':'Chạm vào đáp án em chọn.')+'</div>';
 if(A.sayAuto)A.sayAuto(q);
 S.lock=false;S.armed=false;S.calm=0;S.hv=null;
}
function pick(v){
 if(!S||S.lock||S.phase!='play')return;S.lock=true;
 var q=S.q,ok=A.judge(q,v),side=$('rsQ'),R=curRoom(),k=R.k;
 [].forEach.call(side.querySelectorAll('.rs-opt'),function(b){var i=+b.getAttribute('data-v'),right=q.t=='mc'?i==q.a:(i==1)==q.a;b.classList.remove('hold');if(right)b.classList.add('ok');else if(String(b.getAttribute('data-v'))==String(v))b.classList.add('bad');else b.classList.add('dim');b.disabled=true});
 var fb=$('rsFb'),me=S,ps=S.turn?(S.ps[S.p.n]=S.ps[S.p.n]||{xp:0,ok:0,stk:0,best:0}):S;
 var nextStep=function(ms){setTimeout(function(){if(S===me&&S.phase=='play'){S.i++;if(S.turn){S.n++;swap()}else ask()}},ms)};
 if(ok){
  R.ok++;ps.stk++;if(ps.stk>ps.best)ps.best=ps.stk;ps.xp+=10+2*q.l;if(S.turn)ps.ok++;
  var vi=R.open++;var ve=$('rsv'+k+'_'+vi),de=$('rsd'+k+'_'+vi);if(ve)ve.classList.add('open');if(de)de.classList.add('on');
  R.burst-=10;mood(R,'happy',1300);anim(R,'hop');snd('happy');
  var e=$('rsValves'+k);if(e)e.textContent=(S.turn?(k?'🔴 ':'🔵 '):'')+'🔧 Van mở: '+R.open+'/'+VALVES;
  fb.className='rs-fb good';fb.innerHTML='✅ Chính xác! Van thoát nước số '+R.open+(S.turn?' của '+(k?'Đội Đỏ':'Đội Xanh'):'')+' đã mở.';
  if(R.open>=VALVES){R.phase='win';S.phase='over';setTimeout(function(){if(S===me)win(R)},900);return}
  nextStep(1600);
 }else{
  R.wrong++;ps.stk=0;R.burst+=7;mood(R,'sad',1800);anim(R,'shake');snd('crash');lives(R);
  fb.className='rs-fb bad';fb.innerHTML='❌ Sai rồi! Nước đổ vào '+(S.turn?'phòng '+(k?'Đội Đỏ':'Đội Xanh')+' ':'')+'nhanh hơn. Đáp án đúng: <b>'+esc(A.ansText(q).replace(/^ĐÚNG$/,'A. Đúng').replace(/^SAI$/,'B. Sai'))+'</b>'+(q.e?'<small>'+esc(q.e)+'</small>':'');
  if(R.wrong>MAXW){R.phase='flood';S.phase='over';return}
  nextStep(q.e?3200:2300);
 }
}

/* ---------- Nước chảy theo thời gian (mỗi phòng một mực nước) ---------- */
function rateIn(R){return (S.turn?0.32:0.6)*(1+0.4*R.wrong)}   /* % mỗi giây; 2 đội chơi xen kẽ nên nước dâng chậm hơn */
function tick(){
 if(!S||!$('rsScene0')){clearInterval(tmr);return}
 var now=Date.now(),dt=Math.min(0.5,(now-S.last)/1000);S.last=now;
 S.rooms.forEach(function(R){
  if(S.phase=='play'&&R.phase=='play'){
   var d=(rateIn(R)-0.1*R.open)*dt;
   if(R.burst){var s=Math.sign(R.burst)*Math.min(Math.abs(R.burst),12*dt);R.burst-=s;d+=s}
   R.lv=Math.max(0,Math.min(100,R.lv+d));
   if(R.lv>=100){R.phase='flood';S.phase='over'}
  }else if(R.phase=='flood'){R.lv=Math.min(100,R.lv+14*dt);if(R.lv>=100&&!R.lostT){R.lostT=now;lose(R)}}
  else if(R.phase=='win'){R.lv=Math.max(0,R.lv-25*dt)}
  render(R);
  if(S.phase=='play'&&R.lv>80&&now-S.beat>1000){S.beat=now;snd('beat',3)}
 });
}
function render(R){
 var sc=$('rsScene'+R.k);if(!sc||!S)return;
 sc.style.setProperty('--lv',R.lv.toFixed(1));
 var flow=R.phase=='win'?0:R.phase=='flood'?40:Math.min(40,12+R.wrong*8);
 var stEl=$('rsStream'+R.k);if(stEl){stEl.style.setProperty('--fw',flow+'px');stEl.style.display=flow?'':'none';sc.querySelector('.rs-splash').style.display=flow?'':'none'}
 /* Thú cưng đứng trên sàn, nước dâng cao thì nổi lên theo mặt nước (đầu vẫn nhô lên) */
 var mb=Math.max(0,Math.min(56,R.lv*0.87-28));sc.style.setProperty('--mb',mb+'%');
 sc.classList.toggle('danger',R.phase!='win'&&R.lv>75);
 var t=$('rsLvTxt'+R.k);if(t)t.textContent='💧 '+Math.round(R.lv)+'%';
 if(!R.mt){var m=R.phase=='win'?'win':R.lv>60?'sad':'idle';if(m!=R.mood)setMood(R,m)}
}
function setMood(R,m){R.mood=m;var e=$('rsMan'+R.k);if(e)e.innerHTML=petSVG(R.pet,m)}
function mood(R,m,ms){setMood(R,m);clearTimeout(R.mtT);var me=S;R.mt=1;R.mtT=setTimeout(function(){if(S===me){R.mt=0;R.mood=''}},ms)}
function anim(R,c){var e=$('rsMan'+R.k);if(!e)return;e.classList.remove('hop','shake');void e.offsetWidth;e.classList.add(c)}

/* ---------- Kết thúc ---------- */
function win(R){
 if(!S)return;var me=S;setMood(R,'win');anim(R,'hop');snd('win');
 var h=$('rsHelp'+R.k);if(h){h.textContent=(R.pet=='cat'?'MEO! ':'GÂU! ')+'CẢM ƠN BẠN! 🎉';h.style.color='#1E8449'}
 setTimeout(function(){if(S===me)end(R.k,true)},2600);
}
function lose(R){
 if(!S)return;var me=S;setMood(R,'sad');snd('sad');
 var h=$('rsHelp'+R.k);if(h)h.textContent='…';
 setTimeout(function(){if(S===me)end(R.k,false)},2000);
}
/* k: phòng vừa kết thúc; ok: phòng đó được cứu (true) hay bị ngập (false) */
function end(k,ok){
 DTKSACK&&DTKSACK.gcam&&DTKSACK.gcam.stop();clearInterval(tmr);
 var R=S.rooms[k];
 A.setScreen('result');
 if(S.turn){
  var wt=ok?k:1-k,why=ok?(k?'Đội Đỏ':'Đội Xanh')+' mở đủ '+VALVES+' van, cứu được '+PETNAME[R.pet]+' trước!':(k?'Phòng Đội Đỏ':'Phòng Đội Xanh')+(R.wrong>MAXW?' đã trả lời sai quá '+MAXW+' câu.':' đã ngập kín.');
  var all=S.T[0].concat(S.T[1]),res=all.map(function(p){var s=S.ps[p.n]||{xp:0,best:0},t=S.T[0].indexOf(p)>=0?0:1;return A.award(p.n,{xp:s.xp+(t==wt?50:0),streak:s.best,badges:t==wt?['rescue']:[]})});
  var tb=function(t){var RR=S.rooms[t];return '<div style="flex:1;min-width:150px"><div style="width:110px;height:180px;margin:0 auto">'+petSVG(RR.pet,t==wt?'win':'sad')+'</div><b style="color:'+(t?'#FF9F9F':'#7FB8FF')+'">'+(t?'🔴 Đội Đỏ':'🔵 Đội Xanh')+(t==wt?' 🏆':'')+'</b><div class="small">'+S.T[t].map(function(p){return AVH(p.e)+' '+esc(p.n)}).join(', ')+'</div><p style="margin:2px 0">🔧 '+RR.open+'/'+VALVES+' van · ❌ '+RR.wrong+' câu sai</p></div>'};
  document.getElementById('app').innerHTML=A.confetti(30)+'<section class="hero center result win"><h1 class="title sm">🏆 '+(wt?'ĐỘI ĐỎ':'ĐỘI XANH')+' THẮNG!</h1><p>'+why+'</p><div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">'+tb(0)+tb(1)+'</div></section>'
   +'<div class="rewards">'+all.map(function(p,i){return A.rewardHTML(p.n,p.e,res[i])}).join('')+'</div><div class="cta"><button class="btn big" data-act="start">↻ Chơi lại</button><button class="btn ghost" data-act="menu">Đổi trò chơi</button></div>';
  A.celebrate(res);S=null;return;
 }
 var p=S.p,res1=A.award(p.n,{xp:S.xp+(ok?50:0),streak:S.best,badges:ok?['rescue']:[]}),why1=R.wrong>MAXW?'Đã trả lời sai quá '+MAXW+' câu.':'Nước đã ngập kín căn phòng.';
 document.getElementById('app').innerHTML=(ok?A.confetti(30):'')+'<section class="hero center result'+(ok?' win':'')+'"><div style="width:130px;height:210px;margin:0 auto">'+petSVG(R.pet,ok?'win':'sad')+'</div>'
  +(ok?'<h1 class="title sm">🌊 GIẢI CỨU THÀNH CÔNG!</h1><p>'+AVH(p.e)+' '+esc(p.n)+' đã mở đủ '+VALVES+' van thoát nước, cứu được '+PETNAME[R.pet]+'! Đúng '+R.ok+' câu, sai '+R.wrong+' câu.</p>'
   :'<h1 class="title sm">Giải cứu chưa thành công!</h1><p>'+why1+' Đã mở '+R.open+'/'+VALVES+' van. '+PETNAME[R.pet].replace(/^./,function(c){return c.toUpperCase()})+' vẫn đang chờ em, ôn lại bài và thử lại nhé!</p>')
  +'</section><div class="rewards">'+A.rewardHTML(p.n,p.e,res1)+'</div><div class="cta"><button class="btn big" data-act="start">↻ Chơi lại</button><button class="btn ghost" data-act="menu">Đổi trò chơi</button></div>';
 A.celebrate([res1]);S=null;
}
function stop(){clearInterval(tmr);if(S&&window.DTKSACK&&DTKSACK.gcam)DTKSACK.gcam.stop();S=null;B=null}
function click(a,v){
 if(a=='rsgo'){go();return true}
 if(a=='rsans'){pick(v);return true}
 if(a=='rsquit'){if(confirm('Dừng giải cứu và thoát?')){stop();A.menu()}return true}
 return false;
}
window.addEventListener('resize',function(){if(S)setVh()});
window.DTKRESCUE={start:start,stop:stop,click:click,classify:classify,S:function(){return S},B:function(){return B},setB:function(b){B=b},onG:onG,pick:pick,petSVG:petSVG};
})();
