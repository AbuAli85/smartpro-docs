/**
 * Schema.org Structured Data Utilities for SEO
 * Provides helpers to generate JSON-LD structured data for better search engine understanding
 */

export interface OrganizationSchema {
  name: string;
  description: string;
  url: string;
  logo?: string;
  contactPoint?: {
    telephone: string;
    contactType: string;
    email: string;
  };
  sameAs?: string[];
}

export interface ProductSchema {
  name: string;
  description: string;
  image?: string;
  offers?: {
    price: string;
    priceCurrency: string;
    availability: string;
  };
}

export interface BreadcrumbSchema {
  items: Array<{
    name: string;
    url?: string;
  }>;
}

export interface ArticleSchema {
  headline: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  url: string;
}

export interface FAQSchema {
  questions: Array<{
    question: string;
    answer: string;
  }>;
}

/**
 * Generates Organization structured data
 */
export function generateOrganizationSchema(data: OrganizationSchema): Record<string, any> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: data.name,
    description: data.description,
    url: data.url,
    logo: data.logo,
    contactPoint: data.contactPoint ? {
      "@type": "ContactPoint",
      telephone: data.contactPoint.telephone,
      contactType: data.contactPoint.contactType,
      email: data.contactPoint.email,
    } : undefined,
    sameAs: data.sameAs,
  };
}

/**
 * Generates Product/Service structured data
 */
export function generateProductSchema(data: ProductSchema): Record<string, any> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: data.name,
    description: data.description,
    image: data.image,
    offers: data.offers ? {
      "@type": "Offer",
      price: data.offers.price,
      priceCurrency: data.offers.priceCurrency,
      availability: data.offers.availability,
    } : undefined,
  };
}

/**
 * Generates BreadcrumbList structured data
 */
export function generateBreadcrumbSchema(data: BreadcrumbSchema): Record<string, any> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: data.items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generates Article structured data
 */
export function generateArticleSchema(data: ArticleSchema): Record<string, any> {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: data.headline,
    description: data.description,
    author: {
      "@type": "Person",
      name: data.author,
    },
    datePublished: data.datePublished,
    dateModified: data.dateModified || data.datePublished,
    image: data.image,
    url: data.url,
  };
}

/**
 * Generates FAQPage structured data
 */
export function generateFAQSchema(data: FAQSchema): Record<string, any> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };
}

/**
 * Generates SoftwareApplication structured data
 */
export function generateSoftwareSchema(data: {
  name: string;
  description: string;
  applicationCategory: string;
  operatingSystem?: string;
  offers?: {
    price: string;
    priceCurrency: string;
  };
}): Record<string, any> {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: data.name,
    description: data.description,
    applicationCategory: data.applicationCategory,
    operatingSystem: data.operatingSystem,
    offers: data.offers ? {
      "@type": "Offer",
      price: data.offers.price,
      priceCurrency: data.offers.priceCurrency,
    } : undefined,
  };
}

/**
 * Inserts structured data into the page head
 */
export function insertStructuredData(schema: Record<string, any>): void {
  // Remove existing schema if present
  const existingScript = document.querySelector('script[type="application/ld+json"]');
  if (existingScript) {
    existingScript.remove();
  }

  // Create and insert new schema
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

/**
 * Helper to insert multiple schemas
 */
export function insertMultipleSchemas(schemas: Record<string, any>[]): void {
  // Remove existing schemas
  const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
  existingScripts.forEach((script) => script.remove());

  // Insert all new schemas
  schemas.forEach((schema) => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  });
}

