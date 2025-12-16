const tiltable = document.querySelectorAll('[data-tilt]');
const parallaxItems = document.querySelectorAll('[data-depth]');

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function handleTilt(e) {
  const rect = this.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  const rotateX = ((y - centerY) / centerY) * -6;
  const rotateY = ((x - centerX) / centerX) * 6;

  this.style.transform = `perspective(900px) rotateX(${clamp(rotateX, -10, 10)}deg) rotateY(${clamp(rotateY, -10, 10)}deg) translateZ(8px)`;
  this.style.transition = 'transform 120ms ease';
}

function resetTilt() {
  this.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)';
  this.style.transition = 'transform 260ms ease';
}

function handleParallax(e) {
  const x = (e.clientX / window.innerWidth - 0.5) * 2;
  const y = (e.clientY / window.innerHeight - 0.5) * 2;

  parallaxItems.forEach((item) => {
    const depth = parseFloat(item.dataset.depth) || 0.3;
    const translateX = clamp(x * depth * 20, -30, 30);
    const translateY = clamp(y * depth * 20, -30, 30);
    item.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`;
  });
}

tiltable.forEach((card) => {
  card.addEventListener('mousemove', handleTilt);
  card.addEventListener('mouseleave', resetTilt);
});

window.addEventListener('mousemove', handleParallax);
window.addEventListener('mouseleave', () => {
  parallaxItems.forEach((item) => {
    item.style.transform = 'translate3d(0,0,0)';
  });
});

// smooth scroll for internal links
const links = document.querySelectorAll('a[href^="#"]');
links.forEach((link) => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
