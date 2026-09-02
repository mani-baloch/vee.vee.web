'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import CtaBanner from '@/components/CtaBanner';
import Footer from '@/components/Footer';
import AuthModals from '@/components/AuthModals';
import { HoneycombPattern } from '@/components/HoneycombPattern';

export default function Home() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [requestShiftData, setRequestShiftData] = useState<any | null>(null);
  const [postScheduleData, setPostScheduleData] = useState<any | null>(null);

  const handleScrollToHowItWorks = () => {
    const el = document.getElementById('how-it-works');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Top Peach Container wrapping Floating Navbar and Hero */}
      <div className="relative bg-[#FDF4EC] overflow-hidden">
        {/* Decorative Honeycomb Pattern Top Left across the header & hero */}
        <div className="absolute top-0 left-0 w-80 sm:w-[500px] md:w-[600px] pointer-events-none z-0">
          <HoneycombPattern variant="hero-blue" />
        </div>

        {/* 1. Floating Pill Navbar */}
        <Navbar
          activeTab=""
          onOpenLogin={() => setIsLoginOpen(true)}
          onOpenBookDemo={() => setIsDemoOpen(true)}
          onOpenSignUp={() => setIsSignUpOpen(true)}
          onNavigateSection={handleNavigateSection}
        />

        {/* 2. Hero Section */}
        <Hero
          onOpenSignUp={() => setIsSignUpOpen(true)}
          onOpenBookDemo={() => setIsDemoOpen(true)}
          onScrollToHowItWorks={handleScrollToHowItWorks}
        />
      </div>

      <main className="flex-grow">
        {/* 3. How It Works Section */}
        <HowItWorks
          onRequestShift={(shiftDetails) => setRequestShiftData(shiftDetails)}
          onPostSchedule={(scheduleDetails) => setPostScheduleData(scheduleDetails)}
        />

        {/* 4. CTA Banner */}
        <CtaBanner
          imageSrc="/images/cta-vet.png"
          altText="Veterinary technician with tablet and golden retriever dog"
          onOpenSignUp={() => setIsSignUpOpen(true)}
        />
      </main>

      {/* 5. Footer */}
      <Footer />

      {/* Interactive Modals for Login, Demo, Signup, and Shift Confirmation */}
      <AuthModals
        loginOpen={isLoginOpen}
        onCloseLogin={() => setIsLoginOpen(false)}
        demoOpen={isDemoOpen}
        onCloseDemo={() => setIsDemoOpen(false)}
        signUpOpen={isSignUpOpen}
        onCloseSignUp={() => setIsSignUpOpen(false)}
        requestShiftData={requestShiftData}
        onCloseRequestShift={() => setRequestShiftData(null)}
        postScheduleData={postScheduleData}
        onClosePostSchedule={() => setPostScheduleData(null)}
      />
    </div>
  );
}


