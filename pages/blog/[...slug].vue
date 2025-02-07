<script setup lang="ts">
import { format } from 'date-fns'
const route = useRoute()

const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('blog').path(route.path).first()
})


const { data: allArticles } = await useAsyncData('allArticles', () =>
  queryCollection('blog')
    .order('date', 'DESC')
    .all()
)

const articleNumber = computed(() => {
  if (!allArticles.value || !page.value) return null

  const index = allArticles.value.findIndex(
    article => article.path === page.value?.path
  )

  if (index === -1) return null

  const number = allArticles.value.length - index
  return String(number).padStart(2, '0')
})

const formattedDate = computed(() => {
  if (!page.value?.date) return ''
  return format(new Date(page.value.date), "do MMM yyyy")
})
</script>
<template>
  <section class="flex items-center justify-start p-6 md:p-20 gap-x-8 border-b-1 border-gray-800">
    <div class="flex flex-col items-center justify-center border-1 border-jp-blue dark:border-jp-purple">
      <p class="!text-white bg-jp-blue dark:bg-jp-purple w-full p-2 text-center">品番</p>
      <p v-if="articleNumber" class="!text-gray-400 dark:text-gray-700 p-2">
        #0<span class="text-jp-blue dark:text-jp-purple">{{ articleNumber }}</span>
      </p>
    </div>
    <div class="flex flex-col items-start justify-center">
      <p class="!text-gray-400 dark:text-gray-700">{{ formattedDate }} /</p>
      <h1 class="font-semibold text-2xl text-jp-purple">{{ page?.title }}</h1>
    </div>
  </section>
  <TocRuler />
  <ContentRenderer v-if="page" :value="page"
    class="px-6 md:px-20 py-10 text-sm max-w-none prose flex flex-col gap-y-4" />
</template>
