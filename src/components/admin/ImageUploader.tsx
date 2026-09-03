'use client';

import React, { useState, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Upload, X, Image as ImageIcon, Loader2, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImageUploaderProps {
  value: string | null | undefined;
  onChange: (url: string | null) => void;
  folder?: string;
  className?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  value,
  onChange,
  folder = 'covers',
  className = '',
}) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const supabase = createClient();

  const handleFileSelect = async (file: File) => {
    setError(null);

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];
    if (!validTypes.includes(file.type)) {
      setError('Please select a valid image file (JPEG, PNG, WebP, GIF, SVG).');
      return;
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      setError('Image file size must be less than 10MB.');
      return;
    }

    setUploading(true);

    try {
      // Generate clean unique filename
      const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
      const cleanName = file.name
        .replace(/\.[^/.]+$/, '')
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-')
        .slice(0, 30);
      const uniqueId = Math.random().toString(36).substring(2, 9);
      const filePath = `${folder}/${Date.now()}-${uniqueId}-${cleanName}.${fileExt}`;

      // Upload to Supabase Storage bucket 'blog-assets'
      const { data, error: uploadError } = await supabase.storage
        .from('blog-assets')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) {
        throw new Error(uploadError.message || 'Storage upload failed.');
      }

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from('blog-assets').getPublicUrl(data.path);

      onChange(publicUrl);
    } catch (err: any) {
      setError(err?.message || 'Failed to upload image. Please verify Supabase Storage configuration.');
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleRemove = () => {
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFileSelect(e.target.files[0]);
          }
        }}
      />

      {/* Error Alert */}
      {error && (
        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2 animate-in fade-in">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Preview Container or Upload Box */}
      {value ? (
        <div className="relative rounded-2xl overflow-hidden border border-gray-200 bg-gray-50 shadow-xs group">
          <div className="relative aspect-video w-full max-h-72 bg-gray-100 flex items-center justify-center overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value}
              alt="Cover preview"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102"
            />
          </div>

          {/* Action Overlay */}
          <div className="p-3 bg-white border-t border-gray-100 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-700 truncate">
              <CheckCircle2 className="w-4 h-4 text-[#2D9B7C] shrink-0" />
              <span className="truncate max-w-xs">{value.split('/').pop() || 'Cover image attached'}</span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="text-xs font-semibold gap-1.5 py-1 px-3"
              >
                {uploading ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <RefreshCw className="w-3.5 h-3.5" />
                )}
                <span>Replace</span>
              </Button>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleRemove}
                disabled={uploading}
                className="text-xs font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 py-1 px-3"
              >
                <X className="w-3.5 h-3.5 mr-1" />
                <span>Remove</span>
              </Button>
            </div>
          </div>
        </div>
      ) : (
        /* Upload Area */
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-2xl p-8 sm:p-10 text-center cursor-pointer transition-all duration-200 ${
            dragOver
              ? 'border-[#0F4A3E] bg-[#EAF7F2]'
              : 'border-gray-300 hover:border-gray-400 bg-gray-50/60 hover:bg-gray-50'
          }`}
        >
          {uploading ? (
            <div className="py-6 space-y-3">
              <Loader2 className="w-8 h-8 text-[#0F4A3E] animate-spin mx-auto" />
              <p className="text-xs font-bold text-gray-700">
                Uploading to Supabase Storage...
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-white border border-gray-200 flex items-center justify-center mx-auto text-[#0F4A3E] shadow-2xs">
                <Upload className="w-6 h-6 text-[#2D9B7C]" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900">
                  <span className="text-[#0F4A3E] underline">Click to upload</span> or drag and drop cover image
                </p>
                <p className="text-[11px] text-gray-500 mt-1">
                  Supports JPEG, PNG, WebP, GIF (up to 10MB). Recommended: 1200 × 630px.
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
