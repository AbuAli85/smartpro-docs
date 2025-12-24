import { Link } from "wouter";

interface LogoProps {
  showTagline?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function Logo({ showTagline = false, className = "", size = "md" }: LogoProps) {
  const sizeClasses = {
    sm: {
      container: "gap-2",
      smart: "text-2xl",
      pro: "text-xl",
      circle: "w-8 h-8",
      tagline: "text-xs px-2 py-0.5",
    },
    md: {
      container: "gap-3",
      smart: "text-4xl",
      pro: "text-3xl",
      circle: "w-12 h-12",
      tagline: "text-sm px-3 py-1",
    },
    lg: {
      container: "gap-4",
      smart: "text-6xl",
      pro: "text-5xl",
      circle: "w-16 h-16",
      tagline: "text-base px-4 py-1.5",
    },
  };

  const currentSize = sizeClasses[size];

  return (
    <Link href="/">
      <div className={`flex flex-col items-start ${className}`}>
        <div className={`flex items-center ${currentSize.container}`}>
          {/* Smart PRO Text with Running Man */}
          <div className="flex items-center gap-2">
            {/* Smart Text with Gradient */}
            <div className="relative">
              <span
                className={`${currentSize.smart} leading-none`}
                style={{
                  background: "linear-gradient(135deg, #dc2626 0%, #16a34a 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  fontFamily: "'Brush Script MT', 'Lucida Handwriting', 'Dancing Script', cursive",
                  fontWeight: "700",
                  fontStyle: "normal",
                  display: "inline-block",
                }}
              >
                <span style={{ fontSize: "1.3em", display: "inline-block" }}>S</span>
                <span>mart</span>
              </span>
            </div>

            {/* PRO Text */}
            <span className={`${currentSize.pro} font-black text-black dark:text-white leading-none`}>
              PRO
            </span>

            {/* Running Man in Green Circle */}
            <div className="relative">
              <div
                className={`${currentSize.circle} rounded-full bg-[#16a34a] flex items-center justify-center relative overflow-visible`}
              >
                {/* Motion Lines (behind the circle) */}
                <div className="absolute -left-2 top-1/2 -translate-y-1/2 flex gap-0.5">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-1 h-3 bg-[#dc2626] rounded-full"
                      style={{
                        opacity: 0.8 - i * 0.2,
                      }}
                    />
                  ))}
                </div>

                {/* Running Man Silhouette */}
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full"
                  style={{ filter: "brightness(0) invert(1)" }}
                >
                  {/* Head */}
                  <circle cx="50" cy="28" r="11" fill="white" />
                  {/* Cap/Kufi - textured cap */}
                  <ellipse cx="50" cy="22" rx="9" ry="5" fill="white" />
                  <path d="M 45 20 Q 50 18 55 20" stroke="white" strokeWidth="1" fill="none" />
                  {/* Body/Tunic - long-sleeved thobe */}
                  <rect x="42" y="38" width="16" height="38" rx="2" fill="white" />
                  {/* Left arm (behind, extended back) */}
                  <ellipse
                    cx="38"
                    cy="45"
                    rx="5"
                    ry="18"
                    fill="white"
                    transform="rotate(-25 38 45)"
                  />
                  {/* Right arm (forward, running motion) */}
                  <ellipse
                    cx="62"
                    cy="48"
                    rx="5"
                    ry="20"
                    fill="white"
                    transform="rotate(35 62 48)"
                  />
                  {/* Left leg (behind) */}
                  <ellipse
                    cx="46"
                    cy="76"
                    rx="5"
                    ry="22"
                    fill="white"
                    transform="rotate(-20 46 76)"
                  />
                  {/* Right leg (forward, running) */}
                  <ellipse
                    cx="54"
                    cy="78"
                    rx="5"
                    ry="22"
                    fill="white"
                    transform="rotate(25 54 78)"
                  />
                  {/* Beard - light brown beard */}
                  <ellipse cx="50" cy="33" rx="6" ry="4" fill="white" />
                  <path
                    d="M 46 32 Q 50 35 54 32"
                    stroke="white"
                    strokeWidth="1.5"
                    fill="none"
                  />
                  {/* Smiling expression */}
                  <path
                    d="M 45 36 Q 50 39 55 36"
                    stroke="white"
                    strokeWidth="1"
                    fill="none"
                  />
                  {/* Ear */}
                  <ellipse cx="58" cy="30" rx="2" ry="3" fill="white" />
                </svg>

                {/* Motion Lines (in front, extending from O) */}
                <div className="absolute -right-2 top-1/2 -translate-y-1/2 flex gap-0.5">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-1 h-3 bg-[#dc2626] rounded-full"
                      style={{
                        opacity: 0.9 - i * 0.25,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tagline Banner */}
        {showTagline && (
          <div
            className={`${currentSize.tagline} rounded-full text-white font-bold uppercase tracking-wide mt-1`}
            style={{
              background: "linear-gradient(90deg, #dc2626 0%, #16a34a 100%)",
            }}
          >
            ONE-STATION BUSINESS SOLUTIONS!
          </div>
        )}
      </div>
    </Link>
  );
}

