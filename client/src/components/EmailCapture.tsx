import { useState, useEffect } from "react";
import { X, Mail, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNotifications } from "@/hooks/useNotifications";

const DISMISSED_KEY = "emailCaptureDismissed";
const SUBSCRIBED_KEY = "emailCaptureSubscribed";

export default function EmailCapture() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasDismissed, setHasDismissed] = useState(false);
  const [hasSubscribed, setHasSubscribed] = useState(false);
  const notifications = useNotifications();

  useEffect(() => {
    if (typeof window === "undefined") return;

    setHasDismissed(sessionStorage.getItem(DISMISSED_KEY) === "true");
    setHasSubscribed(sessionStorage.getItem(SUBSCRIBED_KEY) === "true");
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setHasDismissed(true);

    if (typeof window !== "undefined") {
      sessionStorage.setItem(DISMISSED_KEY, "true");
    }
  };

  // Detect exit intent once per session
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (hasDismissed || hasSubscribed) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !isOpen && !isSubmitted) {
        setIsOpen(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [hasDismissed, hasSubscribed, isOpen, isSubmitted]);

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full mx-4 overflow-hidden">
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
