/* Nút "Khoe kết quả" trên mọi màn hình kết quả của Đấu trường KHTN.
   Tự gắn vào khi ứng dụng hiện <section class="result">, không can thiệp vào app.js. */
(function () {
  var URL0 = 'https://lddungkhtn.github.io/';
  var app = document.getElementById('app');
  if (!app || !window.MutationObserver) return;
  function msg(sec) {
    var h = sec.querySelector('h1,.wintxt'), p = sec.querySelector('p');
    var t = ((h ? h.textContent : '') + (p ? ' – ' + p.textContent : '')).replace(/\s+/g, ' ').trim();
    return 'Mình vừa chơi Đấu trường KHTN' + (t ? ': ' + t : '') + '. Thử sức ôn Khoa học tự nhiên 6–9 cùng mình nhé!';
  }
  function add() {
    var sec = app.querySelector('section.result');
    if (!sec || sec.parentNode.querySelector('.share-res')) return;
    var box = document.createElement('div');
    box.className = 'share-res';
    box.style.cssText = 'display:flex;flex-wrap:wrap;gap:10px;justify-content:center;margin:14px auto 4px;max-width:560px';
    box.innerHTML = '<button type="button" class="btn ghost" data-sh>📤 Khoe kết quả</button>' +
      '<a class="btn ghost" target="_blank" rel="noopener" href="https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(URL0) + '">Facebook</a>' +
      '<a class="btn ghost" href="gioi-thieu.html#ungho">☕ Ủng hộ tác giả</a>';
    sec.insertAdjacentElement('afterend', box);
    box.querySelector('[data-sh]').onclick = function () {
      var text = msg(sec), b = this;
      if (navigator.share) { navigator.share({ title: 'Đấu trường KHTN', text: text, url: URL0 }).catch(function () {}); return; }
      try { navigator.clipboard.writeText(text + ' ' + URL0); b.textContent = '✅ Đã sao chép, dán vào Zalo/Facebook'; }
      catch (e) { prompt('Sao chép để chia sẻ:', text + ' ' + URL0); }
    };
    if (window.gtag) gtag('event', 'result_view');
  }
  new MutationObserver(add).observe(app, { childList: true, subtree: false });
})();
