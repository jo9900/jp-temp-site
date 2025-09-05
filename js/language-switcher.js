// 语言切换功能模块 - 导航栏版本
class LanguageSwitcher {
  constructor() {
    this.currentLanguage = 'ja';
    this.langNames = {
      'ja': '日本語',
      'en': 'English',
      'zh-tw': '繁體中文',
      'ko': '한국어',
      'ms': 'Bahasa Malaysia',
      'th': 'ไทย',
      'id': 'Bahasa Indonesia'
    };
    this.init();
  }

  init() {
    this.setupDropdown();
    this.setupLanguageOptions();
  }

  setupDropdown() {
    const switcher = document.getElementById('languageSwitcher');
    const toggle = document.getElementById('languageToggle');
    const dropdown = document.getElementById('languageDropdown');

    if (!switcher || !toggle || !dropdown) {
      console.warn('Language switcher elements not found');
      return;
    }

    // Toggle dropdown menu
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      switcher.classList.toggle('active');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!switcher.contains(e.target)) {
        switcher.classList.remove('active');
      }
    });

    // Close dropdown when pressing Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && switcher.classList.contains('active')) {
        switcher.classList.remove('active');
      }
    });
  }

  setupLanguageOptions() {
    const languageOptions = document.querySelectorAll('.language-option');
    languageOptions.forEach(option => {
      option.addEventListener('click', (e) => {
        const selectedLang = option.dataset.lang;
        if (selectedLang) {
          this.updateLanguage(selectedLang);
          document.getElementById('languageSwitcher').classList.remove('active');
        }
      });
    });
  }

  updateLanguage(lang) {
    if (!translations[lang]) {
      console.warn(`Translation not found for language: ${lang}`);
      return;
    }

    this.currentLanguage = lang;
    const langData = translations[lang];

    // Update navigation
    this.updateElement('[data-i18n="nav.company"]', langData.nav.company);
    this.updateElement('[data-i18n="nav.business"]', langData.nav.business);
    this.updateElement('[data-i18n="nav.blog"]', langData.nav.blog);
    this.updateElement('[data-i18n="nav.news"]', langData.nav.news);
    this.updateElement('[data-i18n="nav.careers"]', langData.nav.careers);
    this.updateElement('[data-i18n="nav.contact"]', langData.nav.contact);

    // Update header
    this.updateElement('h1', langData.header.title);
    this.updateElement('.tagline', langData.header.tagline);

    // Update section titles
    this.updateElement('#company-info h2', langData.company.title);
    this.updateElement('#business h2', langData.business.title);
    this.updateElement('#news h2', langData.news.title);
    this.updateElement('#careers h2', langData.careers.title);
    this.updateElement('#contact h2', langData.contact.title);

    // Update all elements with data-i18n attributes
    this.updateAllDataI18nElements(langData);

    // Update products and achievements titles (for compatibility with existing structure)
    this.updateProductsAndAchievementsTitle(langData);

    // Update current language display in FAB
    const currentLanguage = document.getElementById('currentLanguage');
    if (currentLanguage) {
      currentLanguage.textContent = this.langNames[lang];
    }

    // Update active language option
    this.updateActiveLanguageOption(lang);
  }

  updateElement(selector, text) {
    const element = document.querySelector(selector);
    if (element && text) {
      element.textContent = text;
    }
  }

  updateAllDataI18nElements(langData) {
    const elementsToTranslate = document.querySelectorAll('[data-i18n]');
    elementsToTranslate.forEach(element => {
      const keys = element.getAttribute('data-i18n').split('.');
      let translation = langData;
      
      // Navigate through nested object
      for (let key of keys) {
        if (translation && translation[key]) {
          translation = translation[key];
        } else {
          console.warn(`Translation not found for key: ${element.getAttribute('data-i18n')}`);
          return;
        }
      }
      
      if (typeof translation === 'string') {
        element.textContent = translation;
      }
    });
  }

  updateProductsAndAchievementsTitle(langData) {
    // Update products title
    const productsTitle = document.querySelector('h3[style*="color: #8b5cf6"]');
    if (productsTitle && productsTitle.textContent.includes('製品')) {
      productsTitle.textContent = langData.business.products;
    }

    // Update achievements title
    const achievementsTitle = document.querySelector('h3[style*="color: #8b5cf6"]:nth-of-type(2)');
    if (achievementsTitle && achievementsTitle.textContent.includes('実績')) {
      achievementsTitle.textContent = langData.business.achievements;
    }
  }

  updateActiveLanguageOption(lang) {
    document.querySelectorAll('.language-option').forEach(option => {
      option.classList.remove('active');
      if (option.dataset.lang === lang) {
        option.classList.add('active');
      }
    });
  }

  getCurrentLanguage() {
    return this.currentLanguage;
  }
}

// 初始化语言切换器
let languageSwitcher;

document.addEventListener('DOMContentLoaded', () => {
  languageSwitcher = new LanguageSwitcher();
  // 暴露到全局作用域供主程序检测
  window.languageSwitcher = languageSwitcher;
});