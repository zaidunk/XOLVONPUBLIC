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
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" integrity="sha512-Fo3rlrZj/k7ujTnHg4CGR2D7kSs0v4LLanw2qksYuRlEzO+tcaEPQogQ0KaoGN26/zrn20ImR1DfuLWnOo7aBA==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
