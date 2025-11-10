import { useState, useEffect } from "react";
import { X, Mail, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNotifications } from "@/hooks/useNotifications";

const DISMISSED_KEY = "emailCaptureDismissed";
const SUBSCRIBED_KEY = "emailCaptureSubscribed";
const LAST_SHOWN_KEY = "emailCaptureLastShown";

// Configuration - DISABLED to prevent interruptions
const CONFIG = {
  ENABLED: false, // DISABLED - Set to true to re-enable the modal
  DELAY_BEFORE_SHOW: 60000, // Wait 60 seconds (1 minute) before showing
  MIN_TIME_BETWEEN_SHOWS: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
  SCROLL_THRESHOLD: 60, // Show after 60% scroll (user is engaged)
  ENABLE_EXIT_INTENT: false, // Disable exit intent trigger (too disruptive)
};

export default function EmailCapture() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasDismissed, setHasDismissed] = useState(false);
  const [hasSubscribed, setHasSubscribed] = useState(false);
  const [hasScrolledEnough, setHasScrolledEnough] = useState(false);
  const notifications = useNotifications();

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    // Check if modal is completely disabled
    if (!CONFIG.ENABLED) {
      setHasDismissed(true);
      return;
    }

    setHasDismissed(sessionStorage.getItem(DISMISSED_KEY) === "true");
    setHasSubscribed(sessionStorage.getItem(SUBSCRIBED_KEY) === "true");
    
    // Check if we've shown it recently
    const lastShown = localStorage.getItem(LAST_SHOWN_KEY);
    if (lastShown) {
      const timeSinceLastShow = Date.now() - parseInt(lastShown);
      if (timeSinceLastShow < CONFIG.MIN_TIME_BETWEEN_SHOWS) {
        setHasDismissed(true); // Don't show if shown within last 7 days
      }
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setHasDismissed(true);

    if (typeof window !== "undefined") {
      sessionStorage.setItem(DISMISSED_KEY, "true");
      localStorage.setItem(LAST_SHOWN_KEY, Date.now().toString());
    }
  };

  // Track scroll depth
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (hasDismissed || hasSubscribed) return;

    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercent >= CONFIG.SCROLL_THRESHOLD) {
        setHasScrolledEnough(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasDismissed, hasSubscribed]);

  // Show modal after delay + scroll (much less intrusive)
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (hasDismissed || hasSubscribed || isOpen) return;

    // Wait for both conditions: time delay AND scroll
    const timer = setTimeout(() => {
      if (hasScrolledEnough) {
        setIsOpen(true);
        if (typeof window !== "undefined") {
          localStorage.setItem(LAST_SHOWN_KEY, Date.now().toString());
        }
      }
    }, CONFIG.DELAY_BEFORE_SHOW);

    return () => clearTimeout(timer);
  }, [hasDismissed, hasSubscribed, isOpen, hasScrolledEnough]);

  // Optional: Exit intent (disabled by default)
  useEffect(() => {
    if (!CONFIG.ENABLE_EXIT_INTENT) return;
    if (typeof window === "undefined") return;
    if (hasDismissed || hasSubscribed) return;

    let exitIntentShown = false;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !isOpen && !isSubmitted && !exitIntentShown && hasScrolledEnough) {
        setIsOpen(true);
        exitIntentShown = true;
        if (typeof window !== "undefined") {
          localStorage.setItem(LAST_SHOWN_KEY, Date.now().toString());
        }
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [hasDismissed, hasSubscribed, isOpen, isSubmitted, hasScrolledEnough]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      notifications.error("Error", "Please enter a valid email");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitted(true);
    setHasSubscribed(true);
    notifications.success("Success!", "Check your email for exclusive offers");

    if (typeof window !== "undefined") {
      sessionStorage.setItem(SUBSCRIBED_KEY, "true");
    }

    // Close popup after 3 seconds
    setTimeout(() => {
      handleClose();
      setIsSubmitted(false);
      setEmail("");
    }, 3000);
    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={handleClose}
    >
      <div 
        className="bg-white rounded-lg shadow-2xl max-w-md w-full mx-4 overflow-hidden animate-in slide-in-from-bottom-4 duration-500"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full transition-colors z-10"
          aria-label="Close"
        >
          <X className="h-5 w-5 text-gray-500" />
        </button>

        {!isSubmitted ? (
          <>
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 text-center">
              <Mail className="h-12 w-12 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Don't Miss Out!</h2>
              <p className="text-blue-100">
                Get exclusive offers and early access to new features
              </p>
            </div>

            {/* Content */}
            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    disabled={isLoading}
                  />
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-gray-700">
                    ✓ Exclusive provider tips<br />
                    ✓ Early access to new features<br />
                    ✓ Special promotions & discounts<br />
                    ✓ No spam, unsubscribe anytime
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 font-semibold"
                >
                  {isLoading ? "Subscribing..." : "Get Exclusive Offers"}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </form>
            </div>
          </>
        ) : (
          /* Success State */
          <div className="p-8 text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle2 className="h-16 w-16 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Success!</h2>
            <p className="text-gray-600 mb-4">
              Check your email for exclusive offers and early access to new features.
            </p>
            <p className="text-sm text-gray-500">
              Redirecting you back...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
