/* Âm thanh trò chơi: tạo bằng Web Audio, không cần file âm thanh, chạy được khi mất mạng. */
(function(){
var AC=null,OUT=null,NB=null,on=true;
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
/* Hồi hộp: tim đập + tiếng tích tắc, nhanh dần và cao dần khi sắp hết giờ */
function beat(left){
 if(!ac())return;
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
/* Trả lời sai hoặc hết giờ: tiếng đồ vật vỡ, hỏng */
function crash(){
 var t=AC.currentTime;
 noise(t,0.45,0.7,2500,0.7,'highpass');
 tone(140,t,0.35,'sine',0.9,40);
 tone(320,t,0.55,'sawtooth',0.16,55);
 for(var i=0;i<14;i++)tone(2200+Math.random()*3800,t+0.05+Math.random()*0.55,0.06,'triangle',0.07);
}
function sfx(ok){if(on&&ac()){if(ok)clap();else crash()}}
function sum(){return S.sc.reduce(function(a,b){return a+b},0)}
var _tick=tick,_answer=answer;
tick=function(){
 try{if(on&&S&&S.g&&S.g.time&&!S.rv&&!S.lock){var left=S.g.time-(Date.now()-S.t0)/1000;if(left>0&&left<=5)beat(left)}}catch(e){}
 return _tick();
};
answer=function(v){
 if(!S||S.lock)return _answer(v);
 var b=sum(),r=_answer(v);
 try{sfx(sum()>b)}catch(e){}
 return r;
};
var nb=0;
function step(){var t=AC.currentTime;tone(660,t,0.1,'triangle',0.25);tone(990,t+0.08,0.16,'triangle',0.25)}
function buzz(){var t=AC.currentTime;tone(130,t,0.28,'sawtooth',0.22,90);tone(98,t,0.28,'square',0.1)}
function sad(){var t=AC.currentTime;[392,370,349].forEach(function(f,i){tone(f,t+i*0.28,0.3,'sawtooth',0.14)});tone(311,t+0.84,0.9,'sawtooth',0.14,260)}
function win(){var t=AC.currentTime;[523,659,784,1047,1319,1568].forEach(function(f,i){tone(f,t+i*0.1,0.4,'triangle',0.2)});clap()}
function g(f){return function(a){if(on&&ac())f(a)}}
window.KH7SND={beat:g(beat),step:g(step),win:g(win),crash:g(crash),clap:g(clap),buzz:g(buzz),sad:g(sad)};
var btn=document.createElement('button');
btn.setAttribute('aria-label','Bật hoặc tắt âm thanh');
btn.style.cssText='margin-left:auto;font-size:22px;background:none;border:2px solid var(--line);border-radius:50%;width:44px;height:44px;cursor:pointer;color:inherit';
function show(){btn.textContent=on?'🔊':'🔇'}
btn.onclick=function(){on=!on;try{localStorage.setItem('kh7_snd2',on?'on':'off')}catch(e){}show();if(on&&ac())tone(880,AC.currentTime,0.12,'triangle',0.3)};
show();
var h=document.querySelector('header');if(h)h.appendChild(btn);
document.addEventListener('click',ac,true);
document.addEventListener('touchend',ac,true);
var bs=document.createElement('script');bs.src='bai.js';document.body.appendChild(bs);
})();
