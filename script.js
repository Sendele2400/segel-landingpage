/* ==========================================================
   Segel Freiheit – Interaktionen
   - Mobiles Hamburger-Menü
   - Header-Schatten beim Scrollen
   - Aktiven Menüpunkt hervorheben (Scroll-Spy)
   - Sanftes Einblenden der Karten (Scroll-Reveal)
   - Aktuelles Jahr im Footer
   ========================================================== */
(function () {
  'use strict';

  /* ---------- Mobiles Hamburger-Menü ---------- */
  var toggle = document.getElementById('nav-toggle');
  var menu = document.getElementById('nav-menu');

  function closeMenu() {
    menu.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Menü öffnen');
  }

  function openMenu() {
    menu.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Menü schließen');
  }

  toggle.addEventListener('click', function () {
    if (menu.classList.contains('is-open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Menü schließen, wenn ein Link angeklickt wird
  menu.addEventListener('click', function (event) {
    if (event.target.closest('a')) {
      closeMenu();
    }
  });

  // Menü schließen mit Escape-Taste
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && menu.classList.contains('is-open')) {
      closeMenu();
      toggle.focus();
    }
  });

  // Bei Klick außerhalb des Menüs schließen
  document.addEventListener('click', function (event) {
    if (
      menu.classList.contains('is-open') &&
      !event.target.closest('#nav-menu') &&
      !event.target.closest('#nav-toggle')
    ) {
      closeMenu();
    }
  });

  // Beim Vergrößern auf Desktop offenen Zustand zurücksetzen
  window.addEventListener('resize', function () {
    if (window.innerWidth >= 900) {
      closeMenu();
    }
  });

  /* ---------- Header-Schatten beim Scrollen ---------- */
  var header = document.getElementById('site-header');

  function updateHeader() {
    header.classList.toggle('is-scrolled', window.scrollY > 10);
  }
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  /* ---------- Scroll-Spy: aktiven Menüpunkt markieren ---------- */
  var navLinks = Array.prototype.slice.call(
    document.querySelectorAll('.nav__link')
  );
  var sections = navLinks
    .map(function (link) {
      return document.querySelector(link.getAttribute('href'));
    })
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    var spyObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var id = '#' + entry.target.id;
            navLinks.forEach(function (link) {
              link.classList.toggle(
                'is-active',
                link.getAttribute('href') === id
              );
            });
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach(function (section) {
      spyObserver.observe(section);
    });
  }

  /* ---------- Scroll-Reveal für Karten ---------- */
  var revealTargets = document.querySelectorAll(
    '.card, .section__head, .cta__inner'
  );
  revealTargets.forEach(function (el) {
    el.classList.add('reveal');
  });

  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealTargets.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback: alles sofort sichtbar
    revealTargets.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* ---------- Aktuelles Jahr im Footer ---------- */
  var yearEl = document.getElementById('footer-year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
})();
