import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';

interface Section {
  id: string;
  title: string;
  icon?: React.ReactNode;
}

interface TableOfContentsProps {
  sections: Section[];
  title?: string;
  className?: string;
}

export default function TableOfContents({ 
  sections, 
  title = "Table of Contents",
  className = '' 
}: TableOfContentsProps) {
  return (
    <section className={className}>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">{title}</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {sections.map((section, index) => (
          <Link key={section.id} href={`#${section.id}`}>
            <div className="flex items-center gap-3 p-4 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md transition-all cursor-pointer">
              {section.icon && (
                <div className="text-blue-600 dark:text-blue-400">{section.icon}</div>
              )}
              <div className="flex-1">
                <div className="font-semibold text-gray-900 dark:text-gray-100">
                  {index + 1}. {section.title}
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 dark:text-gray-500" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

