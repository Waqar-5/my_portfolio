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




//   // 🔐 Encoded Formspree ID
// const encodedID = "bXFhZ3ZuYXA="; // Your encoded 'mqagvnap'
// const formID = atob(encodedID);
// const formURL = `https://formspree.io/f/${formID}`;

// document.getElementById("contact-form").addEventListener("submit", async function (e) {
//   e.preventDefault();
//   const formData = new FormData(this);

//   // Show sending alert
//   Swal.fire({
//     title: "Sending...",
//     text: "Please wait while your message is being sent.",
//     icon: "info",
//     showConfirmButton: false,
//     background: "#f0f0f0",
//     color: "#333"
//   });

//   // Send the form data to Formspree
//   const response = await fetch(formURL, {
//     method: "POST",
//     body: formData,
//     headers: { Accept: "application/json" }
//   });

//   if (response.ok) {
//     Swal.fire({
//       title: "✅ Message Sent!",
//       text: "Thank you for reaching out. I'll get back to you soon!",
//       icon: "success",
//       background: "#f0f0f0",
//       color: "#333"
//     });
//     this.reset(); // Clear the form
//   } else {
//     Swal.fire({
//       title: "❌ Error!",
//       text: "Something went wrong. Please try again later.",
//       icon: "error",
//       background: "#f0f0f0",
//       color: "#333"
//     });
//   }
// });


document.getElementById("contact-form").addEventListener("submit", async function(e) {
  e.preventDefault();
  
  const formData = new FormData(this);
  const body = new URLSearchParams(formData).toString(); // send x-www-form-urlencoded

  try {
    const response = await fetch("/.netlify/functions/contact", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body
    });

    if (response.ok) {
      alert("✅ Message sent! Thank you for reaching out.");
      this.reset();
    } else {
      const text = await response.text();
      alert("❌ Error: " + text);
    }
  } catch (err) {
    alert("❌ Network or server error: " + err);
  }
});

