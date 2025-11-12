import { useState, useEffect } from 'react';
import { X, Keyboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { KeyboardShortcut, getShortcutDisplay } from '@/hooks/useKeyboardShortcuts';

interface KeyboardShortcutsHelpProps {
  shortcuts: KeyboardShortcut[];
  triggerKey?: string; // Key to show help (default: '?')
}

export default function KeyboardShortcutsHelp({ 
  shortcuts, 
  triggerKey = '?' 
}: KeyboardShortcutsHelpProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ignore if typing in input or textarea
      const target = event.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        return;
      }

      if (event.key === triggerKey && !event.ctrlKey && !event.metaKey) {
        setIsOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [triggerKey]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 dark:bg-black/70"
      onClick={() => setIsOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-labelledby="shortcuts-title"
    >
      <div 
        className="bg-white dark:bg-slate-800 rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <Keyboard className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            <h2 
              id="shortcuts-title"
              className="text-2xl font-bold text-gray-900 dark:text-gray-100"
            >
              Keyboard Shortcuts
            </h2>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
            aria-label="Close shortcuts help"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {shortcuts.map((shortcut, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-700"
              >
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {shortcut.description}
                  </p>
                </div>
                <kbd className="px-3 py-1.5 text-sm font-semibold text-gray-800 dark:text-gray-200 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm">
                  {getShortcutDisplay(shortcut)}
                </kbd>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-slate-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Press <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 dark:text-gray-200 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded">{triggerKey}</kbd> anytime to show this help
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

