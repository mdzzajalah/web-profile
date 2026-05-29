/* ─────────────────────────────────────────
   main.js — Faii Portfolio
   ───────────────────────────────────────── */

/* ── Scramble / typewriter counter ── */
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%';
const counterEl = document.getElementById('intro-counter');

if (counterEl) {
  let count = 0;
  const maxCount = 100;

  const countInterval = setInterval(() => {
    count += Math.floor(Math.random() * 7) + 3;
    if (count >= maxCount) {
      count = 100;
      clearInterval(countInterval);
    }
    const scrambled = Array.from({ length: 5 }, () =>
      chars[Math.floor(Math.random() * chars.length)]
    ).join('');
    counterEl.textContent = `${scrambled} ${count}%`;
  }, 60);
}

/* ── Remove overlay from DOM after animation ── */
setTimeout(() => {
  const overlay = document.getElementById('intro-overlay');
  if (overlay) overlay.remove();
}, 4600);

/* ── Scroll observer for cards & sections ── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => entry.target.classList.add('visible'), Number(delay));
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.section-header').forEach(el => observer.observe(el));
document.querySelectorAll('.contact-section').forEach(el => observer.observe(el));
document.querySelectorAll('.app-card').forEach((el, i) => {
  el.dataset.delay = i * 100;
  observer.observe(el);
});
