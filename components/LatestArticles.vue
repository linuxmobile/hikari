<script setup lang="ts">
import { useFormatTime } from '~/composables/useFormatTime'

const { data: latestArticles } = await useAsyncData('latestArticles', () =>
  queryCollection('blog')
    .order('date', 'DESC')
    .limit(6)
    .all()
)

const { data: totalArticles } = await useAsyncData('totalArticles', () =>
  queryCollection('blog')
    .order('date', 'DESC')
    .all()
)

const getArticleNumber = (index: number): string => {
  const total = totalArticles.value?.length || 0
  const articleNumber = total - index
  return String(articleNumber).padStart(1, '0')
}


const { formatTimeAgo } = useFormatTime()
</script>
<template>
  <section class="w-full flex flex-col gap-y-2">
    <div class="flex items-center justify-center w-full gap-x-12 pb-12">
      <div class="relative bg-jp-blue dark:bg-jp-purple px-2 py-1 whitespace-nowrap">
        <p class="font-jp text-2xl text-jp-white dark:text-jp-purple mix-blend-difference absolute bottom-5 left-0">
          最新の記事</p>
        <h3 class="font-bold text-jp-white dark:text-jp-dark-primary">Latest</h3>
      </div>
      <div class="flex-1 bg-jp-dark-secondary dark:bg-jp-dark-secondary h-0.3"></div>
    </div>
    <article v-for="(article, index) in latestArticles" :key="article.path" class="text-sm">
      <NuxtLink :to="article.path" class="flex items-start justify-start gap-x-3 w-full">
        <p class="text-gray-300 dark:text-gray-700">#0<span class="text-jp-blue dark:text-jp-purple">{{
          getArticleNumber(index) }}</span>
        </p>
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between w-full">
          <h2 class="truncate max-w-lg">{{ article.title }}</h2>
          <p class="text-sm">{{ formatTimeAgo(new Date(article.date)) }}</p>
        </div>
      </NuxtLink>
    </article>
    <!-- <NuxtLink to="/blog" class="">más artículos</NuxtLink> -->
  </section>
</template>
