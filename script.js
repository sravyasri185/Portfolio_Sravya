
// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Rotating job titles
const roleElement = document.getElementById("typedRole");

const roles = [
  "Aspiring Software Engineer",
  "Web Developer",
  "Computer Science Student",
  "Problem Solver"
];

if (roleElement) {
  let roleIndex = 0;
  let characterIndex = 0;
  let deleting = false;

  function typeEffect() {
    const currentRole = roles[roleIndex];

    if (!deleting) {
      characterIndex++;
      roleElement.textContent =
        currentRole.substring(0, characterIndex);

      if (characterIndex === currentRole.length) {
        deleting = true;
        setTimeout(typeEffect, 1500);
        return;
      }
    } else {
      characterIndex--;
      roleElement.textContent =
        currentRole.substring(0, characterIndex);

      if (characterIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }

    setTimeout(typeEffect, deleting ? 45 : 85);
  }

  setTimeout(typeEffect, 1500);
}

// Scroll progress bar
const progressBar = document.getElementById("progress");

function updateProgress() {
  if (!progressBar) return;

  const totalHeight =
    document.documentElement.scrollHeight - window.innerHeight;

  const progress = totalHeight > 0
    ? (window.scrollY / totalHeight) * 100
    : 0;

  progressBar.style.width = progress + "%";
}

window.addEventListener("scroll", updateProgress);
updateProgress();

// Reveal sections when scrolling
const revealElements = document.querySelectorAll(
  ".section-label, .section-title, .skill-card, .project-card, .timeline-item, .recognition"
);

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12
  });

  revealElements.forEach(element => {
    element.classList.add("reveal");
    observer.observe(element);
  });
} else {
  revealElements.forEach(element => {
    element.classList.add("visible");
  });
}

// Automatic copyright year
const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}
