/**
 * Main application entry point
 * Initializes all modules and handles global app state
 */

// Import core modules
import './core/animations.js';
import './core/interactions.js';
import './core/background-effects.js';
import './core/main.js';

// Import internationalization modules
import { translations } from './i18n/index.js';
import './i18n/language-switcher.js';

// Global app initialization
class App {
  constructor() {
    this.initialized = false;
    this.currentLanguage = 'ja';
    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.onDOMReady());
    } else {
      this.onDOMReady();
    }
  }

  onDOMReady() {
    // Make translations available globally for backward compatibility
    window.translations = translations;
    
    // Initialize app
    this.initialized = true;
    console.log('App initialized successfully');
    
    // Dispatch custom event for other modules to listen to
    document.dispatchEvent(new CustomEvent('app:initialized', {
      detail: { app: this }
    }));
  }

  setLanguage(lang) {
    this.currentLanguage = lang;
    document.dispatchEvent(new CustomEvent('app:languageChanged', {
      detail: { language: lang }
    }));
  }

  getCurrentLanguage() {
    return this.currentLanguage;
  }
}

// Create global app instance
const app = new App();

// Export for modules that need access
export default app;

// Make app available globally for legacy code
window.app = app;