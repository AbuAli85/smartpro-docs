// Search index for all pages and content
export interface SearchResult {
  id: string;
  title: string;
  description: string;
  url: string;
  category: string;
  keywords: string[];
}

export const searchIndex: SearchResult[] = [
  // Main Pages
  {
    id: "home",
    title: "Home",
    description: "The Professional Services Marketplace Built for Enterprise",
    url: "/",
    category: "Main",
    keywords: ["home", "marketplace", "professional services", "enterprise"]
  },
  {
    id: "features",
    title: "Features",
    description: "Powerful Features, Simple Interface - Everything you need to run your business",
    url: "/features",
    category: "Product",
    keywords: ["features", "project management", "crm", "automation", "analytics"]
  },
  {
    id: "pricing",
    title: "Pricing",
    description: "Transparent, flexible pricing plans for every business size",
    url: "/pricing",
    category: "Product",
    keywords: ["pricing", "plans", "starter", "professional", "enterprise", "cost"]
  },
  {
    id: "security",
    title: "Security",
    description: "Enterprise-Grade Security - SOC 2, ISO 27001, GDPR Compliant",
    url: "/security",
    category: "Product",
    keywords: ["security", "compliance", "gdpr", "soc2", "encryption", "data protection"]
  },
  {
    id: "how-it-works",
    title: "How It Works",
    description: "Simple, secure, and professional from start to finish",
    url: "/how-it-works",
    category: "Resources",
    keywords: ["how it works", "process", "workflow", "steps", "guide"]
  },
  {
    id: "comparison",
    title: "Comparison",
    description: "See how TheSmartPro.io compares to other platforms",
    url: "/comparison",
    category: "Resources",
    keywords: ["comparison", "vs", "alternatives", "competitors", "features"]
  },
  {
    id: "case-studies",
    title: "Case Studies",
    description: "Real Results from Real Customers - See how enterprises are transforming",
    url: "/case-studies",
    category: "Resources",
    keywords: ["case studies", "success stories", "roi", "results", "testimonials"]
  },
  {
    id: "blog",
    title: "Blog & Resources",
    description: "Insights, tips, and best practices for professional services providers",
    url: "/blog",
    category: "Resources",
    keywords: ["blog", "articles", "resources", "insights", "tips", "best practices"]
  },
  {
    id: "about",
    title: "About Us",
    description: "Learn about TheSmartPro.io mission, vision, and team",
    url: "/about",
    category: "Company",
    keywords: ["about", "company", "mission", "vision", "team", "culture"]
  },
  {
    id: "contact",
    title: "Contact Us",
    description: "Get in touch with our team - We're here to help",
    url: "/contact",
    category: "Company",
    keywords: ["contact", "support", "email", "phone", "help", "sales"]
  },

  // Provider Pages
  {
    id: "get-started-providers",
    title: "Start Earning as a Provider",
    description: "Join thousands of professionals growing their business on TheSmartPro",
    url: "/get-started-providers",
    category: "For Providers",
    keywords: ["providers", "earn", "income", "calculator", "onboarding", "verification"]
  },
  {
    id: "providers",
    title: "For Service Providers",
    description: "Grow Your Professional Services Business with enterprise-grade tools",
    url: "/providers",
    category: "For Providers",
    keywords: ["service providers", "professionals", "consultants", "agencies", "freelancers"]
  },

  // Client Pages
  {
    id: "clients",
    title: "For Organizations",
    description: "Access Verified Professionals with Enterprise Features",
    url: "/clients",
    category: "For Clients",
    keywords: ["clients", "organizations", "enterprises", "hiring", "professionals", "contractors"]
  },

  // Legal Pages
  {
    id: "privacy",
    title: "Privacy Policy",
    description: "How we collect, use, and protect your data",
    url: "/privacy",
    category: "Legal",
    keywords: ["privacy", "data protection", "gdpr", "policy", "terms"]
  },
  {
    id: "terms",
    title: "Terms of Service",
    description: "Terms and conditions for using TheSmartPro.io",
    url: "/terms",
    category: "Legal",
    keywords: ["terms", "service", "agreement", "conditions", "legal"]
  },
  {
    id: "cookies",
    title: "Cookie Policy",
    description: "Information about cookies and tracking technologies",
    url: "/cookies",
    category: "Legal",
    keywords: ["cookies", "tracking", "analytics", "policy", "consent"]
  },

  // ROI Calculator
  {
    id: "roi-calculator",
    title: "ROI Calculator",
    description: "Calculate your potential savings with TheSmartPro.io",
    url: "/roi-calculator",
    category: "Tools",
    keywords: ["roi", "calculator", "savings", "cost reduction", "investment"]
  }
];

export function searchPages(query: string): SearchResult[] {
  if (!query.trim()) return [];

  const lowerQuery = query.toLowerCase();
  
  return searchIndex
    .filter(item => {
      const titleMatch = item.title.toLowerCase().includes(lowerQuery);
      const descriptionMatch = item.description.toLowerCase().includes(lowerQuery);
      const keywordMatch = item.keywords.some(keyword => 
        keyword.toLowerCase().includes(lowerQuery)
      );
      
      return titleMatch || descriptionMatch || keywordMatch;
    })
    .sort((a, b) => {
      // Prioritize title matches
      const aTitle = a.title.toLowerCase().includes(lowerQuery);
      const bTitle = b.title.toLowerCase().includes(lowerQuery);
      
      if (aTitle && !bTitle) return -1;
      if (!aTitle && bTitle) return 1;
      
      return a.title.localeCompare(b.title);
    });
}

export function getRecentSearches(): string[] {
  const stored = localStorage.getItem('recentSearches');
  return stored ? JSON.parse(stored) : [];
}

export function addRecentSearch(query: string): void {
  const recent = getRecentSearches();
  const filtered = recent.filter(s => s !== query);
  const updated = [query, ...filtered].slice(0, 5);
  localStorage.setItem('recentSearches', JSON.stringify(updated));
}

export function clearRecentSearches(): void {
  localStorage.removeItem('recentSearches');
}
