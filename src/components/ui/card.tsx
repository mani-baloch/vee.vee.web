import * as React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'mint' | 'peach' | 'dark';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', variant = 'default', children, ...props }, ref) => {
    const variants = {
      default: 'bg-white border border-gray-200',
      mint: 'bg-[#EAF7F2] border-2 border-[#2D9B7C]/40',
      peach: 'bg-[#FFF5ED] border-2 border-[#FDBA74]/70',
      dark: 'bg-[#0D1924] border border-gray-800 text-white',
    };

    return (
      <div
        ref={ref}
        className={`rounded-2xl shadow-sm transition-all duration-200 ${variants[variant]} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
