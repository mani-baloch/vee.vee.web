'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { BeeLogo } from './BeeLogo';
import { Button } from './ui/button';

export interface NavbarProps {
  onOpenLogin: () => void;
  onOpenBookDemo: () => void;
  onOpenSignUp?: () => void;
  onNavigateSection?: (sectionId: string) => void;
  activeTab?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenLogin,
  onOpenBookDemo,
  onNavigateSection,
  activeTab = 'Practices',
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState(activeTab);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Practices', href: '#practices' },
    { name: 'Vets', href: '#vets' },
    { name: 'Techs', href: '#techs' },
    { name: 'Students', href: '#students' },
  ];

  const handleLinkClick = (name: string, href: string) => {
    setCurrentTab(name);
    setMobileMenuOpen(false);
    if (onNavigateSection) {
      onNavigateSection(href.replace('#', ''));
    }
  };

  return (
    <header className="fixed top-4 sm:top-6 left-0 right-0 z-50 px-3 sm:px-6 lg:px-8 transition-all duration-300 pointer-events-none">
      {/* Floating Pill Container */}
      <div
        className={`max-w-5xl mx-auto bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-full border border-gray-100/90 px-4 sm:px-8 py-2.5 sm:py-3 pointer-events-auto transition-all duration-300 ${
          isScrolled
            ? 'shadow-[0_12px_36px_rgba(0,0,0,0.12)] border-gray-200/90 bg-white/95'
            : 'shadow-[0_4px_24px_rgba(0,0,0,0.06)]'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Left: Bee Logo + vee.vet wordmark */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center group cursor-pointer">
              <BeeLogo size="md" />
            </Link>
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {navLinks.map((link) => {
              const isActive = currentTab === link.name;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.name, link.href);
                  }}
                  className={`text-sm font-semibold transition-all duration-150 relative py-1 cursor-pointer ${
                    isActive
                      ? 'text-[#0F4A3E]'
                      : 'text-gray-700 hover:text-gray-950'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[2.5px] bg-[#0F4A3E] rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right: Book Demo text link + Login Button */}
          <div className="hidden md:flex items-center gap-7">
            <button
              type="button"
              onClick={onOpenBookDemo}
              className="text-sm font-bold text-gray-900 hover:text-[#0F4A3E] transition-colors cursor-pointer"
            >
              Book Demo
            </button>
            <Button
              variant="primary"
              size="md"
              onClick={onOpenLogin}
              className="bg-[#0F4A3E] hover:bg-[#0A352C] text-white text-sm font-bold px-7 py-2.5 rounded-full shadow-xs hover:shadow-md hover:scale-[1.02] transition-all cursor-pointer"
            >
              Login
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2.5">
            <Button
              variant="primary"
              size="sm"
              onClick={onOpenLogin}
              className="bg-[#0F4A3E] text-white px-4 py-1.5 text-xs font-bold rounded-full"
            >
              Login
            </Button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-gray-700 hover:text-gray-950 focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-3 mt-3 border-t border-gray-100 space-y-2 animate-in slide-in-from-top duration-200">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => {
                const isActive = currentTab === link.name;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.name, link.href);
                    }}
                    className={`px-3 py-2 rounded-xl text-sm font-semibold ${
                      isActive
                        ? 'text-[#0F4A3E] bg-teal-50/80 font-bold'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
            </div>
            <div className="pt-2 border-t border-gray-100 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBookDemo();
                }}
                className="w-full text-center py-2.5 text-xs font-bold text-gray-800 hover:text-[#0F4A3E] border border-gray-200 rounded-full"
              >
                Book Demo
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;

