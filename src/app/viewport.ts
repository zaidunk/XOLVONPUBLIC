// app/viewport.ts
// Export a Next.js Viewport object used by App Router for metadata.
// Keep defaults safe and include themeColor from siteConfig if available.

import type { Viewport } from 'next';

export const viewport: Viewport = {
  // typical mobile-first viewport settings
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
  // themeColor will be used by Next to inject <meta name="theme-color" content="...">
  // siteConfig.themeColor should be a string like '#000000' — fallback to black if not present
  themeColor: '#000000',
};

export default viewport;
