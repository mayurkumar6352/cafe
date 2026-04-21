import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://brewhaus.coffee'
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/profile', '/orders', '/checkout'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
