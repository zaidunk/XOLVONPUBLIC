"use client";
import React, { useEffect, useRef } from "react";
import Head from "next/head";
import Chart from "chart.js/auto";
import { Check, PieChart, ShieldCheck } from "lucide-react";
import "./pricing.css";

const ACHIEVABLE_RATE = 0.4;
const MAX_MULTIPLIER = 3;
const MIN_BUDGET = 1_000_000;
const MAX_BUDGET = 50_000_000;
const DEFAULT_BUDGET = 10_000_000;
const STATIC_MAX_ATTENTION = MAX_BUDGET * ACHIEVABLE_RATE * MAX_MULTIPLIER;
const TIMELINE_STAGES = [
  { label: "1 Week", percentOfAchievable: 0.1 },
  { label: "2 Week", percentOfAchievable: 0.25 },
  { label: "1 Month", percentOfAchievable: 0.5 },
  { label: "3 Month", percentOfAchievable: 3 },
];

const PricingPage = () => {
  const chartRef = useRef<Chart | null>(null);
  const budgetSliderRef = useRef<HTMLInputElement | null>(null);
  const budgetValueElRef = useRef<HTMLParagraphElement | null>(null);
  const attentionValueElRef = useRef<HTMLParagraphElement | null>(null);
  const convRateElRef = useRef<HTMLParagraphElement | null>(null);
  const clipperValueElRef = useRef<HTMLParagraphElement | null>(null);
  const attentionChartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const budgetSlider = budgetSliderRef.current;
    const budgetValueEl = budgetValueElRef.current;
    const attentionValueEl = attentionValueElRef.current;
    const convRateEl = convRateElRef.current;
    const clipperValueEl = clipperValueElRef.current;
    const attentionChart = attentionChartRef.current;

    if (
      !budgetSlider ||
      !budgetValueEl ||
      !attentionValueEl ||
      !convRateEl ||
      !clipperValueEl ||
      !attentionChart
    ) {
      return;
    }

    function formatRupiah(num: number) {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(Math.round(num));
    }

    function formatAttention(value: number) {
      return new Intl.NumberFormat("id-ID").format(Math.round(value));
    }

    function formatShort(value: number, includePlus = false) {
      const absVal = Math.abs(value);
      let result: string;
      if (absVal >= 1_000_000) {
        const formatted = value / 1_000_000;
        result = Number.isInteger(formatted)
          ? `${formatted.toFixed(0)}M`
          : `${formatted.toFixed(1).replace(/\.0$/, "")}M`;
      } else if (absVal >= 1_000) {
        const formatted = value / 1_000;
        result = Number.isInteger(formatted)
          ? `${formatted.toFixed(0)}K`
          : `${formatted.toFixed(1).replace(/\.0$/, "")}K`;
      } else {
        result = Math.round(value).toString();
      }
      return includePlus ? `${result}++` : result;
    }

    function getOrCreateTooltip(chart: Chart) {
      const parent = chart.canvas.parentNode;
      if (!parent) return null;
      let tooltipEl = parent.querySelector<HTMLDivElement>('.attention-tooltip');
      if (!tooltipEl) {
        tooltipEl = document.createElement('div');
        tooltipEl.className = 'attention-tooltip';
        Object.assign(tooltipEl.style, {
          position: 'absolute',
          pointerEvents: 'none',
          opacity: '0',
          transition: 'opacity 0.16s ease, transform 0.16s ease',
          transform: 'translate(-50%, -140%) scale(0.98)',
          willChange: 'transform, opacity',
        });

        const inner = document.createElement('div');
        inner.className = 'attention-tooltip__inner';
        Object.assign(inner.style, {
          display: 'flex',
          flexDirection: 'column',
          gap: '2px',
          padding: '10px 14px',
          borderRadius: '12px',
          background: 'linear-gradient(145deg, rgba(15,23,42,0.92), rgba(30,64,175,0.92))',
          color: 'white',
          boxShadow: '0 12px 32px rgba(15, 23, 42, 0.35)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(96,165,250,0.25)',
          fontFamily: 'inherit',
        });

        const label = document.createElement('span');
        label.className = 'attention-tooltip__label';
        Object.assign(label.style, {
          fontSize: '11px',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: 'rgba(226,232,240,0.8)',
        });

        const value = document.createElement('strong');
        value.className = 'attention-tooltip__value';
        Object.assign(value.style, {
          fontSize: '16px',
          fontWeight: '700',
        });

        inner.appendChild(label);
        inner.appendChild(value);
        tooltipEl.appendChild(inner);
        parent.appendChild(tooltipEl);
      }
      return tooltipEl;
    }

    function externalTooltipHandler(context: any) {
      const { chart, tooltip } = context;
      const tooltipEl = getOrCreateTooltip(chart);
      if (!tooltipEl) return;

      if (tooltip.opacity === 0) {
        tooltipEl.style.opacity = '0';
        tooltipEl.style.transform = 'translate(-50%, -130%) scale(0.94)';
        return;
      }

      const labelEl = tooltipEl.querySelector<HTMLSpanElement>('.attention-tooltip__label');
      const valueEl = tooltipEl.querySelector<HTMLSpanElement>('.attention-tooltip__value');

      if (labelEl) {
        labelEl.textContent = tooltip.title?.[0] ?? '';
      }
      if (valueEl) {
        const datapoint = tooltip.dataPoints?.[0];
        const val = datapoint ? datapoint.parsed.y : 0;
        valueEl.textContent = `${formatAttention(val)} attention`;
      }

      tooltipEl.style.opacity = '1';
      tooltipEl.style.transform = 'translate(-50%, -140%) scale(1)';

      const { offsetLeft, offsetTop } = chart.canvas;
      tooltipEl.style.left = `${offsetLeft + tooltip.caretX}px`;
      tooltipEl.style.top = `${offsetTop + tooltip.caretY}px`;
    }

    function calculateProjection(budget: number) {
      const achievableAttention = budget * ACHIEVABLE_RATE;
      const maxAttention = achievableAttention * MAX_MULTIPLIER;
      const stageAttention = TIMELINE_STAGES.map((stage) =>
        Math.min(maxAttention, achievableAttention * stage.percentOfAchievable)
      );
      const stagePercentOfMax = stageAttention.map((value) =>
        maxAttention ? (value / maxAttention) * 100 : 0
      );
      return {
        achievableAttention,
        maxAttention,
        stageAttention,
        stagePercentOfMax,
      };
    }

    let latestProjection = calculateProjection(Number(budgetSlider.value));

    function renderChart(initialBudget: number) {
      if (chartRef.current) chartRef.current.destroy();
      const ctx = attentionChart.getContext("2d");
      if (!ctx) return;
      latestProjection = calculateProjection(initialBudget);

      chartRef.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: TIMELINE_STAGES.map((stage) => stage.label),
          datasets: [
            {
              label: "Projected Attention",
              data: latestProjection.stageAttention,
              borderColor: "#3B82F6",
              borderWidth: 3,
              tension: 0.4,
              pointRadius: 4,
              pointBackgroundColor: "#3B82F6",
              backgroundColor: "rgba(59,130,246,0.35)",
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              enabled: false,
              external: externalTooltipHandler,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              max: STATIC_MAX_ATTENTION,
              ticks: {
                callback: (value) =>
                  formatAttention(
                    typeof value === "string" ? Number(value) : (value as number)
                  ),
                color: getComputedStyle(document.body).getPropertyValue(
                  "--text-secondary"
                ),
              },
            },
            x: {
              grid: { display: false },
              ticks: {
                color: getComputedStyle(document.body).getPropertyValue(
                  "--text-secondary"
                ),
              },
            },
          },
        },
      });
    }

    function updateAll(budget: number) {
      latestProjection = calculateProjection(budget);

      budgetValueEl.textContent = formatRupiah(budget);
      attentionValueEl.textContent = formatShort(
        latestProjection.achievableAttention,
        true
      );
      convRateEl.textContent = formatShort(latestProjection.maxAttention);

      const ugcMin = Math.max(
        1,
        Math.round(latestProjection.achievableAttention / 25_000)
      );
      const ugcMax = ugcMin * 2;
      clipperValueEl.textContent = `${ugcMin} - ${ugcMax}`;

      if (!chartRef.current) {
        renderChart(budget);
      } else {
        chartRef.current.data.datasets[0].data = latestProjection.stageAttention;
        chartRef.current.update("none");
      }
    }

    renderChart(Number(budgetSlider.value));
    updateAll(Number(budgetSlider.value));
    budgetSlider.addEventListener("input", (e) =>
      updateAll(Number((e.target as HTMLInputElement).value))
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document
      .querySelectorAll(".fade-in-up")
      .forEach((el) => observer.observe(el));
  }, []);

  return (
    <>
      <Head>
        <title>XOLVON - Pricing</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <script src="https://unpkg.com/lucide@latest"></script>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <main className="flex-1">
        {/* HERO + SIMULATOR */}
        <section className="py-14 md:py-20 fade-in-up">
          <div className="max-w-5xl mx-auto px-6">
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-[--text-primary]">
              Human–AI Attention Data Simulator
            </h1>
            <p className="mt-3 text-[--text-secondary] max-w-2xl">
              Visualisasi bagaimana budget drive attention over time. Geser
              budget untuk lihat estimasi attention & clipper/UGC.
            </p>

            <div className="mt-10 bg-[--bg-secondary] border border-[--border-primary] rounded-2xl p-6 shadow">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                {/* results */}
                <div className="grid grid-cols-2 gap-4 md:grid-cols-1 text-left">
                  <div>
                    <label className="font-bold text-lg">
                      Budget Campaign
                    </label>
                    <p
                      id="budget-value"
                      ref={budgetValueElRef}
                      className="text-2xl font-bold text-[--brand-primary]"
                    >
                      Rp 10.000.000
                    </p>
                  </div>
                  <div>
                    <p className="text-[--text-secondary] font-semibold">
                      Achievable
                    </p>
                    <p
                      id="attention-value"
                      ref={attentionValueElRef}
                      className="text-2xl font-bold"
                    >
                      —
                    </p>
                  </div>
                  <div>
                    <p className="text-[--text-secondary] font-semibold">
                      Max potential
                    </p>
                    <p
                      id="conv-rate"
                      ref={convRateElRef}
                      className="text-2xl font-bold"
                    >
                      —
                    </p>
                  </div>
                  <div>
                    <p className="text-[--text-secondary] font-semibold">
                      UGC & Clipper
                    </p>
                    <p
                      id="clipper-value"
                      ref={clipperValueElRef}
                      className="text-2xl font-bold"
                    >
                      —
                    </p>
                  </div>
                </div>
                {/* slider + chart */}
                <div className="md:col-span-2">
                  <input
                    id="budget-slider"
                    ref={budgetSliderRef}
                    type="range"
                    min={MIN_BUDGET}
                    max={MAX_BUDGET}
                    step={500000}
                    defaultValue={DEFAULT_BUDGET}
                  />
                  <div className="mt-4 h-56">
                    <canvas
                      id="attention-chart"
                      ref={attentionChartRef}
                    ></canvas>
                  </div>
                  <div className="mt-5">
                    <button
                      id="order-btn"
                      className="w-full cta-grad text-white font-bold px-6 py-3 rounded-lg shadow-lg transform hover:scale-[1.01] transition"
                    >
                      Unlock Full Strategy → Order Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Plans */}
        <section className="py-16 md:py-20 bg-[--bg-tertiary] fade-in-up">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold">
              Tools Subscription — Attention Data-Driven
            </h2>
            <p className="mt-2 text-[--text-secondary] max-w-2xl mx-auto">
              Pilih paket sesuai kebutuhan: personal, influencer, atau brand.
              Tambah add-ons seperti Deep Sentiment atau Cyber Defense.
            </p>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="bg-[--bg-secondary] border border-[--border-primary] rounded-2xl p-6 flex flex-col">
                <h3 className="font-bold text-lg">Personal</h3>
                <p className="text-[--text-secondary] mt-1">
                  Untuk kreator & individu
                </p>
                <p className="mt-4 text-4xl font-bold">
                  Rp 199k{" "}
                  <span className="text-base font-medium text-[--text-secondary]">
                    /bln
                  </span>
                </p>
                <ul className="mt-6 text-sm space-y-3 text-[--text-secondary] flex-grow">
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-[--text-primary]">
                      Basic attention metrics
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500" />
                    Limited dashboard
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500" />
                    Weekly trend email
                  </li>
                </ul>
                <button className="mt-8 w-full bg-[--bg-tertiary] px-4 py-3 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-slate-700 transition">
                  Start Subscription
                </button>
              </div>
              <div className="bg-[--bg-secondary] border-2 border-[--brand-primary] rounded-2xl p-6 relative flex flex-col">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[--brand-primary] text-white text-xs font-bold px-3 py-1 rounded-full">
                  MOST POPULAR
                </span>
                <h3 className="font-bold text-lg">Influencer</h3>
                <p className="text-[--text-secondary] mt-1">
                  Agensi & kreator pro
                </p>
                <p className="mt-4 text-4xl font-bold">
                  Rp 799k{" "}
                  <span className="text-base font-medium text-[--text-secondary]">
                    /bln
                  </span>
                </p>
                <ul className="mt-6 text-sm space-y-3 text-[--text-secondary] flex-grow">
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-[--text-primary]">
                      Advanced attention metrics
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-[--text-primary]">
                      Full dashboard + exports
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-[--text-primary]">
                      Real-time trend detection
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500" />
                    Priority support
                  </li>
                </ul>
                <button className="mt-8 w-full bg-[--brand-primary] text-white px-4 py-3 rounded-lg font-semibold hover:opacity-90 transition">
                  Start Subscription
                </button>
              </div>
              <div className="bg-[--bg-secondary] border border-[--border-primary] rounded-2xl p-6 flex flex-col">
                <h3 className="font-bold text-lg">Brand</h3>
                <p className="text-[--text-secondary] mt-1">
                  Enterprise & multi-brand
                </p>
                <p className="mt-4 text-4xl font-bold">Custom</p>
                <ul className="mt-6 text-sm space-y-3 text-[--text-secondary] flex-grow">
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-[--text-primary]">
                      All Pro features
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-[--text-primary]">
                      Deep Sentiment Profiling
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-[--text-primary]">
                      Cyber Defense add-on
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500" />
                    Dedicated account manager
                  </li>
                </ul>
                <button className="mt-8 w-full bg-[--bg-tertiary] px-4 py-3 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-slate-700 transition">
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Add-ons Section */}
        <section className="py-16 md:py-20 fade-in-up">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[--bg-secondary] border border-[--border-primary] rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <PieChart className="w-8 h-8 text-purple-500" />
                  <h3 className="mt-3 font-bold text-xl">
                    Deep Sentiment Profiling
                  </h3>
                  <p className="text-[--text-secondary] mt-2">
                    Laporan mendalam & segmentasi sentimen per demografi.
                    Per-laporan atau langganan bulanan.
                  </p>
                </div>
                <div className="mt-4">
                  <button className="bg-[--bg-tertiary] px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-slate-700 transition">
                    Get Sentiment Report
                  </button>
                </div>
              </div>
              <div className="bg-[--bg-secondary] border border-[--border-primary] rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <ShieldCheck className="w-8 h-8 text-cyan-500" />
                  <h3 className="mt-3 font-bold text-xl">
                    Cyber Defense Container
                  </h3>
                  <p className="text-[--text-secondary] mt-2">
                    AI threat monitoring, anomaly detection & data protection.
                  </p>
                </div>
                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <p className="text-lg font-bold text-[--brand-primary]">
                      89K{" "}
                      <span className="text-sm text-[--text-secondary]">
                        / month
                      </span>
                    </p>
                  </div>
                  <button className="bg-[--brand-primary] text-white px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition">
                    Secure My Data
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 fade-in-up">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <blockquote className="text-2xl md:text-3xl font-semibold text-[--text-primary] leading-snug">
              "Setiap campaign punya potensi mencuri perhatian. Mulai sekarang, bangun momentum bersama XOLVON."
            </blockquote>
            <p className="mt-4 text-[--text-secondary] max-w-2xl mx-auto">
              Dapatkan akses ke strategi berbasis data dan ekosistem kreator yang siap mengangkat brand kamu ke level berikutnya.
            </p>
          </div>
        </section>

        {/* Footer CTA */}
        <footer className="fade-in-up">
          <div className="max-w-7xl mx-auto px-6 pb-16">
            <div className="rounded-2xl text-center py-12 px-6 cta-grad text-white">
              <h2 className="text-2xl md:text-3xl font-bold">
                Ready to Maximize Your Attention with AI?
              </h2>
              <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  className="bg-white text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-opacity-90 transition"
                  href="#"
                >
                  Subscribe Now
                </a>
                <a
                  className="bg-white/20 text-white px-6 py-3 rounded-lg font-bold hover:bg-white/30 transition"
                  href="#"
                >
                  Request Demo
                </a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
};

export default PricingPage;
