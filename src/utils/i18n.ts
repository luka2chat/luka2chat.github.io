export const languages = {
  en: 'English',
  zh: '中文',
} as const;

export type Language = keyof typeof languages;

export const defaultLang: Language = 'en';

export interface I18nDict {
  [key: string]: string | I18nDict;
}

// 翻译字典
export const ui: Record<Language, I18nDict> = {
  zh: {
    nav: {
      home: '首页',
      blog: '博客',
      about: '关于',
      contact: '联系我们',
      services: '服务',
      pricing: '价格',
    },
    common: {
      readMore: '阅读更多',
      loading: '加载中...',
      search: '搜索',
      tags: '标签',
      categories: '分类',
      date: '日期',
      author: '作者',
      share: '分享',
      prev: '上一页',
      next: '下一页',
    },
    footer: {
      product: '产品',
      platform: '平台',
      support: '支持',
      company: '公司',
      features: '功能',
      security: '安全',
      team: '团队',
      enterprise: '企业版',
      customerStories: '客户案例',
      resources: '资源',
      developerApi: 'API',
      partners: '合作伙伴',
      docs: '文档',
      communityForum: '社区论坛',
      professionalServices: '专业服务',
      skills: '技能',
      status: '状态',
      about: '关于我们',
      careers: '招聘',
      press: '新闻',
      inclusion: '包容',
      socialImpact: '社会影响',
      shop: '商店',
      terms: '使用条款',
      privacy: '隐私政策',
    },
    hero: {
      title: '您的AI聊天助手',
      subtitle: '提供智能对话和个性化服务',
      cta: '开始使用',
    },
  },
  en: {
    nav: {
      home: 'Home',
      blog: 'Blog',
      about: 'About',
      contact: 'Contact',
      services: 'Services',
      pricing: 'Pricing',
    },
    common: {
      readMore: 'Read More',
      loading: 'Loading...',
      search: 'Search',
      tags: 'Tags',
      categories: 'Categories',
      date: 'Date',
      author: 'Author',
      share: 'Share',
      prev: 'Previous',
      next: 'Next',
    },
    footer: {
      product: 'Product',
      platform: 'Platform',
      support: 'Support',
      company: 'Company',
      features: 'Features',
      security: 'Security',
      team: 'Team',
      enterprise: 'Enterprise',
      customerStories: 'Customer Stories',
      resources: 'Resources',
      developerApi: 'Developer API',
      partners: 'Partners',
      docs: 'Docs',
      communityForum: 'Community Forum',
      professionalServices: 'Professional Services',
      skills: 'Skills',
      status: 'Status',
      about: 'About',
      careers: 'Careers',
      press: 'Press',
      inclusion: 'Inclusion',
      socialImpact: 'Social Impact',
      shop: 'Shop',
      terms: 'Terms',
      privacy: 'Privacy Policy',
    },
    hero: {
      title: 'Your AI Chat Assistant',
      subtitle: 'Intelligent conversations and personalized services',
      cta: 'Get Started',
    },
  },
};

// 获取翻译文本的辅助函数
export function useTranslations(lang: Language) {
  return function t(key: string): string {
    const keys = key.split('.');
    let current: any = ui[lang];
    
    for (const k of keys) {
      if (current && typeof current === 'object' && k in current) {
        current = current[k];
      } else {
        console.warn(`Translation key "${key}" not found for language "${lang}"`);
        return key;
      }
    }
    
    return typeof current === 'string' ? current : key;
  };
}

// 获取当前语言
export function getLangFromUrl(url: URL): Language {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) return lang as Language;
  return defaultLang;
}

// 获取本地化路径
export function getLocalizedPath(path: string, lang: Language): string {
  if (lang === defaultLang) {
    return path === '/' ? '/' : path.replace(/\/$/, '');
  }
  const cleanPath = path === '/' ? '' : path.replace(/\/$/, '');
  return `/${lang}${cleanPath}`;
}

// 获取其他语言的路径
export function getAlternateLanguagePaths(currentPath: string, currentLang: Language) {
  const paths: Record<Language, string> = {} as Record<Language, string>;
  
  // 移除当前语言前缀
  let basePath = currentPath;
  if (currentLang !== defaultLang) {
    basePath = currentPath.replace(`/${currentLang}`, '') || '/';
  }
  
  // 为每种语言生成路径
  Object.keys(languages).forEach((lang) => {
    const l = lang as Language;
    paths[l] = getLocalizedPath(basePath, l);
  });
  
  return paths;
}