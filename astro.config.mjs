import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import solidJs from "@astrojs/solid-js";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import sitemap from "@astrojs/sitemap";
import { SITE } from "./src/config";
import prefetch from "@astrojs/prefetch";
import compress from "astro-compress";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  experimental: {
    assets: true,
  },
  site: SITE.website,
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap(),
    solidJs(),
    prefetch({
      selector: "a",
    }),
    compress(),
    mdx(),
  ],
  markdown: {
    remarkPlugins: [
      remarkToc,
      [
        remarkCollapse,
        {
          test: "Table of contents",
        },
      ],
    ],
    shikiConfig: {
      theme: "one-dark-pro",
      wrap: true,
    },
    extendDefaultPlugins: true,
  },
  compressHTML: true,
  vite: {
    optimizeDeps: {
      exclude: ["@resvg/resvg-js", "fsevents"],
    },
  },
});
