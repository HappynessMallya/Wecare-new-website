'use client';

import { useState, useRef, useEffect } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';
import { getMediaLimits, uploadMedia, getApiErrorMessage } from '@/lib/api';

const ACCEPT = 'image/jpeg,image/png,image/webp,image/gif';
const DEFAULT_MAX_BYTES = 5 * 1024 * 1024; // 5 MB fallback

export type ImageUploadProps = {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  /** Optional: allow only images (default true). Keep for future video support. */
  imageOnly?: boolean;
  className?: string;
};

export function ImageUpload({
  value,
  onChange,
  label = 'Image',
  imageOnly = true,
  className = '',
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [maxBytes, setMaxBytes] = useState(DEFAULT_MAX_BYTES);

  useEffect(() => {
    getMediaLimits()
      .then((limits) => setMaxBytes(limits.maxImageSizeBytes))
      .catch(() => {});
  }, []);

  const handleFile = async (file: File) => {
    setError('');
    const type = file.type?.toLowerCase() || '';
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowed.includes(type)) {
      setError('Please choose a JPEG, PNG, WebP or GIF image.');
      return;
    }
    if (file.size > maxBytes) {
      const mb = (maxBytes / (1024 * 1024)).toFixed(1);
      setError(`File is too large. Maximum size is ${mb} MB.`);
      return;
    }
    setUploading(true);
    try {
      const { url } = await uploadMedia(file);
      onChange(url);
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div className={className}>
      {label && (
        <label className="mb-1 block text-sm font-600 text-[var(--g800)]">
          {label}
        </label>
      )}
      <div className="flex flex-wrap items-start gap-3">
        {value && (
          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg border border-[var(--g400)]/40 bg-[var(--g100)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={value} alt="" className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={() => onChange('')}
              className="absolute right-1 top-1 rounded bg-black/60 p-1 text-white hover:bg-black/80"
              aria-label="Remove image"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <input
            ref={inputRef}
            type="file"
            accept={ACCEPT}
            onChange={onInputChange}
            className="hidden"
            disabled={uploading}
          />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="inline-flex w-fit items-center gap-2 rounded-lg border border-[var(--blue)]/30 bg-white px-3 py-2 text-sm font-600 text-[var(--blue)] transition-colors hover:bg-[var(--blue)]/5 disabled:opacity-60"
          >
            {uploading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Uploading…
              </>
            ) : (
              <>
                <Upload className="h-4 w-4" />
                {value ? 'Replace image' : 'Upload image'}
              </>
            )}
          </button>
          <p className="text-xs text-[var(--g600)]">
            JPEG, PNG, WebP or GIF. Max {(maxBytes / (1024 * 1024)).toFixed(1)} MB.
          </p>
          {error && (
            <p className="text-sm font-600 text-[var(--orange)]">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
}
