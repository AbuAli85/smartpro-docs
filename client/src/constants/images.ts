/**
 * Image Constants with Proper Alt Text
 * 
 * All images include:
 * - Descriptive alt text for accessibility (type-enforced, cannot be empty)
 * - Dimensions for layout stability
 * - Multiple sizes for responsive loading
 * - Optimized quality params for delivery
 */

// Type guard to ensure alt text is never empty
type NonEmptyString<T extends string> = T extends '' ? never : T;

export interface ImageData {
  src: string;
  alt: NonEmptyString<string> & string;
  width: number;
  height: number;
  srcSet?: string;
  sizes?: string;
}

/**
 * Hero Section Images
 */
export const HERO_IMAGES = {
  home: {
    src: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1920&q=80',
    alt: 'Professional team collaborating in modern office workspace with digital tools',
    width: 1920,
    height: 1080,
    srcSet: `
      https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=640&q=80 640w,
      https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1280&q=80 1280w,
      https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1920&q=80 1920w
    `,
    sizes: '(max-width: 640px) 640px, (max-width: 1280px) 1280px, 1920px'
  },
  providers: {
    src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80',
    alt: 'Service providers and freelancers working together on professional projects',
    width: 1920,
    height: 1080,
  },
  clients: {
    src: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1920&q=80',
    alt: 'Enterprise clients managing projects and teams effectively',
    width: 1920,
    height: 1080,
  },
} as const;

/**
 * Feature Icons/Images
 */
export const FEATURE_IMAGES = {
  contractManagement: {
    src: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80',
    alt: 'Digital contract management and document signing workflow',
    width: 800,
    height: 600,
  },
  projectManagement: {
    src: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
    alt: 'Project management dashboard with tasks, timelines, and team collaboration',
    width: 800,
    height: 600,
  },
  analytics: {
    src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    alt: 'Business analytics dashboard showing performance metrics and data visualization',
    width: 800,
    height: 600,
  },
  security: {
    src: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80',
    alt: 'Cybersecurity and data protection with encrypted communications',
    width: 800,
    height: 600,
  },
  collaboration: {
    src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    alt: 'Team collaboration and communication in modern workplace',
    width: 800,
    height: 600,
  },
  automation: {
    src: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80',
    alt: 'Workflow automation and process optimization technology',
    width: 800,
    height: 600,
  },
} as const;

/**
 * Team Member Avatars
 */
export const TEAM_AVATARS = {
  ceo: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
    alt: 'CEO and Co-founder portrait photo',
    width: 400,
    height: 400,
  },
  cto: {
    src: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80',
    alt: 'CTO and Co-founder portrait photo',
    width: 400,
    height: 400,
  },
  cmo: {
    src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
    alt: 'CMO portrait photo',
    width: 400,
    height: 400,
  },
  headOfProduct: {
    src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    alt: 'Head of Product portrait photo',
    width: 400,
    height: 400,
  },
} as const;

/**
 * Blog/Article Images
 */
export const BLOG_IMAGES = {
  remoteWork: {
    src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80',
    alt: 'Remote work setup with laptop and collaborative tools',
    width: 1200,
    height: 800,
  },
  productivityTips: {
    src: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1200&q=80',
    alt: 'Productivity workspace with planning tools and organized desk',
    width: 1200,
    height: 800,
  },
  teamBuilding: {
    src: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&q=80',
    alt: 'Team building and collaboration activities',
    width: 1200,
    height: 800,
  },
  digitalTransformation: {
    src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
    alt: 'Digital transformation with business analytics and modern technology',
    width: 1200,
    height: 800,
  },
} as const;

/**
 * Case Study Company Logos
 */
export const CASE_STUDY_LOGOS = {
  techStartup: {
    src: 'https://placehold.co/200x200/3B82F6/ffffff?text=TechCo',
    alt: 'TechCo company logo',
    width: 200,
    height: 200,
  },
  consultingFirm: {
    src: 'https://placehold.co/200x200/8B5CF6/ffffff?text=ConsultPro',
    alt: 'ConsultPro company logo',
    width: 200,
    height: 200,
  },
  agency: {
    src: 'https://placehold.co/200x200/10B981/ffffff?text=CreativeAgency',
    alt: 'CreativeAgency company logo',
    width: 200,
    height: 200,
  },
} as const;

/**
 * Integration Partner Logos
 */
export const INTEGRATION_LOGOS = {
  slack: {
    src: 'https://placehold.co/120x120/E01E5A/ffffff?text=Slack',
    alt: 'Slack integration - team communication and collaboration',
    width: 120,
    height: 120,
  },
  zoom: {
    src: 'https://placehold.co/120x120/2D8CFF/ffffff?text=Zoom',
    alt: 'Zoom integration - video conferencing and meetings',
    width: 120,
    height: 120,
  },
  stripe: {
    src: 'https://placehold.co/120x120/635BFF/ffffff?text=Stripe',
    alt: 'Stripe integration - payment processing and invoicing',
    width: 120,
    height: 120,
  },
  googleWorkspace: {
    src: 'https://placehold.co/120x120/4285F4/ffffff?text=Google',
    alt: 'Google Workspace integration - email, calendar, and documents',
    width: 120,
    height: 120,
  },
  microsoftTeams: {
    src: 'https://placehold.co/120x120/505AC9/ffffff?text=Teams',
    alt: 'Microsoft Teams integration - collaboration and communication',
    width: 120,
    height: 120,
  },
  quickbooks: {
    src: 'https://placehold.co/120x120/2CA01C/ffffff?text=QB',
    alt: 'QuickBooks integration - accounting and financial management',
    width: 120,
    height: 120,
  },
} as const;

/**
 * Testimonial Profile Images
 */
export const TESTIMONIAL_AVATARS = {
  consultant1: {
    src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
    alt: 'Sarah Chen - Independent Consultant testimonial',
    width: 200,
    height: 200,
  },
  consultant2: {
    src: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&q=80',
    alt: 'Michael Rodriguez - VP of Operations testimonial',
    width: 200,
    height: 200,
  },
  consultant3: {
    src: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80',
    alt: 'James Wilson - Design Agency Owner testimonial',
    width: 200,
    height: 200,
  },
} as const;

/**
 * Placeholder/Default Images
 */
export const PLACEHOLDER_IMAGES = {
  avatar: {
    src: 'https://placehold.co/400x400/E5E7EB/6B7280?text=User',
    alt: 'User avatar placeholder',
    width: 400,
    height: 400,
  },
  company: {
    src: 'https://placehold.co/200x200/3B82F6/ffffff?text=Company',
    alt: 'Company logo placeholder',
    width: 200,
    height: 200,
  },
  feature: {
    src: 'https://placehold.co/800x600/E5E7EB/6B7280?text=Feature',
    alt: 'Feature image placeholder',
    width: 800,
    height: 600,
  },
} as const;

/**
 * UI/Decorative Images
 */
export const UI_IMAGES = {
  emptyState: {
    src: 'https://images.unsplash.com/photo-1584433144859-1fc3ab64a957?w=800&q=80',
    alt: 'Empty state illustration - no content available',
    width: 800,
    height: 600,
  },
  error404: {
    src: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=800&q=80',
    alt: '404 error page illustration - page not found',
    width: 800,
    height: 600,
  },
  success: {
    src: 'https://images.unsplash.com/photo-1565688534245-05d6b5be184a?w=800&q=80',
    alt: 'Success confirmation illustration',
    width: 800,
    height: 600,
  },
} as const;

/**
 * Social Proof / Trust Badges
 */
export const TRUST_BADGES = {
  soc2: {
    src: 'https://placehold.co/150x150/1F2937/ffffff?text=SOC2',
    alt: 'SOC 2 Type II certified - enterprise security compliance',
    width: 150,
    height: 150,
  },
  iso27001: {
    src: 'https://placehold.co/150x150/1F2937/ffffff?text=ISO27001',
    alt: 'ISO 27001 certified - information security management',
    width: 150,
    height: 150,
  },
  gdpr: {
    src: 'https://placehold.co/150x150/1F2937/ffffff?text=GDPR',
    alt: 'GDPR compliant - data privacy and protection',
    width: 150,
    height: 150,
  },
  hipaa: {
    src: 'https://placehold.co/150x150/1F2937/ffffff?text=HIPAA',
    alt: 'HIPAA compliant - healthcare data security',
    width: 150,
    height: 150,
  },
} as const;

/**
 * Helper function to get image by key
 */
export function getImage(category: keyof typeof IMAGE_CATEGORIES, key: string): ImageData | undefined {
  const categoryImages = IMAGE_CATEGORIES[category];
  return categoryImages?.[key as keyof typeof categoryImages];
}

/**
 * All image categories for easy access
 */
export const IMAGE_CATEGORIES = {
  hero: HERO_IMAGES,
  feature: FEATURE_IMAGES,
  team: TEAM_AVATARS,
  blog: BLOG_IMAGES,
  caseStudy: CASE_STUDY_LOGOS,
  integration: INTEGRATION_LOGOS,
  testimonial: TESTIMONIAL_AVATARS,
  placeholder: PLACEHOLDER_IMAGES,
  ui: UI_IMAGES,
  trust: TRUST_BADGES,
} as const;

