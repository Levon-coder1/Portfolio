const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const searchTrigger = document.querySelector('.search-trigger');
let productCache = null;

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
}

if (searchTrigger) {
  searchTrigger.addEventListener('click', () => {
    window.location.href = 'search.html';
  });
}

async function fetchProducts() {
  if (productCache) return productCache;
  const response = await fetch('data/products.json');
  productCache = await response.json();
  return productCache;
}

function formatPrice(value) {
  return `$${value.toLocaleString()}`;
}

function createTagPills(tags = []) {
  return tags
    .map((tag) => `<span class="pill mini" aria-label="${tag}">${tag}</span>`)
    .join('');
}

async function renderCategoryOverview() {
  const wrap = document.getElementById('category-grid');
  if (!wrap) return;

  const products = await fetchProducts();
  const grouped = products.reduce((acc, product) => {
    if (!acc[product.category]) acc[product.category] = [];
    acc[product.category].push(product);
    return acc;
  }, {});

  wrap.innerHTML = Object.entries(grouped)
    .map(([category, items]) => {
      const hero = items[0]?.heroImage || '';
      const previewTags = items[0]?.tags || [];
      return `
      <article class="card">
        <img src="${hero}" alt="${category} preview" loading="lazy" />
        <div class="tag-row">${createTagPills(previewTags)}</div>
        <h3>${category}</h3>
        <p class="lede">${items.length} products ready. Open to view the dedicated page for ${category.toLowerCase()}.</p>
        <div class="tag-row">
          <span class="pill mini">${category}</span>
          <span class="pill mini">${items.length} items</span>
        </div>
        <a class="cta primary" href="category.html?category=${encodeURIComponent(category)}">Open ${category}</a>
      </article>
    `;
    })
    .join('');
}

async function renderCategoryProducts() {
  const grid = document.getElementById('category-products');
  if (!grid) return;
  const params = new URLSearchParams(window.location.search);
  const category = params.get('category') || 'Gadgets';
  const products = await fetchProducts();
  const filtered = products.filter((product) => product.category === category);

  const heading = document.getElementById('category-name');
  const title = document.getElementById('category-heading');
  const count = document.getElementById('category-count');
  if (heading) heading.textContent = `${category} devices`;
  if (title) title.textContent = `${category} line-up`;
  if (count) count.textContent = `${filtered.length} products in this category.`;

  if (!filtered.length) {
    grid.innerHTML = `<p class="lede">No products found for ${category}. Go back to <a class="cta" href="gadgets.html">categories</a>.</p>`;
    return;
  }

  grid.innerHTML = filtered
    .map(
      (product) => `
      <article class="card">
        <img src="${product.heroImage}" alt="${product.name} preview" loading="lazy" />
        <div class="tag-row">${createTagPills(product.tags)}</div>
        <h3>${product.name}</h3>
        <p class="lede">${product.summary}</p>
        <div class="tag-row">
          <span class="pill mini">${product.category}</span>
          <span class="pill mini">${formatPrice(product.price)}</span>
        </div>
        <a class="cta" href="product.html?slug=${product.slug}">Open product page</a>
      </article>
    `
    )
    .join('');
}

async function renderProductDetail() {
  const detail = document.getElementById('product-detail');
  if (!detail) return;
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug');
  const products = await fetchProducts();
  const product = products.find((item) => item.slug === slug) || products[0];

  detail.innerHTML = `
    <div class="glass-card product-media">
      <img src="${product.heroImage}" alt="${product.name}" />
      <div class="tag-row">${createTagPills(product.tags)}</div>
    </div>
    <div class="product-meta">
      <p class="pill mini">${product.category}</p>
      <h2>${product.name}</h2>
      <p class="lede">${product.summary}</p>
      <p><strong>Price:</strong> ${formatPrice(product.price)}</p>
      <div>
        <p><strong>Highlights</strong></p>
        <ul class="spec-list">
          ${product.specs.map((s) => `<li>${s}</li>`).join('')}
        </ul>
      </div>
      <div class="tag-row">
        <a class="cta primary" href="contact.html">Request purchase</a>
        <a class="cta" href="gadgets.html">Back to gadgets</a>
      </div>
    </div>
  `;

  const similarWrap = document.getElementById('similar-products');
  if (similarWrap) {
    const similar = products.filter((item) => product.similar?.includes(item.slug));
    similarWrap.innerHTML = similar
      .map(
        (item) => `
        <article class="card">
          <img src="${item.heroImage}" alt="${item.name}" loading="lazy" />
          <h4>${item.name}</h4>
          <p class="lede">${item.summary}</p>
          <div class="tag-row">
            <span class="pill mini">${item.category}</span>
            <span class="pill mini">${formatPrice(item.price)}</span>
          </div>
          <a class="cta" href="product.html?slug=${item.slug}">View</a>
        </article>
      `
      )
      .join('');
  }
}

function applyFilters(products, filters) {
  return products.filter((product) => {
    const matchesQuery = filters.query
      ? product.name.toLowerCase().includes(filters.query) ||
        product.summary.toLowerCase().includes(filters.query)
      : true;

    const matchesCategory = filters.category ? product.category === filters.category : true;
    const matchesPrice = (() => {
      if (!filters.price) return true;
      if (filters.price === 'under-1200') return product.price < 1200;
      if (filters.price === '1200-2000') return product.price >= 1200 && product.price <= 2000;
      if (filters.price === 'over-2000') return product.price > 2000;
      return true;
    })();

    return matchesQuery && matchesCategory && matchesPrice;
  });
}

async function setupSearchSuggestions() {
  const suggestionList = document.getElementById('search-suggestions');
  const form = document.querySelector('#search-form');
  const input = form?.querySelector('input[name="q"]');
  if (!suggestionList || !input) return;

  const render = (items) => {
    if (!items.length) {
      suggestionList.innerHTML = '<li class="meta">Start typing to see instant matches.</li>';
      return;
    }

    suggestionList.innerHTML = items
      .map(
        (item) => `
        <li>
          <a href="product.html?slug=${item.slug}">${item.name}</a>
          <span class="meta">${item.category} · ${formatPrice(item.price)}</span>
        </li>
      `
      )
      .join('');
  };

  input.addEventListener('input', async () => {
    const query = input.value.trim().toLowerCase();
    const products = await fetchProducts();
    const matches = query
      ? products.filter((product) => product.name.toLowerCase().includes(query)).slice(0, 7)
      : [];
    render(matches);
  });

  input.dispatchEvent(new Event('input'));
}

async function renderSearchResults() {
  const resultsWrap = document.getElementById('search-results');
  if (!resultsWrap) return;
  const params = new URLSearchParams(window.location.search);
  const filters = {
    query: params.get('q')?.toLowerCase() ?? '',
    category: params.get('category') || '',
    price: params.get('price') || '',
  };

  const products = await fetchProducts();
  const filtered = applyFilters(products, filters);

  const meta = document.querySelector('.results-meta');
  if (meta) meta.textContent = `${filtered.length} result${filtered.length === 1 ? '' : 's'}`;

  const form = document.querySelector('#search-form');
  if (form) {
    form.querySelector('input[name="q"]').value = params.get('q') || '';
    form.querySelector('select[name="category"]').value = filters.category;
    form.querySelector('select[name="price"]').value = filters.price;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const q = form.querySelector('input[name="q"]').value;
      const category = form.querySelector('select[name="category"]').value;
      const price = form.querySelector('select[name="price"]').value;
      const searchParams = new URLSearchParams({ q, category, price });
      window.location.search = searchParams.toString();
    });
  }

  resultsWrap.innerHTML = filtered
    .map(
      (product) => `
      <article class="card">
        <img src="${product.heroImage}" alt="${product.name} image" loading="lazy" />
        <h3>${product.name}</h3>
        <p class="lede">${product.summary}</p>
        <div class="tag-row">
          <span class="pill mini">${product.category}</span>
          <span class="pill mini">${formatPrice(product.price)}</span>
        </div>
        <div class="tag-row">${createTagPills(product.tags)}</div>
        <a class="cta" href="product.html?slug=${product.slug}">Open product page</a>
      </article>
    `
    )
    .join('');
}

renderCategoryOverview();
renderCategoryProducts();
renderProductDetail();
renderSearchResults();
setupSearchSuggestions();
