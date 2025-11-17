import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect } from "react";

export function LanguageDebug() {
  const { language, t } = useLanguage();

  useEffect(() => {
    console.log('🌐 Language Debug:', {
      currentLanguage: language,
      htmlDir: document.documentElement.dir,
      htmlLang: document.documentElement.lang,
      localStorage: localStorage.getItem('smartpro_language'),
      testTranslation: t('nav.home'),
    });
  }, [language, t]);

  // Always show in dev, or if debug flag is set
  const showDebug = import.meta.env.DEV || localStorage.getItem('debug_language') === 'true';
  
  if (showDebug) {
    return (
      <div className="fixed bottom-4 right-4 bg-black/80 text-white p-2 rounded text-xs z-50 font-mono">
        <div className="font-bold mb-1">🌐 Language Debug</div>
        <div>Lang: <strong>{language}</strong></div>
        <div>Dir: <strong>{document.documentElement.dir}</strong></div>
        <div>Test: <strong>{t('nav.home')}</strong></div>
      </div>
    );
  }

  return null;
}

