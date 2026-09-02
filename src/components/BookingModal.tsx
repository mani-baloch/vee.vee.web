'use client';

import React, { useState, useEffect } from 'react';
import { 
  X, 
  Check, 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  AlertCircle, 
  CheckCircle2, 
  Heart, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  Video, 
  Stethoscope,
  Dog,
  Cat,
  Bird,
  Rabbit,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { VET_SERVICES, VET_DOCTORS } from '@/data/vetData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceId?: string;
  initialDoctorId?: string;
}

export default function BookingModal({
  isOpen,
  onClose,
  initialServiceId,
  initialDoctorId,
}: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingReference, setBookingReference] = useState('');

  // Form State
  const [petSpecies, setPetSpecies] = useState<'dog' | 'cat' | 'bird' | 'exotic'>('dog');
  const [petName, setPetName] = useState('');
  const [petAge, setPetAge] = useState('');
  const [petBreed, setPetBreed] = useState('');
  
  const [serviceId, setServiceId] = useState(initialServiceId || VET_SERVICES[0].id);
  const [visitType, setVisitType] = useState<'in-clinic' | 'telehealth'>('in-clinic');

  const [doctorId, setDoctorId] = useState(initialDoctorId || 'any');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('10:30 AM');

  const [ownerName, setOwnerName] = useState('');
  const [ownerPhone, setOwnerPhone] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [notes, setNotes] = useState('');

  // Set default date to tomorrow
  useEffect(() => {
    if (initialServiceId) setServiceId(initialServiceId);
    if (initialDoctorId) setDoctorId(initialDoctorId);

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateStr = tomorrow.toISOString().split('T')[0];
    setAppointmentDate(dateStr);
  }, [initialServiceId, initialDoctorId, isOpen]);

  if (!isOpen) return null;

  const handleNextStep = () => {
    if (step === 1 && !petName.trim()) {
      alert('Please enter your pet’s name.');
      return;
    }
    if (step === 4 && (!ownerName.trim() || !ownerPhone.trim() || !ownerEmail.trim())) {
      alert('Please provide your name, phone number, and email.');
      return;
    }
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(Math.max(1, step - 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const randomRef = 'VET-' + Math.floor(100000 + Math.random() * 900000);
      setBookingReference(randomRef);
      setStep(5);

      // Trigger Celebration Confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#0d9488', '#059669', '#f59e0b', '#10b981']
        });
      } catch (err) {
        // ignore if not supported
      }
    }, 900);
  };

  const resetAndClose = () => {
    setStep(1);
    setPetName('');
    setNotes('');
    onClose();
  };

  const timeSlots = [
    '08:30 AM', '09:15 AM', '10:00 AM', '10:45 AM',
    '11:30 AM', '01:15 PM', '02:00 PM', '03:15 PM',
    '04:30 PM', '05:45 PM', '06:30 PM', '07:15 PM'
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-teal-700 to-emerald-600 p-5 sm:p-6 text-white relative">
          <button
            onClick={resetAndClose}
            className="absolute top-5 right-5 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-200 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            Easy Online Booking
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold">Schedule Your Pet&apos;s Visit</h3>
          <p className="text-xs sm:text-sm text-teal-100 mt-0.5">
            Step {step} of 4 • Instant confirmation & zero wait guarantee
          </p>

          {/* Progress Indicator */}
          {step < 5 && (
            <div className="flex items-center gap-2 mt-4">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className={`h-1.5 flex-1 rounded-full transition-all ${
                    s <= step ? 'bg-white' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          
          {/* STEP 1: Pet Profile */}
          {step === 1 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Heart className="w-4 h-4 text-teal-600" />
                Tell us about your pet
              </h4>

              {/* Species selector */}
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Pet Species</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { id: 'dog', label: 'Dog', icon: Dog },
                    { id: 'cat', label: 'Cat', icon: Cat },
                    { id: 'bird', label: 'Bird', icon: Bird },
                    { id: 'exotic', label: 'Exotic / Rabbit', icon: Rabbit },
                  ].map((s) => {
                    const Icon = s.icon;
                    const isSelected = petSpecies === s.id;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setPetSpecies(s.id as any)}
                        className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                          isSelected
                            ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{s.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Pet Name & Age */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Pet Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Milo, Luna, Charlie"
                    value={petName}
                    onChange={(e) => setPetName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Age / Approximate</label>
                  <input
                    type="text"
                    placeholder="e.g. 2 Years, 6 Months"
                    value={petAge}
                    onChange={(e) => setPetAge(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Breed (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Golden Retriever, French Bulldog, Persian"
                  value={petBreed}
                  onChange={(e) => setPetBreed(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50/50"
                />
              </div>
            </div>
          )}

          {/* STEP 2: Service & Visit Type */}
          {step === 2 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Stethoscope className="w-4 h-4 text-teal-600" />
                Select service & visit format
              </h4>

              {/* In-Clinic vs Telehealth */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setVisitType('in-clinic')}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    visitType === 'in-clinic'
                      ? 'bg-teal-50/80 border-teal-500 text-teal-900 shadow-xs'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  <div className="font-bold text-xs sm:text-sm flex items-center gap-1.5">
                    <Stethoscope className="w-4 h-4 text-teal-600" /> In-Clinic Hospital Visit
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">Visit our Fear-Free animal hospital in person.</p>
                </button>

                <button
                  type="button"
                  onClick={() => setVisitType('telehealth')}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    visitType === 'telehealth'
                      ? 'bg-teal-50/80 border-teal-500 text-teal-900 shadow-xs'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  <div className="font-bold text-xs sm:text-sm flex items-center gap-1.5">
                    <Video className="w-4 h-4 text-teal-600" /> Telehealth Video Vet ($35)
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">Live HD video call with prescription delivery.</p>
                </button>
              </div>

              {/* Service List Selection */}
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Primary Reason For Visit</label>
                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {VET_SERVICES.map((s) => {
                    const isSelected = serviceId === s.id;
                    return (
                      <div
                        key={s.id}
                        onClick={() => setServiceId(s.id)}
                        className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between text-xs transition-all ${
                          isSelected
                            ? 'bg-teal-600 text-white border-teal-600 font-bold shadow-xs'
                            : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                        }`}
                      >
                        <div>
                          <div className="font-bold">{s.title}</div>
                          <div className={`text-[11px] ${isSelected ? 'text-teal-100' : 'text-slate-500'}`}>
                            {s.duration} • {s.price}
                          </div>
                        </div>
                        {isSelected && <Check className="w-4 h-4 shrink-0" />}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Doctor, Date & Time */}
          {step === 3 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-teal-600" />
                Choose Veterinarian & Time Slot
              </h4>

              {/* Preferred Doctor */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Preferred Doctor</label>
                <select
                  value={doctorId}
                  onChange={(e) => setDoctorId(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50/50"
                >
                  <option value="any">Any Available Specialist (Fastest Confirmation)</option>
                  {VET_DOCTORS.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} — {d.specialty}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Appointment Date</label>
                  <input
                    type="date"
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Preferred Time Window</label>
                  <select
                    value={appointmentTime}
                    onChange={(e) => setAppointmentTime(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50/50"
                  >
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Owner Contact & Symptoms Description */}
          {step === 4 && (
            <form onSubmit={handleSubmit} className="space-y-4 animate-in fade-in duration-200">
              <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <User className="w-4 h-4 text-teal-600" />
                Pet Parent Contact Details
              </h4>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Jenkins"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50/50"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone (For SMS Confirmations) *</label>
                  <input
                    type="tel"
                    required
                    placeholder="(555) 000-0000"
                    value={ownerPhone}
                    onChange={(e) => setOwnerPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="sarah@example.com"
                    value={ownerEmail}
                    onChange={(e) => setOwnerEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Notes / Symptoms description</label>
                <textarea
                  rows={2}
                  placeholder="Please describe symptoms, diet, or special handling needs..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50/50 resize-none"
                />
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero cancellation fee up to 2 hours before your scheduled time.</span>
              </div>
            </form>
          )}

          {/* STEP 5: Success & Confirmation */}
          {step === 5 && (
            <div className="text-center py-6 space-y-5 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-700">Appointment Confirmed!</span>
                <h4 className="text-2xl font-black text-slate-900">We&apos;re Ready for {petName}!</h4>
                <p className="text-xs text-slate-500">
                  Confirmation sent to <strong className="text-slate-800">{ownerEmail || ownerPhone}</strong>
                </p>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-left space-y-2.5 max-w-md mx-auto text-xs">
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Booking Reference:</span>
                  <span className="font-mono font-bold text-teal-700">{bookingReference}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Patient:</span>
                  <span className="font-bold text-slate-800">{petName} ({petSpecies.toUpperCase()})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Scheduled For:</span>
                  <span className="font-bold text-slate-800">{appointmentDate} at {appointmentTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Visit Format:</span>
                  <span className="font-bold text-teal-700">
                    {visitType === 'telehealth' ? 'Virtual Video Consult (Link Sent)' : 'In-Clinic Hospital Exam'}
                  </span>
                </div>
              </div>

              <button
                onClick={resetAndClose}
                className="px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold shadow-md transition-colors"
              >
                Done & Return to Homepage
              </button>
            </div>
          )}

        </div>

        {/* Modal Footer Controls (Steps 1 to 4) */}
        {step < 5 && (
          <div className="bg-slate-50 p-4 sm:p-5 border-t border-slate-100 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={handlePrevStep}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
            ) : (
              <span />
            )}

            {step < 4 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl shadow-md shadow-teal-600/20 transition-all flex items-center gap-1.5"
              >
                <span>Continue</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-7 py-2.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white text-xs font-bold rounded-xl shadow-md shadow-teal-600/30 transition-all flex items-center gap-2"
              >
                {isSubmitting ? (
                  <span>Securing Slot...</span>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Confirm Appointment</span>
                  </>
                )}
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
