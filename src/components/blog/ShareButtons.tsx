'use client';

import React, { useState } from 'react';
import { Share2, Link as LinkIcon, Check } from 'lucide-react';

interface ShareButtonsProps {
  title: string;
  url?: string;
}

export const ShareButtons: React.FC<ShareButtonsProps> = ({ title, url }) => {
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== 'undefined' ? (url || window.location.href) : '';
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  const handleCopy = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mr-1 flex items-center gap-1">
        <Share2 className="w-3.5 h-3.5 text-gray-400" />
        <span>Share:</span>
      </span>

      {/* Copy Link */}
      <button
        type="button"
        onClick={handleCopy}
        className={`p-2 rounded-full border transition-all cursor-pointer ${
          copied
            ? 'bg-[#EAF7F2] border-[#2D9B7C] text-[#0F4A3E]'
            : 'border-gray-200 text-gray-600 hover:text-[#0F4A3E] hover:border-[#0F4A3E] hover:bg-white'
        }`}
        title="Copy Link to Clipboard"
      >
        {copied ? <Check className="w-3.5 h-3.5 text-[#2D9B7C]" /> : <LinkIcon className="w-3.5 h-3.5" />}
      </button>

      {/* Twitter / X */}
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noreferrer"
        className="w-7.5 h-7.5 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:text-black hover:border-black hover:bg-gray-50 transition-all cursor-pointer"
        title="Share on X (Twitter)"
        aria-label="Share on X"
      >
        <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </a>

      {/* LinkedIn */}
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noreferrer"
        className="w-7.5 h-7.5 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:text-[#0077b5] hover:border-[#0077b5] hover:bg-blue-50 transition-all cursor-pointer"
        title="Share on LinkedIn"
        aria-label="Share on LinkedIn"
      >
        <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      </a>

      {/* Facebook */}
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noreferrer"
        className="w-7.5 h-7.5 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:text-[#1877f2] hover:border-[#1877f2] hover:bg-blue-50 transition-all cursor-pointer"
        title="Share on Facebook"
        aria-label="Share on Facebook"
      >
        <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      </a>
    </div>
  );
};

export default ShareButtons;
