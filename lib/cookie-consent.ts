export const COOKIE_CONSENT_KEY = 'wecare_cookie_consent';

export type CookieCategory = 'essential' | 'analytics' | 'marketing';

export type CookieConsent = {
  accepted: boolean;
  timestamp: number;
  preferences: {
    essential: boolean;
    analytics: boolean;
    marketing: boolean;
  };
};

export const defaultConsent: CookieConsent = {
  accepted: false,
  timestamp: 0,
  preferences: {
    essential: true,
    analytics: false,
    marketing: false,
  },
};

export function getStoredConsent(): CookieConsent | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as CookieConsent;
  } catch {
    return null;
  }
}

export function setStoredConsent(consent: CookieConsent): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent));
  } catch {
    // ignore
  }
}
