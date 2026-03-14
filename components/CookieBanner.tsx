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
          className="fixed bottom-0 left-0 right-0 z-[100] border-t border-neutral-200 bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.08)]"
          role="dialog"
          aria-labelledby="cookie-banner-heading"
          aria-describedby="cookie-banner-desc"
        >
          <div className="mx-auto max-w-7xl px-4 py-4 md:px-6 md:py-5 lg:px-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-6">
              <div className="flex-1">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-button bg-primary/10 text-primary">
                    <Cookie className="h-5 w-5" aria-hidden />
                  </div>
                  <div>
                    <h2 id="cookie-banner-heading" className="font-display text-lg font-semibold text-primary">
                      About cookies on WeCARE Foundation
                    </h2>
                    <p id="cookie-banner-desc" className="mt-1 text-sm text-neutral-700">
                      We use cookies to enhance your experience, analyze site
                      performance, and deliver personalized content and ads. You
                      can accept all cookies, reject non-essential cookies, or
                      customize your preferences. For more information, see our{' '}
                      <Link
                        href="#cookies"
                        className="font-medium text-primary underline hover:text-cta"
                      >
                        Cookie Policy
                      </Link>{' '}
                      &{' '}
                      <Link
                        href="#privacy"
                        className="font-medium text-primary underline hover:text-cta"
                      >
                        Privacy Policy
                      </Link>
                      .
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex shrink-0 flex-wrap items-center gap-3">
                <Button size="default" onClick={acceptAll}>
                  Accept all
                </Button>
                <Button
                  variant="outline"
                  size="default"
                  onClick={rejectNonEssential}
                >
                  Reject all
                </Button>
                <Button
                  variant="ghost"
                  size="default"
                  onClick={() => setShowCustomize(true)}
                >
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
