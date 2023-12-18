import { DefaultTheme } from "vitepress";
import VueItems from "./vue";
import ReactItems from "./react";
import JavaScriptItems from "./javascript";
import ComNetwork from "./comNetwork";

export const defaultSidebar: DefaultTheme.SidebarGroup[] = [
  {
    text: "My Start",
    items: [{ text: "自我介绍", link: "/introduction" }],
  },
  {
    text: "HTML5、CSS3",
    collapsible: false,
    items: [
      { text: "HTML5精简", link: "/HTML5、CSS3/HTML5" },
      { text: "CSS3精简", link: "/HTML5、CSS3/CSS3" },
    ],
  },
  {
    text: "JavaScript",
    collapsible: false,
    items: JavaScriptItems,
  },
  {
    text: `Vuejs ${VueItems.length}篇`,
    collapsible: true,
    items: VueItems,
    collapsed: true,
  },
  {
    text: `Reactjs ${ReactItems.length}篇`,
    items: ReactItems,
    collapsible: true,
    collapsed: true,
  },
  {
    text: `计算机网络 ${ComNetwork.length}篇`,
    items: ComNetwork,
  },
  {
    text: "Examples",
    items: [
      { text: "Markdown Examples", link: "/markdown-examples" },
      { text: "Runtime API Examples", link: "/api-examples" },
    ],
  },
];
