// Toggle nav menu on hamburger click
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

// Accessibility: toggle menu with Enter or Space keys on hamburger
hamburger.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    navMenu.classList.toggle("active");
  }
});
