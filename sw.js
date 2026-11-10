// Phiên bản: dtk-v27-online. Tăng số này mỗi lần sửa app.
// Từ bản này ứng dụng CHỈ chạy khi có Internet (không lưu app trên máy nữa).
// Service worker này chỉ dọn sạch bản đã lưu ở các phiên bản cũ, tự gỡ bỏ, rồi tải lại trang để lấy bản mới nhất từ mạng.
const V='dtk-v27-online';
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>{e.waitUntil(
 caches.keys().then(ks=>Promise.all(ks.map(k=>caches.delete(k))))
  .then(()=>self.registration.unregister())
  .then(()=>self.clients.matchAll({type:'window'}))
  .then(cs=>cs.forEach(c=>{try{c.navigate(c.url)}catch(_){}}))
)});
