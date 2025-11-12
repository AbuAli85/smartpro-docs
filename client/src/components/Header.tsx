import { useState } from "react";
import { Link } from "wouter";
import { Menu, X, ChevronDown, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Search from "@/components/Search";
import { useTheme } from "@/contexts/ThemeContext";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { theme, toggleTheme, switchable } = useTheme();

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
    <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm" role="banner">
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
            {switchable && toggleTheme && (
              <button
                onClick={toggleTheme}
                className="p-2 rounded-md text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
            )}
            <Link href="/get-started-providers">
              <div className="text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100 cursor-pointer">
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
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
          >
            {isOpen ? (
              <X className="w-6 h-6" aria-hidden="true" />
            ) : (
              <Menu className="w-6 h-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
            <nav 
              id="mobile-navigation" 
              className="lg:hidden pb-4 space-y-2"
              role="navigation"
              aria-label="Mobile navigation"
            >
            {navItems.map((item) => (
              <div key={item.label}>
                <button
                  onClick={() =>
                    setOpenDropdown(
                      openDropdown === item.label ? null : item.label
                    )
                  }
                  className="w-full text-left px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-md flex items-center justify-between"
                  aria-haspopup={item.submenu ? "true" : "false"}
                  aria-expanded={item.submenu ? openDropdown === item.label : undefined}
                >
                  {item.label}
                  {item.submenu && (
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        openDropdown === item.label ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    />
                  )}
                </button>

                {/* Mobile Submenu */}
                {item.submenu && openDropdown === item.label && (
                  <div className="pl-4 space-y-1" role="menu">
                    {item.submenu.map((subitem) => (
                      <Link key={subitem.label} href={subitem.href}>
                        <div
                          className="block px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-md cursor-pointer"
                          onClick={() => setIsOpen(false)}
                          role="menuitem"
                        >
                          {subitem.label}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-700 space-y-2">
              {switchable && toggleTheme && (
                <button
                  onClick={() => {
                    toggleTheme();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md"
                  aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                >
                  <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
                  {theme === "dark" ? (
                    <Sun className="w-4 h-4" />
                  ) : (
                    <Moon className="w-4 h-4" />
                  )}
                </button>
              )}
              <Link href="/get-started-providers">
                <div
                  className="block px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md cursor-pointer"
                  onClick={() => setIsOpen(false)}
                >
                  For Providers
                </div>
              </Link>
              <Link href="/contact">
                <div
                  className="block px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md cursor-pointer"
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </div>
              </Link>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" aria-label="Start free trial">
                Start Free Trial
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
