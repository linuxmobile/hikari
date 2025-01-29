<template>
  <header class="w-full bg-gray-800 p-1">
    <nav class="text-xs px-1 flex items-center justify-between">
      <NuxtLink to="/" class="!text-jp-white">{{ currentUrl }}</NuxtLink>
      <NuxtLink to="/" class="!text-jp-white">v0.1.2</NuxtLink>
    </nav>
  </header>
</template>

<script setup lang="ts">
const route = useRoute()
const reqURL = useRequestURL()

const currentUrl = computed(() => {
  return reqURL.origin + route.fullPath
})
</script>
