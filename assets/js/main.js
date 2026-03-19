/**
 * AffectiveArt Challenge 2026
 * Main JavaScript
 */

(function() {
  "use strict";

  /**
   * Mobile Navigation Toggle
   */
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      this.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileToggle.classList.remove('active');
      });
    });
  }

  /**
   * Scroll Reveal Animation
   */
  const initScrollReveal = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // Show all elements immediately if reduced motion is preferred
      document.querySelectorAll('.section-header, .track-card, .stat, .annotation-card, .timeline-item, .step, .organizer-card').forEach(el => {
        el.classList.add('visible');
      });
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all animatable elements
    document.querySelectorAll('.section-header, .track-card, .stat, .annotation-card, .timeline-item, .step, .organizer-card').forEach(el => {
      observer.observe(el);
    });
  };

  /**
   * Smooth Scroll for Anchor Links
   */
  const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        e.preventDefault();
        const target = document.querySelector(href);

        if (target) {
          const headerOffset = 80;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  };

  /**
   * Navbar Background on Scroll
   */
  const initNavbarScroll = () => {
    const navbar = document.querySelector('.navbar');

    if (!navbar) return;

    const handleScroll = () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial state
  };

  /**
   * Initialize all
   */
  document.addEventListener('DOMContentLoaded', () => {
    initSmoothScroll();
    initNavbarScroll();
    initScrollReveal();
  });

})();
