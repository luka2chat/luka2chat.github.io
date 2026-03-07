import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';
import type { Language } from './utils/i18n';
import { getLocalizedPath } from './utils/i18n';

export const getHeaderData = (lang: Language = 'en') => {
  const navTexts = {
    zh: {
      home: '首页',
      projects: '项目',
      blog: '博客',
      about: '关于',
      contact: '联系',
      github: 'GitHub'
    },
    en: {
      home: 'Home',
      projects: 'Projects',
      blog: 'Blog',
      about: 'About',
      contact: 'Contact',
      github: 'GitHub'
    }
  };

  const texts = navTexts[lang];

  return {
    links: [
      {
        text: texts.home,
        href: getLocalizedPath('/', lang)
      },
      {
        text: texts.projects,
        href: getLocalizedPath('/#projects', lang)
      },
      {
        text: texts.blog,
        href: getLocalizedPath('/blog', lang)
      },
      {
        text: texts.about,
        href: getLocalizedPath('/about', lang)
      },
      {
        text: texts.contact,
        href: getLocalizedPath('/contact', lang)
      }
    ],
    actions: [{ text: texts.github, href: 'https://github.com/luka2chat', target: '_blank' }],
  };
};

export const headerData = getHeaderData('en');

export const getFooterData = (lang: Language = 'en') => {
  const footerTexts = {
    zh: {
      projects: '项目',
      resources: '资源',
      links: '链接',
      awesomeGeo: 'awesome-geo',
      clawrecord: 'ClawRecord',
      leaderboard: '排行榜',
      blog: '博客',
      about: '关于',
      contact: '联系',
      terms: '使用条款',
      privacy: '隐私政策'
    },
    en: {
      projects: 'Projects',
      resources: 'Resources',
      links: 'Links',
      awesomeGeo: 'awesome-geo',
      clawrecord: 'ClawRecord',
      leaderboard: 'Leaderboard',
      blog: 'Blog',
      about: 'About',
      contact: 'Contact',
      terms: 'Terms',
      privacy: 'Privacy Policy'
    }
  };

  const texts = footerTexts[lang];

  return {
    links: [
      {
        title: texts.projects,
        links: [
          { text: texts.awesomeGeo, href: 'https://github.com/luka2chat/awesome-geo' },
          { text: texts.clawrecord, href: 'https://github.com/luka2chat/clawrecord' },
          { text: texts.leaderboard, href: 'https://github.com/luka2chat/clawrecord-leaderboard' },
        ],
      },
      {
        title: texts.links,
        links: [
          { text: texts.blog, href: getLocalizedPath('/blog', lang) },
          { text: texts.about, href: getLocalizedPath('/about', lang) },
          { text: texts.contact, href: getLocalizedPath('/contact', lang) },
        ],
      },
    ],
    secondaryLinks: [
      { text: texts.terms, href: getLocalizedPath('/terms', lang) },
      { text: texts.privacy, href: getLocalizedPath('/privacy', lang) },
    ],
    socialLinks: [
      { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/luka2chat' },
      { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
    ],
    footNote: `
      Made by <a class="text-primary hover:underline transition-colors duration-200" href="https://luka2chat.com/">luka2chat</a> · Coding for fun!
    `,
  };
};

export const footerData = getFooterData('en');
