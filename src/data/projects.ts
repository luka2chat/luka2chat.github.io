/**
 * Personal projects / apps showcase.
 * Used by /projects and /zh/projects pages.
 */
export interface Project {
  id: string;
  name: string;
  nameZh: string;
  description: string;
  descriptionZh: string;
  href: string;
  icon: string; // tabler icon name, e.g. 'tabler:star'
  tags: ('open-source' | 'free' | 'GEO' | 'AI' | 'tool')[];
}

export const projects: Project[] = [
  {
    id: 'awesome-geo',
    name: 'awesome-geo',
    nameZh: 'awesome-geo',
    description: 'A curated list of 120+ resources for Generative Engine Optimization — helping content get cited by AI search engines.',
    descriptionZh: '120+ 生成式引擎优化（GEO）资源精选列表，帮助内容被 AI 搜索引擎引用。',
    href: 'https://github.com/luka2chat/awesome-geo',
    icon: 'tabler:star',
    tags: ['open-source', 'free', 'GEO'],
  },
  {
    id: 'owngame',
    name: 'owngame',
    nameZh: 'owngame',
    description:
      'Play, remix, and make it yours. An open-source toolkit that lets your AI turn a game you like into your own version — change the art, reshape the rules, and play it at owngame.dev.',
    descriptionZh:
      '做属于自己的游戏。开源工具包，让 AI 把喜欢的游戏改成自己的版本：换画风、改规则，在 owngame.dev 直接玩。',
    href: 'https://github.com/luka2chat/owngame',
    icon: 'tabler:device-gamepad-2',
    tags: ['open-source', 'free', 'AI', 'tool'],
  },
  {
    id: 'geo-skills',
    name: 'geo-skills',
    nameZh: 'geo-skills',
    description: 'Production-grade GEO best practices skill for AI coding agents — 12 rule files for content strategy, technical implementation, and authority building.',
    descriptionZh: '面向 AI 编程助手的 GEO 最佳实践技能 — 12 条规则覆盖内容策略、技术实现与权威建设。',
    href: 'https://github.com/luka2chat/geo-skills',
    icon: 'tabler:robot',
    tags: ['open-source', 'free', 'GEO', 'AI', 'tool'],
  },
];
