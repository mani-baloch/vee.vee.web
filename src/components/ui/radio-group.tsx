import * as React from 'react';

export interface RadioOption {
  value: string;
  label: string;
}

export interface RadioGroupProps {
  name: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  inline?: boolean;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  options,
  value,
  onChange,
  className = '',
  inline = true,
}) => {
  return (
    <div
      className={`flex ${
        inline ? 'flex-wrap items-center gap-4 sm:gap-6' : 'flex-col gap-2'
      } ${className}`}
    >
      {options.map((option) => {
        const isChecked = value === option.value;
        return (
          <label
            key={option.value}
            className="inline-flex items-center gap-2 cursor-pointer select-none group text-sm text-gray-700 hover:text-gray-900"
          >
            <div className="relative flex items-center justify-center">
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={isChecked}
                onChange={() => onChange(option.value)}
                className="sr-only"
              />
              <div
                className={`w-4 h-4 rounded-full border transition-all flex items-center justify-center ${
                  isChecked
                    ? 'border-[#0F4A3E] bg-white'
                    : 'border-gray-300 group-hover:border-gray-400 bg-white'
                }`}
              >
                {isChecked && (
                  <div className="w-2 h-2 rounded-full bg-[#0F4A3E]" />
                )}
              </div>
            </div>
            <span className={isChecked ? 'font-medium text-gray-900' : ''}>
              {option.label}
            </span>
          </label>
        );
      })}
    </div>
  );
};
