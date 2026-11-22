/* ĐẤU TRƯỜNG KHTN – ứng dụng chính (lớp 7, 8, 9 – bộ sách Kết nối tri thức)
   Kho câu hỏi nằm ở các file cauhoi-l7.js, cauhoi-l8.js, cauhoi-l9-*.js.
   Định dạng một câu: {b:số bài, t:'mc'|'tf'|'num', l:1-4, c:'chủ đề', q:'câu hỏi', o:[4 đáp án], a:đáp án, e:'giải thích'}
   l = 4 là câu nâng cao, chỉ xuất hiện khi chọn một bài/chương hoặc ở chế độ Ôn tập. */
(function(){
'use strict';
/* ================= DỮ LIỆU LỚP ================= */
var GR={
6:{n:6,files:['cauhoi-l6-hk1.js','cauhoi-l6-hk2.js'],tag:'Các phép đo, chất quanh ta, hỗn hợp · Tế bào, đa dạng thế giới sống · Lực, năng lượng, Trái Đất và bầu trời',
 bai:['Giới thiệu về Khoa học tự nhiên','An toàn trong phòng thực hành','Sử dụng kính lúp','Sử dụng kính hiển vi quang học','Đo chiều dài','Đo khối lượng','Đo thời gian','Đo nhiệt độ','Sự đa dạng của chất','Các thể của chất và sự chuyển thể','Oxygen. Không khí','Một số vật liệu','Một số nguyên liệu','Một số nhiên liệu','Một số lương thực, thực phẩm','Hỗn hợp các chất','Tách chất khỏi hỗn hợp','Tế bào – Đơn vị cơ bản của sự sống','Cấu tạo và chức năng các thành phần của tế bào','Sự lớn lên và sinh sản của tế bào','Thực hành: Quan sát và phân biệt một số loại tế bào','Cơ thể sinh vật','Tổ chức cơ thể đa bào','Thực hành: Quan sát và mô tả cơ thể đơn bào, cơ thể đa bào','Hệ thống phân loại sinh vật','Khoá lưỡng phân','Vi khuẩn','Thực hành: Làm sữa chua và quan sát vi khuẩn','Virus','Nguyên sinh vật','Thực hành: Quan sát nguyên sinh vật','Nấm','Thực hành: Quan sát các loại nấm','Thực vật','Thực hành: Quan sát và phân biệt một số nhóm thực vật','Động vật','Thực hành: Quan sát và nhận biết một số nhóm động vật ngoài thiên nhiên','Đa dạng sinh học','Tìm hiểu sinh vật ngoài thiên nhiên','Lực là gì?','Biểu diễn lực','Biến dạng của lò xo','Trọng lượng, lực hấp dẫn','Lực ma sát','Lực cản của nước','Năng lượng và sự truyền năng lượng','Một số dạng năng lượng','Sự chuyển hoá năng lượng','Năng lượng hao phí','Năng lượng tái tạo','Tiết kiệm năng lượng','Chuyển động nhìn thấy của Mặt Trời. Thiên thể','Mặt Trăng','Hệ Mặt Trời','Ngân Hà'],
 ch:[['Chương I. Mở đầu về Khoa học tự nhiên',1,8],['Chương II. Chất quanh ta',9,11],['Chương III. Một số vật liệu, nguyên liệu, nhiên liệu, lương thực – thực phẩm thông dụng',12,15],['Chương IV. Hỗn hợp. Tách chất ra khỏi hỗn hợp',16,17],['Chương V. Tế bào',18,21],['Chương VI. Từ tế bào đến cơ thể',22,24],['Chương VII. Đa dạng thế giới sống',25,39],['Chương VIII. Lực trong đời sống',40,45],['Chương IX. Năng lượng',46,51],['Chương X. Trái Đất và bầu trời',52,55]]},
7:{n:7,files:['cauhoi-l7.js','cauhoi-l7-them-hk1.js','cauhoi-l7-them-hk2.js'],tag:'Nguyên tử, liên kết hoá học · Tốc độ, âm thanh, ánh sáng, từ · Trao đổi chất, cảm ứng, sinh trưởng, sinh sản',
 bai:['Phương pháp và kĩ năng học tập môn KHTN','Nguyên tử','Nguyên tố hoá học','Sơ lược về bảng tuần hoàn các nguyên tố hoá học','Phân tử – Đơn chất – Hợp chất','Giới thiệu về liên kết hoá học','Hoá trị và công thức hoá học','Tốc độ chuyển động','Đo tốc độ','Đồ thị quãng đường – thời gian','Thảo luận về ảnh hưởng của tốc độ trong an toàn giao thông','Sóng âm','Độ to và độ cao của âm','Phản xạ âm, chống ô nhiễm tiếng ồn','Năng lượng ánh sáng. Tia sáng, vùng tối','Sự phản xạ ánh sáng','Ảnh của vật qua gương phẳng','Nam châm','Từ trường','Từ trường Trái Đất – Sử dụng la bàn','Khái quát về trao đổi chất và chuyển hoá năng lượng','Quang hợp ở thực vật','Một số yếu tố ảnh hưởng đến quang hợp','Thực hành: Chứng minh quang hợp ở cây xanh','Hô hấp tế bào','Một số yếu tố ảnh hưởng đến hô hấp tế bào','Thực hành: Hô hấp ở thực vật','Trao đổi khí ở sinh vật','Vai trò của nước và các chất dinh dưỡng đối với sinh vật','Trao đổi nước và các chất dinh dưỡng ở thực vật','Trao đổi nước và các chất dinh dưỡng ở động vật','Thực hành: Chứng minh thân vận chuyển nước và lá thoát hơi nước','Cảm ứng ở sinh vật và tập tính ở động vật','Vận dụng hiện tượng cảm ứng ở sinh vật vào thực tiễn','Thực hành: Cảm ứng ở sinh vật','Khái quát về sinh trưởng và phát triển ở sinh vật','Ứng dụng sinh trưởng và phát triển ở sinh vật vào thực tiễn','Thực hành: Quan sát, mô tả sự sinh trưởng và phát triển ở một số sinh vật','Sinh sản vô tính ở sinh vật','Sinh sản hữu tính ở sinh vật','Một số yếu tố ảnh hưởng và điều hoà, điều khiển sinh sản ở sinh vật','Cơ thể sinh vật là một thể thống nhất'],
 ch:[['Mở đầu',1,1],['Chương I. Nguyên tử. Sơ lược về bảng tuần hoàn',2,4],['Chương II. Phân tử. Liên kết hoá học',5,7],['Chương III. Tốc độ',8,11],['Chương IV. Âm thanh',12,14],['Chương V. Ánh sáng',15,17],['Chương VI. Từ',18,20],['Chương VII. Trao đổi chất và chuyển hoá năng lượng ở sinh vật',21,32],['Chương VIII. Cảm ứng ở sinh vật',33,35],['Chương IX. Sinh trưởng và phát triển ở sinh vật',36,38],['Chương X. Sinh sản ở sinh vật',39,42]]},
8:{n:8,files:['cauhoi-l8-hk1.js','cauhoi-l8-hk2.js'],tag:'Phản ứng hoá học, acid – base – muối · Áp suất, moment lực, điện, nhiệt · Cơ thể người, sinh vật và môi trường',
 bai:['Sử dụng một số hoá chất, thiết bị cơ bản trong phòng thí nghiệm','Phản ứng hoá học','Mol và tỉ khối chất khí','Dung dịch và nồng độ','Định luật bảo toàn khối lượng và phương trình hoá học','Tính theo phương trình hoá học','Tốc độ phản ứng và chất xúc tác','Acid','Base. Thang pH','Oxide','Muối','Phân bón hoá học','Khối lượng riêng','Thực hành xác định khối lượng riêng','Áp suất trên một bề mặt','Áp suất chất lỏng. Áp suất khí quyển','Lực đẩy Archimedes','Tác dụng làm quay của lực. Moment lực','Đòn bẩy và ứng dụng','Hiện tượng nhiễm điện do cọ xát','Dòng điện, nguồn điện','Mạch điện đơn giản','Tác dụng của dòng điện','Cường độ dòng điện và hiệu điện thế','Thực hành đo cường độ dòng điện và hiệu điện thế','Năng lượng nhiệt và nội năng','Thực hành đo năng lượng nhiệt bằng joulemeter','Sự truyền nhiệt','Sự nở vì nhiệt','Khái quát về cơ thể người','Hệ vận động ở người','Dinh dưỡng và tiêu hoá ở người','Máu và hệ tuần hoàn của cơ thể người','Hệ hô hấp ở người','Hệ bài tiết ở người','Điều hoà môi trường trong của cơ thể người','Hệ thần kinh và các giác quan ở người','Hệ nội tiết ở người','Da và điều hoà thân nhiệt ở người','Sinh sản ở người','Môi trường và các nhân tố sinh thái','Quần thể sinh vật','Quần xã sinh vật','Hệ sinh thái','Sinh quyển','Cân bằng tự nhiên','Bảo vệ môi trường'],
 ch:[['Mở đầu',1,1],['Chương I. Phản ứng hoá học',2,7],['Chương II. Một số hợp chất thông dụng',8,12],['Chương III. Khối lượng riêng và áp suất',13,17],['Chương IV. Tác dụng làm quay của lực',18,19],['Chương V. Điện',20,25],['Chương VI. Nhiệt',26,29],['Chương VII. Sinh học cơ thể người',30,40],['Chương VIII. Sinh vật và môi trường',41,47]]},
9:{n:9,files:['cauhoi-l9-hk1.js','cauhoi-l9-hk2.js'],tag:'Năng lượng, ánh sáng, điện, điện từ · Kim loại, hợp chất hữu cơ, tài nguyên · Di truyền, tiến hoá',
 bai:['Nhận biết một số dụng cụ, hoá chất. Thuyết trình một vấn đề khoa học','Động năng. Thế năng','Cơ năng','Công và công suất','Khúc xạ ánh sáng','Phản xạ toàn phần','Lăng kính','Thấu kính','Thực hành đo tiêu cự của thấu kính hội tụ','Kính lúp. Bài tập thấu kính','Điện trở. Định luật Ohm','Đoạn mạch nối tiếp, song song','Năng lượng của dòng điện và công suất điện','Cảm ứng điện từ. Nguyên tắc tạo ra dòng điện xoay chiều','Tác dụng của dòng điện xoay chiều','Vòng năng lượng trên Trái Đất. Năng lượng hoá thạch','Một số dạng năng lượng tái tạo','Tính chất chung của kim loại','Dãy hoạt động hoá học','Tách kim loại và việc sử dụng hợp kim','Sự khác nhau cơ bản giữa phi kim và kim loại','Giới thiệu về hợp chất hữu cơ','Alkane','Alkene','Nguồn nhiên liệu','Ethylic alcohol','Acetic acid','Lipid','Carbohydrate. Glucose và saccharose','Tinh bột và cellulose','Protein','Polymer','Sơ lược về hoá học vỏ Trái Đất và khai thác tài nguyên từ vỏ Trái Đất','Khai thác đá vôi. Công nghiệp silicate','Khai thác nhiên liệu hoá thạch. Nguồn carbon. Chu trình carbon và sự ấm lên toàn cầu','Khái quát về di truyền học','Các quy luật di truyền của Mendel','Nucleic acid và gene','Tái bản DNA và phiên mã tạo RNA','Dịch mã và mối quan hệ từ gene đến tính trạng','Đột biến gene','Nhiễm sắc thể và bộ nhiễm sắc thể','Nguyên phân và giảm phân','Nhiễm sắc thể giới tính và cơ chế xác định giới tính','Di truyền liên kết','Đột biến nhiễm sắc thể','Di truyền học với con người','Ứng dụng công nghệ di truyền vào đời sống','Khái niệm tiến hoá và các hình thức chọn lọc','Cơ chế tiến hoá','Sự phát sinh và phát triển sự sống trên Trái Đất'],
 ch:[['Mở đầu',1,1],['Chương I. Năng lượng cơ học',2,4],['Chương II. Ánh sáng',5,10],['Chương III. Điện',11,13],['Chương IV. Điện từ',14,15],['Chương V. Năng lượng với cuộc sống',16,17],['Chương VI. Kim loại. Sự khác nhau cơ bản giữa phi kim và kim loại',18,21],['Chương VII. Giới thiệu về chất hữu cơ. Hydrocarbon và nguồn nhiên liệu',22,25],['Chương VIII. Ethylic alcohol và acetic acid',26,27],['Chương IX. Lipid. Carbohydrate. Protein. Polymer',28,32],['Chương X. Khai thác tài nguyên từ vỏ Trái Đất',33,35],['Chương XI. Di truyền học Mendel. Cơ sở phân tử của hiện tượng di truyền',36,41],['Chương XII. Di truyền nhiễm sắc thể',42,46],['Chương XIII. Di truyền học với con người và đời sống',47,48],['Chương XIV. Tiến hoá',49,51]]}};
/* ================= CÁC MÔN HỌC =================
   KHTN dùng khoá lớp là số (6–9). Môn khác dùng khoá chữ (ls8 = Lịch sử và Địa lí 8).
   bn: tên hiển thị của từng bài (phân môn Lịch sử và Địa lí đánh số bài riêng trong sách). */
var SUBJ=[
 {id:'khtn',ico:'🔬',name:'Khoa học tự nhiên',short:'KHTN',keys:[6,7,8,9]},
 {id:'ls',ico:'🌏',name:'Lịch sử và Địa lí',short:'Sử – Địa',keys:['ls6','ls7','ls8','ls9']},
 {id:'en',ico:'🔤',name:'Tiếng Anh',short:'Tiếng Anh',keys:['en6','en7','en8','en9']},
 {id:'nv',ico:'📖',name:'Ngữ văn (Tiếng Việt)',short:'Ngữ văn',keys:['nv6','nv7','nv8','nv9']}];
/* Ngữ văn: chỉ phần Thực hành tiếng Việt (ngữ pháp, từ ngữ, dấu câu, biện pháp tu từ) – Kết nối tri thức */
GR.nv6={n:6,subj:'nv',files:['cauhoi-nv6.js'],tag:'Thực hành tiếng Việt: cấu tạo từ, cụm từ, trạng ngữ, dấu câu, từ mượn, biện pháp tu từ',
 bai:['Tôi và các bạn','Gõ cửa trái tim','Yêu thương và chia sẻ','Quê hương yêu dấu','Những nẻo đường xứ sở','Chuyện kể về những người anh hùng','Thế giới cổ tích','Khác biệt và gần gũi','Trái Đất – ngôi nhà chung'],
 ch:[['Học kì I (Tập một)',1,5],['Học kì II (Tập hai)',6,9]]};
[7,8,9].forEach(function(n){GR['nv'+n]={n:n,subj:'nv',soon:1,files:[],tag:'Thực hành tiếng Việt',bai:[],ch:[]}});
/* Tiếng Anh (Global Success): câu hỏi được đọc bằng giọng tiếng Anh của trình duyệt (speak.js) */
GR.en6={n:6,subj:'en',files:['cauhoi-en6.js'],tag:'Global Success 6 · 12 Units · Từ vựng, ngữ pháp, phát âm, nghe từ – có giọng đọc tiếng Anh',
 bai:['My New School','My House','My Friends','My Neighbourhood','Natural Wonders of Viet Nam','Our Tet Holiday','Television','Sports and Games','Cities of the World','Our Houses in the Future','Our Greener World','Robots'],
 bn:['Unit 1','Unit 2','Unit 3','Unit 4','Unit 5','Unit 6','Unit 7','Unit 8','Unit 9','Unit 10','Unit 11','Unit 12'],
 ch:[['Theme 1. Our Communities',1,3],['Theme 2. Our Heritage',4,6],['Theme 3. Our World',7,9],['Theme 4. Visions of the Future',10,12]]};
GR.en7={n:7,subj:'en',files:['cauhoi-en7.js'],tag:'Global Success 7 · 12 Units · Từ vựng, ngữ pháp, phát âm, nghe từ – có giọng đọc tiếng Anh',
 bai:['Hobbies','Healthy Living','Community Service','Music and Arts','Food and Drink','A Visit to a School','Traffic','Films','Festivals around the World','Energy Sources','Travelling in the Future','English-speaking Countries'],
 bn:['Unit 1','Unit 2','Unit 3','Unit 4','Unit 5','Unit 6','Unit 7','Unit 8','Unit 9','Unit 10','Unit 11','Unit 12'],
 ch:[['Units 1 – 3',1,3],['Units 4 – 6',4,6],['Units 7 – 9',7,9],['Units 10 – 12',10,12]]};
GR.en8={n:8,subj:'en',files:['cauhoi-en8.js'],tag:'Global Success 8 · 12 Units · Từ vựng, ngữ pháp, phát âm, nghe từ – có giọng đọc tiếng Anh',bai:['Leisure Time','Life in the Countryside','Teenagers','Ethnic Groups of Viet Nam','Our Customs and Traditions','Lifestyles','Environmental Protection','Shopping','Natural Disasters','Communication in the Future','Science and Technology','Life on Other Planets'],bn:['Unit 1','Unit 2','Unit 3','Unit 4','Unit 5','Unit 6','Unit 7','Unit 8','Unit 9','Unit 10','Unit 11','Unit 12'],ch:[['Units 1 – 3',1,3],['Units 4 – 6',4,6],['Units 7 – 9',7,9],['Units 10 – 12',10,12]]};
GR.en9={n:9,subj:'en',files:['cauhoi-en9.js'],tag:'Global Success 9 · 12 Units · Từ vựng, ngữ pháp, phát âm, nghe từ – có giọng đọc tiếng Anh',
 bai:['Local Community','City Life','Healthy Living for Teens','Remembering the Past','Our Experiences','Vietnamese Lifestyle: Then and Now','Natural Wonders of the World','Tourism','World Englishes','Planet Earth','Electronic Devices','Career Choices'],
 bn:['Unit 1','Unit 2','Unit 3','Unit 4','Unit 5','Unit 6','Unit 7','Unit 8','Unit 9','Unit 10','Unit 11','Unit 12'],
 ch:[['Theme 1. Our Communities',1,3],['Theme 2. Our Heritage',4,6],['Theme 3. Our World',7,9],['Theme 4. Visions of the Future',10,12]]};
[6,7,8,9].forEach(function(g){GR[g].subj='khtn'});
GR.ls6={n:6,subj:'ls',files:['cauhoi-ls6.js'],tag:'Xã hội nguyên thuỷ, cổ đại · Bản đồ, Trái Đất, các thành phần tự nhiên',
 bai:['Lịch sử và cuộc sống','Dựa vào đâu để biết và phục dựng lại lịch sử?','Thời gian trong lịch sử','Nguồn gốc loài người','Xã hội nguyên thuỷ','Sự chuyển biến và phân hoá của xã hội nguyên thuỷ','Ai Cập và Lưỡng Hà cổ đại','Ấn Độ cổ đại','Trung Quốc từ thời cổ đại đến thế kỉ VII','Hy Lạp và La Mã cổ đại','Các quốc gia sơ kì ở Đông Nam Á','Sự hình thành và bước đầu phát triển của các vương quốc phong kiến ở Đông Nam Á (từ thế kỉ VII đến thế kỉ X)','Giao lưu văn hoá ở Đông Nam Á từ đầu Công nguyên đến thế kỉ X','Nhà nước Văn Lang – Âu Lạc','Chính sách cai trị của các triều đại phong kiến phương Bắc và sự chuyển biến của xã hội Âu Lạc','Các cuộc khởi nghĩa tiêu biểu giành độc lập trước thế kỉ X','Cuộc đấu tranh bảo tồn và phát triển văn hoá dân tộc của người Việt','Bước ngoặt lịch sử đầu thế kỉ X','Vương quốc Chăm-pa từ thế kỉ II đến thế kỉ X','Vương quốc Phù Nam',
  'Bài mở đầu môn Địa lí','Hệ thống kinh, vĩ tuyến. Toạ độ địa lí','Bản đồ. Một số lưới kinh, vĩ tuyến. Phương hướng trên bản đồ','Tỉ lệ bản đồ. Tính khoảng cách thực tế dựa vào tỉ lệ bản đồ','Kí hiệu và bảng chú giải bản đồ. Tìm đường đi trên bản đồ','Lược đồ trí nhớ','Trái Đất trong hệ Mặt Trời','Chuyển động tự quay quanh trục của Trái Đất và hệ quả','Chuyển động của Trái Đất quanh Mặt Trời và hệ quả','Xác định phương hướng ngoài thực tế','Cấu tạo của Trái Đất. Các mảng kiến tạo','Quá trình nội sinh và quá trình ngoại sinh. Hiện tượng tạo núi','Núi lửa và động đất','Các dạng địa hình chính trên Trái Đất. Khoáng sản','Thực hành: Đọc lược đồ địa hình tỉ lệ lớn và lát cắt địa hình đơn giản','Lớp vỏ khí của Trái Đất. Khí áp và gió','Nhiệt độ không khí. Mây và mưa','Thời tiết và khí hậu. Biến đổi khí hậu','Thực hành: Phân tích biểu đồ nhiệt độ, lượng mưa','Thuỷ quyển và vòng tuần hoàn lớn của nước','Sông và hồ. Nước ngầm và băng hà','Biển và đại dương','Lớp đất trên Trái Đất','Sự sống trên Trái Đất','Rừng nhiệt đới','Sự phân bố các đới thiên nhiên trên Trái Đất','Thực hành: Tìm hiểu môi trường tự nhiên địa phương','Dân số và sự phân bố dân cư trên thế giới','Mối quan hệ giữa con người và thiên nhiên','Bảo vệ tự nhiên và khai thác thông minh các tài nguyên thiên nhiên vì sự phát triển bền vững','Thực hành: Tìm hiểu mối quan hệ giữa con người và thiên nhiên ở địa phương'],
 bn:(function(){var a=[];for(var i=1;i<=20;i++)a.push('Sử – Bài '+i);a.push('Địa – Bài mở đầu');for(i=1;i<=30;i++)a.push('Địa – Bài '+i);return a})(),
 ch:[['Lịch sử – Chương 1. Vì sao phải học lịch sử?',1,3],['Lịch sử – Chương 2. Thời kì nguyên thuỷ',4,6],['Lịch sử – Chương 3. Xã hội cổ đại',7,10],['Lịch sử – Chương 4. Đông Nam Á từ những thế kỉ tiếp giáp Công nguyên đến thế kỉ X',11,13],['Lịch sử – Chương 5. Việt Nam từ khoảng thế kỉ VII TCN đến đầu thế kỉ X',14,20],['Địa lí – Bài mở đầu',21,21],['Địa lí – Chương 1. Bản đồ: phương tiện thể hiện bề mặt Trái Đất',22,26],['Địa lí – Chương 2. Trái Đất – hành tinh của hệ Mặt Trời',27,30],['Địa lí – Chương 3. Cấu tạo của Trái Đất. Vỏ Trái Đất',31,35],['Địa lí – Chương 4. Khí hậu và biến đổi khí hậu',36,39],['Địa lí – Chương 5. Nước trên Trái Đất',40,42],['Địa lí – Chương 6. Đất và sinh vật trên Trái Đất',43,47],['Địa lí – Chương 7. Con người và thiên nhiên',48,51]]};
GR.ls7={n:7,subj:'ls',files:['cauhoi-ls7.js'],tag:'Tây Âu, Trung Quốc, Ấn Độ, Đông Nam Á trung đại · Việt Nam thế kỉ X–XVI · Các châu lục',
 bai:['Quá trình hình thành và phát triển của chế độ phong kiến ở Tây Âu','Các cuộc phát kiến địa lí và sự hình thành quan hệ sản xuất tư bản chủ nghĩa ở Tây Âu','Phong trào Văn hoá Phục hưng và Cải cách tôn giáo','Trung Quốc từ thế kỉ VII đến giữa thế kỉ XIX','Ấn Độ từ thế kỉ IV đến giữa thế kỉ XIX','Các vương quốc phong kiến Đông Nam Á từ nửa sau thế kỉ X đến nửa đầu thế kỉ XVI','Vương quốc Lào','Vương quốc Cam-pu-chia','Đất nước buổi đầu độc lập (939 – 967)','Đại Cồ Việt thời Đinh và Tiền Lê (968 – 1009)','Nhà Lý xây dựng và phát triển đất nước (1009 – 1225)','Cuộc kháng chiến chống quân xâm lược Tống (1075 – 1077)','Đại Việt thời Trần (1226 – 1400)','Ba lần kháng chiến chống quân xâm lược Mông – Nguyên','Nước Đại Ngu thời Hồ (1400 – 1407)','Khởi nghĩa Lam Sơn (1418 – 1427)','Đại Việt thời Lê sơ (1428 – 1527)','Vương quốc Chăm-pa và vùng đất Nam Bộ từ đầu thế kỉ X đến đầu thế kỉ XVI',
  'Vị trí địa lí, đặc điểm tự nhiên châu Âu','Đặc điểm dân cư, xã hội châu Âu','Khai thác, sử dụng và bảo vệ thiên nhiên ở châu Âu','Liên minh châu Âu','Vị trí địa lí, đặc điểm tự nhiên châu Á','Đặc điểm dân cư, xã hội châu Á','Bản đồ chính trị châu Á, các khu vực của châu Á','Thực hành: Tìm hiểu về các nền kinh tế lớn và kinh tế mới nổi của châu Á','Vị trí địa lí, đặc điểm tự nhiên châu Phi','Đặc điểm dân cư, xã hội châu Phi','Phương thức con người khai thác, sử dụng và bảo vệ thiên nhiên ở châu Phi','Thực hành: Tìm hiểu khái quát Cộng hoà Nam Phi','Vị trí địa lí, phạm vi châu Mỹ. Sự phát kiến ra châu Mỹ','Đặc điểm tự nhiên Bắc Mỹ','Đặc điểm dân cư, xã hội, phương thức khai thác tự nhiên bền vững ở Bắc Mỹ','Đặc điểm tự nhiên Trung và Nam Mỹ','Đặc điểm dân cư, xã hội Trung và Nam Mỹ, khai thác, sử dụng và bảo vệ rừng A-ma-dôn','Châu Đại Dương','Châu Nam Cực',
  'Các cuộc đại phát kiến địa lí','Đô thị: lịch sử và hiện tại'],
 bn:(function(){var a=[];for(var i=1;i<=18;i++)a.push('Sử – Bài '+i);for(i=1;i<=19;i++)a.push('Địa – Bài '+i);a.push('Chủ đề chung 1','Chủ đề chung 2');return a})(),
 ch:[['Lịch sử – Chương 1. Tây Âu từ thế kỉ V đến nửa đầu thế kỉ XVI',1,3],['Lịch sử – Chương 2. Trung Quốc và Ấn Độ thời trung đại',4,5],['Lịch sử – Chương 3. Đông Nam Á từ nửa sau thế kỉ X đến nửa đầu thế kỉ XVI',6,8],['Lịch sử – Chương 4. Đất nước dưới thời các vương triều Ngô – Đinh – Tiền Lê (939 – 1009)',9,10],['Lịch sử – Chương 5. Đại Việt thời Lý – Trần – Hồ (1009 – 1407)',11,15],['Lịch sử – Chương 6. Khởi nghĩa Lam Sơn và Đại Việt thời Lê sơ (1418 – 1527)',16,17],['Lịch sử – Chương 7. Vùng đất phía Nam Việt Nam từ đầu thế kỉ X đến đầu thế kỉ XVI',18,18],['Địa lí – Chương 1. Châu Âu',19,22],['Địa lí – Chương 2. Châu Á',23,26],['Địa lí – Chương 3. Châu Phi',27,30],['Địa lí – Chương 4. Châu Mỹ',31,35],['Địa lí – Chương 5. Châu Đại Dương và châu Nam Cực',36,37],['Chủ đề chung',38,39]]};
GR.ls9={n:9,subj:'ls',files:['cauhoi-ls9.js'],tag:'Thế giới và Việt Nam 1918 đến nay · Địa lí dân cư, kinh tế, vùng Việt Nam',
 bai:['Nước Nga và Liên Xô từ năm 1918 đến năm 1945','Châu Âu và nước Mỹ từ năm 1918 đến năm 1945','Châu Á từ năm 1918 đến năm 1945','Chiến tranh thế giới thứ hai (1939 – 1945)','Phong trào dân tộc dân chủ ở Việt Nam từ năm 1918 đến năm 1930','Hoạt động của Nguyễn Ái Quốc và sự thành lập Đảng Cộng sản Việt Nam','Phong trào cách mạng Việt Nam thời kì 1930 – 1939','Cách mạng tháng Tám năm 1945','Chiến tranh lạnh (1947 – 1989)','Liên Xô và Đông Âu từ năm 1945 đến năm 1991','Nước Mỹ và Tây Âu từ năm 1945 đến năm 1991','Khu vực Mỹ La-tinh và châu Á từ năm 1945 đến năm 1991','Việt Nam trong năm đầu sau Cách mạng tháng Tám năm 1945','Việt Nam kháng chiến chống thực dân Pháp xâm lược giai đoạn 1946 – 1950','Việt Nam kháng chiến chống thực dân Pháp xâm lược giai đoạn 1951 – 1954','Việt Nam kháng chiến chống Mỹ, cứu nước, thống nhất đất nước giai đoạn 1954 – 1965','Việt Nam kháng chiến chống Mỹ, cứu nước, thống nhất đất nước giai đoạn 1965 – 1975','Trật tự thế giới mới từ năm 1991 đến nay. Liên bang Nga và nước Mỹ từ năm 1991 đến nay','Châu Á từ năm 1991 đến nay','Việt Nam từ năm 1976 đến nay','Cách mạng khoa học – kĩ thuật và xu thế toàn cầu hoá',
  'Dân tộc và dân số','Phân bố dân cư và các loại hình quần cư','Lao động và việc làm','Thực hành: Tìm hiểu vấn đề việc làm ở địa phương và phân hoá thu nhập theo vùng','Nông nghiệp','Lâm nghiệp và thuỷ sản','Thực hành: Viết báo cáo về một mô hình sản xuất nông nghiệp có hiệu quả','Công nghiệp','Thực hành: Xác định một số hình thức tổ chức lãnh thổ công nghiệp ở nước ta','Dịch vụ','Thực hành: Tìm hiểu xu hướng phát triển ngành thương mại, du lịch','Vùng Trung du và miền núi phía Bắc','Vùng Đồng bằng sông Hồng','Vùng Bắc Trung Bộ','Thực hành: Tìm hiểu vấn đề phòng, chống thiên tai và ứng phó với biến đổi khí hậu ở vùng Bắc Trung Bộ','Vùng Duyên hải Nam Trung Bộ và Tây Nguyên','Vùng Đông Nam Bộ','Thực hành: Phân tích ý nghĩa của việc tăng cường kết nối liên vùng đối với sự phát triển của vùng Đông Nam Bộ','Vùng Đồng bằng sông Cửu Long','Thực hành: Tìm hiểu về tác động của biến đổi khí hậu đối với vùng Đồng bằng sông Cửu Long','Phát triển tổng hợp kinh tế và bảo vệ tài nguyên, môi trường biển, đảo',
  'Đô thị: lịch sử và hiện tại','Văn minh châu thổ sông Hồng và sông Cửu Long','Bảo vệ chủ quyền, các quyền và lợi ích hợp pháp của Việt Nam ở Biển Đông'],
 bn:(function(){var a=[];for(var i=1;i<=21;i++)a.push('Sử – Bài '+i);for(i=1;i<=21;i++)a.push('Địa – Bài '+i);a.push('Chủ đề chung 1','Chủ đề chung 2','Chủ đề chung 3');return a})(),
 ch:[['Lịch sử – Chương 1. Thế giới từ năm 1918 đến năm 1945',1,4],['Lịch sử – Chương 2. Việt Nam từ năm 1918 đến năm 1945',5,8],['Lịch sử – Chương 3. Thế giới từ năm 1945 đến năm 1991',9,12],['Lịch sử – Chương 4. Việt Nam từ năm 1945 đến năm 1975',13,17],['Lịch sử – Chương 5. Thế giới từ năm 1991 đến nay',18,19],['Lịch sử – Chương 6. Việt Nam từ năm 1976 đến nay',20,20],['Lịch sử – Chương 7. Cách mạng khoa học – kĩ thuật và xu thế toàn cầu hoá',21,21],
  ['Địa lí – Chương 1. Địa lí dân cư Việt Nam',22,25],['Địa lí – Chương 2. Địa lí các ngành kinh tế',26,32],['Địa lí – Chương 3. Địa lí các vùng kinh tế – xã hội',33,42],['Chủ đề chung',43,45]]};
GR.ls8={n:8,subj:'ls',files:['cauhoi-ls8.js'],tag:'Châu Âu, châu Á, Việt Nam thế kỉ XVI – đầu thế kỉ XX · Tự nhiên Việt Nam, biển đảo Việt Nam',
 bai:['Cách mạng tư sản Anh và Chiến tranh giành độc lập của 13 thuộc địa Anh ở Bắc Mỹ','Cách mạng tư sản Pháp cuối thế kỉ XVIII','Cách mạng công nghiệp (nửa sau thế kỉ XVIII – giữa thế kỉ XIX)','Đông Nam Á từ nửa sau thế kỉ XVI đến giữa thế kỉ XIX','Cuộc xung đột Nam – Bắc triều và Trịnh – Nguyễn','Công cuộc khai phá vùng đất phía Nam từ thế kỉ XVI đến thế kỉ XVIII','Khởi nghĩa nông dân ở Đàng Ngoài thế kỉ XVIII','Phong trào Tây Sơn','Tình hình kinh tế, văn hoá, tôn giáo trong các thế kỉ XVI – XVIII','Sự hình thành chủ nghĩa đế quốc ở các nước Âu – Mỹ (cuối thế kỉ XIX – đầu thế kỉ XX)','Phong trào công nhân từ cuối thế kỉ XVIII đến đầu thế kỉ XX và sự ra đời của chủ nghĩa xã hội khoa học','Chiến tranh thế giới thứ nhất (1914 – 1918) và Cách mạng tháng Mười Nga năm 1917','Sự phát triển của khoa học, kĩ thuật, văn học, nghệ thuật trong các thế kỉ XVIII – XIX','Trung Quốc và Nhật Bản từ nửa sau thế kỉ XIX đến đầu thế kỉ XX','Ấn Độ và Đông Nam Á từ nửa sau thế kỉ XIX đến đầu thế kỉ XX','Việt Nam dưới thời Nguyễn (nửa đầu thế kỉ XIX)','Cuộc kháng chiến chống thực dân Pháp xâm lược từ năm 1858 đến năm 1884','Phong trào chống Pháp trong những năm 1885 – 1896','Phong trào yêu nước chống Pháp ở Việt Nam từ đầu thế kỉ XX đến năm 1917',
  'Vị trí địa lí và phạm vi lãnh thổ Việt Nam','Địa hình Việt Nam','Khoáng sản Việt Nam','Khí hậu Việt Nam','Thực hành: Vẽ và phân tích biểu đồ khí hậu','Thuỷ văn Việt Nam','Vai trò của tài nguyên khí hậu và tài nguyên nước đối với sự phát triển kinh tế – xã hội của nước ta','Tác động của biến đổi khí hậu đối với khí hậu và thuỷ văn Việt Nam','Thổ nhưỡng Việt Nam','Sinh vật Việt Nam','Phạm vi Biển Đông. Vùng biển đảo và đặc điểm tự nhiên vùng biển đảo Việt Nam','Môi trường và tài nguyên biển đảo Việt Nam',
  'Văn minh châu thổ sông Hồng và sông Cửu Long','Bảo vệ chủ quyền, các quyền và lợi ích hợp pháp của Việt Nam ở Biển Đông'],
 bn:(function(){var a=[];for(var i=1;i<=19;i++)a.push('Sử – Bài '+i);for(i=1;i<=12;i++)a.push('Địa – Bài '+i);a.push('Chủ đề chung 1','Chủ đề chung 2');return a})(),
 ch:[['Lịch sử – Chương 1. Châu Âu và Bắc Mỹ từ nửa sau thế kỉ XVI đến thế kỉ XVIII',1,3],['Lịch sử – Chương 2. Đông Nam Á từ nửa sau thế kỉ XVI đến giữa thế kỉ XIX',4,4],['Lịch sử – Chương 3. Việt Nam từ đầu thế kỉ XVI đến thế kỉ XVIII',5,9],['Lịch sử – Chương 4. Châu Âu và nước Mỹ từ cuối thế kỉ XVIII đến đầu thế kỉ XX',10,12],['Lịch sử – Chương 5. Sự phát triển của khoa học, kĩ thuật, văn học, nghệ thuật trong các thế kỉ XVIII – XIX',13,13],['Lịch sử – Chương 6. Châu Á từ nửa sau thế kỉ XIX đến đầu thế kỉ XX',14,15],['Lịch sử – Chương 7. Việt Nam từ thế kỉ XIX đến đầu thế kỉ XX',16,19],
  ['Địa lí – Chương 1. Vị trí địa lí và phạm vi lãnh thổ, địa hình và khoáng sản Việt Nam',20,22],['Địa lí – Chương 2. Khí hậu và thuỷ văn Việt Nam',23,27],['Địa lí – Chương 3. Thổ nhưỡng và sinh vật Việt Nam',28,29],['Địa lí – Chương 4. Biển đảo Việt Nam',30,31],['Chủ đề chung',32,33]]};
function subjOf(g){var id=GR[g]&&GR[g].subj||'khtn';for(var i=0;i<SUBJ.length;i++)if(SUBJ[i].id==id)return SUBJ[i];return SUBJ[0]}
/* Nhãn ngắn của một lớp: "Lớp 8" (KHTN) hoặc "Sử – Địa 8" */
function glab(g){var c=GR[g];if(!c)return '';return c.subj=='khtn'?'Lớp '+c.n:subjOf(g).short+' '+c.n}
/* Chuẩn hoá khoá lớp: "8" → 8 (KHTN), "ls8" giữ nguyên; khoá lạ → 0 */
function gkey(g){if(g==null||g==='')return 0;var n=+g;if(isFinite(n)&&GR[n])return n;return GR[g]?String(g):0}
function bname(c,b){return (c.bn&&c.bn[b-1]?c.bn[b-1]:'Bài '+b)}
var GAMES={
 mil:{ico:'💰',name:'Ai là triệu phú',pick:['mc'],n:10,time:30,d:'10 câu từ dễ đến khó, tiền thưởng tăng dần, có quyền trợ giúp 50:50 và Đổi câu hỏi.'},
 flash:{ico:'⚡',name:'Nhanh như chớp',pick:['tf','mc'],n:10,time:10,d:'Đúng/sai và trắc nghiệm, mỗi câu 10 giây, trả lời càng nhanh điểm càng cao.'},
 num:{ico:'🔢',name:'Giải mã con số',pick:['num'],n:8,time:40,d:'Tính nhanh và nhập đáp án là một con số.'},
 squid:{ico:'🌉',name:'Vượt cầu sinh tồn',pick:['mc','tf'],n:10,time:30,modes:['solo','turn'],d:'Chơi đơn hoặc 2 đội theo lượt. Nhảy qua các phiến đá chênh vênh trên vực sâu. Chọn sai là đá sụp! Chơi theo đội: đội nào trả lời sai trước sẽ thua.'},
 sack:{ico:'🦘',name:'Nhảy bao bố',team:1,d:'Hai đội Xanh – Đỏ thi cùng lúc, mỗi đội 10 câu trắc nghiệm, đúng/sai. Trả lời bằng chạm hoặc bằng động tác tay qua camera.'},
 rescue:{ico:'🌊',name:'Giải cứu thú cưng',modes:['solo','turn'],d:'Vận động trước camera. Cún con, mèo con bị nhốt trong phòng kín đang ngập nước: trả lời đúng để mở van thoát nước, sai quá 3 câu là giải cứu thất bại. Chơi theo đội: mỗi đội một phòng, đội nào cứu được trước thắng.'},
 fruit:{ico:'🧺',name:'Hứng hoa quả',modes:['solo','vs','turn'],d:'Chơi đơn hoặc đối kháng 2 bạn, vận động trước camera. Mỗi bạn đóng vai một con vật, bước sang trái – phải để hứng quả mang đáp án đúng đang rơi. 10 câu, mỗi quả đúng được 1 điểm.'},
 space:{ico:'🚀',name:'Bảo vệ Trái Đất',modes:['solo','vs','turn'],d:'Chơi đơn, đối kháng 2 bạn (chia đôi màn hình) hoặc 2 đội theo lượt, vận động trước camera. Lái tàu vũ trụ đến thiên thạch mang đáp án đúng và giữ 5 giây để bắn laser tiêu diệt sinh vật ngoài hành tinh. 15 câu, mỗi câu 15 giây; chọn sai thì Trái Đất bị tấn công, quá 3 lần là thua.'}};
var MODES={solo:{ico:'🎯',name:'Chơi đơn',k:1,d:'Một mình thử thách và leo bảng vàng.'},vs:{ico:'⚔️',name:'Đối kháng',k:2,d:'Hai bạn thay phiên trả lời, ai nhiều điểm hơn thắng.'},relay:{ico:'🏃',name:'Tiếp sức',k:3,d:'Ba bạn chuyền gậy từng câu, đúng liên tiếp được thưởng chuỗi.'},
 /* Chỉ có ở các trò vận động qua camera (Giải cứu, Hứng hoa quả, Vượt cầu sinh tồn): bạn thứ 1, 3, 5… vào Đội Xanh, bạn 2, 4, 6… vào Đội Đỏ */
 turn:{ico:'👥',name:'2 đội theo lượt',k:12,min:2,d:'Chia 2 đội Xanh – Đỏ, thành viên mỗi đội lần lượt thay nhau ra trước camera trả lời.'}};
/* Chia đội cho chế độ "2 đội theo lượt": theo thứ tự chọn, lẻ vào Đội Xanh, chẵn vào Đội Đỏ */
function teamsOf(list){var t=[[],[]];list.forEach(function(p,i){t[i%2].push(p)});return t}
var LADDER=[100,200,300,500,1000,2000,4000,8000,15000,30000];
var AV=window.AVCODES||['h1','h2','h3','h4','h5','h6','h7','h8','h9','h10','h11','h12'];if(!window.AVH)window.AVH=function(e){return e};
var LVN=['Dễ','Vừa','Khó','Nâng cao'];
var LEVELS=[[0,'Tân binh','🌱'],[150,'Nhà thám hiểm','🧭'],[400,'Nhà khoa học nhí','🔬'],[800,'Nhà nghiên cứu','🧪'],[1500,'Chuyên gia','🧠'],[2500,'Giáo sư','🎓'],[4000,'Thiên tài','🚀'],[6000,'Huyền thoại','👑']];
var BADGES=[['first','🎬','Lên sóng','Chơi ván đầu tiên'],['streak5','🔥','Chuỗi lửa','Đúng 5 câu liên tiếp'],['streak10','☄️','Sao chổi','Đúng 10 câu liên tiếp'],['mil','💰','Triệu phú tri thức','Vượt qua mọi câu hỏi Ai là triệu phú'],['flash','⚡','Tia chớp','Đúng từ 8 câu Nhanh như chớp trở lên'],['num','🔢','Thần số học','Giải đúng mọi câu Giải mã con số'],['bridge','🌉','Qua cầu','Về đích Vượt cầu sinh tồn'],['rescue','🌊','Người hùng cứu hộ','Giải cứu thành công người bị nạn'],['fruit','🧺','Vựa trái cây','Hứng được từ 8 quả trong trò Hứng hoa quả'],['space','🚀','Vệ binh Trái Đất','Bảo vệ Trái Đất thành công qua 15 câu'],['review','📚','Chăm ôn','Hoàn thành 5 lượt ôn tập'],['perfect','💯','Hoàn hảo','Ôn tập đúng 100% (từ 10 câu)'],['xp1000','🏆','Ngôi sao','Đạt 1000 điểm kinh nghiệm'],['xp5000','👑','Huyền thoại','Đạt 5000 điểm kinh nghiệm']];

/* ================= TIỆN ÍCH ================= */
var app=document.getElementById('app');
function $(s){return document.querySelector(s)}
function $$(s){return [].slice.call(document.querySelectorAll(s))}
function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function load(k,d){try{var v=JSON.parse(localStorage.getItem(k));return v==null?d:v}catch(e){return d}}
function save(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
function shuf(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=a[i];a[i]=a[j];a[j]=t}return a}
function snd(f,x){if(window.SND&&SND[f])SND[f](x)}
function fmt(n){return String(n).replace('.',',')}
function numVal(s){s=String(s).trim().replace(/\s/g,'').replace(',','.');return s===''?NaN:+s}
function ansText(q){return q.t=='mc'?'ABCD'[q.a]+'. '+q.o[q.a]:q.t=='tf'?(q.a?'ĐÚNG':'SAI'):fmt(q.a)}
function stars(l){return '<span class="stars" aria-label="'+LVN[l-1]+'">'+'★★★★'.slice(0,Math.min(l,4))+'<i>'+'★★★★'.slice(0,4-Math.min(l,4))+'</i></span>'}
function setScreen(n){if(window.SND&&SND.bedOff)SND.bedOff();if(window.DTKSAY&&n!='play'&&n!='sack')DTKSAY.stop();if(n!='play'&&window.DTKSACK&&DTKSACK.gcam)DTKSACK.gcam.stop();document.body.setAttribute('data-scr',n);document.body.removeAttribute('data-game');document.body.classList.remove('tight','tighter');document.body.classList.toggle('playing',n=='play'||n=='sack');window.scrollTo(0,0)}

/* ================= CHỈ CHƠI KHI CÓ INTERNET ================= */
var APPV=73;
function netGate(){
 var off=navigator.onLine===false,o=document.getElementById('offline');
 if(off&&!o){o=document.createElement('div');o.id='offline';o.className='offline';o.setAttribute('role','alertdialog');
  o.innerHTML='<div class="offbox"><div class="offic">📡</div><h2>Cần kết nối Internet</h2><p>Đấu trường Tri thức chỉ chơi được khi có mạng. Hãy bật Wi-Fi hoặc dữ liệu di động, trò chơi sẽ tự mở lại.</p><button class="btn" data-act="netretry">Thử lại</button></div>';
  document.body.appendChild(o)}
 else if(!off&&o)o.remove();
}
window.addEventListener('online',netGate);window.addEventListener('offline',netGate);

/* ================= KHO CÂU HỎI ================= */
var BANK={},LOADING={};
function norm(q){
 if(!q||typeof q.q!='string')return null;
 q.l=Math.max(1,Math.min(4,+q.l||1));q.b=+q.b||0;
 if(q.t=='mc')return q.o&&q.o.length==4&&q.a>=0&&q.a<4?q:null;
 if(q.t=='tf')return typeof q.a=='boolean'?q:null;
 if(q.t=='num'){q.a=+q.a;return isFinite(q.a)?q:null}
 return null;
}
var DTK=window.DTK={
 data:function(g,qs){BANK[g]=(qs||[]).map(norm).filter(Boolean)},
 add:function(g,qs){var en=/^en/.test(g);BANK[g]=(BANK[g]||[]).concat((qs||[]).map(norm).filter(Boolean).map(function(q){if(en)q.en=1;return q}))},
 MC:function(b,l,c,q,ans,w1,w2,w3){return{t:'mc',b:b,l:l,c:c,q:q,o:[ans,w1,w2,w3],a:0}},
 TF:function(b,l,c,q,a,e){var r={t:'tf',b:b,l:l,c:c,q:q,a:a};if(e)r.e=e;return r},
 NUM:function(b,l,c,q,a,e){var r={t:'num',b:b,l:l,c:c,q:q,a:a};if(e)r.e=e;return r}};
/* Tương thích file xuất từ trang quản lý câu hỏi lớp 7 cũ (KH7Q.replaceAll / KH7Q.add) */
window.KH7Q={MC:DTK.MC,TF:DTK.TF,NUM:DTK.NUM,add:function(a){DTK.add(7,a)},replaceAll:function(a){DTK.data(7,a)}};
function loadGrade(g,cb){
 if(BANK[g]&&!LOADING[g])return cb&&cb();
 if(LOADING[g]){LOADING[g].push(cb);return}
 LOADING[g]=[cb];BANK[g]=BANK[g]||[];
 var fs=GR[g].files.slice();
 (function next(){
  if(!fs.length){var l=LOADING[g];LOADING[g]=null;l.forEach(function(f){f&&f()});return}
  var s=document.createElement('script');s.src=fs.shift()+'?v='+APPV;s.onload=next;s.onerror=next;document.body.appendChild(s);
 })();
}
function bank(){return BANK[st.g]||[]}
function gcfg(){return GR[st.g]}

/* ================= TRẠNG THÁI ================= */
var st={skface:load('dtk_skface','user')=='environment'?'environment':'user',skcam:!!load('dtk_skcam',false),milcam:!!load('dtk_milcam',false),sqcam:!!load('dtk_sqcam',false),rscam:load('dtk_rscam',true)!==false,frcam:load('dtk_frcam',true)!==false,spcam:load('dtk_spcam',true)!==false,frpet:load('dtk_frpet','🐻'),frpet2:load('dtk_frpet2','🐼'),rspet:load('dtk_rspet','dog'),g:gkey(load('dtk_grade',0)),subj:load('dtk_subj','khtn'),mode:'solo',game:'mil',sel:[],av:AV[0],scope:'0',rlv:'all',rn:15,rvp:-1};
var S=null,tm=null;
function K(k){return 'kh'+st.g+'_'+k}
function roster(){var r=load(K('roster'),[]);if(window.AVNORM)r.forEach(function(p){p.e=AVNORM(p.e)});return r}
function setRoster(r){save(K('roster'),r)}

/* ================= CẤP ĐỘ & HUY HIỆU ================= */
function lvOf(xp){var i=0;while(i+1<LEVELS.length&&xp>=LEVELS[i+1][0])i++;return i}
function profs(){return load(K('prof'),{})}
function profOf(n){var p=profs()[n];return p||{xp:0,n:0,rv:0,b:{}}}
function lvChip(n){var p=profOf(n),i=lvOf(p.xp);return '<span class="lvl" title="'+LEVELS[i][1]+'">'+LEVELS[i][2]+' '+(i+1)+'</span>'}
/* r: {xp, streak, badges:[id...], review:true} → trả về {xp, up, nb:[huy hiệu mới]} */
function award(name,r){
 var all=profs(),p=all[name]||{xp:0,n:0,rv:0,b:{}},lv0=lvOf(p.xp),nb=[];
 p.xp+=Math.max(0,Math.round(r.xp||0));p.n++;if(r.review)p.rv=(p.rv||0)+1;
 var ids=['first'].concat(r.badges||[]);
 if(r.streak>=5)ids.push('streak5');if(r.streak>=10)ids.push('streak10');
 if(p.rv>=5)ids.push('review');if(p.xp>=1000)ids.push('xp1000');if(p.xp>=5000)ids.push('xp5000');
 ids.forEach(function(id){if(!p.b[id]){p.b[id]=Date.now();nb.push(id)}});
 all[name]=p;save(K('prof'),all);
 return {xp:Math.round(r.xp||0),up:lvOf(p.xp)>lv0?lvOf(p.xp):0,nb:nb,p:p};
}
function bdg(id){for(var i=0;i<BADGES.length;i++)if(BADGES[i][0]==id)return BADGES[i];return['?','🏅',id,'']}
function rewardHTML(name,e,res){
 var h='<div class="rw"><b>'+AVH(e)+' '+esc(name)+'</b><span class="xp">+'+res.xp+' XP</span>';
 if(res.up)h+='<span class="up">⬆ Lên cấp '+(res.up+1)+': '+LEVELS[res.up][2]+' '+LEVELS[res.up][1]+'</span>';
 res.nb.forEach(function(id){var b=bdg(id);h+='<span class="nb">'+b[1]+' '+b[2]+'</span>'});
 return h+'</div>';
}
function celebrate(res){var n=0;res.forEach(function(r){n+=r.nb.length+(r.up?1:0)});if(n)setTimeout(function(){snd('badge')},700)}

/* ================= HEADER & ĐIỀU HƯỚNG ================= */
function header(){
 var c=$('#gchip');if(!c)return;
 if(st.g){var n=GR[st.g].n;c.hidden=false;c.className='gchip g'+n;c.innerHTML=glab(st.g)+' <span aria-hidden="true">⇄</span>';c.setAttribute('aria-label','Đang chọn '+subjOf(st.g).name+' lớp '+n+'. Bấm để đổi môn hoặc lớp')}else c.hidden=true;
}
function stopAll(){clearInterval(tm);tm=null;if(window.DTKSACK)DTKSACK.stop();if(window.DTKRESCUE)DTKRESCUE.stop();if(window.DTKFRUIT)DTKFRUIT.stop();if(window.DTKSPACE)DTKSPACE.stop();document.body.classList.remove('sk-on');var o=$('.ovl');if(o)o.remove()}

/* ================= MÀN CHỌN LỚP ================= */
function gradeScreen(){
 stopAll();setScreen('grade');header();
 var sj=SUBJ.filter(function(x){return x.id==st.subj})[0]||SUBJ[0];
 var card=function(g){var c=GR[g],n=BANK[g]&&!LOADING[g]?BANK[g].length:0;
  return '<button class="door g'+c.n+(st.g===g?' on':'')+'" data-act="pickg" data-v="'+g+'"><span class="num">'+c.n+'</span><span class="dl"><b>Lớp '+c.n+'</b><small>'+c.tag+'</small><em>'+(c.soon&&!n?'🛠 Đang soạn câu hỏi':n?n+' câu hỏi · '+c.bai.length+(c.subj=='en'?' Unit':' bài'):c.bai.length+(c.subj=='en'?' Unit':' bài'))+'</em></span></button>'};
 app.innerHTML='<section class="hero center"><div class="eyebrow">Gameshow ôn tập cho học sinh THCS</div><h1 class="title">ĐẤU TRƯỜNG<span>TRI THỨC</span></h1><p>Bám sát sách <b>Kết nối tri thức</b>. Chọn môn học và lớp của bạn để bước lên sân khấu!</p></section>'
 +'<div class="subjs" role="tablist" aria-label="Chọn môn học">'+SUBJ.map(function(x){return '<button class="subj'+(x===sj?' on':'')+'" role="tab" aria-selected="'+(x===sj)+'" data-act="subj" data-v="'+x.id+'"><span>'+x.ico+'</span>'+x.name+'</button>'}).join('')+'</div>'
 +'<div class="doors">'+sj.keys.map(card).join('')+'</div>'
 +'<section class="panel joinbox"><h3>🌐 Có mã phòng chơi?</h3><div class="row"><input id="jcode" maxlength="5" placeholder="Nhập mã phòng (5 kí tự)" aria-label="Mã phòng" autocomplete="off" autocapitalize="characters"><button class="btn" data-act="rmjoin">Vào phòng</button></div><p class="muted small">Thầy cô hoặc bạn tạo phòng sẽ đọc mã, chiếu mã QR hoặc gửi đường link cho bạn.</p></section>';
 sj.keys.forEach(function(g){if(!GR[g].files.length)return;if(!BANK[g]&&!LOADING[g])loadGrade(g,function(){if(document.body.getAttribute('data-scr')=='grade')gradeScreen()})});
}
function openGrade(g){
 g=gkey(g);var c=GR[g];if(!c)return;
 var go=function(){
  if(c.soon&&!(BANK[g]||[]).length){alert('Câu hỏi '+subjOf(g).name+' lớp '+c.n+' đang được soạn, thầy cô sẽ cập nhật sớm. Bạn hãy chọn lớp khác nhé!');return gradeScreen()}
  st.g=g;save('dtk_grade',g);st.subj=c.subj;save('dtk_subj',c.subj);st.sel=[];st.scope='0';st.rvp=-1;home();
 };
 loadGrade(g,go);
}

/* ================= TRANG CHỦ LỚP ================= */
function home(){
 stopAll();setScreen('home');header();
 var r=roster(),c=gcfg();
 app.innerHTML='<section class="hero"><div class="eyebrow g'+c.n+'">'+subjOf(st.g).name+' · Lớp '+c.n+' · '+bank().length+' câu hỏi · '+c.bai.length+(c.subj=='en'?' Unit':' bài')+'</div><h1 class="title">ĐẤU TRƯỜNG<span>'+subjOf(st.g).short.toUpperCase()+' '+c.n+'</span></h1><p>Trả lời câu hỏi như trên sân khấu truyền hình: chơi đơn, đối kháng, tiếp sức hoặc chia hai đội cả lớp.</p></section>'
 +'<section class="panel"><h2>🎤 Ghi danh thí sinh</h2>'
 +'<div class="row"><input id="nm" maxlength="16" placeholder="Tên của bạn" aria-label="Tên của bạn" autocomplete="off"><button class="btn" data-act="reg">Ghi danh</button></div>'
 +'<div class="avs" role="group" aria-label="Chọn biểu tượng">'+AV.map(function(e){return '<button class="av'+(e==st.av?' on':'')+'" data-act="av" data-v="'+e+'" aria-label="Chọn '+(window.AVNAME?AVNAME(e):e)+'">'+AVH(e)+'</button>'}).join('')+'</div>'
 +'<div class="chips">'+(r.map(function(p,i){return '<span class="chip">'+AVH(p.e)+' '+esc(p.n)+' '+lvChip(p.n)+'<button class="x" data-act="del" data-v="'+i+'" aria-label="Xoá '+esc(p.n)+'">×</button></span>'}).join('')||'<em class="muted">Chưa có ai ghi danh. Trò Nhảy bao bố và Ôn tập không cần ghi danh.</em>')+'</div></section>'
 +'<div class="cta"><button class="btn big" data-act="menu">Vào sân khấu ▶</button></div>'
 +'<div class="tiles">'
 +'<button class="tile hot" data-act="room"><span>🌐</span><b>Phòng chơi trực tuyến</b><small>Tạo phòng, mời cả lớp vào bằng mã hoặc QR trên điện thoại, thi cùng lúc.</small></button>'
 +'<button class="tile" data-act="review"><span>📚</span><b>Ôn tập & luyện tập</b><small>Theo bài, theo chương, có câu nâng cao và lời giải thích.</small></button>'
 +'<button class="tile" data-act="prof"><span>🏅</span><b>Cấp độ & huy hiệu</b><small>Tích điểm kinh nghiệm, lên cấp, sưu tầm huy hiệu.</small></button>'
 +'<button class="tile" data-act="lb"><span>🏆</span><b>Bảng vàng</b><small>Điểm cao nhất trên máy này.</small></button>'
 +'</div>';
}
/* ================= PHẠM VI CÂU HỎI ================= */
function scopeInfo(){
 var s=String(st.scope),c=gcfg();
 if(s.charAt(0)=='c'){var r=c.ch[+s.slice(1)];if(r)return{name:r[0],f:function(q){return q.b>=r[1]&&q.b<=r[2]}}}
 else if(+s&&c.bai[+s-1]){var b=+s;return{name:bname(c,b)+'. '+c.bai[b-1],f:function(q){return q.b==b}}}
 return null;
}
function scopeName(){var s=scopeInfo();return s?s.name:'Tất cả các bài'}
function gamePool(){var s=scopeInfo();return s?bank().filter(s.f):bank().filter(function(q){return q.l<4})}
function scopeSelect(){
 var cnt={},B=bank(),c=gcfg();B.forEach(function(q){cnt[q.b]=(cnt[q.b]||0)+1});
 var h='<select id="scope" aria-label="Phạm vi câu hỏi"><option value="0">🌐 Tất cả các bài ('+B.length+' câu)</option>';
 c.ch.forEach(function(r,i){var n=0;for(var b=r[1];b<=r[2];b++)n+=cnt[b]||0;h+='<optgroup label="'+esc(r[0])+'"><option value="c'+i+'"'+(st.scope=='c'+i?' selected':'')+'>📘 Cả chương: '+esc(r[0].replace(/^Chương [IVXL]+\. /,''))+' ('+n+' câu)</option>';
  for(b=r[1];b<=r[2];b++){var k=cnt[b]||0;h+='<option value="'+b+'"'+(String(st.scope)==String(b)?' selected':'')+(k?'':' disabled')+'>'+esc(bname(c,b))+'. '+esc(c.bai[b-1])+' ('+(k?k+' câu':'đang soạn')+')</option>'}
  h+='</optgroup>'});
 return h+'</select>';
}
/* ================= SẢNH CHỌN TRÒ CHƠI ================= */
function menu(){
 stopAll();setScreen('menu');header();
 var g=GAMES[st.game],r=roster();
 if(g.modes){if(g.modes.indexOf(st.mode)<0)st.mode='solo'}else if(g.solo||st.mode=='turn')st.mode='solo';
 var M=MODES[st.mode],k=M.k;
 st.sel=st.sel.filter(function(i){return i<r.length}).slice(0,k);
 if(!st.sel.length&&r.length&&k==1)st.sel=[0];
 var need=g.team?0:(M.min||k),ok=g.team||(M.min?st.sel.length>=M.min:st.sel.length==k);
 app.innerHTML='<div class="bar-top"><button class="btn ghost sm" data-act="home">◀ Thí sinh</button><h2>Sảnh chờ</h2></div>'
 +'<section class="panel"><h3>① Phạm vi câu hỏi</h3>'+scopeSelect()+'<p class="muted small">Chọn một bài hoặc một chương: mỗi câu 30 giây, có cả câu nâng cao.</p></section>'
 +'<section class="panel"><h3>② Trò chơi</h3><div class="games">'+Object.keys(GAMES).map(function(id){var x=GAMES[id];return '<button class="game'+(id==st.game?' on':'')+'" data-act="game" data-v="'+id+'"><span class="gi">'+x.ico+'</span><b>'+x.name+'</b><small>'+x.d+'</small></button>'}).join('')+'</div></section>'
 +(g.team?'<section class="panel"><h3>③ Cách trả lời</h3><div class="modes two">'
  +'<button class="mode'+(st.skcam?'':' on')+'" data-act="skcam" data-v="0"><b>👆 Chạm màn hình</b><small>Mỗi đội bấm vào đáp án ở khung của đội mình.</small></button>'
  +'<button class="mode'+(st.skcam?' on':'')+'" data-act="skcam" data-v="1"><b>📷 Động tác qua camera</b><small>Đứng trước camera: Đội Xanh bên trái, Đội Đỏ bên phải. A quay người sang trái · B quay người sang phải · C đưa hai tay lên cao vỗ tay · D cúi người. Đúng: quay trái · Sai: quay phải.</small></button></div>'
  +(st.skcam?'<h3>Camera</h3><div class="chips"><button class="chip'+(st.skface=='user'?' on':'')+'" data-act="skface" data-v="user">🤳 Camera trước</button><button class="chip'+(st.skface=='environment'?' on':'')+'" data-act="skface" data-v="environment">📷 Camera sau</button></div><p class="muted small">Camera trước: học sinh nhìn thấy mình trên màn hình như soi gương. Camera sau: hướng điện thoại hoặc máy tính bảng về phía học sinh (màn hình quay về thầy cô). Có thể đổi trong trận bằng nút 🔄.</p>':'')
  +(st.skcam?'<p class="muted small">Lần đầu cần có mạng để tải bộ nhận dạng động tác và cho phép dùng camera. Hình ảnh chỉ xử lí trên máy, không gửi đi đâu.</p>':'')+'</section>':'')
 +(st.game=='mil'?'<section class="panel"><h3>Cách trả lời</h3><div class="modes two">'
  +'<button class="mode'+(st.milcam?'':' on')+'" data-act="milcam" data-v="0"><b>👆 Chạm màn hình</b><small>Bấm vào ô đáp án như bình thường.</small></button>'
  +'<button class="mode'+(st.milcam?' on':'')+'" data-act="milcam" data-v="1"><b>📷 Động tác qua camera</b><small>Thí sinh đứng trước camera, giữ động tác 1 giây để chốt: A quay người sang trái · B quay người sang phải · C đưa hai tay lên cao vỗ tay · D cúi người về phía trước. Câu đúng/sai: A là Đúng, B là Sai. Vẫn chạm được khi cần.</small></button></div>'
  +(st.milcam?'<h3>Camera</h3><div class="chips"><button class="chip'+(st.skface=='user'?' on':'')+'" data-act="skface" data-v="user">🤳 Camera trước</button><button class="chip'+(st.skface=='environment'?' on':'')+'" data-act="skface" data-v="environment">📷 Camera sau</button></div><p class="muted small">Lần đầu cần có mạng để tải bộ nhận dạng và cho phép dùng camera. Hình ảnh chỉ xử lí trên máy, không gửi đi đâu.</p>':'')+'</section>':'')
 +(st.game=='squid'?'<section class="panel"><h3>Cách trả lời</h3><div class="modes two">'
  +'<button class="mode'+(st.sqcam?'':' on')+'" data-act="sqcam" data-v="0"><b>👆 Chạm màn hình</b><small>Chạm vào phiến đá có đáp án đúng để nhảy lên.</small></button>'
  +'<button class="mode'+(st.sqcam?' on':'')+'" data-act="sqcam" data-v="1"><b>📷 Động tác qua camera</b><small>Giữ động tác 1 giây để nhảy lên phiến đá: phiến 1 quay người sang trái · phiến 2 quay người sang phải · phiến 3 đưa hai tay lên cao vỗ tay · phiến 4 cúi người. Câu đúng/sai: quay trái là Đúng, quay phải là Sai. Vẫn chạm được khi cần.</small></button></div>'
  +(st.sqcam?'<h3>Camera</h3><div class="chips"><button class="chip'+(st.skface=='user'?' on':'')+'" data-act="skface" data-v="user">🤳 Camera trước</button><button class="chip'+(st.skface=='environment'?' on':'')+'" data-act="skface" data-v="environment">📷 Camera sau</button></div><p class="muted small">Đứng cách camera khoảng 2 m, thấy rõ từ đầu đến hông. Lần đầu cần có mạng để tải bộ nhận dạng và cho phép dùng camera. Hình ảnh chỉ xử lí trên máy, không gửi đi đâu.</p>':'')+'</section>':'')
 +(st.game=='fruit'?'<section class="panel"><h3>Cách điều khiển</h3><div class="modes two">'
  +'<button class="mode'+(st.frcam?' on':'')+'" data-act="frcam" data-v="1"><b>📷 Vận động qua camera</b><small>Bước sang trái, sang phải trước camera để con vật chạy theo, đứng dưới quả mang đáp án đúng khi quả rơi xuống (20 giây mỗi câu).</small></button>'
  +'<button class="mode'+(st.frcam?'':' on')+'" data-act="frcam" data-v="0"><b>👆 Chạm màn hình / bàn phím</b><small>Chạm hoặc kéo trên sân, hoặc dùng phím ← → để di chuyển con vật.</small></button></div>'
  +'<h3>'+(st.mode=='vs'?'Con vật của phe 1 (bên trái)':'Chọn con vật')+'</h3><div class="chips">'+(window.DTKFRUIT?DTKFRUIT.PETS:[]).map(function(p){return '<button class="chip'+(st.frpet==p[0]?' on':'')+'" data-act="frpet" data-v="'+p[0]+'">'+(window.DTKFRUIT?DTKFRUIT.petIcon(p[0]):'')+' '+p[1]+'</button>'}).join('')+'</div>'
  +(st.mode=='vs'?'<h3>Con vật của phe 2 (bên phải)</h3><div class="chips">'+(window.DTKFRUIT?DTKFRUIT.PETS:[]).map(function(p){return '<button class="chip'+(st.frpet2==p[0]?' on':'')+'" data-act="frpet2" data-v="'+p[0]+'">'+(window.DTKFRUIT?DTKFRUIT.petIcon(p[0]):'')+' '+p[1]+'</button>'}).join('')+'</div>':'')
  +(st.frcam?'<h3>Camera</h3><div class="chips"><button class="chip'+(st.skface=='user'?' on':'')+'" data-act="skface" data-v="user">🤳 Camera trước</button><button class="chip'+(st.skface=='environment'?' on':'')+'" data-act="skface" data-v="environment">📷 Camera sau</button></div><p class="muted small">'
   +(st.mode=='turn'?'2 đội theo lượt: một con vật, hai giỏ (Đội Xanh, Đội Đỏ). Mỗi câu một bạn ra trước camera, hai đội thay phiên nhau. Đội nào hứng đủ 10 quả trước là thắng. ':'')
   +(st.mode=='vs'?'Đối kháng: máy có 2 camera thì mỗi phe dùng một camera (có thể đặt ở hai góc lớp, chọn lại camera ngay trong trận). Máy chỉ có 1 camera thì khung hình chia đôi: phe 1 đứng bên trái, phe 2 đứng bên phải. ':'')
   +'Đứng cách camera khoảng 2 m, chừa khoảng trống hai bên để bước qua lại. Lần đầu cần có mạng để tải bộ nhận dạng và cho phép dùng camera. Hình ảnh chỉ xử lí trên máy, không gửi đi đâu.</p>':'')+'</section>':'')
 +(st.game=='space'?'<section class="panel"><h3>Cách điều khiển</h3><div class="modes two">'
  +'<button class="mode'+(st.spcam?' on':'')+'" data-act="spcam" data-v="1"><b>📷 Vận động qua camera</b><small>Bước sang trái, sang phải trước camera để lái tàu vũ trụ. Dừng dưới thiên thạch mang đáp án đúng đủ 5 giây để bắn laser (15 giây mỗi câu).</small></button>'
  +'<button class="mode'+(st.spcam?'':' on')+'" data-act="spcam" data-v="0"><b>👆 Chạm màn hình / bàn phím</b><small>Chạm hoặc kéo trên sân, hoặc dùng phím ← → để lái tàu.</small></button></div>'
  +(st.spcam?'<h3>Camera</h3><div class="chips"><button class="chip'+(st.skface=='user'?' on':'')+'" data-act="skface" data-v="user">🤳 Camera trước</button><button class="chip'+(st.skface=='environment'?' on':'')+'" data-act="skface" data-v="environment">📷 Camera sau</button></div><p class="muted small">Đứng cách camera khoảng 2 m, chừa khoảng trống hai bên để bước qua lại. Khi một câu chỉ còn dưới 5 giây, hết giờ tàu dừng ở đâu sẽ bắn vào thiên thạch ở đó. '+(st.mode=='vs'?'Đối kháng: mỗi phe nửa màn hình, câu hỏi hai bên khác nhau; máy có 2 camera thì mỗi phe dùng một camera, chỉ có 1 camera thì phe 1 đứng bên trái, phe 2 đứng bên phải khung hình. ':'')+(st.mode=='turn'?'2 đội theo lượt: mỗi câu một bạn ra lái tàu, hai đội thay phiên (mỗi đội tối đa 10 câu), mỗi đội một Trái Đất 3 lớp khiên. ':'')+'Lần đầu cần có mạng để tải bộ nhận dạng và cho phép dùng camera. Hình ảnh chỉ xử lí trên máy, không gửi đi đâu.</p>':'')+'</section>':'')
 +(st.game=='rescue'?'<section class="panel"><h3>Cách trả lời</h3><div class="modes two">'
  +'<button class="mode'+(st.rscam?' on':'')+'" data-act="rscam" data-v="1"><b>📷 Vận động qua camera</b><small>Giữ động tác khoảng 1 giây để chốt: A quay người sang trái · B quay người sang phải · C đưa hai tay lên cao và vỗ tay · D cúi người về phía trước. Câu đúng/sai: A là Đúng, B là Sai.</small></button>'
  +'<button class="mode'+(st.rscam?'':' on')+'" data-act="rscam" data-v="0"><b>👆 Chạm màn hình</b><small>Dùng khi máy không có camera.</small></button></div>'
  +(st.mode=='turn'?'<p class="muted small">2 đội theo lượt: mỗi đội một phòng – <b>🐶 cún con</b> của Đội Xanh, <b>🐱 mèo con</b> của Đội Đỏ. Hai đội thay nhau trả lời, mỗi lượt một bạn ra trước camera. Đội nào mở đủ 10 van trước là thắng; phòng nào ngập hoặc sai quá 3 câu thì đội đó thua.</p>'
   :'<h3>Thú cưng cần giải cứu</h3><div class="chips"><button class="chip'+(st.rspet!='cat'?' on':'')+'" data-act="rspet" data-v="dog">🐶 Cún con</button><button class="chip'+(st.rspet=='cat'?' on':'')+'" data-act="rspet" data-v="cat">🐱 Mèo con</button></div>')
  +(st.rscam?'<h3>Camera</h3><div class="chips"><button class="chip'+(st.skface=='user'?' on':'')+'" data-act="skface" data-v="user">🤳 Camera trước</button><button class="chip'+(st.skface=='environment'?' on':'')+'" data-act="skface" data-v="environment">📷 Camera sau</button></div><p class="muted small">Đứng cách camera khoảng 2 m, thấy rõ từ đầu đến hông. Lần đầu cần có mạng để tải bộ nhận dạng và cho phép dùng camera. Hình ảnh chỉ xử lí trên máy, không gửi đi đâu.</p>':'')+'</section>':'')
 +(g.team?'':'<section class="panel"><h3>③ Chế độ</h3><div class="modes">'+Object.keys(MODES).map(function(id){var m=MODES[id],dis=g.modes?g.modes.indexOf(id)<0:(id=='turn'||g.solo&&id!='solo');return '<button class="mode'+(id==st.mode?' on':'')+'" data-act="mode" data-v="'+id+'"'+(dis?' disabled':'')+'><b>'+m.ico+' '+m.name+'</b><small>'+m.d+'</small></button>'}).join('')+'</div>'
 +(M.min?'<h3>④ Chọn từ '+M.min+' đến '+k+' thí sinh</h3><p class="muted small">Bạn chọn thứ 1, 3, 5… vào <b style="color:#7FB8FF">Đội Xanh</b>, bạn thứ 2, 4, 6… vào <b style="color:#FF9F9F">Đội Đỏ</b>. Các bạn lần lượt thay nhau ra trước camera.</p>':'<h3>④ Chọn '+need+' thí sinh</h3>')
 +'<div class="chips">'+r.map(function(p,i){var n=st.sel.indexOf(i);return '<button class="chip pick'+(n>=0?' on':'')+'" data-act="pick" data-v="'+i+'">'+(n>=0&&k>1?'<i class="ord"'+(M.min?' style="background:'+(n%2?'#E74C3C':'#3B82F6')+'"':'')+'>'+(n+1)+'</i>':'')+AVH(p.e)+' '+esc(p.n)+'</button>'}).join('')+'</div>'
 +(M.min&&st.sel.length?(function(){var T=teamsOf(st.sel.map(function(i){return r[i]}));return '<p class="small"><b style="color:#7FB8FF">🔵 Đội Xanh:</b> '+(T[0].map(function(p){return esc(p.n)}).join(', ')||'—')+'<br><b style="color:#FF9F9F">🔴 Đội Đỏ:</b> '+(T[1].map(function(p){return esc(p.n)}).join(', ')||'—')+'</p>'})():'')
 +(r.length<need?'<p class="warn">Chế độ này cần '+need+' thí sinh. Hãy ghi danh thêm '+(need-r.length)+' bạn.</p><button class="btn ghost sm" data-act="home">Ghi danh thêm</button>':'')+'</section>')
 +'<div class="cta sticky"><button class="btn big" data-act="start"'+(ok?'':' disabled')+'>'+g.ico+' Bắt đầu '+g.name+'</button></div>';
 /* Tải sẵn bộ nhận dạng động tác ngay ở màn hình chuẩn bị, để vào trận là dùng được luôn */
 if(((g.team&&st.skcam)||(st.game=='mil'&&st.milcam)||(st.game=='rescue'&&st.rscam)||(st.game=='fruit'&&st.frcam)||(st.game=='space'&&st.spcam)||(st.game=='squid'&&st.sqcam))&&window.DTKSACK&&DTKSACK.preload)DTKSACK.preload();
}

/* ================= CHƠI: TRÌNH BÀY CÂU HỎI ================= */
var NOSHUF=/(các|những) (đáp án|ý|phương án) trên|cả [A-D] (và|,)|^[A-D] ?(và|,) ?[A-D]\b|^(A|B|C|D)\.?$/i;
function prep(q){
 markSeen(q);
 var x={};for(var k in q)x[k]=q[k];
 if(q.t=='mc'&&!q.o.some(function(o){return NOSHUF.test(o)})){var p=shuf([0,1,2,3]);x.o=p.map(function(i){return q.o[i]});x.a=p.indexOf(q.a)}
 return x;
}
/* ===== Không lặp lại câu hỏi giữa các ván / các trò =====
   Mỗi lớp (môn) nhớ trên máy những câu đã ra gần đây. Khi chọn câu cho ván mới, câu chưa gặp được ưu tiên;
   chỉ khi hết câu mới mới dùng lại câu cũ (câu gặp lâu nhất trước). Danh sách chỉ giữ khoảng 70% kho để vòng lặp xoay vòng. */
var SEEN={g:null,list:[],set:{}},seenT=0;
function qKey(q){return q.b+':'+String(q.q).slice(0,60)+(q.s?'|'+q.s:'')}
function seenLoad(){if(SEEN.g===st.g)return;SEEN.g=st.g;SEEN.list=load('dtk_seen_'+st.g,[])||[];SEEN.set={};SEEN.list.forEach(function(k,i){SEEN.set[k]=i+1})}
function markSeen(q){
 seenLoad();var k=qKey(q);if(SEEN.set[k]){var i=SEEN.list.indexOf(k);if(i>=0)SEEN.list.splice(i,1)}
 SEEN.list.push(k);var cap=Math.max(30,Math.floor(bank().length*0.7));if(SEEN.list.length>cap)SEEN.list=SEEN.list.slice(-cap);
 SEEN.set={};SEEN.list.forEach(function(x,i){SEEN.set[x]=i+1});
 clearTimeout(seenT);seenT=setTimeout(function(){save('dtk_seen_'+SEEN.g,SEEN.list)},400);
}
/* Xếp câu: câu chưa gặp (trộn ngẫu nhiên) trước, câu đã gặp (lâu nhất trước) sau */
function fresh(pool){
 seenLoad();var a=[],b=[];pool.forEach(function(q){(SEEN.set[qKey(q)]?b:a).push(q)});
 b.sort(function(x,y){return SEEN.set[qKey(x)]-SEEN.set[qKey(y)]});
 return shuf(a).concat(b);
}
function pickQs(pool,n){return fresh(pool).slice(0,n).sort(function(a,b){return a.l-b.l}).map(prep)}
var RC=2*Math.PI*20;
function ring(){return '<div class="ring" aria-hidden="true"><svg viewBox="0 0 44 44"><circle cx="22" cy="22" r="20" class="rt"/><circle cx="22" cy="22" r="20" class="rv" id="rv" stroke-dasharray="'+RC.toFixed(2)+'" stroke-dashoffset="0"/></svg><b id="rs"></b></div>'}
function setRing(left,total){
 var fb=document.getElementById('fbar');if(fb){fb.style.transform='scaleX('+(left/total).toFixed(3)+')';fb.classList.toggle('hot',left<=3)}
 var ft=document.getElementById('fltime');if(ft){ft.textContent='00:'+('0'+Math.ceil(left)).slice(-2);ft.classList.toggle('hot',left<=3)}
 var v=$('#rv'),s=$('#rs');if(!v)return;
 v.setAttribute('stroke-dashoffset',(RC*(1-left/total)).toFixed(2));
 s.textContent=Math.ceil(left);
 var w=v.parentNode.parentNode;w.classList.toggle('hot',left<=5);
}
function optsHTML(q,act){
 if(q.t=='mc')return q.o.map(function(o,i){return '<button class="opt" data-act="'+act+'" data-v="'+i+'"><b>'+'ABCD'[i]+'</b><span>'+esc(o)+'</span></button>'}).join('');
 if(q.t=='tf')return '<button class="opt tf t" data-act="'+act+'" data-v="1"><b>Đ</b><span>Đúng</span></button><button class="opt tf f" data-act="'+act+'" data-v="0"><b>S</b><span>Sai</span></button>';
 return '<div class="numin"><input id="num" inputmode="decimal" autocomplete="off" placeholder="Nhập một con số" aria-label="Đáp án"><button class="btn" data-act="'+act+'" data-v="num">Chốt</button></div>';
}
function judge(q,v){
 if(v===null)return false;
 if(q.t=='mc')return +v==q.a;
 if(q.t=='tf')return (+v==1)==q.a;
 var x=numVal(v);return isFinite(x)&&Math.abs(x-q.a)<1e-6*Math.max(1,Math.abs(q.a));
}
function markOpts(q,v,sel){
 $$(sel||'.opt').forEach(function(b){
  var i=+b.getAttribute('data-v'),right=q.t=='mc'?i==q.a:(i==1)==q.a;
  if(right)b.classList.add('ok');else if(v!==null&&String(b.getAttribute('data-v'))==String(v))b.classList.add('bad');else b.classList.add('dim');
  b.disabled=true;
 });
 var n=$('#num');if(n){n.disabled=true;n.classList.add(judge(q,v)?'ok':'bad')}
}
/* Điện thoại nằm ngang: nếu nội dung dài làm tràn màn hình thì thu nhỏ chữ từng bậc */
function fitPlay(){
 var b=document.body;b.classList.remove('tight','tighter');
 if(!(window.matchMedia&&matchMedia('(max-height:540px) and (orientation:landscape)').matches))return;
 var over=function(){return document.documentElement.scrollHeight>window.innerHeight+1};
 if(over()){b.classList.add('tight');if(over())b.classList.add('tighter')}
}
window.addEventListener('resize',function(){if(document.body.classList.contains('playing'))fitPlay()});
/* Nút loa đọc câu hỏi tiếng Anh (speak.js) */
function sayB(q,k){return window.DTKSAY?DTKSAY.btn(q,k):''}
function sayAuto(q,k){if(window.DTKSAY)DTKSAY.auto(q,k)}
function qClass(q){var L=q.q.length+(q.o?q.o.join('').length/2:0);return L>190?' xl':L>120?' lg':''}

/* ================= TRÒ CHƠI KIỂU TRUYỀN HÌNH (mil, flash, num) ================= */
function start(){
 var g=GAMES[st.game];
 if(g.team)return window.DTKSACK?DTKSACK.start():null;
 if(st.game=='squid')return sqStart();
 if(st.game=='rescue')return window.DTKRESCUE?DTKRESCUE.start():null;
 if(st.game=='fruit')return window.DTKFRUIT?DTKFRUIT.start():null;
 if(st.game=='space')return window.DTKSPACE?DTKSPACE.start():null;
 var r=roster(),si=scopeInfo(),P=gamePool(),pick=g.pick,n=g.n,time=g.time;
 var typed=P.filter(function(q){return pick.indexOf(q.t)>=0});
 if(si){if(typed.length<5){pick=['mc','tf','num'];typed=P}n=Math.min(10,typed.length);time=30}
 else if(typed.length<n)n=typed.length;
 if(!n)return alert('Phạm vi này chưa có câu hỏi phù hợp. Hãy chọn phạm vi khác.');
 var qs=pickQs(typed,n),used={};qs.forEach(function(q){used[q.q]=1});
 S={id:st.game,g:{ico:g.ico,name:g.name,time:time},qs:qs,spare:shuf(typed.filter(function(q){return !used[q.q]})),i:0,
  P:st.sel.map(function(i){return r[i]}),sc:st.sel.map(function(){return 0}),ok:st.sel.map(function(){return 0}),stk:st.sel.map(function(){return 0}),best:st.sel.map(function(){return 0}),
  xp:st.sel.map(function(){return 0}),st:0,fifty:true,swap:true,lock:false,mode:st.mode,cam:st.game=='mil'&&st.milcam,camWait:st.game=='mil'&&st.milcam};
 ask();
}
function who(){return S.rv?0:S.mode=='vs'?S.i%2:S.mode=='relay'?S.i%3:0}
function ask(){
 var q=S.qs[S.i],g=S.g,w=who(),p=S.P[w],team=S.mode=='relay',mil=S.id=='mil'&&!S.rv;
 var keepCam=S.cam?document.getElementById('gcbox'):null;
 setScreen('play');S.lock=false;S.sus=false;S.t0=Date.now();S.armed=false;S.calm=0;S.hv=null;document.body.setAttribute('data-game',S.rv?'rv':S.id);
 var score=S.rv?'<span class="sc">✔ '+S.sc[0]+'</span>':team?'<span class="sc">Đội '+S.sc.reduce(function(a,b){return a+b},0)+'</span>':S.P.map(function(x,i){return '<span class="sc'+(i==w&&S.P.length>1?' cur':'')+'">'+AVH(x.e)+' '+S.sc[i]+'</span>'}).join('');
 var ladder=mil?'<ol class="ladder" aria-label="Thang tiền thưởng">'+S.qs.map(function(x,i){return '<li class="'+(i==S.i?'cur':i<S.i?'done':'')+(i==4||i==9?' safe':'')+'"><span>'+(i+1)+'</span><em>'+(i<S.i?'◆ ':'')+'</em>'+LADDER[i].toLocaleString('vi-VN')+'</li>'}).join('')+'</ol>':'';
 var fl=S.id=='flash'&&!S.rv;
 app.innerHTML='<div class="hud"><button class="btn ghost sm" data-act="quit" aria-label="Thoát ván chơi">✕</button><span class="gname">'+g.ico+' '+g.name+'</span><span class="qn">Câu '+(S.i+1)+'/'+S.qs.length+'</span>'+(S.rv?'':'<span class="turn">'+AVH(p.e)+' '+esc(p.n)+(team?' cầm gậy':'')+'</span>')+'<span class="scores">'+score+'</span></div>'
 +(fl?flashArena(q,w):'<div class="arena g-'+(S.rv?'rv':S.id)+(mil?' has-ladder':'')+'">'+ladder
 +(mil?'<div class="tools life">'+(S.fifty&&q.t=='mc'?'<button class="lf" data-act="fifty" aria-label="Trợ giúp 50:50">50:50</button>':'<span class="lf used">50:50</span>')+(S.swap&&S.spare.length?'<button class="lf" data-act="swap" aria-label="Đổi câu hỏi">⇄</button>':'<span class="lf used">⇄</span>')+'</div>'+(S.cam?'<div class="mil-stage cam"><div id="gcslot"></div></div>':'<div class="mil-stage" aria-hidden="true"><i></i></div>'):'')
 +'<div class="qcard'+qClass(q)+'"><div class="qmeta"><span class="pill">'+esc(q.c)+'</span>'+sayB(q)+stars(q.l)+(q.b?'<span class="muted">'+esc(bname(gcfg(),q.b))+'</span>':'')+(mil?'<span class="prize">💰 '+LADDER[S.i].toLocaleString('vi-VN')+'</span>':'')+(fl?'<span class="fx-sc">⚡ '+S.sc[w]+'</span>':'')+'</div>'+(S.rv?'':ring())+'<p class="qtext">'+esc(q.q)+'</p>'+(fl?'<div class="fbar" aria-hidden="true"><i id="fbar"></i></div>':'')+'</div>'
 +'<div class="answers'+(q.t=='tf'?' two':'')+'">'+optsHTML(q,'ans')+'</div>'
 +(mil?'':'<div class="tools"></div>')
 +'<div id="fb" class="fb" role="status" aria-live="polite"></div></div>');
 var inp=$('#num');if(inp&&!('ontouchstart' in window))inp.focus();
 if(mil&&S.cam)milCamMount(keepCam,q);
 sayAuto(q);
 S.lastSec=0;fitPlay();clearInterval(tm);if(!S.rv){setRing(g.time,g.time);tm=setInterval(tick,100)}
 if(mil){var me=S;snd('milQ');setTimeout(function(){if(S===me&&!S.lock&&document.body.getAttribute('data-scr')=='play')snd('bedOn')},1000)}
}
/* Nhanh như chớp: bố cục kiểu trường quay – cột tiến độ dạng ống tia chớp bên trái, thí sinh ở giữa, thanh câu hỏi neon và đồng hồ số ở dưới */
function flashArena(q,w){
 var tube='<ol class="fl-tube" aria-label="Tiến độ câu hỏi">'+S.qs.map(function(x,i){return '<li class="'+(i==S.i?'cur':i<S.i?'done':'')+'">'+(i+1)+'</li>'}).join('')+'</ol>';
 var ppl='<div class="fl-who">'+S.P.map(function(p,i){var cur=S.mode=='relay'||i==w;return '<div class="fl-p'+(cur?' cur':'')+'"><i>'+AVH(p.e)+'</i><b>'+esc(p.n)+'</b><span'+(i==w?' class="fx-sc"':'')+'>⚡ '+S.sc[i]+'</span></div>'}).join('')+'</div>';
 return '<div class="arena g-flash fl2">'+tube
  +'<div class="fl-stage">'+ppl+'<div class="fl-meta"><span class="pill">'+esc(q.c)+'</span>'+sayB(q)+stars(q.l)+(q.b?'<span>'+esc(bname(gcfg(),q.b))+'</span>':'')+'</div></div>'
  +'<div class="qcard fl-bar'+qClass(q)+'"><p class="qtext">'+esc(q.q)+'</p><div class="fl-time" id="fltime" aria-label="Thời gian còn lại">00:'+('0'+S.g.time).slice(-2)+'</div><div class="fbar" aria-hidden="true"><i id="fbar"></i></div></div>'
  +'<div class="answers'+(q.t=='tf'?' two':'')+'">'+optsHTML(q,'ans')+'</div>'
  +'<div id="fb" class="fb" role="status" aria-live="polite"></div></div>';
}
/* ===== Ai là triệu phú – trả lời bằng động tác qua camera =====
   Khung camera nằm giữa sân khấu và được giữ nguyên giữa các câu (không phải mở lại camera).
   Giữ một động tác 1 giây thì chốt đáp án; sau mỗi câu phải hạ tay xuống rồi mới trả lời câu mới. */
/* Động tác giống trò Giải cứu: A quay trái · B quay phải · C vỗ tay trên đầu · D cúi người; đúng/sai: A = Đúng, B = Sai */
var MGES=[['↩️','Quay trái'],['↪️','Quay phải'],['👏','Vỗ tay'],['🙇','Cúi người']],MGNAME={L:'↩️ Quay trái',R:'Quay phải ↪️',C:'👏 Vỗ tay',D:'🙇 Cúi người'};
/* Chữ hiện trên khung camera khi chưa có động tác: đang ghi nhớ tư thế chuẩn thì nhắc đứng thẳng */
function gcIdle(bd){return bd&&!bd.B?'🧍 Đứng thẳng, nhìn màn hình… '+Math.round(bd.prog()*100)+'%':''}
function milCamMount(keep,q){
 var slot=$('#gcslot');if(!slot)return;
 if(keep){slot.parentNode.replaceChild(keep,slot);[].forEach.call(keep.querySelectorAll('video'),function(v){var p=v.play();if(p&&p.catch)p.catch(function(){})})}
 else{var d=document.createElement('div');d.id='gcbox';d.className='gc-box';d.innerHTML='<video class="gc-bg" playsinline muted autoplay></video><video class="gc-sharp" playsinline muted autoplay aria-hidden="true"></video><span class="gc-zone" aria-hidden="true"></span><canvas></canvas><span class="gc-ges" id="gcges"></span><div class="gc-msg"></div><button class="gc-flip" data-act="mcflip" aria-label="Đổi camera trước hoặc sau">🔄</button>';slot.parentNode.replaceChild(d,slot);milCamStart()}
 /* Ghi động tác tương ứng lên từng ô đáp án */
 $$('.opt').forEach(function(b){var v=+b.getAttribute('data-v'),gi=q.t=='tf'?(v==1?0:1):v;if(MGES[gi])b.insertAdjacentHTML('beforeend','<i class="mges">'+MGES[gi][0]+' '+MGES[gi][1]+'</i>')});
 if(S.camWait&&!$('#mcwait'))document.querySelector('.arena').insertAdjacentHTML('beforeend','<div class="sk-waitcam" id="mcwait"><div><b>📷 Đang chuẩn bị camera…</b><small>Đứng thẳng, nhìn vào màn hình, thấy rõ đầu, vai và hai tay để máy ghi nhớ tư thế. Đồng hồ chỉ chạy khi máy đã nhận ra em.</small><button class="btn ghost sm" data-act="mcgo">Bắt đầu luôn (chạm để trả lời)</button></div></div>');
}
function milCamStart(){
 var box=$('#gcbox');if(!box||!window.DTKSACK||!DTKSACK.gcam)return milCamReady();
 var me=S;setTimeout(function(){if(S===me)milCamReady()},25000);
 /* Mỗi lần mở camera thì ghi nhớ lại tư thế chuẩn của thí sinh */
 var bd=S.bd=DTKSACK.gcam.body&&DTKSACK.gcam.body();
 DTKSACK.gcam.start(box,milGesture,bd?bd.classify:null).then(function(ok){if(S===me&&(!ok||!bd))milCamReady()});
}
function milCamReady(){if(!S||!S.camWait)return;S.camWait=false;var w=$('#mcwait');if(w)w.remove();if(!S.lock)S.t0=Date.now()}
function milGesture(g,now){
 var gs=$('#gcges');if(gs)gs.textContent=g?MGNAME[g]:gcIdle(S&&S.bd);
 if(S&&S.camWait&&S.bd&&S.bd.B)milCamReady();
 if(!S||S.id!='mil'||!S.cam||S.lock||S.camWait){if(S)S.hv=null;return}
 if(!S.armed){if(!g){if(!S.calm)S.calm=now;if(now-S.calm>300)S.armed=true}else S.calm=0;return}
 var q=S.qs[S.i],v=window.DTKSACK?DTKSACK.gcam.gestVal(q,g):null,b=v!=null?$('.opt[data-v="'+v+'"]'):null;
 if(b&&b.disabled){v=null;b=null}
 $$('.opt').forEach(function(x){var on=x===b;x.classList.toggle('hold',on);if(!on)x.style.removeProperty('--hp')});
 if(v==null){S.hv=null;return}
 if(S.hv!==v){S.hv=v;S.hs=now}
 var pr=Math.min(1,(now-S.hs)/1000);b.style.setProperty('--hp',Math.round(pr*100)+'%');
 if(pr>=1){S.hv=null;b.classList.remove('hold');answer(v)}
}function tick(){
  if(!S||S.lock){clearInterval(tm);return}
 if(S.camWait){S.t0=Date.now();setRing(S.g.time,S.g.time);return}
 var left=Math.max(0,S.g.time-(Date.now()-S.t0)/1000);
 setRing(left,S.g.time);
 if(S.id=='flash'&&!S.rv){var sec=Math.ceil(left);if(sec!=S.lastSec){S.lastSec=sec;if(left>5)snd('tick')}}
 if(left>0&&left<=5)snd('beat',left);
 if(left<=0)answer(null);
}
function fifty(){var q=S.qs[S.i];S.fifty=false;shuf([0,1,2,3].filter(function(i){return i!=q.a})).slice(0,2).forEach(function(i){var o=$('.opt[data-v="'+i+'"]');if(o){o.classList.add('gone');o.disabled=true}});var b=$('[data-act="fifty"]');if(b)b.outerHTML='<span class="lf used">50:50</span>'}
function swapQ(){if(!S.spare.length)return;var q=S.qs[S.i],c=null;for(var i=0;i<S.spare.length;i++)if(S.spare[i].t==q.t){c=S.spare.splice(i,1)[0];break}if(!c)c=S.spare.shift();S.qs[S.i]=prep(c);S.swap=false;ask()}
function answer(v){
 if(!S||S.lock)return;
 if(window.SND&&SND.bedOff)SND.bedOff();
 /* Ai là triệu phú: đáp án được chọn sáng màu cam chờ một nhịp rồi mới công bố đúng/sai */
 if(S.id=='mil'&&!S.rv&&v!==null&&!S.sus){
  S.lock=true;clearInterval(tm);var me=S,sel=$('.opt[data-v="'+v+'"]');if(sel)sel.classList.add('lockin');
  $$('.opt').forEach(function(b){b.disabled=true});$$('.tools.life .lf').forEach(function(b){b.disabled=true});
  snd('milLock');setTimeout(function(){if(S!==me)return;S.lock=false;S.sus=true;if(sel)sel.classList.remove('lockin');answer(v)},1500);return;
 }
 S.lock=true;clearInterval(tm);
 var q=S.qs[S.i],left=Math.max(0,S.g.time-(Date.now()-S.t0)/1000),w=who(),ok=judge(q,v),pts=0;
 if(ok){
  pts=S.id=='mil'?LADDER[S.i]:S.id=='flash'?100+Math.round(left/S.g.time*100):100*Math.min(q.l,3)+Math.round(left/S.g.time*50);
  S.st++;if(S.mode=='relay')pts+=Math.min(S.st-1,5)*20;
  S.sc[w]+=S.rv?1:pts;S.ok[w]++;S.stk[w]++;if(S.stk[w]>S.best[w])S.best[w]=S.stk[w];
  S.xp[w]+=S.rv?5+q.l:10+2*q.l+Math.min(S.stk[w],5)*2;
  snd(S.rv?'ok':S.id=='mil'?'milOk':S.id=='flash'?'zap':'ok');
 }else{S.st=0;S.stk[w]=0;if(S.rv)S.wrong.push(S.qs[S.i]);snd(S.id=='mil'&&!S.rv?'milBad':'bad')}
 markOpts(q,v);
 var t=$('.tools');if(t&&!t.classList.contains('life'))t.innerHTML='';
 if(ok&&S.id=='flash'&&!S.rv){var sc=$('.fx-sc');if(sc)sc.textContent='⚡ '+S.sc[w];var qc=$('.qcard');if(qc)qc.insertAdjacentHTML('beforeend','<span class="fx-pop">+'+pts+'</span>')}
 var fb=$('#fb');fb.className='fb '+(ok?'good':'bad');
 fb.innerHTML=ok?'✅ Chính xác!'+(S.rv?'':' <b>+'+pts+'</b>')+(q.e&&S.rv?'<small>'+esc(q.e)+'</small>':'')
  :(v===null?'⏰ Hết giờ! ':'❌ Chưa đúng. ')+'Đáp án: <b>'+esc(ansText(q))+'</b>'+(q.e?'<small>'+esc(q.e)+'</small>':'');
 if(!ok)document.querySelector('.qcard').classList.add('shake');
 fitPlay();
 if(S.rv){fb.insertAdjacentHTML('beforeend','<button class="btn" data-act="next">'+(S.i+1<S.qs.length?'Câu tiếp ▶':'Xem kết quả')+'</button>');var nb=$('[data-act="next"]');if(nb)nb.focus();return}
 var d=ok?1500:(q.e?3200:2300),me=S;
 setTimeout(function(){
  if(S!==me)return;
  if(!ok&&S.id=='mil'&&S.mode=='solo')return end();
  next();
 },d);
}
function next(){if(!S)return;S.i++;S.i<S.qs.length?ask():end()}
function confetti(n){var h='';for(var i=0;i<(n||28);i++)h+='<span class="cf" style="left:'+Math.floor(Math.random()*98)+'%;animation-duration:'+(3+Math.random()*3).toFixed(1)+'s;animation-delay:'+(Math.random()*2).toFixed(1)+'s">'+['🎉','🎊','⭐','✨','🏅'][i%5]+'</span>';return '<div class="cfx" aria-hidden="true">'+h+'</div>'}
function end(){
 clearInterval(tm);if(S.rv)return rend();
 setScreen('result');
 var id=S.id,mode=S.mode,sum=S.sc.reduce(function(a,b){return a+b},0),n=S.qs.length;
 var tot=S.sc.map(function(s,i){return{p:S.P[i],s:s,i:i}}).sort(function(a,b){return b.s-a.s});
 var entries=mode=='relay'?[{n:'Đội '+S.P.map(function(p){return p.n}).join(', '),e:'🏃',g:id,s:sum}]:tot.map(function(x){return{n:x.p.n,e:x.p.e,g:id,s:x.s}});
 var lb=load(K('lb'),[]).concat(entries);lb.sort(function(a,b){return b.s-a.s});save(K('lb'),lb.slice(0,60));
 var res=S.P.map(function(p,i){
  var b=[],ok=S.ok[i];
  if(id=='mil'&&mode=='solo'&&ok==n&&n>=5)b.push('mil');
  if(id=='flash'&&mode=='solo'&&ok>=8)b.push('flash');
  if(id=='num'&&mode=='solo'&&ok==n&&n>=5)b.push('num');
  return {p:p,r:award(p.n,{xp:S.xp[i],streak:S.best[i],badges:b})};
 });
 var won=mode=='solo'?S.ok[0]>=Math.ceil(n*0.7):true;
 var tie=mode=='vs'&&tot[0].s==tot[1].s;
 var title=mode=='relay'?'Cả đội về đích với '+sum+' điểm!':mode=='vs'?(tie?'Hai bạn hoà nhau!':esc(tot[0].p.n)+' chiến thắng!'):id=='mil'?(S.ok[0]==n?'Triệu phú tri thức!':'Bạn dừng ở câu '+(S.i+1)):'Bạn đạt '+sum+' điểm!';
 /* Thắng: avatar có hào quang; thua: cúi mặt buồn */
 var podium='<div class="res-avs">'+(mode=='relay'?S.P.map(function(p){return AVH(p.e,'win','full')}).join(''):mode=='vs'?tot.map(function(x,k){return AVH(x.p.e,tie?'happy':k==0?'win':'sad','full')}).join(''):AVH(S.P[0].e,won?'win':'sad','full'))+'</div>';
 app.innerHTML=(won?confetti():'')+'<section class="hero center result">'+podium+'<h1 class="title sm">'+title+'</h1><p>'+S.g.ico+' '+S.g.name+' · '+esc(scopeName())+'</p></section>'
 +'<div class="board">'+tot.map(function(x,k){return '<div class="'+(k==0&&tot.length>1&&x.s>tot[1].s?'first':'')+'"><span>'+AVH(x.p.e)+' '+esc(x.p.n)+' <small>đúng '+S.ok[x.i]+'/'+(mode=='solo'?(id=='mil'?S.i+1:n):Math.floor((n-x.i+S.P.length-1)/S.P.length))+'</small></span><b>'+x.s.toLocaleString('vi-VN')+'</b></div>'}).join('')+'</div>'
 +'<div class="rewards">'+res.map(function(x){return rewardHTML(x.p.n,x.p.e,x.r)}).join('')+'</div>'
 +'<div class="cta"><button class="btn big" data-act="start">↻ Chơi lại</button><button class="btn ghost" data-act="menu">Đổi trò chơi</button></div><div id="lbx"></div>';
 if(won)snd('win');celebrate(res.map(function(x){return x.r}));
 showLB(id,$('#lbx'));
 S={id:null};
}
function quit(){if(confirm('Thoát ván chơi này?')){var rv=S&&S.rv;stopAll();clearInterval(qt);S=null;Q=null;rv?review():menu()}}

/* ================= ÔN TẬP & LUYỆN TẬP ================= */
function rvPool(){var s=scopeInfo(),P=s?bank().filter(s.f):bank();return P.filter(function(q){return st.rlv=='all'||(st.rlv=='basic'?q.l<3:q.l>=3)})}
function review(){
 stopAll();setScreen('review');header();
 var r=roster(),n=rvPool().length;
 app.innerHTML='<div class="bar-top"><button class="btn ghost sm" data-act="home">◀ Quay lại</button><h2>📚 Ôn tập & luyện tập</h2></div>'
 +'<section class="panel"><p class="muted">Không tính giờ. Mỗi câu hiện đáp án và lời giải thích; cuối lượt được ôn lại những câu làm sai.</p>'
 +'<h3>Phạm vi</h3>'+scopeSelect()
 +'<h3>Mức độ</h3><div class="chips">'+[['all','Tất cả'],['basic','Cơ bản'],['adv','Khó & nâng cao']].map(function(x){return '<button class="chip'+(st.rlv==x[0]?' on':'')+'" data-act="rlv" data-v="'+x[0]+'">'+x[1]+'</button>'}).join('')+'</div>'
 +'<h3>Số câu mỗi lượt</h3><div class="chips">'+[10,15,20,0].map(function(x){return '<button class="chip'+(st.rn==x?' on':'')+'" data-act="rn" data-v="'+x+'">'+(x||'Tất cả')+'</button>'}).join('')+'</div>'
 +(r.length?'<h3>Ai ôn tập? <small class="muted">(để nhận điểm kinh nghiệm)</small></h3><div class="chips"><button class="chip'+(st.rvp<0?' on':'')+'" data-act="rvp" data-v="-1">👤 Khách</button>'+r.map(function(p,i){return '<button class="chip'+(st.rvp==i?' on':'')+'" data-act="rvp" data-v="'+i+'">'+AVH(p.e)+' '+esc(p.n)+'</button>'}).join('')+'</div>':'')
 +'</section><div class="cta"><button class="btn big" data-act="rstart"'+(n?'':' disabled')+'>Bắt đầu ôn ('+(st.rn&&st.rn<n?st.rn:n)+' câu)</button></div>';
}
function rrun(qs){
 var r=roster(),p=st.rvp>=0&&r[st.rvp]?r[st.rvp]:{n:'Khách',e:'👤',guest:1};
 S={id:'rv',rv:true,g:{ico:'📚',name:'Ôn tập',time:0},qs:qs,i:0,P:[p],sc:[0],ok:[0],stk:[0],best:[0],xp:[0],st:0,mode:'solo',wrong:[],lock:false};
 ask();
}
function rend(){
 setScreen('result');
 var w=S.wrong,n=S.qs.length,ok=S.sc[0],p=S.P[0],res=null;
 if(!p.guest)res=award(p.n,{xp:S.xp[0],streak:S.best[0],review:true,badges:ok==n&&n>=10?['perfect']:[]});
 var pc=Math.round(ok*100/n);
 app.innerHTML=(pc>=80?confetti(20):'')+'<section class="hero center result"><div class="trophy">'+(pc==100?'💯':pc>=80?'🌟':pc>=50?'👍':'💪')+'</div><h1 class="title sm">Đúng '+ok+'/'+n+' câu ('+pc+'%)</h1><p>'+esc(scopeName())+'</p></section>'
 +(res?'<div class="rewards">'+rewardHTML(p.n,p.e,res)+'</div>':'<p class="muted center">Ghi danh và chọn tên trước khi ôn để được cộng điểm kinh nghiệm.</p>')
 +(w.length?'<h2>Các câu cần ôn lại</h2><div class="wrongs">'+w.map(function(q){return '<div><p>'+esc(q.q)+'</p><b>✔ '+esc(q.t=='mc'?q.o[q.a]:ansText(q))+'</b>'+(q.e?'<small>'+esc(q.e)+'</small>':'')+'</div>'}).join('')+'</div>':'<p class="center">Tuyệt vời, bạn không sai câu nào!</p>')
 +'<div class="cta">'+(w.length?'<button class="btn big" data-act="rwrong">Ôn lại '+w.length+' câu sai</button>':'')+'<button class="btn ghost" data-act="review">Chọn phạm vi khác</button></div>';
 if(res)celebrate([res]);if(pc>=80)snd('win');
}

/* ================= HỒ SƠ & BẢNG VÀNG ================= */
function profile(){
 stopAll();setScreen('prof');header();
 var r=roster(),all=profs();
 app.innerHTML='<div class="bar-top"><button class="btn ghost sm" data-act="home">◀ Quay lại</button><h2>🏅 Cấp độ & huy hiệu</h2></div>'
 +(r.length?r.map(function(x){var p=all[x.n]||{xp:0,n:0,b:{}},i=lvOf(p.xp),nx=LEVELS[i+1],pc=nx?Math.round((p.xp-LEVELS[i][0])*100/(nx[0]-LEVELS[i][0])):100;
  return '<section class="panel prof"><div class="ph"><span class="big-av">'+AVH(x.e)+'</span><div><b>'+esc(x.n)+'</b><small>'+LEVELS[i][2]+' Cấp '+(i+1)+' – '+LEVELS[i][1]+' · '+p.xp+' XP · '+p.n+' lượt chơi</small></div></div>'
  +'<div class="xpbar"><i style="width:'+pc+'%"></i></div><small class="muted">'+(nx?'Còn '+(nx[0]-p.xp)+' XP để lên '+nx[2]+' '+nx[1]:'Đã đạt cấp cao nhất!')+'</small>'
  +'<div class="bgs">'+BADGES.map(function(b){var has=p.b&&p.b[b[0]];return '<span class="bg'+(has?' has':'')+'" title="'+b[3]+'"><i>'+b[1]+'</i><b>'+b[2]+'</b><small>'+b[3]+'</small></span>'}).join('')+'</div></section>'}).join('')
 :'<section class="panel"><p>Chưa có thí sinh nào. Hãy ghi danh ở trang chủ để bắt đầu tích điểm kinh nghiệm.</p></section>')
 +'<section class="panel"><h3>Các cấp độ</h3><div class="lvls">'+LEVELS.map(function(l,i){return '<span>'+l[2]+' <b>'+(i+1)+'. '+l[1]+'</b> <small>'+l[0]+' XP</small></span>'}).join('')+'</div></section>';
}
function showLB(game,el){
 if(!el||!GAMES[game])return;var rows=load(K('lb'),[]).filter(function(x){return x.g==game}).slice(0,10);
 if(!rows.length){el.innerHTML='<p class="muted center">Chưa có điểm nào cho trò này.</p>';return}
 el.innerHTML='<h2>🏆 Bảng vàng – '+GAMES[game].name+'</h2><div class="board lb">'+rows.map(function(x,i){return '<div><span><i class="rk">'+(i<3?['🥇','🥈','🥉'][i]:i+1)+'</i> '+AVH(x.e)+' '+esc(x.n)+'</span><b>'+(+x.s).toLocaleString('vi-VN')+'</b></div>'}).join('')+'</div>';
}
var lbGame='mil';
function lbScreen(){
 stopAll();setScreen('lb');header();
 app.innerHTML='<div class="bar-top"><button class="btn ghost sm" data-act="home">◀ Quay lại</button><h2>🏆 Bảng vàng '+glab(st.g)+'</h2></div><div class="chips">'+['mil','flash','num'].map(function(id){return '<button class="chip'+(lbGame==id?' on':'')+'" data-act="lbg" data-v="'+id+'">'+GAMES[id].ico+' '+GAMES[id].name+'</button>'}).join('')+'</div><div id="lbx"></div><p class="muted small">Điểm chỉ lưu trên máy này.</p>';
 showLB(lbGame,$('#lbx'));
}

/* ================= VƯỢT CẦU SINH TỒN ================= */
var Q=null,qt=null;
/* Cầu kính dựng đứng: đi từ dưới (Xuất phát) lên trên (Đích). Mỗi tầng là một hàng gạch kính mang đáp án. */
function sqStart(){
 var r=roster(),turn=st.mode=='turn';
 if(turn?st.sel.length<2:st.sel.length!=1)return alert(turn?'Chế độ 2 đội theo lượt: hãy chọn từ 2 thí sinh trở lên.':'Trò này chơi một người: hãy chọn 1 thí sinh.');
 var P=gamePool().filter(function(q){return q.t=='mc'||q.t=='tf'});
 if(P.length<4)return alert('Phạm vi này chưa đủ câu trắc nghiệm cho trò chơi. Hãy chọn phạm vi rộng hơn.');
 /* 2 đội theo lượt: cầu dài 20 tầng, hai đội thay nhau nhảy, đội nào trả lời sai trước sẽ thua */
 var n=turn?Math.min(P.length,20):Math.min(P.length,8+Math.floor(Math.random()*3));
 var cam=!!st.sqcam&&!!(window.DTKSACK&&DTKSACK.gcam);
 Q={qs:pickQs(P,n),i:0,p:r[st.sel[0]],lock:false,stk:0,best:0,xp:0,cam:cam,camWait:cam};
 if(turn){Q.turn=true;Q.T=teamsOf(st.sel.map(function(i){return r[i]}));Q.ps={};Q.p=Q.T[0][0]}
 Q.opts=Q.qs.map(sqOpts);
 sqAsk();
}
/* Số viên gạch mỗi tầng: 2–4; đáp án dài thì ít gạch để chữ đọc được */
function sqOpts(q){
 if(q.t=='tf')return[{t:'Đúng',ok:q.a===true},{t:'Sai',ok:q.a===false}];
 var L=Math.max.apply(null,q.o.map(function(o){return o.length}));
 var k=L>45?2:L>26?2+Math.floor(Math.random()*2):2+Math.floor(Math.random()*3);
 var bad=shuf(q.o.filter(function(x,i){return i!=q.a})).slice(0,k-1).map(function(x){return{t:x,ok:false}});
 return shuf([{t:q.o[q.a],ok:true}].concat(bad));
}
function sqRow(k){
 var o=Q.opts[k-1],cur=k==Q.i+1,past=k<=Q.i;
 return '<div class="sq-row'+(cur?' cur':past?' past':' next')+'">'+o.map(function(x,j){
  var cls='stone'+(past?(x.ok?' done':' gone'):'')+(cur&&x.t.length>30?' lg':'')+(cur&&x.t.length>55?' xl':'');
  /* mỗi phiến đá rung lệch nhịp và có hình dạng hơi khác nhau */
  var d=((k*7+j*13)%10)/10,sh=(k*3+j*5)%4;
  /* Chơi bằng camera: phiến đá thứ 1–4 ứng với động tác A–D (câu đúng/sai: Đúng = quay trái, Sai = quay phải) */
  var ge=cur&&Q.cam&&MGES[j]?'<i class="sges" title="'+MGES[j][1]+'">'+MGES[j][0]+' '+MGES[j][1]+'</i>':'';
  return '<button class="'+cls+' st'+sh+'" style="--d:-'+d+'s" data-act="sq" data-v="'+j+'"'+(cur?' aria-label="Nhảy lên phiến đá: '+esc(x.t)+(ge?' (động tác: '+MGES[j][1]+')':'')+'"':' disabled tabindex="-1" aria-hidden="true"')+'>'+ge+'<span>'+(cur?esc(x.t):past&&x.ok?'✓':'?')+'</span></button>'}).join('')+'</div>';
}
/* Co chữ trong phiến đá cho vừa, không bị cắt */
function sqFitText(){
 $$('#sqt .sq-row.cur .stone').forEach(function(b){
  var s=b.querySelector('span');if(!s)return;s.style.fontSize='';
  var fs=parseFloat(getComputedStyle(s).fontSize),room=b.clientHeight-8,w=b.clientWidth-10;
  while(fs>9&&(s.offsetHeight>room||s.scrollWidth>w)){fs-=0.5;s.style.fontSize=fs+'px'}
 });
}
function sqScene(){
 var n=Q.qs.length,h='<div class="sq-view" id="sqv"><div class="sq-sky" aria-hidden="true"></div><div class="sq-cliff l" aria-hidden="true"></div><div class="sq-cliff r" aria-hidden="true"></div><div class="sq-pit" aria-hidden="true"></div><div class="sq-mist" aria-hidden="true"></div><div class="sq-track" id="sqt">';
 h+='<div class="sq-row plat-row"><div class="plat start">🚩 XUẤT PHÁT</div></div>';
 for(var k=1;k<=n;k++)h+=sqRow(k);
 h+='<div class="sq-row plat-row"><div class="plat fin">🏆 ĐÍCH</div></div>';
 return h+'<div class="sq-av" id="sqav" aria-hidden="true"><span>'+AVH(Q.p.e,'idle','full')+'</span><i></i></div></div></div>';
}
/* Kích thước tầng theo chiều cao khung, dịch cầu để tầng hiện tại nằm gần đáy khung */
function sqSize(){
 var v=$('#sqv'),t=$('#sqt');if(!v||!t)return 0;
 var H=Math.max(52,Math.min(150,Math.round(v.clientHeight/3.3)));
 t.style.setProperty('--H',H+'px');Q.H=H;return H;
}
function sqShift(r,anim){var t=$('#sqt');if(!t)return;t.style.transition=anim?'transform .65s cubic-bezier(.4,0,.2,1)':'none';t.style.transform='translateY('+Math.max(0,r-1)*Q.H+'px)'}
function sqRowEl(k){return $$('#sqt .sq-row')[k]}
function sqStand(){var row=sqRowEl(Q.i);if(!row)return null;return row.querySelector('.plat')||row.querySelector('.stone.done')}
function sqAvTo(el,anim){
 var a=$('#sqav');if(!a||!el)return;
 a.style.transition=anim?'left .5s cubic-bezier(.3,.7,.4,1),top .5s cubic-bezier(.3,.7,.4,1)':'none';
 a.style.left=(el.offsetLeft+el.offsetWidth/2)+'px';a.style.top=(el.offsetTop+el.offsetHeight*.55)+'px';
 if(anim){a.classList.remove('jump');void a.offsetWidth;a.classList.add('jump')}
}
function sqMood(m){var s=$('#sqav span');if(s&&Q)s.innerHTML=AVH(Q.p.e,m,'full')}
function sqAsk(){
 setScreen('play');document.body.setAttribute('data-game','squid');
 var q=Q.qs[Q.i];Q.o=Q.opts[Q.i];Q.lock=false;Q.t0=Date.now();Q.armed=false;Q.calm=0;Q.hv=null;
 /* 2 đội: tầng lẻ của Đội Xanh, tầng chẵn của Đội Đỏ; trong đội các bạn lần lượt thay nhau. Đổi người thì máy ghi nhớ lại tư thế */
 if(Q.turn){var tm=Q.team=Q.i%2,mem=Q.T[tm],np=mem[Math.floor(Q.i/2)%mem.length],changed=Q.i>0&&np!==Q.p;Q.p=np;Q.swapUntil=Date.now()+2500;
  if(Q.cam&&changed&&Q.bd&&Q.bd.B){Q.bd.reset();Q.camWait=true;var me0=Q;setTimeout(function(){if(Q===me0)sqCamReady()},15000)}}
 /* Loa đọc đúng chữ trên các phiến đá (2–4 phiến, thứ tự khác với đề gốc) */
 var qv=q.t=='mc'?Object.assign({},q,{o:Q.o.map(function(x){return x.t})}):q;
 var keep=Q.cam?document.getElementById('sqcam'):null;
 /* Sàn chơi tràn màn hình ở trên, câu hỏi nằm ở dưới */
 var tlab=Q.turn?(Q.team?'🔴 Đội Đỏ':'🔵 Đội Xanh'):'';
 app.innerHTML='<div class="hud"><button class="btn ghost sm" data-act="quit" aria-label="Thoát">✕</button><span class="gname">🌉 Vượt cầu sinh tồn'+(Q.turn?' · 2 đội':'')+'</span><span class="qn">Tầng '+(Q.i+1)+'/'+Q.qs.length+'</span><span class="turn"'+(Q.turn?' style="border-color:'+(Q.team?'#FF9F9F':'#7FB8FF')+'"':'')+'>'+(Q.turn?tlab+': ':'')+AVH(Q.p.e)+' '+esc(Q.p.n)+'</span></div>'
 +'<div class="sq-wrap">'+sqScene()+'<div class="sq-side"><div class="qcard'+qClass(q)+'"'+(Q.turn?' style="border-color:'+(Q.team?'#FF9F9F':'#7FB8FF')+'"':'')+'><div class="qmeta">'+(Q.turn?'<span class="pill" style="background:'+(Q.team?'#C0392B':'#2563EB')+'">Lượt '+tlab+'</span>':'')+'<span class="pill">'+esc(q.c)+'</span>'+sayB(qv)+stars(q.l)+'<span class="sq-hint">'+(Q.cam?'Giữ động tác 1 giây để nhảy lên phiến đá: ↩️ quay trái · ↪️ quay phải · 👏 vỗ tay · 🙇 cúi người':'Chạm phiến đá có đáp án đúng để nhảy lên')+'</span></div>'+ring()+'<p class="qtext">'+esc(q.q)+'</p></div>'
 +'<div id="fb" class="fb" role="status"></div></div></div>';
 document.documentElement.style.setProperty('--vh',window.innerHeight+'px');
 fitPlay();sqSize();sqFitText();sqShift(Q.i,false);sqAvTo(sqStand(),false);
 requestAnimationFrame(function(){requestAnimationFrame(function(){if(Q)sqShift(Q.i+1,true)})});
 if(Q.cam)sqCamMount(keep);
 /* 2 đội: báo đổi lượt; đồng hồ chờ 2,5 giây (và chờ máy nhận ra bạn mới nếu dùng camera) */
 if(Q.turn){var w=$('#sqwait'),msg='🔄 Lượt của '+tlab+': '+AVH(Q.p.e)+' <b>'+esc(Q.p.n)+'</b>';
  if(w){w.querySelector('b').innerHTML=msg;var sm=w.querySelector('small');if(sm)sm.textContent='Đứng thẳng, nhìn vào màn hình để máy nhận ra em. Đồng hồ chỉ chạy khi máy đã nhận ra em.'}
  else $('.sq-wrap').insertAdjacentHTML('beforeend','<div class="sk-waitcam" id="sqswap"><div><b>'+msg+'</b><small>Vào vị trí, chuẩn bị nhảy!</small></div></div>');
  var me1=Q;setTimeout(function(){var e=$('#sqswap');if(e)e.remove()},2500)}
 sayAuto(qv);
 clearInterval(qt);setRing(30,30);qt=setInterval(sqTick,100);
}
/* ----- Vượt cầu bằng động tác qua camera: khung camera nhỏ ở góc sân chơi, giữ nguyên giữa các tầng ----- */
function sqCamMount(keep){
 var v=$('#sqv');if(!v)return;
 if(keep){v.appendChild(keep);[].forEach.call(keep.querySelectorAll('video'),function(x){var p=x.play();if(p&&p.catch)p.catch(function(){})})}
 else{var d=document.createElement('div');d.id='sqcam';d.className='gc-box sq-cam';d.innerHTML='<video class="gc-bg" playsinline muted autoplay></video><video class="gc-sharp" playsinline muted autoplay aria-hidden="true"></video><canvas></canvas><span class="gc-ges" id="sqges"></span><div class="gc-msg"></div><button class="gc-flip" data-act="sqflip" aria-label="Đổi camera trước hoặc sau">🔄</button>';v.appendChild(d);sqCamStart()}
 if(Q.camWait&&!$('#sqwait'))$('.sq-wrap').insertAdjacentHTML('beforeend','<div class="sk-waitcam" id="sqwait"><div><b>📷 Đang chuẩn bị camera…</b><small>Đứng cách camera khoảng 2 m, thẳng người, nhìn vào màn hình để máy ghi nhớ tư thế. Đồng hồ chỉ chạy khi máy đã nhận ra em.</small><button class="btn ghost sm" data-act="sqgo">Bắt đầu luôn (chạm để trả lời)</button></div></div>');
}
function sqCamStart(){
 var box=$('#sqcam');if(!box||!window.DTKSACK||!DTKSACK.gcam)return sqCamReady();
 var me=Q;setTimeout(function(){if(Q===me)sqCamReady()},25000);
 var bd=Q.bd=DTKSACK.gcam.body&&DTKSACK.gcam.body();
 DTKSACK.gcam.start(box,sqGesture,bd?bd.classify:null).then(function(ok){if(Q===me&&(!ok||!bd))sqCamReady()});
}
function sqCamReady(){if(!Q||!Q.camWait)return;Q.camWait=false;var w=$('#sqwait');if(w)w.remove();if(!Q.lock)Q.t0=Date.now()}
function sqGesture(g,now){
 var gs=$('#sqges');if(gs)gs.textContent=g?MGNAME[g]:gcIdle(Q&&Q.bd);
 if(!Q)return;
 if(Q.camWait&&Q.bd&&Q.bd.B)sqCamReady();
 if(Q.lock||Q.camWait||Q.swapUntil&&Date.now()<Q.swapUntil||!$('#sqv')){Q.hv=null;return}
 /* Sau mỗi tầng phải về tư thế đứng thẳng rồi mới tính động tác mới */
 if(!Q.armed){if(!g){if(!Q.calm)Q.calm=now;if(now-Q.calm>300)Q.armed=true}else Q.calm=0;return}
 var j=g?['L','R','C','D'].indexOf(g):-1,row=sqRowEl(Q.i+1),tiles=row?[].slice.call(row.querySelectorAll('.stone')):[];
 if(j>=tiles.length)j=-1;
 tiles.forEach(function(b,k){var on=k===j;b.classList.toggle('hold',on);if(!on)b.style.removeProperty('--hp')});
 if(j<0){Q.hv=null;return}
 if(Q.hv!==j){Q.hv=j;Q.hs=now}
 var pr=Math.min(1,(now-Q.hs)/1000);tiles[j].style.setProperty('--hp',Math.round(pr*100)+'%');
 if(pr>=1){Q.hv=null;tiles[j].classList.remove('hold');sqPick(j)}
}
function sqTick(){
 if(!Q||Q.lock||!$('#sqv')){clearInterval(qt);return}
 if(Q.camWait||Q.swapUntil&&Date.now()<Q.swapUntil){Q.t0=Date.now();return}
 var left=Math.max(0,30-(Date.now()-Q.t0)/1000);setRing(left,30);
 if(left>0&&left<=5)snd('beat',left);
 if(left<=0)sqPick(-1);
}
function sqPick(i){
 if(!Q||Q.lock)return;Q.lock=true;clearInterval(qt);
 var me=Q,q=Q.qs[Q.i],row=sqRowEl(Q.i+1),tiles=row?[].slice.call(row.querySelectorAll('.stone')):[],o=Q.o[i];
 tiles.forEach(function(b){b.disabled=true});row.classList.remove('cur');
 var av=$('#sqav'),right='';Q.o.forEach(function(x){if(x.ok)right=x.t});
 if(i>=0){sqAvTo(tiles[i],true);snd('tap')}
 setTimeout(function(){
  if(Q!==me)return;
  if(o&&o.ok){
   tiles[i].classList.add('done');snd('step');sqMood('happy');Q.stk++;if(Q.stk>Q.best)Q.best=Q.stk;Q.xp+=10+2*q.l;
   if(Q.turn){var ps=Q.ps[Q.p.n]=Q.ps[Q.p.n]||{xp:0,ok:0};ps.xp+=10+2*q.l;ps.ok++}
   var fb=$('#fb');fb.className='fb good';fb.innerHTML='✅ Vững chân! Tiếp tục leo lên.';
   setTimeout(function(){
    if(Q!==me)return;Q.i++;
    if(Q.i>=Q.qs.length){var fin=sqRowEl(Q.i+1);sqShift(Q.i+1,true);setTimeout(function(){if(Q===me){sqAvTo(fin.querySelector('.plat'),true);sqMood('win');snd('win')}},350);setTimeout(function(){if(Q===me)sqWin()},1500)}
    else sqAsk();
   },500);
  }else{
   if(i>=0)tiles[i].classList.add('crack');else{var s=sqStand();if(s&&s.classList.contains('stone'))s.classList.add('crack')}
   tiles.forEach(function(b,j){if(Q.o[j].ok)b.classList.add('reveal')});
   sqMood('sad');if(av)av.classList.add('fall');snd('crash');
   var fb2=$('#fb');fb2.className='fb bad';fb2.innerHTML=(i<0?'⏰ Hết giờ! ':'')+'🪨 Đá sụp, rơi xuống vực! Đáp án đúng: <b>'+esc(right)+'</b>'+(q.e?'<small>'+esc(q.e)+'</small>':'');
   if(Q.turn)fb2.innerHTML=(i<0?'⏰ Hết giờ! ':'')+'🪨 '+(Q.team?'🔴 Đội Đỏ':'🔵 Đội Xanh')+' rơi xuống vực! Đáp án đúng: <b>'+esc(right)+'</b>'+(q.e?'<small>'+esc(q.e)+'</small>':'');
   setTimeout(function(){if(Q===me)sqLose()},q.e?3600:2600);
  }
 },i>=0?560:0);
}
window.addEventListener('resize',function(){if(Q&&$('#sqv')){document.documentElement.style.setProperty('--vh',window.innerHeight+'px');sqSize();sqFitText();sqShift(Q.i+(Q.lock?0:1),false);var a=$('#sqav');if(a&&!a.classList.contains('fall'))sqAvTo(sqStand(),false)}});
function sqEnd(win){
 setScreen('result');
 /* 2 đội: đội vừa trả lời sai thua (win=false); cả cầu không ai sai thì hoà */
 if(Q.turn){
  var lose=win?-1:Q.team,wt=lose<0?-1:1-lose,all=Q.T[0].concat(Q.T[1]);
  var rs=all.map(function(p){var s=Q.ps[p.n]||{xp:0,ok:0},t=Q.T[0].indexOf(p)>=0?0:1;return award(p.n,{xp:s.xp+(t==wt?40:0),streak:s.ok,badges:t==wt||wt<0?['bridge']:[]})});
  var tb=function(t){return '<div style="flex:1;min-width:150px"><b style="color:'+(t?'#FF9F9F':'#7FB8FF')+'">'+(t?'🔴 Đội Đỏ':'🔵 Đội Xanh')+(t==wt?' 🏆':t==lose?' 🪨':'')+'</b><div class="res-avs">'+Q.T[t].map(function(p){return AVH(p.e,t==lose?'sad':'win','full')}).join('')+'</div><div class="small">'+Q.T[t].map(function(p){return esc(p.n)}).join(', ')+'</div></div>'};
  app.innerHTML=(wt>=0?confetti(30):'')+'<section class="hero center result'+(wt>=0?' win':'')+'"><h1 class="title sm">'+(wt<0?'🤝 Cả hai đội cùng về đích – HOÀ!':'🏆 '+(wt?'ĐỘI ĐỎ':'ĐỘI XANH')+' THẮNG!')+'</h1>'
   +'<p>'+(wt<0?'Không đội nào trả lời sai suốt '+Q.qs.length+' tầng cầu.':(lose?'Đội Đỏ':'Đội Xanh')+' trả lời sai trước ở tầng '+(Q.i+1)+'.')+'</p><div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">'+tb(0)+tb(1)+'</div></section>'
   +'<div class="rewards">'+all.map(function(p,k){return rewardHTML(p.n,p.e,rs[k])}).join('')+'</div><div class="cta"><button class="btn big" data-act="start">↻ Chơi lại</button><button class="btn ghost" data-act="menu">Đổi trò chơi</button></div>';
  snd('win');celebrate(rs);Q=null;return;
 }
 var res=award(Q.p.n,{xp:Q.xp+(win?50:0),streak:Q.best,badges:win?['bridge']:[]});
 app.innerHTML=(win?confetti(30):'')+'<section class="hero center result'+(win?' win':'')+'"><div class="res-avs">'+AVH(Q.p.e,win?'win':'sad','full')+'</div>'+(win?'<div class="wintxt">WIN</div><p>'+AVH(Q.p.e)+' '+esc(Q.p.n)+' đã vượt qua '+Q.qs.length+' bước và về đích!</p>':'<h1 class="title sm">Bạn đã rơi xuống vực!</h1><p>Vượt qua '+Q.i+'/'+Q.qs.length+' bước. Thử lại nhé!</p>')+'</section>'
 +'<div class="rewards">'+rewardHTML(Q.p.n,Q.p.e,res)+'</div><div class="cta"><button class="btn big" data-act="start">↻ Chơi lại</button><button class="btn ghost" data-act="menu">Đổi trò chơi</button></div>';
 if(win)snd('win');else snd('sad');celebrate([res]);Q=null;
}
function sqWin(){sqEnd(true)}
function sqLose(){if(Q)sqEnd(false)}

/* ================= SỰ KIỆN ================= */
document.addEventListener('click',function(e){
 var b=e.target.closest?e.target.closest('[data-act]'):null;if(!b||b.disabled)return;
 var a=b.getAttribute('data-act'),v=b.getAttribute('data-v');
 if(a=='snd'){if(window.SND)SND.toggle();return}
 if(a=='netretry'){if(navigator.onLine!==false)location.reload();return}
 if(window.DTKSACK&&DTKSACK.click(a,v,b))return;
 if(window.DTKRESCUE&&DTKRESCUE.click(a,v,b))return;
 if(window.DTKFRUIT&&DTKFRUIT.click(a,v,b))return;
 if(window.DTKSPACE&&DTKSPACE.click(a,v,b))return;
 switch(a){
 case 'subj':st.subj=v;save('dtk_subj',v);snd('tap');gradeScreen();break;
 case 'spcam':st.spcam=v=='1';save('dtk_spcam',st.spcam);menu();break;
 case 'frcam':st.frcam=v=='1';save('dtk_frcam',st.frcam);menu();break;
 case 'frpet':st.frpet=v;save('dtk_frpet',v);menu();break;
 case 'rspet':st.rspet=v;save('dtk_rspet',v);menu();break;
 case 'frpet2':st.frpet2=v;save('dtk_frpet2',v);menu();break;
 case 'rscam':st.rscam=v=='1';save('dtk_rscam',st.rscam);menu();break;
 case 'grade':if(document.body.classList.contains('playing')&&!confirm('Thoát ván chơi để đổi lớp?'))return;S=null;Q=null;gradeScreen();break;
 case 'pickg':snd('tap');openGrade(v);break;
 case 'av':st.av=v;$$('.av').forEach(function(x){x.classList.toggle('on',x===b)});break;
 case 'reg':var inp=$('#nm'),n=inp.value.trim().replace(/\s+/g,' '),r=roster();if(!n)return inp.focus();
  if(r.some(function(p){return p.n.toLowerCase()==n.toLowerCase()}))return alert('Tên này đã có. Hãy thêm họ hoặc số để phân biệt.');
  if(r.length>=16)return alert('Tối đa 16 thí sinh trên một máy.');r.push({n:n,e:st.av});setRoster(r);snd('tap');home();setTimeout(function(){var x=$('#nm');if(x&&!('ontouchstart' in window))x.focus()},0);break;
 case 'del':var r2=roster(),p=r2[+v];if(p&&confirm('Xoá thí sinh '+p.n+'? Điểm kinh nghiệm của bạn ấy vẫn được giữ.')){r2.splice(+v,1);setRoster(r2);st.sel=[];st.rvp=-1;home()}break;
 case 'home':S=null;home();break;
 case 'menu':S=null;menu();break;
 case 'mode':st.mode=v;st.sel=st.sel.slice(0,MODES[v].k);menu();break;
 case 'game':st.game=v;snd('tap');menu();break;
 case 'milcam':st.milcam=v=='1';save('dtk_milcam',st.milcam);menu();break;
 case 'mcgo':milCamReady();break;
 case 'say':if(window.DTKSAY)DTKSAY.say(v);break;
 case 'sqcam':st.sqcam=v=='1';save('dtk_sqcam',st.sqcam);menu();break;
 case 'sqgo':sqCamReady();break;
 case 'sqflip':if(Q&&Q.cam){st.skface=st.skface=='user'?'environment':'user';save('dtk_skface',st.skface);sqCamStart()}break;
 case 'mcflip':if(S&&S.cam){st.skface=st.skface=='user'?'environment':'user';save('dtk_skface',st.skface);milCamStart()}break;
 case 'skcam':st.skcam=v=='1';save('dtk_skcam',st.skcam);menu();break;
 case 'skface':st.skface=v=='environment'?'environment':'user';save('dtk_skface',st.skface);menu();break;
 case 'pick':var i=+v,k=MODES[st.mode].k;if(st.sel.indexOf(i)>=0)st.sel=st.sel.filter(function(x){return x!=i});else if(k==1)st.sel=[i];else if(st.sel.length<k)st.sel.push(i);menu();break;
 case 'start':start();break;
 case 'quit':quit();break;
 case 'fifty':fifty();break;
 case 'swap':swapQ();break;
 case 'ans':if(v=='num'){var x=$('#num');if(x&&x.value.trim())answer(x.value);else if(x)x.focus()}else answer(v);break;
 case 'next':next();break;
 case 'review':review();break;
 case 'rlv':st.rlv=v;review();break;
 case 'rn':st.rn=+v;review();break;
 case 'rvp':st.rvp=+v;review();break;
 case 'rstart':var P=rvPool();rrun(st.rn?fresh(P).slice(0,st.rn).sort(function(a,b){return a.l-b.l}).map(prep):shuf(P).sort(function(a,b){return a.l-b.l}).map(prep));break;
 case 'rwrong':rrun(shuf(S.wrong));break;
 case 'prof':profile();break;
 case 'lb':lbScreen();break;
 case 'lbg':lbGame=v;lbScreen();break;
 case 'sq':sqPick(+v);break;
 }
});
document.addEventListener('change',function(e){
 if(e.target.id=='scope'){st.scope=e.target.value;var s=document.body.getAttribute('data-scr');if(s=='review')review();else if(s=='menu')menu()}
});
document.addEventListener('keydown',function(e){
 if(e.key!='Enter')return;
 if(e.target.id=='num'&&e.target.value.trim()){e.preventDefault();answer(e.target.value)}
 else if(e.target.id=='nm'){e.preventDefault();var b=$('[data-act="reg"]');if(b)b.click()}
});

/* Giao tiếp với trò Nhảy bao bố (sack.js) */
window.DTKAPI={st:st,GR:GR,AV:AV,LADDER:LADDER,roster:roster,setRoster:setRoster,scopeSelect:scopeSelect,scopeInfo:scopeInfo,bank:bank,award:award,rewardHTML:rewardHTML,celebrate:celebrate,snd:snd,numVal:numVal,fmt:fmt,ring:ring,setRing:setRing,qClass:qClass,home:home,gradeScreen:gradeScreen,header:header,stopAll:stopAll,loadGrade:loadGrade,
 setG:function(g){g=gkey(g);if(g){st.g=g;st.subj=GR[g].subj;save('dtk_grade',st.g);header()}},glab:glab,
 skCam:function(){return st.skcam},skFace:function(){return st.skface},setSkFace:function(f){st.skface=f=='environment'?'environment':'user';save('dtk_skface',st.skface)},dbg:function(){return{S:S,Q:Q,BANK:BANK,ask:ask,answer:answer,prep:prep}},pool:gamePool,scopeName:scopeName,esc:esc,shuf:shuf,prep:prep,judge:judge,ansText:ansText,menu:menu,setScreen:setScreen,confetti:confetti,LVN:LVN,stars:stars,sayB:sayB,sayAuto:sayAuto,fresh:fresh,teamsOf:teamsOf};

/* ================= KHỞI ĐỘNG ================= */
header();netGate();
/* Mở bằng đường link mời vào phòng (?phong=MÃ) thì room.js sẽ mở màn vào phòng */
if(/[?&]phong=/.test(location.search)){app.innerHTML='<p class="loading">Đang mở phòng chơi…</p>'}
else if(st.g&&GR[st.g]&&!GR[st.g].soon)openGrade(st.g);else gradeScreen();
})();
