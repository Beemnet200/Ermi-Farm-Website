// Yenai Dairy Farm — shared site behavior

document.addEventListener("DOMContentLoaded", () => {
  // Mobile nav toggle
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  if (toggle && header) {
    toggle.addEventListener("click", () => {
      header.classList.toggle("nav-open");
    });
  }

  // Sticky header gains a shadow once the page scrolls
  if (header) {
    const updateHeaderShadow = () => {
      header.classList.toggle("scrolled", window.scrollY > 12);
    };
    updateHeaderShadow();
    window.addEventListener("scroll", updateHeaderShadow, { passive: true });
  }

  // Contact form (placeholder submit handler — wire up to a real backend/service later)
  const contactForm = document.querySelector("#contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const status = contactForm.querySelector(".form-status");
      if (status) {
        status.textContent = "Thank you! Your message has been noted — we'll be in touch soon.";
      }
      contactForm.reset();
    });
  }

  // Lightbox — click any .lightbox-trigger image to view it enlarged
  const lightbox = document.querySelector("#lightbox");
  const lightboxImg = document.querySelector("#lightbox-img");
  const lightboxClose = document.querySelector("#lightbox-close");
  if (lightbox && lightboxImg) {
    const openLightbox = (src, alt) => {
      lightboxImg.src = src;
      lightboxImg.alt = alt || "";
      lightbox.hidden = false;
      document.body.style.overflow = "hidden";
    };
    const closeLightbox = () => {
      lightbox.hidden = true;
      lightboxImg.src = "";
      document.body.style.overflow = "";
    };
    document.addEventListener("click", (e) => {
      const trigger = e.target.closest(".lightbox-trigger");
      if (trigger) {
        openLightbox(trigger.src, trigger.alt);
      }
    });
    lightboxClose && lightboxClose.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !lightbox.hidden) closeLightbox();
    });
  }

  // Horizontal carousels — any "next" button with data-track scrolls its track, looping at the end
  document.querySelectorAll(".gallery-nav-btn[data-track]").forEach((btn) => {
    const track = document.querySelector(btn.dataset.track);
    if (!track) return;
    btn.addEventListener("click", () => {
      const item = track.firstElementChild;
      const step = item ? item.getBoundingClientRect().width + 20 : 280;
      const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
      track.scrollTo({
        left: atEnd ? 0 : track.scrollLeft + step,
        behavior: "smooth",
      });
    });
  });

  // Scroll-reveal — elements are visible by default (works with no JS / reduced motion).
  // Every .reveal element stays observed for the life of the page: it fades + slides in
  // each time it enters the viewport, and resets each time it leaves, so scrolling up and
  // down replays the animation instead of it firing only once.
  //
  // "reveal-pending" is only kept on an element while it's actively animating (during the
  // ~1.4s entrance transition, or once it has exited and is waiting to re-enter). Once an
  // entrance finishes it's dropped again, same as before, so a settled, on-screen card's
  // hover-lift transform isn't fighting the reveal system's own transform the rest of the
  // time it sits in view.
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealEls = document.querySelectorAll(".reveal");
  if (!prefersReducedMotion && "IntersectionObserver" in window && revealEls.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target;
          clearTimeout(el._revealTimer);
          if (entry.isIntersecting) {
            el.classList.add("reveal-pending");
            void el.offsetWidth; // flush styles so the hidden state paints before animating in
            el.classList.add("in-view");
            el._revealTimer = setTimeout(() => el.classList.remove("reveal-pending"), 1400);
          } else {
            el.classList.remove("in-view");
            el.classList.add("reveal-pending");
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const alreadyVisible = rect.top < window.innerHeight && rect.bottom > 0;
      if (alreadyVisible) el.classList.add("in-view"); // no flash for above-fold content
      else el.classList.add("reveal-pending");
      observer.observe(el);
    });
  }

  // Animated stat counters — count up once when scrolled into view.
  // Skips anything that isn't a plain leading number (e.g. bracketed placeholders, "#1").
  const counterEls = document.querySelectorAll(".hero-stat .num, .stat-box .num");
  if (!prefersReducedMotion && "IntersectionObserver" in window && counterEls.length) {
    const counterObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          obs.unobserve(el);
          const match = el.textContent.match(/^(\d+)(.*)$/);
          if (!match) return;
          const target = parseInt(match[1], 10);
          const suffix = match[2];
          const duration = 1200;
          const start = performance.now();
          const step = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(target * eased) + suffix;
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        });
      },
      { threshold: 0.4 }
    );
    counterEls.forEach((el) => counterObserver.observe(el));
  }
});
