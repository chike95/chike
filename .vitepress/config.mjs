import { defineConfig } from "vitepress";
import nav from "./nav";
import sidebar from "./sidebar";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "夜枫林的小酒馆",
  description: "A VitePress Site",
  srcDir: "docs",
  themeConfig: {
    logo: "/logo.jpg",
    outlineTitle: "目录",
    outline: [2, 4],
    // https://vitepress.dev/reference/default-theme-config
    nav,

    sidebar,

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
