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
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenLogin,
  onOpenBookDemo,
  onNavigateSection,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('Practices');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Practices', href: '#how-it-works' },
    { name: 'Vets', href: '#how-it-works' },
    { name: 'Techs', href: '#how-it-works' },
    { name: 'Students', href: '#how-it-works' },
  ];

  const handleLinkClick = (name: string, href: string) => {
    setActiveLink(name);
    setMobileMenuOpen(false);
    if (onNavigateSection) {
      onNavigateSection(href.replace('#', ''));
    }
  };

  return (
    <header className="fixed top-3 sm:top-5 left-0 right-0 z-50 px-3 sm:px-6 lg:px-8 transition-all duration-300 pointer-events-none">
      {/* Floating Fixed Pill Container */}
      <div
        className={`max-w-6xl mx-auto bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-[28px] border border-gray-100/90 px-4 sm:px-7 py-2.5 sm:py-3 pointer-events-auto transition-all duration-300 ${
          isScrolled
            ? 'shadow-[0_10px_35px_rgba(0,0,0,0.12)] border-gray-200/90 bg-white/95'
            : 'shadow-[0_4px_20px_rgba(0,0,0,0.06)]'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Left: Bee Logo + vee.vet wordmark */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center group">
              <BeeLogo size="md" />
            </Link>
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-10">
            {navLinks.map((link) => {
              const isActive = activeLink === link.name;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.name, link.href);
                  }}
                  className={`text-sm font-medium transition-colors duration-150 relative py-1 cursor-pointer ${
                    isActive
                      ? 'text-gray-950 font-bold'
                      : 'text-gray-600 hover:text-gray-950'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#0F4A3E] rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right: Book Demo text link + Login Button */}
          <div className="hidden md:flex items-center gap-6">
            <button
              type="button"
              onClick={onOpenBookDemo}
              className="text-sm font-semibold text-gray-800 hover:text-[#0F4A3E] transition-colors cursor-pointer"
            >
              Book Demo
            </button>
            <Button
              variant="primary"
              size="md"
              onClick={onOpenLogin}
              className="bg-[#0F4A3E] hover:bg-[#0A352C] text-white text-sm font-semibold px-6 py-2 rounded-xl sm:rounded-2xl shadow-xs hover:shadow transition-all"
            >
              Login
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              onClick={onOpenLogin}
              className="bg-[#0F4A3E] text-white px-3.5 py-1.5 text-xs font-semibold rounded-xl"
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
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.name, link.href);
                  }}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-[#0F4A3E]"
                >
                  {link.name}
                </a>
              ))}
            </div>
            <div className="pt-2 border-t border-gray-100 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBookDemo();
                }}
                className="w-full text-center py-2 text-xs font-semibold text-gray-800 hover:text-[#0F4A3E] border border-gray-200 rounded-xl"
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
