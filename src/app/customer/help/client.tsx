"use client";

import { useEffect, useRef } from 'react';

export default function HelpClient() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="help-container fade-in-up">
      <h1>Help & Support</h1>
      <p>Find answers to common questions and ways to get in touch with us.</p>
      
      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-item">
          <h3>What is XOLVON?</h3>
          <p>XOLVON is a platform that provides various services to boost your business.</p>
        </div>
        <div className="faq-item">
          <h3>How can I subscribe to a service?</h3>
          <p>You can subscribe to our services through the pricing page.</p>
        </div>
        <div className="faq-item">
          <h3>How do I contact customer support?</h3>
          <p>You can contact us via the email and phone number listed below.</p>
        </div>
        <div className="faq-item">
          <h3>Can I cancel my subscription?</h3>
          <p>Yes, you can cancel your subscription at any time from your account settings.</p>
        </div>
      </div>

      <div className="contact-info-section">
        <h2>Contact Information</h2>
        <p>For further assistance, you can reach us through the following channels:</p>
        <div className="contact-details">
            <p><strong>Email:</strong> contact@xolvon.com</p>
            <p><strong>Phone:</strong> +123 456 7890</p>
            <p><strong>Address:</strong> 123 Innovation Drive, Tech City</p>
        </div>
      </div>
    </div>
  );
}
