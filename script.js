// Scroll Animation System
function initScrollAnimations() {
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
}

// Enhanced Card Hover Effects
function initEnhancedHoverEffects() {
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
function initTypewriterEffect() {
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
function initEnhancedButtons() {
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

// Create floating background shapes
function createFloatingShapes() {
  const isMobile = window.innerWidth <= 768;
  const shapeCount = isMobile ? 8 : 15;
  const shapes = ['circle', 'square', 'triangle', 'diamond', 'hexagon'];
  const container = document.getElementById('floatingShapes');
  
  if (!container) return;

  for (let i = 0; i < shapeCount; i++) {
    setTimeout(() => {
      const shape = document.createElement('div');
      const shapeType = shapes[Math.floor(Math.random() * shapes.length)];
      
      shape.className = `floating-shape ${shapeType}`;
      
      // Random size
      const size = Math.random() * 30 + 20;
      if (shapeType !== 'triangle' && shapeType !== 'hexagon') {
        shape.style.width = size + 'px';
        shape.style.height = size + 'px';
      }
      
      // Random horizontal position
      shape.style.left = Math.random() * 100 + '%';
      
      // Random animation duration and delay
      shape.style.animationDuration = (Math.random() * 10 + 15) + 's';
      shape.style.animationDelay = Math.random() * 5 + 's';
      
      container.appendChild(shape);
      
      // Remove shape after animation
      setTimeout(() => {
        if (shape.parentNode) {
          shape.parentNode.removeChild(shape);
        }
      }, 25000);
    }, i * (isMobile ? 1000 : 500));
  }
}

// Create floating dots
function createFloatingDots() {
  const isMobile = window.innerWidth <= 768;
  const dotCount = isMobile ? 12 : 25;
  const container = document.getElementById('floatingDots');
  
  if (!container) return;

  for (let i = 0; i < dotCount; i++) {
    const dot = document.createElement('div');
    dot.className = 'floating-dot';
    
    // Random position
    dot.style.left = Math.random() * 100 + '%';
    dot.style.top = Math.random() * 100 + '%';
    
    // Random animation delay
    dot.style.animationDelay = Math.random() * 3 + 's';
    
    container.appendChild(dot);
  }
}

// Create floating particles (optimized for mobile)
function createParticles() {
  // Reduce particles on mobile devices
  const isMobile = window.innerWidth <= 768;
  const particleCount = isMobile ? 15 : 50;

  if ( isMobile && window.devicePixelRatio > 2 ) {
    // Skip particles on high-DPI mobile devices for performance
    return;
  }

  for ( let i = 0; i < particleCount; i++ ) {
    setTimeout( () => {
      const particle = document.createElement( 'div' );
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + 'vw';
      particle.style.animationDelay = Math.random() * 15 + 's';
      particle.style.animationDuration = ( Math.random() * 10 + 10 ) + 's';
      document.body.appendChild( particle );

      // Remove particle after animation
      setTimeout( () => {
        if ( particle.parentNode ) {
          particle.parentNode.removeChild( particle );
        }
      }, 25000 );
    }, i * ( isMobile ? 500 : 300 ) );
  }
}

// Add ripple effect to buttons
function addRippleEffect() {
  document.querySelectorAll( '.btn-primary, .service-card, .product-card' ).forEach( el => {
    el.addEventListener( 'click', function ( e ) {
      const ripple = document.createElement( 'span' );
      const rect = this.getBoundingClientRect();
      const size = Math.max( rect.width, rect.height );
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add( 'ripple' );

      this.appendChild( ripple );

      setTimeout( () => {
        ripple.remove();
      }, 600 );
    } );
  } );
}

// Add ripple styles
const style = document.createElement( 'style' );
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
document.head.appendChild( style );


// Enhanced smooth scrolling for navigation links
document.querySelectorAll( 'nav a[href^="#"]' ).forEach( anchor => {
  anchor.addEventListener( 'click', function ( e ) {
    e.preventDefault();
    const target = document.querySelector( this.getAttribute( 'href' ) );
    if ( target ) {
      target.scrollIntoView( {
        behavior: 'smooth',
        block: 'start'
      } );
    }
  } );
} );

// Enhanced form submission with animation
document.addEventListener( 'DOMContentLoaded', function () {
  const form = document.querySelector( '.contact-form' );
  if ( form ) {
    form.addEventListener( 'submit', function ( e ) {
      e.preventDefault();

      // Add loading state
      const button = this.querySelector( '.btn-primary' );
      const originalText = button.textContent;
      button.textContent = '送信中...';
      button.disabled = true;

      // Simulate form submission
      setTimeout( () => {
        alert( 'お問い合わせいただき、ありがとうございます。後日担当者よりご連絡させていただきます。' );
        button.textContent = originalText;
        button.disabled = false;
        this.reset();
      }, 2000 );
    } );
  }
} );

// Enhanced scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver( function ( entries ) {
  entries.forEach( entry => {
    if ( entry.isIntersecting ) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      entry.target.classList.add( 'animated' );
    }
  } );
}, observerOptions );

// Initialize animations
document.addEventListener( 'DOMContentLoaded', function () {
  // Initialize new animation systems
  initScrollAnimations();
  initEnhancedHoverEffects();
  initTypewriterEffect();
  initEnhancedButtons();

  // Initialize background animations
  createFloatingShapes();
  createFloatingDots();

  // Animate cards and sections on scroll
  document.querySelectorAll( '.info-card, .service-card, .product-card, .news-item, .blog-item, .ceo-message, .achievement-card' ).forEach( el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe( el );
  } );

  // Start particle creation
  createParticles();

  // Add ripple effects
  addRippleEffect();

  // Recreate particles and shapes periodically (less frequent on mobile)
  const interval = window.innerWidth <= 768 ? 60000 : 30000;
  setInterval( createParticles, interval );
  setInterval( createFloatingShapes, 45000 ); // Less frequent for shapes

  // Mobile-specific optimizations
  if ( window.innerWidth <= 768 ) {
    // Disable complex animations for better performance
    document.documentElement.style.setProperty( '--animation-duration', '0.3s' );

    // Add touch feedback for interactive elements
    const touchElements = document.querySelectorAll( '.btn-primary, .service-card, .product-card, .info-card' );
    touchElements.forEach( el => {
      el.addEventListener( 'touchstart', function () {
        this.style.transform = 'scale(0.98)';
      } );

      el.addEventListener( 'touchend', function () {
        setTimeout( () => {
          this.style.transform = '';
        }, 100 );
      } );
    } );

    // Optimize scroll performance
    let ticking = false;

    function updateOnScroll() {
      if ( !ticking ) {
        requestAnimationFrame( () => {
          // Throttle scroll events for better performance
          ticking = false;
        } );
        ticking = true;
      }
    }

    window.addEventListener( 'scroll', updateOnScroll, { passive: true } );
  }
} );

// Mouse movement parallax effect (disabled on mobile)
if ( window.innerWidth > 768 ) {
  document.addEventListener( 'mousemove', function ( e ) {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    document.querySelectorAll( '.glow-orb' ).forEach( ( orb, index ) => {
      const speed = 0.05 + ( index * 0.02 );
      const x = ( mouseX - 0.5 ) * speed * 100;
      const y = ( mouseY - 0.5 ) * speed * 100;
      orb.style.transform = `translate(${ x }px, ${ y }px)`;
    } );
  } );
}

// Add floating elements to sections
document.addEventListener( 'DOMContentLoaded', function () {
  document.querySelectorAll( '.section' ).forEach( ( section, index ) => {
    if ( index % 2 === 0 ) {
      const floatingElement = document.createElement( 'div' );
      floatingElement.className = 'floating-element';
      floatingElement.style.top = Math.random() * 80 + 10 + '%';
      floatingElement.style.left = Math.random() * 80 + 10 + '%';
      floatingElement.style.animationDelay = Math.random() * 12 + 's';
      section.style.position = 'relative';
      section.appendChild( floatingElement );
    }
  } );
} );

// Handle window resize for responsive adjustments
let resizeTimeout;
window.addEventListener( 'resize', function () {
  clearTimeout( resizeTimeout );
  resizeTimeout = setTimeout( function () {
    // Clear particles and recreate based on new screen size
    document.querySelectorAll( '.particle' ).forEach( particle => {
      if ( particle.parentNode ) {
        particle.parentNode.removeChild( particle );
      }
    } );

    // Recreate particles with new screen size optimization
    createParticles();

    // Map resize is handled automatically by iframe
  }, 250 );
} );

// Prevent zoom on double-tap for iOS
let lastTouchEnd = 0;
document.addEventListener( 'touchend', function ( event ) {
  const now = ( new Date() ).getTime();
  if ( now - lastTouchEnd <= 300 ) {
    event.preventDefault();
  }
  lastTouchEnd = now;
}, false );

// Add viewport meta tag optimization for mobile
if ( window.innerWidth <= 768 ) {
  const viewport = document.querySelector( 'meta[name=viewport]' );
  if ( viewport ) {
    viewport.setAttribute( 'content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' );
  }
}

// Multi-language support
const translations = {
  ja: {
    nav: {
      company: '企業情報',
      business: '事業紹介',
      blog: 'ブログ',
      news: 'お知らせ',
      careers: '採用情報',
      contact: 'お問合せ'
    },
    header: {
      title: '株式会社エーブル',
      tagline: 'ABEL & Co,Ltd'
    },
    company: {
      title: '企業情報',
      ceoMessage: '創業者メッセージ（Company Vision）',
      ceoText: '私たちは革新的な技術ソリューションを通じて、企業の成長と社会の発展に貢献します。',
      overview: '会社概要',
      purpose: '目的・事業内容'
    },
    business: {
      title: '事業紹介',
      service: 'サービス',
      products: '主な製品',
      achievements: '実績'
    },
    news: {
      title: 'お知らせ (News)'
    },
    careers: {
      title: '採用情報',
      content: '現在、優秀な人材を募集しております。詳細につきましては、お問い合わせフォームよりご連絡ください。'
    },
    contact: {
      title: 'お問い合わせ',
      location: '所在地',
      form: 'お問い合わせフォーム',
      submit: '送信する'
    }
  },
  en: {
    nav: {
      company: 'Company Info',
      business: 'Business',
      blog: 'Blog',
      news: 'News',
      careers: 'Careers',
      contact: 'Contact'
    },
    header: {
      title: 'ABEL & Co,Ltd',
      tagline: 'Private AI Solutions for Enterprises'
    },
    company: {
      title: 'Company Information',
      ceoMessage: 'Founder\'s Message (Company Vision)',
      ceoText: 'We contribute to corporate growth and social development through innovative technology solutions.',
      overview: 'Company Overview',
      purpose: 'Business Purpose & Content'
    },
    business: {
      title: 'Business Introduction',
      service: 'Services',
      products: 'Main Products',
      achievements: 'Achievements'
    },
    news: {
      title: 'News'
    },
    careers: {
      title: 'Careers',
      content: 'We are currently recruiting excellent talent. For details, please contact us through the inquiry form.'
    },
    contact: {
      title: 'Contact Us',
      location: 'Location',
      form: 'Contact Form',
      submit: 'Send'
    }
  },
  'zh-tw': {
    nav: {
      company: '企業資訊',
      business: '事業介紹',
      blog: '部落格',
      news: '最新消息',
      careers: '人才招募',
      contact: '聯絡我們'
    },
    header: {
      title: 'ABEL & Co,Ltd',
      tagline: '企業專用私有AI解決方案'
    },
    company: {
      title: '企業資訊',
      ceoMessage: '創辦人訊息（公司願景）',
      ceoText: '我們透過創新技術解決方案，為企業成長和社會發展做出貢獻。',
      overview: '公司概要',
      purpose: '事業目的與內容'
    },
    business: {
      title: '事業介紹',
      service: '服務項目',
      products: '主要產品',
      achievements: '實績案例'
    },
    news: {
      title: '最新消息'
    },
    careers: {
      title: '人才招募',
      content: '我們正在招募優秀人才。詳細資訊請透過聯絡表單與我們聯繫。'
    },
    contact: {
      title: '聯絡我們',
      location: '地址',
      form: '聯絡表單',
      submit: '發送'
    }
  },
  ko: {
    nav: {
      company: '회사정보',
      business: '사업소개',
      blog: '블로그',
      news: '소식',
      careers: '채용정보',
      contact: '문의하기'
    },
    header: {
      title: 'ABEL & Co,Ltd',
      tagline: '기업용 프라이빗 AI 솔루션'
    },
    company: {
      title: '회사정보',
      ceoMessage: '창립자 메시지 (회사 비전)',
      ceoText: '혁신적인 기술 솔루션을 통해 기업의 성장과 사회 발전에 기여합니다.',
      overview: '회사 개요',
      purpose: '사업 목적 및 내용'
    },
    business: {
      title: '사업소개',
      service: '서비스',
      products: '주요 제품',
      achievements: '실적'
    },
    news: {
      title: '소식'
    },
    careers: {
      title: '채용정보',
      content: '현재 우수한 인재를 모집하고 있습니다. 자세한 내용은 문의 양식을 통해 연락 주시기 바랍니다.'
    },
    contact: {
      title: '문의하기',
      location: '위치',
      form: '문의 양식',
      submit: '전송'
    }
  },
  ms: {
    nav: {
      company: 'Maklumat Syarikat',
      business: 'Perniagaan',
      blog: 'Blog',
      news: 'Berita',
      careers: 'Kerjaya',
      contact: 'Hubungi'
    },
    header: {
      title: 'ABEL & Co,Ltd',
      tagline: 'Penyelesaian AI Peribadi untuk Perusahaan'
    },
    company: {
      title: 'Maklumat Syarikat',
      ceoMessage: 'Mesej Pengasas (Visi Syarikat)',
      ceoText: 'Kami menyumbang kepada pertumbuhan korporat dan pembangunan sosial melalui penyelesaian teknologi yang inovatif.',
      overview: 'Gambaran Keseluruhan Syarikat',
      purpose: 'Tujuan & Kandungan Perniagaan'
    },
    business: {
      title: 'Pengenalan Perniagaan',
      service: 'Perkhidmatan',
      products: 'Produk Utama',
      achievements: 'Pencapaian'
    },
    news: {
      title: 'Berita'
    },
    careers: {
      title: 'Kerjaya',
      content: 'Kami sedang merekrut bakat yang cemerlang. Untuk butiran, sila hubungi kami melalui borang pertanyaan.'
    },
    contact: {
      title: 'Hubungi Kami',
      location: 'Lokasi',
      form: 'Borang Hubungi',
      submit: 'Hantar'
    }
  },
  th: {
    nav: {
      company: 'ข้อมูลบริษัท',
      business: 'ธุรกิจ',
      blog: 'บล็อก',
      news: 'ข่าวสาร',
      careers: 'การงาน',
      contact: 'ติดต่อ'
    },
    header: {
      title: 'ABEL & Co,Ltd',
      tagline: 'โซลูชัน AI ส่วนตัวสำหรับองค์กร'
    },
    company: {
      title: 'ข้อมูลบริษัท',
      ceoMessage: 'ข้อความจากผู้ก่อตั้ง (วิสัยทัศน์บริษัท)',
      ceoText: 'เรามีส่วนร่วมในการเติบโตขององค์กรและการพัฒนาสังคมผ่านโซลูชันเทคโนโลยีที่นวัตกรรม',
      overview: 'ภาพรวมบริษัท',
      purpose: 'วัตถุประสงค์และเนื้อหาธุรกิจ'
    },
    business: {
      title: 'แนะนำธุรกิจ',
      service: 'บริการ',
      products: 'ผลิตภัณฑ์หลัก',
      achievements: 'ผลงาน'
    },
    news: {
      title: 'ข่าวสาร'
    },
    careers: {
      title: 'การงาน',
      content: 'ขณะนี้เรากำลังรับสมัครผู้มีความสามารถ สำหรับรายละเอียด โปรดติดต่อเราผ่านแบบฟอร์มสอบถาม'
    },
    contact: {
      title: 'ติดต่อเรา',
      location: 'ที่ตั้ง',
      form: 'แบบฟอร์มติดต่อ',
      submit: 'ส่ง'
    }
  },
  id: {
    nav: {
      company: 'Info Perusahaan',
      business: 'Bisnis',
      blog: 'Blog',
      news: 'Berita',
      careers: 'Karir',
      contact: 'Kontak'
    },
    header: {
      title: 'ABEL & Co,Ltd',
      tagline: 'Solusi AI Pribadi untuk Perusahaan'
    },
    company: {
      title: 'Informasi Perusahaan',
      ceoMessage: 'Pesan Pendiri (Visi Perusahaan)',
      ceoText: 'Kami berkontribusi pada pertumbuhan perusahaan dan pembangunan sosial melalui solusi teknologi inovatif.',
      overview: 'Gambaran Umum Perusahaan',
      purpose: 'Tujuan & Konten Bisnis'
    },
    business: {
      title: 'Pengenalan Bisnis',
      service: 'Layanan',
      products: 'Produk Utama',
      achievements: 'Pencapaian'
    },
    news: {
      title: 'Berita'
    },
    careers: {
      title: 'Karir',
      content: 'Kami sedang merekrut talenta yang excellent. Untuk detail, silakan hubungi kami melalui formulir pertanyaan.'
    },
    contact: {
      title: 'Hubungi Kami',
      location: 'Lokasi',
      form: 'Formulir Kontak',
      submit: 'Kirim'
    }
  }
};

// Language switching functionality
let currentLanguage = 'ja';

function updateLanguage(lang) {
  currentLanguage = lang;
  const langData = translations[lang];

  // Update navigation
  document.querySelector('[data-i18n="nav.company"]').textContent = langData.nav.company;
  document.querySelector('[data-i18n="nav.business"]').textContent = langData.nav.business;
  document.querySelector('[data-i18n="nav.blog"]').textContent = langData.nav.blog;
  document.querySelector('[data-i18n="nav.news"]').textContent = langData.nav.news;
  document.querySelector('[data-i18n="nav.careers"]').textContent = langData.nav.careers;
  document.querySelector('[data-i18n="nav.contact"]').textContent = langData.nav.contact;

  // Update header
  document.querySelector('h1').textContent = langData.header.title;
  document.querySelector('.tagline').textContent = langData.header.tagline;

  // Update section titles
  document.querySelector('#company-info h2').textContent = langData.company.title;
  document.querySelector('#business h2').textContent = langData.business.title;
  document.querySelector('#news h2').textContent = langData.news.title;
  document.querySelector('#careers h2').textContent = langData.careers.title;
  document.querySelector('#contact h2').textContent = langData.contact.title;

  // Update CEO message
  document.querySelector('.ceo-message h3').textContent = langData.company.ceoMessage;
  document.querySelector('.ceo-message p:not(.ceo-name)').textContent = langData.company.ceoText;

  // Update company overview and purpose titles
  document.querySelector('.info-card h3').textContent = langData.company.overview;
  document.querySelector('.info-card:nth-child(2) h3').textContent = langData.company.purpose;

  // Update careers content
  document.querySelector('#careers .info-card p').textContent = langData.careers.content;

  // Update contact section
  document.querySelector('#contact .info-card h3').textContent = langData.contact.location;
  document.querySelector('#contact .info-card:nth-child(2) h3').textContent = langData.contact.form;
  document.querySelector('.btn span').textContent = langData.contact.submit;

  // Update products and achievements titles
  const productsTitle = document.querySelector('h3[style*="color: #8b5cf6"]');
  if (productsTitle && productsTitle.textContent.includes('製品')) {
    productsTitle.textContent = langData.business.products;
  }

  const achievementsTitle = document.querySelector('h3[style*="color: #8b5cf6"]:nth-of-type(2)');
  if (achievementsTitle && achievementsTitle.textContent.includes('実績')) {
    achievementsTitle.textContent = langData.business.achievements;
  }

  // Update current language display
  const langNames = {
    'ja': '日本語',
    'en': 'English',
    'zh-tw': '繁體中文',
    'ko': '한국어',
    'ms': 'Bahasa Malaysia',
    'th': 'ไทย',
    'id': 'Bahasa Indonesia'
  };
  document.getElementById('currentLangText').textContent = langNames[lang];

  // Update active language option
  document.querySelectorAll('.language-option').forEach(option => {
    option.classList.remove('active');
    if (option.dataset.lang === lang) {
      option.classList.add('active');
    }
  });
}

// Language dropdown functionality
document.addEventListener('DOMContentLoaded', function() {
  const dropdown = document.getElementById('languageDropdown');
  const currentLang = document.getElementById('currentLang');
  const options = document.getElementById('languageOptions');

  // Toggle dropdown
  currentLang.addEventListener('click', function() {
    dropdown.classList.toggle('active');
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', function(e) {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove('active');
    }
  });

  // Language option selection
  document.querySelectorAll('.language-option').forEach(option => {
    option.addEventListener('click', function() {
      const selectedLang = this.dataset.lang;
      updateLanguage(selectedLang);
      dropdown.classList.remove('active');
    });
  });
});
