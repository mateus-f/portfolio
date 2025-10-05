const hamburguerBtn = document.querySelector(".hamburguer-menu");
const navLinks = document.querySelectorAll("nav ul li a");
const overlay = document.querySelector(".overlay");
const toggleMenu = () => {
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
const toggleSticky = () => {
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

window.addEventListener("scroll", () => toggleSticky())
hamburguerBtn.addEventListener("click", () => toggleMenu())
navLinks.forEach(link => link.addEventListener("click", () => {
  if (window.innerWidth <= 1060) toggleMenu()
}))
overlay.addEventListener("click", () => toggleMenu());