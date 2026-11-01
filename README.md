# Andrei Custodio - Portfolio

A personal portfolio website built with plain HTML, CSS, and JavaScript.
No frameworks and no build tools. Open `index.html` in a browser to preview it.

## Folder structure

```
Andrei-Portfolio/
├── index.html            Home page
├── about.html            About me (includes your portrait)
├── gallery.html          Photo gallery with sort buttons
├── skills.html           Skills
├── contact.html          Contact form and email
├── css/
│   └── style.css         All the styling for the site
├── js/
│   ├── main.js           Shared behaviour: menu, active links, messages
│   ├── gallery.js        The sort buttons and every gallery picture (edit this)
│   ├── skills.js         Your skill list and levels
│   └── contact.js        Your email address and form settings
├── assets/
│   └── images/
│       ├── placeholder.svg       Stand-in image shown until you add your own
│       └── gallery/
│           ├── nature/           Nature photos
│           ├── architecture/     Architecture photos
│           ├── street/           Street photos
│           └── cars/             Car photos
├── .nojekyll             Tells GitHub Pages to serve the files as they are
└── README.md             This file
```

## The gallery sort buttons

The gallery has five buttons: All, Nature, Architecture, Street, and Cars.
Clicking a category shows only its photos. "All" shows everything.

Each picture belongs to one category. The category is set by its `category` field in `js/gallery.js`.

## Adding your own pictures

1. **Resize the photo first (recommended).** Phone and camera photos can be several
   megabytes. Resize them to about 1600 pixels wide so the site loads quickly. Any
   photo editor can do this.
2. **Copy the photo into the right folder** inside `assets/images/gallery/`, such as
   `cars/`. Use a simple file name with no spaces, for example `my-garage.jpg`.
3. **Open `js/gallery.js`** and find `GALLERY_ITEMS`.
4. **Copy one line from `{` to `}` and paste it at the end of the list.** Then change:
   - `title`: the caption under the picture
   - `category`: one of `nature`, `architecture`, `street`, or `cars`
   - `image`: the path to your photo, such as `"assets/images/gallery/cars/my-garage.jpg"`
   - `alt`: a short description for screen readers
   - `credit`: a line shown in the full-screen viewer. Use `""` for your own photos.
5. **Save the file and refresh the browser.** Your picture appears under its category.

## Adding a new sort button

1. In `js/gallery.js`, find `GALLERY_CATEGORIES`.
2. Add a line with a new id and a label, for example:
   `{ id: "portraits", label: "Portraits" },`
3. Give your pictures the same id in their `category` field.

## Changing your portrait on the About page

1. Copy your photo into `assets/images/`, for example `andrei.jpg`.
2. Open `about.html` and find the line that starts with `<img src="assets/images/andrei.jpg"`.
   Make sure the file name matches yours.
3. Save and refresh. The photo gets a cyan-blue cyberpunk look, and it shows in full
   colour when you hover over it.

Until you add the photo, a placeholder image appears in that spot.

## How to edit common things

| What you want to change | Where to change it |
| --- | --- |
| Your name, tagline, welcome message | `index.html` (the hero section) |
| About text, interests, goals | `about.html` (paragraphs marked EDIT ME) |
| Your portrait | `about.html` (the `portrait` block) and `assets/images/` |
| Gallery pictures | `js/gallery.js` (`GALLERY_ITEMS`) |
| Sort buttons | `js/gallery.js` (`GALLERY_CATEGORIES`) |
| Skill levels | `js/skills.js` |
| Colours and fonts | `css/style.css` (the "Design tokens" section at the top) |
| Email address | `js/contact.js` (`CONTACT_CONFIG.email`) |

## Contact form

By default the form opens the visitor's email app with the message already written,
addressed to your email. To receive messages straight in your inbox instead, set up
a free form service such as Formspree and follow the steps at the top of `js/contact.js`.

## Publishing on GitHub Pages

Repository Settings, then Pages, then Deploy from a branch, then `main` and `/ (root)`.
Once it is live, the site will be at `https://your-username.github.io/your-repository-name/`.
