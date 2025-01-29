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
  <Main>
    <section class="flex items-center justify-start p-6 md:p-20 gap-x-8 border-b-1 border-gray-800">
      <div class="flex flex-col items-center justify-center border-1 border-jp-blue dark:border-jp-purple">
        <p class="!text-white bg-jp-blue dark:bg-jp-purple w-full p-2 text-center">品番</p>
        <p v-if="articleNumber" class="!text-gray-400 dark:text-gray-700 p-2">
          #0<span class="text-jp-blue dark:text-jp-purple">{{ articleNumber }}</span>
        </p>
      </div>
      <div class="flex flex-col items-start justify-center">
        <p class="!text-gray-400 dark:text-gray-700">{{ formattedDate }} /</p>
        <h1 class="font-semibold text-2xl">{{ page?.title }}</h1>
      </div>
    </section>
    <ContentRenderer v-if="page" :value="page" class="px-6 md:px-20 py-10 text-sm prose-sm flex flex-col gap-y-4" />
    </ Main>
</template>
<style scoped>
/* HEADERS */
:deep(h1),
:deep(h2),
:deep(h3),
:deep(h4) {
  font-weight: 700;
  margin: 1em 0;
}

:deep(h1),
:deep(h2) {
  font-size: 2em;
}

:deep(h3) {
  font-size: 1.5em;
}

:deep(h4) {
  font-size: 1.25em;
}

:deep(h1 a)::before,
:deep(h2 a)::before {
  content: '#';
  color: rgb(209 213 219);
  line-height: 1.5;
}

@media (prefers-color-scheme: dark) {

  :deep(h1 a)::before,
  :deep(h2 a)::before {
    content: '#';
    color: rgb(55 65 81);
  }
}

:deep(h1 a),
:deep(h2 a),
:deep(h3 a),
:deep(h4 a) {
  font-weight: 700;
  color: #212475;
}

@media (prefers-color-scheme: dark) {

  :deep(h1 a),
  :deep(h2 a),
  :deep(h3 a),
  :deep(h4 a) {
    color: #9691D4;
  }
}

/* PARAGRAPH */
:deep(p),
:deep(ul),
:deep(ol),
:deep(dl),
:deep(a) {
  color: #374151;
}

@media (prefers-color-scheme: dark) {

  :deep(p),
  :deep(ul),
  :deep(ol),
  :deep(dl),
  :deep(a) {
    color: #d1d5db;
  }
}

/* STRONG */
:deep(strong) {
  background-color: #374151;
  color: #fff;
  font-weight: 700;
  padding: 0 3px;
}

@media (prefers-color-scheme: dark) {
  :deep(strong) {
    background-color: #d1d5db;
    color: #090b0e;
  }
}

:deep(em) {
  color: #374151;
  font-style: italic;
}

@media (prefers-color-scheme: dark) {
  :deep(em) {
    color: #d1d5db;
  }
}

:deep(img) {
  border-radius: 0.5rem
}
</style>
