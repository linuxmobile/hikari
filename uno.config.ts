import { defineConfig, presetTypography, presetWind } from "unocss";

export default defineConfig({
  presets: [
    presetWind(),
    presetTypography(),
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
