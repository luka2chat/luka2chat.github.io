import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';
import type { Language } from './utils/i18n';

// 多语言导航数据
export const getHeaderData = (lang: Language = 'en') => {
  const navTexts = {
    zh: {
      home: '首页',
      blog: '博客',
      contact: '联系我们',
      download: '下载'
    },
    en: {
      home: 'Home',
      blog: 'Blog',
      contact: 'Contact',
      download: 'Download'
    }
  };

  const texts = navTexts[lang];

  return {
    links: [
      {
        text: texts.home,
        href: getPermalink('/')
      },
    // {
    //   text: 'Pages',
    //   links: [
    //     {
    //       text: 'Features (Anchor Link)',
    //       href: getPermalink('/#features'),
    //     },
    //     {
    //       text: 'Services',
    //       href: getPermalink('/services'),
    //     },
    //     {
    //       text: 'Pricing',
    //       href: getPermalink('/pricing'),
    //     },
    //     {
    //       text: 'About us',
    //       href: getPermalink('/about'),
    //     },
    //     {
    //       text: 'Contact',
    //       href: getPermalink('/contact'),
    //     },
    //     {
    //       text: 'Terms',
    //       href: getPermalink('/terms'),
    //     },
    //     {
    //       text: 'Privacy policy',
    //       href: getPermalink('/privacy'),
    //     },
    //   ],
    // },
    // {
    //   text: 'Landing',
    //   links: [
    //     {
    //       text: 'Lead Generation',
    //       href: getPermalink('/landing/lead-generation'),
    //     },
    //     {
    //       text: 'Long-form Sales',
    //       href: getPermalink('/landing/sales'),
    //     },
    //     {
    //       text: 'Click-Through',
    //       href: getPermalink('/landing/click-through'),
    //     },
    //     {
    //       text: 'Product Details (or Services)',
    //       href: getPermalink('/landing/product'),
    //     },
    //     {
    //       text: 'Coming Soon or Pre-Launch',
    //       href: getPermalink('/landing/pre-launch'),
    //     },
    //     {
    //       text: 'Subscription',
    //       href: getPermalink('/landing/subscription'),
    //     },
    //   ],
    // },
      {
        text: texts.blog,
        href: getBlogPermalink()
      },
      {
        text: texts.contact,
        href: getPermalink('/contact')
      }
    ],
    actions: [{ text: texts.download, href: 'https://github.com/luka2chat', target: '_blank' }],
  };
};

// 保持向后兼容性
export const headerData = getHeaderData('en');

export const getFooterData = (lang: Language = 'en') => {
  const footerTexts = {
    zh: {
      product: '产品',
      platform: '平台', 
      support: '支持',
      company: '公司',
      features: '功能',
      security: '安全',
      team: '团队',
      enterprise: '企业版',
      customerStories: '客户案例',
      pricing: '价格',
      resources: '资源',
      developerApi: '开发者API',
      partners: '合作伙伴',
      docs: '文档',
      communityForum: '社区论坛',
      professionalServices: '专业服务',
      skills: '技能',
      status: '状态',
      about: '关于我们',
      blog: '博客',
      careers: '招聘',
      press: '新闻',
      inclusion: '包容性',
      socialImpact: '社会影响',
      shop: '商店',
      terms: '使用条款',
      privacy: '隐私政策'
    },
    en: {
      product: 'Product',
      platform: 'Platform',
      support: 'Support', 
      company: 'Company',
      features: 'Features',
      security: 'Security',
      team: 'Team',
      enterprise: 'Enterprise',
      customerStories: 'Customer stories',
      pricing: 'Pricing',
      resources: 'Resources',
      developerApi: 'Developer API',
      partners: 'Partners',
      docs: 'Docs',
      communityForum: 'Community Forum',
      professionalServices: 'Professional Services',
      skills: 'Skills',
      status: 'Status',
      about: 'About',
      blog: 'Blog',
      careers: 'Careers',
      press: 'Press',
      inclusion: 'Inclusion',
      socialImpact: 'Social Impact',
      shop: 'Shop',
      terms: 'Terms',
      privacy: 'Privacy Policy'
    }
  };

  const texts = footerTexts[lang];

  return {
    links: [
      {
        title: texts.product,
        links: [
          { text: texts.features, href: '#' },
          { text: texts.security, href: '#' },
          { text: texts.team, href: '#' },
          { text: texts.enterprise, href: '#' },
          { text: texts.customerStories, href: '#' },
          { text: texts.pricing, href: '#' },
          { text: texts.resources, href: '#' },
        ],
      },
      {
        title: texts.platform,
        links: [
          { text: texts.developerApi, href: '#' },
          { text: texts.partners, href: '#' },
          { text: 'Atom', href: '#' },
          { text: 'Electron', href: '#' },
          { text: 'AstroWind Desktop', href: '#' },
        ],
      },
      {
        title: texts.support,
        links: [
          { text: texts.docs, href: '#' },
          { text: texts.communityForum, href: '#' },
          { text: texts.professionalServices, href: '#' },
          { text: texts.skills, href: '#' },
          { text: texts.status, href: '#' },
        ],
      },
      {
        title: texts.company,
        links: [
          { text: texts.about, href: '#' },
          { text: texts.blog, href: '#' },
          { text: texts.careers, href: '#' },
          { text: texts.press, href: '#' },
          { text: texts.inclusion, href: '#' },
          { text: texts.socialImpact, href: '#' },
          { text: texts.shop, href: '#' },
        ],
      },
    ],
    secondaryLinks: [
      { text: texts.terms, href: getPermalink('/terms') },
      { text: texts.privacy, href: getPermalink('/privacy') },
    ],
  socialLinks: [
    { ariaLabel: 'X', icon: 'tabler:brand-x', href: '#' },
    { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: '#' },
    { ariaLabel: 'Facebook', icon: 'tabler:brand-facebook', href: '#' },
    { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
    { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/luka2chat' },
  ],
    footNote: `
      Made by <a class="text-blue-600 underline dark:text-muted" href="https://luka2chat.com/"> luka2chat</a> · All rights reserved.
    `,
  };
};

// 保持向后兼容性
export const footerData = getFooterData('en');
