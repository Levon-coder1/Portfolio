+const tiltElements = document.querySelectorAll('[data-tilt]');
+const parallaxItems = document.querySelectorAll('[data-depth]');
+const reveals = document.querySelectorAll('.reveal');
+
+function handleTilt(event) {
+  const rect = this.getBoundingClientRect();
+  const x = ((event.clientX - rect.left) / rect.width - 0.5) * 12;
+  const y = ((event.clientY - rect.top) / rect.height - 0.5) * -12;
+  this.style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;
+}
+
+function resetTilt() {
+  this.style.transform = 'rotateX(0deg) rotateY(0deg)';
+}
+
+tiltElements.forEach((el) => {
+  el.addEventListener('mousemove', handleTilt);
+  el.addEventListener('mouseleave', resetTilt);
+});
+
+function parallax(event) {
+  parallaxItems.forEach((item) => {
+    const depth = parseFloat(item.dataset.depth) || 0.3;
+    const x = (event.clientX - window.innerWidth / 2) * depth * 0.02;
+    const y = (event.clientY - window.innerHeight / 2) * depth * 0.02;
+    item.style.transform = `translate3d(${x}px, ${y}px, 0)`;
+  });
+}
+
+document.addEventListener('mousemove', parallax);
+
+const observer = new IntersectionObserver(
+  (entries) => {
+    entries.forEach((entry) => {
+      if (entry.isIntersecting) {
+        entry.target.classList.add('in-view');
+        observer.unobserve(entry.target);
+      }
+    });
+  },
+  { threshold: 0.2 }
+);
+
+reveals.forEach((section) => observer.observe(section));
+
+const links = document.querySelectorAll('a[href^="#"]');
+links.forEach((link) => {
+  link.addEventListener('click', (e) => {
+    const href = link.getAttribute('href');
+    if (href.length > 1) {
+      e.preventDefault();
+      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
+    }
+  });
+});
