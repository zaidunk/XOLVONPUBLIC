'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Users, Instagram, Twitter, Linkedin, MessageSquare, Twitch, Youtube } from 'lucide-react';
import './community.css';

const socialMedia = [
  { name: 'Instagram', url: 'https://www.instagram.com', icon: <Instagram className="w-8 h-8" /> },
  { name: 'Discord', url: 'https://discord.com', icon: <MessageSquare className="w-8 h-8" /> },
  { name: 'Facebook', url: 'https://www.facebook.com', icon: <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.323-1.325z"/></svg> },
  { name: 'Twitter', url: 'https://twitter.com', icon: <Twitter className="w-8 h-8" /> },
  { name: 'TikTok', url: 'https://www.tiktok.com', icon: <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.43.05-4.84-.95-6.43-2.8-1.59-1.86-2.32-4.2-1.86-6.33.38-1.73 1.4-3.29 2.73-4.35.92-.75 2-1.26 3.11-1.5.25-.05.5-.08.75-.12.01-3.46.01-6.93.01-10.39.18-1.65 1.4-3.2 2.9-3.86 1.02-.45 2.14-.64 3.28-.61z"/></svg> },
  { name: 'LinkedIn', url: 'https://www.linkedin.com', icon: <Linkedin className="w-8 h-8" /> },
];

export default function Client() {
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
        <div className="max-w-6xl mx-auto">
            <section className="text-center py-12 fade-in-up">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 dark:bg-blue-900/50 rounded-2xl mb-6">
                    <Users className="w-12 h-12 text-blue-500" />
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-[--text-primary] leading-tight">
                    Join Our Thriving Community
                </h1>
                <p className="mt-4 max-w-3xl mx-auto text-lg text-[--text-secondary]">
                    Connect with us and thousands of other data enthusiasts across your favorite social platforms. Share ideas, get support, and stay updated.
                </p>
            </section>

            <section className="fade-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="social-media-grid">
                    {socialMedia.map((social, index) => (
                    <a href={social.url} key={social.name} className="social-media-card" target="_blank" rel="noopener noreferrer" style={{ animationDelay: `${index * 0.1}s`}}>
                        <div className="card-icon">{social.icon}</div>
                        <h3 className="card-title">{social.name}</h3>
                        <p className="card-description">Join the conversation</p>
                        <div className="card-arrow">→</div>
                    </a>
                    ))}
                </div>
            </section>
        </div>
    </main>
  );
}
