/* =========================================================
   main.js - behaviour shared by every page.

   What it does:
   - Highlights the nav link for the page you are on
   - Opens and closes the mobile menu
   - Adds a glow under the header after you scroll
   - Shows a small message ("toast") for the contact form
   - Fills in the copyright year
   - Provides helper functions used by the other scripts
   ========================================================= */


/* ---------- Helper: make user text safe to put into HTML ----------
   Anything you type into the project or gallery lists goes through this,
   so a stray < or " cannot break the page. */
function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}


/* ---------- Helper: show a short message at the bottom of the screen ---------- */
let toastTimer = null;

function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  // Hide it again after 3.5 seconds. Clearing the old timer stops
  // a previous message from hiding a new one too early.
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 3500);
}

// Make showToast available to the other scripts (contact.js uses it)
window.showToast = showToast;
window.escapeHtml = escapeHtml;


/* ---------- 1. Highlight the current page in the navigation ---------- */
(function highlightCurrentPage() {
  // "projects.html" from "/projects.html". The home page URL ends in "/", so it falls back to index.html.
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".nav-link").forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });
})();


/* ---------- 2. Mobile menu (hamburger button) ---------- */
(function setupMobileMenu() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-nav");
  if (!toggle || !nav) return;

  // Open or close the menu when the button is pressed
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close the menu after choosing a page
  nav.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
})();


/* ---------- 3. Header glow after scrolling ---------- */
(function setupHeaderScrollState() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  const updateHeader = () => {
    header.classList.toggle("scrolled", window.scrollY > 10);
  };

  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader(); // run once on load in case the page starts scrolled
})();


/* ---------- 4. Copyright year in the footer ---------- */
const yearElement = document.getElementById("year");
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}
