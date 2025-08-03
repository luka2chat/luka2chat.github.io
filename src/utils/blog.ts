import type { PaginateFunction } from 'astro';
import { getCollection, render } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import type { Post } from '~/types';
import { APP_BLOG } from 'astrowind:config';
import slugify from 'slugify';
import { cleanSlug, trimSlash, BLOG_BASE, POST_PERMALINK_PATTERN, CATEGORY_BASE, TAG_BASE } from './permalinks';
import type { Language } from './i18n';

const generatePermalink = async ({
  id,
  slug,
  publishDate,
  category,
}: {
  id: string;
  slug: string;
  publishDate: Date;
  category: string | undefined;
}) => {
  const year = String(publishDate.getFullYear()).padStart(4, '0');
  const month = String(publishDate.getMonth() + 1).padStart(2, '0');
  const day = String(publishDate.getDate()).padStart(2, '0');
  const hour = String(publishDate.getHours()).padStart(2, '0');
  const minute = String(publishDate.getMinutes()).padStart(2, '0');
  const second = String(publishDate.getSeconds()).padStart(2, '0');

  const permalink = POST_PERMALINK_PATTERN.replace('%slug%', slug)
    .replace('%id%', id)
    .replace('%category%', category || '')
    .replace('%year%', year)
    .replace('%month%', month)
    .replace('%day%', day)
    .replace('%hour%', hour)
    .replace('%minute%', minute)
    .replace('%second%', second);

  return permalink
    .split('/')
    .map((el) => trimSlash(el))
    .filter((el) => !!el)
    .join('/');
};

const getNormalizedPost = async (post: CollectionEntry<'post'>): Promise<Post> => {
  const { id, data } = post;
  const { Content, remarkPluginFrontmatter } = await render(post);

  const {
    publishDate: rawPublishDate = new Date(),
    updateDate: rawUpdateDate,
    title,
    excerpt,
    image,
    tags: rawTags = [],
    category: rawCategory,
    author,
    draft = false,
    metadata = {},
  } = data;

  const slug = cleanSlug(id); // cleanSlug(rawSlug.split('/').pop());
  const publishDate = new Date(rawPublishDate);
  const updateDate = rawUpdateDate ? new Date(rawUpdateDate) : undefined;

  const category = rawCategory
    ? {
        slug: cleanSlug(rawCategory),
        title: rawCategory,
      }
    : undefined;

  const tags = rawTags.map((tag: string) => ({
    slug: cleanSlug(tag),
    title: tag,
  }));

  return {
    id: id,
    slug: slug,
    permalink: await generatePermalink({ id, slug, publishDate, category: category?.slug }),

    publishDate: publishDate,
    updateDate: updateDate,

    title: title,
    excerpt: excerpt,
    image: image,

    category: category,
    tags: tags,
    author: author,

    draft: draft,

    metadata,

    Content: Content,
    // or 'content' in case you consume from API

    readingTime: remarkPluginFrontmatter?.readingTime,
  };
};

const load = async function (): Promise<Array<Post>> {
  const posts = await getCollection('post');
  const normalizedPosts = posts.map(async (post) => await getNormalizedPost(post));

  const results = (await Promise.all(normalizedPosts))
    .sort((a, b) => b.publishDate.valueOf() - a.publishDate.valueOf())
    .filter((post) => !post.draft);

  return results;
};

let _posts: Array<Post>;

/** */
export const isBlogEnabled = APP_BLOG.isEnabled;
export const isRelatedPostsEnabled = APP_BLOG.isRelatedPostsEnabled;
export const isBlogListRouteEnabled = APP_BLOG.list.isEnabled;
export const isBlogPostRouteEnabled = APP_BLOG.post.isEnabled;
export const isBlogCategoryRouteEnabled = APP_BLOG.category.isEnabled;
export const isBlogTagRouteEnabled = APP_BLOG.tag.isEnabled;

export const blogListRobots = APP_BLOG.list.robots;
export const blogPostRobots = APP_BLOG.post.robots;
export const blogCategoryRobots = APP_BLOG.category.robots;
export const blogTagRobots = APP_BLOG.tag.robots;

export const blogPostsPerPage = APP_BLOG?.postsPerPage;

/** */
export const fetchPosts = async (): Promise<Array<Post>> => {
  if (!_posts) {
    _posts = await load();
  }

  return _posts;
};

/** */
export const findPostsBySlugs = async (slugs: Array<string>): Promise<Array<Post>> => {
  if (!Array.isArray(slugs)) return [];

  const posts = await fetchPosts();

  return slugs.reduce(function (r: Array<Post>, slug: string) {
    posts.some(function (post: Post) {
      return slug === post.slug && r.push(post);
    });
    return r;
  }, []);
};

/** */
export const findPostsByIds = async (ids: Array<string>): Promise<Array<Post>> => {
  if (!Array.isArray(ids)) return [];

  const posts = await fetchPosts();

  return ids.reduce(function (r: Array<Post>, id: string) {
    posts.some(function (post: Post) {
      return id === post.id && r.push(post);
    });
    return r;
  }, []);
};

/** */
export const findLatestPosts = async ({ count }: { count?: number }): Promise<Array<Post>> => {
  const _count = count || 4;
  const posts = await fetchPosts();

  return posts ? posts.slice(0, _count) : [];
};

/** */
export const getStaticPathsBlogList = async ({ paginate }: { paginate: PaginateFunction }) => {
  if (!isBlogEnabled || !isBlogListRouteEnabled) return [];
  return paginate(await fetchPosts(), {
    params: { blog: BLOG_BASE || undefined },
    pageSize: blogPostsPerPage,
  });
};

/** */
export const getStaticPathsBlogPost = async () => {
  if (!isBlogEnabled || !isBlogPostRouteEnabled) return [];
  return (await fetchPosts()).flatMap((post) => ({
    params: {
      blog: post.permalink,
    },
    props: { post },
  }));
};

/** */
export const getStaticPathsBlogCategory = async ({ paginate }: { paginate: PaginateFunction }) => {
  if (!isBlogEnabled || !isBlogCategoryRouteEnabled) return [];

  const posts = await fetchPosts();
  const categories = {};
  posts.map((post) => {
    if (post.category?.slug) {
      categories[post.category?.slug] = post.category;
    }
  });

  return Array.from(Object.keys(categories)).flatMap((categorySlug) =>
    paginate(
      posts.filter((post) => post.category?.slug && categorySlug === post.category?.slug),
      {
        params: { category: categorySlug, blog: CATEGORY_BASE || undefined },
        pageSize: blogPostsPerPage,
        props: { category: categories[categorySlug] },
      }
    )
  );
};

/** */
export const getStaticPathsBlogTag = async ({ paginate }: { paginate: PaginateFunction }) => {
  if (!isBlogEnabled || !isBlogTagRouteEnabled) return [];

  const posts = await fetchPosts();
  const tags = {};
  posts.map((post) => {
    if (Array.isArray(post.tags)) {
      post.tags.map((tag) => {
        tags[tag?.slug] = tag;
      });
    }
  });

  return Array.from(Object.keys(tags)).flatMap((tagSlug) =>
    paginate(
      posts.filter((post) => Array.isArray(post.tags) && post.tags.find((elem) => elem.slug === tagSlug)),
      {
        params: { tag: tagSlug, blog: TAG_BASE || undefined },
        pageSize: blogPostsPerPage,
        props: { tag: tags[tagSlug] },
      }
    )
  );
};

/** */
export async function getRelatedPosts(originalPost: Post, maxResults: number = 4): Promise<Post[]> {
  const allPosts = await fetchPosts();
  const originalTagsSet = new Set(originalPost.tags ? originalPost.tags.map((tag) => tag.slug) : []);

  const postsWithScores = allPosts.reduce((acc: { post: Post; score: number }[], iteratedPost: Post) => {
    if (iteratedPost.slug === originalPost.slug) return acc;

    let score = 0;
    if (iteratedPost.category && originalPost.category && iteratedPost.category.slug === originalPost.category.slug) {
      score += 5;
    }

    if (iteratedPost.tags) {
      iteratedPost.tags.forEach((tag) => {
        if (originalTagsSet.has(tag.slug)) {
          score += 1;
        }
      });
    }

    acc.push({ post: iteratedPost, score });
    return acc;
  }, []);

  postsWithScores.sort((a, b) => b.score - a.score);

  const selectedPosts: Post[] = [];
  let i = 0;
  while (selectedPosts.length < maxResults && i < postsWithScores.length) {
    selectedPosts.push(postsWithScores[i].post);
    i++;
  }

  return selectedPosts;
}

// 自定义的多语言文章标准化函数
const getNormalizedPostWithLang = async (post: CollectionEntry<'post'>, baseSlug?: string, lang: Language = 'en'): Promise<Post> => {
  const { id, data } = post;
  const { Content, remarkPluginFrontmatter } = await render(post);

  const {
    publishDate: rawPublishDate = new Date(),
    updateDate: rawUpdateDate,
    title,
    excerpt,
    image,
    tags: rawTags = [],
    category: rawCategory,
    author,
    draft = false,
    metadata = {},
  } = data;

  // 使用提供的baseSlug或从id生成，确保移除语言后缀
  let slug: string;
  if (baseSlug) {
    slug = cleanSlug(baseSlug);
  } else {
    // 从id中提取baseSlug，移除.zh.后缀
    const postId = id.split('/').pop() || id;
    slug = cleanSlug(postId);
  }
  const publishDate = new Date(rawPublishDate);
  const updateDate = rawUpdateDate ? new Date(rawUpdateDate) : undefined;

  const category = rawCategory
    ? {
        slug: cleanSlug(rawCategory),
        title: rawCategory,
      }
    : undefined;

  const tags = rawTags.map((tag: string) => ({
    slug: cleanSlug(tag),
    title: tag,
  }));

  // 生成带blog前缀的permalink
  let permalink: string;
  if (lang === 'zh') {
    permalink = `zh/blog/${slug}`;
  } else {
    permalink = `blog/${slug}`;
  }

  return {
    id: id,
    slug: slug,
    permalink: permalink,

    publishDate: publishDate,
    updateDate: updateDate,

    title: title,
    excerpt: excerpt,
    image: image,

    category: category,
    tags: tags,
    author: author,

    draft: draft,

    metadata,

    Content: Content,
    content: post.body,

    readingTime: remarkPluginFrontmatter?.readingTime ?? 0,
  };
};

// 多语言支持函数
const loadWithLanguage = async function (lang: Language = 'en'): Promise<Array<Post>> {
  const posts = await getCollection('post');
  
  // 创建语言感知的文章映射
  const postMap = new Map<string, CollectionEntry<'post'>>(); // 全部文章
  const langPosts = new Map<string, CollectionEntry<'post'>>(); // 语种下的文章
  
  // 首先处理所有文章，按语言分类
  // 第一遍：收集所有中文文章和它们的baseSlug
  posts.forEach(post => {
    const path = post.filePath || 'default';
    const id = path.split('/').pop() || 'default';
    if (path.endsWith('.zh.md')) {
      const baseSlug = slugify(id.replace('.zh.md', ''));
      langPosts.set(baseSlug, post);
    }
  });
  
  // 第二遍：收集英文文章，排除已有中文版本的
  posts.forEach(post => {
    const path = post.filePath || 'default';
    const id = path.split('/').pop() || 'default';
    if (!id.endsWith('.zh.md')) {
      // 检查是否已有对应的中文版本
      const slug = slugify(id.replace('.md', ''))
      if (!postMap.has(slug)) {
        postMap.set(slug, post);
      }
    }
  });
  
  // 根据语言选择合适的文章
  const selectedPosts: Array<{post: CollectionEntry<'post'>, baseSlug: string}> = [];
  
  if (lang === 'zh') {
    // 中文：优先使用中文版本，降级到英文版本
    postMap.forEach((englishPost, baseSlug) => {
      const chinesePost = langPosts.get(baseSlug);
      selectedPosts.push({
        post: chinesePost || englishPost,
        baseSlug: baseSlug
      });
    });
    
    // 添加仅有中文版本的文章
    langPosts.forEach((chinesePost, baseSlug) => {
      if (!postMap.has(baseSlug)) {
        selectedPosts.push({
          post: chinesePost,
          baseSlug: baseSlug
        });
      }
    });
  } else {
    // 英文：只使用英文版本
    postMap.forEach((post, baseSlug) => {
      selectedPosts.push({
        post: post,
        baseSlug: baseSlug
      });
    });
  }
  
  const normalizedPosts = selectedPosts.map(async ({post, baseSlug}) => 
    await getNormalizedPostWithLang(post, baseSlug, lang)
  );

  const results = (await Promise.all(normalizedPosts))
    .sort((a, b) => b.publishDate.valueOf() - a.publishDate.valueOf())
    .filter((post) => !post.draft);

  return results;
};

// 清理缓存以便重新测试
let _zhPosts: Array<Post> | null = null;
let _enPosts: Array<Post> | null = null;

/** 获取指定语言的文章列表 */
export const fetchPostsByLanguage = async (lang: Language = 'en'): Promise<Array<Post>> => {
  if (lang === 'zh') {
    if (!_zhPosts) {
      _zhPosts = await loadWithLanguage('zh');
    }
    return _zhPosts;
  } else {
    if (!_enPosts) {
      _enPosts = await loadWithLanguage('en');
    }
    return _enPosts;
  }
};

/** 获取博客列表的静态路径（支持多语言） */
export const getStaticPathsBlogListWithLang = async ({ paginate }: { paginate: PaginateFunction }, lang: Language = 'en') => {
  if (!isBlogEnabled || !isBlogListRouteEnabled) return [];
  
  const posts = await fetchPostsByLanguage(lang);
  const basePath = lang === 'en' ? BLOG_BASE : `${lang}/${BLOG_BASE}`;
  
  return paginate(posts, {
    params: { blog: basePath || undefined },
    pageSize: blogPostsPerPage,
  });
};

/** 获取博客文章的静态路径（支持多语言） */
export const getStaticPathsBlogPostWithLang = async (lang: Language = 'en') => {
  if (!isBlogEnabled || !isBlogPostRouteEnabled) return [];
  
  const posts = await fetchPostsByLanguage(lang);
  
  return posts.flatMap((post) => ({
    params: {
      blog: post.permalink,
    },
    props: { post },
  }));
};

/** 获取博客分类的静态路径（支持多语言） */
export const getStaticPathsBlogCategoryWithLang = async ({ paginate }: { paginate: PaginateFunction }, lang: Language = 'en') => {
  if (!isBlogEnabled || !isBlogCategoryRouteEnabled) return [];

  const posts = await fetchPostsByLanguage(lang);
  const categories = {};
  posts.map((post) => {
    if (post.category?.slug) {
      categories[post.category?.slug] = post.category;
    }
  });

  const basePath = lang === 'en' ? CATEGORY_BASE : `${lang}/${CATEGORY_BASE}`;

  return Array.from(Object.keys(categories)).flatMap((categorySlug) =>
    paginate(
      posts.filter((post) => post.category?.slug && categorySlug === post.category?.slug),
      {
        params: { category: categorySlug, blog: basePath || undefined },
        pageSize: blogPostsPerPage,
        props: { category: categories[categorySlug] },
      }
    )
  );
};

/** 获取博客标签的静态路径（支持多语言） */
export const getStaticPathsBlogTagWithLang = async ({ paginate }: { paginate: PaginateFunction }, lang: Language = 'en') => {
  if (!isBlogEnabled || !isBlogTagRouteEnabled) return [];

  const posts = await fetchPostsByLanguage(lang);
  const tags = {};
  posts.map((post) => {
    if (Array.isArray(post.tags)) {
      post.tags.map((tag) => {
        tags[tag?.slug] = tag;
      });
    }
  });

  const basePath = lang === 'en' ? TAG_BASE : `${lang}/${TAG_BASE}`;

  return Array.from(Object.keys(tags)).flatMap((tagSlug) =>
    paginate(
      posts.filter((post) => Array.isArray(post.tags) && post.tags.find((elem) => elem.slug === tagSlug)),
      {
        params: { tag: tagSlug, blog: basePath || undefined },
        pageSize: blogPostsPerPage,
        props: { tag: tags[tagSlug] },
      }
    )
  );
};
