'use client';

import { useEffect } from 'react';
import { ShieldCheck, Send, ShieldAlert, Bot, DatabaseZap, MessageCircleWarning, Siren } from 'lucide-react';

export default function CyberDefenseClient() {
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
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 dark:bg-blue-900/50 rounded-2xl mb-6">
            <ShieldCheck className="w-12 h-12 text-[--brand-primary]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[--text-primary] leading-tight">
            Activate Your 24/7 Cyber Defense Shield.
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-[--text-secondary]">
            Lindungi reputasi Anda dari serangan digital. Sistem pertahanan kami yang didukung AI bekerja melalui
            Telegram untuk mendeteksi dan memberi tahu Anda tentang ancaman secara real-time.
          </p>
          <div className="mt-8">
            <a
              href="https://t.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[--brand-primary] text-white font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition transform hover:scale-105 shadow-lg shadow-blue-500/20"
            >
              <Send className="w-5 h-5" />
              Activate via Telegram
            </a>
          </div>
        </section>

        {/* 2. How It Works Section */}
        <section className="mt-16 fade-in-up">
          <h2 className="text-3xl font-bold text-center">Simple Setup, Powerful Defense.</h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {/* Step 1 */}
            <div className="bg-[--bg-secondary] border border-[--border-primary] rounded-2xl p-6">
              <div className="w-12 h-12 mx-auto rounded-full bg-[--bg-tertiary] flex items-center justify-center font-bold text-xl text-[--brand-primary]">
                1
              </div>
              <h3 className="mt-4 font-bold text-lg">Connect to Bot</h3>
              <p className="mt-2 text-sm text-[--text-secondary]">
                Start a conversation with our Telegram bot and link your social media accounts securely.
              </p>
            </div>
            {/* Step 2 */}
            <div className="bg-[--bg-secondary] border border-[--border-primary] rounded-2xl p-6">
              <div className="w-12 h-12 mx-auto rounded-full bg-[--bg-tertiary] flex items-center justify-center font-bold text-xl text-[--brand-primary]">
                2
              </div>
              <h3 className="mt-4 font-bold text-lg">AI Monitoring</h3>
              <p className="mt-2 text-sm text-[--text-secondary]">
                Our AI starts monitoring comments, mentions, and activities across your profiles 24/7.
              </p>
            </div>
            {/* Step 3 */}
            <div className="bg-[--bg-secondary] border border-[--border-primary] rounded-2xl p-6">
              <div className="w-12 h-12 mx-auto rounded-full bg-[--bg-tertiary] flex items-center justify-center font-bold text-xl text-[--brand-primary]">
                3
              </div>
              <h3 className="mt-4 font-bold text-lg">Receive Alerts</h3>
              <p className="mt-2 text-sm text-[--text-secondary]">
                Get instant alerts and recommended actions directly on your Telegram for any detected threat.
              </p>
            </div>
          </div>
        </section>

        {/* 2.5 Visual Preview Section */}
        <section className="mt-16 fade-in-up">
          <div className="text-center">
            <h2 className="text-3xl font-bold">See Our AI in Action</h2>
            <p className="mt-2 max-w-2xl mx-auto text-[--text-secondary]">
              Get a glimpse of how Xolvon alerts you to threats directly within Telegram.
            </p>
          </div>

          {/* Phone Mockup */}
          <div className="mt-8 max-w-md mx-auto bg-[--bg-tertiary] dark:bg-slate-800/50 p-4 rounded-3xl">
            <div className="bg-[--bg-secondary] border border-[--border-primary] rounded-2xl shadow-inner overflow-hidden">
              {/* Telegram Header */}
              <div className="flex items-center gap-3 p-3 bg-[--bg-tertiary] border-b border-[--border-primary]">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-bold">Xolvon Defense Bot</p>
                  <p className="text-xs text-green-500">online</p>
                </div>
              </div>

              {/* Chat Area */}
              <div className="p-4 space-y-4 h-96 bg-blue-50 dark:bg-slate-900/40">
                {/* Bot Message */}
                <div className="flex">
                  <div className="bg-white dark:bg-slate-700 p-3 rounded-lg rounded-bl-none max-w-xs">
                    <p className="text-sm font-bold text-red-500 flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4" /> High-Priority Threat Detected
                    </p>
                    <div className="mt-2 text-xs border-l-2 border-red-500 pl-2 space-y-0.5">
                      <p>
                        <span className="font-semibold text-[--text-secondary]">Source:</span> Instagram Post
                      </p>
                      <p>
                        <span className="font-semibold text-[--text-secondary]">Threat:</span> Coordinated Negative
                        Comments
                      </p>
                      <p>
                        <span className="font-semibold text-[--text-secondary]">Severity:</span>{' '}
                        <span className="text-red-500 font-bold">Critical</span>
                      </p>
                    </div>
                    <p className="mt-2 text-sm italic text-[--text-secondary]">
                      "This is the worst product ever, don't buy it!! Total scam."
                    </p>

                    {/* Action Buttons */}
                    <div className="mt-3 pt-3 border-t border-[--border-primary] flex gap-2">
                      <button className="text-xs bg-red-500 text-white font-semibold py-1 px-3 rounded-full hover:bg-red-600 transition">
                        Hide Comment
                      </button>
                      <button className="text-xs bg-gray-200 dark:bg-slate-600 font-semibold py-1 px-3 rounded-full hover:bg-gray-300 dark:hover:bg-slate-500 transition">
                        Block User
                      </button>
                    </div>
                  </div>
                </div>
                {/* Another Bot Message */}
                <div className="flex">
                  <div className="bg-white dark:bg-slate-700 p-3 rounded-lg rounded-bl-none max-w-xs">
                    <p className="text-sm font-bold text-yellow-600 dark:text-yellow-500 flex items-center gap-2">
                      <Bot className="w-4 h-4" /> Spam Account Detected
                    </p>
                    <div className="mt-2 text-xs border-l-2 border-yellow-500 pl-2 space-y-0.5">
                      <p>
                        <span className="font-semibold text-[--text-secondary]">Account:</span> @promo_akun123
                      </p>
                    </div>
                    <p className="mt-2 text-sm italic text-[--text-secondary]">
                      "CEK PROFIL KITA KAK UNTUK PROMO MENARIK LAINNYA!"
                    </p>
                    {/* Action Buttons */}
                    <div className="mt-3 pt-3 border-t border-[--border-primary] flex gap-2">
                      <button className="text-xs bg-gray-200 dark:bg-slate-600 font-semibold py-1 px-3 rounded-full hover:bg-gray-300 dark:hover:bg-slate-500 transition">
                        Delete Comment
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Features Section */}
        <section className="mt-16 fade-in-up">
          <h2 className="text-3xl font-bold text-center">Core Defense Features</h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature Card: Account Data Checking */}
            <div className="bg-[--bg-secondary] border border-[--border-primary] rounded-2xl p-6">
              <DatabaseZap className="w-8 h-8 text-cyan-500 mb-4" />
              <h3 className="font-bold text-lg">Account Data Checking</h3>
              <p className="mt-2 text-sm text-[--text-secondary]">
                Mendeteksi jika data terhubung Anda muncul dalam kebocoran data (data breach).
              </p>
            </div>
            {/* Feature Card: Negative Comment Alerts */}
            <div className="bg-[--bg-secondary] border border-[--border-primary] rounded-2xl p-6">
              <MessageCircleWarning className="w-8 h-8 text-red-500 mb-4" />
              <h3 className="font-bold text-lg">Negative Comment Alerts</h3>
              <p className="mt-2 text-sm text-[--text-secondary]">
                Detects hateful, spam, or potentially damaging comments instantly.
              </p>
            </div>
            {/* Feature Card: Bot & Spam Detection */}
            <div className="bg-[--bg-secondary] border border-[--border-primary] rounded-2xl p-6">
              <Bot className="w-8 h-8 text-yellow-500 mb-4" />
              <h3 className="font-bold text-lg">Bot & Spam Detection</h3>
              <p className="mt-2 text-sm text-[--text-secondary]">
                Identifies and flags inorganic activity from bots or spam accounts.
              </p>
            </div>
            {/* Feature Card: Crisis Management AI */}
            <div className="bg-[--bg-secondary] border border-[--border-primary] rounded-2xl p-6">
              <Siren className="w-8 h-8 text-orange-500 mb-4" />
              <h3 className="font-bold text-lg">Crisis Management AI</h3>
              <p className="mt-2 text-sm text-[--text-secondary]">
                Provides initial recommendations during a potential PR crisis.
              </p>
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <footer className="mt-16 text-center py-6 border-t border-[--border-primary]">
          <p className="text-sm text-[--text-secondary]">Secure your digital presence with Xolvon Cyber Defense</p>
          <a href="#" className="mt-2 inline-block text-sm font-semibold text-[--brand-primary] hover:underline">
            Learn More
          </a>
        </footer>
      </div>
    </main>
  );
}
