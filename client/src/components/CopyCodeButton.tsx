import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CopyCodeButtonProps {
  text: string;
  className?: string;
  variant?: 'dark' | 'light';
}

export default function CopyCodeButton({ 
  text, 
  className = '',
  variant = 'dark'
}: CopyCodeButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const baseClasses = variant === 'dark' 
    ? 'absolute top-4 right-4 p-2 hover:bg-gray-800 rounded transition-colors text-white'
    : 'absolute top-4 right-4 p-2 hover:bg-gray-100 rounded transition-colors text-gray-700';

  return (
    <button
      onClick={handleCopy}
      className={`${baseClasses} ${className}`}
      aria-label="Copy to clipboard"
      type="button"
    >
      {copied ? (
        <Check className="w-4 h-4 text-green-400" />
      ) : (
        <Copy className="w-4 h-4" />
      )}
    </button>
  );
}

