import { Link } from "wouter";
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Github } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Product",
      links: [
        { label: "Features", href: "/features" },
        { label: "Pricing", href: "/pricing" },
        { label: "Security", href: "/security" },
        { label: "Integrations", href: "/docs" }
      ]
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Blog", href: "/blog" },
        { label: "Careers", href: "/careers" },
        { label: "Contact", href: "/contact" }
      ]
    },
    {
      title: "Resources",
      links: [
        { label: "Documentation", href: "/docs" },
        { label: "API Reference", href: "/docs/architecture" },
        { label: "Help Center", href: "/help" },
        { label: "Community", href: "/community" }
      ]
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Cookie Policy", href: "/cookies" },
        { label: "Compliance", href: "/security" }
      ]
    }
  ];

  const socialLinks = [
    { icon: Twitter, href: "https://twitter.com/thesmartpro", label: "Twitter" },
    { icon: Linkedin, href: "https://linkedin.com/company/thesmartpro", label: "LinkedIn" },
    { icon: Github, href: "https://github.com/thesmartpro", label: "GitHub" },
    { icon: Facebook, href: "https://facebook.com/thesmartpro", label: "Facebook" }
  ];

  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/">
              <div className="flex items-center gap-2 font-bold text-xl text-white hover:text-blue-400 mb-4 cursor-pointer">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
                  SP
                </div>
                <span>TheSmartPro.io</span>
              </div>
            </Link>
            <p className="text-sm text-slate-400 mb-6">
              Unified business platform for mid-market companies.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-blue-400" />
                <a href="mailto:hello@thesmartpro.io" className="hover:text-blue-400">
                  hello@thesmartpro.io
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-blue-400" />
                <a href="tel:+15551234567" className="hover:text-blue-400">
                  +1 (555) 123-4567
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-white font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href}>
                      <div className="text-sm hover:text-blue-400 transition-colors cursor-pointer">
                        {link.label}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700 pt-8 mb-8">
          {/* Social Links */}
          <div className="flex items-center justify-center gap-6 mb-8">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-blue-400 transition-colors"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          {/* Bottom Info */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-400">
            <p>
              &copy; {currentYear} TheSmartPro.io. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/privacy">
                <div className="hover:text-blue-400 cursor-pointer">
                  Privacy Policy
                </div>
              </Link>
              <Link href="/terms">
                <div className="hover:text-blue-400 cursor-pointer">
                  Terms of Service
                </div>
              </Link>
              <Link href="/security">
                <div className="hover:text-blue-400 cursor-pointer">
                  Security
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-white font-bold text-lg mb-1">
                Subscribe to Our Newsletter
              </h3>
              <p className="text-blue-100">
                Get the latest updates and insights delivered to your inbox.
              </p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-lg flex-1 md:flex-none focus:outline-none"
              />
              <button className="px-6 py-2 bg-white text-blue-600 font-semibold rounded-lg hover:bg-slate-100 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
