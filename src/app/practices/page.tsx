'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import PracticesHero from '@/components/PracticesHero';
import CtaBanner from '@/components/CtaBanner';
import Footer from '@/components/Footer';
import AuthModals from '@/components/AuthModals';
import { HoneycombPattern } from '@/components/HoneycombPattern';

export default function PracticesPage() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Top Light Blue / Lavender Container wrapping Floating Navbar and Hero */}
      <div className="relative bg-gradient-to-b from-[#EAF1FB] via-[#F3F7FE] to-white overflow-hidden pb-6">
        {/* Decorative Honeycomb Pattern Top Left across the header & hero */}
        <div className="absolute top-0 left-0 w-80 sm:w-[500px] md:w-[620px] pointer-events-none z-0">
          <HoneycombPattern variant="hero-blue" />
        </div>

        {/* 1. Floating Pill Navbar */}
        <Navbar
          activeTab="Practices"
          onOpenLogin={() => setIsLoginOpen(true)}
          onOpenBookDemo={() => setIsDemoOpen(true)}
          onOpenSignUp={() => setIsSignUpOpen(true)}
        />

        {/* 2. Practices Hero Section */}
        <PracticesHero
          onOpenSignUp={() => setIsSignUpOpen(true)}
          onOpenBookDemo={() => setIsDemoOpen(true)}
        />
      </div>

      <main className="flex-grow">
        {/* 3. CTA Banner with Female Vet & Yorkie */}
        <CtaBanner
          onOpenSignUp={() => setIsSignUpOpen(true)}
        />
      </main>

      {/* 4. Footer */}
      <Footer />

      {/* Interactive Modals for Login, Book Demo, and Sign Up */}
      <AuthModals
        loginOpen={isLoginOpen}
        onCloseLogin={() => setIsLoginOpen(false)}
        demoOpen={isDemoOpen}
        onCloseDemo={() => setIsDemoOpen(false)}
        signUpOpen={isSignUpOpen}
        onCloseSignUp={() => setIsSignUpOpen(false)}
      />
    </div>
  );
}
