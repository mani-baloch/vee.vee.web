'use client';

import React from 'react';

interface BlogContentRendererProps {
  contentHtml: string;
  className?: string;
}

export const BlogContentRenderer: React.FC<BlogContentRendererProps> = ({
  contentHtml,
  className = '',
}) => {
  if (!contentHtml) return null;

  return (
    <div
      className={`prose prose-lg max-w-none 
        prose-headings:font-heading prose-headings:font-black prose-headings:text-gray-950 prose-headings:tracking-tight
        prose-h1:text-2xl sm:prose-h1:text-3xl prose-h1:mt-8 prose-h1:mb-4
        prose-h2:text-xl sm:prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h2:text-[#0F4A3E]
        prose-h3:text-lg sm:prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
        prose-p:text-gray-700 prose-p:leading-relaxed prose-p:text-base sm:prose-p:text-lg prose-p:mb-5
        prose-a:text-[#0F4A3E] prose-a:font-semibold prose-a:underline hover:prose-a:text-[#2D9B7C] prose-a:transition-colors
        prose-strong:text-gray-950 prose-strong:font-bold
        prose-blockquote:border-l-4 prose-blockquote:border-[#2D9B7C] prose-blockquote:bg-[#EAF7F2]/60 prose-blockquote:p-4 prose-blockquote:rounded-r-2xl prose-blockquote:italic prose-blockquote:text-gray-800 prose-blockquote:my-6
        prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-2 prose-ul:my-4 prose-ul:text-gray-700
        prose-ol:list-decimal prose-ol:pl-6 prose-ol:space-y-2 prose-ol:my-4 prose-ol:text-gray-700
        prose-li:leading-relaxed
        prose-code:bg-gray-100 prose-code:text-[#0F4A3E] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm prose-code:font-mono
        prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-4 prose-pre:rounded-2xl prose-pre:overflow-x-auto
        prose-img:rounded-2xl prose-img:shadow-md prose-img:my-8 prose-img:w-full
        ${className}`}
      dangerouslySetInnerHTML={{ __html: contentHtml }}
    />
  );
};

export default BlogContentRenderer;
