const dropIcon = document.querySelector('.drop-icon');
const mobileNav = document.querySelector('.mobile_nav');

dropIcon.addEventListener('click', () => {
  mobileNav.classList.toggle('show');

  // Animate hamburger
  dropIcon.classList.toggle('open');
});