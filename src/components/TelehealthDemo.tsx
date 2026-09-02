'use client';

import React, { useState } from 'react';
import { 
  Video, 
  Mic, 
  MicOff, 
  Camera, 
  CameraOff, 
  FileText, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  Calendar, 
  MessageSquare, 
  Sparkles, 
  PhoneOff,
  Stethoscope
} from 'lucide-react';
import { CLINIC_INFO } from '@/data/vetData';

interface TelehealthDemoProps {
  onOpenBooking: (serviceId?: string) => void;
}

export default function TelehealthDemo({ onOpenBooking }: TelehealthDemoProps) {
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCamOn, setIsCamOn] = useState(true);
  const [activeTab, setActiveTab] = useState<'video' | 'prescription' | 'chat'>('video');

  return (
    <section id="telehealth" className="py-16 sm:py-24 bg-white relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-teal-100/40 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Feature Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-teal-50 text-teal-700 border border-teal-200">
              <Video className="w-3.5 h-3.5 text-teal-600" />
              vee.vet Virtual Clinic
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              See a Licensed Vet Online in <span className="text-teal-600">Minutes</span>
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              No stressful car rides, carrier battles, or waiting rooms. Speak with our board-certified veterinarians right from your living room for prompt medical triage, behavior advice, and instant digital prescriptions.
            </p>

            <div className="space-y-3.5 pt-2">
              {[
                {
                  title: 'Instant Electronic Prescriptions',
                  desc: 'Medications sent directly to your local pharmacy or delivered to your doorstep within 24 hours.'
                },
                {
                  title: 'Stress-Free For Shy & Anxious Pets',
                  desc: 'Examine cats and reactive dogs in their comfortable home environment without stress.'
                },
                {
                  title: 'Affordable Flat Rate ($35/consult)',
                  desc: 'Includes 20 minutes HD video consultation + 48 hours of free follow-up text support.'
                }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="w-7 h-7 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                    <p className="text-xs text-slate-600 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-3">
              <button
                onClick={() => onOpenBooking('telehealth-video')}
                className="px-6 py-3.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-bold rounded-2xl text-sm shadow-lg shadow-teal-600/30 hover:shadow-teal-600/50 hover:-translate-y-0.5 transition-all flex items-center gap-2"
              >
                <Video className="w-4 h-4" />
                Book Virtual Consultation ($35)
              </button>
              <span className="text-xs text-slate-500 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-teal-600" />
                Available Daily 7:00 AM – 11:00 PM
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Video Call Simulator */}
          <div className="lg:col-span-6">
            <div className="bg-slate-950 rounded-3xl p-4 sm:p-5 shadow-2xl border border-slate-800 text-white relative">
              
              {/* Simulator Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="font-bold text-slate-200">Live Telehealth Session</span>
                  <span className="text-slate-500">• 08:42</span>
                </div>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => setActiveTab('video')}
                    className={`px-2.5 py-1 rounded-lg font-medium text-[11px] transition-colors ${
                      activeTab === 'video' ? 'bg-teal-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    Video Feed
                  </button>
                  <button
                    onClick={() => setActiveTab('prescription')}
                    className={`px-2.5 py-1 rounded-lg font-medium text-[11px] transition-colors ${
                      activeTab === 'prescription' ? 'bg-teal-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    Rx Notes
                  </button>
                </div>
              </div>

              {/* Main Simulated Screen */}
              <div className="mt-3 relative rounded-2xl overflow-hidden aspect-4/3 sm:aspect-16/10 bg-slate-900 flex items-center justify-center border border-slate-800">
                {activeTab === 'video' ? (
                  <>
                    {/* Vet Stream Mockup */}
                    <img
                      src="https://images.unsplash.com/photo-1594824813681-30046522c079?auto=format&fit=crop&q=80&w=800"
                      alt="Dr. Elena Rostova"
                      className="w-full h-full object-cover opacity-90"
                    />

                    {/* Vet Badge Overlay */}
                    <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/60 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                      <div>
                        <div className="text-xs font-bold text-white">Dr. Elena Rostova, DVM</div>
                        <div className="text-[10px] text-teal-400">Internal Medicine Lead</div>
                      </div>
                    </div>

                    {/* Patient PIP (Picture in Picture) */}
                    <div className="absolute bottom-3 right-3 w-28 sm:w-36 aspect-4/3 rounded-xl overflow-hidden border-2 border-teal-500 shadow-xl bg-slate-800">
                      <img
                        src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=300"
                        alt="Patient Golden Retriever"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-1 left-1 bg-black/70 px-1.5 py-0.5 rounded text-[9px] text-slate-200">
                        You & Milo
                      </div>
                    </div>

                    {/* Live Vet Chat Tip */}
                    <div className="absolute bottom-3 left-3 bg-slate-900/85 backdrop-blur-md p-2 rounded-xl border border-slate-700 text-[11px] max-w-[200px] sm:max-w-xs text-slate-200 hidden sm:block">
                      💬 <span className="font-semibold text-teal-300">Dr. Elena:</span> &quot;Milo&apos;s ears look mildly inflamed. I am sending an antibiotic drop prescription right now.&quot;
                    </div>
                  </>
                ) : (
                  /* Prescription Notes Simulation */
                  <div className="p-6 text-left w-full h-full bg-slate-900 space-y-4 overflow-y-auto">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div>
                        <div className="text-xs font-bold text-teal-400">E-Prescription #RX-88421</div>
                        <div className="text-xs text-slate-400">Patient: Milo (Golden Retriever, 3 yrs)</div>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        Verified & Sent
                      </span>
                    </div>

                    <div className="space-y-2 text-xs text-slate-300">
                      <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700">
                        <strong className="text-white">Medication:</strong> Otomax Auricular Ointment (15g)
                        <div className="text-slate-400 text-[11px] mt-0.5">Apply 4 drops to affected ear twice daily for 7 days.</div>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700">
                        <strong className="text-white">Fulfillment:</strong> Sent to CVS Pharmacy #4912 (West District)
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Call Control Buttons */}
              <div className="mt-4 flex items-center justify-center gap-3">
                <button
                  onClick={() => setIsMicOn(!isMicOn)}
                  className={`p-3 rounded-full transition-colors ${
                    isMicOn ? 'bg-slate-800 text-slate-200 hover:bg-slate-700' : 'bg-red-500 text-white'
                  }`}
                  title={isMicOn ? 'Mute Mic' : 'Unmute Mic'}
                >
                  {isMicOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => setIsCamOn(!isCamOn)}
                  className={`p-3 rounded-full transition-colors ${
                    isCamOn ? 'bg-slate-800 text-slate-200 hover:bg-slate-700' : 'bg-red-500 text-white'
                  }`}
                  title={isCamOn ? 'Turn Camera Off' : 'Turn Camera On'}
                >
                  {isCamOn ? <Camera className="w-4 h-4" /> : <CameraOff className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => onOpenBooking('telehealth-video')}
                  className="px-4 py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-md shadow-teal-600/30"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  Schedule Video Call
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
