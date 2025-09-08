// Lightweight background effects
class BackgroundEffects {
  constructor() {
    this.isMobile = window.innerWidth <= 768;
    this.isLowPerformance = this.detectLowPerformance();
    this.init();
  }

  detectLowPerformance() {
    const memory = navigator.deviceMemory || 4;
    const cores = navigator.hardwareConcurrency || 4;
    const highDPI = window.devicePixelRatio > 2;
    
    return memory < 4 || cores < 4 || (this.isMobile && highDPI);
  }

  init() {
    // Skip effects for low performance devices
    if (this.isLowPerformance) {
      return;
    }

    this.createFloatingOrbs();
    this.createFloatingDots();
    
    // Recreate orbs and dots periodically with longer intervals
    const orbInterval = this.isMobile ? 45000 : 30000;
    const dotInterval = this.isMobile ? 15000 : 10000;
    
    setInterval(() => this.createFloatingOrbs(), orbInterval);
    setInterval(() => this.createFloatingDots(), dotInterval);
  }

  createFloatingOrbs() {
    const container = document.getElementById('backgroundOrbs');
    if (!container) return;

    // Limit orbs based on device performance
    const orbCount = this.isMobile ? 2 : 4;
    
    // Clear existing orbs to prevent accumulation
    container.innerHTML = '';

    for (let i = 0; i < orbCount; i++) {
      setTimeout(() => {
        const orb = document.createElement('div');
        orb.className = 'floating-orb';
        
        // Random horizontal position
        const leftPosition = Math.random() * 80 + 10; // 10% to 90%
        orb.style.left = leftPosition + '%';
        
        // Random size variation
        const baseSize = this.isMobile ? 40 : 80;
        const sizeVariation = Math.random() * 40 + baseSize;
        orb.style.width = sizeVariation + 'px';
        orb.style.height = sizeVariation + 'px';
        
        // Random color variation
        const colors = [
          'rgba(0, 212, 255, 0.3)',
          'rgba(139, 92, 246, 0.3)',
          'rgba(236, 72, 153, 0.3)',
          'rgba(34, 197, 94, 0.3)',
          'rgba(168, 85, 247, 0.3)'
        ];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        orb.style.boxShadow = `0 0 ${sizeVariation/4}px ${randomColor}, 0 0 ${sizeVariation/2}px ${randomColor.replace('0.3', '0.1')}`;
        
        // Random animation duration
        const duration = Math.random() * 10 + 15; // 15-25 seconds
        orb.style.animationDuration = duration + 's';
        
        container.appendChild(orb);
        
        // Remove orb after animation completes
        setTimeout(() => {
          if (orb.parentNode) {
            orb.parentNode.removeChild(orb);
          }
        }, duration * 1000 + 2000);
      }, i * 3000); // Stagger creation
    }
  }

  createFloatingDots() {
    const container = document.getElementById('backgroundOrbs');
    if (!container) return;

    // More dots but smaller and simpler
    const dotCount = this.isMobile ? 6 : 12;
    
    for (let i = 0; i < dotCount; i++) {
      setTimeout(() => {
        const dot = document.createElement('div');
        dot.className = 'floating-dot';
        
        // Random horizontal position
        const leftPosition = Math.random() * 90 + 5; // 5% to 95%
        dot.style.left = leftPosition + '%';
        
        // Random animation duration
        const duration = Math.random() * 4 + 6; // 6-10 seconds
        dot.style.animationDuration = duration + 's';
        
        // Random delay to spread out the dots
        const delay = Math.random() * 3;
        dot.style.animationDelay = delay + 's';
        
        container.appendChild(dot);
        
        // Remove dot after animation completes
        setTimeout(() => {
          if (dot.parentNode) {
            dot.parentNode.removeChild(dot);
          }
        }, (duration + delay) * 1000 + 1000);
      }, i * 500); // Faster stagger for dots
    }
  }
}

// Initialize background effects
document.addEventListener('DOMContentLoaded', () => {
  const backgroundEffects = new BackgroundEffects();
  window.backgroundEffects = backgroundEffects;
});