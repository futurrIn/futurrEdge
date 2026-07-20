import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  // Replace with the actual production URL
  const baseUrl = 'https://www.futurredge.com';

  const routes = [
    '',
    '/about',
    '/contact',
    '/portfolio',
    '/services',
    '/services/website-development',
    '/services/mobile-app-development',
    '/services/ai-automation',
    '/services/crm-business-systems',
    '/services/lms',
    '/services/e-commerce',
    '/services/growth-marketing',
    '/terms',
    '/privacy',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : route.startsWith('/services') ? 0.8 : 0.6,
  }));
}
