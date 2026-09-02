'use client';

import React, { useState } from 'react';
import { Star, Quote, Heart, CheckCircle2, ThumbsUp } from 'lucide-react';
import { TESTIMONIALS, Testimonial } from '@/data/vetData';

export default function TestimonialsSection() {
  const [filterType, setFilterType] = useState<string>('all');

  const filteredReviews = filterType === 'all'
    ? TESTIMONIALS
    : TESTIMONIALS.filter(t => t.petType.toLowerCase() === filterType.toLowerCase());

  return (
    <section id="reviews" className="py-16 sm:py-24 bg-slate-50 relative border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-teal-100 text-teal-800 border border-teal-200">
            <Heart className="w-3.5 h-3.5 text-teal-600 fill-teal-600" />
            Loved by 18,500+ Pet Parents
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Real Stories, Healthier & Happier Pets
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Read authentic experiences from pet owners who rely on vee.vet for emergency interventions, routine care, and virtual checkups.
          </p>

          {/* Filter Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {[
              { id: 'all', label: 'All Reviews' },
              { id: 'dog', label: 'Dogs' },
              { id: 'cat', label: 'Cats' },
              { id: 'bird', label: 'Birds & Exotics' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilterType(tab.id)}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  filterType === tab.id
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {filteredReviews.map((review: Testimonial) => (
            <div
              key={review.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between relative space-y-4"
            >
              <div>
                {/* Rating & Service Used */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
                    {review.serviceUsed}
                  </span>
                </div>

                {/* Comment */}
                <p className="text-sm text-slate-700 italic leading-relaxed pt-3">
                  &quot;{review.comment}&quot;
                </p>
              </div>

              {/* Author & Pet Details */}
              <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                <img
                  src={review.avatar}
                  alt={review.ownerName}
                  className="w-11 h-11 rounded-full object-cover border-2 border-teal-500"
                />
                <div className="flex-1">
                  <div className="text-xs font-bold text-slate-900 flex items-center gap-1">
                    <span>{review.ownerName}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Pet: <strong className="text-teal-700">{review.petName}</strong> ({review.petBreed}) • {review.date}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
