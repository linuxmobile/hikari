<script setup lang="ts">
import { useStorage } from '@vueuse/core'

const colorMode = useColorMode()
const toggleColorMode = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const showNoise = useStorage('showNoise', true)
const toggleNoise = () => {
  showNoise.value = !showNoise.value
}

const isPopupOpen = ref(false)
const togglePopup = () => {
  isPopupOpen.value = !isPopupOpen.value
}

watch(showNoise, (newValue) => {
  emit('update:noiseEnabled', newValue)
})

defineProps<{
  noiseEnabled: boolean
}>()

const emit = defineEmits<{
  'update:noiseEnabled': [boolean]
}>()
</script>

<template>
  <button @click="togglePopup"
    class="absolute top-8 right-2 bg-gray-800 p-3 size-7 flex items-center justify-center hover:bg-gray-700 transition-colors">
    <span class="text-white text-xs">?</span>
  </button>
  <div v-if="isPopupOpen"
    class="absolute top-8 right-11 flex items-center justify-center gap-x-2 text-white text-xs [&>button]:px-2">
    <button @click="toggleNoise" class="flex items-center justify-between w-full bg-gray-800 size-7">
      <span>Noise&nbsp;</span>
      <span>{{ showNoise ? 'on' : 'off' }}</span>
    </button>
    <button @click="toggleColorMode" class="flex items-center justify-between w-full bg-gray-800 size-7">
      <span class="whitespace-nowrap">Switch theme</span>
    </button>
  </div>
</template>
