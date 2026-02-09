// Public init (navbar.js will trigger this after injecting navbar.html)
window.initSite = function initSite() {
  initHamburger();
  initTransitions();
};

function initHamburger() {
  const menu = document.querySelector(".navbar__toggle");
  const menuLinks = document.querySelector(".navbar__menu");
  if (!menu || !menuLinks) return;

  if (menu.dataset.bound === "true") return;
  menu.dataset.bound = "true";

  const setIcon = (open) => {
    menu.textContent = open ? "✕" : "☰";
    menu.setAttribute("aria-expanded", String(open));
  };

  setIcon(menu.classList.contains("is-active"));

  menu.addEventListener("click", () => {
    menu.classList.toggle("is-active");
    menuLinks.classList.toggle("active");
    setIcon(menu.classList.contains("is-active"));
  });
}

function initTransitions() {
  if (document.documentElement.dataset.transitionsBound === "true") return;
  document.documentElement.dataset.transitionsBound = "true";

  window.addEventListener("pageshow", () => {
    document.body.classList.add("loaded");
    const overlay = document.getElementById("page-transition");
    if (overlay) overlay.classList.remove("show");
  });


  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[href]");
    if (!link) return;

    const href = link.getAttribute("href");

    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey || event.ctrlKey || event.shiftKey || event.altKey ||
      link.target === "_blank" ||
      link.hasAttribute("download") ||
      !href ||
      href.startsWith("#")
    ) return;

    const url = new URL(href, window.location.href);

    if (url.origin !== window.location.origin) return;

    if (url.pathname === window.location.pathname && url.search === window.location.search) return;

    event.preventDefault();
    document.body.classList.add("fade-out");

    const overlay = document.getElementById("page-transition");
    if (overlay) overlay.classList.add("show");

    setTimeout(() => {
      window.location.href = url.href;
      }, 400);
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", window.initSite);
} else {
  window.initSite();
}

document.addEventListener("navbar:loaded", window.initSite);
