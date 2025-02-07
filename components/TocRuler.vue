<script setup lang="ts">
import { useWindowScroll, useWindowSize, useElementSize } from '@vueuse/core'

const { y: scrollY } = useWindowScroll()
const { height: windowHeight } = useWindowSize()
const { height: documentHeight } = useElementSize(document.body)
const route = useRoute()

const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('blog').path(route.path).first()
})

const headings = computed(() => {
  if (!page.value?.body?.toc?.links) return []

  return page.value.body.toc.links.flatMap(link => {
    const result = [link]
    if (link.children) {
      result.push(...link.children)
    }
    return result
  })
})

const scrollPercentage = computed(() => {
  const maxScroll = documentHeight.value - windowHeight.value
  return Math.min(100, Math.max(0, (scrollY.value / maxScroll) * 100))
})

const currentHeadingIndex = computed(() => {
  const currentPosition = (scrollPercentage.value / 100) * (headings.value.length - 1)
  return Math.floor(currentPosition)
})
</script><template>
  <div v-if="headings.length > 0"
    class="fixed left-8 top-1/2 -translate-y-1/2 h-60 flex flex-col items-center hidden md:flex">
    <div class="relative h-full">
      <NuxtLink v-for="(heading, index) in headings" :key="heading.id" :to="`#${heading.id}`"
        class="absolute transition-all duration-300 group left-0 hover:w-24" :class="{
          'w-16': heading.depth === 2 && index !== currentHeadingIndex,
          'w-6': heading.depth === 3 && index !== currentHeadingIndex,
          'w-24': index === currentHeadingIndex
        }" :style="`top: ${(index / (headings.length - 1)) * 100}%`">
        <div class="relative w-full group/line">
          <div class="absolute w-full h-3 -top-1.5 cursor-pointer">
            <div class="w-full h-0.5 mt-1.5" :class="{
              'bg-jp-purple opacity-100': index === currentHeadingIndex,
              'bg-gray-400 opacity-40 group-hover:opacity-100': index !== currentHeadingIndex
            }">
            </div>
            <span
              class="absolute left-full ml-2 text-xs opacity-0 group-hover/line:opacity-100 transition-opacity duration-200 whitespace-nowrap text-gray-500 top-1.5 -translate-y-1/2 pointer-events-none">
              {{ heading.id }}
            </span>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
