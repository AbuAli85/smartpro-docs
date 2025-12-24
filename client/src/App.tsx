import { lazy, Suspense, useEffect } from "react";
import { NotificationProvider } from "./contexts/NotificationContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { SupabaseAuthProvider } from "./contexts/SupabaseAuthContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import { initGoogleAnalytics, trackPageView } from "@/lib/googleAnalytics";
import { initPerformanceMonitoring } from "@/lib/performanceUtils";
import { CoreWebVitalsMonitor } from "@/components/CoreWebVitalsMonitor";

// Helper function to handle lazy loading errors gracefully
const lazyWithErrorHandling = (importFn: () => Promise<any>) => {
  return lazy(() =>
    importFn().catch((error) => {
      // Log error in development
      if (import.meta.env.DEV) {
        console.error('Failed to load module:', error);
      }
      // Return a fallback component
      return {
        default: () => (
          <div className="flex items-center justify-center min-h-screen p-8">
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-2">Failed to load page</h2>
              <p className="text-muted-foreground mb-4">
                Please refresh the page or try again later.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90"
              >
                Refresh Page
              </button>
            </div>
          </div>
        ),
      };
    })
  );
};

// Lazy load pages to reduce initial bundle
const ProvidersPage = lazyWithErrorHandling(() => import("./pages/ProvidersPage"));
const ClientsPage = lazyWithErrorHandling(() => import("./pages/ClientsPage"));
const GetStartedClients = lazyWithErrorHandling(() => import("./pages/GetStartedClients"));
const Company = lazyWithErrorHandling(() => import("./pages/Company"));
const Careers = lazyWithErrorHandling(() => import("./pages/Careers"));
const About = lazyWithErrorHandling(() => import("./pages/About"));
const Pricing = lazyWithErrorHandling(() => import("./pages/Pricing"));
const Features = lazyWithErrorHandling(() => import("./pages/Features"));
const Contact = lazyWithErrorHandling(() => import("./pages/Contact"));
const Consultation = lazyWithErrorHandling(() => import("./pages/Consultation"));
const ConsultationThankYou = lazyWithErrorHandling(() => import("./pages/ConsultationThankYou"));
const ConsultationStatus = lazyWithErrorHandling(() => import("./pages/ConsultationStatus"));
const PostRegistrationWelcome = lazy(() => 
  import("./components/PostRegistrationWelcome").then(module => ({ default: module.PostRegistrationWelcome }))
);
const Book = lazyWithErrorHandling(() => import("./pages/Book"));
const HelpCenter = lazyWithErrorHandling(() => import("./pages/HelpCenter"));
const Community = lazyWithErrorHandling(() => import("./pages/Community"));
const Blog = lazyWithErrorHandling(() => import("./pages/Blog"));
const BlogArticle = lazyWithErrorHandling(() => import("./pages/BlogArticle"));
const Security = lazyWithErrorHandling(() => import("./pages/Security"));
const HowItWorks = lazyWithErrorHandling(() => import("./pages/HowItWorks"));
const Comparison = lazyWithErrorHandling(() => import("./pages/Comparison"));
const ROICalculator = lazyWithErrorHandling(() => import("./pages/ROICalculator"));
const ProviderOnboarding = lazyWithErrorHandling(() => import("./pages/ProviderOnboarding"));
const CaseStudies = lazyWithErrorHandling(() => import("./pages/CaseStudies"));
const CaseStudyDetail = lazyWithErrorHandling(() => import("./pages/CaseStudyDetail"));
const Privacy = lazyWithErrorHandling(() => import("./pages/Privacy"));
const Terms = lazyWithErrorHandling(() => import("./pages/Terms"));
const Cookies = lazyWithErrorHandling(() => import("./pages/Cookies"));

const DocsIndex = lazyWithErrorHandling(() => import("./pages/docs/Index"));
const ProductOverview = lazyWithErrorHandling(() => import("./pages/docs/ProductOverview"));
const DocFeatures = lazyWithErrorHandling(() => import("./pages/docs/Features"));
const Architecture = lazyWithErrorHandling(() => import("./pages/docs/Architecture"));
const BusinessPlan = lazyWithErrorHandling(() => import("./pages/docs/BusinessPlan"));
const GettingStarted = lazyWithErrorHandling(() => import("./pages/docs/GettingStarted"));
const API = lazyWithErrorHandling(() => import("./pages/docs/API"));
const FAQ = lazyWithErrorHandling(() => import("./pages/docs/FAQ"));
const Support = lazyWithErrorHandling(() => import("./pages/docs/Support"));
const BusinessPlanFull = lazyWithErrorHandling(() => import("./pages/docs/BusinessPlanFull"));
const WorkflowAutomation = lazyWithErrorHandling(
  () => import("./pages/docs/WorkflowAutomation"),
);
const DocsSecurity = lazyWithErrorHandling(() => import("./pages/docs/Security"));
const LetterAutomationDemo = lazyWithErrorHandling(() => import("./pages/demo/LetterAutomationDemo"));
const ProfessionalLetterBuilder = lazyWithErrorHandling(() => import("./pages/demo/ProfessionalLetterBuilder"));

// Marketplace pages
const ServicesPage = lazyWithErrorHandling(() => import("./pages/marketplace/services"));
const ServiceCreatePage = lazyWithErrorHandling(() => import("./pages/marketplace/services/create"));
const ServiceDetailPage = lazyWithErrorHandling(() => import("./pages/marketplace/services/[id]"));
const ServiceEditPage = lazyWithErrorHandling(() => import("./pages/marketplace/services/[id]/edit"));
const BookServicePage = lazyWithErrorHandling(() => import("./pages/marketplace/services/[id]/book"));
const DashboardPage = lazyWithErrorHandling(() => import("./pages/marketplace/dashboard"));
const SignInPage = lazyWithErrorHandling(() => import("./pages/marketplace/auth/sign-in"));
const SignUpPage = lazyWithErrorHandling(() => import("./pages/marketplace/auth/sign-up"));
const ForgotPasswordPage = lazyWithErrorHandling(() => import("./pages/marketplace/auth/forgot-password"));
const ResetPasswordPage = lazyWithErrorHandling(() => import("./pages/marketplace/auth/reset-password"));

import { ToastContainer } from "./components/ToastContainer";
// Lazy load non-critical widgets to improve INP/LCP
const LiveChat = lazy(() => import("./components/LiveChat"));
const EmailCapture = lazy(() => import("./components/EmailCapture"));
import { LanguageDebug } from "./components/LanguageDebug";
import { LanguageTest } from "./components/LanguageTest";
import LanguageRouteRedirect from "./components/LanguageRouteRedirect";

// Loading fallback component
function PageLoader() {
  // Note: Can't use useLanguage here as it's outside LanguageProvider
  // This is fine as it's just a loading state
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}

function Router() {
  const [location] = useLocation();

  // Track page views on route change
  useEffect(() => {
    // Re-read title one microtask later (after page effect runs setSEOTags)
    queueMicrotask(() => trackPageView(location, document.title));
  }, [location]);

  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        {/* Language route redirects - must come before other routes */}
        <Route path={"/ar"} component={LanguageRouteRedirect} />
        <Route path={"/en"} component={LanguageRouteRedirect} />
        <Route path={"/"} component={Home} />
        <Route path={"/providers"} component={ProvidersPage} />
        <Route path={"/clients"} component={ClientsPage} />
        <Route path={"/get-started-clients"} component={GetStartedClients} />
        <Route path={"/company"} component={Company} />
        <Route path={"/careers"} component={Careers} />
        <Route path={"/about"} component={About} />
        <Route path={"/pricing"} component={Pricing} />
        <Route path={"/features"} component={Features} />
        <Route path={"/contact"} component={Contact} />
        <Route path={"/consultation"} component={Consultation} />
        <Route path={"/consultation/thanks"} component={ConsultationThankYou} />
        <Route path={"/consultation/status/:submissionId"} component={ConsultationStatus} />
        <Route path={"/book"} component={Book} />
        <Route path={"/blog"} component={Blog} />
        <Route path={"/blog/:id"} component={BlogArticle} />
        <Route path={"/help"} component={HelpCenter} />
        <Route path={"/community"} component={Community} />
        <Route path={"/docs"} component={DocsIndex} />
        <Route path={"/docs/getting-started"} component={GettingStarted} />
        <Route path={"/docs/product-overview"} component={ProductOverview} />
        <Route path={"/docs/features"} component={DocFeatures} />
        <Route path={"/docs/architecture"} component={Architecture} />
        <Route path={"/docs/business-plan"} component={BusinessPlan} />
        <Route path={"/docs/api"} component={API} />
        <Route path={"/docs/faq"} component={FAQ} />
        <Route path={"/docs/support"} component={Support} />
        <Route path={"/docs/business-plan-full"} component={BusinessPlanFull} />
        <Route
          path={"/docs/workflow-automation"}
          component={WorkflowAutomation}
        />
        <Route path={"/docs/security"} component={DocsSecurity} />
        <Route path={"/demo/letter-automation"} component={LetterAutomationDemo} />
        <Route path={"/demo/professional-letter-builder"} component={ProfessionalLetterBuilder} />
        <Route path={"/how-it-works"} component={HowItWorks} />
        <Route path={"/comparison"} component={Comparison} />
        <Route path={"/roi-calculator"} component={ROICalculator} />
        <Route path={"/get-started-providers"} component={ProviderOnboarding} />
        <Route path={"/security"} component={Security} />
        <Route path={"/case-studies"} component={CaseStudies} />
        <Route path={"/case-studies/:id"} component={CaseStudyDetail} />
        <Route path={"/privacy"} component={Privacy} />
        <Route path={"/terms"} component={Terms} />
        <Route path={"/cookies"} component={Cookies} />
        
        {/* Marketplace Routes */}
        <Route path={"/marketplace/services"} component={ServicesPage} />
        <Route path={"/marketplace/services/create"} component={ServiceCreatePage} />
        <Route path={"/marketplace/services/:id/book"} component={BookServicePage} />
        <Route path={"/marketplace/services/:id/edit"} component={ServiceEditPage} />
        <Route path={"/marketplace/services/:id"} component={ServiceDetailPage} />
        <Route path={"/marketplace/auth/sign-in"} component={SignInPage} />
        <Route path={"/marketplace/auth/sign-up"} component={SignUpPage} />
        <Route path={"/marketplace/auth/forgot-password"} component={ForgotPasswordPage} />
        <Route path={"/marketplace/auth/reset-password"} component={ResetPasswordPage} />
        
        <Route path={"/404"} component={NotFound} />
        {/* Final fallback route */}
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  // Initialize monitoring and analytics on mount
  useEffect(() => {
    // Suppress non-critical errors from third-party libraries
    const originalError = console.error;
    const originalWarn = console.warn;
    
    // Suppress InvalidNodeTypeError (from third-party libraries like Vercel feedback widget)
    // Also suppress Vercel feedback widget fetch errors
    const errorHandler = (message: any, ...args: any[]) => {
      const messageStr = typeof message === 'string' ? message : String(message);
      
      // Always suppress Zustand deprecation warnings (from dependencies, not actionable)
      if (messageStr.includes('zustand') && messageStr.includes('DEPRECATED')) {
        return;
      }
      
      if (
        messageStr.includes('InvalidNodeTypeError') ||
        messageStr.includes('selectNode') ||
        messageStr.includes('Range') ||
        messageStr.includes('.well-known/vercel/jwe') ||
        messageStr.includes('vercel/jwe') ||
        messageStr.includes('feedback.js') ||
        messageStr.includes('zustand') ||
        messageStr.includes('DEPRECATED') ||
        (messageStr.includes('Fetch failed') && messageStr.includes('vercel'))
      ) {
        // Silently ignore these errors - they're from third-party libraries
        return;
      }
      originalError(message, ...args);
    };
    
    // Suppress Google Analytics fetch errors (expected with ad blockers)
    // Also suppress Vercel feedback widget errors
    const warnHandler = (message: any, ...args: any[]) => {
      const messageStr = typeof message === 'string' ? message : String(message);
      
      // Always suppress Zustand deprecation warnings (from dependencies, not actionable)
      if (messageStr.includes('zustand') && messageStr.includes('DEPRECATED')) {
        return;
      }
      
      if (
        messageStr.includes('Fetch failed loading') ||
        messageStr.includes('google-analytics.com') ||
        messageStr.includes('Failed to fetch dynamically imported module') ||
        messageStr.includes('.well-known/vercel/jwe') ||
        messageStr.includes('vercel/jwe') ||
        messageStr.includes('feedback.js') ||
        messageStr.includes('zustand') ||
        messageStr.includes('DEPRECATED')
      ) {
        // Only log in development for other warnings
        if (import.meta.env.DEV) {
          originalWarn(message, ...args);
        }
        return;
      }
      originalWarn(message, ...args);
    };
    
    // Apply warning filter in both dev and production (Zustand warnings suppressed always)
    // Error filter only in production to reduce console noise
    console.warn = warnHandler;
    if (!import.meta.env.DEV) {
      console.error = errorHandler;
    }
    
    // Initialize Google Analytics 4
    const ga4Id = import.meta.env.VITE_GA4_MEASUREMENT_ID;
    if (ga4Id) {
      initGoogleAnalytics(ga4Id);
    }

    // Initialize performance monitoring
    initPerformanceMonitoring();

    // Log initialization in development
    if (import.meta.env.DEV) {
      console.log('✅ SmartPro App Initialized');
      console.log('📊 Analytics:', ga4Id ? 'Enabled' : 'Disabled');
      console.log('⚡ Performance Monitoring: Enabled');
    }
    
    // Cleanup: restore original console methods on unmount
    return () => {
      if (!import.meta.env.DEV) {
        console.error = originalError;
        console.warn = originalWarn;
      }
    };
  }, []);

  return (
    <ErrorBoundary>
      <LanguageProvider>
        <SupabaseAuthProvider>
          <NotificationProvider>
            <ThemeProvider defaultTheme="light" switchable={true}>
              <TooltipProvider>
                <Router />
                <ToastContainer />
              <Suspense fallback={null}>
                <LiveChat />
              </Suspense>
              <Suspense fallback={null}>
                <EmailCapture />
              </Suspense>
              {/* Language debug components - show in dev or when debug_language flag is set */}
              <LanguageDebug />
              <LanguageTest />
              {(import.meta.env.DEV || (typeof window !== 'undefined' && localStorage.getItem('debug_webvitals') === 'true')) && (
                <CoreWebVitalsMonitor />
              )}
            </TooltipProvider>
          </ThemeProvider>
        </NotificationProvider>
      </SupabaseAuthProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;
