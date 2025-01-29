<script setup lang="ts">
useHead({
  bodyAttrs: {
    class: 'bg-jp-white text-jp-dark-primary dark:bg-jp-dark-primary dark:text-jp-white font-mono transition-colors duration-300 ease-in-out'
  }
})
useSeoMeta({
  title: 'LinuDev - Un blog sobre programación para novatos',
  description: 'Un blog sobre programación para novatos, javascript, react, rust, nix, y linux'
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
  font-weight: normal;
  font-display: swap;
  font-style: normal;
}

@font-face {
  font-family: 'Humane';
  src: url('/fonts/Humane.ttf') format('truetype');
  font-weight: 200 900;
  font-display: swap;
  font-style: normal;
}

@font-face {
  font-family: 'GeistMono';
  src: url('/fonts/GeistMono.ttf') format('truetype');
  font-weight: 200 900;
  font-display: swap;
  font-style: normal;
}
</style>
