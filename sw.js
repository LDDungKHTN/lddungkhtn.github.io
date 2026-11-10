// Đổi số phiên bản này MỖI LẦN sửa file của app để máy học sinh tải bản mới (đóng hẳn app rồi mở lại).
const V='dtk-v24',FILES=['./','index.html','app.css','app.js','sound.js','sack.js','manifest.webmanifest','icon-192.png','icon-512.png','apple-touch-icon.png','cauhoi-l6-hk1.js','cauhoi-l6-hk2.js','cauhoi-l7.js','cauhoi-l8-hk1.js','cauhoi-l8-hk2.js','cauhoi-l9-hk1.js','cauhoi-l9-hk2.js'];
const FONT=/^https:\/\/fonts\.(googleapis|gstatic)\.com\//;
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
 const r=e.request;if(r.method!=='GET')return;
 const same=new URL(r.url).origin===self.location.origin;
 // Chỉ lưu tệp của trang và phông chữ; không lưu quảng cáo hay tệp của trang khác.
 if(!same&&!FONT.test(r.url))return;
 e.respondWith(caches.match(r,{ignoreSearch:true}).then(hit=>hit||fetch(r).then(res=>{
  if(res&&(res.ok||res.type==='opaque')){const c=res.clone();caches.open(V).then(x=>x.put(r,c))}
  return res;
 }).catch(()=>r.mode==='navigate'?caches.match('index.html'):Response.error())));
});
