import type { Metadata } from "next";
import Script from "next/script";
import CustomerPageClient from "./customer-client";
import "./customer.css";

export const metadata: Metadata = {
  title: "XOLVON - Customer Dashboard",
  description: "The Attention Economy Platform - Customer View",
};

export default function CustomerPage() {
  return (
    <>
      <Script src="https://cdn.jsdelivr.net/npm/chart.js" strategy="afterInteractive" />
      <CustomerPageClient />
    </>
  );
}
