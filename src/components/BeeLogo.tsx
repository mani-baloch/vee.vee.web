import React from 'react';

export interface BeeLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  theme?: 'dark' | 'light';
}

export const BeeLogo: React.FC<BeeLogoProps> = ({
  className = '',
  size = 'md',
  theme = 'dark',
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  const textColor = theme === 'light' ? 'text-white' : 'text-[#0F4A3E]';

  return (
    <div className={`inline-flex items-center gap-2 select-none ${className}`}>
      {/* Bee SVG Icon */}
      <svg
        className={iconSizes[size]}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Left Wing */}
        <ellipse
          cx="28"
          cy="38"
          rx="18"
          ry="11"
          transform="rotate(-30 28 38)"
          fill="#FED7AA"
          fillOpacity="0.85"
          stroke="#D97706"
          strokeWidth="3.5"
        />
        <ellipse
          cx="28"
          cy="38"
          rx="11"
          ry="6"
          transform="rotate(-30 28 38)"
          stroke="#F59E0B"
          strokeWidth="2"
          strokeDasharray="2 3"
        />

        {/* Right Wing */}
        <ellipse
          cx="72"
          cy="38"
          rx="18"
          ry="11"
          transform="rotate(30 72 38)"
          fill="#FED7AA"
          fillOpacity="0.85"
          stroke="#D97706"
          strokeWidth="3.5"
        />
        <ellipse
          cx="72"
          cy="38"
          rx="11"
          ry="6"
          transform="rotate(30 72 38)"
          stroke="#F59E0B"
          strokeWidth="2"
          strokeDasharray="2 3"
        />

        {/* Bee Body (Striped Oval) */}
        <ellipse cx="50" cy="56" rx="22" ry="28" fill="#FBBF24" stroke="#1E293B" strokeWidth="4" />
        
        {/* Dark Stripes */}
        <path
          d="M30 46 C 40 40, 60 40, 70 46"
          stroke="#1E293B"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M28 57 C 39 52, 61 52, 72 57"
          stroke="#1E293B"
          strokeWidth="5.5"
          strokeLinecap="round"
        />
        <path
          d="M32 68 C 42 64, 58 64, 68 68"
          stroke="#1E293B"
          strokeWidth="5"
          strokeLinecap="round"
        />

        {/* Head */}
        <circle cx="50" cy="30" r="14" fill="#1E293B" />
        
        {/* Cute Eyes */}
        <circle cx="45" cy="28" r="2.5" fill="#FFFFFF" />
        <circle cx="55" cy="28" r="2.5" fill="#FFFFFF" />

        {/* Antennae */}
        <path
          d="M44 20 Q 36 10 32 12"
          stroke="#1E293B"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <circle cx="31" cy="12" r="3.5" fill="#F59E0B" stroke="#1E293B" strokeWidth="1.5" />
        
        <path
          d="M56 20 Q 64 10 68 12"
          stroke="#1E293B"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <circle cx="69" cy="12" r="3.5" fill="#F59E0B" stroke="#1E293B" strokeWidth="1.5" />

        {/* Stinger */}
        <path
          d="M48 83 L50 90 L52 83 Z"
          fill="#1E293B"
        />
      </svg>

      {/* Wordmark */}
      <span className={`font-black tracking-tight ${textSizes[size]} ${textColor} font-heading flex items-center`}>
        vee<span className="text-[#2D9B7C]">.</span>vet
      </span>
    </div>
  );
};
