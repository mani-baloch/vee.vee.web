import React from 'react';

export interface HoneycombPatternProps {
  variant?: 'hero-blue' | 'hero-peach' | 'dark-cta' | 'footer-subtle';
  className?: string;
}

export const HoneycombPattern: React.FC<HoneycombPatternProps> = ({
  variant = 'hero-blue',
  className = '',
}) => {
  if (variant === 'hero-blue') {
    return (
      <div className={`pointer-events-none select-none overflow-hidden ${className}`}>
        <svg
          viewBox="0 0 520 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <defs>
            {/* Hexagon Shading Gradients matching the mockup light-blue tones */}
            <linearGradient id="blueHexGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#DBE8FE" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#C0D7FD" stopOpacity="0.65" />
            </linearGradient>
            <linearGradient id="blueHexGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EBF2FE" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#D2E2FC" stopOpacity="0.5" />
            </linearGradient>
            <linearGradient id="blueHexGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#E2EEFE" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="blueHexGrad4" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#CDE0FD" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ADC8FA" stopOpacity="0.45" />
            </linearGradient>
          </defs>

          {/* Row 0 / Top */}
          <polygon
            points="48,2 88,24 88,68 48,90 8,68 8,24"
            fill="url(#blueHexGrad1)"
            stroke="#C5DCFE"
            strokeWidth="1.5"
          />
          <polygon
            points="136,2 176,24 176,68 136,90 96,68 96,24"
            fill="url(#blueHexGrad2)"
            stroke="#DBE8FE"
            strokeWidth="1.5"
          />
          <polygon
            points="224,2 264,24 264,68 224,90 184,68 184,24"
            fill="url(#blueHexGrad3)"
            stroke="#EBF2FE"
            strokeWidth="1.2"
            opacity="0.85"
          />
          <polygon
            points="312,2 352,24 352,68 312,90 272,68 272,24"
            fill="url(#blueHexGrad3)"
            stroke="#EBF2FE"
            strokeWidth="1"
            opacity="0.45"
          />

          {/* Row 1 (offset) */}
          <polygon
            points="92,72 132,94 132,138 92,160 52,138 52,94"
            fill="url(#blueHexGrad4)"
            stroke="#BBD6FD"
            strokeWidth="1.5"
          />
          <polygon
            points="180,72 220,94 220,138 180,160 140,138 140,94"
            fill="url(#blueHexGrad1)"
            stroke="#C8DEFE"
            strokeWidth="1.5"
          />
          <polygon
            points="268,72 308,94 308,138 268,160 228,138 228,94"
            fill="url(#blueHexGrad2)"
            stroke="#DBE8FE"
            strokeWidth="1.2"
            opacity="0.75"
          />
          <polygon
            points="356,72 396,94 396,138 356,160 316,138 316,94"
            fill="url(#blueHexGrad3)"
            stroke="#EBF2FE"
            strokeWidth="1"
            opacity="0.35"
          />

          {/* Row 2 */}
          <polygon
            points="48,142 88,164 88,208 48,230 8,208 8,164"
            fill="url(#blueHexGrad2)"
            stroke="#DBE8FE"
            strokeWidth="1.5"
          />
          <polygon
            points="136,142 176,164 176,208 136,230 96,208 96,164"
            fill="url(#blueHexGrad3)"
            stroke="#E2EEFE"
            strokeWidth="1.5"
            opacity="0.9"
          />
          <polygon
            points="224,142 264,164 264,208 224,230 184,208 184,164"
            fill="url(#blueHexGrad1)"
            stroke="#C8DEFE"
            strokeWidth="1.2"
            opacity="0.6"
          />
          <polygon
            points="312,142 352,164 352,208 312,230 272,208 272,164"
            fill="url(#blueHexGrad3)"
            stroke="#EBF2FE"
            strokeWidth="1"
            opacity="0.25"
          />

          {/* Row 3 (offset) */}
          <polygon
            points="92,212 132,234 132,278 92,300 52,278 52,234"
            fill="url(#blueHexGrad3)"
            stroke="#E2EEFE"
            strokeWidth="1.2"
            opacity="0.7"
          />
          <polygon
            points="180,212 220,234 220,278 180,300 140,278 140,234"
            fill="url(#blueHexGrad2)"
            stroke="#DBE8FE"
            strokeWidth="1.2"
            opacity="0.45"
          />
          <polygon
            points="268,212 308,234 308,278 268,300 228,278 228,234"
            fill="url(#blueHexGrad3)"
            stroke="#EBF2FE"
            strokeWidth="1"
            opacity="0.2"
          />

          {/* Row 4 */}
          <polygon
            points="48,282 88,304 88,348 48,370 8,348 8,304"
            fill="url(#blueHexGrad3)"
            stroke="#E2EEFE"
            strokeWidth="1"
            opacity="0.4"
          />
          <polygon
            points="136,282 176,304 176,348 136,370 96,348 96,304"
            fill="url(#blueHexGrad3)"
            stroke="#EBF2FE"
            strokeWidth="1"
            opacity="0.25"
          />
        </svg>
      </div>
    );
  }

  if (variant === 'footer-subtle') {
    return (
      <div className={`pointer-events-none select-none overflow-hidden ${className}`}>
        <svg
          className="w-full h-full opacity-40"
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
        >
          <pattern
            id="footerHexPattern"
            width="48"
            height="83.14"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M24 0 L48 13.86 L48 41.57 L24 55.43 L0 41.57 L0 13.86 Z M24 83.14 L48 69.28 L48 41.57 L24 27.71 L0 41.57 L0 69.28 Z"
              fill="none"
              stroke="#E2E8F0"
              strokeWidth="0.8"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#footerHexPattern)" />
        </svg>
      </div>
    );
  }

  // Dark CTA pattern
  return (
    <div className={`pointer-events-none select-none overflow-hidden ${className}`}>
      <svg
        className="w-full h-full opacity-20"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <pattern
          id="darkHexPattern"
          width="54"
          height="93.53"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M27 0 L54 15.59 L54 46.77 L27 62.35 L0 46.77 L0 15.59 Z M27 93.53 L54 77.94 L54 46.77 L27 31.18 L0 46.77 L0 77.94 Z"
            fill="none"
            stroke="#5B78BD"
            strokeWidth="1.2"
          />
        </pattern>
        <rect width="100%" height="100%" fill="url(#darkHexPattern)" />
      </svg>
    </div>
  );
};
