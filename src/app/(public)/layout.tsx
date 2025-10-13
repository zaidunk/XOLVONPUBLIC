// app/landingpage/layout.tsx
// Layout for the landingpage route.
// - Imports global CSS for this route (globals.css)
// - Imports Swiper CSS once (recommended: keep libraries loaded once)
// - Sets <body> class to main-bg so the page background gradients are visible
// Place this file at app/landingpage/layout.tsx (same folder as page.tsx)

import '../global.css';

/* Import Swiper CSS here once for this route (better than importing repeatedly in page) */
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import React from 'react';

export const metadata = {
  title: 'Xolvon - Landing',
  description: 'Xolvon Landing Page',
};

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
