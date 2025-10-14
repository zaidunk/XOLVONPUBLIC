"use client";
import React, { useEffect, useRef } from "react";
import Head from "next/head";
import Chart from "chart.js/auto";
import { Check, PieChart, ShieldCheck } from "lucide-react";
import "./pricing.css";

const PricingPage = () => {
  const chartRef = useRef<Chart | null>(null);
  const budgetSliderRef = useRef<HTMLInputElement | null>(null);
  const budgetValueElRef = useRef<HTMLParagraphElement | null>(null);
  const attentionValueElRef = useRef<HTMLParagraphElement | null>(null);
  const convRateElRef = useRef<HTMLParagraphElement | null>(null);
  const clipperValueElRef = useRef<HTMLParagraphElement | null>(null);
  const displayConvRateElRef = useRef<HTMLParagraphElement | null>(null);
  const displayAttNowElRef = useRef<HTMLParagraphElement | null>(null);
  const displayAttMaxElRef = useRef<HTMLParagraphElement | null>(null);
  const attentionChartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {

    const MAX_BUDGET = 50000000,
      ATTENTION_PER_RUPIAH = 0.3,
      MAX_POSSIBLE_ATTENTION = MAX_BUDGET * ATTENTION_PER_RUPIAH;
    const DESIRED_AT_1M = 0.0155,
      MAX_CONV = 0.1,
      K = -Math.log(1 - DESIRED_AT_1M / MAX_CONV);

    const budgetSlider = budgetSliderRef.current;
    const budgetValueEl = budgetValueElRef.current;
    const attentionValueEl = attentionValueElRef.current;
    const convRateEl = convRateElRef.current;
    const clipperValueEl = clipperValueElRef.current;
    const displayConvRateEl = displayConvRateElRef.current;
    const displayAttNowEl = displayAttNowElRef.current;
    const displayAttMaxEl = displayAttMaxElRef.current;
    const attentionChart = attentionChartRef.current;

    if (
      !budgetSlider ||
      !budgetValueEl ||
      !attentionValueEl ||
      !convRateEl ||
      !clipperValueEl ||
      !displayConvRateEl ||
      !displayAttNowEl ||
      !displayAttMaxEl ||
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
    function formatCompact(n: number) {
      if (n >= 1000000) return (n / 1000000).toFixed(2) + "M";
      if (n >= 1000) return (n / 1000).toFixed(1) + "K";
      return n.toString();
    }
    function computeConversionRate(budget: number) {
      return (
        MAX_CONV * (1 - Math.exp(-K * Math.max(0.001, budget / 1000000)))
      );
    }
    function calculateMetrics(budget: number) {
      const bM = Math.max(0.001, budget / 1000000);
      return {
        attention: Math.round(budget * ATTENTION_PER_RUPIAH),
        conversionRate: computeConversionRate(budget),
        clipperMin: Math.round(40 * Math.pow(bM, 1.05)),
        clipperMax: Math.round(80 * Math.pow(bM, 1.03)),
        budgetRatio: Math.min(1, budget / MAX_BUDGET),
      };
    }
    function computeTrendMultipliers(budgetRatio: number) {
      return [0.6, 1.15, 2.0, 2.6, 3.2].map(
        (m) => m * (1 + budgetRatio * 0.25)
      );
    }
    function generateChartValues(attention: number, budgetRatio: number) {
      const multipliers = computeTrendMultipliers(budgetRatio);
      const avgAbs = multipliers.map((m) => attention * m);
      const deviationFactor = 0.1 * (1 - budgetRatio);
      const minAbs = avgAbs.map((v) => v * (1 - deviationFactor));
      const toPct = (arr: number[]) =>
        arr.map((v) => Math.min(100, (v / MAX_POSSIBLE_ATTENTION) * 100));
      return {
        avgPct: toPct(avgAbs),
        minPct: toPct(minAbs),
        avgAbs,
        minAbs,
      };
    }
    function renderChart(initialBudget: number) {
      if (chartRef.current) chartRef.current.destroy();
      const ctx = attentionChart.getContext("2d");
      if (!ctx) return;
      const metrics = calculateMetrics(initialBudget);
      const proj = generateChartValues(metrics.attention, metrics.budgetRatio);
      chartRef.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: ["Sekarang", "1 Week", "2 Week", "1 Month", "3 Month"],
          datasets: [
            {
              label: "Guaranteed (min)",
              data: proj.minPct,
              borderColor: "transparent",
              backgroundColor: "rgba(59,130,246,0.15)",
              pointRadius: 0,
              tension: 0.4,
              fill: true,
            },
            {
              label: "StdDev (min)",
              data: proj.minPct,
              borderColor: "rgba(252,211,77,0.95)",
              borderWidth: 1,
              borderDash: [4, 4],
              pointRadius: 0,
              tension: 0.4,
              fill: false,
            },
            {
              label: "Average",
              data: proj.avgPct,
              borderColor: "#3B82F6",
              borderWidth: 3,
              tension: 0.4,
              pointRadius: 0,
              backgroundColor: "rgba(59,130,246,0.5)",
              fill: "-2",
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              enabled: true,
              callbacks: {
                title: (ctx) => ctx[0].label,
                label: (ctx) => {
                  const metricsNow = calculateMetrics(
                    Number(budgetSlider.value)
                  );
                  const projNow = generateChartValues(
                    metricsNow.attention,
                    metricsNow.budgetRatio
                  );
                  const absVal =
                    ctx.datasetIndex === 2
                      ? projNow.avgAbs[ctx.dataIndex]
                      : projNow.minAbs[ctx.dataIndex];
                  return `${
                    ctx.dataset.label
                  }: ${ctx.parsed.y.toFixed(1)}% — ${formatCompact(
                    Math.round(absVal)
                  )} attention`;
                },
              },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
              ticks: {
                stepSize: 20,
                callback: (v) => `${v}%`,
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
      const metrics = calculateMetrics(budget);
      budgetValueEl.textContent = formatRupiah(budget);
      attentionValueEl.textContent = formatCompact(metrics.attention);
      convRateEl.textContent = (metrics.conversionRate * 100).toFixed(2) + "%";
      clipperValueEl.textContent = `${metrics.clipperMin} - ${metrics.clipperMax}`;
      const proj = generateChartValues(metrics.attention, metrics.budgetRatio);
      displayConvRateEl.textContent =
        (metrics.conversionRate * 100).toFixed(2) + "%";
      displayAttNowEl.textContent = formatCompact(Math.round(proj.avgAbs[0]));
      displayAttMaxEl.textContent = formatCompact(Math.round(proj.avgAbs[4]));
      if (!chartRef.current) {
        renderChart(budget);
      } else {
        const newProj = generateChartValues(
          metrics.attention,
          metrics.budgetRatio
        );
        chartRef.current.data.datasets[0].data = newProj.minPct;
        chartRef.current.data.datasets[1].data = newProj.minPct;
        chartRef.current.data.datasets[2].data = newProj.avgPct;
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
                <div className="space-y-4 text-left">
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
                      Estimated Attention
                    </p>
                    <p
                      id="attention-value"
                      ref={attentionValueElRef}
                      className="text-2xl font-bold"
                    >
                      3.00K
                    </p>
                  </div>
                  <div>
                    <p className="text-[--text-secondary] font-semibold">
                      Estimated Conversion Rate
                    </p>
                    <p
                      id="conv-rate"
                      ref={convRateElRef}
                      className="text-2xl font-bold"
                    >
                      1.55%
                    </p>
                  </div>
                  <div>
                    <p className="text-[--text-secondary] font-semibold">
                      Clipper & UGC
                    </p>
                    <p
                      id="clipper-value"
                      ref={clipperValueElRef}
                      className="text-2xl font-bold"
                    >
                      450 - 850
                    </p>
                  </div>
                </div>
                {/* slider + chart */}
                <div className="md:col-span-2">
                  <input
                    id="budget-slider"
                    ref={budgetSliderRef}
                    type="range"
                    min="1000000"
                    max="50000000"
                    step="500000"
                    defaultValue="10000000"
                  />
                  <div className="mt-4 h-56">
                    <canvas
                      id="attention-chart"
                      ref={attentionChartRef}
                    ></canvas>
                  </div>
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="bg-[--bg-tertiary] p-3 rounded-lg text-left">
                      <p className="text-sm text-[--text-secondary]">
                        Estimated Conv. Rate
                      </p>
                      <p
                        id="display-conv-rate"
                        ref={displayConvRateElRef}
                        className="font-semibold text-lg"
                      >
                        1.55%
                      </p>
                    </div>
                    <div className="bg-[--bg-tertiary] p-3 rounded-lg text-left">
                      <p className="text-sm text-[--text-secondary]">
                        Estimated Attention (Now)
                      </p>
                      <p
                        id="display-att-now"
                        ref={displayAttNowElRef}
                        className="font-semibold text-lg"
                      >
                        —
                      </p>
                    </div>
                    <div className="bg-[--bg-tertiary] p-3 rounded-lg text-left">
                      <p className="text-sm text-[--text-secondary]">
                        Max Attention (3M)
                      </p>
                      <p
                        id="display-att-max"
                        ref={displayAttMaxElRef}
                        className="font-semibold text-lg"
                      >
                        —
                      </p>
                    </div>
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
