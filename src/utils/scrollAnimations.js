/**
 * Scroll Animations Utility
 * Triggers animations when elements enter viewport
 */

/**
 * Check if element is in viewport
 * @param {HTMLElement} element - The element to check
 * @param {number} threshold - Percentage of element that should be visible (0-1)
 * @returns {boolean}
 */
export const isInViewport = (element, threshold = 0.1) => {
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;

  const vertInView = rect.top <= windowHeight && rect.top + rect.height * threshold >= 0;
  const horInView = rect.left <= windowWidth && rect.left + rect.width >= 0;

  return vertInView && horInView;
};

/**
 * Initialize scroll-triggered animations
 * @param {string} selector - CSS selector for animated elements
 * @param {string} animationClass - Class to add when element is visible
 * @param {number} threshold - Visibility threshold
 */
export const initScrollAnimations = (
  selector = '.fade-in-scroll',
  animationClass = 'visible',
  threshold = 0.1
) => {
  const elements = document.querySelectorAll(selector);

  const checkElements = () => {
    elements.forEach((element) => {
      if (isInViewport(element, threshold)) {
        element.classList.add(animationClass);
      }
    });
  };

  // Check on scroll
  let ticking = false;
  const handleScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        checkElements();
        ticking = false;
      });
      ticking = true;
    }
  };

  // Initial check
  checkElements();

  // Add scroll listener
  window.addEventListener('scroll', handleScroll, { passive: true });

  // Return cleanup function
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
};

/**
 * Add staggered animations to a list of elements
 * @param {NodeList|Array} elements - Elements to animate
 * @param {string} animationClass - Animation class to add
 * @param {number} staggerDelay - Delay between each element (ms)
 */
export const addStaggerAnimation = (elements, animationClass = 'animate-slide-in-bottom', staggerDelay = 100) => {
  elements.forEach((element, index) => {
    setTimeout(() => {
      element.classList.add(animationClass);
    }, index * staggerDelay);
  });
};

/**
 * Create Intersection Observer for animations
 * @param {Function} callback - Callback function when element intersects
 * @param {Object} options - Intersection Observer options
 * @returns {IntersectionObserver}
 */
export const createScrollObserver = (callback, options = {}) => {
  const defaultOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
    ...options,
  };

  return new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        callback(entry.target);
      }
    });
  }, defaultOptions);
};

/**
 * Initialize advanced scroll animations using Intersection Observer
 * @param {string} selector - CSS selector for elements
 * @param {string} animationClass - Class to add when visible
 * @param {Object} observerOptions - Intersection Observer options
 */
export const initIntersectionAnimations = (
  selector = '.fade-in-scroll',
  animationClass = 'visible',
  observerOptions = {}
) => {
  const elements = document.querySelectorAll(selector);

  const observer = createScrollObserver((element) => {
    element.classList.add(animationClass);
    // Optionally unobserve after animation
    // observer.unobserve(element);
  }, observerOptions);

  elements.forEach((element) => {
    observer.observe(element);
  });

  // Return cleanup function
  return () => {
    observer.disconnect();
  };
};

/**
 * Parallax scroll effect
 * @param {HTMLElement} element - Element to apply parallax to
 * @param {number} speed - Parallax speed (0-1, lower is slower)
 */
export const addParallaxEffect = (element, speed = 0.5) => {
  if (!element) return;

  const handleScroll = () => {
    const scrolled = window.pageYOffset;
    const offset = element.offsetTop;
    const diff = scrolled - offset;
    const yPos = diff * speed;

    element.style.transform = `translateY(${yPos}px)`;
  };

  let ticking = false;
  const optimizedScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', optimizedScroll, { passive: true });

  return () => {
    window.removeEventListener('scroll', optimizedScroll);
  };
};

/**
 * Add smooth reveal animation to sections
 * @param {string} sectionSelector - Selector for sections
 */
export const initSectionReveal = (sectionSelector = 'section') => {
  const sections = document.querySelectorAll(sectionSelector);

  sections.forEach((section, index) => {
    section.classList.add('fade-in-scroll');
    section.style.transitionDelay = `${index * 0.1}s`;
  });

  return initIntersectionAnimations('.fade-in-scroll', 'visible', {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px',
  });
};

/**
 * Add card entrance animations with stagger
 * @param {string} containerSelector - Selector for container with cards
 * @param {string} cardSelector - Selector for individual cards
 */
export const initCardAnimations = (containerSelector, cardSelector) => {
  const containers = document.querySelectorAll(containerSelector);

  const observer = createScrollObserver((container) => {
    const cards = container.querySelectorAll(cardSelector);
    addStaggerAnimation(cards, 'animate-slide-in-bottom', 100);
  }, { threshold: 0.1 });

  containers.forEach((container) => {
    observer.observe(container);
  });

  return () => observer.disconnect();
};

/**
 * Smooth scroll to element
 * @param {HTMLElement|string} target - Element or selector to scroll to
 * @param {number} offset - Offset from top (px)
 */
export const smoothScrollTo = (target, offset = 0) => {
  const element = typeof target === 'string' ? document.querySelector(target) : target;

  if (element) {
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  }
};

/**
 * Add scroll progress indicator
 * @param {HTMLElement} progressBar - Progress bar element
 */
export const initScrollProgress = (progressBar) => {
  if (!progressBar) return;

  const updateProgress = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;

    progressBar.style.width = `${scrollPercent}%`;
  };

  let ticking = false;
  const optimizedUpdate = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateProgress();
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', optimizedUpdate, { passive: true });
  updateProgress(); // Initial update

  return () => {
    window.removeEventListener('scroll', optimizedUpdate);
  };
};

export default {
  isInViewport,
  initScrollAnimations,
  addStaggerAnimation,
  createScrollObserver,
  initIntersectionAnimations,
  addParallaxEffect,
  initSectionReveal,
  initCardAnimations,
  smoothScrollTo,
  initScrollProgress,
};