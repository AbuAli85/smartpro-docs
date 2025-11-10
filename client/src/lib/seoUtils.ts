/**
 * SEO Utilities for managing meta tags and Open Graph
 */

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  author?: string;
  publishedDate?: string;
  modifiedDate?: string;
}

/**
 * Set meta tags for SEO
 */
export function setSEOTags(config: SEOConfig) {
  // Set title
  document.title = config.title;
  setMetaTag('og:title', config.title);
  setMetaTag('twitter:title', config.title);

  // Set description
  setMetaTag('description', config.description);
  setMetaTag('og:description', config.description);
  setMetaTag('twitter:description', config.description);

  // Set keywords
  if (config.keywords) {
    setMetaTag('keywords', config.keywords);
  }

  // Set image
  if (config.image) {
    setMetaTag('og:image', config.image);
    setMetaTag('twitter:image', config.image);
  }

  // Set URL
  if (config.url) {
    setMetaTag('og:url', config.url);
    setMetaTag('canonical', config.url);
  }

  // Set type
  if (config.type) {
    setMetaTag('og:type', config.type);
  }

  // Set Twitter card
  setMetaTag('twitter:card', 'summary_large_image');

  // Set article metadata
  if (config.type === 'article') {
    if (config.author) {
      setMetaTag('article:author', config.author);
    }
    if (config.publishedDate) {
      setMetaTag('article:published_time', config.publishedDate);
    }
    if (config.modifiedDate) {
      setMetaTag('article:modified_time', config.modifiedDate);
    }
  }
}

/**
 * Set or update a meta tag
 */
function setMetaTag(name: string, content: string) {
  let element = document.querySelector(`meta[name="${name}"]`) ||
                document.querySelector(`meta[property="${name}"]`);

  if (!element) {
    element = document.createElement('meta');
    if (name.startsWith('og:') || name.startsWith('article:')) {
      element.setAttribute('property', name);
    } else if (name === 'canonical') {
      element = document.createElement('link');
      element.setAttribute('rel', 'canonical');
      element.setAttribute('href', content);
      document.head.appendChild(element);
      return;
    } else {
      element.setAttribute('name', name);
    }
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
}

/**
 * Generate structured data (Schema.org JSON-LD)
 */
export function generateStructuredData(type: string, data: Record<string, any>) {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  });
  document.head.appendChild(script);
}

/**
 * Organization schema
 */
export const organizationSchema = {
  '@type': 'Organization',
  name: 'TheSmartPro.io',
  url: 'https://thesmartpro.io',
  logo: 'https://thesmartpro.io/logo.png',
  description: 'Enterprise-grade professional services marketplace connecting verified providers with organizations',
  sameAs: [
    'https://twitter.com/thesmartpro',
    'https://linkedin.com/company/thesmartpro',
    'https://facebook.com/thesmartpro',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Support',
    email: 'support@thesmartpro.io',
    url: 'https://thesmartpro.io/contact',
  },
};

/**
 * Product schema for marketplace
 */
export function generateProductSchema(product: {
  name: string;
  description: string;
  price: string;
  currency: string;
  rating?: number;
  reviewCount?: number;
  image?: string;
}) {
  return {
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image || 'https://thesmartpro.io/product.png',
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: product.currency,
      availability: 'https://schema.org/InStock',
    },
    ...(product.rating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: product.rating,
        reviewCount: product.reviewCount || 1,
      },
    }),
  };
}

/**
 * Article schema for blog posts
 */
export function generateArticleSchema(article: {
  headline: string;
  description: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  authorUrl?: string;
}) {
  return {
    '@type': 'NewsArticle',
    headline: article.headline,
    description: article.description,
    image: article.image || 'https://thesmartpro.io/article.png',
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      '@type': 'Person',
      name: article.author,
      ...(article.authorUrl && { url: article.authorUrl }),
    },
  };
}

/**
 * Breadcrumb schema
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
