import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';

/**
 * LanguageRouteRedirect Component
 * Handles language-specific routes like /ar and /en
 * Sets the language and redirects to the base route
 */
export default function LanguageRouteRedirect() {
  const [location, setLocation] = useLocation();
  const { setLanguage } = useLanguage();

  useEffect(() => {
    // Extract language from pathname
    const pathLang = location === '/ar' ? 'ar' : location === '/en' ? 'en' : null;

    if (pathLang) {
      if (import.meta.env.DEV) {
        console.log('🌐 LanguageRouteRedirect: Detected language from URL:', pathLang);
      }
      
      // Set the language (this will update localStorage and HTML attributes)
      setLanguage(pathLang);
      
      // Redirect to base route after a brief delay to ensure language is set
      setTimeout(() => {
        setLocation('/');
      }, 0);
    }
  }, [location, setLanguage, setLocation]);

  // Show loading state while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}

