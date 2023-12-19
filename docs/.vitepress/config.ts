import { defineConfig } from "vitepress";
import { defaultSidebar } from "./defaultSidebar";
import { defaultNav } from "./defaultNav";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Blog",
  base: "/XinBlog/",
  description: "XIN—Blog",
  lastUpdated: true,
  themeConfig: {
    outline: [1, 3],
    nav: defaultNav,
    sidebar: defaultSidebar,
    footer: {
      copyright: "Copyright © 2023-present GongTengXY",
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/GongTengXY/XinBlog" },
    ],
  },
});
