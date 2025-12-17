const tiltElements = document.querySelectorAll('[data-tilt]');
const parallaxItems = document.querySelectorAll('[data-depth]');
const scrollParallaxItems = document.querySelectorAll('[data-scroll-depth]');
const reveals = document.querySelectorAll('.reveal');
const views = document.querySelectorAll('[data-route]');
const navLinks = document.querySelectorAll('.nav-links a');
const brand = document.querySelector('.brand');
const gadgetButtons = document.querySelectorAll('[data-gadget]');
const gadgetDetail = document.getElementById('gadget-detail');

const gadgetCopy = {
  phones: {
    label: 'Phones',
    title: 'Camera-first, travel-ready builds',
    meta: 'Pro sensors, clean Android/iOS setups, calibrated displays.',
    points: [
      'Unboxed, patched, and ready with key apps',
      '2x cases + glass installed for first week protection',
      'Camera and color profiles tuned to your style',
    ],
  },
  laptops: {
    label: 'Laptops',
    title: 'Creator & engineering rigs',
    meta: 'Calibrated color, quiet thermals, and performance presets.',
    points: [
      'Memory and storage spec guidance for your stack',
      'Thermal profiles and fan curves dialed in',
      'Peripherals paired for editing, coding, or 3D',
    ],
  },
  gaming: {
    label: 'Gaming',
    title: 'High-refresh battlestations',
    meta: '120-240hz displays, tuned inputs, immersive audio.',
    points: [
      'GPU/CPU pairing to avoid bottlenecks',
      'Latency-tested controllers and keyboards',
      'Ambilight + audio setups for immersive play',
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

function resetGadgetDetail() {
  if (!gadgetDetail) return;
  const pill = gadgetDetail.querySelector('.pill');
  const title = gadgetDetail.querySelector('.detail-title');
  const meta = gadgetDetail.querySelector('.detail-meta');
  const list = gadgetDetail.querySelector('.detail-list');
  if (pill) pill.textContent = 'Select a gadget';
  if (title) title.textContent = 'Explore the catalog';
  if (meta) meta.textContent = 'Choose a device to see concierge notes and specs.';
  if (list) list.innerHTML = '';
}

function updateGadgetDetail(slug = 'phones') {
  if (!gadgetDetail) return;
  const detail = gadgetCopy[slug];
  const pill = gadgetDetail.querySelector('.pill');
  const title = gadgetDetail.querySelector('.detail-title');
  const meta = gadgetDetail.querySelector('.detail-meta');
  const list = gadgetDetail.querySelector('.detail-list');

  if (!detail || !pill || !title || !meta || !list) return;

  pill.textContent = detail.label;
  title.textContent = detail.title;
  meta.textContent = detail.meta;
  list.innerHTML = '';
  detail.points.forEach((point) => {
    const li = document.createElement('li');
    li.textContent = point;
    list.appendChild(li);
  });
}

function handleRouteChange() {
  const segments = parseHash();
  const baseRoute = segments[0] ? `/${segments[0]}` : '/';

  views.forEach((view) => {
    view.classList.toggle('active', view.dataset.route === baseRoute);
  });

  setActiveNav(baseRoute);

  if (baseRoute === '/gadgets') {
    updateGadgetDetail(segments[1] || 'phones');
  } else {
    resetGadgetDetail();
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

gadgetButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const slug = button.dataset.gadget;
    window.location.hash = `#/gadgets/${slug}`;
  });
});
