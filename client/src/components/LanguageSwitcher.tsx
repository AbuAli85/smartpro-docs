import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/contexts/LanguageContext';

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();

  const handleLanguageChange = (lang: 'en' | 'ar') => {
    console.log('🌐 LanguageSwitcher: Changing language to', lang);
    console.log('🌐 Current language before change:', language);
    
    // Prevent if already selected
    if (language === lang) {
      console.log('🌐 Language already set to', lang);
      return;
    }
    
    // Update language
    setLanguage(lang);
    
    // Force immediate verification after a short delay to allow state/DOM updates
    setTimeout(() => {
      const currentLang = document.documentElement.getAttribute('lang');
      const currentDir = document.documentElement.getAttribute('dir');
      const expectedDir = lang === 'ar' ? 'rtl' : 'ltr';
      
      console.log('🌐 Verified - Expected lang:', lang, 'dir:', expectedDir);
      console.log('🌐 Verified - Actual HTML lang:', currentLang, 'dir:', currentDir);
      
      // If attributes don't match, force update
      if (currentLang !== lang || currentDir !== expectedDir) {
        console.warn('🌐 Mismatch detected! Forcing update...');
        document.documentElement.setAttribute('dir', expectedDir);
        document.documentElement.setAttribute('lang', lang);
        if (document.body) {
          document.body.setAttribute('dir', expectedDir);
        }
        // Force a re-render by dispatching a custom event
        window.dispatchEvent(new CustomEvent('languagechange', { detail: { language: lang } }));
      }
    }, 50);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2"
          aria-label={t('button.changeLanguage')}
        >
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">
            {language === 'en' ? 'English' : 'العربية'}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onSelect={() => handleLanguageChange('en')}
          className={language === 'en' ? 'bg-accent' : ''}
        >
          English
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => handleLanguageChange('ar')}
          className={language === 'ar' ? 'bg-accent' : ''}
        >
          العربية
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

