const tiltElements = document.querySelectorAll('[data-tilt]');
const reveals = document.querySelectorAll('.reveal');
const navLinks = document.querySelectorAll('.nav-links a');
const brand = document.querySelector('.brand');
const categoryTabs = document.querySelectorAll('[data-category]');
const productGrid = document.getElementById('product-grid');
const productDetail = document.getElementById('product-detail');
const productPage = document.getElementById('product-page');
const productPageVisual = document.getElementById('product-page-visual');
const productPageCategory = document.getElementById('product-page-category');
const productPagePrice = document.getElementById('product-page-price');
const productPageName = document.getElementById('product-page-name');
const productPageDescription = document.getElementById('product-page-description');
const productPageList = document.getElementById('product-page-list');
const productPageGallery = document.getElementById('product-page-gallery');
const productPageRelated = document.getElementById('product-page-related');
const productPageTags = document.getElementById('product-page-tags');
const categoryDescription = document.getElementById('category-description');
const detailTags = document.getElementById('detail-tags');
const productDataPath = 'data/products.json';

function createGlassImage(title, primary, secondary) {
  const svg = `<svg width="780" height="520" viewBox="0 0 780 520" xmlns="http://www.w3.org/2000/svg">`
    + `<defs>`
    + `<linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">`
    + `<stop stop-color="${primary}" offset="0"/>`
    + `<stop stop-color="${secondary}" offset="1"/>`
    + `</linearGradient>`
    + `<filter id="glow" x="-30%" y="-30%" width="160%" height="160%">`
    + `<feGaussianBlur stdDeviation="32" result="blur"/>`
    + `<feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>`
    + `</filter>`
    + `</defs>`
    + `<rect width="780" height="520" rx="48" fill="#0f0a07" opacity="0.65"/>`
    + `<rect width="720" height="460" x="30" y="30" rx="40" fill="url(%23grad)" opacity="0.68" filter="url(%23glow)"/>`
    + `<circle cx="200" cy="180" r="120" fill="${secondary}" opacity="0.46"/>`
    + `<circle cx="520" cy="300" r="180" fill="${primary}" opacity="0.46"/>`
    + `<rect x="110" y="120" width="560" height="320" rx="34" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.18)"/>`
    + `<text x="135" y="290" fill="rgba(255,255,255,0.9)" font-size="54" font-family="'Space Grotesk', 'Inter', sans-serif" letter-spacing="1" font-weight="700">${title}</text>`
    + `<text x="135" y="338" fill="rgba(255,255,255,0.7)" font-size="22" font-family="'Space Grotesk', 'Inter', sans-serif" letter-spacing="4">Liquid glass edition</text>`
    + `</svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

function handleTilt(event) {
  const rect = this.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width - 0.5) * 12;
  const y = ((event.clientY - rect.top) / rect.height - 0.5) * -12;
  this.style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;
}

function resetTilt() {
  this.style.transform = 'rotateX(0deg) rotateY(0deg)';
}

function registerTilt(el) {
  el.addEventListener('mousemove', handleTilt);
  el.addEventListener('mouseleave', resetTilt);
}

tiltElements.forEach(registerTilt);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

reveals.forEach((section) => observer.observe(section));

const scrollLinks = Array.from(document.querySelectorAll('a[href^="#"]')).filter(
  (link) => !link.getAttribute('href').startsWith('#/')
);
scrollLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href.length > 1) {
      e.preventDefault();
      history.replaceState(null, '', href);
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

const nav = document.querySelector('.nav');
const navToggle = document.querySelector('.nav-toggle');

navToggle?.addEventListener('click', () => {
  nav?.classList.toggle('open');
});

nav?.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => nav?.classList.remove('open'));
});

function setBackgroundImage(node, product) {
  if (!node || !product) return;
  const { imageUrl, imageColors, name } = product;
  const url = imageUrl || (imageColors ? createGlassImage(name, imageColors.primary, imageColors.secondary) : '');
  if (url) {
    node.style.backgroundImage = `url(${url})`;
    node.classList.remove('shimmer');
  }
}

function renderPills(container, items, className = 'pill mini') {
  if (!container) return;
  container.innerHTML = '';
  (items || []).forEach((item) => {
    const pill = document.createElement('span');
    pill.className = className + ' tag';
    pill.textContent = item;
    container.appendChild(pill);
  });
}

function renderList(container, items) {
  if (!container) return;
  container.innerHTML = '';
  (items || []).forEach((item) => {
    const li = document.createElement('li');
    li.textContent = item;
    container.appendChild(li);
  });
}

function renderRelated(container, related, index) {
  if (!container) return;
  container.innerHTML = '';
  (related || []).forEach((slug) => {
    const relatedProduct = index.get(slug);
    if (!relatedProduct) return;
    const link = document.createElement('span');
    link.className = 'pill mini translucent';
    link.textContent = relatedProduct.name;
    container.appendChild(link);
  });
}

function createCard(product, categoryLabel, onSelect) {
  const card = document.createElement('article');
  card.className = 'product-card shimmer';
  card.setAttribute('data-tilt', '');

  const media = document.createElement('div');
  media.className = 'product-card__media';
  setBackgroundImage(media, product);

  const body = document.createElement('div');
  body.className = 'product-card__body';

  const badge = document.createElement('div');
  badge.className = 'badge';
  badge.textContent = categoryLabel;

  const title = document.createElement('h4');
  title.textContent = product.name;

  const price = document.createElement('p');
  price.className = 'small';
  price.textContent = product.price;

  const summary = document.createElement('p');
  summary.className = 'muted';
  summary.textContent = product.summary;

  body.appendChild(title);
  body.appendChild(price);
  body.appendChild(summary);
  media.appendChild(badge);
  card.appendChild(media);
  card.appendChild(body);

  card.addEventListener('click', () => onSelect(product));
  registerTilt(card);

  return card;
}

function renderProductDetail(product, context) {
  if (!productDetail || !product) return;

  const detailTitle = productDetail.querySelector('.detail-title');
  const detailPrice = productDetail.querySelector('.detail-price');
  const detailMeta = productDetail.querySelector('.detail-meta');
  const detailMedia = productDetail.querySelector('.detail-media');
  const detailGallery = productDetail.querySelector('.detail-gallery');
  const detailList = productDetail.querySelector('.detail-list');
  const detailShipping = productDetail.querySelector('.detail-meta.shipping');
  const detailRelated = productDetail.querySelector('.detail-related');

  productDetail.querySelector('.pill')?.classList.remove('translucent');
  productDetail.querySelector('.pill')?.classList.add('primary');

  detailTitle.textContent = product.name;
  detailPrice.textContent = product.price;
  detailMeta.textContent = product.summary;
  detailShipping.textContent = product.shipping;

  renderPills(detailTags, product.tags || []);
  renderPills(detailGallery, product.gallery || [], 'pill mini translucent');
  renderList(detailList, product.specs || []);
  renderRelated(detailRelated, product.related, context.index);
  setBackgroundImage(detailMedia, product);
}

function renderProductPage(product, context) {
  if (!productPage || !product) return;
  const { categoryLabel, index } = context;

  productPageCategory.textContent = categoryLabel;
  productPagePrice.textContent = `${product.price} · ${product.shipping}`;
  productPageName.textContent = product.name;
  productPageDescription.textContent = product.summary;

  renderList(productPageList, product.specs || []);
  renderPills(productPageGallery, product.gallery || [], 'pill mini translucent');
  renderPills(productPageTags, product.tags || []);
  renderRelated(productPageRelated, product.related, index);
  setBackgroundImage(productPageVisual, product);
}

async function initCatalog() {
  if (!productGrid && !productPage) return;

  let catalog;
  try {
    const response = await fetch(productDataPath);
    catalog = await response.json();
  } catch (error) {
    console.error('Failed to load product data', error);
    return;
  }

  const categories = catalog?.categories || [];
  if (!categories.length) return;

  const productIndex = new Map();
  categories.forEach((category) => {
    category.products.forEach((product) => {
      productIndex.set(product.slug, { ...product, categoryLabel: category.label, categoryId: category.id });
    });
  });

  function handleCategoryChange(categoryId) {
    const category = categories.find((c) => c.id === categoryId) || categories[0];
    if (!category) return;

    categoryTabs.forEach((tab) => tab.classList.toggle('active', tab.dataset.category === category.id));
    if (categoryDescription) {
      categoryDescription.textContent = category.description;
    }

    productGrid.innerHTML = '';
    category.products.forEach((product) => {
      const card = createCard(product, category.label, (selected) => {
        renderProductDetail(selected, { index: productIndex });
        renderProductPage(selected, { categoryLabel: category.label, index: productIndex });
      });
      productGrid.appendChild(card);
    });

    if (category.products.length) {
      const [firstProduct] = category.products;
      renderProductDetail(firstProduct, { index: productIndex });
      renderProductPage(firstProduct, { categoryLabel: category.label, index: productIndex });
    }
  }

  categoryTabs.forEach((tab) => {
    tab.addEventListener('click', () => handleCategoryChange(tab.dataset.category));
  });

  handleCategoryChange(categories[0].id);
}

initCatalog();
