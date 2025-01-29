import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: 'blog/*.md',
      schema: z.object({
        title: z.string().max(60).min(10),
        description: z.string().max(160).min(110).optional(),
        draft: z.boolean().default(false),
        tag: z.string(),
        date: z.string(),
        isPinned: z.boolean().default(false),
      })
    })
  }
})
