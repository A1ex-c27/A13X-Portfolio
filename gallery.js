/* =========================================================
   gallery.js - the picture sorter on gallery.html

   HOW THE SORT BUTTONS WORK
   Each picture has a "category" id. Clicking a button shows only the
   pictures with that id. "All" shows everything.

   HOW TO ADD YOUR OWN PICTURE
   1. Copy your photo into the matching folder inside assets/images/gallery/
      (nature, architecture, street, or cars). Use a simple file name, no spaces.
      Tip: resize big photos to about 1600 pixels wide first so the page loads fast.
   2. Copy one line from { to } and paste it at the end of GALLERY_ITEMS.
      Then change these:
        - title:    the caption shown under the picture
        - category: one of the ids below, for example "nature"
        - image:    the path to your photo, for example "assets/images/gallery/cars/my-car.jpg"
        - alt:      a short description, read aloud by screen readers
        - credit:   a line shown in the full-screen viewer. Leave "" for your own photos.
        - size:     "tall", "wide", or "" for a normal tile
   3. Save the file and refresh the page.

   HOW TO ADD A NEW SORT BUTTON
   1. Add a line to GALLERY_CATEGORIES with a new id and a label, for example
        { id: "portraits", label: "Portraits" },
   2. Give your pictures that same id in their "category" field.
   ========================================================= */

// The sort buttons, in the order they appear. "all" shows every picture.
const GALLERY_CATEGORIES = [
  { id: "all", label: "All" },
  { id: "nature", label: "Nature" },
  { id: "architecture", label: "Architecture" },
  { id: "street", label: "Street" },
  { id: "cars", label: "Cars" },
];

// Every picture on the page
const GALLERY_ITEMS = [
  { title: "Jungle pond", category: "nature", image: "assets/images/gallery/nature/jungle-pond.jpg", alt: "Lush jungle pond with large green leaves", credit: "", size: "" },
  { title: "Highland ridge", category: "nature", image: "assets/images/gallery/nature/highland-ridge.jpg", alt: "Misty green highland ridge at sunrise", credit: "", size: "" },
  { title: "Pink blossom river", category: "nature", image: "assets/images/gallery/nature/pink-blossom-river.jpg", alt: "Pink blossom trees beside a calm river", credit: "", size: "" },
  { title: "Waterfall and bridge", category: "nature", image: "assets/images/gallery/nature/waterfall-bridge.jpg", alt: "Tall waterfall with a white footbridge", credit: "", size: "" },
  { title: "Redwood canopy", category: "nature", image: "assets/images/gallery/nature/redwood-canopy.jpg", alt: "Looking up through very tall redwood trees", credit: "", size: "" },
  { title: "Tree study 01", category: "nature", image: "assets/images/gallery/nature/tree-01.jpg", alt: "Tree photo by Bryce Evans", credit: "Photo by Bryce Evans on Unsplash", size: "" },
  { title: "Tree study 02", category: "nature", image: "assets/images/gallery/nature/tree-02.jpg", alt: "Tree photo by Chris Lejarazu", credit: "Photo by Chris Lejarazu on Unsplash", size: "" },
  { title: "Tree study 03", category: "nature", image: "assets/images/gallery/nature/tree-03.jpg", alt: "Tree photo by Lukasz Szmigiel", credit: "Photo by Lukasz Szmigiel on Unsplash", size: "" },
  { title: "Tree study 04", category: "nature", image: "assets/images/gallery/nature/tree-04.jpg", alt: "Tree photo by Matthew Smith", credit: "Photo by Matthew Smith on Unsplash", size: "" },
  { title: "Tree study 05", category: "nature", image: "assets/images/gallery/nature/tree-05.jpg", alt: "Tree photo by Spencer Watson", credit: "Photo by Spencer Watson on Unsplash", size: "" },
  { title: "Tree study 06", category: "nature", image: "assets/images/gallery/nature/tree-06.jpg", alt: "Tree photo by Victoria Palacios", credit: "Photo by Victoria Palacios on Unsplash", size: "" },
  { title: "Angled facade", category: "architecture", image: "assets/images/gallery/architecture/angled-facade.jpg", alt: "Angled metal facade rising into the sky", credit: "", size: "" },
  { title: "White tower", category: "architecture", image: "assets/images/gallery/architecture/white-tower.jpg", alt: "White building with stacked balconies", credit: "", size: "" },
  { title: "Glass museum", category: "architecture", image: "assets/images/gallery/architecture/glass-museum.jpg", alt: "Glass and white museum with a sharp roofline", credit: "", size: "" },
  { title: "Curved blue building", category: "architecture", image: "assets/images/gallery/architecture/curved-blue.jpg", alt: "Curved blue striped building seen from below", credit: "", size: "" },
  { title: "Twin towers", category: "architecture", image: "assets/images/gallery/architecture/twin-towers.jpg", alt: "Two tall office towers against a blue sky", credit: "", size: "" },
  { title: "Dubai skyline", category: "architecture", image: "assets/images/gallery/architecture/dubai-skyline.jpg", alt: "Night skyline with a very tall tower", credit: "", size: "" },
  { title: "Tokyo street at night", category: "street", image: "assets/images/gallery/street/tokyo-street-night.jpg", alt: "Neon-lit city street at night with a taxi", credit: "", size: "" },
  { title: "Red alley reflections", category: "street", image: "assets/images/gallery/street/red-alley-reflections.jpg", alt: "Narrow alley with red lights reflected in wet ground", credit: "", size: "" },
  { title: "Shibuya crossing", category: "street", image: "assets/images/gallery/street/shibuya-crossing.jpg", alt: "Aerial view of a busy crossing at night", credit: "", size: "" },
  { title: "Kabukicho sign", category: "street", image: "assets/images/gallery/street/kabukicho-sign.jpg", alt: "Glowing red arch sign above a street", credit: "", size: "" },
  { title: "Silver Porsche", category: "cars", image: "assets/images/gallery/cars/silver-porsche.jpg", alt: "Silver Porsche 911 parked outside a glass building", credit: "", size: "" },
  { title: "Black sports car", category: "cars", image: "assets/images/gallery/cars/black-sports-car.jpg", alt: "Dark sports car in a shadowy, wet space", credit: "", size: "" },
  { title: "Pink headlights", category: "cars", image: "assets/images/gallery/cars/pink-headlights.jpg", alt: "Car with glowing pink headlights at dusk", credit: "", size: "" },
  { title: "Motul race car", category: "cars", image: "assets/images/gallery/cars/motul-race-car.jpg", alt: "Close-up of a blue race car with red accents", credit: "", size: "" },
  { title: "Purple Lamborghini", category: "cars", image: "assets/images/gallery/cars/purple-lamborghini.jpg", alt: "Low sports car lit in purple light", credit: "", size: "" },
];


/* ---------- Build the filter buttons and the picture tiles ---------- */
function buildGallery() {
  const filterBar = document.getElementById("filter-bar");
  const grid = document.getElementById("gallery-grid");
  if (!filterBar || !grid) return; // Not on the gallery page

  // Filter buttons. The "All" button starts selected.
  filterBar.innerHTML = GALLERY_CATEGORIES.map(
    (category) => `
      <button type="button" class="filter-btn" data-filter="${escapeHtml(category.id)}"
              aria-pressed="${category.id === "all"}">
        ${escapeHtml(category.label)}
      </button>`
  ).join("");

  // Picture tiles. data-index links each tile to its entry in GALLERY_ITEMS.
  grid.innerHTML = GALLERY_ITEMS.map(
    (item, index) => `
      <button type="button" class="gallery-item ${escapeHtml(item.size || "")}"
              data-index="${index}" data-category="${escapeHtml(item.category)}">
        <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.alt || item.title)}" loading="lazy">
        <span class="gallery-caption">${escapeHtml(item.title)}</span>
      </button>`
  ).join("");

  // Clicking a filter hides the tiles that do not match
  filterBar.addEventListener("click", (event) => {
    const button = event.target.closest(".filter-btn");
    if (!button) return;

    const selected = button.dataset.filter;

    filterBar.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.setAttribute("aria-pressed", String(btn === button));
    });

    grid.querySelectorAll(".gallery-item").forEach((tile) => {
      tile.hidden = selected !== "all" && tile.dataset.category !== selected;
    });
  });

  // Clicking a tile opens it in the lightbox
  grid.addEventListener("click", (event) => {
    const tile = event.target.closest(".gallery-item");
    if (!tile) return;
    openLightbox(GALLERY_ITEMS[Number(tile.dataset.index)]);
  });
}


/* ---------- Lightbox: a full-screen view of one picture ---------- */
let lastFocusedElement = null; // Remembers where the keyboard focus was before the viewer opened

function openLightbox(item) {
  const lightbox = document.getElementById("lightbox");
  const image = document.getElementById("lightbox-img");
  const caption = document.getElementById("lightbox-caption");
  const closeButton = document.getElementById("lightbox-close");
  if (!lightbox) return;

  lastFocusedElement = document.activeElement;
  image.src = item.image;
  image.alt = item.alt || item.title;
  caption.textContent = item.credit ? `${item.title}. ${item.credit}` : item.title;
  lightbox.hidden = false;
  closeButton.focus(); // Move focus into the viewer so keyboard users can use it
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  if (!lightbox) return;

  lightbox.hidden = true;
  if (lastFocusedElement) lastFocusedElement.focus();
}

function setupLightbox() {
  const lightbox = document.getElementById("lightbox");
  const closeButton = document.getElementById("lightbox-close");
  if (!lightbox || !closeButton) return;

  // Close when the close button or the dark background is clicked
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox || event.target === closeButton) {
      closeLightbox();
    }
  });

  // Close with the Escape key
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !lightbox.hidden) {
      closeLightbox();
    }
  });
}

buildGallery();
setupLightbox();
