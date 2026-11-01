/* =========================================================
   contact.js - the contact form on contact.html

   HOW THIS FORM WORKS
   GitHub Pages only hosts fixed files. It cannot receive form data by itself.
   So this form works in one of two ways:

   1. DEFAULT (formEndpoint is ""):
      When someone sends the form, their email app opens with the message
      already written, addressed to your email. They press send from there.
      No sign-up needed.

   2. FORM SERVICE (recommended for later):
      Use a free form service such as Formspree (formspree.io).
      Create a form there, copy its endpoint URL (it looks like
      https://formspree.io/f/abcd1234), and paste it into formEndpoint below.
      Messages then arrive in your inbox directly.

   WHAT TO CHANGE LATER
   - email:        keep this as your real contact address
   - formEndpoint: paste your form service URL here, or leave it empty
   ========================================================= */

const CONTACT_CONFIG = {
  email: "andreicustodio98@gmail.com",
  formEndpoint: "", // Example: "https://formspree.io/f/your-form-id"
};


/* ---------- Form setup ---------- */
function setupContactForm() {
  const form = document.getElementById("contact-form");
  const statusMessage = document.getElementById("form-status");
  if (!form || !statusMessage) return; // Not on the contact page

  // Each field, found by its id in contact.html
  const fields = {
    name: document.getElementById("name"),
    email: document.getElementById("email"),
    subject: document.getElementById("subject"),
    message: document.getElementById("message"),
  };
  const honeypot = document.getElementById("website"); // Hidden from people, filled in only by bots

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Bots that fill in the hidden field are quietly ignored
    if (honeypot && honeypot.value !== "") return;

    clearErrors();

    // Check every field before sending anything
    let isValid = true;

    if (fields.name.value.trim() === "") {
      showFieldError("name", "Please enter your name.");
      isValid = false;
    }

    if (!isValidEmail(fields.email.value.trim())) {
      showFieldError("email", "Please enter an email address like name@example.com.");
      isValid = false;
    }

    if (fields.message.value.trim().length < 10) {
      showFieldError("message", "Please write at least 10 characters so I know what you need.");
      isValid = false;
    }

    if (!isValid) {
      statusMessage.textContent = "Please fix the highlighted fields and try again.";
      return;
    }

    // Use the form service if one is set. Otherwise open the email app.
    if (CONTACT_CONFIG.formEndpoint) {
      await sendWithFormService(form, statusMessage);
    } else {
      openEmailApp(fields, statusMessage);
    }
  });
}


/* ---------- Check that an email looks right (a simple check, not perfect) ---------- */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}


/* ---------- Show and clear error messages ---------- */
function showFieldError(fieldId, message) {
  const input = document.getElementById(fieldId);
  const wrapper = input.closest(".field");
  const errorText = document.getElementById(`error-${fieldId}`);

  wrapper.classList.add("invalid");
  input.setAttribute("aria-invalid", "true");
  errorText.textContent = message;
}

function clearErrors() {
  document.querySelectorAll(".field").forEach((wrapper) => {
    wrapper.classList.remove("invalid");
    const input = wrapper.querySelector("input, textarea");
    if (input) input.removeAttribute("aria-invalid");
  });
  document.querySelectorAll(".field-error").forEach((error) => {
    error.textContent = "";
  });
}


/* ---------- Option 1: open the visitor's email app ---------- */
function openEmailApp(fields, statusMessage) {
  const name = fields.name.value.trim();
  const email = fields.email.value.trim();
  const subject = fields.subject.value.trim() || `Portfolio message from ${name}`;
  const message = fields.message.value.trim();

  // Build a mailto link. encodeURIComponent makes spaces and line breaks safe in the link.
  const body = `${message}\n\n-- ${name} (${email})`;
  const link =
    `mailto:${CONTACT_CONFIG.email}` +
    `?subject=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(body)}`;

  window.location.href = link;

  statusMessage.textContent =
    `Your email app should open with the message ready. If nothing happens, email ${CONTACT_CONFIG.email} directly.`;
}


/* ---------- Option 2: send through a form service ---------- */
async function sendWithFormService(form, statusMessage) {
  statusMessage.textContent = "Sending...";

  try {
    const response = await fetch(CONTACT_CONFIG.formEndpoint, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Form service responded with status ${response.status}`);
    }

    form.reset();
    statusMessage.textContent = "Thanks! Your message has been sent.";
    window.showToast("Message sent");
  } catch (error) {
    console.error(error);
    statusMessage.textContent =
      `Something went wrong and your message was not sent. Please email ${CONTACT_CONFIG.email} directly.`;
  }
}

setupContactForm();
