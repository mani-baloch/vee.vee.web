'use client';

import React, { useState } from 'react';
import { 
  HeartPulse, 
  AlertCircle, 
  Video, 
  Smile, 
  Activity, 
  Microscope, 
  Feather, 
  Sparkles, 
  Clock, 
  Check, 
  ArrowRight,
  Shield,
  Stethoscope
} from 'lucide-react';
import { VET_SERVICES, VetService } from '@/data/vetData';

interface ServicesSectionProps {
  onOpenBooking: (serviceId?: string) => void;
}

const iconMap: Record<string, React.ElementType> = {
  HeartPulse,
  AlertCircle,
  Video,
  Smile,
  Activity,
  Microscope,
  Feather,
  Sparkles,
};

const CATEGORIES = [
  { id: 'all', label: 'All Services' },
  { id: 'general', label: 'General & Preventive' },
  { id: 'emergency', label: 'Urgent Care & Surgery' },
  { id: 'specialist', label: 'Specialists & Diagnostics' },
  { id: 'wellness', label: 'Spa & Grooming' },
];

export default function ServicesSection({ onOpenBooking }: ServicesSectionProps) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedServiceForInfo, setSelectedServiceForInfo] = useState<VetService | null>(null);

  const filteredServices = activeCategory === 'all'
    ? VET_SERVICES
    : VET_SERVICES.filter(service => {
        if (activeCategory === 'emergency') {
          return service.category === 'emergency';
        }
        return service.category === activeCategory;
      });

  return (
    <section id="services" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-teal-50 text-teal-700 border border-teal-200">
            <Stethoscope className="w-3.5 h-3.5 text-teal-600" />
            Full-Spectrum Veterinary Care
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Comprehensive Medical & Wellness Solutions
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            From routine checkups and puppy shots to advanced surgical procedures and remote video vet consults, we are equipped for every stage of your pet's life.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activeCategory === cat.id
                    ? 'bg-teal-600 text-white shadow-md shadow-teal-600/20 scale-102'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredServices.map((service) => {
            const IconComponent = iconMap[service.iconName] || HeartPulse;
            const isEmergency = service.category === 'emergency';

            return (
              <div
                key={service.id}
                className={`group rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between border relative ${
                  isEmergency
                    ? 'bg-gradient-to-b from-red-50/40 via-white to-white border-red-200/80 hover:border-red-400 hover:shadow-xl hover:shadow-red-500/10'
                    : 'bg-white border-slate-200/90 hover:border-teal-400 hover:shadow-xl hover:shadow-teal-500/10'
                }`}
              >
                {service.popular && (
                  <span className="absolute top-4 right-4 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                    Most Popular
                  </span>
                )}

                <div>
                  {/* Service Icon */}
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${
                      isEmergency
                        ? 'bg-red-100 text-red-600'
                        : 'bg-teal-50 text-teal-600 group-hover:bg-teal-600 group-hover:text-white'
                    }`}
                  >
                    <IconComponent className="w-6 h-6" />
                  </div>

                  {/* Title & Price Meta */}
                  <div className="mb-3">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                      {service.title}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-slate-500 mt-1">
                      <span className="font-semibold text-teal-700">{service.price}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {service.duration}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    {service.description}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-1.5 mb-6 text-xs text-slate-600 border-t border-slate-100 pt-3">
                    {service.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Action Button */}
                <div className="pt-2">
                  <button
                    onClick={() => onOpenBooking(service.id)}
                    className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-xs ${
                      isEmergency
                        ? 'bg-red-600 hover:bg-red-700 text-white shadow-red-600/20'
                        : 'bg-teal-50 hover:bg-teal-600 text-teal-800 hover:text-white border border-teal-200 hover:border-teal-600'
                    }`}
                  >
                    <span>Book This Service</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Guarantee Banner */}
        <div className="mt-12 p-6 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-400 flex items-center justify-center border border-teal-500/30 shrink-0">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-base text-white">100% Fear-Free Gentle Handling Promise</h4>
              <p className="text-xs text-slate-300">
                Every veterinary procedure follows gentle, positive reinforcement methods tailored for sensitive pets.
              </p>
            </div>
          </div>
          <button
            onClick={() => onOpenBooking()}
            className="shrink-0 px-5 py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl text-xs transition-colors"
          >
            Schedule Any Service
          </button>
        </div>

      </div>
    </section>
  );
}
