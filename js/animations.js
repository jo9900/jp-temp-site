// 动画和视觉效果模块
class AnimationManager {
  constructor() {
    this.isMobile = window.innerWidth <= 768;
    this.isLowPerformance = this.detectLowPerformance();
    this.init();
  }
  
  // 检测低性能设备
  detectLowPerformance() {
    // 检测设备内存
    const memory = navigator.deviceMemory || 4; // 默认4GB
    // 检测CPU核心数
    const cores = navigator.hardwareConcurrency || 4; // 默认4核
    // 检测是否为高DPI设备
    const highDPI = window.devicePixelRatio > 2;
    
    return memory < 4 || cores < 4 || (this.isMobile && highDPI);
  }

  init() {
    this.initScrollAnimations();
    this.initEnhancedHoverEffects();
    this.initTypewriterEffect();
    this.initEnhancedButtons();
    this.createBackgroundAnimations();
    this.addRippleEffect();
    this.setupMouseParallax();
    this.setupResponsiveOptimizations();
  }

  // Scroll Animation System
  initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '50px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target); // Only animate once
        }
      });
    }, observerOptions);

    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .fade-in-scale');
    animatedElements.forEach(element => observer.observe(element));

    // Enhanced scroll observer for better performance
    const observerOptions2 = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer2 = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          entry.target.classList.add('animated');
        }
      });
    }, observerOptions2);

    // Animate cards and sections on scroll
    document.querySelectorAll('.info-card, .service-card, .product-card, .news-item, .blog-item, .ceo-message, .achievement-card').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
      observer2.observe(el);
    });
  }

  // Enhanced Card Hover Effects
  initEnhancedHoverEffects() {
    const cards = document.querySelectorAll('.info-card, .service-card, .product-card, .achievement-card');
    
    cards.forEach(card => {
      // Skip tilt animation for contact section cards
      const isContactCard = card.closest('#contact');
      
      if (isContactCard) {
        // Simple hover effect for contact cards
        card.addEventListener('mouseenter', function() {
          this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
          this.style.transform = 'translateY(-5px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
          this.style.transform = 'translateY(0px) scale(1)';
        });
      } else {
        // 3D tilt effect for other cards
        card.addEventListener('mouseenter', function() {
          this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });

        card.addEventListener('mousemove', function(e) {
          const rect = this.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          
          const deltaX = (e.clientX - centerX) / (rect.width / 2);
          const deltaY = (e.clientY - centerY) / (rect.height / 2);
          
          const rotateX = deltaY * -5; // Reduced rotation for subtlety
          const rotateY = deltaX * 5;
          
          this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
        });

        card.addEventListener('mouseleave', function() {
          this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)';
        });
      }
    });
  }

  // Typewriter Effect for Main Title
  initTypewriterEffect() {
    const title = document.querySelector('h1');
    if (!title) return;
    
    const text = title.textContent;
    title.textContent = '';
    title.style.opacity = '1';
    
    let index = 0;
    const typeSpeed = 100;
    
    function typeWriter() {
      if (index < text.length) {
        title.textContent += text.charAt(index);
        index++;
        setTimeout(typeWriter, typeSpeed);
      }
    }
    
    // Start typewriter effect after a small delay
    setTimeout(typeWriter, 500);
  }

  // Enhanced Button Animations
  initEnhancedButtons() {
    const buttons = document.querySelectorAll('.btn, .btn-primary');
    
    buttons.forEach(button => {
      button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.05)';
        this.style.boxShadow = '0 20px 40px rgba(0, 212, 255, 0.4), 0 0 80px rgba(139, 92, 246, 0.3)';
      });
      
      button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0px) scale(1)';
        this.style.boxShadow = '';
      });
      
      button.addEventListener('mousedown', function() {
        this.style.transform = 'translateY(-1px) scale(0.98)';
      });
      
      button.addEventListener('mouseup', function() {
        this.style.transform = 'translateY(-3px) scale(1.05)';
      });
    });
  }

  // Create floating background animations
  createBackgroundAnimations() {
    this.createFloatingShapes();
    this.createParticles();

    // Recreate particles and shapes periodically (更低频率)
    const particleInterval = this.isMobile ? 120000 : 60000; // 粒子重新创建频率降低一半
    const shapeInterval = this.isMobile ? 90000 : 60000; // 形状重新创建频率也降低
    setInterval(() => this.createParticles(), particleInterval);
    setInterval(() => this.createFloatingShapes(), shapeInterval);
  }

  // Create floating background shapes - 性能优化版本
  createFloatingShapes() {
    // 根据性能调整形状数量
    let shapeCount;
    if (this.isLowPerformance) {
      shapeCount = this.isMobile ? 1 : 3; // 低性能设备极少形状
    } else {
      shapeCount = this.isMobile ? 3 : 6; // 正常设备也减少数量
    }
    
    const shapes = ['square', 'diamond']; // 只保留最简单的形状
    const container = document.getElementById('floatingShapes');
    
    if (!container) return;

    // 低性能移动设备跳过形状动画
    if (this.isLowPerformance && this.isMobile) {
      return;
    }

    for (let i = 0; i < shapeCount; i++) {
      setTimeout(() => {
        const shape = document.createElement('div');
        const shapeType = shapes[Math.floor(Math.random() * shapes.length)];
        
        shape.className = `floating-shape ${shapeType}`;
        
        // 硬件加速优化
        shape.style.transform = 'translateZ(0)';
        shape.style.willChange = 'transform, opacity';
        shape.style.contain = 'layout style paint';
        
        // Random size (更小)
        const size = Math.random() * 15 + 12;
        shape.style.width = size + 'px';
        shape.style.height = size + 'px';
        
        // Random horizontal position
        shape.style.left = Math.random() * 100 + '%';
        
        // 更慢更平滑的动画
        const duration = Math.random() * 30 + 30;
        shape.style.animationDuration = duration + 's';
        shape.style.animationDelay = Math.random() * 15 + 's';
        shape.style.animationTimingFunction = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        container.appendChild(shape);
        
        // Remove shape after animation (延长清理时间)
        setTimeout(() => {
          if (shape.parentNode) {
            shape.parentNode.removeChild(shape);
          }
        }, (duration + 20) * 1000);
      }, i * (this.isMobile ? 1500 : 1000)); // 更大的创建间隔
    }
  }


  // Create floating particles (减少数量，优化性能)
  createParticles() {
    // 根据设备性能调整粒子数量
    let particleCount;
    if (this.isLowPerformance) {
      particleCount = this.isMobile ? 3 : 8; // 低性能设备进一步减少
    } else {
      particleCount = this.isMobile ? 8 : 20; // 正常设备
    }

    // 低性能设备跳过粒子效果
    if (this.isLowPerformance && this.isMobile) {
      return;
    }

    for (let i = 0; i < particleCount; i++) {
      setTimeout(() => {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.animationDelay = Math.random() * 25 + 's'; // 进一步增加延迟
        particle.style.animationDuration = (Math.random() * 20 + 25) + 's'; // 更慢的速度
        
        // 硬件加速优化
        particle.style.transform = 'translateZ(0)';
        particle.style.willChange = 'transform, opacity';
        particle.style.contain = 'layout style paint';
        
        document.body.appendChild(particle);

        // Remove particle after animation (延长清理时间)
        setTimeout(() => {
          if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
          }
        }, 50000);
      }, i * (this.isMobile ? 1000 : 800)); // 更大的创建间隔
    }
  }


  // Add ripple effect to buttons
  addRippleEffect() {
    // Add ripple styles
    if (!document.querySelector('#ripple-styles')) {
      const style = document.createElement('style');
      style.id = 'ripple-styles';
      style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        }
      `;
      document.head.appendChild(style);
    }

    document.querySelectorAll('.btn-primary, .service-card, .product-card').forEach(el => {
      el.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });
  }


  // Responsive optimizations
  setupResponsiveOptimizations() {
    if (this.isMobile) {
      // Disable complex animations on mobile for better performance
      document.documentElement.style.setProperty('--animation-duration', '0.3s');

      // Add touch feedback for interactive elements
      const touchElements = document.querySelectorAll('.btn-primary, .service-card, .product-card, .info-card');
      touchElements.forEach(el => {
        el.addEventListener('touchstart', function() {
          this.style.transform = 'scale(0.98)';
        });

        el.addEventListener('touchend', function() {
          setTimeout(() => {
            this.style.transform = '';
          }, 100);
        });
      });

      // Optimize scroll performance
      let ticking = false;
      function updateOnScroll() {
        if (!ticking) {
          requestAnimationFrame(() => {
            ticking = false;
          });
          ticking = true;
        }
      }
      window.addEventListener('scroll', updateOnScroll, { passive: true });
    }
  }

  // Handle window resize
  handleResize() {
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(() => {
      // Clear particles and recreate based on new screen size
      document.querySelectorAll('.particle').forEach(particle => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      });

      // Update mobile status
      this.isMobile = window.innerWidth <= 768;
      
      // Recreate particles with new screen size optimization
      this.createParticles();
    }, 250);
  }
}

// 初始化动画管理器
let animationManager;

document.addEventListener('DOMContentLoaded', () => {
  animationManager = new AnimationManager();
  // 暴露到全局作用域供主程序检测
  window.animationManager = animationManager;

  // Handle window resize
  window.addEventListener('resize', () => {
    if (animationManager) {
      animationManager.handleResize();
    }
  });
});