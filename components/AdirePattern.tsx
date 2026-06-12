"use client";

interface AdirePatternProps {
  className?: string;
  opacity?: number;
}

export default function AdirePattern({ className = "", opacity = 0.05 }: AdirePatternProps) {
  return (
    <svg
      className={`pointer-events-none select-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      style={{ opacity }}
      aria-hidden="true"
    >
      <defs>
        <pattern id="adire" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          {/* Outer diamond */}
          <polygon points="30,4 56,30 30,56 4,30" fill="none" stroke="currentColor" strokeWidth="1.2" />
          {/* Inner diamond */}
          <polygon points="30,14 46,30 30,46 14,30" fill="none" stroke="currentColor" strokeWidth="0.8" />
          {/* Center dot */}
          <circle cx="30" cy="30" r="2.5" fill="currentColor" />
          {/* Corner dots */}
          <circle cx="4" cy="30" r="1.5" fill="currentColor" />
          <circle cx="56" cy="30" r="1.5" fill="currentColor" />
          <circle cx="30" cy="4" r="1.5" fill="currentColor" />
          <circle cx="30" cy="56" r="1.5" fill="currentColor" />
          {/* Cross hatching inside inner diamond */}
          <line x1="30" y1="14" x2="30" y2="46" stroke="currentColor" strokeWidth="0.5" />
          <line x1="14" y1="30" x2="46" y2="30" stroke="currentColor" strokeWidth="0.5" />
          {/* Mid-point marks on outer diamond */}
          <line x1="43" y1="17" x2="47" y2="13" stroke="currentColor" strokeWidth="0.8" />
          <line x1="43" y1="43" x2="47" y2="47" stroke="currentColor" strokeWidth="0.8" />
          <line x1="17" y1="43" x2="13" y2="47" stroke="currentColor" strokeWidth="0.8" />
          <line x1="17" y1="17" x2="13" y2="13" stroke="currentColor" strokeWidth="0.8" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#adire)" />
    </svg>
  );
}
