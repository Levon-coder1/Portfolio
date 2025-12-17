const tiltElements = document.querySelectorAll('[data-tilt]');
const reveals = document.querySelectorAll('.reveal');
const views = document.querySelectorAll('[data-route]');
const navLinks = document.querySelectorAll('.nav-links a');
const brand = document.querySelector('.brand');
const categoryTabs = document.querySelectorAll('[data-category]');
const productGrid = document.getElementById('product-grid');
const productDetail = document.getElementById('product-detail');

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
        gallery: ['Warm Amber', 'Graphite Mist'],
        details: [
          '50MP main + 5x telephoto; natural HDR with mobile LUTs installed',
          'Unlocked dual-SIM with travel eSIM setup and battery health report',
          'Delivered with tempered glass + slim clear and sport cases',
        ],
        related: ['iPhone 15 Pro Max'],
      },
      {
        slug: 'iphone-pro',
        name: 'iPhone 15 Pro Max',
        price: '$1,199 · 512GB',
        shipping: 'Next-day courier available in select cities',
        summary: 'Titanium build, 5x tetraprism zoom, and ProRes log capture out of the box.',
        gallery: ['Natural Titanium', 'Blue Titanium'],
        details: [
          'Color science tuned for social-first exports and LUT-ready delivery',
          'MagSafe kit + glass install with warranty-friendly handoff',
          'iCloud and Google Drive migration concierge included',
        ],
        related: ['Pixel Pro 9'],
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
        related: ['ROG Zephyrus G16'],
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
        related: ['MacBook Pro 16" M3 Max'],
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
        related: ['Arc Wireless Charger'],
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
        related: ['Aurora ANC Buds'],
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
        related: ['Galaxy Tab S9 Ultra'],
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
        related: ['iPad Pro 13" M4'],
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

function parseHash() {
  const raw = window.location.hash.replace('#', '');
  if (!raw) return [];
  return raw.split('/').filter(Boolean);
}

function setActiveNav(baseRoute) {
  navLinks.forEach((link) => {
    const target = link.getAttribute('href')?.replace('#', '') || '';
    const segment = target.split('/').filter(Boolean)[0] || '';
    link.classList.toggle('active', `/${segment}` === baseRoute);
  });
}

function setActiveCategory(category) {
  categoryTabs.forEach((tab) => {
    tab.classList.toggle('active', tab.dataset.category === category);
  });
}

function renderProducts(category) {
  if (!productGrid) return;
  const catalog = gadgetCatalog[category];
  productGrid.innerHTML = '';

  if (!catalog) return;

  catalog.products.forEach((product) => {
    const card = document.createElement('button');
    card.className = 'product-card glassy';
    card.dataset.slug = product.slug;
    card.dataset.category = category;
    card.innerHTML = `
      <div class="product-card__media shimmer">
        <span class="badge">${catalog.label}</span>
        <div class="gloss"></div>
      </div>
      <div class="product-card__body">
        <div>
          <p class="small">${product.price}</p>
          <h3>${product.name}</h3>
          <p class="muted">${product.summary}</p>
        </div>
        <span class="pill mini">View detail</span>
      </div>
    `;
    productGrid.appendChild(card);
  });
}

function resetProductDetail(category) {
  if (!productDetail) return;
  const pill = productDetail.querySelector('.pill');
  const title = productDetail.querySelector('.detail-title');
  const meta = productDetail.querySelector('.detail-meta');
  const list = productDetail.querySelector('.detail-list');
  const gallery = productDetail.querySelector('.detail-gallery');
  const shipping = productDetail.querySelector('.detail-meta.shipping');
  const related = productDetail.querySelector('.detail-related');

  if (pill) pill.textContent = 'Select a device';
  if (title) title.textContent = 'Choose a category';
  if (meta) meta.textContent = gadgetCatalog[category]?.description || 'Tap a tile to load full specs and concierge notes.';
  if (list) list.innerHTML = '';
  if (gallery) gallery.innerHTML = '';
  if (shipping) shipping.textContent = '';
  if (related) related.innerHTML = '';
}

function updateProductDetail(category, slug) {
  if (!productDetail) return;
  const catalog = gadgetCatalog[category];
  const product = catalog?.products.find((item) => item.slug === slug);
  if (!product) {
    resetProductDetail(category);
    return;
  }

  const pill = productDetail.querySelector('.pill');
  const title = productDetail.querySelector('.detail-title');
  const meta = productDetail.querySelector('.detail-meta');
  const list = productDetail.querySelector('.detail-list');
  const gallery = productDetail.querySelector('.detail-gallery');
  const shipping = productDetail.querySelector('.detail-meta.shipping');
  const related = productDetail.querySelector('.detail-related');

  if (pill) pill.textContent = catalog.label;
  if (title) title.textContent = product.name;
  if (meta) meta.textContent = product.summary;

  if (gallery) {
    gallery.innerHTML = '';
    product.gallery.forEach((shade) => {
      const chip = document.createElement('div');
      chip.className = 'gallery-chip';
      chip.textContent = shade;
      gallery.appendChild(chip);
    });
  }

  if (list) {
    list.innerHTML = '';
    product.details.forEach((detail) => {
      const li = document.createElement('li');
      li.textContent = detail;
      list.appendChild(li);
    });
  }

  if (shipping) {
    shipping.textContent = `Shipping: ${product.shipping}`;
  }

  if (related) {
    related.innerHTML = '';
    if (product.related?.length) {
      const label = document.createElement('p');
      label.className = 'small';
      label.textContent = 'Related';
      related.appendChild(label);

      const chips = document.createElement('div');
      chips.className = 'related-chips';
      product.related.forEach((item) => {
        const chip = document.createElement('span');
        chip.className = 'pill mini';
        chip.textContent = item;
        chips.appendChild(chip);
      });
      related.appendChild(chips);
    }
  }
}

function handleRouteChange() {
  const segments = parseHash();
  const baseRoute = segments[0] ? `/${segments[0]}` : '/';

  views.forEach((view) => {
    view.classList.toggle('active', view.dataset.route === baseRoute);
  });

  setActiveNav(baseRoute);

  if (baseRoute === '/gadgets') {
    const category = segments[1] || 'phones';
    const productSlug = segments[2];
    setActiveCategory(category);
    renderProducts(category);
    if (productSlug) {
      updateProductDetail(category, productSlug);
    } else {
      resetProductDetail(category);
    }
  } else {
    resetProductDetail('phones');
  }
}

window.addEventListener('hashchange', handleRouteChange);
window.addEventListener('load', () => {
  if (!window.location.hash) {
    window.location.hash = '#/';
  }
  handleRouteChange();
});

brand?.addEventListener('click', () => {
  window.location.hash = '#/';
});

categoryTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const category = tab.dataset.category;
    window.location.hash = `#/gadgets/${category}`;
  });
});

productGrid?.addEventListener('click', (event) => {
  const card = event.target.closest('.product-card');
  if (!card) return;
  const { category, slug } = card.dataset;
  if (category && slug) {
    window.location.hash = `#/gadgets/${category}/${slug}`;
  }
});
