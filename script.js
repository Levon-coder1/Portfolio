const tiltElements = document.querySelectorAll('[data-tilt]');
const reveals = document.querySelectorAll('.reveal');
const views = document.querySelectorAll('[data-route]');
const navLinks = document.querySelectorAll('[data-route-link]');
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
const categoryDescription = document.getElementById('category-description');

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

function handleTilt(event) {
  const rect = this.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width - 0.5) * 12;
  const y = ((event.clientY - rect.top) / rect.height - 0.5) * -12;
  this.style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;
}

function resetTilt() {
  this.style.transform = 'rotateX(0deg) rotateY(0deg)';
}

tiltElements.forEach((el) => {
  el.addEventListener('mousemove', handleTilt);
  el.addEventListener('mouseleave', resetTilt);
});

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

let activeCategory = 'phones';

function normalizeRoute(route) {
  if (!route) return '/';
  const trimmed = route.includes('#') ? route.slice(route.indexOf('#') + 1) : route;
  if (!trimmed) return '/';
  return trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
}

function goToRoute(route) {
  const formatted = route.startsWith('#') ? route : `#${route}`;
  if (window.location.hash === formatted) {
    handleRouteChange();
  } else {
    window.location.hash = formatted;
  }
}

navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const href = link.getAttribute('href');
    if (href?.startsWith('#/')) {
      event.preventDefault();
      goToRoute(normalizeRoute(href));
      nav?.classList.remove('open');
    }
  });
});

function getProductContext(slug) {
  return Object.entries(gadgetCatalog).reduce((found, [key, category]) => {
    if (found) return found;
    const product = category.products.find((item) => item.slug === slug);
    return product ? { product, categoryKey: key, categoryLabel: category.label } : null;
  }, null);
}

function renderCatalog(categoryKey = activeCategory) {
  if (!productGrid) return;
  const category = gadgetCatalog[categoryKey];
  if (!category) return;
  activeCategory = categoryKey;

  categoryDescription.textContent = category.description;
  categoryTabs.forEach((tab) => tab.classList.toggle('active', tab.dataset.category === categoryKey));

  productGrid.innerHTML = '';
  category.products.forEach((product) => {
    const card = document.createElement('article');
    card.className = 'product-card';
    card.dataset.slug = product.slug;
    card.innerHTML = `
      <div class="product-card__media" style="background-image:url('${product.image}')">
        <span class="badge">${category.label}</span>
      </div>
      <div class="product-card__body">
        <p class="small">${product.price}</p>
        <h3>${product.name}</h3>
        <p class="muted">${product.summary}</p>
        <div class="cta-row">
          <button class="cta primary link-chip">View details</button>
        </div>
      </div>`;

    card.addEventListener('click', () => goToRoute(`/gadgets/${product.slug}`));
    productGrid.appendChild(card);
  });
}

function renderProductDetail(slug) {
  if (!productPage) return;
  const context = slug ? getProductContext(slug) : null;
  const product = context?.product;

  productPageTitle.textContent = product ? `${product.name} — full gallery` : 'Pick a device to see its story.';
  productPageSubtitle.textContent = product?.shipping ?? 'Click any product image to open a dedicated display with specs and gallery.';
  productPageCategory.textContent = context?.categoryLabel ?? 'Gadget';
  productPagePrice.textContent = product?.price ?? '';
  productPageName.textContent = product?.name ?? 'Choose any product tile to load details.';
  productPageDescription.textContent = product?.summary ??
    'The full-width panel will showcase the hero image, expanded specs, pricing, shipping, and curated related picks.';

  productPageVisual.style.backgroundImage = product ? `url('${product.image}')` : '';

  productPageList.innerHTML = '';
  (product?.details ?? []).forEach((detail) => {
    const li = document.createElement('li');
    li.textContent = detail;
    productPageList.appendChild(li);
  });

  productPageGallery.innerHTML = '';
  (product?.gallery ?? []).forEach((item) => {
    const chip = document.createElement('span');
    chip.className = 'gallery-chip';
    chip.textContent = item;
    productPageGallery.appendChild(chip);
  });

  productPageRelated.innerHTML = '';
  if (product?.related?.length) {
    const label = document.createElement('p');
    label.className = 'muted';
    label.textContent = 'Similar products';
    productPageRelated.appendChild(label);

    const wrap = document.createElement('div');
    wrap.className = 'related-chips';
    product.related.forEach((slugRef) => {
      const relatedContext = getProductContext(slugRef);
      if (!relatedContext) return;
      const btn = document.createElement('button');
      btn.className = 'pill mini link-chip';
      btn.textContent = relatedContext.product.name;
      btn.addEventListener('click', () => goToRoute(`/gadgets/${relatedContext.product.slug}`));
      wrap.appendChild(btn);
    });
    productPageRelated.appendChild(wrap);
  }
}

function setActiveView(path) {
  const detailRoute = path.startsWith('/gadgets/') ? '/gadgets/detail' : path;
  let targetView = Array.from(views).find((view) => view.dataset.route === detailRoute);
  if (!targetView) {
    targetView = Array.from(views).find((view) => view.dataset.route === '/');
  }

  views.forEach((view) => view.classList.toggle('active', view === targetView));

  if (detailRoute === '/gadgets/detail') {
    renderProductDetail(path.replace('/gadgets/', ''));
  }

  if (detailRoute === '/gadgets') {
    renderCatalog(activeCategory);
  }
}

function setActiveNav(path) {
  navLinks.forEach((link) => {
    const route = normalizeRoute(link.getAttribute('href'));
    const isMatch = path === route || (path.startsWith('/gadgets/') && route === '/gadgets');
    link.classList.toggle('active', isMatch);
  });
}

function handleRouteChange() {
  const path = normalizeRoute(window.location.hash || '/');
  setActiveView(path);
  setActiveNav(path);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

categoryTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const category = tab.dataset.category;
    if (category) {
      renderCatalog(category);
    }
  });
});

if (!window.location.hash) {
  window.location.hash = '#/';
  renderCatalog(activeCategory);
  setActiveView('/');
  setActiveNav('/');
} else {
  handleRouteChange();
  renderCatalog(activeCategory);
}

window.addEventListener('hashchange', handleRouteChange);
