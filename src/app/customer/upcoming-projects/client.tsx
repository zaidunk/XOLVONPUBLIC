'use client';

import { useEffect } from 'react';
import { Rocket, Instagram, BellRing } from 'lucide-react';
import './upcoming-projects.css';

export default function UpcomingProjectsClient() {
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
        <section className="text-center py-12 fade-in-up">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 dark:bg-blue-900/50 rounded-2xl mb-6">
            <Rocket className="w-12 h-12 text-[--brand-primary]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[--text-primary] leading-tight">
            Bangun Momentum Bareng Project Baru XOLVON
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-[--text-secondary]">
            Kami sedang mempersiapkan inisiatif baru untuk membantu brand dan kreator menguasai lanskap atensi digital. Jadilah yang pertama tahu dan dapatkan akses eksklusif.
          </p>
          <div className="mt-8">
            <button className="animated-gradient-button upcoming-projects-button">
              Stay Updated 🚀
            </button>
          </div>
          <div className="mt-8 flex justify-center items-center gap-3 text-sm text-[--text-secondary]">
            <Instagram className="w-5 h-5 text-[--brand-primary]" />
            <span>Pantengin terus Instagram kami di <a href="https://www.instagram.com/xolvon.id" target="_blank" rel="noopener noreferrer" className="font-semibold text-[--text-primary] hover:underline">@xolvon.id</a> untuk bocoran eksklusif!</span>
          </div>
        </section>
      </div>
    </main>
  );
}
