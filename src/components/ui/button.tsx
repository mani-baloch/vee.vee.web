import * as React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'cream' | 'link';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', children, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer';

    const variants = {
      primary:
        'bg-[#0F4A3E] text-white hover:bg-[#0A352C] active:bg-[#07241E] focus:ring-[#0F4A3E] shadow-sm',
      secondary:
        'bg-[#2D9B7C] text-white hover:bg-[#258569] active:bg-[#1C6952] focus:ring-[#2D9B7C] shadow-sm',
      outline:
        'border border-[#0F4A3E] text-[#0F4A3E] bg-white hover:bg-[#EAF7F2] focus:ring-[#0F4A3E]',
      cream:
        'bg-[#FFFDF9] text-[#0F4A3E] border border-[#E5E7EB] hover:bg-white hover:border-[#0F4A3E] focus:ring-[#0F4A3E] shadow-md',
      ghost:
        'text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:ring-gray-300',
      link:
        'text-[#0F4A3E] hover:underline p-0 h-auto font-normal focus:ring-0',
    };

    const sizes = {
      sm: 'text-xs px-3.5 py-1.5 rounded-full',
      md: 'text-sm px-5 py-2.5 rounded-full',
      lg: 'text-base px-6 py-3 rounded-full',
      icon: 'p-2 rounded-full',
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
