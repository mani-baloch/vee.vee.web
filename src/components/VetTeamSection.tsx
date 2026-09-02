'use client';

import React from 'react';
import { Star, Award, Calendar, GraduationCap, Clock, CheckCircle2, ShieldCheck, HeartPulse } from 'lucide-react';
import { VET_DOCTORS, VetDoctor } from '@/data/vetData';

interface VetTeamSectionProps {
  onOpenBooking: (serviceId?: string, doctorId?: string) => void;
}

export default function VetTeamSection({ onOpenBooking }: VetTeamSectionProps) {
  return (
    <section id="team" className="py-16 sm:py-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-teal-100 text-teal-800 border border-teal-200">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
            Board-Certified Medical Team
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Meet Our Compassionate Veterinary Specialists
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Our team combines decades of specialized clinical surgery, trauma management, avian medicine, and gentle Fear Free care.
          </p>
        </div>

        {/* Doctor Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {VET_DOCTORS.map((doctor: VetDoctor) => (
            <div
              key={doctor.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:border-teal-300 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Doctor Photo & Badges */}
                <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-slate-800 flex items-center gap-1 shadow-sm">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{doctor.rating}</span>
                    <span className="text-[10px] text-slate-400">({doctor.reviewsCount})</span>
                  </div>

                  <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
                    {doctor.badges.map((badge, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-900/80 text-white backdrop-blur-xs"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                      {doctor.name}
                    </h3>
                    <div className="text-xs font-semibold text-teal-700">{doctor.role}</div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {doctor.bio}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                      <span>{doctor.specialty}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <GraduationCap className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                      <span className="truncate">{doctor.education.split(',')[0]}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                      <span>{doctor.experience} Experience</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-5 pt-0">
                <button
                  onClick={() => onOpenBooking(undefined, doctor.id)}
                  className="w-full py-2.5 px-3 rounded-xl bg-teal-50 hover:bg-teal-600 text-teal-800 hover:text-white border border-teal-200 hover:border-teal-600 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book with {doctor.name.split(' ')[1]}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
