import { useState, useEffect } from "react";
import { User, Building2, Briefcase, MessageSquare, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

interface FormSection {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  completed?: boolean;
}

interface FormSectionNavProps {
  sections: FormSection[];
  className?: string;
}

export function FormSectionNav({ sections, className }: FormSectionNavProps) {
  const { t, language } = useLanguage();
  const isRTL = language === "ar";
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200; // Offset for header

      for (const section of sections) {
        const element = document.getElementById(`section-${section.id}`);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(`section-${sectionId}`);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      // Focus the first input in the section for accessibility
      setTimeout(() => {
        const firstInput = element.querySelector<HTMLElement>(
          "input, textarea, select, button"
        );
        if (firstInput) {
          firstInput.focus();
        }
      }, 500);
    }
  };

  return (
    <nav
      className={cn(
        "sticky top-4 z-40",
        "bg-white rounded-lg border border-slate-200 shadow-sm",
        "p-4 mb-6",
        "hidden lg:block", // Only show on large screens
        className
      )}
      aria-label={t("accessibility.formNavigation") || "Form section navigation"}
    >
      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
        {t("consultation.form.navigation") || "Quick Navigation"}
      </h3>
      <ul className="space-y-2" role="list">
        {sections.map((section) => {
          const Icon = section.icon;
          const isActive = activeSection === section.id;
          const isCompleted = section.completed;

          return (
            <li key={section.id} role="listitem">
              <button
                onClick={() => scrollToSection(section.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 rounded-md",
                  "text-sm font-medium transition-all",
                  "hover:bg-slate-50",
                  "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1",
                  isActive
                    ? "bg-blue-50 text-blue-700 border-l-2 border-blue-600"
                    : "text-gray-700",
                  isCompleted && !isActive && "text-green-700"
                )}
                aria-current={isActive ? "true" : undefined}
                aria-label={`${t("accessibility.goToSection") || "Go to"} ${section.label}`}
              >
                <Icon
                  className={cn(
                    "h-4 w-4 flex-shrink-0",
                    isActive ? "text-blue-600" : "text-gray-400",
                    isCompleted && !isActive && "text-green-600"
                  )}
                  aria-hidden="true"
                />
                <span className="flex-1 text-left">{section.label}</span>
                {isCompleted && (
                  <span
                    className="text-xs text-green-600"
                    aria-label={t("accessibility.completed") || "Completed"}
                  >
                    ✓
                  </span>
                )}
                {isRTL ? (
                  <ChevronRight className="h-4 w-4 rotate-180" aria-hidden="true" />
                ) : (
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

