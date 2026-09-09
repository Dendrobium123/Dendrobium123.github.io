import type { Config, IntegrationUserConfig, ThemeUserConfig } from 'astro-pure/types'

export const theme: ThemeUserConfig = {
  title: 'Dendrobiumcgk',
  author: 'dendrobium',
  description: '希望我们都能成为更好的人。',
  favicon: '/favicon.ico',
  socialCard: '/avatar.jpg',
  logo: { src: '/src/assets/avatar.jpg', alt: 'dendrobium' },
  locale: {
    lang: 'zh-CN',
    attrs: 'zh_CN',
    dateLocale: 'en-US',
    dateOptions: { year: 'numeric', month: 'short', day: 'numeric' }
  },
  titleDelimiter: '•',
  prerender: true,
  npmCDN: 'https://cdn.jsdelivr.net/npm',
  head: [],
  customCss: [],
  header: {
    menu: [
      { title: '首页', link: '/' },
      { title: '文章', link: '/blog' },
      { title: '归档', link: '/archives' },
      { title: '友链', link: '/links' },
      { title: '关于', link: '/about' }
    ]
  },
  footer: {
    year: `© 2024 - ${new Date().getFullYear()}`,
    links: [],
    credits: true,
    social: [
      { icon: 'github', label: 'GitHub', href: 'https://github.com/Dendrobium123' },
      { icon: 'rss', label: 'RSS', href: '/rss.xml' }
    ]
  },
  content: {
    externalLinks: { content: ' ↗', properties: { rel: 'noreferrer' } },
    blogPageSize: 10,
    share: [],
    imageCaption: true
  }
}

export const integ: IntegrationUserConfig = {
  links: { logbook: [], applyTip: [], cacheAvatar: true },
  pagefind: true,
  quote: {
    server: 'data:application/json,%22The%20world%20opens%20itself%20before%20those%20with%20noble%20hearts.%22',
    target: '(data) => data'
  },
  typography: {
    class: 'prose text-base',
    blockquoteStyle: 'normal',
    inlineCodeBlockStyle: 'modern'
  },
  mediumZoom: {
    enable: true,
    selector: '.prose .zoomable',
    options: { className: 'zoomable' }
  },
  waline: {
    enable: true,
    server: 'https://comment.dendrobiumcgk.chat/',
    showMeta: false,
    emoji: ['bmoji', 'weibo'],
    additionalConfigs: {
      pageview: true,
      comment: true,
      locale: { placeholder: '随便讲点什么~' },
      imageUploader: false
    }
  }
}

export default { ...theme, integ } as Config
