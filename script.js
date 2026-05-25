(function () {
  const header = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  const form = document.querySelector(".subscribe-form");

  // Header scroll state
  function onScroll() {
    header.classList.toggle("scrolled", window.scrollY > 48);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile menu
  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const open = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("open", !open);
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menuToggle.setAttribute("aria-expanded", "false");
        nav.classList.remove("open");
      });
    });
  }

  // Scroll reveal
  const revealTargets = document.querySelectorAll(
    ".manifest, .sections-header, .card, .issue-content, .issue-cover, .audience-quote, .audience-stats, .subscribe-inner"
  );

  revealTargets.forEach((el) => el.classList.add("reveal"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  revealTargets.forEach((el, i) => {
    el.style.transitionDelay = `${Math.min(i * 0.08, 0.4)}s`;
    observer.observe(el);
  });

  // Stagger cards
  document.querySelectorAll(".card").forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.1}s`;
  });

  // Subscribe form (demo)
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const btn = form.querySelector("button");
      const originalText = btn.textContent;

      btn.textContent = "Tak — du er med";
      btn.disabled = true;
      input.value = "";
      input.disabled = true;

      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
        input.disabled = false;
      }, 3000);
    });
  }
})();
