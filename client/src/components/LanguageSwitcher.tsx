import { Globe, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [isChanging, setIsChanging] = useState(false);
  
  // Verify language is correctly applied
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const verifyLanguage = () => {
      const htmlLang = document.documentElement.getAttribute('lang');
      const htmlDir = document.documentElement.getAttribute('dir');
      const expectedDir = language === 'ar' ? 'rtl' : 'ltr';
      
      // If attributes don't match, fix them
      if (htmlLang !== language || htmlDir !== expectedDir) {
        document.documentElement.setAttribute('lang', language);
        document.documentElement.setAttribute('dir', expectedDir);
        if (document.body) {
          document.body.setAttribute('dir', expectedDir);
        }
      }
    };
    
    verifyLanguage();
    
    // Listen for language change events
    const handleLanguageChange = () => {
      verifyLanguage();
    };
    
    window.addEventListener('languagechange', handleLanguageChange);
    return () => {
      window.removeEventListener('languagechange', handleLanguageChange);
    };
  }, [language]);

  const handleLanguageChange = useCallback((lang: 'en' | 'ar') => {
    // Prevent if already selected or changing
    if (language === lang || isChanging) {
      setOpen(false);
      return;
    }
    
    setIsChanging(true);
    setOpen(false);
    
    try {
      // Update language
      setLanguage(lang);
      
      // Verify DOM update after a short delay
      setTimeout(() => {
        const htmlLang = document.documentElement.getAttribute('lang');
        const htmlDir = document.documentElement.getAttribute('dir');
        const expectedDir = lang === 'ar' ? 'rtl' : 'ltr';
        
        if (htmlLang !== lang || htmlDir !== expectedDir) {
          // Force update if mismatch detected
          document.documentElement.setAttribute('lang', lang);
          document.documentElement.setAttribute('dir', expectedDir);
          if (document.body) {
            document.body.setAttribute('dir', expectedDir);
          }
          window.dispatchEvent(new CustomEvent('languagechange', { detail: { language: lang } }));
        }
        
        setIsChanging(false);
      }, 50);
    } catch (error) {
      console.error('Error changing language:', error);
      setIsChanging(false);
    }
  }, [language, setLanguage, isChanging]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent, lang: 'en' | 'ar') => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleLanguageChange(lang);
    }
  }, [handleLanguageChange]);

  const currentLanguageLabel = language === 'en' ? 'English' : 'العربية';
  const isRTL = language === 'ar';

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "gap-2 cursor-pointer transition-all duration-200",
            "hover:bg-slate-100 dark:hover:bg-slate-800",
            isChanging && "opacity-50 cursor-wait"
          )}
          aria-label={t('button.changeLanguage') || 'Change language'}
          aria-expanded={open}
          aria-haspopup="true"
          title={t('button.changeLanguage') || 'Change language'}
          disabled={isChanging}
        >
          <Globe className={cn(
            "h-4 w-4 flex-shrink-0 transition-transform duration-200",
            isChanging && "animate-spin"
          )} />
          <span className="hidden sm:inline whitespace-nowrap font-medium">
            {currentLanguageLabel}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align={isRTL ? "start" : "end"} 
        className="min-w-[140px]"
        dir={isRTL ? "rtl" : "ltr"}
      >
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
            handleLanguageChange('en');
          }}
          onKeyDown={(e) => handleKeyDown(e, 'en')}
          className={cn(
            "cursor-pointer transition-colors duration-150",
            language === 'en' && "bg-blue-50 dark:bg-blue-900/20 font-semibold",
            "hover:bg-slate-100 dark:hover:bg-slate-800"
          )}
          aria-selected={language === 'en'}
          role="option"
        >
          <span className="flex items-center justify-between w-full gap-2">
            <span className="flex items-center gap-2">
              <span className="text-sm font-medium">English</span>
              <span className="text-xs text-gray-500">EN</span>
            </span>
            {language === 'en' && (
              <Check className="h-4 w-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
            )}
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
            handleLanguageChange('ar');
          }}
          onKeyDown={(e) => handleKeyDown(e, 'ar')}
          className={cn(
            "cursor-pointer transition-colors duration-150",
            language === 'ar' && "bg-blue-50 dark:bg-blue-900/20 font-semibold",
            "hover:bg-slate-100 dark:hover:bg-slate-800"
          )}
          aria-selected={language === 'ar'}
          role="option"
        >
          <span className="flex items-center justify-between w-full gap-2">
            <span className="flex items-center gap-2">
              <span className="text-sm font-medium">العربية</span>
              <span className="text-xs text-gray-500">AR</span>
            </span>
            {language === 'ar' && (
              <Check className="h-4 w-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
            )}
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

