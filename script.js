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
      delay = 1500; // pause at full text
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
