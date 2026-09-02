'use client';

import React from 'react';
import { AlertTriangle, PhoneCall, MapPin, Clock, ShieldAlert, HeartCrack, ChevronRight, Stethoscope } from 'lucide-react';
import { CLINIC_INFO } from '@/data/vetData';

interface EmergencyBannerProps {
  onOpenBooking: (serviceId?: string) => void;
  onOpenSymptomChecker: () => void;
}

export default function EmergencyBanner({ onOpenBooking, onOpenSymptomChecker }: EmergencyBannerProps) {
  const redFlags = [
    'Difficulty breathing, choking, or heavy panting',
    'Ingestion of poison/toxic substances (chocolate, rat bait, lilies)',
    'Inability to urinate or defecate (especially male cats)',
    'Sudden collapse, seizure, or inability to stand',
    'Severe trauma, open wounds, or vehicle hit'
  ];

  return (
    <section id="emergency" className="relative py-12 bg-gradient-to-r from-red-950 via-slate-900 to-red-950 text-white overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-red-900/40 border border-red-500/30 rounded-3xl p-6 sm:p-8 lg:p-10 backdrop-blur-md shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Emergency Alert Info */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/40 text-xs font-bold uppercase tracking-wider">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                24/7/365 Emergency & Critical Trauma Hospital
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Pet Emergency? <span className="text-red-400">Do Not Wait.</span>
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Our surgical trauma team and emergency intensive care unit (ICU) are staffed 24 hours a day, 365 days a year. If your pet shows any of the following symptoms, bring them in immediately:
              </p>

              {/* Red Flags List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {redFlags.map((flag, index) => (
                  <div key={index} className="flex items-start gap-2 text-xs sm:text-sm text-red-100 bg-red-950/60 p-2.5 rounded-xl border border-red-800/40">
                    <ShieldAlert className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <span>{flag}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-2">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-red-400" />
                  No appointment needed for critical emergencies
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-red-400" />
                  742 Evergreen Animal Pkwy (Direct ER Ramp)
                </span>
              </div>
            </div>

            {/* Right Column: Emergency Phone & Quick Actions */}
            <div className="lg:col-span-5 bg-slate-900/90 p-6 rounded-2xl border border-slate-700 shadow-xl space-y-4 text-center">
              <div className="w-12 h-12 bg-red-500/20 text-red-400 rounded-full flex items-center justify-center mx-auto border border-red-500/40">
                <PhoneCall className="w-6 h-6 animate-bounce" />
              </div>

              <div>
                <div className="text-xs uppercase tracking-widest text-slate-400 font-bold">24-Hour Emergency Dispatch</div>
                <a
                  href={`tel:${CLINIC_INFO.phoneEmergency}`}
                  className="text-2xl sm:text-3xl font-black text-white hover:text-red-400 transition-colors block mt-1 tracking-tight"
                >
                  {CLINIC_INFO.phoneEmergency}
                </a>
                <p className="text-xs text-slate-400 mt-1">Tap to call directly from your mobile phone</p>
              </div>

              <div className="grid grid-cols-1 gap-2.5 pt-2">
                <button
                  onClick={() => onOpenSymptomChecker()}
                  className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-red-600/30 flex items-center justify-center gap-2"
                >
                  <Stethoscope className="w-4 h-4" />
                  Check Emergency Symptom Urgency
                </button>

                <button
                  onClick={() => onOpenBooking('urgent-emergency')}
                  className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 border border-slate-700"
                >
                  <span>Notify ER Team You Are On The Way</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
              </div>

              <div className="text-[11px] text-slate-400 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                🚨 <strong className="text-white">Heads Up:</strong> Calling ahead allows our ICU team to prepare oxygen, crash carts, and surgical suites before your vehicle arrives.
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
