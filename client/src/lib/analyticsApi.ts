/**
 * Analytics API Integration Layer
 * Fetches real-time platform metrics from SmartPRO backend
 */

export interface PlatformMetrics {
  activeUsers: number;
  servicesBooked: number;
  transactionsProcessed: number;
  averageResponseTime: number;
  satisfactionRate: number;
  providersVerified: number;
}

export interface CaseStudy {
  id: string;
  title: string;
  company: string;
  industry: string;
  challenge: string;
  solution: string;
  results: {
    metric: string;
    value: string;
    improvement: string;
  }[];
  testimonial: string;
  author: string;
  authorRole: string;
  imageUrl: string;
}

const API_BASE_URL = import.meta.env.VITE_FRONTEND_FORGE_API_URL || 'https://api.thesmartpro.io';

/**
 * Fetch real-time platform metrics
 */
export async function fetchPlatformMetrics(): Promise<PlatformMetrics> {
  try {
    const response = await fetch(`${API_BASE_URL}/analytics/metrics`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_FRONTEND_FORGE_API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch metrics: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching platform metrics:', error);
    // Return mock data as fallback
    return getMockMetrics();
  }
}

/**
 * Fetch case studies from backend
 */
export async function fetchCaseStudies(): Promise<CaseStudy[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/case-studies`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_FRONTEND_FORGE_API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch case studies: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching case studies:', error);
    // Return mock data as fallback
    return getMockCaseStudies();
  }
}

/**
 * Fetch single case study by ID
 */
export async function fetchCaseStudyById(id: string): Promise<CaseStudy | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/case-studies/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_FRONTEND_FORGE_API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch case study: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching case study:', error);
    return null;
  }
}

/**
 * Mock data for fallback when API is unavailable
 */
function getMockMetrics(): PlatformMetrics {
  return {
    activeUsers: 10234,
    servicesBooked: 1847,
    transactionsProcessed: 50000000,
    averageResponseTime: 2.3,
    satisfactionRate: 98,
    providersVerified: 10234,
  };
}

function getMockCaseStudies(): CaseStudy[] {
  return [
    {
      id: 'case-1',
      title: 'Enterprise Consulting Firm Scales Operations',
      company: 'Global Consulting Partners',
      industry: 'Management Consulting',
      challenge: 'Managing contracts and payments across 50+ service providers was manual and error-prone',
      solution: 'Implemented SmartPRO for contract management, automated invoicing, and secure payments',
      results: [
        { metric: 'Time Saved', value: '40 hours/week', improvement: '-80%' },
        { metric: 'Error Rate', value: '0.1%', improvement: '-99%' },
        { metric: 'Provider Satisfaction', value: '96%', improvement: '+35%' },
      ],
      testimonial: 'SmartPRO transformed how we manage our service provider network. The automated workflows alone have saved us thousands in administrative costs.',
      author: 'Sarah Johnson',
      authorRole: 'VP of Operations',
      imageUrl: '/images/case-study-1.jpg',
    },
    {
      id: 'case-2',
      title: 'Tech Startup Accelerates Growth',
      company: 'TechVenture Inc',
      industry: 'Software Development',
      challenge: 'Needed to quickly scale team with contractors while maintaining compliance and quality',
      solution: 'Used SmartPRO marketplace to find verified developers and manage contracts seamlessly',
      results: [
        { metric: 'Time to Hire', value: '3 days', improvement: '-85%' },
        { metric: 'Project Delivery', value: '15% faster', improvement: '+15%' },
        { metric: 'Cost Savings', value: '$120K/year', improvement: '-30%' },
      ],
      testimonial: 'Finding and managing quality contractors has never been easier. SmartPRO is now central to our growth strategy.',
      author: 'Michael Chen',
      authorRole: 'CEO',
      imageUrl: '/images/case-study-2.jpg',
    },
    {
      id: 'case-3',
      title: 'Professional Services Agency Improves Margins',
      company: 'Design & Strategy Co',
      industry: 'Creative Services',
      challenge: 'High overhead costs and complex billing processes were eating into profit margins',
      solution: 'Streamlined operations with SmartPRO automation and transparent pricing model',
      results: [
        { metric: 'Profit Margin', value: '42%', improvement: '+18%' },
        { metric: 'Admin Overhead', value: '-35%', improvement: '-35%' },
        { metric: 'Client Retention', value: '94%', improvement: '+22%' },
      ],
      testimonial: 'The efficiency gains have been remarkable. We can now focus on delivering great work instead of managing logistics.',
      author: 'Jennifer Martinez',
      authorRole: 'Founder',
      imageUrl: '/images/case-study-3.jpg',
    },
  ];
}
