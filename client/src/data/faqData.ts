export interface FAQQuestion {
  question: string;
  answer: string;
}

export interface FAQCategory {
  category: string;
  questions: FAQQuestion[];
}

export const faqCategories: FAQCategory[] = [
  {
    category: "General",
    questions: [
      {
        question: "What is TheSmartPro.io?",
        answer:
          "TheSmartPro.io is an all-in-one enterprise business management platform that consolidates Employee Management, CRM, Project Management, E-Learning, and Contract Management into a single, unified solution. We help businesses streamline operations, reduce costs, and scale efficiently.",
      },
      {
        question: "Who is TheSmartPro.io for?",
        answer:
          "TheSmartPro.io is designed for businesses of all sizes - from startups to enterprise organizations. Our platform is particularly valuable for service-based businesses, consulting firms, agencies, and any organization that needs to manage employees, clients, projects, and contracts in one place.",
      },
      {
        question: "How is TheSmartPro.io different from competitors?",
        answer:
          "Unlike competitors that focus on single functions, TheSmartPro.io provides 5 critical business functions in one platform. This eliminates the need for multiple subscriptions, reduces integration complexity, and provides a unified view of your entire business. We also offer superior customer support and a more intuitive user experience.",
      },
      {
        question: "Where is TheSmartPro.io based?",
        answer:
          "TheSmartPro.io is based in Muscat, Oman, and serves businesses across the Middle East and globally. We have a strong presence in Oman with 10,000+ verified service providers and growing.",
      },
      {
        question: "What industries do you serve?",
        answer:
          "We serve a wide range of industries including professional services, consulting, IT services, healthcare, education, legal services, marketing agencies, and more. Our platform is flexible enough to adapt to any service-based business model.",
      },
      {
        question: "How many users are on the platform?",
        answer:
          "TheSmartPro.io has over 10,000 verified service providers and continues to grow. We process millions in transactions and serve hundreds of enterprise clients across various industries.",
      },
    ],
  },
  {
    category: "Pricing & Plans",
    questions: [
      {
        question: "How much does TheSmartPro.io cost?",
        answer:
          "We offer three pricing tiers: Starter ($99/month), Professional ($299/month), and Enterprise ($999/month). All plans include a 14-day free trial with no credit card required. Enterprise plans can be customized to your specific needs.",
      },
      {
        question: "Is there a free trial?",
        answer:
          "Yes! We offer a 14-day free trial on all plans. No credit card is required to start your trial. You can explore all features and decide which plan is right for you before committing.",
      },
      {
        question: "Can I change plans later?",
        answer:
          "Absolutely! You can upgrade or downgrade your plan at any time. When upgrading, you'll get immediate access to new features. When downgrading, changes take effect at the start of your next billing cycle.",
      },
      {
        question: "Do you offer discounts for annual billing?",
        answer:
          "Yes! We offer a 20% discount when you pay annually instead of monthly. For example, the Professional plan costs $299/month or $2,870/year (equivalent to $239/month).",
      },
      {
        question: "Are there any setup fees?",
        answer:
          "No, there are no setup fees for any of our plans. You only pay the monthly or annual subscription fee. Enterprise customers may have custom implementation services available at an additional cost.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit cards (Visa, Mastercard, American Express), bank transfers, and for enterprise customers, we can arrange invoicing with net payment terms.",
      },
      {
        question: "What happens if I exceed my plan limits?",
        answer:
          "If you exceed your plan limits (such as number of users or storage), we'll notify you and you can either upgrade your plan or purchase additional capacity. We never cut off service without warning.",
      },
    ],
  },
  {
    category: "Features & Functionality",
    questions: [
      {
        question: "What features are included?",
        answer:
          "TheSmartPro.io includes Employee Management, CRM, Project Management, E-Learning Platform, Contract Management, Workflow Automation, Analytics & Reporting, Mobile Apps, API Access, and much more. Check our Features page for a complete list.",
      },
      {
        question: "Can I customize the platform?",
        answer:
          "Yes! TheSmartPro.io is highly customizable. You can create custom fields, workflows, reports, and dashboards. Enterprise customers can also request custom features and integrations.",
      },
      {
        question: "Does it work on mobile devices?",
        answer:
          "Yes! TheSmartPro.io is fully responsive and works great on all devices. We also offer native iOS and Android apps for an optimized mobile experience.",
      },
      {
        question: "What integrations are available?",
        answer:
          "We integrate with popular tools including Slack, Microsoft Teams, Google Workspace, Zoom, Stripe, QuickBooks, and many more. We also provide a REST API for custom integrations.",
      },
    ],
  },
  {
    category: "Security & Compliance",
    questions: [
      {
        question: "Is my data secure?",
        answer:
          "Absolutely. We use enterprise-grade security including 256-bit SSL encryption, SOC 2 Type II certification, ISO 27001 compliance, and GDPR compliance. Your data is stored in secure, redundant data centers with regular backups.",
      },
      {
        question: "Where is my data stored?",
        answer:
          "Your data is stored in secure AWS data centers. Enterprise customers can choose their preferred data center region for compliance purposes.",
      },
      {
        question: "Do you comply with GDPR?",
        answer:
          "Yes, we are fully GDPR compliant. We provide data processing agreements, support data portability, and honor all data subject rights including the right to be forgotten.",
      },
      {
        question: "Can I export my data?",
        answer:
          "Yes! You can export all your data at any time in standard formats (CSV, JSON, Excel). There are no lock-in periods or export fees.",
      },
    ],
  },
  {
    category: "Getting Started",
    questions: [
      {
        question: "How long does it take to get started?",
        answer:
          "Most customers are up and running within 30 minutes. Our onboarding wizard guides you through account setup, team invitations, and initial configuration. For larger organizations, we offer white-glove onboarding support.",
      },
      {
        question: "Do you provide training?",
        answer:
          "Yes! We provide comprehensive training resources including video tutorials, documentation, webinars, and live training sessions. Enterprise customers receive dedicated onboarding and training support.",
      },
      {
        question: "Can you migrate data from my current system?",
        answer:
          "Yes! We offer data migration services to help you move from your existing tools. Our team can assist with data mapping, import, and validation to ensure a smooth transition.",
      },
      {
        question: "What if I need help?",
        answer:
          "We offer multiple support channels including email support, live chat, phone support (Professional and Enterprise), and a comprehensive knowledge base. Enterprise customers also get a dedicated account manager.",
      },
      {
        question: "How do I contact support?",
        answer:
          "You can reach our support team via email at chairman@falconeyegroup.com, phone at +968 9515 3930, or through the in-app live chat. Response times vary by plan: Starter (24-48 hours), Professional (2-4 hours), Enterprise (1 hour or less).",
      },
      {
        question: "Do you offer onboarding assistance?",
        answer:
          "Yes! All plans include access to our onboarding resources. Professional and Enterprise plans include dedicated onboarding assistance to help you get set up quickly and efficiently.",
      },
    ],
  },
  {
    category: "Technical",
    questions: [
      {
        question: "What is your uptime guarantee?",
        answer:
          "We guarantee 99.9% uptime with our SLA. Our infrastructure is built on AWS with redundancy and automatic failover to ensure maximum availability.",
      },
      {
        question: "Do you have an API?",
        answer:
          "Yes! We provide a comprehensive REST API that allows you to integrate TheSmartPro.io with your existing systems and build custom applications. API access is included in all plans.",
      },
      {
        question: "What browsers do you support?",
        answer:
          "TheSmartPro.io works on all modern browsers including Chrome, Firefox, Safari, and Edge. We recommend using the latest version of your preferred browser for the best experience.",
      },
      {
        question: "Can I use TheSmartPro.io offline?",
        answer:
          "Our mobile apps support limited offline functionality. You can view cached data and make changes that will sync when you reconnect to the internet.",
      },
    ],
  },
];

