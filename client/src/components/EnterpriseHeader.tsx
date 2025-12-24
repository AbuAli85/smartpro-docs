import { useState } from 'react';
import { Menu, X, Search, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';

interface NavItem {
  label: string;
  href: string;
  submenu?: NavItem[];
}

const navItems: NavItem[] = [
  {
    label: 'Solutions',
    href: '#solutions',
    submenu: [
      { label: 'Employee Management', href: '#employee-management' },
      { label: 'CRM & Client Management', href: '#crm' },
      { label: 'Project Management', href: '#projects' },
      { label: 'E-Learning Platform', href: '#elearning' },
      { label: 'Contract Management', href: '#contracts' },
      { label: 'Workflow Automation', href: '#automation' },
    ],
  },
  {
    label: 'Industries',
    href: '#industries',
    submenu: [
      { label: 'Technology', href: '#tech' },
      { label: 'Consulting', href: '#consulting' },
      { label: 'Healthcare', href: '#healthcare' },
      { label: 'Finance', href: '#finance' },
      { label: 'Education', href: '#education' },
      { label: 'Manufacturing', href: '#manufacturing' },
    ],
  },
  {
    label: 'Resources',
    href: '#resources',
    submenu: [
      { label: 'Documentation', href: '#docs' },
      { label: 'Blog & Insights', href: '#blog' },
      { label: 'Case Studies', href: '#cases' },
      { label: 'Webinars', href: '#webinars' },
      { label: 'API Reference', href: '#api' },
      { label: 'Support Center', href: '#support' },
    ],
  },
  {
    label: 'Pricing',
    href: '#pricing',
  },
  {
    label: 'About',
    href: '#about',
  },
];

export default function EnterpriseHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  window.addEventListener('scroll', () => {
    setIsScrolled(window.scrollY > 10);
  });

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-lg'
          : 'bg-gradient-to-b from-white to-gray-50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer">
            <Logo size="sm" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div key={item.label} className="relative group">
                <button
                  className="px-4 py-2 text-gray-700 font-medium hover:text-blue-600 transition-colors flex items-center gap-1 rounded-lg hover:bg-gray-100"
                  onMouseEnter={() => setActiveSubmenu(item.label)}
                  onMouseLeave={() => setActiveSubmenu(null)}
                >
                  {item.label}
                  {item.submenu && <ChevronDown size={16} />}
                </button>

                {/* Submenu */}
                {item.submenu && (
                  <div className="absolute left-0 mt-0 w-48 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2">
                    {item.submenu.map((subitem) => (
                      <a
                        key={subitem.label}
                        href={subitem.href}
                        className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      >
                        {subitem.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Section */}
          <div className="hidden md:flex items-center gap-4">
            {/* Search */}
            <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors rounded-lg hover:bg-gray-100">
              <Search size={20} />
            </button>

            {/* CTA Buttons */}
            <Button
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-50"
              onClick={() => alert('Sign In')}
            >
              Sign In
            </Button>
            <Button
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
              onClick={() => alert('Start Free Trial')}
            >
              Start Free Trial
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-gray-700 hover:text-blue-600"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden pb-4 border-t border-gray-200">
            {navItems.map((item) => (
              <div key={item.label}>
                <button
                  className="w-full text-left px-4 py-3 text-gray-700 font-medium hover:bg-gray-100 flex items-center justify-between"
                  onClick={() =>
                    setActiveSubmenu(
                      activeSubmenu === item.label ? null : item.label
                    )
                  }
                >
                  {item.label}
                  {item.submenu && (
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${
                        activeSubmenu === item.label ? 'rotate-180' : ''
                      }`}
                    />
                  )}
                </button>

                {/* Mobile Submenu */}
                {item.submenu && activeSubmenu === item.label && (
                  <div className="bg-gray-50">
                    {item.submenu.map((subitem) => (
                      <a
                        key={subitem.label}
                        href={subitem.href}
                        className="block px-8 py-2 text-gray-600 hover:text-blue-600 text-sm"
                      >
                        {subitem.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Mobile CTA Buttons */}
            <div className="px-4 py-4 gap-2 flex flex-col">
              <Button
                variant="outline"
                className="w-full border-blue-600 text-blue-600"
              >
                Sign In
              </Button>
              <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                Start Free Trial
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
