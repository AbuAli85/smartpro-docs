import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect, useState } from 'react';

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();
  const [open, setOpen] = useState(false);
  
  // Debug: Log when language prop changes
  useEffect(() => {
    console.log('🌐 LanguageSwitcher: Language prop changed to', language);
    const htmlLang = document.documentElement.getAttribute('lang');
    const htmlDir = document.documentElement.getAttribute('dir');
    console.log('🌐 LanguageSwitcher: HTML attributes - lang:', htmlLang, 'dir:', htmlDir);
  }, [language]);

  const handleLanguageChange = (lang: 'en' | 'ar') => {
    console.log('🌐 LanguageSwitcher: handleLanguageChange called with', lang);
    console.log('🌐 Current language in component:', language);
    
    // Prevent if already selected
    if (language === lang) {
      console.log('🌐 Language already set to', lang, '- skipping');
      setOpen(false);
      return;
    }
    
    console.log('🌐 Calling setLanguage with', lang);
    // Close dropdown first
    setOpen(false);
    
    // Update language - this should trigger re-renders
    setLanguage(lang);
    
    // Log immediately after calling setLanguage
    console.log('🌐 setLanguage called, waiting for state update...');
    
    // Verify after React has had a chance to update
    setTimeout(() => {
      const currentLang = document.documentElement.getAttribute('lang');
      const currentDir = document.documentElement.getAttribute('dir');
      const expectedDir = lang === 'ar' ? 'rtl' : 'ltr';
      
      console.log('🌐 Verification after 100ms:');
      console.log('  - Expected lang:', lang, 'dir:', expectedDir);
      console.log('  - Actual HTML lang:', currentLang, 'dir:', currentDir);
      console.log('  - Component language state:', language);
      
      // If attributes don't match, force update
      if (currentLang !== lang || currentDir !== expectedDir) {
        console.warn('🌐 ⚠️ MISMATCH DETECTED! Forcing DOM update...');
        document.documentElement.setAttribute('dir', expectedDir);
        document.documentElement.setAttribute('lang', lang);
        if (document.body) {
          document.body.setAttribute('dir', expectedDir);
        }
        // Force a re-render by dispatching a custom event
        window.dispatchEvent(new CustomEvent('languagechange', { detail: { language: lang } }));
        console.log('🌐 ✅ DOM attributes forced to:', lang, expectedDir);
      } else {
        console.log('🌐 ✅ DOM attributes match expected values');
      }
    }, 100);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 cursor-pointer"
          aria-label={t('button.changeLanguage')}
          title={t('button.changeLanguage')}
          onClick={(e) => {
            // Ensure the entire button is clickable
            console.log('🌐 Language switcher button clicked');
          }}
        >
          <Globe className="h-4 w-4 flex-shrink-0" />
          <span className="hidden sm:inline whitespace-nowrap">
            {language === 'en' ? 'English' : 'العربية'}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[120px]">
        <DropdownMenuItem
          onSelect={() => {
            console.log('🌐 English selected via onSelect');
            handleLanguageChange('en');
          }}
          className={`cursor-pointer ${language === 'en' ? 'bg-accent font-semibold' : ''}`}
        >
          <span className="flex items-center justify-between w-full">
            English
            {language === 'en' && <span className="text-xs">✓</span>}
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => {
            console.log('🌐 Arabic selected via onSelect');
            handleLanguageChange('ar');
          }}
          className={`cursor-pointer ${language === 'ar' ? 'bg-accent font-semibold' : ''}`}
        >
          <span className="flex items-center justify-between w-full">
            العربية
            {language === 'ar' && <span className="text-xs">✓</span>}
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

