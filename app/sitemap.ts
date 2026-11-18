import type { MetadataRoute } from 'next'
import { WEBSITE_URL } from '@/lib/constants'
import { getWorkPosts } from '@/lib/get-work'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: WEBSITE_URL },
    ...getWorkPosts().map((post) => ({ url: `${WEBSITE_URL}${post.link}` })),
  ]
}
