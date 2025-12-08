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






// skills
  const skills = [
  { name: "HTML", img: "./assets/html.webp", level: 95 },
  { name: "CSS / Bootstrap", img: "./assets/css.avif", level: 90 },
  { name: "JavaScript", img: "./assets/JS.avif", level: 85 },
  { name: "Next.js", img: "https://cdn.worldvectorlogo.com/logos/nextjs-2.svg", level: 60 },
  // { name: "React", img: "https://cdn-icons-png.flaticon.com/512/1183/1183672.png", level: 85 },
  // { name: "Tailwind CSS", img: "https://cdn.worldvectorlogo.com/logos/tailwindcss-icon.svg", level: 50 },
  { name: "Tailwind CSS", img: "https://tse2.mm.bing.net/th/id/OIP.pP2p8guRbZhxjPk0PFJnMAHaHa?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3", level: 50 },

  { name: "Python", img: "https://cdn-icons-png.flaticon.com/512/5968/5968350.png", level: 80 },
  { name: "OpenAI Agents SDK", img: "https://tse2.mm.bing.net/th/id/OIP.QQMzuDuw-Ed49NkYNr905QHaEW?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3", level: 60 },
  // { name: "Node.js", img: "https://cdn-icons-png.flaticon.com/512/919/919825.png", level: 65 }
];



  const carouselContent = document.getElementById("carouselContent");

  for(let i=0; i<skills.length; i+=3){
    const slideSkills = skills.slice(i, i+3);
    const slideDiv = document.createElement("div");
    slideDiv.classList.add("carousel-item");
    if(i === 0) slideDiv.classList.add("active");

    let innerHTML = `<div class="row g-4 justify-content-center">`;
    slideSkills.forEach(skill => {
      innerHTML += `
        <div class="col-md-3">
          <div class="skill-card shadow" style="--skill-level: ${skill.level}%">
            <img src="${skill.img}" alt="${skill.name}">
            <div class="overlay">
              ${skill.name}
              <div class="progress">
                <div class="progress-bar"></div>
              </div>
              <small>${skill.level}% proficiency</small>
            </div>
          </div>
        </div>
      `;
    });
    innerHTML += `</div>`;
    slideDiv.innerHTML = innerHTML;
    carouselContent.appendChild(slideDiv);
  }
