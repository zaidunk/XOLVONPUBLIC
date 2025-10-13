import Link from 'next/link';

export default function NotFound() {
  return (
    <html>
      <body className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-4xl font-extrabold mb-4">404 — Page not found</h1>
          <p className="text-zinc-400 mb-6">
            We couldn’t find the page you’re looking for.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-purple-600 rounded-md hover:bg-purple-700 transition"
          >
            Return home
          </Link>
        </div>
      </body>
    </html>
  );
}
