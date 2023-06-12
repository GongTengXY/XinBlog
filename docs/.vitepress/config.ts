import { defineConfig } from 'vitepress'
import { defaultSidebar } from './defaultSidebar'
import { defaultNav } from './defaultNav'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Blog',
  description: 'XIN—Blog',
  lastUpdated: true,
  themeConfig: {
    nav: defaultNav,
    sidebar: defaultSidebar,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    ],
    footer: {
      copyright: 'Copyright © 2023-present XiaoXin',
    },
  },
})
