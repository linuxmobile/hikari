<script setup lang="ts">
import { useFormatTime } from '~/composables/useFormatTime'

definePageMeta(
  {
    path: '/blog/:page(\\d+)?'
  }
)
const route = useRoute()
const page = ref(
  typeof route.params.page === 'string'
    ? parseInt(route.params.page)
    : 1
);
const limit = ref(6)

const articlesCount = await queryCollection('blog').count()

const latestArticles = await queryCollection('blog')
  .skip(limit.value * (page.value - 1))
  .limit(limit.value)
  .order('date', 'DESC')
  .all()

if(latestArticles.length ==0){
  throw createError({
    statusCode: 404,
    statusMessage: `No Blog Posts found for path: ${route.path}`
  })
}

const {formatTimeAgo} = useFormatTime()
</script>
<template>
  <main class="">
    <h2 class="">Artículos Recientes</h2>
    <section class="">
      <article v-for="article in latestArticles" :key="article.path" class="">
        <NuxtLink :to="article.path" class="">
          <h2 class="">{{ article.title }}</h2>
          <p class="">{{ article.description }}</p>
          <p class="">{{ formatTimeAgo(new Date(article.date)) }}</p>
        </NuxtLink>
      </article>
    </section>
  </main>
</template>
