'use client';

import React, { useState } from 'react';
import { Check, X, Sparkles, Shield, Heart, ArrowRight } from 'lucide-react';
import { WELLNESS_PLANS, PricingPlan } from '@/data/vetData';

interface WellnessPlansProps {
  onOpenBooking: (serviceId?: string) => void;
}

export default function WellnessPlans({ onOpenBooking }: WellnessPlansProps) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <section id="pricing" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-teal-50 text-teal-700 border border-teal-200">
            <Heart className="w-3.5 h-3.5 text-teal-600 fill-teal-600" />
            vee.vet Wellness Club
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Predictable, Affordable Health Plans for Every Pet
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Keep your pets protected with bundled preventive care, unlimited routine examinations, dental cleanings, and exclusive member discounts.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="inline-flex items-center bg-slate-100 p-1.5 rounded-2xl border border-slate-200 mt-4">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                billingCycle === 'yearly'
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>Annual Billing</span>
              <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-amber-400 text-slate-950 font-extrabold">
                Save 15%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {WELLNESS_PLANS.map((plan: PricingPlan) => {
            const price = billingCycle === 'monthly' ? plan.monthlyPrice : Math.round(plan.yearlyPrice / 12);
            const isPopular = plan.popular;

            return (
              <div
                key={plan.id}
                className={`rounded-3xl p-8 transition-all flex flex-col justify-between relative ${
                  isPopular
                    ? 'bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white shadow-2xl scale-102 lg:-translate-y-2 border-2 border-teal-500'
                    : 'bg-white text-slate-900 border border-slate-200 shadow-md hover:border-teal-300'
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-black bg-gradient-to-r from-teal-500 to-emerald-400 text-slate-950 shadow-md uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
                    Most Popular Choice
                  </div>
                )}

                <div>
                  {/* Plan Header */}
                  <div className="border-b border-slate-100/20 pb-6 mb-6">
                    <h3 className="text-xl font-extrabold">{plan.name}</h3>
                    <p className={`text-xs mt-1 ${isPopular ? 'text-slate-300' : 'text-slate-500'}`}>
                      {plan.targetPet}
                    </p>

                    {/* Price */}
                    <div className="mt-4 flex items-baseline gap-1">
                      <span className="text-4xl sm:text-5xl font-black tracking-tight">
                        ${price}
                      </span>
                      <span className={`text-xs ${isPopular ? 'text-slate-400' : 'text-slate-500'}`}>
                        / month {billingCycle === 'yearly' && '(billed annually)'}
                      </span>
                    </div>

                    <p className={`text-xs mt-3 leading-relaxed ${isPopular ? 'text-slate-300' : 'text-slate-600'}`}>
                      {plan.description}
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 mb-8">
                    <div className={`text-xs font-bold uppercase tracking-wider ${isPopular ? 'text-teal-400' : 'text-slate-400'}`}>
                      What&apos;s Included:
                    </div>
                    {plan.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm">
                        <div className={`p-0.5 rounded-full mt-0.5 shrink-0 ${isPopular ? 'bg-teal-500 text-slate-950' : 'bg-teal-100 text-teal-700'}`}>
                          <Check className="w-3 h-3" />
                        </div>
                        <span className={isPopular ? 'text-slate-200' : 'text-slate-700'}>{feat}</span>
                      </div>
                    ))}

                    {plan.excludedFeatures?.map((ex, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm opacity-50">
                        <div className="p-0.5 rounded-full mt-0.5 shrink-0 bg-slate-200 text-slate-500">
                          <X className="w-3 h-3" />
                        </div>
                        <span className="line-through">{ex}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Plan Button */}
                <button
                  onClick={() => onOpenBooking('wellness-vaccines')}
                  className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-md ${
                    isPopular
                      ? 'bg-gradient-to-r from-teal-400 to-emerald-400 text-slate-950 hover:from-teal-300 hover:to-emerald-300 shadow-teal-500/20'
                      : 'bg-teal-50 hover:bg-teal-600 text-teal-800 hover:text-white border border-teal-200 hover:border-teal-600'
                  }`}
                >
                  <span>Enroll in {plan.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Insurance Partner Badge */}
        <div className="mt-12 text-center text-xs text-slate-500 space-y-2">
          <p>
            🛡️ <strong>Have Pet Insurance?</strong> We work seamlessly with Trupanion, Lemonade, Nationwide, Healthy Paws, and MetLife.
          </p>
        </div>

      </div>
    </section>
  );
}
