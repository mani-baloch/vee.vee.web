import React from 'react';

export interface HoneycombPatternProps {
  variant?: 'hero-peach' | 'dark-cta' | 'subtle';
  className?: string;
}

export const HoneycombPattern: React.FC<HoneycombPatternProps> = ({
  variant = 'hero-peach',
  className = '',
}) => {
  if (variant === 'hero-peach') {
    return (
      <div className={`pointer-events-none select-none overflow-hidden ${className}`}>
        <svg
          viewBox="0 0 450 350"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full opacity-90"
        >
          <defs>
            <linearGradient id="honeyGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FDE68A" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="honeyGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FED7AA" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#FDBA74" stopOpacity="0.5" />
            </linearGradient>
            <linearGradient id="honeyGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFBEB" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#FEF3C7" stopOpacity="0.6" />
            </linearGradient>
          </defs>

          {/* Top Row Honeycombs */}
          {/* Hex 1 */}
          <polygon
            points="50,10 90,30 90,75 50,95 10,75 10,30"
            fill="url(#honeyGrad1)"
            stroke="#FDE68A"
            strokeWidth="1.5"
          />
          {/* Hex 2 */}
          <polygon
            points="135,10 175,30 175,75 135,95 95,75 95,30"
            fill="url(#honeyGrad2)"
            stroke="#FED7AA"
            strokeWidth="1.5"
          />
          {/* Hex 3 */}
          <polygon
            points="220,10 260,30 260,75 220,95 180,75 180,30"
            fill="url(#honeyGrad3)"
            stroke="#FEF3C7"
            strokeWidth="1"
          />
          {/* Hex 4 */}
          <polygon
            points="305,10 345,30 345,75 305,95 265,75 265,30"
            fill="url(#honeyGrad2)"
            stroke="#FED7AA"
            strokeWidth="1"
            opacity="0.6"
          />

          {/* Row 2 (offset) */}
          {/* Hex 5 */}
          <polygon
            points="92,78 132,98 132,143 92,163 52,143 52,98"
            fill="url(#honeyGrad2)"
            stroke="#FED7AA"
            strokeWidth="1.5"
          />
          {/* Hex 6 */}
          <polygon
            points="177,78 217,98 217,143 177,163 137,143 137,98"
            fill="url(#honeyGrad1)"
            stroke="#FDE68A"
            strokeWidth="1.5"
          />
          {/* Hex 7 */}
          <polygon
            points="262,78 302,98 302,143 262,163 222,143 222,98"
            fill="url(#honeyGrad3)"
            stroke="#FEF3C7"
            strokeWidth="1"
            opacity="0.8"
          />
          {/* Hex 8 */}
          <polygon
            points="347,78 387,98 387,143 347,163 307,143 307,98"
            fill="url(#honeyGrad2)"
            stroke="#FED7AA"
            strokeWidth="1"
            opacity="0.4"
          />

          {/* Row 3 */}
          {/* Hex 9 */}
          <polygon
            points="50,146 90,166 90,211 50,231 10,211 10,166"
            fill="url(#honeyGrad3)"
            stroke="#FEF3C7"
            strokeWidth="1.5"
            opacity="0.85"
          />
          {/* Hex 10 */}
          <polygon
            points="135,146 175,166 175,211 135,231 95,211 95,166"
            fill="url(#honeyGrad2)"
            stroke="#FED7AA"
            strokeWidth="1.5"
            opacity="0.75"
          />
          {/* Hex 11 */}
          <polygon
            points="220,146 260,166 260,211 220,231 180,211 180,166"
            fill="url(#honeyGrad1)"
            stroke="#FDE68A"
            strokeWidth="1"
            opacity="0.5"
          />

          {/* Row 4 (offset) */}
          {/* Hex 12 */}
          <polygon
            points="92,214 132,234 132,279 92,299 52,279 52,234"
            fill="url(#honeyGrad2)"
            stroke="#FED7AA"
            strokeWidth="1"
            opacity="0.5"
          />
          {/* Hex 13 */}
          <polygon
            points="177,214 217,234 217,279 177,299 137,279 137,234"
            fill="url(#honeyGrad3)"
            stroke="#FEF3C7"
            strokeWidth="1"
            opacity="0.3"
          />
        </svg>
      </div>
    );
  }

  // Dark CTA pattern
  return (
    <div className={`pointer-events-none select-none overflow-hidden ${className}`}>
      <svg
        className="w-full h-full opacity-25"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <pattern
          id="darkHexPattern"
          width="56"
          height="97"
          patternUnits="userSpaceOnUse"
          patternTransform="scale(0.8)"
        >
          <path
            d="M28 0 L56 16.16 L56 48.49 L28 64.65 L0 48.49 L0 16.16 Z M28 97 L56 80.84 L56 48.51 L28 32.35 L0 48.51 L0 80.84 Z"
            fill="none"
            stroke="#475569"
            strokeWidth="1.2"
          />
        </pattern>
        <rect width="100%" height="100%" fill="url(#darkHexPattern)" />
      </svg>
    </div>
  );
};
