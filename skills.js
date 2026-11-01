/* =========================================================
   skills.js - the skills list on skills.html

   HOW TO UPDATE A SKILL
   - Change "level" to 1, 2, or 3:
       1 = Just starting
       2 = Learning
       3 = Comfortable with basics
   - Change "note" to describe what you can actually do with it.

   HOW TO ADD A SKILL
   Copy a { name, level, note } block into the right group and edit it.

   HOW TO ADD A GROUP
   Copy a whole group block and give it a new title.

   Keep the levels honest. Only raise a level when you can really do
   the thing without help. Every level here is a starting point.
   ========================================================= */

// The label shown for each level number
const SKILL_LEVELS = {
  1: "Just starting",
  2: "Learning",
  3: "Comfortable with basics",
};

const SKILL_GROUPS = [
  {
    title: "Web basics",
    skills: [
      {
        name: "HTML",
        level: 2,
        note: "Structuring pages with headings, links, images, and forms.",
      },
      {
        name: "CSS",
        level: 2,
        note: "Styling layouts, colours, and simple responsive designs.",
      },
      {
        name: "JavaScript",
        level: 1,
        note: "Starting to add simple interactions, such as menus and form checks.",
      },
    ],
  },
  {
    title: "Programming and tools",
    skills: [
      {
        name: "Programming fundamentals",
        level: 1,
        note: "Variables, conditions, loops, and functions, learned through class and practice exercises.",
      },
      {
        name: "Git and GitHub",
        level: 1,
        note: "Saving versions of a project and publishing a site with GitHub Pages.",
      },
    ],
  },
  {
    title: "Game development",
    skills: [
      {
        name: "Game development",
        level: 1,
        note: "First-year BSIT coursework. Learning the basics of how games are designed and built.",
      },
    ],
  },
];


/* ---------- Build one skill card ---------- */
function createSkillCard(skill) {
  // Three segments make the meter. Segments up to the level number are lit.
  const segments = [1, 2, 3]
    .map((segment) => `<span class="${segment <= skill.level ? "on" : ""}"></span>`)
    .join("");

  return `
    <div class="frame skill">
      <div class="skill-top">
        <h3 class="skill-name">${escapeHtml(skill.name)}</h3>
        <span class="skill-level">${escapeHtml(SKILL_LEVELS[skill.level])}</span>
      </div>
      <div class="meter" aria-hidden="true">${segments}</div>
      <p class="skill-note">${escapeHtml(skill.note)}</p>
    </div>
  `;
}


/* ---------- Build all the groups on the page ---------- */
function renderSkills() {
  const container = document.getElementById("skills-container");
  if (!container) return; // Stop here on pages without a skills area

  container.innerHTML = SKILL_GROUPS.map(
    (group) => `
      <div class="skill-group">
        <h2 class="group-title">${escapeHtml(group.title)}</h2>
        <div class="skill-grid">
          ${group.skills.map(createSkillCard).join("")}
        </div>
      </div>
    `
  ).join("");
}

renderSkills();
