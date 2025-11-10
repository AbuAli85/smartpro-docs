import { useState } from "react";
import { Link } from "wouter";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Search from "@/components/Search";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const navItems = [
    { label: "Home", href: "/" },
    {
      label: "For Providers",
      href: "#",
      submenu: [
        { label: "Get Started", href: "/get-started-providers" },
        { label: "How It Works", href: "/how-it-works" },
        { label: "Earn More", href: "/providers" }
      ]
    },
    {
      label: "For Clients",
      href: "#",
      submenu: [
        { label: "Find Professionals", href: "/clients" },
        { label: "Pricing", href: "/pricing" },
        { label: "ROI Calculator", href: "/roi-calculator" }
      ]
    },
    {
      label: "Company",
      href: "#",
      submenu: [
        { label: "About Us", href: "/about" },
        { label: "Blog", href: "/blog" },
        { label: "Contact", href: "/contact" }
      ]
    },
    {
      label: "Resources",
      href: "#",
      submenu: [
        { label: "How It Works", href: "/how-it-works" },
        { label: "Comparison", href: "/comparison" },
        { label: "Case Studies", href: "/case-studies" }
      ]
    }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm" role="banner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-2 font-bold text-2xl text-blue-600 hover:text-blue-700 cursor-pointer" aria-label="TheSmartPro.io Home">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold" aria-hidden="true">
                SP
              </div>
              <span className="hidden sm:inline">TheSmartPro.io</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1" role="navigation" aria-label="Main navigation">
            {navItems.map((item) => (
              <div key={item.label} className="relative group">
                <button 
                  className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors flex items-center gap-1"
                  aria-haspopup={item.submenu ? "true" : "false"}
                  aria-expanded={item.submenu ? "false" : undefined}
                >
                  {item.label}
                  {item.submenu && <ChevronDown className="w-4 h-4" aria-hidden="true" />}
                </button>

                {/* Dropdown Menu */}
                {item.submenu && (
                  <div className="absolute left-0 mt-0 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2" role="menu">
                    {item.submenu.map((subitem) => (
                      <Link key={subitem.label} href={subitem.href}>
                        <div className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900 cursor-pointer" role="menuitem">
                          {subitem.label}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Search />
            <Link href="/get-started-providers">
              <div className="text-sm font-medium text-slate-700 hover:text-slate-900 cursor-pointer">
                For Providers
              </div>
            </Link>
            <Link href="/get-started-providers">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Start Free Trial
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-md text-slate-700 hover:bg-slate-100"
          >
            {isOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
            <div className="lg:hidden pb-4 space-y-2">
            {navItems.map((item) => (
              <div key={item.label}>
                <button
                  onClick={() =>
                    setOpenDropdown(
                      openDropdown === item.label ? null : item.label
                    )
                  }
                  className="w-full text-left px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-md flex items-center justify-between"
                >
                  {item.label}
                  {item.submenu && (
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        openDropdown === item.label ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </button>

                {/* Mobile Submenu */}
                {item.submenu && openDropdown === item.label && (
                  <div className="pl-4 space-y-1">
                    {item.submenu.map((subitem) => (
                      <Link key={subitem.label} href={subitem.href}>
                        <div
                          className="block px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-md cursor-pointer"
                          onClick={() => setIsOpen(false)}
                        >
                          {subitem.label}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-4 border-t border-slate-200 space-y-2">
              <Link href="/get-started-providers">
                <div
                  className="block px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-md cursor-pointer"
                  onClick={() => setIsOpen(false)}
                >
                  For Providers
                </div>
              </Link>
              <Link href="/contact">
                <div
                  className="block px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-md cursor-pointer"
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </div>
              </Link>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Start Free Trial
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
