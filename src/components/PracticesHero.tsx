'use client';

import React from 'react';
import { Button } from './ui/button';

export interface PracticesHeroProps {
  onOpenSignUp: () => void;
  onOpenBookDemo: () => void;
}

export const PracticesHero: React.FC<PracticesHeroProps> = ({
  onOpenSignUp,
  onOpenBookDemo,
}) => {
  return (
    <section className="relative z-10 pt-28 sm:pt-32 md:pt-36 pb-16 md:pb-24 lg:pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-6 flex flex-col items-start pt-2">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 border border-teal-200/90 shadow-xs mb-6 text-xs sm:text-sm text-gray-700">
              <span className="w-2 h-2 rounded-full bg-[#2D9B7C] inline-block" />
              <span>Prefer a guided walkthrough?</span>
              <button
                type="button"
                onClick={onOpenBookDemo}
                className="font-semibold text-teal-800 underline hover:text-teal-950 transition-colors cursor-pointer"
              >
                Book Demo
              </button>
            </div>

            {/* H1 Two-Line Headline */}
            <h1 className="text-5xl sm:text-6xl md:text-[64px] font-black tracking-tight leading-[1.05] mb-5 font-heading">
              <span className="text-gray-950 block">Vet/Tech</span>
              <span className="text-[#0F4A3E] block">Relief Coverage</span>
            </h1>

            {/* Subheading */}
            <p className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
              Hire local vets & techs. Post shifts.
            </p>

            {/* 3-Line Arrow Benefits List */}
            <div className="space-y-3 mb-8 text-base sm:text-lg text-gray-800">
              <div className="flex items-start gap-2.5">
                <span className="text-gray-900 font-bold text-lg leading-tight">→</span>
                <p>
                  Set your own <span className="font-bold text-gray-950">rates.</span>
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-gray-900 font-bold text-lg leading-tight">→</span>
                <p>
                  Tell us <span className="font-bold text-gray-950">when</span> you want to work.
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-gray-900 font-bold text-lg leading-tight">→</span>
                <p>
                  Get <span className="font-bold text-gray-950">coverage</span> from verified vets & techs.
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <Button
              variant="primary"
              size="lg"
              onClick={onOpenSignUp}
              className="bg-[#0F4A3E] hover:bg-[#0A352C] text-white text-base font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:translate-y-[-1px] transition-all flex items-center gap-3 group cursor-pointer"
            >
              <span>Create Free Account</span>
              <span className="transition-transform group-hover:translate-x-1.5 font-bold text-lg">→</span>
            </Button>
          </div>

          {/* Right Column: 3 Stacked Feature Cards */}
          <div className="lg:col-span-6 flex flex-col space-y-4 sm:space-y-5">
            
            {/* CARD 1 (Peach/Orange tint) */}
            <div className="relative rounded-2xl p-5 sm:p-6 bg-[#FFF4EA] border border-orange-200/70 shadow-[0_4px_24px_rgba(249,115,22,0.06)] hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 sm:gap-5">
                {/* Icon Box */}
                <div className="w-16 h-16 sm:w-18 sm:h-18 shrink-0 rounded-2xl bg-white border-2 border-[#F97316]/70 shadow-xs flex items-center justify-center p-3">
                  <svg
                    className="w-10 h-10 text-[#F97316]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
                    <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4" />
                    <circle cx="20" cy="10" r="2" />
                  </svg>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl font-black text-gray-950 mb-2 font-heading tracking-tight">
                    Last Minute Gapes? Covered.
                  </h3>
                  <div className="space-y-1.5 text-xs sm:text-sm font-medium text-gray-700">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#F97316] shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                      </svg>
                      <span>Post a shift or book instantly available vets</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#F97316] shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                      </svg>
                      <span>Large pool of verified veterinary professionals</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CARD 2 (Light Gray/Slate tint) */}
            <div className="relative rounded-2xl p-5 sm:p-6 bg-[#F4F7FA] border border-slate-200/80 shadow-[0_4px_24px_rgba(15,23,42,0.04)] hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 sm:gap-5">
                {/* Icon Box */}
                <div className="w-16 h-16 sm:w-18 sm:h-18 shrink-0 rounded-2xl bg-white border-2 border-slate-700 shadow-xs flex items-center justify-center p-3">
                  <svg
                    className="w-10 h-10 text-slate-800"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl font-black text-gray-950 mb-2 font-heading tracking-tight">
                    Hire Vets or Full Care-Teams
                  </h3>
                  <div className="space-y-1.5 text-xs sm:text-sm font-medium text-gray-700">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#F97316] shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                      </svg>
                      <span>Book solo vets or full vet-tech teams</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#F97316] shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                      </svg>
                      <span>Deliver peak clinic productivity</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CARD 3 (Light Pink/Red tint) */}
            <div className="relative rounded-2xl p-5 sm:p-6 bg-[#FFF0F2] border border-rose-200/70 shadow-[0_4px_24px_rgba(244,63,94,0.06)] hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 sm:gap-5">
                {/* Icon Box */}
                <div className="w-16 h-16 sm:w-18 sm:h-18 shrink-0 rounded-2xl bg-white border-2 border-[#F43F5E] shadow-xs flex items-center justify-center p-3">
                  <svg
                    className="w-10 h-10 text-[#F43F5E]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v10" />
                    <path d="M14.5 9.5a2.5 2.5 0 0 0-5 0c0 2.5 5 1.5 5 4a2.5 2.5 0 0 1-5 0" />
                    <path d="M19 7v4" />
                    <path d="M17 9h4" />
                  </svg>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl font-black text-gray-950 mb-2 font-heading tracking-tight">
                    Set Your Own Rate
                  </h3>
                  <div className="space-y-1.5 text-xs sm:text-sm font-medium text-gray-700">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#F97316] shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                      </svg>
                      <span>Full transparency on what vets & techs earn</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#F97316] shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                      </svg>
                      <span>Real-time pricing insights</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default PracticesHero;
