const tiltElements = document.querySelectorAll('[data-tilt]');
const parallaxItems = document.querySelectorAll('[data-depth]');
const scrollParallaxItems = document.querySelectorAll('[data-scroll-depth]');
const reveals = document.querySelectorAll('.reveal');
const gadgetCards = document.querySelectorAll('.gadget-card');
const detailName = document.getElementById('detail-name');
const detailSubtitle = document.getElementById('detail-subtitle');
const detailPrice = document.getElementById('detail-price');
const detailSpecs = document.getElementById('detail-specs');
const detailGallery = document.getElementById('detail-gallery');
const closeDetail = document.getElementById('close-detail');

const gadgets = {
  'aurora-phone': {
    name: 'Aurora Pro',
    subtitle: 'Flagship camera-first build with cinematic color.',
    price: '$1,199',
    specs: [
      '6.8" LTPO OLED · 120Hz',
      '108MP triple camera · RAW video',
      'Snapdragon X3 · 12GB RAM',
      '1TB storage · 120W fast charge',
    ],
    images: [
      'images/gadgets/phone-aurora-front.svg',
      'images/gadgets/phone-aurora-back.svg',
      'images/gadgets/phone-aurora-lifestyle.svg',
    ],
  },
  'studio-laptop': {
    name: 'Studio Laptop',
    subtitle: 'Ultra-thin workstation tuned for render and code.',
    price: '$2,499',
    specs: [
      '14" mini-LED · 120Hz',
      'RTX Studio graphics · 16GB VRAM',
      'Intel Ultra 9 · 32GB RAM',
      '2TB NVMe · Studio mic array',
    ],
    images: [
      'images/gadgets/laptop-studio-side.svg',
      'images/gadgets/laptop-studio-keyboard.svg',
      'images/gadgets/laptop-studio-side.svg',
    ],
  },
  'neon-rig': {
    name: 'Neon Rig',
    subtitle: 'High-refresh battle station with liquid cooling.',
    price: '$3,199',
    specs: [
      'Ryzen 9 · Custom loop cooling',
      'RTX 5090 · 24GB VRAM',
      '64GB DDR5 · 2TB Gen5 NVMe',
      'Wi-Fi 7 · 1200W platinum PSU',
    ],
    images: [
      'images/gadgets/gaming-rig-neon.svg',
      'images/gadgets/gaming-rig-neon.svg',
      'images/gadgets/phone-aurora-front.svg',
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

function parallax(event) {
  parallaxItems.forEach((item) => {
    const depth = parseFloat(item.dataset.depth) || 0.3;
    const x = (event.clientX - window.innerWidth / 2) * depth * 0.02;
    const y = (event.clientY - window.innerHeight / 2) * depth * 0.02;
    item.style.setProperty('--parallax-x', `${x}px`);
    item.style.setProperty('--parallax-y', `${y}px`);
  });
}

document.addEventListener('mousemove', parallax);

function parallaxScroll() {
  const scrollY = window.scrollY || window.pageYOffset;
  scrollParallaxItems.forEach((item) => {
    const depth = parseFloat(item.dataset.scrollDepth) || 0.1;
    const offset = scrollY * depth * -0.04;
    item.style.setProperty('--scroll-y', `${offset}px`);
  });
}

window.addEventListener('scroll', parallaxScroll);
parallaxScroll();

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

function buildGallery(images) {
  if (!detailGallery) return;
  const main = document.createElement('div');
  main.className = 'gadget-gallery__main';
  main.style.backgroundImage = `url(${images[0]})`;

  const thumbs = document.createElement('div');
  thumbs.className = 'gadget-gallery__thumbs';

  images.forEach((src, index) => {
    const thumb = document.createElement('button');
    thumb.type = 'button';
    thumb.className = `gadget-thumb ${index === 0 ? 'is-active' : ''}`;
    thumb.style.backgroundImage = `url(${src})`;
    thumb.addEventListener('click', () => {
      main.style.backgroundImage = `url(${src})`;
      thumbs.querySelectorAll('.gadget-thumb').forEach((t) =>
        t.classList.remove('is-active')
      );
      thumb.classList.add('is-active');
    });
    thumbs.appendChild(thumb);
  });

  detailGallery.innerHTML = '';
  detailGallery.appendChild(main);
  detailGallery.appendChild(thumbs);
}

function renderGadget(id, skipHashUpdate = false) {
  const gadget = gadgets[id];
  if (!gadget) return;

  detailName.textContent = gadget.name;
  detailSubtitle.textContent = gadget.subtitle;
  detailPrice.textContent = gadget.price;

  detailSpecs.innerHTML = '';
  gadget.specs.forEach((spec) => {
    const li = document.createElement('li');
    li.textContent = spec;
    detailSpecs.appendChild(li);
  });

  buildGallery(gadget.images);

  if (!skipHashUpdate) {
    const newHash = `#gadgets/${id}`;
    if (location.hash !== newHash) {
      history.replaceState(null, '', newHash);
    }
  }
}

function applyRouteFromHash() {
  if (!location.hash.startsWith('#gadgets')) return;
  const [, gadgetId] = location.hash.split('/');
  const id = gadgetId || 'aurora-phone';
  renderGadget(id, true);
  document.querySelector('#gadgets')?.scrollIntoView({ behavior: 'smooth' });
}

gadgetCards.forEach((card) => {
  card.addEventListener('click', () => {
    const id = card.dataset.gadgetId;
    renderGadget(id);
  });
});

closeDetail?.addEventListener('click', () => {
  history.replaceState(null, '', '#gadgets');
});

if (detailName && detailSubtitle && detailPrice && detailSpecs && detailGallery) {
  renderGadget('aurora-phone', true);
  applyRouteFromHash();
  window.addEventListener('hashchange', applyRouteFromHash);
}
