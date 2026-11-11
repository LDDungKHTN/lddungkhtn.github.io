/* Âm thanh trò chơi: tạo bằng Web Audio, không cần file âm thanh, chạy được khi mất mạng.
   Dùng: SND.beat(giây còn lại), SND.ok(), SND.bad(), SND.step(), SND.win(), SND.buzz(), SND.sad(), SND.tap() */
(function(){
var AC=null,OUT=null,NB=null,on=true,nb=0;
try{on=localStorage.getItem('kh7_snd2')!=='off'}catch(e){}
function ac(){
 try{
  if(!AC){
   var C=window.AudioContext||window.webkitAudioContext;if(!C)return null;
   AC=new C();OUT=AC.createGain();OUT.gain.value=0.8;
   var c=AC.createDynamicsCompressor();OUT.connect(c);c.connect(AC.destination);
   var s=AC.createBufferSource();s.buffer=AC.createBuffer(1,1,22050);s.connect(OUT);s.start(0);
  }
  if(AC.state==='suspended')AC.resume();
  return AC;
 }catch(e){return null}
}
function tone(f,t,d,type,v,f2){
 var o=AC.createOscillator(),g=AC.createGain();
 o.type=type;o.frequency.setValueAtTime(f,t);
 if(f2)o.frequency.exponentialRampToValueAtTime(f2,t+d);
 g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(0.001,t+d);
 o.connect(g);g.connect(OUT);o.start(t);o.stop(t+d+0.02);
}
function noise(t,d,v,fq,q,type){
 if(!NB){NB=AC.createBuffer(1,AC.sampleRate,AC.sampleRate);var a=NB.getChannelData(0);for(var i=0;i<a.length;i++)a[i]=Math.random()*2-1}
 var s=AC.createBufferSource(),f=AC.createBiquadFilter(),g=AC.createGain();
 s.buffer=NB;f.type=type||'bandpass';f.frequency.value=fq;f.Q.value=q||1;
 g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(0.001,t+d);
 s.connect(f);f.connect(g);g.connect(OUT);s.start(t,Math.random()*0.5,d);
}
/* Hồi hộp 5 giây cuối: tim đập + tích tắc, nhanh dần và cao dần */
function beat(left){
 var t=AC.currentTime;if(t<nb)return;
 nb=t+0.3+0.7*left/5;
 var p=1+(5-left)*0.12;
 tone(150*p,t,0.16,'sine',0.9,70*p);
 tone(150*p,t+0.17,0.14,'sine',0.6,70*p);
 tone(1500*p,t,0.04,'square',0.1);
}
/* Trả lời đúng: chuông vui và tràn pháo tay */
function clap(){
 var t=AC.currentTime;
 [523,659,784,1047].forEach(function(f,i){tone(f,t+i*0.09,0.35,'triangle',0.18)});
 for(var i=0;i<110;i++){
  var x=Math.random()*2,e=Math.sin(Math.PI*x/2);
  noise(t+0.1+x,0.03+Math.random()*0.04,0.05+0.2*e,1200+Math.random()*2600,0.9);
 }
}
/* Trả lời sai hoặc hết giờ: tiếng đồ vật vỡ */
function crash(){
 var t=AC.currentTime;
 noise(t,0.45,0.7,2500,0.7,'highpass');
 tone(140,t,0.35,'sine',0.9,40);
 tone(320,t,0.55,'sawtooth',0.16,55);
 for(var i=0;i<14;i++)tone(2200+Math.random()*3800,t+0.05+Math.random()*0.55,0.06,'triangle',0.07);
}
function step(){var t=AC.currentTime;tone(660,t,0.1,'triangle',0.25);tone(990,t+0.08,0.16,'triangle',0.25)}
function buzz(){var t=AC.currentTime;tone(130,t,0.28,'sawtooth',0.22,90);tone(98,t,0.28,'square',0.1)}
function sad(){var t=AC.currentTime;[392,370,349].forEach(function(f,i){tone(f,t+i*0.28,0.3,'sawtooth',0.14)});tone(311,t+0.84,0.9,'sawtooth',0.14,260)}
function win(){var t=AC.currentTime;[523,659,784,1047,1319,1568].forEach(function(f,i){tone(f,t+i*0.1,0.4,'triangle',0.2)});clap()}
/* Nhạc vui ngắn khi đội trả lời đúng */
function happy(){var t=AC.currentTime;[[523,0],[659,.12],[784,.24],[659,.36],[784,.48],[1047,.6]].forEach(function(n){tone(n[0],t+n[1],.22,'square',.07);tone(n[0]*2,t+n[1],.12,'triangle',.06)});tone(1047,t+.72,.5,'triangle',.18);tone(1319,t+.72,.5,'triangle',.12)}
function tap(){var t=AC.currentTime;tone(880,t,0.08,'triangle',0.18)}
function badge(){var t=AC.currentTime;[784,988,1175,1568].forEach(function(f,i){tone(f,t+i*0.07,0.5,'sine',0.16)})}
/* ---- Âm thanh kiểu gameshow (tự tạo, không dùng nhạc của chương trình truyền hình) ---- */
function pad(fs,t,d,v,cut,att){var f=AC.createBiquadFilter(),gn=AC.createGain();f.type='lowpass';f.frequency.value=cut||1200;gn.gain.setValueAtTime(0.0001,t);gn.gain.exponentialRampToValueAtTime(v,t+(att||0.08));gn.gain.exponentialRampToValueAtTime(0.0001,t+d);f.connect(gn);gn.connect(OUT);fs.forEach(function(fr){[-4,4].forEach(function(dt){var o=AC.createOscillator();o.type='sawtooth';o.frequency.value=fr;o.detune.value=dt;o.connect(f);o.start(t);o.stop(t+d+0.05)})})}
function boom(t,v){tone(110,t,0.9,'sine',v||0.9,38);noise(t,0.5,0.25,180,0.8,'lowpass')}
/* Mở câu hỏi: tiếng trống trầm + hợp âm vang lên */
function milQ(){var t=AC.currentTime;boom(t,0.7);pad([110,165,220,277],t+0.05,1.6,0.09,900,0.3);[880,1109,1319].forEach(function(f,i){tone(f,t+0.25+i*0.07,0.6,'sine',0.05)})}
/* Nền hồi hộp: nhịp trầm lặp lại cho đến khi chốt đáp án */
var BED=null;
function bedOn(){bedOff();var k=0;var play=function(){if(!AC)return;var t=AC.currentTime;tone(55,t,0.5,'sine',0.55,50);tone(k%4==3?82:73,t+0.6,0.35,'sine',0.35);pad([220,262,330],t,1.1,0.025,600,0.4);k++};play();BED=setInterval(function(){try{if(on&&!document.hidden)play()}catch(e){}},1200)}
function bedOff(){if(BED){clearInterval(BED);BED=null}}
/* Chốt đáp án: hợp âm trầm phồng lên đầy kịch tính */
function milLock(){bedOff();var t=AC.currentTime;boom(t,0.6);pad([73,110,147,175],t,1.5,0.14,700,0.6)}
/* Đúng: hợp âm trưởng sáng rực + chuông */
function milOk(){var t=AC.currentTime;pad([262,330,392,523],t,1.6,0.12,2200,0.05);[1047,1319,1568,2093].forEach(function(f,i){tone(f,t+0.05+i*0.09,0.9,'triangle',0.09)});boom(t,0.4)}
/* Sai: hợp âm thứ trầm rơi xuống */
function milBad(){var t=AC.currentTime;pad([233,277,349],t,0.6,0.14,1000,0.03);pad([185,220,277],t+0.45,1.6,0.13,800,0.05);tone(98,t+0.45,1.4,'sine',0.6,55)}
/* Nhanh như chớp: tiếng "tia điện" khi đúng, tích tắc mỗi giây */
function zap(){var t=AC.currentTime;tone(300,t,0.18,'sawtooth',0.18,2400);noise(t,0.15,0.25,4000,2);[1319,1760].forEach(function(f,i){tone(f,t+0.12+i*0.08,0.35,'square',0.06)})}
function tick(){var t=AC.currentTime;tone(2000,t,0.03,'square',0.05);tone(1000,t,0.05,'triangle',0.08)}
function g(f){return function(a){try{if(on&&ac())f(a)}catch(e){}}}
window.SND={milQ:g(milQ),bedOn:g(bedOn),bedOff:function(){bedOff()},milLock:g(milLock),milOk:g(milOk),milBad:g(milBad),zap:g(zap),tick:g(tick),beat:g(beat),ok:g(clap),bad:g(crash),crash:g(crash),clap:g(clap),step:g(step),win:g(win),buzz:g(buzz),sad:g(sad),happy:g(happy),tap:g(tap),badge:g(badge),
 isOn:function(){return on},
 toggle:function(){on=!on;if(!on)bedOff();try{localStorage.setItem('kh7_snd2',on?'on':'off')}catch(e){}show();if(on&&ac())tap();return on}};
var btn=document.getElementById('sndBtn');
function show(){if(btn)btn.textContent=on?'🔊':'🔇';[].forEach.call(document.querySelectorAll('[data-act="snd"]'),function(b){b.textContent=on?'🔊':'🔇'})}
if(btn)btn.onclick=function(){SND.toggle()};
show();
/* iPhone chỉ cho phát âm thanh sau khi người dùng chạm vào màn hình */
document.addEventListener('click',ac,true);
document.addEventListener('touchend',ac,true);
})();
