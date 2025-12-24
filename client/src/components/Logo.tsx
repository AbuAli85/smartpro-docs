import { Link } from "wouter";
import { OptimizedImage } from "./OptimizedImage";

interface LogoProps {
  showTagline?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function Logo({ showTagline = false, className = "", size = "md" }: LogoProps) {
  const sizeClasses = {
    sm: {
      height: "h-10 sm:h-12",
      maxWidth: "max-w-[180px] sm:max-w-[220px]",
    },
    md: {
      height: "h-14 sm:h-16",
      maxWidth: "max-w-[240px] sm:max-w-[280px]",
    },
    lg: {
      height: "h-20 sm:h-24",
      maxWidth: "max-w-[320px] sm:max-w-[400px]",
    },
  };

  const currentSize = sizeClasses[size];

  return (
    <Link href="/">
      <div className={`flex flex-col items-start ${className}`}>
        <OptimizedImage
          src="/Logo.png"
          alt="Smart PRO - ONE-STATION BUSINESS SOLUTIONS!"
          className={`${currentSize.height} ${currentSize.maxWidth} w-auto object-contain`}
          priority={true}
          objectFit="contain"
          onError={(e) => {
            // Fallback if Logo.png doesn't exist, try other common names
            const target = e.target as HTMLImageElement;
            if (target.src.includes('Logo.png')) {
              target.src = '/logo.png';
            } else if (target.src.includes('logo.png')) {
              target.src = '/Logo.svg';
            } else if (target.src.includes('Logo.svg')) {
              target.src = '/logo.svg';
            } else if (target.src.includes('logo.svg')) {
              target.src = '/Logo.jpg';
            } else if (target.src.includes('Logo.jpg')) {
              target.src = '/logo.jpg';
            }
          }}
        />
      </div>
    </Link>
  );
}

