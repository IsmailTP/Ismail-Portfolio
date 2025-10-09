// Current year
document.getElementById('year').textContent = new Date().getFullYear();

// Neon cursor trail with slight smoothing
(function neonCursor() {
  const cursor = document.getElementById('neon-cursor');
  let x = window.innerWidth / 2, y = window.innerHeight / 2;
  let targetX = x, targetY = y;

  window.addEventListener('mousemove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
  });

  function animate() {
    // Smooth follow
    x += (targetX - x) * 0.2;
    y += (targetY - y) * 0.2;
    cursor.style.transform = `translate(${x}px, ${y}px)`;
    requestAnimationFrame(animate);
  }
  animate();

  // Scale on link hover
  const interactive = document.querySelectorAll('a, button, .card');
  interactive.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width = '28px';
      cursor.style.height = '28px';
      cursor.style.opacity = '0.8';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width = '16px';
      cursor.style.height = '16px';
      cursor.style.opacity = '0.9';
    });
  });
})();

// Typed tagline with caret
(function typedTagline() {
  const el = document.querySelector('.typed');
  if (!el) return;
  const phrases = JSON.parse(el.getAttribute('data-phrases') || '[]');
  const speed = 55;
  const hold = 1200;
  const erase = 24;

  let i = 0, j = 0, typing = true;

  function step() {
    const phrase = phrases[i] || '';
    if (typing) {
      el.textContent = phrase.slice(0, j + 1);
      j++;
      if (j === phrase.length) {
        typing = false;
        setTimeout(step, hold);
        return;
      }
      setTimeout(step, speed);
    } else {
      el.textContent = phrase.slice(0, j - 1);
      j--;
      if (j === 0) {
        typing = true;
        i = (i + 1) % phrases.length;
      }
      setTimeout(step, erase);
    }
  }
  step();
})();

// Reveal sections once using IntersectionObserver
(function revealOnScroll() {
  const items = document.querySelectorAll('.section-observe');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // only once
      }
    });
  }, { threshold: 0.15 });

  items.forEach((el) => observer.observe(el));
})();
