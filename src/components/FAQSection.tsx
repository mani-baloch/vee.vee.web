'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, PhoneCall, Mail } from 'lucide-react';
import { FAQ_LIST, CLINIC_INFO } from '@/data/vetData';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-teal-50 text-teal-700 border border-teal-200">
            <HelpCircle className="w-3.5 h-3.5 text-teal-600" />
            Got Questions? We&apos;re Here to Help
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Everything you need to know about our veterinary treatments, emergency triage, telehealth protocols, and payment options.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {FAQ_LIST.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-all bg-slate-50/50 hover:bg-slate-50"
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full p-5 text-left font-bold text-slate-900 flex items-center justify-between gap-4 text-sm sm:text-base focus:outline-none"
                >
                  <span>{faq.question}</span>
                  <div
                    className={`w-7 h-7 rounded-full bg-slate-200/80 flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-teal-600 text-white' : 'text-slate-600'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-white">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions helper box */}
        <div className="mt-10 p-6 bg-teal-50/70 border border-teal-200 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="font-bold text-sm text-teal-950">Have a specific question about your pet?</h4>
            <p className="text-xs text-teal-800 mt-0.5">Our client care specialists are available 24/7 via phone or email.</p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={`tel:${CLINIC_INFO.phoneGeneral}`}
              className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              Call Reception
            </a>
            <a
              href={`mailto:${CLINIC_INFO.email}`}
              className="px-4 py-2 bg-white hover:bg-slate-50 text-teal-800 border border-teal-200 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5" />
              Email Us
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
