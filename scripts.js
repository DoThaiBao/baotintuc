// --- 1. CÁC HÀM TIỆN ÍCH (HELPERS) ---

// Lấy dữ liệu an toàn từ LocalStorage
function getArticles() {
  try {
    const data = localStorage.getItem('articles');
    // Nếu không có dữ liệu hoặc lỗi, trả về mảng rỗng
    const parsed = data ? JSON.parse(data) : [];
    // Sắp xếp bài mới nhất lên đầu (ID lớn nhất)
    return Array.isArray(parsed) ? parsed.sort((a, b) => b.id - a.id) : [];
  } catch (e) {
    console.error("Lỗi parse dữ liệu:", e);
    return [];
  }
}

// Lấy tham số từ URL (ví dụ: id=1)
function getQueryParam(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

// Định dạng ngày tháng (VN)
function formatDate(iso) {
  if (!iso) return '';
  try {
    const d = new Date(iso);
    if (isNaN(d)) return iso;
    return d.toLocaleString('vi-VN', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    }).replace(',', '');
  } catch (e) {
    return iso;
  }
}

// Ảnh dự phòng khi link ảnh bị lỗi
const PLACEHOLDER_IMG = "https://via.placeholder.com/800x450?text=No+Image";

// --- 2. CÁC HÀM RENDER GIAO DIỆN ---

// Render danh sách bài viết chính (Trang chủ)
function renderList(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const articles = getArticles();

  if (articles.length === 0) {
    el.innerHTML = '<p>Chưa có tin tức mới.</p>';
    return;
  }

  el.innerHTML = articles.map(a => `
    <div class="item">
      <div class="image-wrap" style="width: 200px; height: 120px; flex-shrink: 0;">
        <img loading="lazy" src="${a.image || PLACEHOLDER_IMG}" 
             alt="${a.title}" 
             style="width:100%; height:100%; object-fit:cover;"
             onerror="this.src='${PLACEHOLDER_IMG}'">
      </div>
      <div>
        <div class="meta">${a.category} • ${formatDate(a.date)}</div>
        <h3><a href="post.html?id=${a.id}">${a.title}</a></h3>
        <p>${a.excerpt}</p>
        <a class="readmore" href="post.html?id=${a.id}">ĐỌC THÊM</a>
      </div>
    </div>`).join('');
}

// Render danh sách bài mới (Sidebar)
function renderLatest(containerId, limit = 5) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const articles = getArticles();

  if (articles.length === 0) {
    el.innerHTML = '<li>Chưa có tin mới.</li>';
    return;
  }

  const slice = articles.slice(0, limit);
  el.innerHTML = slice.map(a => `
    <li>
      <img loading="lazy" src="${a.image || PLACEHOLDER_IMG}" 
           alt="" 
           onerror="this.src='${PLACEHOLDER_IMG}'">
      <div>
        <a href="post.html?id=${a.id}">${a.title}</a>
        <div class="meta">${formatDate(a.date)}</div>
      </div>
    </li>`).join('');
}

// Render chi tiết bài viết (Trang post.html)
function renderPost() {
  const id = Number(getQueryParam('id'));
  if (!id) return;

  const articles = getArticles();
  const a = articles.find(x => x.id === id);
  const el = document.getElementById('post');

  if (!a || !el) {
    if (el) el.innerHTML = '<p>Bài viết không tìm thấy.</p>';
    return;
  }

  el.innerHTML = `
    <h1>${a.title}</h1>
    <div class="meta">${a.category} • ${formatDate(a.date)}</div>
    <img src="${a.image || PLACEHOLDER_IMG}" 
         alt="${a.title}" 
         style="width:100%; max-height:450px; object-fit:cover; margin:12px 0"
         onerror="this.src='${PLACEHOLDER_IMG}'">
    <div class="lead" style="font-weight:bold; margin-bottom:15px;">${a.excerpt}</div>
    <div class="content-body">${a.content}</div>
  `;
}

// Render lưới chuyên mục (Dưới phần tin mới)
function renderCategoryGrid(containerId, categories) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const articles = getArticles();

  // Hàm chuẩn hóa chuỗi để so sánh (bỏ dấu tiếng Việt)
  const normalizeStr = s => (s || '').toString().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  const html = categories.map(cat => {
    const ncat = normalizeStr(cat);
    // Tìm bài viết mới nhất thuộc chuyên mục đó
    const found = articles.find(a => normalizeStr(a.category).includes(ncat));

    if (found) {
      return `
        <div class="cat-box">
          <a href="post.html?id=${found.id}">
             <div class="image-wrapper">
                <img loading="lazy" src="${found.image || PLACEHOLDER_IMG}" 
                     alt="${found.title}"
                     onerror="this.src='${PLACEHOLDER_IMG}'">
             </div>
          </a>
          <div class="cat-box-content">
             <h4><a href="post.html?id=${found.id}">${found.title}</a></h4>
             <div class="meta">${found.category}</div>
          </div>
        </div>`;
    } else {
      return `
        <div class="cat-box">
            <div class="cat-box-content">
                <h4>${cat}</h4>
                <p class="meta">Chưa có bài viết.</p>
            </div>
        </div>`;
    }
  }).join('');

  container.innerHTML = html;
}

// --- 3. CÁC TÍNH NĂNG ĐẶC BIỆT (SLIDER, TICKER) ---

// Slider chạy ảnh (Hero Carouse


// --- 4. TÌM KIẾM & LỌC ---

function performSearch(q) {
  const out = document.getElementById('articles');
  if (!out) return;
  
  const keyword = (q || '').toLowerCase().trim();
  if (!keyword) {
    renderList('articles'); // Reset về danh sách đầy đủ
    return;
  }

  // Lọc bài viết (So sánh tiêu đề không dấu)
  const normalize = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const articles = getArticles();
  
  const results = articles.filter(a => {
    const content = (a.title + ' ' + a.category).toLowerCase();
    return normalize(content).includes(normalize(keyword));
  });

  if (results.length === 0) {
    out.innerHTML = '<p>Không tìm thấy kết quả.</p>';
  } else {
    // Render kết quả tìm kiếm (Tái sử dụng template)
    out.innerHTML = results.map(a => `
        <div class="item">
          <div class="image-wrap" style="width: 200px; height: 120px;">
             <img src="${a.image || PLACEHOLDER_IMG}" style="width:100%;height:100%;object-fit:cover" onerror="this.src='${PLACEHOLDER_IMG}'">
          </div>
          <div>
            <div class="meta">${a.category} • ${formatDate(a.date)}</div>
            <h3><a href="post.html?id=${a.id}">${a.title}</a></h3>
            <p>${a.excerpt}</p>
          </div>
        </div>`).join('');
  }
}

// --- 5. QUẢN LÝ ADMIN (Thêm/Xóa bài) ---

function handleAdminForm() {
  const form = document.getElementById('articleForm');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const fd = new FormData(form);
    const articles = getArticles();
    
    // Tạo ID mới (Max ID + 1)
    const newId = articles.length > 0 ? Math.max(...articles.map(a => a.id)) + 1 : 1;
    const now = new Date().toISOString().slice(0, 10);

    // Xử lý ảnh (Base64 hoặc Link)
    const imageFile = document.getElementById('imageFile')?.files[0];
    const imageUrl = fd.get('image')?.toString();

    const saveItem = (imgSrc) => {
        const newItem = {
            id: newId,
            title: fd.get('title'),
            category: fd.get('category') || 'Khác',
            excerpt: fd.get('excerpt'),
            content: fd.get('content'),
            date: now,
            image: imgSrc,
            featured: document.getElementById('featured')?.checked || false
        };
        
        articles.unshift(newItem); // Thêm vào đầu mảng
        localStorage.setItem('articles', JSON.stringify(articles));
        alert('Đăng bài thành công!');
        window.location.href = 'index.html';
    };

    if (imageFile) {
        const reader = new FileReader();
        reader.onload = (ev) => saveItem(ev.target.result);
        reader.readAsDataURL(imageFile);
    } else {
        saveItem(imageUrl || PLACEHOLDER_IMG);
    }
  });
}

function renderAdminList() {
    const container = document.getElementById('adminList');
    if (!container) return;
    const articles = getArticles();
    
    container.innerHTML = articles.map(a => `
        <div style="border-bottom:1px solid #eee; padding:10px; display:flex; justify-content:space-between;">
            <div><b>${a.title}</b> <span style="color:#888">(${a.category})</span></div>
            <button onclick="deleteArticle(${a.id})" style="background:red;color:white;border:none;padding:5px 10px;cursor:pointer;">Xóa</button>
        </div>
    `).join('');
}

// Hàm xóa bài (gắn vào window để gọi được từ HTML)
window.deleteArticle = function(id) {
    if (!confirm('Bạn có chắc muốn xóa bài này?')) return;
    const articles = getArticles().filter(a => a.id !== id);
    localStorage.setItem('articles', JSON.stringify(articles));
    renderAdminList();
    renderList('articles'); // Refresh nếu đang ở trang chủ
};


// --- 6. KHỞI CHẠY (MAIN) ---

document.addEventListener('DOMContentLoaded', () => {
  // 1. Render các thành phần chính
  renderList('articles');
  renderLatest('latest');
  renderPost();
  
  
  // 3. Render lưới chuyên mục (4 chuyên mục nổi bật)
  renderCategoryGrid('categoryGrid', ['Kinh tế', 'Xã hội', 'Đời sống', 'Thời sự']);

  // 4. Các chức năng khác
  handleAdminForm();
  renderAdminList();

  // 5. Xử lý tìm kiếm
  const searchForm = document.getElementById('searchForm');
  if (searchForm) {
      searchForm.addEventListener('submit', e => {
          e.preventDefault();
          const val = document.getElementById('siteSearch').value;
          performSearch(val);
      });
  }
});
// ... (Đoạn code check version cũ giữ nguyên) ...

// --- 1. DỮ LIỆU DỰ PHÒNG ---
let list = [];
try {
    const local = JSON.parse(localStorage.getItem('articles') || '[]');
    if (Array.isArray(local) && local.length > 0) list = local;
} catch (e) {}

if (list.length === 0) {
    if (window.SAMPLE_ARTICLES) list = window.SAMPLE_ARTICLES;
    else if (typeof FALLBACK_DATA !== 'undefined') list = FALLBACK_DATA; // Check kỹ biến này
}

// ============================================================
// [MỚI] BẮT ĐẦU ĐOẠN XỬ LÝ CATEGORY TẠI ĐÂY
// ============================================================

// 1. Lấy category từ URL (ví dụ: index.html?cat=thời sự -> lấy được "thời sự")
const urlParams = new URLSearchParams(window.location.search);
const currentCat = urlParams.get('cat'); // Biến này chứa tên danh mục

// 2. Tô màu đỏ cho Menu (Highlight)
const menuLinks = document.querySelectorAll('.category-bar a');
menuLinks.forEach(link => {
    // Lấy giá trị data-cat của thẻ a
    const linkCat = link.getAttribute('data-cat');
    
    // Nếu URL không có cat thì mặc định tô màu cái "Tất cả"
    if (!currentCat && linkCat === 'all') {
        link.classList.add('active');
    }
    // So sánh (chuyển về chữ thường để tránh lỗi hoa/thường)
    else if (currentCat && linkCat && linkCat.toLowerCase() === currentCat.toLowerCase()) {
        link.classList.add('active');
    } else {
        link.classList.remove('active');
    }
});

// 3. Lọc danh sách bài viết (Filter Data)
if (currentCat && currentCat !== 'all') {
    // Lọc mảng list, chỉ giữ lại bài có category trùng khớp
    list = list.filter(item => {
        // Kiểm tra xem bài viết có thuộc tính category không
        if (!item.category) return false;
        // So sánh tương đối (dùng includes hoặc ===)
        return item.category.toLowerCase() === currentCat.toLowerCase();
    });
}

// ============================================================
// [MỚI] KẾT THÚC ĐOẠN XỬ LÝ
// ============================================================


// Sắp xếp bài mới nhất lên đầu (Giữ nguyên code cũ)
list.sort((a, b) => b.id - a.id);

// Kiểm tra nếu sau khi lọc mà không còn bài nào (list rỗng)
if (list.length === 0) {
    document.querySelector('.main-content').innerHTML = "<p style='padding:20px'>Chưa có bài viết nào thuộc mục này.</p>";
} else {
    // ... Code render bài viết cũ của bạn chạy tiếp ở dưới ...
    const latestPost = list[0]; 
    // ...
}