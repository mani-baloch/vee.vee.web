'use client';

import React, { useState } from 'react';
import { 
  Stethoscope, 
  AlertTriangle, 
  ShieldAlert, 
  Info, 
  PhoneCall, 
  Calendar, 
  Video, 
  CheckCircle2, 
  HelpCircle,
  ArrowRight,
  RotateCcw,
  Dog,
  Cat,
  Bird,
  Rabbit
} from 'lucide-react';
import { SYMPTOMS_LIST, CLINIC_INFO } from '@/data/vetData';

interface SymptomCheckerProps {
  onOpenBooking: (serviceId?: string) => void;
}

export default function SymptomChecker({ onOpenBooking }: SymptomCheckerProps) {
  const [selectedPet, setSelectedPet] = useState<'dog' | 'cat' | 'bird' | 'exotic'>('dog');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [showAssessment, setShowAssessment] = useState(false);

  const toggleSymptom = (id: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
    setShowAssessment(false);
  };

  const clearAll = () => {
    setSelectedSymptoms([]);
    setShowAssessment(false);
  };

  // Determine overall severity
  const activeSymptomObjects = SYMPTOMS_LIST.filter((s) => selectedSymptoms.includes(s.id));
  const hasEmergency = activeSymptomObjects.some((s) => s.level === 'emergency');
  const hasUrgent = activeSymptomObjects.some((s) => s.level === 'urgent');

  let overallLevel: 'emergency' | 'urgent' | 'routine' = 'routine';
  if (hasEmergency) {
    overallLevel = 'emergency';
  } else if (hasUrgent) {
    overallLevel = 'urgent';
  }

  return (
    <section id="symptom-checker" className="py-16 sm:py-24 bg-slate-50 relative border-y border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-teal-100 text-teal-800 border border-teal-200">
            <Stethoscope className="w-3.5 h-3.5 text-teal-600" />
            Interactive Triage Assessment
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Pet Symptom & Emergency Checker
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Unsure whether your pet needs the emergency room right now, a same-day visit, or a convenient Telehealth call? Select their symptoms below for instant guidance.
          </p>
        </div>

        {/* Main Checker Widget Container */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 sm:p-8 lg:p-10 space-y-8">
          
          {/* Step 1: Pet Type Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Step 1: Select Pet Species
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { id: 'dog', label: 'Dog / Canine', icon: Dog },
                { id: 'cat', label: 'Cat / Feline', icon: Cat },
                { id: 'bird', label: 'Bird / Avian', icon: Bird },
                { id: 'exotic', label: 'Rabbit & Exotic', icon: Rabbit },
              ].map((item) => {
                const Icon = item.icon;
                const isSelected = selectedPet === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedPet(item.id as any)}
                    className={`p-3 rounded-2xl border flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold transition-all ${
                      isSelected
                        ? 'bg-teal-600 text-white border-teal-600 shadow-md shadow-teal-600/20'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Symptoms Selection */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                Step 2: Check all observed symptoms ({selectedSymptoms.length} selected)
              </label>
              {selectedSymptoms.length > 0 && (
                <button
                  onClick={clearAll}
                  className="text-xs text-slate-500 hover:text-red-600 flex items-center gap-1 font-medium"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {SYMPTOMS_LIST.map((symptom) => {
                const isChecked = selectedSymptoms.includes(symptom.id);
                return (
                  <div
                    key={symptom.id}
                    onClick={() => toggleSymptom(symptom.id)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 select-none ${
                      isChecked
                        ? symptom.level === 'emergency'
                          ? 'bg-red-50/80 border-red-400 text-red-950 shadow-xs'
                          : symptom.level === 'urgent'
                          ? 'bg-amber-50/80 border-amber-400 text-amber-950 shadow-xs'
                          : 'bg-teal-50/80 border-teal-400 text-teal-950 shadow-xs'
                        : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        isChecked
                          ? symptom.level === 'emergency'
                            ? 'bg-red-600 border-red-600 text-white'
                            : symptom.level === 'urgent'
                            ? 'bg-amber-600 border-amber-600 text-white'
                            : 'bg-teal-600 border-teal-600 text-white'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </div>

                    <div className="flex-1">
                      <div className="text-xs sm:text-sm font-bold">{symptom.name}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{symptom.recommendation}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action to Evaluate */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
            <div className="text-xs text-slate-500 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-teal-600 shrink-0" />
              <span>This tool provides emergency triage advice and is not a replacement for veterinary diagnosis.</span>
            </div>

            <button
              onClick={() => setShowAssessment(true)}
              disabled={selectedSymptoms.length === 0}
              className={`px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
                selectedSymptoms.length > 0
                  ? 'bg-teal-600 hover:bg-teal-700 text-white shadow-md shadow-teal-600/30'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <span>Get Immediate Triage Recommendation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Triage Results Card */}
          {showAssessment && selectedSymptoms.length > 0 && (
            <div
              className={`rounded-3xl p-6 sm:p-8 animate-in fade-in slide-in-from-bottom-3 duration-300 border ${
                overallLevel === 'emergency'
                  ? 'bg-red-500 text-white border-red-600 shadow-2xl shadow-red-500/20'
                  : overallLevel === 'urgent'
                  ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-2xl shadow-amber-500/20'
                  : 'bg-teal-600 text-white border-teal-700 shadow-2xl shadow-teal-600/20'
              }`}
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/20 text-xs font-bold uppercase tracking-wider">
                    {overallLevel === 'emergency' ? (
                      <>
                        <ShieldAlert className="w-4 h-4" /> Immediate Medical Emergency (Level 1)
                      </>
                    ) : overallLevel === 'urgent' ? (
                      <>
                        <AlertTriangle className="w-4 h-4" /> Urgent Same-Day Visit Recommended (Level 2)
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" /> Non-Emergency / Telehealth Ready (Level 3)
                      </>
                    )}
                  </div>

                  <h3 className="text-2xl font-black">
                    {overallLevel === 'emergency'
                      ? 'Immediate Hospital Evaluation Required'
                      : overallLevel === 'urgent'
                      ? 'Schedule a Same-Day Urgent Consultation'
                      : 'Schedule a Routine Appointment or Telehealth Call'}
                  </h3>

                  <p className="text-xs sm:text-sm max-w-2xl opacity-90 leading-relaxed">
                    {overallLevel === 'emergency'
                      ? 'Based on your selections, your pet may be experiencing a critical life-threatening condition. Please call our 24/7 ER hotline or proceed immediately to our emergency center.'
                      : overallLevel === 'urgent'
                      ? 'Your pet needs timely attention within the next 12-24 hours. We recommend booking our earliest available urgent clinic slot today.'
                      : 'These symptoms can typically be managed via routine veterinary examination or an immediate Telehealth video call from your home.'}
                  </p>
                </div>

                {/* Direct Action */}
                <div className="shrink-0 flex flex-col gap-2 w-full md:w-auto">
                  {overallLevel === 'emergency' ? (
                    <a
                      href={`tel:${CLINIC_INFO.phoneEmergency}`}
                      className="px-6 py-3.5 bg-white text-red-600 hover:bg-red-50 rounded-xl font-bold text-sm text-center shadow-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <PhoneCall className="w-4 h-4 animate-bounce" />
                      Call 24/7 ER: {CLINIC_INFO.phoneEmergency}
                    </a>
                  ) : overallLevel === 'urgent' ? (
                    <button
                      onClick={() => onOpenBooking('urgent-emergency')}
                      className="px-6 py-3.5 bg-slate-950 text-white hover:bg-slate-900 rounded-xl font-bold text-sm shadow-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <Calendar className="w-4 h-4" />
                      Book Same-Day Urgent Slot
                    </button>
                  ) : (
                    <button
                      onClick={() => onOpenBooking('telehealth-video')}
                      className="px-6 py-3.5 bg-white text-teal-800 hover:bg-teal-50 rounded-xl font-bold text-sm shadow-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <Video className="w-4 h-4" />
                      Book Telehealth Video Call ($35)
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
