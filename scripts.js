function getArticles(){
  try{ return JSON.parse(localStorage.getItem('articles')||'[]').sort((a,b)=>b.id-a.id);}catch(e){return []}
}

function renderList(containerId){
  const el = document.getElementById(containerId);
  if(!el) return;
  const articles = getArticles();
  if(!articles || articles.length === 0){
    el.innerHTML = '<p>Chưa có tin tức mới.</p>';
    return;
  }

  el.innerHTML = articles.map(a=>`<div class="item">
    <img loading="lazy" src="${a.image}" alt="">
    <div>
      <div class="meta">${a.category} • ${formatDate(a.updatedAt || a.createdAt || a.date)}</div>
      <h3><a href="post.html?id=${a.id}">${a.title}</a></h3>
      <p>${a.excerpt}</p>
      <a class="readmore" href="post.html?id=${a.id}">ĐỌC THÊM</a>
    </div>
  </div>`).join('');
}

function renderLatest(containerId, limit=5){
  const el = document.getElementById(containerId);
  if(!el) return;
  const articles = getArticles();
  if(!articles || articles.length === 0){ el.innerHTML = '<li>Chưa có tin mới.</li>'; return; }
  const slice = articles.slice(0,limit);
  el.innerHTML = slice.map(a=>`<li><img loading="lazy" src="${a.image}" alt=""><div><a href="post.html?id=${a.id}">${a.title}</a><div class="meta">${formatDate(a.updatedAt || a.createdAt || a.date)}</div></div></li>`).join('');
}

function getQueryParam(name){
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

// normalize already defined earlier; reuse helper

function formatDate(iso){
  if(!iso) return '';
  // if already short date YYYY-MM-DD
  if(typeof iso === 'string' && iso.length===10 && iso.match(/^\d{4}-\d{2}-\d{2}$/)) return iso;
  try{
    const d = new Date(iso);
    if(isNaN(d)) return iso;
    // format in vi-VN without comma
    return d.toLocaleString('vi-VN', {year:'numeric', month:'2-digit', day:'2-digit', hour:'2-digit', minute:'2-digit', second:'2-digit'}).replace(',', '');
  }catch(e){
    return iso;
  }
}

// Post page render
function renderPost(){
  const id = Number(getQueryParam('id'));
  if(!id) return;
  const articles = getArticles();
  const a = articles.find(x=>x.id===id);
  const el = document.getElementById('post');
  if(!a || !el){ el && (el.innerHTML = '<p>Bài viết không tìm thấy.</p>'); return; }
  el.innerHTML = `
    <h1>${a.title}</h1>
    <div class="meta">${a.category} • ${formatDate(a.updatedAt || a.createdAt || a.date)}</div>
    <img src="${a.image}" alt="" style="width:100%;max-height:420px;object-fit:cover;margin:12px 0">
    <div class="lead">${a.excerpt}</div>
    <div class="content-body">${a.content}</div>
  `;
}

// Admin form handling
function handleAdminForm(){
  const form = document.getElementById('articleForm');
  if(!form) return;
  form.addEventListener('submit', e=>{
    e.preventDefault();
    const fd = new FormData(form);
    const title = (fd.get('title')||'').toString();
      // read from select first; fall back to text field if any
      const category = (fd.get('category')||'').toString() || (fd.get('categorySelect')||'').toString() || 'Khác';
    const excerpt = (fd.get('excerpt')||'').toString();
    const content = (fd.get('content')||'').toString();
    const imageUrlField = (fd.get('image')||'').toString();
    const imageFile = (document.getElementById('imageFile')||{}).files ? (document.getElementById('imageFile').files[0]) : null;
      const featuredChecked = document.getElementById('featured') ? !!document.getElementById('featured').checked : false;

    const articles = getArticles();
    const id = (articles[0] && articles[0].id+1) || 1;
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;
    const date = createdAt.slice(0,10);

    function saveWithImage(imageValue){
      const newItem = {id,title,category,createdAt,updatedAt,date,image:imageValue,excerpt,content,featured:!!featuredChecked};
      articles.unshift(newItem);
      localStorage.setItem('articles', JSON.stringify(articles));
      alert('Bài viết đã được lưu (localStorage).');
      window.location.href = 'index.html';
    }

    if(imageFile){
      const reader = new FileReader();
      reader.onload = function(ev){
        const dataUrl = ev.target.result; // base64 Data URL
        saveWithImage(dataUrl);
      };
      reader.onerror = function(){
        // fallback to URL field or placeholder
        saveWithImage(imageUrlField || 'https://picsum.photos/seed/default/800/450');
      };
      reader.readAsDataURL(imageFile);
    } else {
      // no uploaded file, use URL if provided or placeholder
      const imageValue = imageUrlField || 'https://picsum.photos/seed/default/800/450';
      saveWithImage(imageValue);
    }
  });
}

// Category navigation (simple filter)
function attachCategoryFilters(){
  function normalize(s){
    if(!s) return '';
    return s.toString().toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu,'').replace(/[\u0300-\u036f]/g,'');
  }
  // Only target anchors inside the category bar to avoid affecting other data-cat uses
  const anchors = document.querySelectorAll('.category-bar [data-cat]');

  function filterByCategory(cat){
    const ncat = normalize(cat||'');
    let list;
    if(ncat === 'all' || ncat === ''){
      list = getArticles();
    } else {
      list = getArticles().filter(a=> normalize(a.category).includes(ncat));
    }
    const container = document.getElementById('articles');
    if(!list || list.length === 0){ container.innerHTML = '<p>Chưa có tin tức mới.</p>'; }
    else {
      container.innerHTML = list.map(a=>`<div class="item">
        <img src="${a.image}" alt="">
        <div>
          <div class="meta">${a.category} • ${a.date}</div>
          <h3><a href="post.html?id=${a.id}">${a.title}</a></h3>
          <p>${a.excerpt}</p>
          <a class="readmore" href="post.html?id=${a.id}">ĐỌC THÊM</a>
        </div>
      </div>`).join('');
    }
    // update active state
    anchors.forEach(a=> a.classList.toggle('active', normalize(a.getAttribute('data-cat')) === ncat));
  }

  anchors.forEach(el=>{
    // If anchor has a real href (index.html?cat=...), allow normal navigation so clicks load the page immediately
    const href = el.getAttribute('href') || '';
    if(href && href !== '#'){
      // no click handler to allow browser navigation
      return;
    }
    el.addEventListener('click', e=>{
      e.preventDefault();
      const cat = el.getAttribute('data-cat') || '';
      filterByCategory(cat);
    });
  });

  // default active on load (if no query param)
  const defaultAnchor = document.querySelector('.category-bar [data-cat="all"]');
  if(defaultAnchor) {
    anchors.forEach(a=>a.classList.remove('active'));
    defaultAnchor.classList.add('active');
  }

  // If page was loaded with ?cat=..., apply it
  const urlCat = getQueryParam('cat');
  if(urlCat){
    filterByCategory(urlCat);
  }
}

// Auto-run on pages
document.addEventListener('DOMContentLoaded', ()=>{
  renderList('articles');
  renderLatest('latest');
  renderLatest('latest-aside');
  renderPost();
  handleAdminForm();
  attachCategoryFilters();
});

// Menu toggle for mobile
document.addEventListener('DOMContentLoaded', ()=>{
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  if(menuToggle && navLinks){
    menuToggle.addEventListener('click', ()=>{
      const open = navLinks.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', open? 'true' : 'false');
    });
    // close when clicking a link
    navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click', ()=>{ navLinks.classList.remove('open'); menuToggle.setAttribute('aria-expanded','false'); }));
    // close when clicking outside
    document.addEventListener('click', e=>{
      if(!navLinks.contains(e.target) && !menuToggle.contains(e.target)){
        navLinks.classList.remove('open'); menuToggle.setAttribute('aria-expanded','false');
      }
    });
  }
});

// Render category grid under 'Tin Mới' — shows 1 top article per category
function renderCategoryGrid(containerId, categories){
  const container = document.getElementById(containerId);
  if(!container) return;
  const articles = getArticles();
  const normalizeStr = s=> (s||'').toString().toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu,'').replace(/[\u0300-\u036f]/g,'');
  const html = categories.map(cat => {
    const ncat = normalizeStr(cat);
    // find first article that matches category
    const found = articles.find(a=> normalizeStr(a.category).includes(ncat));
    if(found){
      return `<div class="cat-box">
        <a href="post.html?id=${found.id}"><img loading="lazy" src="${found.image}" alt="${found.title}"></a>
        <div class="meta">${found.category} • ${formatDate(found.updatedAt||found.createdAt||found.date)}</div>
        <h4><a href="post.html?id=${found.id}">${found.title}</a></h4>
      </div>`;
    } else {
      return `<div class="cat-box"><div class="meta">${cat}</div><p>Chưa có bài viết.</p></div>`;
    }
  }).join('');
  container.innerHTML = html;
}

// -------- Hero carousel & Breaking ticker --------
function buildHeroCarousel(){
  const el = document.getElementById('heroCarousel');
  if(!el) return;
  const articles = getArticles();
  // choose featured articles first; fallback to newest
  const featured = articles.filter(a=>a.featured).slice(0,5);
  const slides = (featured.length>0) ? featured : articles.slice(0,5);
  if(slides.length === 0){ el.innerHTML = '<div class="hero-slide active"><div class="hero-caption"><h2>Chưa có bài nổi bật</h2></div></div>'; return; }
  el.innerHTML = slides.map((a, idx)=>`<div class="hero-slide ${idx===0? 'active':''}" data-index="${idx}">
    <img src="${a.image}" alt="${a.title}">
    <div class="hero-caption"><h2><a href="post.html?id=${a.id}" style="color:#fff">${a.title}</a></h2></div>
  </div>`).join('') + `<div class="hero-controls"><button id="heroPrev">‹</button><button id="heroNext">›</button></div>`;

  let current = 0;
  const total = slides.length;
  const show = i=>{
    el.querySelectorAll('.hero-slide').forEach(s=>s.classList.remove('active'));
    const s = el.querySelector(`.hero-slide[data-index="${i}"]`);
    if(s) s.classList.add('active');
    current = i;
  };
  document.getElementById('heroNext').addEventListener('click', ()=> show((current+1)%total));
  document.getElementById('heroPrev').addEventListener('click', ()=> show((current-1+total)%total));
  // autoplay with pause on hover
  let autoplay = setInterval(()=> show((current+1)%total), 5000);
  el.addEventListener('mouseenter', ()=> clearInterval(autoplay));
  el.addEventListener('mouseleave', ()=> { autoplay = setInterval(()=> show((current+1)%total), 5000); });
}

function buildBreakingTicker(){
  const el = document.getElementById('breakingList');
  if(!el) return;
  const articles = getArticles();
  if(!articles || articles.length===0){ el.textContent = 'Chưa có tin nóng.'; return; }

  // rotate a single random headline every 10 minutes (600000 ms)
  // store interval ref on window so rebuilds can clear it
  if(window.__breakingTickerInterval) { clearInterval(window.__breakingTickerInterval); window.__breakingTickerInterval = null; }
  let currentIndex = -1;

  function pickRandomIndex(){
    if(articles.length === 1) return 0;
    let i = Math.floor(Math.random() * articles.length);
    // avoid repeating same index
    let tries = 0;
    while(i === currentIndex && tries < 10){ i = Math.floor(Math.random() * articles.length); tries++; }
    return i;
  }

  function showIndex(i){
    const a = articles[i];
    // link directly to the post
    el.innerHTML = `<span class="breaking-item"><a href="post.html?id=${a.id}">${a.title}</a></span>`;
    currentIndex = i;
  }

  // show immediately
  showIndex(pickRandomIndex());

  // rotation every 10 minutes
  window.__breakingTickerInterval = setInterval(()=>{
    showIndex(pickRandomIndex());
  }, 10 * 60 * 1000);

  // pause/resume on hover of the ticker container
  const parent = el.parentElement;
  if(parent){
    parent.addEventListener('mouseenter', ()=>{
      if(window.__breakingTickerInterval){ clearInterval(window.__breakingTickerInterval); window.__breakingTickerInterval = null; }
    });
    parent.addEventListener('mouseleave', ()=>{
      if(!window.__breakingTickerInterval){ window.__breakingTickerInterval = setInterval(()=>{ showIndex(pickRandomIndex()); }, 10 * 60 * 1000); }
    });
  }
}

// Auto-run category grid with 4 chosen categories
document.addEventListener('DOMContentLoaded', ()=>{
  const featured = ['Kinh tế','Thế giới','Đời sống','Thể thao'];
  renderCategoryGrid('categoryGrid', featured);
});

// -------- Admin management: list & delete --------
function renderAdminList(){
  const container = document.getElementById('adminList');
  if(!container) return;
  const articles = getArticles();
  if(!articles || articles.length===0){ container.innerHTML = '<p>Chưa có bài viết.</p>'; return; }
  container.innerHTML = articles.map(a=>`<div style="border-bottom:1px solid #eee;padding:8px 0;display:flex;justify-content:space-between;align-items:center"><div><strong>${a.title}</strong><br><small class="meta">${a.category} • ${formatDate(a.updatedAt||a.createdAt||a.date)}</small></div><div><button data-id="${a.id}" class="deleteBtn">Xóa</button></div></div>`).join('');
  container.querySelectorAll('.deleteBtn').forEach(b=>{
    b.addEventListener('click', ()=>{
      const id = Number(b.dataset.id);
      const articles = getArticles();
      const found = articles.find(x=>x.id===id);
      if(!found) return alert('Bài viết không tìm thấy');
      if(confirm(`Bạn có chắc muốn xóa bài: "${found.title}" ?`)){
        const next = articles.filter(x=>x.id!==id);
        localStorage.setItem('articles', JSON.stringify(next));
        renderAdminList();
        // refresh homepage components too
        renderList('articles'); renderLatest('latest'); renderCategoryGrid('categoryGrid', ['Kinh tế','Thế giới','Đời sống','Thể thao']); buildHeroCarousel(); buildBreakingTicker();
      }
    });
  });
}

// render admin list on admin pages
document.addEventListener('DOMContentLoaded', ()=>{ renderAdminList(); });

// -------- Search (site-wide) --------
function performSearch(q){
  const out = document.getElementById('articles');
  if(!out) return;
  const nq = (q||'').toString().trim();
  if(!nq){ renderList('articles'); return; }
  const nquery = nq.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu,'').replace(/[\u0300-\u036f]/g,'');
  const results = getArticles().filter(a=>{
    const hay = ((a.title||'') + ' ' + (a.excerpt||'') + ' ' + (a.content||'') + ' ' + (a.category||'')).toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu,'').replace(/[\u0300-\u036f]/g,'');
    return hay.includes(nquery);
  });
  out.innerHTML = results.length ? results.map(a=>`<div class="item">
      <img src="${a.image}" alt="">
      <div>
        <div class="meta">${a.category} • ${a.date}</div>
        <h3><a href="post.html?id=${a.id}">${a.title}</a></h3>
        <p>${a.excerpt}</p>
        <a class="readmore" href="post.html?id=${a.id}">ĐỌC THÊM</a>
      </div>
    </div>`).join('') : '<p>Không tìm thấy kết quả.</p>';
}

function debounce(fn, wait=300){
  let t;
  return function(...args){ clearTimeout(t); t = setTimeout(()=>fn.apply(this,args), wait); };
}

document.addEventListener('DOMContentLoaded', ()=>{
  const sf = document.getElementById('searchForm');
  const si = document.getElementById('siteSearch');
  const clearBtn = document.getElementById('clearSearch');
  if(sf && si){
    sf.addEventListener('submit', e=>{ e.preventDefault(); performSearch(si.value); });
    si.addEventListener('input', debounce(()=>{ performSearch(si.value); }, 250));
  }
  if(clearBtn && si){ clearBtn.addEventListener('click', ()=>{ si.value=''; renderList('articles'); si.focus();
      // clear active category highlight
      document.querySelectorAll('.category-bar [data-cat]').forEach(a=>a.classList.remove('active'));
      const defaultAnchor = document.querySelector('.category-bar [data-cat="all"]');
      if(defaultAnchor) defaultAnchor.classList.add('active');
    }); }
});

// -------- Export / Import helpers (for admin) --------
function exportArticlesAsJson(){
  const data = JSON.stringify(getArticles(), null, 2);
  const blob = new Blob([data], {type: 'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'articles.json';
  document.body.appendChild(a); a.click(); a.remove();
  URL.revokeObjectURL(url);
}

function generateDataJsContent(){
  const arr = getArticles();
  const body = `// Generated data.js - replace your existing data.js with this file if you want static data\nconst SAMPLE_ARTICLES = ${JSON.stringify(arr, null, 2)};\n\n// Initialize storage if empty\nif (!localStorage.getItem('articles')) {\n  localStorage.setItem('articles', JSON.stringify(SAMPLE_ARTICLES));\n}\n`;
  return body;
}

function downloadDataJsFile(){
  const content = generateDataJsContent();
  const blob = new Blob([content], {type: 'application/javascript'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'data.js';
  document.body.appendChild(a); a.click(); a.remove();
  URL.revokeObjectURL(url);
}

function importJsonFile(file){
  if(!file) return;
  const reader = new FileReader();
  reader.onload = function(e){
    try{
      const arr = JSON.parse(e.target.result);
      if(!Array.isArray(arr)) throw new Error('Invalid format');
      localStorage.setItem('articles', JSON.stringify(arr));
      alert('Import thành công. Trang sẽ reload để cập nhật.');
      window.location.reload();
    }catch(err){
      alert('Không thể import: ' + err.message);
    }
  }
  reader.readAsText(file);
}

// Wire up admin UI (if present)
document.addEventListener('DOMContentLoaded', ()=>{
  const ex = document.getElementById('exportJson');
  const dl = document.getElementById('downloadDataJs');
  const imp = document.getElementById('importFile');
  const preview = document.getElementById('dataJsPreview');
  const copyBtn = document.getElementById('copyDataJs');
  if(ex) ex.addEventListener('click', exportArticlesAsJson);
  if(dl) dl.addEventListener('click', ()=>{ preview.value = generateDataJsContent(); downloadDataJsFile(); });
  if(imp) imp.addEventListener('change', e=>{ importJsonFile(e.target.files[0]); });
  if(preview) preview.value = generateDataJsContent();
  if(copyBtn) copyBtn.addEventListener('click', ()=>{ navigator.clipboard.writeText(preview.value).then(()=>alert('Đã sao chép vào clipboard')); });
});
