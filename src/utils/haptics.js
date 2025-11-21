/**
 * Haptic Feedback Utility
 * Provides vibration feedback for supported devices
 */

// Check if vibration API is supported
const isVibrationSupported = () => {
  return 'vibrate' in navigator;
};

/**
 * Vibration patterns
 */
export const VibrationPattern = {
  LIGHT: 10,
  MEDIUM: 20,
  HEAVY: 30,
  SUCCESS: [10, 50, 10],
  ERROR: [30, 100, 30, 100, 30],
  CLICK: 5,
  DOUBLE_CLICK: [10, 30, 10],
  NOTIFICATION: [50, 100, 50],
  SELECTION: 15,
};

/**
 * Trigger a haptic vibration
 * @param {number|number[]} pattern - Vibration pattern (duration in ms or array of durations)
 */
export const vibrate = (pattern = VibrationPattern.LIGHT) => {
  if (isVibrationSupported()) {
    try {
      navigator.vibrate(pattern);
    } catch (error) {
      console.warn('Vibration failed:', error);
    }
  }
};

/**
 * Cancel ongoing vibration
 */
export const cancelVibration = () => {
  if (isVibrationSupported()) {
    navigator.vibrate(0);
  }
};

/**
 * Add haptic feedback to an element
 * @param {HTMLElement} element - The element to add haptic feedback to
 * @param {string} event - The event type (click, hover, etc.)
 * @param {number|number[]} pattern - Vibration pattern
 */
export const addHapticFeedback = (element, event = 'click', pattern = VibrationPattern.LIGHT) => {
  if (!element) return;

  const handleEvent = () => {
    vibrate(pattern);
  };

  element.addEventListener(event, handleEvent);

  // Return cleanup function
  return () => {
    element.removeEventListener(event, handleEvent);
  };
};

/**
 * Add haptic feedback to multiple elements
 * @param {string} selector - CSS selector for elements
 * @param {string} event - The event type
 * @param {number|number[]} pattern - Vibration pattern
 */
export const addHapticToElements = (selector, event = 'click', pattern = VibrationPattern.LIGHT) => {
  const elements = document.querySelectorAll(selector);
  const cleanupFunctions = [];

  elements.forEach((element) => {
    const cleanup = addHapticFeedback(element, event, pattern);
    cleanupFunctions.push(cleanup);
  });

  // Return cleanup function for all elements
  return () => {
    cleanupFunctions.forEach((cleanup) => cleanup());
  };
};

/**
 * Add ripple effect with haptic feedback
 * @param {MouseEvent} event - The click event
 * @param {HTMLElement} element - The element to add ripple to
 * @param {number|number[]} vibrationPattern - Vibration pattern
 */
export const createRippleWithHaptic = (event, element, vibrationPattern = VibrationPattern.CLICK) => {
  // Vibrate
  vibrate(vibrationPattern);

  // Create ripple element
  const ripple = document.createElement('span');
  ripple.classList.add('ripple');

  // Calculate ripple position
  const rect = element.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;

  ripple.style.width = ripple.style.height = size + 'px';
  ripple.style.left = x + 'px';
  ripple.style.top = y + 'px';

  // Add ripple to element
  element.appendChild(ripple);

  // Remove ripple after animation
  setTimeout(() => {
    ripple.remove();
  }, 600);
};

/**
 * Initialize haptic feedback for common interactive elements
 */
export const initializeHaptics = () => {
  // Add to buttons
  addHapticToElements('button', 'click', VibrationPattern.CLICK);

  // Add to links
  addHapticToElements('a', 'click', VibrationPattern.LIGHT);

  // Add to interactive cards (with custom class)
  const cards = document.querySelectorAll('.interactive-card, .tilt-card');
  cards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
      vibrate(VibrationPattern.LIGHT);
    });
  });

  // Add to form inputs
  const inputs = document.querySelectorAll('input, select, textarea');
  inputs.forEach((input) => {
    input.addEventListener('focus', () => {
      vibrate(VibrationPattern.SELECTION);
    });
  });
};

/**
 * Add magnetic button effect
 * @param {HTMLElement} button - The button element
 * @param {number} strength - The magnetic strength (pixels)
 */
export const addMagneticEffect = (button, strength = 10) => {
  if (!button) return;

  const handleMouseMove = (e) => {
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) / rect.width * strength;
    const deltaY = (e.clientY - centerY) / rect.height * strength;

    button.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
  };

  const handleMouseLeave = () => {
    button.style.transform = 'translate(0, 0)';
  };

  button.addEventListener('mousemove', handleMouseMove);
  button.addEventListener('mouseleave', handleMouseLeave);

  // Return cleanup function
  return () => {
    button.removeEventListener('mousemove', handleMouseMove);
    button.removeEventListener('mouseleave', handleMouseLeave);
  };
};

export default {
  vibrate,
  cancelVibration,
  addHapticFeedback,
  addHapticToElements,
  createRippleWithHaptic,
  initializeHaptics,
  addMagneticEffect,
  VibrationPattern,
  isVibrationSupported,
};