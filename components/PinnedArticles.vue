<script setup lang="ts">
const { data: pinnedArticles } = await useAsyncData('pinnedArticles', () =>
  queryCollection('blog')
    .where('isPinned', '=', 1)
    .all()
)

const { formatTimeAgo } = useFormatTime()
</script>

<template>
  <section class="">
    <h3 class="">Pinned Articles</h3>
    <article v-for="article in pinnedArticles" :key="article.path" class="">
      <NuxtLink :to="article.path" class="">
        <h2 class="">{{ article.title }}</h2>
        <p class="">{{ article.description }}</p>
        <p class="">{{ formatTimeAgo(new Date(article.date)) }}</p>
      </NuxtLink>
    </article>
  </section>
</template>
