import { rehypeHeadingIds } from '@astrojs/markdown-remark'
import AstroPureIntegration from 'astro-pure'
import { defineConfig, fontProviders, svgoOptimizer } from 'astro/config'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'

import rehypeAutolinkHeadings from './src/plugins/rehype-auto-link-headings.ts'
import {
  addCollapse,
  addCopyButton,
  addLanguage,
  addTitle,
  updateStyle
} from './src/plugins/shiki-custom-transformers.ts'
import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerRemoveNotationEscape
} from './src/plugins/shiki-official/transformers.ts'
import config from './src/site.config.ts'

export default defineConfig({
  site: 'https://dendrobiumcgk.chat',
  trailingSlash: 'never',
  redirects: {
    '/blog/2025616随笔': '/blog/thoughts-2025-06-16',
    '/blog/博客装修': '/blog/blog-decoration',
    '/blog/电子学paul-horowitz读书笔记': '/blog/art-of-electronics-notes',
    '/blog/关于美': '/blog/thoughts-on-beauty',
    '/blog/互联网核与童年': '/blog/internetcore-and-childhood',
    '/blog/回忆录': '/blog/memoir-archived',
    '/blog/回忆录-2': '/blog/morning-flowers-picked-at-dusk',
    '/blog/回忆最初的感动': '/blog/remembering-first-emotions',
    '/blog/火焰战士': '/blog/flame-warrior',
    '/blog/加缪笔记': '/blog/camus-notes',
    '/blog/控制论norbert-wiener': '/blog/cybernetics-norbert-wiener',
    '/blog/魔女的夜宴': '/blog/sanoba-witch-review',
    '/blog/时间的感知': '/blog/perception-of-time',
    '/blog/突然打开blog发现图片全部崩坏': '/blog/blog-images-broken',
    '/blog/突然的想法': '/blog/sudden-thoughts',
    '/blog/摘抄': '/blog/myth-of-sisyphus-excerpts',
    '/blog/直视骄阳书后问题': '/blog/staring-at-the-sun-questions',
    '/blog/中科大研一想法': '/blog/ustc-first-year-thoughts',
    '/blog/prenet渐近递归网络模块改进': '/blog/prenet-module-improvement'
  },
  server: { host: true },
  vite: {
    // astro-pure contains virtual modules provided by its Astro integration.
    // Let Vite transform it normally instead of trying to pre-bundle it in dev.
    optimizeDeps: { exclude: ['astro-pure'] }
  },
  prefetch: { defaultStrategy: 'viewport' },
  image: {
    responsiveStyles: false,
    service: { entrypoint: 'astro/assets/services/noop' },
    remotePatterns: [{ protocol: 'https' }]
  },
  fonts: [
    {
      provider: fontProviders.local() as any,
      name: 'Satoshi',
      cssVariable: '--font-satoshi',
      styles: ['normal'],
      weights: ['100 900'],
      subsets: ['latin'],
      options: {
        variants: [
          {
            src: ['./src/assets/fonts/AlimamaFangYuanTiVF-Thin.ttf'],
            weight: '100 900',
            style: 'normal'
          }
        ]
      }
    }
  ],
  integrations: [AstroPureIntegration(config)],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [
      [rehypeKatex, {}],
      rehypeHeadingIds,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'append',
          properties: { className: ['anchor'] },
          content: { type: 'text', value: '#' }
        }
      ]
    ],
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
      transformers: [
        transformerNotationDiff(),
        transformerNotationHighlight(),
        transformerRemoveNotationEscape(),
        updateStyle(),
        addTitle(),
        addLanguage(),
        addCopyButton(2000),
        addCollapse(15)
      ]
    }
  },
  experimental: {
    contentIntellisense: true,
    svgOptimizer: svgoOptimizer(),
    clientPrerender: true,
    queuedRendering: { enabled: true }
  }
})
