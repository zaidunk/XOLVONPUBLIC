'use client';

import React from 'react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  console.error('App error:', error);
  return (
    <html>
      <body className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-3xl font-bold mb-3">Something went wrong</h1>
          <p className="text-zinc-400 mb-6">
            Please refresh or return to home.
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => reset()}
              className="px-4 py-2 bg-purple-600 rounded-md hover:bg-purple-700 transition"
            >
              Try again
            </button>
            <Link
              href="/"
              className="px-4 py-2 border border-zinc-600 rounded-md hover:bg-zinc-900 transition"
            >
              Go home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
