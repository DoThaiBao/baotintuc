// Sample articles - in a simple array. In production, fetch from server.
const SAMPLE_ARTICLES = [
  {
    "id": 8,
    "title": "Khi thành phố còn ngủ, chợ đã thức",
    "category": "Đời sống",
    "date": "2024-11-10",
    "image": "img/Screenshot 2025-12-23 114533.png",
    "excerpt": "Khám phá không khí nhộn nhịp, đầy sức sống của chợ đầu mùa đông Huế khi thành phố vẫn còn chìm trong giấc ngủ.",
    "content": "Sáng sớm mùa đông, khi Huế còn chìm trong màn mưa lạnh, phố phường vắng lặng, khu chợ vẫn bắt đầu một ngày. Khoảng 5 giờ sáng, trong màn mưa lất phất, dòng người đội áo mưa, khoác áo ấm nối nhau đi vào chợ. Không khí lạnh khiến hơi thở trắng bốc lên, hòa cùng âm thanh của bước chân, tạo nên một nhịp điệu hối hả riêng cho buổi chợ sớm. Bên trong, khu bán thịt nhộn nhịp với tiếng dao thớt, những sạp hải sản tươi rói, rau xanh được chăm chút cẩn thận và các loại trái cây rực rỡ. Chợ sớm không chỉ là nơi mua bán, mà còn là nhịp sinh học đô thị – nơi thành phố dần tỉnh giấc, nơi con người kết nối qua những món ăn, ánh mắt và nụ cười."
  },
  {
    "id": 12,
    "title": "Xe đạp và hồn phố Huế",
    "category": "Văn hóa",
    "date": "2024-11-10",
    "image": "img/Screenshot 2025-12-23 114437.png",
    "excerpt": "Giữa nhịp sống hiện đại, xe đạp vẫn là một phần không thể thiếu, góp phần tạo nên bản sắc chậm rãi và trầm tĩnh của Cố đô.",
    "content": "Giữa dòng xe máy, ô tô ngày càng đông, Huế vẫn giữ cho mình một nhịp sống chậm rãi qua những vòng bánh xe đạp lăn đều trên phố. Xe đạp không chỉ là phương tiện đi lại mà còn gắn bó mật thiết với sinh hoạt hằng ngày của người dân, từ đi chợ, đưa con đến trường đến thong thả dạo ven sông Hương. Ngày nay, xe đạp còn được du khách lựa chọn như một cách khám phá Huế xanh và bền vững, từ Đại Nội, chùa Thiên Mụ đến các lăng tẩm. Việc giữ lại không gian cho xe đạp chính là giữ gìn nhịp sống chậm – giá trị khó thay thế của một đô thị di sản, một lựa chọn bền vững cho thành phố xanh và đáng sống."
  },
  {
    "id": 11,
    "title": "TP. Huế: Công trình cầu vượt cửa biển dài nhất miền Trung tiến độ ra sao?",
    "category": "Kinh tế",
    "date": "2024-11-10",
    "image": "img/Screenshot 2025-12-23 113852.png",
    "excerpt": "Cầu vượt biển Thuận An, công trình trọng điểm với tổng chiều dài 2,36km, đang bước vào giai đoạn hoàn thiện cuối cùng.",
    "content": "Cầu vượt cửa biển Thuận An, TP. Huế đang bước vào giai đoạn hoàn thiện cuối cùng và dự kiến thông xe dịp Lễ Quốc khánh 2/9. Đây là cây cầu vượt biển dài nhất ở miền Trung, với phần cầu vượt biển dài hơn 1,3km, bề rộng 20m. Công trình sử dụng kết cấu dầm bê tông cốt thép dự ứng lực kết hợp dây văng, với trụ chính cao 34m. Sau 3 năm thi công với tổng vốn đầu tư hơn 2.100 tỷ đồng, cầu sẽ đóng vai trò quan trọng trong việc phát triển đô thị ven biển, thúc đẩy du lịch và kết nối giao thông liên vùng. Các đơn vị thi công đang tăng tốc hoàn thành những hạng mục cuối cùng."
  },
  {
    "id": 10,
    "title": "TP. Huế: Thu hút hơn 27.700 tỷ đồng đầu tư trong 6 tháng đầu năm 2025",
    "category": "Kinh tế",
    "date": "2024-11-10",
    "image": "img/Screenshot 2025-12-23 113946.png",
    "excerpt": "Trong 6 tháng đầu năm, thành phố Huế đã cấp mới và điều chỉnh nhiều dự án, nâng tổng vốn đăng ký đầu tư lên con số ấn tượng.",
    "content": "Trong 6 tháng đầu năm 2025, TP. Huế đã cấp mới 19 dự án và điều chỉnh tăng, giảm vốn cho 7 dự án, nâng tổng vốn đăng ký đầu tư lên 27.724 tỷ đồng. Đáng chú ý, Dự án Khu liên hợp sản xuất, lắp ráp Kim Long Motor Huế đã được điều chỉnh tăng vốn thêm 21.178,2 tỷ đồng. Thành phố cũng tập trung tháo gỡ khó khăn để đẩy nhanh tiến độ các dự án quy mô lớn, đồng thời rà soát và xử lý các dự án chậm tiến độ. Bên cạnh đó, số doanh nghiệp thành lập mới tăng 29,4% về số lượng và 144% về vốn so với cùng kỳ, cho thấy sự khởi sắc trong môi trường kinh doanh."
  },
  {
    "id": 9,
    "title": "Đà Nẵng: Nhân viên quán ăn tràn ra đường chèo kéo du khách gây phản cảm",
    "category": "Xã hội",
    "date": "2024-11-10",
    "image": "img/Screenshot 2025-12-23 114111.png",
    "excerpt": "Tình trạng chèo kéo, đeo bám khách du lịch tại nhiều tuyến đường trung tâm Đà Nẵng đang làm xấu đi hình ảnh du lịch văn minh của thành phố.",
    "content": "Tại các tuyến đường trung tâm như Bạch Đằng, Võ Nguyên Giáp (TP. Đà Nẵng), tình trạng nhân viên hàng quán tràn ra vỉa hè, lòng đường để chèo kéo, níu kéo du khách diễn ra thường xuyên, gây phản cảm và tiềm ẩn nguy cơ tai nạn giao thông. Tình trạng này diễn ra rầm rộ hơn vào ban đêm, khi một số cơ sở còn chiếm dụng không gian công cộng. Chính quyền địa phương đã chỉ đạo lực lượng chức năng tăng cường tuần tra, xử lý vi phạm để lập lại trật tự, bảo vệ môi trường du lịch văn minh vốn là thương hiệu của Đà Nẵng."
  },
  {
    "id": 13,
    "title": "Hội thảo quốc tế tại Huế: Kết nối cơ hội du học và việc làm Trung Quốc năm 2025",
    "category": "Giáo dục",
    "date": "2024-11-10",
    "image": "img/Screenshot 2025-12-23 113835.png",
    "excerpt": "Sự kiện quy tụ 17 doanh nghiệp và nhiều trường đại học Trung Quốc, mở ra cánh cửa học bổng và việc làm cho nhân lực giỏi tiếng Trung.",
    "content": "Hội thảo quốc tế 'Việc làm và Du học Trung Quốc năm 2025' diễn ra tại TP. Huế đã thu hút đông đảo học sinh, sinh viên và người lao động. Sự kiện có sự tham gia của 17 doanh nghiệp trong và ngoài nước cùng các trường đại học Trung Quốc như Đại học Đông Bắc, Đại học Sư Phạm Thủ đô Bắc Kinh. Hội thảo nhấn mạnh cơ hội việc làm lớn mở ra từ làn sóng đầu tư của doanh nghiệp Trung Quốc tại Việt Nam, đồng thời cung cấp thông tin chính thống về du học và học bổng. Đây là cầu nối hiệu quả giữa doanh nghiệp và sinh viên, hỗ trợ thế hệ trẻ tiếp cận cơ hội phù hợp."
  },
  {
    "id": 7,
    "title": "Kỳ vọng thành phố lớn nhất nước trỗi dậy cùng khu thương mại triệu đô",
    "category": "Thời sự",
    "date": "2024-11-10",
    "image": "img/Screenshot 2025-12-23 113954.png",
    "excerpt": "Từ 1/7, thành phố Đà Nẵng mới được hình thành từ việc hợp nhất với tỉnh Quảng Nam, hứa hẹn trở thành cực tăng trưởng quan trọng với Khu thương mại tự do quy mô lớn.",
    "content": "Việc hợp nhất thành phố Đà Nẵng và tỉnh Quảng Nam tạo nên một 'siêu đô thị' với diện tích gần 12.000km2, dân số hơn 3 triệu người, sở hữu nguồn tài nguyên du lịch phong phú và mạng lưới hạ tầng giao thông hoàn chỉnh. Điểm nhấn đột phá là Khu thương mại tự do Đà Nẵng với quy mô gần 1.900ha, kết hợp logistics, thương mại và công nghiệp chế xuất. Thành phố mới được kỳ vọng là trung tâm tài chính, kinh tế, văn hóa của cả nước, tiếp tục phát huy thương hiệu 'thành phố đáng sống' với các chính sách nhân văn và an sinh xã hội."
  },
  {
    "id": 6,
    "title": "Đi trước 10 tiếng đồng hồ để “xí” chỗ đẹp xem chung kết pháo hoa",
    "category": "Du lịch",
    "date": "2024-11-10",
    "image": "img/Screenshot 2025-12-23 114151.png",
    "excerpt": "Ngay từ trưa, bờ sông Hàn (Đà Nẵng) đã chật kín người dân mang theo chiếu, bạt đến sớm để giữ chỗ cho đêm chung kết DIFF 2025.",
    "content": "Hơn 10 giờ trước khi đêm chung kết Lễ hội Pháo hoa Quốc tế Đà Nẵng (DIFF 2025) diễn ra, hàng trăm người dân và du khách đã tập trung dọc bờ đông sông Hàn, 'xí chỗ' bằng chiếu, bạt, thảm để có vị trí ngắm pháo hoa lý tưởng. Dù nắng gắt, nhiều người vẫn kiên nhẫn chờ đợi. Lượng khách lưu trú tại Đà Nẵng đêm chung kết tăng mạnh, nhiều khách sạn kín phòng. Chung kết DIFF 2025 với sự góp mặt của đội Việt Nam và Trung Quốc thu hút sự quan tâm đặc biệt, đánh dấu lần đầu tiên Việt Nam lọt vào vòng chung kết."
  },
  {
    "id": 5,
    "title": "Người đàn ông chạy xe khắp phố để giúp người lạ",
    "category": "Đời sống",
    "date": "2024-11-10",
    "image": "img/Screenshot 2025-12-23 114124.png",
    "excerpt": "Với tấm bảng 'Thay ruột xe 0 đồng - Xăng 0 đồng' phía sau xe, anh Cường âm thầm giúp đỡ những người gặp sự cố giữa đường tại Đà Nẵng.",
    "content": "Anh Trần Lê Anh Cường (41 tuổi, Đà Nẵng) đã biến chiếc xe máy của mình thành một 'trạm cứu hộ' di động, rong ruổi khắp phố để thay ruột xe, tặng xăng miễn phí cho người lỡ đường. Hành động tử tế bắt đầu từ một lần tình cờ giúp người phụ nữ dắt bộ xe bị xì lốp. Dù không phải thợ chuyên nghiệp, anh vẫn mang theo dụng cụ và nhiên liệu, sẵn sàng giúp đỡ bất cứ ai gặp khó khăn. Anh kiên quyết không nhận tiền công và chỉ giúp những người thực sự bất đắc dĩ. Câu chuyện về anh lan truyền, truyền cảm hứng về lòng tốt giản dị giữa lòng thành phố."
  },
  {
    "id": 4,
    "title": "Phá Tam Giang – “Chiều tà trên phá Tam Giang”",
    "category": "Du lịch",
    "date": "2024-11-10",
    "image": "img/Screenshot 2025-12-23 114227.png",
    "excerpt": "Hành trình khám phá vẻ đẹp trữ tình, hoang sơ của hệ đầm phá lớn nhất Đông Nam Á khi hoàng hôn buông xuống.",
    "content": "Phá Tam Giang (Huế) hiện lên như một bức tranh thủy mặc khổng lồ khi chiều tà. Du khách được trải nghiệm cảm giác lướt nhẹ trên thuyền giữa mặt phá phẳng lặng, ngắm nhìn ánh hoàng hôn nhuộm vàng rồi tím thẫm cả không gian. Nơi đây không chỉ có cảnh sắc mà còn là đời sống mưu sinh của người dân làng chài với những vuông lưới, công việc 'mò' hến, cáy khi nước rút. Kết thúc hành trình là bữa cơm ấm áp, chân chất tại nhà dân, mang lại trải nghiệm trọn vẹn về vẻ đẹp và con người nơi miền nước xứ Huế."
  },
  {
    "id": 3,
    "title": "CỔ VẬT TRONG “ĐIỆN THÁI HÒA”: DẤU ẤN UY QUYỀN THỜI NHÀ NGUYỄN",
    "category": "Văn hoá",
    "date": "2024-11-10",
    "image": "img/Screenshot 2025-12-23 114308.png",
    "excerpt": "Khám phá những bảo vật quý giá được lưu giữ tại Điện Thái Hòa, nơi phản ánh rõ nét quyền lực tối thượng và nghi thức cung đình triều Nguyễn.",
    "content": "Điện Thái Hòa - trung tâm quyền lực của Hoàng thành Huế - không chỉ nổi bật về kiến trúc mà còn lưu giữ nhiều cổ vật quý, minh chứng cho sự uy nghiêm của triều đình nhà Nguyễn. Nổi bật là ngai vàng đặt trên bệ rồng, biểu tượng cho 'thiên tử'. Các tủ trưng bày còn có sách phong bằng vàng bạc để phong tước, các văn bản có bút tích son (ngự phê) của nhà vua, cùng những vật dụng nghi lễ tinh xảo như hộp đựng ấn, ống đựng bửu chiếu. Mỗi hiện vật đều mang đậm dấu ấn mỹ thuật cung đình và tính chính danh của hoàng quyền một thời."
  },
  {
    "id": 2,
    "title": "Cửa hàng tiện lợi “Điểm chạm” không ngủ giữa lòng cố đô của giới trẻ Huế",
    "category": "Giới trẻ",
    "date": "2024-11-10",
    "image": "img/Screenshot 2025-12-23 114409.png",
    "excerpt": "Các cửa hàng tiện lợi 24/7 đang trở thành không gian sinh hoạt, kết nối mới, làm sống động nhịp đêm của giới trẻ Huế.",
    "content": "Giữa nhịp sống trầm mặc Huế, các cửa hàng tiện lợi mở cửa 24/7 như G23 Mart, B Mart, AM PM... đang trở thành điểm hẹn sôi động suốt đêm của giới trẻ. Với không gian thoáng, tiện nghi, có góc ngồi và ổ cắm điện, nơi đây không chỉ để mua sắm mà còn để nhóm bạn tụ tập, trò chuyện, ôn bài hay làm việc khuya. Sự phát triển của mô hình này phản ánh sự thay đổi trong nhu cầu sử dụng không gian công cộng của người trẻ, đồng thời góp phần tạo nên một nhịp sống đêm năng động, hiện đại và cởi mở hơn cho Cố đô."
  },
  {
    "id": 1,
    "title": "Photobooth: Góc ký ức mới của giới trẻ Huế giữa thời đại số",
    "category": "Giới trẻ",
    "date": "2024-11-10",
    "image": "img/Screenshot 2025-12-23 114344.png",
    "excerpt": "Những buồng chụp ảnh liền nhanh với phong cách film hoài cổ đang được giới trẻ Huế yêu thích như một cách lưu giữ khoảnh khắc hữu hình, đầy cảm xúc.",
    "content": "Photobooth với phong cách tối giản, ánh sáng dịu và tông màu film hoài cổ đã trở thành trào lưu được giới trẻ Huế đón nhận. Đây không chỉ là nơi chụp ảnh giải trí mà còn là điểm hẹn kết nối bạn bè, gia đình trong các dịp sinh nhật, tốt nghiệp. Khác với ảnh kỹ thuật số dễ lãng quên, những tấm ảnh in liền tay nhỏ xinh trở thành kỷ vật hữu hình, có thể cầm nắm, ép vào nhật ký hay dán lên góc học tập. Photobooth mang lại trải nghiệm 'ký ức chạm được', trở thành một nghi thức mới để người trẻ Huế lưu giữ những khoảnh khắc giản dị mà ý nghĩa của tuổi trẻ."
  }
]

// Initialize storage if empty
if (!localStorage.getItem('articles')) {
  localStorage.setItem('articles', JSON.stringify(SAMPLE_ARTICLES));
}
