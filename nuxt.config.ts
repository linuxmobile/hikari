// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: [
    "@unocss/nuxt",
    "@vueuse/nuxt",
    "@nuxtjs/sitemap",
    "@nuxt/content",
    "@nuxtjs/fontaine",
    "@nuxtjs/color-mode",
  ],
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
    },
  },
  css: ["@unocss/reset/tailwind.css"],
  content: {
    database: {
      type: "postgres",
      url: process.env.POSTGRES_URL,
    },
    build: {
      markdown: {
        toc: { depth: 2 },
        highlight: {
          langs: [
            "bash",
            "ts",
            "html",
            "css",
            "nix",
            "vue",
            "rust",
            "js",
            "tsx",
            "jsx",
            "zsh",
            "nushell",
            "md",
            "mdx",
          ],
          theme: {
            default: "kanagawa-lotus",
            dark: "kanagawa-wave",
          },
        },
      },
    },
  },
  colorMode: {
    preference: "system",
    classSuffix: "",
  },
  routeRules: {
    "/": { prerender: true },
    "/**": {
      headers: {
        'Cross-Origin-Embedder-Policy': 'require-corp',
        'Cross-Origin-Opener-Policy': 'same-origin',
      }
    }
  },
});
