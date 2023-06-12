import { DefaultTheme } from 'vitepress'

export const defaultNav: DefaultTheme.NavItem[] = [
  { text: '首页', link: '/' },
  {
    text: '前端基础',
    items: [
      { text: 'HTML5精简', link: '/HTML5、CSS3/HTML5' },
      { text: 'CSS3精简', link: '/HTML5、CSS3/CSS3' },
    ],
  },
  {
    text: 'JavaScript',
    items: [{ text: 'Js基础', link: '/JavaScript/Js基础' }],
  },
  {
    text: 'Vue',
    items: [
      { text: 'Vue2响应式原理', link: '/Vue2/响应式原理' },
      { text: 'Vue3', link: '/Vue3/' },
    ],
  },
  {
    text: '计算机网络',
    items: [
      { text: 'HTTP历程', link: '/计算机网络/http' },
      { text: 'HTTPS详解', link: '/计算机网络/https' },
      { text: 'TCP协议精简', link: '/计算机网络/tcp' },
    ],
  },
  { text: 'Examples', link: '/markdown-examples' },
]
