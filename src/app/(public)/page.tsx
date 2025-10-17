'use client';

import React, { FC, useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { Home } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

/* ============================================================
   ICONS (inline) - small, accessible SVGs (no external deps)
   ============================================================ */
const IconCheck: FC<{ className?: string; ariaLabel?: string }> = ({ className, ariaLabel }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" role="img" aria-label={ariaLabel ?? "Check icon"}>
    <path d="M5 13l4 4L19 7" />
  </svg>
);
const IconLineChart: FC<{ className?: string; ariaLabel?: string }> = ({ className, ariaLabel }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" role="img" aria-label={ariaLabel ?? "Line chart icon"}>
    <path d="M3 3v18h18" />
    <path d="m19 9-5 5-4-4-3 3" />
  </svg>
);
const IconBot: FC<{ className?: string; ariaLabel?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" role="img" aria-label="Bot icon">
    <rect x="3" y="7" width="18" height="12" rx="2" fill="currentColor" opacity="0.06" />
    <path d="M8 7V5a4 4 0 0 1 8 0v2" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <circle cx="9" cy="13" r="1" fill="currentColor" />
    <circle cx="15" cy="13" r="1" fill="currentColor" />
  </svg>
);
const IconArrowRight: FC<{ className?: string; ariaLabel?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" role="img" aria-label="Arrow right icon">
    <path d="M5 12h14" />
    <path d="M12 5l7 7-7 7" />
  </svg>
);

/* ============================================================
   DATA (keadaan sama seperti file kamu – tidak mengubah teks)
   ============================================================ */
interface Feature { title: string; description: string; icon: FC<{ className?: string; ariaLabel?: string }>; }
interface PricingPlan { name: string; description: string; price: string; period?: string; features: string[]; isPopular?: boolean; }
interface ValuePillar { title: string; description: string; icon: FC<{ className?: string; ariaLabel?: string }>; }
interface TeamMember { title: string; subtitle: string; name: string; school: string; imageUrl: string; }

const featuresData: Feature[] = [
  { title: "Trend Analysis", description: "Analyze social trends in real-time", icon: IconLineChart },
  { title: "Sentiment Insights", description: "Measure audience sentiment accurately", icon: IconCheck },
  { title: "Content Recommendations", description: "Get AI-powered suggestions", icon: IconCheck },
  { title: "Competitor Tracking", description: "Monitor your competitors effortlessly", icon: IconLineChart },
  { title: "Campaign Optimization", description: "Optimize campaigns for max ROI", icon: IconCheck },
  { title: "Alert System", description: "Receive instant alerts for critical changes", icon: IconCheck },
];

const pricingPlans: PricingPlan[] = [
  { name: "Personal", description: "Untuk kreator & individu", price: "Rp 199k", period: "/bln", features: ["Basic attention metrics", "Limited dashboard", "Weekly trend email"] },
  { name: "Influencer", description: "Agensi & kreator pro", price: "Rp 799k", period: "/bln", isPopular: true, features: ["Advanced attention metrics", "Full dashboard + exports", "Real-time trend detection", "Priority support"] },
  { name: "Brand", description: "Enterprise & multi-brand", price: "Custom", period: "", features: ["All Pro features", "Deep Sentiment Profiling", "Cyber Defense add-on", "Dedicated account manager"] },
];

const valuePillars: ValuePillar[] = [
  { title: "Innovation", description: "We lead with creativity and AI", icon: IconCheck },
  { title: "Transparency", description: "Clear reporting and open processes", icon: IconCheck },
  { title: "Collaboration", description: "Work together for best results", icon: IconCheck },
  { title: "Impact", description: "Drive measurable attention and ROI", icon: IconCheck },
];

const teamData: TeamMember[] = [
  { title: "FOUNDER & PROJECT LEAD", subtitle: "(FINANCE, DATA SCIENTIST & CYBER)", name: "MUHAMMAD FARSYA HASIBUAN", school: "UPN VETERAN JAKARTA | DATA SCIENCE", imageUrl: "/founder.svg" },
  { title: "HEAD OF BRAND STRATEGIST", subtitle: "(PR OUTREACH & COMMUNICATION LEAD)", name: "KHALIFA GHIZZAN MORENO", school: "TELKOM UNIVERSITY | COMMUNICATION", imageUrl: "/pr.svg" },
  { title: "HEAD OF TECH & EXPERIENCE", subtitle: "(WEB DEV & EXPERIENCE DESIGN)", name: "ZAIDAN DAFFA ABDILLAH", school: "TELKOM UNIVERSITY | COMPUTER SCIENCE", imageUrl: "/tech.svg" },
  { title: "HEAD OF COMMUNITY OPS", subtitle: "(OPS MANAGER & LEGAL SUPPORT)", name: "VARISHA AIRA DALIMUNTHE", school: "UPN VETERAN JAKARTA | INFORMATION SYSTEM", imageUrl: "/manager.svg" },
  { title: "HEAD OF BUSINESS DEVELOPMENT", subtitle: "(PRODUCT STRATEGIST & BIZDEV)", name: "MAHATHIR ABITAH BATUBARA", school: "UNESA | DIGITAL BUSINESS", imageUrl: "/bizdev.svg" },
  { title: "HEAD OF ATTENTION STRATEGIST", subtitle: "(AWARENESS & SOCMED SPECIALIST)", name: "I GUSTI AYU LAKSMI DEWI", school: "UMN | MARKETING COMMUNICATION", imageUrl: "/marcomm.svg" },
];

/* ============================================================
   Styles (string CSS injected for small helpers & animations)
   - keep minimal; prefer Tailwind for main styles
   ============================================================ */
const teamStyles = `
  .swiper-button-next, .swiper-button-prev { color: rgb(190,190,190); }
  .swiper-pagination-bullet-active { background-color: #A855F7 !important; transform: scale(1.05); }
  .swiper-pagination-bullet { background-color: #71717a; opacity:1; width:10px; height:10px; }
  .swiper-slide { display:flex; align-items:stretch; }

  .team-wrapper { position: relative; padding-bottom: 6rem; }
  .team-card {
    padding-bottom: 1.25rem;
    min-height: 260px;
    transform: scale(1);
    transition: transform 260ms cubic-bezier(.2,.9,.2,1), box-shadow 260ms;
    background-color: rgba(24,24,27,0.08);
    border: 1px solid rgba(148,163,184,0.06);
  }
  .team-avatar { width: 130px; height: 130px; border-radius: 9999px; overflow: hidden; display:inline-block; margin: 0 auto; }
  .team-avatar img { width: 100%; height: 100%; object-fit: cover; display:block; border-radius:9999px; }
  .swiper-slide-active .team-card { transform: scale(1.06); box-shadow: 0 8px 30px rgba(0,0,0,0.45); background-color: rgba(24,24,27,0.12); }
  .swiper-pagination { position: absolute; left: 0; right: 0; bottom: 0; display:flex; justify-content:center; gap:8px; z-index:10; }
`;

const globalAnimationStyles = `
  .anim-fade-up { opacity: 0; transform: translateY(18px); transition: opacity 560ms cubic-bezier(.2,.9,.2,1), transform 560ms cubic-bezier(.2,.9,.2,1); will-change: transform, opacity; }
  .anim-inview { opacity: 1; transform: translateY(0); }
`;

/* Hero background radial gradient (kept inline so you can tweak quickly) */
const heroBgStyle: React.CSSProperties = {
  background:
    "radial-gradient(circle at 88% 8%, rgba(59,130,246,0.12) 0%, rgba(59,130,246,0.04) 12%, transparent 36%)," +
    "radial-gradient(circle at 8% 78%, rgba(59,130,246,0.06) 0%, rgba(59,130,246,0.02) 24%, transparent 56%)," +
    "linear-gradient(180deg,#000 0%, #000 80%)",
};

const neonStyle: React.CSSProperties = {
  color: "#FFF7EA",
  textShadow: "0 8px 40px rgba(255,230,180,0.14), 0 2px 10px rgba(255,200,120,0.06), 0 0 28px rgba(168,85,247,0.08)",
  WebkitTextStroke: "0px rgba(255,255,255,0.02)",
};

/* ============================================================
   HELPER: clamp
   ============================================================ */
function clamp(v: number, a = 0, b = 1) { return Math.max(a, Math.min(b, v)); }

/* ============================================================
   COMPONENT: TeamCarousel
   - uses Swiper
   - comments explain how to tweak autoplay, breakpoints, styles
   ============================================================ */
const TeamCarousel: FC = () => {
  return (
    <section id="team" className="py-20" role="region" aria-label="Core team carousel">
      <style>{teamStyles}</style>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center team-wrapper">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-8 anim-fade-up">
          Meet The <span style={{ color: "#3b82f6" }}>Core Team</span>
        </h2>

        {/* Swiper: tweak modules/autoplay/delay here */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          centeredSlides={true}
          loop
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation
          breakpoints={{ 640: { slidesPerView: 2, spaceBetween: 20 }, 1024: { slidesPerView: 3, spaceBetween: 30 } }}
          className="w-full"
        >
          {teamData.map((member) => (
            <SwiperSlide key={member.name} className="flex">
              <div className="team-card p-3 flex flex-col justify-between items-center rounded-xl w-full">
                <div className="text-center">
                  <p className="font-extrabold text-sm md:text-2xl text-purple-400 tracking-wider uppercase text-center">{member.title}</p>
                  <p className="text-xs text-white mb-2">{member.subtitle}</p>
                </div>

                <div className="flex items-center justify-center">
                  <div className="team-avatar" aria-hidden>
                    <img src={member.imageUrl} alt={`${member.name} photo`} />
                  </div>
                </div>

                <div className="w-full mt-4 text-center px-2">
                  <h3 className="text-sm font-extrabold text-white leading-tight">{member.name}</h3>
                  <p className="text-zinc-400 text-xs mt-1 truncate">{member.school}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

/* ============================================================
   COMPONENT: XolvonStory
   - sticky/pin behavior
   - per-letter highlight using requestAnimationFrame for smooth updates
   - heavily commented so you can tune durations/thresholds
   ============================================================ */
function XolvonStoryComponent() {
  // Original story text (preserve content). If you need multi-paragraph support, split paragraphs instead.
  const story =
`In the era where data is the new oil and attention is the new currency, we built Xolvon to bridge the gap between raw information and actionable strategy. We combine advanced AI/ML with human creativity through our network of UGC creators and clippers, enabling brands, influencers, and companies to create trends and drive decisions with unprecedented speed and accuracy.`;

  // Split text to array of characters (letters, spaces, punctuation)
  const letters = Array.from(story);

  // Refs: container is tall parent; stickyRef is the pinned area
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);

  // highlightCount state controls how many letters are highlighted
  const [highlightCount, setHighlightCount] = useState(0);

  // Options you can tweak:
  const STICKY_TOP_OFFSET = 120; // px from top where sticky starts
  const PIN_MIN_HEIGHT_MULTIPLIER = 1.6; // how tall container should be (affects pinned duration)

  // Core update function: compute progress through pinned area and set count
  const update = useCallback(() => {
    const container = containerRef.current;
    const stickyEl = stickyRef.current;
    if (!container || !stickyEl) return;

    const rect = container.getBoundingClientRect();
    const viewportH = window.innerHeight || document.documentElement.clientHeight;

    // start: when top of container enters (we allow a top offset)
    const start = rect.top - STICKY_TOP_OFFSET;
    // end: when bottom of container minus sticky area passes threshold
    // we want pinned duration to be proportional to container height
    const end = rect.bottom - STICKY_TOP_OFFSET - stickyEl.offsetHeight;

    // If area is small, avoid division by zero
    const total = Math.max(1, end - start);

    // progress goes from 0 -> 1
    const rawProgress = (viewportH - start) / (total + viewportH);
    const progress = clamp(rawProgress, 0, 1);

    // Map progress to number of letters to highlight
    const count = Math.floor(progress * letters.length);
    setHighlightCount(count);
  }, [letters.length]);

  // Use requestAnimationFrame loop attached to scroll for smooth updates.
  useEffect(() => {
    let rafId = 0;
    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    // Run once on mount
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [update]);

  // Compute a minHeight for the parent so sticky can pin for long enough.
  // You can tweak PIN_MIN_HEIGHT_MULTIPLIER to increase/decrease pin duration.
  const parentMinHeight = `${Math.max(1, letters.length / 60 * 100) * PIN_MIN_HEIGHT_MULTIPLIER}vh`;

  return (
    <section id="story" className="py-20 bg-[rgba(17,24,39,0.86)]" aria-label="Xolvon Story">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={containerRef} style={{ minHeight: parentMinHeight, position: "relative" }}>
          {/* Sticky area that stays pinned while user scrolls inside parent */}
          <div ref={stickyRef} className="sticky top-24 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">The <span className="text-purple-400">Xolvon</span> Story</h2>

            {/* sr-only full text so screen-readers read it naturally */}
            <p className="sr-only">{story}</p>

            {/* Render letters as spans (aria-hidden) */}
            <p className="text-lg text-zinc-300 leading-relaxed select-text" aria-hidden="true">
              {letters.map((ch, i) => {
                // keep spaces & linebreaks visually correct
                if (ch === "\n") return <br key={i} />;
                if (ch === " ") return <span key={i} className="inline-block w-2">&nbsp;</span>;

                // whether current index should be highlighted
                const isActive = i < highlightCount;

                // small per-letter stagger: optional, you can remove transitionDelay if you don't want stagger
                const delayMs = Math.min(100, i * 6); // cap delay to 100ms for perf
                const style: React.CSSProperties = { transitionDelay: `${delayMs}ms` };

                return (
                  <span
                    key={i}
                    className={`inline-block transition-transform duration-150 ${isActive ? "text-amber-400 font-semibold -translate-y-[4px] scale-[1.02]" : "text-zinc-300"}`}
                    style={style}
                    aria-hidden="true"
                  >
                    {ch}
                  </span>
                );
              })}
            </p>

            <div className="mt-6 text-sm text-zinc-400">
              <p>Scroll slowly to reveal the story—letters will highlight progressively while this panel is pinned.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Page component
   - header cleaned (no logo / no static top bar)
   - sections arranged per spec
   - IntersectionObserver added to trigger Tailwind-based entrance animations
   - comments included for each area for easy editing
   ============================================================ */
export default function LP() {
  useEffect(() => {
    // IntersectionObserver to add .anim-inview to elements with .anim-fade-up
    // This triggers CSS transitions defined in globalAnimationStyles (below).
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("anim-inview");
            observer.unobserve(entry.target); // animate once
          }
        });
      },
      { threshold: 0.15 }
    );

    const elems = document.querySelectorAll(".anim-fade-up");
    elems.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="font-sans antialiased text-white bg-black min-h-screen">
      {/* small helper styles inlined; you may migrate to globals.css */}
      <style>{globalAnimationStyles}</style>

      {/* hero background - full-screen subtle gradients (behind content) */}
      <div aria-hidden className="fixed inset-0 -z-10" style={heroBgStyle}></div>

      <div className="relative z-10">
        {/* ---------------- Header ----------------
           Minimal header per request: NO logo, NO static top bar.
           Keep only a minimal nav for accessibility + quick jumps.
           Edit: remove nav entirely if you want zero header.
        */}
        <header className="w-full bg-transparent">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            {/* intentionally left empty where logo used to be */}
            <nav className="flex items-center gap-6 text-zinc-400 text-sm">
              <a href="#hero" className="hover:text-white transition-colors">Home</a>
              <a href="#features" className="hover:text-white transition-colors">Features</a>
              <a href="#story" className="hover:text-white transition-colors">Xolvon Story</a>
              <a href="#pricing" className="hover:text-white transition-colors">Plans</a>
              <a href="#team" className="hover:text-white transition-colors">Team</a>
            </nav>
            <div className="hidden sm:block">
              <button type="button" className="px-3 py-2 rounded-full bg-zinc-900/60 border border-zinc-800 text-sm">Contact</button>
            </div>
          </div>
        </header>

        {/* ---------------- Hero (has background pembeda) ----------------
           - This section uses a slightly darker rounded container (deep-blue overlay)
           - Animations use anim-fade-up class
           - Edit neonStyle or deep-blue inline background to adjust look
        */}
        <section id="hero" className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* left: decorative bot icon (kept small) */}
            <div className="md:col-span-5 flex items-center justify-center md:justify-start">
              <div className="w-48 sm:w-56 md:w-64 lg:w-80">
                {/* removed logo per request; show a decorative icon instead */}
                <div className="w-full h-full rounded-xl flex items-center justify-center bg-[rgba(255,255,255,0.02)] p-6">
                  <IconBot className="w-24 h-24 text-zinc-200" ariaLabel="Bot decorative icon" />
                </div>
              </div>
            </div>

            {/* right: headline + CTA */}
            <div className="md:col-span-7">
              <h1 style={neonStyle} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight anim-fade-up">
                The Human-AI Data Companion
                <br />
                for Attention-Driven Decisions
              </h1>

              <div className="mt-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6">
                  <p className="text-sm md:text-base text-zinc-400 font-semibold tracking-wider anim-fade-up">PROJECT <span className="text-purple-400">XOLVON</span></p>
                  <p className="text-sm md:text-base text-zinc-500 font-semibold tracking-wider anim-fade-up">OCTOBER 2025</p>
                </div>

                <div className="mt-4 rounded-xl p-6 md:p-8" style={{ background: "rgba(8,30,90,0.40)" }}>
                  <p className="text-lg md:text-xl text-zinc-300 max-w-2xl mb-6">
                    Harness AI-powered trend analysis and sentiment insights to make strategic decisions <strong className="text-amber-400">3x faster</strong> at <strong className="text-amber-400">50% lower cost</strong>.
                  </p>

                  <div className="flex flex-wrap gap-4">
                    {/* Primary CTA (Link used for demo) */}
                    <Link href="/role-select" aria-label="Lihat Demo Bot" className="group inline-flex items-center gap-4 px-6 py-4 rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white font-bold text-lg shadow-lg hover:shadow-2xl transition-all anim-fade-up">
                      Lihat Demo Bot
                      <IconArrowRight className="w-5 h-5 inline-block ml-2" />
                    </Link>

                    <button type="button" aria-label="Pelajari Lebih Lanjut" className="px-6 py-4 font-bold text-white rounded-full bg-zinc-900/70 border border-zinc-800 hover:bg-zinc-800 transition-colors anim-fade-up">
                      Pelajari Lebih Lanjut <IconArrowRight className="w-5 h-5 inline-block ml-2" />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* ---------------- Features (no bg pembeda) ---------------- */}
        <section id="features" className="py-20 anim-fade-up" aria-label="Features">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-4">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 text-white">
                  <IconLineChart className="w-6 h-6" ariaLabel="Line chart icon" />
                </span>
                Powered by <span className="text-purple-400">Intelligence</span>
              </h2>
              <p className="text-lg text-zinc-400">Our platform combines cutting-edge AI with human creativity to deliver attention-focused solutions.</p>
            </div>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuresData.map((feature) => (
                <div key={feature.title} className="p-8 text-center flex flex-col items-center transition-all duration-300 rounded-xl border border-zinc-800 h-full anim-fade-up">
                  <div className="w-14 h-14 mb-6 flex items-center justify-center bg-zinc-800/50 rounded-full">
                    <feature.icon className="w-7 h-7 text-zinc-200" ariaLabel={feature.title} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-zinc-400 flex-grow">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- XOLVON Story (sticky + per-letter highlight) ---------------- */}
        {/* Use dedicated component for clarity & editing */}
        <div className="anim-fade-up"><XolvonStoryComponent /></div>

        {/* ---------------- Pricing / Plans (no bg pembeda) ---------------- */}
        <section id="pricing" className="py-20 anim-fade-up" aria-label="Pricing">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Choose Your <span className="text-amber-400">Power Plan</span></h2>
              <p className="text-lg text-zinc-400">Scale your attention strategy with flexible pricing designed for growth.</p>
            </div>

            <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
              {pricingPlans.map((plan) => (
                <div key={plan.name} className={`flex flex-col p-6 rounded-2xl border ${plan.isPopular ? "border-2 border-purple-600 relative" : "border-zinc-800"} bg-transparent`} role="article" aria-label={`${plan.name} pricing plan`}>
                  {plan.isPopular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">MOST POPULAR</span>}
                  <h3 className="font-bold text-lg">{plan.name}</h3>
                  <p className="text-zinc-400 mt-1">{plan.description}</p>
                  <p className="mt-4"><span className="text-4xl md:text-5xl font-bold">{plan.price}</span><span className="text-base font-medium text-zinc-400 ml-2">{plan.period ?? ""}</span></p>
                  <ul className="mt-6 text-sm space-y-3 text-zinc-400 flex-grow">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3"><IconCheck className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" ariaLabel="Included" /><span className="text-zinc-300">{feature}</span></li>
                    ))}
                  </ul>
                  <button type="button" className={`mt-8 w-full px-4 py-3 rounded-lg font-semibold transition ${plan.isPopular ? "bg-purple-600 text-white hover:opacity-90" : "bg-zinc-800 text-white hover:bg-zinc-700"}`} aria-label={plan.name === "Brand" ? "Contact Us" : "Start Subscription"}>
                    {plan.name === "Brand" ? "Contact Us" : "Start Subscription"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- Team Carousel ---------------- */}
        <div className="anim-fade-up">
          <TeamCarousel />
        </div>

        {/* ---------------- Partner CTA ---------------- */}
        <section className="py-16 w-full anim-fade-up" aria-label="Partner">
          <div className="container mx-auto rounded-2xl bg-transparent p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4"><span className="text-white">Ready to </span><span className="bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400 bg-clip-text text-transparent">Partner With Us?</span></h2>
            <p className="text-zinc-300 text-lg mb-8">Whether you're a brand, influencer, or agency, we have partnership opportunities to help you grow</p>
            <button type="button" className="bg-purple-400 hover:bg-purple-500 text-white font-bold py-3 px-8 rounded-lg text-lg mb-8 transition-all shadow-md" aria-label="Be Our Partner">Be Our Partner</button>
            <div className="flex justify-center gap-8 text-zinc-400 text-base">
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-purple-400 inline-block"></span>Strategic Partnerships</div>
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-amber-400 inline-block"></span>Revenue Sharing</div>
            </div>
          </div>
        </section>

        {/* ---------------- Footer ---------------- */}
        <footer className="border-t border-zinc-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-zinc-500">
            <p>&copy; {new Date().getFullYear()} XOLVON. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
