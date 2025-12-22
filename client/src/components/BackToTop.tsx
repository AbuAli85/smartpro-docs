import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface BackToTopProps {
  className?: string;
  threshold?: number; // Scroll threshold in pixels
}

export default function BackToTop({ className, threshold = 400 }: BackToTopProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > threshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, [threshold]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-6 right-6 z-50",
        "flex items-center justify-center",
        "w-12 h-12 rounded-full",
        "bg-blue-600 hover:bg-blue-700 text-white",
        "shadow-lg shadow-blue-900/30",
        "transition-all duration-300",
        "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
        "hover:scale-110 active:scale-95",
        className
      )}
      aria-label="Back to top"
      title="Back to top"
    >
      <ArrowUp className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}

