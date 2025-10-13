// src/app/layout.tsx
import "./global.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Xolvon",
  description: "Your end-to-end data companion.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
