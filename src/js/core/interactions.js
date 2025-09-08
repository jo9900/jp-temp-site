// 交互功能模块
class InteractionManager {
  constructor() {
    this.init();
  }

  init() {
    this.setupSmoothScrolling();
    this.setupFormSubmission();
    this.preventDoubleTab();
    this.setupViewportOptimization();
  }

  // Enhanced smooth scrolling for navigation links
  setupSmoothScrolling() {
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // Enhanced form submission with animation
  setupFormSubmission() {
    const form = document.querySelector('.contact-form');
    if (form) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Add loading state
        const button = this.querySelector('.btn');
        if (!button) return;

        const buttonSpan = button.querySelector('span');
        const originalText = buttonSpan ? buttonSpan.textContent : button.textContent;
        
        if (buttonSpan) {
          buttonSpan.textContent = '送信中...';
        } else {
          button.textContent = '送信中...';
        }
        
        button.disabled = true;

        // Simulate form submission
        setTimeout(() => {
          alert('お問い合わせいただき、ありがとうございます。後日担当者よりご連絡させていただきます。');
          
          if (buttonSpan) {
            buttonSpan.textContent = originalText;
          } else {
            button.textContent = originalText;
          }
          
          button.disabled = false;
          this.reset();
        }, 2000);
      });
    }
  }

  // Prevent zoom on double-tap for iOS
  preventDoubleTab() {
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
      const now = (new Date()).getTime();
      if (now - lastTouchEnd <= 300) {
        event.preventDefault();
      }
      lastTouchEnd = now;
    }, false);
  }

  // Add viewport meta tag optimization for mobile
  setupViewportOptimization() {
    if (window.innerWidth <= 768) {
      const viewport = document.querySelector('meta[name=viewport]');
      if (viewport) {
        viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
      }
    }
  }

  // Enhanced form validation
  setupFormValidation() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
      field.addEventListener('blur', () => {
        this.validateField(field);
      });

      field.addEventListener('input', () => {
        // Clear validation state on input
        field.classList.remove('error', 'success');
      });
    });
  }

  validateField(field) {
    const value = field.value.trim();
    let isValid = true;

    // Check if required field is empty
    if (field.hasAttribute('required') && !value) {
      isValid = false;
    }

    // Email validation
    if (field.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      isValid = emailRegex.test(value);
    }

    // Phone validation (optional, only if value is provided)
    if (field.type === 'tel' && value) {
      const phoneRegex = /^[\d\-\+\(\)\s]+$/;
      isValid = phoneRegex.test(value);
    }

    // Apply validation styling
    if (isValid) {
      field.classList.remove('error');
      field.classList.add('success');
    } else {
      field.classList.remove('success');
      field.classList.add('error');
    }

    return isValid;
  }

  // Form submission with validation
  validateAndSubmitForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let allValid = true;

    requiredFields.forEach(field => {
      if (!this.validateField(field)) {
        allValid = false;
      }
    });

    return allValid;
  }
}

// 键盘导航支持
class KeyboardNavigation {
  constructor() {
    this.init();
  }

  init() {
    this.setupKeyboardShortcuts();
    this.setupFocusManagement();
  }

  setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Escape key closes language dropdown
      if (e.key === 'Escape') {
        const dropdown = document.getElementById('languageDropdown');
        if (dropdown) {
          dropdown.classList.remove('active');
        }
      }

      // Enter key on language options
      if (e.key === 'Enter' && e.target.classList.contains('language-option')) {
        e.target.click();
      }
    });
  }

  setupFocusManagement() {
    // Ensure interactive elements are keyboard accessible
    const interactiveElements = document.querySelectorAll('.language-option, .btn, .service-card, .product-card');
    
    interactiveElements.forEach(element => {
      if (!element.hasAttribute('tabindex')) {
        element.setAttribute('tabindex', '0');
      }

      element.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          element.click();
        }
      });
    });
  }
}

// 性能优化
class PerformanceOptimizer {
  constructor() {
    this.init();
  }

  init() {
    this.setupLazyLoading();
    this.optimizeImages();
    this.setupPreloading();
  }

  setupLazyLoading() {
    // Lazy load images when they come into viewport
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });

      images.forEach(img => imageObserver.observe(img));
    } else {
      // Fallback for browsers without IntersectionObserver
      images.forEach(img => {
        img.src = img.dataset.src;
        img.classList.remove('lazy');
      });
    }
  }

  optimizeImages() {
    // Add loading="lazy" to images that don't have it
    const images = document.querySelectorAll('img:not([loading])');
    images.forEach(img => {
      img.setAttribute('loading', 'lazy');
    });
  }

  setupPreloading() {
    // Preload critical resources
    const preloadLinks = [
      { href: 'js/translations.js', as: 'script' },
      { href: 'js/language-switcher.js', as: 'script' },
      { href: 'js/animations.js', as: 'script' }
    ];

    preloadLinks.forEach(link => {
      const preloadLink = document.createElement('link');
      preloadLink.rel = 'preload';
      preloadLink.href = link.href;
      preloadLink.as = link.as;
      document.head.appendChild(preloadLink);
    });
  }
}

// 初始化所有交互功能
let interactionManager;
let keyboardNavigation;
let performanceOptimizer;

document.addEventListener('DOMContentLoaded', () => {
  interactionManager = new InteractionManager();
  keyboardNavigation = new KeyboardNavigation();
  performanceOptimizer = new PerformanceOptimizer();
  
  // 暴露到全局作用域供主程序检测
  window.interactionManager = interactionManager;
  window.keyboardNavigation = keyboardNavigation;
  window.performanceOptimizer = performanceOptimizer;
});