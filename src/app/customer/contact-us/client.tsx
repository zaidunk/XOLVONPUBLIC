'use client';

import { useEffect } from 'react';
import { HelpCircle } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { SiGmail } from 'react-icons/si';

export default function ContactUsClient() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.fade-in-up').forEach((el) => observer.observe(el));

    return () => {
      document.querySelectorAll('.fade-in-up').forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <main className="flex-1 p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        {/* 2. Contact Methods Section */}
        <section className="mt-16 fade-in-up">
          <h2 className="text-3xl font-bold text-center">Contact Information</h2>
          <p className="mt-2 text-center text-[--text-secondary]">
            For further assistance, you can reach us through the following channels:
          </p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <a
              href="mailto:contact@xolvon.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-[--bg-secondary] border border-[--border-primary] rounded-2xl p-6 hover:border-[--brand-primary] transition-colors"
            >
              <div className="w-12 h-12 mx-auto rounded-full bg-[--bg-tertiary] flex items-center justify-center">
                <SiGmail className="text-[--brand-primary] text-2xl" />
              </div>
              <h3 className="mt-4 font-bold text-lg">Email</h3>
              <p className="mt-2 text-sm text-[--text-secondary]">contact@xolvon.com</p>
            </a>
            <a
              href="https://wa.me/6281234567890" // Placeholder WhatsApp number
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-[--bg-secondary] border border-[--border-primary] rounded-2xl p-6 hover:border-[--brand-primary] transition-colors"
            >
              <div className="w-12 h-12 mx-auto rounded-full bg-[--bg-tertiary] flex items-center justify-center">
                <FontAwesomeIcon icon={faWhatsapp} className="text-[--brand-primary] text-2xl" />
              </div>
              <h3 className="mt-4 font-bold text-lg">WhatsApp</h3>
              <p className="mt-2 text-sm text-[--text-secondary]">+62 812-3456-7890</p>
            </a>
            <a
              href="https://instagram.com/xolvon" // Placeholder Instagram handle
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-[--bg-secondary] border border-[--border-primary] rounded-2xl p-6 hover:border-[--brand-primary] transition-colors"
            >
              <div className="w-12 h-12 mx-auto rounded-full bg-[--bg-tertiary] flex items-center justify-center">
                <FontAwesomeIcon icon={faInstagram} className="text-[--brand-primary] text-2xl" />
              </div>
              <h3 className="mt-4 font-bold text-lg">Instagram</h3>
              <p className="mt-2 text-sm text-[--text-secondary]">@xolvon</p>
            </a>
          </div>
        </section>

        {/* 3. FAQ Section */}
        <section className="mt-16 fade-in-up">
          <h2 className="text-3xl font-bold text-center">Frequently Asked Questions</h2>
          <div className="mt-8 max-w-3xl mx-auto space-y-4">
            <div className="bg-[--bg-secondary] border border-[--border-primary] rounded-2xl p-6">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-cyan-500" />
                What is XOLVON?
              </h3>
              <p className="mt-2 text-sm text-[--text-secondary]">
                XOLVON is a platform that provides various services to boost your business, from real-time data
                analysis to cyber defense.
              </p>
            </div>
            <div className="bg-[--bg-secondary] border border-[--border-primary] rounded-2xl p-6">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-cyan-500" />
                How can I subscribe to a service?
              </h3>
              <p className="mt-2 text-sm text-[--text-secondary]">
                You can subscribe to our services through the pricing page. Each service has its own subscription plan.
              </p>
            </div>
            <div className="bg-[--bg-secondary] border border-[--border-primary] rounded-2xl p-6">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-cyan-500" />
                Can I cancel my subscription?
              </h3>
              <p className="mt-2 text-sm text-[--text-secondary]">
                Yes, you can cancel your subscription at any time from your account settings.
              </p>
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <footer className="mt-16 text-center py-6 border-t border-[--border-primary]">
          <p className="text-sm text-[--text-secondary]">We look forward to hearing from you!</p>
          <a href="/customer/pricing" className="mt-2 inline-block text-sm font-semibold text-[--brand-primary] hover:underline">
            Explore Our Services
          </a>
        </footer>
      </div>
    </main>
  );
}
