/**
 * Form Progress Indicator Component
 * Shows completion progress for multi-section forms
 */

import { CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

interface FormSection {
  id: string;
  label: string;
  completed: boolean;
}

interface FormProgressIndicatorProps {
  sections: FormSection[];
  currentSection?: string;
  className?: string;
}

export function FormProgressIndicator({
  sections,
  currentSection,
  className,
}: FormProgressIndicatorProps) {
  const { t } = useLanguage();
  const completedCount = sections.filter((s) => s.completed).length;
  const totalSections = sections.length;
  const progressPercentage = (completedCount / totalSections) * 100;

  return (
    <div className={cn("w-full", className)}>
      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            {t("message.progress") || "Form Progress"}
          </span>
          <span className="text-sm text-gray-500">
            {completedCount} of {totalSections} {t("message.sectionsComplete") || "sections complete"}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Section Indicators */}
      <div className="flex flex-wrap gap-4">
        {sections.map((section, index) => (
          <div
            key={section.id}
            className={cn(
              "flex items-center gap-2 text-sm",
              section.completed
                ? "text-green-600"
                : currentSection === section.id
                ? "text-blue-600 font-medium"
                : "text-gray-500"
            )}
          >
            {section.completed ? (
              <CheckCircle2 className="h-4 w-4" />
            ) : (
              <Circle className="h-4 w-4" />
            )}
            <span>{section.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

