// Combined translations index file
import { ja } from './ja.js';
import { en } from './en.js';
import { zhTW } from './zh-tw.js';
import { ko } from './ko.js';
import { ms } from './ms.js';
import { th } from './th.js';
import { id } from './id.js';

// Combined translations object
export const translations = {
  ja,
  en,
  'zh-tw': zhTW,
  ko,
  ms,
  th,
  id
};

// Export individual languages for convenience
export { ja, en, zhTW, ko, ms, th, id };

// Export to global scope for browser compatibility
if (typeof window !== 'undefined') {
  window.translations = translations;
}