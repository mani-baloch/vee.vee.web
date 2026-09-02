'use client';

import React from 'react';
import Link from 'next/link';
import { BeeLogo } from './BeeLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-12">
          {/* Column 1: Bee Logo + Blurb + Social Icons */}
          <div className="md:col-span-5 lg:col-span-5 space-y-4">
            <Link href="/" className="inline-block">
              <BeeLogo size="md" />
            </Link>
            <p className="text-sm text-gray-600 max-w-sm leading-relaxed">
              Connecting veterinary professionals and hospitals through smart scheduling and digital practice.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#0F4A3E] hover:border-[#0F4A3E] transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* YouTube / Instagram */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#0F4A3E] hover:border-[#0F4A3E] transition-colors"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#0F4A3E] hover:border-[#0F4A3E] transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Company */}
          <div className="md:col-span-2 lg:col-span-2">
            <h4 className="text-sm font-bold text-teal-800 tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-600">
              <li>
                <a href="#how-it-works" className="hover:text-[#0F4A3E] transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-[#0F4A3E] transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-[#0F4A3E] transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-[#0F4A3E] transition-colors">
                  Press
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-[#0F4A3E] transition-colors">
                  Legal
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="md:col-span-3 lg:col-span-3">
            <h4 className="text-sm font-bold text-teal-800 tracking-wider mb-4">
              Services
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-600">
              <li>
                <a href="#how-it-works" className="hover:text-[#0F4A3E] transition-colors">
                  For Veterinarians
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-[#0F4A3E] transition-colors">
                  For Hospitals
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="md:col-span-2 lg:col-span-2">
            <h4 className="text-sm font-bold text-teal-800 tracking-wider mb-4">
              Contact
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-600">
              <li>
                <a
                  href="mailto:hello@vee.vet"
                  className="hover:text-[#0F4A3E] font-medium transition-colors"
                >
                  hello@vee.vet
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>
            © 2025 vee.vet. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <a href="#privacy" className="hover:text-gray-900 transition-colors">
              Privacy Policy
            </a>
            <span className="text-gray-300">|</span>
            <a href="#terms" className="hover:text-gray-900 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
