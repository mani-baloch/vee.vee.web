'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, Stethoscope, Building2, UserCheck, Calendar, Clock, MapPin } from 'lucide-react';
import { Modal } from './ui/modal';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Select } from './ui/select';

export interface AuthModalsProps {
  loginOpen: boolean;
  onCloseLogin: () => void;
  demoOpen: boolean;
  onCloseDemo: () => void;
  signUpOpen: boolean;
  onCloseSignUp: () => void;
  requestShiftData?: any | null;
  onCloseRequestShift?: () => void;
  postScheduleData?: any | null;
  onClosePostSchedule?: () => void;
}

export const AuthModals: React.FC<AuthModalsProps> = ({
  loginOpen,
  onCloseLogin,
  demoOpen,
  onCloseDemo,
  signUpOpen,
  onCloseSignUp,
  requestShiftData = null,
  onCloseRequestShift = () => {},
  postScheduleData = null,
  onClosePostSchedule = () => {},
}) => {
  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);

  // Demo form state
  const [demoName, setDemoName] = useState('');
  const [demoEmail, setDemoEmail] = useState('');
  const [demoRole, setDemoRole] = useState('practice');
  const [demoDate, setDemoDate] = useState('');
  const [demoSuccess, setDemoSuccess] = useState(false);

  // Signup form state
  const [signRole, setSignRole] = useState<'vet' | 'tech' | 'practice'>('vet');
  const [signName, setSignName] = useState('');
  const [signEmail, setSignEmail] = useState('');
  const [signState, setSignState] = useState('CA');
  const [signSuccess, setSignSuccess] = useState(false);

  // Trigger celebratory confetti
  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0F4A3E', '#2D9B7C', '#F59E0B', '#10B981'],
      });
    } catch {
      // Fallback gracefully if canvas is unavailable
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginSuccess(true);
    triggerConfetti();
    setTimeout(() => {
      setLoginSuccess(false);
      onCloseLogin();
    }, 1800);
  };

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDemoSuccess(true);
    triggerConfetti();
    setTimeout(() => {
      setDemoSuccess(false);
      onCloseDemo();
    }, 2000);
  };

  const handleSignSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSignSuccess(true);
    triggerConfetti();
    setTimeout(() => {
      setSignSuccess(false);
      onCloseSignUp();
    }, 2000);
  };

  return (
    <>
      {/* 1. LOGIN MODAL */}
      <Modal isOpen={loginOpen} onClose={onCloseLogin} title="Login to vee.vet">
        {loginSuccess ? (
          <div className="text-center py-8 space-y-3">
            <CheckCircle2 className="w-16 h-16 text-[#2D9B7C] mx-auto animate-bounce" />
            <h4 className="text-xl font-bold text-gray-900">Welcome Back!</h4>
            <p className="text-sm text-gray-600">Signing you into your vee.vet portal...</p>
          </div>
        ) : (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Email Address
              </label>
              <Input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="doctor@clinic.com"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Password
              </label>
              <Input
                type="password"
                required
                value={loginPass}
                onChange={(e) => setLoginPass(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-gray-600">
                <input type="checkbox" className="rounded border-gray-300 text-[#0F4A3E]" defaultChecked />
                <span>Remember me</span>
              </label>
              <a href="#forgot" className="text-teal-700 hover:underline font-medium">
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full py-3 mt-2 rounded-xl font-semibold"
            >
              Sign In →
            </Button>
          </form>
        )}
      </Modal>

      {/* 2. BOOK DEMO MODAL */}
      <Modal isOpen={demoOpen} onClose={onCloseDemo} title="Book a Guided Walkthrough">
        {demoSuccess ? (
          <div className="text-center py-8 space-y-3">
            <CheckCircle2 className="w-16 h-16 text-[#2D9B7C] mx-auto animate-bounce" />
            <h4 className="text-xl font-bold text-gray-900">Demo Scheduled!</h4>
            <p className="text-sm text-gray-600">
              We've sent a calendar invitation with Google Meet link to <strong>{demoEmail}</strong>.
            </p>
          </div>
        ) : (
          <form onSubmit={handleDemoSubmit} className="space-y-4">
            <p className="text-xs text-gray-600">
              See how vee.vet helps veterinary hospitals fill open shifts in minutes and gives relief staff total flexibility.
            </p>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Your Full Name
              </label>
              <Input
                required
                value={demoName}
                onChange={(e) => setDemoName(e.target.value)}
                placeholder="Dr. Sarah Miller"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Work Email
              </label>
              <Input
                type="email"
                required
                value={demoEmail}
                onChange={(e) => setDemoEmail(e.target.value)}
                placeholder="sarah@companionpet.com"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  I represent a
                </label>
                <Select
                  options={[
                    { value: 'practice', label: 'Veterinary Hospital / Clinic' },
                    { value: 'vet', label: 'Veterinarian (DVM)' },
                    { value: 'tech', label: 'Vet Tech (RVT/LVT)' },
                  ]}
                  value={demoRole}
                  onChange={setDemoRole}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Preferred Date
                </label>
                <Input
                  type="date"
                  value={demoDate}
                  onChange={(e) => setDemoDate(e.target.value)}
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full py-3 mt-2 rounded-xl font-semibold"
            >
              Confirm Walkthrough →
            </Button>
          </form>
        )}
      </Modal>

      {/* 3. CREATE FREE ACCOUNT MODAL */}
      <Modal isOpen={signUpOpen} onClose={onCloseSignUp} title="Create Free Account on vee.vet">
        {signSuccess ? (
          <div className="text-center py-8 space-y-3">
            <CheckCircle2 className="w-16 h-16 text-[#2D9B7C] mx-auto animate-bounce" />
            <h4 className="text-xl font-bold text-gray-900">Account Created!</h4>
            <p className="text-sm text-gray-600">
              Welcome to vee.vet! Please verify your email to begin browsing and posting shifts.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSignSubmit} className="space-y-4">
            {/* Role selector pill */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">
                Select Your Role:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'vet', label: 'Veterinarian', icon: <Stethoscope className="w-3.5 h-3.5" /> },
                  { id: 'tech', label: 'Vet Tech', icon: <UserCheck className="w-3.5 h-3.5" /> },
                  { id: 'practice', label: 'Practice / Hospital', icon: <Building2 className="w-3.5 h-3.5" /> },
                ].map((role) => (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => setSignRole(role.id as any)}
                    className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                      signRole === role.id
                        ? 'border-[#0F4A3E] bg-[#EAF7F2] text-[#0F4A3E] ring-1 ring-[#0F4A3E]'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <span className="mb-1">{role.icon}</span>
                    <span>{role.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Full Name / Hospital Name
              </label>
              <Input
                required
                value={signName}
                onChange={(e) => setSignName(e.target.value)}
                placeholder="Dr. Alex Rivera or Woodland Vet Care"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Email Address
              </label>
              <Input
                type="email"
                required
                value={signEmail}
                onChange={(e) => setSignEmail(e.target.value)}
                placeholder="alex@vee.vet"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  License State
                </label>
                <Select
                  options={[
                    { value: 'CA', label: 'California' },
                    { value: 'NY', label: 'New York' },
                    { value: 'TX', label: 'Texas' },
                    { value: 'FL', label: 'Florida' },
                    { value: 'IL', label: 'Illinois' },
                  ]}
                  value={signState}
                  onChange={setSignState}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Password
                </label>
                <Input
                  type="password"
                  required
                  placeholder="Create password"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full py-3 mt-2 rounded-xl font-semibold shadow"
            >
              Get Started for Free →
            </Button>
          </form>
        )}
      </Modal>

      {/* 4. REQUEST SHIFT CONFIRMATION MODAL */}
      <Modal
        isOpen={!!requestShiftData}
        onClose={onCloseRequestShift}
        title="Shift Application Confirmation"
      >
        {requestShiftData && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-[#EAF7F2] border border-[#2D9B7C]/30 text-gray-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-900">
                  Target Shift
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#0F4A3E] text-white">
                  {requestShiftData.shift?.pay || 'Shift Opening'}
                </span>
              </div>
              <h4 className="font-bold text-base text-gray-950">
                {requestShiftData.shift?.hospital || 'Veterinary Hospital Shift'}
              </h4>
              <div className="text-xs text-gray-600 flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-teal-700" />
                  {requestShiftData.shift?.date || 'Upcoming Shift'}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-teal-700" />
                  {requestShiftData.shift?.distance || 'Near you'}
                </span>
              </div>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed">
              By clicking below, your verified profile and credentials will be sent directly to the practice manager. You'll receive instant SMS & Email notification when confirmed.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <Button
                variant="outline"
                onClick={onCloseRequestShift}
                className="w-1/2 py-2.5 rounded-xl text-xs"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  triggerConfetti();
                  alert('Shift requested successfully! The hospital manager has been notified.');
                  onCloseRequestShift();
                }}
                className="w-1/2 py-2.5 rounded-xl text-xs font-semibold"
              >
                Confirm Request →
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* 5. POST SCHEDULE SUCCESS MODAL */}
      <Modal
        isOpen={!!postScheduleData}
        onClose={onClosePostSchedule}
        title="Schedule Posted Successfully!"
      >
        {postScheduleData && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-[#FFF5ED] border border-[#FDBA74]/50 text-gray-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-900">
                  Availability Broadcast
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#2D9B7C] text-white">
                  Active
                </span>
              </div>
              <h4 className="font-bold text-base text-gray-950">
                {postScheduleData.shiftType === 'wellness' ? 'Wellness Shifts' : 'General Relief'}
              </h4>
              <div className="text-xs text-gray-600 space-y-1">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-700" />
                  <span>
                    Date: {postScheduleData.date ? postScheduleData.date.toLocaleDateString() : '10 November 2025'}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-700" />
                  <span>
                    Hours: {postScheduleData.startTime || '09:00 AM'} – {postScheduleData.endTime || '05:00 PM'} (Lunch: {postScheduleData.lunchDuration || '30 min'})
                  </span>
                </div>
              </div>
            </div>

            <p className="text-xs text-gray-600">
              Your availability has been broadcasted to verified veterinary hospitals matching your travel radius.
            </p>

            <Button
              variant="primary"
              onClick={() => {
                triggerConfetti();
                onClosePostSchedule();
              }}
              className="w-full py-3 rounded-xl font-semibold"
            >
              Done →
            </Button>
          </div>
        )}
      </Modal>
    </>
  );
};

export default AuthModals;
