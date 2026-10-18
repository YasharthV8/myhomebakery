/* cakes.html behaviour: mobile nav, navbar fade on scroll, category filter */
(function () {
  'use strict';

  /* --- Mobile nav toggle --- */
  var navToggle = document.getElementById('navToggle');
  var navMenu = document.getElementById('navMenu');

  function closeNav() {
    if (!navToggle || !navMenu) return;
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
    navMenu.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', closeNav);
    });
  }

  /* --- Navbar fades out when scrolling down, returns when scrolling up --- */
  var header = document.getElementById('siteHeader');
  var lastY = window.scrollY;

  window.addEventListener('scroll', function () {
    if (!header) return;
    var y = window.scrollY;
    var menuOpen = navMenu && navMenu.classList.contains('active');
    if (y > lastY && y > 120 && !menuOpen) {
      header.classList.add('nav-hidden');
    } else {
      header.classList.remove('nav-hidden');
    }
    lastY = y;
  }, { passive: true });

  /* --- Category filter --- */
  var chips = document.querySelectorAll('.filter-chip');
  var cards = document.querySelectorAll('.cake-card');
  var count = document.getElementById('galleryCount');

  function applyFilter(filter) {
    var shown = 0;
    cards.forEach(function (card) {
      var cats = (card.dataset.category || '').split(' ');
      var match = filter === 'all' || cats.indexOf(filter) !== -1;
      card.hidden = !match;
      if (match) shown++;
    });
    if (count) {
      count.textContent = 'Showing ' + shown + (shown === 1 ? ' cake' : ' cakes');
    }
  }

  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      chips.forEach(function (c) {
        c.classList.remove('active');
        c.setAttribute('aria-selected', 'false');
      });
      chip.classList.add('active');
      chip.setAttribute('aria-selected', 'true');
      applyFilter(chip.dataset.filter);
    });
  });

  applyFilter('all');

  /* --- Order buttons: open the Instagram DM and carry the chosen cake --- */
  var DM_URL = 'https://ig.me/m/_.myhomebakery';
  var toastTimer;

  function slugify(text) {
    return text.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }

  function showToast(message) {
    var toast = document.getElementById('orderToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'orderToast';
      toast.className = 'order-toast';
      toast.setAttribute('role', 'status');
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove('show');
    }, 5000);
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      var ok = false;
      try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
      document.body.removeChild(ta);
      ok ? resolve() : reject();
    });
  }

  cards.forEach(function (card) {
    var nameEl = card.querySelector('.cake-name');
    var priceEl = card.querySelector('.cake-price');
    var orderBtn = card.querySelector('.cake-order');
    if (!nameEl || !orderBtn) return;

    var name = nameEl.textContent.trim();
    var price = priceEl ? priceEl.textContent.replace(/\s+/g, ' ').trim() : '';
    if (!card.id) card.id = slugify(name);

    orderBtn.href = DM_URL;

    orderBtn.addEventListener('click', function () {
      var link = window.location.origin + window.location.pathname + '#' + card.id;
      var message = "Hi myhomebakery! I'd like to order the " + name;
      if (price && !/request/i.test(price)) message += ' (' + price + ')';
      message += '.\n' + link;

      /* The link opens the DM; the message is copied so it can be pasted straight in. */
      copyText(message).then(function () {
        showToast('Message for "' + name + '" copied. Paste it in the DM.');
      }, function () {
        showToast('Please mention "' + name + '" in your message.');
      });
    });
  });

  /* --- Opening cakes.html#cake-name (from a shared order link) highlights that cake --- */
  function highlightFromHash() {
    var id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    var target = document.getElementById(id);
    if (!target || !target.classList.contains('cake-card')) return;

    var allChip = document.querySelector('.filter-chip[data-filter="all"]');
    if (allChip) allChip.click();

    setTimeout(function () {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      target.classList.add('cake-highlight');
      setTimeout(function () { target.classList.remove('cake-highlight'); }, 3500);
    }, 100);
  }

  highlightFromHash();
  window.addEventListener('hashchange', highlightFromHash);
})();