// 主程序入口文件 - 已重构为模块化结构
// 所有功能已分离到独立文件：
// - js/translations.js: 多语言翻译配置
// - js/language-switcher.js: 语言切换功能
// - js/animations.js: 动画和视觉效果
// - js/interactions.js: 交互功能和表单处理

console.log('ABEL & Co., Ltd. - 多语言企业网站已加载');
console.log('模块化结构：');
console.log('✓ 翻译配置模块');
console.log('✓ 语言切换模块');
console.log('✓ 动画效果模块');
console.log('✓ 交互功能模块');

// 全局配置
window.ABEL_CONFIG = {
  version: '2.0.0',
  defaultLanguage: 'ja',
  supportedLanguages: ['ja', 'en', 'zh-tw', 'ko', 'ms', 'th', 'id'],
  animationsEnabled: true,
  debugMode: false
};

// 应用初始化状态检查
document.addEventListener('DOMContentLoaded', () => {
  // 延迟检查，确保所有DOMContentLoaded事件处理完成
  setTimeout(() => {
    // 检查必要的模块是否已加载
    const moduleChecks = {
      'translations': () => window.translations !== undefined,
      'languageSwitcher': () => window.languageSwitcher !== undefined,
      'animationManager': () => window.animationManager !== undefined,
      'interactionManager': () => window.interactionManager !== undefined
    };

    const loadedModules = [];
    const failedModules = [];

    Object.entries(moduleChecks).forEach(([name, checkFn]) => {
      if (checkFn()) {
        loadedModules.push(name);
      } else {
        failedModules.push(name);
      }
    });

    console.log(`✓ 成功加载模块: ${loadedModules.join(', ')}`);
    
    if (failedModules.length > 0) {
      console.warn(`⚠ 未能加载模块: ${failedModules.join(', ')}`);
    }

    if (loadedModules.length >= 2) {
      console.log('✓ 网站核心功能已准备就绪');
    } else {
      console.error('✗ 关键模块加载失败，网站可能无法正常工作');
    }
  }, 500);
});