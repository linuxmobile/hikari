<script setup lang="ts">
useHead({
  bodyAttrs: {
    class: 'bg-jp-white text-jp-dark-primary dark:bg-jp-dark-primary dark:text-jp-white font-mono transition-colors duration-300 ease-in-out'
  }
})
useSeoMeta({
  title: '光 (Hikari) Code - Chronicles of a Novice Programmer',
  description: 'Exploring web development through elegant code and practical wisdom. A personal journey into JavaScript, React, and Rust.'
})
</script>
<template>
  <Noise />
  <div>
    <NuxtRouteAnnouncer />
  </div>
  <NuxtPage />
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
