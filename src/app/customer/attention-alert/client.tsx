'use client';

import { useEffect } from 'react';
import { TrendingUp, Send, Clock, Zap, Bell, Bot, MessageCircleWarning, Siren } from 'lucide-react';

export default function AttentionAlertClient() {
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
            <TrendingUp className="w-12 h-12 text-blue-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[--text-primary] leading-tight">
            Catch the Next Wave with Attention Alert.
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-[--text-secondary]">
            Jangan ketinggalan tren. Dapatkan notifikasi kapan waktu yang tepat untuk 'riding the wave' dan ikut serta dalam tren yang sedang viral, langsung ke Telegram Anda.
          </p>
          <div className="mt-8">
            <a
              href="https://t.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="animated-gradient-button trend-alert-button"
            >
              <Send className="w-5 h-5" />
              Get Trend Alerts via Telegram
            </a>
          </div>
        </section>

        {/* 2. How It Works Section */}
        <section className="mt-16 fade-in-up">
          <h2 className="text-3xl font-bold text-center">Simple Setup, Powerful Insights.</h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {/* Step 1 */}
            <div className="bg-[--bg-secondary] border border-[--border-primary] rounded-2xl p-6">
              <div className="w-12 h-12 mx-auto rounded-full bg-[--bg-tertiary] flex items-center justify-center font-bold text-xl text-blue-500">
                1
              </div>
              <h3 className="mt-4 font-bold text-lg">Connect to Bot</h3>
              <p className="mt-2 text-sm text-[--text-secondary]">
                Mulai percakapan dengan bot Telegram kami untuk mengaktifkan layanan Attention Alert.
              </p>
            </div>
            {/* Step 2 */}
            <div className="bg-[--bg-secondary] border border-[--border-primary] rounded-2xl p-6">
              <div className="w-12 h-12 mx-auto rounded-full bg-[--bg-tertiary] flex items-center justify-center font-bold text-xl text-blue-500">
                2
              </div>
              <h3 className="mt-4 font-bold text-lg">AI Trend Analysis</h3>
              <p className="mt-2 text-sm text-[--text-secondary]">
                AI kami memonitor jutaan data point untuk mengidentifikasi tren yang sedang naik daun.
              </p>
            </div>
            {/* Step 3 */}
            <div className="bg-[--bg-secondary] border border-[--border-primary] rounded-2xl p-6">
              <div className="w-12 h-12 mx-auto rounded-full bg-[--bg-tertiary] flex items-center justify-center font-bold text-xl text-blue-500">
                3
              </div>
              <h3 className="mt-4 font-bold text-lg">Receive Alerts</h3>
              <p className="mt-2 text-sm text-[--text-secondary]">
                Dapatkan notifikasi instan di Telegram saat sebuah tren siap untuk Anda ikuti.
              </p>
            </div>
          </div>
        </section>

        {/* 2.5 Visual Preview Section */}
        <section className="mt-16 fade-in-up">
          <div className="text-center">
            <h2 className="text-3xl font-bold">See Our AI in Action</h2>
            <p className="mt-2 max-w-2xl mx-auto text-[--text-secondary]">
              Lihat bagaimana Xolvon memberitahu Anda tentang tren baru langsung di Telegram.
            </p>
          </div>

          {/* Phone Mockup */}
          <div className="mt-8 max-w-md mx-auto bg-[--bg-tertiary] dark:bg-slate-800/50 p-4 rounded-3xl">
            <div className="bg-[--bg-secondary] border border-[--border-primary] rounded-2xl shadow-inner overflow-hidden">
              {/* Telegram Header */}
              <div className="flex items-center gap-3 p-3 bg-[--bg-tertiary] border-b border-[--border-primary]">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-bold">Xolvon Attention Alert</p>
                  <p className="text-xs text-blue-500">online</p>
                </div>
              </div>

              {/* Chat Area */}
              <div className="p-4 space-y-4 h-96 bg-blue-50 dark:bg-slate-900/40">
                {/* Bot Message */}
                <div className="flex">
                  <div className="bg-white dark:bg-slate-700 p-3 rounded-lg rounded-bl-none max-w-xs">
                    <p className="text-sm font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
                      <Bell className="w-4 h-4" /> New Trend Alert!
                    </p>
                    <div className="mt-2 text-xs border-l-2 border-blue-500 pl-2 space-y-0.5">
                      <p>
                        <span className="font-semibold text-[--text-secondary]">Trend:</span> #EcoFriendlyLiving
                      </p>
                      <p>
                        <span className="font-semibold text-[--text-secondary]">Momentum:</span>{' '}
                        <span className="text-blue-500 font-bold">High</span>
                      </p>
                       <p>
                        <span className="font-semibold text-[--text-secondary]">Platform:</span> Instagram, TikTok
                      </p>
                    </div>
                    <p className="mt-2 text-sm italic text-[--text-secondary]">
                      "Pembicaraan tentang gaya hidup ramah lingkungan sedang meningkat tajam. Ini waktu yang tepat untuk membuat konten terkait."
                    </p>

                    {/* Action Buttons */}
                    <div className="mt-3 pt-3 border-t border-[--border-primary] flex gap-2">
                      <button className="text-xs bg-blue-500 text-white font-semibold py-1 px-3 rounded-full hover:bg-blue-600 transition">
                        Get Content Ideas
                      </button>
                      <button className="text-xs bg-gray-200 dark:bg-slate-600 font-semibold py-1 px-3 rounded-full hover:bg-gray-300 dark:hover:bg-slate-500 transition">
                        Snooze
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
          <h2 className="text-3xl font-bold text-center">Core Alert Features</h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature Card: Real-time Trend Spotting */}
            <div className="bg-[--bg-secondary] border border-[--border-primary] rounded-2xl p-6">
              <Zap className="w-8 h-8 text-yellow-500 mb-4" />
              <h3 className="font-bold text-lg">Real-time Trend Spotting</h3>
              <p className="mt-2 text-sm text-[--text-secondary]">
                Mengidentifikasi tren yang baru muncul sebelum menjadi viral.
              </p>
            </div>
            {/* Feature Card: Optimal Timing Alerts */}
            <div className="bg-[--bg-secondary] border border-[--border-primary] rounded-2xl p-6">
              <Clock className="w-8 h-8 text-blue-500 mb-4" />
              <h3 className="font-bold text-lg">Optimal Timing Alerts</h3>
              <p className="mt-2 text-sm text-[--text-secondary]">
                Memberi tahu Anda kapan waktu terbaik untuk posting agar mendapatkan jangkauan maksimal.
              </p>
            </div>
            {/* Feature Card: Platform-Specific Insights */}
            <div className="bg-[--bg-secondary] border border-[--border-primary] rounded-2xl p-6">
              <Bot className="w-8 h-8 text-purple-500 mb-4" />
              <h3 className="font-bold text-lg">Platform-Specific Insights</h3>
              <p className="mt-2 text-sm text-[--text-secondary]">
                Memberikan rekomendasi tren yang sesuai untuk platform spesifik (IG, TikTok, dll).
              </p>
            </div>
            {/* Feature Card: Content Idea Generation */}
            <div className="bg-[--bg-secondary] border border-[--border-primary] rounded-2xl p-6">
              <MessageCircleWarning className="w-8 h-8 text-red-500 mb-4" />
              <h3 className="font-bold text-lg">Content Idea Generation</h3>
              <p className="mt-2 text-sm text-[--text-secondary]">
                Memberikan ide konten awal untuk membantu Anda memulai.
              </p>
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <footer className="mt-16 text-center py-6 border-t border-[--border-primary]">
          <p className="text-sm text-[--text-secondary]">Stay ahead of the curve with Xolvon Attention Alert</p>
          <a href="#" className="mt-2 inline-block text-sm font-semibold text-blue-500 hover:underline">
            Learn More
          </a>
        </footer>
      </div>
    </main>
  );
}
