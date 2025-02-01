<script setup lang="ts">
useHead({
  bodyAttrs: {
    class: 'bg-jp-white text-jp-dark-primary dark:bg-jp-dark-primary dark:text-jp-white font-mono transition-colors duration-300 ease-in-out'
  }
})
useSeoMeta({
  title: '霞る (Kaneru) Zen - Where Code Meets Kernel',
  description: 'A kernel of wisdom in the digital realm. Where elegant code meets system-level thinking, inspired by Unix philosophy and the art of minimal, purposeful programming.'
})

const noiseEnabled = ref(true)
</script>
<template>
  <Noise v-if="noiseEnabled" />
  <Main v-model:noiseEnabled="noiseEnabled">
    <NuxtPage />
  </Main>
</template>
<style>
@font-face {
  font-family: 'Tsunagi';
  src: url('/fonts/TsunagiGothic.ttf') format('truetype');
  font-weight: 100 900;
  font-display: swap;
  font-style: normal;
}

@font-face {
  font-family: 'Humane';
  src: url('/fonts/Humane.ttf') format('truetype');
  font-weight: normal;
  font-display: swap;
  font-style: normal;
}

@font-face {
  font-family: 'GeistMono';
  src: url('/fonts/GeistMono.ttf') format('truetype');
  font-weight: 100 900;
  font-display: swap;
  font-style: normal;
}
</style>
