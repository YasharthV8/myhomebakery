document.addEventListener('DOMContentLoaded', () => {
  const siteHeader = document.getElementById('siteHeader');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  let lastScrollY = window.scrollY;
  const scrollThreshold = 40; // Minimum scroll distance before fading starts

  // 1. Scroll Fade Effect (Fades out on scroll down, fades back in on scroll up)
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    // Do nothing if mobile menu is open to prevent awkward hiding
    if (navMenu.classList.contains('active')) return;

    if (currentScrollY > lastScrollY && currentScrollY > scrollThreshold) {
      // Scrolling Down -> Hide/Fade navbar
      siteHeader.classList.add('nav-hidden');
    } else {
      // Scrolling Up -> Show/Fade navbar
      siteHeader.classList.remove('nav-hidden');
    }

    lastScrollY = currentScrollY;
  });

  // 2. Mobile Menu Toggle
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // 3. Close mobile menu automatically when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('carouselTrack');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const items = document.querySelectorAll('.carousel-item');

  // Amount to scroll on arrow click (300px or width of container)
  const scrollAmount = 300;

  // 1. Scroll Arrow Controls
  prevBtn.addEventListener('click', () => {
    track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });

  nextBtn.addEventListener('click', () => {
    track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });

  // 2. Update button enabled/disabled states based on scroll position
  const updateButtons = () => {
    const maxScrollLeft = track.scrollWidth - track.clientWidth;
    
    prevBtn.disabled = track.scrollLeft <= 5;
    nextBtn.disabled = track.scrollLeft >= maxScrollLeft - 5;
  };

  track.addEventListener('scroll', updateButtons);
  window.addEventListener('resize', updateButtons);
  updateButtons(); // Initial check

  // 3. Active state handling & auto-scroll item into view on click
  items.forEach(item => {
    item.addEventListener('click', (e) => {
      // Remove active class from all items
      items.forEach(i => i.classList.remove('active'));
      
      // Add active class to clicked item
      item.classList.add('active');

      // Smoothly center the active item in the view
      item.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest'
      });
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const exploreBtn = document.getElementById('exploreMenuBtn');
  const menuModal = document.getElementById('menuModal');
  const closeModal = document.getElementById('closeModal');

  // Open modal on clicking "Explore Menu"
  exploreBtn.addEventListener('click', () => {
    menuModal.classList.add('active');
  });

  // Close modal on clicking the 'X' button
  closeModal.addEventListener('click', () => {
    menuModal.classList.remove('active');
  });

  // Close modal when clicking outside the modal content box
  menuModal.addEventListener('click', (e) => {
    if (e.target === menuModal) {
      menuModal.classList.remove('active');
    }
  });

  // Close modal on pressing the Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuModal.classList.contains('active')) {
      menuModal.classList.remove('active');
    }
  });
});