'use client';

import React from 'react';
import Image from 'next/image';
import { HoneycombPattern } from './HoneycombPattern';
import { Button } from './ui/button';

export interface CtaBannerProps {
  onOpenSignUp: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onOpenSignUp }) => {
  return (
    <section className="relative overflow-hidden bg-[#0D1924] text-white">
      {/* Decorative Dark Honeycomb Background Overlay */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <HoneycombPattern variant="dark-cta" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[360px] lg:min-h-[420px]">
          {/* Left Column: Heading + CTA Button */}
          <div className="lg:col-span-6 py-12 lg:py-16 flex flex-col items-start justify-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.2] mb-8 font-heading">
              Are You Ready to Take <br className="hidden sm:block" />
              Control of Your Career?
            </h2>

            <Button
              variant="cream"
              size="lg"
              onClick={onOpenSignUp}
              className="bg-[#FFFDF9] text-[#0F4A3E] font-bold text-sm sm:text-base px-8 py-3.5 rounded-full shadow-lg hover:bg-white hover:scale-105 transition-all flex items-center gap-2 group cursor-pointer border border-amber-100"
            >
              <span>Create Free Account</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Button>
          </div>

          {/* Right Column: Transparent PNG of Vet Tech with Golden Retriever seamlessly over Honeycomb */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end items-end h-full pt-4 lg:pt-0">
            <div className="relative w-full max-w-lg lg:max-w-none flex justify-center lg:justify-end">
              <Image
                src="/images/cta-vet.png"
                alt="Veterinary technician with tablet and happy golden retriever dog"
                width={680}
                height={460}
                className="w-full max-h-[380px] lg:max-h-[430px] object-contain object-bottom drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaBanner;
