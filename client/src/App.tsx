import { lazy, Suspense } from "react";
import { NotificationProvider } from "./contexts/NotificationContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";

// Lazy load pages to reduce initial bundle
const ProvidersPage = lazy(() => import("./pages/ProvidersPage"));
const ClientsPage = lazy(() => import("./pages/ClientsPage"));
const About = lazy(() => import("./pages/About"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Features = lazy(() => import("./pages/Features"));
const Contact = lazy(() => import("./pages/Contact"));
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

import { ToastContainer } from "./components/ToastContainer";
import LiveChat from "./components/LiveChat";
import EmailCapture from "./components/EmailCapture";

// Loading fallback component
function PageLoader() {
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
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path={"/"} component={Home} />
        <Route path={"/providers"} component={ProvidersPage} />
        <Route path={"/clients"} component={ClientsPage} />
        <Route path={"/about"} component={About} />
        <Route path={"/pricing"} component={Pricing} />
        <Route path={"/features"} component={Features} />
        <Route path={"/contact"} component={Contact} />
        <Route path={"/blog"} component={Blog} />
        <Route path={"/blog/:id"} component={BlogArticle} />
        <Route path={"/docs"} component={DocsIndex} />
        <Route path={"/docs/getting-started"} component={GettingStarted} />
        <Route path={"/docs/product-overview"} component={ProductOverview} />
        <Route path={"/docs/features"} component={DocFeatures} />
        <Route path={"/docs/architecture"} component={Architecture} />
        <Route path={"/docs/business-plan"} component={BusinessPlan} />
        <Route path={"/docs/api"} component={API} />
        <Route path={"/docs/faq"} component={FAQ} />
        <Route path={"/docs/support"} component={Support} />
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
  return (
    <ErrorBoundary>
      <NotificationProvider>
        <ThemeProvider defaultTheme="light">
          <TooltipProvider>
            <Router />
            <ToastContainer />
            <LiveChat />
            <EmailCapture />
          </TooltipProvider>
        </ThemeProvider>
      </NotificationProvider>
    </ErrorBoundary>
  );
}

export default App;
