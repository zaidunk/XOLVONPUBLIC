'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Users } from 'lucide-react';
import { FaInstagram, FaDiscord, FaFacebook, FaTwitter, FaTiktok, FaLinkedin } from 'react-icons/fa';
import './community.css';

const socialMedia = [
  { name: 'Instagram', url: 'https://www.instagram.com', icon: <FaInstagram className="w-8 h-8" /> },
  { name: 'Discord', url: 'https://discord.com', icon: <FaDiscord className="w-8 h-8" /> },
  { name: 'Facebook', url: 'https://www.facebook.com', icon: <FaFacebook className="w-8 h-8" /> },
  { name: 'Twitter', url: 'https://twitter.com', icon: <FaTwitter className="w-8 h-8" /> },
  { name: 'TikTok', url: 'https://www.tiktok.com', icon: <FaTiktok className="w-8 h-8" /> },
  { name: 'LinkedIn', url: 'https://www.linkedin.com', icon: <FaLinkedin className="w-8 h-8" /> },
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
