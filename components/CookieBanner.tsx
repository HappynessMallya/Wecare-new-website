'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import {
  getStoredConsent,
  setStoredConsent,
  defaultConsent,
} from '@/lib/cookie-consent';

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [prefs, setPrefs] = useState(defaultConsent.preferences);

  useEffect(() => {
    const stored = getStoredConsent();
    if (!stored?.accepted) setVisible(true);
  }, []);

  function acceptAll() {
    setStoredConsent({
      accepted: true,
      timestamp: Date.now(),
      preferences: {
        essential: true,
        analytics: true,
        marketing: true,
      },
    });
    setVisible(false);
    setShowCustomize(false);
  }

  function rejectNonEssential() {
    setStoredConsent({
      accepted: true,
      timestamp: Date.now(),
      preferences: {
        essential: true,
        analytics: false,
        marketing: false,
      },
    });
    setVisible(false);
    setShowCustomize(false);
  }

  function saveCustomize() {
    setStoredConsent({
      accepted: true,
      timestamp: Date.now(),
      preferences: { ...prefs, essential: true },
    });
    setVisible(false);
    setShowCustomize(false);
  }

  if (!visible) return null;

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'tween', duration: 0.3 }}
          className="fixed z-[100] border border-neutral-200 bg-white shadow-lg rounded-lg
            bottom-2 left-2 right-2 max-h-[60vh] overflow-y-auto
            md:bottom-4 md:left-4 md:right-auto md:max-w-sm md:max-h-none"
          role="dialog"
          aria-labelledby="cookie-banner-heading"
          aria-describedby="cookie-banner-desc"
        >
          <div className="p-2.5 md:p-3">
            <div className="flex flex-col gap-2 md:gap-2.5">
              <div className="flex items-start gap-2">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <Cookie className="h-3.5 w-3.5 md:h-4 md:w-4" aria-hidden />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 id="cookie-banner-heading" className="font-display text-sm md:text-base font-semibold text-primary leading-tight">
                    Cookies on WeCARE Foundation
                  </h2>
                  <p id="cookie-banner-desc" className="mt-0.5 text-[11px] md:text-xs text-neutral-700 leading-snug">
                    We use cookies. Accept all, reject non-essential, or{' '}
                    <button
                      type="button"
                      onClick={() => setShowCustomize(true)}
                      className="font-medium text-primary underline hover:text-cta"
                    >
                      customize
                    </button>
                    .{' '}
                    <Link href="#cookies" className="font-medium text-primary underline hover:text-cta">Cookie</Link>
                    {' & '}
                    <Link href="#privacy" className="font-medium text-primary underline hover:text-cta">Privacy</Link>.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-1.5 md:gap-2">
                <Button size="default" className="!h-8 !px-3 !text-xs" onClick={acceptAll}>
                  Accept all
                </Button>
                <Button variant="outline" size="default" className="!h-8 !px-3 !text-xs" onClick={rejectNonEssential}>
                  Reject
                </Button>
                <Button variant="ghost" size="default" className="!h-8 !px-2 !text-xs" onClick={() => setShowCustomize(true)}>
                  Customize
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Customize modal */}
      <AnimatePresence>
        {showCustomize && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[101] flex items-end justify-center bg-black/40 p-4 md:items-center"
            onClick={() => setShowCustomize(false)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-customize-heading"
          >
            <motion.div
              initial={{ y: 80 }}
              animate={{ y: 0 }}
              exit={{ y: 80 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg rounded-card border border-neutral-200 bg-white p-6 shadow-xl"
            >
              <div className="flex items-center justify-between">
                <h2
                  id="cookie-customize-heading"
                  className="font-display text-xl font-semibold text-primary"
                >
                  Customize cookies
                </h2>
                <button
                  type="button"
                  onClick={() => setShowCustomize(false)}
                  className="rounded-button p-2 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <p className="mt-2 text-sm text-neutral-600">
                Choose which cookies you allow. Essential cookies are required
                for the site to function.
              </p>

              <ul className="mt-6 space-y-4">
                <li className="flex items-start justify-between gap-4 rounded-button border border-neutral-200 p-4">
                  <div>
                    <span className="font-medium text-primary">
                      Essential
                    </span>
                    <p className="mt-1 text-sm text-neutral-600">
                      Required for the website to work. Cannot be disabled.
                    </p>
                  </div>
                  <span className="shrink-0 text-sm text-neutral-500">
                    Always on
                  </span>
                </li>
                <li className="flex items-start justify-between gap-4 rounded-button border border-neutral-200 p-4">
                  <div>
                    <span className="font-medium text-primary">
                      Analytics
                    </span>
                    <p className="mt-1 text-sm text-neutral-600">
                      Help us understand how visitors use the site.
                    </p>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      checked={prefs.analytics}
                      onChange={(e) =>
                        setPrefs((p) => ({ ...p, analytics: e.target.checked }))
                      }
                      className="sr-only"
                    />
                    <span
                      className={`relative inline-block h-6 w-12 rounded-full transition-colors ${
                        prefs.analytics ? 'bg-cta' : 'bg-neutral-300'
                      }`}
                    >
                      <span
                        className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow transition-transform ${
                          prefs.analytics ? 'translate-x-6' : 'translate-x-0'
                        }`}
                      />
                    </span>
                  </label>
                </li>
                <li className="flex items-start justify-between gap-4 rounded-button border border-neutral-200 p-4">
                  <div>
                    <span className="font-medium text-primary">
                      Marketing / Personalization
                    </span>
                    <p className="mt-1 text-sm text-neutral-600">
                      Used to deliver relevant content and ads.
                    </p>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      checked={prefs.marketing}
                      onChange={(e) =>
                        setPrefs((p) => ({
                          ...p,
                          marketing: e.target.checked,
                        }))
                      }
                      className="sr-only"
                    />
                    <span
                      className={`relative inline-block h-6 w-12 rounded-full transition-colors ${
                        prefs.marketing ? 'bg-cta' : 'bg-neutral-300'
                      }`}
                    >
                      <span
                        className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow transition-transform ${
                          prefs.marketing ? 'translate-x-6' : 'translate-x-0'
                        }`}
                      />
                    </span>
                  </label>
                </li>
              </ul>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button onClick={saveCustomize}>Save preferences</Button>
                <Button variant="outline" onClick={() => setShowCustomize(false)}>
                  Cancel
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
