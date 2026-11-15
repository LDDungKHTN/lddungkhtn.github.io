/* Giọng đọc tiếng Anh cho câu hỏi môn Tiếng Anh.
   Dùng giọng đọc có sẵn của trình duyệt (Web Speech API), ưu tiên giọng tự nhiên chất lượng cao:
   Edge: "Microsoft … Online (Natural)"; Chrome: "Google US English", "Google UK English"; iPhone/Mac: Samantha, Daniel…
   Câu hỏi có q.en = 1 (môn Tiếng Anh). q.s: câu cần đọc thay cho đề (câu nghe – chọn từ: q.lis = 1, không đọc đáp án). */
(function(){
var SS=window.speechSynthesis,VOICE=null,CUR={},seq=0;
var VN=/[àáảãạăằắẳẵặâầấẩẫậđèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵ]/i;
/* Sách Global Success dùng phiên âm Anh – Anh, nên ưu tiên giọng Anh (en-GB), sau đó mới đến giọng Mỹ */
var PREF=[[/Online \(Natural\)/i,'GB'],[/Google UK English Female/i],[/Google UK English Male/i],[/Daniel|Kate|Serena|Arthur|Martha/i,'GB'],[/Microsoft (Hazel|George|Susan)/i,'GB'],[/Online \(Natural\)/i,'US'],[/Google US English/i],[/Samantha|Karen|Moira|Tessa/i],[/Microsoft Zira/i],[/Microsoft (David|Mark)/i]];
function pick(){
 if(!SS)return null;
 var vs=SS.getVoices().filter(function(v){return /^en[-_]/i.test(v.lang)});if(!vs.length)return null;
 for(var i=0;i<PREF.length;i++){var p=PREF[i],f=vs.filter(function(v){return p[0].test(v.name)&&(!p[1]||new RegExp('en[-_]'+p[1],'i').test(v.lang))});if(f.length)return f[0]}
 return vs.filter(function(v){return /en[-_]GB/i.test(v.lang)})[0]||vs.filter(function(v){return /en[-_]US/i.test(v.lang)})[0]||vs[0];
}
if(SS){VOICE=pick();if(SS.addEventListener)SS.addEventListener('voiceschanged',function(){VOICE=pick()});else SS.onvoiceschanged=function(){VOICE=pick()}}
function isEn(s){return !!s&&!VN.test(s)}
/* Bỏ biểu tượng, đọc chỗ trống là "blank", dấu gạch chéo là "or" */
function clean(s){return String(s).replace(/[←-⇿⌀-➿\uD83C-􏰀-\uDFFF️]/g,'').replace(/_{2,}|\.{4,}|…{2,}/g,' blank ').replace(/\s\/\s/g,' or ').replace(/\s+/g,' ').trim()}
function parts(q,opts){
 if(!q||!q.en)return[];
 if(q.lis)return q.s?[q.s]:[];
 var out=[],t=q.s!=null?q.s:q.q;
 if(t&&isEn(t))out.push(clean(t));
 if((opts||q.ro)&&q.t=='mc'&&q.o.every(isEn))q.o.forEach(function(o,i){out.push('ABCD'[i]+'. '+clean(o))});
 return out.filter(Boolean);
}
function stop(){seq++;if(SS)try{SS.cancel()}catch(e){}}
function speak(list,slow){
 if(!SS||!list.length)return false;stop();var my=seq;
 if(!VOICE)VOICE=pick();
 var go=function(i){
  if(my!==seq||i>=list.length)return;
  var u=new SpeechSynthesisUtterance(list[i]);
  if(VOICE){u.voice=VOICE;u.lang=VOICE.lang}else u.lang='en-US';
  u.rate=slow?0.75:0.92;u.pitch=1;
  u.onend=function(){setTimeout(function(){go(i+1)},250)};u.onerror=function(){go(i+1)};
  SS.speak(u);
 };
 /* Chrome: cancel() rồi speak() ngay đôi khi bị nuốt mất câu – chờ một nhịp */
 setTimeout(function(){go(0)},60);return true;
}
function on(){return !window.SND||!SND.isOn||SND.isOn()}
var API=window.DTKSAY={
 ok:!!SS,
 has:function(q){return !!(SS&&q&&q.en&&parts(q,true).length)},
 /* Nút loa: bấm để nghe lại câu hỏi (và các đáp án tiếng Anh). key phân biệt khi có nhiều câu cùng lúc (Nhảy bao bố) */
 btn:function(q,key){if(!API.has(q))return '';key=key||'main';CUR[key]=q;return '<button class="say-btn" data-act="say" data-v="'+key+'" aria-label="Nghe đọc câu hỏi bằng tiếng Anh" title="Nghe đọc (tiếng Anh)">🔊</button>'},
 /* Tự đọc khi hiện câu mới (chỉ khi đang bật âm thanh). Câu nghe đọc chậm hơn một chút. */
 auto:function(q,key){if(!q||!q.en||!SS)return;CUR[key||'main']=q;if(!on())return;var me=++seq;setTimeout(function(){if(me===seq)speak(parts(q,false),false)},450)},
 say:function(key){var q=CUR[key||'main'];if(!q)return;var p=parts(q,true);if(q.lis){API._n=(API._n||0)+1;speak(p,API._n%2==0)}else speak(p,false)},
 word:function(t){speak([clean(t)],false)},
 stop:stop,voice:function(){return VOICE?VOICE.name+' ('+VOICE.lang+')':null},parts:parts
};
})();
