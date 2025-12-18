const tiltElements = document.querySelectorAll('[data-tilt]');
const reveals = document.querySelectorAll('.reveal');
const navLinks = document.querySelectorAll('.nav-links a');
const brand = document.querySelector('.brand');
const categoryTabs = document.querySelectorAll('[data-category]');
const productGrid = document.getElementById('product-grid');
const productPage = document.getElementById('product-page');
const productPageVisual = document.getElementById('product-page-visual');
const productPageCategory = document.getElementById('product-page-category');
const productPagePrice = document.getElementById('product-page-price');
const productPageSubtitle = document.getElementById('product-page-subtitle');
const productPageName = document.getElementById('product-page-name');
const productPageDescription = document.getElementById('product-page-description');
const productPageList = document.getElementById('product-page-list');
const productPageGallery = document.getElementById('product-page-gallery');
const productPageRelated = document.getElementById('product-page-related');
const productPageTags = document.getElementById('product-page-tags');
const categoryDescription = document.getElementById('category-description');
const searchInput = document.getElementById('catalog-search');
const clearSearchButton = document.getElementById('clear-search');
const categoryFilter = document.getElementById('filter-category');
const priceFilter = document.getElementById('filter-price');
const priceDisplay = document.getElementById('filter-price-display');
const priceMin = document.getElementById('filter-price-min');
const priceMax = document.getElementById('filter-price-max');
const tagFilterContainer = document.getElementById('filter-tags');
const resultsTitle = document.getElementById('results-title');
const resultsSubtitle = document.getElementById('results-subtitle');
const resultsHeader = document.getElementById('results-header');
const resetFiltersButton = document.getElementById('reset-filters');

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

const gadgetCatalog = {
  phones: {
    label: 'Phones',
    description: 'Flagship devices tuned for camera work, travel, and creator stacks.',
    products: [
      {
        slug: 'pixel-pro',
        name: 'Pixel Pro 9',
        price: '$1,099 · 256GB',
        shipping: '3-5 days, sealed or tuned with your app kit',
        summary: 'Tensor-powered flagship with cinematic video presets and calibrated OLED.',
        tags: ['android', 'camera', 'travel'],
        gallery: ['Warm Amber', 'Graphite Mist', 'Porcelain'],
        details: [
          '50MP main + 5x telephoto; natural HDR with mobile LUTs installed',
          'Unlocked dual-SIM with travel eSIM setup and battery health report',
          'Delivered with tempered glass + slim clear and sport cases',
        ],
        related: ['iphone-pro', 'galaxy-s24'],
        image: createGlassImage('Pixel Pro 9', '#ff7a18', '#202033'),
      },
      {
        slug: 'iphone-pro',
        name: 'iPhone 15 Pro Max',
        price: '$1,199 · 512GB',
        shipping: 'Next-day courier available in select cities',
        summary: 'Titanium build, 5x tetraprism zoom, and ProRes log capture out of the box.',
        tags: ['ios', 'camera', 'creator'],
        gallery: ['Natural Titanium', 'Blue Titanium', 'White'],
        details: [
          'Color science tuned for social-first exports and LUT-ready delivery',
          'MagSafe kit + glass install with warranty-friendly handoff',
          'iCloud and Google Drive migration concierge included',
        ],
        related: ['pixel-pro', 'xperia-1vi'],
        image: createGlassImage('iPhone 15 Pro Max', '#c7b9a6', '#1b1c22'),
      },
      {
        slug: 'galaxy-s24',
        name: 'Galaxy S24 Ultra',
        price: '$1,299 · 512GB',
        shipping: 'Insured shipping with camera tuning and Spigen case',
        summary: '200MP camera with ExpertRAW presets, vivid LTPO screen, S Pen in-box.',
        tags: ['android', 'camera', 'productivity'],
        gallery: ['Titan Gray', 'Onyx Black'],
        details: [
          'Snapdragon for Galaxy with performance + battery profiles set',
          'ExpertRAW + Lightroom presets installed for crisp night shots',
          'Aramid fiber and clear kickstand cases included',
        ],
        related: ['iphone-pro', 'pixel-pro'],
        image: createGlassImage('Galaxy S24 Ultra', '#2f2b38', '#9e7cff'),
      },
      {
        slug: 'oneplus-12',
        name: 'OnePlus 12',
        price: '$899 · 256GB',
        shipping: '2-4 days with Warp charge kit',
        summary: 'Snapdragon 8 Gen 3, bright 120Hz OLED, Hasselblad-tuned colors.',
        tags: ['android', 'fast-charge', 'gaming'],
        gallery: ['Flowy Emerald', 'Silky Black'],
        details: [
          'OxygenOS streamlined with creator tools and Zen mode focus setup',
          '100W charger + spare cable and matte protector installed',
          'Gaming mode toggles mapped with haptics tuned',
        ],
        related: ['galaxy-s24', 'pixel-pro'],
        image: createGlassImage('OnePlus 12', '#61f4b8', '#0f1820'),
      },
      {
        slug: 'xperia-1vi',
        name: 'Sony Xperia 1 VI',
        price: '$1,199 · 256GB',
        shipping: 'Ships in 3-5 days with CineAlta presets',
        summary: 'True 4K OLED, pro manual cameras, and Hi-Res audio with LDAC.',
        tags: ['android', '4k', 'hi-res-audio'],
        gallery: ['Khaki Green', 'Black'],
        details: [
          'Cinema Pro and Photo Pro dialed with LUTs + shutter button tuning',
          'Hi-Res playlists + LDAC headphone pairing at handoff',
          'Glass screen protector installed with lanyard-ready case',
        ],
        related: ['iphone-pro'],
        image: createGlassImage('Xperia 1 VI', '#94a58a', '#0a0f0a'),
      },
      {
        slug: 'nothing-2a',
        name: 'Nothing Phone 2a',
        price: '$499 · 256GB',
        shipping: 'Fast dispatch with glyph automation setup',
        summary: 'Playful transparent design, solid cameras, and glyph lighting presets.',
        tags: ['android', 'budget', 'design-forward'],
        gallery: ['Milk', 'Black'],
        details: [
          'Glyph lights mapped to focus, delivery, and productivity cues',
          'Minimal bloat setup with curated app stack and privacy tweaks',
          'Comes with clear case, film protector, and USB-C cable',
        ],
        related: ['oneplus-12'],
        image: createGlassImage('Nothing Phone 2a', '#ffffff', '#0c0c0c'),
      },
    ],
  },
  laptops: {
    label: 'Laptops',
    description: 'Creator-grade rigs with calibrated displays, tuned thermals, and quiet performance.',
    products: [
      {
        slug: 'macbook-pro',
        name: 'MacBook Pro 16" M3 Max',
        price: '$3,699 · 64GB / 1TB',
        shipping: 'Priority insured shipping with photo proof + setup call',
        summary: 'Apple Silicon speed with 120Hz XDR and preloaded creative suite shortcuts.',
        tags: ['macos', 'creator', 'performance'],
        gallery: ['Space Black', 'Silver'],
        details: [
          'Color-calibrated XDR profile and reference modes configured',
          'Clamshell + external monitor performance profiles pre-set',
          'Includes USB-C hub, braided USB-C cables, and quiet cooling pad',
        ],
        related: ['zephyrus-g16', 'razer-blade'],
        image: createGlassImage('MacBook Pro 16"', '#1f1c2c', '#d9d9d9'),
      },
      {
        slug: 'zephyrus-g16',
        name: 'ROG Zephyrus G16 OLED',
        price: '$2,299 · RTX 4080',
        shipping: '2-4 days with stress test reports',
        summary: 'Ultra-thin gaming/creator hybrid with G-Sync OLED and studio-ready acoustics.',
        tags: ['windows', 'gaming', 'oled'],
        gallery: ['Nebula Gray'],
        details: [
          'GPU/CPU undervolt and fan curve tuned for balanced thermals',
          'DaVinci Resolve + Blender profiles installed with hotkeys',
          'Comes with low-latency 2.4GHz mouse and coiled keyboard cable',
        ],
        related: ['macbook-pro', 'xps-15'],
        image: createGlassImage('Zephyrus G16', '#7f8cff', '#12121a'),
      },
      {
        slug: 'razer-blade',
        name: 'Razer Blade 15 OLED',
        price: '$2,499 · RTX 4070',
        shipping: 'Ships with thermals tuned + matte screen guard installed',
        summary: 'Slim aluminum chassis, per-key RGB, and calibrated OLED for edits and play.',
        tags: ['windows', 'gaming', 'rgb'],
        gallery: ['Shadow Black'],
        details: [
          'Synapse profiles balanced for whisper, creator, and turbo modes',
          'RGB set to subtle studio-safe glow with per-app triggers',
          'Includes USB-C dock, slim charger, and microfiber kit',
        ],
        related: ['zephyrus-g16'],
        image: createGlassImage('Razer Blade 15', '#00ffbd', '#0b0f0f'),
      },
      {
        slug: 'xps-15',
        name: 'Dell XPS 15 OLED',
        price: '$2,099 · 32GB / 1TB',
        shipping: 'Calibrated and delivered with Windows Studio setup',
        summary: 'Borderless OLED, Adobe-tuned color profiles, and quiet performance.',
        tags: ['windows', 'oled', 'creator'],
        gallery: ['Platinum'],
        details: [
          'Fresh Windows build with minimal bloat + driver validation',
          'Adobe Suite shortcuts, VPN, and cloud sync staged',
          'Includes USB-C hub and Thunderbolt SSD enclosure',
        ],
        related: ['macbook-pro'],
        image: createGlassImage('XPS 15 OLED', '#d4e2ff', '#0e1520'),
      },
      {
        slug: 'spectre-x360',
        name: 'HP Spectre x360 14',
        price: '$1,699 · Evo platform',
        shipping: '3-6 days with pen + sleeve bundle',
        summary: 'Convertible elegance with OLED touch, long battery, and stylus-ready hinge.',
        tags: ['convertible', 'pen', 'premium'],
        gallery: ['Nightfall Black', 'Nocturne Blue'],
        details: [
          'Two-in-one modes tuned with pen shortcuts + note templates',
          'Windows Hello + privacy switches set and verified',
          'Includes pen tips, folio sleeve, and spare charger',
        ],
        related: ['xps-15'],
        image: createGlassImage('Spectre x360', '#2c1c3a', '#caa7ff'),
      },
      {
        slug: 'framework-13',
        name: 'Framework 13 DIY',
        price: '$1,399 · Modular',
        shipping: 'Ships in 4-7 days with expansion cards of your choice',
        summary: 'Repairable, modular laptop tuned for dev and travel simplicity.',
        tags: ['modular', 'diy', 'developer'],
        gallery: ['Modular Silver'],
        details: [
          'RAM/SSD installed + BIOS tuned for battery and quiet cooling',
          'Expansion cards picked for your ports; spare screws included',
          'Linux/Windows dual-boot setup available on request',
        ],
        related: ['macbook-pro'],
        image: createGlassImage('Framework 13', '#d9ffea', '#1c1f24'),
      },
    ],
  },
  accessories: {
    label: 'Accessories',
    description: 'Polished essentials that keep your devices protected, powered, and ready.',
    products: [
      {
        slug: 'aurora-buds',
        name: 'Aurora ANC Buds',
        price: '$249',
        shipping: 'Ships within 48 hours with fit kit',
        summary: 'Dual drivers, adaptive ANC, and spatial audio for iOS and Android.',
        tags: ['audio', 'anc', 'wireless'],
        gallery: ['Frost White', 'Obsidian'],
        details: [
          'Wireless + USB-C fast charge case with 36h total battery',
          'Ear fit calibration and EQ tuning during handoff',
          'Includes silicone + foam tips and magnetic cable clip',
        ],
        related: ['halo-watch', 'arc-charger'],
        image: createGlassImage('Aurora ANC Buds', '#f7f8ff', '#0f111c'),
      },
      {
        slug: 'arc-charger',
        name: 'Arc Wireless Charger',
        price: '$119',
        shipping: '3-5 days with cable kit',
        summary: '15W MagSafe-compatible stand with soft-touch glass and LED breathing ring.',
        tags: ['charging', 'desk', 'magsafe'],
        gallery: ['Cloud', 'Midnight'],
        details: [
          'Supports iPhone/Android + Qi2 with auto-alignment magnets',
          'Detachable braided USB-C + 30W GaN brick included',
          'LED ring uses ambient light sensor for night-friendly glow',
        ],
        related: ['aurora-buds', 'lumen-cable'],
        image: createGlassImage('Arc Charger', '#c3d8ff', '#0b1020'),
      },
      {
        slug: 'halo-watch',
        name: 'Halo Health Watch',
        price: '$329',
        shipping: 'Priority courier with strap sizing kit',
        summary: 'AMOLED wearable with dual-band GPS, HRV tracking, and week-long battery.',
        tags: ['wearable', 'health', 'gps'],
        gallery: ['Sandstone', 'Slate'],
        details: [
          'Preloaded with sleep coaching, strength plans, and NFC wallet',
          'Metal + fluoroelastomer straps sized and fitted at delivery',
          'Includes tempered glass protector and wireless puck',
        ],
        related: ['aurora-buds'],
        image: createGlassImage('Halo Watch', '#ffd3b6', '#1b0f0f'),
      },
      {
        slug: 'aero-pack',
        name: 'Aero Tech Backpack',
        price: '$189',
        shipping: 'Ships in 2-3 days with dust bag',
        summary: 'Weatherproof 24L pack with laptop cradle, cable bay, and hidden AirTag slot.',
        tags: ['carry', 'travel', 'organizer'],
        gallery: ['Jet Black', 'Fog Gray'],
        details: [
          'Fits 16" laptops, cameras, and tablet; structured to stand upright',
          'Cable/charger bay with magnetic door and label set',
          'Luggage passthrough + breathable straps tuned for travel',
        ],
        related: ['arc-charger'],
        image: createGlassImage('Aero Pack', '#d7dee7', '#0c0f12'),
      },
      {
        slug: 'lumen-cable',
        name: 'Lumen Weave Cable Set',
        price: '$69',
        shipping: '24h dispatch; set of 3 braided lengths',
        summary: 'Glowing braided USB-C/Lightning set with 100W support and soft glass sheen.',
        tags: ['cables', 'lighting', 'usb-c'],
        gallery: ['Frost Glow', 'Obsidian'],
        details: [
          'Includes 1m, 2m, and 3m lengths with cable wraps',
          'LED breathing ends to find cables in dark studios',
          'Kevlar-weave with gentle curve memory to stay tidy',
        ],
        related: ['arc-charger'],
        image: createGlassImage('Lumen Cable Set', '#f0f5ff', '#0e1b2f'),
      },
      {
        slug: 'glide-stand',
        name: 'Glide Laptop Stand',
        price: '$129',
        shipping: '3-5 days with padded sleeve',
        summary: 'Polished aluminum stand with glass inlays and 18° ergonomic lift.',
        tags: ['desk', 'ergonomic', 'laptop'],
        gallery: ['Ice Silver', 'Ink'],
        details: [
          'Holds 16" laptops securely with silicone rail and cable pass-through',
          'Glass inlay with anti-fingerprint coating for clean desk aesthetic',
          'Folds flat; includes microfiber and travel sleeve',
        ],
        related: ['macbook-pro'],
        image: createGlassImage('Glide Stand', '#cbd8ff', '#0f172a'),
      },
    ],
  },
  tablets: {
    label: 'Tabs',
    description: 'Portable canvases for sketching, note-taking, and on-the-go edit passes.',
    products: [
      {
        slug: 'ipad-pro',
        name: 'iPad Pro 13" M4',
        price: '$1,499 · 512GB',
        shipping: 'Next-day dispatch with folio + pencil options',
        summary: 'OLED tandem display with Pencil Pro and Stage Manager tuned for multitask.',
        tags: ['tablet', 'oled', 'pencil'],
        gallery: ['Silver', 'Space Black'],
        details: [
          'Paperlike matte protector installed on request',
          'Shortcuts, Procreate brushes, and note templates preloaded',
          'Magic Keyboard + Pencil pairing and warranty guidance',
        ],
        related: ['tab-s9', 'ipad-air'],
        image: createGlassImage('iPad Pro 13"', '#f6f4ff', '#0c0c12'),
      },
      {
        slug: 'tab-s9',
        name: 'Galaxy Tab S9 Ultra',
        price: '$1,299 · 512GB',
        shipping: '3-6 days with rugged case option',
        summary: '14.6" Dynamic AMOLED with S Pen in-box and DeX desktop presets.',
        tags: ['tablet', 'android', 's-pen'],
        gallery: ['Graphite'],
        details: [
          'Color-calibrated for sketching and video color checks',
          'Samsung Notes + GoodNotes setup with cloud sync tuned',
          'Keyboard cover + 45W charger bundle available',
        ],
        related: ['ipad-pro'],
        image: createGlassImage('Tab S9 Ultra', '#a4b5ff', '#0d1623'),
      },
      {
        slug: 'ipad-air',
        name: 'iPad Air 13"',
        price: '$899 · 256GB',
        shipping: 'Ships within 72 hours with Smart Folio',
        summary: 'M2 power in an ultra-thin chassis with vivid Liquid Retina display.',
        tags: ['tablet', 'lightweight', 'pencil'],
        gallery: ['Blue', 'Starlight'],
        details: [
          'Stage Manager + split view shortcuts pre-mapped',
          'Paperlike or gloss protector installed at handoff',
          'Bundle options with Pencil USB-C and Bluetooth keyboard',
        ],
        related: ['ipad-pro'],
        image: createGlassImage('iPad Air 13"', '#c8e5ff', '#0d1322'),
      },
      {
        slug: 'surface-pro',
        name: 'Surface Pro 10',
        price: '$1,199 · Copilot+ PC',
        shipping: 'Ships in 3-5 days with keyboard cover',
        summary: 'OLED Copilot+ 2-in-1 with studio mics, sharp webcam, and pen layer.',
        tags: ['tablet', 'windows', '2-in-1'],
        gallery: ['Platinum', 'Black'],
        details: [
          'Fresh Windows build with Studio Effects tuned for calls',
          'Pen, keyboard, and color profiles calibrated for editing',
          'Clip Studio and OneNote layouts ready to go',
        ],
        related: ['tab-s9'],
        image: createGlassImage('Surface Pro 10', '#d8d8ff', '#0f0f1a'),
      },
      {
        slug: 'lenovo-p12',
        name: 'Lenovo Tab P12 Pro',
        price: '$749 · 256GB',
        shipping: '4-7 days with folio + pen kit',
        summary: 'OLED entertainment and sketch tablet with slim metal build.',
        tags: ['tablet', 'android', 'entertainment'],
        gallery: ['Storm Gray'],
        details: [
          'Pen latency tuned; custom shortcuts for sketching apps',
          'Dolby Vision / Atmos profiles ready for media nights',
          'Bundled with keyboard cover and tempered glass',
        ],
        related: ['ipad-air'],
        image: createGlassImage('Lenovo P12 Pro', '#c7d2ff', '#0c111f'),
      },
      {
        slug: 'remarkable-2',
        name: 'reMarkable 2 Studio',
        price: '$649 · Bundle',
        shipping: 'Ships within 5 days with folio and Marker Plus',
        summary: 'Paper-feel e-ink tablet for deep work and note capture.',
        tags: ['e-ink', 'focus', 'note-taking'],
        gallery: ['Cloud Gray'],
        details: [
          'Templates, notebooks, and cloud sync configured',
          'Marker tips + folio installed; handwriting OCR enabled',
          'Focus mode layouts for distraction-free sessions',
        ],
        related: ['lenovo-p12'],
        image: createGlassImage('reMarkable 2', '#f1f1f1', '#111111'),
      },
    ],
  },
};

const DEBOUNCE_DELAY = 220;
let searchTimeout;
let activeProductSlug = '';

function priceToNumber(price) {
  const match = price.match(/\$([\d,]+)/);
  if (!match) return 0;
  return parseInt(match[1].replace(/,/g, ''), 10);
}

function formatPrice(value) {
  return `$${value.toLocaleString()}`;
}

const allProducts = Object.entries(gadgetCatalog).flatMap(([categoryKey, category]) =>
  category.products.map((product) => ({
    ...product,
    category: categoryKey,
    categoryLabel: category.label,
    priceValue: priceToNumber(product.price),
  }))
);

const priceValues = allProducts.map((item) => item.priceValue);
const minPriceValue = Math.min(...priceValues);
const maxPriceValue = Math.max(...priceValues);

const searchState = {
  query: '',
  category: 'all',
  maxPrice: maxPriceValue,
  tags: new Set(),
};

function updateCategoryDescription(categoryKey) {
  if (!categoryDescription) return;
  if (categoryKey === 'all') {
    categoryDescription.textContent = 'Filter across every product line, from phones and laptops to accessories and tabs.';
    return;
  }
  categoryDescription.textContent = gadgetCatalog[categoryKey]?.description || 'Explore curated hardware stacks ready to ship.';
}

function setActiveCategory(categoryKey) {
  searchState.category = categoryKey;
  if (categoryFilter) {
    categoryFilter.value = categoryKey;
  }
  categoryTabs.forEach((tab) => {
    tab.classList.toggle('active', tab.dataset.category === categoryKey);
  });
  updateCategoryDescription(categoryKey);
}

function createProductCard(product) {
  const card = document.createElement('article');
  card.className = 'product-card';
  card.tabIndex = 0;
  card.innerHTML = `
    <div class="product-card__media" style="background-image: url('${product.image}')">
      <span class="badge">${product.categoryLabel}</span>
    </div>
    <div class="product-card__body">
      <div>
        <p class="small muted">${product.price}</p>
        <h3>${product.name}</h3>
        <p class="muted">${product.summary}</p>
      </div>
      <div class="tagline-row">${product.tags
        .slice(0, 3)
        .map((tag) => `<span class="pill mini translucent">${tag}</span>`)
        .join('')}</div>
    </div>
  `;

  const open = () => openProduct(product);
  card.addEventListener('click', open);
  card.addEventListener('keypress', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      open();
    }
  });

  return card;
}

function renderProductDetail(product) {
  if (!product || !productDetail) return;
  activeProductSlug = product.slug;
  productDetail.querySelector('.pill')?.classList.remove('mini');
  const detailTitle = productDetail.querySelector('.detail-title');
  const detailPrice = productDetail.querySelector('.detail-price');
  const detailMeta = productDetail.querySelector('.detail-meta');
  const detailVisual = productDetail.querySelector('.detail-media');
  const detailGallery = productDetail.querySelector('.detail-gallery');
  const detailList = productDetail.querySelector('.detail-list');
  const detailShipping = productDetail.querySelector('.detail-meta.shipping');
  const detailRelated = productDetail.querySelector('.detail-related');

  if (detailTitle) detailTitle.textContent = product.name;
  if (detailPrice) detailPrice.textContent = product.price;
  if (detailMeta) detailMeta.textContent = product.summary;
  if (detailVisual) {
    detailVisual.classList.remove('shimmer');
    detailVisual.style.backgroundImage = `url('${product.image}')`;
  }
  if (detailGallery) {
    detailGallery.innerHTML = '';
    product.gallery.forEach((item) => {
      const chip = document.createElement('span');
      chip.className = 'gallery-chip';
      chip.textContent = item;
      detailGallery.appendChild(chip);
    });
  }
  if (detailList) {
    detailList.innerHTML = '';
    product.details.forEach((detail) => {
      const li = document.createElement('li');
      li.textContent = detail;
      detailList.appendChild(li);
    });
  }
  if (detailShipping) {
    detailShipping.textContent = product.shipping;
  }
  if (detailRelated) {
    detailRelated.innerHTML = '';
    if (product.related?.length) {
      const chipRow = document.createElement('div');
      chipRow.className = 'related-chips';
      product.related.forEach((slug) => {
        const target = allProducts.find((item) => item.slug === slug);
        if (!target) return;
        const button = document.createElement('button');
        button.className = 'pill mini link-chip';
        button.type = 'button';
        button.textContent = target.name;
        button.addEventListener('click', () => openProduct(target));
        chipRow.appendChild(button);
      });
      detailRelated.appendChild(chipRow);
    }
  }
}

function renderProductPage(product) {
  if (
    !product ||
    !productPage ||
    !productPageVisual ||
    !productPageCategory ||
    !productPagePrice ||
    !productPageName ||
    !productPageDescription ||
    !productPageList ||
    !productPageGallery ||
    !productPageRelated
  ) {
    return;
  }
  productPage.classList.add('open');
  productPageVisual.style.backgroundImage = `url('${product.image}')`;
  productPageCategory.textContent = product.categoryLabel;
  productPagePrice.textContent = product.price;
  productPageName.textContent = product.name;
  productPageDescription.textContent = product.summary;
  productPageList.innerHTML = '';
  product.details.forEach((detail) => {
    const li = document.createElement('li');
    li.textContent = detail;
    productPageList.appendChild(li);
  });
  productPageGallery.innerHTML = '';
  product.gallery.forEach((entry) => {
    const tag = document.createElement('span');
    tag.className = 'pill mini';
    tag.textContent = entry;
    productPageGallery.appendChild(tag);
  });
  productPageRelated.innerHTML = '';
  product.related.forEach((slug) => {
    const target = allProducts.find((item) => item.slug === slug);
    if (!target) return;
    const chip = document.createElement('button');
    chip.className = 'pill mini link-chip';
    chip.type = 'button';
    chip.textContent = target.name;
    chip.addEventListener('click', () => openProduct(target));
    productPageRelated.appendChild(chip);
  });
}

function openProduct(product) {
  renderProductDetail(product);
  renderProductPage(product);
}

function renderProducts(products) {
  if (!productGrid) return;
  productGrid.innerHTML = '';
  if (!products.length) {
    productGrid.innerHTML = `
      <div class="empty-state">
        <p class="eyebrow">No matches</p>
        <h3>Nothing matched your filters.</h3>
        <p class="muted">Try clearing tags, widening the price range, or searching for a simpler term.</p>
      </div>
    `;
    return;
  }

  products.forEach((product) => productGrid.appendChild(createProductCard(product)));
}

function updateResultsCopy(products) {
  if (!resultsTitle || !resultsSubtitle) return;
  if (!products.length) {
    resultsTitle.textContent = 'No gadgets found';
    resultsSubtitle.textContent = 'Adjust the search term or filters to rediscover the catalog.';
    return;
  }
  resultsTitle.textContent = `${products.length} gadget${products.length === 1 ? '' : 's'} match your filters`;
  const activeTags = Array.from(searchState.tags);
  const tagText = activeTags.length ? `Tags: ${activeTags.join(', ')}.` : '';
  const priceText = `Showing picks up to ${formatPrice(searchState.maxPrice)}.`;
  resultsSubtitle.textContent = `${priceText} ${tagText}`.trim();
}

function isSearching() {
  return (
    !!searchState.query ||
    searchState.category !== 'all' ||
    searchState.tags.size > 0 ||
    searchState.maxPrice < maxPriceValue
  );
}

function toggleResultsRoute(pushRoute = true) {
  const searching = isSearching();
  resultsHeader?.classList.toggle('active', searching);
  const targetHash = searching ? '#/gadgets/results' : '#/gadgets';
  if (pushRoute && location.hash !== targetHash) {
    history.replaceState(null, '', targetHash);
  }
}

function runSearch({ pushRoute = true } = {}) {
  const query = searchState.query.toLowerCase();
  const filtered = allProducts.filter((product) => {
    const matchesCategory = searchState.category === 'all' || product.category === searchState.category;
    const matchesPrice = product.priceValue <= searchState.maxPrice;
    const matchesTags =
      searchState.tags.size === 0 || Array.from(searchState.tags).every((tag) => product.tags.includes(tag));
    const haystack = `${product.name} ${product.summary} ${product.details.join(' ')} ${product.tags.join(' ')}`.toLowerCase();
    const matchesQuery = !query || haystack.includes(query);
    return matchesCategory && matchesPrice && matchesTags && matchesQuery;
  });

  renderProducts(filtered);
  updateResultsCopy(filtered);
  toggleResultsRoute(pushRoute);

  if (filtered.length) {
    const existingSelection = filtered.find((item) => item.slug === activeProductSlug) || filtered[0];
    openProduct(existingSelection);
  }
}

function updatePriceDisplay(value) {
  if (!priceDisplay) return;
  priceDisplay.textContent = `Up to ${formatPrice(value)}`;
}

function hydrateFilters() {
  if (priceFilter) {
    priceFilter.min = minPriceValue;
    priceFilter.max = maxPriceValue;
    priceFilter.value = maxPriceValue;
    if (priceMin) priceMin.textContent = formatPrice(minPriceValue);
    if (priceMax) priceMax.textContent = formatPrice(maxPriceValue);
    updatePriceDisplay(maxPriceValue);
  }

  if (tagFilterContainer) {
    const availableTags = Array.from(new Set(allProducts.flatMap((item) => item.tags))).sort();
    availableTags.forEach((tag) => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'pill mini link-chip';
      chip.textContent = tag;
      chip.addEventListener('click', () => {
        if (searchState.tags.has(tag)) {
          searchState.tags.delete(tag);
          chip.classList.remove('active');
        } else {
          searchState.tags.add(tag);
          chip.classList.add('active');
        }
        runSearch();
      });
      tagFilterContainer.appendChild(chip);
    });
  }
}

function resetFilters() {
  searchState.query = '';
  searchState.category = 'all';
  searchState.maxPrice = maxPriceValue;
  searchState.tags.clear();
  if (searchInput) searchInput.value = '';
  if (priceFilter) priceFilter.value = maxPriceValue;
  if (categoryFilter) categoryFilter.value = 'all';
  updatePriceDisplay(maxPriceValue);
  tagFilterContainer?.querySelectorAll('.link-chip').forEach((chip) => chip.classList.remove('active'));
  categoryTabs.forEach((tab) => tab.classList.remove('active'));
  updateCategoryDescription('all');
  runSearch();
}

function syncRouteOnLoad() {
  if (location.hash.includes('/gadgets/results')) {
    toggleResultsRoute(false);
  }
}

hydrateFilters();
updateCategoryDescription('all');
runSearch({ pushRoute: false });
syncRouteOnLoad();

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
const navLinksContainer = nav?.querySelector('.nav-links');

navToggle?.addEventListener('click', () => {
  const isOpen = nav?.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

navLinksContainer?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav?.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 768 && nav?.classList.contains('open')) {
    nav.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  }
});

categoryTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const category = tab.dataset.category;
    setActiveCategory(category);
    runSearch();
  });
});

categoryFilter?.addEventListener('change', (event) => {
  setActiveCategory(event.target.value);
  runSearch();
});

priceFilter?.addEventListener('input', (event) => {
  const value = Number(event.target.value);
  searchState.maxPrice = value;
  updatePriceDisplay(value);
  runSearch();
});

searchInput?.addEventListener('input', (event) => {
  const value = event.target.value;
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    searchState.query = value.trim();
    runSearch();
  }, DEBOUNCE_DELAY);
});

clearSearchButton?.addEventListener('click', () => {
  searchState.query = '';
  if (searchInput) {
    searchInput.value = '';
  }
  runSearch();
});

resetFiltersButton?.addEventListener('click', resetFilters);
