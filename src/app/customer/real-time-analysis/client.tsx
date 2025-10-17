'use client';

import { useEffect } from 'react';
import { MessageSquareQuote, Smile, Frown, ShieldAlert, Bot } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

export default function RealTimeAnalysisClient() {
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
        {/* 1. Hero Section */}
        <section className="text-center py-12 fade-in-up">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900/50 rounded-2xl mb-6">
            <MessageSquareQuote className="w-12 h-12 text-green-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[--text-primary] leading-tight">
            Understand Your Audience with Real-time Sentiment Analysis.
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-[--text-secondary]">
            Pahami sentimen audiens secara real-time. Dapatkan analisis mendalam tentang bagaimana perasaan mereka terhadap brand, produk, atau kampanye Anda, langsung ke WhatsApp Anda.
          </p>
          <div className="mt-8">
            <a
              href="https://wa.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="animated-gradient-button realtime-analysis-button"
            >
              <FaWhatsapp className="w-5 h-5" />
              Get Sentiment Analysis via WhatsApp
            </a>
          </div>
        </section>

        {/* 2. How It Works Section */}
        <section className="mt-16 fade-in-up">
          <h2 className="text-3xl font-bold text-center">Simple Setup, Powerful Insights.</h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {/* Step 1 */}
            <div className="bg-[--bg-secondary] border border-[--border-primary] rounded-2xl p-6">
              <div className="w-12 h-12 mx-auto rounded-full bg-[--bg-tertiary] flex items-center justify-center font-bold text-xl text-green-500">
                1
              </div>
              <h3 className="mt-4 font-bold text-lg">Connect to Bot</h3>
              <p className="mt-2 text-sm text-[--text-secondary]">
                Mulai percakapan dengan bot WhatsApp kami untuk mengaktifkan layanan analisis sentimen.
              </p>
            </div>
            {/* Step 2 */}
            <div className="bg-[--bg-secondary] border border-[--border-primary] rounded-2xl p-6">
              <div className="w-12 h-12 mx-auto rounded-full bg-[--bg-tertiary] flex items-center justify-center font-bold text-xl text-green-500">
                2
              </div>
              <h3 className="mt-4 font-bold text-lg">AI Sentiment Analysis</h3>
              <p className="mt-2 text-sm text-[--text-secondary]">
                AI kami memonitor percakapan publik untuk menganalisis sentimen secara akurat.
              </p>
            </div>
            {/* Step 3 */}
            <div className="bg-[--bg-secondary] border border-[--border-primary] rounded-2xl p-6">
              <div className="w-12 h-12 mx-auto rounded-full bg-[--bg-tertiary] flex items-center justify-center font-bold text-xl text-green-500">
                3
              </div>
              <h3 className="mt-4 font-bold text-lg">Receive Reports</h3>
              <p className="mt-2 text-sm text-[--text-secondary]">
                Dapatkan laporan sentimen instan di WhatsApp saat Anda membutuhkannya.
              </p>
            </div>
          </div>
        </section>

        {/* 3. Features Section */}
        <section className="mt-16 fade-in-up">
          <h2 className="text-3xl font-bold text-center">Core Analysis Features</h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature Card: Real-time Emotion Tracking */}
            <div className="bg-[--bg-secondary] border border-[--border-primary] rounded-2xl p-6">
              <Smile className="w-8 h-8 text-green-500 mb-4" />
              <h3 className="font-bold text-lg">Real-time Emotion Tracking</h3>
              <p className="mt-2 text-sm text-[--text-secondary]">
                Lacak sentimen positif, negatif, dan netral secara real-time.
              </p>
            </div>
            {/* Feature Card: Topic-based Sentiment */}
            <div className="bg-[--bg-secondary] border border-[--border-primary] rounded-2xl p-6">
              <Frown className="w-8 h-8 text-red-500 mb-4" />
              <h3 className="font-bold text-lg">Topic-based Sentiment</h3>
              <p className="mt-2 text-sm text-[--text-secondary]">
                Pahami sentimen terkait topik atau kata kunci spesifik.
              </p>
            </div>
            {/* Feature Card: Competitor Comparison */}
            <div className="bg-[--bg-secondary] border border-[--border-primary] rounded-2xl p-6">
              <Bot className="w-8 h-8 text-purple-500 mb-4" />
              <h3 className="font-bold text-lg">Competitor Comparison</h3>
              <p className="mt-2 text-sm text-[--text-secondary]">
                Bandingkan sentimen brand Anda dengan kompetitor.
              </p>
            </div>
            {/* Feature Card: Crisis Detection */}
            <div className="bg-[--bg-secondary] border border-[--border-primary] rounded-2xl p-6">
              <ShieldAlert className="w-8 h-8 text-yellow-500 mb-4" />
              <h3 className="font-bold text-lg">Crisis Detection</h3>
              <p className="mt-2 text-sm text-[--text-secondary]">
                Dapatkan peringatan dini jika ada lonjakan sentimen negatif.
              </p>
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <footer className="mt-16 text-center py-6 border-t border-[--border-primary]">
          <p className="text-sm text-[--text-secondary]">Make smarter decisions with Xolvon Sentiment Analysis</p>
          <a href="#" className="mt-2 inline-block text-sm font-semibold text-green-500 hover:underline">
            Learn More
          </a>
        </footer>
      </div>
    </main>
  );
}
