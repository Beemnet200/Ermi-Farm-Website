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

  // Home page gallery carousel — "next" button scrolls through the photos, looping at the end
  const galleryTrack = document.querySelector("#home-gallery-track");
  const galleryNext = document.querySelector("#home-gallery-next");
  if (galleryTrack && galleryNext) {
    galleryNext.addEventListener("click", () => {
      const item = galleryTrack.querySelector(".home-gallery-item");
      const step = item ? item.getBoundingClientRect().width + 20 : 280;
      const atEnd = galleryTrack.scrollLeft + galleryTrack.clientWidth >= galleryTrack.scrollWidth - 4;
      galleryTrack.scrollTo({
        left: atEnd ? 0 : galleryTrack.scrollLeft + step,
        behavior: "smooth",
      });
    });
  }
});
