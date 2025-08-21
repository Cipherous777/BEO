const body = document.querySelector("body");

// DROP DOWN ICON ACTIVATION

const dropDown = document.querySelector(".drop-icon");
const mobileNav = document.querySelector(".mobile_nav");
dropDown.onclick = () => {
  dropDown.classList.toggle("active");
  mobileNav.classList.toggle("active");
  body.classList.toggle("hidden");
};

window.onload = () => {
  window.scrollTo(0, 0);
};
