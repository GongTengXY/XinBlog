import { DefaultTheme } from "vitepress";
import VueItems from "./vue";
import ReactItems from "./react";
import JavaScript from "./javascript";
import ComNetwork from "./comNetwork";

export const defaultNav: DefaultTheme.NavItem[] = [
  { text: "首页", link: "/" },
  {
    text: "前端基础",
    items: [
      { text: "HTML5精简", link: "/HTML5、CSS3/HTML5" },
      { text: "CSS3精简", link: "/HTML5、CSS3/CSS3" },
    ],
  },
  {
    text: `JavaScript ${JavaScript.length}篇`,
    items: JavaScript,
  },
  {
    text: `Vuejs ${VueItems.length}篇`,
    items: VueItems,
  },
  {
    text: `Reactjs ${ReactItems.length}篇`,
    items: ReactItems,
  },
  {
    text: `计算机网络 ${ComNetwork.length}篇`,
    items: ComNetwork,
  },
  { text: "Examples", link: "/markdown-examples" },
];
