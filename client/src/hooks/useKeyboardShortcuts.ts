import { useEffect } from 'react';

export interface KeyboardShortcut {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  meta?: boolean;
  action: () => void;
  description: string;
}

/**
 * React hook for keyboard shortcuts
 * 
 * @param shortcuts - Array of keyboard shortcut definitions
 * @param enabled - Whether shortcuts are enabled (default: true)
 * 
 * @example
 * ```tsx
 * useKeyboardShortcuts([
 *   {
 *     key: 'k',
 *     ctrl: true,
 *     action: () => focusSearch(),
 *     description: 'Focus search',
 *   },
 * ]);
 * ```
 */
export function useKeyboardShortcuts(
  shortcuts: KeyboardShortcut[],
  enabled: boolean = true
): void {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // Ignore if typing in input, textarea, or contenteditable
      const target = event.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        // Allow shortcuts with Ctrl/Cmd (for copy, paste, etc.)
        if (!event.ctrlKey && !event.metaKey) {
          return;
        }
      }

      for (const shortcut of shortcuts) {
        const keyMatch = event.key.toLowerCase() === shortcut.key.toLowerCase();
        const ctrlMatch = shortcut.ctrl ? event.ctrlKey || event.metaKey : !event.ctrlKey && !event.metaKey;
        const shiftMatch = shortcut.shift === undefined ? true : shortcut.shift === event.shiftKey;
        const altMatch = shortcut.alt === undefined ? true : shortcut.alt === event.altKey;

        if (keyMatch && ctrlMatch && shiftMatch && altMatch) {
          event.preventDefault();
          shortcut.action();
          break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts, enabled]);
}

/**
 * Get keyboard shortcut display string
 */
export function getShortcutDisplay(shortcut: KeyboardShortcut): string {
  const parts: string[] = [];
  if (shortcut.ctrl || shortcut.meta) parts.push('Ctrl');
  if (shortcut.shift) parts.push('Shift');
  if (shortcut.alt) parts.push('Alt');
  parts.push(shortcut.key.toUpperCase());
  return parts.join(' + ');
}

