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
});
