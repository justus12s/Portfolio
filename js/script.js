
      const scrollBar = document.getElementById("scroll-bar");
      function updateScrollBar() {
        const scrolled = window.scrollY;
        const max = document.body.scrollHeight - window.innerHeight;
        scrollBar.style.width = (scrolled / max) * 100 + "%";
      }
      window.addEventListener("scroll", updateScrollBar, { passive: true });

      const navbar = document.getElementById("navbar");
      const sections = document.querySelectorAll("section[id], div[id]");
      const navAs = document.querySelectorAll(".nav-links a");

      function onScroll() {
        navbar.classList.toggle("scrolled", window.scrollY > 60);
        let current = "";
        sections.forEach((s) => {
          if (window.scrollY >= s.offsetTop - 120) current = s.id;
        });
        navAs.forEach((a) => {
          a.classList.toggle(
            "active",
            a.getAttribute("href") === "#" + current,
          );
        });
        updateScrollBar();
        parallaxHero();
      }
      window.addEventListener("scroll", onScroll, { passive: true });

      const hamburger = document.getElementById("hamburger");
      const navLinks = document.getElementById("navLinks");
      hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("open");
        const spans = hamburger.querySelectorAll("span");
        if (navLinks.classList.contains("open")) {
          spans[0].style.transform = "translateY(6px) rotate(45deg)";
          spans[1].style.opacity = "0";
          spans[2].style.transform = "translateY(-6px) rotate(-45deg)";
        } else {
          spans.forEach((s) => {
            s.style.transform = "";
            s.style.opacity = "";
          });
        }
      });
      navAs.forEach((a) =>
        a.addEventListener("click", () => {
          navLinks.classList.remove("open");
          hamburger.querySelectorAll("span").forEach((s) => {
            s.style.transform = "";
            s.style.opacity = "";
          });
        }),
      );

      document.querySelectorAll('a[href^="#"]').forEach((a) => {
        a.addEventListener("click", (e) => {
          const t = document.querySelector(a.getAttribute("href"));
          if (t) {
            e.preventDefault();
            window.scrollTo({ top: t.offsetTop - 72, behavior: "smooth" });
          }
        });
      });

      const heroPhotoWrap = document.getElementById("hero-photo-wrap");
      function parallaxHero() {
        if (!heroPhotoWrap) return;
        const y = window.scrollY * 0.22;
        heroPhotoWrap.style.transform = `translateY(${y}px)`;
      }

      const phrases = [
        "Modélisation mathématique",
        "Machine Learning · Deep Learning",
        "Développement web full-stack",
        "Python · PHP · JavaScript",
      ];
      let pIdx = 0,
        cIdx = 0,
        deleting = false;
      const typedEl = document.getElementById("typed-text");

      function typeLoop() {
        const phrase = phrases[pIdx];
        if (!deleting) {
          typedEl.textContent = phrase.slice(0, ++cIdx);
          if (cIdx === phrase.length) {
            deleting = true;
            setTimeout(typeLoop, 1800);
            return;
          }
          setTimeout(typeLoop, 60);
        } else {
          typedEl.textContent = phrase.slice(0, --cIdx);
          if (cIdx === 0) {
            deleting = false;
            pIdx = (pIdx + 1) % phrases.length;
            setTimeout(typeLoop, 400);
            return;
          }
          setTimeout(typeLoop, 35);
        }
      }
      setTimeout(typeLoop, 900);

      function animateCounter(el) {
        const target = +el.dataset.target;
        const suffix = el.dataset.suffix || "";
        let current = 0;
        const step = target / 40;
        const timer = setInterval(() => {
          current = Math.min(current + step, target);
          el.textContent = Math.round(current) + suffix;
          if (current >= target) clearInterval(timer);
        }, 35);
      }
      let countersDone = false;
      const counterObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting && !countersDone) {
              countersDone = true;
              document
                .querySelectorAll(".stat-num[data-target]")
                .forEach(animateCounter);
            }
          });
        },
        { threshold: 0.5 },
      );
      const heroEl = document.getElementById("hero");
      if (heroEl) counterObserver.observe(heroEl);

      const fadeObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("visible");
              fadeObserver.unobserve(e.target);
            }
          });
        },
        { threshold: 0.1 },
      );
      document
        .querySelectorAll(".fade-up")
        .forEach((el) => fadeObserver.observe(el));

      const slideObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("in");
              slideObserver.unobserve(e.target);
            }
          });
        },
        { threshold: 0.08 },
      );
      document
        .querySelectorAll(".slide-left, .slide-right")
        .forEach((el) => slideObserver.observe(el));

      const staggerObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const children = entry.target.querySelectorAll(".stagger-child");
              children.forEach((child, i) => {
                setTimeout(() => child.classList.add("in"), i * 120);
              });
              staggerObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 },
      );
      document
        .querySelectorAll(
          ".hobbies-grid, .projects-grid, .edu-grid, .certs-grid",
        )
        .forEach((el) => staggerObserver.observe(el));

      // Animation des titres de section
      const headingObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              headingObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.3 },
      );
      document
        .querySelectorAll(".section-heading")
        .forEach((el) => headingObserver.observe(el));

      const barObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.querySelectorAll(".bar-fill").forEach((b, i) => {
                setTimeout(
                  () => {
                    b.style.width = b.dataset.w + "%";
                  },
                  150 + i * 80,
                );
              });
              barObserver.unobserve(e.target);
            }
          });
        },
        { threshold: 0.25 },
      );
      const skillsEl = document.getElementById("skills");
      if (skillsEl) barObserver.observe(skillsEl);

      const dividerObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("glow");
              setTimeout(() => e.target.classList.remove("glow"), 1200);
            }
          });
        },
        { threshold: 0.8 },
      );
      document
        .querySelectorAll(".section-divider")
        .forEach((d) => dividerObserver.observe(d));

      document.querySelectorAll(".tilt").forEach((card) => {
        card.addEventListener("mousemove", (e) => {
          const r = card.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - 0.5;
          const y = (e.clientY - r.top) / r.height - 0.5;
          card.style.transform = `perspective(600px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale(1.03)`;
        });
        card.addEventListener("mouseleave", () => {
          card.style.transform = "";
        });
      });

      document.querySelectorAll(".magnetic").forEach((btn) => {
        btn.addEventListener("mousemove", (e) => {
          const r = btn.getBoundingClientRect();
          const dx = (e.clientX - (r.left + r.width / 2)) * 0.35;
          const dy = (e.clientY - (r.top + r.height / 2)) * 0.35;
          btn.style.transform = `translate(${dx}px, ${dy}px)`;
        });
        btn.addEventListener("mouseleave", () => {
          btn.style.transform = "";
        });
      });

      function openLightbox(src, caption) {
        const lb = document.getElementById("lightbox");
        document.getElementById("lb-img").src = src;
        document.getElementById("lb-caption").textContent = caption || "";
        lb.classList.add("open");
        document.body.style.overflow = "hidden";
      }
      function closeLightbox() {
        document.getElementById("lightbox").classList.remove("open");
        document.body.style.overflow = "";
      }
      document.getElementById("lightbox").addEventListener("click", (e) => {
        if (e.target.id === "lightbox") closeLightbox();
      });
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeLightbox();
      });

      window.addEventListener("load", () => {
        document
          .querySelectorAll(".slide-left, .slide-right")
          .forEach((el, i) => {
            setTimeout(() => el.classList.add("in"), 200 + i * 150);
          });
      });
    

// ----- NOUVEAUX EFFETS -----

// Transitions de pages
document.querySelectorAll('a[href]').forEach(a => {
  const href = a.getAttribute('href');
  if(href && href.endsWith('.html') && !href.startsWith('http') && a.target !== '_blank') {
    a.addEventListener('click', e => {
      e.preventDefault();
      document.body.classList.add('page-leave');
      setTimeout(() => {
        window.location.href = href;
      }, 400);
    });
  }
});

// ----- CUSTOM CURSOR -----
const cursor = document.createElement("div");
cursor.id = "custom-cursor";
document.body.appendChild(cursor);

const cursorDot = document.createElement("div");
cursorDot.id = "custom-cursor-dot";
document.body.appendChild(cursorDot);

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let cursorX = mouseX;
let cursorY = mouseY;

window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
});

function animateCursor() {
  const dx = mouseX - cursorX;
  const dy = mouseY - cursorY;
  cursorX += dx * 0.15;
  cursorY += dy * 0.15;
  cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
  requestAnimationFrame(animateCursor);
}
requestAnimationFrame(animateCursor);

document.querySelectorAll('a, button, .project-card, .edu-card, .hobby-card, .magnetic, input, textarea').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
});
