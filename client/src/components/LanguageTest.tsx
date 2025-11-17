import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";

export function LanguageTest() {
  const { language, setLanguage, t } = useLanguage();
  
  // Always show in dev, or if debug flag is set
  const showTest = import.meta.env.DEV || localStorage.getItem('debug_language') === 'true';
  
  if (!showTest) return null;

  return (
    <div className="fixed top-20 right-4 bg-yellow-200 p-4 rounded-lg shadow-lg z-50 border-2 border-yellow-400">
      <h3 className="font-bold mb-2">Language Test</h3>
      <div className="space-y-2 text-sm">
        <div>Current: <strong>{language}</strong></div>
        <div>HTML dir: <strong>{document.documentElement.dir}</strong></div>
        <div>Test translation: <strong>{t('nav.home')}</strong></div>
        <div className="flex gap-2">
          <Button 
            size="sm" 
            onClick={() => setLanguage('en')}
            className={language === 'en' ? 'bg-blue-600' : ''}
          >
            English
          </Button>
          <Button 
            size="sm" 
            onClick={() => setLanguage('ar')}
            className={language === 'ar' ? 'bg-blue-600' : ''}
          >
            العربية
          </Button>
        </div>
      </div>
    </div>
  );
}

