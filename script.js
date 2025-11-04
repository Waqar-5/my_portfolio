// Typewriter effect
const typewriterElement = document.querySelector('.typewriter-js');
const texts = [
  "Web Developer & UI Enthusiast.",
  "Crafting smooth, responsive websites.",
  "Turning ideas into interactive reality.",
  "Driven by creativity and clean code."
];
let index = 0;
let charIndex = 0;
let currentText = '';
let isDeleting = false;
let delay = 100;

function type() {
  if (index >= texts.length) index = 0;
  currentText = texts[index];

  if (!isDeleting) {
    typewriterElement.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentText.length) {
      isDeleting = true;
      delay = 1500;
    } else {
      delay = 100;
    }
  } else {
    typewriterElement.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      index++;
      delay = 500;
    } else {
      delay = 50;
    }
  }

  setTimeout(type, delay);
}
type();

// Contact form submission
document.getElementById("contact-form").addEventListener("submit", async function(e) {
  e.preventDefault();

  const formData = new FormData(this);
  const body = new URLSearchParams(formData).toString(); // x-www-form-urlencoded

  try {
    const response = await fetch("/.netlify/functions/contact", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body
    });

    if (response.ok) {
      Swal.fire({
        title: "✅ Message Sent!",
        text: "Thank you for reaching out. I'll get back to you soon.",
        icon: "success",
        background: "#f0f0f0",
        color: "#333"
      });
      this.reset();
    } else {
      const text = await response.text();
      Swal.fire({
        title: "❌ Error!",
        text: text,
        icon: "error",
        background: "#f0f0f0",
        color: "#333"
      });
    }
  } catch (err) {
    Swal.fire({
      title: "❌ Network Error!",
      text: err,
      icon: "error",
      background: "#f0f0f0",
      color: "#333"
    });
  }
});
