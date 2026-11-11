/* PHÒNG CHƠI TRỰC TUYẾN – nhiều máy thi cùng lúc.
   Kết nối trực tiếp giữa các máy bằng PeerJS (máy chủ trung gian công cộng chỉ giúp các máy tìm thấy nhau).
   Chủ phòng giữ câu hỏi và đáp án, chấm điểm; người chơi chỉ nhận câu hỏi (không nhận đáp án trước).
   Gói tin: join, welcome, lobby, start, q, ans, ack, rev, end, closed. */
(function(){
'use strict';
var A=window.DTKAPI;if(!A)return;
var PEERJS='https://cdn.jsdelivr.net/npm/peerjs@1.5.4/dist/peerjs.min.js',
    QRJS='https://cdn.jsdelivr.net/npm/qrcode-generator@1.4.4/qrcode.js',
    PFX='dtk-phong-',MAXP=60;
var app=document.getElementById('app'),esc=A.esc;
function $(s){return document.querySelector(s)}
function $$(s){return [].slice.call(document.querySelectorAll(s))}
function load(k,d){try{var v=JSON.parse(localStorage.getItem(k));return v==null?d:v}catch(e){return d}}
function save(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
function snd(f,x){A.snd(f,x)}
function loadJS(u,test){return new Promise(function(res,rej){if(test())return res();var s=document.createElement('script');s.src=u;s.onload=function(){test()?res():rej(new Error('lib'))};s.onerror=function(){rej(new Error('lib'))};document.head.appendChild(s)})}
function libPeer(){return loadJS(PEERJS,function(){return !!window.Peer})}
function code5(){var c='ABCDEFGHJKMNPQRSTUVWXYZ23456789',s='';for(var i=0;i<5;i++)s+=c.charAt(Math.floor(Math.random()*c.length));return s}
function link(code){return location.origin+location.pathname+'?phong='+code}
var COL=['c0','c1','c2','c3'],SHAPE=['▲','◆','●','■'];
/* Luật từng trò khi chơi trong phòng */
var RG={
 mil:{ico:'💰',name:'Ai là triệu phú',types:['mc'],time:30,elim:true,d:'Câu trắc nghiệm từ dễ đến khó. Trả lời sai là bị loại, ai trụ lâu nhất và nhanh nhất thắng.'},
 flash:{ico:'⚡',name:'Nhanh như chớp',types:['tf','mc'],time:12,d:'Đúng/sai và trắc nghiệm. Ai trả lời đúng và nhanh nhất được nhiều điểm nhất.'},
 num:{ico:'🔢',name:'Giải mã con số',types:['num'],time:45,d:'Nhập đáp án là một con số. Đúng và nhanh được nhiều điểm.'},
 squid:{ico:'🌉',name:'Vượt cầu sinh tồn',types:['mc','tf'],time:25,elim:true,slabs:true,d:'Mỗi câu là một tầng đá trên vực sâu. Chọn sai là rơi. Ai leo cao nhất thắng.'},
 sack:{ico:'🦘',name:'Nhảy bao bố (2 đội)',types:['mc','tf'],time:30,team:true,d:'Chia 2 đội Xanh – Đỏ. Mỗi câu, đội có từ một nửa số bạn trả lời đúng được nhảy 1 bước.'}};
var R=null;   /* trạng thái phòng hiện tại */
var cfg={game:'flash',n:10};

/* ================= MÀN CHÍNH CỦA PHÒNG ================= */
function roomHome(){
 leave(true);A.stopAll();A.setScreen('room');A.header();
 var g=A.st.g;
 app.innerHTML='<div class="bar-top"><button class="btn ghost sm" data-act="'+(g?'home':'grade')+'">◀ Quay lại</button><h2>🌐 Phòng chơi trực tuyến</h2></div>'
 +'<p class="muted">Mỗi bạn dùng điện thoại hoặc máy tính của mình, vào cùng một phòng để thi đấu trực tiếp. Cần kết nối Internet.</p>'
 +'<div class="rm-two">'
 +'<section class="panel"><h3>🎤 Tạo phòng</h3>'+(g?'<p>Thầy cô hoặc một bạn làm <b>chủ phòng</b>: chọn trò chơi, phạm vi câu hỏi lớp '+g+', rồi chiếu mã phòng cho cả lớp.</p><button class="btn big" data-act="rmnew">Tạo phòng lớp '+g+'</button>':'<p>Hãy chọn lớp trước để lấy câu hỏi.</p><button class="btn" data-act="grade">Chọn lớp</button>')+'</section>'
 +'<section class="panel"><h3>🙋 Vào phòng</h3><p>Nhập mã phòng do chủ phòng đọc hoặc chiếu trên màn hình.</p><div class="row"><input id="jcode" maxlength="5" placeholder="Mã phòng" aria-label="Mã phòng" autocomplete="off" autocapitalize="characters"><button class="btn" data-act="rmjoin">Vào phòng</button></div></section>'
 +'</div>';
}

/* ================= CHỦ PHÒNG ================= */
function hostSetup(){
 A.stopAll();A.setScreen('room');
 var keep=R&&R.role=='host';
 app.innerHTML='<div class="bar-top"><button class="btn ghost sm" data-act="'+(keep?'rmlobby':'room')+'">◀ Quay lại</button><h2>🎤 '+(keep?'Ván mới – phòng '+R.code:'Tạo phòng lớp '+A.st.g)+'</h2></div>'
 +'<section class="panel"><h3>① Trò chơi</h3><div class="games">'+Object.keys(RG).map(function(id){var x=RG[id];return '<button class="game'+(id==cfg.game?' on':'')+'" data-act="rmgame" data-v="'+id+'"><span class="gi">'+x.ico+'</span><b>'+x.name+'</b><small>'+x.d+'</small></button>'}).join('')+'</div></section>'
 +'<section class="panel"><h3>② Phạm vi câu hỏi</h3>'+A.scopeSelect()+'</section>'
 +'<section class="panel"><h3>③ Số câu</h3><div class="chips">'+[5,10,15,20].map(function(n){return '<button class="chip'+(cfg.n==n?' on':'')+'" data-act="rmn" data-v="'+n+'">'+n+' câu</button>'}).join('')+'</div></section>'
 +'<div class="cta sticky"><button class="btn big" data-act="rmopen">'+(keep?'▶ Về phòng chờ với trò này':'🌐 Mở phòng')+'</button></div>';
}
function buildQs(){
 var g=RG[cfg.game],P=A.pool().filter(function(q){return g.types.indexOf(q.t)>=0});
 if(P.length<3)return null;
 var qs=A.shuf(P).slice(0,Math.min(cfg.n,P.length)).sort(function(a,b){return a.l-b.l}).map(A.prep);
 var slabs=qs.map(function(q){
  if(!g.slabs)return null;
  if(q.t=='tf')return[{t:'Đúng',ok:q.a===true},{t:'Sai',ok:q.a===false}];
  var L=Math.max.apply(null,q.o.map(function(o){return o.length})),k=L>45?2:L>26?3:2+Math.floor(Math.random()*3);
  var bad=A.shuf(q.o.filter(function(x,i){return i!=q.a})).slice(0,k-1).map(function(x){return{t:x,ok:false}});
  return A.shuf([{t:q.o[q.a],ok:true}].concat(bad));
 });
 return {qs:qs,slabs:slabs};
}
function openRoom(){
 if(R&&R.role=='host'&&R.peer&&!R.peer.destroyed){R.game=cfg.game;R.phase='lobby';sendAll({type:'lobby',players:plist(),game:RG[R.game].name});return hostLobby()}
 if(!buildQs())return alert('Phạm vi này chưa đủ câu hỏi cho trò '+RG[cfg.game].name+'. Hãy chọn phạm vi rộng hơn.');
 app.innerHTML='<p class="loading">⏳ Đang mở phòng…</p>';
 libPeer().then(function(){tryOpen(0)}).catch(function(){netErr('Không tải được thư viện kết nối. Kiểm tra mạng rồi thử lại.')});
}
function tryOpen(n){
 var code=code5(),peer=new Peer(PFX+code,{debug:0});
 peer.on('open',function(){
  R={role:'host',code:code,peer:peer,players:{},game:cfg.game,grade:A.st.g,phase:'lobby',i:-1,auto:true};
  peer.on('connection',onConn);
  peer.on('disconnected',function(){if(R&&R.peer===peer&&!peer.destroyed)try{peer.reconnect()}catch(e){}});
  hostLobby();
 });
 peer.on('error',function(e){
  if(e.type=='unavailable-id'&&n<4){peer.destroy();return tryOpen(n+1)}
  if(R&&R.peer===peer)return;
  peer.destroy();netErr('Không mở được phòng ('+(e.type||'lỗi mạng')+'). Kiểm tra kết nối Internet rồi thử lại.');
 });
}
function netErr(m){app.innerHTML='<section class="panel center"><div class="offic">📡</div><h2>Chưa kết nối được</h2><p>'+esc(m)+'</p><button class="btn" data-act="room">Quay lại</button></section>'}
function plist(){return Object.keys(R.players).map(function(k){var p=R.players[k];return{n:p.n,e:p.e,team:p.team,on:p.on}})}
function teamCount(t){return Object.keys(R.players).filter(function(k){var p=R.players[k];return p.on&&p.team==t}).length}
function onConn(conn){
 conn.on('data',function(m){if(!m||!m.type)return;if(m.type=='join')onJoin(conn,m);else if(m.type=='ans')onAns(conn,m)});
 conn.on('close',function(){var p=byConn(conn);if(p){p.on=false;if(R.phase=='lobby'&&!p.score)delete R.players[p.n];refreshHost()}});
}
function byConn(c){if(!R)return null;for(var k in R.players)if(R.players[k].conn===c)return R.players[k];return null}
function send(p,m){try{if(p.on&&p.conn&&p.conn.open)p.conn.send(m)}catch(e){}}
function sendAll(m){for(var k in R.players)send(R.players[k],m)}
function onJoin(conn,m){
 if(!R)return;
 var n=String(m.n||'').trim().replace(/\s+/g,' ').slice(0,16)||'Bạn',e=String(m.e||'🙂').slice(0,4),p=R.players[n];
 if(p&&p.on&&p.conn!==conn&&p.conn&&p.conn.open){var k=2;while(R.players[n+' '+k])k++;n=n+' '+k;p=null}
 if(!p){
  if(Object.keys(R.players).length>=MAXP){try{conn.send({type:'closed',why:'Phòng đã đủ '+MAXP+' người.'})}catch(x){}return}
  p=R.players[n]={n:n,e:e,score:0,ok:0,alive:R.phase=='lobby'||!RG[R.game].elim,step:0,stk:0,best:0,
   team:teamCount('b')<=teamCount('r')?'b':'r',late:R.phase!='lobby'};
 }
 p.conn=conn;p.on=true;p.e=e;
 conn.send({type:'welcome',n:n,code:R.code,grade:R.grade,game:R.game,gname:RG[R.game].name,team:p.team,phase:R.phase});
 sendAll({type:'lobby',players:plist(),game:RG[R.game].name});
 refreshHost();
 if(R.phase=='q')sendQ(p);
}
function refreshHost(){
 if(!R||R.role!='host')return;
 if(R.phase=='lobby')return hostLobby();
 if(R.phase=='q'){var c=$('#rmcount');if(c)c.innerHTML=countHTML()}
}
function qrSvg(code){try{var q=qrcode(0,'M');q.addData(link(code));q.make();return q.createSvgTag({cellSize:5,margin:2,scalable:true})}catch(e){return ''}}
function hostLobby(){
 A.setScreen('room');R.phase='lobby';
 var g=RG[R.game],ps=plist().filter(function(p){return p.on});
 app.innerHTML='<div class="bar-top"><button class="btn ghost sm" data-act="rmclose">✕ Đóng phòng</button><h2>Phòng chờ · '+g.ico+' '+g.name+'</h2></div>'
 +'<div class="rm-lobby"><section class="panel rm-code"><small>Mã phòng</small><div class="rm-big">'+R.code+'</div><div class="rm-qr" id="rmqr"></div>'
 +'<p class="small">Vào <b>'+esc(location.host+location.pathname)+'</b> → nhập mã, hoặc quét mã QR.</p><button class="btn ghost sm" data-act="rmcopy">📋 Chép đường link mời</button></section>'
 +'<section class="panel"><h3>👥 '+ps.length+' người đã vào'+(g.team?' · bấm vào tên để đổi đội':'')+'</h3>'
 +(g.team?'<div class="rm-teams"><div class="tb"><b>ĐỘI XANH</b>'+chips(ps,'b')+'</div><div class="tr"><b>ĐỘI ĐỎ</b>'+chips(ps,'r')+'</div></div>':'<div class="chips">'+(chips(ps)||'<em class="muted">Đang chờ người chơi vào phòng…</em>')+'</div>')
 +'<p class="muted small">Lớp '+R.grade+' · '+esc(A.scopeInfo()?A.scopeInfo().name:'Tất cả các bài')+' · '+cfg.n+' câu</p>'
 +'<div class="cta"><button class="btn big" data-act="rmstart"'+(ps.length<(g.team?2:1)?' disabled':'')+'>▶ Bắt đầu</button><button class="btn ghost" data-act="rmsetup">Đổi trò / phạm vi</button></div></section></div>';
 loadJS(QRJS,function(){return !!window.qrcode}).then(function(){var el=$('#rmqr');if(el&&R)el.innerHTML=qrSvg(R.code)}).catch(function(){});
}
function chips(ps,team){return ps.filter(function(p){return !team||p.team==team}).map(function(p){return '<button class="chip rm-p'+(team?' t'+team:'')+'" data-act="rmteam" data-v="'+esc(p.n)+'">'+AVH(p.e)+' '+esc(p.n)+'</button>'}).join('')}
function startGame(){
 var b=buildQs();if(!b)return alert('Phạm vi này chưa đủ câu hỏi.');
 R.qs=b.qs;R.slabs=b.slabs;R.game=cfg.game;R.i=-1;R.teams={b:0,r:0};
 for(var k in R.players){var p=R.players[k];if(!p.on){delete R.players[k];continue}p.score=0;p.ok=0;p.alive=true;p.step=0;p.stk=0;p.best=0;p.late=false;p.elimAt=null}
 sendAll({type:'start',game:R.game,gname:RG[R.game].name,n:R.qs.length});
 snd('win');setTimeout(nextQ,1200);
 app.innerHTML='<section class="hero center"><h1 class="title sm">Chuẩn bị!</h1><p>'+RG[R.game].ico+' '+RG[R.game].name+' · '+R.qs.length+' câu</p></section>';
}
function optsOf(i){var q=R.qs[i],s=R.slabs[i];return s?s.map(function(x){return x.t}):q.t=='mc'?q.o:q.t=='tf'?['Đúng','Sai']:null}
function sendQ(p){
 var q=R.qs[R.i],left=Math.max(1,Math.round((R.deadline-Date.now())/1000));
 send(p,{type:'q',i:R.i,n:R.qs.length,t:R.slabs[R.i]?'slab':q.t,c:q.c,l:q.l,q:q.q,o:optsOf(R.i),time:left,game:R.game,alive:p.alive,step:p.step,team:p.team,teams:R.teams,answered:!!R.ans[p.n]});
}
function nextQ(){
 if(!R||R.role!='host')return;clearInterval(R.tm);clearTimeout(R.at);
 R.i++;
 var g=RG[R.game],alive=Object.keys(R.players).filter(function(k){return R.players[k].alive});
 if(R.i>=R.qs.length||(g.elim&&!alive.length))return endGame();
 R.phase='q';R.ans={};R.t0=Date.now();R.deadline=R.t0+g.time*1000;
 for(var k in R.players)sendQ(R.players[k]);
 hostQ();
 R.tm=setInterval(function(){
  var left=Math.max(0,(R.deadline-Date.now())/1000);A.setRing(left,g.time);
  if(left>0&&left<=5)snd('beat',left);
  if(left<=0)reveal();
 },150);
}
function expect(){return Object.keys(R.players).filter(function(k){var p=R.players[k];return p.on&&p.alive})}
function countHTML(){var e=expect(),a=e.filter(function(n){return R.ans[n]}).length;return '<b>'+a+'</b>/'+e.length+' đã trả lời'}
function hostQ(){
 A.setScreen('play');
 var q=R.qs[R.i],g=RG[R.game],o=optsOf(R.i);
 app.innerHTML='<div class="hud"><button class="btn ghost sm" data-act="rmclose" aria-label="Đóng phòng">✕</button><span class="gname">'+g.ico+' '+g.name+'</span><span class="qn">Câu '+(R.i+1)+'/'+R.qs.length+'</span><span class="turn">Phòng '+R.code+'</span><span class="scores" id="rmcount">'+countHTML()+'</span></div>'
 +'<div class="rm-host"><div class="qcard'+A.qClass(q)+'"><div class="qmeta"><span class="pill">'+esc(q.c)+'</span>'+A.stars(q.l)+'</div>'+A.ring()+'<p class="qtext">'+esc(q.q)+'</p></div>'
 +(o?'<div class="rm-opts">'+o.map(function(t,j){return '<div class="rm-o '+COL[j%4]+'"><i>'+SHAPE[j%4]+'</i><span>'+esc(t)+'</span></div>'}).join('')+'</div>':'<div class="rm-numnote">🔢 Mỗi bạn nhập đáp án là một con số trên máy của mình.</div>')
 +'<div class="rm-side">'+board()+'</div>'
 +'<div class="cta"><button class="btn ghost" data-act="rmreveal">⏭ Kết thúc câu này</button></div></div>';
 A.setRing(g.time,g.time);
}
function judgeR(i,v){var q=R.qs[i],s=R.slabs[i];if(v==null)return false;if(s){var x=s[+v];return !!(x&&x.ok)}return A.judge(q,v)}
function onAns(conn,m){
 var p=byConn(conn);if(!p||!R||R.phase!='q'||m.i!==R.i||!p.alive||R.ans[p.n])return;
 R.ans[p.n]={v:m.v,ms:Date.now()-R.t0};send(p,{type:'ack',i:R.i});
 var c=$('#rmcount');if(c)c.innerHTML=countHTML();
 if(expect().every(function(n){return R.ans[n]})){clearTimeout(R.at);R.at=setTimeout(reveal,500)}
}
function rank(){
 var g=RG[R.game];
 return Object.keys(R.players).map(function(k){return R.players[k]}).sort(function(a,b){
  if(g.slabs&&b.step!=a.step)return b.step-a.step;
  return b.score-a.score;
 });
}
function reveal(){
 if(!R||R.phase!='q')return;R.phase='rev';clearInterval(R.tm);clearTimeout(R.at);
 var g=RG[R.game],q=R.qs[R.i],T=g.time*1000,cnt={},tm={b:[0,0],r:[0,0]};
 for(var k in R.players){
  var p=R.players[k],a=R.ans[k];p.last={ok:false,pts:0,ans:!!a};
  if(!p.alive)continue;
  if(a)cnt[a.v]=(cnt[a.v]||0)+1;
  var ok=a?judgeR(R.i,a.v):false,fr=a?Math.max(0,1-a.ms/T):0,pts=0;
  if(ok){p.ok++;p.stk++;if(p.stk>p.best)p.best=p.stk;
   pts=R.game=='mil'?100*(R.i+1)+Math.round(200*fr):R.game=='squid'?100+Math.round(100*fr):R.game=='num'?600+Math.round(400*fr):500+Math.round(500*fr);
   if(g.slabs)p.step++;
  }else{p.stk=0;if(g.elim&&(p.on||a)){p.alive=false;p.elimAt=R.i}}
  p.score+=pts;p.last={ok:ok,pts:pts,ans:!!a};
  if(g.team&&p.on){tm[p.team][0]++;if(ok)tm[p.team][1]++}
 }
 var stepped={};
 if(g.team)['b','r'].forEach(function(t){if(tm[t][0]&&tm[t][1]*2>=tm[t][0]){R.teams[t]++;stepped[t]=1}});
 var rk=rank(),pos={};rk.forEach(function(p,i){pos[p.n]=i+1});
 var right=R.slabs[R.i]?R.slabs[R.i].filter(function(x){return x.ok})[0].t:A.ansText(q);
 for(var k2 in R.players){var p2=R.players[k2];send(p2,{type:'rev',i:R.i,ok:p2.last.ok,pts:p2.last.pts,ans:p2.last.ans,score:p2.score,rank:pos[k2],total:rk.length,alive:p2.alive,step:p2.step,right:right,e:q.e||'',teams:R.teams,stepped:stepped,team:p2.team,last:R.i+1>=R.qs.length})}
 snd('ok');hostRev(cnt,right,stepped);
}
function hostRev(cnt,right,stepped){
 var q=R.qs[R.i],o=optsOf(R.i),g=RG[R.game],tot=0,k;for(k in cnt)tot+=cnt[k];
 var good=function(j){return R.slabs[R.i]?R.slabs[R.i][j].ok:q.t=='mc'?j==q.a:q.t=='tf'?(j==0)==q.a:false};
 var bars=o?o.map(function(t,j){var v=q.t=='tf'&&!R.slabs[R.i]?(j==0?'1':'0'):String(j),c=cnt[v]||0;return '<div class="rm-bar '+COL[j%4]+(good(j)?' good':'')+'"><i>'+SHAPE[j%4]+'</i><span>'+esc(t)+'</span><b>'+c+'</b><u style="width:'+(tot?Math.round(c*100/tot):0)+'%"></u></div>'}).join(''):'';
 app.innerHTML='<div class="hud"><button class="btn ghost sm" data-act="rmclose" aria-label="Đóng phòng">✕</button><span class="gname">'+g.ico+' '+g.name+'</span><span class="qn">Câu '+(R.i+1)+'/'+R.qs.length+'</span><span class="turn">Phòng '+R.code+'</span></div>'
 +'<div class="rm-host"><div class="qcard'+A.qClass(q)+'"><p class="qtext">'+esc(q.q)+'</p><p class="rm-right">✔ Đáp án đúng: <b>'+esc(right)+'</b></p>'+(q.e?'<small class="rm-e">'+esc(q.e)+'</small>':'')+'</div>'
 +(bars?'<div class="rm-bars">'+bars+'</div>':'')
 +'<div class="rm-side">'+board(stepped)+'</div>'
 +'<div class="cta"><button class="btn big" data-act="rmnext">'+(R.i+1>=R.qs.length?'🏁 Xem kết quả':'Câu tiếp ▶')+'</button><button class="btn ghost sm" data-act="rmauto">'+(R.auto?'⏸ Dừng tự chuyển':'▶ Tự chuyển câu')+'</button><span class="muted small" id="rmcd"></span></div></div>';
 if(R.auto)autoNext(10);
}
function autoNext(s){clearInterval(R.cd);var t=s;R.cd=setInterval(function(){var el=$('#rmcd');if(!R||R.phase!='rev'||!R.auto||!el){clearInterval(R.cd);return}t--;el.textContent='Tự chuyển sau '+t+' giây';if(t<=0){clearInterval(R.cd);nextQ()}},1000)}
/* Bảng thi đấu bên cạnh câu hỏi, khác nhau theo từng trò */
function board(stepped){
 var g=RG[R.game],rk=rank();
 if(g.team){
  var lane=function(t){var mem=rk.filter(function(p){return p.team==t&&p.on}),st='';for(var i=1;i<=R.qs.length;i++)st+='<i></i>';
   return '<div class="rm-lane l'+t+'" style="--p:'+R.teams[t]+';--n:'+R.qs.length+'"><div class="rm-steps">'+st+'</div><div class="rm-mv'+(stepped&&stepped[t]?' hop':'')+'">'+(window.DTKSACK&&DTKSACK.face?DTKSACK.face(t,stepped&&stepped[t]?'happy':'idle'):'🦘')+'</div><b>'+(t=='b'?'XANH':'ĐỎ')+' · '+R.teams[t]+' bước</b><small>'+mem.map(function(p){return AVH(p.e)}).join('')+'</small></div>'};
  return '<div class="rm-lanes">'+lane('b')+lane('r')+'</div>';
 }
 if(g.slabs){
  return '<div class="rm-towers" style="--n:'+R.qs.length+'">'+rk.slice(0,40).map(function(p){return '<div class="tw'+(p.alive?'':' out')+'"><span style="bottom:calc('+p.step+' / var(--n) * 82%)">'+(p.alive?AVH(p.e,'idle','full'):'💥')+'</span><small>'+esc(p.n)+'</small></div>'}).join('')+'</div>';
 }
 var max=Math.max(1,rk.length?rk[0].score:1);
 return (g.elim?'<p class="rm-alive">Còn trụ lại: <b>'+rk.filter(function(p){return p.alive}).length+'</b>/'+rk.length+'</p>':'')
  +'<div class="rm-top">'+rk.slice(0,8).map(function(p,i){return '<div class="'+(p.alive?'':'out')+'"><i>'+(i<3?['🥇','🥈','🥉'][i]:i+1)+'</i><span>'+AVH(p.e)+' '+esc(p.n)+'</span><b>'+p.score.toLocaleString('vi-VN')+'</b><u style="width:'+Math.round(p.score*100/max)+'%"></u></div>'}).join('')+'</div>';
}
function endGame(){
 R.phase='end';clearInterval(R.tm);clearInterval(R.cd);
 var g=RG[R.game],rk=rank(),win=g.team?(R.teams.b==R.teams.r?'':R.teams.b>R.teams.r?'b':'r'):'';
 var top=rk.slice(0,10).map(function(p){return{n:p.n,e:p.e,s:p.score,st:p.step}});
 rk.forEach(function(p,i){send(p,{type:'end',rank:i+1,total:rk.length,score:p.score,ok:p.ok,n:R.qs.length,step:p.step,best:p.best,top:top,win:win,team:p.team,teams:R.teams,game:R.game})});
 A.setScreen('result');
 var pod=rk.slice(0,3);
 app.innerHTML=A.confetti(30)+'<section class="hero center result"><div class="trophy">🏆</div><h1 class="title sm">'+(g.team?(win?(win=='b'?'ĐỘI XANH':'ĐỘI ĐỎ')+' CHIẾN THẮNG!':'Hai đội hoà nhau!'):'Kết quả phòng '+R.code)+'</h1><p>'+g.ico+' '+g.name+' · '+R.qs.length+' câu</p></section>'
 +'<div class="rm-podium">'+[1,0,2].map(function(i){var p=pod[i];return p?'<div class="pd p'+(i+1)+'"><span>'+AVH(p.e)+'</span><b>'+esc(p.n)+'</b><small>'+(g.slabs?p.step+' tầng · ':'')+p.score.toLocaleString('vi-VN')+' điểm</small><div class="blk">'+(i+1)+'</div></div>':''}).join('')+'</div>'
 +'<div class="board">'+rk.map(function(p,i){return '<div><span>'+(i+1)+'. '+AVH(p.e)+' '+esc(p.n)+(g.team?' <small>'+(p.team=='b'?'Xanh':'Đỏ')+'</small>':'')+' <small>đúng '+p.ok+'/'+R.qs.length+'</small></span><b>'+p.score.toLocaleString('vi-VN')+'</b></div>'}).join('')+'</div>'
 +'<div class="cta"><button class="btn big" data-act="rmsetup">↻ Ván mới cùng phòng</button><button class="btn ghost" data-act="rmclose">Đóng phòng</button></div>';
 snd('win');
}
function closeRoom(){if(R&&R.role=='host'){sendAll({type:'closed',why:'Chủ phòng đã đóng phòng.'});setTimeout(function(){leave(true)},300)}}

/* ================= NGƯỜI CHƠI ================= */
function joinForm(code){
 leave(true);A.stopAll();A.setScreen('room');
 code=String(code||'').toUpperCase().replace(/[^A-Z0-9]/g,'').slice(0,5);
 if(code.length!=5){alert('Mã phòng gồm 5 kí tự. Hãy kiểm tra lại.');return}
 var r=A.roster(),last=load('dtk_rmname',null)||(r[0]?{n:r[0].n,e:r[0].e}:{n:'',e:A.AV[0]});
 app.innerHTML='<div class="bar-top"><button class="btn ghost sm" data-act="room">◀ Quay lại</button><h2>🙋 Vào phòng '+code+'</h2></div>'
 +'<section class="panel"><h3>Tên của bạn</h3><div class="row"><input id="rmname" maxlength="16" value="'+esc(last.n)+'" placeholder="Họ tên hoặc biệt danh" aria-label="Tên của bạn" autocomplete="off"></div>'
 +'<div class="avs">'+A.AV.map(function(e){return '<button class="av'+(e==last.e?' on':'')+'" data-act="rmav" data-v="'+e+'" aria-label="Chọn '+(window.AVNAME?AVNAME(e):e)+'">'+AVH(e)+'</button>'}).join('')+'</div>'
 +'<div class="cta"><button class="btn big" data-act="rmgo" data-v="'+code+'">Vào phòng ▶</button></div></section>';
 R={role:'join',code:code,e:last.e};
 var i=$('#rmname');if(i&&!i.value&&!('ontouchstart' in window))i.focus();
}
function connect(code,n,e){
 save('dtk_rmname',{n:n,e:e});
 app.innerHTML='<section class="panel center"><div class="offic">🔌</div><h2>Đang vào phòng '+code+'…</h2><p class="muted">Nếu chờ quá lâu, hãy kiểm tra lại mã phòng hoặc kết nối mạng.</p></section>';
 libPeer().then(function(){
  var peer=new Peer({debug:0});
  R={role:'player',code:code,n:n,e:e,peer:peer,phase:'conn',score:0};
  var to=setTimeout(function(){if(R&&R.peer===peer&&R.phase=='conn')fail('Không vào được phòng '+code+'. Có thể mã sai, phòng đã đóng, hoặc mạng đang chặn kết nối giữa các máy.')},15000);
  peer.on('open',function(){
   var c=peer.connect(PFX+code,{reliable:true});R.conn=c;
   c.on('open',function(){c.send({type:'join',n:n,e:e})});
   c.on('data',function(m){clearTimeout(to);onMsg(m)});
   c.on('close',function(){if(R&&R.conn===c&&R.phase!='end'&&R.phase!='closed')fail('Mất kết nối với phòng '+code+'.',true)});
  });
  peer.on('error',function(err){if(!R||R.peer!==peer)return;clearTimeout(to);fail(err.type=='peer-unavailable'?'Không tìm thấy phòng '+code+'. Kiểm tra lại mã hoặc phòng đã đóng.':'Lỗi kết nối ('+err.type+'). Kiểm tra mạng rồi thử lại.',err.type!='peer-unavailable')});
 }).catch(function(){fail('Không tải được thư viện kết nối. Kiểm tra mạng rồi thử lại.')});
}
function fail(m,retry){
 var r=R;A.setScreen('room');
 app.innerHTML='<section class="panel center"><div class="offic">📡</div><h2>Chưa vào được phòng</h2><p>'+esc(m)+'</p><div class="cta">'+(retry&&r?'<button class="btn" data-act="rmgo" data-v="'+r.code+'" data-n="1">↻ Vào lại</button>':'')+'<button class="btn ghost" data-act="room">Quay lại</button></div></section>';
 if(r&&r.peer)try{r.peer.destroy()}catch(e){}
}
function onMsg(m){
 if(!R||R.role!='player'||!m)return;
 switch(m.type){
 case 'welcome':R.n=m.n;R.phase=m.phase=='lobby'?'lobby':'wait';R.gname=m.gname;R.game=m.game;R.team=m.team;A.setG(m.grade);pLobby([]);break;
 case 'lobby':R.players=m.players;R.gname=m.game||R.gname;if(R.phase=='lobby'||R.phase=='wait')pLobby(m.players);break;
 case 'start':R.phase='start';R.game=m.game;R.gname=m.gname;R.score=0;A.setScreen('play');app.innerHTML='<section class="hero center"><h1 class="title sm">Chuẩn bị!</h1><p>'+esc(m.gname)+' · '+m.n+' câu</p></section>';snd('tap');break;
 case 'q':pQ(m);break;
 case 'ack':if(R.q&&m.i==R.q.i)pWait();break;
 case 'rev':pRev(m);break;
 case 'end':pEnd(m);break;
 case 'closed':R.phase='closed';A.setScreen('room');app.innerHTML='<section class="panel center"><div class="offic">🚪</div><h2>Phòng đã đóng</h2><p>'+esc(m.why||'')+'</p><button class="btn" data-act="room">Về phòng chơi</button></section>';break;
 }
}
function pLobby(ps){
 A.setScreen('room');
 var me=(ps||[]).filter(function(p){return p.n==R.n})[0];if(me)R.team=me.team;
 app.innerHTML='<section class="hero center"><div class="eyebrow">Phòng '+R.code+'</div><h1 class="title sm">'+AVH(R.e)+' '+esc(R.n)+'</h1><p>Đã vào phòng! Trò chơi: <b>'+esc(R.gname||'')+'</b>'+(R.game=='sack'?' · Bạn ở <b class="'+(R.team=='b'?'tb':'tr')+'">'+(R.team=='b'?'ĐỘI XANH':'ĐỘI ĐỎ')+'</b>':'')+'</p><p class="muted">'+(R.phase=='wait'?'Trận đang diễn ra, bạn sẽ tham gia từ câu tiếp theo.':'Chờ chủ phòng bắt đầu…')+'</p></section>'
 +'<div class="chips center-chips">'+(ps||[]).filter(function(p){return p.on}).map(function(p){return '<span class="chip'+(p.n==R.n?' on':'')+'">'+AVH(p.e)+' '+esc(p.n)+'</span>'}).join('')+'</div>'
 +'<div class="cta"><button class="btn ghost sm" data-act="rmleave">Rời phòng</button></div>';
}
function pQ(m){
 R.q=m;R.phase='q';R.sent=false;A.setScreen('play');
 var spect=!m.alive,o=m.o,body='';
 if(m.t=='slab'){
  body='<div class="sq-view rm-cliff"><div class="sq-sky"></div><div class="sq-cliff l"></div><div class="sq-cliff r"></div><div class="sq-pit"></div><div class="sq-mist"></div><div class="rm-slabrow sq-row cur" style="--H:110px">'+o.map(function(t,j){return '<button class="stone st'+(j%4)+'" style="--d:-'+(j*0.3)+'s" data-act="rmans" data-v="'+j+'"'+(spect?' disabled':'')+'><span>'+esc(t)+'</span></button>'}).join('')+'</div><div class="rm-me">'+AVH(R.e,'idle','full')+'<small>Tầng '+m.step+'</small></div></div>';
 }else if(m.t=='num'){
  body='<div class="numin"><input id="rmnum" inputmode="decimal" autocomplete="off" placeholder="Nhập một con số" aria-label="Đáp án"'+(spect?' disabled':'')+'><button class="btn" data-act="rmans" data-v="num"'+(spect?' disabled':'')+'>Chốt</button></div>';
 }else{
  var vals=m.t=='tf'?['1','0']:o.map(function(x,j){return String(j)});
  body='<div class="rm-ans'+(o.length==2?' two':'')+'">'+o.map(function(t,j){return '<button class="rm-a '+COL[j%4]+'" data-act="rmans" data-v="'+vals[j]+'"'+(spect?' disabled':'')+'><i>'+SHAPE[j%4]+'</i><span>'+esc(t)+'</span></button>'}).join('')+'</div>';
 }
 app.innerHTML='<div class="hud"><span class="gname">'+esc(R.gname||'')+'</span><span class="qn">Câu '+(m.i+1)+'/'+m.n+'</span><span class="turn">'+AVH(R.e)+' '+esc(R.n)+'</span><span class="scores"><span class="sc">'+(R.score||0).toLocaleString('vi-VN')+'</span></span></div>'
 +(spect?'<p class="rm-spect">👀 Bạn đã bị loại – đang xem các bạn còn lại thi đấu.</p>':'')
 +'<div class="qcard'+A.qClass({q:m.q,o:o})+'"><div class="qmeta"><span class="pill">'+esc(m.c)+'</span>'+A.stars(m.l)+'</div>'+A.ring()+'<p class="qtext">'+esc(m.q)+'</p></div>'+body+'<div id="fb" class="fb" role="status"></div>';
 if(m.answered)pWait();
 R.qt0=Date.now();clearInterval(R.tm);A.setRing(m.time,m.time);
 R.tm=setInterval(function(){var left=Math.max(0,m.time-(Date.now()-R.qt0)/1000);A.setRing(left,m.time);if(left>0&&left<=5&&!R.sent&&!spect)snd('beat',left);if(left<=0)clearInterval(R.tm)},150);
 if(m.t=='slab')fitStones();
}
function fitStones(){$$('.rm-slabrow .stone').forEach(function(b){var s=b.firstChild,fs=parseFloat(getComputedStyle(s).fontSize);while(fs>9&&(s.offsetHeight>b.clientHeight-8||s.scrollWidth>b.clientWidth-10)){fs-=0.5;s.style.fontSize=fs+'px'}})}
function pAnswer(v,btn){
 if(!R||R.role!='player'||R.phase!='q'||R.sent||!R.q.alive)return;
 if(v=='num'){var x=$('#rmnum');if(!x||!x.value.trim())return;v=x.value.trim()}
 R.sent=true;R.mine=v;try{R.conn.send({type:'ans',i:R.q.i,v:v})}catch(e){}
 $$('[data-act="rmans"]').forEach(function(b){b.disabled=true;if(b===btn)b.classList.add('picked')});
 snd('tap');pWait();
}
function pWait(){var f=$('#fb');if(f){f.className='fb';f.innerHTML='⏳ Đã chốt đáp án! Chờ các bạn khác…'}}
function pRev(m){
 clearInterval(R.tm);R.score=m.score;R.phase='rev';
 var fell=!m.ok&&!m.alive&&(R.game=='squid'||R.game=='mil')&&R.q&&R.q.alive;
 A.setScreen('play');
 if(m.ok)snd('happy');else if(m.ans||fell)snd('sad');
 var sack=R.game=='sack';
 app.innerHTML='<section class="hero center result rm-rev '+(m.ok?'good':'bad')+'"><div class="trophy">'+(m.ok?'✅':fell?(R.game=='squid'?'🪨':'💥'):m.ans?'❌':'⏰')+'</div>'
 +'<h1 class="title sm">'+(m.ok?'Chính xác! +'+m.pts:fell?(R.game=='squid'?'Đá sụp, bạn rơi xuống vực!':'Bạn đã bị loại!'):m.ans?'Chưa đúng!':(R.q&&!R.q.alive?'Đang xem':'Hết giờ!'))+'</h1>'
 +'<p>Đáp án đúng: <b>'+esc(m.right)+'</b></p>'+(m.e?'<p class="muted small">'+esc(m.e)+'</p>':'')
 +'<div class="rm-stat"><span>Điểm<b>'+m.score.toLocaleString('vi-VN')+'</b></span><span>Hạng<b>'+m.rank+'/'+m.total+'</b></span>'+(R.game=='squid'?'<span>Tầng<b>'+m.step+'</b></span>':'')+(sack?'<span class="tb">Xanh<b>'+m.teams.b+'</b></span><span class="tr">Đỏ<b>'+m.teams.r+'</b></span>':'')+'</div>'
 +(sack&&m.stepped&&m.stepped[m.team]?'<p>🦘 Đội của bạn được nhảy một bước!</p>':'')
 +'<p class="muted">'+(m.last?'Chờ xem kết quả chung cuộc…':'Chờ câu tiếp theo…')+'</p></section>';
}
function pEnd(m){
 clearInterval(R.tm);R.phase='end';A.setScreen('result');
 var won=m.game=='sack'?m.win==m.team:m.rank<=3;
 var res=A.award(R.n,{xp:m.ok*12+(m.rank==1?40:m.rank<=3?20:0),streak:m.best,badges:[]});
 app.innerHTML=(won?A.confetti(26):'')+'<section class="hero center result"><div class="trophy">'+(m.rank==1?'🥇':m.rank==2?'🥈':m.rank==3?'🥉':'🎯')+'</div>'
 +'<h1 class="title sm">'+(m.game=='sack'?(m.win?(m.win==m.team?'Đội bạn chiến thắng!':'Đội bạn thua sát nút!'):'Hai đội hoà!'):'Hạng '+m.rank+'/'+m.total)+'</h1>'
 +'<p>Bạn đúng '+m.ok+'/'+m.n+' câu · '+m.score.toLocaleString('vi-VN')+' điểm</p></section>'
 +'<div class="rewards">'+A.rewardHTML(R.n,R.e,res)+'</div>'
 +'<div class="board">'+m.top.map(function(p,i){return '<div class="'+(p.n==R.n?'first':'')+'"><span>'+(i+1)+'. '+AVH(p.e)+' '+esc(p.n)+'</span><b>'+p.s.toLocaleString('vi-VN')+'</b></div>'}).join('')+'</div>'
 +'<p class="muted center">Chờ chủ phòng mở ván mới, hoặc rời phòng.</p><div class="cta"><button class="btn ghost" data-act="rmleave">Rời phòng</button></div>';
 if(won)snd('win');A.celebrate([res]);
 R.phase='lobby';
}

/* ================= RỜI PHÒNG ================= */
function leave(silent){
 if(!R)return;var r=R;R=null;
 clearInterval(r.tm);clearInterval(r.cd);clearTimeout(r.at);
 try{if(r.role=='host'&&r.players)for(var k in r.players){var p=r.players[k];if(p.conn&&p.conn.open)p.conn.send({type:'closed',why:'Chủ phòng đã đóng phòng.'})}}catch(e){}
 try{if(r.conn)r.conn.close()}catch(e){}
 setTimeout(function(){try{if(r.peer)r.peer.destroy()}catch(e){}},200);
}
function active(){return R&&(R.role=='host'||R.role=='player')&&R.phase!='closed'}

/* ================= SỰ KIỆN ================= */
/* Rời trang trong khi đang ở phòng thì hỏi lại trước */
document.addEventListener('click',function(e){
 var b=e.target.closest?e.target.closest('[data-act]'):null;if(!b||!active())return;
 var a=b.getAttribute('data-act');
 if(['home','menu','grade','room','prof','lb','review'].indexOf(a)<0)return;
 if(!confirm(R.role=='host'?'Đóng phòng '+R.code+'? Mọi người trong phòng sẽ bị ngắt kết nối.':'Rời phòng '+R.code+'?')){e.stopPropagation();e.preventDefault();return}
 leave();
},true);
document.addEventListener('click',function(e){
 var b=e.target.closest?e.target.closest('[data-act]'):null;if(!b||b.disabled)return;
 var a=b.getAttribute('data-act'),v=b.getAttribute('data-v');
 switch(a){
 case 'room':roomHome();break;
 case 'rmjoin':var c=$('#jcode');joinForm(c?c.value:'');break;
 case 'rmav':if(R)R.e=v;$$('.av').forEach(function(x){x.classList.toggle('on',x===b)});break;
 case 'rmgo':var nm=$('#rmname'),n=nm?nm.value.trim():(load('dtk_rmname',{}).n||'');if(!n){if(nm)nm.focus();return}connect(v,n.slice(0,16),(R&&R.e)||load('dtk_rmname',{}).e||A.AV[0]);break;
 case 'rmnew':cfg.game='flash';hostSetup();break;
 case 'rmsetup':if(R&&R.role=='host'){clearInterval(R.tm);clearInterval(R.cd);R.phase='lobby'}hostSetup();break;
 case 'rmgame':cfg.game=v;hostSetup();break;
 case 'rmn':cfg.n=+v;hostSetup();break;
 case 'rmopen':openRoom();break;
 case 'rmlobby':if(R&&R.role=='host')hostLobby();break;
 case 'rmcopy':var l=link(R.code);if(navigator.clipboard)navigator.clipboard.writeText(l).then(function(){b.textContent='✅ Đã chép link'}).catch(function(){prompt('Chép đường link này:',l)});else prompt('Chép đường link này:',l);break;
 case 'rmteam':if(R&&R.role=='host'&&RG[R.game].team&&R.players[v]){R.players[v].team=R.players[v].team=='b'?'r':'b';sendAll({type:'lobby',players:plist(),game:RG[R.game].name});hostLobby()}break;
 case 'rmstart':if(R&&R.role=='host')startGame();break;
 case 'rmreveal':reveal();break;
 case 'rmnext':nextQ();break;
 case 'rmauto':R.auto=!R.auto;b.textContent=R.auto?'⏸ Dừng tự chuyển':'▶ Tự chuyển câu';if(R.auto)autoNext(10);else{clearInterval(R.cd);var cd=$('#rmcd');if(cd)cd.textContent=''}break;
 case 'rmclose':if(confirm('Đóng phòng '+R.code+'? Mọi người trong phòng sẽ bị ngắt kết nối.')){closeRoom();setTimeout(roomHome,350)}break;
 case 'rmleave':leave();roomHome();break;
 case 'rmans':pAnswer(v,b);break;
 }
});
document.addEventListener('change',function(e){if(e.target.id=='scope'&&document.body.getAttribute('data-scr')=='room')A.st.scope=e.target.value});
document.addEventListener('keydown',function(e){
 if(e.key!='Enter')return;
 if(e.target.id=='jcode'){var b=$('[data-act="rmjoin"]');if(b)b.click()}
 else if(e.target.id=='rmname'){var g=$('[data-act="rmgo"]');if(g)g.click()}
 else if(e.target.id=='rmnum'){pAnswer('num')}
});
window.addEventListener('beforeunload',function(e){if(R&&R.role=='host'&&R.phase!='end'){e.preventDefault();e.returnValue=''}});
window.DTKROOM={home:roomHome,join:joinForm,R:function(){return R},RG:RG};
/* Mở bằng đường link mời: ?phong=MÃ */
var m=/[?&]phong=([A-Za-z0-9]{5})/.exec(location.search);
if(m){try{history.replaceState(null,'',location.pathname)}catch(e){}joinForm(m[1])}
})();
