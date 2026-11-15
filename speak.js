/* Giọng đọc câu hỏi cho mọi môn: Tiếng Anh đọc giọng Anh, Khoa học tự nhiên và Lịch sử – Địa lí đọc giọng Việt.
   Dùng giọng đọc có sẵn của trình duyệt (Web Speech API), ưu tiên giọng tự nhiên chất lượng cao:
   – Tiếng Anh: Edge "Microsoft … Online (Natural)"; Chrome "Google UK/US English"; iPhone/Mac: Daniel, Samantha…
   – Tiếng Việt: Edge "Microsoft HoaiMy / NamMinh Online (Natural)"; Android "Google Tiếng Việt"; iPhone/Mac "Linh"; Windows "Microsoft An".
   Câu tiếng Anh có q.en = 1. q.s: câu cần đọc thay cho đề (câu nghe – chọn từ: q.lis = 1, không đọc đáp án).
   Máy không có giọng của ngôn ngữ nào thì không hiện nút loa cho câu thuộc ngôn ngữ đó.
   Câu hỏi mới thêm vào kho (bất kì môn, bất kì bài) đều tự có giọng đọc, không phải làm gì thêm. */
(function(){
var SS=window.speechSynthesis,VOICE={en:null,vi:null},CUR={},seq=0;
var VN=/[àáảãạăằắẳẵặâầấẩẫậđèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵ]/i;
/* Sách Global Success dùng phiên âm Anh – Anh, nên ưu tiên giọng Anh (en-GB), sau đó mới đến giọng Mỹ */
var PREF={
 en:[[/Online \(Natural\)/i,'en[-_]GB'],[/Google UK English Female/i],[/Google UK English Male/i],[/Daniel|Kate|Serena|Arthur|Martha/i,'en[-_]GB'],[/Microsoft (Hazel|George|Susan)/i,'en[-_]GB'],[/Online \(Natural\)/i,'en[-_]US'],[/Google US English/i],[/Samantha|Karen|Moira|Tessa/i],[/Microsoft Zira/i],[/Microsoft (David|Mark)/i]],
 vi:[[/HoaiMy.*Natural|Natural.*HoaiMy/i],[/NamMinh.*Natural|Natural.*NamMinh/i],[/Online \(Natural\)/i],[/Google/i],[/Linh/i],[/Microsoft An\b/i]]};
function pick(lg){
 if(!SS)return null;
 var re=new RegExp('^'+lg+'([-_]|$)','i'),vs=SS.getVoices().filter(function(v){return re.test(v.lang)});if(!vs.length)return null;
 var P=PREF[lg];
 for(var i=0;i<P.length;i++){var p=P[i],f=vs.filter(function(v){return p[0].test(v.name)&&(!p[1]||new RegExp(p[1],'i').test(v.lang))});if(f.length)return f[0]}
 if(lg=='en')return vs.filter(function(v){return /en[-_]GB/i.test(v.lang)})[0]||vs.filter(function(v){return /en[-_]US/i.test(v.lang)})[0]||vs[0];
 return vs[0];
}
function load(){VOICE.en=pick('en');VOICE.vi=pick('vi')}
if(SS){load();if(SS.addEventListener)SS.addEventListener('voiceschanged',load);else SS.onvoiceschanged=load}
function lang(q){return q&&q.en?'en':'vi'}
function isEn(s){return !!s&&!VN.test(s)}
var EMO=/[←-⇿⌀-➿⬀-⯿️]|[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
/* Tiếng Anh: bỏ biểu tượng, chỗ trống đọc là "blank", " / " đọc là "or" */
function cleanEn(s){return String(s).replace(EMO,'').replace(/_{2,}|\.{4,}|…{2,}/g,' blank ').replace(/\s\/\s/g,' or ').replace(/\s+/g,' ').trim()}
/* Tiếng Việt: chỉ số dưới (H₂O) thành số thường, mũ ² ³, mũi tên phản ứng, chỗ trống, dấu ≈ ≥ ≤ … */
var SUB={'₀':'0','₁':'1','₂':'2','₃':'3','₄':'4','₅':'5','₆':'6','₇':'7','₈':'8','₉':'9'};
function cleanVi(s){return String(s).replace(/\s*(→|⟶|=>)\s*/g,' tạo thành ').replace(/⇌/g,' thuận nghịch ').replace(EMO,'')
 .replace(/[₀-₉]/g,function(c){return SUB[c]})
 .replace(/(\d|[a-zA-Z])²/g,'$1 mũ hai').replace(/(\d|[a-zA-Z])³/g,'$1 mũ ba').replace(/⁻/g,' trừ ').replace(/⁺/g,' cộng ').replace(/≈/g,' xấp xỉ ').replace(/≥/g,' lớn hơn hoặc bằng ').replace(/≤/g,' nhỏ hơn hoặc bằng ')
 .replace(/°C/g,' độ C').replace(/%/g,' phần trăm').replace(/×/g,' nhân ')
 .replace(/_{2,}|\.{4,}|…{2,}/g,' chỗ trống ').replace(/\s\/\s/g,' hoặc ').replace(/\s+/g,' ').trim()}
function parts(q,opts){
 if(!q)return[];
 if(q.en){
  if(q.lis)return q.s?[q.s]:[];
  var out=[],t=q.s!=null?q.s:q.q;
  if(t&&isEn(t))out.push(cleanEn(t));
  if((opts||q.ro)&&q.t=='mc'&&q.o.every(isEn))q.o.forEach(function(o,i){out.push('ABCD'[i]+'. '+cleanEn(o))});
  return out.filter(Boolean);
 }
 /* Khoa học tự nhiên, Lịch sử – Địa lí: đọc đề; bấm loa thì đọc cả các đáp án */
 var v=[cleanVi(q.q)];
 if(opts&&q.t=='mc'&&q.o)q.o.forEach(function(o,i){v.push('ABCD'[i]+'. '+cleanVi(o))});
 if(opts&&q.t=='tf')v.push('Đúng hay sai?');
 return v.filter(Boolean);
}
function stop(){seq++;if(SS)try{SS.cancel()}catch(e){}}
function speak(list,lg,slow){
 if(!SS||!list.length)return false;stop();var my=seq,V=VOICE[lg]||(VOICE[lg]=pick(lg));
 if(!V)return false;
 var go=function(i){
  if(my!==seq||i>=list.length)return;
  var u=new SpeechSynthesisUtterance(list[i]);
  u.voice=V;u.lang=V.lang;
  u.rate=lg=='en'?(slow?0.75:0.92):(slow?0.85:1.05);u.pitch=1;
  u.onend=function(){setTimeout(function(){go(i+1)},lg=='en'?250:180)};u.onerror=function(){go(i+1)};
  SS.speak(u);
 };
 /* Chrome: cancel() rồi speak() ngay đôi khi bị nuốt mất câu – chờ một nhịp */
 setTimeout(function(){go(0)},60);return true;
}
function on(){return !window.SND||!SND.isOn||SND.isOn()}
function hasVoice(lg){if(!SS)return false;if(!VOICE[lg])VOICE[lg]=pick(lg);return !!VOICE[lg]}
var API=window.DTKSAY={
 ok:!!SS,
 has:function(q){return !!(q&&hasVoice(lang(q))&&parts(q,true).length)},
 /* Nút loa: bấm để nghe lại câu hỏi và các đáp án. key phân biệt khi có nhiều câu cùng lúc (Nhảy bao bố) */
 btn:function(q,key){if(!API.has(q))return '';key=key||'main';CUR[key]=q;var en=lang(q)=='en';return '<button class="say-btn" data-act="say" data-v="'+key+'" aria-label="'+(en?'Nghe đọc câu hỏi bằng tiếng Anh':'Nghe đọc câu hỏi')+'" title="'+(en?'Nghe đọc (tiếng Anh)':'Nghe đọc câu hỏi và đáp án')+'">🔊</button>'},
 /* Tự đọc đề khi hiện câu mới (chỉ khi đang bật âm thanh) */
 auto:function(q,key){if(!q||!SS)return;CUR[key||'main']=q;if(!on()||!hasVoice(lang(q)))return;var me=++seq;setTimeout(function(){if(me===seq)speak(parts(q,false),lang(q),false)},450)},
 say:function(key){var q=CUR[key||'main'];if(!q)return;var p=parts(q,true);if(q.lis){API._n=(API._n||0)+1;speak(p,'en',API._n%2==0)}else speak(p,lang(q),false)},
 stop:stop,voice:function(lg){var V=VOICE[lg||'en'];return V?V.name+' ('+V.lang+')':null},parts:parts,clean:cleanVi
};
})();
