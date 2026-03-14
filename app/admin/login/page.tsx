'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { login, getApiErrorMessage } from '@/lib/api';

const LOGIN_IMAGE =
  'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&q=80';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      router.push('/admin');
      router.refresh();
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row">
      {/* Left: image — full height on desktop, slim strip on mobile */}
      <div className="relative h-32 shrink-0 lg:hidden">
        <Image
          src={LOGIN_IMAGE}
          alt=""
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[var(--blue)]/25" aria-hidden />
      </div>
      <div className="relative hidden w-0 flex-1 lg:block">
        <Image
          src={LOGIN_IMAGE}
          alt=""
          fill
          className="object-cover"
          priority
          sizes="50vw"
        />
        <div className="absolute inset-0 bg-[var(--blue)]/20" aria-hidden />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <p className="text-sm font-600 tracking-wide opacity-95">
            WeCare Foundation
          </p>
          <p className="mt-1 text-lg font-700">
            Early childhood development — Tanzania
          </p>
        </div>
      </div>

      {/* Right: login form */}
      <div className="flex w-full flex-col justify-center bg-[var(--off)] px-6 py-12 lg:w-[50%] lg:min-w-[420px] lg:px-16">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-8 flex items-center gap-3 lg:mb-10">
            <Image
              src="/logo.png"
              alt="WeCare"
              width={48}
              height={48}
              className="h-12 w-12 object-contain"
            />
            <div>
              <h1 className="text-xl font-800 text-[var(--blue)]">WeCare</h1>
              <p className="text-sm font-600 text-[var(--rose)]">Admin login</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-lg bg-[var(--orange-30)] px-4 py-2 text-sm font-600 text-[var(--orange)]">
                {error}
              </div>
            )}
            <div>
              <label
                htmlFor="email"
                className="mb-1 block text-sm font-600 text-[var(--g800)]"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full rounded-lg border border-[var(--g400)]/40 bg-white px-3 py-2.5 text-[var(--g800)] focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="mb-1 block text-sm font-600 text-[var(--g800)]"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full rounded-lg border border-[var(--g400)]/40 bg-white px-3 py-2.5 text-[var(--g800)] focus:border-[var(--rose)] focus:outline-none focus:ring-1 focus:ring-[var(--rose)]"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-[var(--rose)] py-2.5 text-sm font-700 text-white transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[var(--g600)]">
            <Link
              href="/admin/forgot-password"
              className="font-600 text-[var(--blue)] hover:underline"
            >
              Forgot password?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
