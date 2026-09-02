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
    <section className="relative overflow-hidden bg-[#162B75] text-white">
      {/* Decorative Royal Blue Honeycomb Background Overlay */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <HoneycombPattern variant="dark-cta" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end min-h-[360px] lg:min-h-[440px]">
          
          {/* Left Column: Heading + CTA Button */}
          <div className="lg:col-span-6 py-12 sm:py-16 md:py-20 flex flex-col items-start justify-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.15] mb-8 font-heading">
              Are You Ready to Take <br />
              Control of Your Career?
            </h2>

            <Button
              variant="outline"
              size="lg"
              onClick={onOpenSignUp}
              className="bg-[#FFFDF7] text-[#0F4A3E] font-extrabold text-sm sm:text-base px-8 py-4 rounded-full shadow-lg hover:bg-white hover:scale-105 transition-all flex items-center gap-2.5 group cursor-pointer border border-white"
            >
              <span>Create Free Account</span>
              <span className="transition-transform group-hover:translate-x-1.5 font-bold text-lg">→</span>
            </Button>
          </div>

          {/* Right Column: Female Vet holding Yorkie puppy with blue bow, bottom aligned */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end items-end h-full">
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-[480px] flex justify-center lg:justify-end items-end">
              <Image
                src="/images/practices-cta-vet.png"
                alt="Female veterinarian in white coat holding a cute Yorkshire Terrier dog with blue bow"
                width={500}
                height={520}
                priority
                className="w-auto h-[320px] sm:h-[400px] md:h-[450px] lg:h-[480px] object-contain object-bottom drop-shadow-2xl translate-y-1"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CtaBanner;

