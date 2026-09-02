'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from './ui/button';

export interface HeroProps {
  onOpenSignUp: () => void;
  onOpenBookDemo: () => void;
  onScrollToHowItWorks: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenSignUp,
  onOpenBookDemo,
  onScrollToHowItWorks,
}) => {
  return (
    <section className="relative z-10 pt-24 sm:pt-28 md:pt-32 pb-16 md:pb-24 lg:pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Content */}
          <div className="lg:col-span-7 flex flex-col items-start pt-2 lg:pt-4">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 border border-teal-200/80 shadow-xs mb-6 text-xs sm:text-sm text-gray-700">
              <span className="w-2 h-2 rounded-full bg-[#2D9B7C] animate-pulse" />
              <span>Prefer a guided walkthrough?</span>
              <button
                type="button"
                onClick={onOpenBookDemo}
                className="font-semibold text-teal-800 underline hover:text-teal-950 transition-colors ml-0.5 cursor-pointer"
              >
                Book Demo
              </button>
            </div>

            {/* H1 Two-Line Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-gray-950 leading-[1.1] mb-5 font-heading">
              Relief Shifts <br />
              <span className="text-[#2D9B7C]">Made Simple!</span>
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl font-bold text-gray-900 mb-6">
              One platform for practices, vets, and techs
            </p>

            {/* 3-Line Arrow Benefits List */}
            <div className="space-y-2.5 mb-8 text-sm sm:text-base text-gray-800">
              <div className="flex items-start gap-2.5">
                <span className="text-[#0F4A3E] font-bold text-base">→</span>
                <p>
                  Tell us what you <span className="font-bold text-gray-950">need.</span>
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-[#0F4A3E] font-bold text-base">→</span>
                <p>
                  Tell us <span className="font-bold text-gray-950">when</span> you want to work.
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-[#0F4A3E] font-bold text-base">→</span>
                <p>
                  <span className="font-bold text-gray-950">vee.vet</span> brings the right opportunities and people together.
                </p>
              </div>
            </div>

            {/* Two CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <Button
                variant="primary"
                size="lg"
                onClick={onOpenSignUp}
                className="px-7 py-3.5 text-sm sm:text-base font-semibold shadow-md hover:shadow-lg hover:translate-y-[-1px] transition-all rounded-full flex items-center gap-2 group w-full sm:w-auto"
              >
                <span>Create Free Account</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={onScrollToHowItWorks}
                className="px-7 py-3.5 text-sm sm:text-base font-semibold border-gray-400 text-gray-800 hover:border-[#0F4A3E] hover:text-[#0F4A3E] rounded-full flex items-center gap-2 w-full sm:w-auto"
              >
                <span>How it Works</span>
                <span className="text-xs">▶</span>
              </Button>
            </div>
          </div>

          {/* Right Column: Hero Image of Vet + Tech + Golden Retriever */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            <div className="relative w-full max-w-md lg:max-w-none">
              {/* Subtle ambient backglow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-200/30 to-teal-200/30 rounded-3xl filter blur-2xl -z-10 transform scale-95" />

              {/* Main Illustration Container */}
              <div className="relative flex justify-center items-center">
                <Image
                  src="/images/hero-vets.png"
                  alt="Friendly veterinarian and vet technician with a happy golden retriever dog"
                  width={640}
                  height={520}
                  priority
                  unoptimized
                  className="w-full max-w-[460px] h-auto object-contain drop-shadow-2xl transform hover:scale-[1.02] transition-transform duration-500"
                />
              </div>

              {/* Floating trust badge 1 */}
              <div className="absolute -bottom-4 -left-4 sm:bottom-4 sm:-left-6 bg-white/95 backdrop-blur-md rounded-xl p-3 shadow-lg border border-gray-100 flex items-center gap-3 animate-float select-none">
                <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-700 font-bold text-lg">
                  ⚡
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-900">98% Shift Fill Rate</div>
                  <div className="text-[11px] text-gray-500">Over 50,000+ hours staffed</div>
                </div>
              </div>

              {/* Floating trust badge 2 */}
              <div className="hidden sm:flex absolute -top-4 -right-4 bg-white/95 backdrop-blur-md rounded-xl p-3 shadow-lg border border-gray-100 items-center gap-2 select-none">
                <div className="flex text-amber-400 text-xs">★★★★★</div>
                <div className="text-xs font-bold text-gray-800">4.9/5 Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;


