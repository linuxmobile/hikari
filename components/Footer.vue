<template>
  <footer class="bg-gray-800 p-1 px-2 text-xs flex items-center justify-between">
    <div class="text-center text-gray-300">
      <span>{{ new Date().getFullYear() }}</span>
      <span> © Not really copyrighted, but we pretend it is.</span>
    </div>
    <div class="">
      <nav class="px-1 flex items-center justify-center gap-x-3">
        <NuxtLink to="https://github.com/linuxmobile/hikari" class="!text-jp-white">Github</NuxtLink>
        <NuxtLink to="https://twitter.com/LinuDev" class="!text-jp-white">Twitter</NuxtLink>
      </nav>
    </div>
  </footer>
</template>
