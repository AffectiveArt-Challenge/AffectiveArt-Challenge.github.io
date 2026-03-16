/**
 * Slide-in animation on scroll for sections
 * Triggers slide-in-left and slide-in-right animations when elements enter viewport
 */

(function() {
  "use strict";

  const initSlideInAnimations = () => {
    const slideElements = document.querySelectorAll('.slide-in-left, .slide-in-right');
    
    if (slideElements.length === 0) return;

    const handleIntersect = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Element is in viewport, add class to trigger animation
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target); // Only animate once
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, {
      threshold: 0.1, // Trigger when 10% of element is visible
      rootMargin: '0px 0px -100px 0px' // Start animation a bit before element reaches viewport
    });

    slideElements.forEach(el => {
      observer.observe(el);
    });
  };

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSlideInAnimations);
  } else {
    initSlideInAnimations();
  }

})();