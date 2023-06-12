import { DefaultTheme } from 'vitepress'

export const defaultSidebar: DefaultTheme.SidebarGroup[] = [
  {
    text: 'My Start',
    items: [{ text: '自我介绍', link: '/introduction' }],
  },
  {
    text: 'HTML5、CSS3',
    collapsed: false,
    items: [
      { text: 'HTML5精简', link: '/HTML5、CSS3/HTML5' },
      { text: 'CSS3精简', link: '/HTML5、CSS3/CSS3' },
    ],
  },
  {
    text: 'JavaScript',
    collapsed: false,
    items: [{ text: 'JavaScript基础', link: '/JavaScript/Js基础' }],
  },
  {
    text: 'Vue',
    collapsed: false,
    items: [{ text: 'Vue2响应式原理', link: '/Vue2/响应式原理' }],
  },
  {
    text: 'React',
    items: [],
    collapsed: true,
  },
  {
    text: '计算机网络',
    items: [
      { text: 'HTTP历程', link: '/计算机网络/http' },
      { text: 'HTTPS详解', link: '/计算机网络/https' },
      { text: 'TCP协议精简', link: '/计算机网络/tcp' },
    ],
  },
  {
    text: 'Examples',
    items: [
      { text: 'Markdown Examples', link: '/markdown-examples' },
      { text: 'Runtime API Examples', link: '/api-examples' },
    ],
  },
]
