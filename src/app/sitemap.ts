import { MetadataRoute } from 'next';
import { locationSeoData } from '@/data/locationSeoData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.futurredge.com';

  const coreRoutes = [
    { url: '', priority: 1.0, changeFrequency: 'weekly' },
    { url: '/services', priority: 0.9, changeFrequency: 'weekly' },
    { url: '/portfolio', priority: 0.9, changeFrequency: 'monthly' },
    { url: '/about', priority: 0.8, changeFrequency: 'monthly' },
    { url: '/contact', priority: 0.8, changeFrequency: 'monthly' },
    { url: '/subsidiaries', priority: 0.7, changeFrequency: 'monthly' },
    { url: '/terms', priority: 0.3, changeFrequency: 'yearly' },
    { url: '/privacy', priority: 0.3, changeFrequency: 'yearly' },
  ];

  // High-demand keyword optimized service routes
  const serviceRoutes = [
    '/services/website-development',
    '/services/mobile-app-development',
    '/services/ai-automation',
    '/services/crm-business-systems',
    '/services/lms',
    '/services/e-commerce',
    '/services/growth-marketing',
  ];

  const sitemapEntries: MetadataRoute.Sitemap = coreRoutes.map((route) => ({
    url: `${baseUrl}${route.url}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency as "weekly" | "monthly" | "yearly" | "always" | "hourly" | "daily" | "never",
    priority: route.priority,
  }));

  const serviceEntries: MetadataRoute.Sitemap = serviceRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly', // Services often updated with new case studies or features
    priority: 0.85, // High priority for keyword-rich service pages
  }));

  const locationEntries: MetadataRoute.Sitemap = locationSeoData.map((data) => ({
    url: `${baseUrl}/${data.slug}/website-development`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.85, // High priority for local SEO
  }));

  return [...sitemapEntries, ...serviceEntries, ...locationEntries];
}
