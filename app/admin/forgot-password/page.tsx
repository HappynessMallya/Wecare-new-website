'use client';

import { useState } from 'react';
import Link from 'next/link';
import { forgotPassword, getApiErrorMessage } from '@/lib/api';

export default function AdminForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await forgotPassword(email);
      setSent(true);
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="w-full max-w-md rounded-2xl border border-[var(--blue)]/10 bg-white p-8 shadow-lg">
        <h1 className="text-xl font-800 text-[var(--blue)]">Check your email</h1>
        <p className="mt-2 text-sm text-[var(--g600)]">
          If an account exists for {email}, we’ve sent a link to reset your password.
        </p>
        <Link href="/admin/login" className="mt-6 inline-block text-sm font-600 text-[var(--rose)] hover:underline">
          ← Back to login
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md rounded-2xl border border-[var(--blue)]/10 bg-white p-8 shadow-lg">
      <h1 className="text-xl font-800 text-[var(--blue)]">Forgot password</h1>
      <p className="mt-1 text-sm text-[var(--g600)]">Enter your email to receive a reset link.</p>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        {error && (
          <div className="rounded-lg bg-[var(--orange-30)] px-4 py-2 text-sm font-600 text-[var(--orange)]">
            {error}
          </div>
        )}
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-600 text-[var(--g800)]">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-lg border border-[var(--g400)]/40 px-3 py-2.5 focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-[var(--rose)] py-2.5 text-sm font-700 text-white hover:opacity-90 disabled:opacity-60"
        >
          {loading ? 'Sending…' : 'Send reset link'}
        </button>
      </form>
      <Link href="/admin/login" className="mt-6 inline-block text-sm font-600 text-[var(--blue)] hover:underline">
        ← Back to login
      </Link>
    </div>
  );
}
