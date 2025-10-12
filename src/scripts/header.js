const hamburguerBtn = document.querySelector(".hamburguer-menu");
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("nav ul li a");
const overlay = document.querySelector(".overlay");
const anchorsDataSet = document.querySelectorAll('a[data-target]');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = entry.target.getAttribute("id");
    const link = document.querySelector(`nav ul li a[data-target="${id}"]`);

    if (entry.isIntersecting) {
      navLinks.forEach(navLink => navLink.classList.remove("active"));
      link?.classList.add("active");
    }
  });
}, {
  threshold: 0.6,
});

window.addEventListener("scroll", toggleToSticky);
hamburguerBtn.addEventListener("click", toggleMenu);
overlay.addEventListener("click", toggleMenu);

navLinks.forEach(link => link.addEventListener("click", () => {
  if (window.innerWidth <= 1060) toggleMenu()
}));
sections.forEach((section) => observer.observe(section));
anchorsDataSet.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.dataset.target;
    const targetEl = document.getElementById(targetId);

    targetEl.scrollIntoView();
  });
});

function toggleMenu() {
  const body = document.querySelector("body");
  const nav = document.querySelector("header nav");
  const navIsActive = nav.classList.toggle("active");
  const menuIcon = document.querySelector(".lucide-menu");
  const closeIcon = document.querySelector(".lucide-x");

  closeIcon.classList.toggle("hidden");
  menuIcon.classList.toggle("hidden");
  overlay.classList.toggle("hidden");
  body.classList.toggle("no-scroll");
  hamburguerBtn.setAttribute("aria-label", navIsActive ? "Close menu" : "Open menu");
  hamburguerBtn.setAttribute("aria-expanded", String(navIsActive));
}

function toggleToSticky() {
  const header = document.querySelector("header");
  const logo = header.querySelector("img");
  const actDownloadBtn = document.querySelector(".actions button");
  const navDownloadBtn = document.querySelector("nav ul li button");
  const isSticky = window.scrollY >= 100;

  logo.setAttribute("src", `./src/assets/logo/logo-mf-${isSticky ? "light" : "dark"}.svg`);
  header.classList.toggle("sticky", isSticky);
  actDownloadBtn.classList.toggle("light", isSticky);
  navDownloadBtn.classList.toggle("light", isSticky);
  navDownloadBtn.classList.toggle("dark", !isSticky);
  actDownloadBtn.classList.toggle("dark", !isSticky);
  overlay.classList.toggle("dark", isSticky);
}