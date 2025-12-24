import { Link } from "wouter";

interface LogoProps {
  showTagline?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function Logo({ showTagline = false, className = "", size = "md" }: LogoProps) {
  const sizeClasses = {
    sm: {
      height: "h-12",
      width: "w-auto",
    },
    md: {
      height: "h-16",
      width: "w-auto",
    },
    lg: {
      height: "h-24",
      width: "w-auto",
    },
  };

  const currentSize = sizeClasses[size];

  return (
    <Link href="/">
      <div className={`flex flex-col items-start ${className}`}>
        <img
          src="/logo.png"
          alt="Smart PRO - ONE-STATION BUSINESS SOLUTIONS!"
          className={`${currentSize.height} ${currentSize.width} object-contain`}
          onError={(e) => {
            // Fallback if logo.png doesn't exist, try other common names
            const target = e.target as HTMLImageElement;
            if (target.src.includes('logo.png')) {
              target.src = '/logo.svg';
            } else if (target.src.includes('logo.svg')) {
              target.src = '/logo.jpg';
            }
          }}
        />
      </div>
    </Link>
  );
}

