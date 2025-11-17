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

  if (import.meta.env.DEV) {
    return (
      <div className="fixed bottom-4 right-4 bg-black/80 text-white p-2 rounded text-xs z-50">
        <div>Lang: {language}</div>
        <div>Dir: {document.documentElement.dir}</div>
        <div>Test: {t('nav.home')}</div>
      </div>
    );
  }

  return null;
}

