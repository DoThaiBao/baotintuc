// Sample articles - in a simple array. In production, fetch from server.
const SAMPLE_ARTICLES = [
  {
    id: 3,
    title: "Những cây khiến gia chủ hao tài lộc kiêng kị trồng trước nhà",
    category: "Đời Sống",
    date: "2024-11-02",
    image: "https://picsum.photos/seed/picsum1/800/450",
    excerpt: "Cây xanh không chỉ giúp cải thiện chất lượng không khí mà còn tạo nên vẻ đẹp cho ngôi nhà.",
    content: `
<p>Cây xanh không chỉ giúp cải thiện chất lượng không khí mà còn tạo nên vẻ đẹp tươi mới cho ngôi nhà...</p>
<ul>
<li>6 loại cây nên đặt trong phòng tắm để tiền vào như nước</li>
<li>Đan lẻ như tiền nơi khi cắm hoa sen</li>
<li>Khoai tây mọc mầm hãy cho vào khay nước</li>
</ul>
<p>...nội dung mẫu demo.</p>`
  },
  {
    id: 2,
    title: "Đang mùa cưới, tiệm vàng ở Quảng Ninh gặp cảnh lạ",
    category: "Làm Đẹp",
    date: "2024-11-02",
    image: "https://picsum.photos/seed/picsum2/800/450",
    excerpt: "Một câu chuyện thú vị về mùa cưới và tiệm vàng địa phương.",
    content: "<p>Nội dung bài viết demo số 2.</p>"
  },
  {
    id: 1,
    title: "Những việc nhất định phải làm tháng 10 âm lịch",
    category: "Đời Sống",
    date: "2024-11-02",
    image: "https://picsum.photos/seed/picsum3/800/450",
    excerpt: "Theo phong thủy thì tháng 10 âm lịch có gì khác?",
    content: "<p>Nội dung bài viết demo số 1.</p>"
  }
];

// Initialize storage if empty
if (!localStorage.getItem('articles')) {
  localStorage.setItem('articles', JSON.stringify(SAMPLE_ARTICLES));
}
