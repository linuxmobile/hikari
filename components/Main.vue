<template>
  <main class="h-full md:max-w-4xl mx-auto border-1 border-gray-800 relative">
    <Header />
    <ThemeControls :noiseEnabled="noiseEnabled"
      @update:noiseEnabled="(value: boolean) => emit('update:noiseEnabled', value)" />
    <slot />
    <Footer />
  </main>
</template>
<script setup lang="ts">
defineProps<{
  noiseEnabled: boolean
}>()

const emit = defineEmits<{
  'update:noiseEnabled': [boolean]
}>()
</script>
