document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });

  // 2. Hide Navbar on Scroll Down
  const siteHeader = document.getElementById('siteHeader');
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    if (window.scrollY > lastScrollY && window.scrollY > 50) {
      siteHeader.classList.add('nav-hidden');
    } else {
      siteHeader.classList.remove('nav-hidden');
    }
    lastScrollY = window.scrollY;
  });

  // 3. Category Filter Logic
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cakeCards = document.querySelectorAll('.cake-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active filter button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-category');

      cakeCards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
});