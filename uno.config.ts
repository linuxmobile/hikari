import { defineConfig, presetTypography, presetWind } from "unocss";

export default defineConfig({
  presets: [
    presetWind(),
    presetTypography(
      {
        selectorName: "prose",
        cssExtend: {
          "h1, h2, h3, h4": {
            "font-weight": "700",
          },
          "h1, h2": {
            "font-size": "2em",
          },
          "h3": {
            "font-size": "1.5em",
          },
          "h4": {
            "font-size": "1.25em",
          },
          "h1 a, h2 a, h3 a, h4 a": {
            "text-decoration": "none",
            color: "#212475 !important",
            "font-weight": "700"
          },
          ".dark h1 a, .dark h2 a, .dark h3 a, .dark h4 a": {
            color: "#9691D4 !important"
          },
          "h1 > a::before, h2 > a::before": {
            content: "'#'",
            color: "#374151",
            "line-height": "1.5",
            "margin-right": "0.25em",
          },
          ".dark h1 > a::before, .dark h2 > a::before": {
            color: "#374151"
          },
          "p, ul, ol, dl, a": {
            color: "#374151"
          },
          ".dark p, .dark ul, .dark ol, .dark dl, .dark a": {
            color: "#d1d5db"
          },
          "strong": {
            "background-color": "#374151",
            color: "#fff",
            "font-weight": "700",
            padding: "0 3px",
          },
          ".dark strong": {
            "background-color": "#d1d5db",
            color: "#090b0e"
          }
        }
      }
    ),
  ],
  theme: {
    fontFamily: {
      mono: 'GeistMono',
      jp: 'Tsunagi',
      alt: 'Humane'
    },
    colors: {
      'jp-red-deep': '#b3131a',
      'jp-red-bright': '#ff2229',
      'jp-blue': '#212475',
      'jp-purple': '#9691D4',
      'jp-dark-primary': '#090b0e',
      'jp-dark-secondary': '#1d1b1c',
      'jp-white': '#ffffff',
      'jp-cream': '#dfd6af'
    }
  }
})
