
/* ═══════════════════════════════════════════════════════════════
   BONOU Mahuna Justus — Portfolio JS  ·  Version PRO 2025
   Animations bidirectionnelles (aller-retour au scroll)
   ═══════════════════════════════════════════════════════════════ */
 
'use strict';
 
// ─── SCROLL DIRECTION TRACKER ────────────────────────────────
let lastScrollY = window.scrollY;
let scrollDir = 'down';
window.addEventListener('scroll', () => {
  scrollDir = window.scrollY > lastScrollY ? 'down' : 'up';
  lastScrollY = window.scrollY;
}, { passive: true });
 
// ─── SCROLL PROGRESS BAR ─────────────────────────────────────
const scrollBar = document.getElementById('scroll-bar');
function updateScrollBar() {
  if (!scrollBar) return;
  const max = document.body.scrollHeight - window.innerHeight;
  if (max > 0) scrollBar.style.width = (window.scrollY / max) * 100 + '%';
}
 
// ─── NAVBAR ───────────────────────────────────────────────────
const navbar = document.getElementById('navbar');
const allSections = document.querySelectorAll('section[id], div[id]');
const navAs = document.querySelectorAll('.nav-links a');
 
function onScroll() {
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 60);
  let current = '';
  allSections.forEach(s => { if (window.scrollY >= s.offsetTop - 130) current = s.id; });
  navAs.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
  updateScrollBar();
  runParallax();
}
window.addEventListener('scroll', onScroll, { passive: true });
 
// ─── HAMBURGER MENU ───────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    if (open) {
      spans[0].style.transform = 'translateY(6px) rotate(45deg)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'translateY(-6px) rotate(-45deg)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });
}
navAs.forEach(a => a.addEventListener('click', () => {
  if (navLinks) navLinks.classList.remove('open');
  if (hamburger) hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
}));
 
// ─── SMOOTH ANCHOR SCROLL ─────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.offsetTop - 72, behavior: 'smooth' });
    }
  });
});
 
// ─── PARALLAX (MULTI-DEPTH) ───────────────────────────────────
const heroPhotoWrap = document.getElementById('hero-photo-wrap');
const globalOrbs = document.querySelectorAll('.global-orbs .orb');
 
function runParallax() {
  const y = window.scrollY;
  if (heroPhotoWrap) {
    heroPhotoWrap.style.transform = `translateY(${y * 0.2}px)`;
  }
  globalOrbs.forEach((orb, i) => {
    const speed = i === 0 ? 0.06 : 0.11;
    const xSpeed = i === 0 ? -0.02 : 0.03;
    orb.style.transform = `translateY(${y * speed}px) translateX(${y * xSpeed}px)`;
  });
}
 
// ─── TYPEWRITER EFFECT ────────────────────────────────────────
const phrases = [
  'Modélisation mathématique',
  'Machine Learning · Deep Learning',
  'Développement web full-stack',
  'Python · PHP · JavaScript',
];
let pIdx = 0, cIdx = 0, isDeleting = false;
const typedEl = document.getElementById('typed-text');
 
function typeLoop() {
  if (!typedEl) return;
  const phrase = phrases[pIdx];
  if (!isDeleting) {
    typedEl.textContent = phrase.slice(0, ++cIdx);
    if (cIdx === phrase.length) {
      isDeleting = true;
      setTimeout(typeLoop, 2000);
      return;
    }
    setTimeout(typeLoop, 62);
  } else {
    typedEl.textContent = phrase.slice(0, --cIdx);
    if (cIdx === 0) {
      isDeleting = false;
      pIdx = (pIdx + 1) % phrases.length;
      setTimeout(typeLoop, 450);
      return;
    }
    setTimeout(typeLoop, 38);
  }
}
setTimeout(typeLoop, 1000);
 
// ─── ANIMATED COUNTERS ────────────────────────────────────────
function runCounter(el, forward) {
  const target = +el.dataset.target;
  const suffix = el.dataset.suffix || '';
  if (!forward) { el.textContent = '0' + suffix; return; }
  let cur = 0;
  const step = target / 45;
  const timer = setInterval(() => {
    cur = Math.min(cur + step, target);
    el.textContent = Math.round(cur) + suffix;
    if (cur >= target) clearInterval(timer);
  }, 32);
}
 
const heroEl = document.getElementById('hero');
let countersDone = false;
if (heroEl) {
  new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting && !countersDone) {
        countersDone = true;
        document.querySelectorAll('.stat-num[data-target]').forEach(el => runCounter(el, true));
      } else if (!e.isIntersecting) {
        countersDone = false;
        document.querySelectorAll('.stat-num[data-target]').forEach(el => runCounter(el, false));
      }
    });
  }, { threshold: 0.45 }).observe(heroEl);
}
 
// ─── BIDIRECTIONAL — FADE-UP ELEMENTS ────────────────────────
const fadeObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
    else e.target.classList.remove('visible');
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.fade-up').forEach(el => fadeObs.observe(el));
 
// ─── BIDIRECTIONAL — SLIDE LEFT/RIGHT ────────────────────────
const slideObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('in');
    else e.target.classList.remove('in');
  });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
document.querySelectorAll('.slide-left, .slide-right').forEach(el => slideObs.observe(el));
 
// ─── BIDIRECTIONAL — STAGGER CHILDREN ────────────────────────
const staggerObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const children = entry.target.querySelectorAll('.stagger-child');
    if (entry.isIntersecting) {
      children.forEach((child, i) => {
        setTimeout(() => child.classList.add('in'), i * 115);
      });
    } else {
      // Stagger the EXIT too — reverse order
      children.forEach((child, i) => {
        setTimeout(() => child.classList.remove('in'), (children.length - 1 - i) * 60);
      });
    }
  });
}, { threshold: 0.08 });
document.querySelectorAll('.hobbies-grid, .projects-grid, .edu-grid, .certs-grid').forEach(el => staggerObs.observe(el));
 
// ─── BIDIRECTIONAL — SECTION HEADINGS ────────────────────────
const headObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
    else e.target.classList.remove('visible');
  });
}, { threshold: 0.25 });
document.querySelectorAll('.section-heading').forEach(el => headObs.observe(el));
 
// ─── BIDIRECTIONAL — SECTION LABELS ──────────────────────────
const labelObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
    else e.target.classList.remove('visible');
  });
}, { threshold: 0.4 });
document.querySelectorAll('.section-label').forEach(el => labelObs.observe(el));
 
// ─── BIDIRECTIONAL — SKILL BARS ───────────────────────────────
const skillsEl = document.getElementById('skills');
if (skillsEl) {
  new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.bar-fill').forEach((b, i) => {
          setTimeout(() => { b.style.width = b.dataset.w + '%'; }, 180 + i * 90);
        });
      } else {
        e.target.querySelectorAll('.bar-fill').forEach(b => { b.style.width = '0%'; });
      }
    });
  }, { threshold: 0.2 }).observe(skillsEl);
}
 
// ─── SECTION DIVIDER GLOW ─────────────────────────────────────
const divObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('glow');
      setTimeout(() => e.target.classList.remove('glow'), 1500);
    }
  });
}, { threshold: 0.8 });
document.querySelectorAll('.section-divider').forEach(d => divObs.observe(d));
 
// ─── TILT EFFECT ON CARDS ─────────────────────────────────────
document.querySelectorAll('.tilt').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    card.style.transform = `perspective(900px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) scale(1.04) translateY(-8px)`;
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; });
});
 
// ─── MAGNETIC BUTTONS ─────────────────────────────────────────
document.querySelectorAll('.magnetic').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const r = btn.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) * 0.38;
    const dy = (e.clientY - (r.top  + r.height / 2)) * 0.38;
    btn.style.transform = `translate(${dx}px, ${dy}px)`;
  });
  btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
});
 
// ─── LIGHTBOX ─────────────────────────────────────────────────
function openLightbox(src, caption) {
  const lb = document.getElementById('lightbox');
  if (!lb) return;
  document.getElementById('lb-img').src = src;
  document.getElementById('lb-caption').textContent = caption || '';
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  const lb = document.getElementById('lightbox');
  if (lb) lb.classList.remove('open');
  document.body.style.overflow = '';
}
const lb = document.getElementById('lightbox');
if (lb) lb.addEventListener('click', e => { if (e.target.id === 'lightbox') closeLightbox(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
 
// ─── PAGE TRANSITIONS ─────────────────────────────────────────
document.querySelectorAll('a[href]').forEach(a => {
  const href = a.getAttribute('href');
  if (href && href.endsWith('.html') && !href.startsWith('http') && a.target !== '_blank') {
    a.addEventListener('click', e => {
      e.preventDefault();
      document.body.classList.add('page-leave');
      setTimeout(() => { window.location.href = href; }, 420);
    });
  }
});
 

// ─── MARQUEE STRIP — inject between hero and about ────────────
function injectMarquee() {
  const heroSection = document.getElementById('hero');
  if (!heroSection) return;
  const items = [
    '&lt;Python /&gt;',
    'Machine Learning',
    'Deep Learning',
    'PHP · CodeIgniter',
    'Modélisation Mathématique',
    'JavaScript',
    'TensorFlow · Keras',
    'Blender 3D',
    'Git &amp; GitHub',
    'MATLAB',
    'HTML5 · CSS3',
    'Full-Stack',
  ];
  // Duplicate for seamless loop
  const allItems = [...items, ...items];
  const itemsHTML = allItems.map(t => `<span class="marquee-item"><span class="dot-sep">◆</span>${t}</span>`).join('');
 
  const strip = document.createElement('div');
  strip.className = 'marquee-strip';
  strip.innerHTML = `<div class="marquee-inner">${itemsHTML}</div>`;
  heroSection.insertAdjacentElement('afterend', strip);
}
injectMarquee();
 
// ─── SECTION HEADING BG NUMBERS ───────────────────────────────
function addSectionNumbers() {
  const headings = document.querySelectorAll('.section-heading');
  headings.forEach((h, i) => {
    const num = document.createElement('span');
    num.className = 'heading-bg-num';
    num.textContent = String(i + 1).padStart(2, '0');
    h.style.position = 'relative';
    h.appendChild(num);
  });
}
addSectionNumbers();
 
// ─── INITIAL SLIDE ANIMATION ON LOAD ─────────────────────────
window.addEventListener('load', () => {
  document.querySelectorAll('.slide-left, .slide-right').forEach((el, i) => {
    setTimeout(() => el.classList.add('in'), 200 + i * 150);
  });
  updateScrollBar();
});
 
// ─── SCROLL-TRIGGERED SECTION OBSERVER (generic) ─────────────
// Observe any element with data-reveal attribute added manually
document.querySelectorAll('[data-reveal]').forEach(el => {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) el.classList.add('visible', 'in');
      else el.classList.remove('visible', 'in');
    });
  }, { threshold: 0.15 });
  obs.observe(el);
});
 
