import { lazy, Suspense, useEffect } from "react";
import { NotificationProvider } from "./contexts/NotificationContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import { initGoogleAnalytics, trackPageView } from "@/lib/googleAnalytics";
import { initPerformanceMonitoring } from "@/lib/performanceUtils";
import { CoreWebVitalsMonitor } from "@/components/CoreWebVitalsMonitor";

// Lazy load pages to reduce initial bundle
const ProvidersPage = lazy(() => import("./pages/ProvidersPage"));
const ClientsPage = lazy(() => import("./pages/ClientsPage"));
const GetStartedClients = lazy(() => import("./pages/GetStartedClients"));
const Company = lazy(() => import("./pages/Company"));
const Careers = lazy(() => import("./pages/Careers"));
const About = lazy(() => import("./pages/About"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Features = lazy(() => import("./pages/Features"));
const Contact = lazy(() => import("./pages/Contact"));
const Consultation = lazy(() => import("./pages/Consultation"));
const HelpCenter = lazy(() => import("./pages/HelpCenter"));
const Community = lazy(() => import("./pages/Community"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogArticle = lazy(() => import("./pages/BlogArticle"));
const Security = lazy(() => import("./pages/Security"));
const HowItWorks = lazy(() => import("./pages/HowItWorks"));
const Comparison = lazy(() => import("./pages/Comparison"));
const ROICalculator = lazy(() => import("./pages/ROICalculator"));
const ProviderOnboarding = lazy(() => import("./pages/ProviderOnboarding"));
const CaseStudies = lazy(() => import("./pages/CaseStudies"));
const CaseStudyDetail = lazy(() => import("./pages/CaseStudyDetail"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Cookies = lazy(() => import("./pages/Cookies"));

const DocsIndex = lazy(() => import("./pages/docs/Index"));
const ProductOverview = lazy(() => import("./pages/docs/ProductOverview"));
const DocFeatures = lazy(() => import("./pages/docs/Features"));
const Architecture = lazy(() => import("./pages/docs/Architecture"));
const BusinessPlan = lazy(() => import("./pages/docs/BusinessPlan"));
const GettingStarted = lazy(() => import("./pages/docs/GettingStarted"));
const API = lazy(() => import("./pages/docs/API"));
const FAQ = lazy(() => import("./pages/docs/FAQ"));
const Support = lazy(() => import("./pages/docs/Support"));
const BusinessPlanFull = lazy(() => import("./pages/docs/BusinessPlanFull"));
const WorkflowAutomation = lazy(
  () => import("./pages/docs/WorkflowAutomation"),
);
const DocsSecurity = lazy(() => import("./pages/docs/Security"));
const LetterAutomationDemo = lazy(() => import("./pages/demo/LetterAutomationDemo"));
const ProfessionalLetterBuilder = lazy(() => import("./pages/demo/ProfessionalLetterBuilder"));

import { ToastContainer } from "./components/ToastContainer";
// Lazy load non-critical widgets to improve INP/LCP
const LiveChat = lazy(() => import("./components/LiveChat"));
const EmailCapture = lazy(() => import("./components/EmailCapture"));
import { LanguageDebug } from "./components/LanguageDebug";
import { LanguageTest } from "./components/LanguageTest";

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
  }, []);

  return (
    <ErrorBoundary>
      <LanguageProvider>
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
              {import.meta.env.DEV && (
                <>
                  <LanguageDebug />
                  <LanguageTest />
                </>
              )}
              {(import.meta.env.DEV || (typeof window !== 'undefined' && localStorage.getItem('debug_webvitals') === 'true')) && (
                <CoreWebVitalsMonitor />
              )}
            </TooltipProvider>
          </ThemeProvider>
        </NotificationProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;
