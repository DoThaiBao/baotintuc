# Tin Tức - Demo (HTML/CSS/JS)

Hướng dẫn nhanh:

- Mở `index.html` trong trình duyệt (double-click file hoặc `Open File`).
- Để đọc bài: click vào tiêu đề hoặc "READ MORE"; trang `post.html?id=...` sẽ hiển thị.
- Để thêm bài mới (demo client-side): mở `admin.html`, điền form và lưu — bài mới được lưu vào `localStorage` và sẽ hiện ngay trên trang chủ.
 - Để thêm bài mới (demo client-side): mở `admin.html`, điền form và lưu — bài mới được lưu vào `localStorage` và sẽ hiện ngay trên trang chủ.

Export / Import dữ liệu:
- Trong `admin.html` có nút "Export JSON" để tải file `articles.json` (dùng để sao lưu hoặc chia sẻ).
- Nút "Download data.js" sinh ra một file `data.js` chứa biến `SAMPLE_ARTICLES` — bạn có thể thay thế file `data.js` trong project bằng file này để lưu tĩnh dữ liệu.
- Bạn cũng có thể import file JSON vào `localStorage` bằng ô "Import JSON file".
 - Lưu ảnh: Khi upload ảnh từ `admin.html`, trang sẽ chuyển ảnh thành DataURL (base64) và lưu cùng bài trong `localStorage`. Điều này cho phép ảnh hiển thị ngay trên trang mà không cần server, nhưng kích thước lưu có thể lớn và chỉ khả dụng trên trình duyệt đó.

Ghi chú kỹ thuật: Trình duyệt không cho phép ghi trực tiếp vào file hệ thống từ trang web; vì vậy admin lưu bài vào `localStorage`. Nếu bạn cần ghi trực tiếp vào file `data.js` hoặc lưu file ảnh lên server, bạn sẽ cần một server (ví dụ Node.js + Express) để nhận upload và ghi file vào thư mục dự án.
