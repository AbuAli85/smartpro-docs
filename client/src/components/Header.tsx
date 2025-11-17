import { useState, useMemo } from "react";
import { Link } from "wouter";
import { Menu, X, ChevronDown, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Search from "@/components/Search";
import { useTheme } from "@/contexts/ThemeContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openDesktopDropdown, setOpenDesktopDropdown] = useState<string | null>(null);
  const { theme, toggleTheme, switchable } = useTheme();
  const { t } = useLanguage();

  const getDropdownId = (label: string) =>
    `desktop-menu-${label.toLowerCase().replace(/\s+/g, "-")}`;

  const focusFirstDesktopItem = (label: string) => {
    const menu = document.getElementById(getDropdownId(label));
    const focusable = menu?.querySelector<HTMLElement>("a, button, [tabindex]");
    focusable?.focus();
  };

  const handleDesktopMenuKeydown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    label: string,
    hasSubmenu: boolean,
  ) => {
    if (!hasSubmenu) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setOpenDesktopDropdown(label);
      focusFirstDesktopItem(label);
    } else if (event.key === "Escape") {
      event.preventDefault();
      setOpenDesktopDropdown(null);
      (event.currentTarget as HTMLButtonElement).focus();
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setOpenDesktopDropdown((prev) => (prev === label ? null : label));
    }
  };

  // Use useMemo to ensure navItems updates when language changes
  const navItems = useMemo(() => {
    console.log('🔄 Header: Recomputing navItems, language:', language);
    return [
    { label: t('nav.home'), href: "/" },
    {
      label: t('nav.forProviders'),
      href: "#",
      submenu: [
        { label: t('nav.getStarted'), href: "/get-started-providers" },
        { label: t('nav.howItWorks'), href: "/how-it-works" },
        { label: t('nav.earnMore'), href: "/providers" }
      ]
    },
    {
      label: t('nav.forClients'),
      href: "#",
      submenu: [
        { label: t('nav.findProfessionals'), href: "/clients" },
        { label: t('nav.pricing'), href: "/pricing" },
        { label: t('nav.roiCalculator'), href: "/roi-calculator" }
      ]
    },
    {
      label: t('nav.company'),
      href: "#",
      submenu: [
        { label: t('nav.aboutUs'), href: "/about" },
        { label: t('nav.blog'), href: "/blog" },
        { label: t('nav.contact'), href: "/contact" }
      ]
    },
    {
      label: t('nav.resources'),
      href: "#",
      submenu: [
        { label: t('nav.howItWorks'), href: "/how-it-works" },
        { label: t('nav.comparison'), href: "/comparison" },
        { label: t('nav.caseStudies'), href: "/case-studies" }
      ]
    };
  }, [t, language]);

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
            {navItems.map((item) => {
              const hasSubmenu = Boolean(item.submenu);
              const dropdownId = hasSubmenu ? getDropdownId(item.label) : undefined;
              const isOpen = hasSubmenu && openDesktopDropdown === item.label;

              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => hasSubmenu && setOpenDesktopDropdown(item.label)}
                  onMouseLeave={() => hasSubmenu && setOpenDesktopDropdown(null)}
                  onFocus={() => hasSubmenu && setOpenDesktopDropdown(item.label)}
                  onBlur={(event) => {
                    if (hasSubmenu && !event.currentTarget.contains(event.relatedTarget as Node)) {
                      setOpenDesktopDropdown(null);
                    }
                  }}
                >
                <button 
                  className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors flex items-center gap-1"
                  aria-haspopup={hasSubmenu ? "menu" : undefined}
                  aria-expanded={hasSubmenu ? isOpen : undefined}
                  aria-controls={dropdownId}
                  onKeyDown={(event) => handleDesktopMenuKeydown(event, item.label, hasSubmenu)}
                >
                  {item.label}
                  {hasSubmenu && <ChevronDown className="w-4 h-4" aria-hidden="true" />}
                </button>

                {/* Dropdown Menu */}
                {hasSubmenu && (
                  <div
                    id={dropdownId}
                    className={`absolute left-0 mt-0 w-56 bg-white rounded-lg shadow-lg transition-all duration-200 py-2 border border-slate-100 focus-within:opacity-100 focus-within:visible ${
                      isOpen ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
                    role="menu"
                    aria-hidden={isOpen ? undefined : "true"}
                  >
                    {item.submenu!.map((subitem) => (
                      <Link key={subitem.label} href={subitem.href}>
                        <div className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900 cursor-pointer" role="menuitem">
                          {subitem.label}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
            })}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Search />
            <LanguageSwitcher />
            {switchable && toggleTheme && (
              <button
                onClick={toggleTheme}
                className="p-2 rounded-md text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
                aria-label={theme === "dark" ? t('common.open') : t('common.close')}
                title={theme === "dark" ? t('common.open') : t('common.close')}
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
            )}
            <a 
              href="https://thesmartpro.io" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100 transition-colors"
            >
              {t('nav.visitMainPlatform')}
            </a>
            <Link href="/pricing">
              <div className="text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100 cursor-pointer">
                {t('nav.pricing')}
              </div>
            </Link>
            <Link href="/get-started-providers">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                {t('nav.startFreeTrial')}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-md text-slate-700 hover:bg-slate-100"
            aria-label={isOpen ? t('common.close') : t('common.menu')}
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
              <div className="px-3 py-2">
                <LanguageSwitcher />
              </div>
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
              <a 
                href="https://thesmartpro.io" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                {t('nav.visitMainPlatform')}
              </a>
              <Link href="/pricing">
                <div
                  className="block px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md cursor-pointer"
                  onClick={() => setIsOpen(false)}
                >
                  {t('nav.pricing')}
                </div>
              </Link>
              <Link href="/contact">
                <div
                  className="block px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md cursor-pointer"
                  onClick={() => setIsOpen(false)}
                >
                  {t('nav.contact')}
                </div>
              </Link>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" aria-label={t('nav.startFreeTrial')}>
                {t('nav.startFreeTrial')}
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
